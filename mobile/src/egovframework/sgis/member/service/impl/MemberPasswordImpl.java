package egovframework.sgis.member.service.impl;

import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ksign.securedb.api.SDBCrypto;
import com.ksign.securedb.api.util.SDBException;

public class MemberPasswordImpl implements PasswordEncoder {
	private static final Log logger = LogFactory.getLog( MemberPasswordImpl.class );
	private static final String PROPERTY_PATH = "/globals.properties";
	private static String SCHEMA = "";
	private static final String TABLE = "enc_key";
	private static final String S_COLUMN = "sha256";		//단방향 알고리즘

	/**
	 * 비밀번호 암호화
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param rawPassword
	 * @return
	 */
	@Override
	public String encode(CharSequence rawPassword) {
		String encodedPassword = null;
		if(rawPassword!=null){
			encodedPassword = this.encodePassword(rawPassword);
		}
		return encodedPassword;
	}

	/**
	 * 비밀번호가 맞는지 여부
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param rawPassword
	 * @param encodedPassword
	 * @return
	 */
	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		rawPassword = this.encode(rawPassword);
		if(rawPassword==null||encodedPassword==null){
			return false;
		}
		return rawPassword.equals(encodedPassword);
	}
	/**
	 * 비밀번호 암호화
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param rawPassword
	 * @return
	 */
	private String encodePassword(CharSequence rawPassword){
		String encodedPassword;
		try {
			SDBCrypto crypto = dbConfig();
			encodedPassword = crypto.encrypt(SCHEMA, TABLE, S_COLUMN, rawPassword.toString()); 
		} catch (SDBException e) {
			encodedPassword = null;
		} catch (Exception e) {
			encodedPassword = null;
		}
		return encodedPassword;
	}
	/**
	 * 암호화 키 서버 접근 Config
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @return
	 */
	private SDBCrypto dbConfig(){

		SDBCrypto crypto = new SDBCrypto();

		// 2020.03.31[한광희] 운영반영 금지 START
		crypto = null;
		/*try {
			ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
			Properties props = PropertiesLoaderUtils.loadProperties(resource);
			SCHEMA = props.getProperty("Globals.Config.crypto.schema");		//oracle:dbsec	mssql:dbo
			String domainIP = props.getProperty("Globals.Config.crypto.domainIP");		//oracle dbms ip 기입 (Sample source code의 DomainIP 임)
			int domainPort = Integer.parseInt(props.getProperty("Globals.Config.crypto.domainPort"));	//oracle service port 기입(Sample source code의 DomainPort 임)
			String serverIP = props.getProperty("Globals.Config.crypto.serverIP");			//service ip 기입 => oracle dbms ip와 동일
			int serverPort = Integer.parseInt(props.getProperty("Globals.Config.crypto.serverPort"));		//암호화 Key 정보를 받아오는 서비스포트

			crypto = SDBCrypto.getInstance(domainIP, domainPort, serverIP, serverPort);

		} catch (SDBException e) {
			logger.error(e);
			crypto = null;
		} catch (Exception e) {
			logger.error(e);
			crypto = null;
		}*/
		
		// 2020.03.31[한광희] 운영반영 금지 END

		return crypto;
	}

}
