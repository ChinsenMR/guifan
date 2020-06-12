const app = getApp();
import {
  getExpressInfo,
  orderDetail,

} from '../../../utils/requestApi'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsInfoList: [],
    params: {},
    active: 0,
    imageURL: '',
    steps: [

    ],

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      params: options
    });
    this.getExpressInfo()
    this.orderDetail();

    // this.getExpressInfo()


  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  seeOrderDetail() {
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?id=${this.data.params.orderId}`,

    });
  },
  orderDetail() {
    const {
      params: {
        orderId
      }
    } = this.data;
    orderDetail({
      orderId
    }).then(res => {

      const {
        Data = {},
          Data: {
            Suppliers = []
          }
      } = res.data;



      if (Suppliers.length > 0) {
        const LineItems = Suppliers[0].LineItems || [];

        this.data.goodsInfoList = LineItems
      }

      this.setData({
        goodsInfoList: this.data.goodsInfoList
      })
      console.log(this.data.goodsInfoList, '1111')
    })
  },
  getExpressInfo() {
    const {
      params: {
        orderId
      }
    } = this.data;
    getExpressInfo({
      orderId
    }).then(res => {

      const {
        data: {
          data = [],
        }
      } = res;
      const {
        steps
      } = this.data;

      data.reverse().forEach(item => {
        steps.push({
          text: item.context,
          desc: item.time
        })
      })

      this.setData({
        steps,
        active: steps.length - 1
      })
    })
  }

});