//'use strict';

//angular.module('app.directives', [])

//    .directive('appVersion', ['version', function (version) {
//        return function (scope, elm, attrs) {
//            elm.text(version);
//        };
//    }]);

angular.module('app.directives', [])


.directive('tabset1', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        controller: function($scope) {
            $scope.templateUrl = '';
            var tabs = $scope.tabs = [];
            var controller = this;


            this.selectTab = function (tab) {
                angular.forEach(tabs, function (tab) {
                    tab.selected = false;
                });
                tab.selected = true;
            };


            this.setTabTemplate = function (templateUrl) {
                $scope.templateUrl = templateUrl;
            }


            this.addTab = function (tab) {
                if (tabs.length == 0) {
                    controller.selectTab(tab);
                }
                tabs.push(tab);
            };
        },
        template:
          '<div class="row-fluid">' +
            '<div class="row-fluid">' +
              '<div class="nav nav-tabs" ng-transclude></div>' +
            '</div>' +
            '<div class="row-fluid">' +
              '<ng-include src="templateUrl"></ng-include>' +
            '</div>' +
          '</div>'
    };
})
.directive('tab1', function () {
    return {
        restrict: 'E',
        replace: true,
        require: '^tabset1',
        scope: {
            title: '@',
            templateUrl: '@'
        },
        link: function(scope, element, attrs, tabsetController) {
            tabsetController.addTab(scope);


            scope.select = function () {
                tabsetController.selectTab(scope);
            }


            scope.$watch('selected', function () {
                if (scope.selected) {
                    tabsetController.setTabTemplate(scope.templateUrl);
                }
            });
        },
        template:
          '<li ng-class="{active: selected}">' +
            '<a href="" ng-click="select()">{{ title }}</a>' +
          '</li>'
    };
});

 
 


 

//.directive('customTabs', function () {
//    //return {
//    //    restrict: 'A',
//    //    template: '\
//    //        <ul class="nav nav-tabs">\
//    //          <li class="active"><a href="#{{contentBaseId}}-1" data-toggle="tab">Tab 1</a></li>\
//    //          <li><a href="#{{contentBaseId}}-2" data-toggle="tab">Tab 2</a></li>\
//    //          <li><a href="#{{contentBaseId}}-3" data-toggle="tab">Tab 3</a></li>\
//    //          <li><a href="#{{contentBaseId}}-4" data-toggle="tab">Tab 4</a></li>\
//    //        </ul>\
//    //        <div class="tab-content">\
//    //          <div class="tab-pane active" id="{{contentBaseId}}-1">Tab 1 sample content</div>\
//    //          <div class="tab-pane" id="{{contentBaseId}}-2">Tab 2 sample content</div>\
//    //          <div class="tab-pane" id="{{contentBaseId}}-3">Tab 3 sample content</div>\
//    //          <div class="tab-pane" id="{{contentBaseId}}-4">Tab 4 sample content</div>\
//    //        </div>',
//    //    link: function (scope, el, attrs) {
//    //        scope.contentBaseId = attrs.tabsBaseId;
//    //    }
//    //};
//    return {
//        restrict: 'A',
//        require: '?ngModel',
//        scope: {
//            ngModel: '='
//        },
//        template: '\
//            <ul class="nav nav-tabs">\
//                <li ng-class="{active: item.active}" ng-repeat="item in ngModel"><a href="#{{contentBaseId}}-{{$index}}" data-toggle="tab">{{item.title}}</a></li>\
//            </ul>\
//            <div class="tab-content">\
//              <div class="tab-pane" ng-class="{active: item.active}" id="{{contentBaseId}}-{{$index}}" ng-repeat="item in ngModel">{{item.content}}</div>\
//            </div>',
//        link: function (scope, el, attrs) {
//            scope.contentBaseId = attrs.tabsBaseId;
//            scope.toggleActive = function (ind) {
//                angular.forEach(scope.ngModel, function (value, key) {
//                    if (key == ind) {
//                        scope.ngModel[key].active = !scope.ngModel[key].active;
//                        $("#" + scope.panelBaseId + "-" + ind).tab('show');
//                    }
//                    else
//                        scope.ngModel[key].active = false;
//                });
//            }
//        }
//    };
//});

//angular.module('CustomComponents', ['app.directives']);


//'use strict';

//angular.module('app.directives', [])
//.directive('tabset', function () {
//    return {
//        restrict: 'E',
//        replace: true,
//        transclude: true,
//        controller: function ($scope) {
//            $scope.templateUrl = '';
//            var tabs = $scope.tabs = [];
//            var controller = this;

//            this.selectTab = function (tab) {
//                angular.forEach(tabs, function (tab) {
//                    tab.selected = false;
//                });
//                tab.selected = true;
//            };

//            this.setTabTemplate = function (templateUrl) {
//                $scope.templateUrl = templateUrl;
//            }

//            this.addTab = function (tab) {
//                if (tabs.length == 0) {
//                    controller.selectTab(tab);
//                }
//                tabs.push(tab);
//            };
//        },
//        template:
//          '<div class="row-fluid">' +
//            '<div class="row-fluid">' +
//              '<div class="nav nav-tabs" ng-transclude></div>' +
//            '</div>' +
//            '<div class="row-fluid">' +
//              '<ng-include src="templateUrl">' +
//            '</ng-include></div>' +
//          '</div>'
//    };
//})
//.directive('tab', function () {
//    return {
//        restrict: 'E',
//        replace: true,
//        require: '^tabset',
//        scope: {
//            title: '@',
//            templateUrl: '@'
//        },
//        link: function (scope, element, attrs, tabsetController) {
//            tabsetController.addTab(scope);

//            scope.select = function () {
//                tabsetController.selectTab(scope);
//            }

//            scope.$watch('selected', function () {
//                if (scope.selected) {
//                    tabsetController.setTabTemplate(scope.templateUrl);
//                }
//            });
//        },
//        template:
//          '<li ng-class="{active: selected}">' +
//            '<a href="" ng-click="select()">{{ title }}</a>' +
//          '</li>'
//    };
//})
//.directive('mccCheckboxDetectChange', [function mccCheckboxDetectChange() {
//    return {
//        replace: false,
//        require: 'ngModel',
//        scope: false,
//        link: function (scope, element, attrs, ngModelCtrl) {
//            element.on('change', function () {
//                scope.$apply(function () {
//                    ngModelCtrl.$setViewValue(element[0].type.toLowerCase() == 'radio' ? element[0].value : element[0].checked);
//                });
//            });
//        }
//    };

//}])

   

 


