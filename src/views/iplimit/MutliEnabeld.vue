<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isOpen"
      :before-close="close"
      center
    >
      <div class="row">
        <div class="col-md-12">
          <!-- 备注 -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">{{ $t('Iplimit.memo' )}}</span>
            </div>
            <textarea
              id="memo"
              :name="$t('Iplimit.memo' )"
              class="form-control"
              v-model="forms.Memo"
              cols="100"
              rows="5"
              maxlength="100"
              v-validate="{required:true,max:100}"
            ></textarea>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >{{$t('Shared.submit')}}</el-button>
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
import IpLimitService from '@/service/iplimit'

@Component({
  name: 'IplimitMutliEnabeld'
})
export default class MutliEnabeld extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ type: String, default: '', required: false }) title!: string
  @Prop({ type: String, default: '', required: false }) dialogName!: string
  @Prop({ type: Boolean, default: false, required: false }) showDialog!: boolean
  @Prop({ type: Object, default: null, required: false }) itemObject: any
  @Prop({ type: Number, default: 0, required: false }) Status!: number

  isOpen = false
  forms = {
    Memo: ''
  }
  mounted(this: any) {
    this.isOpen = this.showDialog
  }
  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  @Emit('closeDialog')
  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()

    if (allOK) {
      this.setloading(true)
      let newArray: any = []
      for (var i = 0; i < this.itemObject.length; i++) {
        newArray.push({
          IP: this.itemObject[i].IP,
          Memo: this.forms.Memo,
          IsValid: this.Status
        })
      }
      IpLimitService.enableOrDisableAsync(newArray).then(response => {
        this.sharedResponse(response, {
          useErrorCodeMsg: true,
          callback: () => {
            this.isOpen = false
            this.setloading(false)
            return [this.dialogName]
          }
        })
      })
    } else {
      let message = ''
      this.$validator.errors.items.forEach((item: any) => {
        message += item.msg + '<br />'
      })
      this.$message.error({
        dangerouslyUseHTMLString: true,
        message: message
      })
    }
  }
}
</script>
<style scoped>
</style>
