import { Table, Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi'


const DashComments = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState(null);


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments`);
                const data = await res.json();
                if (res.ok) {
                    console.log(data);
                    setComments(data.comments);
                    if (data.comments.length < 9) {
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
            fetchComments();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setComments((prve) => [...prve, ...data.comments]);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteComments=async () =>{
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
                method:'DELETE',
            });
            const data = await res.json();
            if(res.ok){
                setComments((prev)=>prev.filter((user)=>user._id !== commentIdToDelete));
                setShowModal(false);
            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full table-auto md:overflow-x-scroll lg:overflow-hidden overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {
                currentUser.isAdmin && comments.length > 0 ? (
                    <>
                        <Table hoverable className="shadow-md w-full">
                            <Table.Head>
                                <Table.HeadCell>Date UpdatedAt</Table.HeadCell>
                                <Table.HeadCell>Comment content</Table.HeadCell>
                                <Table.HeadCell>Number of likes</Table.HeadCell>
                                <Table.HeadCell>PostId</Table.HeadCell>
                                <Table.HeadCell>UserId</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                            </Table.Head>
                            {
                                comments.map((user) => (
                                    <Table.Body key={user._id} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>{new Date(user.UpdatedAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell>
                                                {user.content}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span>{user.numberOfLikes}</span>
                                            </Table.Cell>
                                            <Table.Cell>{user.postId}</Table.Cell>
                                            <Table.Cell>{user.userId}</Table.Cell>
                                            <Table.Cell>
                                                <span onClick={() => {
                                                    setShowModal(true);
                                                    setCommentIdToDelete(user._id);
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
                    <p>No comments</p>
                )
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400s">Are you sure you want to delete your Comments?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color={'failure'} onClick={handleDeleteComments}>Yes</Button>
                            <Button color={'gray'} onClick={() => setShowModal(false)}>No</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashComments