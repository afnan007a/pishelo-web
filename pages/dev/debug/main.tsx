import { useState, useEffect } from "react"
import * as supabaseClient from '@/clients/supabasePublic'

export default function AuthDetails(props) {

    const [authdetails, setAuthDetails] = useState('Loading User Details Debugging...')
    const [accessToken, setAccessToken] = useState(null)

    const authModule = supabaseClient.supabase.auth

    useEffect(() => {
        console.log('abcdd')
    }, [])
    

    function updateUserDataInScreen() {
        const userdetails:any = authModule.user()
        setAuthDetails(userdetails)
        const acctoken:any = authModule.session()?.access_token
        if (acctoken) {
            setAccessToken(acctoken)
        }
    }

    useEffect(() => {
        globalThis.authModule = authModule
        // globalThis.adminAuthModule = adminAuthModule
        if (!authModule.session()) {
            setAuthDetails('No active auth session found.')
        } else updateUserDataInScreen()

        authModule.onAuthStateChange((authsession) => {
            console.log('Auth State Change')
            console.log(authsession)
            if (authsession) {
                updateUserDataInScreen()
            }
        })
    }, [])

    return (
        <div className={`px-8 pt-5 w-full`}>
            <h1>Auth Details</h1>
                <br />
            <h3>{JSON.stringify(authdetails)}</h3>
                <br />
            <h3>{accessToken}</h3>
                <br />
        </div>
    )
}