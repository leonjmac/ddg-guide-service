import dotenv from 'dotenv'
import { App } from './src/App'
import { AppLogger, AppLoggerLevel } from '@dev-doc-guide/shared/src/middlewares/app-logger'
import { attemptDatabaseConnection } from '@dev-doc-guide/shared/src/middlewares/database-connector'

const init = async () => {
  dotenv.config({
    path: process.env.NODE_ENV == 'sandbox' ? '.env' : '.env'
  })

  await attemptDatabaseConnection()
  .then(() => {
    App.listen(process.env.PORT, () => {
      AppLogger(process.env.APP_NAME || `guides-services`, AppLoggerLevel.info).log({
        level: AppLoggerLevel.info,
        message: `${process.env.APP_NAME} is running on port ${process.env.PORT}`
      })
    })
  })
  .catch((err) => {
  })
}

init()