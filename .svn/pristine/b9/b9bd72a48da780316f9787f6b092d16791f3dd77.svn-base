const app = getApp();
import ajaxRequset from './request.js';

/**
 * 请求api方法 集中管理
 * **/

module.exports = {
	/**
	 * 登录
	 * **/
	login(data) {
		return ajaxRequset({
			url: '/API/PublicHandler.ashx?action=QuickLogin',
			data
		}).then((res) => res);
	},

	/**
	 * 获取折扣专区商品列表 、
	 * 新人特惠 、
	 * 拼团列表
	 * **/

	getProductsList(data) {
		return ajaxRequset({
			url: '/API/ProductHandler.ashx',
			data
		}).then((res) => res);
	},

	/**
	 * 拼团详情  /API/OrdersHandler.ashx?action=FightGroupDetailsById
	 */
	getFightGroupInfo(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=FightGroupDetailsById',
			data
		}).then((res) => res);
	},
	/**
	 * 拼团列表
	 */
	getFightGroupList(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=GetFightGroupList',
			data
		}).then((res) => res);
	},
	/**
	 * 今日特卖 、
	 * 即将开售
	 * **/
	gettodaydata(data) {
		return ajaxRequset({
			url: '/API/ProductHandler.ashx?action=GetCategoryProducts',
			data
		}).then((res) => res);
	},

	/**
	 * 首页限时抢购 、
	 * 抢购活动详情页
	 * **/

	indexCountDown(data) {
		return ajaxRequset({
			url: '/API/CountDownHandler.ashx',
			data
		}).then((res) => res);
	},

	/**
	 * 根据图片分类id获取图片
	 * **/
	getImage(data) {
		return ajaxRequset({
			url: '/API/ImageHandler.ashx',
			data
		}).then((res) => res);
	},

	/**
	 * 首页弹窗优惠券
	 */
	getindexcoupon(data) {
		return ajaxRequset({
			url: '/API/CouponsHandler.ashx?action=GetlogonCoupons'
		}).then((res) => res);
	},
	/**
	 * 组合购
	 */
	CombinationGradesList() {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=CombinationGradesList'
		}).then((res) => res);
	},
	/**
	 * 首页弹窗优惠券
	 */
	getindexcoupon(data) {
		return ajaxRequset({
			url: '/API/CouponsHandler.ashx?action=GetlogonCoupons'
		});
	},

	/**
	 * 获得商品详情根据商品id
	 * **/

	getGoodsDetail(data) {
		return ajaxRequset({
			url: '/AppShop/AppShopHandler.ashx',
			data
		}).then((res) => res);
	},

	/**
	 * 获取优惠券中心分类
	 */
	getcouponclassifyData(data) {
		return ajaxRequset({
			url: '/API/CouponsHandler.ashx',
			data
		}).then((res) => res);
	},

	/**
	 * 获取领券中心优惠券数据
	 */
	getdataCouponsdata(data) {
		return ajaxRequset({
			url: '/API/CouponsHandler.ashx',
			data
		}).then((res) => res);
	},

	/**
	 *  用户领取优惠券
	 */
	getcoupon(data) {
		return ajaxRequset({
			url: '/API/CouponsHandler.ashx?action=UserGetCoupon',
			data
		}).then((res) => res);
	},

	/**
	 *  获取用户优惠券列表
	 */
	getUserCoupons(data) {
		return ajaxRequset({
			url: '/api/MembersHandler.ashx?action=GetUserCoupons',
			data
		}).then((res) => res);
	},
	/**
	 * 添加商品到购物车
	 * **/
	addToCart(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=addToCart',
			data
		}).then((res) => res);
	},

	/**
	 * 获取购物车列表
	 * **/
	getCartList(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=getShoppingCartList',
			data
		}).then((res) => res);
	},

	/**
	 * 获取评论列表根据商品id
	 * **/
	getReviewList(data) {
		return ajaxRequset({
			url: '/API/ReviewHandler.ashx',
			data
		}).then((res) => res);
	},

	/**
	 * 获取商品实时用户下单列表
	 * **/
	getShopUser(data) {
		return ajaxRequset({
			url: '/api/VshopProcess.ashx',
			data
		}).then((res) => res);
	},
	//
	// 获取省市区 信息 列表
	getRegion(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=AddShippingAddress',
			data
		}).then((res) => res);
	},

	/**
	 * 领取优惠券
	 * **/
	// receiveCoupon(data) { return ajaxRequset({ url: '/API/CouponsHandler.ashx?action=UserGetCoupon', data }).then(res => res) },
	receiveCoupon(data) {
		return ajaxRequset({
			url: '/APIFH/CouponsHandler.ashx?action=UserGetCoupon',
			data
		}).then((res) => res);
	},
	//
	//
	// 获取收货地址列表
	getAddressList(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=GetUserShippingAddress',
			data
		}).then((res) => res);
	},

	// modifyAddress
	modifyAddress(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=UpdateShippingAddress',
			data
		}).then((res) => res);
	},
	//
	//
	// setdefaultAddress
	setdefaultAddress(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=SetDefaultShippingAddress',
			data
		}).then(
			(res) => res
		);
	},
	//
	//
	// deletedAddress
	deletedAddress(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=DelShippingAddress',
			data
		}).then((res) => res);
	},
	/**
	 * 从购物车移除商品
	 * **/
	clearGoods(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=delCartItem',
			data
		}).then((res) => res);
	},

	/**
	 * 购物车商品数量修改
	 * **/
	changeGoodsNum(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=ChageCartQuantity',
			data
		}).then((res) => res);
	},

	/**
	 * 获取订单信息
	 * **/
	getOrderInfo(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=GetShoppingCart',
			data
		}).then((res) => res);
	},

	/**
	 * 提交订单
	 * **/
	submitOrderInfo(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=SubmitOrder',
			data
		}).then((res) => res);
	},

	/**
	 * 支付
	 * **/
	payOrder(data) {
		return ajaxRequset({
			url: '/API/PublicHandler.ashx?action=GetPayParam',
			data
		}).then((res) => res);
	},

	/**
	 * 我的订单列表
	 * **/
	getOrderList(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=OrderList',
			data
		}).then((res) => res);
	},

	/**
	 * 取消订单
	 * **/
	cancelOrder(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=CloseOrder',
			data
		}).then((res) => res);
	},

	/**
	 * 订单详情
	 * **/
	orderDetail(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=GetOrderDetail',
			data
		}).then((res) => res);
	},
	/**
	 * 订单物流信息
	 * **/
	lookExpressData(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=SearchExpressData',
			data
		}).then((res) => res);
	},

	/**
	 * 分销下属
	 * **/
	distributeSub(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=MySubMembers',
			data
		}).then((res) => res);
	},

	/**
	 * 修改分销下属等级
	 * **/
	updateMemberGrade(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=UpdateMemberGrade',
			data
		}).then((res) => res);
	},

	/**
	 * 获取代理级别列表
	 * **/
	referralGrades(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=GetReferralGrades',
			data
		}).then((res) => res);
	},
	/**
	 * 绑定代理
	 * **/
	bindAgent(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/API/VshopProcess.ashx?action=BindAgent',
			data
		}).then((res) => res);
	},
	/**
	 *
	 *编辑个人信息
	 */
	getpersondata(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/Api/AppShopHandler.ashx?action=UpdateMemberInformation',
			data
		}).then(
			(res) => res
		);
	},
	/**
	 * 首页分享接口
	 */
	getindexsharedata(data) {
		return ajaxRequset({
			url: '/API/QrcodeHandler.ashx?action=GetQrcodeList',
			data
		}).then((res) => res);
	},

	/**
	 * 门店id获取门店信息
	 */
	getHerderList(data) {
		return ajaxRequset({
			url: '/AppShop/AppShopHandler.ashx?action=GetStoreInfoByStoreId',
			data
		}).then(
			(res) => res
		);
	},
	/**
	 * 修改门店门店信息
	 */
	setUpdateStoreInfo(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/api/AppShopHandler.ashx?action=UpdateStoreInfo',
			data
		}).then(
			(res) => res
		);
	},
	/**
	 * 掌柜全部商品列表
	 */

	getStoreProductsList(data) {
		return ajaxRequset({
			url: '/API/KjAgentHandler.ashx?action=GetStoreProducts',
			data
		}).then((res) => res);
	},
	/**
	 * 掌柜代理上架商品
	 */

	getUploadStoreProduct(data) {
		return ajaxRequset({
			url: '/API/KjAgentHandler.ashx?action=UploadStoreProduct',
			data
		}).then((res) => res);
	},
	/**
	 * 掌柜代理下架商品
	 */

	getDeleteStoreProducts(data) {
		return ajaxRequset({
			url: '/API/KjAgentHandler.ashx?action=DeleteStoreProducts',
			data
		}).then((res) => res);
	},
	/**
	 * 根据各种id获取管理商品
	 */

	getProductsDataList(data) {
		return ajaxRequset({
			url: '/api/ProductHandler.ashx?action=GetProducts',
			data
		}).then((res) => res);
	},

	/**
	 * 清楚搜索历史
	 */
	setClearHistory(data) {
		return ajaxRequset({
			url: '/API/ProductHandler.ashx?action=ClearSearchKey',
			data
		}).then((res) => res);
	},

	/**
	 * 获取热门及历史关键词
	 */
	getSearcHistory(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/API/ProductHandler.ashx?action=GetSearchKey',
			data
		}).then(
			(res) => res
		);
	},

	/**
	 * 获取商品分类
	 */
	getProductData(data) {
		return ajaxRequset({
			url: '/AppShop/AppShopHandler.ashx?action=GetProductCategories',
			data
		}).then(
			(res) => res
		);
	},

	/**
	 * 获取根据图片分类id获取图片
	 */
	getBannerData(data) {
		return ajaxRequset({
			url: '/APIFH/ImageHandler.ashx?action=GetBanner',
			data
		}).then((res) => res);
	},

	/**
	 *  获取会员信息
	 */
	getMemberData(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=GetMember',
			data
		}).then((res) => res);
	},

	/**
	 *  获取会员信息
	 */
	getPointExchangeInfo(data) {
		return ajaxRequset({
			url: '/AppShop/AppShopHandler.ashx?action=GetPointExchangeInfo',
			data
		}).then(
			(res) => res
		);
	},

	/**
	 *  获取 佣金明细 / 预计收益
	 */
	getSplittinDetails(data) {
		return ajaxRequset({
			url: '/API/AccountDetailHandler.ashx?action=GetSplittinDetails',
			data
		}).then(
			(res) => res
		);
	},
	/**
	 *  获取余额明细
	 */
	getBalanceData(data) {
		return ajaxRequset({
			url: '/API/AccountDetailHandler.ashx?action=GetBalanceDetails',
			data
		}).then((res) => res);
	},

	/**
	 *  获取提现明细(旧)
	 */
	getBalanceDraws(data) {
		return ajaxRequset({
			url: '/API/AccountDetailHandler.ashx?action=GetBalanceDraws',
			data
		}).then((res) => res);
	},

	/**
	 *  申请提现 (初始化数据)
	 */
	getInitDraw(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=InitDraw',
			data
		}).then((res) => res);
	},

	/**
	 *  余额提现接口 (用于提交表单到后台)
	 */
	requestBalance(data) {
		return ajaxRequset({
			url: '/api/VshopProcess.ashx?action=RequestBalanceDraw',
			data
		}).then((res) => res);
	},

	/**
	 *  获取个人提现记录
	 */
	getDrawRecords(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=GetDrawRecords',
			data
		}).then((res) => res);
	},

	/**
	 *  提交代理资质审批申请(上传凭证)
	 */
	AddlyQualifications(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=ApplyQualifications',
			data
		}).then((res) => res);
	},

	/**
	 *  提现申请
	 */
	subSplittinDraw(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=SplittinDraw',
			data
		}).then((res) => res);
	},

	/**
	 *  扫码绑定临时关系接口
	 */
	subBindTemReferral(data) {
		return ajaxRequset({
			url: '/API/QrcodeHandler.ashx?action=BindTemReferral',
			data
		}).then((res) => res);
	},

	/**
	 *  开通预付款账号（修改设置交易密码）
	 */
	openBalance(data) {
		return ajaxRequset({
			url: '/api/VshopProcess.ashx?action=ChangeTranPassword',
			data
		}).then((res) => res);

	},

	/**
	 *  开通预付款账号（新增交易密码）
	 */
	NewOpenBalance(data) {
		return ajaxRequset({
			url: '/api/VshopProcess.ashx?action=OpenBalance',
			data
		}).then((res) => res);
	},
	/**
	 * 获取代理等级列表
	 */
	getAgentLevelList(data) {
		return ajaxRequset({
			url: '/API/KjAgentHandler.ashx?action=GetKjAgentField',
			data
		}).then((res) => res);
	},

	/**
	 * 获取代理等级列表
	 */
	getAgentLevelList(data) {
		return ajaxRequset({
			url: '/API/KjAgentHandler.ashx?action=GetKjAgentField',
			data
		}).then((res) => res);
	},

	/**
	 * 用户获取退货信息
	 */
	getOrderReturn(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=GetOrderReturn',
			data
		}).then((res) => res);
	},

	/**
	 * 商家售后确认收货
	 * */
	finishReturn(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/API/OrdersHandler.ashx?action=FinishReturn',
			data
		}).then(
			(res) => res
		);
	},
	/**
	 * 商家拒绝收货
	 * */
	turnDownReturn(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=RefuseRefund',
			data
		}).then((res) => res);
	},
	/**
	 * 用户发货
	 */
	returnSendGoods(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=ReturnSendGoods',
			data
		}).then((res) => res);
	},
	//getAgentBrandList(data) { return ajaxRequset({ url: '/api/KjAgentHandler.ashx?action=GetBrandIds', data }).then((res) => res) },

	/**
	 *  获取特定协议内容
	 */
	//getAgreement(data) { return ajaxRequset({ url: '/API/PublicHandler.ashx?action=GetAgreementById', data }).then((res) => res) },
	/**
	 *  用户签署协议
	 */
	//signAgreement(data) { return ajaxRequset({ url: '/API/PublicHandler.ashx?action=SignAgreement', data }).then((res) => res) },

	/**
	 * 用户获取退货信息
	 */
	getKD100(data) {
		return ajaxRequset({
			url: '/AppShop/AppShopHandler.ashx?action=GetKD100',
			data
		}).then((res) => res);
	},

	/**
	 * 用户获取退货进度
	 */
	getReturnFlow(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=GetReturnFlow',
			data
		}).then((res) => res);
	},

	/**
	 * 获取代理品牌列表
	 */
	getAgentBrandList(data) {
		return ajaxRequset({
			url: '/api/KjAgentHandler.ashx?action=GetBrandIds',
			data
		}).then((res) => res);
	},

	/**
	 *  获取特定协议内容
	 */
	getAgreement(data) {
		return ajaxRequset({
			url: '/API/PublicHandler.ashx?action=GetAgreementById',
			data
		}).then((res) => res);
	},
	/**
	 *  用户签署协议
	 */
	signAgreement(data) {
		return ajaxRequset({
			url: '/API/PublicHandler.ashx?action=SignAgreement',
			data
		}).then((res) => res);
	},

	/**
	 *  初始化退款页面
	 */
	initApply(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=InitApplyRefund',
			data
		}).then((res) => res);
	},

	/**
	 *  申请退款接口
	 */
	applyRefund(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=ApplyRefund',
			data
		}).then((res) => res);
	},

	/**
	 * 申请退货接口
	 */
	ApplyReturn(data) {
		return ajaxRequset({
			url: '/API/OrdersHandler.ashx?action=ApplyReturn',
			data
		}).then((res) => res);
	},

	/**
	 *  我要升级和上级代理
	 */
	getMyAgent(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=GetMyAgent',
			data
		}).then((res) => res);
	},

	/**
	 * base46 上传图片
	 */
	Uploadimgbybase64(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/api/PublicHandler.ashx?action=uploadimgbybase64',
			data
		}).then(
			(res) => res
		);
	},

	/**
	 *  新增2020/05/28 pzk
	 *  获取发票接口
	 *
	 */
	getInvoice(data) {
		return ajaxRequset({
			url: '/Handler/SubmmitOrderHandler.ashx?action=GetUserInvoiceDataList',
			data
		}).then(
			(res) => res
		);
	},

	/**
	 * 查看物流详情
	 * @param {*} data 
	 */
	checkExpressDetail(data) {
		return ajaxRequset({
			url: '/API/RequestHandler.ashx?action=GetOrderExpress',
			data
		}).then(
			(res) => res
		);
	},
	/** 
	 *  绑定用户手机
	 */
	bindUserPhone(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/API/VshopProcess.ashx?action=BindPhone',
			data
		}).then((res) => res)
	},
	/** 
	 *  绑定手机时发送短信
	 */
	sendSmsForBindUserPhone(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/Handler/MemberHandler.ashx?action=SendVerifyCode&needValidate=0&imgCode=0',
			data
		}).then((res) => res)
	},
	/** 
	 *  获取旧手机好号
	 */
	getOldPhone(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/api/VshopProcess.ashx?action=GetPhone',
			data
		}).then((res) => res)
	},
	/* 验证旧手机 */
	checOldPhone(data) {
		return ajaxRequset({
			type: 'POST',
			url: '/API/VshopProcess.ashx?action=CheckPhoneCode',
			data
		}).then((res) => res)
	},

	/* 获取收藏列表 */
	getCollectList(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=GetFavorites',
			data
		}).then((res) => res)
	},
	/* 收藏或取消收藏 */
	handleCollect(data) {
		return ajaxRequset({
			url: '/API/MembersHandler.ashx?action=AddFavorite',
			data
		}).then((res) => res)
	},


};