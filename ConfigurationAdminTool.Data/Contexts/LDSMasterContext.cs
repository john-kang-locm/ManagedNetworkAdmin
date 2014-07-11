using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConfigurationAdminTool.Data.Models.LDS_Master;

namespace ConfigurationAdminTool.Data.Contexts
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
