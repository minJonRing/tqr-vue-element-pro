import ListPro from './src/main';

/* istanbul ignore next */
ListPro.install = function (Vue) {
  Vue.component(ListPro.name, ListPro);
};

export default ListPro;
