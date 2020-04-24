import React from 'react';
import styled from 'styled-components';

const CommentWrap = styled.div`
    &:not(:last-child) {
        margin-bottom:2px;
    }
    display:flex;
    @media screen and (max-width: 768px) {
        /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
        display:grid;
        grid-template-columns: auto auto;
        grid-column-gap:6px;
    }
`;
const CommentUser = styled.div`
width:260px;
margin-right:1rem;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    display:block;
    font-size:0.7rem;
    order:1;
}
`;

const CommentText = styled.div`
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    font-size:0.65rem;
    order:3;
}
`;
const CommentDelBtn = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    @media screen and (max-width: 768px) {
        justify-self:end;
        order:2;
    }
    & > button {
        padding:0 .4rem;
        @media screen and (max-width: 768px) {
        /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
            font-size:0.7rem;
            padding: 0.25rem 0.35rem 0 0.3rem
        }
    }
`;

const Comment = ({commentId, author = "임시 작성자", text="임시 텍스트", handleDelete}) => {
    return (
        <CommentWrap className="border-2 w-full rounded p-1 my-1">
            <CommentUser className="text-gray-700 text-left font-bold">{author}</CommentUser>
            <CommentText className="w-full">{text}</CommentText>{/* 40자 */}
            {
                author === localStorage.getItem('username') ? (
                    <CommentDelBtn>
                        <button className="bg-gray-500 hover:bg-gray-800 text-white font-bold rounded shadow" onClick={()=>handleDelete(commentId)}>&times;</button>
                    </CommentDelBtn>
                ) : null
            }
            
        </CommentWrap>
    );
}

export default Comment;