// 在需要加载html内容的页面对应的js文件里引入wxParse
var WxParse = require('../../wxParse/wxParse.js');
// 引入全局变量
var pno =1;
var pageCount;
var xid;
Page({
  data:{
    array: ['南昌', '赣州', '武汉', '贵阳', '常德', '六安', '长沙'],
    index: 0,
    zan:"",
    // 内容列表
    details:[],
    //评论列表
    comment_ul:[],
    content:"",
    // 返回顶部
    showGoTop: false
  },
  onLoad: function (options) {
    pno = 1;
    xid=options.xid;
    var that=this;
    this.setData({
      zan:options.zan
    })
    //评论
    wx.request({
      url: getApp().url+"cri?pno=" + pno+ "&xid=" + xid,
      method: 'GET',
      success: (res) => {
        pageCount = res.data.pageCount;
        var that = this;
        this.setData({
        comment_ul:res.data.data
        })
      },
    })
    wx.request({
      url: getApp().url+'xwdetail?xid='+options.xid,
      method:'get',
      success:(res)=>{
        this.setData({
          details: res.data
        })
      },
    })
  },
//页面上拉触底事件的处理函数
  onReachBottom: function (options) {
    pno += 1;
    if (pno > pageCount) {
      var art = "<view class='no_comment'>没有更多评论</view>";
      var that = this;
      WxParse.wxParse('art', 'html', art, that, 5);
    }
    else {
    // 显示加载图标
      var time = new Date().getTime();
      do{
        var time2 = new Date().getTime();
        wx.showLoading({ title: '玩命加载中'})
      }while(time2-time<8);
        wx.request({
          url: getApp().url+"cri?pno=" + pno + "&xid=" + xid,
          method: "GET",
          // 请求头部
          header: {
            'content-type': 'application/text'
          },
          success: (res) => {
            // 设置数据
            var that=this;
            this.setData({
              comment_ul: that.data.comment_ul.concat(res.data.data)
          })
          // 隐藏加载框
          wx.hideLoading();
        }
      })
    }
    
  },
  onShareAppMessage: function () {
    return {
      title: '精英点评小程序'
    }
  },
  //获取input
  criinput:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  // 添加评论
  send:function(){
    if (!this.data.content){
      wx.showToast({ title: "不能为空!" ,icon:'none'})
    }
    else{
    wx.request({
      url: getApp().url+"add?&content=" + this.data.content + "&xid=" + xid,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: (res) => {
        wx.showToast({title: res.data.msg})
      }
    })
    }
    this.setData({
      content: ""
    })
  },
  // 返回顶部js
  handletouchmove: function () {
    this.queryMultipleNodes();
  },
  //获取屏幕滚动出去的高度//声明节点查询的方法
  queryMultipleNodes: function () {
    var self = this;
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#container').boundingClientRect()//选择Id=container的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()//获取页面滑动位置的查询请求
    query.exec(function (res) {
      res[0].top       // 节点的上边界坐标
      //如果顶部的距离超过300   就显示GoTop按钮
      if (res[0].top < -300) {
        self.setData({
          showGoTop: true
        })
      }
      else {
        self.setData({
          showGoTop: false
        })
      }
    })
  },
  //返回顶部
  backToTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 400
    });
    this.setData({
      showGoTop: false
    })
  }
})