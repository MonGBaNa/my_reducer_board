import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    & + & {
        margin-top:1rem;
    }
`;

const Label = styled.label``;
const Input = styled.input`
    outline:none;
    border-radius:0;
    line-height:2.2rem;
`;

const InputWithLabel = ({label, condition, ...rest}) => {
    return (
        <Wrapper>
            <Label className="text-lg text-gray-800 font-bold px-1 select-none" >{label}</Label> <span className="text-sm">{condition}</span>
            <Input className="w-full border border-gray-500 px-2 py-1 mt-2" {...rest}/>
        </Wrapper>
    );
}

export default InputWithLabel;