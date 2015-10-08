// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core','ionic.service.push', 'starter.controllers', 'tabSlideBox' ,'ngCordova'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

// 	// if none of the above states are matched, use this as the fallback
// 	$urlRouterProvider.otherwise('/app/slidingtab');
// });

.config(['$ionicAppProvider', function($ionicAppProvider) {
	$ionicAppProvider.identify({
      	app_id: 'b94db7cd', //app id
      	api_key: 'eaed7668bef9fb66df87641b2b8e100084454e528d5f3150', //public key
		dev_push: true // 개발자 테스트랑 디바이스 테스트
	});
}])

.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {
	$stateProvider.state('app', {
		url : '/app',
		abstract : true,
		templateUrl : 'side/menu.html',
		controller : 'AppCtrl'
	})

	.state('app.erpia_main', {
			url : '/main',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_main/main.html',
					controller : 'AppCtrl'
			}
		}
	})

	.state('app.erpia_login', {
			url : '/login',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_login/login.html'
			}
		}
	})
  
	.state('app.erpia_scmhome', {
			url : '/scmhome',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_scmhome/scmhome.html'
			}
		}
	})

	.state('app.slidingtab', {
			url : '/slidingtab',
			views : {
				'menuContent' : {
					templateUrl : 'slidingtab/slidingTabsUsingRepeat.html'
					// controller : 'IndexCtrl'
			}
		}
	})

	.state('app.erpia_board', {
			url : '/boardSelect',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_board/boardSelect.html',
					// controller : 'BoardSelectCtrl'
			}
		}
	})

	.state('app.erpia_board2', {
			url : '/boardMain',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_board2/boardMain.html',
					controller : 'BoardMainCtrl'
			}
		}
	})

	.state('app.erpia_cs', {
			url : '/cs',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_cs/cs.html',
					controller : 'CsCtrl'
			}
		}
	})

	.state('app.erpia_push', {
			url : '/push',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_push/push.html'
			}
		}
	})

	.state('app.erpia_introduce', {
			url : '/introduce',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_introduce/erpiaIntroduce.html',
					// controller : 'CsCtrl'
			}
		}
	})

	.state('app.erpia_servicelist', {
			url : '/servicelist',
			views : {
				'menuContent' : {
					templateUrl : 'erpia_servicelist/erpiaServicelist.html',
					// controller : 'CsCtrl'
			}
		}
	})

	// .state('app.erpia_board', {
	// 		url : '/board',
	// 		views : {
	// 			'menuContent' : {
	// 				templateUrl : 'erpia_board/board.html',
	// 				controller : 'BoardCtrl'
	// 		}
	// 	}
	// })

	/////////////////////////////////////tab////////////////////////////////////
	.state('app.tab', {
			url : '/tab',
			views : {
				'menuContent' : {
					templateUrl : 'tab/tabs.html'				 
			}
		}
	})

 	.state('app.tab.dash', {
		url : '/dash',
		views : {
			'tab-dash' : {
				templateUrl : 'tab/tab-dash.html'
				
			}
		}
	})

  	.state('app.tab.chats', {
		url : '/chats',
		views : {
			'tab-chats' : {
				templateUrl : 'tab/tab-chats.html',
				controller : 'ChatsCtrl'
			}
		}
	})

	.state('app.tab.chat-detail', {
		url : '/chats/:chatId',
		views : {
			'tab-chats' : {
				templateUrl : 'tab/chat-detail.html',
				controller : 'ChatDetailCtrl'
			}
		}
	})

	.state('app.tab.account', {
		url : '/account',
		views : {
			'tab-account' : {
				templateUrl : 'tab/tab-account.html',
				controller : 'AccountCtrl'
			}
		}
	})

  ////////////////////////////////side///////////////////////////////////
    .state('app.browse', {
		url : '/browse',
		views : {
			'menuContent' : {
				templateUrl : 'side/browse.html'
			}
		}
	})

    .state('app.search', {
		url : '/search',
		views : {
			'menuContent' : {
				templateUrl : 'side/search.html'
			}
		}
	})

	.state('app.playlists', {
		url : '/playlists',
		views : {
			'menuContent' : {
				templateUrl : 'side/playlists.html',
				controller : 'PlaylistsCtrl'
			}
		}
	})

	.state('app.single', {
		url : '/playlists/:playlistId',
		views : {
			'menuContent' : {
				templateUrl : 'side/playlist.html',
				controller : 'PlaylistCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/main');
}); 
// 2015-10-05 이호경 추가
// angular.module('starter.service', [])
// .factory('xmlParser', function () {
// 	var x2js = new X2JS();
// 	return {
// 		xml2json: x2js.xml2json,
// 		xml_str2json_withOutBind : x2js.xml_str2json,
// 		xml_str2json: function (args) {
// 			return angular.bind(x2js, x2js.xml_str2json, args)();
// 		},
// 		json2xml: x2js.json2xml_str
// 	}
// })

