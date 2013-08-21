
var path = require( 'path' );
var compileTpl = require( './compile-handlebars' );

module.exports = function ( projectInfo, options ) {
    options = options || {};
    if ( !projectInfo ) {
        return;
    }


    var file = path.join( projectInfo.dir, options.filename || 'index.html' );
    var tplData = {
        cssLinks: [
            {href:'src/common/css/main.less'}
        ],
        title: '[请输入页面标题]'
    };

    // 根据sidebar选择body main的html
    var fs = require( 'fs' );
    var bodyMainFile = 'index-main-none-sidebar.tpl';
    if ( options.sidebar ) {
        bodyMainFile = 'index-main-has-sidebar.tpl';
    }
    tplData.bodyMain = fs.readFileSync( 
        path.resolve( __dirname, '../../tpl', bodyMainFile ), 
        'UTF-8'
    );

    // 构建loader和require config数据
    var loaderData = require( 'edp-project' ).loader.getConfig( file );
    if ( loaderData && loaderData.url ) {
        var packages = loaderData.packages;
        packages.length > 0 && (packages[ packages.length - 1 ].last = true);

        tplData.loader = true;
        tplData.loaderConfig = true;
        tplData.loaderUrl = loaderData.url;
        tplData.loaderBaseUrl = loaderData.baseUrl;
        tplData.loaderPaths = loaderData.paths;
        tplData.loaderPackages = packages;
    }

    var tplFile = options.genTemplate || path.resolve( __dirname, '../../tpl/index.tpl' );
    var tpl = compileTpl.fromFile( tplFile );

    var fs = require( 'fs' );
    if ( !fs.existsSync( file ) ) {
        fs.writeFileSync( file, tpl( tplData ), 'utf8' );
    }
};
