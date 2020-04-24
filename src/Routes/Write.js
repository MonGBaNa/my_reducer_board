import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import baseurl from '../baseurl';

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
const Write = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentCnt,setContentCnt] = useState(0);

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

    const handleWrite = async(e) => {
        if(content.trimLeft().trimRight() === "" || title.trimLeft().trimRight() === ""){
            e.preventDefault();
            window.alert("제목 또는 내용에 공백이 있습니다.")
            return false;
        }
        try {
            await axios.post('/api/posts',{
                title:title,
                author:localStorage.getItem('id'),
                text:content
            })
        } catch(e) {
            throw e;
        }
        
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
                <Link to={baseurl} onClick={handleWrite}>
                    <button className="py-2 px-4 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded shadow">확인</button>
                </Link>
                <Link to={baseurl}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">취소</button>
                </Link>
            </div>
        </Container>
        </>
    );
}

export default Write;