/**
 * @file {{{fileDescription}}}
 * @author {{{author}}}({{{authorEmail}}})
 */

define( function ( require ) {
    var Action = require( 'er/Action' );

    /**
     * [Please Input Action Description]
     * 
     * @construct
     */
    function {{{action}}}() {
        Action.apply( this, arguments );
    }

    
    {{{action}}}.prototype = {
        modelType: require( '{{{model}}}' ),
        viewType: require( '{{{view}}}' )
    };
    

    require( 'er/util' ).inherits( {{{action}}}, Action );
    return {{{action}}};
} );
