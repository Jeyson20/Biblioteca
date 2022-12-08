using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Biblioteca_Backend.Models
{
    public partial class Libro
    {
        public Libro()
        {
            Prestamos = new HashSet<Prestamo>();
        }

        public int IdLibro { get; set; }
        public int? IdAutor { get; set; }
        public int? IdCategoria { get; set; }
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public string? Imagen { get; set; }
        public bool? Estado { get; set; }
        public int? Ejemplares { get; set; }
        public DateTime? FechaCreacion { get; set; }
		[JsonIgnore]
		public virtual Autor? IdAutorNavigation { get; set; }
		[JsonIgnore]
		public virtual Categorium? IdCategoriaNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Prestamo> Prestamos { get; set; }
    }
}
