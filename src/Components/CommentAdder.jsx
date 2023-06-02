import { postComment } from "../../utils";
import { useState } from "react";
import { useParams } from "react-router";

function CommentAdder({setArticleComments, currentUser, setFetchedComments}) {

   
const {username} = currentUser
const [newComment, setNewComment] = useState("")
const [commentMessage, setCommentMessage] = useState("")
const {article_id }= useParams()
 
function handleSubmit(event) {
    setFetchedComments(false)
    event.preventDefault()
    setArticleComments((currComments) => {
        return ["Comment posting...", ...currComments]
    })
    // spread old comments + new optimistic comment then once post comment done, then after comment posted
    postComment(username, newComment, article_id).then((newCommentFromApi) => {
        setNewComment("")
        setFetchedComments(true)
        setArticleComments((currComments) => {
            return [newCommentFromApi, ...currComments]
        })
        setCommentMessage("Comment posted successfully.")
        setTimeout(() => {
            setCommentMessage("")
        }, 3000)
    })   .catch((error) => {
        setCommentMessage("Failed to post comment. Please try again later.");
        console.error(error);
      });
}
return (
    <>
    <form onSubmit={handleSubmit} className="comment-submit">
    <textarea placeholder="Write a comment..." multiline="true" value={newComment} onChange={(event) => {
        setNewComment(event.target.value)
    }}></textarea>
    <button type="submit" disabled={!newComment} className="comment-button">➣</button>
    <p className="comment-success-message">{commentMessage}</p>
    <br></br>

    </form>
    </>
)
}

export default CommentAdder;