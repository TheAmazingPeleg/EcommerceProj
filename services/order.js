const Order = require("../models/order");

const getOrderById = async (id) => {
    let order = await Order.findOne({ _id: id });
    return order;
};
const getOrdersByUserId = async (id) => {
    let order = await Order.find({ userId: id });
    return order;
};
const createOrder = async (userId, firstName, lastName, address, city, country, zip, cart, status, cost) => {
    const order = new Order({userId, firstName, lastName, address, city, country, zip, cart, status, cost});
    await order.save();
    return order;
};
  
const getOrders = async (options = {}) => {
    const orders = await Order.find(options);
    return orders;
};
  
const updateOrder = async (id, newOrder) => {
    const order = await Order.findByIdAndUpdate(id, newOrder, {
        new: true,
        runValidators: true,
    });
    return order;
}
  
const deleteOrder = async (id) => {
    const order = await Order.findByIdAndDelete(id);
    return order;
}

module.exports = {
    getOrderById,
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    getOrdersByUserId
};