
var moduleToFile = require( './module-to-file' );
var compileTpl = require( './compile-handlebars' );
var injectBaseData = require( './inject-base-data' );
var genActionConfig = require( './gen-action-config' );

module.exports = function ( projectInfo, action, options ) {
    options = options || {};

    var actionSegs = action.split( '/' );
    for ( var i = 0; i < actionSegs.length; i++ ) {
        var seg = actionSegs[ i ];
        actionSegs[ i ] = seg[ 0 ].toUpperCase() + seg.slice( 1 );
    }

    var actionFile = moduleToFile( projectInfo, action );
    var actionName = actionSegs[ actionSegs.length - 1 ];
    var fullActionName = actionSegs.join( '' );

    var model = options.model || './' + actionName + 'Model';
    var view = options.view || './' + actionName + 'View';
    var tplFile = options.genTemplate || require('path').resolve( __dirname, '../../tpl/action.tpl' );

    var tpl = compileTpl.fromFile( tplFile );
    var data = {
        model: model,
        view: view,
        action: fullActionName
    };
    injectBaseData( data );

    var fs = require( 'fs' );
    if ( !fs.existsSync( actionFile ) ) {
        require( 'mkdirp' ).sync( require('path').dirname( actionFile ) );
        fs.writeFileSync( actionFile, tpl( data ), 'utf8' );
    }

    genActionConfig();
};
