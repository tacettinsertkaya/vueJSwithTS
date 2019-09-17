class UserFields {
  private fields: any
  constructor() {
    this.fields = [
      {
        name: 'UserID',
        locale: '使用者識別碼',
        show: true,
        permission: '',
        customField: false,
        memo: '使用者識別碼'
      },
      {
        name: 'ParentUserID',
        locale: '父使用者識別碼',
        show: true,
        permission: '',
        customField: false,
        memo: '父使用者識別碼'
      },
      {
        name: 'ParentAccount',
        locale: '父帳號',
        show: true,
        permission: '',
        customField: false,
        memo: '父帳號'
      },
      {
        name: 'Account',
        locale: '帳號',
        show: true,
        permission: '',
        customField: false,
        memo: '帳號'
      },
      {
        name: 'RoleID',
        locale: '角色識別碼',
        show: true,
        permission: '',
        customField: false,
        memo: '角色識別碼'
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
        name: 'Status',
        locale: '狀態',
        show: true,
        permission: '',
        customField: false,
        memo: '狀態'
      },
      {
        name: 'Name',
        locale: '使用者名稱',
        show: true,
        permission: '',
        customField: false,
        memo: '使用者名稱'
      },
      {
        name: 'Approve',
        locale: '認證狀態',
        show: true,
        permission: '',
        customField: false,
        memo: '認證狀態'
      },
      {
        name: 'Authenticator',
        locale: '驗證器',
        show: true,
        permission: '',
        customField: false,
        memo: '驗證器'
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
export default UserFields
