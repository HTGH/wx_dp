Page({
  data: {
    fans_top:"300",
    fans_ul: [],
    fans_ul2:[],
    isShow: true,
  },
  onLoad:function(){
    wx.request({
      url: getApp().url+'fans',
      method:"get",
      success:(res)=>{
        console.log(res.data)
        this.setData({
          fans_ul:res.data,
          fans_ul2: res.data.slice(10,20)
        })
      }
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
})