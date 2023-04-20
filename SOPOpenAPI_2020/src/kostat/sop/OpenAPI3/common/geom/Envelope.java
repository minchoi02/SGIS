/*
* @(#)Envelope.java   1.0 2005/06/18
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

public class Envelope {
  private double m_minX;
  private double m_minY;
  private double m_maxX;
  private double m_maxY;

  public Envelope() {
    m_minX = m_minY = (1.0D / 0.0D);
    m_maxX = m_maxY = ( -1.0D / 0.0D);
  }

  public Envelope(CoordPoint point) {
    m_minX = m_maxX = point.getX();
    m_minY = m_maxY = point.getY();
  }

  public Envelope(CoordPoint min, CoordPoint max) {
    this(min.getX(), min.getY(), max.getX(), max.getY());
  }

  public Envelope(double xMin, double yMin, double xMax, double yMax) {
    m_minX = xMin < xMax ? xMin : xMax;
    m_minY = yMin < yMax ? yMin : yMax;
    m_maxX = xMin < xMax ? xMax : xMin;
    m_maxY = yMin < yMax ? yMax : yMin;
  }

  public Envelope(Envelope envelope) {
    m_minX = envelope.getMinX();
    m_minY = envelope.getMinY();
    m_maxX = envelope.getMaxX();
    m_maxY = envelope.getMaxY();
  }

  public final double getMinX() {
    return m_minX;
  }

  public final double getMinY() {
    return m_minY;
  }

  public final double getMaxX() {
    return m_maxX;
  }

  public final double getMaxY() {
    return m_maxY;
  }

  public final CoordPoint getLowerLeft() {
    return new CoordPoint(m_minX, m_minY);
  }

  public final void getLowerLeft(CoordPoint point) {
    point.setX(m_maxX);
    point.setY(m_maxY);
  }

  public final CoordPoint getUpperRight() {
    return new CoordPoint(m_maxX, m_maxY);
  }

  public final void getUpperRight(CoordPoint point) {
    point.setX(m_maxX);
    point.setY(m_maxY);
  }

  public final boolean isEmpty() {
    return m_minX > m_maxX || m_minY > m_maxY;
  }

  public final double getWidth() {
    return m_maxX - m_minX;
  }

  public final double getHeight() {
    return m_maxY - m_minY;
  }

  public CoordPoint getCenter() {
    double x = (m_maxX - m_minX) / 2D + m_minX;
    double y = (m_maxY - m_minY) / 2D + m_minY;
    return new CoordPoint(x, y);
  }

  public final boolean contains(double x, double y) {
    return x >= m_minX && x <= m_maxX && y >= m_minY && y <= m_maxY;
  }

  public final boolean contains(Envelope envelope) {
    return m_minX <= envelope.getMinX() && m_maxX >= envelope.getMaxX() &&
        m_minY <= envelope.getMinY() && m_maxY >= envelope.getMaxY();
  }

  public final boolean overlaps(Envelope envelope) {
    return m_minX <= envelope.getMaxX() && envelope.getMinX() <= m_maxX &&
        m_minY <= envelope.getMaxY() && envelope.getMinY() <= m_maxY;
  }

  public final Envelope expand(CoordPoint point) {
    if (point == null) {
      return this;
    }
    else {
      double x = point.getX();
      double y = point.getY();
      m_minX = x < m_minX ? x : m_minX;
      m_minY = y < m_minY ? y : m_minY;
      m_maxX = x > m_maxX ? x : m_maxX;
      m_maxY = y > m_maxY ? y : m_maxY;
      return this;
    }
  }

  public final Envelope expand(double x, double y) {
    m_minX = x < m_minX ? x : m_minX;
    m_minY = y < m_minY ? y : m_minY;
    m_maxX = x > m_maxX ? x : m_maxX;
    m_maxY = y > m_maxY ? y : m_maxY;
    return this;
  }

  public final Envelope expand(Envelope envelope) {
    if (envelope == null) {
      return this;
    }
    else {
      double minX = envelope.getMinX();
      double minY = envelope.getMinY();
      double maxX = envelope.getMaxX();
      double maxY = envelope.getMaxY();
      m_minX = minX < m_minX ? minX : m_minX;
      m_minY = minY < m_minY ? minY : m_minY;
      m_maxX = maxX > m_maxX ? maxX : m_maxX;
      m_maxY = maxY > m_maxY ? maxY : m_maxY;
      return this;
    }
  }
}
