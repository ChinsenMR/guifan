import {
	getOldPhone,
	checOldPhone,
	sendSmsForBindUserPhone
} from '../../../utils/requestApi';

const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		form: {
			verifyCode: '',
			phone: '',
		},
		sendCodeText: '发送验证码',
		fromType: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData(options);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		this.getOldPhone();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {},

	// 提交表单
	submitForm(e) {
		console.log(e);
		this.setData({});
	},

	onchangeType() {
		console.log(1121);
		this.setData({
			passwordShow: !this.data.passwordShow,
		});
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {},
	/*输入文本 */
	inputText(e) {

		const {
			currentTarget: {
				dataset: {
					type
				}
			},
			detail: {
				value
			}
		} = e

		this.setData({
			[`form.${type}`]: value
		});
	},
	/* 倒计时 */
	countDown() {
		let time = 60;
		let that = this;
		let timer = setInterval(() => {
			if (time == 0) {
				clearInterval(timer);
				that.setData({
					sendCodeText: '重新发送',
				});
				return;
			}

			time--;
			that.setData({
				sendCodeText: '重新获取' + time + 's',
			});
		}, 1000);
	},
	/* 获取旧手机号 */
	getOldPhone() {
		getOldPhone().then(res => {
			const {
				data: {
					data: {
						CellPhone
					}
				}
			} = res;
			console.log(CellPhone, '222')
			this.setData({
				[`form.phone`]: CellPhone
			})
		})


	},
	/* 发送验证码 */
	sendSms() {
		const {
			sendCodeText,
			form: {
				phone
			}
		} = this.data;

		if (!['发送验证码', '重新发送'].includes(sendCodeText)) return;

		if (!phone || phone.length < 11) {
			return wx.showToast({
				title: '手机号码格式有误',
				icon: 'none',
				duration: 1500,
			});
		}


		sendSmsForBindUserPhone({
			phone
		}).then((res) => {
			const {
				success,
				msg
			} = res.data;

			if (success != 'true') {
				return wx.showToast({
					title: msg,
					icon: 'none'
				});
			}

			wx.showToast({
				title: '发送成功',
			});

			this.countDown();
		});
	},
	/**验证旧手机 */
	checOldPhone() {
		const {
			form: {
				verifyCode
			}
		} = this.data;

		if (String(verifyCode).length < 4) {
			return wx.showToast({
				title: '请输入4位数验证码',
				icon: 'none'
			})
		}

		checOldPhone({
			verifyCode: verifyCode
		}).then(res => {
			console.log(res, '??')
			const {
				Status,
				msg
			} = res.data;

			if (Status == "ok"){
				wx.navigateTo({
					url: '/packageB/pages/bindPhone/bindPhone?fromType=setNewPhone'
				})
			}else{
				return wx.showToast({
					title: msg,
					icon: 'none'
				})
			}
		})
	}
});