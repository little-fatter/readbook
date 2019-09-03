// pages/List/List.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    lists: [],
    apis: app.globalData.apis,
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    this.setData({
      id: options.id,
      name: options.name
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getList() {
    app.globalData.fly.get(`/ranking/${this.data.id}`).then(res => {
      if (res) {
        this.setData({
          lists: res.data.ranking.books
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  intobook(e) {
    wx.navigateTo({
      url: `../Books/books?id=${e.currentTarget.dataset.item}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})