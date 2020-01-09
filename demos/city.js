// demos/city.js
const pcaa = require('../assets/pcaa')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cascaderStatus:false,
    city: [],
    cities:[{
      label:'江苏省',
      value:'1010',
      children:[{
        label:'南京市',
        value:'1011',
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this
    self.setData({
      cities: self.getOptions()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  getOptions(){
    const _getCities = key =>{
      return pcaa[key]
    }
    const _getOptions = (obj,level)=>{
      let _options = this.getFormatData(obj)
      if(!--level) return _options
      return _options.map(item=>{
        item.children = _getOptions(_getCities(item.value),level)
        return item
      })
    }
    return _getOptions(_getCities('86'),3)
  },
  getFormatData(obj){
    let _arr = []
    for(let key in obj){
      _arr.push({
        value: key,
        label: obj[key]
      })
    }
    return _arr
  },
  confirmEvent({detail}){
    this.setData({
      city: detail.map(city=>{
        return city.label
      }),
      cascaderStatus: false
    })
  },
  cancelEvent(){
    this.setData({
      cascaderStatus: false
    })
  },
  errorEvent({detail}){
    console.error(detail)
  },

  showCascader(){
    this.setData({
      cascaderStatus: true
    })
  },

  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})