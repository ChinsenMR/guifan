const app = getApp();
import {
  getOrderReturn,
  getReturnFlow,
  finishReturn,
  turnDownReturn,
  checkExpressDetail
} from "../../../utils/requestApi";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    status: undefined,
    arrowDown: "https://img.hmeshop.cn/hmeshopV3/Storage/master/202005151604326108790.png",
    arrowUp: "https://img.hmeshop.cn/hmeshopV3/Storage/master/202005151604327515011.png",
    isShowExpress: true,
    fromType: null,
    params: {
      id: '',
      type: '',
      orderId: '',
      skuId: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      params: options
    });


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderSatus();
    this.getReturnFlow();
  },
  /* 折叠展示 */
  handleArrow() {
    this.setData({
      isShowExpress: !this.data.isShowExpress,
    });
  },
  /* 查看图片 */
  seeImage(e) {
    const {
      currentUrl
    } = e.currentTarget.dataset;
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.data.UserCredentialList, // 需要预览的图片http链接列表
    });
  },
  /* 获取订单详情 */
  getOrderSatus() {
    const {
      params: {
        id,
        type,
        skuId
      }
    } = this.data;

    getOrderReturn({
      id,
      type,
      skuId
    }).then((res) => {
      const {
        Status,
        Message
      } = res.data;

      if (Status == "Faile") {
        return wx.showToast({
          title: Message,
          icon: "none",
        });
      }

      this.setData({
        data: res.data,
      });
    });
  },
  /* 获取物流步骤 */
  getReturnFlow() {
    const {
      params: {
        orderId
      }
    } = this.data;

    getReturnFlow({
      orderId
    }).then((res) => {
      const {
        Data,
        StatusCode
      } = res.data;

      this.setData({
        status: StatusCode,
        expressSlider: Data,
      });
    });
  },
  /* 确认收货 */
  confirm() {
    const formData = {
      ReturnsId: this.data.returnId,
      Remark: "",
    };

    finishReturn(formData).then((res) => {
      const {
        Status,
        Message
      } = res.data;

      wx.showToast({
        title: Message,
        icon: "none",
      });

      if (Status != "success") {
        return;
      }

      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        });
      }, 2000);
    });
  },
  /* 拒绝申请 */
  turnDown() {
    const {
      Status,
      Message
    } = res.data;

    const formData = {
      ReturnsId: this.data.returnId,
      Remark: "",
    };

    turnDownReturn(formData).then((res) => {
      wx.showToast({
        title: Message,
        icon: "none",
      });
      if (Status != "success") {
        return;
      }
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        });
      }, 2000);
    });
  },
  /* 查看物流 */
  seeExpressStep(e) {
    const {
      orderId
    } = this.data.params;

    checkExpressDetail({
      orderId
    }).then(res => {
      const {
        Data: {
          url
        },
        Code
      } = res.data

      if (Code != 1) {
        return wx.showToast({
          title: '获取物流信息失败'
        })
      }

      wx.setStorage({
        key: 'webViewUrl',
        data: url,
        success: (result) => {
          wx.navigateTo({
            url: `../expressDetail/expressDetail`
          })
        },
      });


    })

  }
});