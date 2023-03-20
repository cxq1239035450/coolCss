export class AudioContext{
  constructor(audio){
    this.audio = audio
    this.init()
  }
  init(){
    // 音频上下文
    const audCtx = new AudioContext()
    // 音频源节点
    const source = audCtx.createMediaElementSource(audio)
    // 分析器节点
    this.analyser = audCtx.createAnalyser()

    // 处理分析器节点的数据
    analyser.fftSize = 512
    this.dataArray = new Uint8Array(512/2)

    //连接源节点和分析器
    source.connect(analyser)
    //连接输出
    analyser.connect(audCtx.destination)
  }
}


