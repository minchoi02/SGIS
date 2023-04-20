package kostat.sop.ServiceAPI.api.dt.kosismanage;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.dt.kosismanage.mapper.KOSISManageDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**   
*
* @author SseOk   
* @date：2016. 07. 19    
* @version V1.0      
*     
*/
public class UpdateKosisCode extends AbsAuth<Success> {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UpdateKosisCode.class);
	@Resource
	private KOSISManageDao relManageDao;
	@Override
	public String getApiId() {
		return "relmanage_add";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}

	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		try {
			Success success = null;
			Map paramMap = getParameterMap(req);
			
			SimpleDateFormat sdf = new SimpleDateFormat("YYYYMMdd");
			Date date = new Date();
			String updtTime = sdf.format(date);
			
			String kosisInstCd = (String) paramMap.get("kosis_inst_cd");
			String kosisTbId = (String) paramMap.get("kosis_tb_id");
			String kosisBaseYear = (String) paramMap.get("kosis_base_year");
			String kosisCd = (String) paramMap.get("kosis_cd");
			String kosisNm = (String) paramMap.get("kosis_nm");
			String prevSopCd = (String) paramMap.get("prev_sop_cd");
			String sopCd = (String) paramMap.get("sop_cd");
			
			int prevSopCdLen = prevSopCd.length();
			int sopCdLen = sopCd.length();
			
			Map updateParamMap = new HashMap();
			Map insertParamMap = new HashMap();
			Map deleteParamMap = new HashMap();
			
			if(prevSopCdLen == sopCdLen) {
				updateParamMap.put("kosis_inst_cd", kosisInstCd);
				updateParamMap.put("kosis_tb_id", kosisTbId);
				updateParamMap.put("kosis_base_year", kosisBaseYear);
				updateParamMap.put("kosis_cd", kosisCd);
				switch(sopCdLen) {
				case 1:
				case 2:
					updateParamMap.put("sido_cd", sopCd);
					updateParamMap.put("area_type", "sido");
					break;
					
				case 5:
					updateParamMap.put("sido_cd", sopCd.substring(0, 2));
					updateParamMap.put("sgg_cd", sopCd.substring(2, 5));
					updateParamMap.put("area_type", "sgg");
					break;
					
				case 7:
					updateParamMap.put("sido_cd", sopCd.substring(0, 2));
					updateParamMap.put("sgg_cd", sopCd.substring(2, 5));
					updateParamMap.put("emdong_cd", sopCd.substring(5));
					updateParamMap.put("area_type", "emdong");
					break;
				}
				
				success = relManageDao.updateKosisCode(updateParamMap);
			} else {
				insertParamMap.put("kosis_inst_cd", kosisInstCd);
				insertParamMap.put("kosis_tb_id", kosisTbId);
				insertParamMap.put("kosis_base_year", kosisBaseYear);
				insertParamMap.put("kosis_cd", kosisCd);
				insertParamMap.put("kosis_nm", kosisNm);
				insertParamMap.put("updt_time", updtTime);
				
				deleteParamMap.put("kosis_inst_cd", kosisInstCd);
				deleteParamMap.put("kosis_tb_id", kosisTbId);
				deleteParamMap.put("kosis_base_year", kosisBaseYear);
				deleteParamMap.put("kosis_cd", kosisCd);
				
				if(prevSopCdLen < 5) {
					deleteParamMap.put("area_type", "sido");
				} else if(prevSopCdLen == 5) {
					deleteParamMap.put("area_type", "sgg");
				} else {
					deleteParamMap.put("area_type", "emdong");
				}
				
				switch(sopCdLen) {
				case 2:
					insertParamMap.put("sido_cd", sopCd);
					insertParamMap.put("area_type", "sido");
					break;
					
				case 5:
					insertParamMap.put("sido_cd", sopCd.substring(0, 2));
					insertParamMap.put("sgg_cd", sopCd.substring(2, 5));
					insertParamMap.put("area_type", "sgg");
					break;
					
				case 7:
					insertParamMap.put("sido_cd", sopCd.substring(0, 2));
					insertParamMap.put("sgg_cd", sopCd.substring(2, 5));
					insertParamMap.put("emdong_cd", sopCd.substring(5));
					insertParamMap.put("area_type", "emdong");
					break;
				}
				
				success = relManageDao.insertKosisCode(deleteParamMap, insertParamMap);
			}
//			return  relManageDao.updateKosis(paramMap);
			
			return success;
		}  catch (AbsAPIException e) {
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
		return null;
	}
	
	private enum MustParam{
		kosis_inst_cd,
		kosis_tb_id,
		kosis_base_year,
		kosis_cd,
		kosis_nm,
		prev_sop_cd,
		sop_cd
	}
	
	@Override
	public String getWorkNm() {
		// TODO Auto-generated method stub
		return "수정";
	}
}
