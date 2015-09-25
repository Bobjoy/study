/**
 * 配置配置文件
 */

// 让所有的静态资源构建后到 static 目录下
fis.match('*.{png,js,css}', {
  release: '/static/$0'
});

// 给 url 添加 CDN domain 或者添加文件指纹（时间戳或者md5戳）
fis.match('*', {
  useHash: true
});

// fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
// });

// fis.match('*', {
//   useHash: false
// });

// fis.match('*.js', {
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   useSprite: true,
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });