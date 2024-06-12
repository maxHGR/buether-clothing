'use client'
import { useState } from 'react';
import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase.utils';


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const notify = () => toast("successfully signed up", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      notify();
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const inputClass = "border rounded-md p-1 my-2";

  return (
    <div className='flex-row px-3'>
      <div>
        <h2>Don&apos;t have an account?</h2>
        <span className='text-xs'>Sign up with your email and password</span>
      </div>
      <form onSubmit={handleSubmit} className='flex-row justify-around'>
        <input
          className={`${inputClass}`}
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          placeholder='name'
          name='displayName'
          value={displayName}
        />
        <br/>
        <input
          className={`${inputClass}`}
          label='Email'
          type='email'
          required
          onChange={handleChange}
          placeholder='email'
          name='email'
          value={email}
        />
        <br/>
        <input
          className={`${inputClass}`}
          label='Password'
          type='password'
          required
          onChange={handleChange}
          placeholder='password'
          name='password'
          value={password}
        />
        <br/>
        <input
          className={`${inputClass}`}
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          placeholder='confirm password'
          name='confirmPassword'
          value={confirmPassword}
        />
        <br/>
        <button type='submit' className='bg-gray-800 text-white p-1 my-2 rounded-md'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;