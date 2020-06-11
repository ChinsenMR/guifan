import {
  openBalance
} from "../../../utils/requestApi";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 提交
  formSubmit: function (e) {
    let valObj = e.detail.value;
    console.log(valObj)

    if(valObj.passVal !== valObj.passVals){
      return wx.showToast({icon: 'none', title: '两次密码不一致'})
    }

    openBalance({
      oldPassword: valObj.oldPassword,
      password: valObj.passVal, //	密码
      confirmPassword: valObj.passVals //	再次输入密码
    }).then(res => {
      console.log("输出res", res);
      if (res.data.Status == "ok") {

        wx.navigateBack({
          delta: 1
        })

      } else {
        wx.showToast({
          title: res.data.Message || res.data.msg,
          icon: 'none',
          duration: 1500,
          mask: true,
        });
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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