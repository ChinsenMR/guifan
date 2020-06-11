const app = getApp();
import { getSplittinDetails } from '../../../utils/requestApi.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: null, 
    list: [],
    page: 1,
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
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

  initData(){
    wx.showLoading({ title: '加载中...' })
    let { listData, list, page, isEmpty } = this.data;
    getSplittinDetails({
      pageSize: 10,
      pageIndex: page,
      IsUse: true
    }).then(res =>{
      console.log("输出佣金明细",res);
      wx.hideLoading()
      if (res.data.Status == 'Success') {
        listData = res.data
        if (res.data.Data.length != 0) {
          list = [...list, ...res.data.Data]
          page ++ 
        } else if (page == 1 && res.data.Data.length == 0) isEmpty = true
        this.setData({ listData, list, page, isEmpty })
      }
    })
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
    this.initData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})