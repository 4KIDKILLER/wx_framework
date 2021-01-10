// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    height: 0
  },
  onLoad() {
    wx.getSystemInfo({
      success: (info) => {
        const {
          screenHeight,
          screenWidth,
          windowHeight,
          statusBarHeight,
          pixelRatio
        } = info;
        const px2rpx = 750 / screenWidth;
        this.setData({
          height: windowHeight*px2rpx
        });
      }
    });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindDownLoad(){
    console.log("loading");
  },
  onPullDownRefresh(){
    const obj = wx;
    obj.showNavigationBarLoading();
    setTimeout(() => {
      obj.stopPullDownRefresh();
      obj.hideNavigationBarLoading();
    }, 2000);
  }
})
