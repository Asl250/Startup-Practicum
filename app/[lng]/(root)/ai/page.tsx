'use client'

import Conversation from '@/app/[lng]/(root)/ai/_components/conversation'
import TopBar from '@/components/shared/top-bar'
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import { Bot } from 'lucide-react'
import { useState } from 'react'

const Page = () => {
	const [status, setStatus] = useState('conv')
	
	const t = useTranslate()
	
	const arr = [
		{ label: 'conversation', icon: <Bot />, status: 'conv' },
	]
	
	return (
		<>
			<TopBar label='Open AI' />
			
			<div className='container mx-auto max-w-6xl py-4'>
				<div className='flex gap-4 max-md:flex-col'>
					<div className='w-56 max-md:w-full'>
						<div className='flex flex-col space-y-2 rounded-md bg-gradient-to-b from-primary to-background px-2 py-4'>
							{arr.map(item => (
								<Button
									key={item.status}
									className='justify-start gap-2 font-space-grotesk font-bold'
									variant={status === item.status ? 'default' : 'secondary'}
									onClick={() => setStatus(item.status)}
								>
									{item.icon}
									<span>{t(item.label)}</span>
								</Button>
							))}
						</div>
					</div>
					
					<div
						className='custom-scrollbar relative min-h-[70vh] flex-1 rounded-md bg-gradient-to-t from-background to-secondary pb-16'>
						{status === 'conv' && <Conversation />}
					</div>
				</div>
			</div>
		
		</>
	)
}
export default Page
