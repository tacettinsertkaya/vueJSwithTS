// request model
/**
 * 選單-多筆
 */
import RequestMenuGetMany from '@/domain/request/menu/RequestMenuGetMany'
/**
 * 選單-單筆
 */
import RequestMenuGet from '@/domain/request/menu/RequestMenuGet'
/**
 * 選單-新增
 */
import RequestMenuAdd from '@/domain/request/menu/RequestMenuAdd'
/**
 * 選單-編輯
 */
import RequestMenuEdit from '@/domain/request/menu/RequestMenuEdit'
/**
 * 選單-刪除
 */
import RequestMenuDelete from '@/domain/request/menu/RequestMenuDelete'
// =================================================================================================
// response model
/**
 * 選單-單筆
 */
import ResponseMenuGet from '@/domain/response/menu/ResponseMenuGet'
/**
 * 選單-多筆
 */
import ResponseMenuGetMany from '@/domain/response/menu/ResponseMenuGetMany'

export {
  RequestMenuGetMany,
  RequestMenuGet,
  RequestMenuAdd,
  RequestMenuEdit,
  RequestMenuDelete,
  ResponseMenuGet,
  ResponseMenuGetMany
}
