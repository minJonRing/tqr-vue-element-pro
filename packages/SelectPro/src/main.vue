<template>
  <div class="element-pro  select-pro">
    <template v-if="option.isRead">
      <slot
        name="read"
        :data="form[option.prop]"
      >
        <div :class="['read-pro', !!option.multiple ? 'textarea-pro' : '']">
          {{ returnValue(form[option.prop]) || option.placeholder }}
        </div>
      </slot>
    </template>
    <el-select
      v-else
      v-model="form[option.prop]"
      v-bind="bind"
      @change="
        (val) => {
          option.change && option.change(val) ;
        }
      "
    >
      <el-option
        v-for="item in option.listName ? list[option.listName] : option.list"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { arrToJson } from '@/utils/dictionary'
import types from '@/type'
export default {
  name: 'sSelect',
  props: {
    form: types.Object,
    // 属性prop 只读isRead 数据list
    option: types.Object,
    list: types.Object
  },
  computed: {
    bind() {
      return {
        clearable: true,
        'collapse-tags': true,
        filterable: true,
        placeholder: '请选择',
        ...this.option,
        style: { width: '100%', ...this.option.style }
      }
    },
    listJson() {
      return arrToJson(
        this.option.listName
          ? this.list[this.option.listName]
          : this.option.list
      )
    }
  },
  methods: {
    returnValue(val) {
      if (!!this.option.multiple) {
        return val.map(i => this.listJson[i]).join('，')
      } else {
        return this.listJson[val]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.s-select {
  width: 100%;
}
</style>