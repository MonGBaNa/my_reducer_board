import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
width:50vw;
height:45vh;
@media screen and (max-width: 768px) {
/* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
width:80vw;
height:50vh;
}
`;

const Loading = () => {
    return (
        <Container className="px-2 py-20 border-4 border-indigo-300 mx-auto mt-20 font-bold text-gray-700 rounded-lg shadow-lg flex items-center justify-center">
            <div>로딩중입니다.</div>
        </Container>
    );
}

export default Loading;