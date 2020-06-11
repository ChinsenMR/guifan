 const app =getApp()
import { getProductsList } from '../../utils/requestApi.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.data.imgurl,
    groupList: [] , // 拼团
    page: 1, //页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  },
     //   跳转商品详情
     Toprodetai(e) {
          //   console.log("shanglp",e)
          wx.navigateTo({
               url: `/pages/goodsDetail/goodsDetail?prDid=${e.currentTarget.dataset.productid}&pagetype=${e.currentTarget.dataset.pagetype}`,
          })
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
  

  // 参数化 数据
  initData(){
    let { groupList, page } = this.data;
    getProductsList({ 
      action: 'GetFightGroupActivityInfos', 
      pageIndex: page,
      pageSize: 10,
      sortBy: 'SalePrice'
      }).then(res =>{
        if (res.statusCode == 200){
             if (res.data.Result.Data.length == 0) { 
                  wx.showToast({
                       title: '到底啦~~',
                  })
                  return
                  } 
          res.data.Result.Data.forEach(item =>{
            let per = Math.floor(item.SoldCount / (item.CanFightCount + item.SoldCount));
            item.percent = per;
            if (per >= 0.85 && per < 1) per = '即将售罄';
            else if (per == 1) per = '已售罄';
            else per += '%';
            item.percentTxt = per;
            groupList.push(item)
          })
          this.setData({ groupList, page: page + 1 });
        }
        else console.log(res)
      })
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
    this.initData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})