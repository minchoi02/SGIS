package egovframework.sgis.map.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.psl.dataaccess.util.EgovMap;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.map.service.ThematicService;
import egovframework.sgis.map.service.mapper.kairos.ThematicMapper;


@Service("thematicService")
public class ThematicServiceImpl extends EgovAbstractServiceImpl implements ThematicService {
	@Resource(name="thematicMapper")
	private ThematicMapper thematicMapper;
	/**
	 * @description 테마 리스트
	 * @date 2016. 7. 7.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param model
	 * @param stat_thema_map_id
	 * @return
	 */
	@Override
	public String getThematicPage(ModelMap model,String stat_thema_map_id, String ref_adm_id) {
		HashMap<String,Object> category = new HashMap<String,Object>(); 
		
		HashMap<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("ref_adm_id", ref_adm_id);

		for(int i=1;i<=5;i++){
			//category.put("CTGR_00"+i,thematicMapper.selectThematicList("CTGR_00"+i));
			paramMap.put("CTGR" , "CTGR_00"+i );
			category.put("CTGR_00"+i,thematicMapper.selectThematicList(paramMap));
		}
		model.addAttribute("category",category);
		if(StringUtils.hasText(stat_thema_map_id)){
			EgovMap thematicInfo = thematicMapper.selectThematicInfo(stat_thema_map_id);
			if(thematicInfo==null){
				return "map/thematic/intro";
			}else{
				if(thematicInfo.get("themaMapDataId")!=null){
					List<String> yearList = new ArrayList<String>();
					if("04".equals(thematicInfo.get("themaMapType"))){
						yearList = thematicMapper.selectThemaMapBaseYearType04(thematicInfo.get("themaMapDataId").toString());
					}else if("05".equals(thematicInfo.get("themaMapType"))){
						yearList = thematicMapper.selectThemaMapBaseYearType05(thematicInfo.get("themaMapDataId").toString());
					}
					if(yearList!=null&&yearList.size()>0){
						thematicInfo.put("yearList", yearList);
					}
				}
				model.addAttribute("thematicInfo",thematicInfo);
				return "map/thematic/map";
			}
		}else{
			return "map/thematic/intro";
		}
	}
}
