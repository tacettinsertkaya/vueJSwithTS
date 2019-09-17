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
            <t-platform-select-input
              :defaultValue="requestTPlatformBankEdit.TPlatformID"
              @getResult="getTPlatform"
            ></t-platform-select-input>
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
            <bank-select-input
              :defaultValue="requestTPlatformBankEdit.BankID"
              @getResult="getBank"
            ></bank-select-input>
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
              v-model="requestTPlatformBankEdit.ThirdPartyBankCode"
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

import {
  RequestTPlatformBankEdit,
  RequestTPlatformBankGet,
  ResponseTPlatformBankGet
} from '@/views/tPlatformBank/model/TPlatformBankModel'
// 三方平台銀行下拉式選單
import TPlatformSelectInput from '@/components/tPlatformSelectInput/TPlatformSelectInput.vue'
// 銀行下拉式選單
import BankSelectInput from '@/components/bankSelectInput/BankSelectInput.vue'
import { Result } from '@/models/SharedModel'
@Component({
  $_veeValidate: { validator: 'new' },
  components: {
    TPlatformSelectInput,
    BankSelectInput
  }
})
export default class TPlatformBankEdit extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any

  isOpen = false
  requestTPlatformBankGet = new RequestTPlatformBankGet({
    TPlatformID: -1,
    BankID: -1,
    ThirdPartyBankCode: '',
    ExecutorUser: this.$store.getters['identity'].Account
  })
  requestTPlatformBankEdit = new RequestTPlatformBankEdit({
    TPlatformID: -1,
    BankID: -1,
    ThirdPartyBankCode: '',
    ExecutorUser: this.$store.getters['identity'].Account
  })
  mounted() {
    this.isOpen = this.showDialog
    console.log(this.itemObject)
    this.requestTPlatformBankGet.TPlatformID = this.itemObject.TPlatformID
    this.requestTPlatformBankGet.BankID = this.itemObject.BankID
    this.requestTPlatformBankGet.ThirdPartyBankCode = this.itemObject.ThirdPartyBankCode
    this.dataBind()
  }

  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  dataBind() {
    TPlatformBankService.get(this.requestTPlatformBankGet)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<ResponseTPlatformBankGet>(response.data)
          let executorUser = this.$store.getters['identity'].Account
          // 將自身(右邊)可列舉的屬性複製到目標(左邊)物件
          Object.assign(this.requestTPlatformBankEdit, result.Data)
          this.requestTPlatformBankEdit.ExecutorUser = executorUser // 操作者
          console.log(result.Data)
        }
      })
      .catch((error: any) => {
        console.log('取得使用者單筆發生例外', error)
      })
  }
  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      if (Object.is(this.requestTPlatformBankEdit.TPlatformID, -1)) {
        this.$message.error({
          message: '請選擇三方平台銀行'
        })
        return
      }
      if (Object.is(this.requestTPlatformBankEdit.BankID, -1)) {
        this.$message.error({
          message: '請選擇銀行'
        })
        return
      }
      TPlatformBankService.edit(this.requestTPlatformBankEdit)
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
          console.log('編輯三方平台銀行發生例外', error)
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
    this.requestTPlatformBankEdit.TPlatformID = param[0]
  }
  getBank(param) {
    this.requestTPlatformBankEdit.BankID = param[0]
  }
}
</script>
<style lang="scss" scoped>
</style>
