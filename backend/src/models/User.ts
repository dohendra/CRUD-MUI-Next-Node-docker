import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  user: string;
  interest: string[];
  age: number;
  mobile: number;
  email: string;
}

const UserSchema: Schema = new Schema({
  user: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  interest: {
    type: [String],
    required: [true, 'At least one interest is required']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative']
  },
  mobile: {
    type: Number,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: function(v: number) {
        return v.toString().length >= 10;
      },
      message: 'Mobile number must be at least 10 digits'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 