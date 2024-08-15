import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

const useUser = () => {
	const [user, setUser] = useState(null)

	const { userId } = useAuth()

	useEffect(() => {
		const getData = async () => {
			try {
				setUser(data)
			} catch (error) {
				setUser(null)
			}
		}

		userId && getData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { user }
}

export default useUser
