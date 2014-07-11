using System.Data.Entity;
using ConfigurationAdminTool.Data.Models;
using ConfigurationAdminTool.Data.Models.LocalCom_Main;

namespace ConfigurationAdminTool.Data.Contexts
{
	public class OmnitureContext : DbContext
	{
		public OmnitureContext() : base("name=Apollo") { }

		public DbSet<OmnitureLink> OmnitureLinks { get; set; }
	}
}
