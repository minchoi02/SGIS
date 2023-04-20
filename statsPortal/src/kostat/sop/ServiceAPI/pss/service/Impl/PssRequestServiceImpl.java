package kostat.sop.ServiceAPI.pss.service.Impl;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.sop.ServiceAPI.pss.mapper.PssRequestMapper;
import kostat.sop.ServiceAPI.pss.service.PssRequestService;
import kostat.sop.ServiceAPI.pss.vo.PssVo;
import kr.co.offton.jdf.db.RecordModel;
import kr.co.offton.jdf.util.StringUtil;
import kr.co.offton.pdf.Const;
import kr.co.offton.pdf.basis.GeneralBroker;
import kr.co.offton.pdf.basis.LData;



@Service("pssRequestService")
public class PssRequestServiceImpl extends EgovAbstractServiceImpl implements PssRequestService {
	
	/** CommonDAO */
	@Resource(name="pssRequestMapper")
	private PssRequestMapper pssRequestMapper;
	
	@Override
	public List selectCategoryCode(Map<String, Object> mapParameter) throws SQLException {
		return pssRequestMapper.selectCategoryCodeList(mapParameter);
	}

	@Override
	public List selectCensusCode(Map<String, Object> mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectCensusCodeList(mapParameter);
	}

	@Override
	public List selectCensusData(Map<String, Object> mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectCensusDataList(mapParameter);
	}

	@Override
	public List selectCensusYear(Map<String, Object> mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectCensusYearList(mapParameter);
	}
	
	@Override
	public List selectCensusDetail(Map<String, Object> mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectCensusDetailList(mapParameter);
	}

	@Override
	public List selectCensusSido(Map<String, Object> mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectCensusSidoList(mapParameter);
	}

	@Override
	public List selectCensusSigungu(Map<String, Object> mapParameter) throws SQLException {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectCensusSigunguList(mapParameter);
	}

	@Override
	public List<Object> selectCodeList(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectcodeList(map);
	}

	@Override
	public List<Object> selectAreaCodeList(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return pssRequestMapper.selectAreaCodeList(map);
	}

	@Override
	public Map<String, String> savePssData(PssVo pssVo) throws Exception {
		
		Map<String, String> returnMap = new HashMap<>();
		
		
		Long waitTime = (long)60 ;   // (long)300 //운영시 300초
		
		Date curDate = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		curDate = sdf.parse(sdf.format(curDate));
		long nowTime = curDate.getTime()/1000;
		
		long preInsTime = 0;
		if (pssVo.getSec_reg_time() != null && !pssVo.getSec_reg_time().equals("")) {
			preInsTime = Long.parseLong(pssVo.getSec_reg_time());			
		}
		
		String msg = "";
		String returnCode = "0";
		
		if( preInsTime > 0 && (nowTime-preInsTime) < waitTime ) {
			returnMap.put("msgCode", "0");
			returnMap.put("msg", "이미 센서스경계 자료를 신청하였습니다.\n5분이내 재신청은 불가능 하오니 5분후에 다시 신청하시기 바랍니다.");
			return returnMap; 
		}
		
		
		int sizeLimit   = 10*1024*1024 ; 		//10메가까지 제한 넘어서면 예외발생
		
		
		GeneralBroker broker =  new GeneralBroker("ceaa00");
		RecordModel rm = null;
		RecordModel rmmod = null; // 수정
		
		LData lData  = new LData();
		
		String privacy01 = pssVo.getSgis_census_req_company() + " " + pssVo.getSgis_census_req_goal();   // 점검 데이터
		String privacy02 = StringUtil.privacy(privacy01);
		
		System.out.println(pssVo.toString());
		
		if (privacy02.equals("")) { // 개인정보 노출 점검
			
			if(pssVo.getaT().equals("INS")) {
				
				lData.setString("PARAM", "CENSUS_APPLY_MAXNUM");
				rm = broker.getList(lData);
				if(rm.next())  pssVo.setSgis_census_req_id(String.valueOf((BigDecimal)rm.get("maxnum"))) ;
				
				for(int i=0;i<pssVo.getSgis_census_id_new().length;i++) {
					insertPssData(broker,lData,pssVo,pssVo.getSgis_census_id_new()[i],i);
				}
				
				updatePssData(broker,lData,pssVo);
				
				
			} else if(pssVo.getaT().equals("RET")){
				
				/****************************************/
				/* 승인, 반려된 경우 수정할 수 있는 권한이 없다.*/
				/* 화면상에서 1차점검후 재차 수정권한 점검*/
				/****************************************/
				
				lData.setString("PARAM", "ISEDIT");
				lData.setString("sgis_census_req_id", pssVo.getSgis_census_req_id());
				rm = broker.getList(lData);
				String status="";
				if(rm.next()) status = String.valueOf((Character)rm.get("sgis_census_req_status"));
				
				if((status.equals("A") || status.equals("B")) && !pssVo.getaT().equals("")) {
					msg = "센서스경계 자료신청이 승인(반려) 되었습니다. 수정하실 수 있는 권한이 없습니다.";
					returnCode="2";
				}else if(status.equals("S")) {
					
					/******************************/
					/* 센서스 년도 삭제후 재등록 */
					/******************************/

					if(!pssVo.getOld_census_file().equals("")){
						pssVo.setFileName(pssVo.getOld_census_file());
					}
					
					/******************************/
					/* 센서스 년도 삭제후 재등록 */
					/******************************/
					lData.setString("PARAM", "REMOVE_CENSUS_REQ_YEAR_CODE2");
					broker.process(Const.P_DEL, lData);
					
				    // 센서스자료신청 삭제
					lData.setString("PARAM", "REMOVE_CENSUS_REQ");
					broker.process(Const.P_DEL, lData);
					
					for(int i=0;i<pssVo.getSgis_census_id_new().length;i++) {
						insertPssData(broker,lData,pssVo,pssVo.getSgis_census_id_new()[i],i);
					}
					
					updatePssData(broker,lData,pssVo);
					
				}
				
			}
			
			returnMap.put("msgCode", "2");
			returnMap.put("msg", "2");
		   	
		}else{
			returnMap.put("msgCode", "3");
			returnMap.put("msg", "개인정보 노출  (주민번호, 사업자번호, 법인번호, 신용카드번호, 핸드폰번호) 제거 후 등록 하세요.");
		}
		
		return returnMap;
	}
	
	private void updatePssData(GeneralBroker broker, LData lData, PssVo pssVo) throws SQLException, Exception{
		//System.out.println("저장으로 전환");
		lData.setString("PARAM", "CENSUS_APPLY_COMPLE");
		lData.setString("sgis_census_req_id", pssVo.getSgis_census_req_id());
		broker.process(Const.P_INS, lData);
	}
	
	private void insertPssData(GeneralBroker broker, LData lData, PssVo pssVo,String saveKey,int index) throws SQLException, Exception {
		RecordModel rm = null;
		
		
		/******************************/
		/* 신청내역 마스터 등록 */
		/******************************/
		
		lData.setString("PARAM", "CENSUS_APPLY");
		lData.setString("sgis_census_req_id", pssVo.getSgis_census_req_id());
		lData.setString("sgis_census_data_id", pssVo.getSgis_census_data_id_new()[index]);
		lData.setString("sgis_census_id", pssVo.getSgis_census_id_new()[index]);
		
		lData.setString("sgis_census_req_company", pssVo.getSgis_census_req_company());
		
		String telStr = pssVo.getSgis_census_req_tel_1()+"-"+pssVo.getSgis_census_req_tel_2()+"-"+pssVo.getSgis_census_req_tel_3();
		lData.setString("sgis_census_req_tel", telStr.replaceAll("\\<(\\/?)(\\w+)*([^<>]*)>", "").replaceAll("\'", "&apos;").replaceAll("\"","&quot;").replaceAll("&","&amp;"));
		lData.setString("sgis_census_req_goal", pssVo.getSgis_census_req_goal());
		lData.setString("fileName", pssVo.getFileName());
		lData.setString("sc_userkey", pssVo.getSgis_userkey());

		
		lData.setString("sgis_census_req_sosok", pssVo.getSgis_census_req_sosok());
		lData.setString("sgis_census_req_mokjuk", pssVo.getSgis_census_req_mokjuk());
		lData.setString("census_output_area_year", pssVo.getCensus_output_area_dts_year_new()[index]);  //  집계년도를 디테일 집계년도 동일하게 맞춤 (2022-06-28 아이티밴드)
		lData.setString("sgis_census_req_kwaje", cleanXss(pssVo.getSgis_census_req_kwaje()));
		String email = pssVo.getEmail_id() +"@"+pssVo.getEmail_addr();
		lData.setString("sgis_census_req_email", cleanXss(email));
		lData.setString("census_output_area_dts_year", pssVo.getCensus_output_area_dts_year_new()[index]);   
		lData.setString("detail_data_seq", Integer.toString(index));
		
		pssVo.setResultFlag(broker.process(Const.P_INS, lData));
		
		
		/******************************/
		/* 신청내역 디테일 등록  */
		/******************************/
		lData.setString("PARAM", "CENSUS_APPLY_YEAR_CODE");
		
		lData.setString("sgis_census_detail_data_id", pssVo.getSgis_census_detail_data_id_new()[index]);
		
	
		if(!pssVo.getSgis_census_year_id_new()[index].equals("") && pssVo.getSgis_census_year_id_new()[index] != null)   lData.setString("years", pssVo.getSgis_census_year_id_new()[index]);

		
		
		if(pssVo.getSgis_census_sido_id_new()[index].length() < 4 ||pssVo.getSgis_census_sido_id_new()[index].equals("--") || pssVo.getSgis_census_sido_id_new()[index].equals("-") 
				|| pssVo.getSgis_census_sido_id_new()[index] == "" || pssVo.getSgis_census_sido_id_new()[index] == null)   lData.setString("sido", "-");
		else 									                                    lData.setString("sido", pssVo.getSgis_census_sido_id_new()[index].substring(4));
		
		if(pssVo.getSgis_census_sigungu_id_new()[index] == "--" || pssVo.getSgis_census_sigungu_id_new()[index] == "" || pssVo.getSgis_census_sigungu_id_new()[index] == null)   lData.setString("sigungu", "-");
		else 									                           lData.setString("sigungu", pssVo.getSgis_census_sigungu_id_new()[index]);
		
	
		lData.setString("sgis_census_id", pssVo.getSgis_census_id_new()[index]);
		lData.setString("sgis_census_data_id", pssVo.getSgis_census_data_id_new()[index]);
		lData.setString("sgis_census_req_id", pssVo.getSgis_census_req_id());
		
		if(pssVo.getCensus_output_data_type_new()[index].equals("2")) {
			String codeStr = "";
			
			if(pssVo.getSgis_census_req_map_code().length >0 ) codeStr =codeStr +pssVo.getSgis_census_req_map_code()[index]+"_";
			else codeStr = "_";
			
			String endStr = "";
			if(pssVo.getSgis_census_req_map_level().length < 1 || pssVo.getSgis_census_req_map_level()[index] == "" || pssVo.getSgis_census_req_map_level()[index].equals("") || pssVo.getSgis_census_req_map_level()[index] == null ) {
				//pssVo.getSgis_census_req_map_level()[index] = "NO";
				endStr = "NO";
			}else {
				endStr = pssVo.getSgis_census_req_map_level()[index];
			}
			
			codeStr =codeStr +endStr;
			
			lData.setString("sgis_census_detail_data_id", codeStr);
		}
		
		lData.setString("inUse", "Y");
		lData.setString("detail_data_seq", Integer.toString(index));
		broker.process(Const.P_INS, lData);
		
	}
	
	public static String cleanXss(String value) {
		// TODO Auto-generated method stub
		if (value != null) {
			value = value.replaceAll("&", "&amp;");
			value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			value = value.replaceAll("#", "&#35");
			value = value.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
			value = value.replaceAll("'", "&#39;");
			value = value.replaceAll("\"", "&quot;");

			value = value.replaceAll("eval\\((.*)\\)", "");
			value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
			value = value.replaceAll("script", "");
	        return value;
		} else
			return value;

	}

	
}
