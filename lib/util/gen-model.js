
var moduleToFile = require( './module-to-file' );
var compileTpl = require( './compile-handlebars' );
var injectBaseData = require( './inject-base-data' );

module.exports = function ( projectInfo, model, options ) {
    options = options || {};

    var modelSegs = model.split( '/' );
    for ( var i = 0; i < modelSegs.length; i++ ) {
        var seg = modelSegs[ i ];
        modelSegs[ i ] = seg[ 0 ].toUpperCase() + seg.slice( 1 );
    }


    var fullModelName = modelSegs.join( '' );
    var modelFile = moduleToFile( projectInfo, model );
    var tplFile = options.genTemplate || require('path').resolve( __dirname, '../../tpl/model.tpl' );

    var tpl = compileTpl.fromFile( tplFile );
    var data = {
        model: fullModelName
    };
    injectBaseData( data );

    var fs = require( 'fs' );
    if ( !fs.existsSync( modelFile ) ) {
        require( 'mkdirp' ).sync( require('path').dirname( modelFile ) );
        fs.writeFileSync( modelFile, tpl( data ), 'utf8' );
    }
};
