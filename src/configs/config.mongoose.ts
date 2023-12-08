import mongoose from "mongoose";
import {countConnect} from "../helpers/check.connect";

const connectString = `mongodb://root:admin@localhost:27017/eCommerce?authSource=admin`
const MAX_POLL_SIZE = 50;
const TIME_OUT_CONNECT = 3000;

console.log("Connect mongoUrl :", connectString)
mongoose.set('strictQuery', true);

class Database {

    private static instance: Database;

    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', {color: true});
        }

        mongoose.connect(connectString, {
            serverSelectionTimeoutMS: TIME_OUT_CONNECT,
            maxPoolSize: MAX_POLL_SIZE
        }).then(_ => {
            countConnect()
        }).catch(err => console.log(`Error connect! ${err}`))

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongodb connected to db success')
        });
        connection.on('error', err => {
            console.error('Mongodb connected to db error' + err)
        });
        connection.on('disconnected', () => {
            console.log('Mongodb disconnected db success')
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

export const Mongodb = {
    getInstance() {
        return Database.getInstance()
    }
}