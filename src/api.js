import axios from 'axios';

export const api = axios.create({
    baseURL: "https://my-reducer-board.herokuapp.com"
});