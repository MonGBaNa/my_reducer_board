import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { api } from '../api';
import InputWithLabel from '../AuthComponents/InputWithLabel';
import AuthButton from '../AuthComponents/AuthButton';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { useHistory } from 'react-router-dom';


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

const InputWrap = styled.div`
`;

const ConfirmText = styled.div`
    ${props => props.check ? "color:green":"color:red"}
`;

const BtnWrap = styled.div`
    display:grid;
    grid-template-columns: repeat(2,1fr);
`;

const ProfileModify = () => {
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [changeUsername, setChangeUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [changePassword, setChangePassword] = useState("");
    const [changePasswordConfirm, setChangePasswordConfirm] = useState("");
    let history = useHistory();

    const getProfile = async() => {
        try {
            const { data:res } = await api.get(`/api/users/profile/${localStorage.getItem('id')}`);
            const { profile:{username}, password } = res;
            setUsername(username);
            setPassword(password);
            setLoading(true);
        } catch(e) {
            throw e;
        }
    }

    useEffect(()=>{
        getProfile();
    },[])

    const handleModify = async() => {
        const blankChe = /\s/g;
        if(username === changeUsername) {
            window.alert('기존의 닉네임과 동일합니다.')
            return;
        } if(changeUsername.match(blankChe)) {
            window.alert('닉네임에 공백이 포함되어 있습니다.')
            setChangeUsername('');
            return;
        } if(changePassword.match(blankChe)) {
            window.alert('비밀번호에 공백이 포함되어 있습니다.')
            setChangePassword('');
            setChangePasswordConfirm('');
            return;
        }

        console.log(`
            현재 닉네임: ${username}
            변경할 닉네임: ${changeUsername}
            변경할 비밀번호: ${changePassword}
            변경할 비밀번호 확인 : ${changePassword === changePasswordConfirm ? "확인됨" : "다름"}
            비밀번호: ${password === currentPassword ? "확인됨" : "다름"}
        `);

        try {
            const {data:res} = await api.post('/api/users/modify/profile',{
                userId:localStorage.getItem('id'),
                username:changeUsername,
                password:changePassword
            });

            localStorage.setItem("username",res.username);

            history.replace('/')
        } catch(e) {
            console.log(e.response)
            throw e;
        }
    }

    return  (<>
        {loading ? (
            <>
        <Header />
        <Container className="bg-indigo-100 mx-auto border-2 border-indigo-400 shadow-lg rounded-lg">
            <Title className="bg-indigo-400 text-center text-gray-900 font-bold py-2 select-none">회원정보 수정</Title>
            <InputWrap className="px-4 py-6">
                <InputWithLabel label={`닉네임 (현재 : ${username}) `} type="text" placeholder="닉네임을 입력해주세요" value={changeUsername} onChange={e=>setChangeUsername(e.target.value)}/>
                <InputWithLabel label={"현재 비밀번호"} type="password" placeholder="현재 비밀번호를 입력해주세요" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)}/>
                <InputWithLabel label={"변경할 비밀번호"} type="password" placeholder="변경할 비밀번호를 입력해주세요" value={changePassword} onChange={e=>setChangePassword(e.target.value)}/>
                <InputWithLabel label={"변경할 비밀번호 확인"} type="password" placeholder="변경할 비밀번호를 확인해주세요" value={changePasswordConfirm} onChange={e=>setChangePasswordConfirm(e.target.value)}/>
                {changePasswordConfirm.trim() !== "" ? (
                    <ConfirmText className="px-2" check={changePassword === changePasswordConfirm}>
                        {changePassword === changePasswordConfirm ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다." }
                    </ConfirmText>
                ) : null}

            </InputWrap>
            <BtnWrap className="flex w-full">
                <AuthButton to="/" onClick={()=>handleModify()}>수정완료</AuthButton>
                <AuthButton to="/" >취소</AuthButton>
            </BtnWrap>
            
        </Container>
        </>
        ) : (
            <Loading/>
        )}
    </>);
}

export default ProfileModify;