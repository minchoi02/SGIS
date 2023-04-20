/*
* @(#)Point.java   1.0 2005/06/18
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


public class Point extends Geometry
{

    public Point()
    {
        m_x = m_y = (0.0D / 0.0D);
    }

    public Point(double x, double y)
    {
        m_x = x;
        m_y = y;
    }

    public Point(CoordPoint point)
    {
        if(point != null)
        {
            m_x = point.getX();
            m_y = point.getY();
        }
    }

    public CoordPoint getLabelPoint()
    {
        return new CoordPoint(m_x, m_y);
    }

    public CoordPoint getCoordPoint()
    {
        return new CoordPoint(m_x, m_y);
    }

    public int getDimension()
    {
        return 0;
    }

    public String getGeometryTypeString()
    {
        return new String("Point");
    }

    public Envelope getEnvelope()
    {
        if(super.m_envelope == null)
            super.m_envelope = new Envelope(m_x, m_y, m_x, m_y);
        return new Envelope(super.m_envelope);
    }

    public boolean isSimple()
    {
        return true;
    }

    public boolean isEmpty()
    {
        return Double.isNaN(m_x) && Double.isNaN(m_y);
    }

    public double getX()
    {
        return m_x;
    }

    public double getY()
    {
        return m_y;
    }

    public String asText()
    {
        return "Point(" + toString() + ")";
    }

    public byte[] asBinary()
    {
        Geometry geom = this;
        return WKBAdapter.geometryToWKB(this);
    }

    protected double m_x;
    protected double m_y;
}
