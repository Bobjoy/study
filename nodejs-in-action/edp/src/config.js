/**
 * @file 路由配置
 * @author ()
 */

define(function (require) {

    return [
        {path: '/', action: require('./index')},
        {path: '/play/game', action: require('./play\game')}
    ];

});
