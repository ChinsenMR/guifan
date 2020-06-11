import { getFightGroupInfo } from "../../utils/requestApi";
import {countdown} from '../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.data.imgurl,
    joinGroup: false,  // 拼团成功： true，  拼团失败： false
    fightInfo:{}, // 参团产品数据
    groupUser:[], // 参团人员
    id:null, // 从拼团列表过来的id
    limitHours: '00',
    limitMin: '00',
    limitSecond: '00',
    isShow:false,
    shareInfo: {},
    productid:'',//1商品id
    prDid:'', //2商品id(支付的时候带过来的)
    fightId:null, // 支付完  跳转传过来的拼团id
    huodong:'fightgroup', //活动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options+++", options);
    let id = options.id;
    this.setData({
      joinGroup:options.linkType,
      id,
      productid: options.productid,
      fightId: options.FightGroupId,
      prDid: options.prDid
    })
    this.getFightData(id)

    setInterval(() => {
      this.Clusterdata()
    }, 1000)


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 拼团详情数据
  getFightData(id){
    getFightGroupInfo({
      FightGroupId: id || this.data.fightId
    }).then(res=>{
      console.log("拼团详情数据",res);
      if(res.data.Status=="Success"){

        let obj = res.data

        if (obj.FightGroupUsers.length==2){
          this.setData({
            joinGroup:true
          })
        }
        this.setData({
          fightInfo: obj,
          groupUser: obj.FightGroupUsers,
        })
      }
    })
  },

  // 参团数据
  Clusterdata() {
    let {
      fightInfo
    } = this.data;
    let endDate = countdown(fightInfo.EndTime);
    fightInfo.limitHours = endDate.limitHours;
    fightInfo.limitMin = endDate.limitMin;
    fightInfo.limitSecond = endDate.limitSecond;
    this.setData({
      fightInfo
    })
  },
  // 分享
  onShare(id) {
    var _this = this
    wx.request({
      url: getApp().data.url + '/API/QrcodeHandler.ashx?action=GetProductQrcode',
      data: {
        Type: 1,
        // Path: 'pages/goodsDetail/goodsDetail?prDid=' + this.data.prDid + '&pagetype=' + this.data.pageType,
        Path: 'pages/goodsDetail/goodsDetail?prDid=' + id + '&pagetype=' + 6,
        SalePrice: this.data.fightInfo.SalePrice,
        ProductId: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        Cookie: wx.getStorageSync('cookie') || app.data.cookie
      },
      success: function (res) {
        console.log("分享好友数据",res);
        console.log("+++++++", _this.data.productid);
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
  // 点击按钮
  handleBtn(e){
    let {
      ProductSku,
      groupId,
      ProductId,
      FightGroupId,
      
      NowNum,
    } = this.data.fightInfo
    console.log(e);
    let { index,pid } = e.currentTarget.dataset;
    // console.log(index);
    if(index==1){
      //更多拼团
      let myId = this.data.productid || this.data.prDid 
      wx.navigateTo({
        url: '/pages/goodsDetail/goodsDetail?prDid=' + myId + '&pagetype=6',
      });
        
    }else if(index==2){
      //邀请好友
      this.onShare(pid);
    }else if(index==3){
      //参团
      let myid = this.data.fightId || FightGroupId
      wx.navigateTo({
        url: `/pages/confirmationOfOrder/confirmationOfOrder?fromPage=fightgroup&sku=${ProductSku.trim()}
        &buyAmount=${NowNum}&productSku=${ProductSku.trim()}&groupId=${groupId}&ProductId=${ProductId}&FightGroupId=${myid}`,
      });
    }else{
      //我也开一团
      wx.navigateTo({
        url: `/pages/confirmationOfOrder/confirmationOfOrder?fromPage=fightgroup&sku=${ProductSku.trim()}
        &buyAmount=${NowNum}&productSku=${ProductSku}&groupId=${groupId}&ProductId=${ProductId}`,
      });
    }
  },

  // 我也开一团

  
})