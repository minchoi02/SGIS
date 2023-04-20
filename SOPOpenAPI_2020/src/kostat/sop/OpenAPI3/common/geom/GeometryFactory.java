/*
* @(#)GeometryFactory.java   1.0 2005/06/18
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

public class GeometryFactory {

  public GeometryFactory() {
  }

  public Point createPoint(CoordPoint point) {
    return new Point(point);
  }

  public Point createPoint(double x, double y) {
    return new Point(x, y);
  }

  public Point createPoint(double ordArray[]) {
    return new Point(ordArray[0], ordArray[1]);
  }

  public LineString createLineString(CoordPoint pointArray[]) {
    return new LineString(pointArray);
  }

  public LineString createLineString(double xyArray[]) {
    return new LineString(xyArray);
  }

  public Polygon createPolygon(LineString exteriorRing,
                               LineString interiorRings[]) {
    return new Polygon(exteriorRing, interiorRings);
  }

  public Polygon createPolygon(LineString rings[]) {
    return new Polygon(rings);
  }

  public GeometryCollection createGeometryCollection(Geometry geometries[]) throws
      ClassNotFoundException {
    Class collType = geometries.getClass();
    if (collType == Class.forName("gisdbmm.geom.Point"))
      return new MultiPoint( (Point[]) geometries);
    if (collType == Class.forName("gisdbmm.geom.LineString;"))
      return new MultiLineString( (LineString[]) geometries);
    if (collType == Class.forName("gisdbmm.geom.Polygon;"))
      return new MultiPolygon( (Polygon[]) geometries);
    else
      return new GeometryCollection(geometries);
  }

  public MultiPoint createMultiPoint(Geometry geometries[]) {
    return new MultiPoint( (Point[]) geometries);
  }

  public MultiPoint createMultiPoint(Point pts[]) {
    return new MultiPoint(pts);
  }

  public MultiLineString createMultiLineString(LineString ls[]) {
    return new MultiLineString(ls);
  }

  public MultiPolygon createMultiPolygon(Polygon pg[]) {
    return new MultiPolygon(pg);
  }
}
