package kostat.sop.ServiceAPI.batch.run;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.google.gson.Gson;
import com.ksign.securedb.api.crypto.Hash;

import kostat.sop.ServiceAPI.batch.AbsDetailTask;
import kostat.sop.ServiceAPI.common.util.StringUtil;

public class BatchGetTrendsFromPortal extends AbsDetailTask {
	private static final Log logger = LogFactory.getLog(BatchGetTrendsFromPortal.class);

	public void batchProcessGoogle() {
		SqlSession session = getSqlSession();
		
		List<HashMap> paramMapList = new ArrayList<HashMap>(); // 분석할 트렌드 데이트 리스트
		
		try {
		
			System.out.println(">>> Google Trends: start");
			
			URL rssURL = new URL("https://trends.google.com/trends/trendingsearches/daily/rss?geo=KR");
			DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();    
			Document doc = builder.parse(rssURL.openStream());    

			NodeList items = doc.getElementsByTagName("item"); 
			
			List<HashMap> words = new ArrayList<HashMap>();

			for (int ii = 0; ii < items.getLength(); ii++) {
				
				HashMap map = new HashMap();
				Element item = (Element)items.item(ii);
				
				map.put("trendSrchWrd", getValue(item, "title"));
				
				String accCnt = getValue(item, "ht:approx_traffic").replaceAll("[^0-9]", "");
				map.put("accCnt", accCnt);
				
				String pubDate = getValue(item, "pubDate"); 
				SimpleDateFormat parseDateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH); 
				SimpleDateFormat formatDateFormat1 = new SimpleDateFormat("yyyyMMdd");		// yyyy-MM-dd HH:mm:ss
				SimpleDateFormat formatDateFormat2 = new SimpleDateFormat("HHmm");
				Date parseDate = parseDateFormat.parse(pubDate); 
				String formatDateText1 = formatDateFormat1.format(parseDate);
				String formatDateText2 = formatDateFormat2.format(parseDate); 
				map.put("pblicteDt", formatDateText1);
				map.put("pblicteTime", formatDateText2);
				map.put("colctSourceDiv", "01");
				map.put("addExp", getValue(item, "description"));

				words.add(map);
				
				session.insert("batch.updateCtlgTrendSrchWrd", map);
				System.out.println("-----------");
				System.out.println(map);
				
				String strSeq = StringUtil.isNullToString(map.get("seq"));
				if(strSeq.indexOf("-") == -1) {
					HashMap<String, Object> paramMap = new HashMap<>(); // 분석할 트렌드 데이터
					paramMap.put("tendKwrd", getValue(item, "title"));
					paramMap.put("seq", map.get("seq"));
					//System.out.println(paramMap);
					paramMapList.add(paramMap);
				}
			} 
			
			System.out.println(">>> Google Trends: end(" + words.size() + ")");
			//System.out.println(paramMapList);
			
			languageAnalysis(paramMapList); //언어분석기술API class 호출

		} catch (SqlSessionException e) {
			logger.error(e);
		} catch (Exception e) {
			logger.error(e);
		} finally {
//			if (session != null)
//				session.close();
		}
	}
	
	public String getValue(Element parent, String nodeName) {
		String nodeVal = "";
		if(parent.getElementsByTagName(nodeName) != null && parent.getElementsByTagName(nodeName).item(0) != null && parent.getElementsByTagName(nodeName).item(0).getFirstChild() != null) {
			nodeVal = parent.getElementsByTagName(nodeName).item(0).getFirstChild().getNodeValue();
		}
		
		return nodeVal;
	}

	public void batchProcessNaver() {
		SqlSession session = getSqlSession();
		try {
		
			System.out.println("Naver Trends: start");

			String apiURL = "https://www.naver.com/srchrank?frm=main&ag=all&gr=2&ma=-2&si=2&en=-2&sp=-2";
	        URL url = new URL(apiURL);
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/json");

	        int responseCode = conn.getResponseCode();
      
	        BufferedReader rd;
	        if(responseCode == 200) {
	            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        } else {
	            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	        }
	        StringBuilder sb = new StringBuilder();
	        String line;
	        while ((line = rd.readLine()) != null) {
	            sb.append(line);
	        }
	        rd.close();
	        conn.disconnect();
	        
	        System.out.println("Response code: " + responseCode + ", result data : " + sb.toString());
	        
	        if(responseCode == 200) {
	        	List<HashMap> words = new ArrayList<HashMap>();
		        JSONParser jsonParse = new JSONParser();
		        JSONObject jsonObj = (JSONObject) jsonParse.parse(sb.toString());

		        String ts = (String) jsonObj.get("ts");
				SimpleDateFormat parseDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX"); 
				SimpleDateFormat formatDateFormat1 = new SimpleDateFormat("yyyyMMdd");		// yyyy-MM-dd HH:mm:ss
				SimpleDateFormat formatDateFormat2 = new SimpleDateFormat("HHmm");
				Date parseDate = parseDateFormat.parse(ts); 
				String formatDateText1 = formatDateFormat1.format(parseDate);
				String formatDateText2 = formatDateFormat2.format(parseDate);
				// System.out.println(formatDateText1 + "&&&" + formatDateText2);

		        JSONArray dataArray = (JSONArray) jsonObj.get("data");
		        int dataCnt = dataArray.size();
		        for(int i=0; i < dataCnt; i++) {
		        	HashMap map = new HashMap();
					map.put("pblicteDt", formatDateText1);
					map.put("pblicteTime", formatDateText2);
		        	
		        	JSONObject dataObject = (JSONObject) dataArray.get(i);
		        	map.put("trendSrchWrd", dataObject.get("keyword"));
		        	map.put("rank", dataObject.get("rank"));
		        	map.put("colctSourceDiv", "02");
		        	
		        	JSONArray synDataArray = (JSONArray) dataObject.get("keyword_synonyms");
		        	String synonyms = "";
		        	int synDataCnt = synDataArray.size();
		        	for(int m=0; m < synDataCnt; m++) {
		        		if(m == 0) {
		        			synonyms = (String) synDataArray.get(m);
		        		}else {
		        			synonyms = synonyms + ", " + (String) synDataArray.get(m);
		        		}
		        	}
		        	map.put("addExp", synonyms);
		        	
		        	
					words.add(map);
					
					session.insert("batch.updateCtlgTrendSrchWrd", map);	
		        }
	        
		        System.out.println("Naver Trends: end(" + words.size() + ")");
	        }

		} catch (ParseException e) {
			logger.error(e);
		} catch (SqlSessionException e) {
			logger.error(e);
		} catch (Exception e) {
			logger.error(e);
		} finally {
//			if (session != null)
//				session.close();
		}
	}
	
	/**
	 * @comment	트렌드키워드 형태소분석(언어분석기술 API)
	 * @param 	paramMapList
	 * @return
	 */
	public void languageAnalysis(List<HashMap> paramMapList) {
	     System.out.println(">>> languageAnalysis start");
	     System.out.println(">>> paramMapList " +paramMapList);		
		
		 List<HashMap> resultMapList = new ArrayList<HashMap>(); // 분석할 트렌드 데이트 리스트
		
		 String openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU";
	     String accessKey = "a983164f-9c88-4a3e-b679-5a786cc0d2a7";    // 발급받은 API Key
	     
	     String analysisCode = "ner"; // 언어 분석 코드 : 형태소 분석 결과, 어휘의미 분석 결과 (동음이의어 분석), 개체명 인식 결과
	     String analysisText = ""; //분석할 텍스트 데이터
	     Gson gson = new Gson();
	     Map<String, Object> request = new HashMap<>();
	     Map<String, String> argument = new HashMap<>();

	     for(int ii=0; ii<paramMapList.size(); ii++) {
	    	 HashMap<String, Object> temp = paramMapList.get(ii);
	    	 analysisText = StringUtil.isNullToString(temp.get("tendKwrd"));
	    	 
	    	 argument.put("analysis_code", analysisCode);
	         argument.put("text", analysisText);
	  
	         request.put("access_key", accessKey);
	         request.put("argument", argument);
	  
	  
	         URL url;
	         Integer responseCode = null;
	         String responBody = null;
	         try {
	             url = new URL(openApiURL);
	             HttpURLConnection con = (HttpURLConnection)url.openConnection();
	             con.setRequestMethod("POST");
	             con.setDoOutput(true);
	  
	             DataOutputStream wr = new DataOutputStream(con.getOutputStream());
	             wr.write(gson.toJson(request).getBytes("UTF-8"));
	             wr.flush();
	             wr.close();
	  
	             responseCode = con.getResponseCode();
	             InputStream is = con.getInputStream();
	             byte[] buffer = new byte[is.available()];
	             int byteRead = is.read(buffer);
	             responBody = new String(buffer);
	             
	             System.out.println("[responseCode] " + responseCode);
	             System.out.println("[responBody]");
	             System.out.println(responBody);

	 			JSONParser parser = new JSONParser();
	 			Object obj = parser.parse(responBody);
	 			JSONObject jsonObj = (JSONObject) obj;
	 			
	 			JSONObject return_object = (JSONObject) jsonObj.get("return_object");
	 			JSONArray sentence = (JSONArray) return_object.get("sentence");

	 			for(int i=0 ; i<sentence.size() ; i++){
	                 JSONObject tempObj = (JSONObject) sentence.get(i);
	                 JSONArray wsd = (JSONArray) tempObj.get("WSD");
	                 JSONArray ne = (JSONArray) tempObj.get("NE");
	                 int wsdCnt = wsd.size();
	                 
	                 for(int j=0; j<wsdCnt; j++) {
	                	 JSONObject wsdObj = (JSONObject) wsd.get(j);
//	                	 double wsdWeight = 0.0;
//	                	 String strWsdWeight = StringUtil.isNullToString(wsdObj.get("weight"));
//	                	 if(StringUtil.DecimalChk(strWsdWeight)) {
//	                		 wsdWeight = Double.parseDouble(strWsdWeight); 
//	                	 }
	                	 String wsdText = StringUtil.isNullToString(wsdObj.get("text"));
	                	 String wsdType = StringUtil.isNullToString(wsdObj.get("type"));
	                	 
	                	 //if("NNG".equalsIgnoreCase(wsdType) && (wsdWeight >= 0.7)) {
	                	 // 1.일반명사이고 사람이름이 아니면  2.고유명사이고 사람이름이 아니면
	                	 if(("NNG".equalsIgnoreCase(wsdType) && !isName(analysisText, wsdText, ne))
	                			 || ("NNP".equalsIgnoreCase(wsdType) && !isName(analysisText, wsdText, ne))) {
							HashMap<String, Object> resultMap = new HashMap<>();
							resultMap.put("seq", temp.get("seq")); //유의어에 트렌드 seq 담아놓기
							resultMap.put("text", wsdText);
							resultMap.put("scode", wsdObj.get("scode"));
							resultMap.put("weight", wsdObj.get("weight"));
							resultMap.put("vcblrDducDiv", "02");
							resultMap.put("tendKwrd", analysisText);
							resultMapList.add(resultMap);
	                	 }
	                 } 
	             }
/*	 			
	 			for(int i=0 ; i<sentence.size() ; i++){
	                 JSONObject tempObj = (JSONObject) sentence.get(i);
	                 JSONArray morp = (JSONArray) tempObj.get("morp");
	                 JSONArray wsd = (JSONArray) tempObj.get("WSD");
	                 int morpCnt = morp.size();
	                 
	                 for(int j=0; j<morpCnt; j++) {
	                	 JSONObject morpObj = (JSONObject) morp.get(j);
	                	 double morpWeight = 0.0;
	                	 String strMorpWeight = StringUtil.isNullToString(morpObj.get("weight"));
	                	 if(StringUtil.DecimalChk(strMorpWeight)) {
	                		 morpWeight = Double.parseDouble(strMorpWeight); 
	                	 }
	                	 String morpType = StringUtil.isNullToString(morpObj.get("type"));
	                	 String morpLemma = StringUtil.isNullToString(morpObj.get("lemma"));
	                	 
	                	 if("NNG".equalsIgnoreCase(morpType) && (morpWeight >= 0.1)) {
	                		 JSONObject wsdObj = (JSONObject) wsd.get(j);
	                		 // morp 와 WSD 구성요소의 배치가 동일하다고 보고	                		 
	                		 if(wsdObj != null) {
	                			 String wsdText = StringUtil.isNullToString(wsdObj.get("text"));
	                			 if(morpLemma.equals(wsdText)) {	                				 
									HashMap<String, Object> resultMap = new HashMap<>();
									resultMap.put("seq", temp.get("seq")); //유의어에 트렌드 seq 담아놓기
									resultMap.put("text", wsdText);
									resultMap.put("scode", wsdObj.get("scode"));
									resultMap.put("weight", wsdObj.get("weight"));
									resultMapList.add(resultMap);	                				 
	                			 }else {
	                				 System.out.println("fix !!! fix !!! fix !!!");
	                			 }	                			 
	                		 }else {
	                			 System.out.println("fix !!! fix !!! fix !!!");
	                		 }
	                	 }
	                 } 
	             }
*/
	         } catch (MalformedURLException e) {
	             e.printStackTrace();
	         } catch (IOException e) {
	             e.printStackTrace();
	         } catch (ParseException e) {
	 			// TODO Auto-generated catch block
	 			e.printStackTrace();
	 		}
	     }//for문 end

	     System.out.println(">>> languageAnalysis end !!!");
	     
	     SynonymCollection(resultMapList);
	}
	
	/**
	 * @comment	트렌드키워드 유의어 수집(어휘관계분석기술 > 어휘정보 API)
	 * @param 	paramMapList
	 * @return
	 */
	public void SynonymCollection(List<HashMap> paramMapList) {
		System.out.println(">>> SynonymCollection start");
		System.out.println(">>> paramMapList: " + paramMapList);
		
		SqlSession session = getSqlSession();		
		
		String openApiURL = "http://aiopen.etri.re.kr:8000/WiseWWN/Word";
		String accessKey = "a983164f-9c88-4a3e-b679-5a786cc0d2a7";    // 발급받은 API Key
		String wordNng = ""; // 정보를 조회할 어휘 데이터
		boolean isAddMyself = true;	// 유의어 테이블에 인기키워드와 동일한 일반명사 저장 여부 
		Gson gson = new Gson();
		
		Map<String, Object> request = new HashMap<>();
		Map<String, String> argument = new HashMap<>();

		for(int ii=0; ii<paramMapList.size(); ii++) {
			HashMap<String, Object> temp = paramMapList.get(ii);
			HashMap<String, Object> resultMap = new HashMap<>();
			//System.out.println(temp.get("scode"));
			//System.out.println(temp.get("text"));
			//System.out.println(temp.get("seq"));
  
			wordNng = StringUtil.isNullToString(temp.get("text"));
			double scode = -1.0;
			int scodeInt = -1;
			String strScode = StringUtil.isNullToString(temp.get("scode"));
			if(StringUtil.DecimalChk(strScode)) {
				scode = Double.parseDouble(strScode); 
				scodeInt = Integer.parseInt(strScode);
			}			  
			  
			  argument.put("word", wordNng);
			  request.put("access_key", accessKey);
			  request.put("argument", argument);
				
			  URL url;
			  Integer responseCode = null;
			  String responBody = null;
			  try {
					url = new URL(openApiURL);
					HttpURLConnection con = (HttpURLConnection)url.openConnection();
					con.setRequestMethod("POST");
					con.setDoOutput(true);

					DataOutputStream wr = new DataOutputStream(con.getOutputStream());
					wr.write(gson.toJson(request).getBytes("UTF-8"));
					wr.flush();
					wr.close();

					responseCode = con.getResponseCode();
					InputStream is = con.getInputStream();
					byte[] buffer = new byte[is.available()];
					int byteRead = is.read(buffer);
					responBody = new String(buffer);

					System.out.println("[responseCode] " + responseCode);
					System.out.println("[responBody]");
					System.out.println(responBody);
					
					HashMap<String, Object> result = new HashMap<>();
					
					JSONParser parser = new JSONParser();
					Object obj = parser.parse(responBody);
					JSONObject jsonObj = (JSONObject) obj;
					
					JSONObject return_object = (JSONObject) jsonObj.get("return_object");
					JSONArray wwn_wordInfo = (JSONArray) return_object.get("WWN WordInfo");

					// 구글 인기 키워드에서 도출된 일반명사는 어휘정보 API 결과에 상관없이 유의어로 등록
					if(isAddMyself || !wordNng.equals(StringUtil.isNullToString(temp.get("tendKwrd")))){
						resultMap.put("trendSrchwrdSeq", temp.get("seq"));
						resultMap.put("syn", wordNng);
						resultMap.put("vcblrDducDiv", "02");
						resultMap.put("shldrNo", scodeInt);		// temp.get("scode")
						
						System.out.println("insert NNG: " + resultMap);
						
						session.insert("batch.insertCtlgSynWrd", resultMap);							
					}
					
					for(int i=0; i<wwn_wordInfo.size() ; i++) {
						JSONObject tempObj = (JSONObject) wwn_wordInfo.get(i);
						double tempCode = -9.0;
						String strHomonymCode = StringUtil.isNullToString(tempObj.get("HomonymCode"));
						if(StringUtil.DecimalChk(strHomonymCode)) {
							tempCode = Double.parseDouble(strHomonymCode); 
						}						
						
						//System.out.println(tempCode + " == " + scode);
						
						if(tempCode == scode){
							//System.out.println("HomonymCode: " + strHomonymCode);
							
							JSONArray Synonym = (JSONArray) tempObj.get("Synonym");
							for(int j=0; j<Synonym.size(); j++) {

								String syn = StringUtil.isNullToString(Synonym.get(j));
								String[] arrSyn = syn.split("_");
								if(arrSyn.length > 0 && !wordNng.equals(arrSyn[0])) {
									resultMap.put("syn", arrSyn[0]);
									if(arrSyn.length > 1) {
										resultMap.put("shldrNo", arrSyn[arrSyn.length - 1]);
									}									
									resultMap.put("trendSrchwrdSeq", temp.get("seq"));
									resultMap.put("vcblrDducDiv", "01");
									
									System.out.println("insert Synonym" + j + ": " + resultMap);
									
									session.insert("batch.insertCtlgSynWrd", resultMap);									
								}
							}
							
							break;
		    			}
					}

				} catch (MalformedURLException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		  }
		//for문 end
		
		System.out.println(">>> SynonymCollection end !!!");
		
		SimilarityAnalysis();
	}
	
	public void SimilarityAnalysis() {		
		System.out.println(">>> SimilarityAnalysis start");
		
		SqlSession session = getSqlSession();
		int numOfUsePerDay = 5000;		// api 이용가능 횟수
		int numOfKeyword = 0;			// (비교대상)대표키워드 수
		int numOfExec = 0;				// 유의도 비교 수행횟수(인기 키워드 기준)
		List targetKwrdList = null;		// 대표키워드 목록
		List sourceKwrdList = null;		// 인기키워드 목록

		try {
			
			targetKwrdList = session.selectList("batch.getMainKwrdListForBatch", null);
			numOfKeyword = targetKwrdList.size();
			System.out.println("비교대상수: " + numOfKeyword);
			
			if(numOfKeyword > 0) {
				if(numOfUsePerDay < numOfKeyword) {
					numOfExec = 1;
				}else {
					numOfExec = numOfUsePerDay / numOfKeyword;
				}
				System.out.println("수행횟수: " + numOfExec);
				
				Map mapParameter = new HashMap();
				mapParameter.put("numOfExec", numOfExec);
				sourceKwrdList = session.selectList("batch.getTrendKwrdListForBatch", mapParameter);
				System.out.println("sourceKwrdList: " + sourceKwrdList);

				int loopCnt = sourceKwrdList.size();
				for(int x = 0; x < loopCnt; x++) {
				//for(int x = 0; x < 1; x++) {
					
					HashMap srcKwrd = (HashMap)sourceKwrdList.get(x);
					String trendSrchwrdSeq = StringUtil.isNullToString(srcKwrd.get("TREND_SRCHWRD_SEQ"));
					String syn = StringUtil.isNullToString(srcKwrd.get("SYN"));
					String shldrNo = StringUtil.isNullToString(srcKwrd.get("SHLDR_NO"));					
					if(shldrNo.length() == 1) {
						shldrNo = "0" + shldrNo;
					}

					for(int y = 0; y < numOfKeyword; y++) {
					//for(int y = 0; y < 10; y++) {
						
						HashMap trgtKwrd = (HashMap)targetKwrdList.get(y);
						String mainKwrd = StringUtil.isNullToString(trgtKwrd.get("MAIN_KWRD"));
						
						Map<String, String> WordRelRst = callAIHubApiWordRel(syn, shldrNo, mainKwrd, "");

						String responseCode = WordRelRst.get("responseCode");
						String responBody = WordRelRst.get("responBody");
						
						System.out.println("[responseCode] " + responseCode + ", syn=" + syn + ", shldrNo=" + shldrNo + ", mainKwrd=" + mainKwrd);
						System.out.println("[responBody]");
						System.out.println(responBody);
						
						if(responBody == null) {
							System.out.println("응답결과 없음 !!!");
							continue;
						}

			 			JSONParser parser = new JSONParser();
			 			Object obj = parser.parse(responBody);
			 			JSONObject jsonObj = (JSONObject) obj;
			 			
			 			JSONObject return_object = (JSONObject) jsonObj.get("return_object");
			 			JSONObject wwwWordRelInfo = null;
			 			JSONObject wordRelInfo = null;
			 			JSONObject firstWordInfo = null;
			 			JSONObject secondWordInfo = null;
			 			
			 			if(return_object != null) {
			 				wwwWordRelInfo = (JSONObject) return_object.get("WWN WordRelInfo");
			 				if(wwwWordRelInfo != null) {
			 					wordRelInfo = (JSONObject) wwwWordRelInfo.get("WordRelInfo");
			 					firstWordInfo = (JSONObject) wwwWordRelInfo.get("FirstWordInfo");
			 					secondWordInfo = (JSONObject) wwwWordRelInfo.get("SecondWordInfo");
			 				}
			 			}
			 			
			 			String firstWord = "";
			 			String firstWordHomonymCode = "";
			 			if(firstWordInfo != null) {
			 				firstWord = StringUtil.isNullToString(firstWordInfo.get("Word"));
			 				firstWordHomonymCode = StringUtil.isNullToString(firstWordInfo.get("HomonymCode"));
			 				if(firstWordHomonymCode.indexOf(".") > -1) {
			 					firstWordHomonymCode = firstWordHomonymCode.substring(0, firstWordHomonymCode.indexOf("."));
			 				}
			 			}
			 			if("".equals(firstWord)) {
			 				System.out.println("기준 어휘 분석 불가로 추가 작업은 무의미: " + syn);
			 				break;
			 			}
			 			
			 			String secondWord = "";
			 			String secondWordHomonymCode = "";
			 			if(secondWordInfo != null) {
			 				secondWord = StringUtil.isNullToString(secondWordInfo.get("Word"));
			 				secondWordHomonymCode = StringUtil.isNullToString(secondWordInfo.get("HomonymCode"));
			 				if(secondWordHomonymCode.indexOf(".") > -1) {
			 					secondWordHomonymCode = secondWordHomonymCode.substring(0, secondWordHomonymCode.indexOf("."));
			 				}
			 			}
			 			if("".equals(secondWord)) {
			 				System.out.println("비교대상 어휘 분석 불가로 추가 작업은 무의미: " + mainKwrd);
			 				continue;
			 			}
			 			
			 			if(wordRelInfo != null) {
			 				String distance = StringUtil.isNullToString(wordRelInfo.get("Distance"));
			 				JSONArray similarity = (JSONArray) wordRelInfo.get("Similarity");
			 				String simScore = "0.0";

			 				int simLoopCnt = similarity.size();
			 				for(int z = 0; z < simLoopCnt; z++) {
			 					JSONObject simObj = (JSONObject) similarity.get(z);
			 					String algorithm = StringUtil.isNullToString(simObj.get("Algorithm"));
			 					
			 					if("ETRI".equals(algorithm)) {
			 						simScore = StringUtil.isNullToString(simObj.get("SimScore"));
			 						
			 						break;
			 					}
			 				} // 유사도 알고리즘 루프 종료

			 				if(StringUtil.DecimalChk(simScore) && Double.parseDouble(simScore) > 0.0) {			 				
			 					// 유사도가 0이면 저장 안함
				 				HashMap<String, String> sqlParamRelWrd = new HashMap<String, String>();
				 				sqlParamRelWrd.put("trendSrchwrdSeq", trendSrchwrdSeq);
				 				sqlParamRelWrd.put("syn", syn);
				 				sqlParamRelWrd.put("mainKwrd", mainKwrd);
				 				sqlParamRelWrd.put("synShldrNo", firstWordHomonymCode);
				 				sqlParamRelWrd.put("mainKwrdShldrNo", secondWordHomonymCode);
				 				sqlParamRelWrd.put("pathDistance", distance);
				 				sqlParamRelWrd.put("simildeger", simScore);
				 				
								System.out.println("insert Similarity: " + sqlParamRelWrd);
								
								session.insert("batch.insertCtlgRelWrd", sqlParamRelWrd);
			 				}else {
			 					System.out.println("유사도 없음: simScore=" + simScore);
			 				}
			 			}
					} // 비교 대상(대표 키워드) 루프 종료
					
	 				HashMap<String, String> sqlParamSynWrd = new HashMap<String, String>();
	 				sqlParamSynWrd.put("trendSrchwrdSeq", trendSrchwrdSeq);
	 				sqlParamSynWrd.put("syn", syn);					

					System.out.println("update Synonym: " + sqlParamSynWrd);
					
					session.update("batch.updateCtlgSynWrd", sqlParamSynWrd);
					
				} // 인기키워드 루프 종료
	
			}

		} catch (SqlSessionException e) {
			logger.error(e);
		} catch (Exception e) {
			logger.error(e);
		} finally {
//			if (session != null)
//				session.close();
		}
		
		
		System.out.println(">>> SimilarityAnalysis end !!!");		
	}
	
	private Map<String, String> callAIHubApiWordRel(String firstWord, String firstSenseId, String secondWord, String secondSenseId) {
		HashMap<String, String> rst = new HashMap<String, String>();

		String openApiURL = "http://aiopen.etri.re.kr:8000/WiseWWN/WordRel";
		String accessKey = "a983164f-9c88-4a3e-b679-5a786cc0d2a7";           // 발급받은 API Key
		//String firstWord = "가구";                // 첫번째 어휘 데이터
		//String firstSenseId = " FIRST_WORD_SENSE_ID";  // 첫번째 어휘 의미코드
		//String secondWord = "가족";              // 두번째 어휘 데이터
		//String secondSenseId = "SECOND_WORD_SENSE_ID"; // 두번째 어휘 의미코드

		Gson gson = new Gson();

		Map<String, Object> request = new HashMap<>();
		Map<String, String> argument = new HashMap<>();

		argument.put("first_word", firstWord);
		if(!"".equals(StringUtil.isNullToString(firstSenseId))){
			argument.put("first_sense_id", firstSenseId);
		}
		argument.put("second_word", secondWord);
		if(!"".equals(StringUtil.isNullToString(secondSenseId))){
			argument.put("second_sense_id", secondSenseId);
		}

		request.put("access_key", accessKey);
		request.put("argument", argument);

		URL url;
		Integer responseCode = null;
		String responBody = null;
		try {
			url = new URL(openApiURL);
			HttpURLConnection con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);

			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			wr.write(gson.toJson(request).getBytes("UTF-8"));
			wr.flush();
			wr.close();

			responseCode = con.getResponseCode();
			InputStream is = con.getInputStream();
			byte[] buffer = new byte[is.available()];
			int byteRead = is.read(buffer);
			responBody = new String(buffer);
			
			rst.put("responseCode", String.valueOf(responseCode));
			rst.put("responBody", responBody);

//			System.out.println("[responseCode] " + responseCode);
//			System.out.println("[responBody]");
//			System.out.println(responBody);

		} catch (MalformedURLException e) {
			System.out.println("MalformedURLException: " + e.toString());
		} catch (IOException e) {
			System.out.println("IOException: " + e.toString());
		}
		
		return rst;
	}
	
	private boolean isName(String fullName, String name, JSONArray jArr) {
		boolean rst = false;
		
		if(jArr != null) {
			fullName = StringUtil.isNullToString(fullName);
			name = StringUtil.isNullToString(name);
			int loopCnt = jArr.size();
			
			for(int z = 0; z < loopCnt; z++) {
				JSONObject jObj = (JSONObject) jArr.get(z);
				String text = StringUtil.isNullToString(jObj.get("text"));
				
				if(name.equals(text) || fullName.equals(text)) {
					String type = StringUtil.isNullToString(jObj.get("type"));
					if("PS_NAME".equals(type)) {
						rst = true;
					}
					
					break;
				}
			} 			
		}		
		
		return rst;
	}
}
