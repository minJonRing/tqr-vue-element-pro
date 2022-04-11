import InputPro from "../packages/InputPro/src/main.vue";
// import SelectPro from "../packages/SelectPro/src/main.vue";
// import CascaderPro from "../packages/CascaderPro/src/main.vue";
// import CheckPro from "../packages/CheckPro/src/main.vue";
// import DatePro from "../packages/DatePro/src/main.vue";
// import RadioPro from "../packages/RadioPro/src/main.vue";
// import SwitchPro from "../packages/SwitchPro/src/main.vue";
// import TimeSlotPro from "../packages/TimeSlotPro/src/main.vue";
// import FormPro from "../packages/FormPro/src/main.vue";
// import ListPro from "../packages/ListPro/src/main.vue";
// import StaticListPro from "../packages/StaticListPro/src/main.vue";

const components = [
  InputPro,
  // SelectPro,
  // CascaderPro,
  // CheckPro,
  // DatePro,
  // RadioPro,
  // SwitchPro,
  // TimeSlotPro,
  // FormPro,
  // ListPro,
  // StaticListPro
]
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$AJAX = opts.ajax
  Vue.prototype.$GLOBAL = opts.global
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.1.6',
  install,
  InputPro,
  // SelectPro,
  // CascaderPro,
  // CheckPro,
  // DatePro,
  // RadioPro,
  // SwitchPro,
  // TimeSlotPro,
  // FormPro,
  // ListPro,
  // StaticListPro
}