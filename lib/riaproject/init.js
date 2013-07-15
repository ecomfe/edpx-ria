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
cli.description = '测试riaproject init';

/**
 * 命令用法信息
 *
 * @type {string}
 */
cli.usage = 'edp riaproject init';

/**
 * 模块命令行运行入口
 * 
 * @param {Array} args 命令运行参数
 */
cli.main = function ( args ) {
    var path = require( 'path' );
    var dir = args[ 0 ];
    if ( dir ) {
        dir = path.resolve( dir );
    }
    else {
        dir = process.cwd();
    }

    var edpProject = require( 'edp-project' );
    var projectInfo = edpProject.init( dir );
    edpProject.webserver.createConfigFile( projectInfo );
    edpProject.build.createConfigFile( projectInfo );
    require( 'mkdirp' ).sync( path.resolve( dir, 'src/common' ) );
    
    require( 'edp-package' ).importFromRegistry( 
        'ef', 
        dir, 
        function () {
            require( 'edp-codegen' ).html( {}, path.join( dir, 'index.html' ) );
        }
    );
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;
