package kostat.lbdms.ServiceAPI.controller.view;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.ConversionException;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.util.FileNameUtil;
import kostat.lbdms.ServiceAPI.common.util.http.HttpJSONConnector;
import kostat.lbdms.ServiceAPI.controller.service.FaqService;
import kostat.lbdms.ServiceAPI.controller.service.SystemService;
import net.sf.json.JSONObject;

/**
 * 1. 기능 : 운영현황 콘트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b>
 *     작성자 : 최인섭
 *  </pre>
 *
 * @author 최종 수정자 : 최인섭, 최은총
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/sysmgt")
public class SystemController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(SystemController.class);

	@Resource(name="faqService")
	private FaqService faqService;

	@Resource(name = "systemService")
	private SystemService		systemService;

	/**
	 * 운영현황
	 * @param request
	 * @param response
	 * @return systemSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/systemSts")
	public ModelAndView systemMgt(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/systemSts");
	}

	/**
	 * 업무현황
	 * @param request
	 * @param response
	 * @return workSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/workSts")
	public ModelAndView workMgt(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/workSts");
	}

	/**
	 * 기관 접속현황
	 * @param request
	 * @param response
	 * @return logSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/logSts")
	public ModelAndView logSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/logSts");
	}

	/**
	 * 시스템 현황
	 * @param request
	 * @param response
	 * @return sysSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sysSts")
	public ModelAndView sysSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/sysSts");
	}

	/**
	 * 실패작업 현황
	 * @param request
	 * @param response
	 * @return failSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/failSts")
	public ModelAndView failSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/failSts");
	}

	/**
	 * 파일에이전트(안함)
	 * @param request
	 * @param response
	 * @return fileAgentSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/fileAgentSts")
	public ModelAndView fileAgentSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/fileAgentSts");
	}

	/**
	 * 다운로드 현황
	 * @param request
	 * @param response
	 * @return downloadSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/downloadSts")
	public ModelAndView downloadSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/downloadSts");
	}

	/**
	 * 분석통계 현황
	 * @param request
	 * @param response
	 * @return analysisSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/analysisSts")
	public ModelAndView analysisSts(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/analysisSts");
	}

	/**
	 * 공지사항 리스트
	 * @param request
	 * @param response
	 * @return noticeLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/noticeLst")
	public ModelAndView noticeLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/noticeLst",model);
	}

	/**
	 * 공지사항 상세
	 * @param request
	 * @param response
	 * @return noticeView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/noticeView")
	public ModelAndView noticeView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/noticeView",model);
	}

	/**
	 * 공지사항 수정
	 * @param request
	 * @param response
	 * @return noticeForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/noticeForm")
	public ModelAndView noticeForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/noticeForm");
	}

	/**
	 * Q&A 리스트
	 * @param request
	 * @param response
	 * @return qnaLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaLst")
	public ModelAndView qnaLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/qnaLst");
	}

	/**
	 * Q&A 상세
	 * @param request
	 * @param response
	 * @return qnaView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaView")
	public ModelAndView qnaView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/qnaView");
	}

	/**
	 * Q&A 수정
	 * @param request
	 * @param response
	 * @return qnaForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/qnaForm")
	public ModelAndView qnaForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/qnaForm");
	}

	/**
	 * FAQ 리스트
	 * @param request
	 * @param response
	 * @return faqLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/faqLst")
	public ModelAndView faqLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/faqLst");
	}

	/**
	 * FAQ 수정
	 * @param request
	 * @param response
	 * @return faqForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/faqForm")
	public ModelAndView faqForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/faqForm");
	}

	/**
	 * 이용정보 리스트
	 * @param request
	 * @param response
	 * @return useinfoLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useinfoLst")
	public ModelAndView useinfoLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/useinfoLst");
	}

	/**
	 * 이용정보 상세
	 * @param request
	 * @param response
	 * @return useinfoView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useinfoView")
	public ModelAndView useinfoView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/useinfoView");
	}

	/**
	 * 이용정보 수정
	 * @param request
	 * @param response
	 * @return useinfoForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useinfoForm")
	public ModelAndView useinfoForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/useinfoForm");
	}

	/**
	 * 팝업공지 리스트
	 * @param request
	 * @param response
	 * @return popalimLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/popalimLst")
	public ModelAndView popalimLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/popalimLst");
	}

	/**
	 * 팝업공지 상세
	 * @param request
	 * @param response
	 * @return popalimView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/popalimView")
	public ModelAndView popalimView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/popalimView");
	}

	/**
	 * 팝업공지 수정
	 * @param request
	 * @param response
	 * @return popalimForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/popalimForm")
	public ModelAndView popalimForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/popalimForm");
	}

	/**
	 * 활용사례 리스트
	 * @param request
	 * @param response
	 * @return useguideLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useguideLst")
	public ModelAndView useguideLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/useguideLst");
	}

	/**
	 * 활용사례 상세
	 * @param request
	 * @param response
	 * @return useguideView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useguideView")
	public ModelAndView useguideView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/useguideView");
	}

	/**
	 * 활용사례 수정
	 * @param request
	 * @param response
	 * @return useguideForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/useguideForm")
	public ModelAndView useguideForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/useguideForm");
	}

	/**
	 * 따라하기 리스트
	 * @param request
	 * @param response
	 * @return usecopyLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/usecopyLst")
	public ModelAndView usecopyLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/usecopyLst");
	}

	/**
	 * 따라하기 상세
	 * @param request
	 * @param response
	 * @return usecopyView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/usecopyView")
	public ModelAndView usecopyView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/usecopyView");
	}

	/**
	 * 따라하기 수정
	 * @param request
	 * @param response
	 * @return usecopyForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/usecopyForm")
	public ModelAndView usecopyForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/usecopyForm");
	}

	/**
	 * 샘플데이터 리스트
	 * @param request
	 * @param response
	 * @return sampleLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sampleLst")
	public ModelAndView sampleLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/sampleLst");
	}

	/**
	 * 샘플데이터 상세
	 * @param request
	 * @param response
	 * @return sampleView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sampleView")
	public ModelAndView sampleView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/sampleView");
	}

	/**
	 * 샘플데이터 수정
	 * @param request
	 * @param response
	 * @return sampleForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sampleForm")
	public ModelAndView sampleForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/sampleForm");
	}

	/**
	 * 공유게시판 리스트
	 * @param request
	 * @param response
	 * @return shareLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/shareLst")
	public ModelAndView shareLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/shareLst");
	}

	/**
	 * 공유게시판 상세
	 * @param request
	 * @param response
	 * @return shareView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/shareView")
	public ModelAndView shareView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/shareView");
	}

	/**
	 * 공유게시판 수정
	 * @param request
	 * @param response
	 * @return shareForm
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/shareForm")
	public ModelAndView shareForm(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/shareForm");
	}

	/**
	 * 사용자관리 리스트
	 * @param request
	 * @param response
	 * @return userMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/userMng")
	public ModelAndView userMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/userMng");
	}

	/**
	 * 사용자관리 모니터링
	 * @param request
	 * @param response
	 * @return userMonitor
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/userMonitor")
	public ModelAndView userMonitor(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/userMonitor");
	}

	/**
	 * 사용자관리 작업공간관리
	 * @param request
	 * @param response
	 * @return analysisSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/userSpace")
	public ModelAndView userSpace(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/userSpace");
	}

	/**
	 * 사용자관리 사용가능 데이터관리
	 * @param request
	 * @param response
	 * @return analysisSts
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/userData")
	public ModelAndView userData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/userData");
	}

	/**
	 * 용량증설 승인 요청
	 * @param request
	 * @param response
	 * @return aprovSize
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/aprovSize")
	public ModelAndView aprovSize(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/aprovSize");
	}

	/**
	 * API 승인
	 * @param request
	 * @param response
	 * @return aprovApi
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/aprovApi")
	public ModelAndView aprovApi(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/aprovApi");
	}

	/**
	 * 전송 승인
	 * @param request
	 * @param response
	 * @return aprovMove
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/aprovMove")
	public ModelAndView aprovMove(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/aprovMove");
	}

	/**
	 * 전송 승인 상세
	 * @param request
	 * @param response
	 * @return aprovMove
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/aprovMoveEdit")
	public ModelAndView aprovMoveEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/aprovMoveEdit");
	}

	/**
	 * 분류관리
	 * @param request
	 * @param response
	 * @return codeMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/codeMng")
	public ModelAndView codeMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/codeMng");
	}

	/**
	 * 출처관리
	 * @param request
	 * @param response
	 * @return sourceMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/sourceMng")
	public ModelAndView sourceMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/sourceMng");
	}

	/**
	 * 소속관리 - 리스트
	 * @param request
	 * @param response
	 * @return groupLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/groupLst")
	public ModelAndView groupLst(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/groupLst");
	}

	/**
	 * 소속관리 - 수정
	 * @param request
	 * @param response
	 * @return groupLst
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/groupEdit")
	public ModelAndView groupEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/groupEdit");
	}

	/**
	 * 소속관리 - 팝업
	 * @param request
	 * @param response
	 * @return groupPop
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/groupPop")
	public ModelAndView groupPop(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/groupPop");
	}

	/**
	 * 오류관리
	 * @param request
	 * @param response
	 * @return errMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/errMng")
	public ModelAndView errMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/errMng");
	}

	/**
	 * 수집관리
	 * @param request
	 * @param response
	 * @return collectMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/collectMng")
	public ModelAndView collectMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/collectMng");
	}

	/**
	 * 데이터 표준화 관리
	 * @param request
	 * @param response
	 * @return dbStdMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/dbStdMng")
	public ModelAndView dbStdMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/dbStdMng");
	}

	/**
	 * 데이터 표준화 관리 등록/수정 폼
	 * @param request
	 * @param response
	 * @return dbStdMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/stdWordEdit")
	public ModelAndView stdWordEdit(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/stdWordEdit");
	}

	/**
	 * 팝업참고
	 * @param request
	 * @param response
	 * @return guide/faq
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/popupSts")
	public ModelAndView faqDetailView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		String pop_no = (String)request.getParameter("pop_no");
		if (pop_no == null || pop_no.length() == 0) {
			return new ModelAndView("common/errorCode");
		}
		model.addAttribute("pop_no", pop_no);

		return new ModelAndView("sysmgt/popupSts");
	}

    /**
     * <pre>
     * CSV 데이터 변환 다운로드 처리
     * </pre>
     *
     * @param String             ( CSV ) 데이터
     * @param HttpServletRequest request
     * @return AjaxResponse
     * @throws IOException
     */
    @SuppressWarnings("deprecation")
	@RequestMapping(value = "/convert/csv", method = RequestMethod.POST)
    public void downloadCsv(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {

        String csv = request.getParameter("csv");
        String filename = StringUtils.defaultString(request.getParameter("filename"), filename = FileNameUtil.makeFileNameWithDate() + ".csv");
        if (csv == null) {
            throw new IOException("처리할 수 없는 데이터입니다 ");
        }

//        String decode = URLDecoder.decode(csv, "UTF-8");
//        byte[] bytes = decode.getBytes("UTF-8");
        String decode = URLDecoder.decode(csv);
        byte[] bytes = decode.getBytes("CP949");
        logger.info(decode);


        response.setCharacterEncoding("UTF-8");
        //FacesContext fc = FacesContext.getCurrentInstance();
        response.setHeader("Content-disposition", "attachment; filename=" + filename);
        response.setContentType("application/ms-excel");
        response.setContentLength(bytes.length);

        try {
            // Write the header line
            OutputStream out = response.getOutputStream();

            //  유니코드 BOM(Byte Order Mask) 지정 ( 한글 깨지는문제 fix )
	        /*byte[] utf8Bom = { (byte)0xEF, (byte)0xBB, (byte)0xBF};
	        out.write( utf8Bom );*/
            out.write(bytes);
            out.flush();
        } catch (ConversionException e) {
            logger.error("엑셀 변환 오류 " + e.getMessage());
        }

    }


	/**
	 * 사용자관리 상세
	 * @param request
	 * @param response
	 * @return userView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/userMngEdit")
	public ModelAndView userView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/userMngEdit");
	}
}