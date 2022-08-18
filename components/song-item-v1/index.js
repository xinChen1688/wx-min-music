// components/song-item-v1/index.js
import {
  goUrlData
} from "../../utils/funAll"

Component({
  properties: {
    item: {
      type: Object
    }
  },
  data: {

  },
  methods: {
    gotoMusicPaly() { 
      let datas = goUrlData(this.properties.item)
      wx.navigateTo({
        url: `../../pages/music-paly/index?datas=${datas}`,
      })
    }
  }
})