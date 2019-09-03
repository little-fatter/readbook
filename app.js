//app.js
const Fly = require("./lib/fly/wx.js")
const fly = new Fly
fly.config.baseURL ="https://api.zhuishushenqi.com"
App({
  onLaunch: function () {
    // 展示本地存储能力,类似vue app中的mounted
  },
  //全局变量，类似vuex
  globalData: {
    userInfo: null,
    fly:fly,
    //静态资源地址
    apis:"https://statics.zhuishushenqi.com",
    id:[]
  }
})