import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateListName, removeMovieFromList } from "../redux/slices/user";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import Card from "./Card";

const ListDetails = () => {
  const { listName } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState(listName);
  const lists = useSelector((state) => state.user.lists);
  const dispatch = useDispatch();

  const list = lists.find((list) => list.listName === listName);

  useEffect(() => {
    setNewListName(listName);
  }, [listName]);

  if (!list) {
    return <div>No list found with the name: {listName}</div>;
  }

  const handleListNameUpdate = () => {
    if (newListName !== listName) {
      dispatch(updateListName({ oldListName: listName, newListName }));
      navigate(`/lists/${newListName}`, { replace: true });
    }
    setIsEditing(false);
  };

  const handleRemoveMovie = (movieId) => {
    dispatch(removeMovieFromList({ listName, movieId }));
    toast.success("Movie removed from the list!");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleListNameUpdate();
    }
  };

  return (
    <section className='p-5'>
      <div className='flex items-center gap-2 '>
        {isEditing ? (
          <input
            autoFocus
            type='text'
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className='text-2xl font-bold mb-4 border-b-2 border-gray-300 outline-none'
            onBlur={handleListNameUpdate}
            onKeyPress={handleKeyPress}
          />
        ) : (
          <h1 className='text-3xl font-bold mb-4'>{listName}</h1>
        )}
        <button onClick={() => setIsEditing(true)}>
          <AiFillEdit size={24} />
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {list.movies.map((movie, index) => (
          <Card
            key={index}
            movie={movie}
            isInWatchList={true}
            onRemove={() => handleRemoveMovie(movie.imdbID)}
          />
        ))}
      </div>
    </section>
  );
};

export default ListDetails;
