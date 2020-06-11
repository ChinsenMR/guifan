let app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		img:
			'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=269425474,3127521982&fm=85&s=B297256CA623B74F0C7C948B0300E099',
		obj: {},
		xgImg: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCation();
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},
	//获取上级代理数据
	getCation() {
		app.Fg({
			url: '/API/MembersHandler.ashx?action=GetMyAgent',
		}).then((res) => {
			console.log('输出上级代理数据', res); //CertImg
			// console.log("输出资质图片",obj.split(',')[1]);
			if (res.data.status == 'Success' || res.data.statu == 'true') {
				let certimg = res.data.Data.CertImg;
				this.setData({
					obj: res.data.Data,
					xgImg: certimg.split(',')[1],
				});
			} else {
				wx.showToast({
					title: res.data.msg,
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
