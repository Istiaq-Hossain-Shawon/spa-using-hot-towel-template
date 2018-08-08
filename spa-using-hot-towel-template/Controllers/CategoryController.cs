using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using BCLSpa.Models;

namespace BCLSpa.Controllers
{
    public class CategoryController : Controller
    {
        //
        // GET: /Category/
        private readonly BCLDbContext _contextProvider = new BCLDbContext();
        public ActionResult Index()
        {
            return Json("Hello", JsonRequestBehavior.AllowGet);
        }
        public ActionResult Save(Category category)
        {
            try
            {
                _contextProvider.Category.Add(category);
                _contextProvider.SaveChanges();
                return Json("success", JsonRequestBehavior.AllowGet);

            }
            catch (Exception exception)
            {
                return Json(exception, JsonRequestBehavior.AllowGet);

            }

        }
       
        public ActionResult Edit(Category category)
        {
            if (ModelState.IsValid)
            {

                Category currentItem = Get(category.Id);
                if (currentItem == null)
                    return Json("Category not found", JsonRequestBehavior.AllowGet);
                
                _contextProvider.Entry(currentItem).CurrentValues.SetValues(category);
                _contextProvider.SaveChanges();
                return Json("Updated", JsonRequestBehavior.AllowGet); ;
            }
            else
            {
                return Json("not valid", JsonRequestBehavior.AllowGet); ;
            }
            
        }
        public Category Get(int categoryID)
        {
            Category category = new Category(1, "Murtaza", "Mirza");
            return category;
            //return _contextProvider.Category.Find(categoryID);   // .Where(row => row.ConfessionID == id).SingleOrDefault();
        }

        public JsonResult GetCategories()
        {
            List<Category> employees = new List<Category>();
            employees.Add(new Category(1, "Murtaza", "Mirza"));
            employees.Add(new Category(2, "Ray", "Angie"));
            employees.Add(new Category(3, "Burton", "James"));
            employees.Add(new Category(4, "Burton", "James"));
            employees.Add(new Category(5, "Burton", "James"));
            employees.Add(new Category(6, "Burton", "James"));
            employees.Add(new Category(7, "Burton", "James"));
            employees.Add(new Category(8, "Burton", "James"));
            employees.Add(new Category(9, "Burton", "James"));
            //return employees;
            return Json(employees, JsonRequestBehavior.AllowGet); ;
        }

        //// GET api/Category
        //public List<Category> GetCategory()
        //{
        //    List<Category> employees = new List<Category>();
        //    employees.Add(new Category(1, "Murtaza", "Mirza"));
        //    employees.Add(new Category(2, "Ray", "Angie"));
        //    employees.Add(new Category(3, "Burton", "James"));

        //    return employees;
        //}

        //// GET api/Category/5
        //[ResponseType(typeof(Category))]
        //public IHttpActionResult GetCategory(string id)
        //{
        //    Category category = new Category(1, "Murtaza", "Mirza");
        //    return Ok(category);
        //}

    }
}
