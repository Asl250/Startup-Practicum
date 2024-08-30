'use client'

import { UserButton, UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

const Profile = () => {
	const {resolvedTheme} = useTheme()
	return (
		<>
			<div className={'block max-xl:hidden'}>
				<UserProfile appearance={{
					baseTheme: resolvedTheme === 'dark' ? dark : undefined,
					variables: {
						colorBackground: resolvedTheme === 'dark' ? '#020817' : '#fff',
					}
				}} />
			</div>
			<div className={'pl-3 block xl:hidden'}>
				<UserButton/>
			</div>
		</>
	
	
	)
}
export default Profile
