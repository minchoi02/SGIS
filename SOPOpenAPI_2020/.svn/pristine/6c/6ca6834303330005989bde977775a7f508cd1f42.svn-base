/*
* @(#)MultiPolygon.java   1.0 2005/06/18
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


public class MultiPolygon extends GeometryCollection
{

    public MultiPolygon()
    {
    }

    public MultiPolygon(Polygon polygons[])
    {
        if(polygons != null)
            super.m_geometries = polygons;
        else
            super.m_geometries = new Polygon[0];
    }

    public MultiPolygon(Geometry geometries[])
    {
        if(geometries != null)
            super.m_geometries = geometries;
        else
            super.m_geometries = new Polygon[0];
    }

    public String getGeometryTypeString()
    {
        return new String("MultiPolygon");
    }

    public Geometry[] getGeometryArray()
    {
        Geometry geometries[] = new Polygon[super.m_geometries.length];
        System.arraycopy(super.m_geometries, 0, geometries, 0, super.m_geometries.length);
        return geometries;
    }
}
