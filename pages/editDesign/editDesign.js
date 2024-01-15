// pages/editDesign/editDesign.js
const moment = require('moment')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
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
      "formData.playDate": moment(e.detail).format('YYYY-MM-DD HH:mm:ss')
    })
    this.closeDatePopup();
  },
  async uploadToCloud(event) {
    const { file } = event.detail;
    wx.cloud.init();
    if (!file.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = file.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
      try {
        const res = await Promise.all(uploadTasks);
        wx.showToast({ title: '上传成功', icon: 'none' });
        const newFileList = res.map(item => ({ url: item.fileID }));
        this.setData({"formData.fileList": newFileList });
        console.log(this.data.formData.fileList)
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