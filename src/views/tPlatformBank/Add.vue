<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isOpen"
      width="40%"
      :before-close="close"
      center
      :close-on-click-modal="false"
    >
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  三方平台識別碼 -->
            <div class="input-group-prepend">
              <span class="input-group-text">三方平台識別碼</span>
            </div>
            <t-platform-select-input @getResult="getTPlatform"></t-platform-select-input>
          </div>
        </div>
      </el-col>

      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  銀行識別碼 -->
            <div class="input-group-prepend">
              <span class="input-group-text">銀行識別碼</span>
            </div>
            <bank-select-input @getResult="getBank"></bank-select-input>
          </div>
        </div>
      </el-col>

      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  三方支付銀行代碼 -->
            <div class="input-group-prepend">
              <span class="input-group-text">三方支付銀行代碼</span>
            </div>
            <input
              id="ThirdPartyBankCode"
              :name="'三方支付銀行代碼'"
              type="text"
              class="form-control"
              placeholder
              aria-label
              v-model="requestTPlatformBankAdd.ThirdPartyBankCode"
              v-validate="{required:true,regex:/^[0-9a-zA-Z]*$/,max:32}"
            />
          </div>
        </div>
      </el-col>

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
import TPlatformBankService from '@/service/tPlatformBank'

import { RequestTPlatformBankAdd } from '@/views/tPlatformBank/model/TPlatformBankModel'
// 三方平台銀行下拉式選單
import TPlatformSelectInput from '@/components/tPlatformSelectInput/TPlatformSelectInput.vue'
// 銀行下拉式選單
import BankSelectInput from '@/components/bankSelectInput/BankSelectInput.vue'
@Component({
  $_veeValidate: { validator: 'new' },
  components: {
    TPlatformSelectInput,
    BankSelectInput
  }
})
export default class TPlatformBankAdd extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any

  isOpen = false
  requestTPlatformBankAdd = new RequestTPlatformBankAdd({
    TPlatformID: -1,
    BankID: -1,
    ThirdPartyBankCode: '',
    ExecutorUser: this.$store.getters['identity'].Account
  })
  mounted() {
    this.isOpen = this.showDialog
  }

  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }

  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      if (Object.is(this.requestTPlatformBankAdd.TPlatformID, -1)) {
        this.$message.error({
          message: '請選擇三方平台銀行'
        })
        return
      }
      if (Object.is(this.requestTPlatformBankAdd.BankID, -1)) {
        this.$message.error({
          message: '請選擇銀行'
        })
        return
      }
      TPlatformBankService.add(this.requestTPlatformBankAdd)
        .then((response: any) => {
          this.sharedResponse(response, {
            useBack: false,
            useErrorCodeMsg: true,
            callback: () => {
              this.isOpen = false
              this.$emit('closeDialog', [this.dialogName])
            }
          })
          if (!response.data.Success) {
            this.setloading(false)
          }
        })
        .catch((error: any) => {
          console.log('新增三方平台銀行發生例外', error)
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
  getTPlatform(param) {
    this.requestTPlatformBankAdd.TPlatformID = param[0]
  }
  getBank(param) {
    this.requestTPlatformBankAdd.BankID = param[0]
  }
}
</script>
<style lang="scss" scoped>
</style>
