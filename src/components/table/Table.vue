<template>
  <div>
    <slot name="MutiTemplete"></slot>
    <el-table
      ref="multipleTable"
      :stripe="false"
      :fit="true"
      :size="'medium'"
      :data="dataSource"
      :border="isBorder"
      style="width: 100%"
      :empty-text="emptyText"
      :highlight-current-row="true"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        :align="align"
        v-if="isMutiCheckBox"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        :resizable="false"
        min-width="150"
        :show-overflow-tooltip="true"
        :align="align"
        :key="item.key"
        v-for="item in fields"
        :prop="item.name"
        :label="$t(item.locale)"
        v-if="item.show && hasPermission(item.permission)"
        :formatter="formatter"
      >
        <template slot-scope="scope">
          <div v-if="item.customField">
            <slot
              :name="item.name"
              :entry="scope"
            ></slot>
          </div>
          <div v-else>
            <span>{{formatter(scope.row,scope.column,scope.row[scope.column.property],scope.$index)}}</span>
          </div>
        </template>
      </el-table-column>

      <slot
        name="operator"
        v-if="isOperatorShow"
      ></slot>
      <slot
        name="other"
        v-if="isOtherShow"
      ></slot>
    </el-table>
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

@Component({
  name: 'Table'
})
export default class Table extends Vue {
  @Prop({ default: null }) dataSource: any
  @Prop({ default: null }) fields: any
  @Prop({ default: false }) isMutiCheckBox!: boolean
  @Prop({ default: null }) isBorder!: boolean
  @Prop({ default: 'center' }) align!: string
  @Prop({ default: null }) formatter: any
  @Prop({ default: false }) isOperatorShow!: boolean
  @Prop({ default: false }) isOtherShow!: boolean
  @Prop({ default: null }) tableRowClassName: any

  emptyText = this.$store.getters['locale'] === 'zh-CN' ? '暂无数据' : 'No Data'

  handleSelectionChange(this: any, val: any) {
    // 有checkbox 时 勾选回传的Object
    this.$emit('getCheckBoxResult', val)
  }
  toggleSelection(this: any, rows: any) {
    if (rows && rows.length > 0 && rows !== undefined && rows !== null) {
      // 勾选当前rows阵列有的
      rows.forEach((row: any) => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    } else {
      // 清除
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>
<style>
.el-table th {
  color: black;
}
/* .el-table tr:nth-child(even) {
  background: #f0f3f5;
} */
.el-table .success-row {
  background: #82e64c;
}
.el-table .warning-row {
  background: rgb(250, 205, 121);
}
.el-table .error-row {
  background: #ff8888;
  color: black;
}
</style>
