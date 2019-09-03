// pages/Search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconColor: [
      '#ffc0cb', '#7b68ee', '#ff69b4', '#66cdaa', '#fa8072', '#228b22'],
    value: "",
    //热搜词
    hotwords: [],
    //截取后的热搜词
    newhotword: [],
    searchbook:[],
    flag:true,
    apis: app.globalData.apis,
    history:wx.getStorageSync("history")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotword()
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
  //获取热搜词
  gethotword() {
    app.globalData.fly.get("/book/hot-word")
      .then(res => {
        this.setData({
          hotwords: res.data.newHotWords,
          newhotword: res.data.newHotWords.slice(0, 6)
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  //打乱数组
  confusion(){
    const length = this.data.hotwords.length
    for (let i = 0; i < length; ++i) {
      let x = Math.floor(Math.random() * length)
      let y = Math.floor(Math.random() * length)
      let temp = this.data.hotwords[x]
      this.data.hotwords[x] = this.data.hotwords[y]
      this.data.hotwords[y] = temp
    }
    this.setData({
      newhotword: this.data.hotwords.slice(0,6)
    })
  },
  //搜索书籍
  searchbook(e){
     app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${e.detail}`).then(res =>{

       if (res.data.books.length > 0) {
         this.setData({
           searchbook: res.data.books,
         flag:false
         })
         } 
    }).catch(err =>{
      console.log(err)
    })
    let arr = wx.getStorageSync("history")
    console.log(e.detail)
    console.log(arr)
    if (!arr) {
      arr = []
      arr.push(e.detail)
      this.setData({
        history:arr
      })
      wx.setStorageSync("history", arr)
    } else {
      arr.includes(e.detail) ? console.log("已存在") : arr.push(e.detail)
      this.setData({
        history: arr
      })
      wx.setStorageSync("history", arr)
    }
  },
  cancels(e){
    this.setData({
      searchbook: [],
      flag: true
    })
  },
  //进入书本详情
  intobook(e) {
    wx.navigateTo({
      url: `../Books/books?id=${e.currentTarget.dataset.item}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  clearhistory(){
    this.setData({
      history:[]
    })
    wx.removeStorage({
      key: 'history',
      success: function(res) {},
    })
  },
  clickhistory(e){
this.setData({
  value:e.currentTarget.dataset.item
})
  }
})