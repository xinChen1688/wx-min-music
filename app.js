// app.js
App({
  onLaunch:function(){
    const info = wx.getSystemInfoSync()
    // 屏幕
    this.globaData.screeenWidth = info.screenWidth
    this.globaData.screeenHeight = info.screenHeight
    // 顶屏高度
    this.globaData.statusBarHeight = info.statusBarHeight
  },
  globaData:{
    screeenHeight:0,
    screeenWidth:0,
    statusBarHeight:0,
    // 歌曲播放导航高度
    navBarHeight:0
  }
})
