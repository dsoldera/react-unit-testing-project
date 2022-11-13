
import { NextApiRequest,NextApiResponse } from "next"

export default (_request: NextApiRequest, response: NextApiResponse) => {
  console.log(_request.query);

    const users = [
        {id: 1, name: 'Mia'},
        {id: 2, name: 'Nete'},
        {id: 3, name: 'Dani'},
    ]
    
    return response.json(users)
}