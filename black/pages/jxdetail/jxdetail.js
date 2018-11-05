var jxid;
var bt;
Page({
  data: {
    jxdetail:[]
  },
  onLoad: function (options) {
    jxid=options.jxid;
    bt=options.bt;
    wx.request({
      url: getApp().url+'jxdetail?jxid='+jxid,
      method:"get",
      success: (res) => {
        res.data[0].bt=bt;
        this.setData({
          jxdetail: res.data,
        })
        console.log(this.data.jxdetail)
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})