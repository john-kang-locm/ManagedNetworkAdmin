'use strict';

angular.module('app.services', [])

    .value('version', '0.1')

.service('apiService', ['$http', '$q', function ($http, $q) {
    //var urlBase = 'http://localhost:56305/api/v1/';
    var urlBase = 'http://localhost:8002/api/v1/';
    var deferred = $q.defer();
    
    //getsites
    this.getsites = function () {
        $http({
            method: 'GET',
            url: urlBase + 'Sites/Get',
            //headers: {
            //    'Access-Control-Allow-Origin': '*',
            //    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            //    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            //    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //}
            //headers: {
            //    'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
            //}
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    this.getsitebyid = function (id) {
        $http({
            method: 'GET',
            url: urlBase + 'Sites/GetById',
            pararms: {Id:id}
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    //addsite
    this.addsite = function (site) {
        $http({
            method: 'POST',
            url: urlBase + 'Sites/Add',
            data: site
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    //updatesite
    this.updatesite = function (site) {
        $http({
            method: 'PUT',
            url: urlBase + 'Sites/Update',
            data: site
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    //getlayouts
    this.getlayouts = function () {
        var deferred1 = $q.defer();

        $http({
            method: 'GET',
            url: urlBase + 'Layouts/Get',
        }).
         success(function (result, status, headers, config) {
             deferred1.resolve(result)
         }).
         error(function (result, status, headers, config) {
             deferred1.reject(result);
         });

        return deferred1.promise;
    }

    this.getlayoutbyid = function (id) {
        $http({
            method: 'GET',
            url: urlBase + 'Layouts/GetById',
            pararms: { Id: id }
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }


    //addlayout
    this.addlayout = function (layout) {
        $http({
            method: 'PUT',
            url: urlBase + 'Layouts/Add',
            data: layout
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    //updatelayout
    this.updatelayout = function (layout) {
        $http({
            method: 'PUT',
            url: urlBase + 'Layouts/Update',
            data: layout
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    //getsitesettings
    this.getsitesettings = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: urlBase + 'SiteSettings/Get',
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    //addsitesetting
    this.addsitesetting = function (sitesetting) {
        $http({
            method: 'PUT',
            url: urlBase + 'Sitesettings/Add',
            data: sitesetting
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }

    //updatesitesetting
    this.updatesitesetting = function (sitesetting) {
        $http({
            method: 'PUT',
            url: urlBase + 'SiteSettings/Update',
            data: sitesetting
        }).
         success(function (data, status, headers, config) {
             deferred.resolve(data)
         }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }
    this.toggleActiveFlag = function (site) {
        $http({
            method: 'PUT',
            url: urlBase + 'Sites/ToggleActiveFlag',
            data: site
        }).
         success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });

        return deferred.promise;
    }


}]);