import axios from 'axios';

const localUrl = 'https://vast-chamber-17969.herokuapp.com/'

const configure = axios.create({
    baseURL:localUrl
})

export default configure