//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Merchandise
    {
        public int Id { get; set; }
        public string MerchandiseId { get; set; }
        public Nullable<int> MerchandiseTypeId { get; set; }
        public Nullable<int> MerchandiseQuantity { get; set; }
        public Nullable<int> MerchandiseUnit { get; set; }
        public Nullable<int> StatusId { get; set; }
        public Nullable<bool> IsDeclareValue { get; set; }
        public string DeclareValue { get; set; }
        public Nullable<decimal> EstimatedValue { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> SubTotal { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}