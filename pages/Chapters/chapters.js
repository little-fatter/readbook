// pages/Chapters/chapters.js
const app =getApp()
let WxParse = require('../../images/wxParse/wxParse.js')
Page({
  wxParseData: '',
  /**
   * 页面的初始数据
   */
  data: {
id:"",
chapterstitle:[],
chapters:{},
index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
this.setData({
  id:options.id
}),
app.globalData.fly.get(`/mix-atoc/${options.id}?view=chapters`)
.then(res =>{
  if(res){
    this.setData({
      chapterstitle: res.data.mixToc.chapters
    }),
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(res.data.mixToc.chapters[this.data.index].link)}`).then(res =>{
        if(res){
          this.setData({
            chapters:res.data.chapter,
            wxParseData:res.data.chapter.body
          })
        }
        console.log(this.data.chapters)
      let article = this.data.chapters.body;
      WxParse.wxParse('article', 'md', article, this, 20);
      }).catch(err =>{
        console.log(err)
      })
  }
})
.catch(err =>{
  console.log(err)
})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addindex(){
this.setData({
  index:this.data.index+1
})
    app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(this.data.chapterstitle[this.data.index].link)}`).then(res => {
      if (res) {
        this.setData({
          chapters: res.data.chapter
        })

      }
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  lessindex() {
    if(this.data.index > 0){
      this.setData({
        index: this.data.index - 1
      })
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(this.data.chapterstitle[this.data.index].link)}`).then(res => {
        if (res) {
          this.setData({
            chapters: res.data.chapter
          })

        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})