<template>
  <div class="container">
    <el-menu
      class="menu"
      default-active="2"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="select"
    >
      <el-menu-item index="./content1" ref="content1">
        <i class="el-icon-menu"></i>
        <span slot="title">内容一</span>
      </el-menu-item>
      <el-menu-item index="./content2" ref="content2">
        <i class="el-icon-menu"></i>
        <span slot="title">内容二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    <router-view class="content" />
  </div>
</template>

<script>
import { tooltipBlock } from "../../components/tooltip/index.js";
import dialog from "../../components/dialog/index.js";
export default {
  mounted() {
    dialog({ content: "你是个新手" });
    tooltipBlock(this.$refs.content2.$el, "内容一");
  },
  methods: {
    select(index) {
      this.$router.push({ path: index, query: { first: true } });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  height: 100%;
  .menu {
    height: 100%;
    font-size: 20px;
  }
  .content {
    flex: 1;
  }
}
</style>
