// pages/editDesign/editDesign.js
const moment = require('moment')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieName: "",
    subMovieName: "",
    cinemaName: "",
    memberCount: "",
    playRoom: "",
    seat: "",
    playDate: "",
    remark: "",
    fileList: [],
    currentDate: new Date().getTime(),
    datePopupShow: false
  },
  showDatePopup () {
    this.setData({
      datePopupShow: true
    })
  },
  closeDatePopup () {
    this.setData({
      datePopupShow: false
    })
  },
  confirmDate (e) {
    this.setData({
      playDate: moment(e.detail).format('YYYY-MM-DD HH:mm:ss')
    })
    this.closeDatePopup();
  },
  async uploadToCloud(event) {
    const { file } = event.detail;
    wx.cloud.init();
    if (!file.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = file.map((fileItem, index) => this.uploadFilePromise(`my-photo${index}.png`, fileItem));
      try {
        const res = await Promise.all(uploadTasks);
        console.log(res)
        wx.showToast({ title: '上传成功', icon: 'none' });
        const newFileList = res.map(item => ({ url: item.fileID }));
        const fileList = [...this.data.fileList, ...newFileList]
        console.log(fileList)
        this.setData({fileList: fileList });
      } catch(error) {
        wx.showToast({ title: '上传失败', icon: 'none' });
        console.log(error);
      }
    }
  },
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },
  saveMovieInfo () {
    const movieInfo = getApp().globalData.movieInfo
    for (const key in movieInfo) {
      movieInfo[key] = this.data[key]
    }
    getApp().globalData.movieInfo = movieInfo
    console.log(this.data)
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
    console.log(e)
    this.setData({
      [e.currentTarget.dataset.name]: e.detail
    })
  },
  deleteImage (e) {
    const fileList = this.data.fileList.filter((item, index) => index !== e.detail.index)
    this.setData({
      fileList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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