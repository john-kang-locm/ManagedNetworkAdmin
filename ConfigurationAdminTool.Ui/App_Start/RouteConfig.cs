// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RouteConfig.cs" company="Local Corporation">
//   Copyright © 2014 Local Corporation
// </copyright>
// --------------------------------------------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using App.ConfigurationAdminTool.Ui.Routing;

namespace App.ConfigurationAdminTool.Ui
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.Add("Default", new DefaultRoute());

            routes.MapRoute(
                name: "Templates",
                url: "Template/{controller}/{template}",
                defaults: new { action = "Template" });

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);
        }
    }
}



