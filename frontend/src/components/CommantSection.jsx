import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Comment from './Comment';


const CommantSection = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }

        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
            });
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
            console.log(data);
        } catch (error) {
            setCommentError(error.message);
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getpostcomments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getComments();

    }, [postId])

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                currentUser ? (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                        <p>Signed in as:</p>
                        <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profile} alt='User Profile' />
                        <Link className='text-xs text-cyan-600 hover:underline' to={'/dashboard?tab=profile'}>@ {currentUser.username}</Link>
                    </div>
                ) : (
                    <div className='text-sm text-teal-500 my-5 flex gap-1'>You must be signed in to comment.
                        <Link className='text-blue-500 hover:underline' to={'/sign-in'}>Sign In</Link>
                    </div>
                )
            }
            {
                currentUser && (
                    <form onSubmit={handleSubmit} className='border w-full border-teal-500 rounded-md p-3'>
                        <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Add a comment...' rows='3' maxLength='200' />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                            <Button className='' gradientDuoTone={'purpleToBlue'} type='submit' outline>Submit</Button>
                        </div>
                        {
                            commentError && <Alert color={'failure'} className='mt-5'>{commentError}</Alert>
                        }
                    </form>

                )
            }
            {comments.length === 0 ? (<p className='text-sm my-5'>No comments yet!</p>) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>
                                {comments.length}
                            </p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            comment={comment}
                            key={comment._id}
                        />
                    ))}
                </>
            )}
        </div>

    )
}

export default CommantSection