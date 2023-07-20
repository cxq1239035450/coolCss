export const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(`维度:${position.coords.latitude}`,`经度:${position.coords.longitude}`);
        return { latitude:position.coords.latitude,longitude:position.coords.longitude}
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
  return {
    latitude:0,longitude:0
  }
}
