/**
 * request model
 */
import RequestRoleAdd from '@/domain/request/role/RequestRoleAdd'
import RequestRoleGet from '@/domain/request/role/RequestRoleGet'
import RequestRoleEdit from '@/domain/request/role/RequestRoleEdit'
import RequestRoleGetMany from '@/domain/request/role/RequestRoleGetMany'
import RequestRolePermissionGetMany from '@/domain/request/role/RequestRolePermissionGetMany'
import RequestRolePermissionMerge from '@/domain/request/role/RequestRolePermissionMerge'
//= =============================================================================
/**
 * response model
 */
import ResponseRoleGetMany from '@/domain/response/role/ResponseRoleGetMany'
import ResponseRoleGet from '@/domain/response/role/ResponseRoleGet'
import ResponseRolePermissionGetMany from '@/domain/response/role/ResponseRolePermissionGetMany'
export {
  RequestRoleAdd,
  RequestRoleGet,
  RequestRoleEdit,
  RequestRoleGetMany,
  ResponseRoleGetMany,
  ResponseRoleGet,
  RequestRolePermissionGetMany,
  ResponseRolePermissionGetMany,
  RequestRolePermissionMerge
}
