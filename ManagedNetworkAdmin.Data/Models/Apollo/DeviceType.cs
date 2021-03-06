﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ManagedNetworkAdmin.Data.Models.Apollo
{
	[Table("DeviceTypes")]
	public class DeviceType
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime CreatedDate { get; set; }
		public DateTime UpdatedDate { get; set; }
		public string UpdatedBy { get; set; }

	}
}
