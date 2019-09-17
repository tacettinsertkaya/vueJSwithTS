<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isOpen"
      width="60%"
      :before-close="close"
      center
      :close-on-click-modal="false"
    >
      <service-parameter
        @Result="getParameterResult"
        v-model="serviceParameter"
      ></service-parameter>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submit"
        >{{$t('Shared.submit')}}</el-button>
        <el-button @click="close">{{$t('Shared.close')}}</el-button>
      </span>
    </el-dialog>
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
import MenuPermissionService from '@/service/menuPermission'
// 共用模組
import { List, MenuAPIData, Result } from '@/models/SharedModel'
import ServiceParameter from '@/components/serviceParameter/ServiceParameter.vue'
import {
  RequestMenuAPIGetMany,
  ResponseMenuAPIGetMany,
  RequestMenuAPIMerge
} from '@/models/PermissionModel'

// --------------------------------------------------------------------------------------
@Component({
  components: {
    ServiceParameter
  }
})
export default class Permission extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any
  isOpen = false
  dataSource: any = []
  serviceParameter: any = []

  requestMenuAPIGetMany = new RequestMenuAPIGetMany({
    MenuID: -1,
    PageIndex: 1,
    PageSize: 9999,
    ExecutorUser: this.$store.getters['identity'].Account
  })
  requestMenuAPIMerge = new RequestMenuAPIMerge({
    MenuID: -1, // 選單識別碼
    MenuAPIData: new List<MenuAPIData>(), // 選單API資料
    ExecutorUser: this.$store.getters['identity'].Account // 操作者
  })
  mounted() {
    this.isOpen = this.showDialog
    this.requestMenuAPIGetMany.MenuID = this.itemObject.MenuID
    this.dataBind()
  }
  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  getMenuResult(param: any) {}
  async submit(this: any): Promise<void> {
    this.requestMenuAPIMerge.MenuID = this.itemObject.MenuID
    this.requestMenuAPIMerge.MenuAPIData = this.serviceParameter

    // console.log(JSON.stringify(this.requestMenuAPIMerge))

    MenuPermissionService.MergeAsync(this.requestMenuAPIMerge)
      .then(response => {
        this.sharedResponse(response, {
          useBack: false,
          useErrorCodeMsg: true,
          callback: () => {
            this.isOpen = false
            this.$emit('closeDialog', [this.dialogName])
          }
        })
        if (!response.data.Success) {
          this.setloading(false)
        }
      })
      .catch(error => {
        console.log('新增修改權限發生例外', error)
      })
  }
  dataBind() {
    MenuPermissionService.getMany(this.requestMenuAPIGetMany)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<Array<ResponseMenuAPIGetMany>>(response.data)

          var arr: any = []
          result.Data.forEach(ele => {
            arr.push({
              MenuAPIOperational: ele.MenuAPIOperational,
              MenuAPIKeyword: ele.MenuAPIKeyword,
              MenuAPIUrl: ele.MenuAPIUrl,
              MenuAPIName: ele.MenuAPIName
            })
          })

          this.serviceParameter = arr
        }
      })
      .catch((error: any) => {
        console.log('撈取選單權限發生例外', error)
      })
  }
  getParameterResult(this: any, data) {
    this.serviceParameter = data
  }
}
</script>
<style lang="scss" scoped>
</style>
