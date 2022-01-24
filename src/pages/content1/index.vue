<template>
  <div class="container">
    <el-button style="height: 30px" ref="preview">预览</el-button>
    <el-button style="height: 30px" ref="search">搜索</el-button>
  </div>
</template>

<script>
import { tooltip } from "../../components/tooltip/index.js";
export default {
  data() {
    return {
      tooltip1: null,
      tooltip2: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showTooltip();
    });
  },
  methods: {
    showTooltip() {
      if (this.$route.query.first) {
        tooltip(this.$refs.preview.$el, {
          position: "bottom",
          content: "这是预览功能",
        }).then((res) => {
          this.tooltip1 = res;
        });
        tooltip(this.$refs.search.$el, {
          position: "bottom",
          content: "这是搜索功能",
        }).then((res) => {
          this.tooltip2 = res;
        });
      }
    },
  },
  destroyed() {
    this.tooltip1 && this.tooltip1.$destroy();
    this.tooltip2 && this.tooltip2.$destroy();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
