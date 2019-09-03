// pages/CatsBooks/catsbooks.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断全部是否显示红色
    flag:true,
    //判断哪类显示红色
    num:0,
    apis: app.globalData.apis,
    minor: {},
    typelist: [{
        id: "hot",
        name: "热门"
      },
      {
        id: "new",
        name: "新书"
      },
      {
        id: "reputation",
        name: "好评"
      },
      {
        id: "over",
        name: "完结"
      },
      {
        id: "monthly",
        name: "VIP"
      }
    ],
    //点击性别分类
    sex: "",
    //点击项大类
    major: "",
    //点击项的下标，对应小项的下标
    index: "",
    //大类数据
    majorlist: [],
    //当前点击项的种类
    type: "hot"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.major,
    })
    if (options.sex === "男生") {
      console.log(options)
      this.setData({
        sex: "male",
        index: options.index,
        major: options.major
      })
    } else if (options.sex === "女生") {
      this.setData({
        sex: "female",
        index: options.index,
        major: options.major
      })
    } else {
      this.setData({
        sex: "press",
        index: options.index,
        major: options.major
      })
    }
    this.getMajor()
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
  //获取大类及小类名
  getMajor() {
    //小类名
    app.globalData.fly.get("/cats/lv2").then(res => {
      if (res) {
        this.setData({
          minor: res.data
        })
        //大类
        app.globalData.fly.get(`/book/by-categories?gender=${this.data.sex}&type=${this.data.type}&major=${this.data.major}&start=0&limit=20`).then(res => {
          if (res) {
            this.setData({
              majorlist: res.data.books
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //点击获取小类
  getminor(e) {
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.sex}&type=${this.data.type}&major=${this.data.major}&minor=${e.currentTarget.dataset.minor}&start=0&limit=20`)
      .then(res => {
        if (res) {
          this.setData({
            majorlist: res.data.books,
            flag:false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //种类更换
  getnewMajor(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
      flag:true,
      num: e.currentTarget.dataset.index
    })
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.sex}&type=${e.currentTarget.dataset.type}&major=${this.data.major}&start=0&limit=20`).then(res => {
      if (res) {
        console.log(res.data)
        this.setData({
          majorlist: res.data.books
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //进入书本详情
  intobook(e) {
    wx.navigateTo({
      url: `../Books/books?id=${e.currentTarget.dataset.item}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  clickall(){
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.sex}&type=${this.data.type}&major=${this.data.major}&start=0&limit=20`).then(res => {
      if (res) {
        this.setData({
          majorlist: res.data.books,
          flag:true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})