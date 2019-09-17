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
      <el-row :gutter="24">
        <el-col :md="8">
          <el-container style="height: 500px; border: 1px solid #eee">
            <el-container>
              <el-main>
                <el-checkbox-group
                  v-model="MenuArray"
                  @change="handleCheckedMenuChange"
                >
                  <div
                    v-for="x in MenuDatasource"
                    style="position:relative;"
                  >
                    <el-checkbox
                      :key="x.MenuID + '_' + x.MenuAPIKeyword"
                      :label="x.MenuID + '_' + x.MenuAPIKeyword"
                      border
                      style="width:100%;"
                    >{{x.MenuName}}</el-checkbox>
                    <div
                      class="next"
                      @click="showPage(x.MenuID)"
                    >➭</div>
                  </div>
                </el-checkbox-group>
              </el-main>
            </el-container>
          </el-container>
        </el-col>
        <el-col :md="8">
          <el-container style="height: 500px; border: 1px solid #eee">
            <el-container>
              <el-main>
                <el-checkbox-group v-model="PageArray">
                  <div
                    v-for="x in PageDatasource"
                    style="position:relative;"
                  >
                    <el-checkbox
                      :key="x.MenuID + '_' + x.MenuAPIKeyword"
                      :label="x.MenuID + '_' + x.MenuAPIKeyword"
                      border
                      style="width:100%;"
                    >{{x.MenuName}}</el-checkbox>
                    <div
                      class="next"
                      @click="showFunction(x.MenuID)"
                    >➭</div>
                  </div>
                </el-checkbox-group>
              </el-main>
            </el-container>
          </el-container>
        </el-col>
        <el-col :md="8">
          <el-container style="height: 500px; border: 1px solid #eee">
            <el-container>
              <el-main>
                <el-checkbox-group v-model="functionArray">
                  <div
                    v-for="x in functionDatasource"
                    style="position:relative;"
                  >
                    <el-checkbox
                      :key="x.MenuID + '_' + x.MenuAPIKeyword"
                      :label="x.MenuID + '_' + x.MenuAPIKeyword"
                      border
                      style="width:100%;"
                    >{{x.MenuAPIName}}</el-checkbox>

                  </div>
                </el-checkbox-group>
              </el-main>
            </el-container>
          </el-container>
        </el-col>
      </el-row>
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
// Nick Create.
// Date 2019/08/16
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
// 角色-服務
import RoleService from '@/service/role'
import {
  RequestRolePermissionGetMany,
  ResponseRolePermissionGetMany,
  RequestRolePermissionMerge
} from '@/views/role/model/RoleModel'
// --------------------------------------------------------------------------------------
// 共用模組
import { Result, List } from '@/models/SharedModel'
// --------------------------------------------------------------------------------------

@Component({
  $_veeValidate: { validator: 'new' }
})
export default class RoleEdit extends Vue {
  @Inject('$validator') public $validator!: any
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) dialogName!: string
  @Prop({ default: false }) showDialog!: boolean
  @Prop({ default: null }) itemObject!: any
  requestRolePermissionGetMany = new RequestRolePermissionGetMany({
    RoleID: -1,
    ExecutorUser: this.$store.getters['identity'].Account
  })

  requestRolePermissionMerge = new RequestRolePermissionMerge({
    RoleID: -1,
    RolePermissionData: [],
    ExecutorUser: this.$store.getters['identity'].Account
  })
  AllDataSoucre = new ResponseRolePermissionGetMany({
    functionGetMany: [],
    menuGetMany: [],
    pageGetMany: [],
    RowNum: 0,
    CreateDateTime: new Date(),
    CreateUser: '',
    UpdateDateTime: new Date(),
    UpdateUser: ''
  })
  MenuArray: any = []
  MenuDatasource: any = []
  PageArray: any = []
  PageDatasource: any = []
  functionArray: any = []
  functionDatasource: any = []

  isOpen = false
  mounted() {
    this.isOpen = this.showDialog
    this.requestRolePermissionGetMany.RoleID = this.itemObject.RoleID
    this.requestRolePermissionMerge.RoleID = this.itemObject.RoleID
    this.dataBind()
  }
  @Emit('closeDialog')
  close() {
    this.isOpen = false
    return [this.dialogName]
  }
  @Watch('MenuArray')
  onMenuArrayChange(newValue: any, oldValue: any) {
    console.log('MenuArray', newValue)
  }
  @Watch('PageArray')
  onPageArrayChange(newValue: any, oldValue: any) {
    console.log('PageArray', newValue)
  }
  @Watch('functionArray')
  onfunctionArrayChange(newValue: any, oldValue: any) {
    console.log('functionArray', newValue)
  }
  dataBind() {
    RoleService.getPermission(this.requestRolePermissionGetMany)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<ResponseRolePermissionGetMany>(response.data)
          this.AllDataSoucre = result.Data
          this.MenuDatasource = this.AllDataSoucre.menuGetMany

          this.AllDataSoucre.menuGetMany.forEach(e => {
            if (e.PermissionStatus) {
              this.MenuArray.push(e.MenuID + '_' + e.MenuAPIKeyword)
            }
          })
          this.AllDataSoucre.pageGetMany.forEach(e => {
            if (e.PermissionStatus) {
              this.PageArray.push(e.MenuID + '_' + e.MenuAPIKeyword)
            }
          })
          this.AllDataSoucre.functionGetMany.forEach(e => {
            if (e.PermissionStatus) {
              this.functionArray.push(e.MenuID + '_' + e.MenuAPIKeyword)
            }
          })
          console.log(this.AllDataSoucre)
        }
      })
      .catch((error: any) => {
        console.log('撈取角色發生例外', error)
      })
  }
  handleCheckedMenuChange(v) {}
  showPage(this: any, menuID: number) {
    this.PageDatasource = this.AllDataSoucre.pageGetMany.FindBy(e => {
      return Object.is(e.ParentMenuID, menuID)
    })
    this.PageArray = this.PageArray.removeRepeat()
  }
  showFunction(this: any, menuID: number) {
    this.functionDatasource = this.AllDataSoucre.functionGetMany.FindBy(e => {
      return Object.is(e.MenuID, menuID)
    })
    this.functionArray = this.functionArray.removeRepeat()
  }
  async submit(this: any): Promise<void> {
    let concatArray = this.MenuArray.concat(this.PageArray).concat(
      this.functionArray
    )
    let newArray: any = []
    concatArray.forEach(e => {
      let json: any = { MenuID: 0, MenuAPIKeyword: '' }
      let key = e.split('_')[0]
      let value = e.split('_')[1]
      json.MenuID = key
      json.MenuAPIKeyword = value
      newArray.push(json)
    })

    // console.log('RolePermissionData', newArray)

    this.requestRolePermissionMerge.RolePermissionData = newArray

    RoleService.merge(this.requestRolePermissionMerge)
      .then((response: any) => {
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
      .catch((error: any) => {
        console.log('編輯角色權限發生例外', error)
      })
      .finally(() => {})
  }
}
</script>
<style lang="scss" scoped>
.next {
  font-size: 28px;
  color: #000;
  text-align: center;
  background: rgba(64, 158, 255, 0.1);
  position: absolute;
  right: 0;
  top: 50%;
  width: 15%;
  transform: translateY(-58%);
  cursor: pointer;
}
</style>
