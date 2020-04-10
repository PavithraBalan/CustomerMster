using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CusDetails.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CusDetails.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class CustomerController:ControllerBase
    {
        public readonly CusDBContext _context;
        public CustomerController(CusDBContext context)
        {
            _context = context;
        }
        //Get: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _context.Customers.ToListAsync();
        }
         // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(long id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        //Post:api/Customer
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Customer>>> PostCustomer(Customer customer)
        {
             _context.Customers.Add(customer);
             await _context.SaveChangesAsync();
             return CreatedAtAction("GetCustomer",new{id = customer.Id},customer);
        }
        // PUT: api/TodoItems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteTodoItem(long id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }
        private bool CustomerExists(long id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    } 
} 