<template>
  <div class="container">
    <el-button style="height: 30px" ref="upload">上传</el-button>
    <el-button style="height: 30px" ref="download">下载</el-button>
  </div>
</template>

<script>
import { tooltip } from "../../components/tooltip/index.js";
export default {
  mounted() {
    if (this.$route.query.first) {
      tooltip(this.$refs.upload.$el, {
        position: "bottom",
        content: "这是上传功能",
      });
      tooltip(this.$refs.download.$el, {
        position: "bottom",
        content: "这是下载功能",
      });
    }
  },
  watch:{
      $route(val){
          console.log(val.query);
      }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
