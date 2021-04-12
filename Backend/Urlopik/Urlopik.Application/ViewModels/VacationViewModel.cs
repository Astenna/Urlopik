using System;
using System.Text.Json.Serialization;

namespace Urlopik.Application.ViewModels
{
    public class VacationViewModel
    {
        public int Id { get; set; }

        public int VacationerId { get; set; }

        public int TypeId { get; set; }

        public bool HrAccepted { get; set; }

        public bool SupervisorAccepted { get; set; }

        [JsonPropertyName("start")]
        public DateTime DateFrom { get; set; }

        [JsonPropertyName("end")]
        public DateTime DateTo { get; set; }

        public string Description { get; set; }
    }
}
