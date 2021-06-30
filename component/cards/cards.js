

// component/cards/cards.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },

  properties: {
    // title: {
    //   type: String,
    //   value: ""
    // },
    // userName: {
    //   type: String,
    //   value: ""
    // },
    // StartTime: {
    //   type: String,
    //   value: ""
    // },
    // applyTime: {
    //   type: Object,
    //   value: null
    // },
    // buyTime: {
    //   type: Object,
    //   value: null
    // },
    // money: {
    //   type: Object,
    //   value: null
    // },
    // count: {
    //   type: String,
    //   value: ""
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    islayout: true,
    title: null,
    userName: null,
    StartTime: null,
    applyTime: null,
    buyTime: null,
    money: null,
    count: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show_up(data) {
      console.log(data)
      this.setData({
        islayout: false,
        title: "学生额外信息",
        userName: data.userName,
        applyTime: data.pro_date,
        buyTime: data.buy_date,
        money: data.money,
        count: data.time
      })
    },

    cancelM() {
      this.setData({
        islayout: true
      })
    },

    confirmM() {
      this.setData({
        islayout: true
      })
    }
  }
})
