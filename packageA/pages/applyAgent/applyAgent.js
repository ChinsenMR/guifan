const app = getApp();
import {
  //signAgreement,
  getAgreement,
  //getAgentBrandList,
  getAgentLevelList,
} from "../../../utils/requestApi";
var WxParse = require("../../../wxParse/wxParse");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      Name: "",
      WeChat: "",
      Phone: "",
      IdCardNo: "",
      CustomField5: "",
      CustomField6: "",
      CustomField7: "",
      CustomField8: "",
      Region: "",
      Address: "",
      BrandIndex: null,
      LevelIndex: null,
    },
    Message: {}, // 存储代理的东西
    HeadData: "",
    UserId: "",
    isShowAgency: false, //根据不同等级切换不同输入框
    listFlag: [],
    list: [], //代理升级的条件
    imgUrl: app.data.imgurl,
    agentValue: null, //已选择代理等级
    agentBrandList: [], //代理品牌
    agentLevelList: [], // 代理
    BrandLevle: "", //代理级别

    isShow: false,
    status: "", //是否同意协议
    isWin: false,
    ProductLists: [] // 购买商品的productlist
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    console.log(options.ProductLists)
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log(res.data.picture)
        _this.setData({
          HeadData: res.data.picture,
          UserId: res.data.UserId
        })
      }
    })
    _this.setData({
      ProductLists: options.ProductLists,
    })
    // ProductLists
    // let KjId = wx.getStorageSync("userInfo").KjCustomId;
    // console.log("KjId", KjId);
    // if (KjId == 0) {
    //   this.agreementData();
    // } else {
    //   wx.showToast({
    //     title: "您已是代理!",
    //     icon: "none",
    //     duration: 1500,
    //     mask: true,
    //     success: (result) => {
    //       setTimeout(() => {
    //         wx.navigateBack({
    //           delta: 1,
    //         });
    //       }, 1500);
    //     },
    //     fail: () => {},
    //     complete: () => {},
    //   });
    // }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.InitData();
  },
  //获取协议弹窗
  // agreementData() {
  //   getAgreement({
  //     TypeId: 1, //	是	int	协议类型，1为推广员协议，2为提现协议
  //   }).then((res) => {
  //     console.log("输出提现协议", res);
  //     if (res.data.Status == "Success") {
  //       let fwb = res.data.AContent;
  //       let sign = res.data.IsSign;

  //       if (sign == false) {
  //         this.setData({
  //           isWin: true,
  //         });
  //       }
  //       const regex = new RegExp("<p", "gi"); //修改富文本样式1
  //       fwb = fwb.replace(regex, `<p style="color: #fff;font-size:28rpx"`); //修改富文本样式2
  //       WxParse.wxParse("article", "html", fwb, this, 0);
  //     }
  //   });
  // },

  InitData() {
    // this.agreementData();
    // getAgentBrandList({
    //   IsApplyDistributor: 1,
    // }).then((res) => {
    //   console.log("====", res);
    //   if (res.data.Status == "Login") {
    //     // 判断是否登录了
    //     wx.showToast({
    //       title: "还未登录~~~",
    //       icon: "none",
    //       duration: 2500,
    //       mask: true,
    //       success: (result) => {
    //         setTimeout(() => {
    //           // wx.navigateBack({
    //           //   delta: 1
    //           // });
    //           wx.navigateTo({
    //             url: "/packageC/pages/authorizationLogin/authorizationLogin",
    //           });
    //         }, 1500);
    //       },
    //     });
    //   } else {
    //     //

    //     if (res.statusCode == 200) {
    //       this.setData({
    //         agentBrandList: res.data,
    //       });
    //       console.log(this.data.agentBrandList, "23333");
    //     } else {
    //       wx.showToast({
    //         title: res.data.Message,
    //         icon: "none",
    //         duration: 2000,
    //         mask: true,
    //       });
    //       setTimeout(() => {
    //         wx.navigateBack({
    //           delta: 1,
    //         });
    //       }, 1500);
    //       return;
    //     }
    //   }
    // });
    let ProductListArr = new Array()
    ProductListArr = this.data.ProductLists.split(",") // 将确认订单过来的字符串转化为数组形式
    // console.log(ProductListArr,this.data.ProductLists,typeof(this.data.ProductLists))
    getAgentLevelList({
      ProductList: ProductListArr
    }).then((res) => {
      console.log(res.data)
      const tempList = (res.data.Result && res.data.Result.lstLevel) || [];
      if (res.data.Result.Status == 'Success') {
        this.setData({
          Message: res.data.Result.Message,
          agentLevelList: tempList,
        });
      } else {
        wx.showToast({
          title: res.data.Message,
          icon: "none",
          duration: 2000,
          mask: true,
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 1500);
        return;
      }
    });
  },

  //点击同意协议
  // handleTY(e) {
  //   console.log("输出", e);
  //   const { status } = e.currentTarget.dataset;
  //   this.setData({
  //     isShow: true,
  //     status,
  //   });
  // },
  //点击同意弹窗
  // handleAgree() {
  //   let sta = this.data.status;
  //   if (sta == 1) {
  //     //签订协议
  //     signAgreement({
  //       TypeId: 1, //	是	int	协议类型id，1为推广员协议，2为提现协议
  //     }).then((res) => {
  //       console.log("签署协议状态", res);
  //       if (res.data.Status == "Success") 
  //       {
  //         wx.showToast({
  //           title: res.data.Message,
  //           icon: "none",
  //           duration: 1500,
  //           mask: true,
  //           success: (result) => {
  //             setTimeout(() => {
  //               this.setData({
  //                 isWin: false,
  //               });
  //             }, 1500);
  //           },
  //           fail: () => {},
  //           complete: () => {},
  //         });
  //       } else {
  //         wx.showToast({
  //           title: res.data.Message,
  //           icon: "none",
  //           duration: 1500,
  //           mask: true,
  //         });
  //       }
  //     });
  //   } else {
  //     wx.showToast({
  //       title: "请点击同意",
  //       icon: "none",
  //       duration: 1500,
  //       mask: true,
  //     });
  //   }
  // },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  onPicker(e) {
    console.log(e);
    const {
      value
    } = e.detail;
    this.setData({
      "form.Region": value[0] + "," + value[1] + "," + value[2],
    });
  },

  selectItem: function (e) {
    const {
      type
    } = e.currentTarget.dataset;
    if (type == 1) {
      this.setData({
        "form.BrandIndex": e.detail.value,
      });
    } else {
      this.setData({
        "form.LevelIndex": e.detail.value,
      });
    }
  },

  //升级申请
  submitForm: function (e) {
    console.log(e);
    let {
      Name,
      WeChat,
      Phone,
      IdCardNo,
      Region,
      Address,
      BrandLevle,
    } = e.detail.value;

    if (Name == "")
      return wx.showToast({
        title: "请填写您的真实姓名",
        icon: "none",
      });
    if (!/^1[3456789]\d{9}$/.test(Phone)) {
      wx.showToast({
        title: "请填写正确手机号",
        icon: "none",
      });
      return;
    }
    // if (AgentGrade == "")
    //   return wx.showToast({
    //     title: "请您选择升级等级",
    //     icon: "none",
    //   });
    // if (this.data.listFlag[3].isShow && this.data.isShowAgency) {
    let rgxIdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    if (!rgxIdCard.test(IdCardNo)) {
      wx.showToast({
        title: "请填写正确身份证",
        icon: "none",
      });
      return;
    }

    // }

    let RegionArray = Region.split(",");
    let {
      agentBrandList,
      form
    } = this.data;
    console.log(RegionArray);
    let arr = {
      Name,
      WeChat,
      Phone,
      IdCardNo,
      BrandLevle,
      // BrandLevle: agentBrandList[form.BrandIndex].ReferralLowGrade,
      // BrandId: agentBrandList[form.BrandIndex].BrandId,
      HeadData: this.data.HeadData,
      CustomField5: Address,
      CustomField6: RegionArray[0],
      CustomField7: RegionArray[1],
      CustomField8: RegionArray[2],
    };
    console.log(arr);
    // return
    app.Fg({
        url: "/API/KjAgentHandler.ashx?action=ApplyKjAgent",
        data: {
          JsonObj: JSON.stringify(arr),
          OrderId: '',
          UserId: this.data.UserId
          //其他参数
        },
        header: {
          Cookie: wx.getStorageSync('cookie')
        }
      })
      .then((res) => {
        console.log(res)
        const {
          data: {
            Message,
            Status
          },
        } = res;
        wx.showToast({
          title: Message,
        });
        if (Status == "Success") {
          const pages = getCurrentPages();
          const target = pages[pages.length - 1];
          
          target.setData({
            IsUpdateGradeCondition: false
          })

          setTimeout(() => {

            wx.navigateBack({
              delta: 1,
            });
          }, 1500);
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