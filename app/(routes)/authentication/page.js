import SignInForm from "@/app/components/sign-in/sign-in.component"
import SignUpForm from "@/app/components/sign-up/sign-up.component"


const Authentication = () => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='flex flex-wrap sm:gap-10 justify-between'>
        <SignInForm />
        <SignUpForm />
      </div>
    </div>
  )
}

export default Authentication