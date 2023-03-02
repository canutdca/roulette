import { useState } from "react"
import { CanvasRoulette } from "./CanvasRoulette"

interface ElementForRoulette {
	text: string,
	colorText: string,
	colorBackground: string
}

export function useRoulette(elementsString: string[],size: number) {

	const [elements, setElements] = useState<ElementForRoulette[]>(elementsWithColors(elementsString))
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)



	const drawRoullete = async (_canvas: HTMLCanvasElement) => {
		setCanvas(_canvas)
		const roulette = new CanvasRoulette(_canvas)
		roulette.clear()
		const complete = 2 * Math.PI

		elements.map((element, index) => {
			const initAngle = index * complete/elements.length
			const endAngle = (index + 1) * complete/elements.length
			roulette.drawBackrground(initAngle, endAngle, element.colorBackground)
			roulette.save()
			roulette.drawText(initAngle, endAngle, element.text, element.colorText)
			roulette.restore()
		})
	}

	const draw = (spinTime: number, spinTimeTotal: number, spinTimeout: any, initAngleForEase: number = 0) => {
		spinTime += 30;
		console.log('entra', spinTime)
		if (spinTime >= spinTimeTotal) {
			// stopRotateWheelImage();
			return;
		}
		const roulette = new CanvasRoulette(canvas!)
		roulette.clear()
		const complete = 2 * Math.PI

		
		elements.map((element, index) => {
			let initAngle = index * complete/elements.length
			let endAngle = (index + 1) * complete/elements.length
			console.log(element.text)
			const ease = easeOut(spinTime, 3, initAngle, spinTimeTotal)

			console.log('ease', ease)
			initAngle = initAngle + ease
			endAngle = endAngle + ease
			console.log('init angle', initAngle)
			console.log('end angle', endAngle)
			console.log('')
			// if (index === 0) initAngleForEase = initAngle
			roulette.drawBackrground(initAngle, endAngle, element.colorBackground)
			roulette.save()
			roulette.drawText(initAngle, endAngle, element.text, element.colorText)
			roulette.restore()
		})
		clearTimeout(spinTimeout);
		spinTimeout = setTimeout(() => draw(spinTime, spinTimeTotal, spinTimeout, initAngleForEase), 500);
	}
	const spinRoulette = () => {
		let spinTime = 0
		const spinTimeTotal = 200
		let spinTimeout: any = null
		draw(spinTime, spinTimeTotal, spinTimeout)
	}

	return {
		drawRoullete,
		spinRoulette
	}
}


const elementsWithColors = (elements: string[]): ElementForRoulette[] => {
	return elements.map(element => {
		const colorText = `#${Math.floor(Math.random()*16777215).toString(16)}`
		const colorInNumber = parseInt(`0x${colorText.substring(1, 6)}`)
		const complementary = 0xffffff ^ colorInNumber
		const colorBackground = ('#' + complementary.toString().substring(0, 6))
		return {
			text: element,
			colorText,
			colorBackground
		}
	})
}

function easeOut(t: any, b: any, c: any, d: any) {
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(tc + -3*ts + 3*t);
  }