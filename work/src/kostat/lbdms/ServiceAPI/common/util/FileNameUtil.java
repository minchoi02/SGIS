package kostat.lbdms.ServiceAPI.common.util;

import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**  
* <pre>
* 파일명 관련 유틸
* </pre>
*
* @author        Admin
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
* </pre>
*/
public class FileNameUtil {
	
	private static final String IMAGE_PATTERN = 
            "([^\\s]+(\\.(?i)(jpg|jpeg|png|gif|bmp))$)";
	
	/**
	 * <pre>
	 * 날짜 정보를 통해 파일 이름을 생성한다
	 * </pre>
	 * @return String filename
	 */
	public static String makeFileNameWithDate(){
		
		StringBuffer dateNum = null;
		Calendar cal = Calendar.getInstance();

		dateNum = new StringBuffer();
		dateNum.append(cal.get(Calendar.YEAR));
		dateNum.append(String.format("%02d", cal.get(Calendar.MONTH)+1));
		dateNum.append(String.format("%02d", cal.get(Calendar.DAY_OF_MONTH)));
		dateNum.append(String.format("%02d", cal.get(Calendar.HOUR_OF_DAY)));
		dateNum.append(String.format("%02d", cal.get(Calendar.MINUTE)));
		dateNum.append(String.format("%02d", cal.get(Calendar.SECOND)));
		dateNum.append(String.format("%03d", cal.get(Calendar.MILLISECOND)));
		
		return dateNum.toString();
	}
	
	/**
	 * <pre>
	 * 파일 이름에 이미지 확장자를 갖고 있는지 여부를 반환한다 
	 * </pre>
	 * @param fileName
	 * @return boolean
	 */
	public static boolean hasImageFileExtension( String fileName ){
		Pattern pattern = Pattern.compile( IMAGE_PATTERN );
		Matcher matcher = pattern.matcher( fileName );
		return matcher.matches();
	}

}
