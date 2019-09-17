/**
 * 下拉 - 自訂義
 */
class ResponseDropDownList<T> {
  Text: string
  Value: T
  Description: string
  /**
   *
   * @param options 下拉 - 自訂義
   * {
   * Text 名稱
   * Value 值
   * Description 描述
   * }
   */
  constructor(options: ResponseDropDownList<T>) {
    this.Text = options.Text
    this.Value = options.Value
    this.Description = options.Description
  }
}

export default ResponseDropDownList
