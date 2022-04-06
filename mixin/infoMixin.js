import { Notification } from 'element-ui';

const TableMixin = {
  methods: {
    // 详情
    getDetail(id) {
      this.$GLOBAL.loading = true
      return new Promise((resolve, reject) => {
        this.$AJAX({
          url: `${this.mixinConfig.detail || this.mixinConfig.url}/${id}`,
          type: "get",
        })
          .then((res) => {
            const { data } = res;
            resolve(data)
          }).catch(() => {
            reject()
          }).finally(() => {
            this.$GLOBAL.loading = false
          });
      })

    },
    // 提交
    submit(data, back = true) {
      this.$GLOBAL.loading = true
      const { id } = data
      return new Promise((resolve, reject) => {
        this.$AJAX({
          url: id ? `${this.mixinConfig.upload || this.mixinConfig.url}/${id}` : (this.mixinConfig.add || this.mixinConfig.url),
          type: id ? "put" : 'post',
          data
        })
          .then((res) => {
            Notification({
              type: 'success',
              message: res.msg || '成功'
            })
            if (back) {
              this.back();
            }
            resolve(res)
          }).catch(() => {
            reject()
          }).finally(() => {
            this.$GLOBAL.loading = false
          });
      })
    },
    back() {
      this.$store
        .dispatch("tagsView/delView", this.$route)
        .then(({ visitedViews }) => {
          const latestView = visitedViews.slice(-1)[0];
          if (latestView) {
            this.$router.push("list");
          }
        });
    },
  },
}
export default TableMixin
