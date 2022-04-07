import FormPro from './src/main';

/* istanbul ignore next */
FormPro.install = function (Vue) {
  Vue.component(FormPro.name, FormPro);
};

export default FormPro;
