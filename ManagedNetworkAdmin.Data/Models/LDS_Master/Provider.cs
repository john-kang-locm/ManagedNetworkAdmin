using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagedNetworkAdmin.Data.Models.LDS_Master
{
	[Table("Provider")]
	public class Provider
	{
		public Guid ProviderId { get; set; }
		[Key]
		public int ProId { get; set; }
		public string Name { get; set; }
	}
}
