riaproject
---------

### Usage

    edp riaproject init [--has-sidebar]
    edp riaproject genpage [pagePath]


### Description

RIA类型项目的edp扩展，主命令为riaproject，包含以下子命令:

+ init
+ genpage


#### init 

在当前目录下初始化一个RIA类型的项目。调用该命令将自动导入EF、ER、ESUI、EST、ESF-MS，自动生成项目目录结构，并生成index.html。

`--has-sidebar`参数被指定时，生成的index.html中将包含sidebar结构，并生成模块 **common/sidebar** ，对侧边栏的显示状态进行管理。

    mkdir project-dir
    cd project-dir
    edp riaproject init


#### genpage 

生成一个页面。在使用了ER3的项目中，一个页面通常包含Action、Model、View、template，以及Action的配置。genpage命令将生成所有这些东西。

`pagePath`在RIA项目中，指的是hash后面的路径。比如 **index.html?query#/biz/list** 中，`pagePath`为 **/biz/list**。

    edp riaproject genpage /plan/list
