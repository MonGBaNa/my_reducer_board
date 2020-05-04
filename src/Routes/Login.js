import React, { useState } from 'react';
import { api } from '../api';
import styled from 'styled-components';
import InputWithLabel from '../AuthComponents/InputWithLabel';
import AuthButton from '../AuthComponents/AuthButton';
import RightAlignLink from '../AuthComponents/RightAlignLink';
import Header from '../components/Header';


const Container = styled.div`
width:400px;
@media screen and (max-width: 768px) {
/* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    width:85vw;
}
`;

const Title = styled.div`
font-size:1.65rem;
@media screen and (max-width: 768px) {
/* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    font-size:1.4rem;
}
`;

const InputWrap = styled.div``;

const Login = () => {
    if(localStorage.getItem("username") !== null) { 
        window.alert("이미 로그인 되어 있는 세션입니다.")
        window.location.replace('/') 
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onLogin = async() => {
        if(email.trimLeft().trimRight() === "" || password.trimLeft().trimRight() === ""){
            window.alert("이메일 또는 비밀번호를 입력해주세요")
            return false;
        }
        try {
            const {data:res} = await api.post('/api/users/login/local',{
                email,
                password
            });

            localStorage.setItem("id",res.id);
            localStorage.setItem("username",res.username);
            localStorage.setItem("thumbnail",res.thumbnail);
            window.location.replace("/")
        } catch(e) {
            const {status} = e.response;
            switch (status) {
                case 400:
                    window.alert("이메일 형식이 잘못 되었습니다.")
                    return;
                case 403:
                    window.alert("이메일 혹은 비밀번호가 잘못 되었습니다.")
                    return;
                default:
                    throw e
            }
        }
    }

    return (
        <>
        <Header />
        <Container className="bg-indigo-100 mx-auto border-2 border-indigo-400 shadow-lg rounded-lg">
            <Title className="bg-indigo-400 text-center text-gray-900 font-bold py-2 select-none">로그인</Title>
            <InputWrap className="px-4 py-6">
                <InputWithLabel label={"이메일"} type="text" placeholder="이메일을 입력해주세요" value={email} onChange={e=>setEmail(e.target.value)}/>
                <InputWithLabel label={"비밀번호"} type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={e=>setPassword(e.target.value)}/>
                <AuthButton onClick={onLogin}>로그인</AuthButton>
                <RightAlignLink to="/auth/register">회원가입</RightAlignLink>
            </InputWrap>
        </Container>
        </>
    );
}

export default Login;