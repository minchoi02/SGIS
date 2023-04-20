/*
* @(#)Curve.java   1.0 2005/06/18
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

public class Curve
    extends Geometry {
  protected double m_coordArray[];

  protected Curve() {
    m_coordArray = null;
  }

  protected Curve(CoordPoint pointArray[]) {
    if (pointArray != null) {
      int i = pointArray.length;
      m_coordArray = new double[2 * pointArray.length];
      for (i = 0; i < pointArray.length; i++) {
        m_coordArray[2 * i] = pointArray[i].m_x;
        m_coordArray[2 * i + 1] = pointArray[i].m_y;
      }

    }
  }

  protected Curve(double xyArray[]) {
    m_coordArray = xyArray;
  }

  public int getDimension() {
    return 1;
  }

  public Envelope getEnvelope() {
    if (super.m_envelope == null) {
      super.m_envelope = new Envelope();
      int nPoints = m_coordArray.length / 2;
      for (int i = 0; i < nPoints - 1; i++)
        super.m_envelope.expand(m_coordArray[2 * i], m_coordArray[2 * i + 1]);

    }
    return new Envelope(super.m_envelope);
  }

  public boolean isEmpty() {
    return m_coordArray == null || m_coordArray.length == 0;
  }

  public CoordPoint getStartPoint() {
    if (m_coordArray != null)
      return new CoordPoint(m_coordArray[0], m_coordArray[1]);
    else
      return null;
  }

  public CoordPoint getEndPoint() {
    if (m_coordArray != null) {
      int lastIndex = m_coordArray.length / 2 - 1;
      return new CoordPoint(m_coordArray[2 * lastIndex],
                            m_coordArray[2 * lastIndex + 1]);
    }
    else {
      return null;
    }
  }

  public boolean isClosed() {
    if (m_coordArray != null && m_coordArray.length >= 2) {
      int lastIndex = m_coordArray.length / 2 - 1;
      return m_coordArray[0] == m_coordArray[2 * lastIndex] &&
          m_coordArray[1] == m_coordArray[2 * lastIndex + 1];
    }
    else {
      return false;
    }
  }

  public boolean isRing() {
    return isClosed() && isSimple();
  }

  public double length() {
    double length = 0.0D;
    for (int i = 0; i < m_coordArray.length / 2 - 1; i++)
      length +=
          distance(m_coordArray[2 * i], m_coordArray[2 * i + 1],
                   m_coordArray[2 * (i + 1)], m_coordArray[2 * (i + 1) + 1]);

    return length;
  }

  protected double distance(double x0, double y0, double x1, double y1) {
    return Math.sqrt( (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
  }
}
