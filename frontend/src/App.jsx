import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Navbar from './components/Navbar'


function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/projects' element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
