'use strict';

angular.module('app.factories', [])

.factory('apiFactory', ['$http', function ($http) {
    //var urlBase = 'http://localhost:56305/api/v1/';
    var urlBase = 'http://localhost:8002/api/v1/';
    var factory = {}; // define factory object
   
 
        factory.getSites = function (successCallBack, errorCallBack) { // define method on factory object
            var mainInfo = $http({
                method: 'GET',
                url: urlBase + 'Sites/Get'
            }).success(function (result) {
                return successCallBack(result);
            }).error(function (result) {
                return errorCallBack(result);
            });
            return factory; // returning factory to make it ready to be pulled by the controller
        }

        factory.addSite = function (site) {
            return $http({
                method: 'POST',
                url: urlBase + 'Sites/Add',
                data: site
            })
        }

        factory.addSitesetting = function (sitesetting) {
            return $http({
                method: 'POST',
                url: urlBase + 'SiteSetting/Add',
                data: sitesetting
            })
        }

        factory.addLayout = function (layout) {
            return $http({
                method: 'POST',
                url: urlBase + 'Layout/Add',
                data: layout
            })
        }

        factory.updateSite = function (site) {
            return $http({
                method: 'POST',
                url: urlBase + 'Sites/Update',
                data: site
            })
        }

        factory.updateSitesetting = function (sitesetting) {
            return $http({
                method: 'POST',
                url: urlBase + 'SiteSetting/Update',
                data: sitesetting
            })
        }

        factory.updateLayout = function (layout) {
            return $http({
                method: 'POST',
                url: urlBase + 'Layout/Update',
                data: layout
            })
        }

        factory.Search = function (successCallBack, errorCallBack) {
        var mainInfo = $http({
            method: 'GET',
            url: urlBase + 'Sites/Get'
        }).success(function (result) {
            return successCallBack(result);
        }).error(function (result) {
            return errorCallBack(result);
        });
        return factory; // returning factory to make it ready to be pulled by the controller
    }
    return factory;
}]);

//app.controller(
//    "DemoController",
//    function ($scope, $http, transformRequestAsFormPost) {

//        // I hold the data-dump of the FORM scope from the server-side.
//        $scope.cfdump = "";

//        // By default, the $http service will transform the outgoing request by
//        // serializing the data as JSON and then posting it with the content-
//        // type, "application/json". When we want to post the value as a FORM
//        // post, we need to change the serialization algorithm and post the data
//        // with the content-type, "application/x-www-form-urlencoded".
//        var request = $http({
//            method: "post",
//            url: "process.cfm",
//            transformRequest: transformRequestAsFormPost,
//            data: {
//                id: 4,
//                name: "Kim",
//                status: "Best Friend"
//            }
//        });

//        // Store the data-dump of the FORM scope.
//        request.success(
//            function (html) {

//                $scope.cfdump = html;

//            }
//        );

//    }
//);
