using Data;
using Domain.IServices;
using Infrastructure.Decorator;
using Infrastructure.Queries;
using System.Collections.Generic;
using WebCore.Queries;

namespace WebCore.Services
{
    public class BranchServices : IService<Branch>, IBranchServices
    {
        private readonly IQueryHandler<GetAllBranchQuery, IEnumerable<Branch>> getAllBranchHander;

        public BranchServices(
            IQueryHandler<GetAllBranchQuery, IEnumerable<Branch>> _getAllBranchHander
            )
        {
            getAllBranchHander = _getAllBranchHander;
        }

        public IEnumerable<Branch> GetAllBranches()
        {
            var logger = new ActivityLogForQueryHandlerDecorator<GetAllBranchQuery, IEnumerable<Branch>>(getAllBranchHander);
            return logger.Handle(new GetAllBranchQuery { });
        }
    }
}