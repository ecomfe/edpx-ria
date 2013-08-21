/**
 * @file 入口模块
 * @author {{{author}}}({{{authorEmail}}})
 */

define(
    function ( require ) {
        /**
         * 引入各业务模块的Action配置
         *
         * @inner
         */
        function requireConfigs() {
            // require( '../plan/config' );
            // require( '../report/config' );
        }
        

        // 提前引入公共控件
        require( './require-ui' );

        // 提前引入公共模板
        require( './require-tpl' );

        // 引入各业务模块的Action配置
        requireConfigs();


        /**
         * 初始化系统启动
         *
         * @inner
         */
        function init() {
            {{#sidebar}}
            require( './sidebar' ).init();
            {{/sidebar}}

            // 启动er
            require( 'er' ).start();
        }

        return {
            init: init
        };
    }
);
