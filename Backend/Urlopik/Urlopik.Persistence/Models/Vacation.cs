using System;
using System.ComponentModel.DataAnnotations;

namespace Urlopik.Persistence.Models
{
    public class Vacation
    {
        public int Id { get; set; }

        [Required]
        public int VacationerId { get; set; }

        [Required]
        public int TypeId { get; set; }

        public bool HrAccepted { get; set; }

        public bool SupervisorAccepted { get; set; }

        [Required]
        public DateTime DateFrom { get; set; }

        [Required]
        public DateTime DateTo { get; set; }

        public string Description { get; set; }

        public VacationType Type { get; set; }

        public User Vacationer { get; set; }
    }
}
