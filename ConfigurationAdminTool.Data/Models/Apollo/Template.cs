using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ConfigurationAdminTool.Data.Models.Apollo
{
	[Table("Templates")]
	public class Template
	{
		[Key]
		public int Id { get; set; }
		[Column("ABTestId")]
		public int PageId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string FilePath { get; set; }
		public string FileName { get; set; }
		public string FileContent { get; set; }
		public bool IsActive { get; set; }
		public bool IsDefault { get; set; }
		public DateTime? StartDate { get; set; }
		public DateTime? EndDate { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }
		public string UpdatedBy { get; set; }

		public virtual ICollection<TemplateProperty> Properties { get; set; }


	}
}
