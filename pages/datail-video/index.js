// pages/datail-video/index.js

import {
  getDataiVideo,
  getMVRUL,
  getRelatedMV
} from "../../service/api_video"

Page({
  data: {
    mvURLInfo: [],
    mvDetail:[],
    relRelatedMV:[],
    // 弹幕
    danmuList: [{
      text: '测试者弹幕 1s',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
    // 默认参数
    defaultData:{
      author:'该账户已注销'
    }
  },
  onLoad(options) {
    // 获取页面数据
    this.getPageData(options.id)
    
    
  },
  getPageData(id){
  //  请求播放地址
    getMVRUL(id).then(res => {
      this.setData({
        mvURLInfo: res.data.data
      })
    })
    //  请求视频地址
    getDataiVideo(id).then(res => {
      this.setData({
        mvDetail: res.data.data
      })
    })
     // 请求相关地址
     getRelatedMV(id).then(res => {
      this.setData({
        relRelatedMV: res.data.data
      })
    })



  }

})