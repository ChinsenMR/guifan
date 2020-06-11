const { ajaxRequset } = require('./request.js');


module.exports = [
  /**
   * 获取商品列表
   * **/
  function getProductsList(data) {
    return ajaxRequset('GET', 'APIFH/ProductHandler.ashx?action=GetProducts', data).then(res => res)
  },

  
]
