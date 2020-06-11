// pages/myMussage/myMessage.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:{},
    flag:''
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      flag: options.flag
    })
    this.getNewsList(options.id,options.type)
    this.setNavigationBarTitle(options.type)
  },

  setNavigationBarTitle:function(type){
    // console.log(type,typeof(type))
    if(type === '0'){
      wx.setNavigationBarTitle({
        title: '公告详情' 
      })
    }else{
      wx.setNavigationBarTitle({
        title: '消息详情' 
      })
    }
   
  },

  navigatorTo:function(){
    var _this = this
    var flag = _this.data.flag
    if(flag=="true"){
      wx.navigateBack({})
    }else{
      wx.navigateTo({
        url: '/pages/myNews/myNews',
      })
    }
  },

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
    return getApp().getShareData()
  },

  // 获取公告详情
  getNewsList: function (noticeid,type) {
    var _this = this
    wx.request({
      url: getApp().data.url + '/api/RequestHandler.ashx',
      data: {
        action: 'GetMemberNoteDetail',
        Id: noticeid,
        type:type
      },
      header: {
        Cookie: wx.getStorageSync('cookie') 
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.Status === "login") {
          getApp().turnToLoginPage()
          return
        }
        if (res.data.State === 1){
          console.log(res.data)
          // var str = res.data.data.PubTime          
          var richtext = res.data.Data.Content.replace(/\“thzfc\”/g, '\"')
          WxParse.wxParse('richtext', 'html', richtext, _this, 5);
          _this.setData({
            newsList:res.data.Data
            // time: str.replace(/T/, " ")
          })
        }
       },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})