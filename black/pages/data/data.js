Page({
  data: {
    date: '',
    region: [],
    items: [
      { name: 'CHN', value: '男' },
      { name: 'BRA', value: '女' }
    ]
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 上传头像测试
  changeAvatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var avatar = res.tempFilePaths;
        that.setData({
          avatar: avatar,
          upAvatar: true
        })
      },
      fail: function () {
        wx.showToast({
          title: '上传失败,请稍后重试!',
          icon: 'none',
        })
      },
    })
  },
  send:function(){
    wx.showToast({
      title: '保存成功',
      icon: 'success',
    })
  },
})