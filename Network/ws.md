# WebSocket

WebSocket 是 HTML5 中的协议，支持持久连续，http 协议不支持持久性连接。Http1.0 和 HTTP1.1 都不支持持久性的链接，HTTP1.1 中的 keep-alive，将多个 http 请求合并为 1 个。但还是一一对应的，且服务端不能直接推送

## 连接过程

1. 发送一个 GET 请求，升级协议。（这里就需要三次握手协议）关键是请求头:

- Upgrade: websocket
- Connection: Upgrade

2. 服务器给客户端 switching protocol （状态码 101）
3. 接下来的通信都是 websocket，这样就很好的连接了

## WebSocket 与 HTTP 协议相比，

相同点主要有：

- 都是基于 TCP 的应用层协议；
- 都使用 Request/Response 模型进行连接的建立；
- 在连接的建立过程中对错误的处理方式相同，在这个阶段 WS 可能返回和 HTTP 相同的返回码；
- 都可以在网络中传输数据

不同之处在于：

- WS 使用 HTTP 来建立连接，但是定义了一系列新的 header 域，这些域在 HTTP 中并不会使用；
- WS 的连接不能通过中间人来转发，它必须是一个直接连接；
- WS 连接建立之后，通信双方都可以在任何时刻向另一方发送数据；
- WS 连接建立之后，数据的传输使用帧来传递，不再需要 Request 消息；
- WS 的数据帧有序。
