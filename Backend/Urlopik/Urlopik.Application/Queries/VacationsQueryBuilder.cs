using System;
using System.Linq;
using Urlopik.Persistence.Models;

namespace Urlopik.Application.Queries
{
    public class VacationsQueryBuilder : IVacationsQueryBuilder
    {
        private IQueryable<Vacation> _vacationsQuery;

        public IVacationsQueryBuilder With(IQueryable<Vacation> query)
        {
            _vacationsQuery = query;
            return this;
        }

        public IQueryable<Vacation> AsQueryable()
        {
            return _vacationsQuery;
        }

        public IVacationsQueryBuilder SearchByEarlierThan(DateTime? earlierThan)
        {
            if (earlierThan.HasValue)
            {
                _vacationsQuery = _vacationsQuery.Where(x => x.DateFrom < earlierThan);
            }

            return this;
        }

        public IVacationsQueryBuilder SearchByLaterThan(DateTime? laterThan)
        {
            if (laterThan.HasValue)
            {
                _vacationsQuery = _vacationsQuery.Where(x => x.DateTo > laterThan);
            }

            return this;
        }


        public IVacationsQueryBuilder SearchByDescription(string descriptionSubstring)
        {
            if (!string.IsNullOrWhiteSpace(descriptionSubstring))
            {
                _vacationsQuery = _vacationsQuery
                    .Where(x => x.Description.ToLower().Contains(descriptionSubstring.ToLower()));
            }

            return this;
        }

        public IVacationsQueryBuilder SearchByVacationerId(int? vacationerId)
        {
            if (vacationerId.HasValue)
            {
                _vacationsQuery = _vacationsQuery
                    .Where(x => x.VacationerId == vacationerId);
            }

            return this;
        }

        public IVacationsQueryBuilder SearchByTypeId(int? typeId)
        {
            if (typeId.HasValue)
            {
                _vacationsQuery = _vacationsQuery
                    .Where(x => x.TypeId == typeId);
            }

            return this;
        }

        public IVacationsQueryBuilder SearchByHrAccepted(bool? accepted)
        {
            if (accepted.HasValue)
            {
                _vacationsQuery = _vacationsQuery
                    .Where(x => x.HrAccepted == accepted);
            }

            return this;
        }

        public IVacationsQueryBuilder SearchBySupervisorAccepted(bool? accepted)
        {
            if (accepted.HasValue)
            {
                _vacationsQuery = _vacationsQuery
                    .Where(x => x.SupervisorAccepted == accepted);
            }

            return this;
        }
    }
}
