import {
  HYEventStore
} from "hy-event-store"



const playStore = new HYEventStore({
  state: {
    id: 0,
    musicdata: [],
    currentInex: 0,
    palyListSongs: [],
    // 推荐歌曲的列表
    MuisDataAll: [],
    // 当前播放的歌曲
    newdata: []
  },
  actions: {
  }
})


const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: true
})
module.exports = {
  innerAudioContext,
  playStore
}