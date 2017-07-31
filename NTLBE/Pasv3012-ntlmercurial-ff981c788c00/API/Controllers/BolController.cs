using Domain.IServices;
using Domain.ViewModels;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("NgocTrang/Api/Bol")]
    public class BolController : ApiController
    {
        #region constructor 4 injection

        private IBolServices iBolServices;
        private ICustomerServices iCustomerServices;
        private IMerchandiseTypeServices iMerchandiseTypeServices;
        private IBranchServices iBranchServices;
        private IDeliveryTypeServices iDeliveryTypeServices;

        public BolController(
            IBolServices _iBolServices,
            ICustomerServices _iCustomerServices,
            IMerchandiseTypeServices _iMerchandiseTypeServices,
            IBranchServices _iBranchServices,
            IDeliveryTypeServices _iDeliveryTypeServices
        )
        {
            iBolServices = _iBolServices;
            iBranchServices = _iBranchServices;
            iCustomerServices = _iCustomerServices;
            iMerchandiseTypeServices = _iMerchandiseTypeServices;
            iDeliveryTypeServices = _iDeliveryTypeServices;
        }

        #endregion constructor 4 injection

        #region HttpResponse

        //All Request will have the same core respone,status code, the only the return values are different
        private HttpResponseMessage GetResponse(object value, HttpStatusCode httpCode)
        {
            HttpResponseMessage response = Request.CreateResponse();
            response.StatusCode = httpCode;
            if (HttpStatusCode.OK.Equals(httpCode))
            {
                response.Content = new StringContent(JsonConvert.SerializeObject(value));
            }
            else if (HttpStatusCode.NotFound.Equals(httpCode))
            {
                response.Content = new StringContent("Not Found");
            }
            else if (HttpStatusCode.NotImplemented.Equals(httpCode))
            {
                response.Content = new StringContent("Not Implemented");
            }
            return response;
        }

        private HttpResponseMessage PostResponse(object obj, HttpStatusCode httpCode)
        {
            HttpResponseMessage response = Request.CreateResponse();
            response.StatusCode = httpCode;
            if (HttpStatusCode.OK.Equals(httpCode))
            {
                response.Content = new StringContent("Submit Item Complete!");
            }
            else
            {
                response.Content = new StringContent(obj.ToString());
            }
            return response;
        }

        #endregion HttpResponse

        #region HandleRequest

        //GET: NgocTrang/Api/Merchandise/GetComponent
        //Get data source for bill of landing components
        [Route("GetComponent")]
        [HttpGet]
        public HttpResponseMessage GetComponent()
        {
            ComponentVM vm = new ComponentVM();
            string format = "ddMMyyHHmmss";
            vm.DeliveryType = iDeliveryTypeServices.GetAllDeliveryType();
            vm.CurrentTimeStamp = DateTime.Now.ToString(format);
            vm.Branch = iBranchServices.GetAllBranches();
            vm.Type = iMerchandiseTypeServices.GetAllMerchandiseType();
            try
            {
                if (vm.Branch != null && vm.Type != null)
                {
                    return GetResponse(vm, HttpStatusCode.OK);
                }
                else
                {
                    return GetResponse(vm, HttpStatusCode.NotFound);
                }
            }
            catch (Exception ex)
            {
                return GetResponse(ex, HttpStatusCode.NotImplemented);
            }
        }

        //POST: NgocTrang/Api/Merchandise/Add
        //Add single item
        [Route("Add")]
        [HttpPost]
        public HttpResponseMessage Add(object obj)
        {
            try
            {
                var command = JsonConvert.DeserializeObject<TransactionVM>(obj.ToString());
                var customerInfo = command.CustomerInfo;
                var listMerchandiseInfo = command.MerchandiseInfo;
                var billInfo = command.BillOfLandingInfo;
                //Check customer info exsisted or not.If not, insert new customer into db
                //Else, get exsisted customer id to fill in Bol Info
                VerifyCustomerInfo(customerInfo, billInfo);

                //Insert merchandise info into DB
                foreach (var merchandise in listMerchandiseInfo)
                {
                    iBolServices.AddItem(merchandise);
                }

                //Create new Bol for customer to confirm Transaction
                iBolServices.CreateNewBol(command.BillOfLandingInfo);
                //iCustomerServices.AddCustomer(customerInfo);
                return PostResponse("", HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return PostResponse(ex, HttpStatusCode.NotAcceptable);
            }
        }

        #endregion HandleRequest

        #region Glue code

        private void VerifyCustomerInfo(CustomerVM customerInfo, BolVM billInfo)
        {
            ////Check customer information in DB
            var customerList = iCustomerServices.GetAllCustomer().ToList();

            var senderList = customerList.Where(p => p.CustomerName == customerInfo.SenderName
                                                   && p.CustomerPhone == customerInfo.SenderPhone).ToList();

            var receiverList = customerList.Where(p => p.CustomerName == customerInfo.ReceiverName
                                                   && p.CustomerPhone == customerInfo.ReceiverPhone).ToList();
            //else,get their id
            if (receiverList.Count() == 0 && senderList.Count() != 0)
            {
                iCustomerServices.AddCustomer(customerInfo.ReceiverName, customerInfo.ReceiverPhone, customerInfo.ReceiverIdNumber);
                billInfo.Receiver = customerList[customerList.Count - 1].Id + 1;
                billInfo.Sender = senderList[0].Id;
            }
            else if (senderList.Count() == 0 && receiverList.Count() != 0)
            {
                iCustomerServices.AddCustomer(customerInfo.SenderName, customerInfo.SenderPhone, customerInfo.SenderIdNumber);
                billInfo.Sender = customerList[customerList.Count - 1].Id + 1;
                billInfo.Receiver = receiverList[0].Id;
            }
            else if (senderList.Count() == 0 && receiverList.Count() == 0)
            {
                iCustomerServices.AddCustomer(customerInfo.ReceiverName, customerInfo.ReceiverPhone, customerInfo.ReceiverIdNumber);
                iCustomerServices.AddCustomer(customerInfo.SenderName, customerInfo.SenderPhone, customerInfo.SenderIdNumber);
                billInfo.Receiver = customerList[customerList.Count - 1].Id + 1;
                billInfo.Sender = customerList[customerList.Count - 1].Id + 2;
            }
            else
            {
                billInfo.Receiver = receiverList[0].Id;
                billInfo.Sender = senderList[0].Id;
            }
        }

        #endregion Glue code
    }
}