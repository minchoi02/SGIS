/*
* @(#)GeometryCollection.java   1.0 2005/06/18
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

public class GeometryCollection
    extends Geometry {
  protected Geometry m_geometries[];
  protected CoordPoint m_labelPoint;

  public GeometryCollection() {
    m_geometries = new Geometry[0];
    m_labelPoint = null;
  }

  public GeometryCollection(Geometry geometries[]) {
    if (geometries != null)
      m_geometries = geometries;
    else
      m_geometries = new Geometry[0];
    m_labelPoint = null;
  }

  public Geometry[] getGeometryArray() {
    Geometry geometries[] = new Geometry[m_geometries.length];
    System.arraycopy(m_geometries, 0, geometries, 0, m_geometries.length);
    return geometries;
  }

  public CoordPoint getLabelPoint() {
    if (m_labelPoint == null)
      computeLabelPoint();
    return new CoordPoint(m_labelPoint);
  }

  public int getDimension() {
    if (m_geometries == null || m_geometries.length == 0)
      return 2;
    else
      return m_geometries[0].getDimension();
  }

  public String getGeometryTypeString() {
    return new String("GeometryCollection");
  }

  public Envelope getEnvelope() {
    if (super.m_envelope == null) {
      super.m_envelope = new Envelope();
      for (int i = 0; i < m_geometries.length; i++)
        super.m_envelope.expand(m_geometries[i].getEnvelope());

    }
    return new Envelope(super.m_envelope);
  }

  public boolean isEmpty() {
    if (m_geometries == null || m_geometries.length == 0)
      return true;
    for (int i = 0; i < m_geometries.length; i++)
      if (!m_geometries[i].isEmpty())
        return false;

    return true;
  }

  public boolean isSimple() {
    if (m_geometries == null || m_geometries.length == 0)
      return true;
    for (int i = 0; i < m_geometries.length; i++)
      if (!m_geometries[i].isSimple())
        return false;

    for (int i = 0; i < m_geometries.length - 1; i++) {
      for (int j = i + 1; j < m_geometries.length; j++)
        if ( (m_geometries[i] instanceof Point) &&
            (m_geometries[j] instanceof Point)) {
          Point p1 = (Point) m_geometries[i];
          Point p2 = (Point) m_geometries[j];
          if (p1.getX() == p2.getX() && p1.getY() == p2.getY())
            return false;
        }
        else
        if ( (m_geometries[i] instanceof LineString) &&
            (m_geometries[j] instanceof LineString)) {
          LineString cs1 = (LineString) m_geometries[i];
          LineString cs2 = (LineString) m_geometries[j];
          if (cs1.crossString(cs2))
            return false;
        }

    }

    return isValid();
  }

  protected boolean isValid() {
    boolean valid = true;
    if (getDimension() < 2)
      return false;
    if (m_geometries == null || m_geometries.length == 0)
      return true;
    else
      return valid;
  }

  public int getNumGeometries() {
    if (m_geometries != null)
      return m_geometries.length;
    else
      return 0;
  }

  public Geometry getGeometryN(int i) {
    if (i >= 0 && i < m_geometries.length)
      return m_geometries[i];
    else
      return null;
  }

  private final void computeLabelPoint() {
    if (m_geometries == null || m_geometries.length == 0) {
      return;
    }
    else {
      Envelope env = getEnvelope();
      double labelX = (env.getMinX() + env.getMaxX()) / 2D;
      double labelY = (env.getMinY() + env.getMaxY()) / 2D;
      m_labelPoint = new CoordPoint(labelX, labelY);
      return;
    }
  }
}
