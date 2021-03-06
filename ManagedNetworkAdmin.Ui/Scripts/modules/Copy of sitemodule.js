﻿'use strict';
angular.module('league.club', [
  'ui.state',
  'ngResource',
   'ngGrid'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config($stateProvider) {
    $stateProvider.state('club', {
        url: '/club',
        views: {
            "main": {
                controller: 'SiteCtrl',
                templateUrl: 'club/club.tpl.html'
            }
        },
        data: { pageTitle: 'Club' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller('SiteCtrl', function ClubController($scope, ClubRes, $dialog, $location) {
    $scope.clubs = ClubRes.query();
    $scope.homeGridOptions = {
        data: 'clubs',
        columnDefs: [
          { field: 'id', displayName: 'Id' },
          { field: 'name', displayName: 'Club Name' },
          { field: 'contact_officer', displayName: 'Contact Officer' },
          { displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Edit</button> ' },
          { displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" class="btn btn-primary" ng-click="deleteClub(row.entity)" >Delete</button> ' },
          { displayName: 'Show Teams', cellTemplate: '<button id="showBtn" type="button" class="btn btn-primary" ng-click="showTeams(row.entity)" >Show Teams</button> ' }
        ],
        multiSelect: false
    };

    $scope.editSite = function (club) {
        $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } } });
        $scope.myDialog.open('club/Site.html', 'ClubEditCtrl').then(function (result) {
            if (result === 'cancel') { }
            else {
                $scope.clubs = ClubRes.query();
            }
        });
    };

    $scope.newClub = function () {
        $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { club: function () { return new ClubRes(); }, isNew: function () { return true; } } });
        $scope.myDialog.open('club/Site.html', 'ClubEditCtrl').then(function (result) {
            if (result === 'cancel') { }
            else {
                $scope.clubs = ClubRes.query();
            }
        });
    };

    $scope.deleteClub = function (club) {
        club.$remove(function () {
            $scope.clubs = ClubRes.query();
        },
                      function (error) {
                          $scope.msgbox = $dialog.messageBox('Error', error, [{ label: 'OK' }]);
                          $scope.msgbox.open();
                      });
    };

    $scope.showTeams = function (club) {
        $location.path("/team").search({ club_id: club.id });
    };
})

/**
 * We define a controller for the edit action
 */
.controller('ClubEditCtrl', function ClubEditController($scope, ClubRes, dialog, club, isNew) {
    $scope.club = club;
    $scope.submit = function () {
        if (isNew) {
            $scope.club.$save(function (data) {
                dialog.close($scope.club);
            },
                                function (error) {
                                    // don't close dialog, display an error
                                    $scope.error = error;
                                });
        }
        else {
            $scope.club.$update(function (data) {
                dialog.close($scope.club);
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
.factory('ClubRes', function ($resource) {
    return $resource("../clubs/:id.json", { id: '@id' }, { 'update': { method: 'PUT' }, 'remove': { method: 'DELETE', headers: { 'Content-Type': 'application/json' } } });
})
;