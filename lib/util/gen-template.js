
var compileTpl = require( './compile-handlebars' );
var injectBaseData = require( './inject-base-data' );

module.exports = function ( projectInfo, file, target, options ) {
    options = options || {};
    
    var tplFile = options.genTemplate || require('path').resolve( __dirname, '../../tpl/template.tpl' );
    var tpl = compileTpl.fromFile( tplFile );
    var data = {
        target: target
    };
    injectBaseData( data );

    var fs = require( 'fs' );
    if ( !fs.existsSync( file ) ) {
        require( 'mkdirp' ).sync( require('path').dirname( file ) );
        fs.writeFileSync( file, tpl( data ), 'utf8' );
    }
};
