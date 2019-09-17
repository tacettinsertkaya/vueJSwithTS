<template>
  <div
    class="sidebar"
    v-loading="isLoading"
  >
    <nav class="sidebar-nav">
      <ul class="nav">
        <template v-for="(item) in navItems">
          <template v-if="item.title">
            <li
              :key="item.name"
              class="nav-title"
            >{{ $t('Menu.' + item.name) }}</li>
          </template>
          <template v-else-if="item.divider">
            <li
              :key="item.name"
              class="divider"
            ></li>
          </template>
          <template v-else>
            <template v-if="item.children">
              <SidebarNavDropdown
                :key="item.name"
                :name="$t('Menu.' + item.name)"
                :url="item.url"
                :icon="item.icon"
                :navItems="item.children"
              ></SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavLink
                :key="item.name"
                :name="$t('Menu.' + item.name)"
                :url="item.url"
                :icon="item.icon"
                :badge="item.badge"
              />
            </template>
          </template>
        </template>
      </ul>
    </nav>
    <button
      class="sidebar-minimizer brand-minimizer"
      type="button"
      @click="onClick()"
    ></button>
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
import SidebarNavDropdown from '@/views/sidebar/SidebarNavDropdown.vue'
import SidebarNavLink from '@/views/sidebar/SidebarNavLink.vue'
@Component({
  components: {
    SidebarNavDropdown,
    SidebarNavLink
  }
})
export default class Sidebar extends Vue {
  @Prop({ default: [] }) navItems!: any
  private isLoading = false
  onClick() {
    this.sidebarMinimize()
    this.brandMinimize()
  }
  sidebarMinimize() {
    document.body.classList.toggle('sidebar-minimized')
  }
  brandMinimize() {
    document.body.classList.toggle('brand-minimized')
  }
}
</script>
