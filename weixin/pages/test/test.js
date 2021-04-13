// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:0
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  inputUserId:function(e){
    var that = this;
    that.setData({
      userId: parseInt(e.detail.value)
    })
    console.log(e.detail.value)
  },

  /**
   * 测试无参
   */

  test1:function(){
    wx.request({
      url: 'http://localhost:8080/webPractise/GetAllUser',
      method:"POST",

      success: function (res) {
        console.log(res)
      },
      fail: function (e) {
        console.log(e)
      }
    })

  },

    /**
   * 测试含参
   */

  test2: function () {
    var that = this
    wx.request({
      url: 'http://localhost:8080/webPractise/SearchUserById',
      method: "POST",
      data:{
        id:that.data.userId
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (e) {
        console.log(e)
      }
    })

  }
})