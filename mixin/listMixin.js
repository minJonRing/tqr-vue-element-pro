import { isEmpty } from 'lodash'
import { Notification } from 'element-ui';

const ListMixin = {
  data: () => ({
    initSearch: {},
    table: [],
    pages: {
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
    },
  }),
  created() {
    this.initSearch = { ...this.search }
  },
  methods: {
    /**
     * 获取表格数据
     */
    query() {
      if (!this.mixinConfig.url) {
        this.$GLOBAL.loading = true
        setTimeout(() => {
          this.$GLOBAL.loading = false
        }, 1000);
        return
      }
      if (this.loads) {
        this.load = true
      } else {
        this.$GLOBAL.loading = true
      }
      /**
       * 请求数据处理
       */
      const { currentPage, pageSize } = this.pages;
      let data = {
        ...this.search,
        pageNum: currentPage,
        pageSize,
        total: true,
      };
      if (this.searchFilter) {
        data = {
          ...data,
          ...this.searchFilter(data)
        }
      }
      /**
       * 表单请求
       */
      return new Promise((resolve) => {
        this.$AJAX({
          url: this.mixinConfig.url || this.url,
          type: 'get',
          data
        })
          .then(({ data }) => {
            if (!isEmpty(data)) {
              try {
                const { list, total } = data
                this.pages.pageTotal = total
                this.table = list || []
              } catch (error) {
                this.table = data || []
              }
              if (this.resFilter) {
                this.table = this.resFilter(data)
              }
              this.$nextTick(() => {
                const btn = this.otherBtns || []
                if (this.multiple || !!btn.length) {
                  this.setSelection();
                }
              })
              resolve(data)
            } else {
              this.table = data || []
              resolve(data)
            }
          })
          .finally(() => {
            if (this.loads) {
              this.load = false
            } else {
              this.$GLOBAL.loading = false
            }
          })
      })
    },
    handleSearch() {
      this.pages.currentPage = 1;
      this.query();
    },
    handleReset() {
      this.search = { ...this.initSearch };
    },
    /**
     * 删除
     */
    handleDelete(id) {
      this.$GLOBAL.loading = true
      this.$AJAX({
        url: `${this.mixinConfig.delete || this.mixinConfig.url}/${id}`,
        type: "delete",
      })
        .then(() => {
          Notification.success("成功");
          this.query();
        })
        .catch(() => {
          this.$GLOBAL.loading = false
        });
    },
    /**
     * 表格默认分页更改事件
     */
    handleCurrentChange(i) {
      this.pages.currentPage = i
      this.query()
    },
    handleSizeChange(i) {
      this.pages.pageSize = i
      this.pages.currentPage = 1
      this.query()
    },
  },
}
export default ListMixin
