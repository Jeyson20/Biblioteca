using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Biblioteca_Backend.Models;

namespace Biblioteca_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoPrestamosController : ControllerBase
    {
        private readonly DB_BIBLIOTECAContext _context;

        public EstadoPrestamosController(DB_BIBLIOTECAContext context)
        {
            _context = context;
        }

        // GET: api/EstadoPrestamos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoPrestamo>>> GetEstadoPrestamos()
        {
            return await _context.EstadoPrestamos.ToListAsync();
        }

        // GET: api/EstadoPrestamos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoPrestamo>> GetEstadoPrestamo(int id)
        {
            var estadoPrestamo = await _context.EstadoPrestamos.FindAsync(id);

            if (estadoPrestamo == null)
            {
                return NotFound();
            }

            return estadoPrestamo;
        }


        // POST: api/EstadoPrestamos
        [HttpPost]
        public async Task<ActionResult<EstadoPrestamo>> PostEstadoPrestamo(EstadoPrestamo estadoPrestamo)
        {
            _context.EstadoPrestamos.Add(estadoPrestamo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEstadoPrestamo", new { id = estadoPrestamo.IdEstadoPrestamo }, estadoPrestamo);
        }
    }
}
