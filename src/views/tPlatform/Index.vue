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
          <div class="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">父帳號</span>
              </div>
              <input
                id="ParentAccount"
                :name="'父帳號'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="filter.ParentAccount"
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">帳號</span>
              </div>
              <input
                id="Account"
                :name="'帳號'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="filter.Account"
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">角色識別碼</span>
              </div>
              <role-select-input @getResult="getRole"></role-select-input>
            </div>
          </div>
          <div class="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">狀態</span>
              </div>
              <el-select
                v-model="filter.Status"
                filterable
                placeholder="請選擇"
              >
                <el-option
                  :value="-1"
                  :label="'不使用'"
                >
                </el-option>
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
        <div class="form-group row">
          <div class="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">使用者名稱</span>
              </div>
              <input
                id="Name"
                :name="'使用者名稱'"
                type="text"
                class="form-control"
                placeholder
                aria-label
                v-model="filter.Name"
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">認證狀態</span>
              </div>
              <el-select
                v-model="filter.Approve"
                filterable
                placeholder="請選擇"
              >
                <el-option
                  :value="-1"
                  :label="'不使用'"
                >
                </el-option>
                <el-option
                  :value="0"
                  :label="'未認證'"
                ></el-option>
                <el-option
                  :value="1"
                  :label="'已認證'"
                ></el-option>
              </el-select>
            </div>
          </div>
        </div> -->
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
                <el-button
                  v-if="Object.is(entry.row.Status,0)"
                  @click.prevent="openDialog(entry.row,'unlock')"
                  plain
                  size="small"
                >{{$t('Shared.unlock')}}</el-button>
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
// 三方平台銀行-服務
import TPlatformService from '@/service/tPlatform'
// 三方平台銀行-新增
import SubAdd from '@/views/tPlatform/Add.vue'
// 三方平台銀行-編輯
import SubEdit from '@/views/tPlatform/Edit.vue'
// 三方平台銀行-刪除
import SubDel from '@/components/popover/Popover.vue'
// 三方平台銀行-模組
import {
  RequestTPlatformGetMany,
  ResponseTPlatformGetMany
} from '@/views/tPlatform/model/TPlatformModel'
// 三方平台銀行-欄位
import TPlatformFields from '@/views/tPlatform/model/TPlatformFields'
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
export default class TPlatformIdex extends Vue {
  dataSource: any = []
  fields = new TPlatformFields().getFields()
  filter = new RequestTPlatformGetMany({
    TPlatformCode: '',
    Status: -1,
    TPlatformName: '',
    TPlatformParameters: '',
    PageIndex: 1,
    PageSize: 10,
    ExecutorUser: this.$store.getters['identity'].Account
  })
  recordCount = 0 // 資料筆數
  dialog = {
    add: { name: 'add', title: '新增三方平台', show: false },
    edit: { name: 'edit', title: '编辑三方平台', show: false, itemObject: null }
  }
  other = {
    SelectAll: []
  }
  listLoading = false
  mounted() {
    this.dataBind()
  }
  formatter(this: any, row: any, column: any, cellValue: any, index: number) {
    var field = column.property
    switch (field) {
      case 'TPlatformLangName':
        if (Object.is(typeof cellValue, 'string')) {
          return this.LanguageRecon(
            this.$store.getters['locale'],
            JSON.parse(cellValue)
          )
        }
        break
      case 'Status':
        return cellValue || Object.is(cellValue, true) ? '啟用' : '停用'
        break
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
    TPlatformService.getMany(this.filter)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<Array<ResponseTPlatformGetMany>>(
            response.data
          )
          this.dataSource = result.Data
          this.recordCount = result.Pagination.TotalCount
        }
        this.listLoading = false
      })
      .catch((error: any) => {
        console.log('撈取三方平台發生例外', error)
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
