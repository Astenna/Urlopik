using System;

namespace Urlopik.Application.Queries
{
    public class VacationsQuery
    {
        public int? VacationerId { get; set; }

        public int? TypeId { get; set; }

        public DateTime? LaterThan { get; set; }

        public DateTime? EarlierThan { get; set; }

        public string Description { get; set; }

        public bool? HrAccepted { get; set; }

        public bool? SupervisorAccepted { get; set; }
    }
}
