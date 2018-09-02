![](https://user-images.githubusercontent.com/5803001/41983135-c739a5d6-7a5f-11e8-86b8-2c8192a536b8.png)

# web-dvr: User Session Record & Replay, Conversion Optimization with Different Dimensions

web-dvr 是针对 Web 界面的多维度记录、回放、优化工具，其包含以下策略模块：

- [dom](./dom), DOM 变化追踪
- [browser](./browser), 浏览器沙盒，事件重放
- [black-chronicle](./black-chronicle), 页面沙盒，副作用隔离与重放

黑之书源于笔者非常喜欢的一本玄幻小说：永夜君王，它记录了永夜世界的衍化，各个种族的兴衰沉浮。而在 [black-chronicle](./black-chronicle) 子项目中，我们并不记录历史本身，而是记录推动历史滚滚向前的那些事件。天地不仁，万物刍狗；笔记苍生，无问春秋。

# Motivation & Credits

## DOM

- [pere](https://github.com/sgentle/pere): pere is a utility for record and playback of DOM edits.

- [Peeping DOM](https://github.com/davidgilbertson/peeping-dom): Peeping DOM enables you to record your users' journeys through your site and play them back.

- [redux-vcr](https://github.com/joshwcomeau/redux-vcr): Record and replay user sessions.

- [puppeteer-recorder #Project#](https://github.com/checkly/puppeteer-recorder): Puppeteer recorder is a Chrome extension that records your browser interactions and generates a Puppeteer script.

## Image

- [GifW00t](https://github.com/yaronn/GifW00t):GifW00t! is a pure-javascript web recorder. Just add one script tag to your page, and users will be able to record and replay their interaction with the site.

- [pixelmatch](https://github.com/mapbox/pixelmatch): The smallest, simplest and fastest JavaScript pixel-level image comparison library

- [image-diff](https://github.com/uber-archive/image-diff): Create image differential between two images.

- [gif.js](https://github.com/jnordberg/gif.js): JavaScript GIF encoder that runs in your browser.

- [gifshot](https://github.com/yahoo/gifshot): JavaScript library that can create animated GIFs from media streams, videos, or images

## Sandbox

- [togetherjs](https://github.com/mozilla/togetherjs): A service for your website that makes it surprisingly easy to collaborate in real-time.

## Diff

- [page-monitor #Project#](https://github.com/fouber/page-monitor): capture webpage and diff the dom change with phantomjs.
