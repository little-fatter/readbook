//index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist:[],
    apis: app.globalData.apis,
    Xshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let arr = wx.getStorageSync("id")
    let list = []
if(arr.length > 0){
  arr.map(item => {
    app.globalData.fly.get(`/book/${item}`).then(res => {
      list.push(res.data)
      if (list.length === arr.length) {
        console.log(1)
        this.setData({
          booklist: list,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  })
}else{
  this.setData({
    Xshow:true
  })
}

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
  intobook(e) {
    wx.navigateTo({
      url: `../Books/books?id=${e.currentTarget.dataset.item}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  deleteitem(e){
let id = e.currentTarget.dataset.id
    let indexs = e.currentTarget.dataset.index
let ids = wx.getStorageSync("id")
let newids = ids.filter(item =>{
  console.log(item)
  console.log(id)
  return item!==id
})
wx.setStorageSync("id", newids)
    let list = this.data.booklist.filter((item,index)=>{
      return index!==indexs
    })
this.setData({
  booklist:list
})
  },
  deletes(){
    this.setData({ Xshow : true})
  },
  cancel(){
    this.setData({ Xshow: false })
  },
  intohelp(){
    wx.navigateTo({
      url: '../Help/help',
    })
  }
})
