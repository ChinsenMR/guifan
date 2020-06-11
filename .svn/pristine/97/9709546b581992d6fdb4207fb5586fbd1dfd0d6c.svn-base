import { getFightGroupList } from "../../utils/requestApi";
import { countdown } from '../../utils/util';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:app.data.imgurl,
    groupData:[],
    groupList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroupData();
    // 参团倒计时
    setInterval(() => {
      this.Clusterdata()
    }, 1000)
  },

  //页面初始化数据
  getGroupData(){
    getFightGroupList({
      pageIndex:1,	
      pageSize:10
    }).then(res=>{
      console.log("拼团列表数据",res);
      let arr = res.data.FList;
      arr.forEach((item,index)=>{
        item.aaa=item.StartTime.substring(0, 19)
        item.StartTime = item.aaa.replace('T',' ')
      })
      console.log("新数组",arr);
      if(res.data.Status=="Success"){
        this.setData({
          groupData: arr
        })
      }
    })
  },

  // 参团数据
  Clusterdata() {
    let {
      groupData
    } = this.data;
    groupData.forEach((item, index) => {
      let endDate = countdown(item.EndTime);
      item.limitHours = endDate.limitHours;
      item.limitMin = endDate.limitMin;
      item.limitSecond = endDate.limitSecond;
      item.index = index;
    })
    
    this.setData({
      // groupList: 
      groupData
    })
  },
  //跳转拼团详情
  handleGroup(e){
    console.log("点击e",e);
    const { id, productid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/groupDetail/groupDetail?id=${id}&productid=${productid}`,
    });
      
  },
  //跳转订单详情
  handleOrder(e){
    const { orderid } = e.currentTarget.dataset;
    console.log(orderid);
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?id=${orderid}`,
    });
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