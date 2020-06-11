const app = getApp();
import {getExpressInfo} from '../../../utils/requestApi'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    viewUrl: wx.getStorageSync('webViewUrl'),
    params: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      params: options
    });

    // this.getExpressInfo()


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

});