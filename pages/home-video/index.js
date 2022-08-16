import {
  getTopMV
} from "../../service/api_video"


Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: true
  },


  //  *生命周期函数--监听页面加载
  onLoad(options) {
    this.getTopmv(0)
  },

  // 封装getmv网络请求
  async getTopmv(offset) {
    if (!this.data.hasMore && offset !== 0) return;
    wx.showNavigationBarLoading()
    const {
      data: res
    } = await getTopMV(offset)
    if (offset == 0) {
      this.setData({
        topMvs: res.data
      })
      this.setData({
        hasMore: true
      })

    } else {
      this.setData({
        topMvs: this.data.topMvs.concat(res.data)
      })
      this.setData({
        hasMore: res.hasMore
      })
    }
    wx.hideNavigationBarLoading()
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },
  //封装事件处理的方法
  bandleVmItemClick(event) {
   const id = event.currentTarget.dataset.item.id
   wx.navigateTo({
     url: '/pages/datail-video/index?id='+ id,
   })

  },

  // 下拉刷求
  onPullDownRefresh() {
    this.getTopmv(0)
  },
  // 上拉请求
  onReachBottom() {
    this.getTopmv(this.data.topMvs.length)
  }
})