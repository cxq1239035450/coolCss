export const getGeolocation = () => {
  if (navigator.geolocation) {
    console.log(111)
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
      },
      err => {
        console.log(err)
      },
      {}
    )
  } else {
    /* 地理位置服务不可用 */
    console.error('地理位置服务不可用')
  }
}
