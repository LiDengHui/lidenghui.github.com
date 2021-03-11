// 订单model类, models/order.js
class Order {
    constructor() {}

    insert() {
        return true;
    }
}

// 订单类 controllers/OrderController.js
const Order = require("./Order.js");

class OrderController {
    constructor(order) {
        this.order = order;
    }

    createOrder(...args) {
        this.order.insert(...args);
    }
}

class IOC {
    constructor() {
        this.controller = new Map();
    }

    bind(key, callback) {
        this.controller.set(key, { callback, single: false });
    }

    sigleton(key, callback) {
        this.controller.set(key, { callback, single: true });
    }

    use(key) {
        const item = this.controller.get(key);
        if (!item) {
            throw new Error("error");
        }

        if (item.single && !item.instance) {
            item.instance = item.callback();
        }

        return item.single ? item.instance : item.callback();
    }
}
// router/index.js
const Order = require("../model/Order.js");
const OrderController = require("./OrderController.js");

ioc.bind("order", (...args) => new Order(...args));
ioc.bind("orderController", (...args) => new OrderController(ioc.use("order")));

// router.js
const ioc = require("../ioc.js");
const orderController = ioc.use("orderController");
