/*
* @(#)GeometryCompare.java   1.0 2005/06/18
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


public class GeometryCompare
{

    public GeometryCompare()
    {
    }

    public static final int pointPoint(CoordPoint a, CoordPoint b)
    {
        return pointCmp(a, b) == 0 ? 1 : 0;
    }

    public static final int pointCmp(CoordPoint a, CoordPoint b)
    {
        int result = cmp(a.m_x, b.m_x);
        if(result != 0)
            return result;
        result = cmp(a.m_y, b.m_y);
        if(result != 0)
            return result;
        else
            return 0;
    }

    public static final int cmp(double a, double b)
    {
        return a > b ? 1 : a < b ? -1 : 0;
    }

    public static final int lineLine(CoordPoint l0[], CoordPoint l1[], CoordPoint ip)
    {
        double Ax = l0[1].m_x - l0[0].m_x;
        double Ay = l0[1].m_y - l0[0].m_y;
        double Bx = l1[0].m_x - l1[1].m_x;
        double By = l1[0].m_y - l1[1].m_y;
        double Cx = l0[0].m_x - l1[0].m_x;
        double Cy = l0[0].m_y - l1[0].m_y;
        double denominator = Ay * Bx - Ax * By;
        if(Math.abs(denominator) <= 2.2204460492503131E-016D)
        {
            int o0 = pointCmp(l0[0], l0[1]) == 1 ? 1 : 0;
            int o1 = pointCmp(l1[0], l1[1]) == 1 ? 1 : 0;
            if(pointCmp(l0[o0], l1[o1]) > 0)
            {
                if(pointLine(l0[o0], l1) == 0)
                    return 0;
            } else
            if(pointLine(l1[o1], l0) == 0)
                return 0;
            int r0 = pointCmp(l0[o0], l1[1 - o1]);
            int r1 = pointCmp(l0[1 - o0], l1[o1]);
            if(r0 == 1 && r1 == 1 && r0 == r1)
                return 0;
            if(r0 == 0)
            {
                ip.setX(l0[o0].m_x);
                ip.setY(l0[o0].m_y);
                return 1;
            }
            if(r1 == 0)
            {
                ip.setX(l1[o1].m_x);
                ip.setY(l1[o1].m_y);
                return 1;
            } else
            {
                return -1;
            }
        }
        double numerator_a = By * Cx - Bx * Cy;
        double numerator_b = Ax * Cy - Ay * Cx;
        double alpha = numerator_a / denominator;
        double beta = numerator_b / denominator;
        if(alpha < 0.0D)
            if(pointLine(l0[0], l1) != 0)
            {
                ip.setX(l0[0].m_x);
                ip.setY(l0[0].m_y);
                return 1;
            } else
            {
                return 0;
            }
        if(alpha > 1.0D)
            if(pointLine(l0[1], l1) != 0)
            {
                ip.setX(l0[1].m_x);
                ip.setY(l0[1].m_y);
                return 1;
            } else
            {
                return 0;
            }
        if(beta < 0.0D)
            if(pointLine(l1[0], l0) != 0)
            {
                ip.setX(l1[0].m_x);
                ip.setY(l1[0].m_y);
                return 1;
            } else
            {
                return 0;
            }
        if(beta > 1.0D)
        {
            if(pointLine(l1[1], l0) != 0)
            {
                ip.setX(l1[1].m_x);
                ip.setY(l1[1].m_y);
                return 1;
            } else
            {
                return 0;
            }
        } else
        {
            ip.m_x = l0[0].m_x + alpha * Ax;
            ip.m_y = l0[0].m_y + alpha * Ay;
            return 1;
        }
    }

    public static final int pointLine(CoordPoint p, CoordPoint l[])
    {
        if(p.m_x > Math.max(l[0].m_x, l[1].m_x) || p.m_x < Math.min(l[0].m_x, l[1].m_x) || p.m_y > Math.max(l[0].m_y, l[1].m_y) || p.m_y < Math.min(l[0].m_y, l[1].m_y))
            return 0;
        if(pointCmp(p, l[0]) == 0 || pointCmp(p, l[1]) == 0)
        {
            return -1;
        } else
        {
            double md = Math.abs(l[0].m_x - l[1].m_x) + Math.abs(l[0].m_y - l[1].m_y);
            return Math.abs(area2(l[0], l[1], p)) / md > 0.0D ? 0 : 1;
        }
    }

    public static final double area2(CoordPoint a, CoordPoint b, CoordPoint c)
    {
        return ((((a.m_x * b.m_y - a.m_y * b.m_x) + b.m_x * c.m_y) - b.m_y * c.m_x) + c.m_x * a.m_y) - c.m_y * a.m_x;
    }

    public static final int pointRing(CoordPoint p, LineString r)
    {
        int nDim = r.getDimension();
        CoordPoint line[] = new CoordPoint[2];
        line[0] = new CoordPoint();
        line[1] = new CoordPoint();
        CoordPoint arc[] = new CoordPoint[3];
        arc[0] = new CoordPoint();
        arc[1] = new CoordPoint();
        arc[2] = new CoordPoint();
        Envelope envelope = r.getEnvelope();
        if(pointMBR(p, envelope) == 0)
            return 0;
        CoordPoint pt = new CoordPoint(envelope.getMaxX(), p.m_y);
        CoordPoint l0[] = new CoordPoint[2];
        l0[0] = p;
        l0[1] = pt;
        CoordPoint int_pt = new CoordPoint();
        CoordPoint ip[] = new CoordPoint[2];
        ip[0] = new CoordPoint();
        ip[1] = new CoordPoint();
        CoordPoint mbr[] = new CoordPoint[2];
        mbr[0] = new CoordPoint();
        mbr[1] = new CoordPoint();
        int count = 0;
        LineString lineString = r;
        double coordArray[] = lineString.getCoordArray();
        for(int i = 0; i < coordArray.length / nDim - 1; i++)
        {
            line[0].setX(coordArray[nDim * i]);
            line[0].setY(coordArray[nDim * i + 1]);
            line[1].setX(coordArray[nDim * (i + 1)]);
            line[1].setY(coordArray[nDim * (i + 1) + 1]);
            if(pointLine(l0[0], line) != 0)
                return -1;
            if(line[0].m_y > l0[0].m_y && line[1].m_y <= l0[0].m_y)
            {
                if(line[1].m_y == l0[0].m_y)
                    count++;
                else
                if(lineLine(l0, line, int_pt) == 1)
                    count++;
            } else
            if(line[0].m_y <= l0[0].m_y && line[1].m_y > l0[0].m_y)
                if(line[0].m_y == l0[0].m_y)
                    count++;
                else
                if(lineLine(l0, line, int_pt) == 1)
                    count++;
        }

        return count & 1;
    }

    public static final int pointMBR(CoordPoint p, Envelope env)
    {
        return p.m_x > env.getMaxX() || p.m_y > env.getMaxY() || p.m_x < env.getMinX() || p.m_y < env.getMinY() ? 0 : 1;
    }
}
