import { supabase } from '@/clients/supabasePublic'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const App = ({ dataProps }) => {

    const router = useRouter()

    // how to iterate through every element in array

    useEffect(() => {
        if (!router.isReady) return
        
        const user = supabase.auth.user()
        if (user) {
            router.push('/app')
        } else {
            router.push('/auth/login')
        }
    }, [router.isReady])
    

    return (
        <div>

        </div>
    )
};

export default App;
