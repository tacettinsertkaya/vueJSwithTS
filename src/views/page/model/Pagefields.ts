class MenuFields {
  private fields: any
  constructor() {
    this.fields = [
      {
        name: 'MenuID',
        locale: '選單編號',
        show: true,
        permission: '',
        customField: false,
        memo: '選單編號'
      },
      {
        name: 'ParentMenuID',
        locale: '父選單編號',
        show: true,
        permission: '',
        customField: false,
        memo: '父選單'
      },
      {
        name: 'MenuName',
        locale: '選單名稱',
        show: true,
        permission: '',
        customField: false,
        memo: '選單名稱'
      },
      {
        name: 'MenuKeyword',
        locale: '關鍵字',
        show: true,
        permission: '',
        customField: false,
        memo: '關鍵字'
      },
      {
        name: 'Sequence',
        locale: '順序',
        show: true,
        permission: '',
        customField: false,
        memo: '順序'
      },
      {
        name: 'MenuLevel',
        locale: '層級',
        show: true,
        permission: '',
        customField: false,
        memo: '層級'
      },
      {
        name: 'Description',
        locale: '選單說明',
        show: true,
        permission: '',
        customField: false,
        memo: '選單說明'
      },
      {
        name: 'Comment',
        locale: '選單註解',
        show: true,
        permission: '',
        customField: false,
        memo: '選單註解'
      },
      {
        name: 'CreateUser',
        locale: '建立者',
        show: true,
        permission: '',
        customField: false,
        memo: '建立者'
      },
      {
        name: 'CreateDateTime',
        locale: '建立時間',
        show: true,
        permission: '',
        customField: false,
        memo: '建立時間'
      },
      {
        name: 'UpdateUser',
        locale: '更新者',
        show: true,
        permission: '',
        customField: false,
        memo: '更新者'
      },
      {
        name: 'UpdateDateTime',
        locale: '更新時間',
        show: true,
        permission: '',
        customField: false,
        memo: '更新時間'
      }
    ]
  }
  getFields() {
    return this.fields
  }
}
export default MenuFields
