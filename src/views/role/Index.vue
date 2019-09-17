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
        <div class="form-group row">
          <div class="col-md-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">角色狀態</span>
              </div>
              <el-select
                v-model="filter.Status"
                filterable
                placeholder="請選擇"
                clearable
              >
                <el-option
                  :value="-1"
                  :label="'全部'"
                ></el-option>
                <el-option
                  :value="0"
                  :label="'停用'"
                ></el-option>
                <el-option
                  :value="1"
                  :label="'啟用'"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div>
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
                  @click.prevent="openDialog(entry.row,'rolepermission')"
                  plain
                  size="small"
                >{{$t('Shared.permission')}}</el-button>
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
      <sub-role-permission
        v-on:closeDialog="closeDialog"
        v-if="dialog.rolepermission.show"
        :showDialog="dialog.rolepermission.show"
        :title="dialog.rolepermission.title"
        :dialogName="dialog.rolepermission.name"
        :itemObject="dialog.rolepermission.itemObject"
      >
      </sub-role-permission>
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
import RoleService from '@/service/role'
// 角色-新增
import SubAdd from '@/views/role/Add.vue'
// 角色-編輯
import SubEdit from '@/views/role/Edit.vue'
// 角色-删除
import SubDel from '@/components/popover/Popover.vue'
// 角色-權限
import SubRolePermission from '@/views/role/RolePermission.vue'
// 角色-模型
import Rolefields from '@/views/role/model/RoleFields'
// 角色-模組
import {
  RequestRoleGetMany,
  ResponseRoleGetMany
} from '@/views/role/model/RoleModel'

// 共用模組
import { Result } from '@/models/SharedModel'
import moment from 'moment'
@Component({
  components: {
    SubAdd,
    SubEdit,
    SubDel,
    SubRolePermission
  }
})
export default class Role extends Vue {
  dataSource: any = []
  fields = new Rolefields().getFields()
  filter = new RequestRoleGetMany({
    Status: -1,
    PageIndex: 1,
    PageSize: 10,
    ExecutorUser: this.$store.getters['identity'].Account
  })
  recordCount = 0 // 資料筆數
  dialog = {
    add: { name: 'add', title: '新增角色', show: false },
    edit: { name: 'edit', title: '编辑角色', show: false, itemObject: null },
    rolepermission: {
      name: 'rolepermission',
      title: '角色權限',
      show: false,
      itemObject: null
    }
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
    RoleService.getMany(this.filter)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<Array<ResponseRoleGetMany>>(response.data)
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
      case 'rolepermission':
        this.dialog.rolepermission.show = true
        this.dialog.rolepermission.itemObject = entry
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
      case 'rolepermission':
        this.dialog.rolepermission.show = false
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
