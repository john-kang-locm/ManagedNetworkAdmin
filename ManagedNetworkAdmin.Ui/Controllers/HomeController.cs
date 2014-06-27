using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ManagedNetworkAdmin.Api.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Template(string template)
        {
            System.Diagnostics.Debugger.Launch();

            switch (template.ToLower())
            {
                case "home":
                    return PartialView("~/Views/Partials/home.cshtml");
                case "site":
                    return PartialView("~/Views/Partials/site.cshtml");
                case "layout":
                    return PartialView("~/Views/Partials/layout.cshtml");
                case "sitesetting":
                    return PartialView("~/Views/Partials/sitesetting.cshtml");
                default:
                    throw new Exception("template not known");
            }
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}
