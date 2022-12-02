export class CanvasRoulette {
	private readonly ctx: CanvasRenderingContext2D
	private readonly center: number
	private readonly font = "30px Arial"

	constructor(canvas: HTMLCanvasElement) {
		if (canvas.height !== canvas.width) throw new Error("Height and Width from Canvas should be equals")
		this.ctx = canvas!.getContext('2d')!
		this.center = canvas.height / 2
	}

	public drawBackrground (initAngle: number, endAngle: number, color: string): void {
		this.ctx.beginPath()
		this.ctx.lineTo(this.center,this.center)
		this.ctx.arc(
			this.center,
			this.center,
			this.center,
			initAngle,
			endAngle
		)
		this.ctx.fillStyle = color
		this.ctx.fill()
	}

	public drawText (initAngle: number, endAngle: number, text: string, color: string) {
		this.ctx.font = this.font
		const colorInNumber = parseInt(`0x${color.substring(1, 6)}`)
		const complementary = 0xffffff ^ colorInNumber
		this.ctx.fillStyle = '#' + complementary.toString().substring(0, 6)
		this.ctx.translate(200, 200);

		const angle = endAngle - initAngle
		console.log('angle', angle)
		this.ctx.rotate(initAngle + angle/2)
		this.ctx.fillText(text, 20, 10);
	}

	public save() {
		this.ctx.save()
	}

	public restore() {
		this.ctx.restore()
	}
}