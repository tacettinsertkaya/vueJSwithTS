import { expect, assert } from 'chai'
import { DropDownList, List, Result } from '@/models/SharedModel'
import UserService from '@/service/user'
import {
  RequestUserGetMany,
  ResponseUserGetMany
} from '@/views/user/model/UserModel'
/**
 * 測試撈取使用者多筆
 */
describe('@/service/user.ts', () => {
  it('測試撈取使用者多筆', () => {
    UserService.getMany(
      new RequestUserGetMany({
        ParentAccount: '',
        Account: '',
        RoleID: -1,
        Status: -1,
        Name: '',
        Approve: -1,
        Authenticator: -1,
        DateTimeType: 2,
        DateTimeStart: null,
        DateTimeEnd: null,
        PageIndex: 1,
        PageSize: 10,
        ExecutorUser: 'Nick'
      })
    )
      .then(response => {
        let result = new Result<Array<ResponseUserGetMany>>(response.data)
        assert.equal(true, result.Success)
      })
      .catch(error => {
        assert(false, error)
      })
  })
})
