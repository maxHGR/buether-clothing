import SignInForm from "@/app/components/sign-in/sign-in.component"
import SignUpForm from "@/app/components/sign-up/sign-up.component"


const Authentication = () => {
  return (
    <div className="flex h-[80vh]">
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication