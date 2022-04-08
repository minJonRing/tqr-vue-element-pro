import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css';
import { Input, InputNumber, Select, Option, Cascader, CheckboxGroup, Checkbox, DatePicker, RadioGroup, Radio, Switch, Progress, Form, FormItem, Table, TableColumn, Button, Upload, Popconfirm, Pagination } from 'element-ui'
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Progress)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Upload)
Vue.use(Popconfirm)
Vue.use(Pagination)

Vue.prototype.$ELEMENT = { size: 'mini' }
Vue.prototype.$GLOBAL = { loading: false }
Vue.prototype.$AJAX = function () {
  return new Promise((r) => {
    r()
  })
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
