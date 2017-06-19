using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NTL.Models;
using NTL.DAO;

namespace NTL.Services
{
    public class OdersServiceIml : OrdersService
    {
        OrdersDAO ordDao;
        public IEnumerable<OrdersDTO> GetOrderList()
        {
            return ordDao.GetOrdersList();
        }
    }
}