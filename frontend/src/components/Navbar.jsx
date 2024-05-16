import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import {signoutSuccess} from '../redux/user/userSlice'
import { useEffect, useState } from 'react';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dipatch = useDispatch();
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const { theme } = useSelector((state) => state.theme);
    const [searchTerm,setSearchTerm]=useState('');
    const location =useLocation();

    useEffect(()=>{
        const urlPramse = new URLSearchParams(location.search);
        const searchTermFromUrl = urlPramse.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search]);

    const handleSignOut = async ()=>{
        try {
            const res =  await fetch('/api/user/signout',{
                method:'POST',
            });
            const data = await res.json();

            if(!res.ok){
                console.log(data.message);
            }else{
                dipatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSearch = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    return (
        <Navbar className='border-b-2'>
            <Link to={'/'} className='self-center text-sm sm:text-xl font-semibold dark:text-white whitespace-nowrap'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg text-white to-pink-500'>MENGHOUY</span>
                CONTENT
            </Link>
            <form onSubmit={handleSearch}>
                <TextInput 
                type='text' 
                placeholder='Search...' 
                className='hidden lg:inline' 
                rightIcon={AiOutlineSearch} 
                value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color={'gray'} pill>
                <AiOutlineSearch size={20} />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button onClick={() => dipatch(toggleTheme())} className='w-12 h-10  max-sm:inline sm:inline' color='gray' pill>
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='Profile'
                                img={currentUser.profile}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <>
                        <Link to={'/sign-in'}>
                            <Button outline className='' gradientDuoTone={'purpleToBlue'} pill>
                                Sign In
                            </Button>
                        </Link>
                    </>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={pathname === '/'} as={'div'}>
                    <Link to={'/'}>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={pathname === '/about'} as={'div'}>
                    <Link to={'/about'}>About</Link>
                </Navbar.Link>
                <Navbar.Link active={pathname === '/projects'} as={'div'}>
                    <Link to={'/projects'}>Project</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header