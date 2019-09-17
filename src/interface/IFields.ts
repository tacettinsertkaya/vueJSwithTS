/**
 * @param {string} name - 欄位名稱
 * @param {string} locale - 翻譯
 * @param {boolean} show - 是否顯示此欄位
 * @param {string} permission - 是否加入權限
 * @param {boolean} customField - 是否客製化蘭萬
 * @param {string} memo - 註解
 */
interface IFields {
  name: string
  locale: string
  show: boolean
  permission: string
  customField: boolean
  memo: string
}

export default IFields
