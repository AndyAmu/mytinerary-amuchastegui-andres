import React from 'react'
import { useState } from 'react';
import { Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit';

// STYLES
import '../styles/comments.css'
import commentsActions from '../redux/actions/commentsActions';



function Comments(props) {
    
    const dispatch = useDispatch()
    const arrayComments = props.comments.comments.comments
    const itineraries = props.comments._id
    const loggedUser = useSelector(store => store.usersReducer.user)

    const [inputText, setInputText] = useState('')
    const [modifi, setModifi] = useState()
    const [reload, setReload] = useState(false)

    const ScrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
            left: 0
        })
    }

    async function addComment() {
        const commentData = {
            tinerary: itineraries,
            comment: inputText,
        }
        console.log(commentData)
        await dispatch(commentsActions.addComment(commentData))
        setInputText('')

        setReload(!reload)
    }
    
    async function modificarComentario(event) {
        const commentData = {
            commentID: event.target.id,
            comment: modifi,
        }
        console.log(modifi)
        await props.modifyComment(commentData)
        setReload(!reload)

    }

    async function removeComment(event) {
        console.log(event.target.id)
        await  dispatch(commentsActions.removeComment(event.target.id))
        
        setReload(!reload)
    }



    return (
        <>
            <div className='commentsContainer'>
                {arrayComments.map(comment =>
                    <div key={comment._id} className='containerComments'>
                        {comment.userId._id !== loggedUser.id ?
                            <div className='commentBox'>
                                <div>
                                    <Avatar
                                        sx={{ width: 56, height: 56 }}
                                        src={comment.userId.userPhoto} />
                                </div>

                                <div className='comment'>
                                    <p className='userNameComment'>{comment.userId.firstName}</p>
                                    <p> {comment.comment}</p>
                                </div>
                            </div>
                            :
                            <>
                                <div className='commentBox' key={comment._id}>
                                    <div>
                                        <Avatar
                                            sx={{ width: 56, height: 56 }}
                                            src={comment.userId.userPhoto} />
                                    </div>

                                    <div className='comment'>
                                        <p className='userNameComment'>{comment.userId.firstName} {comment.userId.lastName}</p>
                                        <p> {comment.comment}</p>
                                    </div>
                                </div>

                                <div>
                                    <textarea></textarea>
                                    <div className='editAndDelete'>
                                        <IconButton
                                            id={comment._id}
                                            aria-label="delete"
                                            size="large"
                                            onClick={removeComment}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>

                                        <IconButton
                                            id={comment._id}
                                            aria-label="delete"
                                            size="large"
                                        >
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                )}
                <div className="card cardComments">
                    <div className="card-header cardHeaderNew">
                        DEJANOS TU COMENTARIO
                    </div>
                    <div className="card-body ">
                        <textarea id="nuevoComentario" placeholder='Ingresa aqui tu comentario...' onChange={(event) => setInputText(event.target.value)} value={inputText} className="card-text textComments" ></textarea>
                        <button onClick={addComments} className="btn btn-primary btnComments">Send</button>
                    </div>
                </div>
                <LinkRouter to='/signup' className='underlineNone'>
                    <h5 onClick={ScrollToTop} className='callToActionComments'>Feel free to sign up and comment!</h5>
                </LinkRouter>

            </div>

        </>
    )

}

export default Comments

// {props.user.photoUser}