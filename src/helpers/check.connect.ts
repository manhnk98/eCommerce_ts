import mongoose from 'mongoose';
import os from 'os';

const _SECONDS = 5000;

const countConnect = (): number => {
    const numConnect: number = mongoose.connections.length;
    console.log(`Number of connections : ${numConnect}`);
    return numConnect;
};

const checkOverload = (): void => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUse = process.memoryUsage().rss;

        // server chiu dk 5 connect
        const maxConnections = numCores * 5;

        if (numConnection > maxConnections) {
            console.log(`Connection overload detected`);
            // notify warning....
        }
    }, _SECONDS);
};

export {countConnect, checkOverload};