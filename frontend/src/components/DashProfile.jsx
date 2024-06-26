import { Alert, Button, TextInput, Modal } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, signoutSuccess, updateFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userSlice'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'




const DashProfile = () => {
    const { currentUser, error } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const refImageFile = useRef();
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState('');
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUsersuccess, setUpdateUsersuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [shwoModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);

        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('cloud not upload image (file must be less then 2MB)');
                console.log(error);
                setImageFileUploadProgress(null)
                setImageFile(null);
                setImageUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImageFile(downloadUrl);
                    setFormData({ ...formData, profilePicture: downloadUrl });
                    setImageFileUploading(false);
                });
            }
        )
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUsersuccess(null);
        setImageFileUploadError(null)
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No change Name');
            return;

        }
        if (imageFileUploading) {
            try {
                dispatch(updateStart());
                const res = await fetch(`/api/user/update/${currentUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await res.json();
                if (!res.ok) {
                    dispatch(updateFailure(data.message));
                    setUpdateUserError(data.message);
                }
                dispatch(updateSuccess(data));
                setUpdateUsersuccess("User's profile updated successfully");
            } catch (error) {
                dispatch(updateFailure(error));
                setUpdateUserError(error.message)
            }
        }

    }

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            }
            dispatch(deleteUserSuccess(data));
            navigate('/')
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    }

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
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
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="file" accept="image/*" hidden ref={refImageFile} onChange={handleImageChange} />
                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => refImageFile.current.click()}>
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                                        })`,
                                },
                            }}
                        />
                    )}
                    <img src={imageUrl || currentUser.profile} alt="Profile User" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
                        imageFileUploadProgress < 100 &&
                        'opacity-60'
                        }`} />
                </div>
                {imageFileUploadError && (
                    <Alert color='failure'>{imageFileUploadError}</Alert>
                )}
                <TextInput onChange={handleChange} type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
                <TextInput onChange={handleChange} type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
                <TextInput onChange={handleChange} type="password" id="password" placeholder="Password" />
                <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>Update</Button>
                {
                    currentUser.isAdmin && (
                        <Link to={'/create-post'}>
                            <Button
                                type="button"
                                gradientDuoTone={'purpleToPink'}
                                className="w-full"
                            >
                                Create a Post
                            </Button>
                        </Link>
                    )
                }
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span onClick={() => setShowModal(true)} className="cursor-pointer">Delete Account</span>
                <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
            </div>
            {updateUsersuccess && (
                <Alert color='success' className="mt-5">{updateUsersuccess}</Alert>
            )}
            {updateUserError && (
                <Alert color='failure' className="mt-5">{updateUserError}</Alert>
            )}
            {error && (
                <Alert color='failure' className="mt-5">{error}</Alert>
            )}
            <Modal show={shwoModal} onClose={() => setShowModal(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400s">Are you sure you want to delete Account?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color={'failure'} onClick={handleDeleteUser}>Yes</Button>
                            <Button color={'gray'} onClick={() => setShowModal(false)}>No</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default DashProfile