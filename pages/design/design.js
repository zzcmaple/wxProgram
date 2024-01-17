// pages/design/design.js
import { request } from '../../utils/request'
import moment from 'moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 550,
    movieInfo: {
      movieName: "",
      subMovieName: "",
      cinemaName: "",
      memberCount: "",
      playRoom: "",
      seat: "",
      playDate: "",
      remark: "",
      fileList: []
    },
    viewingDate: ""
  },
  toEdit () {
    wx.navigateTo({
      url: '../editDesign/editDesign?movieInfo=${this.data.movieInfo}',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (getApp().globalData.movieInfo) {
      this.setData({
        movieInfo: getApp().globalData.movieInfo,
        viewingDate:  getApp().globalData.movieInfo.playDate ? moment(getApp().globalData.movieInfo.playDate).format('YYYY/MM/DD') : ""
      })
    }
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