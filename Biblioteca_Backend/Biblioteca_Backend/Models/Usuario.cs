using System;
using System.Collections.Generic;

namespace Biblioteca_Backend.Models
{
    public partial class Usuario
    {
        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Correo { get; set; }
        public string? Clave { get; set; }
        public string? TipoUsuario { get; set; }
        public DateTime? FechaCreacion { get; set; }
    }
}
