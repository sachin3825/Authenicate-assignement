import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/slices/user";
import Modal from "./Modal";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
const emailSchema = z.object({
  email: z.string().email(),
});

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    try {
      emailSchema.parse({ email });
      dispatch(logIn(email));
      navigate("/");
      onClose();
    } catch (e) {
      setError(e.errors[0].message);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title='Login'>
      <form
        onSubmit={handleLogin}
        className='p-2 flex max-w-[300px] w-full flex-col items-center'
      >
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='p-2 border-2 border-gray-300 rounded-md w-full'
        />

        {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}
        <button
          type='submit'
          className='mt-4 p-2 bg-blue-500 text-white rounded-md w-full'
        >
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;
