import express from "express";
import Order from "../model/orderModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    if (request.body.orders.length === 0) {
      // 400 => because its client verificaton error
      response.status(400).send({ message: "Cart is empty" });
    } else {
      const order = await new Order({
        orderItems: request.body.orders,
        shippingAddress: {
          firstName: request.user.firstName,
          lastName: request.user.lastName,
          email: request.user.email,
          address: request.user.address,
          city: request.user.city,
          state: request.user.state,
          pin: request.user.pin,
        },
        // paymentMethod: request.body.paymentMethod,
        orderTotal: request.body.orderTotal,
        user: request.user._id,
      });
      const createdOrder = await order.save();
      response.status(201).send({ order: createdOrder });
    }
  })
);

orderRouter.post(
  "/userOrders",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const order = await Order.find({ user: request.user._id }).sort({
      createdAt: -1,
    });
    if (!order) {
      response.status(400).send({ message: "No orders yet" });
    } else {
      response.status(201).send({ order });
    }
  })
);

orderRouter.get(
  "/seed",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (request, response) => {
    const createdOrders = await Order.find({}).sort({ createdAt: -1 });
    console.log("createdOrders 💟 💟 💟 💟 ", createdOrders);
    response.send(createdOrders);
  })
);

orderRouter.get(
  "/:id",
  expressAsyncHandler(async (request, response) => {
    const userOrder = await Order.findById(request.params.id);
    if (userOrder) {
      response.send(userOrder);
    } else {
      response.status(404).send({ message: "Order Not Found" });
    }
  })
);

export default orderRouter;
