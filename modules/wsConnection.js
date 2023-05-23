class wsConnection {

    connection = null;
    server = null;
    userId = null;
    constructor(connection, server, userId) {
        this.connection = connection;
        this.server = server;
        this.userId = userId;
        connection.on('error', () => console.log("connection error"));

        connection.on('message', (data) => {
            const dataMsg = JSON.parse(data);
            if (dataMsg.type == "message") {
                server.broadcastMessage(this, dataMsg.data); // send to all other connections
            }
        });

        connection.on("close", () => {
            console.log("a client disconnected!");
            this.server.clientDisconnected(this);
        });
    }

    sendMessage(msg) {
        const dataMsg = { type: "message", data: msg };
        this.connection.send(JSON.stringify(dataMsg)); // send message to this specific client (on this connection)
    }

}

module.exports = wsConnection;

// type
// data

// { type: "message", data: "text"}