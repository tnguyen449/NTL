using Data;
using Domain.IServices;
using Infrastructure.Decorator;
using Infrastructure.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCore.Queries;

namespace WebCore.Services
{
    public class DeliveryTypeServices : IService<DeliveryType>, IDeliveryTypeServices
    {
        private readonly IQueryHandler<GetAllDeliveryTypeQuery, IEnumerable<DeliveryType>> getAllDeliveryTypeHandler;

        public DeliveryTypeServices(
            IQueryHandler<GetAllDeliveryTypeQuery, IEnumerable<DeliveryType>> _getAllDeliveryTypeHandler
        )
        {
            getAllDeliveryTypeHandler = _getAllDeliveryTypeHandler; 
        }
        public IEnumerable<DeliveryType> GetAllDeliveryType()
        {
            return getAllDeliveryTypeHandler.Handle(new GetAllDeliveryTypeQuery { });
        }

    
    }
}
