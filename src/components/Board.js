import React,{useEffect} from 'react';
import { Link } from 'react-router-dom'
import { setItemSize, setPage } from '../store'
import { connect } from 'react-redux';

import BtnContainer from './BtnContainer'
import styled from 'styled-components';
import Loading from '../components/Loading';
import List from '../ListComponents/List';


const Container = styled.div`
width:61vw;
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    width:90vw;
}
`;

const WriteBtn = styled.button`
@media screen and (max-width: 768px) {
    /* 모바일에 사용될 스트일 시트를 여기에 작성합니다. */
    font-size:0.7rem;
}
`;

const Board = ({state, setItemSize, setPage, loading}) => {
    
    const { itemSize } = state;

    const handleItemSize = (itemSize) => {
        setPage(1);
        setItemSize(itemSize);
    }

    useEffect(()=>{console.log("did mount")},[])
    useEffect(()=>()=>{console.log("did unmount")},[])

    return (
        <>
        {loading ? (
            <Container className="bg-white border-2 border-gray-500 mx-auto p-2 my-6">
                <div className="px-1 flex justify-end">
                    <div className="flex px-2">
                        <label className="flex items-center text-bold mr-2" htmlFor="items_size">글 갯수</label>
                        <select className="bg-gray-300 px-1 rounded" id="items_size" onChange={e=>handleItemSize(e.target.value)} value={itemSize}>
                            <option className="bg-white" value={10}>10개</option>
                            <option className="bg-white" value={15}>15개</option>
                            <option className="bg-white" value={20}>20개</option>
                        </select>
                    </div>
                    <Link to="/write">
                        <WriteBtn className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded shadow"> 글쓰기 </WriteBtn>
                    </Link>
                </div>

                <List />

                <BtnContainer />

                <div className="px-1 flex justify-end">
                    <Link to="/write">
                        <WriteBtn className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded shadow"> 글쓰기 </WriteBtn>
                    </Link>
                </div>
            </Container>
        ): (
            <Loading/>
        )}
        
        </>
    );
}

const mapStateToProps = (state) => {
    return {state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPage: (page) => dispatch(setPage(page)),
        setItemSize: (itemSize) => dispatch(setItemSize(itemSize))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Board);