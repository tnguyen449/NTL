using Data;
using Domain.IServices;
using Domain.ViewModels;
using Infrastructure.Decorator;
using Infrastructure.Queries;
using System.Collections.Generic;
using WebCore.Command;
using WebCore.Queries;

namespace WebCore.Services
{
    public class BolServices : IService<BillOfLanding>, IBolServices
    {
        private readonly IQueryHandler<GetAllBolQuery, IEnumerable<BillOfLanding>> getAllBolHandler;
        private readonly ICommandHandler<AddMerchandiseCommand> addMerchandiseHandler;
        private readonly ICommandHandler<CreateBolCommand> createBolHandler;

        public BolServices(
            IQueryHandler<GetAllBolQuery, IEnumerable<BillOfLanding>> _getAllBolHandler,
            ICommandHandler<AddMerchandiseCommand> _addMerchandiseHandler,
            ICommandHandler<CreateBolCommand> _createBolHandler
            )
        {
            getAllBolHandler = _getAllBolHandler;
            addMerchandiseHandler = _addMerchandiseHandler;
            createBolHandler = _createBolHandler;
        }

        public IEnumerable<BillOfLanding> GetAllBol()
        {
            var logger = new ActivityLogForQueryHandlerDecorator<GetAllBolQuery, IEnumerable<BillOfLanding>>(getAllBolHandler);
            return logger.Handle(new GetAllBolQuery { });
        }

        public void AddItem(MerchandiseVM command)
        {
            addMerchandiseHandler.Handle(new AddMerchandiseCommand {Id=0,
                                                                    MerchandiseId=command.MerchandiseId,
                                                                    MerchandiseQuantity =command.MerchandiseQuantity,
                                                                    MerchandiseTypeId = command.MerchandiseTypeId,
                                                                    MerchandiseUnit = command.MerchandiseUnit,
                                                                    IsBreakable = command.IsBreakable,
                                                                    IsGuarantee = command.IsGuarantee,
                                                                    StatusId = command.StatusId,
                                                                    GuaranteePrice = command.GuaranteePrice,
                                                                    Description = command.Description,
                                                                    SubTotal = command.SubTotal,
                                                                    CreatedBy =command.CreatedBy
                                                                        
            });
        }

        public void CreateNewBol(BolVM command)
        {
            createBolHandler.Handle(new CreateBolCommand {Id=0,            
                                                        BolId = command.BolId,                    
                                                        Name = command.Name,
                                                        BolFrom = command.BolFrom,
                                                        BolTo = command.BolTo,
                                                        Sender = command.Sender,
                                                        Receiver = command.Receiver,
                                                        DeliveryType = command.DeliveryType,
                                                        Assurance = command.Assurance,
                                                        Discount = command.Discount,               
                                                        Total = command.Total,
                                                        StatusId =command.StatusId,
                                                        CreatedBy = command.CreatedBy,
                                                        CreatedDate = command.CreatedDate,
                                                        Barcode = command.Barcode,
                                                        Premium = command.Premium,
                                                        Description = command.Description
            });              
        }

       
    }
}