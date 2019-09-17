<template>
  <li class="nav-item">
    <router-link
      tag="a"
      :to="url"
      class="nav-link"
    >
      <i :class="['nav-icon', icon]"></i>
      {{ name }}
      <!-- <span :class="badge.variant">{{ badge.text }}</span> -->
    </router-link>
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
@Component
export default class SidebarNavLink extends Vue {
  @Prop({ default: '' }) name!: string
  @Prop({ default: '' }) url!: string
  @Prop({ default: '' }) icon!: string
  @Prop({ default: '' }) badge!: string
}
</script>
