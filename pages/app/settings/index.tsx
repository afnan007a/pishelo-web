import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';

function AccountSettings(props) {

    const router = useRouter()
    useEffect(() => {
        router.replace('/app/settings/account')
    }, [])

    return (
        <div>

        </div>
    )
}

export default AccountSettings