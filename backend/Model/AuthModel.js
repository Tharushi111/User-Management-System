import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
    match: [/^[A-Za-z ]+$/, 'Only letters allowed in name']
  },
  gmail: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Password must be at least 6 characters']
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
