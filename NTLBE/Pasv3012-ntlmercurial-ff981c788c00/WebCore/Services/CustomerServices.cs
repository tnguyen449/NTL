using Core.PageResult;
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
    public class CustomerServices : IService<Customer>, ICustomerServices
    {
        private readonly IQueryHandler<GetAllCustomerQuery, IEnumerable<Customer>> getAllCustomerHandler;
        private readonly IQueryHandler<SearchCustomerQuery, PagedListResult<Customer>> searchCustomerdHandler;
        private readonly ICommandHandler<AddCustomerCommand> addCustomerHandler;

        public CustomerServices(IQueryHandler<GetAllCustomerQuery, IEnumerable<Customer>> _getAllCustomerHandler,
                  IQueryHandler<SearchCustomerQuery, PagedListResult<Customer>> _searchCustomerdHandler,
                  ICommandHandler<AddCustomerCommand> _addCustomerHandler
            )
        {
            getAllCustomerHandler = _getAllCustomerHandler;
            searchCustomerdHandler = _searchCustomerdHandler;
            addCustomerHandler = _addCustomerHandler;
        }


        public IEnumerable<Customer> GetAllCustomer()
        {
            return getAllCustomerHandler.Handle(new GetAllCustomerQuery { });
        }

        public PagedListResult<Customer> SearchCustomer(SearchQuery<Customer> searchQuery)
        {
            return searchCustomerdHandler.Handle(new SearchCustomerQuery { SearchQuery = searchQuery });
        }
        public int AddCustomer(string customerName,string customerPhone,string customerIdNumber)
        {
            addCustomerHandler.Handle(new AddCustomerCommand { Id = 0, CustomerName = customerName, CustomerIdNumber = customerIdNumber, CustomerPhone = customerPhone });
            return 0;
        }
    }
}