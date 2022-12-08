using System;
using System.Collections.Generic;

namespace Biblioteca_Backend.Models
{
    public partial class Categorium
    {
        public Categorium()
        {
            Libros = new HashSet<Libro>();
        }

        public int IdCategoria { get; set; }
        public string? Descripcion { get; set; }
        public string? Imagen { get; set; }

        public virtual ICollection<Libro> Libros { get; set; }
    }
}
