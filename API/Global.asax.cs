using SimpleInjector;
using SimpleInjector.Integration.Web;
using SimpleInjector.Integration.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using WebCore;

namespace API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();
            var bootStrapper = new BootStrapper(container);
            bootStrapper.Boot();
            container.RegisterWebApiControllers(GlobalConfiguration.Configuration,Assembly.GetExecutingAssembly());



            GlobalConfiguration.Configuration.DependencyResolver=
                new SimpleInjectorWebApiDependencyResolver(container);
        }
    }
}
