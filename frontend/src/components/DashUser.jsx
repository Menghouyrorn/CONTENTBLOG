import { Table, Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import {FaCheck,FaTimes} from 'react-icons/fa'


const DashUser = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    } else {
                        setShowMore(true);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUsers((prve) => [...prve, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUsers=()=>{

    }

    return (
        <div className="w-full table-auto md:overflow-x-scroll lg:overflow-hidden overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {
                currentUser.isAdmin && users.length > 0 ? (
                    <>
                        <Table hoverable className="shadow-md w-full">
                            <Table.Head>
                                <Table.HeadCell>Date Created</Table.HeadCell>
                                <Table.HeadCell>Image</Table.HeadCell>
                                <Table.HeadCell>Username</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Admin</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head>
                            {
                                users.map((user) => (
                                    <Table.Body key={user._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell>
                                                <img src={user.profile} alt={user.username} className="w-20 h-10 object-cover bg-gray-500" />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span>{user.username}</span>
                                            </Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/>):(<FaTimes className="text-red-500"/>)}</Table.Cell>
                                            <Table.Cell>
                                                <span onClick={() => {
                                                    setShowModal(true);
                                                    setUserIdToDelete(user._id);
                                                }} className="font-medium text-red-500 hover:underline cu cursor-pointer">
                                                    Delete
                                                </span>
                                            </Table.Cell>

                                        </Table.Row>
                                    </Table.Body>
                                ))
                            }
                        </Table>
                        {
                            showMore && (
                                <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
                            )
                        }
                    </>
                ) : (
                    <p>No posts</p>
                )
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400s">Are you sure you want to delete your Users?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color={'failure'} onClick={handleDeleteUsers}>Yes</Button>
                            <Button color={'gray'} onClick={() => setShowModal(false)}>No</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashUser