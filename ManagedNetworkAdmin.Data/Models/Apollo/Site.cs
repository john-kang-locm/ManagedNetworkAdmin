using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManagedNetworkAdmin.Data.Models.Apollo
{

    public partial class Site
    {
        public Site()
        {
            //this.SiteAliases = new HashSet<SiteAlias>();
            this.SiteSettings = new HashSet<SiteSetting>();
        }

        public int Id { get; set; }
        public int LayoutId { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public string Hostname { get; set; }
        public string DefaultLocation { get; set; }
        public string DefaultState { get; set; }
        public Nullable<bool> UseGeoIp { get; set; }
        public int PartnerId { get; set; }
        public int PartnerSiteId { get; set; }
        public bool ActiveFlag { get; set; }
        public bool DeletedFlag { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime UpdatedOn { get; set; }
        public Nullable<System.DateTime> DeletedOn { get; set; }
        public string UpdatedBy { get; set; }

        public virtual Layout Layout { get; set; }
        //public virtual ICollection<SiteAlias> SiteAliases { get; set; }
        public virtual ICollection<SiteSetting> SiteSettings { get; set; }
    }

	/// <summary>
	/// Site Model
	/// </summary>
    //public class Site
    //{
    //    /// <summary>
    //    /// Id
    //    /// </summary>
    //    [Key]
    //    public int Id { get; set; }
    //    /// <summary>
    //    /// The Layout ID for this Site
    //    /// </summary>
    //    [ForeignKey("Layout")]
    //    public int LayoutId { get; set; }
    //    /// <summary>
    //    /// Name
    //    /// </summary>
    //    [Required(ErrorMessage = "Site Name is required")]
    //    public string Name { get; set; }
    //    /// <summary>
    //    /// Hostname
    //    /// </summary>
    //    [Required(ErrorMessage = "A valid hostname is required")]
    //    public string Hostname { get; set; }
    //    /// <summary>
    //    /// Description
    //    /// </summary>
    //    public string Description { get; set; }
    //    /// <summary>
    //    /// Default location for this site
    //    /// </summary>
    //    public string DefaultLocation { get; set; }
    //    /// <summary>
    //    /// Does this site use GeoIp?
    //    /// </summary>
    //    public bool UseGeoIp { get; set; }
    //    /// <summary>
    //    /// The Parnter ID associated with this Site (from LC Admin)
    //    /// </summary>
    //    public int PartnerId { get; set; }
    //    /// <summary>
    //    /// The Partner Site ID associated with this site (from LC Admin)
    //    /// </summary>
    //    public int PartnerSiteId { get; set; }
    //    /// <summary>
    //    /// Is this site currently Active
    //    /// </summary>
    //    public bool ActiveFlag { get; set; }
    //    /// <summary>
    //    /// Has this Site been deleted
    //    /// </summary>
    //    public bool? DeletedFlag { get; set; }
    //    /// <summary>
    //    /// Created date
    //    /// </summary>
    //    public DateTime CreatedOn { get; set; }
    //    /// <summary>
    //    /// Last updated date
    //    /// </summary>
    //    public DateTime UpdatedOn { get; set; }
    //    /// <summary>
    //    /// If deleted, when
    //    /// </summary>
    //    public DateTime? DeletedOn { get; set; }
    //    /// <summary>
    //    /// Who updated this Site last
    //    /// </summary>
    //    public string UpdatedBy { get; set; }
    //    /// <summary>
    //    /// Site Settings
    //    /// </summary>
    //    public virtual ICollection<SiteSetting> Settings { get; set; }
    //    /// <summary>
    //    /// The Site Layout
    //    /// </summary>
    //    public virtual Layout Layout { get; set; }

    //    /// <summary>
    //    /// Constructor
    //    /// </summary>
    //    public Site()
    //    {
    //        Settings = new List<SiteSetting>();
    //    }

    //}
}
