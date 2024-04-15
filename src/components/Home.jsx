import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFetchMovieMutation } from "../redux/api";
import Card from "./Card";
import { CiSearch } from "react-icons/ci";
import LoginModal from "./LoginModal";
import AddListModal from "./AddListModal";
import { addMovieToList, createList } from "../redux/slices/user"; // Adjust path as necessary
import { toast } from "react-toastify";
const Home = () => {
  const [fetchMovieApi, { isLoading }] = useFetchMovieMutation();
  const [movieTitle, setMovieTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [selectedList, setSelectedList] = useState("");
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAddListModalOpen, setAddListModalOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLists = useSelector((state) => state.user.lists);
  const dispatch = useDispatch();

  const handleAddToWatchlist = (movie) => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
    } else if (userLists.length === 0) {
      setAddListModalOpen(true);
    } else {
      const list = userLists.find((list) => list.listName === selectedList);
      if (list) {
        console.log(list);
        dispatch(addMovieToList({ listName: selectedList, movie }));
      } else {
        toast.error("No list selected");
      }
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const movieData = await fetchMovieApi(movieTitle).unwrap();
      if (movieData.Response === "True") {
        setMovieDetails(movieData);
        setErrorMessage("");
      } else {
        throw new Error(movieData.Error);
      }
    } catch (err) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again."
      );
      setMovieDetails(null);
    }
  };

  const handleCreateList = (listName) => {
    dispatch(createList(listName));
    setSelectedList(listName);
  };

  return (
    <section className='w-full h-full p-5'>
      <div className='p-5 border-red-400 border-2 rounded-md'>
        <h1 className='text-4xl'>
          Welcome to <span className='text-red-500'>Watchlists</span>
        </h1>
      </div>

      <div className='mt-5 flex flex-col gap-4'>
        <div className='flex'>
          <form
            onSubmit={handleSearch}
            className='flex items-center gap-2 w-full'
          >
            <div className='flex items-center gap-2 w-full p-2 border-2 border-gray-300 rounded-md'>
              <CiSearch size={25} className='text-gray-700' />
              <input
                type='text'
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder='Enter movie title'
                className='w-full focus:outline-none focus:ring-0 border-none'
              />
            </div>
            <button
              className='bg-red-500 flex-shrink-0 w-maxContent p-4 rounded-md text-white cursor-pointer'
              type='submit'
              disabled={isLoading || !movieTitle.trim()}
            >
              Search
            </button>
          </form>
        </div>

        {isLoading && <div>Loading...</div>}
        {errorMessage && <div>Error occurred: {errorMessage}</div>}
        {movieDetails && (
          <div className='flex flex-col'>
            <div className='self-end'>
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
                className='p-2 border-2 mb-3 border-gray-300 rounded-md max-w-52'
              >
                <option value=''>Select a list</option>
                {userLists.map((list) => (
                  <option key={list.listName} value={list.listName}>
                    {list.listName}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setAddListModalOpen(true)}
                className='ml-2 p-2 bg-blue-500 text-white rounded-md'
              >
                Create New List
              </button>
            </div>

            <Card
              movie={movieDetails}
              isInWatchlist={false}
              onAdd={handleAddToWatchlist}
            />
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      <AddListModal
        isOpen={isAddListModalOpen}
        onClose={() => setAddListModalOpen(false)}
        handleCreateList={handleCreateList}
      />
    </section>
  );
};

export default Home;
