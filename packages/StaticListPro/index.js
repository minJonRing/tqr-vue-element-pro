import StaticListPro from './src/main';

/* istanbul ignore next */
StaticListPro.install = function (Vue) {
  Vue.component(StaticListPro.name, StaticListPro);
};

export default StaticListPro;
