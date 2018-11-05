Page({
  data:{
    avatar:"",
    names:"",
    flag:true,
    result:""
  },
  bindGetUserInfo: function (e) {
    var that=this
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
     that.setData({
       avatar: e.detail.userInfo.avatarUrl,
       names: e.detail.userInfo.nickName,
       flag:false
     })
     wx.showToast({
       title: '登录成功',
       icon: 'success',
     })
    } 
  },
  signout:function(){
    this.setData({
      flag:true
    })
  },
  er:function(){
    wx.scanCode({
      success: (res) => {
        wx.navigateTo({
          url: res.result,
        })
      }
    })
  },
})