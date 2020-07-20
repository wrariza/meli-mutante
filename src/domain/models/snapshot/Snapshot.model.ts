export class Snapshot {
  values: string[]
  isFristColumn = true
  isLastColumn = false

  reset(): void {
    this.values = []
  }

  setValues(values: string[]): void {
    this.values = values
  }
}
