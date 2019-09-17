import { expect, assert } from 'chai'
import { DropDownList, List, Result } from '@/models/SharedModel'
import UserService from '@/service/role'
import {
  RequestRoleGetMany,
  ResponseRoleGetMany
} from '@/views/role/model/RoleModel'
/**
 * 測試撈取使用者多筆
 */
describe('@/service/role.ts', () => {
  it('測試撈取角色多筆', () => {
    UserService.getMany(
      new RequestRoleGetMany({
        Status: -1,
        PageIndex: 1,
        PageSize: 10,
        ExecutorUser: 'Nick'
      })
    )
      .then(response => {
        if (response.data.Success && Object.is(response.status, 200)) {
          let result = new Result<Array<ResponseRoleGetMany>>(response.data)
          assert.equal(true, result.Success)
        }
      })
      .catch(error => {
        assert(false, error)
      })
  })
})
