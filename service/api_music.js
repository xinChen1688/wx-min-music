import hyRequest from "./index"

import {myRequest} from './index'


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
export function getRanking(url){
  return myRequest.get(url)
}

 

