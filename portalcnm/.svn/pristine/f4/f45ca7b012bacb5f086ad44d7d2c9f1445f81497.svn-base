package kr.co.offton.jdf.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import kr.co.offton.jdf.basis.GeneralObject;
import kr.co.offton.pdf.basis.LData;

/**
 * 엑셀파일과 관련된 기능을 제공하는 클래스
 * @author Offton
 */
public class ExcelUtil extends GeneralObject {
	/**
	 * 규약대로 작성된 엑셀파일을 LData객체의 (K,V)형태로 변환한다.
	 * 
	 * 엑셀파일은 다음과 같은 규약을 가진다.
	 *    1. 복 수 개의 워크시트를 가질 수 있다.
	 *    2. 각 시트는 공통영역과 데이터영역을 가지고 
	 *       각 영역은 작성되지 않은 빈 행로 구분된다.
	 *    3. 공통영역은 아래와 같이 구성된다.
	 *       a. 항목명 | 항목코드 | 항목값 | 적요
	 *    4. 데이터 영역은 시작 행(n)은 항목의 한글명, 다음 행(n+1)은 항목의 영문명
	 *       그 다음 행(n+2)부터 데이터가 시작한다.
	 *    5. 데이터 영역의 첫번째 행이 비어있으면 데이터의 종료로 간주한다.
	 *            
	 * @param tempFilePath 엑셀파일경로
	 * @return 약속된 엑셀파일형식을 LData타입으로 변환한 객체
	 */
	public static List convertToLDatas(String tempFilePath) {

		int sheetCount                  = 0;	
		Workbook workbook               = null;
		List commonParams               = null;
		List commonFieldNames           = null;
		List fieldNames                 = null;
		List exportList                 = null;
		int exportIdx                   = 0;  		
		
		try {
			File xlsFile            = new File(tempFilePath);
			
			// 엑셀 객체 인스턴스 생성
			if (xlsFile != null) {
				workbook   = Workbook.getWorkbook(xlsFile);		
				sheetCount = workbook.getSheets().length;
			}
			
			Sheet sheet = null;
			
			for (int i = 0; i < sheetCount; i++) {
				sheet = workbook.getSheet(i);
				
				// 공통영역(key, value)
				int m = 0;			
				commonParams     = new ArrayList();
				commonFieldNames = new ArrayList();
				
				while (true) {
					Cell commField   = sheet.getCell(1, m);
					String commValue = commField.getContents() == null ? "" : commField.getContents(); 
					
					if (StringUtil.isEmpty(commValue)) {
						break;
					} else {
						String commFieldName  = sheet.getCell(2, m).getContents() == null ? "" : sheet.getCell(2, m).getContents(); 
						String commFieldValue = sheet.getCell(3, m).getContents() == null ? "" : sheet.getCell(3, m).getContents();
						
						commonParams.add(commFieldValue.trim());
						commonFieldNames.add(commFieldName.trim());
						m++;
					}	
				}
				
				// 데이터 영역(key)
				int k = 1;			
				int headerKeyIndex = m + 2;

				fieldNames = new ArrayList();
				while (true) {

					try {
						Cell metaField   = sheet.getCell(k, headerKeyIndex);
						String fieldName = metaField.getContents() == null ? "" : metaField.getContents();		
						
						if (StringUtil.isEmpty(fieldName)) {
							break;
						} else {
							fieldNames.add(fieldName.trim());
							k++;
						}
					} catch (Exception e) {
						break;
					}
				}
				
				// 데이터 영역 처리(value)
				int dataRowIdx = headerKeyIndex + 1;
				exportIdx      = 0;
				exportList     = new ArrayList();
				
				if (fieldNames.size() != 0) {	
					dataRead : 
					while (true) {
						LData recordData = new LData();
						
						for (int j = 1; j <= fieldNames.size(); j++) {
							Cell cell = sheet.getCell(j, dataRowIdx);
							String cellData = cell.getContents() == null ? "" : cell.getContents();
							
							if (j == 1 && StringUtil.isEmpty(cellData)) {
								break dataRead;
							}
							
							if (j == 1) {
								for (int n = 0; n < commonParams.size(); n++) {
									recordData.set("_sheet_id", String.valueOf(i));
									recordData.set((String) commonFieldNames.get(n), (String) commonParams.get(n));
								}
							}	
							
							recordData.set((String) fieldNames.get(j - 1), cellData.trim());
						}
						
						exportList.add(recordData);
						exportIdx++;
						dataRowIdx++;				
					}
				}
			}
		} catch (Exception e) {
			logger.debug("엑셀파일 변환 중 오류가 발생했습니다.");
			logger.debug(e);
		} finally {
			if (workbook != null) {
				workbook.close();
			}	
		}
		
		return exportList;
	}
}
