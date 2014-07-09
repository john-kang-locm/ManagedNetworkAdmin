'use strict';

angular.module('app.controllers', ['ngGrid', 'ngSanitize', 'app.models', 'app.factories', 'app.directives', 'app.services','ui.router', 'ui.bootstrap', 'textAngular'])

    .controller("TabsParentController", function ($scope) {
 
        var setAllInactive = function() {
            angular.forEach($scope.workspaces, function(workspace) {
                workspace.active = false;
            });
        };
 
        var addNewWorkspace = function() {
            var id = $scope.workspaces.length + 1;
            $scope.workspaces.push({
                id: id,
                name: "Workspace " + id,
                active: true
            });
        };
 
        $scope.workspaces =
        [
            { id: 1, name: "Workspace 1", active:true  },
            { id: 2, name: "Workspace 2", active:false }
        ];
 
        $scope.addWorkspace = function () {
            setAllInactive();
            addNewWorkspace();
        };       
 
    })



    //	.config(function($stateProvider, $urlRouterProvider){

	//	$urlRouterProvider.otherwise("/main/tab1");

	//	$stateProvider
	//		.state("main", { abtract: true, url:"/main", templateUrl:"main.html" })
	//			.state("main.tab1", { url: "/tab1", templateUrl: "tab1.html" })
	//			.state("main.tab2", { url: "/tab2", templateUrl: "tab2.html" })
	//			.state("main.tab3", { url: "/tab3", templateUrl: "tab3.html" });

	//})

.config(function($stateProvider, $urlRouterProvider){
 
    $urlRouterProvider.otherwise("/main/tab1");
 
    $stateProvider
        .state("main", { abstract: true, url: "/main", template: "<h1>HELLO SITE SITE!</h1>" })
            .state("main.tab1", { url: "/tab1", template: "<h1>HELLO SITE1!</h1>" })
            .state("main.tab2", { url: "/tab2", template: "<h1>HELLO SITE2!</h1>" })
            .state("main.tab3", { url: "/tab3", template: "<h1>HELLO SITE3!</h1>" });
})
.controller('FirstTabCtrl', ['$scope',
function ($scope) {
    console.log('Loading FirstTabCtrl');
    $scope.title = 'First Tab';
}
])

.controller('SecondTabCtrl', ['$scope',
function ($scope) {
    console.log('Loading SecondTabCtrl');
    $scope.title = 'Second Tab';
}
])

.controller('ThirdTabCtrl', ['$scope',
function ($scope) {
    console.log('Loading ThirdTabCtrl');
    $scope.title = 'Third Tab';
}
])


	.controller("mainController", function($rootScope, $scope, $state) {		

		$scope.go = function(route){
			$state.go(route);
		};

		$scope.active = function(route){
			return $state.is(route);
		};

		$scope.tabs = [
			{ heading: "Tab 1", route:"main.tab1", active:false },
			{ heading: "Tab 2", route:"main.tab2", active:false },
			{ heading: "Tab 3", route:"main.tab3", active:false },
		];

		$scope.$on("$stateChangeSuccess", function() {
			$scope.tabs.forEach(function(tab) {
				tab.active = $scope.active(tab.route);
			});
		});
	})



          .controller('wysiwygeditor', ['$scope', 'textAngularManager', '$document', function ($scope, textAngularManager, $document) {
              $scope.data = { orightml: '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><p>昮朐 魡 燚璒瘭 譾躒鑅, 皾籈譧 紵脭脧 逯郹酟 煃 瑐瑍, 踆跾踄 趡趛踠 顣飁 廞 熥獘 豥 蔰蝯蝺 廦廥彋 蕍蕧螛 溹溦 幨懅憴 妎岓岕 緁, 滍 蘹蠮 蟷蠉蟼 鱐鱍鱕, 阰刲 鞮鞢騉 烳牼翐 魡 骱 銇韎餀 媓幁惁 嵉愊惵 蛶觢, 犝獫 嶵嶯幯 縓罃蔾 魵 踄 罃蔾 獿譿躐 峷敊浭, 媓幁 黐曮禷 椵楘溍 輗 漀 摲摓 墐墆墏 捃挸栚 蛣袹跜, 岓岕 溿 斶檎檦 匢奾灱 逜郰傃</p>' };
              $scope.data.htmlcontent = $scope.data.orightml;
              $scope.data.htmlcontent3;
              $scope.$watch('data.htmlcontent3', function (val) { console.log(val); });
              $scope.disabled = false;
              $scope.canEdit = true;
              $scope.changetesth1 = function () {
                  textAngularManager.updateToolbarToolDisplay('test', 'h1', { buttontext: 'Heading 1' });
              };
              $scope.changeallh2 = function () {
                  textAngularManager.updateToolDisplay('h2', { buttontext: 'Heading 2' });
              };
              $scope.changeallh = function () {
                  var data = {};
                  for (var i = 1; i < 7; i++) {
                      data['h' + i] = { buttontext: 'Heading ' + i };
                  }
                  textAngularManager.updateToolsDisplay(data);
              };
              $scope.resettoolbar = function () {
                  textAngularManager.resetToolsDisplay();
              };
              $scope.iconsallh = function () {
                  var data = {};
                  for (var i = 1; i < 7; i++) {
                      data['h' + i] = {
                          iconclass: 'fa fa-flag',
                          buttontext: i
                      };
                  }
                  textAngularManager.updateToolsDisplay(data);
              };
              $scope.clear = function () {
                  $scope.data = { orightml: '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>' };
              };
          }])



.controller('SiteController', ['$scope', '$modal', 'apiService', 'sitesManager', function ($scope, $modal, apiService, sitesManager) {


    //====

    $scope.filterOptions = {
        filterText: "",
        //useExternalFilter: true
    };
    //$scope.pagingOptions = {
    //    pageSizes: [250, 500, 1000],
    //    pageSize: 250,
    //    totalServerItems: 0,
    //    currentPage: 1
    //};
    //$scope.setPagingData = function (data, page, pageSize) {
    //    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    //    $scope.myData = pagedData;
    //    $scope.pagingOptions.totalServerItems = data.length;
    //    if (!$scope.$$phase) {
    //        $scope.$apply();
    //    }
    //};
    //$scope.getPagedDataAsync = function (pageSize, page, searchText) {
    //    setTimeout(function () {
    //        var data;
    //        if (searchText) {
    //            var ft = searchText.toLowerCase();
    //            $http.get('largeLoad.json').success(function (largeLoad) {
    //                data = largeLoad.filter(function (item) {
    //                    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
    //                });
    //                $scope.setPagingData(data, page, pageSize);
    //            });
    //        } else {
    //            $http.get('largeLoad.json').success(function (largeLoad) {
    //                $scope.setPagingData(largeLoad, page, pageSize);
    //            });
    //        }
    //    }, 100);
    //};

    //$scope.myData = $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    //$scope.$watch('pagingOptions', function () {
    //    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    //}, true);
    //$scope.$watch('filterOptions', function () {
    //    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    //}, true);


    //====
    $scope.homeGridOptions =
        {
            //enablePaging: true,
            //pagingOptions: $scope.pagingOptions,
            filterOptions: $scope.filterOptions,
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
                { displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" class="btn btn-primary" ng-click="deleteSite(row.entity)" >Delete</button> ' },
                { displayName: 'Activate', cellTemplate: '<button id="showBtn" type="button" class="btn btn-primary" ng-click="activateSite(row.entity)" >Activate</button> ' }

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
            //resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } },
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

    //    $scope.states = [{ short: 'CA', long: 'California' },
    //{ short: 'TX', long: 'Texas' },
    //{ short: 'NY', long: 'Newyork' },
    //    ];
    $scope.states = ['CA', 'TX', 'NY'];

    $scope.myOptions = ["existing", "new"];
    //$scope.settingContent = "new";
    $scope.layoutContent = "new";
    $scope.test3 = $scope.selectedSite;
    $scope.test4 = $scope.$parent.selectedSite;
    //$scope.selectedSite.DefaultState = $scope.states[0];
    //$scope.DefaultState = $scope.states[$scope.selectedSite.DefaultState];
    //$scope.sites = $scope.selectedSite;

    function getDafaultState(state) {
        for (var i = 0; i < $scope.states.length; i++) {
            if ($scope.states[i].short === state) {
                return $scope.states[i];
            }
        }
    };
    //$scope.selectedDafaultState= getDafaultState($scope.selectedSite.DefaultState);

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
        //alert("test");
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

        $scope.ok();
    }

    $scope.updatesite = function () {
        //alert("test");
        //$scope.sites.ActiveFlag = true;
        //$scope.sites.Id = 9999;

        ////$scope.sites.LayoutId = 9999;
        //$scope.sites.Layout = {Id:"2222"};
        //$scope.sites.DeletedFlag = true;
        //$scope.sites.UpdatedBy = 'John';
        //$scope.sites.UpdatedOn = new Date();

        //apiFactory.addSite($scope.sites).success(successPostCallback).error(errorCallback);
        //apiService.addsite($scope.sites)
        apiService.updatesite($scope.selectedSite)
            .then(function (data) {
                $scope.myData = data;
            }, function (error) {
                alert("error");
            });

        $scope.ok();
    }



    $scope.ok = function () {
        //$modalInstance.close($scope.selected.item);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}])
    .controller('LayoutAccordion', function ($scope) {
        $scope.oneAtATime = true;
        $scope.layoutData = $scope.selectedSite.Layout;;
        //$scope.layoutData.Header = '<iframe src="http://www.w3schools.com"></iframe>';
        //$scope.layoutData.Header = '<img src="http://pagead2.googlesyndication.com/simgad/2575997819166219728" border="0" width="491" height="223" alt="" class="img_ad">';
        $scope.onLayoutChange = function() {
            $scope.selectedSite.LayoutId = 0;
        }

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
                selectedItems: $scope.selectedLayout,
                multiSelect: false,
                afterSelectionChange: function () {
                    $scope.selectedSite.Layout = $scope.selectedLayout[0];
                    //$scope.selectedSite.LayoutId = $scope.selectedSite.Layout[0].Id;
                    //$scope.selectedSite.LayoutId = 0;
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
                    { field: "Tracking" },
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
                //resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } },
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

        //$scope.editSite = function (site) {
        //    $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } } });
        //    $scope.myDialog.open('Template/Site.html', 'siteEditCtrl').then(function (result) {
        //        if (result === 'cancel') { }
        //        else {
        //            $scope.sites = siteRes.query();
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
                selectedItems: $scope.selectedSettings,
                multiSelect: true,
                afterSelectionChange: function () {
                    $scope.selectedSite.Settings = $scope.selectedSettings;
                },
                jqueryUITheme: true,
                enableCellSelection: true,
                enableRowSelection: true,
                //enableCellEditOnFocus: true,
                columnDefs: [
                    { field: "Id" },
                    { field: "Name", pinned: true },
                    { field: "SiteId" },
                    { field: "Value", enableCellEdit: true }
                    //{ field: "Value", enableCellEdit: true, cellEditTemplate: '<input type="checkbox" ng-model="row.entity.Active" >' },
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
                //resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } },
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

        //$scope.editSite = function (site) {
        //    $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } } });
        //    $scope.myDialog.open('Template/Site.html', 'siteEditCtrl').then(function (result) {
        //        if (result === 'cancel') { }
        //        else {
        //            $scope.sites = siteRes.query();
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
        $scope.selectedLayout = [];

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
        $scope.sitesGridData = [];
        $scope.hGridSelections = [];
        //$scope.myData = [{name: "Moroni", age: 50},
        //           {name: "Tiancum", age: 43},
        //            {name: "Jacob", age: 27},
        //              {name: "Nephi", age: 29},
        //            {name: "Enos", age: 34}];

        //$scope.filterOptions = {
        //    filterText: ''
        //    //useExternalFilter: true
        //};
        //$scope.filterOptions = {
        //    filterText: ''
        //};


        $scope.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        $scope.totalServerItems = 0;
        $scope.pagingOptions = {
            pageSizes: [20, 50, 100],
            pageSize: 20,
            currentPage: 1
        };
        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.sitesGridData = pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };
        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(function () {
                var data,
                    urlBase = 'http://localhost:8002/api/v1/';

                if (searchText) {
                    var ft = searchText.toLowerCase();
                    //$http.get(urlBase + 'Sites/Get').success(function (largeLoad) {
                    //    $scope.sitesGridData = largeLoad.filter(function (item) {
                    //        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //    });
                    //    $scope.setPagingData($scope.sitesGridData, page, pageSize);
                    //});
                    data = $scope.sitesData.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data, page, pageSize);

                } else {
                    $http.get(urlBase + 'Sites/Get').success(function (largeLoad) {
                        $scope.sitesData = largeLoad;
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
                }
            }, 100);
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.homeGridOptions =
            {
                data: 'sitesGridData',
                filterOptions: $scope.filterOptions,

                showGroupPanel: true,
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,

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
                    { field: "DefaultState", visible: false },
                    //{ field: "Settings[0].Name" },
                    //{ field: "Settings[0].Value" },
                    //{ field: "Settings[0].SiteId" },
                    //{ field: "Layout" },
                    { field: "CreatedOn" },
                    { field: "UpdatedOn" },
                    { field: "ActiveFlag", cellTemplate: '<input type="checkbox" ng-model="row.entity.ActiveFlag" ng-change="toggleActiveFlag(row.entity)">' },
                    { displayName: 'Edit', cellTemplate: '<button id="editBtn" type="button" class="btn btn-primary" ng-click="editSite(row.entity)" >Edit</button> ' },
          //{ displayName: 'Delete', cellTemplate: '<button id="deleteBtn" type="button" class="btn btn-primary" ng-click="deleteSite(row.entity)" >Delete</button> ' },
          //{ displayName: 'Activate', cellTemplate: '<button id="showBtn" type="button" class="btn btn-primary" ng-click="activateSite(row.entity)" >Activate</button> ' }

                ]
            };


        //Perform the initialization
        //init();

        //function init() {
        //    apiService.getsites()
        //        .then(function (data) {
        //            $scope.sitesGridData = data;
        //        }, function (error) {
        //            alert("error");
        //        });
        //}


        $scope.items = ['item1', 'item2', 'item3'];

        //$scope.addsite = function () {
        //    alert("test");
        //    $scope.sites = $scope.selectedSite;
        //    $scope.sites.ActiveFlag = true;
        //    $scope.sites.Id = 9999;
        //    //$scope.sites.Layout = $scope.selectedLayout;
        //    //$scope.sites.LayoutId = $scope.selectedLayout.LayoutId;
        //    //$scope.sites.Layout = { Id: "2222" };
        //    $scope.sites.DeletedFlag = true;
        //    $scope.sites.UpdatedBy = 'test';
        //    $scope.sites.UpdatedOn = new Date();

        //    //apiFactory.addSite($scope.sites).success(successPostCallback).error(errorCallback);
        //    apiService.addsite($scope.sites)
        //        .then(function (data) {
        //            $scope.sitesGridData = data;
        //        }, function (error) {
        //            alert("error");
        //        });
        //}

        $scope.toggleActiveFlag= function(site) {
            apiService.toggleActiveFlag(site)
.then(function (data) {
    $scope.myData = data;
}, function (error) {
    alert("error");
});

        }


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
                //resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } },
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
                //resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } },
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


        $scope.editsite = function (site) {
            $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { site: function () { return angular.copy(site); } } });
            $scope.myDialog.open('site/Site.html', 'siteEditCtrl').then(function (result) {
                if (result === 'cancel') { }
                else {
                    $scope.sites = siteRes.query();
                }
            });
        };

        //$scope.editSite = function (site) {
        //    $scope.myDialog = $dialog.dialog({ dialogFade: false, resolve: { site: function () { return angular.copy(site); }, isNew: function () { return false; } } });
        //    $scope.myDialog.open('Template/Site.html', 'siteEditCtrl').then(function (result) {
        //        if (result === 'cancel') { }
        //        else {
        //            $scope.sites = siteRes.query();
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





.controller('siteEditCtrl', function siteEditController($scope, dialog, site, isNew) {
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
    var test = ["aaa", "bbb"];
    return test;
    //return $resource("../sites/:id.json", { id: '@id' }, { 'update': { method: 'PUT' }, 'remove': { method: 'DELETE', headers: { 'Content-Type': 'application/json' } } });
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