import com.gpki.gpkiapi.util.Ldap;

/*
 * Created on 2006. 5. 31.
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */

/**
 * @author tomato
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class Util {

	private int nErrCnt = 0;
	
	public int getErrCnt() {
		return nErrCnt;
	}
	
	public void ldap() {
		
		byte[] dataBuff = null;
		String strBuff = "";
		
		try {
			System.out.println("1. LDAP");
			
			Ldap ldap = new Ldap();
		
			// TimeOut ������ ���� ȯ������ ��ġ ����
			ldap.setConfFile("./Sample/gpkiapi.conf");
			
			ldap.setLdap("cen.dir.go.kr", 389);
			
			System.out.println(" 1.1. Get data by type");
			
			try {
				dataBuff = ldap.getData(Ldap.DATA_TYPE_KM_CERT, "cn=999�帲�׽�Ʈ001,ou=people,ou=�������ڹ��������������,o=Government of Korea,c=KR");
				System.out.println(" .. ok");
			}
			catch (Exception e) {
				e.printStackTrace();
				nErrCnt++;
			}
			
			System.out.println(" 1.2. Get data by attribute");
			
			try {
				dataBuff = ldap.getData("companyName", "CN = D57�̻��001,OU = people,OU = ��⵵û�ҳ���ÿ�,O = Public of Korea,C = KR");
//				System.out.println("position = " + new String(dataBuff));
				System.out.println(" .. ok");
			}
			catch (Exception e) {
				e.printStackTrace();
				nErrCnt++;
			}
			
			System.out.println(" 1.3. Get data by search cn");
			
			try {
				ldap.searchCN(Ldap.DATA_TYPE_KM_CERT, "999�帲�׽�Ʈ001");
				
				strBuff = ldap.getDN();
//				System.out.println("FullDN = " + strBuff);
				
				dataBuff = ldap.getData();
				
				System.out.println(" .. ok");
			}
			catch (Exception e) {
				e.printStackTrace();
				nErrCnt++;
			}
			
		} catch (Exception e) {

			e.printStackTrace();
			nErrCnt++;
		}
	}
}
