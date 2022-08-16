const base_rul = "http://123.207.32.32:9001"

const my_baseUrl = "https://netease-cloud-music-api-all.vercel.app"

class HYRequest {
  constructor(url) {
    this.baseurl = url
  }

  request(url, method, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseurl + url,
        method: method,
        data: params,
        success: res => resolve(res),
        fail: reject
      })
    })
  }

  get(url, params) {
    return this.request(url, "GET", params)
  }

  post(url, data) {
    return this.request(url, "POST", params)
  }
}


 const hyRequest = new HYRequest(base_rul)
 export const myRequest = new HYRequest(my_baseUrl)

export default hyRequest

