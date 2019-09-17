<template>
  <div>
    <div class="row">
      <div class="col-12">
        <cp-card
          :title="$t('Menu.iplimit')"
          :enableAction="true"
          :enableCollapse="true"
          :enableFields="true"
          :collapseState="true"
          @cardSearch="search"
        >
          <template slot="action-dropdown">
            <a
              v-permission="'iplimit_func_add'"
              class="dropdown-item"
              v-on:click="openDialog({},'add')"
              style="text-align:center"
            >{{$t('Shared.add')}}</a>
          </template>
          <template slot="body">
            <!--=======================================搜尋條件==========================================-->
            <div class="form-group row">
              <div class="col-md-2">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{ $t('Shared.ip' )}}</span>
                  </div>
                  <input
                    clearable
                    type="text"
                    class="form-control"
                    placeholder
                    aria-label
                    maxlength="15"
                    v-model="filter.ip"
                    v-validate="{required:false,max:15,regex:/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/}"
                  />
                </div>
              </div>
              <div class="col-md-2">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{'是否' + $t('Shared.enabled')}}</span>
                  </div>
                  <select
                    class="form-control"
                    v-model="filter.IsValid"
                  >
                    <option
                      value="-1"
                      selected="selected"
                    >{{$t('Shared.all')}}</option>
                    <option value="1">{{$t('Shared.enabled')}}</option>
                    <option value="0">{{$t('Shared.disabled')}}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{$t('Iplimit.createDate')}}</span>
                  </div>
                  <el-date-picker
                    v-model="createDateTime"
                    type="datetimerange"
                    align="center"
                    :range-separator="$t('Shared.to')"
                    :start-placeholder="$t('Shared.startDate')"
                    :end-placeholder="$t('Shared.endDate')"
                  ></el-date-picker>
                </div>
              </div>
              <div class="col-md-4">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">{{$t('Iplimit.expiredTime')}}</span>
                  </div>
                  <el-date-picker
                    v-model="expiredTime"
                    type="datetimerange"
                    align="center"
                    :range-separator="$t('Shared.to')"
                    :start-placeholder="$t('Shared.startDate')"
                    :end-placeholder="$t('Shared.endDate')"
                  ></el-date-picker>
                </div>
              </div>
            </div>

            <!--=======================================資料顯示==========================================-->
            <sub-table
              :dataSource="dataSource"
              :fields="fields"
              v-loading="listLoading"
              :isMutiCheckBox="true"
              :formatter="formatter"
              :isOperatorShow="hasPermission('iplimit_colum_operate')"
              :isOtherShow="hasPermission('iplimit_colum_other')"
              @getCheckBoxResult="getCheckBoxResult"
            >
              <template slot="MutiTemplete">
                <div class="row">
                  <div class="col-md-12">
                    <el-button
                      @click="openDialog({},'mutliEnabeld')"
                      type="danger"
                      style="margin-bottom:10px;"
                    >批次启用</el-button>
                    <el-button
                      @click="openDialog({},'mutliDisabeld')"
                      type="danger"
                      style="margin-bottom:10px;"
                    >批次停用</el-button>
                  </div>
                </div>
              </template>
              <!-- <template slot="SID" slot-scope="scope">
                <el-button
                  @click.prevent="openDialog(scope.entry.row,'edit')"
                  plain
                  size="small"
                >{{$t('Shared.edit')}}</el-button>
                <el-button>{{scope.entry.row[scope.entry.column.property]}}</el-button>
              </template>-->
              <template
                slot="Num"
                slot-scope="scope"
              >
                <div v-if="scope.entry.row[scope.entry.column.property] !== 0">
                  <router-link :to="{ path: '/user/index/'+ scope.entry.row.Organization_ID + '_' + scope.entry.row.Role_ID}">{{scope.entry.row[scope.entry.column.property]}}</router-link>
                </div>
                <div v-else>{{scope.entry.row[scope.entry.column.property]}}</div>
              </template>
              <template slot="operator">
                <el-table-column
                  fixed="right"
                  width="400"
                  :align="'center'"
                  :label="$t('Shared.operator')"
                >
                  <template slot-scope="entry">
                    <div v-if="entry.row.Status !== 3">
                      <el-button
                        v-permission="'iplimit_func_edit'"
                        @click.prevent="openDialog(entry.row,'edit')"
                        plain
                        size="small"
                      >{{$t('Shared.edit')}}</el-button>
                      <sub-del
                        v-permission="'iplimit_func_delete'"
                        :type="'danger'"
                        :shape="'plain'"
                        :msg="'是否删除' + entry.row.IP"
                        :size="'small'"
                        @BtnEvents="delSingle(entry.row)"
                        style="margin-left:10px;margin-right:10px;"
                      ></sub-del>
                    </div>
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
      </div>
    </div>
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
      <sub-mutli-enabeld
        v-on:closeDialog="closeDialog"
        v-if="dialog.mutliEnabeld.show"
        :showDialog="dialog.mutliEnabeld.show"
        :title="dialog.mutliEnabeld.title"
        :dialogName="dialog.mutliEnabeld.name"
        :itemObject="dialog.mutliEnabeld.itemObject"
        :status="dialog.mutliEnabeld.status"
      ></sub-mutli-enabeld>
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
// IP白名单服务
import IpLimitService from '@/service/iplimit'
// 新增页面
import SubAdd from '@/views/iplimit/Add.vue'
// 编辑页面
import SubEdit from '@/views/iplimit/Edit.vue'
// 删除
import SubDel from '@/components/popover/Popover.vue'
import SubMutliEnabeld from '@/views/iplimit/MutliEnabeld.vue'

@Component({
  name: 'IPLimit',
  components: {
    SubAdd,
    SubEdit,
    SubDel,
    SubMutliEnabeld
  }
})
export default class IpLimit extends Vue {
  dataSource = []
  fields = []
  createDateTime = []
  expiredTime = []
  // name: 'IPLimit',
  // components: {
  //   SubAdd,
  //   SubEdit,
  //   SubDel,
  //   SubMutliEnabeld
  // },
  // data() {
  //   return {
  //     dataSource: [],
  //     fields: [
  //       {
  //         name: 'SID',
  //         type: String,
  //         locale: 'Iplimit.sid',
  //         show: true,
  //         permission: 'iplimit_colum_sid',
  //         customField: false,
  //         memo: '序号'
  //       },
  //       {
  //         name: 'IP',
  //         type: String,
  //         locale: 'Iplimit.ip',
  //         show: true,
  //         permission: 'iplimit_colum_ip',
  //         customField: false,
  //         memo: 'IP'
  //       },
  //       {
  //         name: 'Memo',
  //         type: String,
  //         locale: 'Iplimit.memo',
  //         show: true,
  //         permission: 'iplimit_colum_memo',
  //         customField: false,
  //         memo: '备注说明'
  //       },
  //       {
  //         name: 'IsValid',
  //         type: Boolean,
  //         locale: 'Iplimit.isValid',
  //         show: true,
  //         permission: 'iplimit_colum_isValid',
  //         customField: false,
  //         memo: '状态'
  //       },
  //       {
  //         name: 'ExpiredTime',
  //         type: Date,
  //         locale: 'Iplimit.expiredTime',
  //         show: true,
  //         permission: 'iplimit_colum_expiredTime',
  //         customField: false,
  //         memo: '到期时间'
  //       },
  //       {
  //         name: 'ExecutorAccount',
  //         type: String,
  //         locale: 'Iplimit.executorAccount',
  //         show: true,
  //         permission: 'iplimit_colum_executorAccount',
  //         customField: false,
  //         memo: '异动者'
  //       },
  //       {
  //         name: 'CreateDate',
  //         type: Date,
  //         locale: 'Iplimit.createDate',
  //         show: true,
  //         permission: 'iplimit_colum_createDate',
  //         customField: false,
  //         memo: '添加时间'
  //       }
  //     ],
  //     filter: {
  //       ip: '',
  //       IsValid: 1,
  //       WebUser_ID: -1,
  //       CreateDate_Start: null,
  //       CreateDate_End: null,
  //       ExpiredTime_Start: null,
  //       ExpiredTime_End: null,
  //       PageIndex: 1,
  //       PageSize: 10
  //     },
  //     createDateTime: [],
  //     expiredTime: [],
  //     recordCount: 0, // 資料筆數
  //     dialog: {
  //       add: { name: 'add', title: '新增IP', show: false },
  //       edit: { name: 'edit', title: '编辑IP', show: false, itemObject: null },
  //       mutliEnabeld: {
  //         name: 'mutliEnabeld',
  //         title: '批次启用',
  //         show: false,
  //         itemObject: null,
  //         status: 1
  //       },
  //       mutliDisabeld: {
  //         name: 'mutliDisabeld',
  //         title: '批次停用',
  //         show: false,
  //         itemObject: null,
  //         status: 0
  //       }
  //     },
  //     other: {
  //       SelectAll: []
  //     },
  //     listLoading: false
  //   }
  // },
  // mounted() {
  //   this.dataBind()
  // },
  // methods: {
  //   formatter(row, column, cellValue, index) {
  //     var field = column.property
  //     if (field === 'IsValid') {
  //       if (cellValue === 1) {
  //         return '启用'
  //       } else {
  //         return '停用'
  //       }
  //     } else if (field === 'CreateDate') {
  //       return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
  //     } else if (field === 'ExpiredTime') {
  //       return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
  //     }
  //     return cellValue
  //   },
  //   dataBind() {
  //     if (this.createDateTime != null) {
  //       this.filter.CreateDate_Start = this.createDateTimeChange(
  //         this.createDateTime[0]
  //       )
  //       this.filter.CreateDate_End = this.createDateTimeChange(
  //         this.createDateTime[1]
  //       )
  //     } else {
  //       this.filter.CreateDate_Start = null
  //       this.filter.CreateDate_End = null
  //     }
  //     if (this.expiredTime != null) {
  //       this.filter.ExpiredTime_Start = this.createDateTimeChange(
  //         this.expiredTime[0]
  //       )
  //       this.filter.ExpiredTime_End = this.createDateTimeChange(
  //         this.expiredTime[1]
  //       )
  //     } else {
  //       this.filter.ExpiredTime_Start = null
  //       this.filter.ExpiredTime_End = null
  //     }
  //     this.listLoading = true
  //     setTimeout(() => {
  //       IpLimitService.getMany(this.filter).then(response => {
  //         this.sharedResponse(response, {
  //           useSuccessMessage: false,
  //           callback: () => {
  //             this.dataSource = response.data.Data
  //             this.recordCount = response.data.Pagination.TotalCount
  //             this.listLoading = false
  //           }
  //         })
  //       })
  //     }, 500)
  //   },
  //   openDialog(entry, action) {
  //     if (action === 'add') {
  //       this.dialog.add.show = true
  //     } else if (action === 'edit') {
  //       this.dialog.edit.show = true
  //       this.dialog.edit.itemObject = entry
  //     } else if (action === 'mutliEnabeld') {
  //       if (this.other.SelectAll.length < 2) {
  //         this.$message.error({
  //           message: `${this.$i18n.t('Message.noSelect')}`
  //         })
  //         return
  //       }
  //       this.dialog.mutliEnabeld.show = true
  //       this.dialog.mutliEnabeld.itemObject = this.other.SelectAll
  //       this.dialog.mutliEnabeld.status = 1
  //       this.dialog.mutliEnabeld.title = '批次启用'
  //     } else if (action === 'mutliDisabeld') {
  //       if (this.other.SelectAll.length < 2) {
  //         this.$message.error({
  //           message: `${this.$i18n.t('Message.noSelect')}`
  //         })
  //         return
  //       }
  //       this.dialog.mutliEnabeld.show = true
  //       this.dialog.mutliEnabeld.itemObject = this.other.SelectAll
  //       this.dialog.mutliEnabeld.status = 0
  //       this.dialog.mutliEnabeld.title = '批次停用'
  //     }
  //   },
  //   closeDialog(param) {
  //     let name = param[0]
  //     if (name === 'add') {
  //       this.dialog.add.show = false
  //       this.dataBind()
  //     } else if (name === 'edit') {
  //       this.dialog.edit.show = false
  //       this.dataBind()
  //     } else if (name === 'mutliEnabeld') {
  //       this.dialog.mutliEnabeld.show = false
  //       this.other.SelectAll = []
  //       this.dataBind()
  //     }
  //   },
  //   search() {
  //     this.filter.PageIndex = 1
  //     this.dataBind()
  //   },
  //   change(data) {
  //     this.filter.PageIndex = data.page
  //     this.dataBind()
  //   },
  //   delSingle(itemObject) {
  //     IpLimitService.delete({ IP: itemObject.IP, ExecutorID: 1 })
  //       .then(response => {
  //         if (!response.data.Success) {
  //           this.$message.error({
  //             message: `${this.$i18n.t('Message.' + response.data.Message)}(${
  //               response.data.Code
  //             })`
  //           })
  //           return
  //         }
  //         this.$message.success({
  //           message: this.$i18n.t('Message.Success')
  //         })
  //         this.dataBind()
  //       })
  //       .finally(() => {})
  //   },
  //   getExecutor(param) {
  //     this.filter.WebUser_ID = param[0]
  //   },
  //   getCheckBoxResult(param) {
  //     this.other.SelectAll = param
  //   }
  // }
}
</script>

<style scoped>
</style>
