import axios from 'axios';


export const getData = async (pageNumber) => {
    try {
        const data = await (axios.post(`http://localhost:3000/get-details`, {
            pageNumber: pageNumber
        }))
        return data.data.nodes
    }
    catch (err) {
        console.log('errr', err)
    }
}

