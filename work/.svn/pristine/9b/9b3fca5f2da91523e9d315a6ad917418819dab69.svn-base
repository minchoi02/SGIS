package kostat.lbdms.ServiceAPI.common.web.rest;

import java.io.InputStream;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONObject;

/**
 * <pre>
* 데이터 생성 REST 서비스
 * </pre>
 *
 * @author Admin
 * @since 2015. 10. 20. 오후 2:18:53
 * @version 1.0
 * @see
 * 
 *      <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
 *      </pre>
 */
@Component
public class DataCreateCommandClient {
	@Autowired
	private RestService			restService;
	private static final Log	logger	= LogFactory.getLog(DataCreateCommandClient.class);
	
	/**
	 * <pre>
	 * text파일 테이블로 업로드
	 * </pre>
	 * 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject textToTable() throws SystemFailException {
		
		HashMap<String, Object> parameters = new HashMap<String, Object>();
		
		JSONObject res = restService.call(Command.ACTION, Command.KAIROS, Command.TABLES, parameters);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
		
	}
	
	/**
	 * <pre>
	 * 파일업로드 -> 테이블 생성
	 * </pre>
	 * 
	 * @param HttpServletResponse
	 *            response
	 * @param InputStream
	 *            inputStream
	 * @param String
	 *            data_type
	 * @param String
	 *            output_table_name
	 * @param String
	 *            description
	 * @param String
	 *            header
	 * @param String
	 *            delimiter
	 * @param String
	 *            target_agent
	 * @param String
	 *            user_id
	 * @param String
	 *            encoding_type
	 * 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	@SuppressWarnings("static-access")
	public JSONObject createTable(HttpServletResponse response, InputStream inputStream, String data_type, String output_table_name, String description, String header, String delimiter,
			String target_agent, String user_id, String encoding_type) throws SystemFailException {
		
		String data = restService.callByCreateTable(response, inputStream, data_type, output_table_name, description, header, delimiter, target_agent, user_id, encoding_type);
		
		JSONObject res = new JSONObject().fromObject(data);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	@SuppressWarnings("static-access")
	public JSONObject createTableWithColumns(HttpServletResponse response, InputStream inputStream, String data_type, String output_table_name, String description, String header, String delimiter,
			String target_agent, String user_id, String encoding_type, org.json.JSONArray columnGridData) throws SystemFailException {
		
		System.out.println();
		String data = restService.callByCreateTableWithColumns(response, inputStream, data_type, output_table_name, description, header, delimiter, target_agent, user_id, encoding_type,
				columnGridData);
		
		JSONObject res = new JSONObject().fromObject(data);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 파일업로드 -> 테이블 생성
	 * </pre>
	 * 
	 * @param HttpServletResponse
	 *            response
	 * @param InputStream
	 *            inputStream
	 * @param String
	 *            data_type
	 * @param String
	 *            output_table_name
	 * @param String
	 *            description
	 * @param String
	 *            header
	 * @param String
	 *            delimiter
	 * @param String
	 *            target_agent
	 * @param String
	 *            user_id
	 * @param String
	 *            encoding_type
	 * 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	@SuppressWarnings("static-access")
	public JSONObject loadTable(HttpServletResponse response, InputStream inputStream, String data_type, String output_table_name, String header, String delimiter, String target_agent, String user_id,
			String encoding_type) throws SystemFailException {
		
		String data = restService.callByLoadTable(response, inputStream, data_type, output_table_name, header, delimiter, target_agent, user_id, encoding_type);
		
		JSONObject res = new JSONObject().fromObject(data);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 파일업로드 -> 테이블 생성
	 * </pre>
	 * 
	 * @param HttpServletResponse
	 *            response
	 * @param InputStream[]
	 * @param String
	 *            data_type
	 * @param String
	 *            output_table_name
	 * @param String
	 *            description
	 * @param String
	 *            user_id
	 * @param String
	 *            encoding_type
	 * 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	@SuppressWarnings("static-access")
	public JSONObject createTable(HttpServletResponse response, InputStream[] inputStream1, String data_type, String output_table_name, String description, String user_id, String encoding_type)
			throws SystemFailException {
		
		String data = restService.callByCreateTable(response, inputStream1, data_type, output_table_name, description, user_id, encoding_type);
		
		JSONObject res = new JSONObject().fromObject(data);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 파일업로드 -> 기존 테이블에 파일 데이터 로드
	 * </pre>
	 * 
	 * @param HttpServletResponse
	 *            response
	 * @param InputStream[]
	 * @param String
	 *            data_type
	 * @param String
	 *            output_table_name
	 * @param String
	 *            description
	 * @param String
	 *            user_id
	 * @param String
	 *            encoding_type
	 * 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	@SuppressWarnings("static-access")
	public JSONObject loadTable(HttpServletResponse response, InputStream[] inputStream1, String data_type, String output_table_name, String user_id, String encoding_type) throws SystemFailException {
		
		String data = restService.callByLoadTable(response, inputStream1, data_type, output_table_name, user_id, encoding_type);
		
		JSONObject res = new JSONObject().fromObject(data);
		
		if (!RestResultChecker.isSuccess(res)) {
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
}
