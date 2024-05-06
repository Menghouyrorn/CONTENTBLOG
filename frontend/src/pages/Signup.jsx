import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl gap-5 mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <Link to={'/'} className=' text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg text-white to-pink-500'>MENGHOUY</span>
            CONTENT
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-5">
            <div>
              <Label value="Your username"/>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Email"/>
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <Label value="Your Password"/>
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone={'purpleToBlue'} type="submit">Sign Up</Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup