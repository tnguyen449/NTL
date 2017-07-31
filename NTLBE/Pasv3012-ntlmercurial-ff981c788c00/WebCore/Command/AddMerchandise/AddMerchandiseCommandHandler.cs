using Data;
using Infrastructure.Decorator;
using Infrastructure.Repository;
using System;

namespace WebCore.Command
{
    public class AddMerchandiseCommandHandler : ICommandHandler<AddMerchandiseCommand>
    {
        public void Handle(AddMerchandiseCommand command)
        {
            var newMerchandise = new Merchandise();
            newMerchandise.MerchandiseId = command.MerchandiseId;
            newMerchandise.MerchandiseTypeId = command.MerchandiseTypeId;
            newMerchandise.MerchandiseQuantity = command.MerchandiseQuantity;
            newMerchandise.MerchandiseUnit = command.MerchandiseUnit;
            newMerchandise.StatusId = command.StatusId;
           
            newMerchandise.SubTotal = command.SubTotal;
            newMerchandise.CreatedBy = command.CreatedBy;
            newMerchandise.Description = command.Description;
            newMerchandise.CreatedDate = DateTime.Now;

            using (var uow = new UnitOfWork<EF>())
            {
                uow.Repository<Merchandise>().Add(newMerchandise);
                uow.SubmitChanges();
            }
        }
    }
}