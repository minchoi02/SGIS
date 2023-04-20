/*
* @(#)WKBAdapter.java   1.0 2005/06/18
*
* Copyright ��2004 by �ѱ����߾ӿ�����. All rights reserved.
* http://www.aks.ac.kr
*
* This software is the confidential and proprietary information of AKS.
* You shall not disclose such Confidential Information and
* shall use it only in accordance with the terms of the license agreement
* you entered into with AKS.
*/

package kostat.sop.OpenAPI3.common.geom;

import java.util.Vector;

public class WKBAdapter {

  public WKBAdapter() {
  }

  private static final int getGType(byte wkb[]) {
    int type = makeInt(wkb, 1, wkb[0]);
    switch (type) {
      case 1: // '\001'
        return 1;

      case 2: // '\002'
        return 2;

      case 3: // '\003'
        return 3;

      case 4: // '\004'
        return 5;

      case 5: // '\005'
        return 6;

      case 6: // '\006'
        return 7;

      case 7: // '\007'
        return 4;
    }
    return 0;
  }

  public static final Geometry wkbToGeometry(byte wkb[]) {
	  
	
    if (wkb.length < 5)
      return null;
    Geometry geom = null;
    GeometryFactory gF = new GeometryFactory();
    int type = makeInt(wkb, 1, wkb[0]);
    switch (type) {
      case 1: // '\001'
        geom = makePoint(wkb, 0);
        break;

      case 2: // '\002'
        geom = makeLineString(wkb, 0);
        break;

      case 3: // '\003'
        geom = makePolygon(wkb, 0);
        break;

      case 4: // '\004'
        geom = makeMultiPoint(wkb, 0);
        break;

      case 5: // '\005'
        geom = makeMultiLineString(wkb, 0);
        break;

      case 6: // '\006'
        geom = makeMultiPolygon(wkb, 0);
        break;

      default:
        return null;
    }
    return geom;
  }

  private static final Point makePoint(byte wkb[], int off) {
    GeometryFactory gF = new GeometryFactory();
    byte border = wkb[off];
    double x = makeDouble(wkb, off + 5, border);
    double y = makeDouble(wkb, off + 5 + 8, border);
    return gF.createPoint(x, y);
  }

  private static final LineString makeLineString(byte wkb[], int off) {
    GeometryFactory gF = new GeometryFactory();
    byte border = wkb[off];
    int nPoints = makeInt(wkb, off + 5, border);
    double xyArray[] = new double[nPoints * 2];
    int i = 0;
    for (int offset = off + 9; i < nPoints; offset += 8) {
      xyArray[i * 2] = makeDouble(wkb, offset, border);
      offset += 8;
      xyArray[i * 2 + 1] = makeDouble(wkb, offset, border);
      i++;
    }

    return gF.createLineString(xyArray);
  }

  private static final Polygon makePolygon(byte wkb[], int off) {
    GeometryFactory gF = new GeometryFactory();
    byte border = wkb[off];
    int nRings = makeInt(wkb, off + 5, border);
    int offset = off + 1 + 4 + 4;
    LineString extRing = makeLinearRing(wkb, offset, border, gF);
    int lastLen = extRing.getNumPoints() * 2 * 8 + 4;
    LineString intRings[] = new LineString[nRings - 1];
    for (int i = 1; i < nRings; i++) {
      offset += lastLen;
      intRings[i - 1] = makeLinearRing(wkb, offset, border, gF);
      lastLen = intRings[i - 1].getNumPoints() * 2 * 8 + 4;
    }

    Polygon pg = gF.createPolygon(extRing, intRings);
    return pg;
  }

  private static final int makePolygon(byte wkb[], int off, Vector v) {
    Polygon pg = makePolygon(wkb, off);
    v.addElement(pg);
    LineString extRing = pg.getExteriorRing();
    int len = 13 + extRing.getNumPoints() * 2 * 8;
    int numCS = pg.getNumInteriorRings();
    for (int i = 0; i < numCS; i++) {
      LineString intRing = pg.getInteriorRingN(i);
      len += 4 + intRing.getNumPoints() * 2 * 8;
    }

    return len;
  }

  static LineString makeLinearRing(byte wkb[], int off, byte border,
                                   GeometryFactory gFactory) {
    int nPoints = makeInt(wkb, off, border);
    double xyArray[] = new double[nPoints * 2];
    int i = 0;
    for (int offset = off + 4; i < nPoints; offset += 8) {
      xyArray[i * 2] = makeDouble(wkb, offset, border);
      offset += 8;
      xyArray[i * 2 + 1] = makeDouble(wkb, offset, border);
      i++;
    }

    return gFactory.createLineString(xyArray);
  }

  private static final MultiPoint makeMultiPoint(byte wkb[], int off) {
    GeometryFactory gF = new GeometryFactory();
    byte border = wkb[off];
    int nPoints = makeInt(wkb, off + 5, border);
    Point pts[] = new Point[nPoints];
    int lastLen = 21;
    int len = 9;
    int i = 0;
    int offset = off + 5 + 4;
    while (i < nPoints) {
      pts[i] = makePoint(wkb, offset);
      i++;
      offset += lastLen;
      len += lastLen;
    }
    return gF.createMultiPoint(pts);
  }

  private static final MultiLineString makeMultiLineString(byte wkb[], int off) {
    GeometryFactory gF = new GeometryFactory();
    byte border = wkb[off];
    int nLineStrings = makeInt(wkb, off + 5, border);
    LineString ls[] = new LineString[nLineStrings];
    int lastLen = 0;
    int len = 9;
    int i = 0;
    int offset = off + 5 + 4;
    while (i < nLineStrings) {
      ls[i] = makeLineString(wkb, offset);
      lastLen = 9 + ls[i].getNumPoints() * 2 * 8;
      i++;
      offset += lastLen;
      len += lastLen;
    }
    return gF.createMultiLineString(ls);
  }

  private static final MultiPolygon makeMultiPolygon(byte wkb[], int off) {
    GeometryFactory gF = new GeometryFactory();
    byte border = wkb[off];
    int nPolygons = makeInt(wkb, off + 5, border);
    Polygon pg[] = new Polygon[nPolygons];
    int lastLen = 0;
    int len = 9;
    int i = 0;
    for (int offset = off + 5 + 4; i < nPolygons; offset += lastLen) {
      Vector v1 = new Vector(1);
      lastLen = makePolygon(wkb, offset, v1);
      pg[i] = (Polygon) v1.elementAt(0);
      len += lastLen;
      i++;
    }

    return gF.createMultiPolygon(pg);
  }

  public static byte[] geometryToWKB(Geometry g) {
    byte border = 0;
    if (g instanceof Point)
      return dumpPoint( (Point) g, border);
    if (g instanceof LineString)
      return dumpLineString( (LineString) g, border);
    if (g instanceof Polygon)
      return dumpPolygon( (Polygon) g, border);
    if (g instanceof MultiPoint)
      return dumpMultiPoint( (MultiPoint) g, border);
    if (g instanceof MultiLineString)
      return dumpMultiLineString( (MultiLineString) g, border);
    if (g instanceof MultiPolygon)
      return dumpMultiPolygon( (MultiPolygon) g, border);
    else
      return dumpGeometryCollection( (GeometryCollection) g, border);
  }

  static byte[] dumpMultiPoint(MultiPoint p, byte border) {
    int nGeometries = p.getNumGeometries();
    int totalLength = 9;
    Object singleGeometries[] = new Object[nGeometries];
    for (int geomNum = 0; geomNum < nGeometries; geomNum++) {
      singleGeometries[geomNum] = dumpPoint( (Point) p.getGeometryN(geomNum),
                                            border);
      totalLength += ( (byte[]) singleGeometries[geomNum]).length;
    }

    byte returnValue[] = new byte[totalLength];
    returnValue[0] = border;
    dumpInt(4, returnValue, 1, border);
    dumpInt(nGeometries, returnValue, 5, border);
    int geomNum = 0;
    int posInResult = 9;
    for (; geomNum < nGeometries; geomNum++) {
      for (int pos = 0; pos < ( (byte[]) singleGeometries[geomNum]).length; pos++)
        returnValue[posInResult++] = ( (byte[]) singleGeometries[geomNum])[pos];

    }

    return returnValue;
  }

  static byte[] dumpMultiLineString(MultiLineString p, byte border) {
    int nGeometries = p.getNumGeometries();
    int totalLength = 9;
    Object singleGeometries[] = new Object[nGeometries];
    for (int geomNum = 0; geomNum < nGeometries; geomNum++) {
      singleGeometries[geomNum] = dumpLineString( (LineString) p.getGeometryN(
          geomNum), border);
      totalLength += ( (byte[]) singleGeometries[geomNum]).length;
    }

    byte returnValue[] = new byte[totalLength];
    returnValue[0] = border;
    dumpInt(5, returnValue, 1, border);
    dumpInt(nGeometries, returnValue, 5, border);
    int geomNum = 0;
    int posInResult = 9;
    for (; geomNum < nGeometries; geomNum++) {
      for (int pos = 0; pos < ( (byte[]) singleGeometries[geomNum]).length; pos++)
        returnValue[posInResult++] = ( (byte[]) singleGeometries[geomNum])[pos];

    }

    return returnValue;
  }

  static byte[] dumpMultiPolygon(MultiPolygon p, byte border) {
    int nGeometries = p.getNumGeometries();
    int totalLength = 9;
    Object singleGeometries[] = new Object[nGeometries];
    for (int geomNum = 0; geomNum < nGeometries; geomNum++) {
      singleGeometries[geomNum] = dumpPolygon( (Polygon) p.getGeometryN(geomNum),
                                              border);
      totalLength += ( (byte[]) singleGeometries[geomNum]).length;
    }

    byte returnValue[] = new byte[totalLength];
    returnValue[0] = border;
    dumpInt(6, returnValue, 1, border);
    dumpInt(nGeometries, returnValue, 5, border);
    int geomNum = 0;
    int posInResult = 9;
    for (; geomNum < nGeometries; geomNum++) {
      for (int pos = 0; pos < ( (byte[]) singleGeometries[geomNum]).length; pos++)
        returnValue[posInResult++] = ( (byte[]) singleGeometries[geomNum])[pos];

    }

    return returnValue;
  }

  static byte[] dumpGeometryCollection(GeometryCollection p, byte border) {
    int nGeometries = p.getNumGeometries();
    int totalLength = 9;
    Object singleGeometries[] = new Object[nGeometries];
    for (int geomNum = 0; geomNum < nGeometries; geomNum++) {
      singleGeometries[geomNum] = geometryToWKB(p.getGeometryN(geomNum));
      totalLength += ( (byte[]) singleGeometries[geomNum]).length;
    }

    byte returnValue[] = new byte[totalLength];
    returnValue[0] = border;
    dumpInt(7, returnValue, 1, border);
    dumpInt(nGeometries, returnValue, 5, border);
    int geomNum = 0;
    int posInResult = 9;
    for (; geomNum < nGeometries; geomNum++) {
      for (int pos = 0; pos < ( (byte[]) singleGeometries[geomNum]).length; pos++)
        returnValue[posInResult++] = ( (byte[]) singleGeometries[geomNum])[pos];

    }

    return returnValue;
  }

  static byte[] dumpPoint(Point p, byte border) {
    byte s[] = new byte[21];
    s[0] = border;
    dumpInt(1, s, 1, border);
    dumpDouble(p.getX(), s, 5, border);
    dumpDouble(p.getY(), s, 13, border);
    return s;
  }

  static byte[] dumpLineString(LineString ls, byte border) {
    int nPoints = ls.getNumPoints();
    byte s[] = new byte[9 + 16 * nPoints];
    s[0] = border;
    dumpInt(2, s, 1, border);
    dumpInt(nPoints, s, 5, border);
    int nDim = ls.getDimension();
    nDim = 2;
    double coordArray[] = ls.getCoordArray();
    int i = 0;
    for (int offset = 9; i < nPoints; offset += 8) {
      dumpDouble(coordArray[nDim * i], s, offset, border);
      offset += 8;
      dumpDouble(coordArray[nDim * i + 1], s, offset, border);
      i++;
    }

    return s;
  }

  static byte[] dumpPolygon(Polygon pg, byte border) {
    Vector rings = new Vector(1);
    int len = 9;
    byte r[] = null;
    int numPG = pg.getNumInteriorRings() + 1;
    LineString cs[] = pg.getRingArray();
    for (int i = 0; i < numPG; i++) {
      LineString ring = cs[i];
      r = dumpLinearRing(ring, border);
      len += r.length;
      rings.addElement(r);
    }

    byte s[] = new byte[len];
    s[0] = border;
    dumpInt(3, s, 1, border);
    dumpInt(pg.getNumInteriorRings() + 1, s, 5, border);
    int i = 0;
    int offset = 9;
    for (; i < rings.size(); i++) {
      r = (byte[]) rings.elementAt(i);
      System.arraycopy(r, 0, s, offset, r.length);
      offset += r.length;
    }

    return s;
  }

  static byte[] dumpLinearRing(LineString r, byte border) {
    int nPoints = r.getNumPoints();
    byte s[] = new byte[4 + 16 * nPoints];
    dumpInt(nPoints, s, 0, border);
    int nDim = r.getDimension();
    nDim = 2;
    double coordArray[] = r.getCoordArray();
    int i = 0;
    for (int offset = 4; i < nPoints; offset += 8) {
      dumpDouble(coordArray[nDim * i], s, offset, border);
      offset += 8;
      dumpDouble(coordArray[nDim * i + 1], s, offset, border);
      i++;
    }

    return s;
  }

  static int makeInt(byte b[], int off, byte border) {
    if (border == 1)
      swapBytes(b, off, 4);
    return b[off + 0] << 24 & 0xff000000 | b[off + 1] << 16 & 0xff0000 |
        b[off + 2] << 8 & 0xff00 | b[off + 3] & 0xff;
  }

  static void dumpInt(int val, byte b[], int off, byte border) {
    if (border == 0) {
      b[off] = (byte) ( (val & 0xff000000) >> 24);
      b[off + 1] = (byte) ( (val & 0xff0000) >> 16);
      b[off + 2] = (byte) ( (val & 0xff00) >> 8);
      b[off + 3] = (byte) (val & 0xff);
    }
    else {
      b[off] = (byte) (val & 0xff);
      b[off + 1] = (byte) ( (val & 0xff00) >> 8);
      b[off + 2] = (byte) ( (val & 0xff0000) >> 16);
      b[off + 3] = (byte) ( (val & 0xff000000) >> 24);
    }
  }

  static double makeDouble(byte b[], int off, byte border) {
    if (border == 1)
      swapBytes(b, off, 8);
    long tmp = (long) b[off + 0] << 56 & 0xff00000000000000L |
        (long) b[off + 1] << 48 & 0xff000000000000L |
        (long) b[off + 2] << 40 & 0xff0000000000L |
        (long) b[off + 3] << 32 & 0xff00000000L |
        (long) b[off + 4] << 24 & 0xff000000L |
        (long) b[off + 5] << 16 & 0xff0000L | (long) b[off + 6] << 8 & 65280L |
        (long) b[off + 7] & 255L;
    return Double.longBitsToDouble(tmp);
  }

  static void dumpDouble(double val, byte b[], int off, byte border) {
    long tmp = Double.doubleToLongBits(val);
    if (border == 0) {
      b[off + 0] = (byte) (int) ( (tmp & 0xff00000000000000L) >> 56);
      b[off + 1] = (byte) (int) ( (tmp & 0xff000000000000L) >> 48);
      b[off + 2] = (byte) (int) ( (tmp & 0xff0000000000L) >> 40);
      b[off + 3] = (byte) (int) ( (tmp & 0xff00000000L) >> 32);
      b[off + 4] = (byte) (int) ( (tmp & 0xff000000L) >> 24);
      b[off + 5] = (byte) (int) ( (tmp & 0xff0000L) >> 16);
      b[off + 6] = (byte) (int) ( (tmp & 65280L) >> 8);
      b[off + 7] = (byte) (int) (tmp & 255L);
    }
    else {
      b[off + 7] = (byte) (int) ( (tmp & 0xff00000000000000L) >> 56);
      b[off + 6] = (byte) (int) ( (tmp & 0xff000000000000L) >> 48);
      b[off + 5] = (byte) (int) ( (tmp & 0xff0000000000L) >> 40);
      b[off + 4] = (byte) (int) ( (tmp & 0xff00000000L) >> 32);
      b[off + 3] = (byte) (int) ( (tmp & 0xff000000L) >> 24);
      b[off + 2] = (byte) (int) ( (tmp & 0xff0000L) >> 16);
      b[off + 1] = (byte) (int) ( (tmp & 65280L) >> 8);
      b[off + 0] = (byte) (int) (tmp & 255L);
    }
  }

  static void swapBytes(byte buf[], int offset, int len) {
    for (int i = 0; i < len / 2; i++) {
      byte tmp = buf[offset + i];
      buf[offset + i] = buf[ (offset + len) - 1 - i];
      buf[ (offset + len) - 1 - i] = tmp;
    }

  }

  public static final byte wkbPoint = 1;
  public static final byte wkbLineString = 2;
  public static final byte wkbPolygon = 3;
  public static final byte wkbMultiPoint = 4;
  public static final byte wkbMultiLineString = 5;
  public static final byte wkbMultiPolygon = 6;
  public static final byte wkbGeometryCollection = 7;
  public static final byte wkbXDR = 0;
  public static final byte wkbNDR = 1; 
 
}
