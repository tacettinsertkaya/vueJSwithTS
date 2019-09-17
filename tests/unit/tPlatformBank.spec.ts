import { expect, assert } from 'chai'
import { DropDownList, List, Result } from '@/models/SharedModel'
import UserService from '@/service/tPlatformBank'
import {
  RequestTPlatformBankGetMany,
  ResponseTPlatformBankGetMany
} from '@/views/tPlatformBank/model/TPlatformBankModel'
/**
 * 測試撈取三方平台銀行多筆
 */
describe('@/service/user.ts', () => {
  it('測試撈取三方平台銀行多筆', () => {
    UserService.getMany(
      new RequestTPlatformBankGetMany({
        TPlatformID: -1,
        BankID: -1,
        ThirdPartyBankCode: '',
        PageIndex: 1,
        PageSize: 10,
        ExecutorUser: 'Nick'
      })
    )
      .then(response => {
        let result = new Result<Array<ResponseTPlatformBankGetMany>>(
          response.data
        )
        assert.equal(true, result.Success)
      })
      .catch(error => {
        assert(false, error)
      })
  })
})
