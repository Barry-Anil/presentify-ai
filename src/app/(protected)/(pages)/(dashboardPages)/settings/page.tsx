// import { onAuthenticateUser } from '@/actions/user'
import React from 'react'


const Page = async() => {
    // const checkUser = await onAuthenticateUser()
  return (
    <div className='flex flex-col gap-6 relative'>
        <div className='flex flex-col items-start'>
            <h1 className='text-2xl font-semibold dark:text-primary backdrop-blur-lg'>
                Settings
            </h1>
            <p className='text-base font-normal dark:text-secondary'>
                Manage your account settings
            </p>
        </div>

    </div>
  )
}

export default Page