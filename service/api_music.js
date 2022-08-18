import hyRequest from "./index"

import {
  myRequest
} from './index'


// 网易云接口

// 轮播图请求
export function getBanners() {
  return hyRequest.get("/banner", {
    type: 2
  })
}

// 歌单请求
export function getsongMenu(cat = "全部", limit = 6, offset = 0) {
  return hyRequest.get("/top/playlist", {
    cat,
    limit,
    offset
  })
}

// 榜单请求
export function getRanking(url) {
  return myRequest.get(url)
}



export function getMusicContainer(id = 1970559924) {
  return hyRequest.get('/lyric', {
    id
  }).then(res => {
    let lyricString = res.data.lrc.lyric
    lyricString = lyricString.split("\n")
    let test = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
    let lyricINfo = []
    for (const iterator of lyricString) {
      const timeAll = test.exec(iterator)
      if (!timeAll) continue
      const hour = timeAll[1] * 60 * 1000
      const minute = timeAll[2] * 1000
      const second = timeAll[3].length === 2 ? timeAll[3] * 10 : timeAll[3] * 1
      const timer = (hour + minute + second)
      const text = iterator.replace(timeAll[0], '')
      lyricINfo.push({
        timer,
        text
      })

       
    } 
    return lyricINfo
  })
}