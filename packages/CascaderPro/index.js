import CascaderPro from './src/main';

/* istanbul ignore next */
CascaderPro.install = function (Vue) {
  Vue.component(CascaderPro.name, CascaderPro);
};

export default CascaderPro;
