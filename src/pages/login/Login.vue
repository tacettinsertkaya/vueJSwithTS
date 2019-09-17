<template>
  <div
    class="app flex-row align-items-center bglogo"
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <el-container>
            <el-row>
              <el-row
                type="flex"
                class="row-bg"
              >
                <el-col :span="12">
                  <img
                    class="navbar-brand-full"
                    src="../../assets/img/brand/LOGO_cnlogin.png"
                    alt="CoreUI Logo"
                    v-if="$store.getters['locale'] !== 'en'"
                  />
                  <img
                    class="navbar-brand-full"
                    src="../../assets/img/brand/LOGO_enlogin.png"
                    alt="CoreUI Logo"
                    v-else
                  />
                </el-col>
              </el-row>

              <el-main>
                <el-row>
                  <el-col>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="icon-settings"></i>
                        </span>
                      </div>
                      <el-select
                        style="width:150px;"
                        v-model="locale"
                      >
                        <el-option
                          :label="'English'"
                          :value="'en'"
                        >
                          <img src="../../assets/img/flag/en.png" />
                          <span style="float: right;">English</span>
                        </el-option>
                        <el-option
                          :label="'简中'"
                          :value="'zh-CN'"
                        >
                          <img src="../../assets/img/flag/cn.png" />
                          <span style="float: right;">简中</span>
                        </el-option>
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="icon-user"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        data-vv-name="Shared.username"
                        placeholder="Username"
                        v-model="forms.Username"
                        @keyup.enter="validate"
                      />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="icon-lock"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        class="form-control"
                        data-vv-name="Shared.password"
                        placeholder="Password"
                        v-model="forms.Password"
                        @keyup.enter="validate"
                      />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-button
                      style="float:left"
                      type="primary"
                      @click="validate"
                    >{{ $t('Shared.login') }}</el-button>
                    <el-button
                      style="float:right"
                      type="info"
                      icon="el-icon-question"
                      @click="forgetPwd"
                    >忘记密码</el-button>
                  </el-col>
                </el-row>
              </el-main>
            </el-row>
          </el-container>
          <div id="jumpPage">
            <q-r-code-view
              v-on:closeDialog="closeDialog"
              v-if="dialog.qrcode.show"
              :showDialog="dialog.qrcode.show"
              :title="dialog.qrcode.title"
              :dialogName="dialog.qrcode.name"
              :itemObject="dialog.qrcode.itemObject"
            ></q-r-code-view>
          </div>
        </div>
      </div>
    </div>
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
import AuthenticateService from '@/service/authenticate'
import QRCodeView from '@/pages/login/QRCodeView.vue'
import { Validator } from 'vee-validate'
@Component({
  components: { QRCodeView }
})
export default class Login extends Vue {
  private isLoading = false
  private dialog = {
    qrcode: {
      name: 'qrcode',
      title: 'QRCode',
      show: false,
      itemObject: null
    }
  }
  private qrCodeUrl = ''
  private locale = this.$store.getters['locale']
  private forms = {
    Username: process.env.VUE_APP_USERNAME,
    Password: process.env.VUE_APP_PASSWORD
  }
  @Watch('locale')
  localeChange(this: any, data: string) {
    let validate = new Validator()
    // 設定語系變數
    this.$store.dispatch('setLocale', this.locale)
    // 設定全域語系
    this.$i18n.locale = this.$store.getters['locale']
    // 設定驗證語系
    validate.locale = this.$store.getters['locale'].replace('-', '_')
  }

  openDialog(entry: any, action: string) {
    if (action === 'qrcode') {
      this.dialog.qrcode.show = true
      this.dialog.qrcode.itemObject = entry
    }
  }
  closeDialog(param: any) {
    let name = param.dialogName
    if (name === 'qrcode') {
      this.dialog.qrcode.show = false
      if (param.memberInfo) {
        let data = param.memberInfo
        this.$router.push({
          name: 'validateView',
          params: {
            Username: data.Username,
            Password: data.Password
          }
        })
      }
    }
  }
  forgetPwd() {
    this.$message('请洽询相关人员')
  }
  validate(this: any) {
    this.setloading(true)

    AuthenticateService.firstLoginAccountAsync(this.forms).then(res => {
      if (res.data.Success) {
        // 不是第一次登入
        if (res.data.Data.Approve) {
          this.$router.push({
            name: 'validateView',
            params: {
              Username: this.forms.Username,
              Password: this.forms.Password
            }
          })
        } else {
          // 是第一次登入
          this.openDialog(
            {
              Username: this.forms.Username,
              Password: this.forms.Password,
              Url: res.data.Data.QRCodeUrl
            },
            'qrcode'
          )
        }
      } else {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: res.data.Message
        })
      }

      // this.$router.push({ path: '/' })
    })

    this.setloading(false)
  }
}
</script>
<style lang="scss" scoped>
.bglogo {
  background: url('../../assets/img/bg.jpg');
}
.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.download {
  max-width: 100%;
}

#qrCode {
  text-align: center;

  img {
    max-width: 100%;
  }
}
.el-row {
  width: 100%;
}
.el-header {
  text-align: center;
}
.el-row {
  margin-bottom: 10px;
}
.el-main {
  background-color: #ffffff;
  border: 1px solid #efefef;
  color: #333;
  text-align: center;
  padding: 5% 5%;
}
</style>
