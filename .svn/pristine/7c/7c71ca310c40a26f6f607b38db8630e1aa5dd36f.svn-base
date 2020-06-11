import { subBindTemReferral } from '../../utils/requestApi.js'

const app = getApp();
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
    console.log("home页面跳转数据",options);
    
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res)
        app.data.statusBarHeight = res.statusBarHeight;
        app.data.navHeight = res.screenHeight - res.windowHeight;
      }
    })
     wx.showLoading({ title: '加载中...' })

    if (options.pageType) wx.reLaunch({ url: `/pages/goodsDetail/goodsDetail?prDid=${options.prDid}&pagetype=${options.pageType}` })
    else {
      let timer = setInterval(() => {
        if (wx.getStorageSync('tab')) {
          if (wx.getStorageSync('tab').WapTheme != 'fruit') wx.reLaunch({ url: '/pages/moduleHome/moduleHome' })
          else wx.reLaunch({ url: '/pages/index/index' })
          wx.hideLoading();
          clearInterval(timer)
        }
      }, 10)
    }
    
    if (options.rid) app.data.referralUserId = options.rid
    else {
      var scene = decodeURIComponent(options.scene).split('=')[1] 
      wx.setStorageSync("scene", scene);
      app.data.referralUserId = scene
    }

    //获取详情分享过来的id
    // let detailsId = options.detailsId
    // console.log("分享详情id",detailsId)
    
    // // 扫码获取上级id
    // var scene = decodeURIComponent(options.scene).split('=')[1] 
    // wx.setStorageSync("scene", scene);
    // app.data.referralUserId = scene

    // console.log("=======上级id", scene)
    // if (scene=='') {
    //   return
    // }else{
    //   this.bindRelation(scene)  // 调用绑定方法
    // }
  },

  // // 扫二维绑定关系
  // bindRelation(id) {
  //   let data = {
  //     // ReferralUserId: wx.getStorageSync('scene')
  //     ReferralUserId: id
  //   }
  //   subBindTemReferral(data).then(res => {
  //     console.log("绑定状态", res);
  //     // if(res.data.Status=="Faile"){
  //     //   wx.showToast({
  //     //     title: res.data.Message,
  //     //     icon: 'none',
  //     //     duration: 1500,
  //     //     mask: true,
  //     //   });
  //     // } else if (res.data.Status == "Login"){
  //     //   wx.showToast({
  //     //     title: res.data.Message,
  //     //     icon: 'none',
  //     //     duration: 1500,
  //     //     mask: true,
  //     //   });
  //     // }
        
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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