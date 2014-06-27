using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Web;

namespace ManagedNetworkAdmin.Api.Lib
{
    public class JsonContentNegotiator : IContentNegotiator
    {
        private readonly JsonMediaTypeFormatter _formatter;

        public JsonContentNegotiator(JsonMediaTypeFormatter formatter)
        {
            _formatter = formatter;
        }

        public ContentNegotiationResult Negotiate(Type type, HttpRequestMessage request,
            IEnumerable<MediaTypeFormatter> formatters)
        {
            return new ContentNegotiationResult(_formatter, new MediaTypeHeaderValue("application/json"));
        }
    }
}