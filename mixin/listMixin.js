import { isEmpty } from 'lodash'
import { ajax } from '@/api/ajax'
import { mapActions } from 'vuex'

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
    ...mapActions({ setLoading: 'common/setLoading' }),
    /**
     * 获取表格数据
     */
    query() {
      if (!this.url && !this.mixinConfig.url) {
        this.setLoading();
        setTimeout(() => {
          this.setLoading(false)
        }, 1000);
        return
      }
      if (this.loads) {
        this.load = true
      } else {
        this.setLoading()
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
      return new Promise((resolve, reject) => {
        ajax({
          url: this.mixinConfig.url || this.url,
          type: 'get',
          data
        })
          .then(({ data }) => {
            if (!isEmpty(data)) {
              try {
                this.pages.pageTotal = data.total
                this.table = (data.list || []).map((i, j) => ({
                  ...i,
                  isDelete: false,
                  isSelect: false,
                  _index: j + 1
                }))

              } catch (error) {
                this.table = data || []
              }
              if (this.resFilter) {
                this.table = this.resFilter(data)
              }
              this.$nextTick(() => {
                const btn = this.otherBtns || this.hasBtns || []
                if (this.multiple || !!btn.length) {
                  this.setSelection();
                }
              })
              resolve(data)
            } else {
              this.table = data || []
            }
          })
          .finally(() => {
            if (this.loads) {
              this.load = false
            } else {
              this.setLoading(false)
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
     * 添加 编辑 查看 删除
     */
    handleAdd() {
      this.$router.push("add");
    },
    handleEdit(id) {
      this.$router.push("edit?id=" + id);
    },
    handleSee(id) {
      this.$router.push("see?id=" + id);
    },
    handleInfo(id) {
      this.$router.push("info?id=" + id);
    },
    handleDelete(id) {
      this.setLoading(true);
      ajax({
        url: `${this.mixinConfig.delete || this.url || this.mixinConfig.url}/${id}`,
        type: "delete",
      })
        .then((res) => {
          this.$message({
            type: "success",
            message: "成功",
          });
          this.query();
        })
        .catch(() => {
          this.setLoading(false);
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
