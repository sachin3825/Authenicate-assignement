import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/slices/user";
import Modal from "./Modal"; // Ensure this is the path to your MUI-based Modal
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      emailSchema.parse({ email });
      dispatch(logIn(email));
      onClose();
    } catch (e) {
      setError(e.errors[0].message); // Set validation error message
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title='Login'>
      <form onSubmit={handleLogin} className='p-4'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='p-2 border-2 border-gray-300 rounded-md w-full'
        />
        {error && <div className='text-red-500 text-sm'>{error}</div>}
        <button
          type='submit'
          className='mt-4 p-2 bg-blue-500 text-white rounded-md'
        >
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
