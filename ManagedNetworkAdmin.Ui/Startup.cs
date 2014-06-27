// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Startup.cs" company="Local Corporation">
//   Copyright © 2014 Local Corporation
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

[assembly: Microsoft.Owin.OwinStartup(typeof(App.ManagedNetworkAdmin.Ui.Startup))]

namespace App.ManagedNetworkAdmin.Ui
{
    using Owin;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //// For more information on how to configure your application, visit:
            //// http://go.microsoft.com/fwlink/?LinkID=316888

            this.ConfigureAuth(app);
        }
    }
}
