'use client'
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../store/user/user.reducer";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase.utils";


export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <div className='landingImage flex h-screen'></div>
    </>
  )
}
