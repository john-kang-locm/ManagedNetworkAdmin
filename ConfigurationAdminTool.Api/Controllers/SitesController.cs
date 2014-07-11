﻿using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack.Redis;
using ConfigurationAdminTool.Data.Contexts;
using ConfigurationAdminTool.Data.Models;
using ConfigurationAdminTool.Data.Models.Apollo;
using ConfigurationAdminTool.Data.Responses;
using System.Web.Http.Cors;
using System.Threading.Tasks;
//using System.Web.Mvc;

namespace ConfigurationAdminTool.Api.Controllers
{
    /// <summary>
    /// Sites API
    /// Responsible for managing Apollo site/layout (old LSN) data
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST")]
    public class SitesController : ConfigurationAdminToolDataController
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
        /// <returns>IEnumerable&lt;ConfigurationAdminTool.Data.Models.Site&gt;</returns>
        [AcceptVerbs("GET", "POST")]
        public IEnumerable<Site> Get()
        {
            //System.Diagnostics.Debugger.Launch();

            IList<Site> sts = new List<Site>();
            Layout lo = new Layout { ActiveFlag = true, Id = 1, Name = "layout name1", Footer = @"<h2>footer 1</h2>", Head = @"<h2>head 1</h2>", Header = @"<h2>header 1</h2>" };
            Site st1 = new Site { Layout = lo, ActiveFlag = true, DefaultLocation = " lovxcvc1 aaa", Description = "desc11 aaa", DisplayName = "dis51 aaa", Hostname = "ho55st aaa", DefaultState = "ca aaa", Id = 1, Name = "name aaa", LayoutId = 1 };
            sts.Add(st1);
            Site st2 = new Site { Layout = lo, ActiveFlag = true, DefaultLocation = " lxvcoc2 bbb", Description = "desc22 bbb", DisplayName = "di64 bbb", Hostname = "hos345t bbb", DefaultState = "ca aaa", Id = 1, Name = "name aaa", LayoutId = 1 };
            sts.Add(st2);
            Site st3 = new Site { Layout = lo, ActiveFlag = true, DefaultLocation = " lo42c3 ccc", Description = "desc33 ccc", DisplayName = "di2423s ccc", Hostname = "hos63t ccc", DefaultState = "ca aaa", Id = 1, Name = "name aaa", LayoutId = 1 };
            sts.Add(st3);
            Site st4 = new Site { Layout = lo, ActiveFlag = true, DefaultLocation = " lo234c4 ddd", Description = "desc44 ddd", DisplayName = "dirfss ddd", Hostname = "hotrst ddd", DefaultState = "ca aaa", Id = 1, Name = "name aaa", LayoutId = 1 };
            sts.Add(st4);
            Site st5 = new Site { Layout = lo, ActiveFlag = true, DefaultLocation = " lo65c5 eee", Description = "desc55 eee", DisplayName = "dsfs4442is eee", Hostname = "hosryt eee", DefaultState = "ca aaa", Id = 1, Name = "name aaa", LayoutId = 1 };
            sts.Add(st5);

            return sts as IEnumerable<Site>;
            ////System.Diagnostics.Debugger.Launch();
            if (!redis.ContainsKey(CacheKey("sites")))
            {
                //redis.Remove(CacheKey("sitelist"));
                redis.Add(CacheKey("sites"), ContextApollo.Sites.Include("SiteSettings").Include("Layout").AsEnumerable());
            }
            return redis.Get<IEnumerable<Site>>(CacheKey("sites"));
            //sts = ContextApollo.Sites.Include("SiteSettings").Include("Layout").ToList();
            sts = ContextApollo.Sites.ToList();
            return sts as IEnumerable<Site>;
        }

        /// <summary>
        /// Add a new Site
        /// </summary>
        /// <param name="site">A Site</param>
        /// <returns>HttpResponseMessage</returns>
        //[HttpPost]
        [AcceptVerbs("GET", "POST", "PUT")]
        public HttpResponseMessage Add(Site site)
        {
            System.Diagnostics.Debugger.Launch();

            using (var context = new ApolloContext())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        if (site != null)
                        {

                            //Site st = context.Sites.First(i => i.Id == site.Id);
                            Site st = context.Sites.Where(s => s.Name == site.Name).FirstOrDefault();
                            if (st == null)
                            {
                                //st.DisplayName = "ttttttttttttttttttttttttttttt";
                                //context.SaveChanges();

                                site.CreatedOn = site.UpdatedOn = DateTime.Now;
                                site.UpdatedBy = "ConfigurationAdminTool api";
                                //site.Hostname = "aaaaaaaaaaaa";
                                //site.Id = 999999;
                                site.LayoutId = 1;
                                site.PartnerId = 1;
                                site.PartnerSiteId = 1;
                                //Layout layout = new Layout { Name = "test", ActiveFlag = true, DeletedFlag = false };
                                //layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
                                //layout.UpdatedBy = "ConfigurationAdminTool api";


                                //context.Layouts.Add(layout);
                                context.Sites.Add(site);
                            }
                            else
                            {
                                st.Name = site.Name;
                                st.DisplayName = site.DisplayName;
                            }
                            //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
                            context.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    }
                    return new HttpResponseMessage(HttpStatusCode.Created);
                }
            }


            //if (site != null)
            //{
            //    site.CreatedOn = site.UpdatedOn = DateTime.Now;
            //    site.UpdatedBy = "ConfigurationAdminTool api";
            //    Layout layout = new Layout {  Name = "test" , ActiveFlag=true, DeletedFlag=false};
            //    layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
            //    layout.UpdatedBy = "ConfigurationAdminTool api";


            //    ContextApollo.Layouts.Add(layout);

            //    //ContextApollo.Sites.Add(site);
            //    //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
            //    int status = ContextApollo.SaveChanges();
            //    return new HttpResponseMessage(HttpStatusCode.Created);
            //}

        }

        /// <summary>
        /// Update a Site
        /// </summary>
        /// <param name="site">A Site</param>
        /// <returns>HttpResponseMessage</returns>
        //[HttpPost]
        [AcceptVerbs("GET", "POST", "PUT")]
        public async Task<HttpResponseMessage> Update(Site site)
        {
            //System.Diagnostics.Debugger.Launch();

            using (var context = new ApolloContext())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        if (site != null)
                        {

                            //Layout layout =
                            //    context.Layouts.AsNoTracking().Where(l => l.Id == site.Layout.Id).FirstOrDefault();
                            //if (layout!=null)
                            //{
                            //    layout = site.Layout;
                            //    context.Entry(layout).State = System.Data.Entity.EntityState.Modified;
                            //}

                            //if (site.Layout.Id == site.LayoutId)
                            if (site.LayoutId == 0)
                                context.Layouts.Add(site.Layout);
                            else
                                site.LayoutId = site.Layout.Id;

                            Site st = context.Sites.AsNoTracking().Where(s => s.Id == site.Id).FirstOrDefault();
                            if (st != null)
                            {
                                st = site;
                                context.Entry(st).State = System.Data.Entity.EntityState.Modified;
                            }

                            foreach (var setting in site.SiteSettings)
                            {
                                SiteSetting ss =
                                    context.SiteSettings.Where(s => s.Id == setting.Id)
                                        .FirstOrDefault();
                                ss.Value = setting.Value;
                                context.Entry(ss).State = System.Data.Entity.EntityState.Modified;
                            }

                            //context.Sites.Attach(st);
                            context.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    }

                    await CacheSites();

                    return new HttpResponseMessage(HttpStatusCode.Created);
                }
            }




            //if (site != null)
            //{
            //    site.CreatedOn = site.UpdatedOn = DateTime.Now;
            //    site.UpdatedBy = "ConfigurationAdminTool api";
            //    Layout layout = new Layout {  Name = "test" , ActiveFlag=true, DeletedFlag=false};
            //    layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
            //    layout.UpdatedBy = "ConfigurationAdminTool api";


            //    ContextApollo.Layouts.Add(layout);

            //    //ContextApollo.Sites.Add(site);
            //    //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
            //    int status = ContextApollo.SaveChanges();
            //    return new HttpResponseMessage(HttpStatusCode.Created);
            //}

        }

        /// <summary>
        /// Update a Site
        /// </summary>
        /// <param name="site">A Site</param>
        /// <returns>HttpResponseMessage</returns>
        //[HttpPost]
        [AcceptVerbs("GET", "POST", "PUT")]
        public async Task<HttpResponseMessage> ToggleActiveFlag(Site site)
        {
            System.Diagnostics.Debugger.Launch();

            using (var context = new ApolloContext())
            {
                using (var dbContextTransaction = context.Database.BeginTransaction())
                {
                    try
                    {
                        if (site != null)
                        {
                            Site st = context.Sites.AsNoTracking().Where(s => s.Id == site.Id).FirstOrDefault();
                            if (st != null)
                            {
                                st = site;
                                context.Entry(st).State = System.Data.Entity.EntityState.Modified;
                            }

                            //context.Sites.Attach(st);
                            context.SaveChanges();
                            dbContextTransaction.Commit();
                        }
                    }
                    catch (Exception)
                    {
                        dbContextTransaction.Rollback();
                        return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    }

                    await CacheSites();

                    return new HttpResponseMessage(HttpStatusCode.Created);
                }
            }




            //if (site != null)
            //{
            //    site.CreatedOn = site.UpdatedOn = DateTime.Now;
            //    site.UpdatedBy = "ConfigurationAdminTool api";
            //    Layout layout = new Layout {  Name = "test" , ActiveFlag=true, DeletedFlag=false};
            //    layout.CreatedOn = layout.UpdatedOn = DateTime.Now;
            //    layout.UpdatedBy = "ConfigurationAdminTool api";


            //    ContextApollo.Layouts.Add(layout);

            //    //ContextApollo.Sites.Add(site);
            //    //ContextApollo.Entry(layout).State = System.Data.EntityState.Added;
            //    int status = ContextApollo.SaveChanges();
            //    return new HttpResponseMessage(HttpStatusCode.Created);
            //}

        }



        async Task CacheSites()
        {
            if (redis.ContainsKey(CacheKey("sites")))
            {
                //redis.Remove(CacheKey("sitelist"));
                redis.Replace(CacheKey("sites"), ContextApollo.Sites.Include("SiteSettings").Include("Layout").AsEnumerable());
            }
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
        /// <returns>ConfigurationAdminTool.Data.Models.Site</returns>
        /// 

        [AcceptVerbs("GET", "POST")]
        public Site GetById(int id)
        {
            Layout lo = new Layout { ActiveFlag = true, Id = 1, Name = "layout name1", Footer = "footer 1", Head = "head 1", Header = "header 1" };
            Site st = new Site { Layout = lo, ActiveFlag = true, DefaultLocation = " loc aaa", Description = "desc aaa", DisplayName = "dis aaa", Hostname = "host aaa", DefaultState = "ca aaa", Id = 1, Name = "name aaa", LayoutId = 1 };

            //return st;


            //if (!redis.ContainsKey(CacheKey(id.ToString())))
            //    redis.Add<Site>(CacheKey(id.ToString()), ContextApollo.Sites.Include("Settings").Include("Layout").AsQueryable().FirstOrDefault(s => s.Id == id));
            //return redis.Get<Site>(CacheKey(id.ToString()));
            return ContextApollo.Sites.Include("Settings").Include("Layout").AsQueryable().FirstOrDefault(s => s.Id == id);

        }

        /// <summary>
        /// Gets a site and it's settings by hostname. Note that hostname needs to 
        /// have dots replaced with underscores (i.e. www_ziphip_com)
        /// </summary>
        /// <param name="hostname">The hostname in the form of www_ziphip_com</param>
        /// <returns>ConfigurationAdminTool.Data.Models.Site</returns>
        public Site GetSiteByHostname(string hostname)
        {
            if (!redis.ContainsKey(CacheKey(hostname)))
                redis.Add<Site>(CacheKey(hostname), ContextApollo.Sites.Include("Settings").Include("Layout").AsQueryable().FirstOrDefault(s => s.Hostname.Equals(hostname, StringComparison.InvariantCultureIgnoreCase)));
            return redis.Get<Site>(CacheKey(hostname));
        }
    }
}