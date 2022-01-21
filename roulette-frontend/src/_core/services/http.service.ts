const basePath = 'http://localhost:5000'

export const httpGet = async <T>(path: string): Promise<T> => {

	try {
		const response = await fetch(basePath + path)

		if (!response.ok) throw new HttpError(response.statusText)
		return (await response.json() as T)
	} catch (err) {
		throw new HttpError('ERR_CONNECTION_REFUSED')
	}
}

export class HttpError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'HTTP_ERROR'
	}
}
