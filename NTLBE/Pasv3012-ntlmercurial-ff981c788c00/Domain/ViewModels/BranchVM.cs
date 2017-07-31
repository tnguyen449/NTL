using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class BranchVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Nullable<int> Type { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string BranchCode { get; set; }
        public string Description { get; set; }
    }
}
