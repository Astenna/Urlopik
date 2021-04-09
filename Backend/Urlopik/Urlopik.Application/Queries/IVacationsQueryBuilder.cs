using System;
using System.Linq;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Queries
{
    public interface IVacationsQueryBuilder
    {
        IQueryable<Vacation> AsQueryable();
        IVacationsQueryBuilder SearchByDescription(string descriptionSubstring);
        IVacationsQueryBuilder SearchByEarlierThan(DateTime? earlierThan);
        IVacationsQueryBuilder SearchByLaterThan(DateTime? laterThan);
        IVacationsQueryBuilder SearchByTypeId(int? typeId);
        IVacationsQueryBuilder SearchByVacationerId(int? vacationerId);
        IVacationsQueryBuilder With(IQueryable<Vacation> query);
    }
}