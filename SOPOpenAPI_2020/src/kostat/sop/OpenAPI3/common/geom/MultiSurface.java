/*
* @(#)MultiSurface.java   1.0 2005/06/18
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

public class MultiSurface extends GeometryCollection
{

    public MultiSurface()
    {
    }

    public MultiSurface(Surface surface[])
    {
        if(surface != null)
            super.m_geometries = surface;
        else
            super.m_geometries = new Surface[0];
    }

    public MultiSurface(Geometry geometries[])
    {
        if(geometries != null)
            super.m_geometries = geometries;
        else
            super.m_geometries = new Surface[0];
    }

    public String getGeometryTypeString()
    {
        return new String("MultiSurface");
    }

    public Geometry[] getGeometryArray()
    {
        Geometry geometries[] = new Surface[super.m_geometries.length];
        System.arraycopy(super.m_geometries, 0, geometries, 0, super.m_geometries.length);
        return geometries;
    }

    public boolean isSimple()
    {
        return isValid();
    }

    public boolean isValid()
    {
        if(getDimension() < 2)
            return false;
        return super.m_geometries != null && super.m_geometries.length != 0 ? true : true;
    }

    public double getArea()
    {
        double totalArea = 0.0D;
        for(int i = 0; i < super.m_geometries.length; i++)
        {
            Surface surface = (Surface)super.m_geometries[i];
            totalArea += surface.getArea();
        }

        return totalArea;
    }

    public CoordPoint getCentroid()
        throws ClassNotFoundException
    {
        double sumArea = 0.0D;
        double sumX = 0.0D;
        double sumY = 0.0D;
        CoordPoint pt = new CoordPoint();
        double totalArea = 0.0D;
        for(int i = 0; i < super.m_geometries.length; i++)
        {
            Surface curvePolygon = (Surface)super.m_geometries[i];
            double area = curvePolygon.getCentroid(pt);
            sumX += pt.m_x * area;
            sumY += pt.m_y * area;
            sumArea += area;
        }

        pt.setX(sumX / sumArea);
        pt.setY(sumY / sumArea);
        return pt;
    }
}
