using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ConfigurationAdminTool.Data.Models.Apollo
{
	[Table("ABTestRouteRules")]
	public class Rule
	{
		[Key]
		public int Id { get; set; }
		[Column("ABTestRouteId")]
		public int RouteId { get; set; }
		public string Property { get; set; }
		public string Operator { get; set; }
		public string Value { get; set; }


	}
}
