import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { createList } from "../redux/slices/user";

const AddListModal = ({ isOpen, onClose }) => {
  const [listName, setListName] = useState("");
  const [error, setError] = useState("");
  const userLists = useSelector((state) => state.user.lists);
  const dispatch = useDispatch();

  const handleCreateList = (event) => {
    event.preventDefault();
    const existingList = userLists.find(
      (list) => list.listName.toLowerCase() === listName.toLowerCase()
    );
    if (existingList) {
      setError("A list with this name already exists!");
      return;
    }

    dispatch(createList(listName));
    setError("");
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
        setError("");
      }}
      title='Create New List'
    >
      <form
        onSubmit={handleCreateList}
        className='p-4 w-full flex flex-col items-center'
      >
        <input
          type='text'
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder='Enter list name'
          className='p-2 border-2 border-gray-300 rounded-md w-full'
        />
        {error && (
          <div className='text-sm text-red-600 self-start ml-2 mt-1'>
            {error}
          </div>
        )}

        <button
          type='submit'
          className='mt-4 p-2 bg-blue-500 text-white rounded-md px-6'
        >
          Create List
        </button>
      </form>
    </Modal>
  );
};

export default AddListModal;
