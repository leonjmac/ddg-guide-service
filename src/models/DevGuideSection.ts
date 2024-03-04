import { mongoose } from '@dev-doc-guide/shared/dist/middlewares/database-connector'
import { AppLogger, AppLoggerLevel } from '@dev-doc-guide/shared/dist/middlewares/app-logger'
import { IDevGuideSection } from '@dev-doc-guide/shared/dist/types/devGuideElements/IDevGuideSection'

interface DevGuideSectionAttrs extends IDevGuideSection {}

interface DevGuideSectionModel extends mongoose.Model<DevGuideSectionDoc> {
  build(attrs: DevGuideSectionAttrs): DevGuideSectionDoc
}

export interface DevGuideSectionDoc extends mongoose.Document {}

const DevGuideSectionSchema = new mongoose.Schema({
  title: {
    type: Object,
    required: true
  },
  subtitle: {
    type: Object,
    required: false
  },
  sections: {
    type: Array,
    required: false
  },
  elements: {
    type: Array,
    required: false
  }
})

DevGuideSectionSchema.statics.build = (attrs: DevGuideSectionAttrs) => {
  return new DevGuideSection(attrs)
}

DevGuideSectionSchema.pre('save', async function (done) {
  AppLogger('DevGuideSection', AppLoggerLevel.info).log(AppLoggerLevel.info, 'DevGuideSection saved')
  done()
})

const DevGuideSection = mongoose.model<DevGuideSectionDoc, DevGuideSectionModel>('DevGuideSection', DevGuideSectionSchema)

export default DevGuideSection
