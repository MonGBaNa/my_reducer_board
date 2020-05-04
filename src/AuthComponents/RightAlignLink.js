import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Aligner = styled.div``;

const RightAlignLink = ({to, children}) => {
    return (
        <Aligner className="mt-2 text-right text-gray-700 underline">
            <Link to={to}>
                {children}
            </Link>
        </Aligner>
    );
}

export default RightAlignLink;