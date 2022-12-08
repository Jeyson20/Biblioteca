using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Biblioteca_Backend.Models
{
    public partial class EstadoPrestamo
    {
        public EstadoPrestamo()
        {
            Prestamos = new HashSet<Prestamo>();
        }

        public int IdEstadoPrestamo { get; set; }
        public string? Descripcion { get; set; }

        [JsonIgnore]
        public virtual ICollection<Prestamo> Prestamos { get; set; }
    }
}
