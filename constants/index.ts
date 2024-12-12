import {
	Bell,
	Contact,
	CreditCard,
	FileCode,
	GaugeCircle,
	Home,
	ListVideo, MessageCirclePlus,
	MessageSquareMore,
	MonitorPlay,
	Settings2,
	User
} from 'lucide-react'
import {
	DiCisco,
	DiCreativecommonsBadge,
	DiDjango,
	DiDocker,
	DiGhost,
	DiGithubFull,
	DiLess,
	DiMailchimp,
	DiMeteorfull,
	DiNetmagazine,
	DiNginx,
	DiStylus,
	DiYahoo,
} from 'react-icons/di'

export const navLinks = [
	{ route: '', name: "navLink1", icon: Home },
	{ route: 'courses', name: 'navLink2', icon: ListVideo },
	{ route: 'contacts', name: 'navLink4', icon: Contact },
]

export const lngs = [
	{ route: 'uz', label: "O'zbekcha" },
	{ route: 'ru', label: 'Русский' },
]

export const companies = [
	DiCisco,
	DiCreativecommonsBadge,
	DiGhost,
	DiGithubFull,
	DiMeteorfull,
	DiLess,
	DiMailchimp,
	DiNetmagazine,
	DiNginx,
	DiStylus,
	DiYahoo,
	DiDjango,
	DiDocker,
]

export const filterCourses = [
	{ label: 'cateogry1', name: 'all' },
	{ label: 'cateogry2', name: 'newest' },
	{ label: 'cateogry3', name: 'lowest-price' },
	{ label: 'cateogry4', name: 'highest-price' },
]

export const filterLevels = [
	{ label: 'level1', name: 'all' },
	{ label: 'level2', name: 'beginner' },
	{ label: 'level3', name: 'intermediate' },
	{ label: 'level4', name: 'advanced' },
]

export const courses = [
	{
		title: 'JavaScript',
		previewImage:
			'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F35ca3db9-fb43-4f12-bd48-8b08a503db09-kilwwj.png&w=1920&q=75',
		author: {
			image:
				'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75',
			name: 'Chris Impley',
		},
		oldPrice: 179,
		currentPrice: 79,
		level: 'Beginner',
	},
	{
		title: 'ReactJS',
		previewImage:
			'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fa8573b7c-95b2-4459-8414-8eacde874b0a-kilwdl.png&w=1920&q=75',
		author: {
			image:
				'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75',
			name: 'Chris Impley',
		},
		oldPrice: 159,
		currentPrice: 59,
		level: 'Intermidate',
	},
	{
		title: 'VueJS',
		previewImage:
			'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fbddfc919-2260-46dd-a078-b956bd9a377c-kilwcq.png&w=1920&q=75',
		author: {
			image:
				'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75',
			name: 'Chris Impley',
		},
		oldPrice: 129,
		currentPrice: 29,
		level: 'Intermidate',
	},
	{
		title: 'Telegram BOT',
		previewImage:
			'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F1662922d-b61d-401b-aa1a-693a6231d8a0-kilw9a.png&w=1920&q=75',
		author: {
			image:
				'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75',
			name: 'Chris Impley',
		},
		oldPrice: 209,
		currentPrice: 109,
		level: 'Intermidate',
	},
	{
		title: 'React Native',
		previewImage:
			'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F27f17594-ae28-4fe1-86ce-964a5c89c78d-kilw7k.png&w=1920&q=75',
		author: {
			image:
				'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75',
			name: 'Chris Impley',
		},
		oldPrice: 129,
		currentPrice: 29,
		level: 'Intermidate',
	},
	{
		title: 'Foundation',
		previewImage:
			'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fbcdfb541-3300-430f-b8b2-ff0fb57df056-kilw6p.png&w=1920&q=75',
		author: {
			image:
				'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75',
			name: 'Chris Impley',
		},
		oldPrice: 209,
		currentPrice: 109,
		level: 'Intermidate',
	},
]

export const categories = [
	{
		icon: '/assets/categories/backend.png',
		label: 'Back-end Development',
	},
	{ icon: '/assets/categories/db.png', label: 'Database' },
	{ icon: '/assets/categories/frontend.png', label: 'Front-end Development' },
	{ icon: '/assets/categories/mobile.png', label: 'Mobile Development' },
]

export const learningJourney = [
	{
		title: 'startTitle1',
		excerpt: 'startDescription1',
		image: '/assets/journey/rating.png',
	},
	{
		title: 'startTitle2',
		excerpt: 'startDescription2',
		image: '/assets/journey/science.png',
	},
	{
		title: 'startTitle3',
		excerpt: 'startDescription3',
		image: '/assets/journey/learning.png',
	},
	{
		title: 'startTitle4',
		excerpt: 'startDescription4',
		image: '/assets/journey/standards.png',
	},
]

export const courseLevels = ['beginner', 'intermediate', 'advanced']
export const courseCategory = [
	'front-end',
	'back-end',
	'full-stack',
	'mobile',
	'desktop',
	'game',
]
export const courseLanguage = ['english', 'uzbek', 'russian', 'turkish']

export const editorConfig = {
	height: 150,
	menubar: false,
	plugins: [
		'advlist',
		'autolink',
		'lists',
		'link',
		'image',
		'charmap',
		'preview',
		'anchor',
		'searchreplace',
		'visualblocks',
		'codesample',
		'fullscreen',
		'insertdatetime',
		'media',
		'table',
	],
	toolbar: 'link |' + 'bullist numlist',
	content_style: 'body { font-family:Inter; font-size:16px }',
	skin: 'oxide-dark',
	content_css: 'dark',
}

export const instructorNavLinks = [
	{ label: 'Dashboard', route: '', icon: GaugeCircle },
	{ label: 'My Courses', route: '/instructor/my-courses', icon: MonitorPlay },
	{
		label: 'Create Course',
		route: '/instructor/create-course',
		icon: FileCode,
	},
	{ label: 'Reviews', route: '/instructor/reviews', icon: MessageSquareMore },
	{ label: 'Settings', route: '/instructor/settings', icon: Settings2 },
	{ label: 'massages', route: '/instructor/massages', icon: MessageCirclePlus },
]

export const profileNavLinks = [
	{ label: 'dashboard', route: '/profile', icon: GaugeCircle },
	{ label: 'myCourses', route: '/profile/my-courses', icon: MonitorPlay },
	{ label: 'wishlist', route: '/profile/wishlist', icon: ListVideo },
	{ label: 'creditCards', route: '/profile/credit-cards', icon: CreditCard },
	{ label: 'reviews', route: '/profile/reviews', icon: MessageSquareMore },
	{ label: 'notification', route: '/profile/notifications', icon: Bell },
	{ label: 'massages', route: '/profile/massages', icon: MessageCirclePlus },
]

export const adminNavLinks = [
	{ label: 'Dashboard', route: '/admin', icon: GaugeCircle },
	{ label: 'All courses', route: '/admin/all-courses', icon: MonitorPlay },
	{ label: 'Instructors', route: '/admin/instructors', icon: User },
	{ label: 'Reviews', route: '/admin/reviews', icon: MessageSquareMore },
	{ label: 'Notifications', route: '/admin/notifications', icon: Bell },
]
