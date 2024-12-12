import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href={'/'} className={'flex items-center gap-2'}>
			<Image src={"/logo.png"} alt={'logo'} width={70} height={70}/>
			<h1 className={'font-spaceGrotesk text-4xl font-bold'}>Ta&apos;limot</h1>
		</Link>
	)
}
export default Logo
