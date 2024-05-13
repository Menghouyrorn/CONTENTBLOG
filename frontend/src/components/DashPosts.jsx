import { Table,Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
import {HiOutlineExclamationCircle} from 'react-icons/hi'

const DashPosts = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userposts, setUserPosts] = useState([]);
    const [showMore,setShowMore]=useState(false);
    const [showModal,setShowModal]=useState(false);
    const [postIdToDelete,setPostIdToDelete]=useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if(data.posts.length <9){
                        setShowMore(false);
                    }else{
                        setShowMore(true);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore=async()=>{
        const startIndex = userposts.length;
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUserPosts((prve)=>[...prve,...data.posts]);
                if(data.posts.length < 9){
                    setShowMore(false);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeletePost = async ()=>{
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
                method:'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                setUserPosts((prev)=> prev.filter((post)=>post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="w-full table-auto md:overflow-x-scroll lg:overflow-hidden overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {
                currentUser.isAdmin && userposts.length > 0 ? (
                    <>
                        <Table hoverable className="shadow-md w-full">
                            <Table.Head>
                                <Table.HeadCell>Date Updated</Table.HeadCell>
                                <Table.HeadCell>Image</Table.HeadCell>
                                <Table.HeadCell>Post title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>Delete</Table.HeadCell>
                                <Table.HeadCell><span>Edit</span></Table.HeadCell>
                            </Table.Head>
                            {
                                userposts.map((post) => (
                                    <Table.Body key={post.postId} className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell>
                                                <Link to={`/post/${post.slug}`}>
                                                    <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                                            </Table.Cell>
                                            <Table.Cell>{post.category}</Table.Cell>
                                            <Table.Cell>
                                                <span onClick={()=>{
                                                    setShowModal(true);
                                                    setPostIdToDelete(post._id);
                                                }} className="font-medium text-red-500 hover:underline cu cursor-pointer">
                                                    Delete
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`}>
                                                    <span>Edit</span>
                                                </Link>
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
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400s">Are you sure you want to delete your post?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color={'failure'} onClick={handleDeletePost}>Yes</Button>
                            <Button color={'gray'} onClick={() => setShowModal(false)}>No</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashPosts