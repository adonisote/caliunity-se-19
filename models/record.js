import mongoose from 'mongoose'

const logbookSchema = new mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  duration: { type: Number, required: true },
  type: { type: String, required: true },
  phase: { type: String, required: true },
  exercises: [mongoose.Schema.Types.Mixed],
  equipment: [String]
})

const Record = mongoose.model('Record', logbookSchema)

export default Record