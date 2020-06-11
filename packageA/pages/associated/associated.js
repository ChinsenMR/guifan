import { bindAgent } from "../../../utils/requestApi";
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
    bindAgent({
      Username: valObj.userName,//	是	string	代理账号
      Password: valObj.userPass //	是	string	代理密码
    }).then(res=>{
      console.log("输出res",res);
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