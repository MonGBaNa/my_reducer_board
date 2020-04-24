import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setPage, setGroup } from '../store'

const MyBtn = styled.button`
    ${props => props.current ? `
    background-color:#2b6cb0;
    ` : ``}
`;

const PREV = styled.button`
    ${props => props.current ? `
        display:none;
    ` : ``}
`;
const NEXT = styled.button`
    ${props => props.current ? `
        display:none;
    ` : ``}
`;

const BtnContainer = ({state, setPage, setGroup}) => {
    const { page, group, itemSize, collectionCnt } = state;

    const btn_list_size = 5;

    let total_page = Math.ceil(collectionCnt/itemSize);//page_item_size(페이지당 게시물 수) 씩 몇 페이지
    let total_group = Math.ceil(total_page/btn_list_size);//btn_list_size(버튼 갯수) 씩 몇 그룹
    let sInd = 1 + (group - 1) * btn_list_size;
    let eInd = sInd + btn_list_size; //group*btn_list_size + 1

    console.log("sInd: ",sInd, "eInd: ",eInd)
    console.log("total_page: ",total_page)
    console.log("total_group: ",total_group)
    console.log("---------------------------")
    console.log("---------------------------")

    useEffect(()=>{
        sInd = 1 + (group - 1) * btn_list_size;
        eInd = sInd + btn_list_size; //group*btn_list_size + 1
    },[itemSize])

    const range = ( a , b ) => Array.from( new Array( b > a ? b - a : a - b ), ( x, i ) => b > a ? i + a : a - i );
    let btnlist = (<>
        <PREV current={ group === 1 } className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 mr-1 rounded" onClick={()=>prevBtn()}> ◀ </PREV>
        {range(sInd, eInd).map(value => {
            if(value > total_page) return null;
            return (
                <MyBtn key={value} current={page===value} onClick={()=>setPage(value)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 mr-1 rounded">
                    { value }
                </MyBtn>
            )
        })}
        <NEXT current={ total_page < btn_list_size || page === total_page } className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded" onClick={()=>nextBtn()}> ▶ </NEXT>
    </>);

    const prevBtn = () => {
        if(group - 1 < 1) {
            return;
        } else {
            setPage( (group-1)*btn_list_size )
            setGroup(group - 1);
        }
    }

    const nextBtn = async() => {
        if(group + 1 > total_group) {
            return;
        } else {
            setPage(1 + (group) * btn_list_size)
            setGroup(group + 1);
        }
    };

    return (
        <div className="flex justify-center">
            {btnlist}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {state}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPage: (page) => dispatch(setPage(page)),
        setGroup: (group) => dispatch(setGroup(group))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BtnContainer);