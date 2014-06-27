using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ManagedNetworkAdmin.Data.Models.Apollo
{
	[Table("ABTestRoutes")]
	public class Route
	{
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }
		public string UpdatedBy { get; set; }

		public virtual ICollection<Rule> Rules { get; set; }

		
	}
}
