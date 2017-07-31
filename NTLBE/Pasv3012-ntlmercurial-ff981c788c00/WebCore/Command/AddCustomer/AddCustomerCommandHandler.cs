using Data;
using Infrastructure.Decorator;
using Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCore.Command
{
    public class AddCustomerCommandHandler:ICommandHandler<AddCustomerCommand>
    {

        public void Handle(AddCustomerCommand command)
        {
            var newCustomer = new Customer();
            newCustomer.Id = command.Id;
            newCustomer.CustomerName = command.CustomerName;
            newCustomer.CustomerPhone = command.CustomerPhone;
            newCustomer.CustomerIdNumber = command.CustomerIdNumber;
            newCustomer.CustomerType = command.CustomerType;
            newCustomer.CreatedDate = DateTime.Now;
            newCustomer.CreatedBy = command.CreatedBy;
            using (var uow=new UnitOfWork<EF>())
            {
                uow.Repository<Customer>().Add(newCustomer);
                uow.SubmitChanges();
            }
        }
    }
}
