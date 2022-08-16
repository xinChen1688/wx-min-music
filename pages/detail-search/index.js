// pages/detail-search/index.js
import {
  getServieHot,
  getSearchSuggest,
  getSearchResult
} from '../../service/api-serch'


Page({
  data: {
    hotKeywords: '',
    searchValue: "",
    matchingMiuseList: [],
    timeID: null,
    textNull:''
  },
  onLoad(options) {
    this.getPageData()
  },
  getPageData() {
    getServieHot().then(res => {
      this.setData({
        hotKeywords: res.data.result.hots

      })
    })
  },
  // 搜索关键字请求
  handServieChange(e) {
    // 设置关键字
    this.setData({
      infoShow: true
    })

    this.setData({
      resultSongs: []
    })
    this.setData(({
      searchValue: e.detail
    }))

    if (!e.detail.length > 0) {
      this.setData({
        matchingMiuseList: []
      })
      return
    } else {
      // 防抖  网络请求
      if (this.data.timeID) clearTimeout(this.data.timeID)
      this.data.timeID = setTimeout(() => {
        getSearchSuggest(e.detail).then(res => {
           
          if(!this.data.searchValue){  
            this.setData({
              suuggestSpmgsNode:[]
            })
            return
          }


          this.setData({
            textNull:""
          })
          // 获取关键字
          const matchingMiuseList = res.data.result.allMatch
          this.setData({
            matchingMiuseList
          })
          // 变成node 
          if(!matchingMiuseList){
            this.setData({
              textNull:"当前暂无最新的结果"
            }) 
            return
          }
          const constsuggestKey = matchingMiuseList.map(item => item.keyword)
          const suuggestSpmgsNode = []

          for (const iterator of constsuggestKey) {
            const nodes = []
            if (iterator.toUpperCase().startsWith(this.data.searchValue.toUpperCase())) {
              const key1 = iterator.slice(0, this.data.searchValue.length)
              const key2 = iterator.slice(this.data.searchValue.length)
              const node1 = {
                name: "span",
                attrs: {
                  style: "color:#777"
                },
                children: [{
                  type: "text",
                  text: key1
                }]
              }
              nodes.push(node1)

              const node2 = {
                name: "span",
                attrs: {
                  style: "color:#000"
                },
                children: [{
                  type: "text",
                  text: key2
                }]
              }
              nodes.push(node2)
            } else {
              const nodedd = {
                name: "span",
                attrs: {
                  style: "color:#000"
                },
                children: [{
                  type: "text",
                  text: iterator
                }]
              }
              nodes.push(nodedd)
            }
            suuggestSpmgsNode.push(nodes)
          }
          this.setData({
            suuggestSpmgsNode
          })

        })
      }, 500);
    }
  },
  // 回车搜索
  handleSearchAciton() {
    const searchValue = this.setData.searchValue
    getSearchResult(searchValue).then(res => {
      this.setData({
        resultSongs: res.data.result.songs
      })
    })
  },
  // list列表点击搜索
  listClick(e) {
    // 设置点击的关键字
    let infoShow = false
    this.setData({
      infoShow
    })
    let index = e.currentTarget.dataset.index
    getSearchResult(this.data.matchingMiuseList[index].keyword).then(res => {

      this.setData({
        resultSongs: res.data.result.songs
      })
      this.setData({
        searchValue: this.data.matchingMiuseList[index].keyword
      })
    })
  },
  // 监听热门list点击
  watchHotClick(e) {

    if (this.data.timeID) return
    getSearchResult(e.currentTarget.dataset.list.first).then(res => {
      this.setData({
        timeID: true
      })
      this.setData({
        searchValue: e.currentTarget.dataset.list.first
      })
      this.setData({
        resultSongs: res.data.result.songs
      })
      this.setData({
        timeID: null
      })
    })
  }
})