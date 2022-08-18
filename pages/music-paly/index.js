// pages/music-paly/index.js
import {
  getUrlData
} from '../../utils/funAll'
import {
  getMusicPlay
} from '../../service/api-palyMiusice'
import {
  getMusicContainer
} from '../../service/api_music'

import {
  innerAudioContext,
  playStore,
  rankingStore
} from '../../store/index'

// 播放模式图标 


Page({

  data: {
    controLactiveSum: 0,
    controlBgCoverShow: true,
    duration: 0,
    currentTime: 0,
    currentIndex: 0,
    currentLyricinfo: '',
    // 进度条控制
    ChangsliderVlaueflag: false,
    // 控制滚动
    scrollTop: 0,

    // 控制按钮操作 
    // 播放暂停图标
    onChangPlayingImg: true
  },
  onLoad(options) {
    // 传进来的参数 保存到data中   当前数据是newData
    let newdata = getUrlData(options.datas) 
    // 页面渲染
    playStore.onState('MuisDataAll',res =>{
      newdata = res[newdata.index] 
    })
    this.setData({
      newdata
    })
    if (!newdata.song) return
    this.setData({
      id: newdata.song.al.id
    })
    if (newdata.song.id) {
      this.getMusic(newdata.song.id)
    }

    // 歌曲详情
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

    this.getMusicText()
  },

// 歌曲进度
  getMusicText() {
    const newdata = this.data.newdata
    innerAudioContext.stop()
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${newdata.song.id}.mp3`
    // 播放
    innerAudioContext.autoplay = true
    innerAudioContext.onCanplay(() => {
      innerAudioContext.play()
    })

    // 根据时间播放歌词控制进度
    innerAudioContext.onTimeUpdate(() => {
      const currentTime = innerAudioContext.currentTime * 1000
      if (this.data.ChangsliderVlaueflag) return
      const sliderValue = currentTime / this.data.duration * 100

      this.setData({
        currentTime,
        sliderValue
      })
      let i = 0
      // 1.根据当前时间查到歌词  
      if(!this.data.lryicInfos)return
      for (; i < this.data.lryicInfos.length; i++) {

        const lryicInfo = this.data.lryicInfos[i]
        if (currentTime < lryicInfo.timer) {
          break
        }
      }
      // 2  查到歌词之后, 设置当前歌词索引以及内容
      const currentIndex = i - 1
      if (this.data.currentIndex !== currentIndex) {
        const currentLyricinfo = this.data.lryicInfos[currentIndex]
        if (!currentLyricinfo) return
        if (currentLyricinfo.text) {
          this.setData({
            currentLyricinfo,
            currentIndex,
            // 计算滚动高度
            scrollTop: this.data.currentIndex * 35
          })
        }
      }

    })
    innerAudioContext.onEnded(()=>{
      
    })
    getMusicContainer(newdata.song.id).then(res => {
      this.setData({
        lryicInfos: res
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
  // 轮播图毛玻璃
  controlBgCoverShow() {
    // 毛玻璃 
    this.setData({
      controlBgCoverShow: !this.data.controlBgCoverShow
    })
  },
  // 进度条松开时
  changeSliderValue(e) {
    const currentTimeValue = this.data.duration * (e.detail.value / 100)
    innerAudioContext.seek(currentTimeValue / 1000)
    this.setData({
      sliderValue: e.detail.value,
      ChangsliderVlaueflag: false,
      onChangPlayingImg: true

    })
  },
  // 进度条拖拽时
  ChangsliderVlaueflag(e) {
    console.log(this.data.currentIndex);
    let currentTime = this.data.duration * (e.detail.value / 100)
    this.setData({
      ChangsliderVlaueflag: true,
      currentTime
    })
  },

  // 监听控制按钮事件 ==========
  // 播放模式切换
  changPlayMode() {
    // 点击播放模式 
    console.log('点击了播放模式');
  },
  // 播放状态 切换
  ClickPlayingImg() {
    this.setData({
      onChangPlayingImg: !this.data.onChangPlayingImg
    })
    if (this.data.onChangPlayingImg) {
      innerAudioContext.play()
    } else {
      innerAudioContext.pause()
    }
  },
  // 卸载
  onUnload() {
    innerAudioContext.stop()
    this.setData({
      controLactiveSum: null,
      controlBgCoverShow: null,
      duration: null,
      currentTime: null,
      currentIndex: null,
      currentLyricinfo: null,
      ChangsliderVlaueflag: null,
      scrollTop: null,
      onChangPlayingImg: null,
      newdata: null,
      swiperHeight: null,
      muiscDataList: null,
      lryicInfos: 0,
      sliderValue: null
    })
  }
})