import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TdRow = styled.div`
display:grid;
grid-template-columns:auto 200px 100px;
border-bottom:1px solid;
white-space:pre;
& > div {
    overflow:hidden;
    & > :nth-child(1) {
        overflow:hidden;
        text-overflow:ellipsis;
    }
}
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    grid-template-columns:repeat(2,1fr);
    border:1px solid;
    font-size:0.7rem;
    margin:2px;
    & > div:nth-child(1) {/*제목*/
        padding: 0 5px;
        grid-column:span 2;
        order:1;
    }
    & > div:nth-child(3) {/*작성일*/
        justify-self:flex-end;
        order:3;
    }
    & > div:nth-child(2) {/*작성자*/
        justify-self:start;
        order:2;
    }
}
`;

const Item = ({title, author, createdAt, lnk, comments_len}) => {
    return (
        <TdRow>
            <div className="flex">
                <div className="px-1 text-gray-800 font-bold"><Link className="hover:underline hover:text-gray-600" to={`view/${lnk}`}>{title}</Link></div>
                <div className="text-gray-600 font-bold ml-4">{comments_len > 0 ? `[ ${comments_len} ]`:``}</div>
            </div>
            <div className="px-2 text-center">{author}</div>
            <div className="px-2 text-center">{createdAt}</div>
        </TdRow>
    );
}

export default Item;