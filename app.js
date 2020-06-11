import verify from './utils/verify';
// 底部
var template = require('template/template.js');

App({
  verify,
  onLaunch: function() {
    this.getdefaultmode();
    let that = this;
    //获取手机信息
    wx.getSystemInfo({
      success: res => {
        // console.log("获取手机信息",res);
        let titleBarHeight
        let system = res.system;
        //胶囊高度32px
        if (system.indexOf("iOS")>-1){
          //ios手机标题栏高度
          titleBarHeight = 44
        }
        if (system.indexOf("Android")>-1) {
          //安卓手机标题栏高度
          titleBarHeight = 48
        }
        this.data.navHeight = titleBarHeight + res.statusBarHeight;
        this.data.statusBarHeight = res.statusBarHeight;
      }
    })

    wx.login({ // 获取code换取openid
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            method: 'GET',
            url: that.data.url + '/API/WeChatApplet.ashx?action=GetOpenId',
            data: {
              appid: 'wx8036a11f24f24239',
              secret:'c5e91641ec806ab0154ca4f26a68e43b',
              js_code: res.code
            },
            success: function(res) {
              console.log("获取openid", res.data.openid);
              that.data.sessioKey = res.data.session_key;
              that.data.openid = res.data.openid;
              // that.data.openid = 'o4a-f4oivdAkg4UIS-x5-Ah6xeXg';
              wx.setStorageSync('openid', res.data.openid);
                
            }
          })
        }else {
          console.log('登录失败'+res.errMsg);
        }
      }
    })
  },
 
  onShow(options) {
    console.log(options);
  },
  // 登录
  Login: function(referralUserId) {
    console.log("调用login绑定上级", referralUserId)
    wx.request({
      method: 'GET',
      url: this.data.url + '/API/PublicHandler.ashx?action=QuickLogin',
      data: {
        openId: this.data.openid, //this.data.openid
        openType: 'hmeshop.plugins.openid.wxapplet',
        referralUserId: referralUserId ? referralUserId : ''
      },
      success: res => {
        console.log('登录成功：：：', res)
        this.data.userInfo = res.data.Data;
        this.data.cookie = res.data.Cookie
        this.getInfo();
        this.getdefaultmode();
      }
    })
  },
  // 获取用户信息
  getInfo: function() {
    wx.request({
      url: this.data.url + '/API/MembersHandler.ashx?action=GetMember',
      header: {
        Cookie: this.data.cookie
      },
      success: function(res) {
        wx.setStorageSync("userInfo", res.data.Data)
      }
    })
  },
  //切换不用的样式
  getdefaultmode() {
    wx.request({
      url: this.data.url + '/api/PublicHandler.ashx?action=GetWebSet',
      success(res) {
        wx.setStorageSync("tab", res.data.Result)
      }
    })
  },
  // get请求
  Fg: function(Data) {
    let {url,data} = Data
    let _this = this
    return new Promise((reslove, reject) => {
      wx.request({
        url: this.data.url + url,
        data: data ? data : '',
        header: {
          Cookie: wx.getStorageSync('cookie') || _this.data.cookie
        },
        success(res) {
          reslove(res)
        }
      })
    })
  },
  // post请求
  Fnpost: function(Data) {
    let {
      url,
      data
    } = Data
    let _this = this
    return new Promise((reslove, reject) => {
      wx.request({
        url: this.data.url + url,
        data: data ? data : '',
        header: {
          Cookie: wx.getStorageSync('cookie') || _this.data.cookie
        },
        success(res) {
          reslove(res)
        }
      })
    })
  },

  //多图片上传方法
   uploadimg(data){
    var that=this,
    i=data.i?data.i:0,//当前上传的哪张图片
    success=data.success?data.success:0,//上传成功的个数
    fail=data.fail?data.fail:0;//上传失败的个数
       wx.uploadFile({
       url: data.url, 
       filePath: data.path[i],
       name: 'file',//这里根据自己的实际情况改
       formData:null,//这里是上传图片时一起上传的数据
       success:(resp)=>{
          success++;//图片上传成功，图片上传成功的变量+1
          console.log(resp)
          console.log(i);                
          //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1 
       },
       fail:(res)=>{
           fail++;//图片上传失败，图片上传失败的变量+1
           console.log('fail:'+i+"fail:"+fail);
       },
       complete:()=>{
           console.log(i);
           i++;//这个图片执行完上传后，开始上传下一张            
           if(i==data.path.length){   //当图片传完时，停止调用          
               console.log('执行完毕');
               console.log('成功：'+success+" 失败："+fail);
           }else{//若图片还没有传完，则继续调用函数                
             console.log(i);
             data.i=i;
             data.success=success;
             data.fail=fail;
             that.uploadimg(data);
           }
       }
   });
},


  globalData: {
    template: template,
  },

  data: {
    cookie: null, // cookie
    navHeight: null, // 导航栏高度
    statusBarHeight: null, // 状态栏高度
    userInfo: null, // 用户信息
    openid: null,
    sessioKey: null,
    cartNum: 0, //购物车总条数
    referralUserId: null, // 推荐人ID
    sku: null, // 商品规格
    // 线上的小图标地址
    imgurl: 'http://img.hmeshop.cn/hmeshop_jxy/images/',
    // 江小鱼v3.0服务器本地
    // url: 'http://192.168.3.108:99',
    // url:'http://192.168.3.32:8090'
    // 江小鱼v3.0服务器线上
    //url: 'https://dlyl.hmeshop.cn'


    /// url:'http://192.168.3.86:8088' // 本地
     // 线上
     url:'https://foreverenjoy.guifang.net.cn'   
  }
})