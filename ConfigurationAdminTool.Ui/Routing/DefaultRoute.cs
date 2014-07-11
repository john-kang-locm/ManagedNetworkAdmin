// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRoute.cs" company="Local Corporation">
//   Copyright © 2014 Local Corporation
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.ConfigurationAdminTool.Ui.Routing
{
    using System.Web.Routing;

    public class DefaultRoute : Route
    {
        public DefaultRoute()
            : base("{*path}", new DefaultRouteHandler())
        {
            this.RouteExistingFiles = false;
        }
    }
}
