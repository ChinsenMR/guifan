// packageA/pages/Directsuperiors/Directsuperiors.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MyReferral:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    
    wx.setNavigationBarTitle({
      title:'直属上级'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000', // 必写项
      backgroundColor:'#ffffff', // 传递的颜色值
      
      })

    app.Fg({
      url: '/API/MembersHandler.ashx?action=GetMyReferral'
    }).then(res => {
      console.log("输出直属上级",res);
      if (res.data.Status == "Faile"){
        wx.showModal({
          title: res.data.Message,
        })
      }else{
        var MyReferral = res.data.Data;
        wx.setStorageSync('directlyImg', MyReferral.picture)
        MyReferral.CreateDate = !MyReferral.CreateDate ? '' : MyReferral.CreateDate.split("T")[0]
        this.setData({
          MyReferral: MyReferral
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})