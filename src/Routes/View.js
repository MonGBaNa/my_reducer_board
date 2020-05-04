import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { api } from '../api';
import styled from 'styled-components';

import Header from '../components/Header';
import Loading from '../components/Loading';
import CommentsList from '../CommentComponents/CommentsList';


const Container = styled.div`
width:61vw;
min-height:800px;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    width:90vw;
    min-height:650px;
}
`;

const TitleArea = styled.div``;

const Title = styled.div`
min-height:30px;
font-size:1.6rem;
white-space:pre-wrap;
word-wrap:break-word;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    min-height:20px;
    font-size:1rem;
}
`;
const UserName = styled.span`
    font-size:.9rem;
    font-weight:600;

`;

const CreatedAt = styled.span`
    font-size:.9rem;
    font-weight:600;
`;

const Contents = styled.div`
word-wrap:break-word;
min-height:500px;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    min-height:350px;
    font-size:0.8rem;
}
`;

const View = (props) => {
    const {match:{params:{id}}} = props;
    const [post, setPost] = useState("");
    const [loading, setLoading] = useState(false);
    
    let history = useHistory();

    const handleDelete = async(e) => {
        e.preventDefault();
        if( window.confirm("정말 삭제하시겠습니까?") ) {
            await api.delete(`/api/posts/${id}`)
            history.replace("/")
        } else {
            return;
        }
    }

    useEffect(()=>{
        const getPost = async() => {
            setLoading(false);
            try {
                const {data:post} = await api.get(`/api/posts/${id}`);
                setPost(post);
                setLoading(true);
            } catch(e) {
                const {data:{message}} = e.response;
                if(message === "없는 게시물 입니다.") {
                    history.replace("/notfound")
                } else {
                    throw e;
                }
            }
        }
        getPost();
    },[id])

    return (
        <>
        {
            loading ? (
            <>
            <Header loggedIn={true} />
            <Container className="bg-gray-100 border-2 border-gray-500 mx-auto p-2 my-6">
                <TitleArea className="border-b border-gray-500 px-2 mb-2">
                    <Title className="font-bold">{post.title}</Title>{/* 50자 */}
                    <UserName className="text-gray-700 pr-1 mr-1">{post.author.profile.username}</UserName>
                    <CreatedAt className="text-gray-700">( {`${post.createdAt}`.substr(0,10)} )</CreatedAt>
                </TitleArea>
                <Contents className="bg-white p-2 mx-1 mb-3 border rounded">{post.text.split('\n').map((line,index) => (
                    <span key={index}>{line}<br/></span>
                ))}</Contents>

                <CommentsList commentData={post.comments} postId={id} />

                <div className="px-1 pt-3 flex justify-end">
                    <Link to="/" onClick={()=>{console.log("목록으로")}}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded shadow mr-2">목록</button>
                    </Link>

                    {post.author.profile.username === localStorage.getItem('username') ? (<>
                    <Link to={`/modify/${id}`} onClick={()=>{console.log("수정으로")}}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded shadow mr-2">수정</button>
                    </Link>

                    <Link to="/" onClick={handleDelete}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded shadow">삭제</button>
                    </Link>
                    </>):null}
                </div>
            </Container>
                </>
            ) : (
                <Loading/>
            )
        }
        </>
            
    );
}

export default View;