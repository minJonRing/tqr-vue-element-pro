<template>
  <div class="List">
    <!-- 查询 -->
    <el-form
      ref="search"
      :class="['search-pro', layoutClass.search]"
      inline
      :model="search"
      :label-width="searchWidth"
      label-position="left"
    >
      <slot name="search">
        <template v-for="({ label, type, width, option }, j) in searchParam">
          <div v-if="!type" class="w100" :key="j" />
          <el-form-item v-else :label="label" :key="j" :label-width="width">
            <el-input
              v-if="type === 'input'"
              v-model="search[option.prop]"
              v-bind="vBind('input', option)"
              @change="
                (val) => {
                  option.change && option.change(val);
                }
              "
            />
            <el-select
              v-else-if="type === 'select'"
              v-model="search[option.prop]"
              v-bind="vBind('select', option)"
              @change="
                (val) => {
                  option.change && option.change(val);
                }
              "
            >
              <el-option
                v-for="item in option.listName
                  ? list[option.listName]
                  : option.list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-date-picker
              v-else-if="type === 'date'"
              v-model="search[option.prop]"
              v-bind="vBind('date', option)"
              placeholder="请选择日期"
            />
            <el-cascader
              v-else-if="type === 'cascader'"
              :options="option.listName ? list[option.listName] : option.list"
              v-model="search[option.prop]"
              v-bind="vBind('cascader', option)"
              @change="
                (val) => {
                  option.change && option.change(val);
                }
              "
            />
            <div v-else-if="type === 'timeSlot'" class="flex flex-mid time-box">
              <el-date-picker
                v-model="search[option.prop[0]]"
                v-bind="vBind('timeSlot', option)"
              />
              <span
                :style="{
                  display: 'inline-block',
                  boxSizing: 'border-box',
                  width: searchWidth || '',
                  textAlign: 'center',
                  ...option.spanStyle,
                }"
                >~</span
              >
              <el-date-picker
                v-model="search[option.prop[1]]"
                v-bind="vBind('timeSlot', option)"
              />
            </div>
          </el-form-item>
        </template>
      </slot>
      <slot name="moreSearch" :data="search" />
      <!-- 查询按钮列 -->
      <el-form-item>
        <!-- 查询 -->
        <el-button
          v-if="returnBtn('search')"
          v-bind="getBtnOption.search"
          @click="handleSearch"
        >
          {{ getBtnOption.search.name }}
        </el-button>
        <!-- 重置 -->
        <el-button
          v-if="returnBtn('reset')"
          v-bind="getBtnOption.reset"
          @click="handleReset"
        >
          {{ getBtnOption.reset.name }}
        </el-button>
        <!-- 其他lost -->
        <slot name="moreSearchBtn" />
      </el-form-item>
    </el-form>
    <div :class="['edits-pro', layoutClass.edits]">
      <!-- 添加 -->
      <el-button
        v-if="returnBtn('add')"
        v-bind="getBtnOption.add"
        @click="handleJump('add')"
      >
        {{ getBtnOption.add.name }}
      </el-button>
      <!-- 全选 -->
      <el-button
        v-if="returnBtn('allSelect')"
        v-bind="getBtnOption.allSelect"
        @click="handleAddMore"
      >
        {{ getBtnOption.allSelect.name }}
      </el-button>
      <!-- 导入 -->
      <el-upload
        v-if="returnBtn('import')"
        class="upload"
        action="#"
        multiple
        :show-file-list="false"
        :before-upload="handleBeforeUpload"
        :http-request="handleUpload"
      >
        <div>
          <el-popover
            placement="top-start"
            trigger="hover"
            :content="`只能上传${(importOption.fileType || []).join(
              '、'
            )}文件，且不超过${importOption.fileSize || '∞'}M`"
          >
            <el-button slot="reference" v-bind="getBtnOption.import">{{
              getBtnOption.import.name
            }}</el-button>
          </el-popover>
        </div>
      </el-upload>
      <!-- 导出 -->
      <el-button
        v-if="returnBtn('export')"
        v-bind="getBtnOption.export"
        @click="handleExport"
      >
        {{ getBtnOption.export.name }}
      </el-button>
      <!-- 模板下载 -->
      <el-button
        v-if="returnBtn('template')"
        v-bind="getBtnOption.template"
        @click="handleDown"
      >
        {{ getBtnOption.template.name }}
      </el-button>
      <slot name="moreEdits" />
    </div>
    <el-table
      ref="table"
      :data="table"
      :class="['table-pro', layoutClass.table]"
      v-bind="tableConfig"
      @row-dblclick="dblclick"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <slot name="table">
        <!-- 序号 -->
        <el-table-column type="index" width="50" />
        <!-- 单选、多选 -->
        <el-table-column
          v-if="otherBtns.includes('allSelect')"
          type="selection"
          width="55"
        />
        <!-- 二级内容 -->
        <el-table-column v-if="tableConfig.expand" type="expand">
          <template slot-scope="{ row }">
            <render-element :render="tableConfig.expand" :param="row" />
          </template>
        </el-table-column>
        <el-table-column v-for="(i, j) in tableParam" :key="j" v-bind="i">
          <template slot-scope="{ row }">
            <render-element
              v-if="i.render"
              :render="i.render"
              :param="row[i.prop]"
              :row="row"
            />
            <div v-else>{{ row[i.prop] }}</div>
          </template>
        </el-table-column>
      </slot>
      <!-- 操作 默认 查看 编辑 删除 -->
      <slot v-if="!tableConfig['show-summary']" name="moreTable">
        <el-table-column
          fixed="right"
          label="操作"
          :width="tableConfig.handleWidth || '160'"
        >
          <template slot-scope="scope">
            <el-button
              v-if="returnBtn('see', scope)"
              v-bind="getBtnOption.see"
              @click="handleJump('see', scope.row)"
            >
              {{ getBtnOption.see.name }}
            </el-button>
            <el-button
              v-if="returnBtn('edit', scope)"
              v-bind="getBtnOption.edit"
              @click="handleJump('edit', scope.row)"
            >
              {{ getBtnOption.edit.name }}
            </el-button>
            <slot class="ml10" name="tableBtns" :data="scope" />
            <el-popconfirm
              class="ml10"
              v-if="returnBtn('delete', scope)"
              :title="getBtnOption.delete.tip || '确定删除？'"
              placement="top"
              @confirm="handleJump('delete', scope.row)"
            >
              <el-button
                v-bind="getBtnOption.delete"
                slot="reference"
                style="color: red"
              >
                {{ getBtnOption.delete.name }}
              </el-button>
            </el-popconfirm>
            <el-popconfirm
              class="ml10"
              v-if="returnBtn('select', scope)"
              title="确定选择？"
              placement="top"
              @confirm="handleSelect(scope.row)"
            >
              <el-button
                v-bind="getBtnOption.select"
                slot="reference"
                style="color: #67c23a"
              >
                {{ getBtnOption.select.name }}
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </slot>
    </el-table>
    <!-- 分页 -->
    <div
      v-if="!tableConfig['show-summary']"
      :class="['pages-pro', layoutClass.table]"
    >
      <el-pagination
        :current-page="pages.currentPage"
        :page-sizes="[5, 10, 20, 50, 100, 200]"
        :page-size="pages.pageSize"
        :layout="
          pagesOption.layout || 'total, sizes, prev, pager, next, jumper'
        "
        :total="pages.pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <slot name="more" />
  </div>
</template>

<script>
import RenderElement from "../../renderElement";
import { isArray } from "lodash";
import rulesT from "tqr";
export default {
  name: "StaticListPro",
  components: {
    RenderElement,
  },
  props: {
    // 初始数据
    initTable: rulesT.Array,
    // table数据处理
    tableFilter: Function,
    // 字典对象
    list: rulesT.Object,
    // 查询条件label宽度
    searchWidth: rulesT.String,
    // 默认初始查询条件
    initSearchParam: rulesT.Function,
    // 搜索条件
    searchParam: rulesT.Array,
    // 表格数据参数
    tableParam: rulesT.Array,
    // 不要显示的按钮
    noBtns: rulesT.Array,
    // 其他按钮
    otherBtns: rulesT.Array,
    // 按钮显示的条件
    conditionBtn: rulesT.Object,
    // 编辑按钮是否跳转
    jump: rulesT.Boolean,
    // 表格样式
    tableOption: rulesT.Object,
    // 分页参数
    pagesOption: rulesT.Object,
    // 选中的数据 回显使用
    selection: rulesT.Array,
    selectionId: {
      type: String,
      default: "id",
    },
    // 启用双击选择
    double: rulesT.Boolean,
    // 添加，编辑，查看，删除文字
    btnOption: rulesT.Object,
    // 数据导入、导出、模板下载
    importOption: rulesT.Object,
    exportOption: rulesT.Object,
    templateOption: rulesT.Object,
    // 布局class
    layoutClass: rulesT.Object,
  },
  data() {
    return {
      search: {},
      initSearch: {},
      table: [],
      pages: {
        currentPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
      multipleSelection: [],
    };
  },
  watch: {
    initTable() {
      this.query();
    },
  },
  computed: {
    tableConfig() {
      return {
        stripe: false,
        border: true,
        "highlight-current-row": true,
        ...this.tableOption,
        style: { width: "100%", ...this.tableOption.style },
      };
    },
    getBtnOption() {
      const { search, reset, allSelect, template, add, edit, see, select } =
        this.btnOption;
      return {
        search: {
          name: "查询",
          type: "primary",
          ...search,
        },
        reset: {
          name: "重置",
          ...reset,
        },
        allSelect: {
          name: "添加勾选数据",
          type: "success",
          ...allSelect,
        },
        export: {
          name: "导出",
          type: "primary",
          ...this.btnOption.export,
        },
        import: {
          name: "导入",
          type: "primary",
          ...this.btnOption.import,
        },
        template: {
          name: "模板下载",
          ...template,
        },
        add: {
          name: "添加",
          type: "primary",
          ...add,
        },
        edit: {
          name: "编辑",
          type: "text",
          ...edit,
        },
        see: {
          name: "查看",
          type: "text",
          ...see,
        },
        delete: {
          name: "删除",
          type: "text",
          ...this.btnOption.delete,
        },
        select: {
          name: "选择",
          type: "text",
          ...select,
        },
      };
    },
  },
  mounted() {
    this.init();
    this.query();
  },
  methods: {
    query() {
      const param = {
        search: this.search,
        initTable: this.initTable,
      };
      // 分页
      const { currentPage, pageSize } = this.pages;
      const start = (currentPage - 1) * pageSize;
      const end = currentPage * pageSize;
      // 获取匹配的数据
      const { initTable } = this.tableFilter
        ? this.tableFilter(param)
        : { initTable: [] };
      // 获取当前的数据
      this.table = initTable.slice(start, end);
      this.pages.pageTotal = initTable.length;
      this.$nextTick(() => {
        const btn = this.otherBtns;
        if (this.multiple || !!btn.length) {
          this.setSelection();
        }
      });
    },

    handleSearch() {
      this.pages.currentPage = 1;
      this.query();
    },
    handleReset() {
      this.search = { ...this.initSearch };
    },
    vBind(type, option) {
      let bind = {
        clearable: true,
        placeholder: "请选择",
      };
      switch (type) {
        case "input":
          bind = {
            ...bind,
            placeholder: "请输入",
          };
          break;
        case "select":
          bind = {
            ...bind,
            filterable: true,
          };
          break;
        case "date":
          bind = {
            ...bind,
            type: "date",
            "value-format": "yyyy-MM-dd",
          };
          break;
        case "cascader":
          bind = {
            ...bind,
            filterable: true,
            props: {
              emitPath: false,
            },
          };
          break;
        case "timeSlot":
          bind = {
            ...bind,
            type: "date",
            "value-format": "yyyy-MM-dd",
          };
          break;
        default:
          break;
      }
      return {
        ...bind,
        ...option,
      };
    },
    setSelection() {
      for (let el of this.table) {
        const id = el[this.selectionId];
        if (this.selection.includes(id)) {
          this.$refs.table.toggleRowSelection(el, true);
        }
      }
    },
    defaultRow() {
      return {
        rowspan: 1,
        colspan: 1,
      };
    },
    init() {
      let searchParam = [...this.searchParam];
      let search = {};
      for (let {
        option: { prop, initValue },
      } of searchParam) {
        if (isArray(prop)) {
          for (let i in prop) {
            search[prop[i]] = initValue;
          }
        } else {
          search[prop] = initValue;
        }
      }
      this.search = {
        ...search,
        ...(this.initSearchParam ? this.initSearchParam(search) : {}),
      };
    },
    returnBtn(name, data) {
      // 基本按钮
      const base = ["search", "reset", "add", "edit", "see", "delete"].includes(
        name
      );
      return (
        (base ? !this.noBtns.includes(name) : this.otherBtns.includes(name)) &&
        (!this.conditionBtn[name] || this.conditionBtn[name](data))
      );
    },
    handleJump(handle, data = {}) {
      if (this.jump) {
        const param = data.id ? `${handle}?id=` + data.id : handle;
        this.$router.push(param);
      } else {
        this.$emit("getJump", { handle, data });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleAddMore() {
      this.$emit("getData", this.multipleSelection);
    },
    // 双击单元格
    dblclick(row) {
      this.double && this.$emit("getData", [row]);
    },
    handleSelect(data) {
      this.$emit("getData", [data]);
    },
    /**
     * 表格默认分页更改事件
     */
    handleCurrentChange(i) {
      this.pages.currentPage = i;
      this.query();
    },
    handleSizeChange(i) {
      this.pages.pageSize = i;
      this.pages.currentPage = 1;
      this.query();
    },
  },
};
</script>

<style lang="scss" scoped>
.List {
  .w-100 {
    width: 100%;
  }
  .percentage {
    position: fixed;
    width: 200px;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 6px;
    padding: 9px 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 9999;
    pointer-events: none;
  }
  .search-pro {
    .el-form-item {
      margin: 5px;
      .el-input,
      .el-select,
      .el-cascader {
        width: 185px;
      }
    }
  }
  .edits-pro {
    margin: 5px 0 10px;
  }
  .pages-pro {
    margin: 5px;
  }
  .time-box {
    display: flex;
    align-items: center;
    span {
      padding: 0 9px;
    }
  }
  .upload {
    display: inline-block;
    & + .el-button {
      margin-left: 10px;
    }
  }
}
</style>

