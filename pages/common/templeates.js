require("../../utils/config.js"), getApp();

Page({
    data: {
      RequestUrl: getApp.getRequestUrl()
    },
    onLoad: function(n) {
      console.log('onLoad')
    },
    onReady: function () { console.log('onReady')},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    viewTap: function() {
        this.setData({
            text: "Set some data for updating view."
        });
    },
    customData: {
        hi: "MINA"
    }
});