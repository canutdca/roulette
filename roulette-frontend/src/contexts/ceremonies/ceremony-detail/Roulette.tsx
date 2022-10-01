import styled from "@emotion/styled"
import { useEffect, useRef } from "react"
import { useRoulette } from "./useRoulette"

export interface RouletteProps {
	members: string[]
}

export function Roulette({ members }: RouletteProps) {

	const membersWithColor = (): {member: string, color: string}[] => {
		return members.map(member => ({
			member,
			color:  `#${Math.floor(Math.random()*16777215).toString(16)}`
		}))
	}

	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const { drawRoullete } = useRoulette(membersWithColor(), 400)
	
	useEffect(() => {
		const canvas: HTMLCanvasElement = canvasRef.current!
		drawRoullete(canvas)
	}, [canvasRef])
	
	return <Canvas ref={canvasRef} width="400" height="400"/>

}

function radiant2Angle(radiant: number): number {
	return radiant * 180 / Math.PI
}
const Canvas = styled.canvas`
	border: 1px solid grey;
	border-radius: 50%;
`