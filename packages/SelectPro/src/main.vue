<template>
  <div :class="['element-form-pro select-pro', option.boxClass]">
    <slot v-if="option.isRead" name="read" :data="value">
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{ returnValue(value) || option.placeholder }}
      </div>
    </slot>
    <el-select
      v-else
      v-model="value"
      v-bind="bind"
      @change="
        (val) => {
          option.change && option.change(val);
        }
      "
    >
      <el-option
        v-for="item in listData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { arrToJson } from "../../../utils/index";
import { rulesT } from "tqr";
export default {
  name: "SelectPro",
  props: {
    // 赋值的值
    model: rulesT.Any,
    // 其他绑定属性
    option: rulesT.Object,
    // 字典
    list: rulesT.Object,
  },
  model: {
    prop: "model",
    event: "change",
  },
  computed: {
    value: {
      get() {
        return this.model;
      },
      set(data) {
        this.$emit("change", data);
      },
    },
    bind() {
      return {
        clearable: true,
        "collapse-tags": true,
        filterable: true,
        placeholder: "请选择",
        ...this.option,
        style: { width: "100%", ...this.option.style },
      };
    },
    listData() {
      const { list, listName } = this.option;
      return listName ? this.list[listName] : list || [];
    },
    listJson() {
      const { listName, list } = this.option;
      const _list = listName ? this.list[listName] : list;
      return arrToJson(_list);
    },
  },
  methods: {
    returnValue(value) {
      return this.listJson[value];
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../style/index.scss";
.select-pro {
  width: 100%;
}
</style>