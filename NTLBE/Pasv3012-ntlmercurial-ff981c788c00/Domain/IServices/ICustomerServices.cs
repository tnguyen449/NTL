using Core.PageResult;
using Data;
using System.Collections.Generic;

namespace Domain.IServices
{
    public interface ICustomerServices
    {
        IEnumerable<Customer> GetAllCustomer();
        PagedListResult<Customer> SearchCustomer(SearchQuery<Customer> searchQuery);
        int AddCustomer(string customerName,string customerPhone,string customerIdNumber);
    }
}