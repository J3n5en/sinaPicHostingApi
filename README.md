# 新浪图床API
## 设计初衷 && 用途：
新入MacBook Air看到了一个感觉不错的markdown编辑器 —— MWeb,
某日发现他竟然有自动上传本地图片到网络的功能！！然而却没有新浪图床，于是就有了这个API。写完API才发现，这功能真·上传图片，并不会替换图片地址，有点鸡肋。卒。
![](https://ws1.sinaimg.cn/large/6bf00bd8gy1fdr0sunaiuj20gc0guq56)
所以你们可以用于MWeb或者其他用途，，我最近在用它做一个Hexo生成静态文件时自动上传图片到新浪的插件，蛤蛤。

## `config.json` 说明

```json
{
	"auth": {
		"username": "", // 新浪账号
		"password": "" // 新浪密码
	},
	"port": 8088,   // api监听端口
	"url": "/upload",  //api url
	"default": {
		"protocol": "https",  // 默认的协议 ['http','https']
		"size": "large" // 默认的图片大小{'large':'原图','mw690':'中等尺寸':'thumbnail':'缩略图'}
	}
}
```
## POST字段说明

| 字段名 | 字段内容 | 描述 |
| :-: | :-: | :-: |
| protocol  | http/https | 协议 |
| size | large/mw690/thumbnail | 大小 |
| file | 图片文件 | 图片文件 |

__说明:POST字段优先级大于`config.json`中的设置__

## 更新：
写这篇readme的时候发现，直接复制图片，然后在编辑器中`cmd + v`即可完成上传图片，及添加图片功能，有点爽。


#EOF#

