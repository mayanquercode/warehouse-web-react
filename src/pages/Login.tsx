import { useEffect, useState } from "react"
import { client } from '../libs/supabase/client'
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()
  
    useEffect(()=>{
      const isUser = async () =>{
          const {data} =  await client.auth.getUser()
  
          if (!data.user){
              navigate('/')
          }
      }
  
      isUser()
      
    }, [navigate])
  

    const [email, setEmail] = useState<string>('')

    const handleOnSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        const { data, error } = await client.auth.signInWithOtp({
            email
        })

        console.log(data, error);
        
    }

    return (
        <section className="p-6">
            <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="yourname@gmail.com" 
                        required 
                        type="email" 
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </section>
    )
}

export default Login