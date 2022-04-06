<template>
  <div :class="['element-form-pro radio-pro', option.boxClass]">
    <slot v-if="option.isRead" name="read" :data="value">
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{ returnValue(value) || option.placeholder }}
      </div>
    </slot>
    <template v-else>
      <el-radio-group
        v-model="value"
        @change="
          (val) => {
            option.change && option.change(val);
          }
        "
      >
        <el-radio v-for="i in listData" :key="i.value" :label="i.value">
          {{ i.label }}
        </el-radio>
      </el-radio-group>
    </template>
  </div>
</template>
<script>
import { arrToJson } from "../../../utils/index";
import { rulesT } from "tqr";
export default {
  name: "RadioPro",
  props: {
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
.radio-pro {
  width: 100%;
}
</style>