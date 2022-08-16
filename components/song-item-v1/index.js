// components/song-item-v1/index.js
import {
  goUrlData
} from "../../utils/funAll"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoMusicPaly() { 
      let datas = goUrlData(this.properties.item)
      wx.navigateTo({
        url: '../../pages/music-paly/index?datas='+datas,
      })
    }
  }
})