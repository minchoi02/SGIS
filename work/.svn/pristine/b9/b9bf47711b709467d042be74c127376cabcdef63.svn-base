package kostat.lbdms.ServiceAPI.common.util;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.openxml4j.opc.PackageAccess;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.xssf.eventusermodel.ReadOnlySharedStringsTable;
import org.apache.poi.xssf.eventusermodel.XSSFReader;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.json.JSONArray;
import org.json.JSONObject;



/**
 * 
 * XSSF and XML Stream Reader
 * 
 * If memory footprint is an issue, then for XSSF, you can get at the underlying XML data, and process it yourself. This is intended for intermediate
 * developers who are willing to learn a little bit of low level structure of .xlsx files, and who are happy processing XML in java. Its relatively
 * simple to use, but requires a basic understanding of the file structure. The advantage provided is that you can read a XLSX file with a relatively
 * small memory footprint.
 * 
 * @author lchen
 * 
 */
public class XExcelFileReader {
	private int rowNum = 0;
	private OPCPackage opcPkg;
	private ReadOnlySharedStringsTable stringsTable;
	private XMLStreamReader xmlReader;
	private String filepath;
	
	public XExcelFileReader(String excelPath) throws Exception {
		this.filepath = excelPath;
		
		opcPkg = OPCPackage.open(excelPath, PackageAccess.READ);
		this.stringsTable = new ReadOnlySharedStringsTable(opcPkg);

		XSSFReader xssfReader = new XSSFReader(opcPkg);
		XMLInputFactory factory = XMLInputFactory.newInstance();
		InputStream inputStream = xssfReader.getSheetsData().next();
		
		xmlReader = factory.createXMLStreamReader(inputStream);

		while (xmlReader.hasNext()) {
			xmlReader.next();
			if (xmlReader.isStartElement()) {
				if (xmlReader.getLocalName().equals("sheetData"))
					break;
			}
		}
	}

	public int rowNum() {
		return rowNum;
	}

	public List<String[]> readRows(int batchSize) throws XMLStreamException {
		String elementName = "row";
		List<String[]> dataRows = new ArrayList<String[]>();
		if (batchSize > 0) {
			while (xmlReader.hasNext()) {
				xmlReader.next();
				if (xmlReader.isStartElement()) {
					if (xmlReader.getLocalName().equals(elementName)) {
						rowNum++;
						dataRows.add(getDataRow());
						if (dataRows.size() == batchSize)
							break;
					}
				}
			}
		}
		return dataRows;
	}

	private String[] getDataRow() throws XMLStreamException {
		List<String> rowValues = new ArrayList<String>();
		while (xmlReader.hasNext()) {
			xmlReader.next();
			if (xmlReader.isStartElement()) {
				if (xmlReader.getLocalName().equals("c")) {
					CellReference cellReference = new CellReference(xmlReader.getAttributeValue(null, "r"));
					// Fill in the possible blank cells!
					while (rowValues.size() < cellReference.getCol()) {
						rowValues.add("");
					}
					String cellType = xmlReader.getAttributeValue(null, "t");
					rowValues.add(getCellValue(cellType));
				}
			} else if (xmlReader.isEndElement() && xmlReader.getLocalName().equals("row")) {
				break;
			}
		}
		return rowValues.toArray(new String[rowValues.size()]);
	}

	private String getCellValue(String cellType) throws XMLStreamException {
		String value = ""; // by default
		while (xmlReader.hasNext()) {
			xmlReader.next();
			if (xmlReader.isStartElement()) {
				if (xmlReader.getLocalName().equals("v")) {
					if (cellType != null && cellType.equals("s")) {
						int idx = Integer.parseInt(xmlReader.getElementText());
						return new XSSFRichTextString(stringsTable.getEntryAt(idx)).toString();
					} else {
						return xmlReader.getElementText();
					}
				}
			} else if (xmlReader.isEndElement() && xmlReader.getLocalName().equals("c")) {
				break;
			}
		}
		return value;
	}

	@Override
	protected void finalize() throws Throwable {
		if (opcPkg != null)
			opcPkg.close();
		super.finalize();
	}
	
	public JSONArray readRow( int readCnt ){
		JSONArray values = new JSONArray();
		
		try {
			XExcelFileReader xefr = new XExcelFileReader( this.filepath );
			List<String[]> readRows = xefr.readRows( readCnt );
			
			for (int i = 0; i < readRows.size(); i++) {
				JSONObject value = new JSONObject();
				
				String[] rrows = readRows.get(i);
				System.out.println("rrows=======");
				System.out.println(rrows.toString());
				for (int j = 0; j < rrows.length; j++) {
				    	System.out.println(rrows[j]);
					//value.put(j, rrows[j]);
				    	value.put(Integer.toString(j), rrows[j]);
				    	
				}
			
				//values.add( value );
				values.put(value);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return values;
	}
	private List<String> getDataCellValueList() throws XMLStreamException {
		List<String> rowValues = new ArrayList<String>();
		while (xmlReader.hasNext()) {
			xmlReader.next();
			if (xmlReader.isStartElement()) {
				if (xmlReader.getLocalName().equals("c")) {
					CellReference cellReference = new CellReference(xmlReader.getAttributeValue(null, "r"));
					// Fill in the possible blank cells!
					while (rowValues.size() < cellReference.getCol()) {
						rowValues.add("");
					}
					String cellType = xmlReader.getAttributeValue(null, "t");
					rowValues.add(getCellValue(cellType));
				}
			} else if (xmlReader.isEndElement() && xmlReader.getLocalName().equals("row")) {
				break;
			}
		}
		return rowValues;
	}
	public void excelToCsv(String localFullPath, String delimiter) throws XMLStreamException {
		String rowData = "";
		BufferedWriter out = null;
		List<String> dataRows = new ArrayList<String>();
		boolean flag = false;
		int delimiterCnt = 0;
		try {
			out = new BufferedWriter(new FileWriter(localFullPath));
			boolean isFirst = true;
			
			while (xmlReader.hasNext()) {
				xmlReader.next();
				if (xmlReader.isStartElement()) {
					if (xmlReader.getLocalName().equals("row")) {
						rowData = "";
						dataRows = this.getDataCellValueList();
						for (int index = 0; index < dataRows.size(); index++) {
							if (index != dataRows.size() - 1) {
								rowData += dataRows.get(index) + delimiter;
							} else {
								rowData += dataRows.get(index);
							}
						}
						flag = true;
					}
					rowNum++;
					if (flag) {
						if (isFirst) {
							delimiterCnt = StringUtils.countMatches(rowData, delimiter);
							isFirst = false;
						} else {
							int tempDelCnt = StringUtils.countMatches(rowData, delimiter);
							if (delimiterCnt > tempDelCnt) {
								int plusDelCnt = delimiterCnt - tempDelCnt;
								for (int ii = 0; ii < plusDelCnt; ii++) {
									rowData += delimiter;
								}
							}
						}
						out.write(rowData);
						out.newLine();
						flag = false;
					}
				}
			}
		} catch (IOException e) {

		} finally {

			try {
				out.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}	
}