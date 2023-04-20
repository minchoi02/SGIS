package kostat.sop.ServiceAPI.controller.view;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import kostat.sop.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.sop.ServiceAPI.controller.service.ECountryService;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 1. 기능 : e-지방지표 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : JRJ 1.0, 2019/09/17  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/ecountry")
public class ECountryController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(ECountryController.class);
	
	@Resource(name="ecountryService")
	private ECountryService ecountryService;
	
	@RequestMapping(value="/getCategory", produces="text/plain;charset=UTF-8")
	public ModelAndView getCategory(HttpServletRequest request, ModelMap model) throws SQLException{
		String upper_list_id = request.getParameter("upper_list_id");
		
		if( upper_list_id == null || "".equals( upper_list_id ) ){
			upper_list_id = "root";
		}
		
		try {
			List categoryList = ecountryService.selectCategory( upper_list_id );
			model.addAttribute( "success", true );
			model.addAttribute( "result", categoryList );
		} catch (Exception e) {
			model.addAttribute( "success", false );
			model.addAttribute( "result", e.getMessage() );
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	@RequestMapping(value="/getList", produces="text/plain;charset=UTF-8")
	public ModelAndView getList(HttpServletRequest request, ModelMap model) throws SQLException{
		String list_id = request.getParameter("list_id");
		
		try {
			nullCheck(list_id);
			
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("list_id", list_id);
			
			List ecountryList = ecountryService.selectEcountryList( map );
			model.addAttribute( "success", true );
			model.addAttribute( "result", ecountryList );
		} catch (Exception e) {
			model.addAttribute( "success", false );
			model.addAttribute( "result", e.getMessage() );
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	@RequestMapping(value="/getSearchList", produces="text/plain;charset=UTF-8")
	public ModelAndView getSearchList(HttpServletRequest request, ModelMap model) throws SQLException{
		String searchword = request.getParameter("searchword");
		int pagenum =  Integer.valueOf( (String) ( request.getParameter("pagenum") == null ? "0" : request.getParameter("pagenum") ) );
		int resultcount = Integer.valueOf( (String) ( request.getParameter("resultcount") == null ? "10" : request.getParameter("resultcount") ) );
		
		try {
			nullCheck(searchword);
			
			HashMap<String, Object> map = new HashMap<String, Object>();
			
			int intStartNum = ( pagenum ) * resultcount + 1;
			
			map.put("searchword", searchword);
			map.put( "startnum", "" + intStartNum );
			map.put( "endnum", resultcount );
			
			List searchList = ecountryService.selectEcountryList( map );
			int totalcount = ecountryService.selectEcountryCount( map );
			
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("totalcount", totalcount);
			result.put("searchList", searchList);
			
			model.addAttribute( "success", true );
			model.addAttribute( "result", result );
		} catch (Exception e) {
			model.addAttribute( "success", false );
			model.addAttribute( "result", e.getMessage() );
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	@RequestMapping(value="/getItem", produces="text/plain;charset=UTF-8")
	@ResponseBody
	public ModelAndView getItem(HttpServletRequest request, ModelMap model) throws SQLException{
		String tbl_id = request.getParameter("tbl_id");
		
		try {
			nullCheck(tbl_id);
			
			List itemList = ecountryService.selectItemList( tbl_id );
			List baseItemList = ecountryService.selectBaseItemList( tbl_id );
			List prdList = ecountryService.selectPrdList( tbl_id );
			List expList = ecountryService.selectExpList( tbl_id );
			
			HashMap<String, Object> addItemMap = new HashMap<String, Object>();
			HashMap<String, Object> prdValueMap = new HashMap<String, Object>();
			
			for( int i=0; i<itemList.size(); i++ ){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.putAll( (HashMap<String, Object>) itemList.get(i) );
				
				String field_id = (String) item.get("field_id");
				item.put("tbl_id", tbl_id);
				addItemMap.put(field_id, ecountryService.selectAddItemList( item ));
			}
			
			List prdList2 = new ArrayList<>();
			for( int i=0; i<prdList.size(); i++ ){
				HashMap<String, Object> item = new HashMap<String, Object>();
				item.putAll( (HashMap<String, Object>) prdList.get(i) );
				
				String prd_id = (String) item.get("prd_id");
				
				if( !( tbl_id.equals("DT_1YL1701") && prd_id.equals("Y") ) ){ //주택가격상승률 년도 안나오게 임시조치
					prdList2.add( item );
					
					item.put("tbl_id", tbl_id);
					item.put("prd_id", prd_id);
					prdValueMap.put(prd_id, ecountryService.selectPrdValueList( item ));
				}
			}
			
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put( "add_item_list" , itemList );
			map.put( "base_item" , baseItemList );
			map.put( "add_item" , addItemMap );
			map.put( "periodlist" , prdList2 );
			map.put( "periodvalue" , prdValueMap );
			map.put( "exp_list" , expList );
			
			model.addAttribute( "success", true );
			model.addAttribute( "result", map );
		} catch (Exception e) {
			model.addAttribute( "success", false );
			model.addAttribute( "result", e.getMessage() );
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	@RequestMapping(value="/getData", produces="text/plain;charset=UTF-8")
	@ResponseBody
	public ModelAndView getData(HttpServletRequest request, ModelMap model) throws SQLException{
		String tbl_id = request.getParameter("tbl_id");
		String base_item_id = request.getParameter("base_item_id");
		String add_item_id = request.getParameter("add_item_id");
		String prd_id = request.getParameter("prd_id");
		String prid_value = request.getParameter("prid_value");
		String adm_cd = request.getParameter("adm_cd");
		String opt = request.getParameter("opt");
		
		String adm_cd_len = "2";
		
		try {
			nullCheck(tbl_id);
			nullCheck(base_item_id);
			nullCheck(prd_id);
			nullCheck(prid_value);
			
			if( adm_cd == null || "".equals( adm_cd ) 
					|| "00".equals( adm_cd ) || "1".equals( adm_cd )){
				adm_cd = null;
			} else {
				adm_cd_len = "5";
			}
			
			if( opt != null && "1".equals( opt ) ){
				//1이 들어오면 전국 경계에 전국 시군구 데이터 반환
				adm_cd_len = "5";
			}
			
			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("tbl_id", tbl_id);
			map.put("base_item_id", base_item_id);
			map.put("prd_id", prd_id);
			map.put("prid_value", prid_value);
			map.put("adm_cd", adm_cd);
			map.put("opt", opt);
			map.put("adm_cd_len", adm_cd_len);
			
			if( add_item_id != null && !add_item_id.isEmpty() ){
				String[] add_item_ids = add_item_id.split(",");
				
				if( add_item_ids != null ){
					for( int i=0; i<add_item_ids.length; i++){
						if( add_item_ids[i] != null ){
							String[] item = add_item_ids[i].split("::");
							map.put( item[0].toLowerCase(), item[1] );
						}
					}
				}
			}
			
			HashMap<String, Object> result = ecountryService.selectDataList( map );
			
			model.addAttribute( "success", true );
			model.addAttribute( "result", result );
		} catch (Exception e) {
			model.addAttribute( "success", false );
			model.addAttribute( "result", e.getMessage() );
			
			e.printStackTrace();
		}
		
		return new ModelAndView("jsonV", model);
	}
	
	public void nullCheck( String parameter ) throws Exception{
		if( parameter == null || "".equals( parameter ) ){
			throw new Exception("파라미터 정보가 없습니다.");
		}
	}
}