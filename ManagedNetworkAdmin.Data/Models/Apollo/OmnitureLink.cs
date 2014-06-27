using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagedNetworkAdmin.Data.Models.LocalCom_Main
{
	[Table("OmnitureClassifications")]
	public class OmnitureLink
	{
		[Key]
		public string Key { get; set; }
		public string PageKey { get; set; }
		public string PageName { get; set; }
		public string ContainerKey { get; set; }
		public string ContainerName { get; set; }
		public string LinkKey { get; set; }
		public string LinkName { get; set; }
		public int Position { get; set; }
		public bool Paid { get; set; }
	}
}
