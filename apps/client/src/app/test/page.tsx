import { auth } from "@clerk/nextjs/server"

const TestPage = async () => {

    const {getToken} = await auth()
    const token = await getToken()

    console.log(token)
    const response = await fetch('http://localhost:8000/test', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log(data)
  return <div>TestPage</div>
}

export default TestPage