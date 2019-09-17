<template>
  <el-select
    v-model="selectValue"
    filterable
    placeholder="請選擇"
    v-loading="isLoading"
    @change="selectChange"
    @clear="clearChange"
    clearable
    :disabled="disabled"
  >
    <el-option
      :value="-1"
      :label="$t('Shared.pleaseChoose')"
    ></el-option>
    <el-option
      v-for="item in dataSource"
      :key="item.Value"
      :label="item.Text"
      :value="item.Value"
    ></el-option>
  </el-select>
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

// 下拉式服務
import DropDownService from '@/service/dropDown'
import RequestRoleDDL from '@/domain/request/dropdown/RequestRoleDDL'
import { Result } from '@/models/SharedModel'
import ResponseDropDownList from '@/models/Shared/ResponseDropDownList'
@Component({
  name: 'RoleSelectInput'
})
export default class RoleSelectInput extends Vue {
  @Prop({ default: -1, required: false }) defaultValue!: number
  @Prop({ default: false, required: false }) disabled!: boolean
  dataSource = []
  isLoading = false
  selectValue = -1
  requestRoleDDL = new RequestRoleDDL({
    Status: -1,
    FilterRole: true
  })
  mounted() {
    this.isLoading = true
    this.dataBind()
  }
  @Emit('getResult')
  selectChange() {
    if (this.selectValue) {
      return [this.selectValue]
    } else {
      return [-1]
    }
  }
  @Emit('getResult')
  clearChange() {
    return [-1]
  }
  setInit(value: number) {
    this.selectValue = value
  }
  dataBind(this: any) {
    DropDownService.getRoleDDL(this.requestRoleDDL)
      .then((response: any) => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<Array<ResponseDropDownList<number>>>(
            response.data
          )

          this.dataSource = result.Data
        }
        this.isLoading = false
        if (this.defaultValue !== -1) {
          this.selectValue = this.defaultValue
        }
      })
      .catch((error: any) => {
        console.log('撈取RoleSelectInput發生例外', error)
        this.listLoading = false
      })
  }
}
</script>

<style lang="scss" scoped>
</style>
