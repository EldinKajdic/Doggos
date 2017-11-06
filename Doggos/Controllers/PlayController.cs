using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Doggos.Controllers
{
    public class PlayController : Controller
    {
        private UserinfoEntities1 db = new UserinfoEntities1();

        // GET: Play
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Models.UserClass signin)
        {
            if (signin.uid == null || signin.pwd == null)
            {
                ModelState.AddModelError("", "Du måste fylla i alla fält.");
                return View();
            }

            bool trueUser = false;
            // trueUser = System.Web.Security.FormsAuthentication.Authenticate(signin.uid, signin.pwd);
            trueUser = validateLogin(signin.uid, signin.pwd);

            if (trueUser == true)
            {
                System.Web.Security.FormsAuthentication.RedirectFromLoginPage(signin.uid, false);
            }

            ModelState.AddModelError("", "Ditt användarnamn eller lösenord är fel.");
            return View();
        }

        private bool validateLogin(string username, string password)
        {
            var user = from rows in db.userinfo
                       where rows.uid.ToUpper() == username.ToUpper()
                       && rows.pwd == password
                       select rows;

            if (user.Count() == 1)
            {
                return true;
            }
             else
            {
                return false;
            }

        }

        public ActionResult LogOut()
        {
            System.Web.Security.FormsAuthentication.SignOut();
            return RedirectToAction("Index");
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(userinfo newUser)
        {
            if (newUser.uid == null || newUser.pwd == null || newUser.email == null )
            {
                ModelState.AddModelError("", "Du måste fylla i alla fält.");
                return View();
            }
            else
            {
                var user = from userRows in db.userinfo
                           where userRows.uid.ToUpper() == newUser.uid.ToUpper()
                           select userRows;

                var email = from emailRows in db.userinfo
                           where emailRows.email.ToUpper() == newUser.email.ToUpper()
                           select emailRows;

                if (user.Count() == 1)
                {
                    ModelState.AddModelError("", "Detta användarnamn är upptaget.");
                    return View();
                }


                else if (email.Count() == 1)
                {
                    ModelState.AddModelError("", "Det finns redan en användare under denna email.");
                    return View();
                }

                else
                {
                    try
                    {
                        db.userinfo.Add(newUser);
                        db.SaveChanges();
                    }

                    catch (Exception e)
                    {

                    }
                }



                return RedirectToAction("Index");
            }

        }

        [Authorize]
        #pragma warning disable CS0108 
        public ActionResult Profile()
        #pragma warning restore CS0108 
        {
            List<userinfo> userList = db.userinfo.ToList();
            return View(userList);
        }


        [Authorize]
        public ActionResult Edit(int ?id)
        {
            if (id == null)
            {
                return RedirectToAction("Index");
            }

            userinfo editUser = db.userinfo.Find(id);
            return View(editUser);
        }

        [HttpPost]
        public ActionResult Edit(userinfo updatedUser)
        {
            try
            {
                db.Entry(updatedUser).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }

            catch (Exception e)
            {
                
            }

            return RedirectToAction("Profile");
        }

        [Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return RedirectToAction("Index");
            }

            userinfo deleteUser = db.userinfo.Find(id);
            return View(deleteUser);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            userinfo deleteUser = db.userinfo.Find(id);
            db.userinfo.Remove(deleteUser);
            db.SaveChanges();
            return RedirectToAction("Profile");
        }
    }
}