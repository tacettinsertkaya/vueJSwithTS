class RoleFields {
  private fields: any
  constructor() {
    this.fields = [
      {
        name: 'RoleID',
        locale: '角色識別碼',
        show: true,
        permission: '',
        customField: false,
        memo: '角色識別碼'
      },
      {
        name: 'RoleCode',
        locale: '角色代碼',
        show: true,
        permission: '',
        customField: false,
        memo: '角色代碼'
      },
      {
        name: 'Status',
        locale: '狀態',
        show: true,
        permission: '',
        customField: false,
        memo: '狀態'
      },
      {
        name: 'RoleName',
        locale: '角色名稱',
        show: true,
        permission: '',
        customField: false,
        memo: '角色名稱'
      },
      {
        name: 'Description',
        locale: '說明',
        show: true,
        permission: '',
        customField: false,
        memo: '說明'
      },
      {
        name: 'Comment',
        locale: '註解',
        show: true,
        permission: '',
        customField: false,
        memo: '註解'
      }
    ]
  }
  getFields() {
    return this.fields
  }
}
export default RoleFields
