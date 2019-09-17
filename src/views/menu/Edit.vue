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
              <!--  選單-下拉式選單 -->
              <div class="input-group-prepend">
                <span class="input-group-text">選單</span>
              </div>
              <menu-select-input
                ref="RefMenuSelect"
                @getResult="getMenuResult"
                :disabled="true"
                :defaultValue="itemObject.MenuID"
              ></menu-select-input>
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  選單-關鍵字 -->
              <div class="input-group-prepend">
                <span class="input-group-text">關鍵字</span>
              </div>
              <input
                id="MenuKeyword"
                :name="'關鍵字'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestMenuEdit.MenuKeyword"
                maxlength="20"
                v-validate="{required:true , regex:/^[0-9a-zA-Z]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  選單-名稱 -->
              <div class="input-group-prepend">
                <span class="input-group-text">選單名稱</span>
              </div>
              <input
                id="MenuName"
                :name="'選單名稱'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestMenuEdit.MenuName"
                maxlength="20"
                v-validate="{required:true , regex:/^[0-9a-zA-Z\u4E00-\u9FA5]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  選單-說明 -->
              <div class="input-group-prepend">
                <span class="input-group-text">選單說明</span>
              </div>
              <input
                id="Description"
                :name="'選單說明'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestMenuEdit.Description"
                maxlength="20"
                v-validate="{required:true , regex:/^[0-9a-zA-Z\u4E00-\u9FA5]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  選單-順序 -->
              <div class="input-group-prepend">
                <span class="input-group-text">選單順序</span>
              </div>
              <input
                id="Sequence"
                :name="'選單順序'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestMenuEdit.Sequence"
                maxlength="3"
                v-validate="{required:true , regex:/^[0-9]*$/,max:3}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  選單-註解 -->
              <div class="input-group-prepend">
                <span class="input-group-text">選單註解</span>
              </div>
              <input
                id="Comment"
                :name="'選單註解'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestMenuEdit.Comment"
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
// Date 2019/08/09
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
// 選單-服務
import MenuService from '@/service/menu'
// 選單-可搜尋下拉式選單
import MenuSelectInput from '@/components/menuSelectInput/MenuSelectInput.vue'
// --------------------------------------------------------------------------------------
import {
  RequestMenuGet,
  RequestMenuEdit,
  ResponseMenuGet
} from '@/views/menu/model/MenuModel'

// 共用模組
import { Result } from '@/models/SharedModel'

// --------------------------------------------------------------------------------------
@Component({
  components: {
    MenuSelectInput
  }
})
export default class MenuEdit extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any
  isOpen = false
  requestMenuGet = new RequestMenuGet({
    MenuID: -1,
    MenuKeyword: '',
    ExecutorUser: this.$store.getters['identity'].Account
  })
  requestMenuEdit = new RequestMenuEdit({
    MenuID: -1,
    MenuType: 1,
    MenuKeyword: '',
    MenuUrl: '',
    MenuName: '',
    Description: '',
    Sequence: 0,
    Comment: '',
    ExecutorUser: this.$store.getters['identity'].Account
  })
  mounted() {
    this.isOpen = this.showDialog
    this.requestMenuGet.MenuID = this.itemObject.MenuID
    this.requestMenuGet.MenuKeyword = this.itemObject.MenuKeyword
    this.requestMenuGet.ExecutorUser = this.$store.getters['identity'].Account
    this.dataBind()
  }
  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  getMenuResult(param: any) {}
  async submit(this: any): Promise<void> {
    let allOK = this.$validator.validateAll()
    if (allOK) {
      MenuService.edit(this.requestMenuEdit)
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
          console.log('編輯選單發生例外', error)
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
  dataBind() {
    MenuService.get({
      MenuID: this.requestMenuGet.MenuID,
      MenuKeyword: this.requestMenuGet.MenuKeyword,
      ExecutorUser: this.requestMenuGet.ExecutorUser
    })
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<ResponseMenuGet>(response.data)
          let executorUser = this.$store.getters['identity'].Account
          // 將自身(右邊)可列舉的屬性複製到目標(左邊)物件
          Object.assign(this.requestMenuEdit, result.Data)
          this.requestMenuEdit.ExecutorUser = executorUser // 操作者
        }
      })
      .catch((error: any) => {
        console.log('選單編輯發生例外', error)
      })
  }
}
</script>
<style lang="scss" scoped>
</style>
