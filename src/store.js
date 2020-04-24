import { createSlice, configureStore } from '@reduxjs/toolkit';

const myBoard = createSlice({
    name:"myReducer",
    initialState:{
        page:1,
        group:1,
        itemSize:10,
        collectionCnt:0,
        range:{sInd:1, eInd:5},
        posts:[]
    },
    reducers:{
        setData: (state, action) => {
            return {
                ...state,
                posts:action.payload
            }
        },
        setPage: (state, action) => {
            return {
                ...state,
                page:action.payload
            }
        },
        setGroup: (state, action) => {
            return {
                ...state,
                group:action.payload
            }
        },
        setItemSize: (state, action) => {
            return {
                ...state,
                itemSize:action.payload
            }
        },
        setCollectionCnt: (state, action) => {
            return {
                ...state,
                collectionCnt:action.payload
            }
        },
        setRange: (state, action) => {
            return {
                ...state,
                range:action.payload
            }
        }
    }
})

export const {
    setData,
    setPage,
    setGroup,
    setItemSize,
    setCollectionCnt,
    setRange
} = myBoard.actions;

export default configureStore({reducer:myBoard.reducer});