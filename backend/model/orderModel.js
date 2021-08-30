import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        alt: { type: String, required: true },
        price: {
          type: Number,
          required: true,
          // lower: { type: Number, required: true },
          // upper: { type: Number, required: false },
        },
        countInStock: { type: Number, required: true },
        // product: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Product",
        //   required: true,
        // },
      },
    ],

    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: false },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pin: { type: Number },
    },

    // paymentMethod: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
