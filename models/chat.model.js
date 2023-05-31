const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({
    from: {
        type: Schema.Types.String
    },
    message:{
        type: Schema.Types.String
    },
    to:{
        type: Schema.Types.String
    }
  
}, { timestamps: { createAt: 'created_at' } });

module.exports = chatSchema;