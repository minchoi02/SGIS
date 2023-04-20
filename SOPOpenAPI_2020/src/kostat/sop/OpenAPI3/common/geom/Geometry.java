/*
* @(#)Geometry.java   1.0 2005/06/18
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

public abstract class Geometry {

  protected Envelope m_envelope;

  public Geometry() {
    m_envelope = null;
  }

  protected Geometry(Envelope envelope) {
    m_envelope = envelope;
  }

  public CoordPoint getLabelPoint() {
    return null;
  }

  public String getGeometryTypeString() {
    return new String("Geometry");
  }

  public Envelope getEnvelope() {
    return new Envelope(m_envelope);
  }

  public boolean isEmpty() {
    return false;
  }

  public boolean isSimple() {
    return true;
  }

  public String toString() {
    return "Geometry ";
  }

  public String asText() {
    return WKTAdapter.geometryToWKT(this);
  }

  public byte[] asBinary() {
    return WKBAdapter.geometryToWKB(this);
  }

  public int getDimension() {
    return 1;
  }
}
