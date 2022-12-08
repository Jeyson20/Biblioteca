using Biblioteca_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Biblioteca_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly DB_BIBLIOTECAContext _context;

        public CategoriasController(DB_BIBLIOTECAContext context)
        {
            _context = context;
        }

        // GET: api/Categorias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categorium>>> GetCategoria()
        {
            return await _context.Categoria.ToListAsync();
        }

        // GET: api/Categorias/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categorium>> GetCategorium(int id)
        {
            var categorium = await _context.Categoria.FindAsync(id);

            if (categorium == null)
            {
                return NotFound();
            }

            return categorium;
        }

        // POST: api/Categorias
        [HttpPost]
        public async Task<ActionResult<Categorium>> PostCategorium(Categorium categorium)
        {
            _context.Categoria.Add(categorium);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategorium", new { id = categorium.IdCategoria }, categorium);
        }
    }
}
