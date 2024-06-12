import SignInForm from "../../components/sign-in/sign-in.component"
import SignUpForm from "../../components/sign-up/sign-up.component"


const Authentication = () => {
  const formContainer = 'flex basis-1/1 sm:basis-1/3 h-[50vh] min-h-fit min-w-max justify-center items-center border border-black';
  return (
    <div className='flex flex-row flex-wrap justify-around items-center lg:max-w-[70vw] lg:mx-auto'>
      <div className={formContainer}>
        <SignInForm />
      </div>
      <div className={formContainer}>
        <SignUpForm />
      </div>
    </div>
  )
}

export default Authentication