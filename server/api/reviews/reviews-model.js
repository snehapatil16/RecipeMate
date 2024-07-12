import mongoose from 'mongoose';

const ReviewsSchema = new mongoose.Schema( {
    description: {type: String, required: true},
    rating: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    user: {type: String, required: true},
});
const Reviews = mongoose.model('Reviews', ReviewsSchema);
export {Reviews};
