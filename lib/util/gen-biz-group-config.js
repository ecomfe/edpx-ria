


module.exports = function ( projectInfo, groupPath ) {
    if ( !projectInfo ) {
        return;
    }

    var moduleToFile = require( './module-to-file' );
    var configModule = groupPath + '/config';
    var configFile = moduleToFile( projectInfo, configModule );

    var path = require( 'path' );
    var fs = require( 'fs' );
    if ( fs.existsSync( configFile ) ) {
        return;
    }

    require( 'mkdirp' ).sync( path.dirname( configFile ) );
    var tplFile = '../../tpl/biz-group-config.tpl';
    var tpl = require( './compile-handlebars' ).fromFile( path.resolve( __dirname, tplFile ) );
    var data = require( './inject-base-data' )();
    fs.writeFileSync( configFile, tpl( data ), 'utf8' );

    var mainModule = 'common/main';
    var mainFile = moduleToFile( projectInfo, mainModule );
    if ( fs.existsSync( mainFile ) ) {
        var mainContent = fs.readFileSync( mainFile, 'utf8' );
        var requireConfigModule = '../' + configModule;

        // 判断是否require过该模块。不严谨的判断
        if ( mainContent.indexOf( requireConfigModule ) > 0 ) {
            return;
        }

        mainContent = mainContent.replace(
            /\n(\s*)function requireConfigs\(\)\s*\{/,
            function ( $0, indent ) {
                var indentUnit = indent[ 0 ] == '\t'
                    ? '\t'
                    : '    ';
                return $0 + '\n' + indent + indentUnit
                    + 'require( \''
                    + requireConfigModule
                    + '\' );';
            }
        );

        fs.writeFileSync( mainFile, mainContent, 'utf8' );
    }
};
