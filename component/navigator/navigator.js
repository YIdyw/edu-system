// component/navigator/navigator.js

var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '乐学小优'
    },
    back: {
      type: Boolean,
      value: true
    },
    home: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.time.statusBarHeight,
    navigationBarHeight: (app.time.statusBarHeight + 44),
    globalData:app.time.statusBarHeight, //状态栏高度,
    globalDatas:app.nav.height + (app.nav.top - app.time.statusBarHeight)*2 + app.nav.top - app.time.statusBarHeight, //导航栏高度
    globalDatassh: app.nav.height, //胶囊高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backHome: function () {
      let pages = getCurrentPages()
            wx.navigateBack({
              delta: pages.length
            })
          },

    back() {
            wx.navigateBack({
              delta: 1
            })
      }
  }
})
