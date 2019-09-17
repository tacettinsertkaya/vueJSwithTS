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
            <input
              id="TPlatformID"
              :name="'三方平台識別碼'"
              type="number"
              class="form-control"
              placeholder
              aria-label
              v-model="requestTPlatformEdit.TPlatformID"
              max="999"
              min="0"
              v-validate="{required:true,regex:/^[1-9][0-9]*$/}"
            />
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  三方平台代碼 -->
            <div class="input-group-prepend">
              <span class="input-group-text">三方平台代碼</span>
            </div>
            <input
              id="TPlatformCode"
              :name="'三方平台代碼'"
              type="text"
              class="form-control"
              placeholder
              aria-label
              v-model="requestTPlatformEdit.TPlatformCode"
              v-validate="{required:true,regex:/^[0-9a-zA-Z]*$/,max:20,min:3}"
            />
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  狀態(0:停用 1:啟用) -->
            <div class="input-group-prepend">
              <span class="input-group-text">狀態</span>
            </div>
            <el-select
              v-model="requestTPlatformEdit.Status"
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
            <!--  三方平台名稱 -->
            <div class="input-group-prepend">
              <span class="input-group-text">三方平台名稱</span>
            </div>
            <input
              id="TPlatformName"
              :name="'三方平台名稱'"
              type="text"
              class="form-control"
              placeholder
              aria-label
              v-model="requestTPlatformEdit.TPlatformName"
              v-validate="{required:true,regex:/^[0-9a-zA-Z\u4E00-\u9FA5 ]*$/,max:20}"
            />
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  三方平台語系名稱 -->
            <div class="input-group-prepend">
              <span class="input-group-text">三方平台語系名稱</span>
            </div>
            <el-col>
              <div class="grid-content">
                <div class="input-group mb-3">
                  <!--  英文 -->
                  <div class="input-group-prepend">
                    <span class="input-group-text">英文</span>
                  </div>
                  <input
                    :name="'英文'"
                    type="text"
                    class="form-control"
                    placeholder
                    aria-label
                    v-model="lagnArray[0].LangValue"
                    v-validate="{required:false,regex:/^[0-9a-zA-Z]*$/,max:20}"
                  />
                </div>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <div class="input-group mb-3">
                  <!--  簡體中文 -->
                  <div class="input-group-prepend">
                    <span class="input-group-text">簡體中文</span>
                  </div>
                  <input
                    :name="'簡體中文'"
                    type="text"
                    class="form-control"
                    placeholder
                    aria-label
                    v-model="lagnArray[1].LangValue"
                    v-validate="{required:false,regex:/^[0-9a-zA-Z\u4E00-\u9FA5 ]*$/,max:20}"
                  />
                </div>
              </div>
            </el-col>
            <el-col>
              <div class="grid-content">
                <div class="input-group mb-3">
                  <!--  繁體中文 -->
                  <div class="input-group-prepend">
                    <span class="input-group-text">繁體中文</span>
                  </div>
                  <input
                    :name="'繁體中文'"
                    type="text"
                    class="form-control"
                    placeholder
                    aria-label
                    v-model="lagnArray[2].LangValue"
                    v-validate="{required:false,regex:/^[0-9a-zA-Z\u4E00-\u9FA5 ]*$/,max:20}"
                  />
                </div>
              </div>
            </el-col>
          </div>
        </div>
      </el-col>
      <el-col>
        <div class="grid-content">
          <div class="input-group mb-3">
            <!--  說明 -->
            <div class="input-group-prepend">
              <span class="input-group-text">說明</span>
            </div>
            <textarea
              class="form-control"
              :name="'說明'"
              v-model="requestTPlatformEdit.Description"
              cols="100"
              rows="5"
              maxlength="200"
              v-validate="{required:false,max:200}"
            ></textarea>
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
              v-model="requestTPlatformEdit.Comment"
              cols="100"
              rows="5"
              maxlength="200"
              v-validate="{required:false,max:200}"
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
import TPlatformService from '@/service/tPlatform'
import { RequestTPlatformEdit } from '@/views/tPlatform/model/TPlatformModel'
import List from '@/models/Shared/List'

@Component({
  $_veeValidate: { validator: 'new' },
  components: {}
})
export default class TPlatformEdit extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any

  isOpen = false
  lagnArray = [
    {
      LangCode: 'en',
      LangValue: ''
    },
    {
      LangCode: 'zh-CN',
      LangValue: ''
    },
    {
      LangCode: 'zh-TW',
      LangValue: ''
    }
  ]
  requestTPlatformEdit = new RequestTPlatformEdit({
    TPlatformID: 0,
    TPlatformCode: '',
    Status: 1,
    TPlatformName: '',
    TPlatformLangNameDate: new List<any>(),
    TPlatformParameters: '',
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
  getTPlatform(param) {
    this.requestTPlatformEdit.TPlatformID = param[0]
  }
  async submit(this: any): Promise<void> {
    let allOK = await this.$validator.validateAll()
    if (allOK) {
      if (Object.is(this.requestTPlatformEdit.TPlatformID, -1)) {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: '請選擇平台代碼'
        })
        return
      }
      // 將語系塞回 TPlatformLangNameDate
      this.requestTPlatformEdit.TPlatformLangNameDate = this.lagnArray

      TPlatformService.edit(this.requestTPlatformEdit)
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
          console.log('編輯三方平台發生例外', error)
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
