# HTTPS

是以安全为目标的 HTTP 通道，即 HTTP 下加入 SSL 层，SSL 加密是在传输层实现的。http 是明文传输，https 则是具有安全性的 ssl 加密传输协议

## HTTPS 链接过程

1. 客户端发起 https 请求，并且携带自己支持的密钥算法和哈希算法
2. 服务端接收请求后，从中挑选出一套自己支持的加密算法和哈希算法，如果不支持则连接断开。 然后会把符合的算法和证书发给客户端，证书里包含了密钥的公钥。
3. 客户端检验证书的合法性，包括失效日期，网站地址，颁发的机构等。验证通过后，客户端会生成一个随机字符串，然后用服务端的公钥进行加密。再用这个随机字符串加密（握手信息+握手信息的 hash 值）。hash 主要来比对，防止篡改
4. 服务端通过私钥进行解密，并验证客户端的信息，随后使用同样的随机字符串加密握手信息和握手信息的 HASH 值发给客户端。
5. 客户端接收到服务端发回来的握手信息后，用一开始生成的随机字符串对密文进行解密，来对握手信息进行校验，校验通过后，握手完毕。
6. 从这里之后，客户端和服务端的通信就使用那串随机字符串进行 AES 对称加密通信。（SSL 加密建立）
