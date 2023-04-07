import { requestFactory } from './requester'
 
const baseUrl = 'http://localhost:3030/data/hikes';

export const hikeServiceFactory = (token) => {
    const request = requestFactory(token);
    
    const getAll = async () => {
        const result = await request.get(baseUrl);
    
        const hikes = Object.values(result); // return as an array
    
        return hikes;
    };
    
    const getOne = async(hikeId) => {
        const result = await request.get(`${baseUrl}/${hikeId}`);
        
        return result;
    };
    
    const create = async (hikeData) => {
        const result = await request.post(baseUrl, hikeData);
    
        return result;
    };

    const edit = (hikeId, data) => request.put(`${baseUrl}/${hikeId}`, data);
    
    const remove = async (hikeId) => {
        const result = await request.delete(`${baseUrl}/${hikeId}`);
    
        return result;
    };

    return {
        getAll,
        getOne,
        create,
        remove,
        edit
    }
}