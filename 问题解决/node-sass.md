### node-sass 安装失败问题

- https://juejin.cn/post/6844904192247595022

- 安装node-sass时，在install阶段会从Github上下载一个叫binding.node的文件，而GitHub Releases里的文件都托管在s3.amazonaws.com上，这个网址被Q了，所以又安装不了。
- Node版本与node-sass版本不兼容，必须与Node版本对应使用才行


### 安装过程中悄悄下载node-gyp

npm config set disturl https://npm.taobao.org/mirrors/node/

### 终极总结

``` bash
# 查看Node版本和NPM版本确认已安装Node环境
node -v
npm -v

# 安装nrm并设置NPM的淘宝镜像
npm i -g nrm
nrm use taobao

# 设置依赖安装过程中内部模块下载Node的淘宝镜像
npm config set disturl https://npm.taobao.org/mirrors/node/

# 设置常用模块的淘宝镜像
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set sharp_dist_base_url https://npm.taobao.org/mirrors/sharp-libvips/
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set puppeteer_download_host https://npm.taobao.org/mirrors/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
npm config set sentrycli_cdnurl https://npm.taobao.org/mirrors/sentry-cli/
npm config set sqlite3_binary_site https://npm.taobao.org/mirrors/sqlite3/
npm config set python_mirror https://npm.taobao.org/mirrors/python/
```

- 针对node-sass的情况：

```bash
# 安装rimraf并设置package.json
npm i -g rimraf

# 安装前请确保当前的Node版本和node-sass版本已兼容

# 安装失败
npm cache clean -f
npm rebuild node-sass 或 npm run reinstall
```

package.json中加入npm scripts：
``` json
{
  "scripts": {
    "reinstall": "rimraf node_modules && npm i"
  }
}
```


