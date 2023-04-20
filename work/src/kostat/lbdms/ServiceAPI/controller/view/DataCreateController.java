package kostat.lbdms.ServiceAPI.controller.view;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.xmlbeans.XmlException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.mozilla.universalchardet.UniversalDetector;
import org.opengis.referencing.FactoryException;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.util.ShpFileUtil;
import kostat.lbdms.ServiceAPI.common.util.XExcelFileReader;
import kostat.lbdms.ServiceAPI.controller.service.DataCreateService;

/**
 * <pre>
 * 데이터베이스 테이블/파일 관리 contorller
 * </pre>
 *
 * @author Admin
 * @since 2018. 07. 09.
 * @version 1.0
 * @see
 * 
 *      <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2018.07.09.      최재영				        최초생성
 *
 *      </pre>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value = "/view/data")
public class DataCreateController {

	private final Log logger = LogFactory.getLog(DataCreateController.class);

	@Resource(name = "dataCreateService")
	private DataCreateService dataCreateService;

	/**
	 * 데이터 생성 메인
	 * 
	 * @param request
	 * @param response
	 * @return map/interactiveMap
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value = "/dataCreateMain")
	public ModelAndView interactiveMap(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("dataCreate/dataCreateMain");
	}

}
