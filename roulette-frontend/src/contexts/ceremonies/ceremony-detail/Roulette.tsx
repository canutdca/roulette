import styled from "@emotion/styled"
import { useEffect, useRef } from "react"
import { useRoulette } from "./useRoulette"

export interface RouletteProps {
	members: string[]
}

export function Roulette({ members }: RouletteProps) {
	const canvasSize = 400

	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const { drawRoullete, spinRoulette } = useRoulette(members, canvasSize)
	
	useEffect(() => {
		const canvas: HTMLCanvasElement = canvasRef.current!
		drawRoullete(canvas)
	}, [canvasRef])
	
	return <>
		<button onClick={spinRoulette}>spin</button>
		<Canvas ref={canvasRef} width={canvasSize} height={canvasSize}/>
	</>
}

const Canvas = styled.canvas`
	border: 1px solid grey;
	border-radius: 50%;
`