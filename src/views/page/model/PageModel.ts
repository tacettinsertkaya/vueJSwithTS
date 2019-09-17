// request model
/**
 * 頁面-多筆
 */
import RequestPageGetMany from '@/domain/request/page/RequestPageGetMany'
/**
 * 頁面-單筆
 */
import RequestPageGet from '@/domain/request/page/RequestPageGet'
/**
 * 頁面-新增
 */
import RequestPageAdd from '@/domain/request/page/RequestPageAdd'
/**
 * 頁面-編輯
 */
import RequestPageEdit from '@/domain/request/page/RequestPageEdit'
/**
 * 頁面-刪除
 */
import RequestPageDelete from '@/domain/request/page/RequestPageDelete'
// =================================================================================================
// response model
/**
 * 頁面-單筆
 */
import ResponsePageGet from '@/domain/response/page/ResponsePageGet'
/**
 * 頁面-多筆
 */
import ResponsePageGetMany from '@/domain/response/page/ResponsePageGetMany'

export {
  RequestPageGetMany,
  RequestPageGet,
  RequestPageAdd,
  RequestPageEdit,
  RequestPageDelete,
  ResponsePageGet,
  ResponsePageGetMany
}
