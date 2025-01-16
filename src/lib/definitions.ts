import { IntegerDataType } from "sequelize";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
};

export type CartItem = {
    product: Product;
    quantity: number;
};