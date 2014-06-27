using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManagedNetworkAdmin.Data.Models.LDS_Master;

namespace ManagedNetworkAdmin.Data.Contexts
{
	public class LDSMasterContext:DbContext
	{
		public LDSMasterContext() : base("name=LDS_Master")
		{
			Configuration.ProxyCreationEnabled = false;
		}

		public DbSet<Provider> Providers { get; set; }
		public DbSet<ProviderOmnitureMapItem> ProviderOmnitureMapItems { get; set; }
	}
}
