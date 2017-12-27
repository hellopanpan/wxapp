Page({
  data: {
    toView: 'red',
    inputValue:"",
    showselec: false,
    selectext:"电影",
    doubanData:[],
    q:"1002"
  },
  onLoad: function(){
    this.search();
  },
  search: function(){
    var vm =  this;
    if (vm.data.inputValue === ""){
      vm.data.inputValue = "周"
    }
    wx.showToast({
      title: 'loading...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: "https://www.xpanpan.com/cross/douban/video/search?q=" + vm.data.inputValue+"&cat="+vm.data.q,
      data: {},
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        wx.hideToast();
        var redata = res.data;
        for (var i = 0; i < redata.length;i++){
          redata[i].picsrc = "https://www.xpanpan.com/" + redata[i].picsrc;
          console.log(redata[i].picsrc);
        };
        vm.setData({
          doubanData: redata
        })
      }
    });
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  showselection: function(){
    console.log("222");
    this.setData({
      showselec: !this.data.showselec
    })
  },
  chooseMe: function(event){
    var testId = event.currentTarget.dataset.testid;
    console.log(testId);
    if(testId === "movie"){
      this.setData({
        selectext: "电影"
      });
      this.setData({
        q: "1002"
      })
    }else if(testId === "music"){
      this.setData({
        selectext: "音乐"
      });
      this.setData({
        q: "1003"
      })
    } else if (testId === "book") {
      this.setData({
        selectext: "读书"
      });
      this.setData({
        q: "1001"
      })
    };
    this.setData({
      showselec: false
    })
  },
  hideselec: function(){
    this.setData({
      showselec: false
    })
  }
})