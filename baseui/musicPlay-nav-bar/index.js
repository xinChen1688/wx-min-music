// baseui/musicPlay-nav-bar/index.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: Object,
      value: "默认标题"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: getApp().globaData.statusBarHeight,
    navBarHeight:getApp().globaData.navBarHeight
  },
  lifetimes: {
    ready() {

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickGoto(){ 
      console.log(123);
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})