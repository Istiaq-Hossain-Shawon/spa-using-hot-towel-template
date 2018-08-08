using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;


namespace WebApplication1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{action}"
            //Web API configuration and services
        //    config.MapHttpAttributeRoutes();
        //     //Web API routes
        //    config.Routes.MapHttpRoute(
        //name: "DefaultApi",
        //routeTemplate: "api/{controller}/{id}",
        //defaults: new { id = RouteParameter.Optional }
    );

          //  GlobalConfiguration.Configuration.Routes.MapHttpRoute(
          //name: "BreezeApi",
          //routeTemplate: "breeze/{controller}/{action}"
            
        }
    }
}
