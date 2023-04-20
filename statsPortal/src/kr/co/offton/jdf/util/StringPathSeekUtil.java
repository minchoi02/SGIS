package kr.co.offton.jdf.util;

import kr.co.offton.jdf.basis.GeneralObject;
/**
 * <pre>
 * PGM_NAME: OFFTON StringPathSeekUtil
 * DESC:   경계  파일 맵핑
 * author: (주)아이티밴드
 * since: 2020
 * history: version 1.0
 * see:
 * </pre>
 **/
public final class StringPathSeekUtil extends GeneralObject {

  /**
   * <pre>
   * param String input�� null�̾ input.trim().length()�� 0�̸� return true, �ƴϸ� return false;
   * @param  input
   * @return boolean
   * </pre>
   */
  public static String getFullPath(String str, String year, String no) {
		String filePathMap1 = "/grid_board/grid_#year#/grid_#gridcode#/";
		String filePathMap2 = "/grid_board/urban/도시화경계_#year#/";
		
		String result = no.equals("0")? filePathMap1 : filePathMap2 ;
		
		//grid_0_라사_100K_Y
		String strArray[] = str.split("_");
		result  = result.replaceAll("#year#", year);
		result  = result.replaceAll("#gridcode#", strArray[2]);		
	   return 	result   ;     
  }
  
  public static String getFileName(String str, String year, String no) {
		String filePathMap1 = "grid_#gridcode#.zip";
		String filePathMap2 = "도시화경계_#year#.zip";
		
		String result = no.equals("0") ? filePathMap1 : filePathMap2 ;
		
		//grid_0_라사_100K_Y
		String strArray[] = str.split("_");
		result  = result.replaceAll("#year#", year);
		result  = result.replaceAll("#gridcode#", strArray[2]);		
	   return 	result   ;     
  }
  
}