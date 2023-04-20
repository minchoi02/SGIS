package kostat.lbdms.ServiceAPI.api;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.model.urbar.BndDmcVO;
import kostat.lbdms.ServiceAPI.controller.service.BndDmcService;
import kostat.lbdms.ServiceAPI.controller.service.DnmtService;
import kostat.lbdms.ServiceAPI.controller.service.TimeSeriesService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;





@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/urban/")
public class UrbanAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(UrbanAPI.class);


	@Resource(name = "bndDmcService")
    private BndDmcService bndDmcService;


	@Resource(name = "dnmtService")
     private DnmtService dnmtService;



    @Resource(name = "timeSeriesService")
     private TimeSeriesService timeSeriesService;

	/**
	 * 목록 조회
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getBndList.do")
	public ModelAndView getBndList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("selectViewCount");
			String searchText = (String)request.getParameter("searchText");
			String startDay = (String)request.getParameter("startDay");
			String endDay = (String)request.getParameter("endDay");

			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			searchText = Security.cleanXss(searchText);
			startDay = Security.cleanXss(startDay);
			endDay = Security.cleanXss(endDay);

			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}

			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "10";
			}


			//검색어
			mapParameter.put("startDay", startDay);
			mapParameter.put("endDay", endDay);
			mapParameter.put("searchText", searchText);
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));

			List bndList = (List)bndDmcService.selectBndInfoList(mapParameter);

			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", bndList);
		} catch (Exception e) {
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}

	/**
	 * 단위업무 상세정보 조회
	 * @param request
	 * @param response
	 * @return /view/urban/bndInfoDetail.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/demarcation/demarcationDetail.do")
	public ModelAndView workSetDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			String bnd_setup_seq = (String)request.getParameter("project_id");
			bnd_setup_seq = Security.cleanXss(bnd_setup_seq);

			if (bnd_setup_seq == null) {
				throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
			}

			mapParameter.put("projectKey", Long.parseLong(bnd_setup_seq));

			System.out.println(mapParameter);
			//상세정보 조회
			Map dataMap = (Map) bndDmcService.selectBndInfoDetail(mapParameter);
			System.out.println(dataMap);
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", dataMap);

		}
		catch (AuthFailedException e) {
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}

	/**
	 * 단위업무 등록
	 * @param request
	 * @param response
	 * @return createBnd.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Interceptor("PageCallReg")
	@RequestMapping(value="/createBnd.do")
	public ModelAndView createBnd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request);
		    JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
		    Gson gson = new Gson();
		    Map mapParameter = gson.fromJson(jsonStr, Map.class);
		    System.out.println(mapParameter);
		    bndDmcService.createBndInfo(mapParameter);

			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");

		}
		catch (AuthFailedException e) {
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}

	/**
	 * 단위업무 삭제
	 * @param request
	 * @param response
	 * @return deleteWorkSet.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/deleteBnd.do")
	public ModelAndView deleteBnd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
		    BndDmcVO bndVO = new BndDmcVO();
		    String bnd_setup_seq = (String)request.getParameter("project_id");
		    System.out.println(bnd_setup_seq);
		    HashMap mapParameter = new HashMap();
		    mapParameter.put("projectKey", Long.parseLong(bnd_setup_seq));
		    bndVO.setProjectKey(Integer.parseInt(bnd_setup_seq));
		    bndDmcService.deleteBnd(mapParameter);
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", "성공");

		}
		catch (AuthFailedException e) {
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}

		return new ModelAndView("jsonV", model);
	}

	@Interceptor("PageCallReg")
    @RequestMapping(value="/getDnmtList.do")
    public ModelAndView getDnmtList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        Map mapParameter = new HashMap();
        try {
            String startIdx = (String)request.getParameter("startIdx");
            String resultCnt = (String)request.getParameter("selectViewCount");
            String searchText = (String)request.getParameter("searchText");
            String startDay = (String)request.getParameter("startDay");
            String endDay = (String)request.getParameter("endDay");

            startDay = Security.cleanXss(startDay);
            endDay = Security.cleanXss(endDay);
            startIdx = Security.cleanXss(startIdx);
            resultCnt = Security.cleanXss(resultCnt);
            searchText = Security.cleanXss(searchText);

            //시작 인덱스
            if (startIdx == null) {
                startIdx = "0";
            }
            //한페이지당 결과 수
            if (resultCnt == null) {
                resultCnt = "10";
            }

            //검색어
            mapParameter.put("startDay", startDay);
            mapParameter.put("endDay", endDay);
            mapParameter.put("searchText", searchText);
            mapParameter.put("startIdx", Integer.parseInt(startIdx));
            mapParameter.put("resultCnt", Integer.parseInt(resultCnt));

            List dnmtList = (List)dnmtService.selectDnmtInfoList(mapParameter);

            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", dnmtList);
        } catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }

	/**
     * 단위업무 등록
     * @param request
     * @param response
     * @return createDnmt.do
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Interceptor("PageCallReg")
    @RequestMapping(value="/createDnmt.do")
    public ModelAndView createDnmt(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        try {
            String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request);
            JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
            Gson gson = new Gson();
            Map mapParameter = gson.fromJson(jsonStr, Map.class);
            System.out.println(mapParameter);
            dnmtService.createDnmtInfo(mapParameter);

            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", "성공");

        }
        catch (AuthFailedException e) {
            model.put("errCd", "-200");
            model.put("errMsg", e.getMessage());
        }
        catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }

    /**
     * 단위업무 상세정보 조회
     * @param request
     * @param response
     * @return /view/urban/getDnmtDetail.do
     */
    @Interceptor("PageCallReg")
    @RequestMapping(value="/getDnmtDetail.do")
    public ModelAndView getDnmtDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        Map mapParameter = new HashMap();
        try {
            String dnmt_setup_seq = (String)request.getParameter("project_id");
            System.out.println(dnmt_setup_seq);
            dnmt_setup_seq = Security.cleanXss(dnmt_setup_seq);

            if (dnmt_setup_seq == null) {
                throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
            }

            mapParameter.put("projectKey", Long.parseLong(dnmt_setup_seq));

            System.out.println(mapParameter);
            //상세정보 조회
            Map dataMap = (Map) dnmtService.selectDnmtDetail(mapParameter);
            System.out.println(dataMap);
            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", dataMap);

        }
        catch (AuthFailedException e) {
            model.put("errCd", "-200");
            model.put("errMsg", e.getMessage());
        }
        catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }


    @Interceptor("PageCallReg")
    @RequestMapping(value="/getTimeSeriesList.do")
    public ModelAndView getTimeSeriesList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        Map mapParameter = new HashMap();
        try {
            String startIdx = (String)request.getParameter("startIdx");
            String resultCnt = (String)request.getParameter("selectViewCount");
            String searchText = (String)request.getParameter("searchText");
            String startDay = (String)request.getParameter("startDay");
            String endDay = (String)request.getParameter("endDay");

            startDay = Security.cleanXss(startDay);
            endDay = Security.cleanXss(endDay);
            startIdx = Security.cleanXss(startIdx);
            resultCnt = Security.cleanXss(resultCnt);
            searchText = Security.cleanXss(searchText);

            //시작 인덱스
            if (startIdx == null) {
                startIdx = "0";
            }
            //한페이지당 결과 수
            if (resultCnt == null) {
                resultCnt = "10";
            }

            //검색어
            mapParameter.put("startDay", startDay);
            mapParameter.put("endDay", endDay);
            mapParameter.put("searchText", searchText);
            mapParameter.put("startIdx", Integer.parseInt(startIdx));
            mapParameter.put("resultCnt", Integer.parseInt(resultCnt));

            List tmList = (List)timeSeriesService.selectTsInfoList(mapParameter);

            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", tmList);
        } catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }

    /**
     * 단위업무 등록
     * @param request
     * @param response
     * @return createDnmt.do
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Interceptor("PageCallReg")
    @RequestMapping(value="/createTimeSeries.do")
    public ModelAndView createTimeSeries(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        try {
            String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request);
            JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
            Gson gson = new Gson();
            Map mapParameter = gson.fromJson(jsonStr, Map.class);
            System.out.println(mapParameter);
            timeSeriesService.createTmInfo(mapParameter);

            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", "성공");

        }
        catch (AuthFailedException e) {
            model.put("errCd", "-200");
            model.put("errMsg", e.getMessage());
        }
        catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }

    /**
     * 단위업무 상세정보 조회
     * @param request
     * @param response
     * @return /view/urban/bndInfoDetail.do
     */
    @Interceptor("PageCallReg")
    @RequestMapping(value="/getTimeSeriesDetail.do")
    public ModelAndView getTimeSeriesDetail(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        Map mapParameter = new HashMap();
        try {
            String ts_setup_seq = (String)request.getParameter("project_id");
            ts_setup_seq = Security.cleanXss(ts_setup_seq);

            if (ts_setup_seq == null) {
                throw new AuthorityException ("게시물정보가 정확하지 않습니다.");
            }

            mapParameter.put("projectKey", Long.parseLong(ts_setup_seq));

            System.out.println(mapParameter);
            //상세정보 조회
            Map dataMap = (Map) timeSeriesService.selectTsInfoDetail(mapParameter);
            System.out.println(dataMap);
            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", dataMap);

        }
        catch (AuthFailedException e) {
            model.put("errCd", "-200");
            model.put("errMsg", e.getMessage());
        }
        catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }


    @Interceptor("PageCallReg")
    @RequestMapping(value="/getTimeSeriesResultList.do")
    public ModelAndView getTimeSeriesResultList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        Map mapParameter = new HashMap();
        try {
            String urbarType = (String)request.getParameter("urbarType");
            mapParameter.put("urbar_type", urbarType);
            List tmList = (List)timeSeriesService.selectResult(mapParameter);

            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", tmList);
        } catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }

    @Interceptor("PageCallReg")
    @RequestMapping(value="/getNamingList.do")
    public ModelAndView getNamingList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
        try {
            String jsonStr = (String)request.getParameter("jsonStr"); //JsonUtil.readJSONStringFromRequestBody(request);
            JsonObject jsonObj = new JsonParser().parse(jsonStr).getAsJsonObject();
            Gson gson = new Gson();
            Map mapParameter = gson.fromJson(jsonStr, Map.class);
            System.out.println(mapParameter);
            List namingList =dnmtService.selectNamingList(mapParameter);

            model.put("errCd", "0");
            model.put("errMsg", "Success");
            model.put("result", namingList);

        }
        catch (AuthFailedException e) {
            model.put("errCd", "-200");
            model.put("errMsg", e.getMessage());
        }
        catch (Exception e) {
            model.put("errCd", "-1");
            model.put("errMsg", "처리 중 에러가 발생하였습니다.");
            logger.info(e);
        }
        finally {
        }
        return new ModelAndView("jsonV", model);
    }



}