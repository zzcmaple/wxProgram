// pages/design/design.js
import moment from 'moment'
import wxml2canvas from 'wxml2canvas';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    height: 0,
    movieInfo: {},
    viewingDate: "",
    url: ""
  },
  toEdit () {
    wx.navigateTo({
      url: `../editDesign/editDesign?movieInfo=${JSON.stringify(this.data.movieInfo)}`,
    })
  },
  drawCanvas() {
    wx.showLoading({
      title: "生成图片中.."
    })
    const that = this
    const query = wx.createSelectorQuery().in(this);
    query.select('.design_center').fields({ // 选择需要生成canvas的范围
        size: true,
        dataset: true,
        scrollOffset: true
    }, data => {
        let width = data.width;
        let height = data.height;
        that.setData({
            width,
            height
        })
        setTimeout(() => {
          console.log(width, height)
          that.startDraw()
        }, 1500);
   }).exec()
  },
  startDraw() {
    let that = this
    console.log(that.data)
    // 创建wxml2canvas对象
    let drawMyImage = new wxml2canvas({
      element: 'canvas', // canvas的id,
      obj: that, // 传入当前组件的this
      width: that.data.width,
      height: that.data.height,
      background: 'transparent',
      progress(percent) { // 进度
        // console.log(percent);
      },
      finish(url) { // 生成的图片
        wx.hideLoading()
        that.setData({
          url: url
        })
        that.savePoster(url)
      },
      error(res) { // 失败原因
        console.log(res);
        wx.hideLoading()
      }
    }, this);
    let data = {
        // 获取wxml数据
        list: [{
            type: 'wxml',
            class: '.design_center .draw_class',  // draw要绘制的wxml元素根类名， draw1单个元素的类名（所有所有所有要绘制的单个元素都要添加该类名）
            limit: '.design_center', // 要绘制的wxml元素根根根类名
            x: 0,
            y: 0
        }]
    }
    // 绘制canvas

    drawMyImage.draw(data, this)
  },
  savePoster() {
    const that = this
    wx.saveImageToPhotosAlbum({
        filePath: that.data.url,
        success: function() {
            wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 1500
            });
        },
        fail(err) {
          if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
            wx.showModal({
              title: '提示',
              content: '需要您授权保存相册',
              showCancel: false,
              success: modalSuccess => {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.saveImageToPhotosAlbum({
                            filePath: that.data.url,
                            success: function () {
                              wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                              })
                            },
                        })
                    } else {
                        wx.showToast({
                            title: '授权失败，请稍后重新获取',
                            icon: 'none',
                            duration: 1500
                        });
                    }
                  }
                })
              }
            })
          }
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const movieInfo = getApp().globalData.movieInfo
    this.setData({
      movieInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})