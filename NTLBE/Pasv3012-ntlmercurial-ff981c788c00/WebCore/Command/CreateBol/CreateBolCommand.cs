using Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCore.Command
{
    public class CreateBolCommand
    {
        public int Id { get; set; }
        public string BolId { get; set; }
        public string Name { get; set; }
        public Nullable<int> BolFrom { get; set; }
        public Nullable<int> BolTo { get; set; }
        public Nullable<int> Sender { get; set; }
        public Nullable<int> Receiver { get; set; }
        public Nullable<bool> Assurance { get; set; }
        public Nullable<int> Discount { get; set; }
        public Nullable<int> Total { get; set; }
        public Nullable<int> StatusId { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string Barcode { get; set; }
        public Nullable<int> Premium { get; set; }
        public string Description { get; set; }
        public Nullable<int> DeliveryType { get; set; }
    }
}
