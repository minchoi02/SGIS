package kostat.sop.ServiceAPI.controller.view;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.EduGalleryService;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;

/**
 * 1. 기능 : Edu 통계갤러리 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 최재영 1.0, 2016/08/17  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 최재영
 * @version 1.0
 * @see
 * <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/edu_gallery")
public class EduGalleryController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MypageController.class);
	
	@Resource(name="eduGalleryService")
	private EduGalleryService galleryService;
	
	/**
	 * galleryList
	 * 갤러리 목록 이동
	 * @param HttpServletRequest request, HttpServletResponse response
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectionGallery")
	public ModelAndView collectionGallery(HttpServletRequest request, HttpServletResponse response){
		return new ModelAndView("edu_gallery/collectionGallery");
	}
	
	
	/**
	 * resultGallery
	 * 갤러리 목록 이동
	 * @param HttpServletRequest request, HttpServletResponse response
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/resultGallery")
	public ModelAndView resultGallery(HttpServletRequest request, HttpServletResponse response){
		return new ModelAndView("edu_gallery/resultGallery");
	}
	
	/**
	 * myGallery
	 * 갤러리 목록 이동
	 * @param HttpServletRequest request, HttpServletResponse response
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myGallery")
	public ModelAndView myGallery(HttpServletRequest request, HttpServletResponse response){
		return new ModelAndView("edu_gallery/myGallery");
	}
	
	
	
	/**
	 * galleryAdd
	 * 갤러리 추가
	 * @param HttpServletRequest request, HttpServletResponse response
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/galleryAdd")
	public void galleryAdd(HttpServletRequest request, HttpServletResponse response){
		HttpSession session = request.getSession();
		String usr_id = (String)session.getAttribute("member_id");
		
		//교안이 등록은 되었는데 member_id에 undefined로 등록되었다는 현상이 있어서 아래 로직 추가함. 일단 주석처리 
		if (usr_id == null || "".equals(usr_id) ||  "undefined".equals(usr_id) ) {
			response.setContentType("text/html; charset=utf-8");
	    	PrintWriter out = null;
	    	try {
	    		String message = "로그인 후 30분 이상 사용하지 않아 세션이 종료되었습니다. 다시 로그인 해주시기 바랍니다.";
				out = response.getWriter();
				//out.println("<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"utf-8\" http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/><script>alert('" + message + "');</script></head><body></body></html>");
				out.println(message);
				
				out.flush();
				out.close();
				
				return;
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if(out != null) {
					out.close();
				}
			}
		}
		
		
		Map map = new HashMap();
		map.put("usr_id", usr_id);
		map.put("member_id", usr_id);
		map.put("title", request.getParameter("title"));
		map.put("content", request.getParameter("content"));
		map.put("img_file_nm", request.getParameter("img_file_nm"));
		//map.put("school_grade", (String)session.getAttribute("ss_school_grade"));
		map.put("school_grade", request.getParameter("param_school_grade")); //초등, 중등, 고등 구분을 세션에서 가져오다 파라미터로 변경함 20211202
		
		map.put("teach_pwd", request.getParameter("teach_pwd"));
		map.put("open_yn", request.getParameter("open_yn"));
		
		
		
		//자동화공격 방지 start
		//SRV_DT_GALLERYLIST
		String defenceAutometicAttack = galleryService.defenceAutometicAttack(map);		//X면 통과 Y또는 null이면 실패	글은 1분이상 지나야 등록가능함
		
		
		System.out.println(defenceAutometicAttack);
		
		//개발시 defenceAutometicAttack는 "Y" 세팅한다. 운영갈때 주석처리 요망
		defenceAutometicAttack = "Y"; //운영갈때 주석처리 요망
		
		if("Y".equals(defenceAutometicAttack) || null == defenceAutometicAttack){
			
			logger.debug("================================== map[" + map);
			
			//교안정보 등록
			String data_id = galleryService.addGallery(map);

			//설문조사영역 만들기
			//설문조사는 List 형식으로 들어올 것이다.
			//String surveyData = request.getParameter("surveyData");
			
			//galleryService.insertSurvey(surveyData ,data_id,surveyDuplication);
			
			/*
			if(request.getParameter("srv_type").toString().equals("1") || request.getParameter("srv_type").toString().equals("3")){
				galleryService.insertGalleryImage(request, data_id);
			}else if(request.getParameter("srv_type").toString().equals("2") || request.getParameter("srv_type").toString().equals("4")){
				galleryService.insertImage(request,data_id);
			}else{
				//활용사례 등록일 경우
				galleryService.insertUseBoardRegist(request,data_id);
			}
			*/
			
			String kwrd = request.getParameter("tag")==null?"":request.getParameter("tag");
			if ( !"".equals(kwrd) ) {
				kwrd = kwrd.replaceAll("#","");
				StringTokenizer st = new StringTokenizer(kwrd, " \t\r\n+-*/()=><!,|@");

				String token = null;
			    while (st.hasMoreTokens()) {
			      token = st.nextToken();
			      
			      if(token != null && token.length() >1) {
			    	  map.put("kwrd", token);
			    	  galleryService.insertGalleryTag(map);
			      }			      
			    }
			}
			
			
			
			
			galleryService.insertGalleryImage(request, data_id);
			
		}
		
	}
	
	/**
	 * galleryAdd
	 * 갤러리 추가
	 * @param HttpServletRequest request, HttpServletResponse response
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/galleryAddLocalFile")
	public void galleryAddLocalFile(HttpServletRequest request, HttpServletResponse response){
		HttpSession session = request.getSession();
		String usr_id = (String)session.getAttribute("member_id");
		Map map = new HashMap();
		
		map.put("usr_id", usr_id);
		map.put("title", request.getParameter("title"));
		map.put("content", request.getParameter("content"));
		map.put("tag", request.getParameter("tag"));
		map.put("srv_type", request.getParameter("srv_type"));
		map.put("survey_surv_start_dt", request.getParameter("survey_surv_start_dt"));
		map.put("survey_surv_end_dt", request.getParameter("survey_surv_end_dt"));
		map.put("support_type", request.getParameter("supportType"));
		String surveyDuplication = request.getParameter("surveyduplication");
		/*map.put("param", request.getParameter("param"));*/
		
		
		
		//자동화공격 방지 start
		//SRV_DT_GALLERYLIST
		String defenceAutometicAttack = galleryService.defenceAutometicAttack(map);		//X면 통과 Y또는 null이면 실패	글은 1분이상 지나야 등록가능함
		
		
		System.out.println(defenceAutometicAttack);
		
		
		if("Y".equals(defenceAutometicAttack) || null == defenceAutometicAttack){
		    //String data_id = galleryService.addGallery(map);

			//설문조사영역 만들기
			//설문조사는 List 형식으로 들어올 것이다.
			//String surveyData = request.getParameter("surveyData");
			
			//galleryService.insertSurvey(surveyData ,data_id,surveyDuplication);
			galleryService.insertImageLocalFile(request);
			
			/*
			if(request.getParameter("srv_type").toString().equals("1") || request.getParameter("srv_type").toString().equals("3")){
				galleryService.insertGalleryImage(request, data_id);
			}else if(request.getParameter("srv_type").toString().equals("2") || request.getParameter("srv_type").toString().equals("4")){
				galleryService.insertImage(request,data_id);
			}else{
				//활용사례 등록일 경우
				galleryService.insertUseBoardRegist(request,data_id);
			}
			*/
			
		}
		
	}
	
	/**
	 * writeGalleryUseCase
	 * 갤러리 추가 (활용사례)
	 * @param 
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/writeGalleryUseCase")
	public String writeGalleryUseCase(){
		return "edu_gallery/galleryUseCase";
	}
	
	
	/**
	 * addGallery
	 * 갤러리 추가 (갤러리 추가)
	 * @param HttpServletRequest request, HttpServletResponse response
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/addGallery")
	public void addGallery(HttpServletRequest request, HttpServletResponse response){
		
	}
	
	//에러메시지 출력 테스트
	@RequestMapping(value="/alertError")
	public void testErrorMsg(HttpServletRequest request, HttpServletResponse response){
		response.setContentType("text/html; charset=utf-8");
    	PrintWriter out = null;
    	try {
    		
    		
    		
    		String message = "파일이 존재하지 않습니다.";
    		
			out = response.getWriter();
			out.println("<!DOCTYPE html><html lang=\"ko\"><head><meta charset=\"utf-8\" http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/><script>alert('" + message + "');</script></head><body></body></html>");
			
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(out != null) {
				out.close();
			}
		}
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useGalleryDialog")
	public String useGalleryDialog(){
		return "edu_gallery/useGalleryDialog";
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/viewUseGalleryDialog")
	public String viewUseGalleryDialog(){
		return "edu_gallery/viewUseGalleryDialog";
						
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/insertGallaryDialog")
	public ModelAndView viewInsertGalleryDialog(HttpServletRequest req,HttpServletResponse res){
		
		/*return "gallery/insertGallaryDialog";*/
		ModelAndView mav = new ModelAndView();
		
		if(req.getParameterMap().containsKey("dataIdList[]")){
			mav.addObject("dataIdList",req.getParameterValues("dataList[]"));
		}
		
		mav.setViewName("edu_gallery/insertGallaryDialog");
		return mav;
						
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/addBookMarkDialog")
	public ModelAndView viewAddBookMarkDialog(HttpServletRequest req, HttpServletResponse res){
		ModelAndView mav = new ModelAndView();
		String[] dataList = req.getParameterValues("dataList[]");
		//System.out.println(dataList); //2017.12.04 [개발팀] 시큐어코딩
		mav.addObject("dataList",dataList);
		mav.setViewName("edu_gallery/addBookMarkDialog");
		return mav;
						
	}
	
	
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/statsGalleryDialog")
	public String statsGalleryDialog(){
		return "edu_gallery/statsGalleryDialog";
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/viewStatsGalleryDialog")
	public String viewStatsGalleryDialog(){
		return "edu_gallery/viewStatsGalleryDialog";
	}
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sgisCensusReq")
	public String viewSgisCensusReq(){
		return "edu_gallery/sgisCensusReq";
	}
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myStatsGalleryDialog")
	public String myStatsGalleryDialog(){
		return "edu_gallery/myStatsGalleryDialog";
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/myUseGalleryDialog")
	public String myUseGalleryDialog(){
		return "edu_gallery/myUseGalleryDialog";
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/bookMarkGallery")
	public String myBookMarkGallery(){
		return "edu_gallery/bookMarkGallery";
	}
	
	
	
	/**
	 * getUseCaseModifyPage
	 * (활용사례) 수정 페이지 이동
	 * @param 
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getUseCaseModifyPage")
	public ModelAndView getUseCaseModifyPage(HttpServletRequest req, HttpServletResponse res){
		HttpSession session = req.getSession();
		String usr_id = (String)session.getAttribute("member_id");
		String data_id = req.getParameter("id");
		Map selectMap = new HashMap();
		selectMap.put("member_id", usr_id);
		selectMap.put("data_id", data_id);
		
		List gallery = galleryService.selectGalleryImg(selectMap);
		Map mainMap = galleryService.selectGallery(selectMap);
		List survList = galleryService.selectGalleryPollDetailList(selectMap);
		Map galleryData = (Map)gallery.get(0);
	
		JSONObject json = new JSONObject();
		JSONArray jsonSurvData = new JSONArray();
		
		try {
			//2017.12.04 [개발팀] 시큐어코딩
			//System.out.println("!.mainResult");
			//System.out.println(mainMap);
			json.put("mainResult", mainMap);
			for(int i =0; i < survList.size(); i ++){
				Map survMap = (Map) survList.get(i);
				Map survData = new HashMap();
				survData.put("survey_surv_id", nullStr( survMap.get("survey_surv_id") ));
				survData.put("data_id",  nullStr( survMap.get("data_id") ));
				survData.put("survey_title",  nullStr( survMap.get("survey_title") ));
				survData.put("ans_serial",  nullStr( survMap.get("ans_serial") ));
				survData.put("ans_content",  nullStr( survMap.get("ans_content") ));
				survData.put("survey_type",  nullStr( survMap.get("survey_type") ));
				jsonSurvData.put(survData);
			}
			
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}
		ModelAndView mav = new ModelAndView();
		mav.addObject("mainData",json);
		mav.addObject("survList",jsonSurvData);
		mav.addObject("img_id", nullStr( galleryData.get("img_id") ));
		mav.addObject("galleryData", nullStr( galleryData.get("param_info") ));
		mav.addObject("data_id",data_id);
		mav.setViewName("edu_gallery/useCaseModifyPage");
		
		return mav;
	}
	
	public String nullStr( Object obj ){
		String str = "";
		if( obj != null ){
			str = obj.toString();
		}
		
		return str;
	}
	
	/**
	 * getUseCaseModifyPage
	 * (활용사례) 수정 페이지 이동
	 * @param 
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getCensusReqModifyPage")
	public ModelAndView getCensusReqModifyPage(HttpServletRequest req, HttpServletResponse res){
		HttpSession session = req.getSession();
		String usr_id = (String)session.getAttribute("member_id");
		String data_id = req.getParameter("id");
		Map selectMap = new HashMap();
		selectMap.put("member_id", usr_id);
		selectMap.put("data_id", data_id);
		List gallery = galleryService.selectGalleryImg(selectMap);
		Map mainMap = galleryService.selectGallery(selectMap);
		Map galleryData = (Map)gallery.get(0);
		JSONObject json = new JSONObject();
		try {
			json.put("mainResult", mainMap);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			logger.info(e);
		}
		
		//2017.12.04 [개발팀] 시큐어코딩
		//System.out.println(gallery.get(0));
		//System.out.println(mainMap);
		
		ModelAndView mav = new ModelAndView();
		
		mav.addObject("mainData",json);
		mav.addObject("img_id",galleryData.get("img_id").toString());
		mav.addObject("galleryData",galleryData.get("param_info").toString());
		mav.addObject("data_id",data_id);
		
		mav.setViewName("edu_gallery/censusReqModifyPage");
		return mav;
	}
	
	/**
	 * getUseCaseModifyPage
	 * (활용사례) 수정 페이지 이동
	 * @param 
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useCaseUpdate")
	public void useCaseUpdate(HttpServletRequest req, HttpServletResponse res){
		HttpSession session = req.getSession();
		String usr_id = (String)session.getAttribute("member_id");
		
		try {
			galleryService.useCaseUpdate(req,usr_id);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}		
	}
	
	/**
	 * updateReqCensusModify
	 * (활용사례) 수정 페이지 이동
	 * @param 
	 * @exception 
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/updateReqCensusModify")
	public void updateReqCensusModify(HttpServletRequest req, HttpServletResponse res){
		
		HttpSession session = req.getSession();
		String usr_id = (String)session.getAttribute("member_id");
		Map mapParameter = new HashMap();
		mapParameter.put("member_id", usr_id);
		mapParameter.put("srv_type", "6");
		mapParameter.put("support_type", "sgis_census_req");
		mapParameter.put("title", req.getParameter("title"));
		mapParameter.put("content", req.getParameter("content"));
		mapParameter.put("param_info", req.getParameter("param"));
		mapParameter.put("data_id", req.getParameter("data_id"));
		mapParameter.put("img_id", req.getParameter("img_id"));
		//System.out.println(req.getParameter("param")); //2017.12.04 [개발팀] 시큐어코딩
		
		galleryService.updateReqCensusData(mapParameter);
		
	}
	
	/**
	 * @throws IOException 
	 * getRefFile
	 * (활용사례) 수정 페이지 이동
	 * @param 
	 * @exception 
	 */
	@RequestMapping(value="/refFileDownLoad",produces="text/plain;charset=UTF-8")
	@ResponseBody
	public void refFileDownLoad(HttpServletRequest req, HttpServletResponse res) throws IOException{
		
		String fileRealName = req.getParameter("fileRealName");
		String fileName = req.getParameter("fileName");
		FileInputStream fis = null;
		OutputStream out = null;
		
		String PROPERTY_PATH = "/globals.properties";
		ClassPathResource resource = new ClassPathResource(PROPERTY_PATH);
		Properties props;
		String file_path = null;
		
		try{
			props = PropertiesLoaderUtils.loadProperties(resource);
			file_path = props.getProperty("Globals.EduGalleryData.refFile.Path");
			String fileStr = file_path+"/"+fileRealName;
			File downLoadFile = new File(fileStr);
			byte[] arBytes = new byte[(int)downLoadFile.length()];
			fis = new FileInputStream(downLoadFile);
			fis.read(arBytes);
			
			String userAgent = req.getHeader("User-Agent");
			res.setContentType("application/file; charset=UTF-8");
			boolean ie = userAgent.indexOf("MSIE") > -1; // MSIE 6~10
            boolean ie11 = userAgent.indexOf("Trident") > -1; // MSIE 11
            
            if (ie || ie11) {
                /*filename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");*/
            	/*fileName = new String(fileStr.getBytes(), "ISO-8859-1");*/
            } else {
                /*fileName = new String(fileStr.getBytes(), "ISO-8859-1");*/
            }
            res.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
            res.setHeader("Content-Transfer-Encoding", "binary");         
            
            out = res.getOutputStream();
            out.write(arBytes);
            out.flush();
			
		}catch (IOException e) {
			logger.info("서버에서 처리중 에러가 발생했습니다.:"+e);
		}finally{
			if(fis != null){
				fis.close();
			}
			if(out != null){
				out.close();
			}
		}
	}
	
	
}