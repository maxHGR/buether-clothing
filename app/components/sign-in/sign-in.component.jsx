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
import { signOutCurrentUser } from '@/app/store/user/user.reducer';


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const signInNotify = () => toast.info("successfully signed in", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const signOutNotify = () => toast.info("signed out", {
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
    <div className="flex-col justify-between gap-2 border-2 p-10">
      <h2 className=''>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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
          <button type='submit' className='base-1/2 border border-green-300 p-1 my-2 mr-2 rounded-md'>Sign In</button>
          <button
            type='button'
            onClick={signInWithGoogle}
            className='base-1/2 border border-black p-1 my-2  rounded-md'
          >
            Sign In With Google
          </button>
        </div>
      </form>
      <button onClick={handleSignOut} className='mt-10 ml-36 border border-red-400 bg-red-300 p-1 rounded-md'>Sign Out</button>
    </div>
  );
};

export default SignInForm;