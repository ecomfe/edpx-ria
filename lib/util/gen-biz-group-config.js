module.exports = function ( projectInfo, groupPath ) {
    if ( !projectInfo ) {
        return;
    }

    var moduleToFile = require( './module-to-file' );
    var configFile = moduleToFile( projectInfo, groupPath + '/config' );

    var fs = require( 'fs' );
    if ( fs.existsSync( configFile ) ) {
        return;
    }

    require( 'mkdirp' ).sync( dir );
    var tplFile = '../../tpl/biz-group-config.tpl';
    var tpl = require( './compile-handlebars' ).fromFile( tplFile );
    var data = require( './inject-base-data' )();
    fs.writeFileSync( configFile, tpl( data ), 'utf8' );
};
