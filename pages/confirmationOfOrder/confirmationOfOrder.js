import {
  getAddressList,
  getOrderInfo,
  submitOrderInfo,
  payOrder,
  getInvoice
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
    checked_is_link:true,//用来判断是否需要发票进行下一步操作
    show: false, //用来判断选择发票类型
    active1: 0, //用来切换选择发票类型
    radio: 'person',
    vatInvoiceData:{},
    ReceiveEmail:'',
    ReceivePhone:'',
    ReceivePhone_Temp:'',
    ReceiveAddress:'',
    Phone:'',
    Id:0,
    activeStyle:1,
    needInvoice:false, // 是否需要开发票needInvoice
    invoiceId:'',// 是否需要开发票invoiceId
    NewInvoiceId:'', // 要传给后台的发票NewInvoiceId
    ShipToDate:'',
    invoiceType:'请选择发票类型',
    
    TaxRate: 0.1,
    personArr:{},
    companyArr:{},
    vatArr:{},
    ship_todate:'', // 订单配送时间
    IsExistReferral:'',  // 如果为false弹出邀请码，true就不弹出邀请码 
    IsUpdateGradeCondition:'',  // 获取代理系统的等级列表及所需条件  true 是要跳转到申请代理页面，则false不需要 
    ProductList:[],  // 获取代理系统的等级列表及所需条件(产品id数组)
    autocode:'',  // 邀请码
    imgurl: app.data.imgurl,
    express: ['顺丰', '圆通', '中通', '韵达'],
    expressVal: '', // 快递值
    defaultAddressData: null, //地址
    orderInfo: null, //商品列表
    goodsNum: 0, // 商品列表总数
    goodsTotalPrice: 0, //商品总价
    TotalPrice:0,//订单总价值
    TaxData:0,//税费 
    sku: null, //商品id
    fromPage: null,
    hiddenPay: true, //支付modal
    payType: false, // 选择支付类型
    buyAmount: null, //
    groupId: null,//拼团活动id
    couponList: null, //优惠券 
    FightGroupId: 0, //开团为0，参团为FightGroupId
    isDefault: true,
    OrderFreight:0, //运费
    Balance:0, // 余额
    deduction: false, // 控制是否采用余额抵消
    doorto: 0, // (0快递-1门店-2自提)
    zhifu:0, // 控制支付
    remark:'', // 备注
    orderStatus:false, // 自提信息的显示隐藏
    amount:true, // 控制订单号的获取,false才可以支付
    BalanceAmount:0, //可用于抵扣的值
    couponData:{}, // 选中的优惠卷数据
    prDid:null, //商品id
    tuxedo:'',//判断是不是从详情那边立即参团跳过来的字符串
  },
  
  onLoad: function(opt) {
    console.log("跳转确认订单的数据opt",opt);
    if (wx.getStorageSync('tab').WapTheme != 'fruit') this.setData({ isDefault: false })
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

    if (fromPage === undefined) {
      console.log("输出的fromPage的值是什么1", fromPage);
      console.log("输出的fromPage的值是什么2", fromPage === undefined);
      this.setData({
        fromPage: ''
      })
    }

  
    
  },
  
  // 选择配送时间
  activeSip:function(e){
    var _this = this
    let activeStyle = e.currentTarget.dataset.index
    let ShipToDate = e.currentTarget.dataset.text
    console.log(activeStyle,ShipToDate)
    _this.setData({
      activeStyle,
      ShipToDate
    })    
  },

    // 请求微信发票抬头  暂时没用上
    deductions1:function(){
      var _this = this
      wx.chooseInvoiceTitle({
        success(res) {
          let chooseInvoiceTitleData = res
          console.log(chooseInvoiceTitleData);
          //console.log(typeof(chooseInvoiceTitleData))
          _this.setData({
            vatInvoiceData : chooseInvoiceTitleData
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
  onShow: function() {
    this.setData({
      goodsNum:0
    })
    this.getdefaultAddress()
  },

  //选择快递
  selectExpress: function(e) {
    this.setData({
      expressVal: this.data.express[e.detail.value]
    })
  },


  //打开地址页面
  goaddress: function() {
    wx.navigateTo({
      url: '../receivingAddress/receivingAddress',
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
  initData: function() {
    let {
      fromPage,
      sku,
      buyAmount,
      ProductId,
      productSku,
      FightGroupId,
      tuxedo
    } = this.data;
    wx.showLoading({
      title: '加载中...',
    })
    let {
      goodsNum,
      goodsTotalPrice,
      defaultAddressData,
      groupId
    } = this.data;
    if (groupId){
      groupId = groupId.trim()
    } else if (!groupId){
      groupId = ''
    }
    getOrderInfo({
      shipAddressId: defaultAddressData.ShippingId,
      fromPage: fromPage ? fromPage.trim() : '',
      productSku: sku.trim() || productSku.trim(),
      buyAmount: buyAmount || '',
      fightGroupActivityId: groupId,
      FightGroupId: tuxedo =='tuxedo'?FightGroupId:''
    }).then(res => {
      console.log("获取订单详情1",res)
      // IsExistReferral
      // console.log(res.data.Data.IsExistReferral)

      wx.hideLoading();
      if (res.data.Status == 'Success') {
        let ProductLists = new Array()
        res.data.Data.ProductItems.forEach(item => {
          goodsNum = item.Quantity
          goodsTotalPrice = res.data.Data.TotalPrice
        })
        console.log("给优惠卷2",res.data.Data.CouponList);

        let ProductItems =  res.data.Data.ProductItems
        for (let i = 0; i <ProductItems.length; i++) {
          const item = ProductItems[i].ProductId
          ProductLists.push(item)
          // console.log(item,ProductLists,typeof(ProductLists))
          
        }
       
        this.setData({
          Balance: res.data.Data.Balance,
          OrderFreight: res.data.Data.OrderFreight,
          orderInfo: res.data.Data.ProductItems,
          goodsNum,
          goodsTotalPrice,
          couponList: res.data.Data.CouponList,
          IsExistReferral:res.data.Data.IsExistReferral,
          IsUpdateGradeCondition:res.data.Data.IsUpdateGradeCondition,
          ProductList:ProductLists,
          TaxRate:res.data.Data.TaxRate,
          VATTaxRate:res.data.Data.VATTaxRate,
          TotalPrice: res.data.Data.TotalPrice
        })

      


      }else if(res.data.Status === 'Faile'){

        wx.showModal({
          title: '提示',
          content: res.data.Message,
          success (res) {
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

    console.log(' IsUpdateGradeCondition 是否满足去申请代理'+ this.data.IsUpdateGradeCondition)
    console.log(' ProductList 是否满足去申请代理'+ this.data.ProductList,typeof(this.data.ProductList))
    if( this.data.IsUpdateGradeCondition == true){
      wx.navigateTo({
        url:'/packageA/pages/applyAgent/applyAgent?ProductLists=' + this.data.ProductList
      })
    }

  },



  //确认订单
  submintOrder: function() {
    this.setData({
      amount: false  // 用于改变状态  可以获取到订单号
    })
    this.submitData(); // 提交订单
  },

  // 订单提交数据
  submitData(needInvoice_template,cannel){
    // wx.showLoading({
    //   title: "订单生成中~",
    //   mask: true,
    //   success: (result) => {
        
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });
      
    let that =this;
    let {
      fromPage,
      sku,
      defaultAddressData,
      buyAmount,
      groupId,
      productSku
    } = that.data;
    if (!defaultAddressData.ShippingId) {
      wx.showToast({
        icon: "none",
        title: '请选择一个地址',
      })
      return
    }
    
    if (sku){
      console.log("输出sku+++++++",sku);
    }
    submitOrderInfo({
      shippingId: defaultAddressData.ShippingId, //收货地址id（测试值43）
      productSku: sku.trim() || groupSku, //购物车商品规格 多个商品用,隔开
      fromPage: fromPage == '' ? '' : fromPage ? fromPage.trim() : 'signbuy',   // 活动（详情见备注）
      buyAmount: buyAmount || '', // 购买数量
      fightGroupActivityId: fromPage == 'signbuy' ? '' : groupId, // 拼团活动ID
      FightGroupId: fromPage == 'signbuy' ? '' : that.data.FightGroupId,  // 参团的拼团ID，开团为0
      OrderSource: 8,
      couponCode: this.data.couponData.code || '', //优惠劵代码 this.data.couponData.price
      remark: that.data.remark || '',   //	备注
      IsAdvancePay: that.data.deduction,  // 是否使用余额抵扣
      IsGetOrderTotal: that.data.amount, // 是否只计算订单金额（true只计算金额false生成订单）
      ShippingModeId: that.data.doorto, // 配送方式(0快递-1门店-2自提)
      invoiceId: that.data.invoiceId,  //是否需要开发票需要传的id值
      needInvoice: needInvoice_template!=null ? needInvoice_template :  that.data.needInvoice,  //是否需
      ShipToDate:that.data.ShipToDate //配送时间
    }).then(res => {
      console.log("支付详情", res);
      let pinId = res.data.FightGroupId // 拼团id
      if (that.data.zhifu == 1) {  // 为1的时候  调用支付功能
        // console.log("支付控制", that.data.zhifu);
        if (res.data.Status == "Success") {
          wx.hideLoading();
          let {
            OrderTotal,
            OrderId
          } = res.data;
          
          if (that.data.deduction){ //  采用抵扣余额

            setTimeout(() => {wx.hideLoading();}, 1000);

            if (pinId > 0){  //判断是跳转拼团详情还是普通支付完成页面
              wx.showLoading({
                title: '加载中...',
                mask: true,
                success: (result) => {
                  setTimeout(() => {
                    wx.hideLoading();
                    wx.navigateTo({
                      url: `../groupDetail/groupDetail?fromPage=${fromPage}&FightGroupId=${pinId}&sku=${sku}&prDid=${this.data.prDid}`,
                    })
                  }, 1000);
                },
                fail: () => {},
                complete: () => {}
              });
                
              
            }else{
              wx.navigateTo({
                url: `../paySuccess/paySuccess?total=${OrderTotal}`,
              })
            }
            
            payOrder({ //将订单号传给后台
              orderId: OrderId,
              pinId
            }).tnen(res=>{payOrder
              console.log("输出支付参数",res);
              wx.redirectTo({
                url: `../paySuccess/paySuccess?total=${OrderTotal}`,
              })
            })
            

          }else{
            setTimeout(() => { wx.hideLoading(); }, 1000);

            if (pinId > 0) { //判断是跳转拼团详情还是普通支付完成页面
              toPay(OrderId, res => {
                console.log("支付成功输出的值", res);
                wx.navigateTo({
                  url: `../groupDetail/groupDetail?FightGroupId=${pinId}&prDid=${this.data.prDid}`,
                })
              })
              
            } else {
              toPay(OrderId, res => {
                console.log("支付成功输出的值", res);
                wx.navigateTo({
                  url: `../paySuccess/paySuccess?total=${OrderTotal}`,
                })
                
              })
            }
            
          }
        } else {
          wx.showToast({
            title: res.data.Message,
            icon:'none'
          })
        }
      }else{
        console.log("不支付数据", res);
        if (res.data.Status == "Success"){
debugger;
          //取消 
if(cannel)
{
  that.setData({
    //BalanceAmount: res.data.BalanceAmount, // 可抵扣的钱
    goodsTotalPrice: this.data.goodsTotalPrice +  this.data.BalanceAmount//,
    //TotalPrice:this.data.TotalPrice + res.data.BalanceAmount
    //res.data.OrderTotal + this.data.OrderFreight   // 抵扣前后的值
  })
}else{
          //不取消
          that.setData({
            BalanceAmount: res.data.BalanceAmount, // 可抵扣的钱
            goodsTotalPrice: this.data.goodsTotalPrice -  res.data.BalanceAmount//,
           // TotalPrice:this.data.TotalPrice - res.data.BalanceAmount
            //res.data.OrderTotal + this.data.OrderFreight   // 抵扣前后的值
          })
        }

          // if(that.data.needInvoice)
          // {
          //   that.setData({
          //     goodsTotalPrice : this.data.goodsTotalPrice + this.data.TaxData
          //   })
          // }
        }
      }
    })
  },
  // 获取支付参数

  //打开   关闭modal
  payModal: function() {
    this.selectPay();
    // this.setData({
    //   hiddenPay: !this.data.hiddenPay
    // })
  },

  catchStop: function(e) {},

  //选择支付方式
  selectPay: function() {
    this.setData({
      payType: true,
      zhifu:1
    })
    // wx.showLoading({
    //   title: "支付中~~~",
    //   mask: true,
    // });
    this.submintOrder()
  },

  //获取优惠券
  getCoupon: function() {
    this.selectComponent("#coupon").showModal();
  },

  //余额抵扣
  switchChange(e){
    let baStatus = e.detail.value;
    if (baStatus){
      this.setData({
        deduction:true,
        amount: true//,
        //needInvoice:false
      })
      this.submitData(false)//不计算发票
    }else{
      this.setData({
        deduction: false,
        amount: true
      })
      this.submitData(false,true)
    }
  },

  //是否自提
  // doorTo(e){
  //   this.setData({ amount: true})
  //   let doorInfo = e.detail.value;
  //   if (doorInfo){
  //     this.setData({
  //       doorto:-2,
  //       orderStatus:true,
  //       amount:true
  //     })
  //     this.submitData()
  //   }else {
  //     this.setData({
  //       doorto: 0,
  //       orderStatus: false,
  //       amount: true
  //     })
  //     this.submitData()
  //   }
    
  // },
  // 获取备注的值
  handleVal(e){
    let val = e.detail.value;
    this.setData({
      remark: val
    })
  },

  //获取选中的优惠卷的数据
  getCouponData(e){
    console.log("输出选中优惠卷数据",e);
    let obj = e.detail;
    console.log("++++++",obj.index);
    this.setData({
      couponData:obj
    })
    this.submitData();
    // if(obj.index!=0){
    //   this.submitData();
    // }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // getInvoice({
    
  // }).then(res => {
  //   console.log(res)
  // })

  // 获取发票请求
  getInvoiceData() {
    let _this = this
    let personArrs = []  // 存储个人电子发票
    let companyArrs = []  // 存储单位人电子发票
    let  vatArrs = []  // 存储增值税发票
    getInvoice({}).then(res => {
      console.log(res)
      if (res.data.Status ===  'OK') {
        console.log(res.data.List)

        for (let i = 0; i < res.data.List.length; i++) {
          const item = res.data.List[i];
          if(item.InvoiceType === 2){
          
            personArrs.push(item)
          }
          if(item.InvoiceType === 3){
          
            companyArrs.push(item)
          }
          if(item.InvoiceType === 4){
            vatArrs.push(item)
          }
        }
       
        _this.setData({
          personArr:personArrs,
          companyArr:companyArrs,
          vatArr:vatArrs,
        })

        // 拿到用户发票数据，筛选第一条数据 
        // console.log(_this.data.personArr[0])
        // console.log(_this.data.companyArr[0])
        // console.log(_this.data.vatArr[0])


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
  onChange({ detail }) {
    let _this = this
    console.log('是否开启 需要发票'+detail)
      // 判断是否开启，是才请求发票的数据
      if(detail){
        //开启
        this.getInvoiceData()
      }else{
        //关闭
        console.log(this.data.goodsTotalPrice)
        if(this.data.invoiceType == '个人电子普通发票' || this.data.invoiceType == '单位电子普通发票'){
          _this.setData({
                goodsTotalPrice : this.data.goodsTotalPrice - this.data.TaxData
            })
           //( this.data.goodsTotalPrice * this.data.TaxRate )
        }
        if(this.data.invoiceType == '增值税发票'){
          _this.setData({
            goodsTotalPrice : this.data.goodsTotalPrice - this.data.TaxData
        })
          
        }
        console.log(this.data.goodsTotalPrice)
      }
      
      this.setData({ 
        checked_fp: detail,
        checked_is_link: !detail,
        invoiceType:'请选择发票类型' ,
        needInvoice : detail
      })

      if(_this.data.invoiceType == '请选择发票类型' ){
        _this.setData({
          needInvoice : false
        })
      }

  },

  // 显示发票选择
  showPopup() {
    //this.deductions1()  // 获取微信抬头的数据
    this.setData({ show: true });
    
  },

  changecancel()
  {
    this.setData({
      needInvoice : false
    })
  }
,
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
    var _this = this
    _this.setData({
      active1:event.detail.index
    })
    let indexName =  event.detail.index
    if(indexName === 0){
      indexName = '电子发票' 
      let radio = 'person'
      _this.setData({
        radio:radio
      })
    }else{
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

   // 提交
   formSubmit: function (e) {
    let _this = this 
    let valObj = e.detail.value;
    console.log(valObj)
    if(valObj.person == 'person'){
      console.log('当前选择的是个人',valObj.person);
        
    }
    // 循环判断数据是否为null ,如果是全部改为''
    for(let key in valObj){
      // console.log(key)
      // console.log(valObj[key])
      if(valObj[key] == null){
        valObj[key] = ''
      }
    }
    // console.log(valObj)
    // 将数据转为json格式交给后台
    var str = {
      Data: JSON.stringify(valObj)
    } 
    wx.request({
      url: getApp().data.url + '/Handler/SubmmitOrderHandler.ashx?action=UpdateUserInvoice',
      data: str,
      header: {
        Cookie: wx.getStorageSync('cookie') 
      },
      success: function(res) {
        console.log(res.data)
        // 登陆
        if (res.data.sub_msg === '用户未登录') {
          
        }else if(res.data.Status === 'OK'){
          wx.showToast({
            title:'发票数据保存成功',
            icon: 'none',
          });
          let NewInvoiceIds = res.data.NewInvoiceId
          let goodsTotalPrice = _this.data.goodsTotalPrice + _this.data.goodsTotalPrice* _this.data.TaxRate
          let TaxData =  _this.data.TotalPrice * _this.data.TaxRate * 0.01
          _this.setData({ 
            invoiceType:'个人电子普通发票',
            goodsTotalPrice: goodsTotalPrice,
            TaxData:TaxData ,
            needInvoice:true,
            invoiceId: NewInvoiceIds,  // 保存提交订单时的发票id值: NewInvoiceIds,  // 保存提交订单时的发票id值
            show: false,   // 关闭遮罩层
            checked_fp: true, // 开启需要发票按钮
            checked_is_link: false  // 显示选择发票类型
          });
          _this.getInvoiceData()   //重新更新发票信息
        }else{
          wx.showToast({
            title: res.data.error_response.sub_msg,
            icon: 'none',
          });
        }
        
        // 如果提交成功 
       
      },
      fail: function(e) {
        wx.showToast({
          title: res.data.error_response.sub_msg,
          icon: 'none',
        });
      }
    })

  },


  // 单位电子发票提交
    formSubmit1: function (e) {
      let _this = this 
      let valObj = e.detail.value;
      console.log(valObj)

      // 循环判断数据是否为null ,如果是全部改为''
      for(let key in valObj){
        // console.log(key)
        // console.log(valObj[key])
        if(valObj[key] == null){
          valObj[key] = ''
        }
      }
      // console.log(valObj)
      // 将数据转为json格式交给后台
      var str = {
        Data: JSON.stringify(valObj)
      } 
      wx.request({
        url: getApp().data.url + '/Handler/SubmmitOrderHandler.ashx?action=UpdateUserInvoice',
        data: str,
        header: {
          Cookie: wx.getStorageSync('cookie') 
        },
        success: function(res) {
          console.log(res.data)
          // 登陆
          if (res.data.sub_msg === '用户未登录') {
            
          }else if(res.data.Status === 'OK'){
            wx.showToast({
              title:'发票数据保存成功',
              icon: 'none',
            });
            let NewInvoiceIds = res.data.NewInvoiceId
            let goodsTotalPrice = _this.data.goodsTotalPrice + _this.data.goodsTotalPrice* _this.data.TaxRate * 0.01
            let TaxData =  _this.data.TotalPrice* _this.data.TaxRate * 0.01
            _this.setData({ 
              invoiceType:'单位电子普通发票',
              goodsTotalPrice:goodsTotalPrice,
              TaxData:TaxData,
              needInvoice:true,
              invoiceId: NewInvoiceIds,  // 保存提交订单时的发票id值
              show: false,   // 关闭遮罩层
              checked_fp: true, // 开启需要发票按钮
              checked_is_link: false  // 显示选择发票类型
            });
            _this.getInvoiceData()   //重新更新发票信息
          }else{
            wx.showToast({
              title: res.data.error_response.sub_msg,
              icon: 'none',
            });
          }
          
          // 如果提交成功 
         
        },
        fail: function(e) {
          wx.showToast({
            title: res.data.error_response.sub_msg,
            icon: 'none',
          });
        }
      })
  
    },


    // 增值税发票提交
    formSubmit2: function (e) {
      let _this = this 
      let valObj = e.detail.value;
      console.log(valObj)
      if(valObj.person == 'person'){
        console.log('当前选择的是个人',valObj.person);
          
      }
      // 循环判断数据是否为null ,如果是全部改为''
      for(let key in valObj){
        // console.log(key)
        // console.log(valObj[key])
        if(valObj[key] == null){
          valObj[key] = ''
        }
      }
      // console.log(valObj)
      // 将数据转为json格式交给后台
      var str = {
        Data: JSON.stringify(valObj)
      } 
      wx.request({
        url: getApp().data.url + '/Handler/SubmmitOrderHandler.ashx?action=UpdateUserInvoice',
        data: str,
        header: {
          Cookie: wx.getStorageSync('cookie') 
        },
        success: function(res) {
          console.log(res.data)
          // 登陆
          if (res.data.sub_msg === '用户未登录') {
            
          }else if(res.data.Status === 'OK'){
            wx.showToast({
              title:'发票数据保存成功',
              icon: 'none',
            });
            let NewInvoiceIds = res.data.NewInvoiceId
            let goodsTotalPrice = _this.data.goodsTotalPrice + _this.data.goodsTotalPrice* _this.data.VATTaxRate
            let TaxData =  _this.data.TotalPrice* _this.data.VATTaxRate  * 0.01
            _this.setData({ 
              invoiceType:'增值税发票',
              goodsTotalPrice:goodsTotalPrice,
              TaxData:TaxData,
              invoiceId: NewInvoiceIds,  // 保存提交订单时的发票id值
              show: false,   // 关闭遮罩层
              checked_fp: true, // 开启需要发票按钮
              needInvoice:true,   // 选择了需要发票
              checked_is_link: false  // 显示选择发票类型
            });
            _this.getInvoiceData()   //重新更新发票信息
          }else{
            wx.showToast({
              title: res.data.error_response.sub_msg,
              icon: 'none',
            });
          }
          
          // 如果提交成功 
         
        },
        fail: function(e) {
          wx.showToast({
            title: res.data.error_response.sub_msg,
            icon: 'none',
          });
        }
      })
  
    },

  formReset() {

    this.setData({ 
      show: false, 
      checked_fp: false,
      checked_is_link: true 
    });
  },

  // 获取邀请码的值  
  autocode:function(e){
    var _this = this
    let autocode = e.detail.value
    _this.setData({
      autocode
    })
    console.log(e.detail.value)
    
  },

  // 关闭填写邀请码弹出层
  // IsExistReferraLonClose() {
  //   this.setData({ IsExistReferral: false });
  // },

  //button_isExistReferral 提交邀请码

  button_isExistReferral:function(){
    var _this = this
    wx.request({
      url: getApp().data.url + '/api/VshopProcess.ashx?action=SetAutoCode',
      data: {
        autocode: _this.data.autocode
      },
      header: {
        Cookie: wx.getStorageSync('cookie') 
      },
      success: function(res) {
        console.log(res.data)
        // 登陆
        if (res.data.sub_msg === '用户未登录') {
          
        }else if(res.data.Status === 'true'){
          wx.showToast({
            title: res.data.Message,
            icon: 'none',
          })
          _this.initData() // 重新初始化
          _this.setData({ 
            IsExistReferral: true 
          })

        }else{
          wx.showToast({
            title: res.data.Message,
            icon: 'none',
          })
        }
       
      },
      fail: function(e) {
        wx.showToast({
          title: res.data.Message,
          icon: 'none',
        })
      }
    })
    //this.setData({ IsExistReferral: false });
  },

 // IsExistReferral:true,  // 如果为false弹出邀请码，true就不弹出邀请码
  //autocode:'',  // 邀请码

})