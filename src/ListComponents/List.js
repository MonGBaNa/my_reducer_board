import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Item from './Item';

const ThRow = styled.div`
display:grid;
grid-template-columns:auto 200px 100px;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    display:none;
    font-size:0.7rem;
}
`;

const TitleTh = styled.div`
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
}
`;
const UserTh = styled.div`
width:200px;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    width:52px;
}
`;
const CreatedAtTh = styled.div`
width:100px;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    width:85px;
}
`;

const List = ({state}) => {
    const {posts} = state;

    return (
        <div className="mx-1 my-2">
            
        {posts.length > 0 ? (
            <>
            <ThRow className="font-bold">
                <TitleTh className="bg-blue-200 px-2 py-1 border-gray-500 text-center">제목</TitleTh>
                <UserTh className="bg-blue-200 px-2 py-1 border-gray-500 text-center">작성자</UserTh>
                <CreatedAtTh className="bg-blue-200 px-2 py-1 border-gray-500 text-center">작성일</CreatedAtTh>
            </ThRow>
            {posts.map(post => {
                const { title, _id, author:{profile:{username}}, createdAt, comments} = post;
                return (
                    <Item
                        key={_id}
                        title={title}
                        lnk={_id}
                        author={username}
                        createdAt={createdAt.substr(0,10)}
                        comments_len={comments.length}
                    />
                )})
            }
         
            </>
            
        ):(
            <div className="bg-white rounded h-64 flex items-center justify-center font-bold text-gray-600" >글이 없습니다.</div>
        )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {state}
}

export default connect(mapStateToProps,null)(List);