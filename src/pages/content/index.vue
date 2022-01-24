<template>
  <div class="container">
    <el-button style="height: 30px" ref="upload">上传</el-button>
    <el-button style="height: 30px" ref="download">下载</el-button>
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
  mounted(){
    this.$nextTick(()=>{
      this.showTooltip()
    })
  },
  methods: {
    showTooltip() {
      if (this.$route.query.first) {
        tooltip(this.$refs.upload.$el, {
          position: "bottom",
          content: "这是上传功能",
        }).then((vm) => {
          this.tooltip1 = vm;
        });
        tooltip(this.$refs.download.$el, {
          position: "bottom",
          content: "这是下载功能",
        }).then((vm) => {
          this.tooltip2 = vm;
        });
      }
    },
  },
  watch: {
    $route(val) {
      console.log(val.query);
    },
  },
  destroyed() {
    this.tooltip1 && this.tooltip1.$destroy();
    this.tooltip2 &&this.tooltip2.$destroy();
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
