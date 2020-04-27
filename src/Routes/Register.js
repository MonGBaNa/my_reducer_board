import React, { useState } from 'react';
import styled from 'styled-components';
import { api } from '../api';
import InputWithLabel from '../AuthComponents/InputWithLabel';
import AuthButton from '../AuthComponents/AuthButton';
import RightAlignLink from '../AuthComponents/RightAlignLink';
import Header from '../components/Header';


const Container = styled.div`
width:450px;
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

const ConfirmText = styled.div`
    ${props => props.check ? "color:green":"color:red"}
`;

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [confirmEmail, setConfirmEmail] = useState({
        text:"",
        confirmed:"",
        useable:false
    });
    const [confirmUsername, setConfirmUsername] = useState({
        text:"",
        confirmed:"",
        useable:false
    });

    const checkEmail = async() => {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(email.length < 1) {return false}
        
        if(!regExp.test(email)) {
            setConfirmEmail({
                ...confirmEmail,
                text:"잘못된 이메일 형식 입니다."
            })   
            return false;
        }
        try {
            const res = await api.get(`/api/users/exists/email/${email}`)
            if(res.data !== "") {
                setConfirmEmail({
                    ...confirmEmail,
                    text:"이미 사용 중 인 이메일입니다."
                })
            } else {
                setConfirmEmail({
                    confirmed:email,
                    text:"사용 가능 한 이메일 입니다.",
                    useable:true
                })
            }
        } catch(e) {
            throw e;
        }
    }

    const checkUsername = async() => {
        const pattern = /\s/g;
        if(username.length < 4) {return false}
        try {
            if( username.match(pattern) ) {
                window.alert('닉네임에 공백이 포함되어있습니다.')
                return false;
            }
            const res = await api.get(`/api/users/exists/username/${username}`)
            if(res.data !== "") {
                setConfirmUsername({
                    ...confirmUsername,
                    text:"이미 사용 중 인 닉네임 입니다."
                })
            } else {
                setConfirmUsername({
                    confirmed:username,
                    text:"사용 가능 한 닉네임 입니다.",
                    useable:true
                })
            }
        } catch (e) {
            throw e;
        }
    }

    const onRegister = async() => {
        const pattern = /\s/g;
        if (!confirmEmail.useable) {
            window.alert("이메일 중복 확인이 필요합니다.")
            return false;
        } if (!confirmUsername.useable) {
            window.alert("닉네임 중복 확인이 필요합니다.")
            return false;
        } if(email !== confirmEmail.confirmed) {
            window.alert("중복확인된 이메일과 다릅니다.")
            setConfirmEmail({
                confirmed:"",
                text:"중복확인을 다시 해 주세요.",
                useable:false
            })
            return false;
        } if(username !== confirmUsername.confirmed) {
            window.alert("중복확인된 닉네임과 다릅니다.")
            setConfirmUsername({
                confirmed:"",
                text:"중복확인을 다시 해 주세요.",
                useable:false
            })
            return false;
        } if(password.length < 1 || password.match(pattern)) {
            window.alert("비밀번호가 공백이거나 공백이 포함되어있습니다.")
            return false;
        } if(confirmPassword.trimLeft().trimRight() === "") {
            window.alert("비밀번호가 확인되지 않았습니다.")
            return false;
        } if(username.length < 4) {
            window.alert("닉네임이 4자 보다 적습니다.")
            return false;
        } if (password.length < 6) {
            window.alert("비밀번호가 6자 보다 적습니다.")
            return false;
        } if (password !== confirmPassword) {
            window.alert("비밀번호와 확인 비밀번호와 일치하지않습니다.")
            return false;
        } 

        console.log(`
            email:${email}
            username:${username}
            password:${password}
            confirmPassword:${confirmPassword}
        `);

        try {
            console.log("회원가입")
            const {data:res} = await api.post('/api/users/register/local',{
                username,
                email,
                password
            });

            localStorage.setItem("id",res.id);
            localStorage.setItem("username",res.username);
            localStorage.setItem("thumbnail",res.thumbnail);
            window.location.replace('/')
        } catch(e) {
            throw e;
        }
        
    }

    return (
        <>
        <Header/>
        <Container className="bg-indigo-100 mx-auto border-2 border-indigo-400 shadow-lg rounded-lg">
            <Title className="bg-indigo-400 text-center text-gray-900 font-bold py-2 select-none">회원가입</Title>
            <InputWrap className="px-4 py-6">
                <InputWithLabel label={"이메일"} type="text" placeholder="이메일를 입력해주세요" value={email} onChange={e=>setEmail(e.target.value)}/>
                <div className="flex mb-4 mt-2">
                    <button className="p-1 mr-3 bg-indigo-300 hover:bg-indigo-400 text-sm rounded shadow" onClick={checkEmail}>중복확인</button>
                    <div className="my-auto">{confirmEmail.text}</div>
                </div>
                <InputWithLabel label={"닉네임"} condition={"( 공백없이 4자 이상 16자 이하로 입력해주세요 )"} type="text" placeholder="닉네임을 입력해주세요" value={username} onChange={e=>setUsername(e.target.value)} maxLength="16"/>
                <div className="flex mb-4 mt-2">
                    <button className="p-1 mr-3 bg-indigo-300 hover:bg-indigo-400 text-sm rounded shadow" onClick={checkUsername}>중복확인</button>
                    <div className="my-auto">{confirmUsername.text}</div>
                </div>
                <InputWithLabel label={"비밀번호"} condition={"( 공백없이 6자 이상 16자 이하로 입력해주세요 )"} type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={e=>setPassword(e.target.value)} maxLength="16"/>
                <InputWithLabel label={"비밀번호 확인"} type="password" placeholder="비밀번호를 재입력해주세요" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} maxLength="16"/>
                {confirmPassword !== "" ? (<ConfirmText className="px-2" check={password === confirmPassword}>{password === confirmPassword ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다." }</ConfirmText>) : null}
                <AuthButton onClick={onRegister}>회원가입</AuthButton>
                <RightAlignLink to="/auth/login">로그인</RightAlignLink>
            </InputWrap>
        </Container>
        </>
    );
}

export default Register;