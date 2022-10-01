import styled from "@emotion/styled"
import { useEffect, useRef } from "react"

export interface RouletteProps {
	members: string[]
}

export function Roulette({ members }: RouletteProps) {

	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const center = 200
	useEffect(() => {
		const canvas: HTMLCanvasElement = canvasRef.current!
		const ctx = canvas!.getContext('2d')!
		const center = 200


		const complete = 2 * Math.PI
		ctx.moveTo(center,center);
		ctx.arc(center,center,center,0,complete/4);
		ctx.lineTo(center,center);
		ctx.fillStyle = 'blue'
		ctx.font = "30px Arial";
		ctx.fill()
		
		
		ctx.save();
		ctx.fillStyle = 'white'
		ctx.translate(200, 200);
		ctx.rotate(Math.PI/4);
		ctx.fillText("David asd", 20, 10);
		ctx.restore();


	}, [canvasRef])

	
	return <Canvas ref={canvasRef} width="400" height="400"/>

}
const Canvas = styled.canvas`
	border: 1px solid grey;
	border-radius: 50%;
`