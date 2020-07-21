export class Snapshot {
  values: string[]
  isFristColumn = true
  isLastColumn = false
  isLastRow = false

  reset(): void {
    this.values = []
  }

  setValues(values: string[]): void {
    this.values = values
  }
}
