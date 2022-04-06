import TimeSlotPro from './src/main';

/* istanbul ignore next */
TimeSlotPro.install = function (Vue) {
  Vue.component(TimeSlotPro.name, TimeSlotPro);
};

export default TimeSlotPro;
