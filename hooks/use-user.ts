import { useState } from 'react'

const useUser = () => {
	const [user, setUser] = useState(null)
	
	return { user }
}

export default useUser
