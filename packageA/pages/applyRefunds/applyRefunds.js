const app = getApp();
import {
  ApplyReturn,
  Uploadimgbybase64,
  initApply,
  applyRefund
} from '../../../utils/requestApi.js';
import {
  onUploadFile
} from '../../../utils/util.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    productlist: [],
    reasonList: [],
    imgUrl: app.data.imgurl,
    reasonArr: ['收件与实际不符', '产品质量问题', '商家发错货', '尺码不适合', '其他'],
    curReason: '',
    curSelect: '0',
    voucherImg: [],
    orderId: '',
    price: 0,
    point: 0,
    orderStatus: '',
    orderType: '', //订单类型 主流 、 引流
    amount: 0, //订单总价
    orderInfo: [],
    count: 1, // 件数
    remark: '', // 备注
    logInfo: {
      ShipTo: '',
      ShipAddress: '',
      CellPhone: '',
    }, //收货人物流信息
    initData: {}, // 初始化售后的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderStatus: '' + options.status + '',
      orderId: options.orderId,
      orderInfo: wx.getStorageSync('returnRefundInfo') || [],
    });
    this.initApply();
    console.log(this.data.orderInfo);
    // wx.removeStorageSync('returnRefundInfo');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  //当前选择的radio
  onRadio(e) {
    this.setData({
      curSelect: e.detail
    });
  },
  // 初始化售后数据
  initApply() {
    const SkuId = this.data.orderInfo.length > 0 ? this.data.orderInfo[0].SkuId : '';
    initApply({
      OrderId: this.data.orderId,
      type: this.data.orderStatus == 2 ? 0 : 1,
      skuId: SkuId || '',
    }).then((res) => {
      console.log(res);
      const {
        Message,
        Status
      } = res.data;
      if (Status == 'Faile') {
        wx.showToast({
          title: Message,
          icon: 'none'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);

        return;
      }
      this.setData({
        initData: res.data,
      });
    });
  },
  // 选择退货原因
  onChange(e) {
    this.setData({
      curReason: this.data.reasonArr[e.detail.value],
    });
  },

  // input输入收货人物流信息
  onShipToInput(e) {
    let {
      logInfo
    } = this.data;
    logInfo[e.currentTarget.dataset.name] = e.detail.value;
    this.setData({
      logInfo
    });
  },
  // input输入收货人物流信息
  inputText(e) {
    const {
      currentTarget: {
        dataset: {
          name
        }
      },
      detail: {
        value
      }
    } = e;

    const maxCount = this.data.initData.SkuInfo[0].Quantity;

    if (name == 'count') {
      this.data[e.currentTarget.dataset.name] = value > maxCount ? maxCount : value;

    } else {
      this.data[e.currentTarget.dataset.name] = value;
    }


    this.setData({
      count: this.data.count,
      remark: this.data.remark
    });
  
  },

  // 提交
  onSubmit(e) {
    let {
      curReason,
      logInfo,
      count,
      remark,
      orderId,
      voucherImg,
      orderStatus,
      orderInfo,
      initData
    } = this.data;
    console.log(e);
    if (curReason == '') {
      return wx.showToast({
        icon: 'none',
        title: '请选择原因'
      });
    }

    
    if (orderStatus == 2) {
      applyRefund({
        OrderId: orderId, //	是	string	订单Id
        Remark: remark || '', //	否	string	备注文本
        refundType: initData.TypeList[0] || 1, //	是	int	退款方式
        RefundReason: curReason || '', //	是	string	退款原因
      }).then((res) => {
        // console.log("输出申请退款状态",res);
        if (res.data.Status == 'Success') {
          wx.hideLoading();
          wx.showToast({
            title: res.data.Message,
            icon: 'none',
            duration: 1500,
            mask: true,
            success: (result) => {
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1,
                });
              }, 1500);
            },
            fail: () => {},
            complete: () => {},
          });
        } else {
          wx.showToast({
            title: res.data.Message,
            icon: 'none',
          });
        }
      });
    } else {
      if (Number(count) > initData.SkuInfo[0].Quantity) {
        return wx.showToast({
          icon: 'none',
          title: '请输入正确的数量'
        });
      }

      ApplyReturn({
        orderId: orderId,
        skuId: orderInfo[0].SkuId,
        Quantity: count,
        Remark: remark || '', //	否	string	备注文本
        RefundReason: curReason,
        afterSaleType: orderStatus == 2 ? 0 : 1,
        UserCredentials: voucherImg.join(','),
        ShipTo: initData.ShipTo,
        ShipAddress: initData.ShipAddress,
        CellPhone: initData.CellPhone,
      }).then((res) => {
        wx.showToast({
          title: res.data.Message,
          icon: 'none',
        });
        if (res.data.Status == 'Success') {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }
  },

  // 上传图片
  onUpdate() {
    let {
      voucherImg
    } = this.data;

    wx.chooseImage({
      count: 1,
      success: (res) => {
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
       
          success: (data) => {
            Uploadimgbybase64({
              baseStr: data.data,
            }).then((res2) => {
              if (res2.data.Status == 'Success') {
                voucherImg = [...voucherImg, res2.data.Message];
                this.setData({
                  voucherImg
                });
              }
            });
          },
        });
      },
    });
  },

  // 删除图片
  onClear(e) {
    let {
      voucherImg
    } = this.data;
    let {
      index
    } = e.currentTarget.dataset;
    voucherImg.splice(index, 1);
    this.setData({
      voucherImg
    });
  },

  // 查询订单在代理系统中的状态（主要是备货订单）
  getOrderStatus() {
    let {
      orderType,
      orderStatus,
      orderId
    } = this.data;
    getKjOrderStatus({
      OrderId: orderId,
    }).then((res) => {
      if (res.data.Status == 'Success') {
        let s = res.data.Data.Data.Status;
        if (orderType == 0) {
          //主流订单
          this.setData({
            curSelect: s == 0 ? '0' : '1',
            orderStatus: s == 0 ? 0 : 3,
          });
        } else {
          //引流订单
          this.setData({
            curSelect: s == 2 && (orderStatus == 2 || orderStatus == 100) ? '0' : '1',
            orderStatus: s == 2 && (orderStatus == 2 || orderStatus == 100) ? 0 : 3,
          });
        }
      }
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});