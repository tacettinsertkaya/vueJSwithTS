// 后台 Controller : RoleController
import axios from 'axios'
import {
  RequestRoleGet,
  RequestRoleGetMany,
  RequestRoleAdd,
  RequestRoleEdit,
  RequestRolePermissionGetMany,
  RequestRolePermissionMerge
} from '@/views/role/model/RoleModel'

export default {
  get(data: RequestRoleGet) {
    return axios.post('/API/Role/GetAsync', data)
  },
  getMany(data: RequestRoleGetMany) {
    return axios.post('/API/Role/GetManyAsync', data)
  },
  add(data: RequestRoleAdd) {
    return axios.post('/API/Role/AddAsync', data)
  },
  edit(data: RequestRoleEdit) {
    return axios.post('/API/Role/EditAsync', data)
  },
  getPermission(data: RequestRolePermissionGetMany) {
    return axios.post('/API/RolePermission/GetManyByRolePermissionAsync', data)
  },
  merge(data: RequestRolePermissionMerge) {
    return axios.post('/API/RolePermission/MergeAsync', data)
  }
}
