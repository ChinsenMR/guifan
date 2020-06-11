// pages/member/member.js
import {
  getMemberData,
  getindexsharedata,
  getOldPhone
} from "../../utils/requestApi"
const app = getApp();
let interstitialAd = null
import {
  getpersondata
} from "../../utils/requestApi.js"
const imgurl2 = "http://hmqy.oss-cn-hangzhou.aliyuncs.com/hmeshop_jxy/images/"
Page({
  /**
   * 页面的初始数据 pages/receivingAddress/receivingAddress
   */
  data: {
    IsReferral: false, //是否显示推广模块 
    message_boxnoshow: false, //显示弹窗
    openSetting: '', // 判断是否有手机号
    IsOpenBalance: '',
    baiduLineUrl: '', // 百度连桥地址
    show: false, //是否显示code组件
    code: 'http://img.hmeshop.cn/hmeshop_jxy/images/icon_share@2x (1).png', //二维码路径
    settingIcon: 'https://img.hmeshop.cn/hmeshopV3/Storage/master/202006101003384078060.png',
    path: "/pages/member/member", //
    vipcardInfo: null, //vip
    Sharestaue: false, //二维码
    SignInpoints: null, //签到分
    SignInmask: false, //签到梦成
    newsData: {},
    imgurl: app.data.imgurl,
    userInfo: {}, //用户信息
    showAccount: true,
    signIn: '点击签到',
    memberpoint: 0,
    showcard: false,
    showmask2: false,
    showmask3start: false,
    showmask2start: false,
    nowcreat: false,
    animationData: {}, //空动画对象属性
    tabHide: true,
    ceshiList: [],
    AThresholdUpGrade: false, //判断是否选择隐藏代理模块  true 隐藏
    userRepository: [{
        text: '预计收益',
        url: "profitDetail"
      },
      {
        text: '累计佣金',
        url: "commission"
      },
      {
        text: '可用余额',
        url: "myAccount"
      },
      {
        text: '已提现',
        url: "cashDetail"
      }
    ],
    // 会员中心
    // 1
    myorderBox: [{
        imgurl: imgurl2 + 'icon_order_01.png',
        text: '待付款',
        color: '#333333'
      },
      {
        imgurl: imgurl2 + 'icon_order_02.png',
        text: '待发货',
        color: '#333333'
      },
      {
        imgurl: imgurl2 + 'icon_order_03.png',
        text: '待收货',
        color: '#333333'
      },
      {
        imgurl: imgurl2 + 'icon_wjx_new@2x.png',
        text: '待评价',
        color: '#333333'
      },
      {
        imgurl: imgurl2 + 'icon_quanbudingdan.png',
        text: "全部订单",
        color: '#FF3333'
      }
    ],
    // 2
    memberCenter: [{
        //   imgurl: imgurl2 + "icon_youhuiquan2.png",
        //   text: '积分',
        //   url: "/packageA/pages/Myintegral/Myintegral"
        // }, {
        //   imgurl: imgurl2 + 'icon_youhuiquan.png',
        //   text: '优惠券',
        //   url: "/packageA/pages/MyCoupon/MyCoupon"
        // }, {
        imgurl: imgurl2 + "icon_shoucang.png",
        text: "收藏",
        url: "/packageA/pages/MyCollection/MyCollection"
      }, {
        imgurl: imgurl2 + 'icon_shouhuodizi.png',
        text: '收货地址',
        url: "/pages/receivingAddress/receivingAddress"
      }
      // {
      //     imgurl: imgurl2 + 'wdpt.png',
      //     text: '我的拼团',
      //     url: "/pages/groupDetailsList/groupDetailsList"
      // },
      // {}
    ],
    // 3
    menmbercneterThree: [{
        imgurl: imgurl2 + "icon_dingdan.png",
        text: '分销订单',
        url: "/pages/distributeOrder/distributeOrder?pageType=2"
      },
      {
        imgurl: imgurl2 + 'icon_fenxiaoxiashu.png',
        text: '分销下属',
        url: "/pages/distributeSub/distributeSub"
      },
      {
        imgurl: imgurl2 + "icon_08zhishu.png",
        text: '直属上级',
        url: "/packageA/pages/Directsuperiors/Directsuperiors"
      },
      {
        imgurl: 'http://img.hmeshop.cn/hmeshopV3/Storage/master/202006111440549881770.png',
        text: '我的消息',
        url: "/pages/myNews/myNews"
      },
      // {
      //   imgurl: imgurl2 + "icon_sjsj.png",
      //   text: '我要升级',
      //   url: "/packageA/wjx/myUpgrade/myUpgrade"
      // },
      // {
      //   imgurl: imgurl2 + "icon_dl.png",
      //   text: '上级代理',
      //   url: "/packageA/wjx/higherAgent/higherAgent"
      // },
    ],



    agencyCenter: [
      // {
      //   imgurl: imgurl2 + 'icon_cangku_05.png',
      //   text: '我的云仓',
      //   url: "/pages/cloudWarehouse/cloudWarehouse"
      // },
      {
        imgurl: imgurl2 + 'icon_guanl.png',
        text: '关联代理',
        url: "/packageA/pages/associated/associated"
      },
      {
        imgurl: imgurl2 + 'icon_shengji_01.png',
        text: '升级申请',
        url: "/packageA/pages/applyAgent/applyAgent",
      },
      // {
      //   imgurl: imgurl2 + 'icon_xitong_02.png',
      //   text: '代理系统',
      //   url: ""
      // },
      // {
      //   imgurl: imgurl2 + 'icon_paiming_07.png',
      //   text: '代理排名',
      //   url: "/pages/shopranking/shopranking"
      // },
      // {
      //   imgurl: imgurl2 + 'icon_dpzz@2x.png',
      //   text: '店铺资质',
      //   url: "/packageA/wjx/qualification/qualification"
      // },
      // {
      //   imgurl: imgurl2 + 'icon_xiashui_03.png',
      //   text: '代理下属',
      //   url: '/pages/distributeSub/distributeSub?Type=2'
      // },
      // {
      //   imgurl: imgurl2 + 'icon_dianpu_04.png',
      //   text: '店铺信息',
      //   url: "/pages/shopmsg/shopmsg"
      // },
      // {
      //   imgurl: imgurl2 + 'icon_06@2x.png',
      //   text: '代理订单',
      //   url: "/pages/distributeOrder/distributeOrder"
      // },
      // {
      //   imgurl: imgurl2 + 'icon_shuoming_08.png',
      //   text: '代理说明',
      //   url: "/pages/distributionDescription/distributionDescription"
      // },
      // {
      //   imgurl: imgurl2 + 'icon_share_09.png',
      //   text: '商品统计',
      //   url: "/pages/Agencywarehouse/Agencywarehouse"
      // },
      //  {
      //    imgurl: imgurl2 + 'icon_10@2x.png',
      //    text: '商品统计'
      //  }
    ],
    carddata: [{
        tip: '升级黄金',
        minitip: '享受黄金会员低价，分享获得黄金差价',
        btn: '去升级'
      },
      {
        tip: '升级黄金',
        minitip: '享受黄金会员低价，分享获得黄金差价',
        btn: '去升级'
      }
    ],
    directlyImg: '', //上级代理图片
    KjCustomId: '', //用来判断是不是代理
  },
  gomyorder: function () {
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },
  showCode() {
    wx.showLoading({
      title: '加载中...',
    })
    getindexsharedata({
      Type: 1,
      Path: 'pages/member/member'
    }).then(res => {
      wx.hideLoading()
      if (res.data.Result) {
        this.setData({
          show: true,
          tabHide: false
        })
        this.setData({
          swiper: res.data.Result.Data
        })

      } else {
        wx.showToast({
          title: res.data.Message,
          icon: 'none'
        })
      }
      // console.log(res)
    })
  },
  // 显示tab栏
  tabShow(e) {
    console.log('执行了吗');
    this.setData({
      tabHide: true
    })
  },

  //   订单栏
  Tomyorder(e) {
    var index = e.currentTarget.dataset.index
    index = index == 4 ? 0 : index + 1
    wx.navigateTo({
      url: `/pages/myOrder/myOrder?type=${index}`,
    })
  },
  // 分享二维码
  share() {
    this.setData({
      Sharestaue: !this.data.Sharestaue
    })
  },


  //获取会员信息
  getMenberInfo() {
    let that = this;
    getMemberData().then(res => {
      console.log("会员信息", res);
      if (res.data.Status == "Success") {
        let agency = that.data.agencyCenter;
        wx.setStorageSync("userInfo", res.data.Data);
        let data = res.data.Data;

        let AThresholdUpGrades = res.data.Data.AThresholdUpGrade
        agency.forEach(v => {
          if (v.text == "我的云仓") {
            v.KjCustomId = data.KjCustomId //用于判断是否为代理,KjCustomId=0为非代理,将我的云仓隐藏
          }
        })
        const {
          CreateDate,
          GradeName,
          UserName,
          UserId,
          picture,
          gradeId,
          WithDraw,
          Balance,
          Commission,
          AnticipatedIncome,
          KjCustomId,
          IsOpenBalance,
          IsReferral
        } = res.data.Data;

        console.log('判断是否要修改支付密码', res.data.Data.IsOpenBalance)
        // if(res.data.Data.IsOpenBalance == true){

        //   console.log('要跳转到重置密码页面')
        //   wx.navigateTo({
        //     url: '../../packageA/pages/setPassword/setPassword',
        //   })
        // }else{
        //   console.log('要跳转到设置(新增)交易密码')
        //   wx.navigateTo({
        //     url: '../../packageA/pages/addPassword/addPassword',
        //   })
        // }

        that.setData({
          userInfo: {
            CreateDate,
            GradeName,
            UserName,
            UserId,
            picture,
            gradeId,
            WithDraw,
            Balance,
            Commission,
            AnticipatedIncome
          },
          KjCustomId,
          agencyCenter: agency,
          AThresholdUpGrade: AThresholdUpGrades,
          IsOpenBalance
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  cardshow() {
    console.log('cardshow')
    this.setData({
      showcard: true
    })
    // 动画
  },
  canclecard() {
    console.log('canclecard')
    this.setData({
      showcard: false
    })
  },
  showmask2FC() {
    var that = this
    that.setData({
      showmask2: true
    })
    var ti = setTimeout(function () {
      that.setData({
        showmask2start: true
      })
    }, 300)
    var ti2 = setTimeout(function () {
      that.setData({
        showmask3start: true
      })
    }, 700)
  },
  cancelmask2() {
    var that = this
    var ti = setTimeout(function () {
      that.setData({
        showmask2start: false
      })
    }, 300)
    var ti2 = setTimeout(function () {
      that.setData({
        showmask3start: false
      })
    }, 700)

    var ti3 = setTimeout(function () {
      that.setData({
        showmask2: false
      })
    }, 900)
  },
  // 弹窗立即升级
  gotoupNow() {
    wx.navigateTo({
      url: '/packageA/pages/applyAgent/applyAgent',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync("userInfo");
    if (user == '') { // 判断用户信息 来判别是否登录
      this.setData({
        userInfo: user
      })
    }
    //用于专属二维码分享二维码进行解码跳转
    let scene = decodeURIComponent(options.scene).split('=')[1]
    wx.setStorageSync('scene', scene); //将推荐人id存入本地,方便登录的时候获取
    if (scene) {
      // app.Login(scene)
      wx.navigateTo({
        url: '/pages/authorizationLogin/authorizationLogin',
      });
    }

    //上级代理图片
    let directlyImg = wx.getStorageSync('directlyImg');
    if (directlyImg) {
      let arr = this.data.menmbercneterThree;
      arr.forEach(v => {
        if (v.text == "直属上级") {
          v.imgurl = directlyImg
        }
      })
      this.setData({
        directlyImg,
        menmbercneterThree: arr
      })
    }

    // this.setManageData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.template.tabbar("tabBar", 3, this, app.data.cartNum) //0表示第一个tabba

    let cookie = wx.getStorageSync('cookie');
    if (cookie) {
      // 已登录  调用
      this.getMenberInfo(); // 会员信息
    }
    // this.getMenberInfo(); // 会员信息
    this.setManageData();
    this.getOldPhone(); // 获取手机号码
  },



  /* 获取旧手机号 */
  getOldPhone() {
    getOldPhone().then(res => {
      const {
        data: {
          data: {
            CellPhone
          }
        }
      } = res;
      console.log(CellPhone, '222')
      this.setData({
        openSetting: CellPhone
      })
    })


  },


  // 处理金额
  setManageData() {
    console.log(this.data.userInfo)
    // 用户信息
    let userInfo = wx.getStorageSync("userInfo");
    // let userInfo = this.data.userInfo;
    // console.log("输出本地缓存userInfo",userInfo)
    // 金额
    let userRepository = this.data.userRepository
    userRepository.forEach((i, index) => {
      if (index == 0) {
        i.num = userInfo.AnticipatedIncome
        // console.log("预计收益", i.num);
      }
      if (index == 1) {
        i.num = userInfo.Commission
        // console.log("累积佣金", i.num);
      }
      if (index == 2) {
        i.num = userInfo.Balance
        // console.log("余额", i.num);
      }
      if (index == 3) {
        i.num = userInfo.WithDraw
        // console.log("提现", i.num);
      }
    })
    let myorderBox = this.data.myorderBox
    myorderBox.forEach((j, index) => {
      // console.log("输出myorderBox", j.ordernum+'-----------'+index);
      if (index == 0) {
        j.ordernum = userInfo.waitPayCount
      }
      if (index == 1) {
        j.ordernum = userInfo.waitSendCount
      }
      if (index == 2) {
        j.ordernum = userInfo.waitFinishCount
      }
      if (index == 3) {
        j.ordernum = userInfo.waitReviewCount
      }
    })
    this.setData({
      userInfo: userInfo,
      userRepository: userRepository,
      myorderBox: myorderBox,
      vipcardInfo: wx.getStorageSync("tab")
    })
    // console.log("金额信息", userRepository);
  },


  /**
   * 签到
   * */
  onSignIn: function () {
    app.Fg({
      url: "/API/MembersHandler.ashx?action=SignIn"
    }).then(res => {
      // console.log("签到",res);
      if (res.data.Status === 'Login') {
        wx.showToast({
          title: '还未登录~~~',
          icon: 'none',
          duration: 1500,
          mask: true,
        });
      } else {
        if (res.data.Status === "Success") {
          this.setData({
            SignInpoints: res.data.points,
            SignInmask: true
          })
        } else {
          wx.showToast({
            icon: "none",
            title: res.data.Msg,
          })
        }
      }
    })
  },
  // 跳转金额
  // Todetali(e){
  //   console.log("=====",e)
  //   let { index } = e.currentTarget.ataset.index
  //   if(index){
  //     wx.
  //   }

  // },
  //关闭弹窗
  colseSignin() {
    this.setData({
      SignInmask: false
    })
  },

  getList: function (pageIndex, pageSize, SendType, isDel, isShowRead) {
    var _this = this
    wx.request({
      url: getApp().data.url + '/apI/VshopProcess.ashx/ProcessRequest',
      data: {
        action: 'GetNotic',
        pageIndex: pageIndex,
        pageSize: pageSize,
        SendType: SendType,
        isDel: isDel,
        isShowRead: isShowRead,
        sessionId: wx.getStorageSync('sessionId')
      },
      success: function (res) {
        if (res.data.Status === 'success') {
          // console.log(res)
          _this.newsData = res.data.data
          _this.setData({
            newsData: res.data.data
          })
        }
      }
    })
  },


  goMyMessage: function (e) {
    // console.log(e)
    var id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: '/pages/myMessage/myMessage?flag=false&noticeid=' + id,
    })
  },

  later: function () {
    this.setData({
      showAccount: false
    })
  },

  sure: function () {
    this.setData({
      showAccount: false
    })
    wx.navigateTo({
      url: '',
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  // 分享
  onShareAppMessage(res) {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    } else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: '分享好友',
      path: '/pages/member/member',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },

  //跳转login页面
  handleLogin() {
    wx.navigateTo({
      url: '/pages/authorizationLogin/authorizationLogin',
    });

  },

  // 客服
  getMessageData: function () {
    var _this = this
    wx.navigateTo({
      url: '../web_view/web_view'
    })
  },


  // 设置密码

  setPAssword: function () {
    if (this.data.IsOpenBalance) {

      console.log('要跳转到重置密码页面')
      wx.navigateTo({
        url: '../../packageA/pages/setPassword/setPassword',
      })
    } else {
      console.log('要跳转到设置(新增)交易密码')
      wx.navigateTo({
        url: '../../packageA/pages/addPassword/addPassword',
      })
    }
  },


  // 点击判断是否需要设置手机号码

  isTap: function () {
    this.setData({
      message_boxnoshow: !this.data.message_boxnoshow
    })
    console.log(12313123)
  },

  disableSetting: function () {
    this.setData({
      message_boxnoshow: !this.data.message_boxnoshow
    })
  }

})