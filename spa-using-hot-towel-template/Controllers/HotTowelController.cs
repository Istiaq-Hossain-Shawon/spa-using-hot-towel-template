using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Helpers;
using System.Web.Mvc;
using BCLSpa.Models;

namespace BCLSpa.Controllers
{
    public class HotTowelController : Controller
    {
        //
        // GET: /HotTowel/
        private readonly BCLDbContext _contextProvider = new BCLDbContext();

        public ActionResult Index()
        {
            return View();
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

        public IEnumerable<string> GetCategory()
        {
            return new string[] { "value1", "value2" };
        }

        public ActionResult SomeActionMethod()
        {
            {
                return Json(new { id = 1, value = "new" }, JsonRequestBehavior.AllowGet);
            }

        }

        public ActionResult Test()
        {
            return Json(new
            {
                
                iTotalRecords = 97,
                iTotalDisplayRecords = 3,
                aaData = new List<string[]>() {
                    new string[] {"1", "Microsoft", "Redmond", "USA"},
                    new string[] {"2", "Google", "Mountain View", "USA"},
                    new string[] {"3", "Gowi", "Pancevo", "Serbia"}
                    }
            },
        JsonRequestBehavior.AllowGet);
        }

        public ActionResult Test2()
        {
            List<MembershipTransactionHistoryModel>list = new List<MembershipTransactionHistoryModel>(); 
            for (int i = 0; i < 26; i++)
            {
                list.Add(new MembershipTransactionHistoryModel
                {
                    TransactionDate = "01 May 2014",
                    StoreName = "Store Name",
                    CardNumber = "23423566",
                    TransactionType = "Purchase",
                    TransactionValue = "$134.25",
                    PointsEarned = "100",
                    PointsUsed = "23",
                    PointsBalance = "40000"
                });
                
            }
            var results = from l in list
                          select new[] { 
                            l.TransactionDate,
                            l.StoreName , 
                            l.CardNumber,
                            l.TransactionType,
                            l.TransactionValue,
                            l.PointsEarned,
                            l.PointsUsed,
                            l.PointsBalance 
                     };

            return Json(results, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Test3(int id)
        {
            return Json(id, JsonRequestBehavior.AllowGet);
        }
    }

    public class MembershipTransactionHistoryModel
    {
        public string TransactionDate { get; set; }
        public string StoreName { get; set; }
        public string CardNumber { get; set; }
        public string TransactionType { get; set; }
        public string TransactionValue { get; set; }
        public string PointsEarned { get; set; }
        public string PointsUsed { get; set; }
        public string PointsBalance { get; set; }
    }
}
