Page({
  data: {
    items: [
      { name: 'CHN', value: '记住密码'}
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})