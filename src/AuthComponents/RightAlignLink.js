import React from 'react';
import styled from 'styled-components';

const Aligner = styled.div``;

const RightAlignLink = ({to, children}) => {
    return (
        <Aligner className="mt-2 text-right text-gray-700 underline">
            <a href={to}>{children}</a>
        </Aligner>
    );
}

export default RightAlignLink;