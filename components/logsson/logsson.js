// components/logsson/logsson.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Array
    },
    sex:{
      type:String
    },
    data1:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
//进入分类书籍
    intoCatsBooks(e){
      wx.navigateTo({
        url: `../../pages/CatsBooks/catsbooks?index=${e.currentTarget.dataset.index}&sex=${e.currentTarget.dataset.sex}&major=${e.currentTarget.dataset.major}`,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }
})
