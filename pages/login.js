import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function LoginPage() {
    
    const router = useRouter()

    const [credentials, setcredentials] = useState({
        email: '',
        password: ''
    })

    const handlerChange = (e) => {
        setcredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)
        const reponse = await axios.post('/api/auth/login', credentials)

        if (reponse.status === 200) {
            router.push('/dashboard')
        }

        console.log(reponse)
    }

  return (
    <div>
        <form onSubmit={handlerSubmit}>

            <input name="email" type="email" placeholder="Email" onChange={handlerChange} />
            <input name="password" type="password" placeholder="Password" onChange={handlerChange} />
            <button type="submit">Login</button>

        </form>
    </div>
  )
}

export default LoginPage