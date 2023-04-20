package kostat.lbdms.ServiceAPI.api;

import java.util.ArrayList;
//import java.security.Security;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.AuthentionService;
import kostat.lbdms.ServiceAPI.controller.service.MemberService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;

/**
 * 1. 기능 : 회원 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/member")
public class MemberAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MemberAPI.class);
	
	@Resource(name="memberService")
	private MemberService memberService;
	
	@Resource(name="authentionService")
	private AuthentionService authentionService;

	private Map tempMemberInfo;
	

	//내정보 조회
	//getMemberInfo.do
	/**
	 * 내 정보 조회 
	 * @param request
	 * @param response
	 * @return member/getMemberInfo.do
	 */
	@RequestMapping(value="/getMemberInfo.do")
	public ModelAndView sessionInfo(HttpServletRequest request, ModelMap model) {
		
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			//String userId = request.getParameter("user_id");
			String user_id = (String) session.getAttribute("user_id");
			
			mapParameter.put("user_id",  user_id);

			//회원정보 조회
			Map memberInfo = (Map)memberService.getMemberInfo(mapParameter);
			
			//사용자가 없을 경우
			if (memberInfo == null) {
				throw new AuthorityException ("아이디 또는 비밀번호를 다시 확인하세요.");
			}
			
			if (memberInfo.get("email") != null) { // 복호화
				String email = (String) memberInfo.get("email");
				email = Security.Decrypt(email);
				memberInfo.put("email", email);
			}
			if (memberInfo.get("tel_no") != null) { // 복호화
				String tel_no = (String) memberInfo.get("tel_no");
				tel_no = Security.Decrypt(tel_no);
				memberInfo.put("tel_no", tel_no);
			}
			if (memberInfo.get("tel_no2") != null) { // 복호화
				String tel_no2 = (String) memberInfo.get("tel_no2");
				tel_no2 = Security.Decrypt(tel_no2);
				memberInfo.put("tel_no2", tel_no2);
			}
		
			model.put("id", "G2G00003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			// 세션 정보 
			model.put("memberInfo", memberInfo);
			
		} 
		catch (AuthorityException e) {
			model.put("id", "G2G00003");
			model.put("errCd", "-100");
			model.put("errMsg", e.getMessage());
        } 
		catch (AuthFailedException e) {
			model.put("id", "G2G00003");
			model.put("errCd", "-200");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("id", "G2G00003");
			model.put("errCd", "-1");
			model.put("errMsg", "서버 처리 중 오류가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
	/**
	 * 그룹사용자 목록 조회
	 * @param request
	 * @param response
	 * @return member/getGroupMemberList.do
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getGroupMemberList.do")
	public ModelAndView getGroupMemberList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		HttpSession session = request.getSession();
		try {
			String user_id = (String) session.getAttribute("user_id");
			mapParameter.put("user_id",  user_id);
			//회원정보 조회
			Map memberInfo = (Map)memberService.getMemberInfo(mapParameter);
			//회원 소속 체크
			String job_pos = (String) memberInfo.get("job_pos");
			mapParameter.put("job_pos",  job_pos);
			String inst_seq = String.valueOf(memberInfo.get("inst_seq")); 
			mapParameter.put("inst_seq",  Integer.parseInt(inst_seq));
			
			
			String startIdx = (String)request.getParameter("startIdx");
			String resultCnt = (String)request.getParameter("resultCnt");
			String sort = (String)request.getParameter("sort");
			String order = (String)request.getParameter("order");
			//String type = (String)request.getParameter("type");
			//String searchText = (String)request.getParameter("searchText");
			
			
			startIdx = Security.cleanXss(startIdx);
			resultCnt = Security.cleanXss(resultCnt);
			sort = Security.cleanXss(sort);
			order = Security.cleanXss(order);
			//type = Security.cleanXss(type);
			//searchText = Security.cleanXss(searchText);
			
			//시작 인덱스
			if (startIdx == null) {
				startIdx = "0";
			}
			
			//한페이지당 결과 수
			if (resultCnt == null) {
				resultCnt = "10";
			}
			
			//정렬 칼럼
			if (sort != null) {
				mapParameter.put("sort", sort);
			}
			
			//정렬 방법
			if (order != null) {
				mapParameter.put("order", order);
			}
			
			
			mapParameter.put("startIdx", Integer.parseInt(startIdx));
			mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
			
			List groupMemberList = (List)memberService.getGroupMemberList(mapParameter);
			
			for (int i = 0; i < groupMemberList.size(); i++) {
				Map tempMemberInfo = (Map)groupMemberList.get(i);
				
				if (tempMemberInfo.get("email") != null) { // 복호화
					String email = (String) tempMemberInfo.get("email");
					email = Security.Decrypt(email);
					if (email.length() > 4) {
						email = email.substring(1, 4);
						email = "*" + email + "****";
					}
					
					tempMemberInfo.put("email", email);
				}
				if (tempMemberInfo.get("tel_no") != null) { // 복호화
					String tel_no = (String) tempMemberInfo.get("tel_no");
					tel_no = Security.Decrypt(tel_no);
					if (tel_no.length() > 4) {
						tel_no = tel_no.substring(0, tel_no.length()-4);
						tel_no = tel_no + "****";
					}
					
					tempMemberInfo.put("tel_no", tel_no);
				}
				if (tempMemberInfo.get("tel_no2") != null) { // 복호화
					String tel_no2 = (String) tempMemberInfo.get("tel_no2");
					tel_no2 = Security.Decrypt(tel_no2);
					
					if (tel_no2.length() > 4) {
						tel_no2 = tel_no2.substring(0, tel_no2.length()-4);
						tel_no2 = tel_no2 + "****";
					}
					
					tempMemberInfo.put("tel_no2", tel_no2);
				}
			}
			
			
			
			model.put("id", "G2G13001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", groupMemberList);
			
		} catch (Exception e) {
			model.put("id", "G2G13001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
	
	//내정보 수정
	//updateMemberInfo.do
	/**
	 * 내정보 수정 API
	 * @param request
	 * @param response
	 * @return /updateMemberInfo.do
	 */
	@RequestMapping(value="/updateMemberInfo.do")
	public ModelAndView updateMemberInfo(HttpServletRequest request, ModelMap model) {
		
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			String user_id = (String) session.getAttribute("user_id");
			mapParameter.put("user_id",  user_id);
			
			String institution = request.getParameter("institution");
			String deptNm = request.getParameter("dept_nm");
			String email = request.getParameter("email");
			String phone = request.getParameter("phone");
			String cellPhone = request.getParameter("cell_phone");
			String instSeq = request.getParameter("inst_seq");
			
			institution = Security.cleanXss(institution);
			deptNm = Security.cleanXss(deptNm);
			email = Security.cleanXss(email);
			phone = Security.cleanXss(phone);
			cellPhone = Security.cleanXss(cellPhone);
			instSeq = Security.cleanXss(instSeq);
			
			//aes 복호화
			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			institution = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, institution);
			deptNm = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, deptNm);
			email = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, email);
			phone = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, phone);
			cellPhone = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, cellPhone);
			instSeq = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, instSeq);
			
			//비밀번호 SHA256 암호화
			email = Security.Encrypt(email);
			cellPhone = Security.Encrypt(cellPhone);
			phone = Security.Encrypt(phone);
			
			int intInstSeq = Integer.parseInt(instSeq);
			
			mapParameter.put("institute", institution);
			mapParameter.put("dept", deptNm);
			mapParameter.put("email", email);
			mapParameter.put("tel_no", cellPhone);
			mapParameter.put("tel_no2", phone);
			/*mapParameter.put("use_sz", 50);
			mapParameter.put("ubis_yn", "N");
			mapParameter.put("user_div", "e");
			mapParameter.put("login_ip", Security.getRemoteAddr(request));*/
			mapParameter.put("inst_seq", intInstSeq);

			//회원정보 수정 수행
			//int result = authentionService.insertSignUp(mapParameter);
			int result = memberService.updateMemberInfo(mapParameter);
			
			if (result == 1) {
				model.put("id", "G2G00002");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
			}else {
				model.put("id", "G2G00002");
				model.put("errCd", "-1");
				model.put("errMsg", "Failed");
			}
		} catch (Exception e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	// 비밀번호 수정
	//updateMemberPw.do
	/**
	 * 내정보 수정 API
	 * @param request
	 * @param response
	 * @return /updateMemberInfo.do
	 */
	@RequestMapping(value="/updateMemberPw.do")
	public ModelAndView updateMemberPw(HttpServletRequest request, ModelMap model) {
		
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			String user_id = (String) session.getAttribute("user_id");
			mapParameter.put("user_id",  user_id);
			
			String pw = request.getParameter("pw");
			
			pw = Security.cleanXss(pw);
			//aes 복호화
			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			pw = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, pw);
			
			//비밀번호 SHA256 암호화
			pw = Security.toHash(user_id, pw);
			
			mapParameter.put("pw", pw);

			//회원정보 수정 수행
			//int result = authentionService.insertSignUp(mapParameter);
			int result = memberService.updateMemberPw(mapParameter);
			
			if (result == 1) {
				model.put("id", "G2G00002");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
			}else {
				model.put("id", "G2G00002");
				model.put("errCd", "-1");
				model.put("errMsg", "Failed");
			}
		} catch (Exception e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}
	
	
	//내정보탈퇴
	//..
	/**
	 * 내정보 삭제 탈퇴 API
	 * @param request
	 * @param response
	 * @return /deleteMemberInfo.do
	 */
	@RequestMapping(value="/deleteMemberInfo.do")
	public ModelAndView deleteMemberInfo(HttpServletRequest request, ModelMap model) {
		
		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		
		try {
			String user_id = (String) session.getAttribute("user_id");
			mapParameter.put("user_id",  user_id);
			
			//회원정보 삭제 탈퇴 수행
			//int result = authentionService.insertSignUp(mapParameter);
			int result = memberService.deleteMemberInfo(mapParameter);
			
			if (result == 1) {
				model.put("id", "G2G00002");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
			}else {
				model.put("id", "G2G00002");
				model.put("errCd", "-1");
				model.put("errMsg", "Failed");
			}
		} catch (Exception e) {
			model.put("id", "G2G00002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}	
	
	
}