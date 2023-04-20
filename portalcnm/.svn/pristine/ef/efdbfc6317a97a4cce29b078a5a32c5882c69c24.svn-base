//------------------------------------------- [Init 에 필요한 정보] --------------------------------------------------------------------//
// 서버인증서(Base64Encode)
var ServerCert   		= "MIIF0jCCBLqgAwIBAgICLD0wDQYJKoZIhvcNAQELBQAwUzELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRkwFwYDVQQDDBBDcm9zc0NlcnRUZXN0Q0EyMB4XDTEwMDQxNDA1NDYwMFoXDTExMDQxNDE0NTk1OVowejELMAkGA1UEBhMCS1IxEjAQBgNVBAoMCUNyb3NzQ2VydDEVMBMGA1UECwwMQWNjcmVkaXRlZENBMRUwEwYDVQQLDAzrk7HroZ3quLDqtIAxEjAQBgNVBAsMCe2FjOyKpO2KuDEVMBMGA1UEAwwMMjA0OCjsnKDtmqgpMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxgvlhmH+j4h6aZhN5PtnovF2+yeYNC+vyW+B3E3ldamQqL1FRsnS+oU2rRyDuRDlUOnYfAK0km1/5YcaEze4TcJPOrIsv5bQHahdsZCQnJbzlRHfAGqmXWjsl5o7AiBMxO6sTGVGL95ewUuGNwUKY+rrjQqFL4/Pp8F1ph0ZtEOup6LPdlPaWeZnKlHkXjKwldze3Lp7U+ZWfHFdNEdox/STwdfqIOfzL7zcjdCC+hXpcr8wIxd190k1Nex8OvMgHRb/Xjd3mvN571uRmAEoKNXnpnnOuEYq9YQCD/7lrfsHMVWBc8xJ4N4sJDZDZeZjpi7/3hGwaWzouphNSZa5iQIDAQABo4IChzCCAoMwSwYIKwYBBQUHAQEEPzA9MDsGCCsGAQUFBzABhi9odHRwOi8vdGVzdG9jc3AyLmNyb3NzY2VydC5jb206MTQyMDMvT0NTUFNlcnZlcjCBkwYDVR0jBIGLMIGIgBQS095hufkygYNWNXfsuJrVX+HaLqFtpGswaTELMAkGA1UEBhMCS1IxDTALBgNVBAoMBEtJU0ExLjAsBgNVBAsMJUtvcmVhIENlcnRpZmljYXRpb24gQXV0aG9yaXR5IENlbnRyYWwxGzAZBgNVBAMMEktpc2EgVGVzdCBSb290Q0EgNYIBBDAdBgNVHQ4EFgQUNtyMWSi4lRcak6fWV0pbVX5VdPQwDgYDVR0PAQH/BAQDAgUgMH8GA1UdIAEB/wR1MHMwcQYKKoMajJpEBQQBATBjMC0GCCsGAQUFBwIBFiFodHRwOi8vZ2NhLmNyb3NzY2VydC5jb20vY3BzLmh0bWwwMgYIKwYBBQUHAgIwJh4kx3QAIMd4yZ3BHLKUACDRTMKk0rgAIMd4yZ3BHMeFssiy5AAuMGsGA1UdEQRkMGKgYAYJKoMajJpECgEBoFMwUQwMMjA0OCjsnKDtmqgpMEEwPwYKKoMajJpECgEBATAxMAsGCWCGSAFlAwQCAaAiBCD7uvCEoET8h1iJnTv1Lqz/S9arynOxmMf014vvryQAXDCBgAYDVR0fBHkwdzB1oHOgcYZvbGRhcDovL3Rlc3RjYTIuY3Jvc3NjZXJ0LmNvbTozODkvY249czFkcDVwMSxvdT1jcmxkcCxvdT1BY2NyZWRpdGVkQ0Esbz1Dcm9zc0NlcnQsYz1LUj9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0MA0GCSqGSIb3DQEBCwUAA4IBAQBNV253PlCtEAWs+lq9lAhozW/TOiTaazsnDRYtpTwvIdZXgg19iMUrSrLpxJ08sL3OJ597BO1CKVcqr4+men8dDhQ9FJwZ79404Omq1KeNSUcJDSG6MHiGT2iaRJ0kewEeYUZQhJbKqlJisZTeTx8fMMxzQitW4GPBhndvp+OE8fRz9uuvBI6X6e7TX+XrX1EJPDe96jSclx5m624uC7d8huTe/c9emyUKZ/XTip/PdqvDZGAj+/7v9SCBpWvYWLy3bhd8rXoy32bYMotl8QhaV2qQuagrzJq3ioRmmMo5Wch2C9uZMIch8jQS6fQ6PCddQaBtxVFF1zbdZmV83Fkz";

var AlgoMode 			= 0x30;				    // 암복호 알고리즘
																		// 0x30 : SYM_ALG_SEED_CBC, 
																		// 0x40 : SYM_ALG_NEAT_CBC, 
																		// 0x50 : SYM_ALG_ARIA_CBC,

var WorkDir		        = "/home/sop/apache-tomcat-7.0.47/webapps/ROOT/gpkisecureweb";						// 작업디렉토리(모듈 설치된 위치) 		

var GNCertType  		= 0x00;				         			// GPKI, NPKI 인증서 모두 : 0x00, GPKI 만 : 0x01, NPKI 만 :0x02	
var ValidCertInfo 		= "";

//var ValidCertInfo 		= "1 2 410 100001 2 2 1|1 2 410 100001 2 1 2|";			// 특정인증서만 로딩 할 경우에 정책코드를 나열한다.	
var ValidCertInfo 		= "";			// 특정인증서만 로딩 할 경우에 정책코드를 나열한다.	


var ReadCertType 		= 0x01; 				        		// 서명용인증서 : 0x01, 암호키분배용 인증서 : 0x02

var KeyStrokeType 		= 0x00;			 	         			// 키보드 보안 API (0x01 : softcamp, 0x00 : 적용안함)

var CertOption			= 0x01;							        // 0x00 : 로그인한 세션인증서로만 서명한다. (해당인증서만 로딩한다.) 

// SiteID
var SiteID 			= "Test_GPKI";			        		        // SiteID :세션정보를 획득하는 키값

//Ubikey 사용시 해당 업체에 문의 하여 적용한다.
//var	UbikeyVersion="1.1.0.5";
//var	UbikeyPopupURL="";
//var	UbikeyWParam="";
//var	UbikeylParam="";

// 서명시에 
// [setup.conf : 설치파일 위치정보]

// GPKIInstaller 사용시
		
var host = location.host;

var ServerAddr 			= host;
// [설치 파일 경로 변수(html내부에서 사용됨)]

//var SetupOffLineFilePath        = "/gpkisecureweb/setup/GPKISecureWebX.exe";
var SetupOffLineFilePath        = "/home/sop/apache-tomcat-7.0.47/webapps/ROOT/gpkisecureweb/setup/GPKISecureWebX.exe";
// [설치완료후 이동할 페이지 설정]
//var ServiceStartPageURL		= "./index.html";
var ServiceStartPageURL		= "/s-portalcnm/html/CM/login.jsp";

//---------------------------------------------- [ActiveX 버전번호] --------------------------------------------------------------------//

// [ActiveX Object 테그 형태]																					

var CodeBase_GPKIInstaller	= "CODEBASE='http://"+ServerAddr+"/gpkisecureweb/setup/GPKISecureWebX.cab#version=2,0,2,1'";
var Object_GPKIInstaller 	= "<OBJECT ID ='GPKISecureWeb' CLASSID = 'CLSID:C8223F3A-1420-4245-88F2-D874FC081572' width = 0 height =0 ";
Object_GPKIInstaller            += CodeBase_GPKIInstaller;
Object_GPKIInstaller            += "></OBJECT >";
