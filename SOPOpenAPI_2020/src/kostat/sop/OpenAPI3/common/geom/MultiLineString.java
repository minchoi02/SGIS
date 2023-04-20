/*
* @(#)MultiLineString.java   1.0 2005/06/18
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



public class MultiLineString extends GeometryCollection
{

    public MultiLineString()
    {
    }

    public MultiLineString(LineString curveStrings[])
    {
        if(curveStrings != null)
            super.m_geometries = curveStrings;
        else
            super.m_geometries = new LineString[0];
    }

    public MultiLineString(Geometry geometries[])
    {
        if(geometries != null)
            super.m_geometries = geometries;
        else
            super.m_geometries = new LineString[0];
    }

    public String getGeometryTypeString()
    {
        return new String("MultiLineString");
    }

    public Geometry[] getGeometryArray()
    {
        Geometry geometries[] = new LineString[super.m_geometries.length];
        System.arraycopy(super.m_geometries, 0, geometries, 0, super.m_geometries.length);
        return geometries;
    }

    public boolean isSimple()
    {
        if(super.m_geometries == null || super.m_geometries.length == 0)
            return true;
        for(int i = 0; i < super.m_geometries.length; i++)
            if(!super.m_geometries[i].isSimple())
                return false;

        for(int i = 0; i < super.m_geometries.length - 1; i++)
        {
            for(int j = i + 1; j < super.m_geometries.length; j++)
            {
                LineString cs1 = (LineString)super.m_geometries[i];
                LineString cs2 = (LineString)super.m_geometries[j];
                if(cs1.crossString(cs2))
                    return false;
            }

        }

        return true;
    }

    public boolean isClosed()
    {
        for(int i = 0; i < super.m_geometries.length; i++)
        {
            LineString lineString = (LineString)super.m_geometries[i];
            if(!lineString.isClosed())
                return false;
        }

        return true;
    }

    public double length()
    {
        double totalLength = 0.0D;
        for(int i = 0; i < super.m_geometries.length; i++)
        {
            LineString curveString = (LineString)super.m_geometries[i];
            totalLength += curveString.length();
        }

        return totalLength;
    }
}
