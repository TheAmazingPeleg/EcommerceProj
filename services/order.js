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

const aggregateLast5Weeks = async () => {
    const pipeline = [
        {
            $project: {
                week: { $isoWeek: "$date" },
                orderAmount: "$cost"
            }
        },
        {
            $group: {
                _id: "$week",
                ordersAmount: { $sum: 1 }, // Count the number of orders per week
                totalAmount: { $sum: "$orderAmount" }
            }
        },
        {
            $sort: { _id: -1 }
        },
        {
            $limit: 5
        }
    ];

    const result = await Order.aggregate(pipeline);
    const weeks = [];
    result.forEach(doc => {
        const week = {
            id: doc._id,
            value: doc.ordersAmount,
            region: "Week #"+ doc._id + " Total of " + doc.totalAmount + " Incomes"
        }
        weeks.push(week);
    });
    return weeks;
}

module.exports = {
    getOrderById,
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    aggregateLast5Weeks
};