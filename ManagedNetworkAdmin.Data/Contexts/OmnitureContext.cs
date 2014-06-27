using System.Data.Entity;
using ManagedNetworkAdmin.Data.Models;
using ManagedNetworkAdmin.Data.Models.LocalCom_Main;

namespace ManagedNetworkAdmin.Data.Contexts
{
	public class OmnitureContext : DbContext
	{
		public OmnitureContext() : base("name=Apollo") { }

		public DbSet<OmnitureLink> OmnitureLinks { get; set; }
	}
}
