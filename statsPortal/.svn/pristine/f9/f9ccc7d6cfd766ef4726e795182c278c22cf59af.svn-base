package kostat.sop.ServiceAPI.api.board;

import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 모바일 개선사상 삭제시 BoardQnARegist.java 삭제
 * */

public class BoardQnARegist extends AbsQuery<Map>{
	private static final Log logger = LogFactory.getLog(BoardRegist.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8016";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.ALL;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		board_cd,
		post_depth,
		post_order,
		post_title,
		post_content,
		priority_disp_yn
	}
	
	enum OptionParam
	{
		post_title_en,
		low_rank_s_class_cd,
		parent_post_id,
		file_yn
	}
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");			

			Map mapParameter = getParameterMap(req);

			
			logger.info("mapParameter before [" + mapParameter + "] ");
			_checkNullParameterValue(mapParameter);			
			logger.info("mapParameter after [" + mapParameter + "] ");
			
			String captchaId = httpSession.getId();
			
			
			String hostName = InetAddress.getLocalHost().getHostName();
			
				
				
				
				String regMemberId = (String)httpSession.getAttribute("member_id");
				if(regMemberId == null) {
					regMemberId = "guest";
				}
				
				Map tempMap = new HashMap();

				tempMap.put("board_cd", "MQNA_999");
				Integer postNo = (Integer) session.selectOne("board.getTopPostNumber", tempMap);
				if(postNo == null) {
					postNo = 0;
				}
				++postNo;
				tempMap.put("board_cd", "MQNA_999");
				mapParameter.put("post_no", postNo);
				mapParameter.put("reg_member_id", regMemberId);
				
				Integer depth = Integer.parseInt((String) mapParameter.get(MustParam.post_depth.name()));
				Integer order = Integer.parseInt((String) mapParameter.get(MustParam.post_order.name()));
				
				mapParameter.put(MustParam.post_depth.name(), depth);
				mapParameter.put(MustParam.post_order.name(), order);
				
				String boardTitle = "";
				boardTitle = mapParameter.get(MustParam.post_title.name()).toString();
				boardTitle = Security.cleanXss(boardTitle);
				mapParameter.put(MustParam.post_title.name(), boardTitle);
				
				String boardContent = "";
				boardContent = mapParameter.get(MustParam.post_content.name()).toString();
				boardContent = Security.cleanXss(boardContent);
				mapParameter.put(MustParam.post_content.name(), boardContent);
				mapParameter.put(MustParam.board_cd.name(), "MQNA_999");
				if(depth == 0 && order == 0) {
					mapParameter.put("parent_post_id", postNo);
				}
				
				session.insert("board.boardQnARegist", mapParameter);
			
	
			logger.info("END Query - TXID[" + getApiId() + "] ");
			res.sendRedirect(((HttpServletRequest) res).getContextPath() + "/m2020/map/board/qna.sgis"); 
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
	
	private void decodeParams(Map mapParameter) {
		Set<String> keySet = mapParameter.keySet();
		Iterator<String> itr = keySet.iterator();
		
		while(itr.hasNext()) {
			String key = itr.next();
			String value = (String) mapParameter.get(key);
			
			try {
				mapParameter.put(key, new String(value.getBytes(), "EUC-KR"));
			} catch (UnsupportedEncodingException e) {
				logger.error(e);
				throw new ApiException(StringUtil.getErrMsg());
			}
		}
	}
}
