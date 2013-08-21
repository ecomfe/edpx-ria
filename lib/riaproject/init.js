/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * 命令名称
 *
 * @type {string}
 */
cli.command = 'init';

/**
 * 命令描述信息
 *
 * @type {string}
 */
cli.description = '初始化RIA项目';

/**
 * 命令用法信息
 *
 * @type {string}
 */
cli.usage = 'edp riaproject init';

/**
 * 命令选项信息
 *
 * @type {Array}
 */
cli.options = [ 'has-sidebar' ];

/**
 * 模块命令行运行入口
 * 
 * @param {Array} args 命令运行参数
 * @param {Object} opts 命令运行选项
 */
cli.main = function ( args, opts ) {
    var path = require( 'path' );
    var dir = args[ 0 ];
    if ( dir ) {
        dir = path.resolve( dir );
    }
    else {
        dir = process.cwd();
    }
    var hasSidebar = opts[ 'has-sidebar' ];

    var edpProject = require( 'edp-project' );
    var projectInfo = edpProject.init( dir );
    edpProject.webserver.createConfigFile( projectInfo );
    edpProject.build.createConfigFile( projectInfo );

    var mkdirp = require( 'mkdirp' );
    mkdirp.sync( path.resolve( dir, 'src/common' ) );
    require( '../util/copy-image' )( projectInfo );
    require( '../util/gen-main-module' )( projectInfo, {sidebar: hasSidebar} );

    var edpPackage = require( 'edp-package' );
    edpPackage.importFromRegistry( 
        'ef', 
        dir, 
        function () {
            edpPackage.importFromRegistry( 
                'esf-ms', 
                dir, 
                function () {
                    require( '../util/gen-main-less' )( projectInfo );
                    require( '../util/gen-index' )( projectInfo, {sidebar: hasSidebar} );
                }
            );
        }
    );
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;
