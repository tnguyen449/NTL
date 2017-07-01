using Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebCore.Services;

namespace API.Controllers
{
  
    public class ValuesController : ApiController
    {
        // GET api/values
        public HttpResponseMessage Get()
        {
            ModelVM vm = new ModelVM();
            vm.Branch = branchServices.GetAllBranches();
            vm.Type = merchandiseTypeServices.GetAllMerchandiseType();
            vm.SubType = merchandiseTypeServices.GetMerchandiseSubType(5);

            HttpResponseMessage response = Request.CreateResponse();
            response.StatusCode = HttpStatusCode.OK;
            response.Content = new StringContent(JsonConvert.SerializeObject(vm));
            return response;

          
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

        private BolServices bolServices;
        private BranchServices branchServices;
        private CustomerServices customerServices;
        private MerchandiseTypeServices merchandiseTypeServices;

        public ValuesController(
            BolServices _bolServices,
            BranchServices _branchServices,
            CustomerServices _customerServices,
            MerchandiseTypeServices _merchandiseTypeServices
        )
        {
            bolServices = _bolServices;
            branchServices = _branchServices;
            customerServices = _customerServices;
            merchandiseTypeServices = _merchandiseTypeServices;
        }


    }
    public class ModelVM
    {

        public IEnumerable<MerchandiseType> Type { get; set; }
        public IEnumerable<Branch> Branch { get; set; }
        public IEnumerable<MerchandiseSubType> SubType { get; set; }
    }
}
