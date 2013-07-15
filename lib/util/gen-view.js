
var moduleToFile = require( './module-to-file' );
var compileTpl = require( './compile-handlebars' );
var injectBaseData = require( './inject-base-data' );

module.exports = function ( projectInfo, view, options ) {
    options = options || {};

    var viewSegs = view.split( '/' );
    for ( var i = 0; i < viewSegs.length; i++ ) {
        var seg = viewSegs[ i ];
        viewSegs[ i ] = seg[ 0 ].toUpperCase() + seg.slice( 1 );
    }


    var fullViewName = viewSegs.join( '' );
    var viewFile = moduleToFile( projectInfo, view );
    var template = options.template || './' + viewSegs[ viewSegs.length - 1 ].toLowerCase() + '.tpl.html';
    var templateTarget = options.templateTarget || fullViewName[ 0 ].toLowerCase() + fullViewName.slice( 1 ).replace( /View$/, '' );
    var tplFile = options.genTemplate || require('path').resolve( __dirname, '../../tpl/view.tpl' );

    var tpl = compileTpl.fromFile( tplFile );
    var data = {
        view: fullViewName,
        template: template,
        templateTarget: templateTarget
    };
    injectBaseData( data );

    var fs = require( 'fs' );
    if ( !fs.existsSync( viewFile ) ) {
        require( 'mkdirp' ).sync( require('path').dirname( viewFile ) );
        fs.writeFileSync( viewFile, tpl( data ), 'utf8' );
    }
};
