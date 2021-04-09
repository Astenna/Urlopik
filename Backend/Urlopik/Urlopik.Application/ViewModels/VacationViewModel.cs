using System;

namespace Urlopik.Application.ViewModels
{
    public class VacationViewModel
    {
        public int Id { get; set; }

        public int VacationerId { get; set; }

        public int TypeId { get; set; }

        public bool HrAccepted { get; set; }

        public bool SupervisorAccepted { get; set; }

        public DateTime DateFrom { get; set; }

        public DateTime DateTo { get; set; }

        public string Description { get; set; }
    }
}
