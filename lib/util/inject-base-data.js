module.exports = function ( data ) {
    data = data || {};

    var edpConfig = require( 'edp-config' );
    var author = edpConfig.get( 'user.name' );
    var authorEmail = edpConfig.get( 'user.email' );

    data.author = data.author || author;
    data.authorEmail = data.authorEmail || authorEmail;
    data.fileDescription = data.fileDescription 
        || '[Please Input File Description]';

    return data;
}; 
