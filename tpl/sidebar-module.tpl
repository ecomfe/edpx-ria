/**
 * @file sidebar行为管理
 * @author {{{author}}}({{{authorEmail}}})
 */

define( function ( require ) {

    var NEIGHBOR_ID             = 'main-area';
    var NEIGHBOR_CLASS          = 'main-area';
    var NEIGHBOR_FIXED_CLASS    = 'main-area-sidebar-neighbor';
    var NEIGHBOR_AUTOHIDE_CLASS = 'main-area-sidebar-neighbor-hide';

    var esui = require( 'esui' );
    require( 'esui/Sidebar' );

    /**
     * 获取侧边栏控件对象
     * 
     * @inner
     * @return {esui/Sidebar}
     */
    function getSidebarControl() {
        return esui.get( 'sidebar' );
    }

    /**
     * 更新侧边栏的邻居元素的视图
     * 
     * @inner
     * @param {Object} sidebarArg 侧边栏状态参数
     */
    function updateNeighborView( sidebarArg ) {
        var neighborExtraClass = NEIGHBOR_AUTOHIDE_CLASS;
        if ( sidebarArg.mode === 'fixed' ) {
            neighborExtraClass = NEIGHBOR_FIXED_CLASS;
        }

        var neighbor = document.getElementById( NEIGHBOR_ID );
        neighbor.className = NEIGHBOR_CLASS + ' ' + neighborExtraClass;
    };
    
    return {
        init: function ( options ) {
            options = options || {};

            var initMode = options.displayMode || 'fixed';
            var sidebarOptions = { 
                mode: initMode
            };

            esui.init(
                document.body, 
                {
                    properties: {
                        sidebar: sidebarOptions
                    }
                }
            );
            getSidebarControl().onmodechange = updateNeighborView;
            updateNeighborView( sidebarOptions );
        }
    };

} );
