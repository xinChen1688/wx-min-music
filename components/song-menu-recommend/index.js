// components/song-menu-recommend/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendSpmgs: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: { 
    ready(){ 
     let recommendSpmgsFilter = this.properties.recommendSpmgs.filter(item => item.song) 
     this.setData({
      recommendSpmgsFilter
     })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})