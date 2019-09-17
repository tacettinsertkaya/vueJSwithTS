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
            <!--  父帳號 -->
            <div class="input-group-prepend">
              <span class="input-group-text">父帳號(可空白)</span>
            </div>
            <input
              id="ParentAccount"
              :name="'父帳號'"
              type="text"
              class="form-control"
              placeholder
              aria-label
              v-model="requestUserAdd.ParentAccount"
              v-validate="{required:false,regex:/^[0-9a-zA-Z ]*$/,max:32}"
            />
          </div>
        </div>
      </el-col>
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
              v-model="requestUserAdd.Account"
              v-validate="{required:true,regex:/^[0-9a-zA-Z]*$/,max:32,min:3}"
            />
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  密碼 -->
            <div class="input-group-prepend">
              <span class="input-group-text">密碼</span>
            </div>
            <input
              id="Password"
              :name="'密碼'"
              type="text"
              class="form-control"
              placeholder
              aria-label
              v-model="requestUserAdd.Password"
              v-validate="{required:true,regex:/^[0-9a-zA-Z]*$/,max:128,min:6}"
            />
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  角色 -->
            <div class="input-group-prepend">
              <span class="input-group-text">角色</span>
            </div>
            <role-select-input @getResult="getRole"></role-select-input>
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
              v-model="requestUserAdd.Name"
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
              v-model="requestUserAdd.Approve"
              filterable
              placeholder="請選擇"
            >
              <el-option
                :value="false"
                :label="'未認證'"
              ></el-option>
              <el-option
                :value="true"
                :label="'已認證'"
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
              v-model="requestUserAdd.Comment"
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
import { RequestUserAdd } from '@/views/user/model/UserModel'
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
  requestUserAdd = new RequestUserAdd({
    ParentAccount: '',
    Account: '',
    Password: '',
    RoleID: 0,
    Name: '',
    Approve: false,
    Comment: '',
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

  getRole(param) {
    this.requestUserAdd.RoleID = param[0]
  }

  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      console.log(this.requestUserAdd)

      UserService.add(this.requestUserAdd)
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
          console.log('新增使用者發生例外', error)
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
