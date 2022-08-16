// pages/music-paly/index.js
import {
  getUrlData
} from '../../utils/funAll'
import {
  getMusicPlay
} from '../../service/api-palyMiusice'

import {
  innerAudioContext
} from '../../store/index'


Page({

  data: {
    controLactiveSum: 0,
    controlBgCoverShow: false,
    duration: 0,
    currentTime: 0,
    // 进度条控制
    ChangsliderVlaueflag: false
  },
  onLoad(options) {
    // 传进来的参数 保存到data中  
    let newdata = getUrlData(options.datas)
    if (!newdata.song) return
    // 歌曲详情
    this.getMusic(newdata.song.id)
    // 获取轮播图高度
    let globaData = getApp().globaData
    let query = wx.createSelectorQuery();

    query.select('.navbarHeight').boundingClientRect(rect => {
      let navbarHeight = rect.height;
      const swiperHeight = globaData.screeenHeight - navbarHeight - globaData.statusBarHeight

      this.setData({
        swiperHeight
      })
    }).exec();
    // 使用音乐
    innerAudioContext.stop()
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${newdata.song.id}.mp3`
    innerAudioContext.autoplay = true // 播放
    innerAudioContext.onCanplay(() => {
      innerAudioContext.play()
    })
    innerAudioContext.onTimeUpdate(() => {

      const currentTime = innerAudioContext.currentTime * 1000
      if (this.data.ChangsliderVlaueflag) return
      const sliderValue = currentTime / this.data.duration * 100

      this.setData({
        currentTime,
        sliderValue
      })

    })
  },
  // 获取歌曲的详情
  async getMusic(ids) {
    const {
      data: res
    } = await getMusicPlay(ids)
    this.setData({
      muiscDataList: res.songs[0],
      duration: res.songs[0].dt
    })
  },

  // 事件处理
  controLactiveShow(e) {
    this.setData({
      controLactiveSum: e.detail.current
    })
  },
  controlBgCoverShow() {
    this.setData({
      controlBgCoverShow: !this.data.controlBgCoverShow
    })
  },
  // 监听音乐变化
  changeSliderValue(e) {
    const currentTimeValue = this.data.duration * (e.detail.value / 100)
    innerAudioContext.pause() 
    innerAudioContext.seek(currentTimeValue / 1000)
    this.setData({
      sliderValue: e.detail.value,
      ChangsliderVlaueflag:false
    })

  },
  // 拖拽进度条函数
  ChangsliderVlaueflag(e) {  
    console.log(this.data.duration);
    let currentTime = this.data.duration * (e.detail.value / 100)
    this.setData({
      ChangsliderVlaueflag: true,
      currentTime
    })
  }

})