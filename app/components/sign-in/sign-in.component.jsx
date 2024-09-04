'use client'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from './../../utils/firebase.utils';
import { signOutCurrentUser } from '../../store/user/user.reducer';


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const signInNotify = () => toast("successfully signed in", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const signOutNotify = () => toast("signed out", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    signInNotify();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
    signInNotify();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignOut = async () => {
    await signOutUser();
    dispatch(signOutCurrentUser());
    signOutNotify();
  }

  return (
    <div className="flex-col justify-between px-3">
      <div>
        <h2>Already have an account?</h2>
        <span className='text-xs'>Sign in with your email and password</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className='border p-1 my-4 rounded-md'
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          placeholder='email'
          value={email}
        />
        <br/>
        <input
          className='border p-1 mb-4 rounded-md'
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          placeholder='password'
          value={password}
        />
        <div className="flex-row justify-between">
          <button type='submit' className='border border-gray-800 p-1 my-2 rounded-md'>Sign In</button>
          <br/>
          <button
            type='button'
            onClick={signInWithGoogle}
            className='base-1/2 bg-blue-600 text-white p-1 my-2 rounded-md'
          >
            Sign In With Google
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default SignInForm;