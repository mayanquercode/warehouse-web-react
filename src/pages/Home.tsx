import { useNavigate } from "react-router-dom"
import { client } from "../libs/supabase/client"
import { useEffect } from "react"

function Home() {

    const navigate = useNavigate()
  
  useEffect(()=>{
    const isUser = async () =>{
        const {data} =  await client.auth.getUser()

        if (!data.user){
            navigate('/login')
        }
    }

    isUser()
    
  }, [navigate])


    const handleSignOuth = () =>{
        client.auth.signOut()
    }

    return (
        <section className="p-6">
            <p className="text-6xl mb-6 text-gray-900 dark:text-white">Page Home</p>
            <button type="button" onClick={handleSignOuth} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cerrar session</button>

        </section>
    )
}

export default Home