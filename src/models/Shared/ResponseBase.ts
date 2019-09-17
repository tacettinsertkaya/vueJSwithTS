interface IResponseBase {
  RowNum: number // 行數
  CreateDateTime: Date // 建立日期時間
  CreateUser: string // 建立使用者
  UpdateDateTime: Date // 修改日期時間
  UpdateUser: string // 修改使用者
}

class ResponseBase implements IResponseBase {
  RowNum!: number
  CreateDateTime!: Date
  CreateUser!: string
  UpdateDateTime!: Date
  UpdateUser!: string
}

export default ResponseBase
