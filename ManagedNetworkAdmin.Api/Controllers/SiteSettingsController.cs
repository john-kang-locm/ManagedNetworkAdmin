using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack.Redis;
using ManagedNetworkAdmin.Data.Contexts;
using ManagedNetworkAdmin.Data.Models;
using ManagedNetworkAdmin.Data.Models.Apollo;
using ManagedNetworkAdmin.Data.Responses;
using System.Web.Http.Cors;
//using System.Web.Mvc;

namespace ManagedNetworkAdmin.Api.Controllers
{
    /// <summary>
    /// SiteSetting API
    /// Responsible for managing Apollo site/layout (old LSN) data
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST")]
    public class SiteSettingsController : ManagedNetworkAdminDataController
    {

        //[AcceptVerbs("GET", "POST")]
        //public IEnumerable<string> ListAll()
        //{
        //    IEnumerable<string> sites = new List<string>() { "a", "b" };
        //    return sites;
        //}


        /// <summary>
        /// Gets all sites without settings or layout
        /// </summary>
        /// <returns>IEnumerable&lt;ManagedNetworkAdmin.Data.Models.SiteSetting&gt;</returns>
        [AcceptVerbs("GET", "POST")]
        public IEnumerable<SiteSetting> Get()
        {
            //System.Diagnostics.Debugger.Launch();

            //IList<SiteSetting> los = new List<SiteSetting>();
            //SiteSetting lo = new SiteSetting { ActiveFlag = true, Id = 1, Name = "layout name1", Footer = "footer 1", Head = "head 1", Header = "header 1" };
            //los.Add(lo);

            //return los as IEnumerable<SiteSetting>;
            if (!redis.ContainsKey(CacheKey("sitesettinglist")))
            {
                //redis.Remove(CacheKey("sitesettinglist"));
                redis.Add(CacheKey("sitesettinglist"), ContextApollo.SiteSettings.AsEnumerable());
            }
            return redis.Get<IEnumerable<SiteSetting>>(CacheKey("sitesettinglist"));
        }

        /// <summary>
        /// Gets all sites without settings or layout
        /// </summary>
        /// <returns>IEnumerable&lt;ManagedNetworkAdmin.Data.Models.SiteSetting&gt;</returns>
        [AcceptVerbs("GET", "POST")]
        public SiteSetting GetById(int id)
        {
            //System.Diagnostics.Debugger.Launch();
            //SiteSetting lo = new SiteSetting { ActiveFlag = true, Id = 1, Name = "layout name1", Footer = "footer 1", Head = "head 1", Header = "header 1" };
            //return lo;
            return ContextApollo.SiteSettings.AsQueryable().FirstOrDefault(s => s.Id == id);

        }

        /// <summary>
        /// Add a new SiteSetting
        /// </summary>
        /// <param name="site">A SiteSetting</param>
        /// <returns>HttpResponseMessage</returns>
        //[HttpPost]
        //public HttpResponseMessage Add(Site site)
        //{
        //    System.Diagnostics.Debugger.Launch();

        //    using (var context = new ApolloContext())
        //    {
        //        using (var dbContextTransaction = context.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                if (site != null)
        //                {

        //                    //SiteSetting st = context.SiteSettings.First(i => i.Id == site.Id);
        //                    SiteSetting st = context.SiteSettings.Where(s => s.Name == site.Name).FirstOrDefault();
        //                    if (st == null)
        //                    {
        //                        //st.DisplayName = "ttttttttttttttttttttttttttttt";
        //                        //context.SaveChanges();

        //                        site.CreatedOn = site.UpdatedOn = DateTime.Now;
        //                        site.UpdatedBy = "ManagedNetworkAdmin api";
        //                        //site.Hostname = "aaaaaaaaaaaa";
        //                        //site.Id = 999999;
        //                        site.LayoutId = 1;
        //                        site.PartnerId = 1;
        //                        site.PartnerLayoutId = 1;
        //                        //SiteSetting layout = new SiteSetting { Name = "test", ActiveFlag = true, DeletedFlag = false };
        //                        //layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
        //                        //layout.UpdatedBy = "ManagedNetworkAdmin api";


        //                        //context.Layoutss.Add(layout);
        //                        context.SiteSettings.Add(site);
        //                    }
        //                    else
        //                    {
        //                        st.Name = site.Name;
        //                        st.DisplayName = site.DisplayName;
        //                    }
        //                    //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
        //                    context.SaveChanges();
        //                    dbContextTransaction.Commit();
        //                }
        //            }
        //            catch (Exception)
        //            {
        //                dbContextTransaction.Rollback();
        //                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
        //            }
        //            return new HttpResponseMessage(HttpStatusCode.Created);
        //        }
        //    }


        //    //if (site != null)
        //    //{
        //    //    site.CreatedOn = site.UpdatedOn = DateTime.Now;
        //    //    site.UpdatedBy = "ManagedNetworkAdmin api";
        //    //    SiteSetting layout = new SiteSetting {  Name = "test" , ActiveFlag=true, DeletedFlag=false};
        //    //    layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
        //    //    layout.UpdatedBy = "ManagedNetworkAdmin api";


        //    //    ContextApollo.SiteSettings.Add(layout);

        //    //    //ContextApollo.SiteSettings.Add(site);
        //    //    //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
        //    //    int status = ContextApollo.SaveChanges();
        //    //    return new HttpResponseMessage(HttpStatusCode.Created);
        //    //}

        //}

        //public HttpResponseMessage Update(int id, SiteSetting site)
        //{

        //}

        //public HttpResponseMessage Delete(int id)
        //{

        //}
        /// <summary>
        /// Get a site and it's settings by Id
        /// </summary>
        /// <param name="id">The id of the site</param>
        /// <returns>ManagedNetworkAdmin.Data.Models.SiteSetting</returns>
        public SiteSetting GetLayout(int id)
        {
            if (!redis.ContainsKey(CacheKey(id.ToString())))
                redis.Add<SiteSetting>(CacheKey(id.ToString()), ContextApollo.SiteSettings.Include("Settings").Include("SiteSetting").AsQueryable().FirstOrDefault(s => s.Id == id));
            return redis.Get<SiteSetting>(CacheKey(id.ToString()));

        }

        /// <summary>
        /// Gets a site and it's settings by hostname. Note that hostname needs to 
        /// have dots replaced with underscores (i.e. www_ziphip_com)
        /// </summary>
        /// <param name="hostname">The hostname in the form of www_ziphip_com</param>
        /// <returns>ManagedNetworkAdmin.Data.Models.SiteSetting</returns>
        //public SiteSetting GetLayoutByHostname(string hostname)
        //{
        //    if (!redis.ContainsKey(CacheKey(hostname)))
        //        redis.Add<SiteSetting>(CacheKey(hostname), ContextApollo.SiteSettings.Include("Settings").Include("SiteSetting").AsQueryable().FirstOrDefault(s => s.Hostname.Equals(hostname, StringComparison.InvariantCultureIgnoreCase)));
        //    return redis.Get<SiteSetting>(CacheKey(hostname));
        //}
    }
}
