/**
 * Created by sly on 9/24/14.
 */

'use strict';

/************************** services modlue *****************************/
var services = angular.module('services', [
    'ngResource',
    'ngRoute'
]);

/************************** database services *****************************/

//DataSource
services.service('DataSource', function($resource){
    return $resource('/api/data_sources/:id', null, {
        'update': {
            method: 'PUT'
        }
    });
})
.service('DataSourceBelongToFolder', function($resource){
    return $resource('/api/folders/:id/data_sources');
});

//Project
services.service('Project', function($resource){
    return $resource('/api/projects/:id', null, {
        'update': {method: 'PUT'}
    });
});

//Widget
services.service('Widget', function($resource){
    return $resource('/api/dashboards/:dashboardid/widgets/:id', null, {
        'update': {method: 'PUT'}
    });
});

//Dashboard
services.service('Dashboard', function($resource){
    return $resource('/api/dashboards/:id', null, {
        'update': {method: 'PUT'}
    });
});

//Record
services.service('RecordSave', function($resource){
    return $resource('/api/projects/:uuid/data_sources/:key');
})
.service('Record', function($resource){
    return $resource('/api/data_sources/:id/records');
})
.service('RecordDeleteOne', function($resource){
    return $resource('/api/records/:id');
})
.service('RecordDeleteAll', function ($resource){
    return $resource('/api/projects/:uuid/data_sources/:key/records/all');
})
.service('RecordMultiple', function($resource){
    return $resource('/api/multiple_data_sources/:data_infos/records');
});

//Folder
services.service('Folder', function($resource) {
    return $resource('/api/folders/:id', null, {
        'update': {method: 'PUT'}
    });
})
.service('SubFolder', function($resource) {
    return $resource('/api/folders/:parent_id/folders');
});

//User
services.service('User', function($resource) {
    return $resource('/api/users/:id', null, {
        'update': {method: 'PUT'}
    });
})
.service('UserToken', function ($resource){
    return $resource('/api/users/token/:id');
})
.service('CurrentUser', function ($resource){
    return $resource('/api/users/current');
})
.service('TokenReset', function ($resource){
    return $resource('/api/users/token_reset/:id', null, {
        'update': {method: 'PUT'}
    });
});

//UserRole
services.service('UserRole', function ($resource){
    return $resource('/api/user_roles/:id');
});

//Role
services.service('Role', function ($resource){
    return $resource('/api/roles/:id');
});

//RolePrivilege
services.service('RolePrivilege', function ($resource){
    return $resource('/api/role_privileges');
});

/************************** common services *****************************/
services.service('Message', ['$modal',
    function ($modal) {
        return {
            alert: function (message) {

                return $modal.open({
                    backdrop: 'static',
                    template: '<div class="modal-body">' + message + '</div>' +
                        '<div class="modal-footer"><button class="btn btn-primary" ng-click="$close()">{{ "CONFIRM" | translate }}</button></div>'
                });
            }
        };
    }
]);

services.service('widgetUrl', function () {
    return function (widget, dashboard) {
        if (!widget) {
            return 'stat';
        }

        var dataInfos = JSON.stringify(widget.config.dataInfos);
        var projectId = dashboard.project_id;

        return 'stat#/?projectId=' + projectId + '&dataInfos=' + dataInfos + '&period=0,6';
    };
});

services.service('NavUrl', ['$location', '$routeParams', '$window',
    function ($location, $routeParams, $window) {
        return function (targetNav){
            var href = null;
            var projectId = null;

            if($window.location.pathname === '/'){
                projectId = $routeParams.project_id ? parseInt($routeParams.project_id, 10) : null;
            }
            else if($window.location.pathname === '/admin' || $window.location.pathname === '/stat'){
                projectId = $routeParams.projectId ? parseInt($routeParams.projectId, 10) : null;
            }

            if(targetNav === 'index'){
                href = projectId ? ('/#/projects/' + projectId) : ('/');
            }
            else if(targetNav === 'stat'){
                href = projectId ? ('stat#/?projectId=' + projectId) : ('stat#/');
            }
            else if(targetNav === 'admin'){
                href = projectId ? ('admin#/dataSource?projectId=' + projectId) : ('admin#/');
            }

            return href;
        };
    }
]);
