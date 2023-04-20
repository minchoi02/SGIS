/*
* @(#)MultiPoint.java   1.0 2005/06/18
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

public class MultiPoint extends GeometryCollection
{

    public MultiPoint()
    {
    }

    public MultiPoint(Point points[])
    {
        if(points != null)
            super.m_geometries = points;
        else
            super.m_geometries = new Point[0];
    }

    public MultiPoint(Geometry geometries[])
    {
        if(geometries != null)
            super.m_geometries = geometries;
        else
            super.m_geometries = new Point[0];
    }

    public Geometry[] getGeometryArray()
    {
        Geometry geometries[] = new Point[super.m_geometries.length];
        System.arraycopy(super.m_geometries, 0, geometries, 0, super.m_geometries.length);
        return geometries;
    }

    public String getGeometryTypeString()
    {
        return new String("MultiPoint");
    }

    public boolean isSimple()
    {
        if(super.m_geometries == null || super.m_geometries.length == 0)
            return true;
        for(int i = 0; i < super.m_geometries.length - 1; i++)
        {
            for(int j = i + 1; j < super.m_geometries.length; j++)
            {
                Point p1 = (Point)super.m_geometries[i];
                Point p2 = (Point)super.m_geometries[j];
                if(p1.getX() == p2.getX() && p1.getY() == p2.getY())
                    return false;
            }

        }

        return true;
    }
}
