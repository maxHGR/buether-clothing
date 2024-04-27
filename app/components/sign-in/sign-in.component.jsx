'use client'
import { useState } from 'react';


import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from './../../utils/firebase.utils';


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex-col justify-between gap-2 my-auto mx-auto border-2 p-10">
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
        <div className="flex justify-between">
          <button type='submit' className='border border-green-300 p-2 rounded-md'>Sign In</button>
          <button
            type='button'
            onClick={signInWithGoogle}
            className='border border-black p-2 rounded-md'
          >
            Sign In With Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;