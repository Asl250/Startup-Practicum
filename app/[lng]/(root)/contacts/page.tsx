
import ContactForm from '@/components/forms/contact.form'
import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import type { LngParams } from '@/types'
import { Mail, Phone } from 'lucide-react'

async function Page ({ params: { lng } }: LngParams) {
	const { t } = await translation(lng)
	
	return (
		<>
			<TopBar label={'contacts'} />
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.59997953117!2d69.11421517623833!3d41.28247944066319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQsNGI0LrQtdC90YIsINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1723720630930!5m2!1sru!2s"
				width="600" height="450" loading="lazy"
				className={'w-full h-96 border-0'}
			/>
			
			<div className='container mx-auto max-w-6xl'>
				<div className='mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1'>
					<div className='flex flex-col'>
						<h1 className='font-spaceGrotesk text-4xl font-bold'>
							{t('contactTitle')}
						</h1>
						<p className='mt-2 text-muted-foreground'>
							{t('contactDescription')}
						</p>
						
						<div className='mt-12 flex items-center gap-3'>
							<Mail className='size-4' />
							<p className='text-sm'>info@sammi.ac</p>
						</div>
						<div className='mt-2 flex items-center gap-3'>
							<Phone className='size-4' />
							<p className='text-sm'>+98 02 296 4902</p>
						</div>
					</div>
					
					<div>
						<h1 className={'mb-2 font-spaceGrotesk text-4xl font-bold'}>{t('contactForm')}</h1>
						<ContactForm/>
					</div>
				</div>
			</div>
		
		</>
	)
}
export default Page
