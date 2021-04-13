Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    coordinate: '',
    qq: '',
    wechat: '',
    phone: '',
    contactidex: 0,
    contactarray: ['手机', '微信', 'QQ'],
    description: '',
    parkingtype: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  contactChangeEvent: function (e) {
    console.log('picker联系方式改变')
    console.log(e.detail.value)
    this.setData({
      contactidex: e.detail.value
    })
  },
  contactinput: function (e) {
    var value = e.detail.value
    var idex = this.data.contactidex
    console.log('输入联系方式')
    if (idex == 0) {
      this.setData({
        phone: value
      })
    }
    if (idex == 1) {
      this.setData({
        wechat: value
      })
    }
    if (idex == 2) {
      this.setData({
        qq: value
      })
    }
  },
  addressinput: function (e) {
    var value = e.detail.value;
    console.log('输入车位地址');
    this.setData({
      address: value
    })
  },
  rentinput: function (e) {
    var value = e.detail.value;
    console.log('输入租金');
    this.setData({
      rent: value
    })
  },
  descriptioninput: function (e) {
    var value = e.detail.value;
    console.log('输入车位描述');
    this.setData({
      description: value
    })
  },
  radiochange: function (e) {
    var value = e.detail.value;
    console.log('选择车位类型');
    console.log(value);
    this.setData({
      parkingtype: value
    })
  },
 /* bindstarttimechange: function (e) {
    var value = e.detail.value;
    console.log('选择开始时间');
    console.log(value);
    this.setData({
      starttime: value
    })
  },
  bindendtimechange: function (e) {
    var value = e.detail.value;
    console.log('选择结束时间');
    console.log(value);
    this.setData({
      endtime: value
    })
  },*/




  formSubmit: function (e) {
    /*提交表单内容*/
    console.log('提交表单数据')
    console.log(e.detail)
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