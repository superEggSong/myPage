var g_playlists = [{
	title : 'Reggaehiphop',
	id : 1
}, {
	title : 'Chill',
	id : 2
}, {
	title : 'Dubstep',
	id : 3
}, {
	title : 'Indie',
	id : 4
}, {
	title : 'Rap',
	id : 5
}, {
	title : 'Cowbell',
	id : 6
}];

var ERPiaAPI = 'http://localhost:8100/include';
angular.module('starter.controllers', ['starter.services'])
.constant('ERPiaAPI', {
	url:'https://www.erpia.net/include'
})

// .controller('PushCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
// 	$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
// 		// alert("Successfully registered token " + data.token);
// 		console.log('Ionic Push: Got token ', data.token, data.platform);
// 		$scope.token = data.token;
// 	});

// 	$scope.identifyUser = function() {
// 		var user = $ionicUser.get();
// 		if(!user.user_id) {
// 			// Set your user_id here, or generate a random one.
// 			user.user_id = $ionicUser.generateGUID();
// 		};

// 		// Metadata
// 		angular.extend(user, {
// 			name: 'Simon',
// 			bio: 'Author of Devdactic'
// 		});

// 		// Identify your user with the Ionic User Service
// 		$ionicUser.identify(user).then(function(){
// 		$scope.identified = true;
// 			console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
// 		});
// 	};

// 	// Registers a device for push notifications
// 	$scope.pushRegister = function() {
// 		console.log('Ionic Push: Registering user');

// 		// Register with the Ionic Push service.  All parameters are optional.
// 		$ionicPush.register({
// 			canShowAlert: true, //Can pushes show an alert on your screen?
// 			canSetBadge: true, //Can pushes update app icon badges?
// 			canPlaySound: true, //Can notifications play a sound?
// 			canRunActionsOnWake: true, //Can run actions outside the app,
// 			onNotification: function(notification) {
// 				// Handle new push notifications here
// 				return true;
// 			}
// 		});
// 	};
// })

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $stateParams, $location, $http, $state){
	console.log("load");
	$rootScope.urlData = [];
	$rootScope.loginState = "R"; //R: READY, E: ERPIA LOGIN TRUE, S: SCM LOGIN TRUE
	console.log($rootScope.loginState);

	// $scope.ScmHome = function(){
	// 	console.log("scmhome");
	// 	location.href="#/app/scmhome";
	// };
	// $scope.ERPiaHome = function(){
	// 	console.log("Home");
	// 	location.href="#/app/erpiahome";
	// };
	// $scope.SlidingTab = function(){
	// 	console.log("slidingTab");
	// 	location.href="#/app/slidingtab";
	// };
	// $scope.BasicTab = function(){
	// 	console.log("dash");
	// 	location.href="#/app/tab/dash";
	// };
	// $scope.Search = function(){
	// 	console.log("Search");
	// 	location.href="#/app/search";
	// };
	
	// Form data for the login modal
	$scope.loginData = {};
	$scope.comData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('erpia_login/login.html', {
		scope : $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
		console.log("closeLogin " + $rootScope.loginState);
		if($rootScope.loginState == "S"){
			location.href="#/app/scmhome";
		}else if($rootScope.loginState == "E"){
			 location.replace("#/app/slidingtab")
		};
	};

	// Open the login modal
	$scope.login = function() {
		console.log($rootScope.loginState);
		if($rootScope.loginState == "R"){
			$scope.modal.show();
		}else{
			$scope.id_title = "";
			$scope.UserId = "";
			$scope.Admin_Code = "";
			$scope.management_day = "";
			$scope.management_bill = "";
			$scope.sms = "";
			$scope.tax = "";
			$scope.e_money = "";
			$scope.every = "";
			$scope.package = "";
			$scope.user = "";
			$scope.site = "";
			$scope.account = "";

			$scope.loginHTML = "로그인";
			$rootScope.loginState = "R";
			alert("로그아웃 되었습니다.");

			location.href="#/app/menu";
		};
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		 
		$scope.Kind = "scm_login";
		$scope.Admin_Code = $scope.loginData.Admin_Code;
		$scope.G_id = $scope.loginData.UserId;
		$scope.G_Pass = $scope.loginData.Pwd;
		$scope.SCM_Use_YN = $scope.loginData.SCM_Use_YN
		$scope.Auto_Login = $scope.loginData.Auto_Login

		if ($scope.Auto_Login != true) {
			//SCM 로그인
			if ($scope.SCM_Use_YN == true) {
				//var url = ERPiaAPI + '/Json_Proc_MyPage_Scm.asp';
				var url = "http://www.erpia.net/include/Json_Proc_MyPage_Scm.asp?callback=JSON_CALLBACK&kind=scm_login&Admin_Code=" + $scope.Admin_Code + "&G_id=" + $scope.G_id + "&G_Pass=" + $scope.G_Pass;
				var data = "kind=scm_login&Admin_Code=" + $scope.Admin_Code + "&G_id=" + $scope.G_id + "&G_Pass=" + $scope.G_Pass;
				$http.jsonp(url)
				// $http.jsonp({
				// 	method: 'POST',
				// 	url: url,
				// 	data: data,
				// 	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} //헤더
				// })
				.success(function(data, status, headers, config){
					var json = JSON.parse(data.return);
					if(json.list[0].ResultCk == "1"){
						$scope.Admin_Code = json.list[0].Admin_Code;
						$scope.GerName = json.list[0].GerName + '<br>(' + json.list[0].G_Code + ')';
						$scope.G_id = json.list[0].G_ID;
						$scope.loginHTML = "로그아웃";
						$rootScope.loginState = "S";
					}
					$timeout(function() {
						$scope.closeLogin();
					}, 100);
				})
				.error(function(data, status, headers, config){
					console.log(data);
					alert('로그인 실패');
				})
			}else{
				//ERPia 로그인
				var url = ERPiaAPI + '/JSon_Proc_MyPage_Scm_Manage.asp';
				var data = "kind=ERPiaLogin&Admin_Code=" + $scope.Admin_Code + "&uid=" + $scope.G_id + "&pwd=" + $scope.G_Pass;
				var CNT_Tax_No_Read = '', G_Expire_Date = '', G_Expire_Days = '';
				$http({
					method: 'POST',
					url: url,
					data: data,
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} //헤더
				})
				  	.success(function(data, status, headers, config){
					if(data.list[0].Com_Code != ''){
						$scope.Com_Name = data.list[0].Com_Name + '<br>(' + data.list[0].Com_Code + ')';
						$scope.UserId = data.list[0].user_id;
						$scope.loginHTML = "로그아웃<br>(" + data.list[0].Com_Code + ")";
						$scope.package = data.list[0].Pack_Name;
						$scope.cnt_site = data.list[0].CNT_Site + " 개";

						url = ERPiaAPI + '/JSon_Proc_MyPage_Scm_Manage.asp';
						var data = "kind=erpia_ComInfo&Admin_Code=" + data.list[0].Com_Code;
						$http({
							method: 'POST',
							url: url,
							data: data,
							headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} //헤더
						})
						.success(function(data){
							var d= new Date();
							var month = d.getMonth() + 1;
							var day = d.getDate();

							CNT_Tax_No_Read = data.list[0].CNT_Tax_No_Read;	//계산서 미수신건
							Pay_Method = data.list[0].Pay_Method;
							Pay_State = data.list[0].Pay_State;
							Max_Pay_YM = data.list[0].Max_Pay_YM;
							Pay_Ex_Days = data.list[0].Pay_Ex_Days;
							Pay_Day = data.list[0].Pay_Day;
							Pay_Ex_Date = d.getFullYear() + '-' + (month<10 ? '0':'') + month + '-' + (day<10 ? '0' : '') + day;

							$scope.CNT_Tax_No_Read = CNT_Tax_No_Read + " 건";
							
							if (Pay_Method != 'P')
							{
								if (Pay_State == 'Y')	//당월결재존재
								{
									if (Max_Pay_YM != '')
									{
										if (Pay_Ex_Days >= 0)
										{
											//G_Expire_Days = DateDiff("D", Now_Date, DateAdd("M", 1, Max_Pay_YM & "-01")) + CInt(Pay_Day) + CInt(Pay_Ex_Days) - 1
											Max_Pay_Y = Max_Pay_YM.split('-')[0];
											Max_Pay_M = Max_Pay_YM.split('-')[1];
											var d1 = new Date(Max_Pay_Y, Max_Pay_M, Pay_Day);
											var diffD = d1 - d;
											G_Expire_Date = d1.format("yyyy.MM.dd");
											G_Expire_Days = Math.ceil(diffD/(24*3600*1000));
										}else{
											G_Expire_Days = '?';
											G_Expire_Date = '?';
										}
									}
								}else{
									if (Pay_Ex_Days < 0)		//당월결재미존재, 초과허용무제한
									{
										G_Expire_Days = '?';
										G_Expire_Date = '?';
									}else{
										if (Last_Pay_YM == '')	//당월결재미존재, 이전결재내역미존재
										{
											G_Expire_Days = "0";
											G_Expire_Date = "기간만료";
										}else{					//당월결재미존재, 이전결재내역존재
											Max_Pay_Y = Max_Pay_YM.split('-')[0];
											Max_Pay_M = Max_Pay_YM.split('-')[1];
											if (new Date(Max_Pay_Y, Max_Pay_M, Pay_Day) < d)
											{
												G_Expire_Days = "0"
												G_Expire_Date = "기간만료"
											}else{
												//G_Expire_Days = DateDiff("D", Now_Date, DateAdd("D", CInt(Pay_Day) + CInt(Pay_Ex_Days) - 1, DateAdd("M", 1, Last_Pay_YM & "-01")))
												//G_Expire_Date = DateAdd("D", CInt(Pay_Day) + CInt(Pay_Ex_Days) - 1, DateAdd("M", 1, Last_Pay_YM & "-01"))
											}
										}
									}
								}
							}else{
								G_Expire_Days = "?"
								if (CLng(IO_Amt) + CLng(Point_Ex_Amt) - CLng(Point_Out_StandBy_Amt) <= 0)
								{
									G_Expire_Date = "포인트부족"
								}else{
									G_Expire_Date = CLng(IO_Amt) + CLng(Point_Ex_Amt) - CLng(Point_Out_StandBy_Amt)
								}
							}

							$scope.management_day = G_Expire_Date; //"2015년<br>8월20일";
							$scope.management_bill = "330,000원	<br><small>(VAT 포함)</small>";
							$scope.sms = "15000 개<br><small>(건당 19원)</small>";
							$scope.tax = "150 개<br><small>(건당 165원)</small>";
							$scope.e_money = "30,000원<br><small>(자동이체 사용중)</small>";
							$scope.every = "10,000 P";
							$scope.cnt_user = "5 명";
							$scope.cnt_account = "20 개";

							$rootScope.loginState = "E";

							$timeout(function() {
								$rootScope.ComInfo = {
									"G_Expire_Date":G_Expire_Date
									, "G_Expire_Days":G_Expire_Days
									, "CNT_Tax_No_Read":CNT_Tax_No_Read
								};
								$scope.closeLogin();
							}, 100);
						})
						.error(function(data){
						})
						
					}
					
				})
				  .error(function(data, status, headers, config){
					alert('로그인 실패');
				})

				

				// $rootScope.urlData = [
				// {
				// 	"url" : "#/chart/candleStick.html"
				// }, {
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart7"
				// }, {
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart2"
				// }, {
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart6"
				// },{
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart4"
				// }, {
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart3"
				// }, {
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart11"
				// },{
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart12"
				// }, {
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart13"
				// }, {
				// 	"url" : "http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart14"
				// }];

				$rootScope.urlData2 = [
				{
					"url" : "#/chart/candleStick.html"
				}, {
					"url" : "#/chart/candleStick.html"
				}, {
					"url" : "#/chart/candleStick.html"
				}, {
					"url" : "#/chart/candleStick.html"
				}];
			};
		};
		// console.log('Doing login', $scope.loginData);
		//location.href="#/app/home";
		//alert("로그인성공");

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
	};

  	$scope.loginHTML = "로그인";
})


.controller("IndexCtrl", ['$rootScope', "$scope", "$stateParams", "$q", "$location", "$window", '$timeout', '$http', '$sce',
	function($rootScope, $scope, $stateParams, $q, $location, $window, $timeout, $http, $sce) {
		console.log("IndexCtrl");
		$scope.myStyle = {
		    "width" : "100%",
		    "height" : "100%"
		};

		$scope.ERPiaBaseData = function() {
			 console.log("IndexCtrl::" + $rootScope.loginState);
			$scope.Kind = "scm_login";
			
			if($rootScope.loginState == "E") {
				url = ERPiaAPI + '/Json_Proc_MyPage_Scm.asp';
				data = "kind=erpia_dashBoard&Admin_Code=" + $scope.Admin_Code + "&sDate=" + '2015-07-01' + "&eDate=" + '2015-10-31';
				$http({
					method: 'POST',
					url:url,
					data:data,
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
				})
				.success(function(data){
					$scope.E_NewOrder = data.list[0].CNT_JuMun_New;
					$scope.E_BsComplete = data.list[0].CNT_BS_NO;
					$scope.E_InputMno = data.list[0].CNT_BS_No_M_No;
					$scope.E_CgComplete = data.list[0].CNT_BS_Before_ChulGo;
					$scope.E_RegistMno = data.list[0].CNT_BS_After_ChulGo_No_Upload;

					// $scope.E_TOT = parseInt(response.list[0].CNT_JuMun_New) + parseInt(response.list[0].CNT_BS_NO) + parseInt(response.list[0].CNT_BS_No_M_No)
					// 			 + parseInt(response.list[0].CNT_BS_Before_ChulGo) + parseInt(response.list[0].CNT_BS_After_ChulGo_No_Upload)

				}).error(function(data){
					alert('error');
				});
				$scope.G_Expire_Date = $rootScope.ComInfo.G_Expire_Date;
				$scope.G_Expire_Days = $rootScope.ComInfo.G_Expire_Days;
				$scope.CNT_Tax_No_Read = $rootScope.ComInfo.CNT_Tax_No_Read;
			}else if($rootScope.loginState == "S") {

			};
		};

		$scope.ERPiaBaseData();
		// $scope.tabs = [{
		// 	"text" : "홈"
		// }, {
		// 	"text" : "최근 일주일 매출"
		// }, {
		// 	"text" : "금일 사이트별 매출"
		// }, {
		// 	"text" : "월간 매출"
		// }, { 
		// 	"text" : "금일 상품별 매출"
		// }, {
		// 	"text" : "금일 브랜드별 매출"
		// }, {
		// 	"text" : "최근 일주일 매입"
		// }, {
		// 	"text" : "금일 거래처 매입"
		// }, {
		// 	"text" : "금일 배송현황"
		// }, {
		// 	"text" : "택배사별 월간 통계"
		// }];

		$scope.tabs = [{
			"text" : "홈"
		}, {
			"text" : "매출 실적 추이"
		}, {
			"text" : "사이트별 매출 점유율"
		}, {
			"text" : "매출이익증감율"
		}, { 
			"text" : "상품별 매출 TOP5"
		}, {
			"text" : "브랜드별 매출 TOP5"
		}, {
			"text" : "온오프라인 비교 매출"
		}, {
			"text" : "매출반품현황"
		}, {
			"text" : "상품별 매출 반품 건수/반품액 TOP5"
		}, {
			"text" : "CS 컴플레인 현황"
		}, {
			"text" : "매입 현황"
		}, {
			"text" : "거래처별 매입 점유율 TOP 10"
		}, {
			"text" : "상품별 매입건수/매입액 TOP5"
		}, { 
			"text" : "최근배송현황"
		}, {
			"text" : "배송현황"
		}, {
			"text" : "택배사별 구분 건수 통계"
		}, {
			"text" : "재고 회전율 TOP5"
		}];

		$scope.url = "";
		$scope.onSlideMove = function(data) {
			$scope.chart_url = $sce.trustAsResourceUrl("http://www.erpia.net/psm/02/html/Graph.asp?Admin_Code=YGNEXT&swm_gu=1&kind=chart7");

			console.log($scope.chart_url);

			// try{
			// 	$scope.url = $rootScope.urlData[data.index].url;
			// // 	$scope.login_alert = "";

			// 	console.log("define:" + $scope.url);
			// }catch (err){
			// // 	// $scope.login_alert = "로그인하세요";
			// 	console.log("undefine");
			// }
			
			$scope.myStyle = {
			    "width" : "100%",
			    "height" : "100%"
			};
			//alert("You have selected " + $scope.tabs[data.index].text + " tab");
		};
	}])

.controller('ScmUser_HomeCtrl', function($rootScope, $scope, $ionicModal, $timeout, $stateParams, $location, $http){
	console.log($rootScope.loginState); 

	$scope.comData = {};

	// Perform the login action when the user submits the login form
	$scope.ScmBaseData = function() {
		 
		// $scope.Kind = "scm_login";
		// $scope.Admin_Code = $scope.loginData.Admin_Code;
		// $scope.G_id = $scope.loginData.UserId;
		// $scope.G_Pass = $scope.loginData.Pwd;
		// $scope.SCM_Use_YN = $scope.loginData.SCM_Use_YN
		// $scope.Auto_Login = $scope.loginData.Auto_Login

		if($rootScope.loginState == "S") {
			var url = ERPiaAPI + '/JSon_Proc_Multi_Lhk.asp';
			var data = "kind=ScmMain&BaljuMode=Balju&Value_Kind=list&Admin_Code=" + $scope.Admin_Code + "&GerCode=" + "01016" + "&FDate=" + "2015-05-01" + "&TDate=2015-10-01";
			//발주조회
			$http({
				method: 'POST',
				url: url,
				data: data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} //헤더
			}).success(function (response) {
				console.log(response);
				$scope.B_NewBalju = response.list[0].Cnt
				$scope.B_BalJuConfirm = response.list[1].Cnt
				$scope.B_ChulgoConfirm = response.list[2].Cnt
				$scope.B_MeaipComplete = response.list[3].Cnt

				$scope.B_TOT = $scope.B_NewBalju + $scope.B_BalJuConfirm + $scope.B_ChulgoConfirm + $scope.B_MeaipComplete;
				
			}).error(function(data, status, headers, config){
				console.log("Fail");
			})
			//직배송조회
			data = "kind=ScmMain&BaljuMode=Direct&Value_Kind=list&Admin_Code=" + $scope.Admin_Code + "&GerCode=" + "01016" + "&FDate=" + "2015-05-01" + "&TDate=2015-10-01";
			$http({
				method: 'POST',
				url: url,
				data: data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} //헤더
			})
			  .success(function (response) {
				console.log("Success");
				$scope.J_NewBalju = response.list[0].Cnt;
				$scope.J_BalJuConfirm = response.list[1].Cnt;
				$scope.J_ChulgoConfirm = response.list[2].Cnt;
				$scope.J_MeaipComplete = response.list[3].Cnt;

				$scope.J_TOT = $scope.J_NewBalju + $scope.J_BalJuConfirm + $scope.J_ChulgoConfirm + $scope.J_MeaipComplete;
				
			})
			  .error(function(data, status, headers, config){
				console.log("Fail");
			})
			//CRM 조회
			data = "kind=CrmMenu&Value_Kind=list&Admin_Code=" + $scope.Admin_Code + "&GerCode=" + "01016" + "&FDate=" + "2015-05-01" + "&TDate=2015-10-01";
			$http({
				method: 'POST',
				url: url,
				data: data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'} //헤더
			})
			  .success(function (response) {
				console.log("Success");
				$scope.C_CancelCnt = response.list[0].Cnt
				$scope.C_ReturnCnt = response.list[1].Cnt
				$scope.C_ExchangeCnt = response.list[2].Cnt
				$scope.C_TOT = $scope.C_CancelCnt + $scope.C_ReturnCnt + $scope.C_ExchangeCnt
			})
			  .error(function(data, status, headers, config){
				console.log("Fail");
			})
		}else{
			// alert(response.list[0].ResultMsg);
		};
	};

	$scope.ScmBaseData();
	// $filter('date')(date, format, timezone)
  	// $scope.loginHTML = " 로그인 ";
})

.controller('ERPiaUser_HomeCtrl', function($rootScope, $scope, $ionicModal, $timeout, $stateParams, $location, $http){
	console.log($rootScope.loginState); 
// 	// Perform the login action when the user submits the login form
	// $scope.ERPiaBaseData = function() {
		 
	// 	$scope.Kind = "scm_login";
	// 	$scope.Admin_Code = $scope.loginData.Admin_Code;
	// 	$scope.G_id = $scope.loginData.UserId;
	// 	$scope.G_Pass = $scope.loginData.Pwd;
	// 	$scope.SCM_Use_YN = $scope.loginData.SCM_Use_YN
	// 	$scope.Auto_Login = $scope.loginData.Auto_Login

	// 	if($rootScope.loginState == "E") {
	// 		$http({
	// 			method: 'POST',
	// 			url: 'https://www.erpia.net/include/JSon_Proc_MyPage_Scm.asp',
	// 			data: 	"kind=" + "erpia_dashBoard"
	// 					+ "&Admin_Code=" + $scope.Admin_Code
	// 					+ "&sDate=" + "2015-07-01"
	// 					+ "&eDate=" + "2015-09-31",
	// 			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=euc-kr'} //헤더
	// 		})
	// 		  .success(function (response) {
	// 			console.log(response);
	// 			$scope.E_NewOrder = response.list[0].Cnt
	// 			$scope.E_BsComplete = response.list[1].Cnt
	// 			$scope.E_InputMno = response.list[2].Cnt
	// 			$scope.E_CgComplete = response.list[3].Cnt
	// 			$scope.E_RegistMno = response.list[4].Cnt

	// 			$scope.E_TOT = $scope.E_NewOrder + $scope.E_BsComplete + $scope.E_InputMno + $scope.E_CgComplete + $scope.E_RegistMno
	// 		})
	// 		  .error(function(data, status, headers, config){
	// 			console.log("Fail");
	// 		})
	// 	}else{
	// 		// alert(response.list[0].ResultMsg);
	// 	};
	// };
	// $scope.ERPiaBaseData();
})

.controller('MainCtrl', function($rootScope, $scope, $ionicModal, $timeout, $stateParams, $location, $http, $ionicUser, $ionicPush){
	console.log("MainCtrl");

	$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
		// alert("Successfully registered token " + data.token);
		console.log('Ionic Push: Got token ', data.token, data.platform);
		$scope.token = data.token;
	});

	$scope.identifyUser = function() {
		var user = $ionicUser.get();
		if(!user.user_id) {
			// Set your user_id here, or generate a random one.
			user.user_id = $ionicUser.generateGUID();
		};

		// Metadata
		angular.extend(user, {
			name: 'Admin',
			bio: 'test'
		});

		// Identify your user with the Ionic User Service
		$ionicUser.identify(user).then(function(){
		$scope.identified = true;
			console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
		});
	};

	// Registers a device for push notifications
	$scope.pushRegister = function() {
		console.log('Ionic Push: Registering user');

		// Register with the Ionic Push service.  All parameters are optional.
		$ionicPush.register({
			canShowAlert: true, //Can pushes show an alert on your screen?
			canSetBadge: true, //Can pushes update app icon badges?
			canPlaySound: true, //Can notifications play a sound?
			canRunActionsOnWake: true, //Can run actions outside the app,
			
			onNotification: function(notification) {
				// Handle new push notifications here
				return true;
			}
		});
	};


    $scope.ERPiaCafe_Link = function() {
        window.open('http://cafe.naver.com/erpia10');
    }

    $scope.ERPiaBlog_Link = function() {
        window.open('http://blog.naver.com/zzata');
    }

    $scope.identifyUser();
    $scope.pushRegister();
})

.controller('CsCtrl', function($rootScope, $scope, $ionicModal, $timeout, $stateParams, $location, $http){
	console.log("CsCtrl");

	// $scope.data = {
 //            phoneNumber : "070-7012-3071"
 //        };

        $scope.dialNumber = function(number) {
            window.open('tel:' + number, '_system');
        }

	// $scope.csData = {};

	// // Perform the login action when the user submits the login form
	// $scope.csRegist = function() {
		 
	// 	// $scope.xx = "xx";

	// 	$http({
	// 		method: 'POST',
	// 		url: 'https://www.erpia.net/...',
	// 		data: 	"xx=" + $scope.xx... ,		
	// 		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}
	// 	})
	// 		.success(function (response) {
	// 			console.log(response);
	// 	})
	// 	  .error(function(data, status, headers, config){
	// 		console.log("Fail");
	// 	})
})

.controller('BoardSelectCtrl', function($rootScope, $scope, $ionicModal, $timeout, $stateParams, $location, $http){
	console.log("BoardSelectCtrl");

	$scope.BoardSelect1 = function() {	 
		$rootScope.boardIndex = "1";
		console.log($rootScope.boardIndex);
	};
	$scope.BoardSelect2 = function() {	 
		$rootScope.boardIndex = "2";
		console.log($rootScope.boardIndex);
	};
	$scope.BoardSelect3 = function() {	 
		$rootScope.boardIndex = "3";
		console.log($rootScope.boardIndex);
	};
	$scope.BoardSelect4 = function() {	 
		$rootScope.boardIndex = "4";
		console.log($rootScope.boardIndex);
	};
})

.controller('BoardMainCtrl', function($rootScope, $scope, $ionicModal, $timeout, $stateParams, $location, $http){
	console.log("BoardMainCtrl");

	$scope.tabs2 = [{
			"text" : "공지사항"
		}, {
			"text" : "업데이트 현황"
		}, {
			"text" : "지식 나눔방"
		}, {
			"text" : "업체문의 Q&A"
		}];

		$scope.url = "";
		$scope.onSlideMove2 = function(data) {
			try{
				$scope.url2 = $rootScope.urlData2[data.index].url;
			// 	$scope.login_alert = "";

				console.log("define:" + $scope.url2);
			}catch (err){
			// 	// $scope.login_alert = "로그인하세요";
				console.log("undefine");w
			}
			
			$scope.myStyle = {
			    "width" : "100%",
			    "height" : "100%"
			};
			//alert("You have selected " + $scope.tabs[data.index].text + " tab");
		};

	$scope.BoardBaseData = function() {
		 
		// $scope.Kind = "scm_login";
		// $scope.Admin_Code = $scope.loginData.Admin_Code;
		// $scope.G_id = $scope.loginData.UserId;
		// $scope.G_Pass = $scope.loginData.Pwd;
		// $scope.SCM_Use_YN = $scope.loginData.SCM_Use_YN
		// $scope.Auto_Login = $scope.loginData.Auto_Login

		// if($rootScope.loginState == "E") {
			$http({
				method: 'POST',
				url: 'https://www.erpia.net/include/JSon_Proc_MyPage_Scm_Manage.asp',
				data: 	"kind=" + "board_notice"
						+ "&Admin_Code=" + "onz",
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=euc-kr'} //헤더
			})
			  .success(function (response) {
				// console.log(response);

				// console.log($stateParams);
				// $scope.playlists2 = response

				var items = [];
  				for (var i = 0; i < 10; i++) {
  					items = response.list[i]
  					console.log(items);
  				}

  				$scope.itemlist = items;
  				console.log($scope.itemlist);
  				
				// $scope.E_BsComplete = response.list[1].Cnt
				// $scope.E_InputMno = response.list[2].Cnt
				// $scope.E_CgComplete = response.list[3].Cnt
				// $scope.E_RegistMno = response.list[4].Cnt

				// $scope.E_TOT = $scope.E_NewOrder + $scope.E_BsComplete + $scope.E_InputMno + $scope.E_CgComplete + $scope.E_RegistMno
			})
			  .error(function(data, status, headers, config){
				console.log("Fail");
			})
		// }else{
			// alert(response.list[0].ResultMsg);
		// };
	};
	$scope.BoardBaseData();
})

//////////////////////////////side///////////////////////////
.controller('PlaylistsCtrl', function($scope) {

	console.log("PlaylistsCtrl");
	$scope.playlists = g_playlists;
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
	console.log($stateParams);
	$scope.playlists = g_playlists;
	$scope.playlist = $scope.playlists[$stateParams.playlistId - 1];
})

////////////////////////////tab///////////////////////////////
.controller('DashCtrl', function($scope) {
	console.log("DashCtrl");
})

.controller('ChatsCtrl', function($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	
	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends : true
	}
});
