'use strict';

angular.module('app.models', [])
.factory('site', ['$http',  function ($http) {
    var urlBase = 'http://localhost:8002/api/v1/';
    function Site(siteData) {
        if (siteData) {
            this.setData(siteData)
        }
        // Some other initializations related to site
    };
    Site.prototype = {
        setData: function (siteData) {
            angular.extend(this, siteData);
        },
        delete: function () {
            $http.delete(urlBase + 'Sites/Delete' + siteId);
        },
        update: function () {
            $http.put(urlBase + 'Sites/Update' + siteId, this);
        },
        isSettingAvailable: function () {
            if (!this.Site.settings || this.Site.settings.length === 0) {
                return false;
            }
            //return this.site.settings.some(function (setting) {
            //    return setting.quantity > 0;
            //});
        }
    };
    return Site;
}])
.factory('siteCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('siteData', { maxAge: 360000 });

}])
.factory('sitesManager', ['$http', '$q', 'siteCache', 'site', function ($http, $q, siteCache, site) {
    var urlBase = 'http://localhost:8002/api/v1/',
        //_sitesCache = siteCache.get('siteData');
        //sites = [],
        sitesManager = {
            _pool: {},
            _retrieveInstance: function (siteId, siteData) {
                var instance = this._pool[siteId];

                if (instance) {
                    instance.setData(siteData);
                } else {
                    instance = new site(siteData);
                    this._pool[siteId] = instance;
                }

                return instance;
            },
            _search: function (siteId) {
                return this._pool[siteId];
            },
            _load: function (siteId, deferred) {
                var scope = this;

                $http.get(urlBase + 'Sites/GetById' + siteId)
                    .success(function (siteData) {
                        var site = scope._retrieveInstance(siteData.id, siteData);
                        deferred.resolve(site);
                    })
                    .error(function () {
                        deferred.reject();
                    });
            },
            /* Public Methods */
            /* Use this function in order to get a site instance by it's id */
            getSite: function (siteId) {
                var deferred = $q.defer();
                var site = this._search(siteId);
                if (site) {
                    deferred.resolve(site);
                } else {
                    this._load(siteId, deferred);
                }
                return deferred.promise;
            },
            /* Use this function in order to get instances of all the sites */
            loadAllSites: function () {
                if (!siteCache.get('siteData')) {
                    var deferred = $q.defer();
                    var scope = this;
                    $http.get(urlBase + 'Sites/Get')
                        .success(function (sitesArray) {
                            var sites = [];
                            sitesArray.forEach(function (siteData) {
                                var site = scope._retrieveInstance(siteData.id, siteData);
                                sites.push(site);
                            });
                            siteCache.put('siteData', sites);
                            deferred.resolve(sites);
                        })
                        .error(function () {
                            deferred.reject();
                        });
                    return deferred.promise;
                }
            },
            /*  This function is useful when we got somehow the site data and we wish to store it or update the pool and get a site instance in return */
            setSite: function (siteData) {
                var scope = this;
                var site = this._search(siteData.id);
                if (site) {
                    site.setData(siteData);
                } else {
                    site = scope._retrieveInstance(siteData);
                }
                return site;
            },

        };
    return sitesManager;
}]);


