
var compileTpl = require( './compile-handlebars' );

module.exports = function ( projectInfo, options ) {
    options = options || {};
    if ( !projectInfo ) {
        return;
    }

    var pkgs = require( 'edp-package' ).getImported( projectInfo.dir );
    var lessImports = [];
    var pkg;

    if ( 'esui' in pkgs ) {
        pkg = pkgs.esui;
        lessImports.push( {
            url: '../../../dep/esui/' + getLatestVersion( pkg ) + '/src/css/main.less'
        } ); 
    }

    if ( 'est' in pkgs ) {
        pkg = pkgs.est;
        lessImports.push( {
            url: '../../../dep/est/' + getLatestVersion( pkg ) + '/src/all.less'
        } ); 
    }

    if ( 'esf-ms' in pkgs ) {
        pkg = pkgs[ 'esf-ms' ];
        lessImports.push( {
            url: '../../../dep/esf-ms/' + getLatestVersion( pkg ) + '/src/main.less'
        } ); 
    }

    var path = require( 'path' );
    var tplFile = options.genTemplate || path.resolve( __dirname, '../../tpl/main-less.tpl' );
    var tpl = compileTpl.fromFile( tplFile );
    var file = path.resolve( projectInfo.dir, 'src/common/css/main.less' );
    
    var fs = require( 'fs' );
    if ( !fs.existsSync( file ) ) {
        require( 'mkdirp' ).sync( path.dirname( file ) );
        fs.writeFileSync( file, tpl( { imports: lessImports } ), 'utf8' );
    }
};

function getLatestVersion( pkg ) {
    return Object.keys( pkg ).sort( require( 'semver' ).rcompare )[ 0 ];
}
