using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NTL.Models;

namespace NTL.DAO
{
    public class OrdersDAOImpl : OrdersDAO
    {
        public IEnumerable<OrdersDTO> GetOrdersList()
        {
            return null;
        }
        public void UpdateOrderStatus(OrdersDTO ordDto, string status)
        {

        }
    }
}