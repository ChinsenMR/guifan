import {
	bindUserPhone,
	sendSmsForBindUserPhone
} from '../../../utils/requestApi.js';
const app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		form: {
			verifyCode: '',
			phone: '',
			password: '',
			rePassword: ''
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
	onShow() {},

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
	/* 绑定用户或者修改用户 */
	bindPhone() {
		const {
			sendCodeText,
			form: {
				verifyCode,
				phone,
				password,
				rePassword
			},
			fromType,
		} = this.data;



		const verify = fromType ? [
			app.verify.verifyCode(verifyCode, 4),
			app.verify.mobile(phone),
		] : [app.verify.item({
				text: rePassword,
				error: '请输入重复密码'
			}),
			app.verify.item({
				text: password,
				error: '请输入密码'
			}),
			app.verify.verifyCode(verifyCode, 4),
			app.verify.mobile(phone),
		]



		if (verify.includes(false)) {
			return
		}

		if (!fromType && (password !== rePassword)) {
			return wx.showToast({
				title: '两次密码不一致',
				icon: 'none'
			});
		}

		if (sendCodeText == '发送验证码') {
			return wx.showToast({
				title: '请先获取验证码',
				icon: 'none'
			});
		}


		const formData = {
			verifyCode,
			phone,
			password,
		};

		fromType && delete formData.password

		bindUserPhone(formData).then((res) => {
			console.log(res)
			const {
				Status,
				msg
			} = res.data;
			console.log(Status,msg)
			if (Status == 'ok') {
				wx.navigateBack({
					delta: fromType ? 1 : 2,
				});
			} else {
				wx.showToast({
					title: msg
				});

				if (msg == '手机已绑定') {
					wx.navigateBack({
						delta: fromType ? 1 : 2,
					});
				}
			}

		});
	},
});