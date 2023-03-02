export class CanvasRoulette {
	private readonly ctx: CanvasRenderingContext2D
	private readonly center: number
	private readonly font = "30px Arial"
	private rotation = 0

	constructor(private readonly canvas: HTMLCanvasElement) {
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
		this.ctx.fillStyle = color
		this.ctx.translate(200, 200);

		const angle = endAngle - initAngle
		this.ctx.rotate(initAngle + angle/2)
		this.ctx.fillText(text, 20, 10);
		var time = new Date()
		this.ctx.rotate( ((2*Math.PI)/60) * time.getSeconds() + ((2*Math.PI)/60000) * time.getMilliseconds() );

	}

	public save() {
		this.ctx.save()
	}

	public restore() {
		this.ctx.restore()
	}

	public clear() {
		this.ctx.clearRect(0, 0, this.center * 2, this.center * 2);

	}

	// public initRotate() {
	// 	setInterval(lala => {
	// 		var time = new Date()
	// 		this.ctx.rotate( ((2*Math.PI)/60) * time.getSeconds() + ((2*Math.PI)/60000) * time.getMilliseconds() );
	// 	}, 120)
	// 	// let time = 0
	// 	// do{
	// 	// 	this.ctx.rotate(this.rotation);
	// 	// 	this.rotation += 0.04
	// 	// 	time++
	// 	// } while(time < 100)
	// 	// requestAnimationFrame(() => this.draw())
	// }

	// public lala() {
	// 	this.ctx.rotate(1)
	// }
	// public draw() {
	// 	console.log('.', this.ctx)
	// 	// reset transforms before clearing
	// 	this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	// 	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  
	// 	// tramslate and rotate an absolute rotation value
	// 	this.ctx.translate(300, 300);
	// 	this.ctx.rotate(this.rotation);
	  
	// 	// // draw arcs
	// 	// for (const i = 0; i < num; i++) {
	// 	//   var Ball = balls[i];
	// 	//   this.ctx.beginPath();
	// 	//   this.ctx.arc(Ball.x, Ball.y, Ball.r, 0, 2 * Math.PI, false);
	// 	//   //this.ctx.stroke();
	// 	//   this.ctx.fill();
	// 	// }
	// 	this.ctx.beginPath();
	// 	this.ctx.arc(0, 0, 240, 0, Math.PI * 2, false);
	// 	this.ctx.lineWidth = 8;
	// 	this.ctx.stroke();
	  
	// 	// update rotation value and request new frame
	// 	this.rotation += 0.04;
	// 	requestAnimationFrame(this.draw)
	//   }
}