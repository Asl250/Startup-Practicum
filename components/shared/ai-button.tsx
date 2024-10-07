import Link from 'next/link'
import { Button } from '../ui/button'
import { Bot } from 'lucide-react'

function AiButton() {
	return (
		<Button
			className='fixed bottom-5 right-5 max-md:size-12 size-16 text-white'
			rounded={'full'}
			size={'icon'}
			asChild
			aria-label={'ai-button'}
		>
			<Link href={'/ai'}>
				<Bot className={'max-md:size-5 size-10'}/>
			</Link>
		</Button>
	)
}

export default AiButton
