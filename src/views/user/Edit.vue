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
            <!--  帳號 -->
            <div class="input-group-prepend">
              <span class="input-group-text">帳號</span>
            </div>
            <input
              id="Account"
              :name="'帳號'"
              type="text"
              class="form-control"
              placeholder
              aria-label
              disabled
              v-model="requestUserEdit.Account"
              v-validate="{required:true,regex:/^[0-9a-zA-Z]*$/,max:32,min:3}"
            />
          </div>
        </div>
      </el-col>

      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  使用者名稱 -->
            <div class="input-group-prepend">
              <span class="input-group-text">使用者名稱</span>
            </div>
            <input
              id="Name"
              :name="'使用者名稱'"
              type="text"
              class="form-control"
              placeholder
              aria-label
              v-model="requestUserEdit.Name"
              v-validate="{required:true,regex:/^[0-9a-zA-Z\u4E00-\u9FA5 ]*$/,max:50}"
            />
          </div>
        </div>
      </el-col>

      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  認證狀態 -->
            <div class="input-group-prepend">
              <span class="input-group-text">認證狀態</span>
            </div>
            <el-select
              v-model="requestUserEdit.Status"
              filterable
              placeholder="請選擇"
            >
              <el-option
                :value="0"
                :label="'停用'"
              ></el-option>
              <el-option
                :value="1"
                :label="'啟用'"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  註解 -->
            <div class="input-group-prepend">
              <span class="input-group-text">註解</span>
            </div>
            <textarea
              class="form-control"
              :name="'註解'"
              v-model="requestUserEdit.Comment"
              cols="100"
              rows="5"
              maxlength="200"
              v-validate="{required:true,max:200}"
            ></textarea>
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
import UserService from '@/service/user'
import RoleSelectInput from '@/components/roleSelectInput/RoleSelectInput.vue'
import {
  RequestUserEdit,
  RequestUserGet,
  ResponseUserGet
} from '@/views/user/model/UserModel'
// 共用模組
import { Result } from '@/models/SharedModel'
@Component({
  $_veeValidate: { validator: 'new' },
  components: {
    RoleSelectInput
  }
})
export default class UserAdd extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any

  isOpen = false
  requestUserGet = new RequestUserGet({
    Account: '',
    UserID: null,
    ExecutorUser: this.$store.getters['identity'].Account
  })
  requestUserEdit = new RequestUserEdit({
    Account: '',
    Name: '',
    Status: 0,
    Comment: '',
    ExecutorUser: this.$store.getters['identity'].Account
  })
  mounted() {
    this.isOpen = this.showDialog
    console.log(this.itemObject)
    this.requestUserGet.Account = this.itemObject.Account
    this.requestUserGet.UserID = this.itemObject.UserID
    this.dataBind()
  }

  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  dataBind() {
    UserService.get(this.requestUserGet)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<ResponseUserGet>(response.data)
          let executorUser = this.$store.getters['identity'].Account
          // 將自身(右邊)可列舉的屬性複製到目標(左邊)物件
          Object.assign(this.requestUserEdit, result.Data)
          this.requestUserEdit.ExecutorUser = executorUser // 操作者
          console.log(result.Data)
        }
      })
      .catch((error: any) => {
        console.log('取得使用者單筆發生例外', error)
      })
  }
  getRole(param) {}

  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      UserService.edit(this.requestUserEdit)
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
          console.log('編輯使用者發生例外', error)
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
<style lang="scss" scoped>
</style>
