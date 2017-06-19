using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NTL.Models
{
    public class ProductsDTO
    {
        public int productID { get; set; }
        public string unit { get; set; }
        public int quantity { get; set; }
        public List<StatusDTO> statusID { get; set; }
        public string description { get; set; }
    }
}