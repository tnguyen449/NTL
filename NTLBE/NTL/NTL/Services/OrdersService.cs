using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NTL.Models;

namespace NTL.Services
{
    public interface OrdersService
    {
        public IEnumerable<OrdersDTO> GetOrderList();
    }
}