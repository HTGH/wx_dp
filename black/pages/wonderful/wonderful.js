var app = getApp()
Page({
  data: {
    array: ['南昌', '赣州', '武汉', '贵阳', '常德', '六安', '长沙'],
    index: 0,
    isShow: true,
    currentTab: 0,
    // 轮播图
    imgUrls: [
      'https://img.rrcj123.com/black/img/jx/b1.jpg',
      'https://img.rrcj123.com/black/img/jx/s81.jpg',
      'https://img.rrcj123.com/black/img/jx/b2.jpg',
      'https://img.rrcj123.com/black/img/jx/b3.jpg',
      'https://img.rrcj123.com/black/img/jx/b4.jpg',
      'https://img.rrcj123.com/black/img/jx/b5.jpg'
    ],
    indicatorDots: true,//是否显示指示点
    autoplay: true,//是否自动切换
    interval: 5000,//自动切换时间间隔
    duration: 1000,//滑动动画时长
    index_ul: [],
    index_ul2: []
  },
  onLoad: function (options) {
    wx.request({
      url: getApp().url+"jxxw",
      method: 'GET',
      success: (res) => {
        this.setData({
          index_ul: res.data,
        })
      },
    })
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  pickChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
})