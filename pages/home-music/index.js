// pages/home-music/index.js
import {
  getBanners,
  getsongMenu,
  getRanking
} from '../../service/api_music'

import queryRect from '../../utils/query-rect'

import {
  rankingStore
} from '../../store/index'

Page({
  data: {
    banner: [],
    swiperHeight: 0,
    ifswiper: false,
    recommendSpmgs: [],
    // 热门歌单
    songMenuHot: [],
    // 推荐歌单
    recommendationsongMenu: [],
    // 巅峰榜
    menuRanking: []
  },
  onLoad(options) {

    //获取轮播图
    this.getPageData()
    // 获取轮播图高度
    this.handSwiperImgHeight()

    // 获取歌单列表
    this.getsongMenuHot()
    rankingStore.dispatch("getbanner")

    // 从store获取共享数据
    rankingStore.onState("hotRanking", (res) => {
      if (!res.length > 0) return
      // const recommendSpmgs = res.slice(0, 4)
      this.setData({
        recommendSpmgs: res
      })
    })
    //获取巅峰榜
    getRanking("/toplist/detail").then(res => {
      const menuRanking = res.data.list.slice(0, 4)
      this.setData({
        menuRanking
      })
    })
  }, 
  
 
  // 歌单列表
  getsongMenuHot() {
    getsongMenu().then(res => {
      this.setData({
        songMenuHot: res.data.playlists
      })
    })

    getsongMenu("华语").then(res => {
      this.setData({
        recommendationsongMenu: res.data.playlists
      })
    })

  },

  // 样式设置
  // 轮播图图片高度
  async handSwiperImgHeight() {
    await queryRect('.swiper-image').then(res => {
      if (this.data.ifswiper) return
      if (res[0] !== null) {
        this.setData({
          ifswiper: true
        })
        this.setData({
          swiperHeight: res[0].height
        })
        setTimeout(() => {
          this.setData({
            swiperHeight: res[0].height
          })
        }, 200);
      } else {
        return
      }

    })

  },



  // 事件处理 ==========
  // 推荐歌曲点击
  recommendClick(event) {
    this.gotoRankingClick(event.currentTarget.dataset.new)
  },
  //  推荐
  hotClick(event) {
    this.gotoRankingClick(event.currentTarget.dataset.hot)
  },
  muisClick(event) {
    this.gotoRankingClick(event.currentTarget.dataset.hot)
  },
   // 轮播图参数
   async getPageData() {
    const {
      data: res
    } = await getBanners()
    this.setData({
      banner: res.banners
    })
  },

  // 事件跳转 =========
  // 榜单跳转
  gotoRankingClick(datalist) {
    let dataitem = encodeURIComponent(JSON.stringify(datalist))
    wx.navigateTo({
      url: '/pages/detail-songs/index?type=rank&dataitem=' + dataitem
    })
  },
  // 巅峰榜调转
  rankingClicks(event) {
    let dataitem = encodeURIComponent(JSON.stringify(event.detail.sum))
    wx.navigateTo({
      url: '/pages/detail-songs/index?type=rank&dataitem=' + dataitem
    })
  },

  // 点击搜索跳转
  handleSearchClick() {
    wx.navigateTo({
      url: '../detail-search/index',
    })
  }
})