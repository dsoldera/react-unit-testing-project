import { NextApiRequest,NextApiResponse } from "next"

// How to login
// JWT (Storage)
// Next Auth 

export default (_request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id: 1, name: 'Mia'},
        {id: 2, name: 'Nete'},
        {id: 3, name: 'Dani'},
    ]
    
    return response.json(users)
}