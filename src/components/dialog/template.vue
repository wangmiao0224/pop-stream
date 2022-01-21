<template>
  <div>
    <el-dialog
      title="公告"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>{{ content }}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="cancel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    _next: null,
    content: null,
  },
  data() {
    return {
      dialogVisible: true,
    };
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
      this._next();
    },
  },
};
</script>

<style></style>
