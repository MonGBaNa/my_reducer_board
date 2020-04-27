import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
width:50vw;
height:45vh;
@media screen and (max-width: 768px) {
/* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
width:80vw;
height:50vh;
}
`;

const NotFound = () => {
    return (
        <Container className="px-2 py-20 border-4 border-indigo-300 mx-auto mt-20 font-bold text-gray-700 rounded-lg shadow-lg text-center">
            <div>없거나 삭제된 페이지 입니다.</div>
            <Link className="underline" to={process.env.PUBLIC_URL}>메인페이지로</Link>
        </Container>
    );
}

export default NotFound;