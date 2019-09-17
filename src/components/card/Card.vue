<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      class="card"
      ref="card"
    >
      <div class="card-header">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-light bg-light">
              <!-- <strong class="navbar-brand">{{ title }}</strong> -->
              <div class="card-header-title">
                <slot name="header"></slot>
              </div>

              <strong></strong>
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a
                    class="nav-link card-actionButton"
                    href="#"
                    v-show="enableSearch"
                    @click.prevent.stop="cardSearch()"
                  >{{ $t('Shared.query')}}</a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle card-actionButton"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    v-show="enableSetting"
                  >
                    <i class="icon-settings"></i>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <slot name="action-dropdown"></slot>
                  </div>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link card-actionButton"
                    href="#"
                    @click.prevent="cardCollapse()"
                    v-show="enableCollapse"
                  >
                    <i :class="iconArrow"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div
        class="card-body"
        v-show="currentCollapse"
      >
        <slot name="body"></slot>
      </div>
      <div
        class="card-footer"
        v-show="currentCollapse"
      >
        <slot name="footer"></slot>
      </div>
      <!-- 遮罩(等待畫面) -->
      <!-- <div class="overlay" v-show="overlay">
        <div class="loading" @click.prevent.stop="stop"></div>
      </div>-->
    </div>
  </transition>
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

@Component({
  name: 'Card'
})
export default class Card extends Vue {
  @Prop({ default: '', required: false }) title!: string // 標題
  @Prop({ default: true, required: false }) enableSearch!: boolean // 搜寻按钮
  @Prop({ default: true, required: false }) enableSetting!: boolean // 设定
  @Prop({ default: true, required: false }) enableAction!: boolean // 啟用操作
  @Prop({ default: true, required: false }) enableCollapse!: boolean // 啟用收合
  @Prop({ default: false, required: false }) enableClose!: boolean // 啟用關閉
  @Prop({ default: false, required: false }) enableFields!: boolean // 啟用欄位
  @Prop({ default: true, required: false }) collapseState!: boolean // 收合狀態(true: 開)
  fieldsModalState = false // 欄位狀態(true: 開)
  currentCollapse = false
  get iconArrow() {
    return this.currentCollapse ? 'icon-arrow-up' : 'icon-arrow-down'
  }
  mounted(this: any) {
    this.currentCollapse = this.collapseState
  }
  cardCollapse() {
    // 收核
    this.currentCollapse = !this.currentCollapse
  }
  cardClose(this: any) {
    // 關閉
    this.$refs.card.remove()
  }
  fieldsSelected(this: any, show: boolean) {
    // 全選/清空
    this.fields.forEach(function(item: any) {
      item.show = show
    })
  }
  stop(this: any, show: boolean) {
    // 停止執行
    this.overlay = false
  }
  @Emit('cardSearch')
  cardSearch() {
    // 搜尋
  }
}
</script>

<style lang="scss">
@import './Card.scss';
</style>
