// pages/commodityevaluation/commodityevaluation.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.data.imgurl,
    topdata:[
      {
        title:'全部',
        value:11
      },
      {
        title: '最新',
        value: 12
      },
      {
        title: '有图(20)',
        value: 13
      }
    ],
    evaluateData:[
      {
        userheand:'/images/touxiang_03@2x.png',
        userName:'忧伤的肥猫',
        membershiplevel:'会员等级',
        evaluateconten:'第二次买了蛮好的用的，本身就是敏感肌用起来也很舒服。用完再继续，那二次购买有优惠价吗？或许会介绍朋友来买哦~',
        evaluateimg:[
          {
            imgurl: app.data.imgurl + 'bg_canpin_06@2x.png'
          },
          {
            imgurl: app.data.imgurl + 'bg_canpin_06@2x.png'
          }
        ],
        membershiptime:'2019/05/08',
        start:4
      },
      {
        userheand: app.data.imgurl +'touxiang_03@2x.png',
        userName: '忧伤的肥猫',
        membershiplevel: '会员等级',
        evaluateconten: '第二次买了蛮好的用的，本身就是敏感肌用起来也很舒服。用完再继续，那二次购买有优惠价吗？或许会介绍朋友来买哦~',
        evaluateimg: [],
        membershiptime: '2019/05/08',
        start:3
      },
      {
        userheand: app.data.imgurl +'touxiang_03@2x.png',
        userName: '忧伤的肥猫',
        membershiplevel: '会员等级',
        evaluateconten: '第二次买了蛮好的用的，本身就是敏感肌用起来也很舒服。用完再继续，那二次购买有优惠价吗？或许会介绍朋友来买哦~',
        evaluateimg: [
          {
            imgurl: app.data.imgurl + 'bg_canpin_06@2x.png'
          },
          {
            imgurl: app.data.imgurl + 'bg_canpin_06@2x.png'
          }
        ],
        membershiptime: '2019/05/08',
        start: 4
      },
      {
        userheand: app.data.imgurl + 'touxiang_03@2x.png',
        userName: '忧伤的肥猫',
        membershiplevel: '会员等级',
        evaluateconten: '第二次买了蛮好的用的，本身就是敏感肌用起来也很舒服。用完再继续，那二次购买有优惠价吗？或许会介绍朋友来买哦~',
        evaluateimg: [],
        membershiptime: '2019/05/08',
        start: 3
      },
      {
        userheand: app.data.url + 'touxiang_03@2x.png',
        userName: '忧伤的肥猫',
        membershiplevel: '会员等级',
        evaluateconten: '第二次买了蛮好的用的，本身就是敏感肌用起来也很舒服。用完再继续，那二次购买有优惠价吗？或许会介绍朋友来买哦~',
        evaluateimg: [
          {
            imgurl: app.data.imgurl + 'bg_canpin_06@2x.png'
          },
          {
            imgurl: app.data.imgurl + 'bg_canpin_06@2x.png'
          }
        ],
        membershiptime: '2019/05/08',
        start: 4
      },
      {
        userheand: app.data.imgurl + 'touxiang_03@2x.png',
        userName: '忧伤的肥猫',
        membershiplevel: '会员等级',
        evaluateconten: '第二次买了蛮好的用的，本身就是敏感肌用起来也很舒服。用完再继续，那二次购买有优惠价吗？或许会介绍朋友来买哦~',
        evaluateimg: [],
        membershiptime: '2019/05/08',
        start: 3
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.data.imgurl)

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

  }
})