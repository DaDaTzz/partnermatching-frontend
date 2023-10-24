import myAxios from "../plugins/myAxios.ts";

/**
 * 初始化ws
 */
export const initWebsocket = async () => {
    let websocket = null;
    if ('WebSocket' in window) {
        // websocket = new WebSocket("ws://8.130.133.165:8080/api/websocket");
        websocket = new WebSocket("ws://localhost:8080/api/websocket");
    } else {
        alert('Not support websocket')
    }
    return websocket


}

