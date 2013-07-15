module.exports = function ( projectInfo, moduleName ) {
    if ( !projectInfo ) {
        return;
    }

    var path = require( 'path' );
    return path.resolve( projectInfo.dir, 'src', moduleName ) + '.js';
};
