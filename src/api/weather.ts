import request from "@/general/request";


export function getNowWeather(latitude:number,longitude:number) {
  return request({
    url: 'now',
    method: 'get',
    params:{
      latitude,
      longitude
    }
  })
}
