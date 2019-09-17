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
      :label="formatter(item.Text) "
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
import RequestTPlatformDDL from '@/domain/request/dropdown/RequestTPlatformDDL'
import { Result } from '@/models/SharedModel'
import ResponseDropDownList from '@/models/Shared/ResponseDropDownList'
@Component({
  name: 'TPlatformSelectInput'
})
export default class TPlatformSelectInput extends Vue {
  @Prop({ default: -1, required: false }) defaultValue!: number
  @Prop({ default: false, required: false }) disabled!: boolean
  dataSource = []
  isLoading = false
  selectValue = -1
  requestTPlatformDDL = new RequestTPlatformDDL({
    Status: -1
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
  formatter(this: any, item) {
    return this.LanguageRecon(this.$store.getters['locale'], JSON.parse(item))
  }
  dataBind(this: any) {
    DropDownService.getTPlatformDDL(this.requestTPlatformDDL)
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
