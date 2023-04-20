package egovframework.sgis.map.service;

import org.springframework.ui.ModelMap;

public interface ThematicService {
	String getThematicPage(ModelMap model,String stat_thema_map_id, String ref_adm_id);
}
