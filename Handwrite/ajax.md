# 原生ajax

1. 创建xhr实例
2. open链接(请求方法，url, 同步异步)
3. 设置请求参数
4. 监听onreadystatechange事件
5. 发送

```javascript
var xhr=new XMLHttpRequest();
xhr.open('POST',url,false);
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.onreadystatechange=function(){
    // readyState == 4说明请求已完成
    if(xhr.readyState==4){
        if(xhr.status==200 || xhr.status==304){
            console.log(xhr.responseText);
            fn.call(xhr.responseText);
        }
    }
}
xhr.send();
```