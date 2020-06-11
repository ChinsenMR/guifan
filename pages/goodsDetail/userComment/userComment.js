import { getReviewList } from '../../../utils/requestApi.js'
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTab: String,
    prDid: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: app.data.imgurl,
    listData: [],  //页面数据
    img1: app.data.imgurl + 'icon_01@2x (2).png',
    img2: app.data.imgurl + 'icon_02@2x.png',
    compent_active:0,
    PageSize:8, //初始值为8条
    CurrentPage:1, //默认初始第一页 
    type:0, //默认类型
    isLastPage: false,
    tips: '上拉加载更多'
  },

  pageLifetimes: {
    show: function () {
      let _this = this
      _this.setData({
        compent_active:0,
        CurrentPage: 1,
        isLastPage: false,
        tips: '上拉加载更多',
        listData: []
  
      })
      _this.initData()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initData: function () {
      wx.showLoading({
        title: '加载中',
      })
      let _this = this
      let { prDid } = this.data;
      getReviewList({
        action: 'LoadReview',
        PageSize: _this.data.PageSize,
        CurrentPage: _this.data.CurrentPage,
        ProductId: prDid,
        type:_this.data.compent_active,
      }).then(res => {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        console.log("点击数组数据预览图片",  res.data)


        var newData = {}
        if (res.data.data.length < _this.data.PageSize) {
            // 没有数据了，已经是最后一页
            newData.isLastPage = true
            newData.tips = "已显示全部啦"
            console.log(res.data.data.length , _this.data.PageSize)
        }
        // 追加数据
        newData.listData = _this.data.listData.concat(res.data.data)
        // _this.setData(newData)
        _this.setData(newData)
        // if (res.statusCode == 200 && res.data!='') {
          
        // }
       // console.log(this.data.listData)
      })
    },

    componentStyle(){
      console.log('用来加载存储数据,上拉刷新，加载更多',this.data.isLastPage)
      // 最后一页了，取消下拉功能
      if (this.data.isLastPage) {
       return 
      }else{
          this.setData({ 
            CurrentPage: this.data.CurrentPage + 1 
          })
          this.initData()
      }
 
    },

    // 切换评价类型
    compentBind(e){
      let _this = this
      console.log(e.currentTarget.dataset.id,typeof(e.currentTarget.dataset.id))
      let typeId =  parseInt(e.currentTarget.dataset.id)
      _this.setData({
        compent_active:typeId,
        CurrentPage: 1,
        isLastPage: false,
        tips: '上拉加载更多',
        listData: []
      })
      _this.initData()
    },

    //点击图片预览
    previewImage(e){
      let { pindex, cindex } = e.target.dataset
      let arr = this.data.listData;
      wx.previewImage({
        urls: arr[pindex].ImagesList, // 需要预览的图片http链接列表
        current: arr[pindex].ImagesList[cindex],// 当前显示图片的http链接
      })
    },


  },
      
})
