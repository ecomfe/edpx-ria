/**
 * 命令行配置项
 *
 * @inner
 * @type {Object}
 */
var cli = {};

/**
 * 命令名称
 *
 * @type {string}
 */
cli.command = 'riaproject';

/**
 * 命令描述信息
 *
 * @type {string}
 */
cli.description = '测试riaproject';

/**
 * 命令用法信息
 *
 * @type {string}
 */
cli.usage = 'edp riaproject';

/**
 * 模块命令行运行入口
 * 
 * @param {Array} args 命令运行参数
 */
cli.main = function ( args ) {
    console.log( 'Hello riaproject!' );
};

/**
 * 命令行配置项
 *
 * @type {Object}
 */
exports.cli = cli;
