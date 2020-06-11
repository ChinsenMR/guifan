// component/shopranking/shopranking.js
var QR = require("../../utils/qrcode.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:app.data.imgurl,
    List: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  onShow: function() {
    this.InitData()
  },

  InitData() {
    app.Fg({
      url: '/API/KjAgentHandler.ashx?action=GetAllUsersByParenId'
    }).then(res => {
      console.log("jjjjj", res)
      if (res.data.Status == "Success") {
        this.setData({
          List: res.data.Date
        })
      }
    })
  },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取排名数据
   * */
  getDataList: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  // 选择排名类型
  onTabSelected: function(e) {

  },
})