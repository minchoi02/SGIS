package kostat.lbdms.ServiceAPI.common.web.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.geotools.data.DefaultTransaction;
import org.geotools.data.Transaction;
import org.geotools.data.collection.ListFeatureCollection;
import org.geotools.data.shapefile.ShapefileDataStore;
import org.geotools.data.shapefile.ShapefileDataStoreFactory;
import org.geotools.data.simple.SimpleFeatureCollection;
import org.geotools.data.simple.SimpleFeatureSource;
import org.geotools.data.simple.SimpleFeatureStore;
import org.geotools.feature.simple.SimpleFeatureBuilder;
import org.geotools.feature.simple.SimpleFeatureTypeBuilder;
import org.geotools.geometry.jts.Geometries;
import org.geotools.geometry.jts.JTSFactoryFinder;
import org.geotools.referencing.CRS;
import org.geotools.referencing.ReferencingFactoryFinder;
import org.opengis.feature.simple.SimpleFeature;
import org.opengis.feature.simple.SimpleFeatureType;
import org.opengis.referencing.FactoryException;
import org.opengis.referencing.crs.CRSFactory;
import org.opengis.referencing.crs.CoordinateReferenceSystem;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryCollection;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.geom.Polygon;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKTReader;

/**
 * 1. 기능 : FileCreateUtil
 * <p>
 * 2. 처리개요 : 파일 생성 , txt , xlsx , shp 생성
 * <p>
 * 3. 주의사항 :
 * <p>
 * 
 * <pre>
 *  <b>History:</b> 
 *     작성자 : 최재영, 1.0, 2018/10/17  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 최재영
 * @version 1.0
 * @see
 *      <p/>
 */
public class FileCreateUtil {
	private static final Logger logger = LoggerFactory.getLogger(FileCreateUtil.class);
	private static FileCreateUtil instance;
	// local
	//public static final String filePath = "D:\\fileCreate";
	// linux Dev
	//public static final String filePath ="/usr/local/tomcat7/attach/files/download";
	public static final String filePath = ConfigUtil.getString("fileDownLoad.defaultPath");
	private String dataType;

	private FileCreateUtil() {

	}

	private FileCreateUtil(String dataType) {
		this.dataType = dataType;
	}

	private void setDataType(String dataType) {
		this.dataType = dataType;
	}

	public static FileCreateUtil getInstance(String dataType) {
		if (instance == null) {
			instance = new FileCreateUtil(dataType);
		} else {
			instance.setDataType(dataType);
		}
		return instance;
	}

	// 파일 생성
	public void createFile(String schema, String data_nm, List<Map<String, String>> columnListInfo,
			List<Map<String, Object>> geoInfoList, List<Map<String, Object>> metaData,String action_type) {

		String createFilePath = filePath + "/" + schema + "/" + data_nm;
		createPath(createFilePath);

		if (this.dataType.equals("xlsx")) {
			getXSSFWorkbook(createFilePath, data_nm, columnListInfo, geoInfoList, metaData);

		} else if (this.dataType.equals("txt")) {
			getTxtFiles(createFilePath, data_nm, columnListInfo, geoInfoList, metaData);
		} else if (this.dataType.equals("shp")) {
			getSHPFile(createFilePath, data_nm, columnListInfo, geoInfoList, metaData,action_type);
		}

	}

	public void createPath(String path) {
		String mkdirPath = path;

		File desti = new File(mkdirPath);
		if (!desti.exists()) {
			desti.mkdirs();
		}

	}

	// 파일 경로의 파일 이름 가져오기
	public String searchFileNames(String path) {
		return null;
	}

	// 파일을 압축하기
	public String zipFile(String rootPath, String schema) {
		// deleteZip(rootPath,schema);
		String zipFileName = rootPath + "/" + schema + ".zip";
		//System.out.println("zipFileName == " + zipFileName);
		ZipOutputStream out = null;
		byte[] buf = new byte[32768];
		try {
			out = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(zipFileName)));

			File desti = new File(rootPath);
			//System.out.println("destiPath = " + desti.getPath());
			if (desti.exists()) {
				
				File[] tables = null;
				tables = desti.listFiles();
				FileInputStream fis = null;
				BufferedInputStream bis = null;

				for (int i = 0; i < tables.length; i++) {
					File table = new File(tables[i].getPath());
					if (table.isDirectory()) {
						File[] subFiles = table.listFiles();

						for (int j = 0; j < subFiles.length; j++) {

							fis = new FileInputStream(table.getPath() + "/" + subFiles[j].getName());
							bis = new BufferedInputStream(fis, 4096);
							out.putNextEntry(new ZipEntry(subFiles[j].getName()));
							out.setLevel(8);
							int len;
							while ((len = bis.read(buf, 0, 32768)) != -1) {
								out.write(buf, 0, len);
							}
						}
					}
				}

				out.closeEntry();
				out.close();
				bis.close();
				fis.close();
			}

		} catch (IOException e) {
			// TODO: handle exception
			logger.error(e.getMessage());
		}

		return zipFileName;
	}

	public String[] getRootFolders(String rootPath) {

		File desti = new File(rootPath);

		return null;
	}

	// zip파일 가져오기
	public String getZipfile(String rootPath, String schema) {
		String filePath = zipFile(rootPath, schema);
		return filePath;
	}

	// zip파일 지우기 
//	public void deleteZip(String rootPath, String fileName) {
//	    File desti = new File(rootPath);
//	    if(desti.exists()) {
//		
//	    }
//	}

	// 파일을 지우기
	public static void deleteFiles(String path) {
		String mkdirPath = path;
		File desti = new File(mkdirPath);
		if (desti.exists()) {
			File[] destory = desti.listFiles();
			for (File des : destory) {
			    if(des.isDirectory()) {
				File[] innerDestory = des.listFiles();
				for(File inner : innerDestory) {
				   inner.delete(); 
				}
			    }else {
				des.delete();
			    }
			    	
				
			}
		}
	}

	// 파일을 압축하기
	public void fileZip() {

	}

	// txt file
	private int getTxtFiles(String createFilePath, String data_nm, List<Map<String, String>> columnListInfo,
			List<Map<String, Object>> geoInfoList, List<Map<String, Object>> metaData) {

		File file = new File(createFilePath + "/" + data_nm + ".txt");
		FileWriter writer = null;

		try {
			writer = new FileWriter(file, true);
			for (int i = 0; i < columnListInfo.size(); i++) {
				Map<String, String> columnInfo = columnListInfo.get(i);
				writer.write(columnInfo.get("column_kor_name"));
				if (i < columnListInfo.size() - 1) {
					writer.write(",");
				}
			}
			writer.write("\r\n");
			for (int i = 0; i < metaData.size(); i++) {
				Map<String, Object> metaMap = metaData.get(i);

				for (int j = 0; j < columnListInfo.size(); j++) {
					Map<String, String> columnInfo = columnListInfo.get(j);
					if (metaMap.containsKey(columnInfo.get("column_name"))) {
						writer.write(metaMap.get(columnInfo.get("column_name")).toString().replaceAll(",", ""));
					} else {
						writer.write(" ");
					}

					if (j < columnListInfo.size() - 1) {
						writer.write(",");
					}
				}
				writer.write("\r\n");

			}
			writer.flush();
			writer.close();
			return 1;
		} catch (IOException e) {
			/*e.printStackTrace();*/
			logger.error(e.getMessage());
			return 0;
		}

	}

	// XSSFWorkbook
	private int getXSSFWorkbook(String createFilePath, String data_nm, List<Map<String, String>> columnListInfo,
			List<Map<String, Object>> geoInfoList, List<Map<String, Object>> metaData) {

		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet();

		XSSFRow row = null;
		XSSFCell cell = null;
		row = sheet.createRow(0);
		for (int i = 0; i < columnListInfo.size(); i++) {
			Map<String, String> columnInfo = columnListInfo.get(i);
			cell = row.createCell(i);
			cell.setCellValue(columnInfo.get("column_kor_name"));
		}

		/* row = sheet.createRow(0); */

		for (int i = 0; i < metaData.size(); i++) {
			row = sheet.createRow(i + 1);

			Map<String, Object> metaMap = metaData.get(i);
			for (int j = 0; j < columnListInfo.size(); j++) {
				cell = row.createCell(j);

				Map<String, String> columnInfo = columnListInfo.get(j);
				if (metaMap.containsKey(columnInfo.get("column_name"))) {
					cell.setCellValue(metaMap.get(columnInfo.get("column_name")).toString());
				} else {
					cell.setCellValue("");
				}
			}
		}

		File file = new File(createFilePath + "/" + data_nm + ".xlsx");
		FileOutputStream fileOut;
		try {
			fileOut = new FileOutputStream(file);
			workbook.write(fileOut);
			return 1;
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.error(e.getMessage());
			return 0;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			logger.error(e.getMessage());
			return 0;
		}

	}

	// SHP

	/**
	 * @param fileName
	 * @param columnList
	 *            , metaData ,geoCodingInfo
	 */
	private void getSHPFile(String createFilePath, String data_nm, List<Map<String, String>> columnListInfo,
			List<Map<String, Object>> geoInfoList, List<Map<String, Object>> metaData , String action_type) {

		// geometry_type
		/*String strUtmkWKT = "PROJCS[\"UTM-K\"," + "GEOGCS[\"GCS_ITRF_2000\","
				+ "DATUM[\"D_ITRF_2000 (EPSG ID 9028080)\","
				+ "SPHEROID[\"GRS_1980 (EPSG ID 9021980)\",6378137.0,298.257222101]]," + "PRIMEM[\"Greenwich\",0.0],"
				+ "UNIT[\"degree\",0.017453292519943295]," + "AXIS[\"Longitude\",EAST]," + "AXIS[\"Latitude\",NORTH]],"
				+ "PROJECTION[\"Transverse_Mercator\"]," + "PARAMETER[\"central_meridian\",127.5],"
				+ "PARAMETER[\"latitude_of_origin\",38.0]," + "PARAMETER[\"scale_factor\",0.9996],"
				+ "PARAMETER[\"false_easting\",1000000.0]," + "PARAMETER[\"false_northing\",2000000.0],"
				+ "UNIT[\"m\",1.0]," + "AXIS[\"x\",EAST]," + "AXIS[\"y\",NORTH]]";*/
		
		String strUtmkWKT =  "PROJCS[\"Korea 2000 / Unified CS\",GEOGCS[\"Korea 2000\",DATUM[\"Geocentric_datum_of_Korea\",SPHEROID[\"GRS 1980\",6378137,298.257222101,AUTHORITY[\"EPSG\",\"7019\"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY[\"EPSG\",\"6737\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.0174532925199433,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4737\"]],PROJECTION[\"Transverse_Mercator\"],PARAMETER[\"latitude_of_origin\",38],PARAMETER[\"central_meridian\",127.5],PARAMETER[\"scale_factor\",0.9996],PARAMETER[\"false_easting\",1000000],PARAMETER[\"false_northing\",2000000],UNIT[\"metre\",1,AUTHORITY[\"EPSG\",\"9001\"]],AUTHORITY[\"EPSG\",\"5179\"]]";
		SimpleFeatureTypeBuilder sftb = new SimpleFeatureTypeBuilder();
		CRSFactory crsFactory = ReferencingFactoryFinder.getCRSFactory(null);

		// geoInfoList
		// pos_method : GEOM , pos_columns : geom
		// pos_method : XY , pos_columns x,y
		boolean multiType = false;
		try {
			/*CoordinateReferenceSystem crs = crsFactory.createFromWKT(strUtmkWKT);*/
			CoordinateReferenceSystem crs = CRS.parseWKT(strUtmkWKT);
			/*sftb.setName("UTM-k");*/
			sftb.setName("Location");
			sftb.setCRS(crs);

			// poi 타입인가
			// polygon 타입인가
			Map<String, Object> geoCodingInfo = geoInfoList.get(0);
			
			if (geoCodingInfo.get("pos_method").toString().equalsIgnoreCase("GEOM") || action_type.equalsIgnoreCase("VORONOI_ANALY") ||action_type.equalsIgnoreCase("SPACE_ANALY")) {
				sftb.add("the_geom", MultiPolygon.class);
				multiType = true;
			} else {
				sftb.add("the_geom", Point.class);
				multiType = false;
			}

			SimpleFeatureType TYPE = null;
			List<SimpleFeature> features = new ArrayList<SimpleFeature>();
			SimpleFeature feature = null;

			for (int i = 0; i < columnListInfo.size(); i++) {
				Map<String, String> columnInfo = columnListInfo.get(i);
				String colNm = columnInfo.get("column_kor_name");
				sftb.add(new String(colNm.getBytes("EUC-KR"), "ISO-8859-1"), String.class);
			}

			TYPE = sftb.buildFeatureType();
			// data
			for (int i = 0; i < metaData.size(); i++) {

				Map<String, Object> metaMap = metaData.get(i);
				ArrayList dispData = new ArrayList();
				int dispSize = columnListInfo.size();
				
				if(dispSize > 35) {
					dispSize = 35;
				}
						
				/*for (int j = 0; j < columnListInfo.size(); j++) {

					String columnValue = "";
					Map<String, String> columnInfo = columnListInfo.get(j);
					if (metaMap.containsKey(columnInfo.get("column_name"))) {
					    	//geom = > geomtext
					    	if(columnInfo.get("column_name").toString().equals("geom") && metaMap.containsKey("geomtext")) {
					    	    columnValue = metaMap.get("geomtext").toString();
					    	}else {
					    	    columnValue = metaMap.get(columnInfo.get("column_name")).toString();
					    	}
					    	
					}
					dispData.add(columnValue);
				}*/
				
				for (int j = 0; j < dispSize; j++) {

					String columnValue = "";
					Map<String, String> columnInfo = columnListInfo.get(j);
					if (metaMap.containsKey(columnInfo.get("column_name"))) {
					    	//geom = > geomtext
					    	if(columnInfo.get("column_name").toString().equals("geom") && metaMap.containsKey("geomtext")) {
					    	    columnValue = metaMap.get("geomtext").toString();
					    	}else {
					    	    columnValue = metaMap.get(columnInfo.get("column_name")).toString();
					    	}
					    	
					}
					dispData.add(columnValue);
				}
				
				
				
				if (multiType == true) {
					if (metaMap.containsKey("geomtext")) {
						String readLine = metaMap.get("geomtext").toString();
						int adm_cd = 0;
						feature = createLineString(TYPE, adm_cd, dispData, readLine);
						features.add(feature);
					}


				} else {
					String posColumnInfo = geoCodingInfo.get("pos_columns").toString();
					String[] columns = posColumnInfo.split(",");
					
					
					for(int j = 0 ; j < geoInfoList.size();j++) {
					    Map<String, Object> columnInfo = geoInfoList.get(j);
					    if(columnInfo.get("pos_method").toString().equalsIgnoreCase("XY")) {
					    	columns = columnInfo.get("pos_columns").toString().split(",");
					    }
					}
					
					
					if (metaMap.containsKey(columns[0]) && metaMap.containsKey(columns[1])) {
					    	
						double geo_x = Double.parseDouble(metaMap.get(columns[0]).toString());
						double geo_y = Double.parseDouble(metaMap.get(columns[1]).toString());
						
						
						int adm_cd = 0;
						feature = createPointFeature(TYPE, adm_cd, dispData, geo_x, geo_y);
						features.add(feature);
					}
					

				}
			}

			createShapeFile(TYPE, features, createFilePath,data_nm);

		} catch (FactoryException e) {
			logger.error("Exception : " + e);
		} catch (UnsupportedEncodingException e) {
			logger.error("Encoding error " + e);
		} catch (ParseException e) {
			logger.error("ParseException " + e);
		} catch (IOException e) {
			logger.error("IOException " + e);
		}

	}

	public SimpleFeature createPointFeature(SimpleFeatureType type, int code, ArrayList dispData, double x, double y) {
		// 지오메트리 생성 팩토리, point, polyline ... 을 생성한다.
		GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();

		// Feature 생성 빌더
		SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(type);

		// 지오메트리팰토리를 활용 하여 포인트를 생성한다.
		Point point = geometryFactory.createPoint(new Coordinate(x, y));
		
		
		// 피쳐빌드에 생성 포인트및 attribution을 추가 한다.
		featureBuilder.add(point);
		for (int i = 0; i < dispData.size(); i++) {
			featureBuilder.add(dispData.get(i));
		}
		return featureBuilder.buildFeature(null);
	}
	
	

	public SimpleFeature createLineString(SimpleFeatureType type, int code, ArrayList dispData, String readLine)
			throws com.vividsolutions.jts.io.ParseException {
		// 지오메트리 생성 팩토리, point, polyline ... 을 생성한다.
		GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory();

		// Feature 생성 빌더
		SimpleFeatureBuilder featureBuilder = new SimpleFeatureBuilder(type);

		WKTReader reader = new WKTReader(geometryFactory);
		
		if(readLine.contains("MULTIPOLYGON")) {
		    MultiPolygon multiPolygon = (MultiPolygon) reader.read(readLine);
		    featureBuilder.add(multiPolygon);
		}else {
		    //POLYGON
		    Polygon polygon = (Polygon)reader.read(readLine);
		    featureBuilder.add(polygon);
		}
		

		// 피쳐빌드에 생성 포인트및 attribution을 추가 한다.
		for (int i = 0; i < dispData.size(); i++) {
			featureBuilder.add(dispData.get(i).toString());
		}

		return featureBuilder.buildFeature(null);
	}

	public void createShapeFile(SimpleFeatureType type, List<SimpleFeature> features, String createFilePath,String fileNM)
			throws IOException {
		/*File fileShape = new File(filePath +"/" + fileNM + ".shp");*/
		File fileShape = new File(createFilePath +"/" + fileNM + ".shp");

		ShapefileDataStoreFactory dataStoreFactory = new ShapefileDataStoreFactory();

		Map<String, Serializable> params = new HashMap<String, Serializable>();
		params.put("url", fileShape.toURI().toURL());
		params.put("create spatial index", Boolean.TRUE);
		params.put("charset", "CP949");
		ShapefileDataStore newDataStore = (ShapefileDataStore) dataStoreFactory.createNewDataStore(params);

		newDataStore.createSchema(type);

		Transaction transaction = new DefaultTransaction("create");

		String typeName = newDataStore.getTypeNames()[0];

		SimpleFeatureSource featureSource = newDataStore.getFeatureSource(typeName);

		SimpleFeatureType SHAPE_TYPE = featureSource.getSchema();

		// 2016.12.02 시큐어코딩 삭제

		if (featureSource instanceof SimpleFeatureStore) {
			SimpleFeatureStore featureStore = (SimpleFeatureStore) featureSource;
			SimpleFeatureCollection collection = new ListFeatureCollection(type, features);
			featureStore.setTransaction(transaction);
			try {
				featureStore.addFeatures(collection);
				transaction.commit();

			} catch (IllegalArgumentException e) {
				logger.info("서버에서 처리중 에러가 발생했습니다.");
			} catch (Exception problem) {
				logger.info("서버에서 처리중 에러가 발생했습니다.");
				transaction.rollback();
			} finally {
				transaction.close();
			}
		} else {

		}

	}

}
