import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { createList } from "../redux/slices/user";

const AddListModal = ({ isOpen, onClose }) => {
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();

  const handleCreateList = (event) => {
    event.preventDefault();
    dispatch(createList(listName));
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} title='Create New List'>
      <form onSubmit={handleCreateList} className='p-4'>
        <input
          type='text'
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder='Enter list name'
          className='p-2 border-2 border-gray-300 rounded-md w-full'
        />
        <button
          type='submit'
          className='mt-4 p-2 bg-blue-500 text-white rounded-md'
        >
          Create List
        </button>
      </form>
    </Modal>
  );
};

export default AddListModal;
