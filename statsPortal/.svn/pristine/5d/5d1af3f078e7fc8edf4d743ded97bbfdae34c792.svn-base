package kostat.sop.ServiceAPI.api.board;


import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.CaptchaServiceSingleton;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;


public class BoardRegist2 extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BoardRegist2.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8003_2";
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
		priority_disp_yn,
		input_code
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
		Boolean isResponseCorrect = false;
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");			

			Map mapParameter = getParameterMap(req);

			
			logger.info("mapParameter before [" + mapParameter + "] ");
			_checkNullParameterValue(mapParameter);			
			logger.info("mapParameter after [" + mapParameter + "] ");
			
			String captchaId = httpSession.getId();
			
			String response = (String) mapParameter.get(MustParam.input_code.name());
			
			String hostName = InetAddress.getLocalHost().getHostName();
//			if("sgis_dev".equals(hostName) || "mangWASZ".equals(hostName)) {
				isResponseCorrect = true; //개발서버
//			} else {
//				isResponseCorrect = CaptchaServiceSingleton.getInstance().validateResponseForID(captchaId, response); //운영
//			}
			
			if (!isResponseCorrect) {
				throw new ApiException("보안코드를 다시 입력하여 주세요.");
			}else {
				
				
				// 보안 이미지 수정및 값 변경하여 자동화 공격 방지
				// call the ImageCaptchaService getChallenge method
				BufferedImage challenge = CaptchaServiceSingleton.getInstance().getImageChallengeForID(captchaId, req.getLocale());
				ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
				// a jpeg encoder
				JPEGImageEncoder jpegEncoder = JPEGCodec.createJPEGEncoder(jpegOutputStream);
				jpegEncoder.encode(challenge);

				String board_cd    = mapParameter.get(MustParam.board_cd.name()).toString();
				
				String regMemberId = (String)httpSession.getAttribute("member_id");
				if(regMemberId == null) {
					regMemberId = "guest";
				}
				
				Map tempMap = new HashMap();
				tempMap.put("board_cd", board_cd);
				
				Integer postNo = (Integer) session.selectOne("board.getTopPostNumber", tempMap);
				if(postNo == null) {
					postNo = 0;
				}
				++postNo;
				
				mapParameter.put("board_cd", board_cd);
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
				
				if(depth == 0 && order == 0) {
					mapParameter.put("parent_post_id", postNo);
				}
				
				session.insert("board.boardRegist", mapParameter);
				
				// 웹취약점 연속공격 방지 
				Random random = new Random();
				int ran = random.nextInt(9999);
				httpSession.setAttribute("rand", ran);
				
			}
	
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