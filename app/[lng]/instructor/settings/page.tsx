'use client'

import Header from '@/app/[lng]/instructor/_components/header'
import { UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

const Page = () => {
	const {resolvedTheme} = useTheme()
	return (
		<>
			<Header title='Settings' description='Manage your account settings' />
			<div className={'mt-6'}>
				<UserProfile appearance={{
					baseTheme: resolvedTheme === 'dark' ? dark : undefined,
					variables: {
						colorBackground: resolvedTheme === 'dark' ? '#020817' : '#fff',
				}
				}}/>
			</div>
		</>
	)
}
export default Page
