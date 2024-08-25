
'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import type { ReactNode } from 'react'

interface Props {
	onConfirm : () => void
	children: ReactNode
}

const ConfirmDeleteModal = ({onConfirm, children}: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className={'p-7'}>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your account
						and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant={'destructive'} onClick={onConfirm}>Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	
	)
}
export default ConfirmDeleteModal
