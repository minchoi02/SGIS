package kostat.lbdms.ServiceAPI.common.web.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;

public class FileUtil {
    public static void changeEncoding(String inputEncoding, String inPath, String outputEncoding, String outPath) {
	BufferedWriter write = null;
	BufferedReader reader = null;
	try {
	    File dbfFile = new File(inPath);
	    reader = new BufferedReader(new InputStreamReader(new FileInputStream(dbfFile), inputEncoding));

	    File output = new File(outPath);
	    output.createNewFile();

	    write = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(output.getPath()), outputEncoding));
	    String lineRead = null;

	    while ((lineRead = reader.readLine()) != null) {
		write.write(lineRead);
		write.newLine();
	    }
	} catch (Exception e) {
	    System.out.println("Error while reading user files");
	} finally {
	    try {
		write.close();
		reader.close();
	    } catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	}
    }
	public static String makeMetaInfoPath(String mtFilePath) {
		String path = "";
		
		if (mtFilePath.indexOf(".") > 1) {
			path = mtFilePath.substring(0, mtFilePath.lastIndexOf('.')) + ".mt";
		} else {
			path = mtFilePath + ".mt";
		}
		
		return path;
	}
	
	/**
	 * input stream to file
	 * @param inputEncoding
	 * @param inStream
	 * @param outputEncoding
	 * @param outPath
	 * @return
	 * @throws IOException
	 */
	public static int inputStreamToFile(String inputEncoding, InputStream inStream, String outputEncoding, String outPath)
			throws IOException {
		Writer out = null;
		BufferedReader br = null;
		try {
			out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outPath), outputEncoding));
			br = new BufferedReader(new InputStreamReader(inStream, inputEncoding));
			String line = null;
			while ((line = br.readLine()) != null) {
				out.write(line + "\n");
			}

		} catch (Exception e) {
			e.printStackTrace();
			
		} finally {
			br.close();
			out.close();
			inStream.close();
		}

		return 1;

	}
	
	/**
	 * inputstream to file
	 * @param filePath
	 * @param fileName
	 * @param inStream
	 * @return
	 */
	public static int inputStreamToFile( File fileName, InputStream inStream) {

		OutputStream outStream = null;

		try {
			outStream = new FileOutputStream(fileName);

			byte[] buf = new byte[1024 * 4];
			int len = 0;

			while ((len = inStream.read(buf)) > 0) {
				outStream.write(buf, 0, len);
			}
		} catch (IOException e) {
			return -1;
		} finally {
			try {
				outStream.close();
				inStream.close();
			} catch (IOException e) {
				return -2;
			}
		}

		return 1;
	}

	/**
	 * 파일 확장자 검색
	 * 
	 * @param fileName
	 * @return
	 */
	public static String getFileExtension(String fileName) {
		String extension = "";
		if (fileName.indexOf(".") > 1) {
			extension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length());
		}
		return extension;
	}
	
	
	/**
	 * 파일 존재여부 체크 1 : 파일, -1 : 폴더, -2 : 파일 존재하지 않음, -3 : fileName에 제대로 된 값 넘어오지 않음
	 * 
	 * @param fileName
	 * @return
	 */
	public static int fileExistCheck(String fileName) {

		if ("".equals(fileName) || fileName == null) {
			return -3;
		}
		File file = new File(fileName);
		if (file.isDirectory()) {
			return -1;
		}

		if (!file.exists()) {
			return -2;
		}
		return 1;
	}
	
	/**
	 * 첫줄 읽어오기
	 * @param filePath
	 * @return
	 * @throws IOException
	 */
	public static String getFileOneLine(String filePath) throws IOException {
		File file = new File(filePath);
		FileInputStream fis = null;
		InputStreamReader isr = null;
		BufferedReader reader = null;
		String line = null;
		try {
			fis = new FileInputStream(file);
			isr = new InputStreamReader(fis);
			reader = new BufferedReader(isr);

			line = reader.readLine();
		} finally {
			fis.close();
			isr.close();
			reader.close();
		}
		return line;
	}
	
	/**
	 * 파일 사이즈 조회
	 * @param path
	 * @return
	 */
	public static String getFileSize(String path) {
		File file = new File(path);
		String fileSize = String.valueOf(file.length());
		return fileSize;
		
	}
}
