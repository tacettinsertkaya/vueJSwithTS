<template>
  <div class="app">
    <view-header></view-header>
    <div class="app-body">
      <view-sidebar :navItems="nav"></view-sidebar>
      <main class="main">
        <view-breadcrumb />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <footer class="app-footer"></footer>
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
import ViewHeader from '@/views/header/Header.vue'
import ViewSidebar from '@/views/sidebar/Sidebar.vue'
import ViewBreadcrumb from '@/views/breadcrumb/Breadcrumb.vue'

@Component({
  components: {
    ViewHeader,
    ViewSidebar,
    ViewBreadcrumb
  }
})
export default class DefaultContainer extends Vue {
  nav = []
  created() {}
  mounted() {
    this.nav = this.$store.getters['menu']
  }
}
</script>

<style lang="scss" type="text/scss">
.navbar {
  padding: 0;
}
a {
  cursor: pointer;
}
</style>
