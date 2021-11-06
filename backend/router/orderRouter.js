import express from "express";
import Order from "../model/orderModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (request, response) => {
    if (request.body.orders.length === 0) {
      response.status(400).send({ message: "Cart is empty" });
    } else {
      const newOrder = new Order({
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
        orderTotal: request.body.orderTotal,
        user: request.user._id,
      });

      // const createdOrder = await
      newOrder
        .save()
        .then((result) => {
          response.status(201).send(result);
        })
        .catch((error) => {
          response.status(400).send({ message: error });
        });
    }

    // response.status(201).send(createdOrder);
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

    response.send(createdOrders);
  })
);

orderRouter.put(
  "/edit/:orderId",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (request, response) => {
    const changeOrder = await Order.findById(request.params.orderId);
    if (changeOrder) {
      changeOrder.isPaid = request.body.selectedPaymentValue;
      changeOrder.isDelivered = request.body.selectedDeliveryValue;
      changeOrder.orderTotal = request.body.orderTotalValue;
      changeOrder.deliveredAt = Date.now();

      const updatedOrder = await changeOrder.save();

      response.send(updatedOrder);
    } else {
      response.status(404).send({ message: "Order to be changed not found" });
    }

    // response.send(orderId);
  })
);

orderRouter.delete(
  "/deleteOrder/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (request, response) => {
    const orderToDelete = await Order.findById(request.params.id);
    if (orderToDelete) {
      const orderDeleted = await orderToDelete.remove();
      response.status(201).send(orderDeleted);
    } else {
      response.status(404).send({ message: "Order to be deleted not found" });
    }
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
