const ROW_DELIMITER = '\n'
const COLUMN_DELIMITER = '","'

export type ObjectItem = {
  [name: string]: any
}

// CSV util to parse a string into an JS object.
class CsvUtil {
  static csvStringToObjects(csv: string): Array<ObjectItem> {
    const res: Array<ObjectItem> = []

    const sanitize = (val: string): string => {
      if (val[0] === '"' && val[val.length - 1] === '"') {
        return val.substr(1, val.length - 2)
      }

      return val
    }

    const lines: Array<any> = csv.split(ROW_DELIMITER)
    const keys: Array<string> = lines[0].substring(1, lines[0].length - 1).split(COLUMN_DELIMITER)

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].substring(1, lines[i].length - 1).split(COLUMN_DELIMITER)
      const item: any = {}

      for (const k in keys) {
        const key = sanitize(keys[k]).toLowerCase()
        item[key] = sanitize(line[k])
      }

      res.push(item)
    }

    return res
  }
}

export default CsvUtil
