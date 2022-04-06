import ReadPro from './src/main';

/* istanbul ignore next */
ReadPro.install = function (Vue) {
  Vue.component(ReadPro.name, ReadPro);
};

export default ReadPro;
