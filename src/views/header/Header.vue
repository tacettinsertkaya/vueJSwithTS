<template>
  <header class="app-header navbar">
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto"
      type="button"
      data-toggle="sidebar-show"
      @click="sidebarMobileToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <a
      class="navbar-brand"
      href="#"
    >
      <img
        class="navbar-brand-full"
        src="../../assets/img/brand/LOGO_cn.png"
        alt="CoreUI Logo"
        width="140"
        v-if="$store.getters['locale'] !== 'en'"
      />
      <img
        class="navbar-brand-full"
        src="../../assets/img/brand/LOGO_en.png"
        alt="CoreUI Logo"
        width="140"
        v-else
      />
    </a>
    <button
      class="navbar-toggler sidebar-toggler d-md-down-none"
      type="button"
      data-toggle="sidebar-lg-show"
      @click="sidebarToggle"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="nav navbar-nav ml-auto">
      <span>{{NowDateTime}}</span>
    </div>
    <div class="nav navbar-nav ml-auto">
      <i
        class="fa fa-globe"
        style="width:25px;font-size:24px"
      ></i>
      <el-select
        style="width:150px;"
        v-model="loginForm.locale"
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
    <ul class="nav navbar-nav ml-auto">
      <view-personal />
    </ul>
  </header>
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
import ViewPersonal from '@/views/header/Personal.vue'
import { Validator } from 'vee-validate'
@Component({
  components: {
    ViewPersonal
  }
})
export default class Header extends Vue {
  loginForm = {
    locale: this.$store.getters['locale']
  }
  NowDateTime = null

  @Watch('loginForm.locale')
  localeChange(val: any, oldVal: any) {
    let validate = new Validator()
    // 設定語系變數
    this.$store.dispatch('setLocale', this.loginForm.locale)
    // 設定全域語系
    this.$i18n.locale = this.$store.getters['locale']
    // 設定驗證語系
    validate.locale = this.$store.getters['locale'].replace('-', '_')
  }
  mounted(this: any) {
    setInterval(() => {
      this.NowDateTime = this.getNowDate()
    }, 1000)
  }
  sidebarToggle(e: any) {
    e.preventDefault()
    e.stopPropagation()
    document.body.classList.toggle('sidebar-lg-show')
  }
  sidebarMobileToggle(e: any) {
    e.preventDefault()
    e.stopPropagation()
    document.body.classList.toggle('sidebar-show')
  }
}
</script>
