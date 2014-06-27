using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagedNetworkAdmin.Data.Models.Apollo
{
	[Table("ABTests")]
	public class Page
	{
		[Key]
		public int Id { get; set; }
		[Column("ABTestRouteId")]
		public int RouteId { get; set; }
		public int DeviceTypeId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public bool IsActive { get; set; }
		public Double SampleSize { get; set; }
		public int SessionLength { get; set; }
		public bool IsBaselineMode { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }
		public string UpdatedBy { get; set; }
        [ForeignKey("RouteId")]
		public virtual Route Route { get; set; }

        [ForeignKey("DeviceTypeId")]
		public virtual DeviceType Device { get; set; }
		public virtual ICollection<Template> Templates { get; set; }


	}
}
