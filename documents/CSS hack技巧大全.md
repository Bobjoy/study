# CSS hack技巧大全

兼容范围:

    IE:6.0+，FireFox:2.0+，Opera 10.0+，Sarari 3.0+，Chrome

参考资料：
各游览器常用兼容标记一览表:

标记   | IE6  | IE7  | IE8  |  FF  | Opera | Sarari
:----:|:----:|:----:|:----:|:----:|:----:|:----:
[*+><]| √    | √    | X    | X    | X    | X
_     | √    | X    | X    | X    | X    | X
\9    | √    | √    | √    | X    | X    | X
\0    | X    | X    | √    | X    | √    | X
@media screen and (-webkit-min-device-pixel-ratio:0){.bb {}} | X | X | X | X | X | √
.bb , x:-moz-any-link, x:default | X | √ | X | √(ff3.5及以下) | 	X | X
@-moz-document url-prefix(){.bb{}} | X | X | X | √ | X | X
@media all and (min-width: 0px){.bb {}} | X | X | X | √ | √ | √
\* +html .bb {} | X | √ | X | X | X | X
游览器内核 | Trident | Trident | Trident | Gecko | Presto | WebKit