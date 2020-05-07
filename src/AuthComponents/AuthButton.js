import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    cursor: pointer;
    user-select:none;
    transition: .1s all;

    &:not(:last-child) {
        border-right:2px solid #EBF4FF;
    }
`;

const AuthButton = ({to, children, onClick}) => {
    return (
        <Link to={to}>
        <Wrapper className="py-2 mt-4 font-bold text-indigo-100 text-xl text-center bg-indigo-500 hover:bg-indigo-600" onClick={onClick}>
            {children}
        </Wrapper>
        </Link>
    );
}

export default AuthButton;