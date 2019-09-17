<template>
  <div class="service-parameter-wrapper">
    <div class="table table-bordered table-striped">
      <div class="thead">
        <div class="tr">
          <div class="th">選單API操作</div>
          <div class="th">選單API關鍵字</div>
          <div class="th">選單API網址</div>
          <div class="th">選單API名稱</div>
          <div class="th">{{ $t("Shared.operator") }}</div>
        </div>
      </div>
      <div class="tbody">
        <div
          class="tr"
          v-for="(entry, index) in parameterDataSource"
        >
          <div
            class="td"
            data-th="選單API操作"
          >
            <el-select
              v-model="parameterDataSource[index].MenuAPIOperational"
              filterable
              placeholder="請選擇"
            >
              <el-option
                :value="-1"
                :label="$t('Shared.pleaseChoose')"
              ></el-option>
              <el-option
                v-for="item in OperationalDataSource"
                :key="item.Value"
                :label="item.Text"
                :value="item.Value"
              ></el-option>
            </el-select>
          </div>
          <div
            class="td"
            data-th="選單API關鍵字"
          >
            <input
              type="text"
              class="form-control"
              v-model="parameterDataSource[index].MenuAPIKeyword"
            />
          </div>
          <div
            class="td"
            data-th="選單API網址"
          >
            <input
              type="text"
              class="form-control"
              v-model="parameterDataSource[index].MenuAPIUrl"
            />
          </div>
          <div
            class="td"
            data-th="選單API名稱"
          >
            <input
              type="text"
              class="form-control"
              v-model="parameterDataSource[index].MenuAPIName"
            />
          </div>
          <div
            class="td"
            data-th="Setting"
          >
            <button
              class="btn btn-sm btn-danger"
              @click.prevent.stop="removeParameter(index)"
            >{{ $t("Shared.delete") }}</button>
          </div>
        </div>
      </div>
    </div>

    <button
      class="btn btn-sm btn-primary"
      @click.prevent.stop="addParameter()"
    >{{ $t("Shared.add") }}</button>
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

// 下拉式公用服務
import DropDownService from '@/service/dropDown'
// 共用模組
import { DropDownList, Result } from '@/models/SharedModel'

@Component({
  name: 'serviceParameter',
  components: {}
})
export default class ServiceParameter extends Vue {
  // v-model 預設值 雙向綁定
  @Prop() value: any
  parameterDataSource: any = [] // 參數資料來源

  parameter: any = {}
  OperationalDataSource = new Array<DropDownList<number>>()

  created() {
    // 取得下拉式選單的資料
    this.getOperational()
  }
  mounted(this: any) {}
  getOperational() {
    DropDownService.getMenuAPIOperationalDDL().then((response: any) => {
      if (response.data.Success && Object.is(response.status, 200)) {
        let result = new Result<Array<DropDownList<number>>>(response.data)
        this.OperationalDataSource = result.Data
      }
    })
  }
  addParameter(this: any) {
    this.parameterDataSource.push({
      MenuAPIOperational: -1,
      MenuAPIKeyword: '',
      MenuAPIUrl: '',
      MenuAPIName: ''
    })
  }
  removeParameter(this: any, index: number) {
    this.parameterDataSource.splice(index, 1)
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (!Object.is(newValue, oldValue) && this.value) {
      this.parameterDataSource = this.value
    }
  }

  @Watch('parameterDataSource', { deep: true })
  onParameterDataSource(newValue, oldValue) {
    this.onChange()
  }

  @Emit('Result')
  onChange() {
    return this.parameterDataSource
  }
}
</script>

<style lang="scss" type="text/scss">
@import './ServiceParameter.scss';
</style>
