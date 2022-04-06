import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css';
import { Input, InputNumber, Select, Option, Cascader, CheckboxGroup, Checkbox, DatePicker, RadioGroup, Radio, Switch } from 'element-ui'
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

Vue.prototype.$ELEMENT = { size: 'mini' }

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
