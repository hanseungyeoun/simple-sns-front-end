import axios from './axios';

export const getPosts = (data = null) => {

    // return axios.get(`http://localhost:4000/posts`);
    return axios.get('http://localhost:8080/api/v1/posts', { params: data })

}

export const searchPosts = (hashTag = '') => {
    return axios.get(`http://localhost:8080/api/v1/posts/search/${hashTag}`)
}

export const myPosts = (data = null) => {
    return axios.get(`http://localhost:8080/api/v1/posts/me`, { params: data })
}

export const writePosts = async (formData) => {
    // return axios.post(`http://localhost:8080/api/v1/posts`)
    return await axios.post('http://localhost:8080/api/v1/posts', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

