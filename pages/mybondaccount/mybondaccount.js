
import {
  turnToLoginPage
} from '../../utils/login.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // this.setData({
    //   money: options.money
    // })
  },
  //  跳到充值页
  // function  ToTorecharge (){
  //   console.log("前往充值")
  //           wx.redirectTo({
  //             url: '/pages/Margin recharge/Margin recharge',
  //           })
  // },
     
    // 请求保证金
    Bondaccount(){
      let _this = this
      wx.request({
        url: getApp().data.url+'/API/VshopRecharge.ashx?action=GetGoodsPaymentAmountByUser',
        data:{
          sessionId:wx.getStorageSync("sessionId")
        },
        method:"POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log(res)
           _this.setData({
               money:Number(res.data.Total)
           })
        }

      })
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 请求接口
      this.Bondaccount()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})