using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Biblioteca_Backend.Models
{
    public partial class Persona
    {
        public Persona()
        {
            Prestamos = new HashSet<Prestamo>();
        }

        public int IdPersona { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Cedula { get; set; }
        public string? Correo { get; set; }
        public string? Direccion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        [JsonIgnore]
        public virtual ICollection<Prestamo> Prestamos { get; set; }
    }
}
