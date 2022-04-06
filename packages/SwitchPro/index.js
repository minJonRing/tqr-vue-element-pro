import SwitchPro from './src/main';

/* istanbul ignore next */
SwitchPro.install = function (Vue) {
  Vue.component(SwitchPro.name, SwitchPro);
};

export default SwitchPro;
