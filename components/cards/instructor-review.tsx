'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Flag } from 'lucide-react'
import ReactStars from 'react-stars'

const InstructorReviewCard = () => {
	return (
		<div className={'flex gap-4 border-b pb-4'}>
			
			<div className={'flex-1'}>
				<div className={'flex gap-3'}>
					<Avatar>
						<AvatarFallback className={'uppercase'}>SB</AvatarFallback>
					</Avatar>
					
					<div className={'flex flex-col'}>
						<div className={'font-spaceGrotesk text-sm'}>
							Aslbek Rashidov{" "}
							<span className={'text-xs text-muted-foreground'}>3 days ago</span>
						</div>
						<ReactStars value={4} edit={false} color2={'#E59819'}/>
						<div className={'font-spaceGrotesk font-bold'}>
							Full Course ReactJS
						</div>
						<p className={'text-muted-foreground text-sm'}>
							The standard chunk of Lorem Ipsum used since the 1500s is reproduced
							below for those interested. Sections 1.10.32 and 1.10.33 from "de
							Finibus Bonorum et Malorum" by Cicero are also reproduced in their
							exact original form, accompanied by English versions from the 1914
							translation by H. Rackham.</p>
					</div>
				</div>
			</div>
			
			<Button size={'icon'} variant={'ghost'} className={'self-start'}>
				<Flag className={'text-muted-foreground'}/>
			</Button>
		</div>
	)
}
export default InstructorReviewCard
