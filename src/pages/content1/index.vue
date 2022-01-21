<template>
  <div class="container">
      <el-button style="height:30px" ref='preview'>预览</el-button>
      <el-button style="height:30px" ref='search'>搜索</el-button>
  </div>
</template>

<script>
import {tooltip } from '../../components/tooltip/index.js'
export default {
    mounted(){
        if(this.$route.query.first){
        tooltip(this.$refs.preview.$el,{position: 'bottom',content:'这是预览功能'})
         tooltip(this.$refs.search.$el,{position: 'bottom',content:'这是搜索功能'})
        }
        
    },
}
</script>

<style lang='scss' scoped>
.container{
    display:flex;
    width: 100%;
    justify-content:space-around
}

</style>