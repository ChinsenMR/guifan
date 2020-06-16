const app = getApp();
import {
  getGoodsDetail,
  getShopUser,
  getCartList,
  login,
  bindBaseAgent
} from '../../utils/requestApi.js'

import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: '', //购物车数量
    imgUrl: app.data.imgurl,
    currentTab: 1, // 当前选择的tab,
    navHeight: null, //系统状态栏高度
    statusBarHeight: null, //导航栏栏高度
    bannerArr: [], //bannerArr
    skuItem: [], // 规格选择列表
    skus: [], // 规格选中项
    //页面类型   新人限时抢购：1，  限时折扣：2，  9.9包邮：3， 品牌秒杀： 4， 即将销售：5， 拼团：6
    pageType: null,
    prDid: null, //商品id
    description: null, // 图文详情
    shopUser: [], //购买下单用户
    coupons: [], //  优惠卷
    promotionStr: [], // 优惠卷 ---> 促销 
    freight: null, //运费
    //商品信息
    goodsInfo: null,
    //福利列表
    welfareList: ['', '', '', '', '', ''],
    isShow: false,
    shareInfo: {},
    Money: 0,
    paramData: {},
    scene: '', //二维码
    userid: '', // 本地用户信息id
    newHeight: 0,
    pid: '',
    productExAttr: [], //新增扩展参数
    messageShow: false, // 显示和隐藏咨询的对话框
    ConsultationText: '', //用户留言
    userName: '', // 用户留言时，需要的手机号或者邮箱
    getMessageDatas: [], //  咨询列表的数据
    componet: null,
    activeIndex: 0, // 当前选项卡的下标 
    page: 1,
    rowtotal: 3, // 一页显示多少条数据
    tips: '上拉加载更多',
    isLastPage0: false, // 是否加载完商品咨询
    isLastPage1: false, // 是否加载完猜你喜欢数据
    likeGetData: [], // 猜你喜欢的数据
    Page: 1, // 猜你喜欢页码
    Count: 4, // 猜你喜欢每页显示的条数
    ProductId: '', // 猜你喜欢需要的商品id
    tips1: '上拉加载更多',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {

    if (opt.scene) {
      const scene = decodeURIComponent(opt.scene);
      opt.agentId = app.utils.getQueryVariable(scene, 'agentId')
      opt.prDid = app.utils.getQueryVariable(scene, 'prDid');
      this.bindBaseAgent(opt)

      /* 绑定代理全部放这里面 */

    }




    const {
      UserId
    } = wx.getStorageSync("userInfo");
    this.setData({
      pageType: parseInt(opt.pagetype),
      prDid: opt.prDid,
      userid: UserId,
      pid: opt.prDid,
      ProductId: opt.prDid
    })


    if (!opt.scene) {
      this.initData(opt.prDid)
      this.getMessageData(opt.prDid)

    }



    if (opt.prDid) {
      // console.log("执行了吗+++++++++++++++++++++++++++++",);
      this.initData();
    }
    this.initUserList()
    getCartList().then(res => {
      this.setData({
        num: res.data.Data.RecordCount
      })
    })
    this.likeGetData()
  },

  //绑定上级
  bindUpLoad() {
    login({
      openId: app.data.openid, //	是	string	openId
      openType: 'hmeshop.plugins.openid.wxapplet', //是	string	网页（hmeshop.plugins.openid.weixin）小程序（hmeshop.plugins.openid.wxapplet）
      referralUserId: this.data.userid
    }).then(res => {
      console.log("详情扫码分享数据+++++++++++++++++", res);
      if (res.data.Status == "Faile") {
        wx.showToast({
          title: res.data.Message,
          icon: 'none',
          duration: 1500,
          mask: true,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });

      }
    })
  },
  /* 全局方法，绑定代理 */
  bindBaseAgent(opt) {
    
    app.globalData.AGENT_ID = opt.agentId;

    /* 如果有代理ID那么就绑定 */
    if (app.globalData.AGENT_ID && !app.globalData.isBindAgent) {
      console.log(app.globalData.AGENT_ID)
      bindBaseAgent({
        ReferralUserId: app.globalData.AGENT_ID
      }).then(res => {
        console.log(res, '绑定上级关系')
        const {
          Code,
          Msg
        } = res.data;
        if (Code == 0 || Code == -99) return
        if (Code == 1) {
          app.globalData.isBindAgent = true
        }
        wx.showModal({
          title: '绑定上级关系',
          content: Msg,
          showCancel: true,
        })
      })

    }


  },
  succ(e) {
    this.setData({
      num: e.detail
    })
  },
  // 分享
  onShare() {
    var _this = this;
    console.log("输出商品id", _this.data.prDid);
    const agentId = wx.getStorageSync('USER_ID')
    wx.request({
      url: getApp().data.url + '/API/QrcodeHandler.ashx?action=GetProductQrcode',
      data: {
        Type: 1,
        Path: 'pages/goodsDetail/goodsDetail?prDid=' + _this.data.prDid + '&agentId=' + agentId,
        SalePrice: 1, //_this.data.goodsInfo.MinSalePrice,
        ProductId: _this.data.prDid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        Cookie: wx.getStorageSync('cookie') || app.data.cookie
      },
      success: function (res) {
        // console.log("分享数据", res.data.Result);
        if (res.data.Status == "Faile") {
          wx.showModal({
            content: res.data.Message,
            showCancel: false
          })
          return
        }
        _this.setData({
          shareInfo: res.data.Result,
          isShow: true
        })
      }
    })
    _this.getPrice()
  },

  // 获取分享佣金
  getPrice() {
    let _this = this
    wx.request({
      url: getApp().data.url + '/API/RequestHandler.ashx?action=GetReferralCommisson',
      data: {
        ProductId: _this.data.prDid
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        Cookie: wx.getStorageSync('cookie') || app.data.cookie
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.Code == 1) {
          let Money = res.data.Data.Money
          _this.setData({
            Money
          })
        } else {
          wx.showToast({
            title: res.data.Msg,
            icon: 'none'
          })
        }
        // console.log("分享数据", res.data.Result);
        // if (res.data.Status == "Faile") {
        //   wx.showModal({
        //     content: res.data.Message,
        //     showCancel: false
        //   })
        //   return
        // }
        // _this.setData({
        //   shareInfo: res.data.Result,
        //   isShow: true
        // })
      }
    })
  },

  // 关闭分享
  closeEvent(e) {
    var mode = e.detail.mode;
    if (mode == 'mask') {
      this.setData({
        isShow: false
      })
    }
  },
  // 分享好友
  onShareAppMessage(res) {
    const agentId = wx.getStorageSync('USER_ID')
    console.log(agentId)
    //  console.log(`/pages/goodsDetail/goodsDetail?prDid=${this.data.prDid}&pageType=1&agentId=${agentId}`)
    return {
      title: this.data.shareInfo.ProductName,
      path: `/pages/goodsDetail/goodsDetail?prDid=${this.data.prDid}&pageType=1&agentId=${agentId}`,
      imageUrl: this.data.bannerArr[0] || this.data.shareInfo.ImageUrl1
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
    this.data.componet = this.selectComponent('#componet') // 获取到自定义组件
    // this.setData({
    //   statusBarHeight: app.data.statusBarHeight,
    //   navHeight: app.data.navHeight
    // })
    var _this = this
    this.getSystemInfo().then((res) => {
      let newHeight = (res.statusBarHeight + 44) - res.statusBarHeight
      // console.log("输出动态高度", newHeight);
      _this.setData({
        statusBarHeight: res.statusBarHeight,
        navHeight: res.statusBarHeight + 44,
        newHeight
      })
    })
    _this.bindUpLoad();
  },

  // 获取手机信息
  getSystemInfo() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          resolve(res)
        }
      })
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
    wx.removeStorageSync('buyType')
  },

  //切换头部Nav
  selectNav: function (e) {
    this.setData({
      currentTab: e.target.dataset.id || e.detail.id
    })
  },

  //自定义返回上一级
  navigateBack: function () {
    const pages =  getCurrentPages();
    if(pages.length > 1){
      wx.navigateBack();
    }else{
      wx.redirectTo({
        url: '/pages/home/home',
      })
    }
   
  },

  //初始化页面数据
  initData: function (id) {
    wx.showLoading({
      title: '加载中...',
    })
    let {
      prDid,
      bannerArr
    } = this.data;
    getGoodsDetail({
      action: 'getProductDetail',
      ProductID: prDid || id
    }).then(res => {
      console.log("商品详情数据", res)
      if (res.statusCode == 200) {
        wx.hideLoading();
        let {
          Result
        } = res.data;
        Result.prDid = this.data.prDid
        // console.log("Result++++", Result);
        this.setData({
          bannerArr: Result.ImgList,
          animationImg: Result.ImgList[0],
          description: Result.Description,
          skuItem: Result.SkuItem,
          skus: Result.Skus,
          coupons: Result.Coupons,
          promotionStr: Result.PromotionStr,
          freight: Result.Freight,
          goodsInfo: Result,
          productExAttr: Result.ExtendAttribute
        })
        console.log(this.data.productExAttr)
      }
    })
  },

  //初始化下单的用户列表
  initUserList: function () {
    getShopUser({
        action: 'GetCustomOrderData '
      })
      .then(res => {
        if (res.statusCode == 200) {
          this.setData({
            shopUser: res.data == '' ? [] : res.data.Result.Data
          })
        }
      })
  },

  //打开规格选择modal
  openSpecs: function (param) {
    this.setData({
      paramData: param.detail
    })
    // console.log("输出价格",param.detail);
    this.selectComponent('#goodsSpecsCom').showModal();

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.data.componet.componentStyle()

    // 商品咨询列表  
    console.log('上拉刷新，加载更多', this.data.isLastPage0)
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage0) {
      return
    } else {
      this.setData({
        page: this.data.page + 1
      })
      this.getMessageData(this.data.prDid)
    }


  },

  // 猜你喜欢
  //   Page:1
  // Count:10
  // ProductId:530 http://192.168.3.86:8088/api/ProductHandler.ashx?action=GetProductLike

  likeGetData: function () {

    let _this = this
    console.log(_this.data.Page, _this.data.Count, _this.data.ProductId)
    wx.request({
      url: getApp().data.url + '/api/ProductHandler.ashx?action=GetProductLike',
      data: {
        Page: _this.data.Page,
        Count: _this.data.Count,
        ProductId: _this.data.ProductId
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        Cookie: wx.getStorageSync('cookie') || app.data.cookie
      },
      success: function (res) {


        if (res.data.Data.length === 0) {
          // wx.showToast({
          //   title: '数据加载完成~',
          //   icon: 'none',
          //   duration: 3000,
          // })
          return false
        } else {
          var newData = {}
          if (res.data.Data.length < _this.data.Count) {
            // 没有数据了，已经是最后一页
            newData.isLastPage1 = true
            newData.tips1 = "已显示全部啦"
          }
          // 追加数据
          newData.likeGetData = _this.data.likeGetData.concat(res.data.Data)
          _this.setData(newData)
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  // 左滑动执行的事件，加载猜你喜欢的产品数据
  bindscrolltolower: function () {
    console.log('判断猜你喜欢是否还有数据要加载' + this.data.isLastPage1)
    // 最后一页了，取消左滑功能
    if (this.data.isLastPage1) {
      Toast.fail('没有更多了');
      return
    } else {
      this.setData({
        Page: this.data.Page + 1
      })
      this.likeGetData()
    }
  },

  // 2020/06/03 pzk 新增onChange

  onChange: function (event) {

    let _this = this
    _this.setData({
      activeIndex: event.detail.index,
      page: 1,
      isLastPage0: false,
      tips: '上拉加载更多',
      getMessageDatas: [], // 重置评价数组

    })
    console.log(event.detail.index, typeof (event.detail.index))
    if (event.detail.index === 2) {
      _this.getMessageData(_this.data.prDid) // 重新发送请求
    }

    // wx.showToast({
    //   title: `切换到标签 ${e.detail.index}`,
    //   icon: 'none',
    // });
  },

  // 点击显示咨询的弹出窗
  showPopup() {
    this.setData({
      messageShow: true
    });
  },

  // 关闭弹出
  onClose() {
    this.setData({
      messageShow: false
    });
  },


  // 提交产品咨询表单
  FromSubmit: function (e) {
    let _this = this
    console.log(e.detail.value)
    let ConsultationText = e.detail.value.ConsultationText
    let userName = e.detail.value.userName
    console.log(ConsultationText, userName, _this.data.ProductId)
    if (ConsultationText == '' || userName == '' || _this.data.ProductId == '') {
      Toast.fail('数据不准为空')
      return false
    }
    wx.request({
      url: getApp().data.url + '/api/VshopProcess.ashx?action=AddProductConsultations',
      data: {
        ConsultationText: ConsultationText,
        userName: userName,
        ProductId: _this.data.ProductId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        Cookie: wx.getStorageSync('cookie') || app.data.cookie
      },
      success: function (res) {
        console.log("留言", res.data);
        if (res.data.success === true) {

          wx.showModal({
            content: '咨询成功，请耐心等待商家恢复',
            duration: 2000,
            complete: () => {
              _this.setData({
                messageShow: false
              })
              _this.initData(_this.data.ProductId)
              _this.getMessageData(_this.data.ProductId)
            }
          })

        } else {
          wx.showToast({
            content: '咨询失败，稍后再试',
            showCancel: false,
            duration: 2000

          })
          return
        }
      }
    })
  },


  // 获取商品咨询列表

  getMessageData: function (prDid) {
    let _this = this
    wx.request({
      url: getApp().data.url + '/API/RequestHandler.ashx?action=GetCommByProduct',
      data: {
        ProductId: prDid,
        PageIndex: _this.data.page,
        PageSize: _this.data.rowtotal

      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        Cookie: wx.getStorageSync('cookie') || app.data.cookie
      },
      success: function (res) {

        if (res.data.Code === 1) {
          console.log("商品评论列表成功数据", res.data.Data, res.data.Data.rows)
          var newData = {}
          if (res.data.Data.rows.length < _this.data.rowtotal) {
            // 没有数据了，已经是最后一页
            newData.isLastPage0 = true
            newData.tips = "已显示全部啦"
          }
          // 追加数据
          newData.getMessageDatas = _this.data.getMessageDatas.concat(res.data.Data.rows)
          _this.setData(newData)

        }
      }
    })
  }

})