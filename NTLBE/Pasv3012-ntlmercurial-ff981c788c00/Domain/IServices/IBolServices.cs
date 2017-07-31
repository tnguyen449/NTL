using Data;
using Domain.ViewModels;
using System.Collections.Generic;

namespace Domain.IServices
{
    public interface IBolServices
    {
        IEnumerable<BillOfLanding> GetAllBol();
        void AddItem(MerchandiseVM merchandiseVM);
        void CreateNewBol(BolVM command);
    }
}