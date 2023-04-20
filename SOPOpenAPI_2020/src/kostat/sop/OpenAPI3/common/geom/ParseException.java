/*
* @(#)ParseException.java   1.0 2005/06/18
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

public class ParseException
    extends Exception {

  public ParseException(String message) {
    super(message);
  }

  public ParseException(Exception e) {
    this(e.toString());
  }
}
