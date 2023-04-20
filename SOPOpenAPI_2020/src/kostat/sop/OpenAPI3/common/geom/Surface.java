/*
* @(#)Surface.java   1.0 2005/06/18
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

public class Surface extends Curve
{

    protected Surface()
    {
        m_rings = new LineString[0];
        m_sorted = false;
        m_labelPoint = null;
    }

    public Surface(LineString exteriorRing, LineString interiorRings[])
    {
        m_sorted = true;
        int nRings = interiorRings != null ? 1 + interiorRings.length : 1;
        m_rings = new LineString[nRings];
        m_rings[0] = exteriorRing;
        int nDim = m_rings[0].getDimension();
        if(interiorRings != null)
        {
            for(int i = 0; i < interiorRings.length; i++)
                m_rings[i + 1] = interiorRings[i];

        }
        m_labelPoint = null;
    }

    public Surface(LineString rings[])
    {
        m_sorted = false;
        if(rings != null)
            m_rings = rings;
        else
            m_rings = new LineString[0];
        m_labelPoint = null;
    }

    public CoordPoint getLabelPoint()
    {
        if(m_labelPoint == null)
            computeLabelPoint();
        return new CoordPoint(m_labelPoint);
    }

    public String getGeometryTypeString()
    {
        return new String("Surface");
    }

    public int getDimension()
    {
        return 2;
    }

    public Envelope getEnvelope()
    {
        if(super.m_envelope == null)
            if(m_sorted)
            {
                super.m_envelope = m_rings[0].getEnvelope();
            } else
            {
                super.m_envelope = new Envelope();
                for(int i = 0; i < m_rings.length; i++)
                    super.m_envelope.expand(m_rings[i].getEnvelope());

            }
        return new Envelope(super.m_envelope);
    }

    public boolean isEmpty()
    {
        if(m_rings == null || m_rings.length == 0)
            return true;
        for(int i = 0; i < m_rings.length; i++)
            if(!m_rings[i].isEmpty())
                return false;

        return true;
    }

    public boolean isSimple()
    {
        if(getDimension() < 2)
            return false;
        if(m_rings == null || m_rings.length == 0)
            return true;
        for(int i = 0; i < m_rings.length; i++)
            if(!m_rings[i].isValid() || !m_rings[i].isClosed() || !m_rings[i].isSimple())
                return false;

        if(m_rings.length == 1)
            return true;
        Envelope extEnvelope = m_rings[0].getEnvelope();
        int prResult = 0;
        CoordPoint p = new CoordPoint();
        for(int i = 1; i < m_rings.length; i++)
        {
            Envelope intEnvelope = m_rings[i].getEnvelope();
            int nPoints = m_rings[i].m_coordArray.length / 2;
            if(extEnvelope.contains(intEnvelope))
            {
                int j = 0;
                do
                {
                    p = m_rings[i].getPointN(j++);
                    prResult = GeometryCompare.pointRing(p, m_rings[0]);
                } while(prResult == -1 && j < nPoints);
                if(prResult == 0)
                    return false;
            } else
            {
                return false;
            }
        }

        for(int i = 0; i < m_rings.length - 1; i++)
        {
            for(int j = i + 1; j < m_rings.length; j++)
                if(m_rings[i].crossRing(m_rings[j]))
                    return false;

        }

        return true;
    }

    public double getArea()
    {
        if(m_rings == null || m_rings.length == 0)
            return 0.0D;
        double area = 0.0D;
        area = Math.abs(m_rings[0].getRingArea());
        for(int i = 1; i < m_rings.length; i++)
            area -= Math.abs(m_rings[i].getRingArea());

        return area;
    }

    public CoordPoint centroid()
        throws ClassNotFoundException
    {
        CoordPoint pt = new CoordPoint();
        double area = getCentroid(pt);
        return pt;
    }

    public double getCentroid(CoordPoint cent)
        throws ClassNotFoundException
    {
        cent.setX((0.0D / 0.0D));
        cent.setY((0.0D / 0.0D));
        double area = 0.0D;
        double sumArea = 0.0D;
        double sumX = 0.0D;
        double sumY = 0.0D;
        CoordPoint pt = new CoordPoint();
        double totalArea = 0.0D;
        if(m_rings[0].getGeometryTypeString().equalsIgnoreCase("LINESTRING"))
            area = m_rings[0].getRingCentroid(pt);
        else
        if(m_rings[0].getGeometryTypeString().equalsIgnoreCase("CURVESTRING"))
            area = m_rings[0].getRingCentroid(pt);
        else
            area = 0.0D;
        sumX += pt.m_x * area;
        sumY += pt.m_y * area;
        sumArea += area;
        for(int i = 1; i < m_rings.length; i++)
        {
            if(m_rings[i].getGeometryTypeString().equalsIgnoreCase("LINESTRING"))
                area = -m_rings[i].getRingCentroid(pt);
            else
            if(m_rings[i].getGeometryTypeString().equalsIgnoreCase("CURVESTRING"))
                area = -m_rings[i].getRingCentroid(pt);
            else
                area = 0.0D;
            sumX += pt.m_x * area;
            sumY += pt.m_y * area;
            sumArea += area;
        }

        cent.setX(sumX / sumArea);
        cent.setY(sumY / sumArea);
        return sumArea;
    }

    private final void computeLabelPoint()
    {
        if(m_rings == null || m_rings.length == 0)
        {
            return;
        } else
        {
            Envelope env = m_rings[0].getEnvelope();
            double labelX = (env.getMinX() + env.getMaxX()) / 2D;
            double labelY = (env.getMinY() + env.getMaxY()) / 2D;
            m_labelPoint = new CoordPoint(labelX, labelY);
            return;
        }
    }

    protected LineString m_rings[];
    protected boolean m_sorted;
    protected CoordPoint m_labelPoint;
}
