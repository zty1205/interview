# DNS

域名：如 baidu.1com

IP：192.168.0.0

域名系统（服务）协议（DNS）是一种分布式网络目录服务，主要用于域名与 IP 地址的相互转换，以及控制因特网的电子邮件的发送。为了保证高可用、高并发和分布式，它设计成了树状的层次结构。由根 DNS 服务器、顶级域 DNS 服务器和权威 DNS 服务器组成。

解析顺序是首先从浏览器缓存、操作系统缓存以及本地 DNS 缓存 (/etc/hosts) 逐级查找，然后从本地 DNS 服务器、根 DNS、顶级 DNS 以及权威 DNS 层层递归查询。

还可以基于域名在内网、外网进行负载均衡。

不过传统的 DNS 有很多问题(解析慢、更新不及时)，HTTPDNS 通过客户端 SDK 和服务端配合，直接通过 HTTP 调用解析 DNS 的方式，可以绕过传统 DNS 这些缺点，实现智能调度

## 使用 tcp 和 udp

DNS 在区域传输的时候使用 TCP 协议，其他时候使用 UDP 协议。

- DNS 区域传输的时候使用 TCP 协议：

  1.辅域名服务器会定时（一般 3 小时）向主域名服务器进行查询以便了解数据是否有变动。如有变动，会执行一次区域传送，进行数据同步。区域传送使用 TCP 而不是 UDP，因为数据同步传送的数据量比一个请求应答的数据量要多得多。

  2.TCP 是一种可靠连接，保证了数据的准确性。

- 域名解析时使用 UDP 协议：

客户端向 DNS 服务器查询域名，一般返回的内容都不超过 512 字节，用 UDP 传输即可。不用经过三次握手，这样 DNS 服务器负载更低，响应更快。
