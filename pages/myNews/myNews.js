const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.data.imgurl,  // 服务器 配置地址
    activeItem: 1, // 当前选择的tabBar项
    showModal: false, // 显示隐藏modal
    animationData: {}, // modal 显示动画
    AnnouncementArr: [], // 公告数组
    NewsArr: [], // 消息数组
    list:['',''],
    active: 0,
    total:'', // 总条数
    page: 1 ,
    rowtotal: 12,  // 一页显示多少条数据
    isLastPage: false,
    tips: '上拉加载更多',
    activeIndex: 0 // 当前选项卡的下标 ，表示是公告
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //let _this = this
    // getGoodsDetail().then(res =>{
    //   console.log(res)
    // })
    //this.getAnnouncementArrData(_this.data.activeIndex)
  },

  getAnnouncementArrData:function(type){
    wx.showLoading({
      title: '数据加载中'
    })
    var _this = this
    console.log('每页的条数'+_this.data.rowtotal)
      wx.request({
        url: getApp().data.url + '/api/VshopProcess.ashx',
        data: {
          action: 'GetNotice',
          pagesize: _this.data.rowtotal,
          type:type,
          readtype:0,
          page:_this.data.page
        },
        header: {
          Cookie: wx.getStorageSync('cookie') 
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.success === "login") {
            getApp().turnToLoginPage()
            return
          }
          if (res.data.success === "true"){
            console.log(res.data.lihtml)
            if(type == 1){
              // 消息数据
              var newData = {}
              if (res.data.lihtml.length < _this.data.rowtotal) {
                  // 没有数据了，已经是最后一页
                  newData.isLastPage = true
                  newData.tips = "已显示全部啦"
              }
              // 追加数据
              newData.NewsArr = _this.data.NewsArr.concat(res.data.lihtml)
              _this.setData(newData)

              // _this.setData({
              //   NewsArr:res.data.lihtml
              // })
              
            }else{
              var newData = {}
              if (res.data.lihtml.length < _this.data.rowtotal) {
                  // 没有数据了，已经是最后一页
                  newData.isLastPage = true
                  newData.tips = "已显示全部啦"
              }
              // 追加数据
              newData.AnnouncementArr = _this.data.AnnouncementArr.concat(res.data.lihtml)
              _this.setData(newData)

            }
            
            
            // var str = res.data.data.PubTime          
            // var richtext = res.data.data.Memo.replace(/\“thzfc\”/g, '\"')
            // WxParse.wxParse('richtext', 'html', richtext, _this, 5);
            // _this.setData({
            //   newsList:res.data.data,
            //   time: str.replace(/T/, " ")
            // })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
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
  this.setData({
    page: 1,
    isLastPage: false,
    tips: '上拉加载更多',
    AnnouncementArr: [],  // 重置公告数组
    NewsArr: [] // 重置消息数组
  })
    this.getAnnouncementArrData(this.data.activeIndex)
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
  

  //选择tabbar
  selectTabbar:function(e){
    this.setData({
      activeItem: e.currentTarget.dataset.id
    })
  },

  // 升级会员modal
  updateAgent:function(e){
    if (this.data.activeItem == 1) return;
    this.setData({
      showModal: !this.data.showModal
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
  onReachBottom: function (e) {
    console.log('上拉刷新，加载更多')
     // 最后一页了，取消下拉功能
     if (this.data.isLastPage) {
      return
  }
  this.setData({ page: this.data.page + 1 })
  this.getAnnouncementArrData(this.data.activeIndex)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  // tab 切换
  onChange(event) {
    // console.log(event.detail.title);
    // console.log(event.detail.index);
    let _this = this
    _this.setData({
      activeIndex:event.detail.index,
      page: 1,
      isLastPage: false,
      tips: '上拉加载更多',
      AnnouncementArr: [],  // 重置公告数组
      NewsArr: [] // 重置消息数组

    })
    this.getAnnouncementArrData(_this.data.activeIndex)  // 重新发送请求
    wx.showToast({
      title: event.detail.title,
      icon: 'none',
    });
  },


})