// components/logsson1/logsson1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data1: {
      type: Array
    },
    sex: {
      type: String
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
    intoList(e) {
      wx.navigateTo({
        url: `../../pages/List/List?id=${e.currentTarget.dataset.item}&name=${e.currentTarget.dataset.name}`,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }
})