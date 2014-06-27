using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ManagedNetworkAdmin.Data.Models.LDS_Master
{
	[Table("ProviderOmnitureMap")]
	public class ProviderOmnitureMapItem
	{
		public int Id { get; set; }
		[ForeignKey("Provider")]
		public int ProId { get; set; }
		public string LinkName { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }
		public string UpdatedBy { get; set; }

		public virtual Provider Provider { get; set; }

	}
}
