<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isOpen"
      width="20%"
      :before-close="close"
      center
      :close-on-click-modal="false"
    >
      <img
        :src="url"
        width="100%"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="close">{{$t('Shared.close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop,
  PropSync,
  Provide,
  Model,
  Inject,
  Emit
} from 'vue-property-decorator'

@Component
export default class QRCodeView extends Vue {
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any

  isOpen = false
  url = ''

  mounted(this: any) {
    this.isOpen = this.showDialog
    this.url = this.itemObject.Url
  }

  @Emit('closeDialog')
  close(this: any) {
    this.isOpen = false
    return {
      dialogName: this.dialogName,
      memberInfo: this.itemObject
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
