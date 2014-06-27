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
using ManagedNetworkAdmin.Data.Models;
using ManagedNetworkAdmin.Data.Contexts;
using ManagedNetworkAdmin.Data.Models.LocalCom_Main;
using ManagedNetworkAdmin.Data.Models.LDS_Master;

namespace ManagedNetworkAdmin.Api.Controllers
{
	public class OmnitureController : ManagedNetworkAdminDataController
	{

		// GET api/Omniture/5
		//public OmnitureLink GetOmnitureLink(int id)
		//{
		//	OmnitureLink omniturelink = db.OmnitureLinks.Find(id);
		//	if (omniturelink == null)
		//	{
		//		throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
		//	}

		//	return omniturelink;
		//}

		/// <summary>
		/// Get an omniture link by key
		/// </summary>
		/// <param name="key"></param>
		/// <returns></returns>
		public OmnitureLink GetOmnitureLinkByKey(string key)
		{
			OmnitureLink link = ContextOmniture.OmnitureLinks.Find(key);

			if (link == null)
				throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
			return link;
		}
		/// <summary>
		/// Get omniture keys for a given page
		/// </summary>
		/// <param name="page">the name of the page</param>
		/// <returns>List of omniture links</returns>
		public IEnumerable<OmnitureLink> GetOmnitureLinksByPageName(string page)
		{
			var links = ContextOmniture.OmnitureLinks.Where(l => l.PageName == page);
			if (links == null || !links.Any())
				throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
			return links;
		}

		/// <summary>
		/// Get omniture keys for a given page and container
		/// </summary>
		/// <param name="page">The PageName</param>
		/// <param name="container">The ContainerName</param>
		/// <returns>List of omniture links</returns>
		public IEnumerable<OmnitureLink> GetOmnitureLinksByPageNameAndContainerName(string page, string container)
		{
			var links = ContextOmniture.OmnitureLinks.Where(l => l.PageName == page && l.ContainerName == container);
            if (links == null || !links.Any())
				throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
			return links;
		}

		/// <summary>
		/// Get provider/omniture map (LinkName) for a given provider id
		/// </summary>
		/// <param name="proid">The provider ID from LDS request</param>
		/// <returns>List of OmnitureMap objects</returns>
		public IEnumerable<ProviderOmnitureMapItem> GetOmnitureProviderMap()
		{
			var maps = ContextLds.ProviderOmnitureMapItems.Include("Provider").AsEnumerable();
			if (maps == null || !maps.Any())
				throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
			return maps;
		}

		/// <summary>
		/// Get provider/omniture map (LinkName) for a given provider id
		/// </summary>
		/// <param name="proid">The provider ID from LDS request</param>
		/// <returns>List of OmnitureMap objects</returns>
        public IEnumerable<ProviderOmnitureMapItem> GetOmnitureProviderMap(int proid)
		{
            var maps = ContextLds.ProviderOmnitureMapItems.Include("Provider").Where(m => m.ProId == proid);
			if (maps == null || !maps.Any())
				throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
			return maps;
		}
		// PUT api/Omniture/5
		//public HttpResponseMessage PutOmnitureLink(int id, OmnitureLink omniturelink)
		//{
		//	if (!ModelState.IsValid)
		//	{
		//		return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
		//	}

		//	if (id != omniturelink.Id)
		//	{
		//		return Request.CreateResponse(HttpStatusCode.BadRequest);
		//	}

		//	ContextOmniture.Entry(omniturelink).State = EntityState.Modified;

		//	try
		//	{
		//		ContextOmniture.SaveChanges();
		//	}
		//	catch (DbUpdateConcurrencyException ex)
		//	{
		//		return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
		//	}

		//	return Request.CreateResponse(HttpStatusCode.OK);
		//}

		// POST api/Omniture
		//public HttpResponseMessage PostOmnitureLink(OmnitureLink omniturelink)
		//{
		//	if (ModelState.IsValid)
		//	{
		//		ContextOmniture.OmnitureLinks.Add(omniturelink);
		//		ContextOmniture.SaveChanges();

		//		HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, omniturelink);
		//		response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = omniturelink.Id }));
		//		return response;
		//	}
		//	else
		//	{
		//		return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
		//	}
		//}

		// DELETE api/Omniture/5
		//public HttpResponseMessage DeleteOmnitureLink(int id)
		//{
		//	OmnitureLink omniturelink = ContextOmniture.OmnitureLinks.Find(id);
		//	if (omniturelink == null)
		//	{
		//		return Request.CreateResponse(HttpStatusCode.NotFound);
		//	}

		//	ContextOmniture.OmnitureLinks.Remove(omniturelink);

		//	try
		//	{
		//		ContextOmniture.SaveChanges();
		//	}
		//	catch (DbUpdateConcurrencyException ex)
		//	{
		//		return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
		//	}

		//	return Request.CreateResponse(HttpStatusCode.OK, omniturelink);
		//}

		protected override void Dispose(bool disposing)
		{
			ContextOmniture.Dispose();
			base.Dispose(disposing);
		}
	}
}