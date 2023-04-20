package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

/**
 * 1. 기능 : 일자리 맵 서비스 > 일자리 보기 > 워크넷 직업전망 요약 조회 <p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.18	초기 작성
 *     2019.01.07	ywKim	주석 : js버전으로 변경에 따라 본API는 사용정지 (빈도 사용정지)
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class SelectJobProspectingSummary extends AbsQuery<HashMap<String,Object>> {
	private static final Log logger = LogFactory.getLog(SelectJobProspectingSummary.class);

	@Override
	public String getApiId() {
		return "112004";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Class<?> getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class<?> getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}

	enum MustParam{
		job_cd,			// 워크넷 직업전망 코드 		
	}

	enum OptionParam{
	}
	
	@Override
	public HashMap<String,Object> executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {

		httpSession = req.getSession();
		HashMap<String,Object> resultData = new HashMap<String,Object>();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map<String,Object> mapParameter = getParameterMap(req);
			_checkNullParameterValue(mapParameter);
			
			String code = req.getParameter("job_cd");
			
			logger.info(">> Parameters =============================== ");
			logger.info("워크넷 직업전망 코드 : " + code);
			logger.info(">> ========================================== ");

			Map data = callApi(code);
			resultData.put("data", data);
			
			logger.info("END Query - TXID[" + getApiId() + "] ");
			
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		
		return resultData;
	}
	
	/*
	 * 워크넷 직업전망 요약 조회
	 */
	Map callApi(String pCode) {
		BufferedReader in = null;
		Map data = null;
		try { 
			URL obj = new URL("http://openapi.work.go.kr/opi/opi/opia/korJobProspectApi.do?authKey=WNJCQWWNSBJ0Y7F16CGHU2VR1HK&returnType=XML&target=fJobDTL&fJobCd=" + pCode); // 호출할 url 
			HttpURLConnection con = (HttpURLConnection)obj.openConnection();
			con.setRequestMethod("GET");
			
			in = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
			String line;
			
			while((line = in.readLine()) != null) { 
				// response를 차례대로 출력
				// 실제로 워크넷 API 결과 XML 은 1 Line이라 이 프로세스는 1회만 실행된다.
				
				logger.info("워크넷 직업전망 요약: " + line);
				data = parseXML(line);
			}
		} catch(IOException e) { 
			//보안취약점 처리
			//e.printStackTrace();
			logger.error("ERROR-01:파일 열기 에러");
		} finally { 
			if(in != null) {
				try { 
					in.close(); 
				} catch(IOException e) { 
					//보안취약점 처리
					//e.printStackTrace();
					logger.error("ERROR-02:파일 닫기 에러");
				} 
			}
		}
		
		return data;		
	}
	
	/*
	 * 워크넷 API 결과 (xml) 파싱
	 * 
	 * @params	xml : 워크넷 API 결과 예(xml)
	 * 			<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
	 * 			<fJobsSum>
	 * 				<fJobClCd>KR12</fJobClCd>
	 * 				<fJobCd>KR120008</fJobCd>
	 * 				<fJobNm>조적공 및 석공</fJobNm>
	 * 				<whatWork>~~~~~</whatWork>
	 * 				<eduTranning>~~~~~</eduTranning>
	 * 				<fJobStatus>~~~~~</fJobStatus>
	 * 				<fJobProspect>~~~~~</fJobProspect>
	 * 				<whatWork>~~~~~</whatWork>
	 * 			</fJobsSum>
	 */
	Map parseXML(String xml) throws IOException {
		InputStream is = new ByteArrayInputStream(xml.getBytes());
		wrXmlParser parser = new wrXmlParser();
		Map<String, Object> map = new HashMap<String, Object>();
		
		try{
			Document doc = parser.parseXML(is);
		    NodeList nl = doc.getElementsByTagName("fJobsSum");

		    if (nl.getLength() == 1) {
		    	NodeList cnl = nl.item(0).getChildNodes();
		    	
			    for (int i = 0; i < cnl.getLength(); i++) {
		    		Node node = cnl.item(i);
		    		map.put(node.getNodeName(), node.getFirstChild().getNodeValue());
			    }
		    }
	    }finally{
	    	if(is != null) {
				try { 
					is.close(); 
				} catch(IOException e) { 
					//보안취약점 처리
					//e.printStackTrace();
					logger.error("ERROR-02:파일 닫기 에러");
				} 
			}
	    }
	    
	    return map;
	}
}
