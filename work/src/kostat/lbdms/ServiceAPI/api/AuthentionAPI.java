package kostat.lbdms.ServiceAPI.api;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.EncryptUtil;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.common.web.util.LoginUtil;
import kostat.lbdms.ServiceAPI.controller.model.system.LoginVO;
import kostat.lbdms.ServiceAPI.controller.model.system.MemberVO;
import kostat.lbdms.ServiceAPI.controller.service.*;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 1. 기능 : 로그인 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b>
 *     작성자 : 권차욱 1.0, 2017/07/03  초기 작성
 *  </pre>
 *
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/")
public class AuthentionAPI {

	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(AuthentionAPI.class);

	public static Hashtable<String, Object> loginUsers = new Hashtable<String, Object>();

	@Resource(name="authentionService")
	private AuthentionService authentionService;

	@Resource(name="memberService")
	private MemberService memberService;

	@Resource(name="myDataService")
	private MyDataService myDataService;

	@Resource(name="ubisMemberService")
	private UbisMemberService ubisMemberService;

	@Resource(name = "dataCreateService")
	private DataCreateService dataCreateService;

	/*
	 * 로그인 아이디 중복체크 API
	 * @param request
	 * @param response
	 * @return view/auth/login/loginIdCheck.do
	 */
	@RequestMapping(value="/loginIdCheck.do")
	public ModelAndView doLoginIdCheck(HttpServletRequest request, ModelMap model) {
		Map mapParameter = new HashMap();

		try {
			String userId = request.getParameter("user_id");
			userId = Security.cleanXss(userId);

			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			userId = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userId).toLowerCase();
			mapParameter.put("user_id", userId);

			int result = (int)authentionService.getLoginIdCheck(mapParameter);
			if (result == 0) {
				model.put("id", "G2G00001");
				model.put("errCd", "0");
				model.put("errMsg", "사용할 수 있는 아이디 입니다.");
				model.put("result", result);
			}else {
				model.put("id", "G2G00001");
				model.put("errCd", "0");
				model.put("errMsg", "중복 아이디가 있습니다.");
				model.put("result", result);
			}
		} catch (Exception e) {
			model.put("id", "G2G00001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}

	/**
	 * 회원가입 API
	 * @param request
	 * @param response
	 * @return login/auth/signUp.do
	 */
	@RequestMapping(value="/signUp.do")
	public ModelAndView doSignUp(HttpServletRequest request, ModelMap model) {
		Map mapParameter = new HashMap();

		try {
			String userId = request.getParameter("user_id");
			String coderw = request.getParameter("coderw");
			String userNm = request.getParameter("user_nm");
			String institution = request.getParameter("institution");
			String deptNm = request.getParameter("dept_nm");
			String email = request.getParameter("email");
			String phone = request.getParameter("phone");
			String cellPhone = request.getParameter("cell_phone");
			String instSeq = request.getParameter("inst_seq");

			userId = Security.cleanXss(userId);
			coderw = Security.cleanXss(coderw);
			userNm = Security.cleanXss(userNm);
			institution = Security.cleanXss(institution);
			deptNm = Security.cleanXss(deptNm);
			email = Security.cleanXss(email);
			phone = Security.cleanXss(phone);
			cellPhone = Security.cleanXss(cellPhone);
			instSeq = Security.cleanXss(instSeq);

			//aes 복호화
			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			userId = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userId).toLowerCase();
			coderw = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, coderw);
			userNm = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userNm);
			institution = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, institution);
			deptNm = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, deptNm);
			email = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, email);
			phone = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, phone);
			cellPhone = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, cellPhone);

			//비밀번호 SHA256 암호화
			coderw = Security.toHash(userId, coderw);
			email = Security.Encrypt(email);
			cellPhone = Security.Encrypt(cellPhone);
			phone = Security.Encrypt(phone);

			mapParameter.put("user_id",  userId);
			mapParameter.put("user_pw", coderw);
			mapParameter.put("user_nm", userNm);
			mapParameter.put("institute", institution);
			mapParameter.put("dept", deptNm);
			mapParameter.put("email", email);
			mapParameter.put("tel_no", cellPhone);
			mapParameter.put("tel_no2", phone);
			mapParameter.put("use_sz", 50);
			mapParameter.put("ubis_yn", "N");
			mapParameter.put("user_div", "e");
			mapParameter.put("login_ip", Security.getRemoteAddr(request));
			mapParameter.put("inst_seq", Long.parseLong(instSeq));

			//회원가입 수행
			int result = authentionService.insertSignUp(mapParameter);
			//대시보드 설정 최초 저장
			int dashResult = myDataService.insertDashBoardOpt(mapParameter);

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

	/**
	 * 로그인 API
	 * @param request
	 * @param response
	 * @return login/auth/login.do
	 */
	@RequestMapping(value="/login.do")
	public ModelAndView doLogin(HttpServletRequest request, ModelMap model) {

		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();
		String ipAddr = Security.getRemoteAddr(request);

		try {
			String userId = request.getParameter("user_id");
			String coderw = request.getParameter("coderw");

			userId = Security.cleanXss(userId);
			coderw = Security.cleanXss(coderw);

			//aes 복호화
			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			String userPw = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, coderw);
			//비밀번호 SHA256 암호화
			System.out.println(userPw);
			userPw = Security.toHash(userId, userPw);

			mapParameter.put("user_id",  userId);
			mapParameter.put("user_pw", userPw);
			mapParameter.put("login_ip", ipAddr);
			//mapParameter.put("pw", userPw);
			//memberService.updateMemberPw(mapParameter);

			//회원정보 조회
			Map memberInfo = (Map)memberService.getMemberInfo(mapParameter);
			System.out.println(memberInfo.toString());

			//사용자가 없을 경우
			if (memberInfo == null) {
				throw new AuthorityException ("아이디 또는 비밀번호를 다시 확인하세요.");
			}

			String pw = (String)memberInfo.get("user_pw");
			//비밀번호가 일치하지 않을 경우
//			if (!userPw.equals(pw)) {
//				throw new AuthorityException ("비밀번호를 다시 확인하세요.<br/>비밀번호는 대소문자를 구분합니다.");
//			}

			//세션저장
			session.setAttribute("user_id", memberInfo.get("user_id"));		//아이디
			session.setAttribute("coderw", coderw); //비밀번호
			session.setAttribute("user_nm", memberInfo.get("user_nm"));		//이름
			session.setAttribute("user_div", memberInfo.get("user_div"));	//회원등급
			session.setAttribute("ubis_yn", memberInfo.get("ubis_yn"));	//ubis회원여부
			session.setAttribute("access_session_id", session.getId());

			LoginVO login = new LoginVO();
			MemberVO membervo = new MemberVO();
            membervo.setUser_pw(pw);
            membervo.setEmail("");
            membervo.setTel_no("");
            membervo.setTel_no2("");
            membervo.setUser_id("" + memberInfo.get("user_id"));
            membervo.setUser_nm("" + memberInfo.get("user_nm"));
            membervo.setUser_div("" + memberInfo.get("user_div"));
            membervo.setUbis_yn("" + memberInfo.get("ubis_yn"));
            login.setId("" + memberInfo.get("user_id"));
            login.setMember(membervo);
            session.setAttribute("login", login);

			//대시보드 표출 옵션 정보 조회 및 초회 생성
			List dashBoardList = (List)myDataService.getDashBoardOptList(mapParameter); // 대시보드 표출 설정
			if (dashBoardList.isEmpty() == true ) {
				int dashResult = myDataService.insertDashBoardOpt(mapParameter);
			}

			// 세션내역생성
            synchronized (loginUsers) {
                loginUsers.put((String)memberInfo.get("user_id"), session);
            }

			model.put("id", "G2G00003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");

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
	 * ubis 로그인 API
	 * @param request
	 * @param response
	 * @return login/auth/ubisLogin.do
	 */
	@SuppressWarnings({ "unused", "unchecked", "rawtypes" })
	@RequestMapping(value="/ubisLogin.do")
	public ModelAndView doUbisLogin(HttpServletRequest request, ModelMap model) {

		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();

		String ipAddr = Security.getRemoteAddr(request);
		try {
			String userId = request.getParameter("user_id");
			String coderw = request.getParameter("coderw");

			userId = Security.cleanXss(userId);
			coderw = Security.cleanXss(coderw);

			//aes 복호화
			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			userId = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userId);
			String userPw = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, coderw);

			String tmpId =  "ubisuser_" + userId;
			Map ubisMap = new HashMap();
			ubisMap.put("user_id", tmpId);

			Map memberInfo = (Map)memberService.getMemberInfo(ubisMap);

			//System.out.println("ubis_1>"+memberInfo.toString());

			mapParameter.put("user_id", userId);
			mapParameter.put("user_pw", EncryptUtil.encryptPassword("ECCD215AA@", userPw));

			Map ubisMemberInfo = (Map)ubisMemberService.getUbisUserInfo(mapParameter);
			System.out.println("ubis_info>"+mapParameter.toString()+">"+ubisMemberInfo.toString());

			if (ubisMemberInfo == null) {
				throw new AuthorityException ("UBIS 회원이 아닙니다.");
			}


			//회원정보 테이블에 아이디가 없을 경우
			if (memberInfo == null) {
				//Map ubisMemberInfo = (Map)ubisMemberService.getUbisUserInfo(mapParameter);
				String ubisNm = (String)ubisMemberInfo.get("MEMBER_NM");
				String jobPos = (String)ubisMemberInfo.get("MEMBER_JOB_POS");

				//비밀번호 SHA256 암호화
				userPw = Security.toHash(tmpId, userPw);
				ubisMap.put("user_pw", userPw);
				ubisMap.put("user_nm", ubisNm.trim());
				ubisMap.put("email", "");
				ubisMap.put("tel_no", Security.Encrypt("01000000000"));
				ubisMap.put("tel_no2", Security.Encrypt("0200000000"));
				ubisMap.put("institute", "kostat");
				ubisMap.put("inst_seq", 4);
				ubisMap.put("user_div", "i");
				ubisMap.put("ubis_yn", "Y");
				ubisMap.put("use_sz", 5);
				ubisMap.put("job_pos", jobPos);
				ubisMap.put("dept", "");
				//System.out.println("ubis_3>"+ubisMap.toString());

				int res = (int)authentionService.insertSignUp(ubisMap);
				if (res == 1) {

					//로그인 이력저장
					ubisMap.put("login_ip", ipAddr);
					ubisMap.put("login_sts", "Y");
					Map historyInfo = (Map)authentionService.insertLoginHistory(ubisMap);
					if (historyInfo != null) {
						session.setAttribute("history_no", historyInfo.get("history_no"));
					}

					//세션저장
					session.setAttribute("user_id", ubisMap.get("user_id"));	//아이디
					session.setAttribute("coderw", coderw);	//비밀번호
					session.setAttribute("user_nm", ubisMap.get("user_nm"));	//이름
					session.setAttribute("user_div", ubisMap.get("user_div"));	//회원등급
					session.setAttribute("access_session_id", session.getId());

					// 세션내역생성
		            synchronized (loginUsers) {
		                loginUsers.put((String)ubisMap.get("user_id"), session);
		            }

				}else {
					throw new AuthorityException ("UBIS 로그인 중 오류가 발생하였습니다.");
				}

			}else {
				String id = (String)memberInfo.get("user_id");
				String pw = (String)memberInfo.get("user_pw");
				String grantYn = (String)memberInfo.get("grant_yn");
				String useYn = (String)memberInfo.get("use_yn");
				String multiConnectYn = (String)memberInfo.get("multi_connect_lmtt_yn");
				int loginFailCnt = (int)memberInfo.get("login_fail_cnt");

				mapParameter.put("user_id", id);
				mapParameter.put("user_pw", pw);

				//비밀번호 SHA256 암호화
				userPw = Security.toHash(id, userPw);

				/*
				//비밀번호가 일치하지 않을 경우
				if (!userPw.equals(pw)) {

					//로그인 실패횟수 업데이트
					loginFailCnt++;
					mapParameter.put("login_fail_cnt", loginFailCnt);
					authentionService.updateLoginFailCnt(mapParameter);

					//로그인 실패 이력 저장
					mapParameter.put("login_sts", "N");
					authentionService.insertLoginHistory(mapParameter);

					throw new AuthorityException ("비밀번호를 다시 확인하세요.");
				}

				//비밀번호 5회초과 체크
				if (loginFailCnt >= 5) {
					//로그인 제한상태 업데이트
					mapParameter.put("use_yn", "N");
					authentionService.updateLoginUseInfo(mapParameter);
					throw new AuthorityException ("패스워드 입력이 5회이상 실패되어 이용이 정지된 사용자입니다.");
				}

				//사용여부체크
				if (!userDateCheck(memberInfo) || useYn.equals("N")) {
					throw new AuthorityException ("사용기간 이전 또는 경과된 계정이거나 사용제한이 걸린 계정입니다.<br/>관리자에게 계정 확인요청 하시기바랍니다.");
				}


				//관리자 승인여부 체크
				if (!grantYn.equals("Y")) {
					throw new AuthorityException ("관리자 승인이 되지 않았습니다.<br/>관리자에게 계정확인 요청을 하시기바랍니다.");
				}

				//다중접속제한여부체크
				if (multiConnectYn.equals("Y")) {
					String str = "";
	                Enumeration<String> eNum = loginUsers.keys();
	                while (eNum.hasMoreElements()) {
	                    try {
	                        str = (String) eNum.nextElement();
	                        if (str.indexOf(userId) == 0) {
	                            session = (HttpSession) loginUsers.get(userId);
	                            try {
	                                session.invalidate();
	                            } catch (Exception e) {
	                            }

	                            loginUsers.remove(userId);

	                            throw new AuthFailedException("[다중 접속제한]이미 접속중인계정입니다.<BR/>기존 세션은 종료되었습니다.(" + Security.getRemoteAddr(request) + ")");
	                        }
	                    } catch (AuthFailedException err) {
	                        throw new AuthFailedException(err.getMessage());
	                        //continue;
	                    }
					}
				}
				*/


				//사용자정보 업데이트
				mapParameter.put("login_fail_cnt", 0);
				authentionService.updateLoginInfo(mapParameter);
				System.out.println("사용자정보 업데이트>>>>>>>>>");

				//로그인 이력저장
				mapParameter.put("login_ip", Security.getRemoteAddr(request));
				mapParameter.put("login_sts", "Y");
				Map historyInfo = (Map)authentionService.insertLoginHistory(mapParameter);
				if (historyInfo != null) {
					session.setAttribute("history_no", historyInfo.get("history_no"));
				}
				System.out.println("로그인 이력저장>>>>>>>>>");

				//스키마 권한체크
				int cnt = (int)dataCreateService.schemaHsOwn(mapParameter);
				if (cnt == 0) {
					dataCreateService.createSchma(mapParameter);
				}
				System.out.println("스키마 권한체크>>>>>>>>>");

				//세션저장
				session.setAttribute("user_id", memberInfo.get("user_id"));		//아이디
				session.setAttribute("coderw", coderw);		//비밀번호
				session.setAttribute("user_nm", memberInfo.get("user_nm"));		//이름
				session.setAttribute("user_div", memberInfo.get("user_div"));	//회원등급
				session.setAttribute("ubis_yn", memberInfo.get("ubis_yn"));	//ubis회원여부
				session.setAttribute("access_session_id", session.getId());

				LoginVO login = new LoginVO();
				MemberVO membervo = new MemberVO();
	            membervo.setUser_pw("");
	            membervo.setEmail("");
	            membervo.setTel_no("");
	            membervo.setTel_no2("");
	            membervo.setUser_id("" + memberInfo.get("user_id"));
	            membervo.setUser_nm("" + memberInfo.get("user_nm"));
	            membervo.setUser_div("" + memberInfo.get("user_div"));
	            membervo.setUbis_yn("" + memberInfo.get("ubis_yn"));
	            login.setId("" + memberInfo.get("user_id"));
	            login.setMember(membervo);
	            session.setAttribute("login", login);

	            System.out.println("대시보드>>>>>>>>>");
				//대시보드 표출 옵션 정보 조회 및 초회 생성
				List dashBoardList = (List)myDataService.getDashBoardOptList(mapParameter); // 대시보드 표출 설정
				if (dashBoardList.isEmpty() == true ) {
					int dashResult = myDataService.insertDashBoardOpt(mapParameter);
				}

				// 세션내역생성
	            synchronized (loginUsers) {
	                loginUsers.put((String)memberInfo.get("user_id"), session);
	            }
			}

			model.put("id", "G2G00003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");

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
			System.out.println(e.getMessage());
			model.put("id", "G2G00003");
			model.put("errCd", "-1");
			model.put("errMsg", "서버 처리 중 오류가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		System.out.println(model.toString());
		return new ModelAndView("jsonV", model);
	}

	/*
	 * 아이디 찾기 API
	 * @param request
	 * @param response
	 * @return view/auth/findId.do
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/findId.do")
	public ModelAndView doFindId(HttpServletRequest request, ModelMap model) {
		Map mapParameter = new HashMap();

		try {
			String userNm = request.getParameter("user_nm");
			String email = request.getParameter("email");

			userNm = Security.cleanXss(userNm);
			email = Security.cleanXss(email);

			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			userNm = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userNm);
			email = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, email);

			//이메일 암호화
			email = LoginUtil.Encrypt(email);

			mapParameter.put("user_nm", userNm);
			mapParameter.put("email", email);

			Map memberInfo = (Map)authentionService.getFindId(mapParameter);

			if (memberInfo != null) {
				model.put("id", "G2G00004");
				model.put("errCd", "0");
				model.put("errMsg", "아이디를 찾았습니다.");
				model.put("result", memberInfo);
			}else {
				model.put("id", "G2G00004");
				model.put("errCd", "-100");
				model.put("errMsg", "아이디를 찾을 수 없습니다.");
			}
		} catch (Exception e) {
			model.put("id", "G2G00004");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}

	/*
	 * 비밀번호 초기화 API
	 * @param request
	 * @param response
	 * @return view/auth/findPwd.do
	 */
	@RequestMapping(value="/findPwd.do")
	public ModelAndView doFindPwd(HttpServletRequest request, ModelMap model) {
		Map mapParameter = new HashMap();

		try {
			String userId = request.getParameter("user_id");
			String userNm = request.getParameter("user_nm");
			String email = request.getParameter("email");

			userId = Security.cleanXss(userId);
			userNm = Security.cleanXss(userNm);
			email = Security.cleanXss(email);

			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
			userId = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userId);
			userNm = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userNm);
			email = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, email);

			//이메일 암호화
			email = Security.Encrypt(email);

			mapParameter.put("user_id", userId);
			mapParameter.put("user_nm", userNm);
			mapParameter.put("email", email);

			Map memberInfo = (Map)authentionService.getFindPwd(mapParameter);

			StringBuffer buffer = new StringBuffer();
            SecureRandom random = new SecureRandom();

            String chars[] = "!,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9".split(",");

            for (int i = 0; i < 8; i++) {
                buffer.append(chars[random.nextInt(chars.length)]);
            }

            String pwd  = buffer.toString();
            pwd = pwd.toLowerCase();

            Map result = new HashMap();
            result.put("pwd", pwd);

			if (memberInfo != null) {
				String coderw = Security.toHash(userId, pwd);
				mapParameter.put("user_pw", coderw);
				memberService.updateMemberPwd(mapParameter);

				model.put("id", "G2G00005");
				model.put("errCd", "0");
				model.put("errMsg", "비밀번호를 초기화하였습니다.");
				model.put("result", result);
			}else {
				model.put("id", "G2G00005");
				model.put("errCd", "-100");
				model.put("errMsg", "아이디를 찾을 수 없습니다.");
			}
		} catch (Exception e) {
			model.put("id", "G2G00005");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}

		return new ModelAndView("jsonV", model);
	}

//	/*
//	 * 세션가져오기 API
//	 * @param request
//	 * @param response
//	 * @return view/auth/doShareSession.do
//	 */
//	@RequestMapping(value="/doShareSession.do")
//	public ModelAndView doShareSession(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
//		HashMap<String,Object> mapParameter = new HashMap<String,Object>();
//
//		try {
//			HttpSession session = request.getSession();
//			String userId = (String)session.getAttribute("user_id");
//			String coderw = (String)session.getAttribute("coderw");
//			String url = request.getParameter("url");
//
//			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
//			coderw = aes.decrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, coderw);
//			mapParameter.put("id", userId);
//			mapParameter.put("coderw", coderw);
//
//			HttpResponseConnector client = new HttpResponseConnector(url, "POST",  mapParameter);
//			IResponseHandler handler = new NormalResponseHandler( response, false );
//			client.setResponseHandler(handler);
//
//			model.put("result", client.connect());
//			model.put("errCd", "0");
//			model.put("success", "true");
//		}catch(Exception e) {
//			model.put("errCd", "-1");
//			model.put("success", "false");
//		}
//
//		return new ModelAndView("jsonV", model);
//	}
//
//	/*
//	 * 세션가져오기 API
//	 * @param request
//	 * @param response
//	 * @return view/auth/getSession.do
//	 */
//	@RequestMapping(value="/getSession.do")
//	public ModelAndView getSession(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
//		try {
//			HttpSession session = request.getSession();
//			String userId = (String)session.getAttribute("user_id");
//			String coderw = (String)session.getAttribute("coderw");
//			String ubisYn = (String)session.getAttribute("ubis_yn");
//
//			if (userId == null) {
//				throw new AuthorityException ("세션정보가 없습니다.");
//			}
//
//			String key = UUID.randomUUID().toString();
//			Map mapParameter = new HashMap();
//			mapParameter.put("user_key", key);
//			mapParameter.put("user_id", userId);
//			memberService.updateUserKey(mapParameter);
//
//			AES128util aes = new AES128util(AES128util.KEY_SIZE, AES128util.ITERATION_COUNT);
//			userId = aes.encrypt(AES128util.SALT, AES128util.IV, AES128util.PASSPHRASE, userId);
//
//			model.addAttribute("user_id", userId);
//			model.addAttribute("coderw", coderw);
//			model.addAttribute("ubis_yn", ubisYn);
//			model.addAttribute("key", key);
//			model.put("errCd", "0");
//			model.put("success", "true");
//		}
//		catch(AuthorityException e) {
//			model.put("errCd", "-1");
//			model.put("success", "false");
//		}
//		catch(Exception e) {
//			model.put("errCd", "-1");
//			model.put("success", "false");
//		}
//
//		return new ModelAndView("jsonV", model);
//	}
//
	/**
	 * 회원체크 API
	 * @param request
	 * @param response
	 * @return login/auth/checkAuth.do
	 */
	@RequestMapping(value="/checkAuth.do")
	public ModelAndView checkAuth(HttpServletRequest request, ModelMap model) {

		HttpSession session = request.getSession();
		Map mapParameter = new HashMap();

		try {
			String key = request.getParameter("key");
			key = Security.cleanXss(key);

			if (key == null) {
				throw new AuthorityException ("회원인증에 실패하였습니다.");
			}

			mapParameter.put("key",  key);


			//회원정보 조회
			Map memberInfo = (Map)memberService.getMemberInfo(mapParameter);

			//사용자가 없을 경우
			if (memberInfo == null) {
				throw new AuthorityException ("회원인증에 실패하였습니다.");
			}

			String userId = (String)memberInfo.get("user_id");
			String pw = (String)memberInfo.get("user_pw");
			String grantYn = (String)memberInfo.get("grant_yn");
			String useYn = (String)memberInfo.get("use_yn");
			String multiConnectYn = (String)memberInfo.get("multi_connect_lmtt_yn");
			int loginFailCnt = (int)memberInfo.get("login_fail_cnt");

			//관리자 승인여부 체크
			if (!grantYn.equals("Y")) {
				throw new AuthorityException ("관리자 승인이 되지 않았습니다.<br/>관리자에게 계정확인 요청을 하시기바랍니다.");
			}

			//사용여부체크
			if (!userDateCheck(memberInfo) || useYn.equals("N")) {
				throw new AuthorityException ("사용기간 이전 또는 경과된 계정이거나 사용제한이 걸린 계정입니다.<br/>관리자에게 계정 확인요청 하시기바랍니다.");
			}

			//사용자정보 업데이트
			mapParameter.put("login_fail_cnt", 0);
			mapParameter.put("user_id", userId);
			authentionService.updateLoginInfo(mapParameter);

			//로그인 이력저장
			mapParameter.put("login_sts", "Y");
			Map historyInfo = (Map)authentionService.insertLoginHistory(mapParameter);
			if (historyInfo != null) {
				session.setAttribute("history_no", historyInfo.get("history_no"));
			}

			//스키마 권한체크
			int cnt = (int)dataCreateService.schemaHsOwn(mapParameter);
			if (cnt == 0) {
				dataCreateService.createSchma(mapParameter);
			}


			//세션저장
			session.setAttribute("user_id", userId);		//아이디
			session.setAttribute("coderw", pw); //비밀번호
			session.setAttribute("user_nm", memberInfo.get("user_nm"));		//이름
			session.setAttribute("user_div", memberInfo.get("user_div"));	//회원등급
			session.setAttribute("ubis_yn", memberInfo.get("ubis_yn"));	//ubis회원여부
			session.setAttribute("access_session_id", session.getId());

			//대시보드 표출 옵션 정보 조회 및 초회 생성
			List dashBoardList = (List)myDataService.getDashBoardOptList(mapParameter); // 대시보드 표출 설정
			if (dashBoardList.isEmpty() == true ) {
				int dashResult = myDataService.insertDashBoardOpt(mapParameter);
			}

			// 세션내역생성
            synchronized (loginUsers) {
                loginUsers.put((String)memberInfo.get("user_id"), session);
            }

            //세션생성 성공시, user_key 삭제
            mapParameter.put("user_key", null);
            memberService.updateUserKey(mapParameter);

            model.put("success", true);
			model.put("id", "G2G00006");
			model.put("errCd", "0");
			model.put("errMsg", "회원 인증을 성공하였습니다.");

		}
		catch (AuthorityException e) {
			model.put("success", false);
			model.put("id", "G2G00006");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
        }
		catch (AuthFailedException e) {
			model.put("success", false);
			model.put("id", "G2G00006");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
		}
		catch (Exception e) {
			model.put("success", false);
			model.put("id", "G2G00006");
			model.put("errCd", "-1");
			model.put("errMsg", "서버 처리 중 오류가 발생하였습니다.");
			logger.info(e);
		}
		finally {
		}
		return new ModelAndView("jsonV", model);
	}


    /**
     * 사용기간 체크
     *
     * @param login
     * @return boolean
     */
    public boolean userDateCheck(Map member) throws Exception {

        boolean result = false;

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        Calendar cal = Calendar.getInstance();
        int nowDt = Integer.parseInt(simpleDateFormat.format(cal.getTime()));
        String startDate = "";
        String endDate = "";
        try {
            if (member != null) {
                startDate = (String)member.get("use_start_date");
                endDate = (String)member.get("use_end_date");

                if (StringUtils.isNotEmpty(startDate) && StringUtils.isNotEmpty(endDate)) {
                    if (Integer.parseInt(startDate) <= nowDt && Integer.parseInt(endDate) >= nowDt) {
                        result = true;
                    }
                }
            }
        } catch (NumberFormatException e) {
            logger.error(e.getMessage());
        }

        return result;
    }

}
