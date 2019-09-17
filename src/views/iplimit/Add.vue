<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isOpen"
      width="30%"
      :before-close="close"
      center
    >
      <div class="row">
        <div class="col-md-12">
          <!-- IP -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">{{ $t('Iplimit.ip' )}}</span>
            </div>
            <input
              type="text"
              :name="$t('Iplimit.ip' )"
              class="form-control"
              placeholder
              aria-label
              v-model="forms.IP"
              maxlength="40"
              v-validate="{required:true,max:40,regex:/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/}"
            >
          </div>
          <!-- 备注 -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">{{ $t('Iplimit.memo' )}}</span>
            </div>
            <textarea
              class="form-control"
              :name="$t('Iplimit.memo' )"
              v-model="forms.Memo"
              cols="100"
              rows="5"
              maxlength="100"
              v-validate="{required:true,max:100}"
            ></textarea>
          </div>
          <!-- 是否启用/停用 -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">{{'是否' + $t('Shared.enabled')}}</span>
            </div>
            <select
              class="form-control"
              v-model="forms.IsValid"
            >
              <option value="1">{{$t('Shared.enabled')}}</option>
              <option value="0">{{$t('Shared.disabled')}}</option>
            </select>
          </div>
          <!-- 使用限制时间 -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">{{ $t('Iplimit.expiredTime' )}}</span>
            </div>
            <el-date-picker
              v-model="forms.ExpiredTime"
              type="datetime"
              placeholder="选择到期时间"
              default-time="00:00:00"
            ></el-date-picker>
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
// IP白名单服务
import IpLimitService from '@/service/iplimit'
import moment from 'moment'

@Component({
  name: 'iplimitAdd'
})
export default class IpLimitAdd extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ type: String, default: '', required: false }) title!: string
  @Prop({ type: String, default: '', required: false }) dialogName!: string
  @Prop({ type: Boolean, default: false, required: false }) showDialog!: boolean
  isOpen = false
  forms = {
    IP: '',
    Memo: '',
    IsValid: 1,
    ExpiredTime: null
  }

  mounted() {
    this.isOpen = this.showDialog
  }
  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  @Emit('closeDialog')
  async submit(this: any): Promise<void> {
    let allOK = this.$validator.validateAll()

    if (allOK) {
      if (this.forms.ExpiredTime === null) {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: this.$t('Iplimit.expiredTime') + '必填'
        })
        return
      }
      this.forms.ExpiredTime = moment(this.forms.ExpiredTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      if (!this.isDateTime(this.forms.ExpiredTime)) {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: this.$t('Iplimit.expiredTime') + '格式错误'
        })
        return
      }
      IpLimitService.add(this.forms)
        .then(response => {
          this.sharedResponse(response, {
            useBack: false,
            useErrorCodeMsg: true,
            callback: () => {
              this.isOpen = false
              return [this.dialogName]
            }
          })
        })
        .finally(() => {})
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

<style lang="scss" type="text/scss" scoped>
</style>
