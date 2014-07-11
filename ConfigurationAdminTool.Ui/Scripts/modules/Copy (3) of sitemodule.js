'use strict';
angular.module('league.site', [
  //'ui.state',
  // 'ngGrid'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config($stateProvider) {
    $stateProvider.state('site', {
        url: '/site',
        views: {
            "main": {
                controller: 'SiteCtrl',
                templateUrl: 'site/site.tpl.html'
            }
        },
        data: { pageTitle: 'site' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller('SiteCtrl', function siteController($scope, siteRes, $dialog, $location) {
    $scope.sites = siteRes.query();
    $scope.homeGridOptions = {
        data: 'sites',
        columnDefs: [
          { field: 'id', displayName: 'Id' },
          { field: 'name', displayName: 'site Name' },
          { field: 'contact_officer', displayName: 'Contact Officer' },
          { displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Edit</button> ' },
          { displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" class="btn btn-primary" ng-click="deleteSite(row.entity)" >Delete</button> ' },
          { displayName: 'Show Teams', cellTemplate: '<button id="showBtn" type="button" class="btn btn-primary" ng-click="activateSite(row.entity)" >Show Teams</button> ' }
        ],
        multiSelect: false
    };

    $scope.editSite = function (site) {
        $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } } });
        $scope.myDialog.open('site/Site.html', 'siteEditCtrl').then(function (result) {
            if (result === 'cancel') { }
            else {
                $scope.sites = siteRes.query();
            }
        });
    };

    $scope.newsite = function () {
        $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { site: function () { return new siteRes(); }, isNew: function () { return true; } } });
        $scope.myDialog.open('site/Site.html', 'siteEditCtrl').then(function (result) {
            if (result === 'cancel') { }
            else {
                $scope.sites = siteRes.query();
            }
        });
    };

    $scope.deleteSite = function (site) {
        site.$remove(function () {
            $scope.sites = siteRes.query();
        },
                      function (error) {
                          $scope.msgbox = $dialog.messageBox('Error', error, [{ label: 'OK' }]);
                          $scope.msgbox.open();
                      });
    };

    $scope.activateSite = function (site) {
        $location.path("/team").search({ site_id: site.id });
    };
})

/**
 * We define a controller for the edit action
 */
.controller('siteEditCtrl', function siteEditController($scope, siteRes, dialog, site, isNew) {
    $scope.site = site;
    $scope.submit = function () {
        if (isNew) {
            $scope.site.$save(function (data) {
                dialog.close($scope.site);
            },
                                function (error) {
                                    // don't close dialog, display an error
                                    $scope.error = error;
                                });
        }
        else {
            $scope.site.$update(function (data) {
                dialog.close($scope.site);
            },
                                  function (error) {
                                      // don't close dialog, display an error
                                      $scope.error = error;
                                  });
        }

    };

    $scope.cancel = function () {
        dialog.close('cancel');
    };
})


/**
 * Add a resource to allow us to get at the server
 */
.factory('siteRes', function ($resource) {
    var test = [];
    return test;
    return $resource("../sites/:id.json", { id: '@id' }, { 'update': { method: 'PUT' }, 'remove': { method: 'DELETE', headers: { 'Content-Type': 'application/json' } } });
})
;