import { mongoose } from '@dev-doc-guide/shared/dist/middlewares/database-connector'
import { AppLogger, AppLoggerLevel } from '@dev-doc-guide/shared/dist/middlewares/app-logger'
import { IDevGuideElement } from '@dev-doc-guide/shared/dist/types/devGuideElements/IDevGuideElement'

interface DevGuideElementAttrs extends IDevGuideElement {}

interface DevGuideElementModel extends mongoose.Model<DevGuideElementDoc> {
  build(attrs: DevGuideElementAttrs): DevGuideElementDoc
}

export interface DevGuideElementDoc extends mongoose.Document {}

const DevGuideElementSchema = new mongoose.Schema({
  // Add the properties from the IDevGuideElement interface here
  title: {
    type: Object,
    required: true
  },
  subtitle: {
    type: Object,
    required: false
  },
  content: {
    type: Object,
    required: true
  }
})

DevGuideElementSchema.statics.build = (attrs: DevGuideElementAttrs) => {
  return new DevGuideElement(attrs)
}

DevGuideElementSchema.pre('save', async function (done) {
  AppLogger('DevGuideElement', AppLoggerLevel.info).log(AppLoggerLevel.info, 'DevGuideElement saved')
  done()
})

const DevGuideElement = mongoose.model<DevGuideElementDoc, DevGuideElementModel>('DevGuideElement', DevGuideElementSchema)

export default DevGuideElement
