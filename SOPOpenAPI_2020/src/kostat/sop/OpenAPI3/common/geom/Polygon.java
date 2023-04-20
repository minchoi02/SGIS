/*
* @(#)Polygon.java   1.0 2005/06/18
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


public class Polygon extends Surface
{

    public Polygon()
    {
        super.m_rings = new LineString[0];
        super.m_labelPoint = null;
    }

    public Polygon(LineString exteriorRing, LineString interiorRings[])
    {
        int nRings = interiorRings != null ? 1 + interiorRings.length : 1;
        super.m_rings = new LineString[nRings];
        super.m_rings[0] = exteriorRing;
        int nDim = super.m_rings[0].getDimension();
        if(interiorRings != null)
        {
            for(int i = 0; i < interiorRings.length; i++)
                super.m_rings[i + 1] = interiorRings[i];

        }
        super.m_labelPoint = null;
    }

    public Polygon(LineString rings[])
    {
        if(rings != null)
        {
            super.m_rings = rings;
            int nDim = 0;
            for(int i = 0; i < super.m_rings.length; i++)
                if(i == 0)
                    nDim = super.m_rings[i].getDimension();

        } else
        {
            super.m_rings = new LineString[0];
        }
        super.m_labelPoint = null;
    }

    public String getGeometryTypeString()
    {
        return new String("Polygon");
    }

    public LineString getExteriorRing()
    {
        return m_rings.length > 0 ? m_rings[0] : null;
    }

    public int getNumInteriorRings()
    {
        return m_rings.length > 1 ? m_rings.length - 1 : 0;
    }

    public LineString getInteriorRingN(int n)
    {
        if(n >= 0 && n < m_rings.length)
            return m_rings[n + 1];
        else
            return null;
    }

    public LineString[] getRingArray()
    {
        return super.m_rings;
    }
}
