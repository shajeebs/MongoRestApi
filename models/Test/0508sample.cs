public interface ISecurityService
    {
        IEnumerable<UserRole> GetRolesForUser(string username);
        IEnumerable<RolePermission> GetPermissionsForRole(string rolename);
        IEnumerable<string> GetPermissionsForUser(string username);
        User GetUser(string username);
        Role GetRoleByName(string rolename);
        Role GetRoleById(string rolename);
        Role GetSecurityRole(string securityRoleId);
        Permission GetSecurityPermission(string securityPermissionId);
        bool CheckPermission(string permissionName, string username);
        IEnumerable<UserRole> GetUsersInSecurityRole(string seurityRoleName);
        void AddUserInRole(string userId, string securityRoleId);
        void RemoveUserInRole(string userId, string roleId);
        void AddPermissionToRole(string roleId, string permissionId);
        IEnumerable<Role> GetAllSecurityRole();
        IEnumerable<Group> GetAllSecurityGroup();
        List<string> GetPermissionByRoleId(string securityRoleId);
        //void RemoveRolePermission(int roleId);
        IEnumerable<User> GetAllUser();
        void AddRole(string roleName, string roleId);
        void DeleteRole(string roleId);
        void AddUser(string username, string email, string firstname, string lastname);
    }
//--------------------
public class SecurityService : BaseService, ISecurityService
    {
        private readonly IRepository<User> _userRepo;
        private readonly IRepository<Role> _roleRepo;
        private readonly IRepository<Permission> _permissionRepo;
        private readonly IRepository<Group> _groupRepo;
        private readonly IRepository<UserRole> _userRoleRepo;
        private readonly IRepository<RolePermission> _rolePermissionRepo;
        private readonly ISecurityRepository _securityRepository;
 
        public SecurityService(ISecurityRepository securityRepository = null,
            IRepository<User> userRepo = null,
            IRepository<Role> RoleRepo = null,
            IRepository<Permission> PermissionRepo = null,
            IRepository<Group> GroupRepo = null,
            IRepository<UserRole> UserRoleRepo = null,
            IRepository<RolePermission> RolePermissionRepo = null)
             : base(null, null, null)
        {
            _userRepo = userRepo;
            _roleRepo = RoleRepo;
            _permissionRepo = PermissionRepo;
            _groupRepo = GroupRepo;
            _userRoleRepo = UserRoleRepo;
            _rolePermissionRepo = RolePermissionRepo;
            _securityRepository = securityRepository;
        }
      
        public IEnumerable<RolePermission> GetPermissionsForRole(string rolename)
        {
            var role = GetRole(rolename); //TODO
 
            var rols = _rolePermissionRepo.GetAll(out ErrorMessage);
            //if (role.SysAdmin)
                return rols;
 
 
            //return role.Permissions;
        }
 
        public IEnumerable<UserRole> GetRolesForUser(string username)
        {
            var user = GetUser(username);
            return user.Roles;
        }
 
        public Permission GetPermission(string PermissionId)
       {
            return _permissionRepo.GetAll(out ErrorMessage).Where(p => p._id == PermissionId).FirstOrDefault();
        }
 
        public Role GetRoleById(string RoleId)
        {
            return _roleRepo.GetAll(out ErrorMessage).Where(r => r._id == RoleId).FirstOrDefault();
        }
 
        public IEnumerable<Role> GetAllRole()
        {
            return _securityRepository.GetAllRoles();
        }
 
        public User GetUser(string username)
        {
            var user = _securityRepository.GetUser(username);
 
            return user;
        }
 
        public Role GetRoleByName(string rolename)
        {
            return _roleRepo.GetAll(out ErrorMessage).Where(r => r.Name == rolename).FirstOrDefault();
        }
 
        public bool CheckPermission(string permissionName, string username)
        {
            bool hasPermission = false;
 
            var user = GetUser(username);
 
            foreach (var role in user.Roles)
            {
                if (role.Role.Permissions.Where(p => p.Permission != null && p.Permission.Name == permissionName).FirstOrDefault() != null)
                {
                    hasPermission = true;
                    break;
                }
            }
 
            return hasPermission;
        }
 
        public IEnumerable<UserRole> GetUsersInRole(string RoleName)
        {
            var role = GetRole(RoleName);
 
            return role != null ? role.Users.AsEnumerable() : null;
        }
 
        public void AddUserInRole(string userId, string RoleId)
        {
            var item = new UserRole()
            {
                UserId = userId,
                RoleId = RoleId
            };
           
            _userRoleRepo.Add(item, out ErrorMessage);
        }
 
        public void RemoveUserInRole(string userId, string roleId)
        {
            var itemToDelete = _userRoleRepo.GetAll(out ErrorMessage).ToList().Where(i => i.RoleId == roleId && i.UserId == userId).FirstOrDefault();
 
            _userRoleRepo.Delete(itemToDelete._id, out ErrorMessage);
        }
 
        public void AddPermissionToRole(string roleId, string permissionId)
        {
            var RolePermission = new RolePermission()
            {
                PermissionId = permissionId,
                RoleId = roleId
            };
 
            _rolePermissionRepo.Add(RolePermission, out ErrorMessage);
        }
 
        public IEnumerable<string> GetPermissionsForUser(string username)
        {
            var user = GetUser(username);
 
            if (user == null)
                return null;
 
            if (user.IsSysAdmin())
            {
                var permissionsSysAdmin = from p in _permissionRepo.GetAll(out ErrorMessage)
                                  select p.Name;
 
                return permissionsSysAdmin;
            }
 
            var roles = GetRolesForUser(username);
 
            var permissions = roles.SelectMany(r => r.Role.Permissions).ToList().AsQueryable();
 
            var all = from p in permissions
                   select p.Permission.Name;
 
            return all;
        }
 
        public IEnumerable<Group> GetAllGroup()
        {
            return _securityRepository.GetAllGroups();
        }
 
        public List<string> GetPermissionByRoleId(string RoleId)
        {
            return _rolePermissionRepo.GetAll(out ErrorMessage).Where(x => x.RoleId == RoleId).Select(x=>x.PermissionId).ToList();
        }
 
        //public void RemoveRolePermission(string roleId)
        //{
        //    var rolePermission = _RolePermissionRepo.Table.Where(x => x.RoleId == roleId).AsEnumerable();
 
        //    _RolePermissionRepo.Delete(rolePermission);
        //}
        public Role GetRole(string rolename)
        {
            return _roleRepo.GetAll(out ErrorMessage).Where(r => r.Name == rolename).FirstOrDefault();
        }
        public IEnumerable<User> GetAllUser()
        {
            var users = _securityRepository.GetAllUsers();
 
            return users;
        }
 
        public void AddRole(string roleName, string roleId = "")
        {
            if(!string.IsNullOrEmpty(roleId))
            {
                var entity = _roleRepo.GetById(roleId, out ErrorMessage);
                entity.Name = roleName;
 
                _roleRepo.Update(entity._id, entity, out ErrorMessage);
            }
            else
            {
                var role = new Role()
                {
                    Name = roleName,
                };
 
                _roleRepo.Add(role, out ErrorMessage);
            }
        }
 
        public void DeleteRole(string roleId)
        {
            //RemoveRolePermission(roleId);
            //var entity = _roleRepo.GetById(roleId);
 
            _roleRepo.Delete(roleId, out ErrorMessage);
        }
 
        public void AddUser(string username, string email, string firstname, string lastname)
        {
            var user = new User()
            {
                UserName = username,
                EmailAddress = email,
                Firstname = firstname,
                Lastname = lastname
            };
 
            _userRepo.Add(user, out ErrorMessage);
        }
 
        public Role GetSecurityRole(string securityRoleId)
        {
            return _roleRepo.GetAll(out ErrorMessage).Where(r => r._id == securityRoleId).FirstOrDefault();
        }
 
        public Permission GetSecurityPermission(string securityPermissionId)
        {
            return _permissionRepo.GetAll(out ErrorMessage).Where(p => p._id == securityPermissionId).FirstOrDefault();
        }
 
        public IEnumerable<Group> GetAllSecurityGroup()
        {
            return _securityRepository.GetAllGroups();
        }
        public IEnumerable<Role> GetAllSecurityRole()
        {
            return _securityRepository.GetAllRoles();
        }
        public IEnumerable<UserRole> GetUsersInSecurityRole(string securityRoleName)
        {
            var role = GetRole(securityRoleName);
 
            return role != null ? role.Users.AsEnumerable() : null;
        }
 
    }
 
//--------------------
 
'use strict'
 
/**
* Module Dependencies
*/
const _      = require('lodash'),
      errors = require('restify-errors');
 
/**
* Model Schema
*/
// const TodoModel = require('../models/todo'),
//     CustomerModel = require('../models/Customer'),
//     InvoiceModel = require('../models/Invoice'),
// module.exports = TodoModel
// module.exports = CustomerModel
// module.exports = InvoiceModel
 
//Test
require('../models/Test/test_customer')
require('../models/Test/test_invoice')
require('../models/Test/test_todo')
 
require('../models/Administration/AuditLog')
require('../models/Administration/GeneralLedgerSetting')
 
require('../models/Common/Company')
require('../models/Common/Party')
require('../models/Common/Contact')
require('../models/Common/PaymentTerm')
 
require('../models/Inventory/Item')
require('../models/Inventory/ItemCategory')
require('../models/Inventory/Measurement')
require('../models/Inventory/InventoryControlJournal')
 
require('../models/Purchasing/Vendor')
require('../models/Purchasing/PurchaseInvoice')
require('../models/Purchasing/PurchaseInvoiceLine')
require('../models/Purchasing/PurchaseOrder')
require('../models/Purchasing/PurchaseOrderLine')
require('../models/Purchasing/PurchaseReceipt')
require('../models/Purchasing/PurchaseReceiptLine')
 
require('../models/Sales/Customer')
require('../models/Sales/SalesDelivery')
require('../models/Sales/SalesDeliveryLine')
require('../models/Sales/SalesInvoice')
require('../models/Sales/SalesInvoiceLine')
require('../models/Sales/SalesOrder')
require('../models/Sales/SalesOrderLine')
require('../models/Sales/SalesQuote')
require('../models/Sales/SalesQuoteLine')
require('../models/Sales/SalesReceipt')
require('../models/Sales/SalesReceiptLine')
 
require('../models/TaxSystem/Tax')
require('../models/TaxSystem/TaxGroup')
require('../models/TaxSystem/TaxGroupTax')
require('../models/TaxSystem/TaxGroupTax')
 
require('../models/Financial/Account')
require('../models/Financial/MainContraAccount')
require('../models/Financial/AccountClass')
require('../models/Financial/Currency')
require('../models/Financial/Bank')
require('../models/Financial/FinancialYear')
require('../models/Financial/GeneralLedger')
require('../models/Financial/GeneralLedgerLine')
require('../models/Financial/JournalEntry')
require('../models/Financial/JournalEntryLine')
require('../models/Financial/MasterGeneralLedger')
//TODO Financial/TreeViewAccounts
//--------
using System.Collections.Generic;
 
namespace AlMuhasiba.Dto.Security
{
    public class Role : BaseModel
    {
        //[Key]
        //public int SecurityRoleId { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public bool SysAdmin { get; set; }
        public bool System { get; set; }
        public virtual IList<UserRole> Users { get; set; }
        public virtual IList<RolePermission> Permissions { get; set; }
        public Role()
        {
            Users = new List<UserRole>();
            Permissions = new List<RolePermission>();
        }
    }
}
//----------------
using System.Collections.Generic;
 
namespace AlMuhasiba.Dto.Security
{
    public class Permission : BaseModel
    {
        //[Key]
        //public int PermissionId { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public int GroupId { get; set; }
 
        public virtual Group Group { get; set; }
        public virtual IList<RolePermission> RolePermissions { get; set; }
 
        public Permission()
        {
            RolePermissions = new List<RolePermission>();
        }
    }
}
//------------------
using System.Collections.Generic;
 
namespace AlMuhasiba.Dto.Security
{
    public class User : BaseModel
    {
        public User()
        {
            Roles = new List<UserRole>();
        }
        //[Key]
        //public int UserId { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
 
        public virtual IList<UserRole> Roles { get; set; }
 
        public bool IsSysAdmin()
        {
            bool isSysAdmin = false;
 
            if (this.Roles.Count > 0)
            {
                foreach (var role in Roles)
                    if (role.Role.Name == "Administrator")
                    {
                        isSysAdmin = true;
                        break;
                    }
            }
 
            return isSysAdmin;
        }
    }
}
//--------------
using System.ComponentModel.DataAnnotations;
 
namespace AlMuhasiba.Dto.Financial
{
    public class Bank : BaseModel
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string LocalAccountId { get; set; }
        public string AccountNo { get;set;}
        public string BankName { get; set; }
        public string IfsCode { get; set; }
        public string Branch { get; set; }
        public bool IsActive { get; set; }
    }
}
//-----------------------
using AlMuhasiba.Dto.Common;
using System;
using System.Collections.Generic;
using System.Linq;
 
namespace AlMuhasiba.Dto.Financial
{
    public class JournalEntry : BaseModel
    {
        public string GeneralLedgerId { get; set; }
        public string PartyId { get; set; }
        public JournalVoucherTypes VoucherType { get; set; }
        public DateTime Date { get; set; }
        public string ReferenceNo { get; set; }
        public string Memo { get; set; }
        public bool Posted { get; set; }
        public bool ReadyForPosting { get; set; }
        public decimal DebitAmount { get; set; }
        public decimal CreditAmount { get; set; }
        //public decimal? DebitAmount { get { return GetDebitAmount(); } }
        //public decimal? CreditAmount { get { return GetCreditAmount(); } }
 
        public virtual IList<GeneralLedger> GeneralLedgers { get; set; }
        public virtual IList<Party> Parties { get; set; }
        public virtual GeneralLedger GeneralLedger { get; set; }
        public virtual Party Party { get; set; }
        public virtual IList<JournalEntryLine> JournalEntryLines { get; set; }
 
        //public JournalEntry()
        //{
        //    JournalEntryLines = new System.Collections.Generic.List<JournalEntryLine>();
        //}
 
        //private decimal GetDebitAmount()
        //{
        //    decimal sum = 0;
        //    //foreach(var entry in JournalEntryLines)
        //    //{
        //    //    if(entry.DrCr == DrOrCrSide.Dr)
        //    //        sum += entry.Amount;
        //    //}
        //    JournalEntryLines.Where(j => j.DrCr == DrOrCrSide.Dr).Sum(jel => jel.Amount);
        //    return sum;
        //}
 
        //private decimal GetCreditAmount()
        //{
        //    //decimal sum = 0;
        //    //foreach (var entry in JournalEntryLines)
        //    //{
        //    //    if (entry.DrCr == DrOrCrSide.Cr)
        //    //        sum += entry.Amount;
        //    //}
        //    //JournalEntryLines.Where(j => j.DrCr == DrOrCrSide.Cr).Sum(jel => jel.Amount);
        //    return JournalEntryLines.Where(j => j.DrCr == DrOrCrSide.Cr).Sum(jel => jel.Amount);
        //}
    }
 
    public class JournalEntryLine : BaseModel
    {
        public string JournalEntryId { get; set; }
       public string AccountId { get; set; }
        public DrOrCrSide DrCr { get; set; }
        public decimal Amount { get; set; }
        public string Memo { get; set; }
 
        public virtual JournalEntry JournalEntry { get; set; }
        public virtual Account Account { get; set; }
    }
}
//--------------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace AlMuhasiba.Dto.Financial
{
    public class MasterGeneralLedger : BaseModel
    {
        public string AccountId { get; set; }
        public string CurrencyId { get; set; }
        public string DocumentType { get; set; }
        public string TransactionNo { get; set; }
        public string AccountCode { get; set; }
        public string AccountName { get; set; }
        public DateTime Date { get; set; }
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
    }
}
//--------------------
using System.ComponentModel.DataAnnotations;
 
namespace AlMuhasiba.Dto.Common
{
    public partial class Contact : BaseModel
    {
        public Contact()
        {
        }
 
        public ContactTypes ContactType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string PartyId { get; set; }
        public virtual Party Party { get; set; }
    }
}
//---------------------
namespace AlMuhasiba.Dto.Common
{
    public class PaymentTerm : BaseModel
    {
        public string Description { get; set; }
        public PaymentTypes PaymentType { get; set; }
        public int DueAfterDays { get; set; }
        public bool IsActive { get; set; }
    }
}
//-----------
using System.ComponentModel.DataAnnotations;
 
namespace AlMuhasiba.Dto.Common
{
  public class Company : BaseModel
  {
    public string CompanyCode { get; set; }
    public string Name { get; set; }
    public string ShortName { get; set; }
    public byte[] Logo { get; set; }
  }
}
//-------------------
using System.Collections.Generic;
 
namespace AlMuhasiba.Dto.Financial
{
    public class AccountClass : BaseModel
    {
        public AccountClass()
        {
            Accounts = new List<Account>();
        }
 
        public string Name { get; set; }
        public string NormalBalance { get; set; }
        public virtual IList<Account> Accounts { get; set; }
    }
}
//--------------------
using AlMuhasiba.Dto.Administration;
using AlMuhasiba.Dto.Common;
using System.Collections.Generic;
using System.Linq;
 
namespace AlMuhasiba.Dto.Financial
{
    public class Account : BaseModel
    {
        public int AccountClassId { get; set; }
        public string ParentAccountId { get; set; }
        public DrOrCrSide DrOrCrSide { get; set; }
        public string CompanyId { get; set; }
        public string AccountCode { get; set; }
        public string AccountName { get; set; }
        public string Description { get; set; }
        public bool IsCash { get; set; }
        public bool IsContraAccount { get; set; }
        public decimal Balance { get { return GetBalance(); } }
        public decimal DebitBalance { get { return GetDebitCreditBalance(DrOrCrSide.Dr); } }
        public decimal CreditBalance { get { return GetDebitCreditBalance(DrOrCrSide.Cr); } }
        public string BalanceSide { get; set; }
 
        public virtual Account ParentAccount { get; set; }
        public virtual AccountClass AccountClass { get; set; }
        public virtual Company Company { get; set; }
 
        public virtual ICollection<Account> ChildAccounts { get; set; }
        public virtual ICollection<MainContraAccount> ContraAccounts { get; set; }
        public virtual ICollection<GeneralLedgerLine> GeneralLedgerLines { get; set; }
 
        public Account()
        {
            ChildAccounts = new List<Account>();
        }
 
        private decimal GetDebitCreditBalance(DrOrCrSide side)
        {
            decimal balance = 0;
 
            if (side == DrOrCrSide.Dr)
            {
                var dr = from d in GeneralLedgerLines
                         where d.DrCr == DrOrCrSide.Dr
                         select d;
 
                balance = dr.Sum(d => d.Amount);
            }
            else
            {
                var cr = from d in GeneralLedgerLines
                         where d.DrCr == DrOrCrSide.Cr
                         select d;
 
                balance = cr.Sum(d => d.Amount);
            }
 
            return balance;
        }
 
        public decimal GetBalance()
        {
            decimal balance = 0;
 
            var dr = from d in GeneralLedgerLines
                     where d.DrCr == DrOrCrSide.Dr
                     select d;
 
            var cr = from c in GeneralLedgerLines
                     where c.DrCr == DrOrCrSide.Cr
                     select c;
 
            decimal drAmount = dr.Sum(d => d.Amount);
            decimal crAmount = cr.Sum(c => c.Amount);
 
            if (AccountClass.NormalBalance == "Dr")
            {
                balance = drAmount - crAmount;
            }
            else
            {
                balance = crAmount - drAmount;
            }
 
            return balance;
        }
 
        public bool CanPost()
        {
            if (ChildAccounts != null && ChildAccounts.Count > 0)
                return false;
            return true;
        }
 
        /// <summary>
        /// Used to indicate the increase or decrease on account. When there is a change in an account, that change is indicated by either debiting or crediting that account.
        /// </summary>
        /// <param name="amount">The amount to enter on account.</param>
        /// <returns></returns>
        public DrOrCrSide DebitOrCredit(decimal amount)
        {
            var side = DrOrCrSide.Dr;
 
            if (this.AccountClassId == (int)AccountClasses.Assets || this.AccountClassId == (int)AccountClasses.Expense)
            {
                if (amount > 0)
                    side = DrOrCrSide.Dr;
                else
                    side = DrOrCrSide.Cr;
            }
 
            if (this.AccountClassId == (int)AccountClasses.Liabilities || this.AccountClassId == (int)AccountClasses.Equity || this.AccountClassId == (int)AccountClasses.Revenue)
            {
                if (amount < 0)
                    side = DrOrCrSide.Dr;
                else
                    side = DrOrCrSide.Cr;
            }
 
            if (this.IsContraAccount)
            {
                if (side == DrOrCrSide.Dr)
                    return DrOrCrSide.Cr;
                if (side == DrOrCrSide.Cr)
                    return DrOrCrSide.Dr;
            }
 
            return side;
        }
    }
}
//-------------------------
using System.ComponentModel.DataAnnotations;
 
namespace AlMuhasiba.Dto.Common
{
    public enum AccountClasses
    {
        Assets = 1,
        Liabilities = 2,
        Equity = 3,
        Revenue = 4,
        Expense = 5,
        Temporary = 6
    }
 
    public enum DocumentTypes
    {
        SalesQuote = 1,
        SalesOrder,
        SalesDelivery,
        SalesInvoice,
        SalesReceipt,
        SalesDebitMemo,
        SalesCreditMemo,
        PurchaseOrder,
        PurchaseReceipt,
        PurchaseInvoice,
        PurchaseDebitMemo,
        PurchaseCreditMemo,
        PurchaseInvoicePayment,
        JournalEntry,
        CustomerAllocation
    }
 
    public enum AccountTypes
    {
        Posting = 1, Heading, Total, BeginTotal, EndTotal
    }
 
    public enum DrOrCrSide
    {
        NA = 0, Dr = 1, Cr = 2
    }
 
    public enum PartyTypes
    {
        Customer = 1,
        Vendor = 2,
        Contact = 3
    }
 
    /// <summary>
    /// Journal voucher is prepared for the transactions which does not relate to sales, purchases, cash, bank, material returns
    /// </summary>
    public enum JournalVoucherTypes
    {
        OpeningBalances = 1,
        ClosingEntries = 2,
        AdjustmentEntries = 3,
        CorrectionEntries = 4,
        TransferEntries = 5,
    }
 
    public enum PurchaseOrderStatus
    {
        Draft = 0,
        Open = 1,
        PartiallyReceived = 2,
        FullReceived = 3,
        Invoiced = 4 ,
        Closed = 5
    }
 
    public enum PurchaseInvoiceStatus
    {
        Draft = 0,
        Open = 1,
        Paid = 2
    }
 
    public enum SequenceNumberTypes
    {
        SalesQuote = 1,
        SalesOrder,
        SalesDelivery,
        SalesInvoice,
        SalesReceipt,
        PurchaseOrder,
        PurchaseReceipt,
        PurchaseInvoice,
        VendorPayment,
        JournalEntry,
        Item,
        Customer,
        Vendor,
        Contact
    }
 
    public enum AddressTypes
    {
        Office,
        Home
    }
 
    public enum ContactTypes
    {
        Customer = 1, Vendor = 2, Company = 3
    }
 
    public enum ItemTypes
    {
        Manufactured = 1,
        Purchased,
        Service,
        Charge
    }
 
    public enum PaymentTypes
    {
        Prepaymnet = 1,
        Cash,
        AfterNoOfDays,
        DayInTheFollowingMonth
    }
 
    public enum BankTypes
    {
        CheckingAccount = 1,
        SavingsAccount,
        CashAccount
    }
 
    public enum SalesInvoiceStatus
    {
        Draft,
        Open = 1,
        Overdue,
        Closed,
        Void
    }
 
    public enum SalesOrderStatus
    {
        Draft = 0,
        Open = 1,
        Overdue = 2,
        Closed = 3,
        Void = 4,
        PartiallyInvoiced = 5,
        FullyInvoiced = 6
    }
 
    public enum SalesQuoteStatus
    {
        Draft = 0,
        Open = 1,
        Overdue = 2,
        Closed = 3,
        Void = 4,
        [Display(Name = "Closed - Order Created")]
        ClosedOrderCreated = 5
    }
}
//-------------------
using System;
 
namespace AlMuhasiba.Dto.Financial
{
    public class FinancialYear: BaseModel
    {
        public string FiscalYearCode { get; set; }
        public string FiscalYearName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
//-----------------------
using AlMuhasiba.Dto.Common;
using AlMuhasiba.Dto.Purchasing;
using System;
using System.Collections.Generic;
using System.Linq;
 
namespace AlMuhasiba.Dto.Financial
{
    public class GeneralLedger : BaseModel
    {
        public DateTime Date { get; set; }
        public DocumentTypes DocumentType { get; set; }
        public string Description { get; set; }
        public int AccountId { get; set; }
        public DrOrCrSide DrCr { get; set; }
        public decimal Amount { get; set; }
 
        public IList<PurchaseReceipt> PurchaseOrderReceipts { get; set; } //TODO: get from DB
        public IList<GeneralLedgerLine> GeneralLedgerLines { get; set; } //TODO: get from DB
 
        public GeneralLedger()
        {
            GeneralLedgerLines = new List<GeneralLedgerLine>();
            PurchaseOrderReceipts = new List<PurchaseReceipt>();
        }
 
        public ICollection<GeneralLedgerLine> Assets()
        {
            var assets = GeneralLedgerLines.Where(a => a.Account.AccountClass.NormalBalance == ((int)AccountClasses.Assets).ToString());
 
            return assets.ToList();
        }
 
        public ICollection<GeneralLedgerLine> Liabilities()
        {
            var liablities = GeneralLedgerLines.Where(a => a.Account.AccountClass.NormalBalance == ((int)AccountClasses.Liabilities).ToString());
 
            return liablities.ToList();
        }
 
        public ICollection<GeneralLedgerLine> Equities()
        {
            var equities = GeneralLedgerLines.Where(a => a.Account.AccountClass.NormalBalance == ((int)AccountClasses.Equity).ToString());
 
            return equities.ToList();
        }
 
        public ICollection<GeneralLedgerLine> Revenues()
        {
            var revenues = GeneralLedgerLines.Where(a => a.Account.AccountClass.NormalBalance == ((int)AccountClasses.Revenue).ToString());
 
            return revenues.ToList();
        }
 
        public ICollection<GeneralLedgerLine> Expenses()
        {
            var expenses = GeneralLedgerLines.Where(a => a.Account.AccountClass.NormalBalance == ((int)AccountClasses.Expense).ToString());
 
            return expenses.ToList();
        }
 
        public bool HaveAtLeastTwoAccountClass()
        {
            var grouped = this.GeneralLedgerLines.GroupBy(a => a.Account.AccountClassId);
 
            if (grouped.Count() > 1)
                return true;
            else
                return false;
        }
 
        /// <summary>
        /// Assets = Liabilities + Equities
        /// </summary>
        /// <returns></returns>
        public bool ValidateAccountingEquation()
        {
            bool isEqual = true;
 
            var assetsAmount = Assets() != null ? Assets().Sum(a => a.Amount) : 0;
            var liabilitiesAmount = Liabilities() != null ? Liabilities().Sum(a => a.Amount) : 0;
            var equitiesAmount = Equities() != null ? Equities().Sum(a => a.Amount) : 0;
 
            isEqual = assetsAmount == liabilitiesAmount + equitiesAmount;
 
            return isEqual;
        }
 
        public bool ValidateLiabilitiesEqualsExpenses()
        {
            bool isEqual = true;
 
            var liabilitiesAmount = Liabilities() != null ? Liabilities().Sum(a => a.Amount) : 0;
            var expensesAmount = Expenses() != null ? Expenses().Sum(a => a.Amount) : 0;
 
            isEqual = liabilitiesAmount >= expensesAmount;
 
            return isEqual;
        }
 
        public bool ValidateAssetsEqualsRevenues()
        {
            bool isEqual = true;
 
            var assetsAmount = Assets() != null ? Assets().Sum(a => a.Amount) : 0;
            var revenuesAmount = Revenues() != null ? Revenues().Sum(a => a.Amount) : 0;
 
            isEqual = assetsAmount >= revenuesAmount;
 
            return isEqual;
        }
 
        public bool ValidateAssetsEqualsEquities()
        {
            bool isEqual = true;
 
            var assetsAmount = Assets() != null ? Assets().Sum(a => a.Amount) : 0;
            var equitiesAmount = Equities() != null ? Equities().Sum(a => a.Amount) : 0;
 
            isEqual = assetsAmount >= equitiesAmount;
 
            return isEqual;
        }
 
    }
 
    public class GeneralLedgerLine : BaseModel
    {
        public string GeneralLedgerId { get; set; }
        public string AccountId { get; set; }
        public DrOrCrSide DrCr { get; set; }
        public decimal Amount { get; set; }
        public virtual Account Account { get; set; }
        public virtual GeneralLedger GeneralLedger { get; set; }
        public virtual IList<Account> Accounts { get; set; }
        public virtual IList<GeneralLedger> GeneralLedgers { get; set; }
    }
}
//-----------------
using AlMuhasiba.Dto.Common;
using AlMuhasiba.Dto.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
 
namespace AlMuhasiba.Dto.Purchasing
{
    public class PurchaseOrder : BaseModel
    {
        public string VendorId { get; set; }
        public string No { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string PaymentTermId { get; set; }
        public string ReferenceNo { get; set; }
        public PurchaseOrderStatus Status { get; set; }
        public virtual Vendor Vendor { get; set; }
        public virtual IList<PurchaseOrderLine> PurchaseOrderLines { get; set; }
 
        public PurchaseOrder()
        {
            PurchaseOrderLines = new List<PurchaseOrderLine>();
        }
 
        public bool IsCompleted()
        {
            //foreach (var line in PurchaseOrderLines)
            //{
            //    foreach (var receipt in PurchaseReceipts)
            //    {
            //        var totalReceivedQuatity = receipt.PurchaseReceiptLines.Where(l => l.PurchaseOrderLineId == line.Id).Sum(q => q.ReceivedQuantity);
 
            //        if (totalReceivedQuatity >= line.Quantity)
            //            return true;
            //    }
            //}
 
            return false;
        }
 
        public bool IsPaid()
        {
            bool paid = false;
            //decimal totalPaidAmount = Payments.Where(p => p.PurchaseOrderId == Id).Sum(a => a.Amount);
            //decimal totalPurchaseAmount = PurchaseOrderLines.Sum(d => d.Amount);
            //if (totalPaidAmount == totalPurchaseAmount)
            //    paid = true;
            return paid;
        }
    }
 
    public class PurchaseOrderLine : BaseModel
    {
        public string PurchaseOrderHeaderId { get; set; }
        public string ItemId { get; set; }
        public string MeasurementId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Cost { get; set; }
        public decimal Discount { get; set; }
        public decimal Amount { get; set; }
        public virtual PurchaseOrder PurchaseOrder { get; set; }
        public virtual Item Item { get; set; }
        public virtual Measurement Measurement { get; set; }
        public virtual IList<PurchaseInvoiceLine> PurchaseInvoiceLines { get; set; }
 
        public PurchaseOrderLine()
        {
            PurchaseInvoiceLines = new List<PurchaseInvoiceLine>();
        }
 
        public decimal GetRemainingQtyToInvoice()
        {
            decimal invoiced = PurchaseInvoiceLines.Sum(l => l.Quantity);
            return Quantity - invoiced;
        }
    }
}
//---------
using AlMuhasiba.Dto.Common;
using AlMuhasiba.Dto.Inventory;
using System;
using System.Collections.Generic;
 
namespace AlMuhasiba.Dto.Sales
{
    public class SalesQuote : BaseModel
    {
        public string CustomerId { get; set; }
        public string PaymentTermId { get; set; }
        public string ReferenceNo { get; set; }
        public string No { get; set; }
        public SalesQuoteStatus? Status { get; set; }
        public DateTime Date { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual IList<SalesQuoteLine> SalesQuoteLines { get; set; }
 
        public SalesQuote()
        {
            SalesQuoteLines = new List<SalesQuoteLine>();
        }
    }
 
    public class SalesQuoteLine : BaseModel
    {
        public string SalesQuoteId { get; set; }
        public string ItemId { get; set; }
        public string MeasurementId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Discount { get; set; }
        public decimal Amount { get; set; }
        public SalesQuote SalesQuote { get; set; }
        public virtual Item Item { get; set; }
        public virtual Measurement Measurement { get; set; }
    }
}
//----------------
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace AlMuhasiba.Dto.Security
{
    public class UserRole : BaseModel
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }
 
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
}
//---------------
using System.Collections.Generic;
 
namespace AlMuhasiba.Dto.Security
{
    public class Group : BaseModel
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public virtual IList<Permission> Permissions { get; set; }
 
        public Group()
        {
            Permissions = new List<Permission>();
        }
    }
}