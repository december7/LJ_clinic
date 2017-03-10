<template>
    <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
            <div class="col-sm-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        <div class="">
                            <button onclick="fnClickAddRow()" class="btn btn-primary">+ 添加诊所</button>
                        </div>
                        <table class="table table-striped table-bordered table-hover dataTables-example">
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>诊所名称</th>
                                <th>诊所类型</th>
                                <th>法人姓名</th>
                                <th>法人身份证</th>
                                <th>联系电话</th>
                                <th>登陆账号</th>
                                <th>登陆密码</th>
                                <th>状态</th>
                                <th> </th>
                                <th>操作</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="gradeX">
                                <td class="text-center">1</td>
                                <td class="text-center">邻家诊所</td>
                                <td class="text-center">诊所</td>
                                <td class="text-center">张三</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">正常</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>停用</a></td>
                            </tr>
                            <tr class="gradeC">
                                <td class="text-center">2</td>
                                <td class="text-center">好医门诊部</td>
                                <td class="text-center">综合门诊部</td>
                                <td class="text-center">小小个</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">屏蔽</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>启用</a></td>
                            </tr>
                            <tr class="gradeX">
                                <td class="text-center">3</td>
                                <td class="text-center">邻家诊所</td>
                                <td class="text-center">诊所</td>
                                <td class="text-center">张三</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">正常</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>停用</a></td>
                            </tr>
                            <tr class="gradeC">
                                <td class="text-center">4</td>
                                <td class="text-center">好医门诊部</td>
                                <td class="text-center">综合门诊部</td>
                                <td class="text-center">小小个</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">屏蔽</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>启用</a></td>
                            </tr>
                            <tr class="gradeX">
                                <td class="text-center">5</td>
                                <td class="text-center">邻家诊所</td>
                                <td class="text-center">诊所</td>
                                <td class="text-center">张三</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">正常</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>停用</a></td>
                            </tr>
                            <tr class="gradeC">
                                <td class="text-center">6</td>
                                <td class="text-center">好医门诊部</td>
                                <td class="text-center">综合门诊部</td>
                                <td class="text-center">小小个</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">屏蔽</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>启用</a></td>
                            </tr>
                            <tr class="gradeX">
                                <td class="text-center">7</td>
                                <td class="text-center">邻家诊所</td>
                                <td class="text-center">诊所</td>
                                <td class="text-center">张三</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">正常</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>停用</a></td>
                            </tr>
                            <tr class="gradeC">
                                <td class="text-center">8</td>
                                <td class="text-center">好医门诊部</td>
                                <td class="text-center">综合门诊部</td>
                                <td class="text-center">小小个</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">屏蔽</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>启用</a></td>
                            </tr>
                            <tr class="gradeX">
                                <td class="text-center">9</td>
                                <td class="text-center">邻家诊所</td>
                                <td class="text-center">诊所</td>
                                <td class="text-center">张三</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">正常</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>停用</a></td>
                            </tr>
                            <tr class="gradeC">
                                <td class="text-center">10</td>
                                <td class="text-center">好医门诊部</td>
                                <td class="text-center">综合门诊部</td>
                                <td class="text-center">小小个</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">屏蔽</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>启用</a></td>
                            </tr>
                            <tr class="gradeX">
                                <td class="text-center">11</td>
                                <td class="text-center">邻家诊所</td>
                                <td class="text-center">诊所</td>
                                <td class="text-center">张三</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">正常</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>停用</a></td>
                            </tr>
                            <tr class="gradeC">
                                <td class="text-center">12</td>
                                <td class="text-center">好医门诊部</td>
                                <td class="text-center">综合门诊部</td>
                                <td class="text-center">小小个</td>
                                <td class="text-center">640323199212142838</td>
                                <td class="text-center">15757118001</td>
                                <td class="text-center">lizs001</td>
                                <td class="text-center">******</td>
                                <td class="text-center">屏蔽</td>
                                <td class="text-center"><a>详情</a></td>
                                <td class="text-center"><a>权限</a></td>
                                <td class="text-center"><a>启用</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
