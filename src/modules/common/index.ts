import { loadFilesSync } from '@graphql-tools/load-files'
import { createModule, Module } from 'graphql-modules'
import { join } from 'path'

export const CommonModule: Module = createModule({
  id: 'common',
  dirname: __dirname,
  typeDefs: loadFilesSync(join(__dirname, './schema/*.graphql'), { useRequire: true }),
})
