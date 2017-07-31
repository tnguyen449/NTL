using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Domain.ViewModels
{
    public class MerchandiseVM
    {
        public int Id { get; set; }
        public string MerchandiseId { get; set; }
        public Nullable<int> MerchandiseTypeId { get; set; }
        public Nullable<int> MerchandiseQuantity { get; set; }
        public Nullable<int> MerchandiseUnit { get; set; }
        public Nullable<int> StatusId { get; set; }
        public Nullable<bool> IsBreakable { get; set; }
        public Nullable<bool> IsGuarantee { get; set; }
        public Nullable<decimal> GuaranteePrice { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> SubTotal { get; set; }     
        public string CreatedBy { get; set; }
       
    }
}