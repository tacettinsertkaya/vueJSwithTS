<template>
  <!-- Breadcrumb-->
  <ol class="breadcrumb">
    <li
      v-for="(item, index) in routes"
      :key="item.id"
      :class="{ 'breadcrumb-item': true, active: index === routes.length - 1 }"
      v-if="item.name !== ''"
    >
      <template v-if="index === routes.length - 1">{{ $t('Menu.' + item.name) }}</template>
      <router-link
        v-else
        tag="a"
        :to="item.path === '' ? '/' : item.path"
      >{{ $t('Menu.' + item.name) }}</router-link>
    </li>
    <!-- <li class="breadcrumb-item">Home</li>
        <li class="breadcrumb-item">
            <a href="#">Admin</a>
        </li>
    <li class="breadcrumb-item active">Dashboard</li>-->
    <!-- Breadcrumb Menu-->
    <!-- <li class="breadcrumb-menu d-md-down-none">
            <div class="btn-group" role="group" aria-label="Button group">
                <a class="btn" href="#">
                    <i class="icon-speech"></i>
                </a>
                <a class="btn" href="./">
                    <i class="icon-graph"></i>Dashboard
                </a>
                <a class="btn" href="#">
                    <i class="icon-settings"></i>Settings
                </a>
            </div>
    </li>-->
  </ol>
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
export default class Breadcrumb extends Vue {
  get routes() {
    return this.$route.matched
  }
}
</script>
