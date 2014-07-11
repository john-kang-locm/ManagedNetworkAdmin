using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ConfigurationAdminTool.Data.Responses
{
	[Serializable, DataContract(Name = "hostnames")]
	public class Hostnames
	{
		[DataMember(Name = "total")]
		public int Total { get; set; }
		[DataMember(Name = "data")]
		public string[] Data { get; set; }

		public static Hostnames FromQuery(IQueryable<string> query)
		{
			if (query == null)
				return new Hostnames { Total = 0, Data = new string[] { } };
			return new Hostnames { Total = query.Count(), Data = query.ToArray() };
		}
	}
}
