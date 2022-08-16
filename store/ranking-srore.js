import {
  HYEventStore
} from 'hy-event-store'


import {
  getBanners
} from "../service/api_music"


const rankingStore = new HYEventStore({
  state: {
    hotRanking: {}
  },
  actions: {
    getbanner(ctx) {
      getBanners().then(res => { 
        ctx.hotRanking = res.data.banners
      })
    }
  }
})

export {
  rankingStore
}