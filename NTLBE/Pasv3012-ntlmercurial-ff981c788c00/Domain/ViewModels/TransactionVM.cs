using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Domain.ViewModels
{
    public class TransactionVM
    {
        
        public BolVM BillOfLandingInfo { get; set; }
        public CustomerVM CustomerInfo { get; set; }
        public IEnumerable<MerchandiseVM> MerchandiseInfo { get; set; }
    }
}