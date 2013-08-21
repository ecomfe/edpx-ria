var compileTpl = require( './compile-handlebars' );
var injectBaseData = require( './inject-base-data' );

module.exports = function ( projectInfo, options ) {
    options = options || {};
    if ( !projectInfo ) {
        return;
    }

    var fs = require( 'fs' );
    var path = require( 'path' );

    function copyTplToProject( tplFile, target ) {
        fs.writeFileSync( 
            path.resolve( projectInfo.dir, target ),
            fs.readFileSync( path.resolve( __dirname, '../../tpl/' + tplFile ) )
        );
    }
    
    copyTplToProject( 'require-ui.tpl', 'src/common/require-ui.js' );
    copyTplToProject( 'require-tpl.tpl', 'src/common/require-tpl.js' );

    if ( options.sidebar ) {
        copyTplToProject( 'sidebar-module.tpl', 'src/common/sidebar.js' );
    }

    var tplFile = options.genTemplate || path.resolve( __dirname, '../../tpl/main-module.tpl' );
    var tpl = compileTpl.fromFile( tplFile );
    var data = {};
    if ( options.sidebar ) {
        data.sidebar = true;
    }
    injectBaseData( data );

    var file = path.resolve( projectInfo.dir, 'src/common/main.js' );
    if ( !fs.existsSync( file ) ) {
        fs.writeFileSync( file, tpl( data ), 'utf8' );
    }
};
