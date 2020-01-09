// components/cascader.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
    value: {
      type: Number,
      optionalTypes: [String, Array],
      value:[]
    },
    height: {
      type: Number,
      value: 500
    },
    options:{
      type: Array,
      value: ()=>{
        return []
      }
    },
    placeholder:{
      type: String,
      value: '请选择以下选项'
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this._initComponent()
    },
    moved: function () { },
    detached: function () { },
    error: function (error) {
      this._throwError(error)
    }
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    this._initComponent()
  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },
  error: function (error) {
      this._throwError(error)
  },

  /**
   * 组件的初始数据
   */
  data: {
    pickOptions:[],
    currentOptions:[],
    finish: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pickOptionEvent(event){
      let _pickOptionIndex = event.currentTarget.dataset.pickOptionIndex || event.target.dataset.pickOptionIndex 
      this.data.value.splice(_pickOptionIndex,this.data.value.length - _pickOptionIndex)
      this._initComponentValue()
    },
    pickCurrentOptionEvent(event){
      let _pickOption = event.currentTarget.dataset.optionValue || event.target.dataset.optionValue 
      if(!_pickOption) return
      if(this.data.finish) this.data.value.splice(-1,1)
      this.data.value = [...this.data.value,_pickOption]
      this._initComponentValue(true)
    },
    cancelEvent(){
      this.triggerEvent('cancel')
    },
    _throwError(err = {}){
      this.triggerEvent('error', err)
    },
    _initComponentValue(trigger=false){
      if(!this.data.value) return
      if(typeof this.data.value !== 'object') this.data.value = [this.data.value]
      let _pickOptions = []
      let _finish = false
      let _options = this.data.options
      for(let valueIndex in this.data.value){
        for(let optionIndex in _options){
          if(this.data.value[valueIndex] === _options[optionIndex].value || this.data.value[valueIndex] === _options[optionIndex].label || this.data.value[valueIndex] === _options[optionIndex]){
            _pickOptions.push({
              label: _options[optionIndex].label,
              value: _options[optionIndex].value
            })
            _finish = !_options[optionIndex].children || _options[optionIndex].children.length === 0
            _finish ? [_options[optionIndex]||{}] : (_options = _options[optionIndex].children || [])
            break
          }
        }
      }
      this.setData({
        pickOptions: _pickOptions,
        currentOptions: _options,
        finish: _finish
      })
      if(trigger&&_finish) this.triggerEvent('confirm',_pickOptions)
    },
    _initComponent(){
      // 初始化组件
      this._initComponentValue()
    }
  }
})
