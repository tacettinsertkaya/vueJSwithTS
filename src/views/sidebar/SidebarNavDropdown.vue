<template>
  <li
    class="nav-item nav-dropdown"
    disabled
  >
    <div
      class="nav-link nav-dropdown-toggle"
      @click="handleClick"
    >
      <i :class="['nav-icon', icon]"></i>
      {{name}}
    </div>
    <ul class="nav-dropdown-items">
      <template v-for="(item) in navItems">
        <template v-if="item.children">
          <SidebarNavDropdown
            :key="item.name"
            :name="$i18n.t('Menu.' + item.name)"
            :url="item.url"
            :icon="item.icon"
            :navItems="item.children"
          ></SidebarNavDropdown>
        </template>
        <template v-else>
          <li
            :key="item.name"
            class="nav-item"
          >
            <SidebarNavLink
              :name="$i18n.t('Menu.' + item.name)"
              :url="item.url"
              :icon="item.icon"
              :badge="item.badge"
            />
          </li>
        </template>
      </template>
    </ul>
  </li>
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
import SidebarNavLink from '@/views/sidebar/SidebarNavLink.vue'

@Component({
  components: {
    SidebarNavLink
  }
})
export default class SidebarNavDropdown extends Vue {
  @Prop({ default: '' }) name!: string
  @Prop({ default: '' }) url!: string
  @Prop({ default: '' }) icon!: string
  @Prop({ default: [] }) navItems!: any
  handleClick(e: any) {
    e.preventDefault()
    e.target.parentElement.classList.toggle('open')
  }
}
</script>

<style scoped lang="css">
.nav-link {
  cursor: pointer;
}
</style>
