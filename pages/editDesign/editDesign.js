// pages/editDesign/editDesign.js
const moment = require('moment')
import Toast from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: {},
    currentDate: new Date().getTime(),
    datePopupShow: false,
    selectTimeType: ""
  },
  showDatePopup (e) {
    this.setData({
      datePopupShow: true,
      selectTimeType: e.currentTarget.dataset.name
    })
  },
  closeDatePopup () {
    this.setData({
      datePopupShow: false
    })
  },
  confirmDate (e) {
    const formatType = this.data.selectTimeType === 'movieInfo.movieStartDate' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
    console.log(e)
    this.setData({
      [this.data.selectTimeType]: moment(e.detail).format(formatType)
    })
    this.closeDatePopup();
  },
  async uploadToCloud(event) {
    const { file } = event.detail;
    wx.cloud.init();
    if (!file.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = file.map((fileItem, index) => this.uploadFilePromise(`my-photo${new Date().getTime() + index}.png`, fileItem));
      
      try {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        });
        const res = await Promise.all(uploadTasks);
        wx.showToast({ title: '上传成功', icon: 'none' });
        console.log(res)
        const newFileList = res.map(item => ({ url: item.tempFileURL }));
        const fileList = [...this.data.movieInfo.fileList, ...newFileList]
        
        this.setData({"movieInfo.fileList": fileList });
      } catch(error) {
        wx.showToast({ title: '上传失败', icon: 'none' });
      } finally {
        Toast.clear()
      }
    }
  },
  async uploadFilePromise(fileName, chooseResult) {
    const file = await wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    })
    
    const res = await wx.cloud.getTempFileURL({
      fileList: [file.fileID]
    })
    return res.fileList[0]
  },
  saveMovieInfo () {
    getApp().globalData.movieInfo = this.data.movieInfo
    wx.switchTab({
      url: '/pages/design/design',
      success () {
        const page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
  onChange (e) {
    const field = e.currentTarget.dataset.name
    this.setData({
      [field]: e.detail
    })
  },
  deleteImage (e) {
    const fileList = this.data.movieInfo.fileList.filter((item, index) => index !== e.detail.index)
    this.setData({
      "movieInfo.fileList": fileList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (!options.movieInfo) return
    const movieInfo = JSON.parse(options.movieInfo)
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