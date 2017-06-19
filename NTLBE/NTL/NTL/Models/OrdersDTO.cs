using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NTL.Models
{
    public class OrdersDTO
    {
        public int orderID { get; set; }
        public List<CustomersDTO> customerID { get; set; }
        public List<StatusDTO> statusID { get; set; }
        public List<ProductsDTO> productID { get; set; }
    }
}