const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
