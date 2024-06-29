import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    phone: number;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true }
}, {
    timestamps: true
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;