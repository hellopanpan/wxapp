//index.js
//获取应用实例
const app = getApp()
var url ="https://www.xpanpan.com/cross/douban/video"
Page({
  data:{
    doubanVideo: [],
    doubanVideo2: [],
    doubanMusic: [],
    doubanTime: [],
    toView: "item0",
    iftouch: false,
    touchx:0,
    touchxc:0
  },
  onLoad: function(){
    wx.showToast({
      title: 'loading...',
      icon: 'loading',
      duration: 10000
    });
    var vm = this;
    console.log("1111");
    wx.request({
      url: url,
      data:{},
      header:{
        "Content-Type":"json"
      },
      success: function(res){
        wx.hideToast();
        vm.setData({ doubanVideo: res.data[0].items });
        
        for (var i = 0; i < vm.data.doubanVideo.length ;i++) {
          vm.data.doubanVideo[i].uri = vm.changeuri(vm.data.doubanVideo[i].uri);
          console.log(vm.changeuri(vm.data.doubanVideo[i].uri));
        }; 
        vm.setData({ doubanVideo: vm.data.doubanVideo });
        vm.setData({ doubanVideo2: res.data[1].items });
      }
    });
    wx.request({
      url: "https://www.xpanpan.com/cross/douban/music",
      data: {},
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        wx.hideToast();
        vm.setData({ doubanMusic: res.data});
      }
    });
    wx.request({
      url: "https://www.xpanpan.com/cross/douban/time",
      data: {},
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        wx.hideToast();
        vm.setData({ doubanTime: res.data });
      }
    });
    
  },
  changeuri: function(val){
    var url = "https://www.douban.com/";
    var regex = /douban\:\/\/douban\.com\/(.*)/;
    val = val.replace("douban://douban.com/",url);
    return val;
  },
  touchstart: function (event) {
    this.setData({
      iftouch: true
    });
    console.log(event.touches[0].clientX);
    this.setData({
      touchx: event.touches[0].clientX
    });
  },
  touchend: function (event){
    var vm = this;
    this.setData({
      iftouch: true
    });
    console.log(event.changedTouches[0].clientX);
    this.setData({
      touchxc: event.changedTouches[0].clientX
    });
    if (this.data.touchxc > this.data.touchx) {
      console.log("true");
      var match = /item(\d)/.exec(this.data.toView);
      var num = parseInt(match[1]);
      if (num > 0) {
        num -= 1
      }
      setTimeout(function () {
        vm.setData({
          toView: "item" + num
        });
      }, 1000)
    } else {
      console.log("false");
      var match = /item(\d)/.exec(this.data.toView);
      var num = parseInt(match[1]);
      if(num < 2){
        num += 1
      }
      setTimeout(function(){
        vm.setData({
          toView: "item"+num
        });
      },1000)
      
      
    }
  }
})
