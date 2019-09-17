import { expect, assert } from 'chai'
import { DropDownList, List, Result } from '@/models/SharedModel'
import MenuService from '@/service/menu'
import {
  RequestMenuGetMany,
  ResponseMenuGetMany
} from '@/views/menu/model/MenuModel'
/**
 * 測試撈取選單多筆
 */
describe('@/service/menu.ts', () => {
  it('測試撈取選單多筆', () => {
    MenuService.getMany(
      new RequestMenuGetMany({
        ParentMenuID: -1,
        MenuType: -1,
        MenuKeyword: '',
        PageIndex: 1,
        PageSize: 10,
        ExecutorUser: 'Nick'
      })
    )
      .then(response => {
        let result = new Result<Array<ResponseMenuGetMany>>(response.data)
        assert.equal(true, result.Success)
      })
      .catch(error => {
        assert(false, error)
      })
  })
})
