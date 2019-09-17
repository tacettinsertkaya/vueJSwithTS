class Pagination {
  PageIndex!: number
  PageSize!: number
  TotalCount!: number
  PageCount!: number
  constructor() {}
}
class Result<T> {
  Success: boolean
  Code: string
  Message: string
  ErrorMessage: string
  Data: T
  ExtensionData: any
  Pagination: Pagination
  Exception: any
  constructor(options: Result<T>) {
    this.Success = options.Success
    this.Code = options.Code
    this.Message = options.Message
    this.ErrorMessage = options.ErrorMessage
    this.Data = options.Data
    this.ExtensionData = options.ExtensionData
    this.Pagination = options.Pagination
    this.Exception = options.Exception
  }
}

export default Result
