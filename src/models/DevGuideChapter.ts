import { mongoose } from '@dev-doc-guide/shared/dist/middlewares/database-connector'
import { AppLogger, AppLoggerLevel } from '@dev-doc-guide/shared/dist/middlewares/app-logger'
import { IDevGuideChapter } from '@dev-doc-guide/shared/dist/types/devGuideElements/IDevGuideChapter'
import e from 'express'

interface DevGuideChapterAttrs extends IDevGuideChapter {}

interface DevGuideChapterModel extends mongoose.Model<DevGuideChapterDoc> {
  build(attrs: DevGuideChapterAttrs): DevGuideChapterDoc
}

export interface DevGuideChapterDoc extends mongoose.Document {}

const DevGuideChapterSchema = new mongoose.Schema({
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
  }  
})

DevGuideChapterSchema.statics.build = (attrs: DevGuideChapterAttrs) => {
  return new DevGuideChapter(attrs)
}

DevGuideChapterSchema.pre('save', async function (done) {
  AppLogger('DevGuideChapter', AppLoggerLevel.info).log(AppLoggerLevel.info, 'DevGuideChapter saved')
  done()
})

const DevGuideChapter = mongoose.model<DevGuideChapterDoc, DevGuideChapterModel>('DevGuideChapter', DevGuideChapterSchema)

export default DevGuideChapter
