<template>
  <section class="tooltip">
    {{content || '我是新手教程'}}
    <div class="close" @click="close">X</div>
  </section>
</template>

<script>
export default {
  props: {
    dom: {
      type: Document,
      default: null,
    },
    resolveCB: null,
    _next:{
      type:Function,
      default: ()=>{}
    },
    content:null
  },
  methods: {
    close() {
      this.resolveCB();
      this._next();
    },
  },
};
</script>

<style scoped lang="scss">
.tooltip {
  font-size: 10px;
  width: 100px;
  height: 50px;
  background: rgba($color: #28b7e2, $alpha: 0.7);
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(30%, -30%) scale(0.5);
    background: #eee;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    cursor: pointer;
  }
}
</style>
