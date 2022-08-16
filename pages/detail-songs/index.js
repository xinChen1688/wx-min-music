// pages/detail-songs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingInfo: []
  },
  onLoad(options) {
    if(options.itemMenu){
    let itemMenu = JSON.parse(decodeURIComponent(options.itemMenu))
      this.setData({
        rankingInfo:itemMenu
      })
      console.log(itemMenu);
    }else{
      let dataitem = JSON.parse(decodeURIComponent(options.dataitem))
      this.setData({
        rankingInfo:dataitem
      })
    }
   
  },


  onUnload() {

  }
})