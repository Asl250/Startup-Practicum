import { model, models, Schema } from 'mongoose'

const UserSchema = new Schema(
	{
		fullName: {type: String},
		email: {type: String},
		picture: {type: String},
		clerkId: {type: String},
	},
	{timestamps: true}
)

const User = models.User || model('User', UserSchema)
export default User
