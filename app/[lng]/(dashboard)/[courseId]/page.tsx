'use client'

import { ReactNode } from 'react'

interface Props {
	params: { lng: string; slug: string }
}
const Page = ({params: {lng, slug}} : Props, children: ReactNode) => {
	console.log(slug)
	return (
		<div>ass daddssadasdasdasdsssssssssfsdf</div>
	)
}
export default Page
