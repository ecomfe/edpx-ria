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
cli.command = 'genpage';

/**
 * 命令描述信息
 *
 * @type {string}
 */
cli.description = '测试riaproject genpage';

/**
 * 命令用法信息
 *
 * @type {string}
 */
cli.usage = 'edp riaproject genpage';

var path = require( 'path' );
var genAction = require( '../util/gen-action' );
var genModel = require( '../util/gen-model' );
var genView = require( '../util/gen-view' );
var genTemplate = require( '../util/gen-template' );
var moduleToFile = require( '../util/module-to-file' );

/**
 * 模块命令行运行入口
 * 
 * @param {Array} args 命令运行参数
 */
cli.main = function ( args ) {
    var dir = process.cwd();
    var edpProject = require( 'edp-project' );
    var projectInfo = edpProject.getInfo( dir );

    if ( !projectInfo ) {
        return;
    }

    var pagePath = args[ 0 ];
    if ( pagePath[ 0 ] !== '/' ) {
        pagePath = '/' + pagePath;
    }

    var pathSeg = pagePath.slice( 1 ).split( '/' );
    var lastIndex = pathSeg.length - 1;
    var templateName = pathSeg[ lastIndex ];
    pathSeg[ lastIndex ] = require( '../util/up-first-alpha' )( templateName );
    
    var action = pathSeg.join( '/' );
    var model = action + 'Model';
    var view = action + 'View';
    var templateFile = path.resolve( moduleToFile( projectInfo, action ), '..', templateName ) + '.tpl.html';

    var actionSegs = action.split( '/' );
    for ( var i = 1; i < actionSegs.length; i++ ) {
        var seg = actionSegs[ i ];
        actionSegs[ i ] = seg[ 0 ].toUpperCase() + seg.slice( 1 );
    }
    var templateTarget = actionSegs.join( '' );

    genAction( projectInfo, action, {
        model: './' + pathSeg[ lastIndex ] + 'Model',
        view: './' + pathSeg[ lastIndex ] + 'View'
    } );
    genModel( projectInfo, model );
    genView( projectInfo, view, {
        target: templateTarget,
        template: './' + path.basename( templateFile )
    } );
    genTemplate( projectInfo, templateFile, templateTarget );
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;