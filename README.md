### 描述
```
前端小工具：在编译器校验小程序wxml文件里image是否有加压缩规则。
目前只校验两个压缩规则：(自己本地上传的图片不校验)
1、?x-oss-process=image/resize,w_120   阿里云压缩
2、?imageView2/2/w/210                 七牛云压缩
```
### 安装
```
sudo npm install cps_tool -g
```
### 查看版本（V是大写）
```
cps_tool -V
```

### 执行
```
cps_tool cps 
```
