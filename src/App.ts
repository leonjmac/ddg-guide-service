import express from 'express'
import 'express-async-errors'

import cors from 'cors'
import { json } from 'body-parser'

import { errorHandler } from '@dev-doc-guide/shared/src/middlewares/error-handler'
import { InvalidRouteError } from '@dev-doc-guide/shared/src/classes/errors/InvalidRouteError'

const app = express()
app.use(cors())
app.use(json())

app.all('*', async () => {
  throw new InvalidRouteError()
})

app.use(errorHandler)

export { app as App }
