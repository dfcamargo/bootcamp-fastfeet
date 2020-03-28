import mongoose from 'mongoose';

const DeliveryProblem = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    order_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('delivery_problem', DeliveryProblem);
