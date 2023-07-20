import request from "@/general/request";


export function aaaa(latitude,longitude) {
  return request({
    url: `now?key=HE2011051526401042&location=${0},${0}`,
    method: 'get',
  })
}
