using Data;
using Infrastructure.Queries;
using Infrastructure.Repository;
using System.Collections.Generic;

namespace WebCore.Queries
{
    public class GetAllDeliveryTypeQueryHandler : IQueryHandler<GetAllDeliveryTypeQuery, IEnumerable<DeliveryType>>
    {
        public IEnumerable<DeliveryType> Handle(GetAllDeliveryTypeQuery query)
        {
            using (var uow = new UnitOfWork<EF>())
            {
                return uow.Repository<DeliveryType>().GetAll();
            }
        }
    }
}