using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManagedNetworkAdmin.Data.Models;
using ManagedNetworkAdmin.Data.Models.Apollo;

namespace ManagedNetworkAdmin.Data.Contexts
{
	public class ApolloContext : DbContext
	{
		public ApolloContext() : base("name=Apollo")
		{
            //Configuration.ProxyCreationEnabled = false;
		}

		public DbSet<Page> Tests { get; set; }
		public DbSet<DeviceType> DeviceTypes { get; set; }
		public DbSet<Route> Routes { get; set; }
		public DbSet<Rule> Rules { get; set; }

        public DbSet<Site> Sites { get; set; }
        public DbSet<Layout> Layouts { get; set; }
        public DbSet<SiteSetting> SiteSettings { get; set; }
        public DbSet<SiteDefault> Defaults { get; set; }


	}
}
