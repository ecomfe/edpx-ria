/**
 * @file {{{fileDescription}}}
 * @author {{{author}}}({{{authorEmail}}})
 */

define( function ( require ) {
    // require template
    require( 'er/tpl!{{{templateFile}}}' );

    var UIView = require( 'ef/UIView' );
    
    /**
     * [Please Input View Description]
     * 
     * @constructor
     */
    function {{{view}}}() {
        UIView.apply( this, arguments );
    }
    
    {{{view}}}.prototype = {
        template: '{{{templateTarget}}}',

        uiProperties: {
        },

        uiEvents: {
        }
    };

    require( 'er/util' ).inherits( {{{view}}}, UIView );
    return {{{view}}};
} );
