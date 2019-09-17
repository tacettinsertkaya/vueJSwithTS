<template>
  <div>
    <cp-card
      :title="$t('Menu.menu')"
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
          <!-- <div class="col-md-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">{{$t('Menu.menu')}}</span>
              </div>
              <menu-select-input @getResult="getMenuResult"></menu-select-input>
            </div>
          </div> -->
          <!-- <div class="col-md-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">選單類型</span>
              </div>
              <el-select
                v-model="filter.MenuType"
                filterable
                placeholder="請選擇"
              >
                <el-option
                  :value="1"
                  :label="'選單'"
                ></el-option>
                <el-option
                  :value="2"
                  :label="'頁面'"
                ></el-option>
              </el-select>
            </div>
          </div> -->
          <div class="col-md-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">關鍵字</span>
              </div>
              <input
                id="MenuKeyword"
                :name="'關鍵字'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="filter.MenuKeyword"
              />
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
                  @click.prevent="openDialog(entry.row,'edit')"
                  plain
                  size="small"
                >{{$t('Shared.edit')}}</el-button>
                <sub-del
                  :type="'danger'"
                  :shape="'plain'"
                  :msg="'是否删除:' + entry.row.MenuName"
                  :size="'small'"
                  @BtnEvents="delSingle(entry.row)"
                  style="margin-left:10px;margin-right:10px;"
                ></sub-del>
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
// 選單-服務
import MenuService from '@/service/menu'
// // 選單-可搜尋下拉式選單
// import MenuSelectInput from '@/components/menuSelectInput/MenuSelectInput.vue'
// 選單-新增
import SubAdd from '@/views/menu/Add.vue'
// 選單-編輯
import SubEdit from '@/views/menu/Edit.vue'
// 選單-删除
import SubDel from '@/components/popover/Popover.vue'
// 選單-模型
import Menufields from '@/views/menu/model/Menufields'
// 選單-模組
import {
  RequestMenuGetMany,
  ResponseMenuGetMany
} from '@/views/menu/model/MenuModel'

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
export default class Menu extends Vue {
  dataSource: any = []
  fields = new Menufields().getFields()
  filter = new RequestMenuGetMany({
    ParentMenuID: -1,
    MenuType: 1,
    MenuKeyword: '',
    PageIndex: 1,
    PageSize: 10,
    ExecutorUser: this.$store.getters['identity'].Account
  })
  recordCount = 0 // 資料筆數
  dialog = {
    add: { name: 'add', title: '新增選單', show: false },
    edit: { name: 'edit', title: '编辑選單', show: false, itemObject: null }
  }
  other = {
    SelectAll: []
  }
  listLoading = false
  options = [{ value: '', label: '' }]
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
    MenuService.getMany(this.filter)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<Array<ResponseMenuGetMany>>(response.data)
          this.dataSource = result.Data
          this.recordCount = result.Pagination.TotalCount
        }
        this.listLoading = false
      })
      .catch((error: any) => {
        console.log('撈取選單發生例外', error)
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
  delSingle(itemObject: any) {
    MenuService.delete({
      MenuID: itemObject.MenuID,
      ExecutorUser: this.$store.getters['identity'].Account
    })
      .then((response: any) => {
        if (!response.data.Success) {
          this.$message.error({
            message: `${this.$i18n.t('Message.' + response.data.Message)}(${
              response.data.Code
            })`
          })
          return
        }
        this.$message.success({
          message: typeof this.$i18n.t('Message.Success')
        })
        this.dataBind()
      })
      .finally(() => {})
  }
  getCheckBoxResult(param: any) {
    this.other.SelectAll = param
  }
  getMenuResult(param: any) {
    this.filter.ParentMenuID = param[0]

    console.log(param[0])
  }
}
</script>
<style scoped>
</style>
