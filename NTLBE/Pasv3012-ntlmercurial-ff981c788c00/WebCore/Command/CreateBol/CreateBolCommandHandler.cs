using Data;
using Infrastructure.Decorator;
using Infrastructure.Repository;
using System;
using System.Data.Entity.Validation;
using System.Diagnostics;

namespace WebCore.Command
{
    public class CreateBolCommandHandler : ICommandHandler<CreateBolCommand>
    {
        public CreateBolCommandHandler()
        {
        }

        public void Handle(CreateBolCommand command)
        {
            var uow = new UnitOfWork<EF>();
            var newBol = new BillOfLanding();
            newBol.Id = command.Id;
            newBol.BolId = command.BolId;
            newBol.Name = command.Name;
            newBol.BolFrom = command.BolFrom;
            newBol.BolTo = command.BolTo;
            newBol.Sender = command.Sender;
            newBol.Receiver = command.Receiver;
            newBol.Assurance = command.Assurance;
            newBol.DeliveryType = command.DeliveryType;
            newBol.Discount = command.Discount;
            newBol.StatusId = command.StatusId;
            newBol.Total = command.Total;
            newBol.CreatedBy = command.CreatedBy;
            newBol.CreatedDate = DateTime.Now;
            newBol.Barcode = command.Barcode;
            newBol.Premium = command.Premium;
            newBol.Description = command.Description;
            try
            {
                uow.Repository<BillOfLanding>().Add(newBol);
                uow.SubmitChanges();
            }
            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
            }

           
        }
    }
}