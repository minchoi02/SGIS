package kostat.lbdms.ServiceAPI.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kostat.lbdms.ServiceAPI.common.web.core.AjaxResponse;
import kostat.lbdms.ServiceAPI.common.web.model.MyDataAnalysis;
import kostat.lbdms.ServiceAPI.controller.service.AreaAnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.BufferDataAnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.LocationRankAnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataAnalysisService;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Controller
@RequestMapping("/api/my/myData")
public class DataAnalysisAPI {

    private static final Logger logger = LoggerFactory.getLogger(DataAnalysisAPI.class);

	@Resource(name="myDataAnalysisService")
	private MyDataAnalysisService myDataAnalysisService;
	
	@Resource(name="areaAnalysisService")
	private AreaAnalysisService areaAnalysisService;
	
	@Resource(name="bufferDataAnalysisService")
	private BufferDataAnalysisService bufferDataAnalysisService;

	@Resource(name="locationRankAnalysisService")
	private LocationRankAnalysisService locationRankAnalysisService;
	
	
	
    /**
     * <pre>
     * 내데이터 분석데이터 실행
     * </pre>
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/analyzeData.do", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public AjaxResponse<JSONObject> analyzeData(
            @ModelAttribute MyDataAnalysis myDataAnalysis,
            HttpServletRequest request, HttpServletResponse response) {

        logger.info("== 내데이터 분석데이터 실행  ==");

        logger.info("[param]" + myDataAnalysis.toString());

        logger.info("#########" + myDataAnalysis.getCondition());

        MyDataAnalysis iQryCond = new MyDataAnalysis();
        AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
        JSONObject res = new JSONObject();
        JSONArray condition_list = new JSONArray();

        try {

            iQryCond = myDataAnalysis;

			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
            String condition = iQryCond.getCondition();

            if (userid.equals("") || userdiv.equals("")) {
                result.setReason("세션이 종료되었습니다.");
                result.setSuccess(false);
                return result;
            } else {
                iQryCond.setUserid(userid);
                iQryCond.setUserdiv(userdiv);
            }


            if (iQryCond.getData_table_schema() == null) {
                iQryCond.setData_table_schema(userid);
            }


            if (condition != null && !condition.isEmpty() && !condition.equals("[]")) {
                condition_list = JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
            }

            res = myDataAnalysisService.dataAnalysis(iQryCond, condition_list);

            if ("SUCCESS".equals(res.getString("RESULT"))) {
                result.setSuccess(true);
            } else if ("DUPLICATE".equals(res.getString("RESULT"))) {
                result.setReason("DB에 테이블이 존재합니다. 다시 입력해주세요.");
                result.setSuccess(false);
            } else {
                result.setReason(res.getString("MESSAGE"));
                result.setSuccess(false);
            }

            result.setData(res);
        } catch (SystemFailException e) {
            result.setSuccess(false);
            if (e.getMessage().indexOf("겹치는") >= 0) {
                result.setReason("dbl");
            } else if (e.getMessage().indexOf("단일 데이터") >= 0) {
                result.setReason("single");
            } else {
                result.setReason(e.getMessage());
            }
            logger.info(e.getMessage());
        } catch (Exception ex) {
            result.setSuccess(false);
            result.setReason("데이터처리 오류입니다");
            logger.info(ex.getMessage());
        }
        return result;

    }
    

    /**
     * <pre>
     * 연산 분석실행
     * </pre>
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/procAnalyOpt.do", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public AjaxResponse<JSONObject> procAnalyOpt(
            @ModelAttribute MyDataAnalysis iQryCond,
            HttpServletRequest request, HttpServletResponse response) {

        logger.info("== 연산분석 ==");
        JSONObject json = (JSONObject) JSONSerializer.toJSON(iQryCond.getJsonStr());

        AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
        JSONObject res = new JSONObject();

        try {
			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
            json.put("userDiv", userdiv);

            if (userid.equals("") || userdiv.equals("")) {
                result.setReason("세션이 종료되었습니다.");
                result.setSuccess(false);
                return result;
            }

            res = myDataAnalysisService.procAnalyOpt(json, userid);

            if (res != null && "SUCCESS".equals(res.getString("RESULT"))) {
                result.setSuccess(true);
            } else {
                result.setSuccess(false);
                result.setReason(res.getString("MESSAGE"));
            }
            result.setData(res);

        } catch (SystemFailException e) {
            result.setSuccess(false);
            result.setReason(e.getMessage());
            logger.error(e.getMessage());
        } catch (Exception ex) {
            result.setSuccess(false);
            result.setReason("데이터처리 오류입니다");
            logger.error(ex.getMessage());
        }
        return result;

    }

    /**
     * <pre>
     * 내데이터 분석데이터 실행
     * </pre>
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/analyzeAreaData.do", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public AjaxResponse<JSONObject> analyzeAreaData(
            @ModelAttribute MyDataAnalysis myDataAnalysis,
            HttpServletRequest request, HttpServletResponse response) {

        logger.info("== 내데이터 분석데이터 실행  ==");

        logger.info("[param]" + myDataAnalysis.toString());

        logger.info("#########" + myDataAnalysis.getCondition());

        MyDataAnalysis iQryCond = new MyDataAnalysis();
        AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
        JSONObject res = new JSONObject();
        JSONArray condition_list = new JSONArray();

        try {

            iQryCond = myDataAnalysis;

			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
            String condition = iQryCond.getCondition();

            if (userid.equals("") || userdiv.equals("")) {
                result.setReason("세션이 종료되었습니다.");
                result.setSuccess(false);
                return result;
            } else {
                iQryCond.setUserid(userid);
                iQryCond.setUserdiv(userdiv);
            }

            if (iQryCond.getData_table_schema() == null) {
                iQryCond.setData_table_schema(userid);
            }

            System.out.println(">>>>>>>>>>>>>>>>");
            
            res = areaAnalysisService.analyze(iQryCond);
            System.out.println(res);

            if ("SUCCESS".equals(res.getString("RESULT"))) {
                result.setSuccess(true);
            } else if ("DUPLICATE".equals(res.getString("RESULT"))) {
                result.setReason("DB에 테이블이 존재합니다. 다시 입력해주세요.");
                result.setSuccess(false);
            } else {
                result.setReason(res.getString("MESSAGE"));
                result.setSuccess(false);
            }

            result.setData(res);
        } catch (SystemFailException e) {
            result.setSuccess(false);
            if (e.getMessage().indexOf("겹치는") >= 0) {
                result.setReason("dbl");
            } else if (e.getMessage().indexOf("단일 데이터") >= 0) {
                result.setReason("single");
            } else {
                result.setReason(e.getMessage());
            }
            logger.info(e.getMessage());
        } catch (Exception ex) {
            result.setSuccess(false);
            result.setReason("데이터처리 오류입니다");
            logger.info(ex.getMessage());
        }
        return result;

    }
    
    
    /**
     * <pre>
     * 입지계수 분석 실행
     * </pre>
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/locationRank.do", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public AjaxResponse<JSONObject> locationRank(
            @ModelAttribute MyDataAnalysis myDataAnalysis,
            HttpServletRequest request, HttpServletResponse response) {

        logger.info("== 입지계수 분석 실행  ==");

        logger.info("[param]" + myDataAnalysis.toString());

        logger.info("#########" + myDataAnalysis.getCondition());

        MyDataAnalysis iQryCond = new MyDataAnalysis();
        AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
        JSONObject res = new JSONObject();
        JSONArray condition_list = new JSONArray();

        try {

            iQryCond = myDataAnalysis;

			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
            String condition = iQryCond.getCondition();


            if (userid.equals("") || userdiv.equals("")) {
                result.setReason("세션이 종료되었습니다.");
                result.setSuccess(false);
                return result;
            } else {
                iQryCond.setUserid(userid);
                iQryCond.setUserdiv(userdiv);
            }


            if (iQryCond.getData_table_schema() == null) {
                iQryCond.setData_table_schema(userid);
            }


            if (condition != null && !condition.isEmpty() && !condition.equals("[]")) {
                condition_list = JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
            }
            
            res = locationRankAnalysisService.rankAnalysis(iQryCond, condition_list);

            if ("SUCCESS".equals(res.getString("RESULT"))) {
                result.setSuccess(true);
            } else if ("DUPLICATE".equals(res.getString("RESULT"))) {
                result.setReason("DB에 테이블이 존재합니다. 다시 입력해주세요.");
                result.setSuccess(false);
            } else {
                result.setReason(res.getString("MESSAGE"));
                result.setSuccess(false);
            }

            result.setData(res);
        } catch (SystemFailException e) {
            result.setSuccess(false);
            if (e.getMessage().indexOf("겹치는") >= 0) {
                result.setReason("dbl");
            } else if (e.getMessage().indexOf("단일 데이터") >= 0) {
                result.setReason("single");
            } else {
                result.setReason(e.getMessage());
            }
            logger.info(e.getMessage());
        } catch (Exception ex) {
            result.setSuccess(false);
            result.setReason("데이터처리 오류입니다");
            logger.info(ex.getMessage());
        }
        return result;

    }
    
    /**
     * <pre>
     * 버퍼 분석 실행
     * </pre>
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/analyzeBufferData.do", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public AjaxResponse<JSONObject> analyzeBufferData(
            @ModelAttribute MyDataAnalysis myDataAnalysis,
            HttpServletRequest request, HttpServletResponse response) {

        logger.info("== 버퍼 분석데이터 실행  ==");

        logger.info("[param]" + myDataAnalysis.toString());

        logger.info("#########" + myDataAnalysis.getCondition());

        MyDataAnalysis iQryCond = new MyDataAnalysis();
        AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
        JSONObject res = new JSONObject();
        JSONArray condition_list = new JSONArray();

        try {

            iQryCond = myDataAnalysis;

			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
            String condition = iQryCond.getCondition();


            if (userid.equals("") || userdiv.equals("")) {
                result.setReason("세션이 종료되었습니다.");
                result.setSuccess(false);
                return result;
            } else {
                iQryCond.setUserid(userid);
                iQryCond.setUserdiv(userdiv);
            }


            if (iQryCond.getData_table_schema() == null) {
                iQryCond.setData_table_schema(userid);
            }


            if (condition != null && !condition.isEmpty() && !condition.equals("[]")) {
                condition_list = JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
            }
        	
            res = bufferDataAnalysisService.bufferDataAnalysis(iQryCond);

            if ("SUCCESS".equals(res.getString("RESULT"))) {
                result.setSuccess(true);
            } else if ("DUPLICATE".equals(res.getString("RESULT"))) {
                result.setReason("DB에 테이블이 존재합니다. 다시 입력해주세요.");
                result.setSuccess(false);
            } else {
                result.setReason(res.getString("MESSAGE"));
                result.setSuccess(false);
            }

            result.setData(res);
        } catch (SystemFailException e) {
        	logger.error(e.getMessage(), e);
        	
            result.setSuccess(false);
            if (e.getMessage().indexOf("겹치는") >= 0) {
                result.setReason("dbl");
            } else if (e.getMessage().indexOf("단일 데이터") >= 0) {
                result.setReason("single");
            } else {
                result.setReason(e.getMessage());
            }
            logger.info(e.getMessage());
        } catch (Exception ex) {
        	logger.error(ex.getMessage(), ex);
        	
            result.setSuccess(false);
            result.setReason("데이터처리 오류입니다");
            logger.info(ex.getMessage());
        }
        return result;

    }
}
