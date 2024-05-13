import { Sidebar } from "flowbite-react"
import { HiArrowSmRight, HiUser, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux";
import { signoutSuccess } from '../redux/user/userSlice'
import { useSelector } from "react-redux";


const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        setTab(tabFromUrl)
    }, [location.search]);

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            });
            const data = res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to={'/dashboard?tab=profile'}>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={currentUser.isAdmin ? "Admin" : "User"}
                            labelColor='dark'
                            className="cursor-pointer"
                            as="div"
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to={'/dashboard?tab=posts'}>
                            <Sidebar.Item
                                active={tab === 'post'}
                                icon={HiDocumentText}
                                as="div"
                            >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && (
                        <Link to={'/dashboard?tab=users'}>
                            <Sidebar.Item
                                active={tab === 'users'}
                                icon={HiOutlineUserGroup}
                                as="div"
                            >
                                Users
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>Sign Out</Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar
