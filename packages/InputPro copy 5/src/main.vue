<template>
  <div :class="['element-pro input-pro',option.boxClass]">
    <template v-if="option.isRead">
      <div
        slot="read"
        :class="['read-pro', option.type === 'textarea' ? 'textarea-pro' : '']"
        :data="form[option.prop]"
      >
        {{ form[option.prop] }}
      </div>
    </template>
    <template v-else>
      <el-input-number
        v-if="option.type === 'number'"
        v-model="form[option.prop]"
        v-bind="numberBind"
      />
      <el-input
        v-else
        v-model="form[option.prop]"
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
import types from '@/type'
export default {
  name: 'Sinput',
  props: {
    form: types.Object,
    // 属性prop 只读isRead 类型type
    option: types.Object
  },
  computed: {
    numberBind() {
      return {
        min: 0,
        precision: 0,
        controls: false,
        placeholder: '请输入',
        style: { 'text-align': 'left', width: '100%', ...this.option.style }
      }
    },
    bind() {
      return {
        type: 'text',
        rows: 4,
        placeholder: '请输入',
        clearable: true,
        'show-word-limit': true,
        ...this.option,
        style: { width: '100%', ...this.option.style }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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