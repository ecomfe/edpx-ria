/**
 * @file 将字符串首字母变成大写
 * @author errorrik[errorrik@gmail.com]
 */

/**
 * 将字符串首字母变成大写
 * 
 * @param {string} source 源字符串
 * @return {string}
 */
module.exports = function ( source )  {
    return source[ 0 ].toUpperCase() + source.slice( 1 );
};
