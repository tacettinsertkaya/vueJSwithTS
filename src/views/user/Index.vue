<template>
  <div>
    <cp-card
      :title="$t('Role.role')"
      :enableAction="true"
      :enableCollapse="true"
      :enableFields="true"
      :collapseState="true"
      @cardSearch="search"
    >
      <template slot="action-dropdown">
        <a
          class="dropdown-item"
          v-on:click="openDialog({},'add')"
          style="text-align:center"
        >{{$t('Shared.add')}}</a>
      </template>
      <template slot="body">
        <!--=======================================搜尋條件==========================================-->
        <!-- <div class="form-group row">
          <div class="col-md-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">{{$t('Menu.menu')}}</span>
              </div>
              <menu-select-input @getResult="getMenuResult"></menu-select-input>
            </div>
          </div>
        </div>-->
        <!--=======================================資料顯示==========================================-->
        <sub-table
          :dataSource="dataSource"
          :fields="fields"
          v-loading="listLoading"
          :isMutiCheckBox="false"
          :formatter="formatter"
          :isOperatorShow="hasPermission('menu')"
          :isOtherShow="hasPermission('menu')"
          @getCheckBoxResult="getCheckBoxResult"
        >
          <template slot="operator">
            <el-table-column
              fixed="right"
              width="400"
              :align="'center'"
              :label="$t('Shared.operator')"
            >
              <template slot-scope="entry">
                <el-button
                  @click.prevent="openDialog(entry.row,'edit')"
                  plain
                  size="small"
                >{{$t('Shared.edit')}}</el-button>
              </template>
            </el-table-column>
          </template>
        </sub-table>

        <cp-pagination
          :pageIndex="filter.PageIndex"
          :pageSize.sync="filter.PageSize"
          :recordCount="recordCount"
          @change="change"
        ></cp-pagination>
      </template>
      <template slot="footer"></template>
    </cp-card>
    <div id="jumpPage">
      <sub-add
        v-on:closeDialog="closeDialog"
        v-if="dialog.add.show"
        :showDialog="dialog.add.show"
        :title="dialog.add.title"
        :dialogName="dialog.add.name"
      ></sub-add>
      <sub-edit
        v-on:closeDialog="closeDialog"
        v-if="dialog.edit.show"
        :showDialog="dialog.edit.show"
        :title="dialog.edit.title"
        :dialogName="dialog.edit.name"
        :itemObject="dialog.edit.itemObject"
      ></sub-edit>
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
// 角色-服務
import UserService from '@/service/user'
// 角色-新增
import SubAdd from '@/views/user/Add.vue'
// 角色-編輯
import SubEdit from '@/views/user/Edit.vue'
// 角色-删除
import SubDel from '@/components/popover/Popover.vue'
// 角色-模型
import Userfields from '@/views/user/model/UserFields'
// 角色-模組
import {
  RequestUserGetMany,
  ResponseUserGetMany
} from '@/views/user/model/UserModel'

// 共用模組
import { Result } from '@/models/SharedModel'
import moment from 'moment'
@Component({
  components: {
    SubAdd,
    SubEdit,
    SubDel
  }
})
export default class UserIndex extends Vue {
  dataSource: any = []
  fields = new Userfields().getFields()
  filter = new RequestUserGetMany({
    ParentAccount: '',
    Account: '',
    RoleID: -1,
    Status: -1,
    Name: '',
    Approve: -1,
    Authenticator: -1,
    DateTimeType: 2,
    DateTimeStart: null,
    DateTimeEnd: null,
    PageIndex: 1,
    PageSize: 10,
    ExecutorUser: this.$store.getters['identity'].Account
  })
  recordCount = 0 // 資料筆數
  dialog = {
    add: { name: 'add', title: '新增使用者', show: false },
    edit: { name: 'edit', title: '编辑使用者', show: false, itemObject: null }
  }
  other = {
    SelectAll: []
  }
  listLoading = false
  mounted() {
    this.dataBind()
  }
  formatter(row: any, column: any, cellValue: any, index: number) {
    var field = column.property
    switch (field) {
      case 'CreateDateTime':
        return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
      case 'UpdateDateTime':
        return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
      case 'Status':
        return Object.is(cellValue, true) ? '啟用' : '停用'
    }
    return cellValue
  }
  search() {
    this.filter.PageIndex = 1
    this.dataBind()
  }
  change(data: any) {
    this.filter.PageIndex = data.page
    this.dataBind()
  }
  dataBind() {
    this.listLoading = true
    // 取得全部
    UserService.getMany(this.filter)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<Array<ResponseUserGetMany>>(response.data)
          this.dataSource = result.Data
          this.recordCount = result.Pagination.TotalCount
        }
        this.listLoading = false
      })
      .catch((error: any) => {
        console.log('撈取角色發生例外', error)
        this.listLoading = false
      })
  }
  openDialog(entry: any, action: string) {
    switch (action) {
      case 'add':
        this.dialog.add.show = true
        break
      case 'edit':
        this.dialog.edit.show = true
        this.dialog.edit.itemObject = entry
        break
    }
  }
  closeDialog(param: any) {
    let name = param[0]
    switch (name) {
      case 'add':
        this.dialog.add.show = false
        break
      case 'edit':
        this.dialog.edit.show = false
        break
    }
    this.dataBind()
  }

  getCheckBoxResult(param: any) {
    this.other.SelectAll = param
  }
}
</script>
<style scoped>
</style>
