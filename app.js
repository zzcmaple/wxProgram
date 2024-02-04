// app.js

App({
  globalData: {
    baseTextColor: "#303030",
    baseSelectTextColor: "	#B452CD",
    baseBgColor: "#FFAEB9",
    movieInfo: {
      movieName: "XXX",
      movieNameEn: "XXX",
      subMovieName: "XX",
      cinemaName: "XXXX",
      memberCount: "X",
      playRoom: "XX",
      seat: "XX",
      playDate: "XX",
      remark: "XX",
      director: "XX",
      movieDuration: "XX",
      movieType: "XX",
      movieStartDate: "XX",
      directorNationality: "XX",
      fileList: []
    }
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  }
})
