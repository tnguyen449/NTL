using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NTL.Models;

namespace NTL.DAO
{
    public interface OrdersDAO
    {
        IEnumerable<OrdersDTO> GetOrdersList();
        void UpdateOrderStatus(OrdersDTO ordDto, string status);
    }
}