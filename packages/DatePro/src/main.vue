<template>
  <div :class="['element-form-pro date-pro', option.boxClass]">
    <slot v-if="option.isRead" name="read" :data="value">
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{ value }}
      </div>
    </slot>
    <template v-else>
      <el-date-picker
        v-model="value"
        v-bind="bind"
        :picker-options="returnPickerOptions(option)"
        clearable
      />
    </template>
  </div>
</template>
<script>
import { rulesT } from "tqr";
export default {
  name: "DatePro",
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
        console.log(this.model);
        return this.model;
      },
      set(data) {
        this.$emit("change", data);
      },
    },
    bind() {
      return {
        type: "date",
        placeholder: "请选择",
        "value-format": "yyyy-MM-dd",
        ...this.option,
        style: { width: "100%", ...this.option.style },
      };
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
    };
  },
  methods: {
    returnPickerOptions(option) {
      const p = option["picker-options"];
      return p ?? this.pickerOptions;
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