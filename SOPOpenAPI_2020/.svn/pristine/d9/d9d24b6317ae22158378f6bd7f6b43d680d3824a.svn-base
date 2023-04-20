/*
* @(#)MultiCurve.java   1.0 2005/06/18
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
public class MultiCurve extends GeometryCollection
{

    public MultiCurve()
    {
    }

    public MultiCurve(Curve curve[])
    {
        if(curve != null)
            super.m_geometries = curve;
        else
            super.m_geometries = new Curve[0];
    }

    public MultiCurve(Geometry geometries[])
    {
        if(geometries != null)
            super.m_geometries = geometries;
        else
            super.m_geometries = new Curve[0];
    }

    public String getGeometryTypeString()
    {
        return new String("MultiCurve");
    }

    public Geometry[] getGeometryArray()
    {
        Geometry geometries[] = new Curve[super.m_geometries.length];
        System.arraycopy(super.m_geometries, 0, geometries, 0, super.m_geometries.length);
        return geometries;
    }

    public boolean isSimple()
    {
        boolean simple = true;
        if(super.m_geometries == null || super.m_geometries.length == 0)
            return true;
        for(int i = 0; i < super.m_geometries.length; i++)
            if(!super.m_geometries[i].isSimple())
                return false;

        return simple;
    }

    public double length()
    {
        double totalLength = 0.0D;
        for(int i = 0; i < super.m_geometries.length; i++)
        {
            Curve curveString = (Curve)super.m_geometries[i];
            totalLength += curveString.length();
        }

        return totalLength;
    }

    public boolean isClosed()
    {
        for(int i = 0; i < super.m_geometries.length; i++)
        {
            Curve curve = (Curve)super.m_geometries[i];
            if(!curve.isClosed())
                return false;
        }

        return true;
    }
}
