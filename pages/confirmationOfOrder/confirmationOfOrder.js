import {
  getAddressList,
  getOrderInfo,
  submitOrderInfo,
  payOrder,
  getInvoice,
  selectInvoiceType
} from "../../utils/requestApi";

import {
  toPay
} from '../../utils/util.js';

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked_fp: false, //用来判断是否需要发票
    checked_is_link: true, //用来判断是否需要发票进行下一步操作
    show: false, //用来判断选择发票类型
    active1: 0, //用来切换选择发票类型
    radio: 'person',
    vatInvoiceData: {},
    ReceiveEmail: '',
    ReceivePhone: '',
    ReceivePhone_Temp: '',
    ReceiveAddress: '',
    Phone: '',
    ApplyId: '', // 代理ID，申请成为代理就有
    Id: 0,
    activeStyle: 1,
    needInvoice: false, // 是否需要开发票needInvoice
    invoiceId: '', // 是否需要开发票invoiceId
    NewInvoiceId: '', // 要传给后台的发票NewInvoiceId
    ShipToDate: '',
    invoiceType: '请选择发票类型',
    IsApply: false,
    TaxRate: 0.1,
    personArr: {},
    companyArr: {},
    vatArr: {},
    ship_todate: '', // 订单配送时间
    IsExistReferral: '', // 如果为false弹出邀请码，true就不弹出邀请码 
    needUpLevel: false, // 获取代理系统的等级列表及所需条件  true 是要跳转到申请代理页面，则false不需要 
    ProductList: [], // 获取代理系统的等级列表及所需条件(产品id数组)
    autocode: '', // 邀请码
    imgurl: app.data.imgurl,
    express: ['顺丰', '圆通', '中通', '韵达'],
    expressVal: '', // 快递值
    defaultAddressData: null, //地址
    orderInfo: null, //商品列表
    goodsNum: 0, // 商品列表总数
    goodsTotalPrice: 0, //商品总价
    TotalPrice: 0, //订单总价值
    TaxData: 0, //税费 
    sku: null, //商品id
    fromPage: null,
    hiddenPay: true, //支付modal
    payType: false, // 选择支付类型
    buyAmount: null, //
    groupId: null, //拼团活动id
    couponList: null, //优惠券 
    FightGroupId: 0, //开团为0，参团为FightGroupId
    isDefault: true,
    OrderFreight: 0, //运费
    Balance: 0, // 余额
    deduction: false, // 控制是否采用余额抵消
    doorto: 0, // (0快递-1门店-2自提)
    zhifu: 0, // 控制支付
    remark: '', // 备注
    orderStatus: false, // 自提信息的显示隐藏
    amount: true, // 控制订单号的获取,false才可以支付
    BalanceAmount: 0, //可用于抵扣的值
    couponData: {}, // 选中的优惠卷数据
    prDid: null, //商品id
    tuxedo: '', //判断是不是从详情那边立即参团跳过来的字符串,

    beforeComputedPrice: null, // 未经计算金额的总价
    isAllowBuy: true, // 购买限制条件，为true允许购买
    confirmIng: false,
    finshedOrder: false,
  },

  onLoad: function (opt) {
    console.log("跳转确认订单的数据opt", opt);

    if (wx.getStorageSync('tab').WapTheme != 'fruit') {
      this.setData({
        isDefault: false
      })
    }

    let {
      sku,
      fromPage,
      buyAmount,
      groupId,
      FightGroupId,
      prDid,
      ProductId,
      productSku,
      tuxedo,
    } = opt;

    this.setData({
      sku,
      fromPage,
      buyAmount,
      groupId,
      FightGroupId,
      prDid,
      ProductId,
      productSku,
      tuxedo
    })

    if (!fromPage) {
      this.setData({
        fromPage: ''
      })
    }

  },

  // 选择配送时间
  activeSip: function (e) {
    var _this = this
    let activeStyle = e.currentTarget.dataset.index
    let ShipToDate = e.currentTarget.dataset.text
    console.log(activeStyle, ShipToDate)
    _this.setData({
      activeStyle,
      ShipToDate
    })
  },

  // 请求微信发票抬头  暂时没用上
  deductions1: function () {
    var _this = this
    wx.chooseInvoiceTitle({
      success(res) {
        let chooseInvoiceTitleData = res
        console.log(chooseInvoiceTitleData);
        //console.log(typeof(chooseInvoiceTitleData))
        _this.setData({
          vatInvoiceData: chooseInvoiceTitleData
        })

        // 请求返回的发票信息 
        // bankAccount: "1209 0928 2210 301"
        // bankName: "招商银行股份有限公司广州市体育东路支行"
        // companyAddress: "广州市海珠区新港中路397号自编72号(商业街F5-1)"
        // errMsg: "chooseInvoiceTitle:ok"
        // taxNumber: "91440101327598294H"
        // telephone: "020-81167888"
        // title: "广州腾讯科技有限公司"
        // wx.chooseInvoice({
        //   success(res){
        //     console.log(res)
        //   }
        // })
        // chooseInvoiceTitleData.forEach(item=>{
        //   console.log('发票信息'+ item)
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.finshedOrder) {
      wx.showModal({
        content: '订单已支付',
        showCancel: false,
        complete: () => {
          wx.navigateBack()
        }
      })
    }
    this.setData({
      goodsNum: 0
    })
    // this.initData();
    this.getdefaultAddress()
  },

  //选择快递
  selectExpress: function (e) {
    this.setData({
      expressVal: this.data.express[e.detail.value]
    })
  },


  //打开地址页面
  goaddress: function () {
    wx.navigateTo({
      url: '../receivingAddress/receivingAddress?fromType=confirmOrder',
    })
  },


  //获取地址
  getdefaultAddress() {
    getAddressList({}).then(res => {
      if (res.data.Status == "Success") {
        console.log("获取地址", res)
        this.setData({
          defaultAddressData: res.data.Data[0]
        })
        this.initData()
      } else if (res.data.Status == "Login") {
        wx.showToast({
          title: '还未登录~~~',
          icon: 'none',
          duration: 2000,
          mask: true,
          success: (result) => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
          },

        });

      }
    })
  },

  //初始化页面数据
  initData: function () {
    let {
      fromPage,
      sku,
      buyAmount,
      ProductId,
      productSku,
      FightGroupId,
      tuxedo,
      beforeComputedPrice,
      needUpLevel,
      ProductList,

    } = this.data;

    wx.showLoading({
      title: '加载中...',
    })

    let {
      goodsNum,
      goodsTotalPrice,
      defaultAddressData,
      groupId,
      ApplyId
    } = this.data;

    groupId = groupId ? groupId.trim() : '';

    getOrderInfo({
      shipAddressId: defaultAddressData.ShippingId,
      fromPage: fromPage ? fromPage.trim() : '',
      productSku: sku.trim() || productSku.trim(),
      buyAmount: buyAmount || '',
      fightGroupActivityId: groupId,
      FightGroupId: tuxedo == 'tuxedo' ? FightGroupId : '',
      IsApply: ApplyId > 0
    }).then(res => {

      wx.hideLoading();

      if (res.data.Status !== 'Success') {

        return wx.navigateBack({
          success: () => {
            wx.showModal({
              content: res.data.Message == null ? '错误订单' : res.data.Message
            });
          }
        });

      }

      let {
        Data: {
          Balance,
          OrderFreight,
          ProductItems,
          goodsNum,
          goodsTotalPrice,
          CouponList,
          IsExistReferral,
          TaxRate,
          VATTaxRate,
          TotalPrice,
          IsUpdateGradeCondition,
          IsAllowBuy,
          NollowBuyMsg
        },
        Data = {},
        Status,
        Message
      } = res.data;



      if (Status == 'Success') {

        /* 代理商购买商品超过十件，不允许购买 */
        if (!IsAllowBuy) {
          wx.showModal({
            content: NollowBuyMsg,
            showCancel: false,
            complete: () => {
              wx.navigateBack()
            }
          })
        }

        let ProductLists = new Array()

        ProductItems.forEach(item => {
          // 商品总数
          goodsNum = item.Quantity
          // 第一次 计算所有商品价格
          goodsTotalPrice = TotalPrice;

          beforeComputedPrice = TotalPrice;
          // 商品列表赋值

          ProductLists.push(item.ProductId)
        })

        console.log(ProductLists)

        needUpLevel = IsUpdateGradeCondition;
        ProductList = ProductLists
        this.setData({
          Balance,
          OrderFreight,
          orderInfo: ProductItems,
          goodsNum,
          goodsTotalPrice,
          couponList: CouponList,
          IsExistReferral,
          needUpLevel,
          beforeComputedPrice,
          ProductList, // 前端的商品列表
          TaxRate,
          VATTaxRate,
          TotalPrice
        })
        console.log(needUpLevel, IsUpdateGradeCondition, this)


        // // needUpLevel 为 true 是否满足去申请代理
        if (needUpLevel && IsExistReferral) {
          wx.showModal({
            content: '需要升级代理才能购买本产品',
            complete: res => {
              console.log(res)
              if (res.confirm) {
                return wx.navigateTo({
                  url: '/packageA/pages/applyAgent/applyAgent?ProductLists=' + JSON.stringify(ProductList)
                })
              } else {
                wx.navigateBack()
              }

            }
          })
        }

      } else {

        wx.showModal({
          title: '提示',
          content: Message,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              });
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })

      }
    })



  },



  //确认订单
  submintOrder(type) {


    if (type && type === 'sub') {
      this.setData({
        confirmIng: true
      })
    }



    this.setData({
      amount: false // 用于改变状态  可以获取到订单号
    })
    this.submitData(); // 提交订单
  },

  // 订单提交数据
  submitData(cannel) {

    let {
      fromPage,
      sku,
      defaultAddressData,
      buyAmount,
      groupId,
      zhifu,
      productSku,
      deduction,
      prDid,
      invoiceType,
      Balance,
      checked_fp,
      goodsTotalPrice,
      ApplyId,
      confirmIng,
      finshedOrder,
      needUpLevel
    } = this.data;



    wx.showLoading({
      mask: true
    })

    if(!ApplyId && needUpLevel){
      return wx.showToast({
        icon: "none",
        title: '需要升级代理才能购买本产品',
      })
    }

    if (checked_fp && invoiceType == '请选择发票类型') {
      return wx.showToast({
        icon: "none",
        title: '请填写发票信息',
      })
    }

    if (!defaultAddressData.ShippingId) {
      return wx.showToast({
        icon: "none",
        title: '请选择一个地址',
      })
    }

    const formData = {
      shippingId: defaultAddressData.ShippingId, //收货地址id（测试值43）
      productSku: sku.trim() || groupSku, //购物车商品规格 多个商品用,隔开
      fromPage: fromPage == '' ? '' : fromPage ? fromPage.trim() : 'signbuy', // 活动（详情见备注）
      buyAmount: buyAmount || '', // 购买数量
      fightGroupActivityId: fromPage == 'signbuy' ? '' : groupId, // 拼团活动ID
      FightGroupId: fromPage == 'signbuy' ? '' : this.data.FightGroupId, // 参团的拼团ID，开团为0
      OrderSource: 8,
      couponCode: this.data.couponData.code || '', //优惠劵代码 this.data.couponData.price
      remark: this.data.remark || '', //	备注
      IsAdvancePay: this.data.deduction, // 是否使用余额抵扣
      IsGetOrderTotal: this.data.amount, // 是否只计算订单金额（true只计算金额false生成订单）
      ShippingModeId: this.data.doorto, // 配送方式(0快递-1门店-2自提)
      invoiceId: this.data.invoiceId, //是否需要开发票需要传的id值
      needInvoice: this.data.needInvoice, //是否需发票
      ShipToDate: this.data.ShipToDate, //配送时间
      IsApply: this.data.IsApply,
      ApplyId // 代理ID

    }

    submitOrderInfo(formData).then(res => {

      const {
        FightGroupId,
        Status,
        Message,
        OrderTotal,
        OrderId
      } = res.data;


      const IS_GROUP_ORDER = FightGroupId; /* 是否为团购 */
      const PAY_TYPE = Boolean(zhifu == 1); /* 是否需要调起支付 */
      const IS_OPEN_INVOICE = deduction; /* 是否已开启余额抵扣 */

      /* 跳转到团购详情 */
      const goPageToGroup = () => {
        wx.showLoading({
          title: '加载中...',
          mask: true,
          success: (result) => {
            setTimeout(() => {
              wx.hideLoading();
              0
              wx.navigateTo({
                url: `/pages/groupDetail/groupDetail?fromPage=${fromPage}&FightGroupId=${FightGroupId}&sku=${sku}&prDid=${prDid}`,
              })
            }, 1000);
          },
        });
      }

      /* 生成订单并跳转到结果页面 */
      const goPayOrder = () => {

        payOrder({ //将订单号传给后台
          orderId: OrderId,
          pinId: FightGroupId
        }).then(res => {
          clearToast();
          const {
            Status
          } = res.data;
          if (Status === 'Success') {
            finshedOrder = true;
            if (IS_GROUP_ORDER) {
              wx.navigateTo({
                url: `/pages/groupDetail/groupDetail?FightGroupId=${FightGroupId}&prDid=${prDid}`,
              })
            } else {
              wx.navigateTo({
                url: `/pages/paySuccess/paySuccess?total=${goodsTotalPrice}`,
              })
            }
          } else {
            return wx.showModal({
              content: '订单生成失败'
            })
          }

        })
      }

      /* 调起微信支付 */
      const pay = () => {

        toPay(OrderId, (res) => {
          wx.navigateTo({
            url: `/pages/paySuccess/paySuccess?total=${goodsTotalPrice}`,
          });
        });

      }
      /* 清除弹窗 */
      const clearToast = () => {
        let timeout = setTimeout(() => {
          wx.hideLoading();
          clearTimeout(timeout);
        }, 1000);
      }

      /* 订单计算成功 ，这里还没生成订单*/
      if (Status == "Success") {



        if (PAY_TYPE) { // 为1的时候  调用支付功能

          /* 是否开启余额抵扣 */
          if (IS_OPEN_INVOICE) {
            /* 如果余额不足以全部抵扣那么还需支付，执行支付 */
            if (goodsTotalPrice > 0) {
              return pay();
            } else {
              /* 判断是跳转拼团详情还是普通支付完成页面 */
              if (IS_GROUP_ORDER) return goPageToGroup();
              /* 生成订单 */
              return goPayOrder();
            }
          } else {

            /* 正常的支付，这里别动 */

            /* 如果不是团购就直接 */
            if (IS_GROUP_ORDER) {
              // clearToast();
              return goPayOrder();
            } else {
              return pay();
              // clearToast();
            }
          }
        }
      } else {
        clearToast();
        wx.showToast({
          title: Message,
          icon: 'none'
        })
        return
        const {
          BalanceAmount
        } = res.data;
        if (nnel) {
          /* 要使用余额进行抵扣 */
          console.log(cannel, this.data.goodsTotalPrice, BalanceAmount)
          let goodsTotalPrice = Math.floor((this.data.goodsTotalPrice - BalanceAmount) * 100) / 100
          that.setData({
            BalanceAmount: BalanceAmount,
            /* 可抵扣的钱 */
            goodsTotalPrice: goodsTotalPrice /* 总价 */
          })
        } else {
          // 不使用余额进行抵扣

          const goodsTotalPrice = Math.floor((this.data.goodsTotalPrice + this.data.BalanceAmount) * 100) / 100;

          that.setData({
            BalanceAmount: BalanceAmount, // 可抵扣的钱
            goodsTotalPrice: goodsTotalPrice //,
          })
        }
        that.setData({
          BalanceAmount: BalanceAmount, // 可抵扣的钱
          goodsTotalPrice: goodsTotalPrice //,
        })
      }

      this.computedTotal();
    })
  },
  // 获取支付参数

  //打开   关闭modal
  payModal(e) {
    const {
      currentTarget: {
        dataset: {
          type
        }
      }
    } = e;

    this.selectPay(type);
    // this.setData({
    //   hiddenPay: !this.data.hiddenPay
    // })
  },

  catchStop: function (e) {},

  //选择支付方式
  selectPay(type) {
    this.setData({
      payType: true,
      zhifu: 1
    })
    this.submintOrder(type)
  },

  //获取优惠券
  getCoupon: function () {
    this.selectComponent("#coupon").showModal();
  },

  //余额抵扣
  switchChange(e) {
    const {
      value
    } = e.detail;

    this.setData({
      deduction: value,
      amount: true
    })

    this.submitData(value)
  },

  // 获取备注的值
  handleVal(e) {
    let val = e.detail.value;
    this.setData({
      remark: val
    })
  },

  //获取选中的优惠卷的数据
  getCouponData(e) {

    let obj = e.detail;
    this.setData({
      couponData: obj
    })
    this.submitData();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // getInvoice({

  // }).then(res => {
  //   console.log(res)
  // })

  // 获取发票请求
  getInvoiceData() {
    let _this = this
    let personArrs = [] // 存储个人电子发票
    let companyArrs = [] // 存储单位人电子发票
    let vatArrs = [] // 存储增值税发票
    getInvoice().then(res => {
      console.log(res)
      if (res.data.Status === 'OK') {
        console.log(res.data.List)

        for (let i = 0; i < res.data.List.length; i++) {
          const item = res.data.List[i];
          if (item.InvoiceType === 2) {

            personArrs.push(item)
          }
          if (item.InvoiceType === 3) {

            companyArrs.push(item)
          }
          if (item.InvoiceType === 4) {
            vatArrs.push(item)
          }
        }

        _this.setData({
          personArr: personArrs,
          companyArr: companyArrs,
          vatArr: vatArrs,
        })
      } else if (res.data.Status == 'Login') {
        wx.showToast({
          title: '还未登录~~~',
          icon: 'none',
          duration: 2000,
          mask: true,
          success: (result) => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
          },

        });

      }
    })
  },


  // 是否开启 需要发票
  onChange({
    detail
  }) {

    let _this = this
    let PricesAll = Math.floor((_this.data.Balance - _this.data.BalanceAmount) * 100) / 100
    console.log(_this.data.Balance, _this.data.BalanceAmount)
    console.log('是否开启 需要发票' + detail)
    // 判断是否开启，是才请求发票的数据

    if (detail) {
      //开启
      this.getInvoiceData()
    } else {



    }

    this.setData({
      checked_fp: detail,
      checked_is_link: !detail,
      invoiceType: '请选择发票类型',
      needInvoice: detail
    })
    this.computedTotal(true);

    if (_this.data.invoiceType == '请选择发票类型') {
      _this.setData({
        needInvoice: false
      })
    }

  },

  // 显示发票选择
  showPopup() {
    let _this = this
    console.log('点击我开始重新选择发票类型')
    //this.deductions1()  // 获取微信抬头的数据

    //关闭

    console.log(this.data.goodsTotalPrice)
    if (this.data.invoiceType == '个人电子普通发票' || this.data.invoiceType == '单位电子普通发票' || this.data.invoiceType == '请选择发票类型') {

      // _this.setData({
      //   goodsTotalPrice: Math.floor(this.data.TotalPrice * 100) / 100
      // })
      //( this.data.goodsTotalPrice * this.data.TaxRate )
    }
    if (this.data.invoiceType == '增值税发票') {
      // _this.setData({
      //   goodsTotalPrice: Math.floor(this.data.TotalPrice * 100) / 100
      // })

    }
    console.log(this.data.goodsTotalPrice)

    this.setData({
      show: true

    });


    // 如果打开了余额抵扣，要将数据重置
    return
    if (this.data.deduction == true) {
      //关闭
      console.log(this.data.goodsTotalPrice)
      if (this.data.invoiceType == '个人电子普通发票' || this.data.invoiceType == '单位电子普通发票' || this.data.invoiceType == '请选择发票类型') {
        let goodsTotalPrice = Math.floor(this.data.TotalPrice * 100) / 100
        goodsTotalPrice = goodsTotalPrice - goodsTotalPrice
        let BalanceAmount = Math.floor(this.data.TotalPrice * 100) / 100
        _this.setData({
          goodsTotalPrice: goodsTotalPrice,
          BalanceAmount: BalanceAmount
        })
        //( this.data.goodsTotalPrice * this.data.TaxRate )
      }
      if (this.data.invoiceType == '增值税发票') {
        let goodsTotalPrice = Math.floor(this.data.TotalPrice * 100) / 100
        goodsTotalPrice = goodsTotalPrice - goodsTotalPrice
        let BalanceAmount = Math.floor(this.data.TotalPrice * 100) / 100
        _this.setData({
          goodsTotalPrice: goodsTotalPrice,
          BalanceAmount: BalanceAmount
        })

      }
      console.log(this.data.goodsTotalPrice)
    }



  },

  changecancel() {
    this.setData({
      needInvoice: false
    })
  },
  // 关闭发票选择
  onClose() {
    this.setData({
      show: false,
      checked_fp: false,
      checked_is_link: true
    });
  },

  // 点击tab标签,选择哪种发票
  onClick(event) {
    console.log(event.detail.index)
    const {
      index
    } = event.detail;

    this.setData({
      active1: index
    })
    let indexName;

    if (index === 0) {
      indexName = '电子发票'
      this.setData({
        radio: 'person'
      })
    } else {
      indexName = '增值税发票'
    }
    wx.showToast({
      title: indexName,
      icon: 'none',
    });
  },

  // 判断选择的是个人电子发票还是单位电子发票
  onChangRadio(event) {
    var _this = this
    console.log(event.detail)
    _this.setData({
      radio: event.detail,
    });
  },
  // 余额计算器
  computedTotal(clear) {
    let {
      BalanceAmount,
      Balance,
      TaxRate,
      goodsTotalPrice,
      VATTaxRate,
      beforeComputedPrice,
      deduction,
      invoiceType,
      checked_fp
    } = this.data;


    if (clear) {
      this.setData({
        invoiceType: '请选择发票类型'
      })
    }

    /* 每次执行该方法赋值最初始的总价 */
    goodsTotalPrice = beforeComputedPrice;

    const typeofPerson = ['个人电子普通发票', '单位电子普通发票'];

    const rate = invoiceType == '增值税发票' ? VATTaxRate : typeofPerson.includes(invoiceType) ? TaxRate : 0;

    const SALE = checked_fp ? rate * 0.01 * 100 : 0; // 税率计算

    let afterTotalInvoice; // 计算税后的总价 

    /* 计算税率之后可用余额大于0 */
    if (deduction) {
      /* 税后订单总价 */
      const afterIvc = Number((goodsTotalPrice + goodsTotalPrice * SALE / 100))
      /* 可使用的余额 */
      const canUseBlance = Number(Balance)
      /* 如果可使用的余额大于等于税后的总价，那么总价直接为0 */
      if (canUseBlance >= afterIvc) {
        afterTotalInvoice = 0
      }
      /* 否则就是总价减去可用余额 */
      else {
        afterTotalInvoice = afterIvc - canUseBlance;
      }
    } else {
      /* 如果没开启直接计算总价 + 税率 */
      afterTotalInvoice = goodsTotalPrice + Math.floor(goodsTotalPrice * SALE) / 100;
    }

    this.setData({
      goodsTotalPrice: afterTotalInvoice.toFixed(2),
    });

    console.log(goodsTotalPrice, 'result')

  },
  /* 选择发票回调 */
  selectInvoiceType(e) {
    console.log(e)
    const {
      value
    } = e.detail;

    // 将数据转为json格式交给后台
    const formData = {
      Data: JSON.stringify(value)
    }

    selectInvoiceType(formData).then(res => {

      const {
        Status,
        NewInvoiceId
      } = res.data;

      if (Status === 'OK') {
        wx.showToast({
          title: '发票数据保存成功'
        });


        this.setData({
          invoiceType: this.data.radio == 'person' ? '个人电子普通发票' : '单位电子普通发票',
          needInvoice: true,
          invoiceId: NewInvoiceId, // 保存提交订单时的发票id值: NewInvoiceIds,  // 保存提交订单时的发票id值
          show: false, // 关闭遮罩层
          checked_fp: true, // 开启需要发票按钮
          checked_is_link: false // 显示选择发票类型
        })
        this.computedTotal();
        this.getInvoiceData() //重新更新发票信息
      } else {
        wx.showToast({
          title: res.data.error_response.sub_msg,
          icon: 'none',
        });
      }
    })

  },
  /* 选择发票回调 */
  selectInvoiceType2(e) {

    const {
      value
    } = e.detail;

    // 将数据转为json格式交给后台
    const formData = {
      Data: JSON.stringify(value)
    }

    selectInvoiceType(formData).then(res => {

      const {
        Status,
        NewInvoiceId
      } = res.data;

      if (Status === 'OK') {
        wx.showToast({
          title: '发票数据保存成功'
        });


        this.setData({
          invoiceType: '增值税发票',
          needInvoice: true,
          invoiceId: NewInvoiceId, // 保存提交订单时的发票id值: NewInvoiceIds,  // 保存提交订单时的发票id值
          show: false, // 关闭遮罩层
          checked_fp: true, // 开启需要发票按钮
          checked_is_link: false // 显示选择发票类型
        })

        this.computedTotal();

        this.getInvoiceData() //重新更新发票信息
      } else {
        wx.showToast({
          title: res.data.error_response.sub_msg,
          icon: 'none',
        });
      }
    })

  },
  // 取消表单提交
  formReset() {

    this.setData({
      show: false,
      checked_fp: false,
      checked_is_link: true
    });
  },

  // 获取邀请码的值  
  autocode: function (e) {
    var _this = this
    let autocode = e.detail.value
    _this.setData({
      autocode
    })
    console.log(e.detail.value)

  },


  //button_isExistReferral 提交邀请码

  button_isExistReferral: function () {
    var _this = this
    wx.request({
      url: getApp().data.url + '/api/VshopProcess.ashx?action=SetAutoCode',
      data: {
        autocode: _this.data.autocode
      },
      header: {
        Cookie: wx.getStorageSync('cookie')
      },
      success: function (res) {
        console.log(res.data)
        // 登陆
        if (res.data.sub_msg === '用户未登录') {

        } else if (res.data.Status === 'true') {
          wx.showToast({
            title: res.data.Message,
            icon: 'none',
          })
          _this.initData() // 重新初始化
          _this.setData({
            IsExistReferral: true
          })

        } else {
          wx.showToast({
            title: res.data.Message,
            icon: 'none',
          })
        }

      },
      fail: function (e) {
        wx.showToast({
          title: res.data.Message,
          icon: 'none',
        })
      }
    })
    //this.setData({ IsExistReferral: false });
  },

})