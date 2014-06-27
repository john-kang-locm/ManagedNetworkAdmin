// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="Local Corporation">
//   Copyright © 2014 Local Corporation
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.ManagedNetworkAdmin.Ui
{
    using System.Web;
    using System.Web.Http;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class Application : HttpApplication
    {
        protected void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //GlobalConfiguration.Configure(c => c.Routes.MapHttpRoute(
            //    name: "Templates",
            //    routeTemplate: "Template/{controller}/{template}",
            //    defaults: new { action = "Template" }));
        }
    }
}
