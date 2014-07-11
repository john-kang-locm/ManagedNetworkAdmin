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
    public class PagesController : ConfigurationAdminToolDataController
    {
        // GET api/ABTest
        public IQueryable<Page> GetABTests()
        {
            var tests = ContextApollo.Tests.Include(a => a.Device);
            return tests.AsQueryable();
        }

        // GET api/ABTest/5
		public Page GetABTest(int id)
        {
            Page abtest = ContextApollo.Tests.Find(id);
            if (abtest == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return abtest;
        }

        // PUT api/ABTest/5
		public HttpResponseMessage PutABTest(int id, Page abtest)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != abtest.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            ContextApollo.Entry(abtest).State = EntityState.Modified;

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

        // POST api/ABTest
		public HttpResponseMessage PostABTest(Page abtest)
        {
            if (ModelState.IsValid)
            {
                ContextApollo.Tests.Add(abtest);
                ContextApollo.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, abtest);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = abtest.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ABTest/5
        public HttpResponseMessage DeleteABTest(int id)
        {
            Page abtest = ContextApollo.Tests.Find(id);
            if (abtest == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            ContextApollo.Tests.Remove(abtest);

            try
            {
                ContextApollo.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, abtest);
        }

        protected override void Dispose(bool disposing)
        {
            ContextApollo.Dispose();
            base.Dispose(disposing);
        }
    }
}