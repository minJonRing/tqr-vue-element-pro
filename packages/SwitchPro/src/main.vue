<template>
  <div :class="['element-form-pro switch-pro', option.boxClass]">
    <slot v-if="option.isRead" name="read" :data="value">
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{ value ? "是" : "否" }}
      </div>
    </slot>
    <el-switch
      v-else
      v-model="value"
      :active-text="activeConfig.label || '是'"
      :inactive-text="inactiveConfig.label || '否'"
      :active-value="activeConfig.value || true"
      :inactive-value="inactiveConfig.value || false"
      v-bind="bind"
      @change="
        (val) => {
          option.change && option.change(val);
        }
      "
    />
  </div>
</template>
<script>
import { rulesT } from "tqr";
export default {
  name: "SwitchPro",
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
    activeConfig() {
      const { list, listName } = this.option;
      return list ? list[0] : listName ? this.list[listName][0] : {};
    },
    inactiveConfig() {
      const { list, listName } = this.option;
      return list ? list[1] : listName ? this.list[listName][1] : {};
    },
    bind() {
      return {
        ...this.option,
        style: { width: "100%", ...this.option.style },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.switch-pro {
  width: 100%;
}
</style>