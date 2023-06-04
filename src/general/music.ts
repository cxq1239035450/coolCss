export  class musicObj implements musicType {
    private audio: HTMLAudioElement
    public canvas: HTMLCanvasElement | null
    private ctx: CanvasRenderingContext2D|null
    private analyser: AnalyserNode | null
    private bufferLength: number
    private dataArray: Uint8Array
    private audioContext: AudioContext | null
    public is_play: boolean

    constructor(source: string,canvasDom: HTMLCanvasElement) {
        this.audio = new Audio(source)
        this.canvas = canvasDom
        this.ctx = canvasDom.getContext('2d')
        this.is_play = false
        this.analyser = null
        this.bufferLength = 0
        this.dataArray = new Uint8Array()
        this.audioContext = null



    }

    private createAudioContext(): AudioContext | null {
        try {
            // 创建音频上下文
            return new ((<any>window).AudioContext ||
                (<any>window).webkitAudioContext)()
        } catch (error) {
            console.error('Web Audio API is not supported in this browser.')
            return null
        }
    }

    private createAnalyser(): AnalyserNode | null {
        if (!this.audioContext) return null

        // 创建分析节点
        const analyser = this.audioContext.createAnalyser()
        analyser.minDecibels = -90
        analyser.maxDecibels = 0
        analyser.smoothingTimeConstant = 0.85
        analyser.fftSize = 2048

        return analyser
    }

    private connectNodes(): void {
        if (!this.audioContext || !this.analyser) return

        const audioSrc = this.audioContext.createMediaElementSource(this.audio)

        // 连接节点
        audioSrc.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)
    }

    private initAudioData(): void {
        if (!this.analyser) return

        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
    }

    public async initContext(): Promise<void> {
        // 创建音频上下文和分析节点
        this.audioContext = this.createAudioContext()
        this.analyser = this.createAnalyser()

        // 连接节点
        this.connectNodes()

        // 初始化音频数据
        this.initAudioData()

        return Promise.resolve()
    }

    public async draw(): Promise<void> {
        await new Promise(resolve => requestAnimationFrame(resolve))
        console.log(this.audio.paused);

        // 检查音乐是否已经播放，否则不进行绘制
        if (this.audio.paused || this.audio.ended || !this.analyser|| !this.ctx || !this.canvas) {
            return Promise.resolve()
        }


        // 获取音频数据
        this.analyser.getByteTimeDomainData(this.dataArray)

        // 清空画布
        const canvasWidth = this.canvas.offsetWidth
        const canvasHeight = this.canvas.offsetHeight
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        // 根据音频数据绘制可视化效果
        let length = this.dataArray.length / 2
        const barWidth = canvasWidth / length
        this.ctx.fillStyle = '#78c5f7'
        for (let i = 0; i < length; i++) {
            const item = this.dataArray[i]
            const barHeight = (item / 255) * canvasHeight
            const x = i * barWidth
            const y = canvasHeight - barHeight
            this.ctx.fillRect(x, y, barWidth, barHeight)
        }
        return this.draw()
    }
    play(): void {
        this.audio.play()
        if(!this.audioContext||!this.analyser){
          this.initContext()
        }
        this.draw()
        this.is_play = true
    }

    pause(): void {
        this.audio.pause()
        this.is_play = false
    }

    stop(): void {
        this.pause()
        this.audio.currentTime = 0
    }
    // 省略其他方法
}
export  interface musicType{
  canvas: HTMLCanvasElement | null
  is_play: boolean
  play:Function
  pause:Function
  stop:Function
}
