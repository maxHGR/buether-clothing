'use client'
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/user/user.selector"
import { toast, Bounce } from "react-toastify"
import { useDispatch } from "react-redux"

import SignInForm from "../../components/sign-in/sign-in.component"
import SignUpForm from "../../components/sign-up/sign-up.component"
import { signOutUser } from "../../utils/firebase.utils"
import { signOutCurrentUser } from "../../store/user/user.reducer"


const Authentication = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const formContainer = 'flex basis-1/1 sm:basis-1/3 h-[55vh] min-h-fit min-w-max mb-5 p-2 justify-center items-center border-2 border-indigo-500 rounded-lg';

  const signOutNotify = () => toast.info("signed out", {
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const handleSignOut = async () => {
    await signOutUser();
    dispatch(signOutCurrentUser());
    signOutNotify();
  };

  console.log(currentUser)

  return (
    <>
      { currentUser !== null ? (
        <div className="flex-col justify-around ">
          
        <div className="justify-center gap-10 p-[5vw] border bg-indigo-500 text-white rounded-md h-full w-[100vw]">
            <div className=" text-xl">{`Hello ${currentUser.displayName}`}</div>
            <div className="mt-[5vh]">{`Email: ${currentUser.email}`}</div>
        </div>
        <div className="flex justify-end mr-[5vw]">
            <button onClick={handleSignOut} className=" mt-14 mb-5 bg-red-600 text-white rounded-md">Sign out</button>
        </div>
        
        </div>
      ) : (
        <div className='flex flex-row flex-wrap justify-around items-center lg:max-w-[70vw] lg:max-h-[30vh] lg:mx-auto'>
        <div className={formContainer}>
          <SignInForm />
        </div>
        <div className={formContainer}>
          <SignUpForm />
        </div>
        </div>
      )}
    </>
    
  )
}

export default Authentication