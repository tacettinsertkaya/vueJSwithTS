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
                <span class="input-group-text">上層選單</span>
              </div>
              <menu-select-input @getResult="getMenuResult"></menu-select-input>
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  頁面-關鍵字 -->
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
                v-model="requestPageAdd.MenuKeyword"
                maxlength="20"
                v-validate="{required:true , regex:/^[0-9a-zA-Z]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  頁面-名稱 -->
              <div class="input-group-prepend">
                <span class="input-group-text">頁面名稱</span>
              </div>
              <input
                id="MenuName"
                :name="'頁面名稱'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestPageAdd.MenuName"
                maxlength="20"
                v-validate="{required:true , regex:/^[0-9a-zA-Z\u4E00-\u9FA5]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  頁面-說明 -->
              <div class="input-group-prepend">
                <span class="input-group-text">頁面說明</span>
              </div>
              <input
                id="Description"
                :name="'頁面說明'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestPageAdd.Description"
                maxlength="20"
                v-validate="{required:true , regex:/^[0-9a-zA-Z\u4E00-\u9FA5]*$/,max:20}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  頁面-順序 -->
              <div class="input-group-prepend">
                <span class="input-group-text">頁面順序</span>
              </div>
              <input
                id="Sequence"
                :name="'頁面順序'"
                type="number"
                class="form-control"
                placeholder
                aria-label
                v-model="requestPageAdd.Sequence"
                maxlength="3"
                v-validate="{required:true , regex:/^[0-9]*$/,max:3}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  頁面-順序 -->
              <div class="input-group-prepend">
                <span class="input-group-text">頁面Url</span>
              </div>
              <input
                id="MenuUrl"
                :name="'頁面Url'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestPageAdd.MenuUrl"
                v-validate="{required:true}"
              />
            </div>
          </div>
        </el-col>
        <el-col>
          <div class="grid-content">
            <div class="input-group mb-3">
              <!--  頁面-註解 -->
              <div class="input-group-prepend">
                <span class="input-group-text">頁面註解</span>
              </div>
              <input
                id="Comment"
                :name="'頁面註解'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="requestPageAdd.Comment"
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
// 頁面-服務
import PageService from '@/service/page'
// 頁面-可搜尋下拉式頁面
import MenuSelectInput from '@/components/menuSelectInput/MenuSelectInput.vue'
// --------------------------------------------------------------------------------------
// 頁面-Model-RequestPageAdd
import { RequestPageAdd } from '@/views/page/model/PageModel'
// --------------------------------------------------------------------------------------

@Component({
  components: {
    MenuSelectInput
  },
  $_veeValidate: { validator: 'new' }
})
export default class PageAdd extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any

  isOpen = false
  requestPageAdd = new RequestPageAdd({
    ParentMenuID: -1,
    MenuType: 2,
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
  }
  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  getMenuResult(param: any) {
    this.requestPageAdd.ParentMenuID = param[0]
  }
  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      PageService.add(this.requestPageAdd)
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
          console.log('編輯頁面發生例外', error)
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
