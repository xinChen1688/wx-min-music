// components/song-menu-ranking/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuRanking:{
      type:Array,
      value:[]
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
    rankingClick(e){
      this.triggerEvent('click',e.currentTarget.dataset)
    }
  }
})
