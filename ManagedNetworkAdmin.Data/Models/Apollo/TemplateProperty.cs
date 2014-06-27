using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ManagedNetworkAdmin.Data.Models.Apollo
{
	[Table("TemplateProperties")]
	public class TemplateProperty
	{
		[Key]
		public int Id { get; set; }
		[ForeignKey("Template")]
		public int TemplateId { get; set; }
		public string Type { get; set; }
		public string Name { get; set; }
		public string Value { get; set; }

		[ForeignKey("TemplateId")]
		public virtual Template Template { get; set; }

	}
}
