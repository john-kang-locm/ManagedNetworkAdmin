'use strict';

angular.module('app.controllers', ['ngGrid', 'ngSanitize','app.models', 'app.factories', 'app.directives', 'app.services', 'ui.bootstrap'])

.controller('SiteController', ['$scope', '$modal', 'apiService', 'sitesManager', function ($scope,$modal, apiService, sitesManager) {

    $scope.homeGridOptions =
        {
            data: 'sites',
            enableCellSelection: true,
            enableRowSelection: true,
            //enableCellEditOnFocus: true,
            selectedItems: $scope.hGridSelections,
            afterSelectionChange: function () {
                $scope.aaa = $scope.hGridSelections;
            },
            columnDefs: [
                { field: "Name", pinned: true },
                { field: "Description" },
                { field: "DefaultLocation" },
                { field: "Hostname" },
                //{ field: "Settings[0].Name" },
                //{ field: "Settings[0].Value" },
                //{ field: "Settings[0].SiteId" },
                //{ field: "Layout" },
                { field: "CreatedOn" },
                { field: "UpdatedOn" },
                { displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Edit</button> ' },
                { displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" class="btn btn-primary" ng-click="deleteClub(row.entity)" >Delete</button> ' },
                { displayName: 'Activation', cellTemplate: '<button id="showBtn" type="button" class="btn btn-primary" ng-click="showTeams(row.entity)" >Activation</button> ' }

            ]
        };

    $scope.editSite = function (site) {

        var modalInstance = $modal.open({
            templateUrl: '/views/Template/Site.html',
            controller: 'ModalInstanceCtrl',
            backdrop: 'static',
            scope: $scope,
            resolve: {
                //'selectedSite': function () { return $scope.selectedSite; },
                //'selectedSite': function () { return angular.copy(site); },
                //'apiservice': function() { return $scope.apiservice; }
            }
            //resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } },
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });

        $scope.selectedSite = site;
        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    //$log.info('Modal dismissed at: ' + new Date());
        //});
    };


    $scope.getSite = function (site) {
        return sitesManager.getSite(site.Id).then(function (site) {
            $scope.site = site
        });
    };

    $scope.getSites = function () {
        return sitesManager.loadAllSites().then(function (sites) {
            sitesManager.loadAllSites();
            $scope.sites = sites
        });
    }

    $scope.getSites();
    //(function () {
    //    return $scope.getSites();
    //})

 

    //$scope.getSites();

}])




.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'apiService', function ($scope, $modalInstance, apiService) {
    //var items = ['item1', 'item2', 'item3'];
    $scope.myOptions = ["existing", "new"];
    $scope.settingContent = "new";
    $scope.layoutContent = "new";
    $scope.test3 = $scope.selectedSite;
    $scope.test4 = $scope.$parent.selectedSite;

    //$scope.sites = $scope.selectedSite;



    $scope.$watch('myModel', function (v) {
        console.log('changed', v);
    });

    //$scope.items = items;
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    //Perform the initialization
    //init();

    //function init() {
    //    apiService.getsitebyid($scope.selectedSite.Id)
    //        .then(function (data) {
    //            $scope.selectedSite = data;
    //        }, function (error) {
    //            //alert("error");
    //        });
    //}



    $scope.addsite = function () {
        alert("test");
        //$scope.sites.ActiveFlag = true;
        //$scope.sites.Id = 9999;

        ////$scope.sites.LayoutId = 9999;
        //$scope.sites.Layout = {Id:"2222"};
        //$scope.sites.DeletedFlag = true;
        //$scope.sites.UpdatedBy = 'John';
        //$scope.sites.UpdatedOn = new Date();

        //apiFactory.addSite($scope.sites).success(successPostCallback).error(errorCallback);
        //apiService.addsite($scope.sites)
        apiService.addsite($scope.selectedSite)
            .then(function (data) {
                $scope.myData = data;
            }, function (error) {
                alert("error");
            });
    }



    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}])
    .controller('LayoutAccordion', function ($scope) {
        $scope.oneAtATime = true;
        $scope.layoutData = $scope.selectedSite.Layout;;
        $scope.groups = [
          {
              title: 'Dynamic Group Header - 1',
              content: 'Dynamic Group Body - 1'
          },
          {
              title: 'Dynamic Group Header - 2',
              content: 'Dynamic Group Body - 2'
          }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function () {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: false,
            isFirstDisabled: false
        };
    })

    .controller('ExistingLayoutCtrl', function ($scope, $http, $modal, apiService, $location, $window) {
        $scope.layout = {};
        //$scope.layoutData = [];
        $scope.layoutData = $scope.selectedSite.Layout;
        //$scope.myData = [{name: "Moroni", age: 50},
        //           {name: "Tiancum", age: 43},
        //            {name: "Jacob", age: 27},
        //              {name: "Nephi", age: 29},
        //            {name: "Enos", age: 34}];
        $scope.existingLayoutGridOptions =
            {
                                showSelectionCheckbox: true,

                data: 'layoutData',
                selectedItems: $scope.elGridSelections,
                multiSelect: false,
                afterSelectionChange: function () {
                    $scope.sites.Layout = $scope.elGridSelections[0];
                },
                jqueryUITheme: true,
                enableCellSelection: true,
                enableRowSelection: true,
                //enableCellEditOnFocus: true,
                columnDefs: [
                    //{ field: "name", pinned: true },
                    //{ field: "age" },
  //{ field: "Name", pinned: true },
                    { field: "Id" },
                    { field: "Name", pinned: true },
                    { field: "Head" },
                    { field: "Header" },
                    { field: "Footer" },
                    //{ displayName: 'Select', cellTemplate: '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Select</button> ' },
                ]
            };


        //Perform the initialization
        init();

        function init() {
            apiService.getlayouts()
                .then(function (result) {
                    $scope.layoutData = result;
                }, function (error) {
                    alert("error");
                });
        }


        $scope.items = ['item1', 'item2', 'item3'];

        //$scope.addsite = function () {
        //    alert("test");
        //    $scope.sites.ActiveFlag = true;
        //    $scope.sites.Id = 9999;

        //    //$scope.sites.LayoutId = 9999;
        //    $scope.sites.Layout = {Id:"2222"};
        //    $scope.sites.DeletedFlag = true;
        //    $scope.sites.UpdatedBy = 'John';
        //    $scope.sites.UpdatedOn = new Date();

        //    //apiFactory.addSite($scope.sites).success(successPostCallback).error(errorCallback);
        //    apiService.addsite($scope.sites)
        //        .then(function (data) {
        //            $scope.myData = data;
        //        }, function (error) {
        //            alert("error");
        //        });
        //}

        $scope.editSite = function (site) {
            var modalInstance = $modal.open({
                templateUrl: '/views/Template/Site.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static',
                scope: $scope,
                resolve: {
                    //'selectedSite': function () { return site },
                    //'apiservice': function() { return $scope.apiservice; }
                }
                //resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } },
                //size: size,
                //resolve: {
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });
            $scope.selectedSite = site;


            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        //$scope.editSite = function (club) {
        //    $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } } });
        //    $scope.myDialog.open('Template/Site.html', 'ClubEditCtrl').then(function (result) {
        //        if (result === 'cancel') { }
        //        else {
        //            $scope.clubs = ClubRes.query();
        //        }
        //    });
        //};
        var successPostCallback = function (data, status, headers, config) {
            successCallback(data, status, headers, config).success(function () {
                $scope.toggleAddMode();
            });
        };

        var errorCallback = function (data, status, headers, config) {
            notificationFactory.error(data.ExceptionMessage);
        };



        $scope.login = function () {
            $location.path('/');
            return false;
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    })

      .controller('SettingAccordion', function ($scope) {
          $scope.oneAtATime = true;

          $scope.status = {
              isFirstOpen: false,
              isFirstDisabled: false
          };
      })

    .controller('ExistingSettingsCtrl', function ($scope, $http, $modal, apiService, $location, $window) {
        //$scope.settingsData = [];
        $scope.settingsData = $scope.selectedSite.SiteSettings;
        $scope.existingSettingsGridOptions =
            {
                //showSelectionCheckbox: true,

                data: 'settingsData',
                selectedItems: $scope.elGridSelections,
                multiSelect: true,
                afterSelectionChange: function () {
                    $scope.sites.Settings = $scope.elGridSelections;
                },
                jqueryUITheme: true,
                enableCellSelection: true,
                enableRowSelection: true,
                //enableCellEditOnFocus: true,
                columnDefs: [
                    { field: "Id" },
                    { field: "Name", pinned: true },
                    { field: "SiteId" },
                    { field: "Value", enableCellEdit: true, cellEditTemplate: '<input type="checkbox" ng-model="row.entity.Active" >' },
                    //{ field: "Value", enableCellEdit: true, cellEditTemplate: '<input type="checkbox" ng-checked="row.entity.value==\'on\'" ng-input="COL_FIELD" ' },
                    //{ displayName: 'Select', cellTemplate: '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Select</button> ' },
                ]
            };


        //Perform the initialization
        //init();

        //function init() {
        //    apiService.getsitesettings()
        //        .then(function (result) {
        //            $scope.settingsData = result;
        //        }, function (error) {
        //            alert("error");
        //        });
        //}


        $scope.items = ['item1', 'item2', 'item3'];

        $scope.editSite = function (site) {
            var modalInstance = $modal.open({
                templateUrl: '/views/Template/Site.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static',
                scope: $scope,
                resolve: {
                    //'selectedSite': function () { return site },
                    //'apiservice': function() { return $scope.apiservice; }
                }
                //resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } },
                //size: size,
                //resolve: {
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });
            $scope.selectedSite = site;


            //modalInstance.result.then(function (selectedItem) {
            //    $scope.selected = selectedItem;
            //}, function () {
            //    //$log.info('Modal dismissed at: ' + new Date());
            //});
        };

        //$scope.editSite = function (club) {
        //    $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } } });
        //    $scope.myDialog.open('Template/Site.html', 'ClubEditCtrl').then(function (result) {
        //        if (result === 'cancel') { }
        //        else {
        //            $scope.clubs = ClubRes.query();
        //        }
        //    });
        //};
        var successPostCallback = function (data, status, headers, config) {
            successCallback(data, status, headers, config).success(function () {
                $scope.toggleAddMode();
            });
        };

        var errorCallback = function (data, status, headers, config) {
            notificationFactory.error(data.ExceptionMessage);
        };



        $scope.login = function () {
            $location.path('/');
            return false;
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    })


    .controller('HomeCtrl', function ($scope, $http, $modal, apiService, apiFactory, $location, $window) {
        $scope.selectedSite = {};
        $scope.elGridSelections = [];

        $scope.sites = {};
        //$scope.sites.Layout = {};

        //$scope.apiService = apiService;

        //$scope.test = '<div id="footer" class="clear">            <div id="cellar">        <dl>   <dt>Advertising:</dt>   <dd><a href="http://commercialappeal.com/classifieds/" title="Classified Ads">Classified ads</a></dd>     <dd><a href="http://411.commercialappeal.com" title="Business directory">Business directory</a></dd>   <dd><a href="http://coupons.commercialappeal.com" title="Online Coupons">Coupons</a></dd>   <dd><a href="http://memphiscommercialappeal.tn.ussql07.newsmemory.com/marketplace.php" title="Today's ads">Today's ads</a></dd>     <dd><a href="http://commercialappeal.com/circulars/" title="Circulars">Circulars</a></dd>   <dd><a href="http://commercialappeal.com/specialsections/" title="Special Sections">Special Sections</a></dd>   <dd><a href="http://www.commercialappeal.com/classifieds/placead/" title="Place an ad">Place an ad</a></dd>    </dl>    <dl>   <dt>Marketing material:</dt>   <dd><a href="http://web.commercialappeal.com/mediakit/online/" title="Media Kit">Media kit</a></dd>     <dd><a href="http://web.commercialappeal.com/marketing/" title="Market data">Market data</a></dd>  </dl>    <dl>   <dt>Special features:</dt>     <dd><a href="http://www.commercialappeal.com/data/" title="Data center">Data center</a></dd>   <dd><a href="http://www.commercialappeal.com/topics/" title="Topics">Topics</a></dd>   <dd><a href="http://www.commercialappeal.com/projects/" title="Editorial projects">Editorial projects</a></dd>     <dd><a href="http://www.commercialappeal.com/archives/" title="Area Guide">Newspaper archives</a></dd>   <dd><a href="http://commercialappeal.com/news/blogs/" title="Blogs">Blogs</a></dd>   <dd><a href="http://focus.commercialappeal.com/" title="Focus">Focus</a></dd>    </dl>    <dl>   <dt>Education:</dt>   <dd><a href="http://www.commercialappeal.com/nie/" title="Newspapers in Education">Newspapers in Education</a></dd>     <dd><a href="http://academicallstars.commercialappeal.com/" title="Academic Allstars">Academic Allstars</a></dd>    </dl>    <dl>     <dt>Sister sites:</dt>   <dd><a href="http://www.midsouthmoms.com" title="Midsouthmoms.com">Midsouthmoms.com</a></dd>   <dd><a href="http://goelvis.com/" title="Goelvis">goEelvis.com</a></dd>     <dd><a href="http://411memphis.com/" title="411memphis">411memphis.com</a></dd>   <dd><a href="http://gomemphis.com/" title="GoMemphis">GoMemphis.com</a></dd>    </dl>    <dl id="business_directory">   <dt id="business_directory_prompt">Business Directory:</dt>   <dd id="business_directory_links">    <dl>       <dd><a href="http://local.commercialappeal.com/blinds/memphis/tn" title="Memphis Blinds">Blinds</a></dd>     <dd><a href="http://local.commercialappeal.com/buffet/memphis/tn" title="Memphis Buffet">Buffet</a></dd>     <dd><a href="http://local.commercialappeal.com/cabinets/memphis/tn" title="Memphis Cabinets">Cabinets</a></dd>       <dd><a href="http://local.commercialappeal.com/camp/memphis/tn" title="Memphis Camp">Camp</a></dd>     <dd><a href="http://local.commercialappeal.com/candles/memphis/tn" title="Memphis Candles">Candles</a></dd>     <dd><a href="http://local.commercialappeal.com/candy/memphis/tn" title="Memphis Candy">Candy</a></dd>       <dd><a href="http://local.commercialappeal.com/clothing/memphis/tn" title="Memphis Clothing">Clothing</a></dd>     <dd><a href="http://local.commercialappeal.com/condos/memphis/tn" title="Memphis Condod">Condos</a></dd>     <dd><a href="http://local.commercialappeal.com/cookies/memphis/tn" title="Memphis Cookies">Cookies</a></dd>       <dd><a href="http://local.commercialappeal.com/curtains/memphis/tn" title="Memphis Curtains">Curtains</a></dd>     <dd><a href="http://local.commercialappeal.com/dolls/memphis/tn" title="Memphis Dolls">Dolls</a></dd>     <dd><a href="http://local.commercialappeal.com/gift-baskets/memphis/tn" title="Memphis Gift Baskets">Gift Baskets</a></dd>       <dd><a href="http://local.commercialappeal.com/home-decor/memphis/tn" title="Memphis Home Decor">Home Decor</a></dd>     <dd><a href="http://local.commercialappeal.com/home-security/memphis/tn" title="Memphis Home Security">Home Security</a></dd>     <dd><a href="http://local.commercialappeal.com/home-theater/memphis/tn" title="Memphis Home Theater">Home Theater</a></dd>       <dd><a href="http://local.commercialappeal.com/lamps/memphis/tn" title="Memphis Lamps">Lamps</a></dd>     <dd><a href="http://local.commercialappeal.com/nanny/memphis/tn" title="Memphis Nanny">Nanny</a></dd>     <dd><a href="http://local.commercialappeal.com/nursery/memphis/tn" title="Memphis Nursery">Nursery</a></dd>       <dd><a href="http://local.commercialappeal.com/party-supplies/memphis/tn" title="Memphis Party Supplies">Party Supplies</a></dd>     <dd><a href="http://local.commercialappeal.com/preschool/memphis/tn" title="Memphis Preschool">Preschool</a></dd>     <dd><a href="http://local.commercialappeal.com/shoes/memphis/tn" title="Memphis Shoes">Shoes</a></dd>       <dd><a href="http://local.commercialappeal.com/t-shirts/memphis/tn" title="Memphis T-Shirts">T-Shirts</a></dd>     <dd><a href="http://local.commercialappeal.com/theater/memphis/tn" title="Memphis Theater">Theater</a></dd>     <dd><a href="http://local.commercialappeal.com/train/memphis/tn" title="Memphis Train">Train</a></dd>       <dd><a href="http://local.commercialappeal.com/yoga/memphis/tn" title="Memphis Yoga">Yoga</a>     <dd><a href="http://local.commercialappeal.com/zoo/memphis/tn" title="Memphis Zoo">Zoo</a></dd>    </dl>     </dd>  </dl>     </div> <!-- end #cellar -->         <div id="site_tools">           </div> <!-- end #site_tools -->         </div> <!-- end #footer -->         <div id="copyright" class="clear">     <img src="http://media.commercialappeal.com/corp_assets/asphalt/img/sing_logo.gif" alt="Scripps Interactive Newspaper Group" />      Scripps Interactive Newspapers Group<br/>     2009 The E.W. Scripps Co.<br/>       <span class="partners"><a href="http://commercialappeal.com/local-news/partners/" title="More news from our local partners">More news from our local partners &raquo;</a></span>     <a href="http://commercialappeal.com/privacy/" title="Privacy Policy">Privacy Policy</a> | <a href="http://commercialappeal.com/privacy/#user" title="User Agreement">User Agreement</a> | <a href="http://commercialappeal.com/privacy/#about_our_ads" title="About Our Ads">About Our Ads</a>                    </div> <!-- end #copyright -->         </div> <!-- end #page_wrapper -->     <script type="text/javascript">    $(document).ready(function(){     /* Javascript for initializing functions when the page loads */           if ($("#comments").length > 0) {initComments();}         });   </script>  </body>  </html>  ';
        $scope.test = '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Edit</button> ';
        $scope.sourceText = 'I am an <code>HTML</code>string with <a href="#">links!</a> and other <em>stuff</em>';
        $scope.sourceText = 'I am an  <em>stuff</em>';
        //$scope.test = $sce.trustAsHtml($scope.sourceText);
        //$scope.test = 'I am an  <em>stuff</em>';
        //$scope.test = '<div id="footer" class="clear">            <div id="cellar">        <dl>   <dt>Advertising:</dt>   <dd><a href="http://commercialappeal.com/classifieds/" title="Classified Ads">Classified ads</a></dd>     <dd><a href="http://411.commercialappeal.com" title="Business directory">Business directory</a></dd>   <dd><a href="http://coupons.commercialappeal.com" title="Online Coupons">Coupons</a></dd>   <dd><a href="http://memphiscommercialappeal.tn.ussql07.newsmemory.com/marketplace.php" title="Today's ads">Today's ads</a></dd>     <dd><a href="http://commercialappeal.com/circulars/" title="Circulars">Circulars</a></dd>   <dd><a href="http://commercialappeal.com/specialsections/" title="Special Sections">Special Sections</a></dd>   <dd><a href="http://www.commercialappeal.com/classifieds/placead/" title="Place an ad">Place an ad</a></dd>    </dl>    <dl>   <dt>Marketing material:</dt>   <dd><a href="http://web.commercialappeal.com/mediakit/online/" title="Media Kit">Media kit</a></dd>     <dd><a href="http://web.commercialappeal.com/marketing/" title="Market data">Market data</a></dd>  </dl>    <dl>   <dt>Special features:</dt>     <dd><a href="http://www.commercialappeal.com/data/" title="Data center">Data center</a></dd>   <dd><a href="http://www.commercialappeal.com/topics/" title="Topics">Topics</a></dd>   <dd><a href="http://www.commercialappeal.com/projects/" title="Editorial projects">Editorial projects</a></dd>     <dd><a href="http://www.commercialappeal.com/archives/" title="Area Guide">Newspaper archives</a></dd>   <dd><a href="http://commercialappeal.com/news/blogs/" title="Blogs">Blogs</a></dd>   <dd><a href="http://focus.commercialappeal.com/" title="Focus">Focus</a></dd>    </dl>    <dl>   <dt>Education:</dt>   <dd><a href="http://www.commercialappeal.com/nie/" title="Newspapers in Education">Newspapers in Education</a></dd>     <dd><a href="http://academicallstars.commercialappeal.com/" title="Academic Allstars">Academic Allstars</a></dd>    </dl>    <dl>     <dt>Sister sites:</dt>   <dd><a href="http://www.midsouthmoms.com" title="Midsouthmoms.com">Midsouthmoms.com</a></dd>   <dd><a href="http://goelvis.com/" title="Goelvis">goEelvis.com</a></dd>     <dd><a href="http://411memphis.com/" title="411memphis">411memphis.com</a></dd>   <dd><a href="http://gomemphis.com/" title="GoMemphis">GoMemphis.com</a></dd>    </dl>    <dl id="business_directory">   <dt id="business_directory_prompt">Business Directory:</dt>   <dd id="business_directory_links">    <dl>       <dd><a href="http://local.commercialappeal.com/blinds/memphis/tn" title="Memphis Blinds">Blinds</a></dd>     <dd><a href="http://local.commercialappeal.com/buffet/memphis/tn" title="Memphis Buffet">Buffet</a></dd>     <dd><a href="http://local.commercialappeal.com/cabinets/memphis/tn" title="Memphis Cabinets">Cabinets</a></dd>       <dd><a href="http://local.commercialappeal.com/camp/memphis/tn" title="Memphis Camp">Camp</a></dd>     <dd><a href="http://local.commercialappeal.com/candles/memphis/tn" title="Memphis Candles">Candles</a></dd>     <dd><a href="http://local.commercialappeal.com/candy/memphis/tn" title="Memphis Candy">Candy</a></dd>       <dd><a href="http://local.commercialappeal.com/clothing/memphis/tn" title="Memphis Clothing">Clothing</a></dd>     <dd><a href="http://local.commercialappeal.com/condos/memphis/tn" title="Memphis Condod">Condos</a></dd>     <dd><a href="http://local.commercialappeal.com/cookies/memphis/tn" title="Memphis Cookies">Cookies</a></dd>       <dd><a href="http://local.commercialappeal.com/curtains/memphis/tn" title="Memphis Curtains">Curtains</a></dd>     <dd><a href="http://local.commercialappeal.com/dolls/memphis/tn" title="Memphis Dolls">Dolls</a></dd>     <dd><a href="http://local.commercialappeal.com/gift-baskets/memphis/tn" title="Memphis Gift Baskets">Gift Baskets</a></dd>       <dd><a href="http://local.commercialappeal.com/home-decor/memphis/tn" title="Memphis Home Decor">Home Decor</a></dd>     <dd><a href="http://local.commercialappeal.com/home-security/memphis/tn" title="Memphis Home Security">Home Security</a></dd>     <dd><a href="http://local.commercialappeal.com/home-theater/memphis/tn" title="Memphis Home Theater">Home Theater</a></dd>       <dd><a href="http://local.commercialappeal.com/lamps/memphis/tn" title="Memphis Lamps">Lamps</a></dd>     <dd><a href="http://local.commercialappeal.com/nanny/memphis/tn" title="Memphis Nanny">Nanny</a></dd>     <dd><a href="http://local.commercialappeal.com/nursery/memphis/tn" title="Memphis Nursery">Nursery</a></dd>       <dd><a href="http://local.commercialappeal.com/party-supplies/memphis/tn" title="Memphis Party Supplies">Party Supplies</a></dd>     <dd><a href="http://local.commercialappeal.com/preschool/memphis/tn" title="Memphis Preschool">Preschool</a></dd>     <dd><a href="http://local.commercialappeal.com/shoes/memphis/tn" title="Memphis Shoes">Shoes</a></dd>       <dd><a href="http://local.commercialappeal.com/t-shirts/memphis/tn" title="Memphis T-Shirts">T-Shirts</a></dd>     <dd><a href="http://local.commercialappeal.com/theater/memphis/tn" title="Memphis Theater">Theater</a></dd>     <dd><a href="http://local.commercialappeal.com/train/memphis/tn" title="Memphis Train">Train</a></dd>       <dd><a href="http://local.commercialappeal.com/yoga/memphis/tn" title="Memphis Yoga">Yoga</a>     <dd><a href="http://local.commercialappeal.com/zoo/memphis/tn" title="Memphis Zoo">Zoo</a></dd>    </dl>     </dd>  </dl>     </div> <!-- end #cellar -->         <div id="site_tools">           </div> <!-- end #site_tools -->         </div> <!-- end #footer -->         <div id="copyright" class="clear">     <img src="http://media.commercialappeal.com/corp_assets/asphalt/img/sing_logo.gif" alt="Scripps Interactive Newspaper Group" />      Scripps Interactive Newspapers Group<br/>     2009 The E.W. Scripps Co.<br/>       <span class="partners"><a href="http://commercialappeal.com/local-news/partners/" title="More news from our local partners">More news from our local partners &raquo;</a></span>     <a href="http://commercialappeal.com/privacy/" title="Privacy Policy">Privacy Policy</a> | <a href="http://commercialappeal.com/privacy/#user" title="User Agreement">User Agreement</a> | <a href="http://commercialappeal.com/privacy/#about_our_ads" title="About Our Ads">About Our Ads</a>                    </div> <!-- end #copyright -->         </div> <!-- end #page_wrapper -->     <script type="text/javascript">    $(document).ready(function(){     /* Javascript for initializing functions when the page loads */           if ($("#comments").length > 0) {initComments();}         });   </script>  </body>  </html>  ';
        $scope.$root.title = 'Managed Network Admin';
        $scope.sitesData = [];
        $scope.hGridSelections = [];
        //$scope.myData = [{name: "Moroni", age: 50},
        //           {name: "Tiancum", age: 43},
        //            {name: "Jacob", age: 27},
        //              {name: "Nephi", age: 29},
        //            {name: "Enos", age: 34}];
        $scope.homeGridOptions =
            {
                data: 'sitesData',
                enableCellSelection: true,
                enableRowSelection: true,
                //enableCellEditOnFocus: true,
                selectedItems: $scope.hGridSelections,
                afterSelectionChange: function () {
                    $scope.aaa = $scope.hGridSelections;
                },
                columnDefs: [
                    //{ field: "name", pinned: true },
                    //{ field: "age" },
  { field: "Name", pinned: true },
                    { field: "Description" },
                    { field: "DefaultLocation" },
                    { field: "Hostname" },
                    //{ field: "Settings[0].Name" },
                    //{ field: "Settings[0].Value" },
                    //{ field: "Settings[0].SiteId" },
                    //{ field: "Layout" },
                    { field: "CreatedOn" },
                    { field: "UpdatedOn" },
                    { displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Edit</button> ' },
          { displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" class="btn btn-primary" ng-click="deleteClub(row.entity)" >Delete</button> ' },
          { displayName: 'Activation', cellTemplate: '<button id="showBtn" type="button" class="btn btn-primary" ng-click="showTeams(row.entity)" >Activation</button> ' }

                ]
            };


        //Perform the initialization
        init();

        function init() {
            apiService.getsites()
                .then(function (data) {
                    $scope.sitesData = data;
                }, function (error) {
                    alert("error");
                });
        }


        $scope.items = ['item1', 'item2', 'item3'];

        //$scope.addsite = function () {
        //    alert("test");
        //    $scope.sites = $scope.selectedSite;
        //    $scope.sites.ActiveFlag = true;
        //    $scope.sites.Id = 9999;
        //    //$scope.sites.Layout = $scope.elGridSelections;
        //    //$scope.sites.LayoutId = $scope.elGridSelections.LayoutId;
        //    //$scope.sites.Layout = { Id: "2222" };
        //    $scope.sites.DeletedFlag = true;
        //    $scope.sites.UpdatedBy = 'test';
        //    $scope.sites.UpdatedOn = new Date();

        //    //apiFactory.addSite($scope.sites).success(successPostCallback).error(errorCallback);
        //    apiService.addsite($scope.sites)
        //        .then(function (data) {
        //            $scope.sitesData = data;
        //        }, function (error) {
        //            alert("error");
        //        });
        //}



        $scope.addSite = function (site) {

            var modalInstance = $modal.open({
                templateUrl: '/views/Template/Site.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static',
                scope: $scope,
                resolve: {
                    //'selectedSite': function () { return $scope.selectedSite; },
                    'selectedSite': function () { return angular.copy(site); },
                    //'apiservice': function() { return $scope.apiservice; }
                }
                //resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } },
                //size: size,
                //resolve: {
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });

            $scope.selectedSite = site;
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.editSite = function (site) {

            var modalInstance = $modal.open({
                templateUrl: '/views/Template/Site.html',
                controller: 'ModalInstanceCtrl',
                backdrop: 'static',
                scope: $scope,
                resolve: {
                    //'selectedSite': function () { return $scope.selectedSite; },
                    'selectedSite': function () { return angular.copy(site); },
                    //'apiservice': function() { return $scope.apiservice; }
                }
                //resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } },
                //size: size,
                //resolve: {
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });

            $scope.selectedSite = site;
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };


        $scope.editClub = function (club) {
            $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { club: function () { return angular.copy(club); } } });
            $scope.myDialog.open('club/Site.html', 'ClubEditCtrl').then(function (result) {
                if (result === 'cancel') { }
                else {
                    $scope.clubs = ClubRes.query();
                }
            });
        };

        //$scope.editSite = function (club) {
        //    $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { club: function () { return angular.copy(club); }, isNew: function () { return false; } } });
        //    $scope.myDialog.open('Template/Site.html', 'ClubEditCtrl').then(function (result) {
        //        if (result === 'cancel') { }
        //        else {
        //            $scope.clubs = ClubRes.query();
        //        }
        //    });
        //};
        var successPostCallback = function (data, status, headers, config) {
            successCallback(data, status, headers, config).success(function () {
                $scope.toggleAddMode();
            });
        };

        var errorCallback = function (data, status, headers, config) {
            notificationFactory.error(data.ExceptionMessage);
        };



        $scope.login = function () {
            $location.path('/');
            return false;
        };

        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    })





.controller('ClubEditCtrl', function ClubEditController($scope, dialog, club, isNew) {
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
    var test = ["aaa", "bbb"];
    return test;
    //return $resource("../clubs/:id.json", { id: '@id' }, { 'update': { method: 'PUT' }, 'remove': { method: 'DELETE', headers: { 'Content-Type': 'application/json' } } });
})

.controller('CustomDirectivesController', function ($scope, $http) {
    $scope.getTabs = function (data) {
        $scope.tabsData = data.tabs;
    };

    $scope.loadTabs = function (num) {
        $http.jsonp("http://subliminalsources.com/wp-content/uploads/2014/02/tabs" + num + ".js")
            .success(function (data)
            { $scope.tabsData = data })
        .error(function (data)
        { $scope.tabsData = data });
    }

    $scope.tabsData = [];
})
.controller('TabsDemoCtrl', function ($scope) {
    $scope.tabs = [
      { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
      { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    ];

    $scope.alertMe = function () {
        setTimeout(function () {
            alert('You\'ve selected the alert tab!');
        });
    };
})

// Path: /search
.controller('SearchCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.Search = function () { };
}])

// Path: /about
.controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.$root.title = 'AngularJS SPA | About';
    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
}])

// Path: /login
.controller('LoginCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.$root.title = 'AngularJS SPA | Sign In';
    // TODO: Authorize a user
    $scope.login = function () {
        $location.path('/');
        return false;
    };
    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
}])

// Path: /error/404
.controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    $scope.$root.title = 'Error 404: Page Not Found';
    $scope.$on('$viewContentLoaded', function () {
        $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    });
}]);