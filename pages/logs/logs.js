//logs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页分类数据
    datalist:{},
     //首页排行数据
     datalist1:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中。。。',
    }),
    this.ajax(),
      this.ajax1()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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
    wx.showNavigationBarLoading()
    let times = setTimeout(()=>{
      wx.hideNavigationBarLoading()
    },1000)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("shangla")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //获取分类数据
 ajax(){
   app.globalData.fly.get("/cats/lv2/statistics").then(res =>{
    this.setData({
      datalist:res.data
    })
   }).catch(err =>{
       console.log(err)
   })
 },
 //获取排行数据
ajax1(){
  app.globalData.fly.get("/ranking/gender").then(res =>{
    this.setData({
      datalist1: res.data
    })
  }).catch(err =>{
    console.log(err)
  })
}
})
