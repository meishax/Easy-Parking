let amap = require("../../utils/amap");
var mapCtx;
var centerLongitude, centerLatitude, windowWidth, windowHeight,centerlonlat
Page({

  /*初始数据*/
  data:{
    latitude: '',
    longitude: '',
    controls: []
  },
  onLoad: function () {
    var that = this;
    this.mapCtx = wx.createMapContext('Mymap');
    amap.getRegeo()
      .then(d => {
        let { name, desc, latitude, longitude } = d[0];
        let { city } = d[0].regeocodeData.addressComponent;
        this.setData({
          city,
          latitude,
          longitude,
          textData: { name, desc },
        })
      })
      .catch(e => {
        console.log(e);
        console.log('sorry');
        })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          controls: [{
            id: 0,
            iconPath: '../../images/location.png',
            position: {
              left: (res.windowWidth - 46) / 2,
              top: 560,
              width: 100,
              height: 30
            },
            clickable: true
          },{
            id: 1,
            iconPath: '../../images/location.png',
            position: {
              left: (res.windowWidth-46) / 2,
              top: (res.windowHeight-2) / 2-16,
              width: 30,
              height: 30
            },
            clickable: false
          }]
        })
      }
    })
  },
  onShow:function(){},
    getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
       this.setData({
         longitude:res.longitude,
         latitude:res.latitude
       })
        centerlonlat = { centerLongitude, centerLatitude}
        console.log("中心点坐标" + centerLatitude)
        console.log("中心点坐标" + centerLongitude)
        console.log("中心点坐标" + centerlonlat)
      }
    })
  },
  clickcontrol(e) {
    if (e.controlId == 0) {
      this.getCerterLocation();
      console.log("确定坐标点"+centerlonlat);
      let url = `/pages/form1/form1?coordinate=${longitude},${latitude}`;
      wx.navigateTo({ url });
    }}
    
})