import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const optionSchema = Schema({
    name: String,
    votes: Number
});

const Option = mongoose.Model('Option', optionSchema);

export default Option;