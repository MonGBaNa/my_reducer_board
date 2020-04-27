import React, { useState, useEffect } from 'react';
import { api } from '../api';
import Board from '../components/Board';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { setCollectionCnt, setData } from '../store';


const Home = ({history, state, setCollectionCnt, setData}) => {
    const {action} = history;
    const [loading, setLoading] = useState(false);

    if(action === "PUSH") {window.location.reload()}

    const { page, itemSize } = state;

    const getCollectionCount = async() => {
        try {
            setLoading(false);
            const {data:count} = await api.get(`/api/posts/count`);
            setCollectionCnt(count);
        } catch(e) {
            console.log(e.response)
            throw e;
        }
    }
    const fetchingData = async() => {
        try {
            const {data:posts} = await api.get(`/api/posts?page=${page}&items_size=${itemSize}`);
            setData(posts)
            setLoading(true);
        } catch(e) {
            console.log(e.response)
            throw e;
        }
    }
    useEffect(()=>{
        getCollectionCount();
        fetchingData();
    },[page,itemSize])

    return (
        <>
            <Header isNavi={true} />
            <Board loading={loading}/>
        </>
    );
}

const mapStateToProps = (state) => {
    return { state };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCollectionCnt: (cnt) => dispatch(setCollectionCnt(cnt)),
        setData: (data) => dispatch(setData(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);