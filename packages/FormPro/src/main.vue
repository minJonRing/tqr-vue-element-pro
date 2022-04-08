<template>
  <div class="form-pro">
    <slot name="head" />
    <template
      v-for="(
        { label, type, className, width, children, option }, j
      ) in formList"
    >
      <div v-if="type === 'box'" :key="j" class="box-pro">
        <el-form-item v-if="option && option.render">
          <RenderElement :render="option.render" />
        </el-form-item>
        <s-form
          :class="className"
          :form="form"
          :formList="children"
          :list="list"
          :noShow="noShow"
        />
      </div>
      <el-form-item
        :key="j"
        v-else-if="renderCondition(option) && !noShow.includes(option.prop)"
        :label="label"
        :label-width="width"
        v-bind="option"
      >
        <template v-if="option.render">
          <RenderElement :render="option.render" :param="form[option.prop]" />
        </template>
        <template v-else>
          <InputPro
            v-if="type === 'input'"
            :class="className"
            :form="form"
            :option="option"
          />
          <SelectPro
            v-else-if="type === 'select'"
            :class="className"
            :form="form"
            :option="option"
            :list="list"
          />
          <CheckPro
            v-else-if="type === 'check'"
            :class="className"
            :form="form"
            :option="option"
            :list="list"
          />
          <RadioPro
            v-else-if="type === 'radio'"
            :class="className"
            :form="form"
            :option="option"
            :list="list"
          />
          <SwitchPro
            v-else-if="type === 'switch'"
            :class="className"
            :form="form"
            :option="option"
            :list="list"
          />
          <CascaderPro
            v-else-if="type === 'cascader'"
            :class="className"
            :form="form"
            :option="option"
            :list="list"
          />
          <DatePro
            v-else-if="type === 'date'"
            :class="className"
            :form="form"
            :option="option"
          />
          <TimeSlotPro
            v-else-if="type === 'timeSlot'"
            :class="className"
            :form="form"
            :option="option"
          />
          <i
            v-if="option.tip"
            class="el-icon-info"
            style="color: #777; flex-shrink: 0; font-size: 13px"
            >{{ option.tip }}</i
          >
        </template>
      </el-form-item>
    </template>
    <slot />
  </div>
</template>
<script>
import RenderElement from "../../renderElement";
import InputPro from "../../InputPro/src/main.vue";
import SelectPro from "../../SelectPro/src/main.vue";
import CascaderPro from "../../CascaderPro/src/main.vue";
import CheckPro from "../../CheckPro/src/main.vue";
import DatePro from "../../DatePro/src/main.vue";
import RadioPro from "../../RadioPro/src/main.vue";
import SwitchPro from "../../SwitchPro/src/main.vue";
import TimeSlotPro from "../../TimeSlotPro/src/main.vue";

import { rulesT } from "tqr";
export default {
  name: "FormPro",
  components: {
    RenderElement,
    InputPro,
    SelectPro,
    CascaderPro,
    CheckPro,
    DatePro,
    RadioPro,
    SwitchPro,
    TimeSlotPro,
  },
  props: {
    formList: rulesT.Array,
    form: rulesT.Object,
    list: rulesT.Object,
    noShow: rulesT.Array,
  },
  methods: {
    renderCondition(option) {
      try {
        const { conditionValue, conditionFactor } = option;
        const value = conditionValue ? !!this.form[conditionValue] : true;
        const factor = conditionFactor ? conditionFactor() : true;
        return value && factor;
      } catch (error) {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-pro {
  width: 100%;
  .box-pro {
    width: 100%;
  }
}
</style>