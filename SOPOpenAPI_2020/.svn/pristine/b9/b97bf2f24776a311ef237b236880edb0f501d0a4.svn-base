/*
* @(#)LineString.java   1.0 2005/06/18
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

public class LineString extends Curve
{

    public LineString(CoordPoint pointArray[])
    {
        super(pointArray);
        int i = super.m_coordArray.length / 2 / 2;
        m_labelPoint = new CoordPoint(super.m_coordArray[2 * i], super.m_coordArray[2 * i + 1]);
    }

    public LineString(double xyArray[])
    {
        super(xyArray);
        int i = xyArray.length / 2 / 2;
        m_labelPoint = new CoordPoint(xyArray[2 * i], xyArray[2 * i + 1]);
    }

    public CoordPoint getLabelPoint()
    {
        return new CoordPoint(m_labelPoint);
    }

    public String getGeometryTypeString()
    {
        return new String("LineString");
    }

    public Envelope getEnvelope()
    {
        if(super.m_envelope == null)
        {
            super.m_envelope = new Envelope();
            for(int i = 0; i < getNumPoints(); i++)
                super.m_envelope.expand(super.m_coordArray[2 * i], super.m_coordArray[2 * i + 1]);

        }
        return new Envelope(super.m_envelope);
    }

    public boolean isSimple()
    {
        CoordPoint line0[] = new CoordPoint[2];
        line0[0] = new CoordPoint();
        line0[1] = new CoordPoint();
        CoordPoint line1[] = new CoordPoint[2];
        line1[0] = new CoordPoint();
        line1[1] = new CoordPoint();
        CoordPoint ip = new CoordPoint();
        int nPoints = super.m_coordArray.length / 2;
        for(int i = 0; i < nPoints - 1; i++)
        {
            line0[0].setX(super.m_coordArray[2 * i]);
            line0[0].setY(super.m_coordArray[2 * i + 1]);
            line0[1].setX(super.m_coordArray[2 * (i + 1)]);
            line0[1].setY(super.m_coordArray[2 * (i + 1) + 1]);
            if(GeometryCompare.pointPoint(line0[0], line0[1]) != 0)
                return false;
        }

        for(int i = 0; i < nPoints - 2; i++)
        {
            line0[0].setX(super.m_coordArray[2 * i]);
            line0[0].setY(super.m_coordArray[2 * i + 1]);
            line0[1].setX(super.m_coordArray[2 * (i + 1)]);
            line0[1].setY(super.m_coordArray[2 * (i + 1) + 1]);
            for(int j = i + 1; j < nPoints - 1; j++)
            {
                line1[0].setX(super.m_coordArray[2 * j]);
                line1[0].setY(super.m_coordArray[2 * j + 1]);
                line1[1].setX(super.m_coordArray[2 * (j + 1)]);
                line1[1].setY(super.m_coordArray[2 * (j + 1) + 1]);
                int relation = GeometryCompare.lineLine(line0, line1, ip);
                if(j == i + 1 || i == 0 && j == nPoints - 2)
                {
                    if(relation == -1)
                        return false;
                } else
                if(relation != 0)
                    return false;
            }

        }

        return true;
    }

    public int getNumPoints()
    {
        return super.m_coordArray.length / 2;
    }

    public CoordPoint getPointN(int i)
    {
        if(m_coordArray != null && i >= 0 && i < m_coordArray.length / 2)
            return new CoordPoint(m_coordArray[2 * i], m_coordArray[2 * i + 1]);
        else
            return null;
    }

    public boolean isValid()
    {
        return super.m_coordArray.length >= 4;
    }

    public double[] getCoordArray()
    {
        return super.m_coordArray;
    }

    protected final boolean crossRing(LineString ring)
    {
        boolean disjoint = true;
        int nPointsThis = getNumPoints();
        int nPointsRing = ring.getNumPoints();
        int nDim = ring.getDimension();
        double coordArray[] = ring.getCoordArray();
        CoordPoint tp = new CoordPoint();
        CoordPoint line0[] = new CoordPoint[2];
        line0[0] = new CoordPoint();
        line0[1] = new CoordPoint();
        CoordPoint line1[] = new CoordPoint[2];
        line1[0] = new CoordPoint();
        line1[1] = new CoordPoint();
        CoordPoint ip = new CoordPoint();
        int relation = 0;
        for(int i = 0; i < nPointsThis - 1; i++)
        {
            line0[0].setX(super.m_coordArray[2 * i]);
            line0[0].setX(super.m_coordArray[2 * i + 1]);
            line0[1].setX(super.m_coordArray[2 * (i + 1)]);
            line0[1].setY(super.m_coordArray[2 * (i + 1) + 1]);
            for(int j = 0; j < nPointsRing - 1; j++)
            {
                line1[0].setX(coordArray[nDim * j]);
                line1[0].setY(coordArray[nDim * j + 1]);
                line1[1].setX(coordArray[nDim * (j + 1)]);
                line1[1].setY(coordArray[nDim * (j + 1) + 1]);
                relation = GeometryCompare.lineLine(line0, line1, ip);
                if(relation == -1)
                    return true;
                if(relation == 1)
                    if(disjoint)
                    {
                        disjoint = false;
                        tp.setX(ip.m_x);
                        tp.setY(ip.m_y);
                    } else
                    if(GeometryCompare.pointPoint(tp, ip) == 0)
                        return true;
            }

        }

        return false;
    }

    protected final double getRingArea()
    {
        double area = 0.0D;
        for(int i = 0; i < super.m_coordArray.length / 2 - 1; i++)
            area += super.m_coordArray[2 * i] * super.m_coordArray[2 * (i + 1) + 1] - super.m_coordArray[2 * (i + 1)] * super.m_coordArray[2 * i + 1];

        return area / 2D;
    }

    protected final double getRingCentroid(CoordPoint cent)
    {
        cent.setX((0.0D / 0.0D));
        cent.setY((0.0D / 0.0D));
        double area = 0.0D;
        double x = 0.0D;
        double y = 0.0D;
        for(int i = 0; i < super.m_coordArray.length / 2 - 1; i++)
        {
            double a = super.m_coordArray[2 * i] * super.m_coordArray[2 * (i + 1) + 1] - super.m_coordArray[2 * (i + 1)] * super.m_coordArray[2 * i + 1];
            x += (super.m_coordArray[2 * i] + super.m_coordArray[2 * (i + 1)]) * a;
            y += (super.m_coordArray[2 * i + 1] + super.m_coordArray[2 * (i + 1) + 1]) * a;
            area += a;
        }

        x /= 3D;
        y /= 3D;
        cent.setX(x / area);
        cent.setY(y / area);
        return area / 2D;
    }

    protected final boolean crossString(LineString string)
    {
        int nPointsThis = getNumPoints();
        int nPointsString = string.getNumPoints();
        int nDim = string.getDimension();
        double coordArray[] = string.getCoordArray();
        CoordPoint start0 = getStartPoint();
        CoordPoint end0 = getEndPoint();
        CoordPoint start1 = string.getStartPoint();
        CoordPoint end1 = string.getEndPoint();
        CoordPoint line0[] = new CoordPoint[2];
        line0[0] = new CoordPoint();
        line0[1] = new CoordPoint();
        CoordPoint line1[] = new CoordPoint[2];
        line1[0] = new CoordPoint();
        line1[1] = new CoordPoint();
        CoordPoint ip = new CoordPoint();
        int relation = 0;
        for(int i = 0; i < nPointsThis - 1; i++)
        {
            line0[0].setX(super.m_coordArray[2 * i]);
            line0[0].setY(super.m_coordArray[2 * i + 1]);
            line0[1].setX(super.m_coordArray[2 * (i + 1)]);
            line0[1].setY(super.m_coordArray[2 * (i + 1) + 1]);
            for(int j = 0; j < nPointsString - 1; j++)
            {
                line1[0].setX(coordArray[nDim * j]);
                line1[0].setY(coordArray[nDim * j + 1]);
                line1[1].setX(coordArray[nDim * (j + 1)]);
                line1[1].setY(coordArray[nDim * (j + 1) + 1]);
                relation = GeometryCompare.lineLine(line0, line1, ip);
                if(relation == -1)
                    return true;
                if(relation == 1)
                {
                    if(GeometryCompare.pointPoint(ip, start0) == 0 && GeometryCompare.pointPoint(ip, end0) == 0)
                        return true;
                    if(GeometryCompare.pointPoint(ip, start1) == 0 && GeometryCompare.pointPoint(ip, end1) == 0)
                        return true;
                }
            }

        }

        return false;
    }

    protected CoordPoint m_labelPoint;
}
