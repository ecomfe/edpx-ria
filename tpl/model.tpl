/**
 * @file {{{fileDescription}}}
 * @author {{{author}}}({{{authorEmail}}})
 */

define( function ( require ) {
    var Model = require( 'er/Model' );
    var datasource = require( 'er/datasource' );

    /**
     * [Please Input Model Description]
     * 
     * @constructor
     */
    function {{{model}}}() {
        Model.apply( this, arguments );
    }

    {{{model}}}.prototype = {
        datasource: null
    };

    // return模块
    require( 'er/util' ).inherits( {{{model}}}, Model );
    return {{{model}}};
} );
