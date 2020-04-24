import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Comment from './Comment';

const CommentsArea = styled.div`
    min-height:145px;
    ${props => props.blank ? `
        display:flex;
        align-items:center;
        justify-content:center;
    ` : ""}
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    min-height:155px;
}
`;

const CommentsList = ({commentData, postId}) => {
    const [comment, setComment] = useState("");

    const onCommentChange = (text) => {
        if(text.length > 40) {
            window.alert("40자 제한입니다.")
            return
        }
        setComment(text);
    }

    const handleComment = async(e) => {
        if(comment.trimLeft().trimRight() === ""){
            e.preventDefault();
            window.alert("댓글이 공백입니다.")
            return false;
        }
        try {
            console.log("입력된 댓글: ", comment);
            await axios.post('/api/posts/comments/create',{
                postId:postId,
                author:localStorage.getItem('id'),
                text:comment
            })
            window.location.reload();
        } catch(e) {

        }
    }

    const handleDelete = async(commentId) => {
        try {
            await axios.post('/api/posts/comments/delete',{
                postId:postId,
                commentId:commentId
            })
            window.location.reload();
        } catch(e) {
            throw e;
        }
    }

    let comments;
    comments = commentData.map(data => {
        const {_id:commentId, author:{profile:{username:author}}, text} = data;
        return (
            <Comment 
                key={commentId}
                commentId={commentId}
                author={author}
                text={text}
                handleDelete={handleDelete}
            />
        )
    })

    return (
        <div className="px-1">
            <div className="flex mb-2" >
                <input className="w-full px-2 py-1 mr-2 border-2 rounded" placeholder="댓글을 입력해주세요" maxLength="40" value={comment} onChange={e=>onCommentChange(e.target.value)}/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-16 rounded shadow" onClick={handleComment} >입력</button>
            </div>
            {commentData.length > 0 ? (
                <CommentsArea blank={false} className="bg-white text-gray-600 border-2 rounded px-1" >
                   {comments}
                </CommentsArea>
            ):(
                <CommentsArea blank={true} className="bg-white text-gray-600 border-2 rounded px-1" >
                    댓글이 없습니다.
                </CommentsArea>
            )}
        </div>
    );
}
export default CommentsList;