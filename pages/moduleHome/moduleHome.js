// pages/moduleHome/moduleHome.js
var baseImg = "http://hmqy.oss-cn-hangzhou.aliyuncs.com/hmeshopV3/20190708/bg_pinzhi.png";
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    showGif: false, //显示弹窗
    wxQrCode: '', // 引导二维码
    Page: 1,
    Count: 8,
    //用于标识是否还有更多的状态
    state: 1,
    //用于渲染页面的数组
    todayData: [],
    //用于数组的追加和暂存
    allProject: [],
    GetMyReferral: {}, // 绑定上级信息
    TopicData: null,
    timer: null,
    imageBgUrl: 'http://img.hmeshop.cn/hmeshopV3/Storage/master/202006101857305670000.png',
    isShow: false,
    shareInfo: {
      "NickName": "HME_0007377",
      "Picture": "http://dlyl.hmeshop.cn/templates/common/images/headerimg.png",
      "ProductName": "好吃的旺旺雪饼好吃的旺旺雪饼好吃的旺旺雪饼",
      "ImageUrl1": "http://demoadmin.hyxmt.cn/Upload/Product/20180903/201809031835593420991394605.jpg",
      "SalePrice": 10.0,
      "MarketPrice": "120.00",
      "MiniProgramCard": "http://192.168.3.108:99/Storage/master/QRCode/ReferralQrcode_7377_20190902141123.png",
      "IsGetCode": false,
      "CreatedQRcode": "",
      "qcode": "7377_359_DB259EFDA592EFC20954BC650DF38F78_120.00_10_旺旺雪饼"
    },
    zhekoudata: [{
      "CategoryId": 41,
      "ProductId": 540,
      "BrandId": 41,
      "HasSKU": true,
      "ProductCode": "006",
      "ProductName": "爱情塗法师洗护套装-旅行装",
      "ThumbnailUrl40": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301603103112510.jpg",
      "ThumbnailUrl60": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301603103112510.jpg",
      "ThumbnailUrl310": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301603103112510.jpg",
      "ImageUrl1": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301603103112510.jpg",
      "ImageUrl2": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301603242175130.jpg",
      "ImageUrl3": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301603186550030.jpg",
      "ImageUrl4": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301604517331620.jpg",
      "ImageUrl5": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907301605031237820.jpg",
      "MarketPrice": 0.0100,
      "NewUserPrice": 0.0100,
      "AddedDate": "2019-08-08T14:47:41.283",
      "DisplaySequence": 265,
      "SaleStatus": 1,
      "SaleCounts": 11,
      "ProductType": 0,
      "SaleStartDate": "2019-07-30T10:19:04",
      "DiscountValue": 0.88,
      "FirstCommission": 0.0,
      "FirstCommissionRep": 0.0,
      "SecondCommissionRep": 0.0,
      "ThirdCommissionRep": 0.0,
      "ThirdCommission": 0.0,
      "SecondCommission": 0.0,
      "SalePrice": 0.0300,
      "TypeId": null,
      "ShortDescription": null,
      "Unit": null,
      "Description": null,
      "MobbileDescription": null,
      "Title": null,
      "Meta_Description": null,
      "Meta_Keywords": null,
      "UpdateDate": "0001-01-01T00:00:00",
      "VistiCounts": 0,
      "CommissionRate": null,
      "ShowSaleCounts": 0,
      "ThumbnailUrl100": null,
      "ThumbnailUrl160": null,
      "ThumbnailUrl180": null,
      "ThumbnailUrl220": null,
      "ThumbnailUrl410": null,
      "MainCategoryPath": null,
      "ExtendCategoryPath": null,
      "ExtendCategoryPath1": null,
      "ExtendCategoryPath2": null,
      "ExtendCategoryPath3": null,
      "ExtendCategoryPath4": null,
      "IsfreeShipping": false,
      "TaobaoProductId": 0,
      "ReferralDeduct": null,
      "SubMemberDeduct": null,
      "SubMemberDeductRep": null,
      "SecondLevelDeduct": null,
      "SecondLevelDeductRep": null,
      "ThreeLevelDeduct": null,
      "ThreeLevelDeductRep": null,
      "SubReferralDeduct": null,
      "ShippingTemplateId": 0,
      "SupplierId": 0,
      "AuditStatus": 0,
      "AuditReson": null,
      "IsCrossborder": false,
      "StoreId": null,
      "IsValid": false,
      "ValidStartDate": null,
      "ValidEndDate": null,
      "IsRefund": false,
      "IsOverRefund": false,
      "IsGenerateMore": false,
      "KjProductId": 0,
      "Score": 0,
      "EquareCommission": null,
      "HighLeverCommission": null,
      "TeamCommission": null,
      "SupplierIds": null,
      "ReferralTempId": null,
      "SkuItems": [{
        "SkuItems": {},
        "SKUMemberPriceInfoList": [{
          "SkuId": "540_295",
          "MemberSalePrice": 19.9000,
          "GradeId": 81
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 19.9000,
          "GradeId": 82
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 29.9000,
          "GradeId": 77
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 29.9000,
          "GradeId": 78
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 79.0000,
          "GradeId": 80
        }],
        "MemberPrices": {},
        "SkuId": "540_295",
        "ProductId": 540,
        "SKU": "006-5",
        "Weight": 0.0000,
        "Stock": 997,
        "WarningStock": 0,
        "CostPrice": 111.0000,
        "SalePrice": 0.0300,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 997,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [{
          "SkuId": "540_296",
          "MemberSalePrice": 19.9000,
          "GradeId": 81
        }, {
          "SkuId": "540_296",
          "MemberSalePrice": 19.9000,
          "GradeId": 82
        }, {
          "SkuId": "540_296",
          "MemberSalePrice": 29.9000,
          "GradeId": 77
        }, {
          "SkuId": "540_296",
          "MemberSalePrice": 29.9000,
          "GradeId": 78
        }, {
          "SkuId": "540_296",
          "MemberSalePrice": 79.0000,
          "GradeId": 80
        }],
        "MemberPrices": {},
        "SkuId": "540_296",
        "ProductId": 540,
        "SKU": "006-4",
        "Weight": 0.0000,
        "Stock": 999,
        "WarningStock": 0,
        "CostPrice": 111.0000,
        "SalePrice": 0.0300,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 999,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [{
          "SkuId": "540_297",
          "MemberSalePrice": 19.9000,
          "GradeId": 81
        }, {
          "SkuId": "540_297",
          "MemberSalePrice": 19.9000,
          "GradeId": 82
        }, {
          "SkuId": "540_297",
          "MemberSalePrice": 29.9000,
          "GradeId": 77
        }, {
          "SkuId": "540_297",
          "MemberSalePrice": 29.9000,
          "GradeId": 78
        }, {
          "SkuId": "540_297",
          "MemberSalePrice": 79.0000,
          "GradeId": 80
        }],
        "MemberPrices": {},
        "SkuId": "540_297",
        "ProductId": 540,
        "SKU": "006-3",
        "Weight": 0.0000,
        "Stock": 996,
        "WarningStock": 0,
        "CostPrice": 111.0000,
        "SalePrice": 0.0300,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 996,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [{
          "SkuId": "540_298",
          "MemberSalePrice": 19.9000,
          "GradeId": 81
        }, {
          "SkuId": "540_298",
          "MemberSalePrice": 19.9000,
          "GradeId": 82
        }, {
          "SkuId": "540_298",
          "MemberSalePrice": 29.9000,
          "GradeId": 77
        }, {
          "SkuId": "540_298",
          "MemberSalePrice": 29.9000,
          "GradeId": 78
        }, {
          "SkuId": "540_298",
          "MemberSalePrice": 79.0000,
          "GradeId": 80
        }],
        "MemberPrices": {},
        "SkuId": "540_298",
        "ProductId": 540,
        "SKU": "006-2",
        "Weight": 0.0000,
        "Stock": 998,
        "WarningStock": 0,
        "CostPrice": 111.0000,
        "SalePrice": 0.0300,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 998,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [{
          "SkuId": "540_299",
          "MemberSalePrice": 19.9000,
          "GradeId": 81
        }, {
          "SkuId": "540_299",
          "MemberSalePrice": 19.9000,
          "GradeId": 82
        }, {
          "SkuId": "540_299",
          "MemberSalePrice": 0.0100,
          "GradeId": 77
        }, {
          "SkuId": "540_299",
          "MemberSalePrice": 0.0200,
          "GradeId": 78
        }, {
          "SkuId": "540_299",
          "MemberSalePrice": 0.0300,
          "GradeId": 80
        }],
        "MemberPrices": {},
        "SkuId": "540_299",
        "ProductId": 540,
        "SKU": "006-1",
        "Weight": 0.0000,
        "Stock": 994,
        "WarningStock": 0,
        "CostPrice": 11.0000,
        "SalePrice": 0.0300,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 994,
        "FreezeStock": 0
      }],
      "DefaultSku": {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [{
          "SkuId": "540_295",
          "MemberSalePrice": 19.9000,
          "GradeId": 81
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 19.9000,
          "GradeId": 82
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 29.9000,
          "GradeId": 77
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 29.9000,
          "GradeId": 78
        }, {
          "SkuId": "540_295",
          "MemberSalePrice": 79.0000,
          "GradeId": 80
        }],
        "MemberPrices": {},
        "SkuId": "540_295",
        "ProductId": 540,
        "SKU": "006-5",
        "Weight": 0.0000,
        "Stock": 997,
        "WarningStock": 0,
        "CostPrice": 111.0000,
        "SalePrice": 0.0300,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 997,
        "FreezeStock": 0
      }
    }, {
      "CategoryId": 43,
      "ProductId": 538,
      "BrandId": null,
      "HasSKU": true,
      "ProductCode": "005",
      "ProductName": "拍运费",
      "ThumbnailUrl40": "http://admin.hairdraw.com/Upload/Product/20190725/201907251809343277209253130.jpg",
      "ThumbnailUrl60": "http://admin.hairdraw.com/Upload/Product/20190725/201907251809343277209253130.jpg",
      "ThumbnailUrl310": "http://admin.hairdraw.com/Upload/Product/20190725/201907251809343277209253130.jpg",
      "ImageUrl1": "http://admin.hairdraw.com/Upload/Product/20190725/201907251809343277209253130.jpg",
      "ImageUrl2": "",
      "ImageUrl3": null,
      "ImageUrl4": null,
      "ImageUrl5": null,
      "MarketPrice": null,
      "NewUserPrice": 0.0000,
      "AddedDate": "2019-08-15T10:08:19.247",
      "DisplaySequence": 10,
      "SaleStatus": 1,
      "SaleCounts": 18,
      "ProductType": 0,
      "SaleStartDate": "2019-07-25T18:16:33",
      "DiscountValue": 0.88,
      "FirstCommission": 0.0,
      "FirstCommissionRep": 0.0,
      "SecondCommissionRep": 0.0,
      "ThirdCommissionRep": 0.0,
      "ThirdCommission": 0.0,
      "SecondCommission": 0.0,
      "SalePrice": 0.1000,
      "TypeId": null,
      "ShortDescription": null,
      "Unit": null,
      "Description": null,
      "MobbileDescription": null,
      "Title": null,
      "Meta_Description": null,
      "Meta_Keywords": null,
      "UpdateDate": "0001-01-01T00:00:00",
      "VistiCounts": 0,
      "CommissionRate": null,
      "ShowSaleCounts": 0,
      "ThumbnailUrl100": null,
      "ThumbnailUrl160": null,
      "ThumbnailUrl180": null,
      "ThumbnailUrl220": null,
      "ThumbnailUrl410": null,
      "MainCategoryPath": null,
      "ExtendCategoryPath": null,
      "ExtendCategoryPath1": null,
      "ExtendCategoryPath2": null,
      "ExtendCategoryPath3": null,
      "ExtendCategoryPath4": null,
      "IsfreeShipping": false,
      "TaobaoProductId": 0,
      "ReferralDeduct": null,
      "SubMemberDeduct": null,
      "SubMemberDeductRep": null,
      "SecondLevelDeduct": null,
      "SecondLevelDeductRep": null,
      "ThreeLevelDeduct": null,
      "ThreeLevelDeductRep": null,
      "SubReferralDeduct": null,
      "ShippingTemplateId": 0,
      "SupplierId": 0,
      "AuditStatus": 0,
      "AuditReson": null,
      "IsCrossborder": false,
      "StoreId": null,
      "IsValid": false,
      "ValidStartDate": null,
      "ValidEndDate": null,
      "IsRefund": false,
      "IsOverRefund": false,
      "IsGenerateMore": false,
      "KjProductId": 0,
      "Score": 0,
      "EquareCommission": null,
      "HighLeverCommission": null,
      "TeamCommission": null,
      "SupplierIds": null,
      "ReferralTempId": null,
      "SkuItems": [{
        "SkuItems": {},
        "SKUMemberPriceInfoList": [],
        "MemberPrices": {},
        "SkuId": "538_485_481",
        "ProductId": 538,
        "SKU": "005-6",
        "Weight": 0.0000,
        "Stock": 990,
        "WarningStock": 100,
        "CostPrice": 1.0000,
        "SalePrice": 0.1000,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 990,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [],
        "MemberPrices": {},
        "SkuId": "538_485_482",
        "ProductId": 538,
        "SKU": "005-3",
        "Weight": 0.0000,
        "Stock": 991,
        "WarningStock": 100,
        "CostPrice": 1.0000,
        "SalePrice": 0.1000,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 991,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [],
        "MemberPrices": {},
        "SkuId": "538_486_481",
        "ProductId": 538,
        "SKU": "005-5",
        "Weight": 0.0000,
        "Stock": 990,
        "WarningStock": 100,
        "CostPrice": 1.0000,
        "SalePrice": 0.1000,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 990,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [],
        "MemberPrices": {},
        "SkuId": "538_486_482",
        "ProductId": 538,
        "SKU": "005-2",
        "Weight": 0.0000,
        "Stock": 991,
        "WarningStock": 100,
        "CostPrice": 1.0000,
        "SalePrice": 0.1000,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 991,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [],
        "MemberPrices": {},
        "SkuId": "538_487_481",
        "ProductId": 538,
        "SKU": "005-4",
        "Weight": 0.0000,
        "Stock": 990,
        "WarningStock": 100,
        "CostPrice": 1.0000,
        "SalePrice": 0.1000,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 990,
        "FreezeStock": 0
      }, {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [],
        "MemberPrices": {},
        "SkuId": "538_487_482",
        "ProductId": 538,
        "SKU": "005-1",
        "Weight": 0.0000,
        "Stock": 985,
        "WarningStock": 100,
        "CostPrice": 1.0000,
        "SalePrice": 0.1000,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 985,
        "FreezeStock": 0
      }],
      "DefaultSku": {
        "SkuItems": {},
        "SKUMemberPriceInfoList": [],
        "MemberPrices": {},
        "SkuId": "538_485_481",
        "ProductId": 538,
        "SKU": "005-6",
        "Weight": 0.0000,
        "Stock": 990,
        "WarningStock": 100,
        "CostPrice": 1.0000,
        "SalePrice": 0.1000,
        "StoreStock": 0,
        "StoreSalePrice": 0.0,
        "OldSalePrice": 0.0,
        "ImageUrl": null,
        "ThumbnailUrl40": null,
        "ThumbnailUrl410": null,
        "MaxStock": 990,
        "FreezeStock": 0
      }
    }],
    groupdata: [{
      "SalePrice": 10.0000,
      "ImageUrl1": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907221215575480890.jpg",
      "ProductName": "爱情塗法师无患子洗护系列",
      "SoldCount": 15,
      "CanFightCount": 1,
      "IsfreeShipping": false,
      "IsFightNow": 1,
      "StartDate": "2019-08-13 20:20:00",
      "JoinNumber": 5,
      "ProductId": 537,
      "SingleSalePrice": 324.0000,
      "RowNumber": 1
    }, {
      "SalePrice": 0.0100,
      "ImageUrl1": "http://img.hmeshop.cn/hmeshopV3/Storage/master/201907271702159470570.jpg",
      "ProductName": "无患子柔润滋养修护洗发乳",
      "SoldCount": 21,
      "CanFightCount": 4,
      "IsfreeShipping": true,
      "IsFightNow": 1,
      "StartDate": "2019-08-19 09:53:00",
      "JoinNumber": 2,
      "ProductId": 530,
      "SingleSalePrice": 198.0000,
      "RowNumber": 2
    }], //拼团
    countDownList: [{
      "CountDownId": 54,
      "StartDate": "2019-08-28 18:00:00",
      "EndDate": "2019-10-31 23:55:00",
      "Content": "测试",
      "DisplaySequence": 14,
      "ShareTitle": "",
      "ShareDetails": "",
      "ShareIcon": "",
      "BannerImg": "https://img.hmeshop.cn/hmeshopV3/Storage/master/201908281834020781930.png"
    }], //限时抢购数据 
  },
  onShow: function () {
    this.getshowType()
  },
  onLoad: function (a) {
    var _this = this
    this.data.timer = setInterval(() => {
      this.limitFn()
    }, 1000)

    this.getDayData() // 请求爆品列表的数据
    this.GetMyReferral() // 首页加载上级信息
  },
  onclick() {
    this.setData({
      isShow: true
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
  // 分享好友
  onShareAppMessage(res) {
    return {
      title: this.data.shareInfo.ProductName,
      path: '/pages/moduleHome/moduleHome',
      imageUrl: this.data.shareInfo.ImageUrl1
    }
  },
  //检测富文本
  // checkDataRichtext() {
  //   var richtextlist = []
  //   for (var i = 0; i < this.data.TopicData.length; i++) {
  //     switch (this.data.TopicData[i].type) {
  //       case 1:
  //         richtextlist.push(this.data.TopicData[i])
  //         var richtext = richtextlist[0].content.fulltext
  //         WxParse.wxParse('richtext', 'html', richtext, this, 5);
  //         break;
  //     }
  //   }
  // },
  //链接导航专门处理带linktype的跳转  
  jumpWhere(e) { //跳转类型跟下标
    let linktype = e.currentTarget.dataset.linktype,
      index = e.currentTarget.dataset.index
    let topicslistjson = e.currentTarget.dataset.topicslistjson ? e.currentTarget.dataset.topicslistjson : null;
    // let link = e.currentTarget.dataset.link;


    console.log(linktype, index, topicslistjson, e)
    switch (linktype) { //测试顺序按照后台配置顺序
      case 1:
        console.log('选择商品')
        // wx.navigateTo({
        //   url: `/pages/goodsDetail/goodsDetail?prDid=${e.currentTarget.dataset.productid}`,
        // })
        let link = e.currentTarget.dataset.link;
        console.log(link);
        link = link.split('id=')[1];
        wx.navigateTo({
          url: `/pages/goodsDetail/goodsDetail?prDid=${link}`,
        })

        break;
      case 2:
        console.log('分类导航,页面缺少')
        wx.navigateTo({
          url: '../../packageA/pages/sortDetail/sortDetail',
        });

        break;
      case 3:
        console.log('商品分类,页面缺少,网页版本是回到首页')
        wx.navigateTo({
          url: '/pages/index/index',
        });

        break;
      case 4:
        console.log('品牌专题,跳转品牌详情')
        break;
      case 24:
        console.log('品牌列表')
        break;
      case 9:
        console.log('全部商品')
        wx.navigateTo({
          url: '/pages/index/index',
        })
        break;
      case 14:
        console.log('自定义页面 , 自定义页面需要在新打开的page再次请求接口重新获取一份json')
        if (!!topicslistjson) {
          wx.navigateTo({
            url: '/pages/home4/home4?urlOpction=' + topicslistjson,
          })
        }
        break;
      case 12:
        console.log('团购活动')
        wx.navigateTo({
          url: '/pages/Groupindex/Groupindex',
        });

        break;
      case 13:
        console.log('限时抢购')
        console.log("限时抢购", e.currentTarget.dataset.link);
        // wx.navigateTo({
        //   url: '/pages/Specialoffer/Specialoffer',
        // });

        break;
      case 6:
        console.log('店铺主页')
        wx.navigateTo({
          url: '/pages/shopkeeperList/shopkeeperList',
        });
        break;
      case 7:
        console.log('会员主页')
        wx.navigateTo({
          url: '/pages/member/member',
        });
        break;
      case 8:
        console.log('购物车')
        wx.navigateTo({
          url: "/pages/cart/cart"
        });

        break;
      case 10:
        console.log('自定义链接')
        break;
      case 15:
        // console.log('积分商城')
        // let link = e.currentTarget.dataset.link;
        // console.log(link);
        // link = link.split('id=')[1];
        break;
      case 16:
        console.log('优惠券列表')
        wx.navigateTo({
          url: "../../packageA/pages/MyCoupon/MyCoupon"
        });

        break;
      case 18:
        console.log('选择优惠券')
        break;
      case 19:
        console.log('火拼团')
        break;
      case 20:
        console.log('周边门店')
        break;
      case 21:
        console.log('选择文章')
        break;
      case 25:
        console.log('文章列表')
        break;
      case 26:
        console.log('升级会员')
        wx.navigateTo({
          url: "/pages/upgradeMember/upgradeMember"
        });
        break;
      case 27:
        console.log('组合套餐')
        wx.navigateTo({
          url: "../../packageA/pages/fuCombina/fuCombina"
        });
        break;
    }
  },
  //跳转到商品详情的
  goToGoodsDetail(e) {
    let item_id = e.currentTarget.dataset.item_id ? e.currentTarget.dataset.item_id : null
    console.log(item_id)
    if (!!item_id) {
      console.log('跳转商品详情')
      // wx.navigateTo({
      //   url: '',//跳转商品详情页面
      // })
      wx.navigateTo({
        url: `/pages/goodsDetail/goodsDetail?prDid=${item_id}`,
      })
    } else {
      wx.showToast({
        title: '没有这个商品无法跳转',
      })
    }
  },

  // 获取首页模板数据
  getdata(showstyle) {
    let _this = this
    const url = getApp().data.url;

    wx.request({
      // url: getApp().data.url + '/Templates/common/home/' + url +'/'+ showstyle + '/Data/default.json',
      url: url + '/api/PublicHandler.ashx?action=GetShoptemplate',
      data: {},
      success: function (res) {
        console.log(res.data, '23333')
        _this.setData({
          TopicData: res.data.LModules
        })
        // _this.checkDataRichtext()
      }
    })
  },

  // 获取今日爆品产品数据
  getDayData() {
    let _this = this
    console.log('url的请求地址是' + getApp().data.url)
    wx.request({
      url: getApp().data.url + '/api/ProductHandler.ashx?action=GetProductHotType',
      data: {
        Page: _this.data.Page, // 请求的是第几页
        Count: _this.data.Count //一页多少条数据
      },
      success: function (res) {

        //如果搜出来的结果<1 就说明后面已经没数据可加载了，所以将state设为0
        if (res.data.Data.length === 0) {
          wx.showToast({
            title: '到底了~',
            icon: 'none',
            duration: 3000,
          })
        } else {
          var goods = _this.data.allProject.concat(_this.data.todayData, res.data.Data) //grade  为一进入页面请求完数据定义的集合
          console.log(goods)
          _this.setData({
            todayData: goods,
          })
          console.log(goods)
        }
      },
      fail: function (res) {
        console.log(res);
      }
      // console.log(res)
      // if(res.data.Code != 1){
      //   wx.showToast({
      //     title: '参数错误',
      //     icon: 'none',
      //     duration: 3000,
      //   })
      //   return
      // }   
      // console.log(res.data.Data)
      // _this.setData({
      //   todayData: res.data.Data
      // })
    })
  },

  // 获取商城主题信息
  getshowType() {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this
    wx.request({
      url: getApp().data.url + '/api/PublicHandler.ashx?action=GetWebSet',
      data: {},
      success: function (res) {
        wx.hideLoading()

        if (res.data.Result.Status == "Success") {
          _this.getdata(res.data.Result.WapTheme)
        } else {
          wx.showToast({
            title: '获取展示类型错误',
            icon: 'none',
            duration: 3000,
          })
        }
      }
    })
  },
  limitFn() {
    this.data.countDownList.forEach(v => {
      if (!this.countdown(v.StartDate).overTime) {
        v.countDownState = {
          limitHours: this.countdown(v.StartDate).limitHours,
          limitMin: this.countdown(v.StartDate).limitMin,
          limitSecond: this.countdown(v.StartDate).limitSecond,
          startState: true
        }
      } else {
        v.countDownState = {
          limitHours: this.countdown(v.EndDate).limitHours,
          limitMin: this.countdown(v.EndDate).limitMin,
          limitSecond: this.countdown(v.EndDate).limitSecond,
          startState: false,
          overTime: this.countdown(v.EndDate).overTime
        }
      }

    })
    this.setData({
      countDownList: this.data.countDownList
    })
  },
  // 倒计时处理
  countdown(date) {
    var dateArr = date.split(' ');
    if (date.indexOf('T') != -1) dateArr = date.split('T');
    let dateArr2 = dateArr[0].split('-').map((item) => {
      return parseInt(item)
    });
    dateArr2[1] -= 1;
    let dateArr3 = dateArr[1].split(':').map((item) => {
      return parseInt(item)
    });
    let now = new Date(); // 当前系统时间
    let to = new Date(...dateArr2, ...dateArr3); // 用户设定的时间
    let deltaTime = to - now; // 时间差 (单位/毫秒ms)
    let limitHours, limitMin, limitSecond;
    let obj = null;
    //超时
    if (deltaTime <= 0) {
      return {
        limitHours: '00',
        limitMin: '00',
        limitSecond: '00',
        overTime: true // 倒计时已过
      }
    }
    var time = deltaTime / 1000
    if (time > 0) {
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      let ms = parseInt(((time * 1000) % 1000) / 100)
      obj = {
        day: day,
        hou: hou,
        min: min,
        sec: sec,
        ms: ms
      }
    }
    return {
      limitHours: obj.hou < 10 ? '0' + obj.hou : obj.hou,
      limitMin: obj.min < 10 ? '0' + obj.min : obj.min,
      limitSecond: obj.sec < 10 ? '0' + obj.sec : obj.sec,
      overTime: false
    }
  },
  onHide() {
    clearInterval(this.data.timer)
  },


  // 首页加载上级信息
  GetMyReferral() {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this
    wx.request({
      url: getApp().data.url + '/API/MembersHandler.ashx?action=GetMyReferral',
      method: "POST",
      data: {},
      header: {
        Cookie: wx.getStorageSync('cookie')
      },
      success: function (res) {
        wx.hideLoading()

        if (res.data.Status == "Success") {
          console.log(res.data.Data)
          _this.setData({
            GetMyReferral: res.data.Data
          })
        } else {
          wx.showToast({
            title: '获取展示类型错误',
            icon: 'none',
            duration: 3000,
          })
        }
      }
    })
  },


  // 上拉加载爆品产品列表
  onReachBottom: function () {
    wx.showLoading({
      title: '玩命加载中...',
    });
    this.data.Page++
    this.getDayData()
    wx.hideLoading();
  },


  // 关注有礼

  gifInfo: function () {
    var _this = this
    wx.request({
      url: getApp().data.url + '/API/RequestHandler.ashx?action=GetOutdoorsUrl',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        Cookie: wx.getStorageSync('cookie') || app.data.cookie
      },

      success: function (res) {
        console.log(res.data)
        let wxQrCode = res.data.Data
        console.log(wxQrCode)
        _this.setData({
          wxQrCode: res.data.Data.wxQrCode,
          showGif: true
        })
      }
    })
  },

  onClose() {
    this.setData({
      showGif: false
    });
  },

});