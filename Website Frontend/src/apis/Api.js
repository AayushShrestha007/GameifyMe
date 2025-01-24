import axios from "axios";

//creating backend Config!
const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }

})

//config for token
const config = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    },

};

//register api 
export const registerUserApi = (data) => Api.post("/api/user/create", data)

//login api
export const loginUserApi = (data) => Api.post("/api/user/login", data)

//create game option API
export const createGameOptionApi = (data) =>
    Api.post("/api/gameOption/create-game-option", data, config);

//create API to fetch all game option
export const getAllGameOptionApi = () =>
    Api.get("/api/gameOption/get-all-options");

//create API to get game option by id
export const getGameOptionByIdApi = (id) => Api.get(`/api/gameOption/get-game-option/${id}`);

//create API to add item to cart
export const addItemToCart = (data) => Api.post("/api/cart/add-to-cart", data, config);

//create API to get cart item of currently logged in user
export const getCartItem = () => Api.get("/api/cart/get-cart-items", config);

//create API to increase cart item of currently logged in user
export const increaseCartItem = (data) => Api.post("/api/cart/increase-cart-items", data, config);

//create API to decrease cart item of currently logged in user
export const decreaseCartItem = (data) => Api.post("/api/cart/decrease-cart-items", data, config);

//create API to remove cart item of currently logged in user
export const removeCartItem = (data) => Api.post("/api/cart/remove-cart-items", data, config);

//create API to place order
export const placeOrder = (data) => Api.post("/api/order/create-order", data, config);

//create API to get order history
export const getOrderHistory = () => Api.get("/api/order/order-history", config);

//create API to initiate khalti payment
export const khaltiInitiate = (data) => Api.post("/api/khalti/initialize-khalti", data, config);

//create API to send contact us email
export const sendContactEmail = (data) => Api.post("/api/email/contact", data);