import InputPro from './src/main';

/* istanbul ignore next */
InputPro.install = function (Vue) {
  Vue.component(InputPro.name, InputPro);
};

export default InputPro;
