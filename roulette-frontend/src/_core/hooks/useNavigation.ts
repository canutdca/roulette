import { useLocation } from 'wouter'

export const useNavigation = () => {
	const [_, setLocation] = useLocation()

	const goTo = (path: string | string[]): void => {
		const url = getUrl(path)
		setLocation(url)
	}

	return {
		goTo,
	}
}

function getUrl(path: string | string[]): string {
	if (typeof path === 'string') return path
	const url = path.reduce((acc, el) =>
		`${acc}/${el}`, '')
	return url
}
