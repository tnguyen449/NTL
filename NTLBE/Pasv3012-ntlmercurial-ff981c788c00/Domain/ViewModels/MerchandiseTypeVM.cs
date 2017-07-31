using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class MerchandiseTypeVM
    {
        public int Id { get; set; }
        public string MerchandiseType1 { get; set; }
        public Nullable<decimal> Value { get; set; }
        public string CalculationUnit { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTimeOffset> CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
