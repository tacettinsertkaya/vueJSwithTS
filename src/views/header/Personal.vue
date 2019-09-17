<template>
  <div>
    <li class="nav-item dropdown">
      <a
        class="nav-link"
        data-toggle="dropdown"
        href="#"
      >
        <i class="icon-user"></i>
        <!-- <img class="img-avatar" src="../../assets/img/avatars/6.jpg" alt="admin@bootstrapmaster.com"> -->
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <div class="dropdown-header text-center">
          <strong>帐户</strong>
        </div>
        <!-- <a class="dropdown-item" href="#">
          <i class="fa fa-envelope-o"></i>信息
          <span class="badge badge-success">42</span>
        </a>-->
        <!-- <div class="dropdown-header text-center">
          <strong>Settings</strong>
        </div>-->

        <a
          class="dropdown-item"
          href="#"
          @click.prevent.stop="logout"
        >
          <i class="fa fa-sign-out"></i>
          {{ $t("Shared.logout") }}
        </a>
      </div>
    </li>
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

@Component
export default class Personal extends Vue {
  dialog = {}
  logout() {
    this.$store.dispatch('clearToken')
    this.$router.push({ path: '/login' })
    // this.setloading(true)
    // this.$store
    //   .dispatch('logout', {
    //     WebUser_ID: -1,
    //     SessionID: 'abc'
    //   })
    //   .then(response => {
    //     this.setloading(false)
    //     this.$router.push({ path: '/login' })
    //   })
  }
}
</script>
