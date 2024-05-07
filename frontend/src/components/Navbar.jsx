import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);

    const pathname = useLocation().pathname;

    return (
        <Navbar className='border-b-2'>
            <Link to={'/'} className='self-center text-sm sm:text-xl font-semibold dark:text-white whitespace-nowrap'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 rounded-lg text-white to-pink-500'>MENGHOUY</span>
                CONTENT
            </Link>
            <form>
                <TextInput type='text' placeholder='Search...' className='hidden lg:inline' rightIcon={AiOutlineSearch} />
            </form>
            <Button className='w-12 h-10 lg:hidden' color={'gray'} pill>
                <AiOutlineSearch size={20} />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon />
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
                        <Dropdown.Divider/>
                        <Dropdown.Item>Sign Out</Dropdown.Item>
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