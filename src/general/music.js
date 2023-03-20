export class music {
    dataArray
    audio
    analyser
    play
    constructor(audio) {
        this.dataArray = new Uint8Array([])
        this.audio = audio
        this.play = true
        this.init()
    }
    init() {
        // 音频上下文
        const audCtx = new AudioContext()
        // 音频源节点
        const source = audCtx.createMediaElementSource(this.audio)
        // 分析器节点
        this.analyser = audCtx.createAnalyser()

        // 处理分析器节点的数据
        this.analyser.fftSize = 512
        this.dataArray = new Uint8Array(512 / 2)

        //连接源节点和分析器
        source.connect(this.analyser)
        //连接输出
        this.analyser.connect(audCtx.destination)
    }
    draw(canvas, ctx) {
        if (!this.play) {
            return
        }

        requestAnimationFrame(this.draw(canvas, ctx))
        // 清空画布
        this.analyser.getByteFrequencyData(this.dataArray)
        const { width, height } = canvas
        ctx.clearRect(0, 0, width, height)
        //让分析器节点分析出数据到数组中

        this.analyser.getByteFrequencyData(this.dataArray)
        let length = this.dataArray.length / 2
        const barWidth = width / length
        ctx.fillStyle = '#78c5f7'
        for (let i = 0; i < length; i++) {
            const item = this.dataArray[i]
            const barHeight = (item / 255) * height
            const x = i * barWidth
            const y = height - barHeight
            ctx.fillRect(x, y, barWidth, barHeight)
        }
    }
    stop() {
        this.play = false
    }
}
