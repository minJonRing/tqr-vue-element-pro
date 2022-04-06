import DatePro from './src/main';

/* istanbul ignore next */
DatePro.install = function (Vue) {
  Vue.component(DatePro.name, DatePro);
};

export default DatePro;
