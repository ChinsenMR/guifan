const app = getApp()
import { getindexsharedata } from '../../utils/requestApi.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curActive: {
      type: Number,
      value: 0
    },
    tabH:Number || String
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: app.data.imgurl,
    isDefault: null, //判断是否为默认tab
    // 默认tab
    dList: [], 
    list: [{
        t: '首页',
        i: 'icon_shouye@2x.png',
        si: 'icon_shouye@2x (4).png',
        u: 'index',
        w: 47
      },
      {
        t: '升会员',
        i: 'huiyuan.png',
        si: 'huiyuan_select.png',
        u: 'upgradeMember',
        w: 57
      },
      {
        t: '掌柜',
        i: 'icon_zhuanqian@2x.png',
        si: 'icon_zhuanqian_seleted@2x.png',
        u: 'shopkeeperList',
        w: 45
      },
      {
        t: '购物车',
        i: 'icon_gouwuche@2x.png',
        si: 'icon_gouwuche@2x_2.png',
        u: 'cart',
        w: 59
      },
      {
        t: '我的',
        i: 'icon_wode@2x (1).png',
        si: 'icon_wode@2x.png',
        u: 'member',
        w: 42
      }
    ],
    cList: [], //自定义tab
    showShare: false,
    sImgArr: [], //分享图片数组
    currentIndex: 0
  },

  pageLifetimes: {
    show() {
      console.log('list===========', this.data.list)
      let { dList, cList, list, isDefault } = this.data;
      let timer = setInterval(() =>{
        if (wx.getStorageSync('tab')) {
          clearInterval(timer)
          if (wx.getStorageSync('tab').WapTheme != 'fruit') {
            isDefault = 2
            cList = wx.getStorageSync('tab').TopMenus
            cList.forEach(item => {
              if (item.Content2 == 'upgradeMember') {
                if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo').StoreId == 0) {
                  item.Content2 = 'pages/upgradeMember/upgradeMember'
                  item.Name = '升级'
                } else {
                  item.Content2 = 'pages/shopkeeperList/shopkeeperList'
                  item.Name = '掌柜'
                }
              }
            })
          }else{
            isDefault = 1
            dList = JSON.stringify(list)
            dList = JSON.parse(dList)
            if (wx.getStorageSync('userInfo') && wx.getStorageSync('userInfo').StoreId != 0) dList.splice(1, 1)
            else dList.splice(2, 1)
          }
          this.setData({ dList, cList, isDefault })
        }
      },10)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 判断tab显示样式
    showTab(){
      
    },

    onShare(e){
      if (e.currentTarget.dataset.type == 'close') { this.setData({ showShare: false }); return }
      wx.showLoading({ title: '获取中...' })
      getindexsharedata({
        Type: 1,
        Path: 'pages/home/home'
      }).then(res =>{
        wx.hideLoading()    
        if (res.data.Status == 'Login' || res.data.Status == 'Faile') {
          // if (res.data.Status == 'Login'){
          //   console.log("未登录");
          //   wx.navigateTo({
          //     url: '/pages/authorizationLogin/authorizationLogin',
          //   })
          // }else {
          //   wx.showToast({ icon: 'none', title: res.data.Message })
          // }
          wx.showToast({ icon: 'none', title: res.data.Message })
        } else this.setData({ sImgArr: res.data.Result.Data, showShare: true })
        
      })
    },

    // 分享
    onInvite(){
      
    },

    // 获取swiper  current
    onChange(e){
      this.setData({ currentIndex: e.detail.current })
    },

    // 保存图片
    onSave(){
      let { sImgArr, currentIndex } = this.data;
      wx.showLoading({ title: '保存中...' })
      wx.downloadFile({
        url: sImgArr[currentIndex].url,
        success(res) {
          wx.hideLoading()
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                wx.showToast({ icon: 'none', title: '保存成功' })
              },
              fail() {
                wx.showToast({ icon: 'none', title: '保存失败' })
              }
            })
          }
        }
      })
    }
  }
})