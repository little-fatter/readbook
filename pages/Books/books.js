// pages/Books/books.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    mulu:[],
    show:true,
    //书籍id
id:"",
//书籍详情
books:{},
//相关书籍
    relatedRecommendedBooks:[],
    //静态资源根目录
    apis: app.globalData.apis,
    //截取的相关书籍
    otherbooks:[],
    //短评
    shortReviews:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getbook()
    this.getshortReviews()
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
    if(arr.includes(this.data.id)){
      this.setData({
        flag:true
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
  //获取书籍详情
getbook(){
  app.globalData.fly.get(`/book/${this.data.id}`).then(res => {
    if (res) {
      this.setData({
        books: res.data
      })
    }
  }).catch(err => { console.log(err) })
  app.globalData.fly.get(`/book/${this.data.id}/recommend`).then(res =>{
   if(res){
     this.setData({
       relatedRecommendedBooks: res.data.books,
otherbooks: res.data.books.slice(0,3)
     })
   }
    }).catch(err =>{console.log(err)})
},
//打乱数组
  changelookbook(){
    let length = this.data.relatedRecommendedBooks.length
    for(let i = 0;i<length;i++){
      let x = Math.floor(Math.random()*length)
      let y = Math.floor(Math.random() * length)
      let temp = this.data.relatedRecommendedBooks[x]
      this.data.relatedRecommendedBooks[x] = this.data.relatedRecommendedBooks[y]
      this.data.relatedRecommendedBooks[y] = temp
    }
    this.setData({
      otherbooks: this.data.relatedRecommendedBooks.slice(0,3)
    })
  },
  //获取短评
  getshortReviews(){
    app.globalData.fly.get(`/post/short-review?book=${this.data.id}&total=true&sortType=newest`).then(res =>{
      if(res){
        this.setData({
          shortReviews: res.data
        })
      }
    }).catch(err =>{
      console.log(err)
    })
  },
  reading(e){
   wx.navigateTo({
     url: `../Chapters/chapters?id=${e.currentTarget.dataset.item}&title=${this.data.books.title}`,
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
  },
  addbookstore(e){
    this.setData({
      flag:true
    })
    let arr = wx.getStorageSync("id")
    if(!arr){
      arr = []
      arr.push(e.currentTarget.dataset.item)
      wx.setStorageSync("id", arr)
    }else {
      arr.includes(e.currentTarget.dataset.item) ? console.log("已存在") : arr.push(e.currentTarget.dataset.item)
      wx.setStorageSync("id", arr)
    }
  }
})