const app=getApp();
Page({
  data: {
    array: ['南昌', '赣州', '武汉', '贵阳', '常德', '六安', '长沙'],
    index: 0,
    zan:"",
    // 轮播图
    imgUrls: [
      'https://img.rrcj123.com/black/img/banner.jpg',
      'https://img.rrcj123.com/black/img/gif.gif',
      'https://img.rrcj123.com/black/img/reports.jpg'
    ],
    indicatorDots: true,//是否显示指示点
    autoplay: true,//是否自动切换
    interval: 5000,//自动切换时间间隔
    duration: 1000,//滑动动画时长
    // 首页新闻列表
    index_ul:[]
  },
  onLoad:function(options){
    wx.request({
      url: getApp().url +"indexw",
      method: 'GET',
      success: (res) => {
        this.setData({
          index_ul: res.data,
        })
      },
    })
  },
  pickChange: function (e) {
    this.setData({
      index: e.detail.value
    });
  },
  ann: function (event){
    var xid = event.currentTarget.dataset.anndata1;
    var zan = event.currentTarget.dataset.anndata2+1;
    app.ann(xid, zan);
    wx.request({
      url: getApp().url+"indexw",
      method: 'GET',
      success: (res) => {
        this.setData({
          index_ul: res.data,
        })
      },
    })
  },
  onShareAppMessage: (res)=> {
    return {
      title: '精英点评小程序',
      path: 'pages/index/index',
    }
  }
})