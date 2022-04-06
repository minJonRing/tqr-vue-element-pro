import RadioPro from './src/main';

/* istanbul ignore next */
RadioPro.install = function (Vue) {
  Vue.component(RadioPro.name, RadioPro);
};

export default RadioPro;
