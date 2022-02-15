# 简介

前端学习小本本

![avatar](./assets/img/fe.jpeg)

除了图片包含的，还有网络，算法，设计模式等等一起学习！

<br/>

## 目录

- 一、网络
  - 1.1 OSI 七层模型和 TCP/IP 四层模型
  - 1.2 HTTP
    - 1.2.1 HTTP 0.9
    - 1.2.2 HTTP 1.0
    - 1.2.3 HTTP 1.1
  - 1.3 HTTP2.0 和 HTT3.0
    - 1.3.1 HTTP2.0
    - 1.3.2 二进制分帧
    - 1.3.3 HTTP3.0
  - 1.4 HTTPS
    - 1.4.1 HTTPS 链接过程
  - 1.5 HTTP 头
    - 1.5.1 状态码
    - 1.5.2 常用请求头

<br/>
<br/>

# 一、网络

<br/>

## 1.1 OSI 七层模型和 TCP/IP 四层模型

<br/>

<table>
	<tr>
		<td>七层模型</td>
		<td>四层模型</td>
		<td>功能</td>
		<td>协议</td>
	</tr>
	<tr>
	 <td>应用层</td>
		<td rowspan="3">应用层</td>
		<td>文件传输，电子邮件，虚拟终端等</td>
		<td>HTTP, FTP, DNS域名系统等</td>
	</tr>
	<tr>
		<td>表示层</td>
		<td>数据格式化，代码转换，数据加密</td>
		<td>Telnet，SNMP</td>
	</tr>
	<tr>
		<td>会话层</td>
		<td>建立、维护和管理会话链接</td>
		<td>SMTP，DNS</td>
	</tr>
	<tr>
		<td>传输层</td>
		<td>传输层</td>
		<td>提供端对端的接口，数据传输</td>
		<td>TCP传输控制协议, UDP用户数据报协议，SSL安全套接字协议</td>
	</tr>
	<tr>
		<td>网络层</td>
		<td>网络层</td>
		<td>为数据包选择路由</td>
		<td>IP，ICMP, RIP等</td>
	</tr>
	<tr>
		<td>数据链路层</td>
		<td rowspan="2">数据链路层</td>
		<td>传输有地址的帧以及错误检测功能</td>
		<td>PPP，ARP, RARP等</td>
	</tr>
	<tr>
		<td>物理层</td>
		<td>以二进制形式在物理传输媒体上传输数据</td>
		<td>IEEE标准</td>
	</tr>
</table>

<br/>

MAC 地址在数据链路层：

- 定位数据包的路径，如发送者，接受者
- 即网卡地址，每个网卡都是独一无二的 12 个 16 进制数
- 前 6 个代表厂商，后 6 个表示流水号

IP 在网络层

- IPv4：32 个二进制，4 字节\*8 位，如 255.255.255.0
- IPv6：128 个二进制，8 字节\*16 位，如 2001:DB8:0:23:8:800:200C:417A

port 端口和 socket 在传输层

<br/>

## 1.2 HTTP

<br/>

超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和响应的标准。

<br/>

### 1.2.1 HTTP 0.9

<br/>

传统的 request – response 的模式，只支持 GET 请求

<br/>

### 1.2.2 HTTP 1.0

<br/>

在 http 0.9 的基础上增加了几个变化：

- 在请求中加入了 HTTP 版本号
- HTTP 开始有 header 了
- 增加了 HTTP Status Code 标识相关的状态码。
- 还有 Content-Type 可以传输其它的文件了。

**_但是，HTTP1.0 性能上有一个很大的问题，那就是每请求一个资源都要新建一个 TCP 链接，而且是串行请求_**

<br/>

### 1.2.3 HTTP 1.1

<br/>

HTTP/1.1 主要解决了 HTTP 1.0 的网络性能的问题，以及增加了一些新的东西：

- 可以设置 keepalive 来让 HTTP 重用 TCP 链接
- 然后支持 pipeline 网络传输，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去，可以减少整体的响应时间。
- 支持 Chunked Responses ，也就是说，在 Response 的时候，不必说明 Content-Length。这样，客户端就不能断连接，直到收到服务端的 EOF 标识。
- 协议头注增加了 Language, Encoding, Type 等等头。
- 加入了一个很重要的头—— HOST。
- 加入了 OPTIONS 方法，其主要用于 CORS 应用。

<br/>

## 1.3 HTTP2.0 和 HTT3.0

<br/>

### 1.3.1 HTTP2.0

超文本传输协议 2.0，是下一代 HTTP 协议。在开放互联网上 HTTP2.0 将只用于 https 网址，而 http 网址将继续使用 HTTP/1。他有以下优点：

- 提升访问速度
- 允许多路复用：多路复用允许同时通过单一的 HTTP/2 连接发送多重请求-响应信息。改善了：在 http1.1 中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量限制（连接数量），超过限制会被阻塞。(使用请求 ID 对应响应)
- 二进制分帧：HTTP2.0 会将所有的传输信息分割为更小的信息或者帧，并对他们进行二进制编码
- 首部压缩: HPACK（HTTP2 头部压缩算法）压缩格式对传输的 header 进行编码。并在两端建立索引表，进行缓存。下次发送只需发送索引。
- 服务器端推送

<br/>

### 1.3.2 二进制分帧

<br/>

- 帧(frame)包含部分：
  - 类型 Type
  - 长度 Length
  - 标记 Flags，如结束帧
  - 流标识 Stream，标识属于那个流
  - payload：数据
- 流是连接中的一个虚拟信道，可以承载双向消息传输。每个流有唯一整数标识符。为了防止两端流 ID 冲突，客户端发起的流具有奇数 ID，服务器端发起的流具有偶数 ID。

在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。 帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流，在同一域名下所有请求都是基于流。 HTTP2 采用二进制数据帧传输，取代了 HTTP1.x 的文本格式，二进制格式解析更高效。 多路复用代替了 HTTP1.x 的序列和阻塞机制，所有的相同域名请求都通过同一个 TCP 连接并发完成。同一 Tcp 中可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题（Pipelining），极大的提高传输性能。

<br/>

### 1.3.3 HTTP3.0

<br/>

HTTP2.0 虽然性能已经不错了，还有什么不足吗？

- 建立连接时间长(本质上是 TCP 的问题)
- 队头阻塞问题，队头阻塞问题可能存在于 HTTP 层和 TCP 层。HTTP2.0 协议的多路复用机制解决了 HTTP 层的队头阻塞问题，但是在 TCP 层仍然存在队头阻塞问题。TCP 协议在收到数据包之后，这部分数据可能是乱序到达的，但是 TCP 必须将所有数据收集排序整合后给上层使用，如果其中某个包丢失了，就必须等待重传，从而出现某个丢包数据阻塞整个连接的数据使用。
- 移动互联网领域表现不佳(弱网环境)，以及无法进行连接迁移，一条连接由一个四元组标识，在当今移动互联网的时代，如果一台手机从一个 wifi 环境切换到另一个 wifi 环境，ip 发生变化，那么连接必须重新建立，inflight 的包全部丢失。

HTTP3.0 又称为 HTTP Over QUIC，其弃用 TCP 协议，改为使用基于 UDP 协议的 QUIC 协议来实现。

<br/>

## 1.4 HTTPS

<br/>

是以安全为目标的 HTTP 通道，即 HTTP 下加入 SSL 层，SSL 加密是在传输层实现的。http 是明文传输，https 则是具有安全性的 ssl 加密传输协议

<br/>

### 1.4.1 HTTPS 链接过程

<br/>

1. 客户端发起 https 请求，并且携带自己支持的密钥算法和哈希算法
2. 服务端接收请求后，从中挑选出一套自己支持的加密算法和哈希算法，如果不支持则连接断开。 然后会把符合的算法和证书发给客户端，证书里包含了密钥的公钥。
3. 客户端检验证书的合法性，包括失效日期，网站地址，颁发的机构等。验证通过后，客户端会生成一个随机字符串，然后用服务端的公钥进行加密。再用这个随机字符串加密（握手信息+握手信息的 hash 值）。hash 主要来比对，防止篡改
4. 服务端通过私钥进行解密，并验证客户端的信息，随后使用同样的随机字符串加密握手信息和握手信息的 HASH 值发给客户端。
5. 客户端接收到服务端发回来的握手信息后，用一开始生成的随机字符串对密文进行解密，来对握手信息进行校验，校验通过后，握手完毕。
6. 从这里之后，客户端和服务端的通信就使用那串随机字符串进行 AES 对称加密通信。（SSL 加密建立）

<br/>

## 1.5 HTTP 头

<br/>

### 1.5.1 状态码

<br/>

1. 信息

- 100 Continue: 继续, 客户端应继续其请求
- 101 Switching Protocols: 切换协议
- 102 Processing: 处理将被继续执行

2. 成功

- <font color=#ff502c>200 OK</font>: 请求成功
- 201 Created: 请求已经被实现
- 202 Accepted: 服务器已接受请求，但尚未处理
- <font color=#ff502c>204 No Content</font>: 服务器成功处理，但未返回内容

3. 重定向

- 300 Multiple Choices: 被请求的资源有一系列可供选择的回馈信息， 用户或浏览器能够自行选择一个首选的地址进行重定向。
- <font color=#ff502c>301 Moved Permanently</font>: 被请求的资源已永久移动到新位置
- <font color=#ff502c>302 Move temporarily</font>: 请求的资源临时从不同的 URI 响应请求
- 303 See Other: 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源
- <font color=#ff502c>304 Not Modified</font>: 所请求的资源未修改，服务器返回此状态码时，不会返回任何资源
- 305 Use Proxy: 被请求的资源必须通过指定的代理才能被访问

4. 客户端错误

- <font color=#ff502c>400 Bad Request</font>: 语义有误，当前请求无法被服务器理解 | 请求参数有误
- <font color=#ff502c>401 Unauthorized</font>: 当前请求需要用户验证
- <font color=#ff502c>403 Forbidden</font>: 服务器已经理解请求，但是拒绝执行它
- <font color=#ff502c>404 Not Found</font>: 请求失败，请求所希望得到的资源未被在服务器上发现
- <font color=#ff502c>405 Method Not Allowed</font>: 请求行中指定的请求方法不能被用于请求相应的资源。例如使用服务端为未允许的 PUT，DELETE 请求。
- 408 Request Timeout: 请求超时
- 409 Conflict: 由于和被请求的资源的当前状态之间存在冲突，请求无法完成
- 410 Gone: 被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址
- 413 Request Entity Too Large: 服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围
- 414 Request-URI Too Long: 请求的 URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务（http 协议未规定长度，但是浏览器，nginx 会限制，Chrome:8182）
- <font color=#ff502c>415 Unsupported Media Type</font>: 对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝

5. 服务端错误

- <font color=#ff502c>500 Internal Server Error</font>: 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理
- 501 Not Implemented: 服务器不支持当前请求所需要的某个功能
- <font color=#ff502c>502 Bad Gateway</font>: 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应
- 503 Service Unavailable: 由于临时的服务器维护或者过载，服务器当前无法处理请求
- <font color=#ff502c>504 Gateway Timeout</font>: 作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI 标识出的服务器，例如 HTTP、FTP、LDAP）或者辅助服务器（例如 DNS）收到响应
- 505 HTTP Version Not Supported: 服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本

<br/>

### 1.5.2 常用请求头

<br/>

通用头部

- Cache-Control：指定请求和响应遵循的缓存机制。

  - public：表明响应可以被任何对象缓存，即使是通常不可缓存的内容。（例如：1.该响应没有 max-age 指令或 Expires 消息头；2. 该响应对应的请求方法是 POST 。）
  - private：表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）
  - no-cache：在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
  - no-store：缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存。
  - max-age：设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。还是仍由缓存提供。若同时还发送了 max-stale 指令，则使用期可能会超过其过期时间。
  - s-maxage，max-stale，min-fresh 等

- Connection：连接管理

  - Close：在完成本次请求的响应后，断开连接。
  - Keepalive：在完成本次请求的响应后，保持连接，等待本次连接的后续请求。
  - Keep-Alive：如果浏览器请求保持连接，则该头部表明希望 WEB 服务器保持连接多长时间（秒），如 Keep-Alive：300。

- Date 消息发送的日期和时间，世界标准时。

- Transfor-Encoding 报文主体的传输编码格式

- Upgrade 升级协议。如 http1.0 升级到 http1.1，http 升级到 websocket

请求头部

- Host：请求资源所在的服务器 (唯一一个 HTTP/1.1 规范里要求必须出现的字段)
- Accept：客户端或者代理能够处理的媒体类型。还有 Accept-Charset，Accept-Encoding，Accept-Language
- If-Match：对象的 ETag 没有改变才执行请求的动作，去获取文档。
- If-None-Match：对象的 ETag 改变了，才执行请求的动作，去获取文档。
- If-Modified-Since：如果请求的对象在该头部指定的时间之后修改了，才执行请求的动作（比如返回对象），否则返回代码 304，告诉浏览器该对象没有修改。
- If-Unmodified-Since：如果请求的对象在该头部指定的时间之后没修改过，才执行请求的动作（比如返回对象）。
- Range：实体的字节范围请求。例如：Range: bytes=1173546
- Referer：表明自己是从哪个网页 URL 获得点击当前请求中的网址
- User-Agent：客户端信息

响应头部

- Location：重定向的 URI
- ETag：表示资源唯一资源的字符串
- Server：服务器的信息

实体头部

- Allow 资源可支持 HTTP 请求方法
- Last-Modified 资源最后修改时间
- Expires 实体主体过期时间
- Content-Language：实体资源语言
- Content-Encoding：实体编码格式
- Content-Length：实体大小，后端可知道 body 的大小
- Content-Range：实体传送的范围
- Content-Type：实体媒体类型
- Content-MD5：主体的 MD5 校验和

<br/>
<br/>

# 结束语

Good Good Study And Day Day Up!

更多详细知识点击前往 [前端知识目录](./README_CATA.md)
