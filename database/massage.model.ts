import { Schema, models, model } from 'mongoose'

const MassageSchema = new Schema(
	{
		data: String,
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		course: { type: Schema.Types.ObjectId, ref: 'Course' },
	},
	{ timestamps: true }
)

const Massage = models.Massage || model('Massage', MassageSchema)
export default Massage
