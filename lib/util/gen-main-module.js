/**
 * @file 生成系统主模块
 * @author errorrik[errorrik@gmail.com]
 */

/**
 * 生成系统主模块
 * 
 * @param {Object} projectInfo 项目信息对象
 * @param {Object} options 生成选项
 * @param {boolean} options.sidebar 系统是否包含侧边栏
 * @param {string=} options.genTemplate 用于生成的模板文件，绝对路径
 */
module.exports = require( './generator' )(
    function ( projectInfo, options ) {
        var mergeTpl = require( './merge-tpl' );
        var path = require( 'path' );
        
        // 生成ui统一导入管理模块
        mergeTpl(
            'require-ui.tpl',
            {},
            path.resolve( projectInfo.dir, 'src/common/require-ui.js' )
        );

        // 生成公共模板导入管理模块
        mergeTpl(
            'require-tpl.tpl',
            {},
            path.resolve( projectInfo.dir, 'src/common/require-tpl.js' )
        );

        var data = {};
        if ( options.sidebar ) {
            // 生成sidebar管理模块
            mergeTpl(
                'sidebar-module.tpl',
                {},
                path.resolve( projectInfo.dir, 'src/common/sidebar.js' )
            );
            data.sidebar = true;
        }

        // merge模版并生成文件
        mergeTpl(
            options.genTemplate || 'main-module.tpl',
            data,
            path.resolve( projectInfo.dir, 'src/common/main.js' )
        );
    }
);
