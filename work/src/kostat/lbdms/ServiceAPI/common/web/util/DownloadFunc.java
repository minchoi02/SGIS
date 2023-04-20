package kostat.lbdms.ServiceAPI.common.web.util;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URI;
import java.net.URLEncoder;
import java.sql.SQLException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.json.JSONException;
import org.json.JSONObject;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;

import kostat.lbdms.ServiceAPI.common.util.DateUtil;
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.exception.FileSystemException;
import kostat.lbdms.ServiceAPI.common.web.hdfs.HdfsClient;



public class DownloadFunc {
    private final Log logger = LogFactory.getLog(DownloadFunc.class);

    /**
     * @brief 압축 파일 삭제
     * @param outFilePath
     */
    private void zipFileDelete(String outFilePath) {
	new File(outFilePath).delete();
    }

    public void errorTableDownload(JSONObject params, HttpServletResponse response) throws Exception {
	String fileName = DateUtil.getGenerateId("down");
	String outPath = ConfigUtil.getString("fileUpload.defaultPath");
	File file = new File(outPath + fileName);
	DBConnector pgConn = new OpenPGSql();
	FileWriter pgWriter = null;
	String fileName2 = null;
	String downFileName = null;
	BufferedReader inputStream = null;
	try {
	    downFileName = params.getString("FILE_NAME");

	    if (!file.exists()) {
		file.mkdirs();
	    }
	    pgWriter = new FileWriter(outPath + fileName + "/" + downFileName);

	    String query = null;
	    String connectQuery = null;
	    String disConnectQuery = null;

	    query = params.getString("QUERY");
	    connectQuery = params.getString("CONNECT_QUERY");
	    disConnectQuery = params.getString("DIS_CONNECT_QUERY");
	    String database = ConfigUtil.getString("jdbc.system.url") + "/"
		    + ConfigUtil.getString("jdbc.system.database");
	    String pass = ConfigUtil.getString("jdbc.system.password");
	    String dbname = ConfigUtil.getString("jdbc.system.username");
	    // DataInputStream inputStream = null;

	    pgConn.openConn(database, dbname, pass);
	    pgConn.execQueryNoResult(connectQuery);
	    CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());
	    copyManager.copyOut("COPY (" + query + ") TO STDOUT WITH DELIMITER AS ',' NULL AS '' CSV HEADER ",
		    pgWriter);
	    pgWriter.close();
	    pgConn.execQueryNoResult(disConnectQuery);

	    fileName2 = DateUtil.getGenerateId("encoding");
	    // FileUtil.changeEncoding("UTF-8", outPath + fileName + "/" + downFileName,
	    // "CP949", outPath + fileName2 + "/" + downFileName);

	    // DataInputStream inputStream = new DataInputStream(new FileInputStream(new
	    // File(outPath + fileName + "/" + downFileName)));
	    // ContentDisposition contentDisposition =
	    // ContentDisposition.type("attachment").fileName(downFileName)
	    // .creationDate(new Date()).build();
	    inputStream = new BufferedReader(new InputStreamReader(
		    new FileInputStream(new File(outPath + fileName + "/" + downFileName)), "UTF8"));

	    // return Response.ok(inputStream).header("Content-Disposition",
	    // contentDisposition).status(200).build();

	    // 1. 다운로드 페이지 설정
	    response.setHeader("Content-Disposition", "attachment;filename="
		    + URLEncoder.encode(downFileName, "UTF-8").replaceAll("\\+", "%20") + ".txt;");
	    response.setContentType("text/plain");

	    PrintWriter txtPrinter = response.getWriter();

	    StringBuilder contents = new StringBuilder();
	    String inputLine;
	    while ((inputLine = inputStream.readLine()) != null) {
		contents.append(inputLine);
		contents.append("\n");
	    }

	    // 2. 소스코드 출력
	    txtPrinter.print(contents);
	    response.flushBuffer();

	} finally {
	    pgConn.closeConn();
	    if (pgWriter != null)
		pgWriter.close();
	    inputStream.close();
	    file = new File(outPath + fileName + "/" + downFileName);
	    if (file.exists())
		file.delete();
	    // file = new File(outPath + fileName2 + "/" + downFileName);
	    // if(file.exists()) file.delete();
	    // inputStream.close();
	}
    }

    /**
     * @brief PG 테이블 다운로드
     * @param resVo
     * @param downloadFileName
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     * @throws IOException
     */
    public void downloadPGToCSV(String downloadFileName, String query, HttpServletResponse response)
	    throws ClassNotFoundException, SQLException, IOException {
		String fileName = "sns_word_list.csv";
		String fileName2 = null;
		String outPath = ConfigUtil.getString("fileUpload.defaultPath");
		FileWriter pgWriter = new FileWriter(outPath + fileName);
		DBConnector pgConn = new OpenPGSql();
	
		String database = ConfigUtil.getString("jdbc.system.url") + "/" + ConfigUtil.getString("jdbc.system.database");
		String pass = ConfigUtil.getString("jdbc.system.password");
		String dbname = ConfigUtil.getString("jdbc.system.username");
	
		BufferedReader inputStream = null;
	
		try {
	
		    pgConn.openConn(database, dbname, pass);
		    CopyManager copyManager = new CopyManager((BaseConnection) pgConn.getConn());
		    String copyQuery = "COPY (" + query + ") TO STDOUT WITH DELIMITER AS '|' NULL AS '' CSV HEADER ";
	
		    logger.info("쿼리 : " + copyQuery);
		    copyManager.copyOut(copyQuery, pgWriter);
		    pgWriter.close();
	
		    fileName2 = DateUtil.getGenerateId("encoding") + ".csv";
		    FileUtil.changeEncoding("UTF-8", outPath + fileName, "MS949", outPath + fileName2);
		    inputStream = new BufferedReader(
			    new InputStreamReader(new FileInputStream(new File(outPath + fileName2)), "MS949"));
	
		    response.setHeader("Content-Disposition", "attachment;filename="
			    + URLEncoder.encode(downloadFileName, "UTF-8").replaceAll("\\+", "%20") + ".csv;");
		    response.setContentType("text/plain");
		    response.setCharacterEncoding("MS949");
	
		    PrintWriter txtPrinter = response.getWriter();
	
		    StringBuilder contents = new StringBuilder();
		    String inputLine;
		    while ((inputLine = inputStream.readLine()) != null) {
			contents.append(inputLine);
			contents.append("\n");
		    }
	
		    // 2. 소스코드 출력
		    txtPrinter.print(contents);
		    response.flushBuffer();
	
		} finally {
		    pgConn.closeConn();
		    if (pgWriter != null)
			pgWriter.close();
		    File file = new File(outPath + fileName2);
		    file.delete();
		    file = new File(outPath + fileName);
		    file.delete();
		    if (inputStream != null) {
			inputStream.close();
		    }
		}

    }
}
