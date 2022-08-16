import {myRequest} from './index'

// 热门搜索
export function getServieHot(){
  return myRequest.get("/search/hot")
}
// 搜索建议
export function getSearchSuggest(keywords){
  return myRequest.get("/search/suggest",{
    keywords,
    type:"mobile"
  })
}

export function getSearchResult(keywords){
  return myRequest.get("/cloudsearch",{
    keywords
  })
}
