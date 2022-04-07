<template>
  <div id="app">
    <InputPro v-model="form[option[0].prop]" :option="option[0]" />
    <SelectPro v-model="form[option[1].prop]" :option="option[1]" />
    <CascaderPro v-model="form[option[2].prop]" :option="option[2]" />
    <CheckPro v-model="form[option[3].prop]" :option="option[3]" />
    <DatePro v-model="form[option[4].prop]" :option="option[4]" />
    <RadioPro v-model="form[option[5].prop]" :option="option[5]" />
    <SwitchPro v-model="form[option[6].prop]" :option="option[6]" />
    <TimeSlotPro :form="form" :option="option[7]" @change="handleChange" />
    <div @click="a">123</div>
    <ListPro
      :mixinConfig="{ url: '' }"
      :searchParam="searchParam"
      :tableParam="tableParam"
    />
  </div>
</template>

<script>
import InputPro from "../packages/InputPro/src/main.vue";
import SelectPro from "../packages/SelectPro/src/main.vue";
import CascaderPro from "../packages/CascaderPro/src/main.vue";
import CheckPro from "../packages/CheckPro/src/main.vue";
import DatePro from "../packages/DatePro/src/main.vue";
import RadioPro from "../packages/RadioPro/src/main.vue";
import SwitchPro from "../packages/SwitchPro/src/main.vue";
import TimeSlotPro from "../packages/TimeSlotPro/src/main.vue";
import ListPro from "../packages/ListPro/src/main.vue";
export default {
  name: "App",
  components: {
    InputPro,
    SelectPro,
    CascaderPro,
    CheckPro,
    DatePro,
    RadioPro,
    SwitchPro,
    TimeSlotPro,
    ListPro,
  },
  data() {
    return {
      form: {
        a: "123",
        b: [],
        c: [],
        d: [1],
        e: "2022-01-22",
        f: "",
        g: false,
        h: "",
        i: "",
      },
      option: [
        {
          prop: "a",
          isRead: false,
        },
        {
          prop: "b",
          isRead: false,
          multiple: true,
          "collapse-tags": false,
          list: [
            { value: 1, label: "啊啊" },
            { value: 2, label: "看看" },
          ],
        },
        {
          prop: "c",
          isRead: false,
          props: {
            multiple: true,
          },
          list: [
            {
              value: 1,
              label: "啊啊",
              children: [{ value: 3, label: "阿达" }],
            },
            { value: 2, label: "看看" },
          ],
        },
        {
          prop: "d",
          isRead: false,
          list: [
            { value: 1, label: "啊啊" },
            { value: 2, label: "看看" },
          ],
        },
        {
          prop: "e",
          isRead: false,
        },
        {
          prop: "f",
          isRead: false,
          list: [
            { value: 1, label: "啊啊" },
            { value: 2, label: "看看" },
          ],
        },
        {
          prop: "g",
          isRead: false,
        },
        {
          prop: ["h", "i"],
          isRead: false,
        },
      ],
      searchParam: [
        {
          label: "aa",
          type: "input",
          option: {
            prop: "a",
          },
        },
      ],
      tableParam: [
        {
          label: "aa",
          prop: "a",
        },
      ],
    };
  },
  methods: {
    handleChange({ prop, data }) {
      this.form[prop] = data;
    },
    a() {
      console.log(this.form);
    },
  },
};
</script>

<style>
</style>
