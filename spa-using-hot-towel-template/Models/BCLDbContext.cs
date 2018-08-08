using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BCLSpa.Models
{
    public class BCLDbContext:DbContext
    {
        public BCLDbContext()
            : base("name=BCLSpaContext")
        {
        }

        public System.Data.Entity.DbSet<Category> Category { get; set; }
    }
}