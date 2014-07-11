// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="Local Corporation">
//   Copyright © 2014 Local Corporation
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.ConfigurationAdminTool.Ui
{
    using System.Web;
    using System.Web.Optimization;

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js/jquery").Include("~/scripts/vendor/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/js/app").Include(
                //"~/scripts/vendor/angular-ui/ui-bootstrap.js",
                "~/scripts/vendor/angular.js",
                "~/scripts/vendor/angular-route.js",
                "~/scripts/vendor/angular-ui-router.js",
                "~/scripts/vendor/angular-resource.js",
                "~/scripts/vendor/angular-sanitize.js",
                "~/scripts/vendor/angular-animate.js",
                "~/scripts/vendor/ng-grid.js",

                "~/scripts/vendor/angular-ui/ui-bootstrap-tpls-0.11.0.js",
                "~/scripts/vendor/textAngular/textAngular.js",
                "~/scripts/vendor/textAngular/textAngular-sanitize.js",
                "~/scripts/vendor/textAngular/textAngularSetup.js",


                "~/scripts/modules/sitemodule.js",
                "~/scripts/filters/filters.js",
                "~/scripts/factories/factories.js",
                "~/scripts/services/services.js",
                "~/scripts/directives/directives.js",
                "~/scripts/controllers/controllers.js",
                "~/scripts/models/models.js",
                "~/scripts/app.js"));
            bundles.Add(new StyleBundle("~/content/css/app").Include("~/content/app.css", "~/content/ConfigurationAdminTool.css", "~/content/ng-grid.css"));

        }
    }
}
