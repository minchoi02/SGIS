package kostat.sop.ServiceAPI.api.qa.reqBoard;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.common.mapper.CommonDao;
import kostat.sop.ServiceAPI.api.qa.reqBoard.mapper.ReqBoardDao;
import kostat.sop.ServiceAPI.common.controller.AbsGridQuery;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;

/**
 * 
 * @ClassName: SearchReqBoard
 * @Description：운영이력관리 관리
 * 
 * @author jrj
 * @date：2018.01.30
 * @version V1.0
 * 
 */
public class SearchReqBoard extends AbsGridQuery<Map> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(SearchReqBoard.class);
	
	@Resource
	private ReqBoardDao reqBoardDao;

	@Resource
	private CommonDao commonDao;
	
	@Override
	public String getApiId() {
		return "reqboard_search";
	}

	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Map paramMap = getParameterMap(req);
			_transPagging(paramMap);
			
			Map resultMap = new HashMap<String,Object>();
			resultMap.put("rows", reqBoardDao.searchReqBoard( paramMap ) );
			resultMap.put("total", reqBoardDao.searchReqBoardCount( paramMap ) );
			
//			Map codeMap = new HashMap<String, Object>();
//			codeMap.put("", arg1)
//			resultMap.put( commonDao.getBCommonCode(paramMap) );
			
			return resultMap;
		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
	}

	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}

	private enum MustParam {
		sort, order, page, rows
	}

	private enum OptionParam {
		REQ_DIV_CD, REQ_PRGRS_STATS_CD, REQ_STARTDATE, REQ_ENDDATE, searchWordType, searchWord
	}

}
