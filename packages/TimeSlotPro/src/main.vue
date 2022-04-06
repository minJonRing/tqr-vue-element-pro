<template>
  <div :class="['element-form-pro time-slot-pro', option.boxClass]">
    <slot
      v-if="option.isRead"
      name="read"
      :data="[form[option.prop[0]], form[option.prop[1]]]"
    >
      <div :class="['element-read-pro read-pro', option.readClass]">
        {{ form[option.prop[0]] + " 至 " + form[option.prop[1]] }}
      </div>
    </slot>
    <div v-else class="time-slot-cont">
      <el-date-picker
        v-model="valueOne"
        v-bind="bind"
        :picker-options="returnPickerOptions(option)"
      />
      <span :class="['time-slot-span', option.spanClass]">
        {{ option.spanText || "至" }}
      </span>
      <el-date-picker
        v-model="valueTow"
        v-bind="bind"
        :picker-options="returnPickerOptions(option)"
      />
    </div>
  </div>
</template>
<script>
import { rulesT } from "tqr";
export default {
  name: "TimeSlotPro",
  props: {
    form: rulesT.Object,
    // 其他绑定属性
    option: rulesT.Object,
  },
  computed: {
    valueOne: {
      get() {
        return this.form[this.option.prop[0]];
      },
      set(data) {
        this.$emit("change", { prop: this.option.prop[0], data });
      },
    },
    valueTow: {
      get() {
        return this.form[this.option.prop[1]];
      },
      set(data) {
        this.$emit("change", { prop: this.option.prop[1], data });
      },
    },
    bind() {
      return {
        type: "date",
        "value-format": "yyyy-MM-dd",
        placeholder: "请选择日期",
        ...this.option,
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
.time-slot-pro {
  width: 100%;
  .time-slot-cont {
    display: flex;
    align-items: center;
    .time-slot-span {
      padding: 0 9px;
    }
  }
}
</style>