
var genBizGroupConfig = require( './gen-biz-group-config' );
var moduleToFile = require( './module-to-file' );
var compileTpl = require( './compile-handlebars' );
var injectBaseData = require( './inject-base-data' );


module.exports = function ( projectInfo, action, path ) {
    if ( !projectInfo ) {
        return;
    }

    path = path || '/' + action;
    var groupPath = action.split( '/' );
    groupPath.length = groupPath.length - 1;
    genBizGroupConfig( projectInfo, groupPath );

    var fs = require( 'fs' );
    var configModule = groupPath.join( '/' ) + '/config';
    var configFile = moduleToFile( projectInfo, configModule );
    var configContent;

    if ( fs.existsSync( configFile ) ) {
        configContent = fs.readFileSync( configFile, 'utf8' ).replace( 
            /\n(\s*)var\s+actionsConfig\s+=\s+\[\s*(\])?/, 
            function ( $0, indent, end ) {
                var indentUnit = indent[ 0 ] == '\t'
                    ? '\t'
                    : '    ';
                
                var indent1 = indent + indentUnit;
                var indent2 = indent1 + indentUnit;
                var tpl = compileTpl.fromFile( require( 'path' ).resolve( __dirname, '../../tpl/action-config.tpl' ) );

                return ( end ? $0.slice( 0, $0.length - 1 ) : $0.replace( /\s*$/, '' ) )  + '\n'
                    + tpl( {
                        indent1: indent1,
                        indent2: indent2,
                        action: action,
                        path: path
                    } )
                    + ( end ? '' : ',' )
                    + '\n' + indent
                    + ( end ? ']' : indent );
            }
        );

        fs.writeFileSync( configFile, configContent, 'utf8' );
    }
};
