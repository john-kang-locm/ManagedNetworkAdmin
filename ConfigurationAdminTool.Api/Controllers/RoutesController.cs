using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using ConfigurationAdminTool.Data.Models;
using ConfigurationAdminTool.Data.Contexts;
using ConfigurationAdminTool.Data.Models.Apollo;

namespace ConfigurationAdminTool.Api.Controllers
{
    public class RoutesController : ConfigurationAdminToolDataController
    {
        // GET api/Routes
        public IEnumerable<Route> GetRoutes()
        {
            var routes = ContextApollo.Routes.Include(r => r.Rules);
            return routes.AsEnumerable();
        }

        // GET api/Routes/5
        public Route GetRoute(int id)
        {
            Route route = ContextApollo.Routes.Find(id);
            if (route == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return route;
        }

        // PUT api/Routes/5
        public HttpResponseMessage PutRoute(int id, Route route)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != route.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            ContextApollo.Entry(route).State = EntityState.Modified;

            try
            {
                ContextApollo.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Routes
        public HttpResponseMessage PostRoute(Route route)
        {
            if (ModelState.IsValid)
            {
                ContextApollo.Routes.Add(route);
                ContextApollo.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, route);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = route.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Routes/5
        public HttpResponseMessage DeleteRoute(int id)
        {
            Route route = ContextApollo.Routes.Find(id);
            if (route == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            ContextApollo.Routes.Remove(route);

            try
            {
                ContextApollo.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, route);
        }

        protected override void Dispose(bool disposing)
        {
            ContextApollo.Dispose();
            base.Dispose(disposing);
        }
    }
}