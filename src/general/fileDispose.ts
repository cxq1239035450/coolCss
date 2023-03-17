export const getFileURL = (img:string):string=> {
//参数一: 相对路径
//参数二: 当前路径的URL
  return new URL(`../${img}`,import.meta.url).href
}
