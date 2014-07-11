using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack.Redis;
using Sputnik.Data.Contexts;
using Sputnik.Data.Models;
using Sputnik.Data.Models.Apollo;
using Sputnik.Data.Responses;
using System.Web.Http.Cors;
//using System.Web.Mvc;

namespace Sputnik.Api.Controllers
{
    /// <summary>
    /// Sites API
    /// Responsible for managing Apollo site/layout (old LSN) data
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST")]
    public class SitesController : SputnikDataController
    {

        [AcceptVerbs("GET", "POST")]
        //[EnableCors(origins:"*", headers:"*", methods:"get, post")]
        public IEnumerable<Site> ListAll()
        {
            IEnumerable<Site> sites = new List<Site>() {
            new Site(){ActiveFlag=true, Hostname="test1", Name="test1"},  new Site(){ActiveFlag=true, Hostname="test2", Name="test2"}};
            return sites;
        }

        //[AcceptVerbs("GET", "POST")]
        //public IEnumerable<string> ListAll()
        //{
        //    IEnumerable<string> sites = new List<string>() { "a", "b" };
        //    return sites;
        //}


        /// <summary>
        /// Gets all sites without settings or layout
        /// </summary>
        /// <returns>IEnumerable&lt;Sputnik.Data.Models.Site&gt;</returns>
        [AcceptVerbs("GET", "POST")]
        public IEnumerable<Site> Get()
        {
            System.Diagnostics.Debugger.Launch();
            if (!redis.ContainsKey(CacheKey("sitelist")))
            {
                //redis.Remove(CacheKey("sitelist"));
                redis.Add(CacheKey("sitelist"), ContextApollo.Sites.Include("Settings").Include("Layout").AsEnumerable());
            }
            return redis.Get<IEnumerable<Site>>(CacheKey("sitelist"));
        }

        /// <summary>
        /// Add a new Site
        /// </summary>
        /// <param name="site">A Site</param>
        /// <returns>HttpResponseMessage</returns>
        [HttpPost]
        public HttpResponseMessage Add(Site site)
        {
            System.Diagnostics.Debugger.Launch();

            using (var context = new ApolloContext())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        //context.Database.ExecuteSqlCommand(
                        //    @"UPDATE Blogs SET Rating = 5" +
                        //        " WHERE Name LIKE '%Entity Framework%'"
                        //    );

                        //var query = context.Posts.Where(p => p.Blog.Rating >= 5);
                        //foreach (var post in query)
                        //{
                        //    post.Title += "[Cool Blog]";
                        //}

                        if (site != null)
                        {
                            site.CreatedOn = site.UpdatedOn = DateTime.Now;
                            site.UpdatedBy = "sputnik api";
                            Layout layout = new Layout { Name = "test", ActiveFlag = true, DeletedFlag = false };
                            layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
                            layout.UpdatedBy = "sputnik api";


                            context.Layouts.Add(layout);

                            //ContextApollo.Sites.Add(site);
                            //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
                            int status = context.SaveChanges();
                        }

                        context.SaveChanges();

                        dbContextTransaction.Commit();
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                    }
                }
            } 


            if (site != null)
            {
                site.CreatedOn = site.UpdatedOn = DateTime.Now;
                site.UpdatedBy = "sputnik api";
                Layout layout = new Layout {  Name = "test" , ActiveFlag=true, DeletedFlag=false};
                layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
                layout.UpdatedBy = "sputnik api";


                ContextApollo.Layouts.Add(layout);

                //ContextApollo.Sites.Add(site);
                //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
                int status = ContextApollo.SaveChanges();
                return new HttpResponseMessage(HttpStatusCode.Created);
            }
            return new HttpResponseMessage(HttpStatusCode.Created);

            return new HttpResponseMessage(HttpStatusCode.InternalServerError);
        }

        //public HttpResponseMessage Update(int id, Site site)
        //{

        //}

        //public HttpResponseMessage Delete(int id)
        //{

        //}
        /// <summary>
        /// Get a site and it's settings by Id
        /// </summary>
        /// <param name="id">The id of the site</param>
        /// <returns>Sputnik.Data.Models.Site</returns>
        public Site GetSite(int id)
        {
            if (!redis.ContainsKey(CacheKey(id.ToString())))
                redis.Add<Site>(CacheKey(id.ToString()), ContextApollo.Sites.Include("Settings").Include("Layout").AsQueryable().FirstOrDefault(s => s.Id == id));
            return redis.Get<Site>(CacheKey(id.ToString()));

        }

        /// <summary>
        /// Gets a site and it's settings by hostname. Note that hostname needs to 
        /// have dots replaced with underscores (i.e. www_ziphip_com)
        /// </summary>
        /// <param name="hostname">The hostname in the form of www_ziphip_com</param>
        /// <returns>Sputnik.Data.Models.Site</returns>
        public Site GetSiteByHostname(string hostname)
        {
            if (!redis.ContainsKey(CacheKey(hostname)))
                redis.Add<Site>(CacheKey(hostname), ContextApollo.Sites.Include("Settings").Include("Layout").AsQueryable().FirstOrDefault(s => s.Hostname.Equals(hostname, StringComparison.InvariantCultureIgnoreCase)));
            return redis.Get<Site>(CacheKey(hostname));
        }
    }
}
