import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
import {signInSuccess,signInStart,signInFailure} from '../redux/user/userSlice'
import {useDispatch,useSelector} from 'react-redux'

const SignIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const {error,loading}=useSelector((state)=>state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
     return dispatch(signInFailure('Please fill out all fields.'))
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl gap-5 mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <Link to={'/'} className=' text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg text-white to-pink-500'>MENGHOUY</span>
            CONTENT
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange}  required/>
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} required/>
            </div>
            <Button disabled={loading} gradientDuoTone={'purpleToBlue'} type="submit">{loading ? <><Spinner size={'sm'} /> <span className="pl-3">Loading...</span></> : 'Sign In'}</Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Dont Have an account?</span>
            <Link to={'/sign-up'} className="text-blue-500">Sign Up</Link>
          </div>
          {
            error && (
              <Alert className="mt-5" color={'failure'}>
                {error}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn