
<template>
  <div :class="['element-form-pro check-pro', option.boxClass]">
    <slot v-if="option.isRead" name="read" :data="value">
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{ returnValue(value) }}
      </div>
    </slot>
    <template v-else>
      <el-checkbox-group
        v-model="value"
        @change="
          (val) => {
            option.change && option.change(val);
          }
        "
      >
        <el-checkbox v-for="(i, j) in listData" :key="j" :label="i.value">
          <slot name="label" :data="i">{{ i.label }}</slot>
        </el-checkbox>
      </el-checkbox-group>
    </template>
  </div>
</template>
<script>
import { arrToJson } from "../../../utils/index";
import { rulesT } from "tqr";
export default {
  name: "CheckPro",
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
      if (this.option.multiple) {
        return value.map((i) => this.listJson[i]).join("，");
      } else {
        return this.listJson[value];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.date-pro {
  width: 100%;
}
</style>