import { CanvasRoulette } from "./CanvasRoulette"

export function useRoulette(elements: {member: string, color: string}[],size: number) {

	const drawRoullete = (canvas: HTMLCanvasElement) => {
		const roulette = new CanvasRoulette(canvas)
		const complete = 2 * Math.PI

		elements.map((element, index) => {
			const initAngle = index * complete/elements.length
			const endAngle = (index + 1) * complete/elements.length
			roulette.drawBackrground(initAngle, endAngle, element.color)
			roulette.save()
			roulette.drawText(initAngle, endAngle, element.member, element.color)
			roulette.restore()
		})
	}
	return {
		drawRoullete
	}
}