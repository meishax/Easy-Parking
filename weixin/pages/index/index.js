//index.js
//获取应用实例
let app = getApp();
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
let Myamap = require("../../libs/amap-wx.js");
let markersData = [];
Page({
  data: {
    screenSize: {},
    price: '0',
    markers: [],
    remaining: [4, 6],
    latitude: '',
    longitude: '',
    location: "",
    textData: {},
    city: '',
    markerId: 0,
    keywords: '',
    controls: [
      {
        id: 0,
        position: {
          left: 10,
          top: 200,
          width: 40,
          height: 40
        },
        iconPath: "/images/circle1.png",
        clickable: true
      }, {
        id: 3,
        position: {
          left: 240,
          top: 425,
          width: 65,
          height: 32.5
        },
        iconPath: "/images/rent1.png",
        clickable: true
      },
      {
        id: 2,
        position: {
          left: 307,
          top: 425,
          width: 65,
          height: 32.5
        },
        iconPath: "/images/rent2.png",
        clickable: true
      }
    ]
  },

  getWindowsSize: function () {
    var that = this;
    let size = {};
    size.height = wx.getSystemInfoSync().screenHeight
    size.width = wx.getSystemInfoSync().screenWidth
    console.log(size);
    that.setData({
      sreenSize: size
    })
    console.log(that.data.screenSize)
  },
  setControls: function () {
    var that = this;
    var width = wx.getSystemInfoSync().screenWidth;
    var height = wx.getSystemInfoSync().screenHeight;
    that.setData({
      controls: [
        {
          id: 0,
          position: {
            left: width / 32,
            top: height / 2.85,
            width: 40,
            height: 40
          },
          iconPath: "/images/circle1.png",
          clickable: true
        }, {
          id: 3,
          position: {
            left: width - 75 - 10 - 65,
            top: height - 265,
            width: 65,
            height: 32.5
          },
          iconPath: "/images/rent1.png",
          clickable: true
        },
        {
          id: 2,
          position: {
            left: width - 75,
            top: height - 265,
            width: 65,
            height: 32.5
          },
          iconPath: "/images/rent2.png",
          clickable: true
        },
        {
          id: 4,
          position: {
            left: width - 80,
            top: height - 320,
            width: 75,
            height: 40
          },
          iconPath: "/images/znxc.png",
          clickable: true
        }
      ]

    })
    //   console.log(width+'233')
  },
  onLoad: function () {
    var that = this;
    that.getWindowsSize();
    console.log(that.data.screenSize)
    that.setControls();
    amap.getRegeo()
      .then(d => {
        console.log(d);
        let { name, desc, latitude, longitude } = d[0];
        let { city } = d[0].regeocodeData.addressComponent;
        this.setData({
          city,
          latitude,
          longitude,
          textData: { name, desc },
        })
        /* console.log('here is '+this.data.longitude);
         console.log('here is '+this.data.longitude+','+this.data.latitude)*/
      })
      .catch(e => {
        console.log(e);
        /*  console.log('sorry');*/
      })
    amap.getPoiAround('停車場').then(d => {
      markersData = d.markers;
      markersData.forEach((item, index) => {
        if (index % 4 == 0 && index != 0) item.iconPath = "/images/marker_yellow.png";
        else item.iconPath = "/images/marker.png";
      })
      that.setData({
        markers: markersData
      });
      /* that.setData({
         latitude: markersData[0].latitude
       });
       that.setData({
         longitude: markersData[0].longitude
       });*/
      that.showMarkerInfo(markersData[0]);
      that.changeMarkerColor(0);
      /* that.changeMarkerToYellow();*/

    }).catch(e => {

      console.log(e);
    })
  },
  onShow: function () {
    var that = this;
    var longitude = this.data.longitude;
    var latitude = this.data.latitude;
    this.setData({
      location: this.data.longitude + ',' + this.data.latitude
    })
    /*   console.log('onshow '+this.data.longitude);
       console.log(this.data.location);*/
    var myMap = new Myamap.AMapWX({ key: '694cfcf93b2ddc2bfae3556f3f30c2b9' });
    if (this.data.longitude) {
      myMap.getPoiAround({
        querykeywords: '停车场',
        querytypes: '150904',
        location: this.data.location,
        success: function (d) {
          markersData = d.markers;
          markersData.forEach((item, index) => {
            if (index % 4 == 0 && index != 0) item.iconPath = "/images/marker_yellow.png";
            else item.iconPath = "/images/marker.png";
          })
          that.setData({
            markers: markersData
          });
          that.setData({
            latitude: markersData[0].latitude
          });
          that.setData({
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData[0]);
          that.changeMarkerColor(0);
          /*   that.changeMarkerToYellow();*/
          /*  console.log('yyy');*/
        },
        fail: function (info) {
          /*  console.log('mmm');*/
          console.log(info)
        }

      })
    }
    /* console.log(this.data.longitude);
     amap.getPoiAround('停車場').then(d => {
       markersData = d.markers;
       markersData.forEach(item => {
         item.iconPath = "/images/marker.png";
       })
       that.setData({
         markers: markersData
       });
       that.setData({
         latitude: markersData[0].latitude
       });
       that.setData({
         longitude: markersData[0].longitude
       });
       that.showMarkerInfo(markersData[0]);
       that.changeMarkerColor(0);
       console.log(markersData[0].longitude);
       console.log('uyy')

     }).catch(e => {

       console.log(e);
     })*/
  },
  bindInput() {
    let { latitude, longitude, city } = this.data;
    let url = `/pages/inputtip/inputtip?city=${city}&lonlat=${longitude},${latitude}`;
    wx.navigateTo({ url });
    /* let mpCtx = wx.createMapContext("map");
     mpCtx.openToLocation(markersData[0].latitude, markersData[0].longditude);*/
  },
  makertap(e) {
    // console.log(e);
    let { markerId } = e;
    let { markers } = this.data;
    let marker = markers[markerId];
    // console.log(marker);
    this.showMarkerInfo(marker);
    this.changeMarkerColor(markerId);
  },
  showMarkerInfo(data) {
    let { name, address: desc } = data;
    this.setData({
      textData: { name, desc }
    })
  },
  changeMarkerColor(markerId) {
    let { markers } = this.data;
    markers.forEach((item, index) => {
      item.iconPath = "/images/marker.png";
      if (index == markerId) item.iconPath = "/images/marker_checked.png";
    })
    this.setData({ markers, markerId });
  },
  /* changeMarkerToYellow(){
     let {markers} = this.data;
     markers.forEach((item,index) => {
       if (index % 4 == 0&&index!=0) item.iconPath = "/images/marker_yellow.png"
     })
     this.setData({ markers});
   },*/
  getRoute() {
    // 起点
    let { latitude, longitude, markers, markerId, city, textData } = this.data;
    let { name, desc } = textData;
    if (!markers.length) return;
    // 终点
    let { latitude: latitude2, longitude: longitude2 } = markers[markerId];
    /* wx.navigateTo({ url });*/
    wx.openLocation({
      latitude: +latitude2,
      longitude: +longitude2,
      name,
      address: desc
    });
  },
  clickcontrol(e) {
    if (e.controlId == 0) {
      console.log("回到用户当前定位点");
      let { controlId } = e;
      let mpCtx = wx.createMapContext("map");
      mpCtx.moveToLocation();
    }
    if (e.controlId == 1) {
      let url = "/pages/form/form";
      wx.navigateTo({
        url
      })
      this.setData({
        controls: [
          {
            id: 0,
            position: {
              left: 10,
              top: 200,
              width: 40,
              height: 40
            },
            iconPath: "/images/circle1.png",
            clickable: true
          },
          {
            id: 1,
            position: {
              left: 325,
              top: 200,
              width: 40,
              height: 40
            },
            iconPath: "/images/circle2.png",
            clickable: true
          }, {
            id: 2,
            position: {
              left: 100,
              top: 200,
              width: 40,
              height: 40
            },
            iconPath: "/images/circle1.png",
            clickable: true
          },
          {
            id: 3,
            position: {
              left: 200,
              top: 200,
              width: 40,
              height: 40
            },
            iconPath: "/images/circle2.png",
            clickable: true
          }
        ]
      })
    }
    if (e.controlId == 2) {
      let url = "/pages/form1/form1";
      wx.navigateTo({
        url
      })
    }
    if (e.controlId == 3) {
      let url = "/pages/form2/form2";
      wx.navigateTo({
        url
      })
    }
    if (e.controlId == 4) {
      let url = "/pages/nav/nav";
      wx.navigateTo({
        url
      })
    }

  },
  mapchange() {
    // console.log("改变视野");
  }
})
