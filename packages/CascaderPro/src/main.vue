<template>
  <div :class="['element-form-pro cascader-pro', option.boxClass]">
    <slot v-if="option.isRead" slot="read" :data="value">
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{
          isArray(value)
            ? value
                .map((i) => {
                  return listJson[i];
                })
                .join("，") || option.placeholder
            : listJson[value] || option.placeholder
        }}
      </div>
    </slot>
    <template v-else>
      <el-cascader
        v-model="value"
        :options="listData"
        v-bind="bind"
        @change="
          (val) => {
            option.change && option.change(val);
          }
        "
      >
      </el-cascader>
    </template>
  </div>
</template>
<script>
import { arrToJson } from "../../../utils/index";
import { isArray } from "lodash";
import { rulesT } from "tqr";
export default {
  name: "CascaderPro",
  props: {
    // 赋值的值
    model: rulesT.Any,
    // 其他绑定属性
    option: rulesT.Object,
    // 配置选项
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
        filterable: true,
        "collapse-tags": true,
        "show-all-levels": false,
        placeholder: "请选择",
        ...this.option,
        props: {
          emitPath: false,
          ...this.option.props,
        },
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
    isArray(data) {
      return isArray(data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.cascader-pro {
  width: 100%;
}
</style>