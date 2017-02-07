import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const pollSchema = Schema({
    name: String,
    options: [{type: Schema.Types.ObjectId, ref: 'Option'}]
});

const Poll = mongoose.Model('Poll', schema);

export default Poll; 