import * as request from './requester'
 
const baseUrl = 'http://localhost:3030/jsonstore/hikes';

export const getAll = async () => {
    const result = await request.get(baseUrl);

    const hikes = Object.values(result); // return as an array

    return hikes;
};

export const getOne = async(hikeId) => {
    const result = await request.get(`${baseUrl}/${hikeId}`);
    console.log(result);

    return result;
};

export const create = async (gameData) => {
    const result = await request.post(baseUrl, gameData);

    console.log(result);
    
    return result;
};