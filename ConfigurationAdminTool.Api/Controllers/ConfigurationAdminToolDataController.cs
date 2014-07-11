using ServiceStack;
using ServiceStack.Redis;
using ConfigurationAdminTool.Data.Contexts;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ConfigurationAdminTool.Api.Controllers
{
    public class ConfigurationAdminToolDataController : ApiController, IDisposable
    {
        protected static readonly string REDIS_HOST = ConfigurationManager.AppSettings["RedisHost"];
        protected static RedisClient redis = null;
        OmnitureContext _Context_Omniture;

        public ConfigurationAdminToolDataController()
            : base()
        {
            redis = new RedisClient(REDIS_HOST);
        }

        public OmnitureContext ContextOmniture
        {
            get { return _Context_Omniture != null ? _Context_Omniture : new OmnitureContext(); }
        }

        LDSMasterContext _Context_LDS;

        public LDSMasterContext ContextLds
        {
            get { return _Context_LDS != null ? _Context_LDS : new LDSMasterContext(); }
        }

        ApolloContext _Context_Apollo;

        public ApolloContext ContextApollo
        {
            get { return _Context_Apollo != null ? _Context_Apollo : new ApolloContext(); }
        }

        public string CachePrefix
        {
            get { return GetType().Name.ToLower(); }
        }

        public string CacheKey(string key)
        {
            return String.Format("{0}.{1}", CachePrefix, key);
        }

        protected void Dispose()
        {
            if (redis != null)
            {
                redis.Dispose();
            }
        }
    }
}
