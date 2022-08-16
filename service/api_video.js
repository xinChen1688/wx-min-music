import hyRequest from "./index"

export function getTopMV(offset,limit=10){
  return hyRequest.get('/top/mv',{offset,limit})
}

// 发送网络请求mv的播放
export function getMVRUL(id){
  return hyRequest.get('/mv/url',{id})
}

// 发送网络请求mv详细数据
export function getDataiVideo(mvid){
  return hyRequest.get('/mv/detail',{mvid})
}

// 发送网络请求mv相关信息
export function getRelatedMV(id){
  return hyRequest.get('/related/allvideo',{id})
}
