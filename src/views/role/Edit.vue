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
      <el-row :gutter="20">

        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  角色-代碼 -->
              <div class="input-group-prepend">
                <span class="input-group-text">角色代碼</span>
              </div>
              <input
                id="RoleCode"
                :name="'角色代碼'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestRoleEdit.RoleCode"
                maxlength="20"
                v-validate="{required:true , regex:/^[0-9a-zA-Z\u4E00-\u9FA5]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  角色-名稱 -->
              <div class="input-group-prepend">
                <span class="input-group-text">角色名稱</span>
              </div>
              <input
                id="RoleName"
                :name="'角色名稱'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestRoleEdit.RoleName"
                v-validate="{required:false , regex:/^[\u4E00-\u9FA5 ]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  角色-狀態 -->
              <div class="input-group-prepend">
                <span class="input-group-text">角色狀態</span>
              </div>
              <el-select
                v-model="requestRoleEdit.Status"
                filterable
                placeholder="請選擇"
                @clear="clearChange"
                clearable
              >
                <el-option
                  :value="false"
                  :label="'停用'"
                ></el-option>
                <el-option
                  :value="true"
                  :label="'啟用'"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  角色-說明 -->
              <div class="input-group-prepend">
                <span class="input-group-text">角色說明</span>
              </div>
              <input
                id="MenuUrl"
                :name="'角色說明'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestRoleEdit.Description"
                v-validate="{required:true,regex:/^[0-9a-zA-Z\u4E00-\u9FA5 ]*$/,max:50}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  角色-註解 -->
              <div class="input-group-prepend">
                <span class="input-group-text">角色註解</span>
              </div>
              <input
                id="Comment"
                :name="'角色註解'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestRoleEdit.Comment"
                maxlength="50"
                v-validate="{required:true , regex:/^[0-9a-zA-Z\u4E00-\u9FA5 ]*$/,max:50}"
              />
            </div>
          </div>
        </el-col>
      </el-row>
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
// Nick Create.
// Date 2019/08/16
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
// 角色-服務
import RoleService from '@/service/role'

// --------------------------------------------------------------------------------------
// 角色-Model-RequestRoleEdit
import {
  RequestRoleGet,
  RequestRoleEdit,
  ResponseRoleGet
} from '@/views/role/model/RoleModel'
// 共用模組
import { Result } from '@/models/SharedModel'
// --------------------------------------------------------------------------------------

@Component({
  $_veeValidate: { validator: 'new' }
})
export default class RoleEdit extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any

  isOpen = false
  requestRoleEdit = new RequestRoleEdit({
    RoleID: -1,
    RoleCode: '',
    Status: true,
    RoleName: '',
    Description: '',
    Comment: '',
    ExecutorUser: this.$store.getters['identity'].Account
  })

  mounted() {
    this.isOpen = this.showDialog
    this.requestRoleEdit.RoleID = this.itemObject.RoleID
    this.requestRoleEdit.RoleCode = this.itemObject.RoleCode
    this.dataBind()
  }
  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  dataBind() {
    RoleService.get(
      new RequestRoleGet({
        RoleID: this.requestRoleEdit.RoleID,
        RoleCode: this.requestRoleEdit.RoleCode,
        ExecutorUser: this.$store.getters['identity'].Account
      })
    )
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<ResponseRoleGet>(response.data)
          let executorUser = this.$store.getters['identity'].Account
          // 將自身(右邊)可列舉的屬性複製到目標(左邊)物件
          Object.assign(this.requestRoleEdit, result.Data)

          this.requestRoleEdit.ExecutorUser = executorUser // 操作者
        }
      })
      .catch((error: any) => {
        console.log('選單編輯發生例外', error)
      })
  }
  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      RoleService.edit(this.requestRoleEdit)
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
          console.log('編輯角色發生例外', error)
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

  clearChange(this: any, value: any) {
    this.requestRoleEdit.Status = -1
  }
}
</script>
<style lang="scss" scoped>
</style>
