<template>
  <div
    class="pager-wrapper"
    v-if="totalPage > 0"
  >
    <div class="align">
      <div class="info">{{ $t('Shared.totalPages') }}</div>
      <div class="pager-size">
        <select v-model="currentPageSize">
          <option>10</option>
          <option>15</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
          <option>200</option>
        </select>
      </div>
      <!-- <div class="pager-pages"> -->
      <div
        v-show="currentPage > 1 && showPrev"
        @click="go(currentPage - 1)"
      >{{ $t('Shared.previous') }}</div>
      <div
        :class="{active: currentPage == 1 ? true : false}"
        @click="go(1)"
      >1</div>
      <div
        class="more"
        v-show="pages[0] > 2"
      >...</div>
      <div
        v-for="page in pages"
        :key="page"
        :class="{active: currentPage == page ? true : false}"
        @click="go(page)"
      >{{ page }}</div>
      <div
        class="more"
        v-show="pages[pages.length-1] < totalPage - 1"
      >...</div>
      <div
        v-if="totalPage > 1"
        :class="{active: currentPage == totalPage ? true : false}"
        @click="go(totalPage)"
      >{{ totalPage }}</div>
      <div
        v-show="currentPage < totalPage && showNext"
        @click="go(currentPage + 1)"
      >{{ $t('Shared.next') }}</div>
      <!-- </div> -->
      <div
        v-if="showJump"
        v-show="totalPage > 1"
        class="pager-jump"
      >
        <div @click="go(jumpPage)">{{ $t('Shared.jumpTo') }}</div>
        <input
          type="number"
          min="1"
          :max="totalPage"
          v-model="jumpPage"
          class="jump-input"
        >
      </div>
      <div class="info">{{ $t('Shared.totalCount')}}&nbsp;&nbsp;{{recordCount}}</div>
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
type CustomModeType = 'event' | 'query' | 'params'
@Component
export default class Pagination extends Vue {
  @Prop({ type: Number, default: 1, required: true }) recordCount!: number
  @Prop({ type: Number, default: 1, required: true }) pageIndex!: number
  @Prop({ type: Number, default: 10, required: true }) pageSize!: number
  @Prop({ type: Number, default: 3, required: false }) showItems!: number
  @Prop({ type: Boolean, default: true, required: false }) showPrev!: boolean
  @Prop({ type: Boolean, default: true, required: false }) showNext!: boolean
  @Prop({ type: Boolean, default: true, required: false }) showJump!: boolean // 是否顯示跳轉
  @Prop({ type: String, default: 'event', required: false })
  mode!: CustomModeType
  @Prop({ type: String, default: '', required: false }) routeName!: string
  currentPage = 0
  jumpPage = 0
  currentPageSize = 0

  created(this: any) {
    this.currentPage = this.pageIndex
    this.currentPageSize = this.pageSize
    // if (this.mode === 'params' && !this.routeName) {
    //   throw 'need a route name when choose params mode in pager component'
    // }
  }
  mounted() {}
  get totalPage() {
    return Math.ceil(this.recordCount / this.currentPageSize)
  }
  get pages() {
    let getPages = (start: number, end: number) => {
      if (start <= 1 || start > end || start >= this.totalPage) {
        start = 2
      }
      if (end >= this.totalPage || end < start || end <= 1) {
        end = this.totalPage - 1
      }
      let arr: any = []
      for (let i = start; i <= end; i++) {
        arr.push(i)
      }
      return arr
    }
    let counts = this.showItems
    if (this.totalPage < counts + 2) {
      return getPages(2, this.totalPage)
    } else {
      if (this.currentPage <= Math.ceil(counts / 2)) {
        return getPages(2, counts)
      } else if (this.currentPage >= this.totalPage - Math.floor(counts / 2)) {
        return getPages(this.totalPage + 1 - counts, this.totalPage - 1)
      } else {
        let half = Math.ceil(counts / 2) - 1
        let end = this.currentPage + half
        if (counts % 2 === 0) {
          end++
        }
        return getPages(this.currentPage - half, end)
      }
    }
  }
  @Emit('change')
  go(this: any, page: any) {
    if (page < 1) {
      page = 1
    }
    if (page > this.totalPage) {
      page = this.totalPage
    }
    this.currentPage = parseInt(page, 10)
    if (this.mode === 'query') {
      let query = this.$route.query
      query.page = this.currentPage
      this.$router.go({ query: query })
    } else if (this.mode === 'params') {
      let params = this.$route.params
      params.page = this.currentPage
      this.$router.go({ name: this.routeName, params: params })
    } else {
      return {
        page: this.currentPage
      }
    }
  }
  @Watch('currentPage')
  onCurrentPage(this: any, newVal: any, oldVal: any) {
    this.jumpPage = newVal
  }
  @Watch('pageIndex')
  onPageIndex(this: any, newVal: any, oldVal: any) {
    if (this.currentPage !== newVal) {
      this.currentPage = newVal
    }
  }
  @Watch('currentPageSize')
  onCurrentPageSize(this: any, newVal: any, oldVal: any) {
    if (this.pageSize !== newVal) {
      this.$emit('update:pageSize', parseInt(newVal))
      this.go(1)
    }
  }
}
</script>
<style lang="scss">
@import './Pagination.scss';
</style>
