/*
* @(#)CoordPoint.java   1.0 2010/09/10
*
* Copyright 2010 by DSGNI. All rights reserved.
* http://www.dsgni.com
*
* This software is the confidential and proprietary information of 나일한.
* You shall not disclose such Confidential Information and
* shall use it only in accordance with the terms of the license agreement
* you entered into 나일한.
*/
package kostat.sop.OpenAPI3.common.geom;

public class CoordPoint {
	
  public double m_x;
  public double m_y;

  public CoordPoint() {
    m_x = m_y = (0.0D / 0.0D);
  }

  /**
   * Geometry Coord Point
   *
   *@param x 지리좌표 경도
   *@param y 지리좌표 위도
   *@return
   *@exception
   *
   */
  public CoordPoint(double x, double y) {
    m_x = x;
    m_y = y;
  }

  public CoordPoint(CoordPoint point) {
    if (point != null) {
      m_x = point.getX();
      m_y = point.getY();
    }
  }

  public final double getX() {
    return m_x;
  }

  public final double getY() {
    return m_y;
  }

  public void setX(double x) {
    m_x = x;
  }

  public void setY(double y) {
    m_y = y;
  }

  public void setXY(double x, double y) {
    m_x = x;
    m_y = y;
  }
}
