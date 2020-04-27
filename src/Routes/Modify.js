import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import styled from 'styled-components';
import Header from '../components/Header';

const Container = styled.div`
width:61vw;
min-height:600px;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    width:90vw;
    min-height:450px;
}
`;

const TitleInput = styled.input`
min-height:30px;
font-size:1.6rem;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    min-height:20px;
    font-size:1.2rem;
}
`;

const ContentsInput = styled.textarea`
min-height:500px;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    min-height:350px;
    font-size:0.8rem;
}
`;

const Modify = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentCnt,setContentCnt] = useState(0);

    const {match:{params:{id}}} = props;

    useEffect(()=>{
        const {history:{action}} = props
        console.log(action);
    },[props])
    
    useEffect(()=>{
        const getData = async() => {
            const { data: post } = await api.get(`/api/posts/${id}`);
            setTitle(post.title);
            setContent(post.text);
            setContentCnt(post.text.length)
        }
        getData();
    },[id])

    const handleModify = async(e) => {
        e.preventDefault();
        if(content.trim() === "" || title.trim() === ""){
            window.alert("제목 또는 내용이 공백입니다.")
            return false;
        }
        try {
            await api.patch(`/api/posts/${id}`,{
                title:title,
                author:localStorage.getItem('id'),
                text:content
            })   
            window.location.replace(process.env.PUBLIC_URL+`/view/${id}`) 
        } catch (e) {
            throw e
        }
    }

    const titleChange = (text) => {
        if(text.length > 50) {
            window.alert("50자 제한입니다.")
            return
        }
        setTitle(text);
    }

    const contentChange = (text) => {
        if(text.length > 1000) {
            window.alert("1000자 제한입니다.")
            return
        }
        setContent(text);
        setContentCnt(text.length);
    }

    return(
        <>
        <Header/>
        <Container className="bg-gray-100 border-2 border-gray-500 mx-auto p-2 my-6">
            <div className="bg-blue-300 p-2 flex">제목</div>
            <div className="border-b border-gray-500 pb-2">
                <TitleInput className="w-full p-2 border rounded" value={title} onChange={e=>titleChange(e.target.value)} required maxLength="50"/>
            </div>
            <div className="bg-blue-300 p-2 mt-2 flex">내용</div>
            <ContentsInput className="w-full p-2 border rounded" value={content} onChange={e=>contentChange(e.target.value)} required maxLength="1000" style={{resize:"none"}}/> 
            <div className="px-1 mb-2 flex justify-end">글자수 {contentCnt}/1000</div>
            <div className="px-1 flex justify-end">
                <Link to={process.env.PUBLIC_URL+`/view/${id}`} onClick={handleModify}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded shadow">확인</button>
                </Link>
                
                <Link to={process.env.PUBLIC_URL+`/view/${id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded shadow">취소</button>
                </Link>
            </div>
            
        </Container>
        </>
    );
}

export default Modify;