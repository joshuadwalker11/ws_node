const { WebSocketServer } = require('ws');
const WsConnection = require('../modules/wsConnection');

class wsServer {
    lastUserId = 1; // last user (id)

    wsConnections = { connections: [] };

    constructor(httpServer) {
        this.wss = new WebSocketServer({ server: httpServer }); // websocket server does most of the heavy lifting

        this.wss.on("connection", (ws) => { // new websocket connection
            let conn = new WsConnection(ws, this, this.lastUserId++); // object to handle connection
            this.wsConnections.connections.push(conn);
            conn.sendMessage("hello from server");
        });
    }
    // handles when connection ends
    clientDisconnected = function (sender) {
        const posConn = this.wsConnections.connections.indexOf(sender);
        this.wsConnections.connections.splice(posConn, 1);
        this.broadcastMessage(sender, 'disconnected');
    }

    // happens when someone connects?
    broadcastMessage = function (sender, msg) {
        for (const wsc of this.wsConnections.connections) {
            if (wsc.userId != sender.userId) {
                wsc.sendMessage(`${sender.userId}: ${msg}`);
            }
        }
    }

}

module.exports = wsServer;