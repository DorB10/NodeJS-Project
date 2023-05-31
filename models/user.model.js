const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: 'Require e-mail',
        unique: 'Such e-mail exist'
    },
    phone:{
        type: Schema.Types.String
    },
    password: { type: Schema.Types.String },
    isAdmin: { type: Schema.Types.Boolean },
    name: { type: Schema.Types.String }
}, { timestamps: { createAt: 'created_at' } });

module.exports = userSchema;