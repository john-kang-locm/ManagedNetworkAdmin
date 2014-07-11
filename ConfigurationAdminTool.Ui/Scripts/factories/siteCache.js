'use strict';

angular.module('app.factories', [])

.factory('siteCache', function ($cacheFactory) {
    return $cacheFactory('siteData', { maxAge: 360000});

});