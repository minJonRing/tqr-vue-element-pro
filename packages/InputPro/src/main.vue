<template>
  <div :class="['element-form-pro input-pro', option.boxClass]">
    <slot v-if="option.isRead" name="read" :data="value">
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{ value }}
      </div>
    </slot>
    <template v-else>
      <el-input-number
        v-if="option.type === 'number'"
        v-model="value"
        v-bind="numberBind"
      />
      <el-input
        v-else
        v-model="value"
        v-bind="bind"
        @change="
          (val) => {
            option.blur && option.blur(val);
          }
        "
      />
    </template>
  </div>
</template>
<script>
import { rulesT } from "tqr";
export default {
  name: "InputPro",
  props: {
    // 赋值的值
    model: rulesT.Any,
    // 其他绑定属性
    option: rulesT.Object,
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
    numberBind() {
      return {
        min: 0,
        precision: 0,
        controls: false,
        placeholder: "请输入",
        ...this.option,
        style: { width: "100%", ...this.option.style },
      };
    },
    bind() {
      return {
        type: "text",
        rows: 4,
        clearable: true,
        "show-word-limit": true,
        placeholder: "请输入",
        ...this.option,
        style: { width: "100%", ...this.option.style },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.input-pro {
  width: 100%;
  .textarea-pro {
    min-height: 30px;
  }
  .el-input-number {
    ::v-deep .el-input__inner {
      text-align: left;
    }
  }
}
</style>