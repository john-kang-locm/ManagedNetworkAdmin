using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConfigurationAdminTool.Data.Contexts
{
	public class LSNHostnameStatusContext :DbContext
	{
		public LSNHostnameStatusContext() : base("name=LocalCom_Main")
		{
			Configuration.ProxyCreationEnabled = false;
		}
	}
}
