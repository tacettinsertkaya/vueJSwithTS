class List<T> {
  private items: Array<T>

  constructor() {
    this.items = []
  }

  size(): number {
    return this.items.length
  }

  add(value: T): void {
    this.items.push(value)
  }

  get(index: number): T {
    return this.items[index]
  }

  ToArray() {
    let array: any = []
    this.items.forEach(e => {
      array.push(e)
    })
    return array
  }
}
export default List
