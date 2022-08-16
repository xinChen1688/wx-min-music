import {myRequest} from './index'

export function getMusicPlay(ids){
  return myRequest.get('/song/detail',{ids})
} 