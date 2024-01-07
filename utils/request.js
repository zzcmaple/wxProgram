export const request = (url, method, data) => {
  const baseUrl = 'https://www.zzcmaple.online'
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data,
      success ({ data }) {
        if (data.code !== 200) {
          reject(data)
        } else {
          resolve(data)
        }
      },
      fail ({data}) {
        reject(data)
      }
    })
  })
}