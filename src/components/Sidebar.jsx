import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut, removeList } from "../redux/slices/user";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import LoginModal from "./LoginModal";
import { CiLogout } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userEmail = useSelector((state) => state.user.email);
  const userLists = useSelector((state) => state.user.lists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    toggleSidebar();
    navigate("/");
  };

  const handleDeleteList = (listName, event) => {
    event.stopPropagation();
    if (
      window.confirm(`Are you sure you want to delete the list '${listName}'?`)
    ) {
      dispatch(removeList(listName));
      navigate("/");
    }
  };

  const filteredLists = searchTerm
    ? userLists.filter((list) =>
        list.listName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : userLists;

  const displayEmail = userEmail ? userEmail.split("@")[0] : "";

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r-2 dark:bg-gray-800 transition-transform md:translate-x-0`}
      aria-label='Sidebar'
    >
      <div className='flex flex-col justify-between h-full'>
        <div className='top'>
          <div className='flex items-center justify-between p-4 dark:border-gray-600 text-center'>
            <span className='text-2xl font-bold text-red-500 dark:text-white text-center'>
              Watchlists
            </span>
            <button onClick={toggleSidebar} className='md:hidden'>
              <IoMdClose size={25} className='text-gray-800 dark:text-white' />
            </button>
          </div>
          <form className='flex items-center justify-center w-full'>
            <div className='flex items-center border-2 rounded-md p-1 gap-1 w-11/12'>
              <CiSearch size={20} />
              <input
                placeholder='Search lists'
                type='text'
                className='flex-grow focus:outline-none focus:ring-0 border-none'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <div className='p-4 mt-2 border-b-2'>
            <NavLink
              to='/'
              className='flex items-center gap-2 p-2 rounded-md'
              onClick={() => toggleSidebar()}
            >
              <IoHomeOutline />
              Home
            </NavLink>
          </div>

          {isLoggedIn && (
            <div>
              <h2 className='text-2xl p-2 font-semibold'>My Lists</h2>
              {filteredLists.map((list, index) => (
                <NavLink
                  key={index}
                  to={`/lists/${list.listName}`}
                  className='flex p-2 justify-between hover:bg-red-500'
                  onClick={() => toggleSidebar()}
                >
                  {list.listName}

                  <button
                    onClick={(e) => handleDeleteList(list.listName, e)}
                    className='ml-2'
                  >
                    <MdDeleteForever size={24} color='black' />
                  </button>
                </NavLink>
              ))}
            </div>
          )}
        </div>
        <div className='p-4'>
          {isLoggedIn ? (
            <div className='flex items-center justify-between border-2 px-3 py-2 rounded-full'>
              <FaRegUserCircle size={20} />
              <div>{displayEmail}</div>
              <button
                onClick={handleLogout}
                className='p-2 bg-red-700 text-white rounded-full active:scale-75 transition-all delay-75'
              >
                <CiLogout />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className='p-2 bg-blue-500 text-white rounded-md self-center w-full'
            >
              Login
            </button>
          )}
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setLoginModalOpen(false)}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
