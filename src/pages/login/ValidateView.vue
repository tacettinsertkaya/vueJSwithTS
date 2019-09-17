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
              <el-main>
                <el-row>
                  <el-col>
                    <div class="input-group mb-3">
                      <h3>請輸入驗證碼</h3>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="icon-key"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        data-vv-name="Shared.validateCode"
                        placeholder="ValidateCode"
                        v-model="forms.ValidateCode"
                        @keyup.enter="login"
                      />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-button
                      style="float:right"
                      type="primary"
                      @click="login"
                    >{{ $t('Shared.login') }}</el-button>
                  </el-col>
                </el-row>
              </el-main>
            </el-row>
          </el-container>
          <div id="jumpPage"></div>
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
import UserService from '@/service/user'

@Component
export default class ValidateView extends Vue {
  isLoading: boolean = false
  forms: any = {
    Username: '',
    Password: '',
    ValidateCode: ''
  }
  dialog = {
    qrcode: { name: 'qrcode', title: 'QRcode', show: false, itemObject: null }
  }
  mounted(this: any) {
    if (
      this.$route.params &&
      this.$route.params !== null &&
      this.$route.params !== undefined
    ) {
      if (this.$route.params.Username && this.$route.params.Password) {
        this.forms.Username = this.$route.params.Username
        this.forms.Password = this.$route.params.Password
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
  openDialog(entry: any, action: string) {
    if (action === 'qrcode') {
      this.dialog.qrcode.show = true
      this.dialog.qrcode.itemObject = entry
    }
  }
  closeDialog(this: any, param: any) {
    let name = param[0]
    if (name === 'qrcode') {
      this.dialog.qrcode.show = false
    }
  }
  login(this: any) {
    this.setloading(true)

    AuthenticateService.secondLoginTokenAsync(this.forms).then(res => {
      if (res.data.Success) {
        console.log(res)
        this.$store.dispatch('setAccessToken', res.data.Data.access_token)
        UserService.getAllSessionStorange().then(res => {
          if (res.data.Success) {
            // console.log(res)
            // identity
            this.$store.dispatch('setIdentity', res.data.Data.identity)
            // permission
            this.$store.dispatch('setPermission', res.data.Data.permission)
            // sideMenuMulti
            this.$store.dispatch('setMenu', res.data.Data.sideMenuMulti)

            this.$router.push({ path: '/' })
          }
        })
      } else {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: res.data.Message
        })
      }
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
