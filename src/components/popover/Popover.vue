<template>
  <el-popover placement="top" width="160" v-model="visible2">
    <p>{{msg}}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible2 = false">{{$t('Shared.cancel')}}</el-button>
      <el-button type="primary" size="mini" @click.prevent="del">{{$t('Shared.submit')}}</el-button>
    </div>
    <el-button
      slot="reference"
      :type="type"
      :shape="shape"
      :size="size"
      :disabled="isdisabled"
    >{{$t('Shared.delete')}}</el-button>
  </el-popover>
</template>

<script>
export default {
  props: {
    // 类型
    type: {
      type: String,
      default: '',
      required: false
    },
    // 形状
    shape: {
      type: String,
      default: '',
      required: false
    },
    // 讯息
    msg: {
      type: String,
      default: '',
      required: false
    },
    size: {
      type: String,
      default: 'small',
      required: false
    },
    itemObject: {
      type: String,
      default: '',
      required: false
    },
    isdisabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      visible2: false
    }
  },
  mounted() {},
  methods: {
    del() {
      this.$emit('BtnEvents', [])
      this.visible2 = false
    }
  }
}
</script>

<style scoped>
</style>
