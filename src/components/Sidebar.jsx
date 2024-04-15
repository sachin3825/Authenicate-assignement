import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut, removeList } from "../redux/slices/user";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userEmail = useSelector((state) => state.user.email);
  const userLists = useSelector((state) => state.user.lists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleDeleteList = (listName) => {
    if (
      window.confirm(`Are you sure you want to delete the list '${listName}'?`)
    ) {
      dispatch(removeList(listName));
      if (window.location.pathname === `/lists/${listName}`) {
        navigate("/");
      }
    }
  };

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r-2 dark:bg-gray-800 transition-transform md:translate-x-0`}
      aria-label='Sidebar'
    >
      <div className='flex flex-col justify-between h-full'>
        <div className='top'>
          <div className='flex items-center justify-between p-4  dark:border-gray-600 text-center'>
            <span className='text-2xl  font-bold  text-red-500 dark:text-white  text-center'>
              Watchlists
            </span>
            <button onClick={toggleSidebar} className='md:hidden'>
              <IoMdClose size={25} className='text-gray-800 dark:text-white' />
            </button>
          </div>
          <form action='submit' className='flex items-center justify-center'>
            <div className='flex items-center border-2 rounded-md p-1 gap-2'>
              <CiSearch size={20} />
              <input
                placeholder='search list'
                type='text'
                className='p-1 focus:outline-none focus:ring-0 border-none'
              />
            </div>
          </form>
          <div className='p-4 mt-2'>
            <NavLink
              to={"/"}
              className={`flex items-center gap-2 p-2 rounded-md `}
            >
              <IoHomeOutline />
              Home
            </NavLink>
          </div>

          {isLoggedIn && (
            <div className=''>
              <h2 className='text-2xl p-2 font-semibold'>My Lists</h2>
              {userLists.map((list, index) => (
                <NavLink
                  key={index}
                  to={`/lists/${list.listName}`}
                  activeClassName='bg-blue-500 text-white'
                  className='flex   flex-grow items-center justify-between p-2 hover:bg-red-500'
                >
                  {list.listName}

                  <button
                    onClick={() => handleDeleteList(list.listName)}
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
            <div>
              <div>{userEmail}</div>
              <button
                onClick={handleLogout}
                className='p-2 bg-red-500 text-white rounded-md'
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className='p-2 bg-blue-500 text-white rounded-md'
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
