using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ManagedNetworkAdmin.Data.Models.Apollo
{
	/// <summary>
	/// A Layout consisting of Head, Header, Footer and Tracking code
	/// </summary>
	public class Layout
	{
		/// <summary>
		/// Id
		/// </summary>
		[Key]
		public int Id { get; set; }
		/// <summary>
		/// The name of this Layout
		/// </summary>
		public string Name { get; set; }
		/// <summary>
		/// The Head content (usually for scripts and styles).
		/// Anything that can go in the &lt;head&gt; tag
		/// </summary>
		public string Head { get; set; }
		/// <summary>
		/// The Header content
		/// </summary>
		public string Header { get; set; }
		/// <summary>
		/// The Footer content
		/// </summary>
		public string Footer { get; set; }
		/// <summary>
		/// The Tracking content
		/// </summary>
		public string Tracking { get; set; }
		/// <summary>
		/// Is this Layout active?
		/// </summary>
		public bool ActiveFlag { get; set; }
		/// <summary>
		/// Is this Layout deleted
		/// </summary>
		public bool DeletedFlag { get; set; }
		/// <summary>
		/// Created date
		/// </summary>
		public DateTime CreatedOn { get; set; }
		/// <summary>
		/// Updated date
		/// </summary>
		public DateTime UpdatedOn { get; set; }
		/// <summary>
		/// If this Layout was deleted, when?
		/// </summary>
		public DateTime? DeletedOn { get; set; }
		/// <summary>
		/// Who made the latest change
		/// </summary>
		public string UpdatedBy { get; set; }

	}
}
