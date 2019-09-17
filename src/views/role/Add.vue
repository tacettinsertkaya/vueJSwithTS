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
              <!--  角色-識別碼區間 -->
              <div class="input-group-prepend">
                <span class="input-group-text">角色識別碼區間</span>
              </div>
              <el-select
                v-model="RoleIDRange"
                filterable
                placeholder="請選擇"
              >
                <el-option
                  :value="1"
                  :label="'1-10'"
                ></el-option>
                <el-option
                  :value="2"
                  :label="'10-20'"
                ></el-option>
                <el-option
                  :value="3"
                  :label="'20-30'"
                ></el-option>
                <el-option
                  :value="4"
                  :label="'30-40'"
                ></el-option>
                <el-option
                  :value="5"
                  :label="'40-100'"
                ></el-option>
                <el-option
                  :value="6"
                  :label="'100-255'"
                ></el-option>
              </el-select>

            </div>
          </div>
        </el-col>

        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  角色-識別碼 -->
              <div class="input-group-prepend">
                <span class="input-group-text">角色識別碼</span>
              </div>
              <input
                id="RoleID"
                :name="'角色識別碼'"
                type="number"
                class="form-control"
                placeholder
                aria-label
                v-model="requestRoleAdd.RoleID"
                min="1"
                max="255"
                v-validate="{required:true , regex:/^[0-9]*$/,max:3}"
              >

            </div>
            <label
              v-show="errors.has('角色識別碼')"
              for="角色識別碼"
            >
              <span style="color:red">{{errors.first('角色識別碼')}}</span>
            </label>

          </div>
        </el-col>

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
                v-model="requestRoleAdd.RoleCode"
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
                v-model="requestRoleAdd.RoleName"
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
                v-model="requestRoleAdd.Status"
                filterable
                placeholder="請選擇"
                @change="selectChange"
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
                v-model="requestRoleAdd.Description"
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
                v-model="requestRoleAdd.Comment"
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
// 角色-Model-RequestRoleAdd
import { RequestRoleAdd } from '@/views/role/model/RoleModel'
// --------------------------------------------------------------------------------------

@Component({
  $_veeValidate: { validator: 'new' }
})
export default class RoleAdd extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any
  RoleIDRange = 1 // 1 : 1-10 ,2 : 10-20, 3 : 20 -30, 4 : 30-40, 5 : 40-100, 6 : 100-255
  isOpen = false
  requestRoleAdd = new RequestRoleAdd({
    RoleID: 1,
    RoleCode: '',
    Status: true,
    RoleName: '',
    Description: '',
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
  checkRoleID() {
    let RoleID = this.requestRoleAdd.RoleID

    switch (this.RoleIDRange) {
      case 1: // 1-10
        if (RoleID > 1 && RoleID < 10) {
          return true
        }
        break
      case 2: // 10-20
        if (RoleID > 10 && RoleID < 20) {
          return true
        }
        break
      case 3: // 20-30
        if (RoleID > 20 && RoleID < 30) {
          return true
        }
        break
      case 4: // 30-40
        if (RoleID > 30 && RoleID < 40) {
          return true
        }
        break
      case 5: // 40-100
        if (RoleID > 40 && RoleID < 100) {
          return true
        }
        break
      case 6: // 100-255
        if (RoleID > 100 && RoleID < 255) {
          return true
        }
        break
      default:
        return false
    }

    return false
  }
  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      // 檢查Range是否通過

      let isRoleIDOK = this.checkRoleID()
      console.log(isRoleIDOK)
      if (!isRoleIDOK) {
        this.$message.error({
          message: Object.is(this.$store.getters['identity'].locale, 'en')
            ? 'RoleID is Over Range'
            : '角色識別碼超過數字範圍'
        })
        return
      }

      RoleService.add(this.requestRoleAdd)
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
  selectChange(this: any, value: number) {
    this.requestRoleAdd.Status = value
  }
  clearChange(this: any, value: number) {
    this.requestRoleAdd.Status = -1
  }
}
</script>
<style lang="scss" scoped>
</style>
