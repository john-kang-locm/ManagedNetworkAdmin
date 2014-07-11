using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ConfigurationAdminTool.Data.Models.Apollo
{
	/// <summary>
	/// Site Settings Model
	/// </summary>
	public class SiteSetting
	{
		/// <summary>
		/// Id
		/// </summary>
		public int Id { get; set; }
		/// <summary>
		/// The Site Id
		/// </summary>
		public int SiteId { get; set; }
		/// <summary>
		/// The Name of the setting
		/// </summary>
		public string Name { get; set; }
		/// <summary>
		/// The Value of the setting
		/// </summary>
		public string Value { get; set; }
	}
}
