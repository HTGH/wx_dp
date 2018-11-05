Page({
  data: {
    
  },
  bm:function(){
    wx.showToast({
      title: '报名成功',
    })
    setTimeout(
      function(){
      wx.switchTab({
        url: '/pages/index/index',
        })
      }
      ,1000)
  }
})