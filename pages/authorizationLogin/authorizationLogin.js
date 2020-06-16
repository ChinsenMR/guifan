import {
  subBindTemReferral,
  bindBaseAgent
} from '../../utils/requestApi';
const app = getApp();
Page({
  data: {
    cookie: null, // cookie
    navHeight: null, // 导航栏高度
    statusBarHeight: null, // 状态栏高度
    userInfo: null, // 用户信息
    openid: null,
    sessioKey: null,
    cartNum: 0, //购物车总条数
    sku: null, // 商品规格
    nickName: '', //微信用户名
    headImage: '', // 微信头像
    scene: '', // 下属id
  },

  onLoad() {
    let scene = wx.getStorageSync("scene");
    if (scene) this.setData({
      scene
    })
  },
  /**
   *授权 
   **/
  bindGetUserInfo(e) {
    console.log(e)
    this.setData({
      nickName: e.detail.userInfo.nickName,
      headImage: e.detail.userInfo.avatarUrl,
    })
    if (e.detail.userInfo) {
      this.Login(e.detail.userInfo.nickName, e.detail.userInfo.avatarUrl)
    }
  },

  // 登录
  Login: function (nickName, headImage) {
    wx.showLoading({
      title: '登录中...'
    })
    wx.request({
      method: 'GET',
      url: app.data.url + '/API/PublicHandler.ashx?action=QuickLogin',
      data: {
        openId: app.data.openid, //this.data.openid
        // openId: 'o4a-f4oivdAkg4UIS-x5-Ah6xeXg', 
        openType: 'hmeshop.plugins.openid.wxapplet',
        nickName: nickName,
        headImage: headImage,
        referralUserId: this.data.scene || wx.getStorageSync("scene")
      },
      success: res => {
        console.log('登录输出值', res);
        wx.hideLoading()
        if (res.data.Status == 'Success') {
          let userInfo = res.data.Data;
          let cookie = res.data.Cookie
          app.data.cookie = res.data.Cookie
          wx.setStorageSync('cookie', res.data.Cookie)
          wx.setStorageSync('USER_ID', res.data.UserId)
          this.setData({
            cookie,
            userInfo
          })
          this.getdefaultmode();
          wx.showToast({
            icon: 'none',
            title: '登录成功'
          })


          /* 如果有代理ID那么就绑定 */
          if (app.globalData.AGENT_ID && !app.globalData.isBindAgent) {

            bindBaseAgent({
              ReferralUserId: app.globalData.AGENT_ID
            }).then(res => {
              const {
                Code,
                Msg
              } = res.data;

              if (Code == 1) {
                app.globalData.isBindAgent = true;
                wx.showModal({
                  title: '绑定上级关系',
                  content: Msg,
                  showCancel: true,
                  success: res => {
                    wx.navigateBack()
                  }
                })
              } else {
                wx.navigateBack()
              }
            })

          } else {
            wx.navigateBack()
          }

        }
      }
    })
  },

  //切换不用的样式
  getdefaultmode() {
    wx.request({
      url: app.data.url + '/api/PublicHandler.ashx?action=GetWebSet',
      success(res) {
        wx.setStorageSync("tab", res.data.Result)
      }
    })
  },

  // 扫二维绑定关系
  // bindRelation(id) {
  //   let data = {
  //     ReferralUserId: id || wx.getStorageSync('scene')
  //   }
  //   subBindTemReferral(data).then(res => {
  //     console.log("绑定状态", res);
  //   })
  // },


  // 回到首页
  handleHome() {
    wx.navigateTo({
      url: '/pages/index/index',
    });
  }


})