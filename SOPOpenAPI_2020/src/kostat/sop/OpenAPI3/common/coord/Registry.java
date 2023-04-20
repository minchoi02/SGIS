package kostat.sop.OpenAPI3.common.coord;

import java.util.HashMap;
import java.util.Map;


/**
 * Supplies predefined values for various library classes
 * such as {@link Ellipsoid}, {@link Datum}, and {@link Projection}. 
 * 
 * @author Martin Davis
 *
 */
public class Registry {

  public Registry() {
    super();
    initialize();
  }

  public final static Datum[] datums = 
  {
    Datum.WGS84,
    Datum.GGRS87,
    Datum.NAD27,
    Datum.NAD83,
    Datum.POTSDAM,
    Datum.CARTHAGE,
    Datum.HERMANNSKOGEL,
    Datum.IRE65,
    Datum.NZGD49,
    Datum.OSEB36
  };

  public Datum getDatum(String code)
  {
    for ( int i = 0; i < datums.length; i++ ) {
      if ( datums[i].getCode().equals( code ) ) {
        return datums[i];
      }
    }
    return null;
  }

  public final static Ellipsoid[] ellipsoids = 
  {
    Ellipsoid.SPHERE,
    new Ellipsoid("MERIT", 6378137.0, 0.0, 298.257, "MERIT 1983"),
    new Ellipsoid("SGS85", 6378136.0, 0.0, 298.257, "Soviet Geodetic System 85"),
    Ellipsoid.GRS80,
    new Ellipsoid("IAU76", 6378140.0, 0.0, 298.257, "IAU 1976"),
    Ellipsoid.AIRY,
    Ellipsoid.MOD_AIRY,
    new Ellipsoid("APL4.9", 6378137.0, 0.0, 298.25, "Appl. Physics. 1965"),
    new Ellipsoid("NWL9D", 6378145.0, 298.25, 0.0, "Naval Weapons Lab., 1965"),
    new Ellipsoid("andrae", 6377104.43, 300.0, 0.0, "Andrae 1876 (Den., Iclnd.)"),
    new Ellipsoid("aust_SA", 6378160.0, 0.0, 298.25, "Australian Natl & S. Amer. 1969"),
    new Ellipsoid("GRS67", 6378160.0, 0.0, 298.2471674270, "GRS 67 (IUGG 1967)"),
    Ellipsoid.BESSEL,
    new Ellipsoid("bess_nam", 6377483.865, 0.0, 299.1528128, "Bessel 1841 (Namibia)"),
    Ellipsoid.CLARKE_1866,
    Ellipsoid.CLARKE_1880,
    new Ellipsoid("CPM", 6375738.7, 0.0, 334.29, "Comm. des Poids et Mesures 1799"),
    new Ellipsoid("delmbr", 6376428.0, 0.0, 311.5, "Delambre 1810 (Belgium)"),
    new Ellipsoid("engelis", 6378136.05, 0.0, 298.2566, "Engelis 1985"),
    Ellipsoid.EVEREST,
    new Ellipsoid("evrst48", 6377304.063, 0.0, 300.8017, "Everest 1948"),
    new Ellipsoid("evrst56", 6377301.243, 0.0, 300.8017, "Everest 1956"),
    new Ellipsoid("evrst69", 6377295.664, 0.0, 300.8017, "Everest 1969"),
    new Ellipsoid("evrstSS", 6377298.556, 0.0, 300.8017, "Everest (Sabah & Sarawak)"),
    new Ellipsoid("fschr60", 6378166.0, 0.0, 298.3, "Fischer (Mercury Datum) 1960"),
    new Ellipsoid("fschr60m", 6378155.0, 0.0, 298.3, "Modified Fischer 1960"),
    new Ellipsoid("fschr68", 6378150.0, 0.0, 298.3, "Fischer 1968"),
    new Ellipsoid("helmert", 6378200.0, 0.0, 298.3, "Helmert 1906"),
    new Ellipsoid("hough", 6378270.0, 0.0, 297.0, "Hough"),
    Ellipsoid.INTERNATIONAL,
    Ellipsoid.INTERNATIONAL_1967,
    Ellipsoid.KRASSOVSKY,
    new Ellipsoid("kaula", 6378163.0, 0.0, 298.24, "Kaula 1961"),
    new Ellipsoid("lerch", 6378139.0, 0.0, 298.257, "Lerch 1979"),
    new Ellipsoid("mprts", 6397300.0, 0.0, 191.0, "Maupertius 1738"),
    new Ellipsoid("plessis", 6376523.0, 6355863.0, 0.0, "Plessis 1817 France)"),
    new Ellipsoid("SEasia", 6378155.0, 6356773.3205, 0.0, "Southeast Asia"),
    new Ellipsoid("walbeck", 6376896.0, 6355834.8467, 0.0, "Walbeck"),
    Ellipsoid.WGS60,
    Ellipsoid.WGS66,
    Ellipsoid.WGS72,
    Ellipsoid.WGS84,
        new Ellipsoid("NAD27", 6378249.145, 0.0, 293.4663, "NAD27: Clarke 1880 mod."),
        new Ellipsoid("NAD83", 6378137.0, 0.0, 298.257222101, "NAD83: GRS 1980 (IUGG, 1980)"),
  };


  public Ellipsoid getEllipsoid(String name)
  {
    for ( int i = 0; i < ellipsoids.length; i++ ) {
      if ( ellipsoids[i].shortName.equals( name ) ) {
        return ellipsoids[i];
      }
    }
    return null;
  }

  private Map<String, Class> projRegistry;

  private void register( String name, Class cls, String description ) {
    projRegistry.put( name, cls );
  }

  public Projection getProjection( String name ) {
//    if ( projRegistry == null )
//      initialize();
    Class cls = (Class)projRegistry.get( name );
    if ( cls != null ) {
      try {
        Projection projection = (Projection)cls.newInstance();
        if ( projection != null )
          projection.setName( name );
        return projection;
      }
      catch ( IllegalAccessException e ) {
        e.printStackTrace();
      }
      catch ( InstantiationException e ) {
        e.printStackTrace();
      }
    }
    return null;
  }
  
  private synchronized void initialize() {
    // guard against race condition
    if (projRegistry != null) 
      return;
    projRegistry = new HashMap();
    register( "longlat", LongLatProjection.class, "Lat/Long" );
    register( "tmerc", TransverseMercatorProjection.class, "Transverse Mercator" );
    register( "utm", TransverseMercatorProjection.class, "Universal Transverse Mercator (UTM)" );
  }


}
