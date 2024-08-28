'use client'

import { detachPaymentMethod } from '@/actions/customer.action'
import type { ICard } from '@/app.types'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import useTranslate from '@/hooks/use-translate'
import { Trash2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

function CreditCard({ card }: { card: ICard }) {
	const t = useTranslate()
	const pathname = usePathname()
	
	const onDelete = async () => {
		const isConfirmed = confirm('Are you sure you want to delete this card?')
		if (isConfirmed) {
			const promise = detachPaymentMethod(card.id, pathname)
			
			toast.promise(promise, {
				loading: t('loading'),
				success: t('successfully'),
				error: t('error'),
			})
		}
	}
	
	return (
		<>
			<Toaster richColors position={'top-center'} theme={'dark'}/>
			<div className='flex justify-between border-b pb-2'>
				<div>
					<div className='flex items-center gap-2'>
						<div className='font-spaceGrotesk font-bold capitalize'>
							{card.billing_details.name} |
						</div>
						<p className='font-spaceGrotesk text-sm font-bold'>
							{card.card.brand} {card.card.last4}
						</p>
					</div>
					<div className='font-spaceGrotesk text-sm font-bold'>
						{t('expDate')} {card.card.exp_month}/{card.card.exp_year}
					</div>
				</div>
				<div className='self-start'>
					<Button
						size={'icon'}
						variant={'destructive'}
						className='size-8'
						onClick={onDelete}
					>
						<Trash2 className='size-4' />
					</Button>
				</div>
			</div>
		</>
	
	)
}

export default CreditCard
