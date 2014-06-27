using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using ManagedNetworkAdmin.Api.Lib;
using System.Web.Http.Cors;

namespace ManagedNetworkAdmin.Api
{
	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            config.Services.Replace(typeof(IContentNegotiator), new JsonContentNegotiator(new JsonMediaTypeFormatter()));

			config.Routes.MapHttpRoute(
				name: "OmnitureProviderMaps",
				routeTemplate: "api/v1/omniture/providers/{id}",
				defaults: new { controller = "Omniture", action = "GetOmnitureProviderMap", id = RouteParameter.Optional });

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/v1/{controller}/{action}/{id}",
				defaults: new {action="Get", id = RouteParameter.Optional });

			// Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
			// To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
			// For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
			config.EnableQuerySupport();

			// To disable tracing in your application, please comment out or remove the following line of code
			// For more information, refer to: http://www.asp.net/web-api
			config.EnableSystemDiagnosticsTracing();
		}
	}
}
