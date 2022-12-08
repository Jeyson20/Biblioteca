using System;
using System.Collections.Generic;

namespace Biblioteca_Backend.Models
{
    public partial class Prestamo
    {
        public int IdPrestamo { get; set; }
        public int? IdEstadoPrestamo { get; set; }
        public int? IdPersona { get; set; }
        public int? IdLibro { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public DateTime FechaDevolucion { get; set; }

        public virtual EstadoPrestamo? Estado { get; set; }
        public virtual Libro? Libro { get; set; }
        public virtual Persona? Persona { get; set; }
    }
}
