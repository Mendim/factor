import fs from "fs"
import { deepMerge } from "@factor/api/utils"
import { getPath } from "@factor/api/paths"

export const configSettings = (): object => {
  const cwd = process.env.FACTOR_CWD || process.cwd()

  const configFile = getPath(`config-file-public`)

  const config = fs.existsSync(configFile) ? require(configFile) : {}

  const { factor = {}, ...rest } = require(`${cwd}/package.json`)

  return deepMerge([{ package: rest }, factor, config])
}