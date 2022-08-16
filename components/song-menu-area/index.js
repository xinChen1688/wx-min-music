// components/song-menu-area/index.js

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songMenuHot:{
      type:Array,
      value:[]
    },
    title:{
      type:String,
      value:'title'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWindth:app.globaData.screeenWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    songMenuItemClick(event){
      
      let itemMenu = encodeURIComponent(JSON.stringify(event.currentTarget.dataset.item))
      wx.navigateTo({
        url: '/pages/detail-songs/index?type=menu&itemMenu='+ itemMenu
      })

    }
  }
})
