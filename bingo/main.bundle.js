webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/account.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var subject_1 = __webpack_require__("../../../../rxjs/subject.js");
var dokobingo_service_1 = __webpack_require__("../../../../../src/app/dokobingo.service.ts");
var sns_account_enum_1 = __webpack_require__("../../../../../src/app/sns-account.enum.ts");
var user_1 = __webpack_require__("../../../../../src/app/user.ts");
/**
 * アカウントサービス
 */
var AccountService = (function () {
    function AccountService(bingoService) {
        var _this = this;
        this.bingoService = bingoService;
        this.userChangeAnnouncedSource = new subject_1.Subject();
        this.userChangeAnnounced$ = this.userChangeAnnouncedSource.asObservable();
        this.user = new user_1.User();
        this.snsList = [
            sns_account_enum_1.SnsAccount.facebook,
            sns_account_enum_1.SnsAccount.twitter,
            sns_account_enum_1.SnsAccount.google,
        ];
        // SNSアカウント認証初期化
        hello.init({
            facebook: '140868453294263',
            twitter: 'Pm5i79SC9PetmmiXrGeqZftfM',
            google: '997372776080-jkh3at1hp999nedgkijtg0td56a45je0.apps.googleusercontent.com'
        });
        this.getSnsLoginUserInfo().then(function (user) { _this.announceUserChange(user); });
    }
    AccountService.prototype.getUser = function () {
        return this.user;
    };
    AccountService.prototype.updateLoginInfo = function () {
        return this.getSnsLoginUserInfo();
    };
    AccountService.prototype.announceUserChange = function (user) {
        this.userChangeAnnouncedSource.next(user);
    };
    /**
     * SNSアカウントログイン
     * @param sns
     */
    AccountService.prototype.snsAccountLogin = function (snsKey) {
        var sns = sns_account_enum_1.SnsAccount[snsKey];
        console.log("SNS! " + sns);
        var self = this;
        return new Promise(function (resolve, reject) {
            hello(sns).login().then(function () {
                self.logoutOther(sns);
                resolve();
            }, function (e) {
                reject(e.error.message);
            });
        });
    };
    /**
     * SNSアカウントログアウト
     * @param sns
     */
    AccountService.prototype.snsAccountLogout = function (sns) {
        return new Promise(function (resolve, reject) {
            hello(sns).logout().then(function () { resolve(); }, function (e) { reject(e.error.message); });
        });
    };
    /**
     * SNSアカウントユーザー情報を取得する
     */
    AccountService.prototype.getSnsLoginUserInfo = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            hello(self.snsList[0]).api('me').then(function (json) { resolve(self.createUserInfo(self.snsList[0], json)); }, function (e) {
                hello(self.snsList[1]).api('me').then(function (json) { resolve(self.createUserInfo(self.snsList[1], json)); }, function (e) {
                    hello(self.snsList[2]).api('me').then(function (json) { resolve(self.createUserInfo(self.snsList[2], json)); }, function (e) {
                        reject(e.error.message);
                    });
                });
            });
        });
    };
    /**
     * SNSアカウントユーザー情報指定以外をログアウト
     *
     * @param keepLoginSns
     */
    AccountService.prototype.logoutOther = function (keepLoginSns) {
        var _loop_1 = function (sns) {
            if (isNaN(Number(sns))) {
                if (sns != keepLoginSns) {
                    this_1.snsAccountLogout(sns)
                        .then(function () { return console.log("B! logout " + sns); })
                        .catch(function (e) { return console.log("B! logout " + sns + " error:" + e); });
                }
            }
        };
        var this_1 = this;
        for (var sns in sns_account_enum_1.SnsAccount) {
            _loop_1(sns);
        }
    };
    /**
     * ログインユーザー情報を正規化
     *
     * @param sns
     * @param json
     */
    AccountService.prototype.createUserInfo = function (sns, json) {
        this.user.sns = sns;
        this.user.sns_id = json.id;
        this.user.name = json.name;
        this.user.thumbnail = json.thumbnail;
        this.bingoService.login(this.user).subscribe(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
        return this.user;
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [dokobingo_service_1.DokobingoService])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;


/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var main_component_1 = __webpack_require__("../../../../../src/app/main/main.component.ts");
var room_component_1 = __webpack_require__("../../../../../src/app/room/room.component.ts");
var routes = [
    { path: '', component: main_component_1.MainComponent },
    { path: 'room', component: room_component_1.RoomComponent },
    { path: '**', redirectTo: '/' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes),
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<app-nav></app-nav>\n<div style=\"text-align:center\">\n  <router-outlet></router-outlet>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var app_routing_module_1 = __webpack_require__("../../../../../src/app/app-routing.module.ts");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var material_1 = __webpack_require__("../../../material/esm5/material.es5.js");
var animations_1 = __webpack_require__("../../../platform-browser/esm5/animations.js");
var core_module_1 = __webpack_require__("../../../../../src/app/core/core.module.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var main_component_1 = __webpack_require__("../../../../../src/app/main/main.component.ts");
var nav_component_1 = __webpack_require__("../../../../../src/app/nav/nav.component.ts");
var room_component_1 = __webpack_require__("../../../../../src/app/room/room.component.ts");
var account_service_1 = __webpack_require__("../../../../../src/app/account.service.ts");
var dokobingo_service_1 = __webpack_require__("../../../../../src/app/dokobingo.service.ts");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                nav_component_1.NavComponent,
                room_component_1.RoomComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                http_1.HttpClientXsrfModule,
                forms_1.FormsModule,
                material_1.MatIconModule, material_1.MatMenuModule, material_1.MatToolbarModule, material_1.MatButtonModule, material_1.MatCheckboxModule,
                animations_1.BrowserAnimationsModule,
                core_module_1.CoreModule,
            ],
            providers: [
                account_service_1.AccountService,
                dokobingo_service_1.DokobingoService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/core/core.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var common_1 = __webpack_require__("../../../common/esm5/common.js");
var CoreModule = (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [],
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;


/***/ }),

/***/ "../../../../../src/app/dokobingo.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var http_1 = __webpack_require__("../../../common/esm5/http.js");
var headers = new http_1.HttpHeaders().set("Content-Type", "application/json");
var DokobingoService = (function () {
    function DokobingoService(http) {
        this.http = http;
    }
    DokobingoService.prototype.configureRequest = function (req) {
    };
    DokobingoService.prototype.login = function (user) {
        return this.http.post('/api/login_user', JSON.stringify({ user: user }), { headers: headers });
    };
    DokobingoService.prototype.createRoom = function (user) {
        return this.http.post('/api/create_room', JSON.stringify({ user: user }), { headers: headers });
    };
    DokobingoService.prototype.hello = function (name) {
        // https://qiita.com/ponday/items/1ec0e500cd801286845e
        // https://blog.angular-university.io/angular-http/
        return this.http.post('/api/hello', JSON.stringify({ params: { name: name } }), { headers: headers });
    };
    DokobingoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DokobingoService);
    return DokobingoService;
}());
exports.DokobingoService = DokobingoService;


/***/ }),

/***/ "../../../../../src/app/main/main.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div>\n    <img width=\"90%\" alt=\"dokoBingo!!!\" src=\"data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22320mm%22%20height%3D%22120mm%22%20viewBox%3D%220%200%20320%20120%22%3E%3Cg%20font-family%3D%22sans-serif%22%20letter-spacing%3D%220%22%20word-spacing%3D%220%22%3E%3Ctext%20style%3D%22line-height%3A1.25%22%20x%3D%2221.923%22%20y%3D%2263.033%22%20font-size%3D%2210.583%22%20transform%3D%22translate(0%20-177)%22%2F%3E%3Ctext%20style%3D%22line-height%3A1.25%22%20x%3D%22-161.018%22%20y%3D%22.667%22%20font-size%3D%2210.583%22%20transform%3D%22translate(0%20-177)%22%2F%3E%3Cg%20style%3D%22line-height%3A1.25%22%20font-size%3D%2253.333%22%3E%3Cpath%20d%3D%22M116.527%2034.908h-4.252v-1.966q-1.832%201.176-3.822%201.831t-4.319.655q-4.523%200-7.191-2.587-2.646-2.587-2.646-7.174%200-2.386.905-4.25.927-1.865%202.488-3.175%201.538-1.277%203.573-1.949%202.058-.672%204.252-.672%201.99%200%203.528.319%201.538.302%203.234.958v-8.131h4.252zm-4.252-4.62v-10.769q-1.719-.571-3.076-.79-1.357-.218-2.963-.218-3.573%200-5.563%201.848-1.99%201.848-1.99%205.242%200%203.343%201.538%205.09%201.538%201.73%204.93%201.73%201.809%200%203.664-.588%201.854-.605%203.46-1.546z%22%2F%3E%3Cpath%20d%3D%22M146.424%2025.533q0%204.586-3.166%207.241-3.166%202.654-8.48%202.654-5.36%200-8.526-2.654-3.143-2.654-3.143-7.241%200-4.586%203.143-7.241%203.166-2.671%208.526-2.671%205.314%200%208.48%202.671%203.166%202.654%203.166%207.241zm-4.387%200q0-3.646-1.922-5.41-1.922-1.781-5.337-1.781-3.46%200-5.382%201.781-1.9%201.764-1.9%205.41%200%203.528%201.922%205.359%201.922%201.814%205.36%201.814%203.392%200%205.314-1.798%201.945-1.814%201.945-5.376z%22%2F%3E%3Cpath%20d%3D%22M177.359%2031.635l-5.458%201.441-11.551-5.392-2.284%202.605%201.29%206.098-4.138%201.092-5.381-25.44%204.138-1.092%203.451%2016.317%2010.017-12.294%205.216-1.377-9.638%2011.452z%22%2F%3E%3Cpath%20d%3D%22M201.513%2025.533q0%204.586-3.166%207.241-3.166%202.654-8.48%202.654-5.36%200-8.526-2.654-3.143-2.654-3.143-7.241%200-4.586%203.143-7.241%203.166-2.671%208.526-2.671%205.314%200%208.48%202.671%203.166%202.654%203.166%207.241zm-4.387%200q0-3.646-1.922-5.41-1.922-1.781-5.337-1.781-3.46%200-5.382%201.781-1.9%201.764-1.9%205.41%200%203.528%201.922%205.359%201.922%201.814%205.36%201.814%203.392%200%205.314-1.798%201.945-1.814%201.945-5.376z%22%2F%3E%3C%2Fg%3E%3Cg%20style%3D%22line-height%3A1.25%22%20font-size%3D%2253.333%22%20font-weight%3D%22bold%22%3E%3Cpath%20d%3D%22M270.973%2056.895l-1.098%2028.294h-7.785l-1.098-28.294zm-.167%2039.745h-9.648v-7.047h9.648z%22%20style%3D%22-inkscape-font-specification%3A'sans-serif%20Bold'%22%2F%3E%3Cpath%20d%3D%22M290.65%2056.895l-1.098%2028.294h-7.785l-1.098-28.294zm-.167%2039.745h-9.648v-7.047h9.648z%22%20style%3D%22-inkscape-font-specification%3A'sans-serif%20Bold'%22%2F%3E%3Cpath%20d%3D%22M310.327%2056.895l-1.098%2028.294h-7.785l-1.098-28.294zm-.167%2039.745h-9.648v-7.047h9.648z%22%20style%3D%22-inkscape-font-specification%3A'sans-serif%20Bold'%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M62.122%2085.663q1.109%203.841.58%207.369-.496%203.516-2.341%206.379-2.124%203.356-5.211%205.568-3.055%202.2-8.213%204.058l-20.693%207.453-15.283-52.957%2018.401-6.628q5.73-2.064%208.496-2.589%202.797-.536%205.829-.019%203.147.555%205.202%202.681%202.076%202.079%203.031%205.387%201.109%203.841.146%207.447-.973%203.57-3.812%206.399l.082.284q4.946-.643%208.586%201.619%203.672%202.25%205.201%207.55zm-21.945-16.125q-.38-1.316-1.364-2.414-.953-1.11-2.634-1.211-1.501-.087-3.517.599-1.994.64-5.592%201.936l-1.146.413%203.233%2011.203%201.91-.688q2.897-1.044%204.904-1.884%202.007-.841%203.01-1.869%201.419-1.414%201.559-2.878.13-1.499-.363-3.207zm9.213%2020.475q-.729-2.525-2.01-3.556-1.26-1.077-3.556-.996-1.566.053-4.091.924-2.525.87-5.263%201.856l-2.674.963%203.808%2013.195.891-.321q5.157-1.858%207.375-2.696%202.218-.838%203.84-2.404%201.654-1.577%201.933-3.288.301-1.757-.253-3.678z%22%20style%3D%22line-height%3A1.25%3B-inkscape-font-specification%3A'sans-serif%20Bold'%22%20font-weight%3D%22bold%22%20font-size%3D%2274.667%22%2F%3E%3Cpath%20d%3D%22M87.708%20112.652l-28.612-6.33%201.715-9.677%208.006%201.771%206.245-35.227-8.006-1.771%201.715-9.677%2028.612%206.33-1.715%209.677-8.006-1.771-6.245%2035.227%208.006%201.771z%22%20style%3D%22line-height%3A1.25%3B-inkscape-font-specification%3A'sans-serif%20Bold'%22%20font-weight%3D%22bold%22%20font-size%3D%2274.667%22%2F%3E%3Cpath%20d%3D%22M152.527%20101.209l-12.073%203.044-28.147-32.055%207.525%2037.254-11.485%202.896-10.964-54.277%2014.976-3.776%2023.998%2026.626-6.281-31.093%2011.485-2.896z%22%20style%3D%22line-height%3A1.25%3B-inkscape-font-specification%3A'sans-serif%20Bold'%22%20font-weight%3D%22bold%22%20font-size%3D%2274.667%22%2F%3E%3Cpath%20d%3D%22M198.423%20106.574q-3.365%201.397-8.905%202.755-5.539%201.32-11.024%201.221-12.709-.229-19.788-8.056-7.079-7.864-6.882-21.464.187-12.965%207.559-20.755%207.372-7.828%2020.349-7.594%204.916.089%209.35%201.178%204.434%201.052%209.843%204.102l-.188%2013.04-1.438-.027q-.925-.802-2.711-2.254-1.785-1.49-3.443-2.529-1.923-1.231-4.519-2.137-2.563-.906-5.473-.958-3.411-.062-6.203%201.009-2.792%201.071-5.033%203.348-2.139%202.204-3.427%205.656-1.254%203.416-1.319%207.937-.133%209.229%204.177%2014.202%204.311%204.974%2012.872%205.128.736.012%201.606-.008.904-.023%201.64-.083l.158-10.91-9.933-.179.152-10.499%2022.977.414z%22%20style%3D%22line-height%3A1.25%3B-inkscape-font-specification%3A'sans-serif%20Bold'%22%20font-weight%3D%22bold%22%20font-size%3D%2274.667%22%2F%3E%3Cpath%20d%3D%22M254.178%2070.611q4.017%2012.523-.037%2022.482-4.065%209.924-15.401%2014.462-11.304%204.526-20.086-.255-8.793-4.816-12.811-17.339-4.051-12.629.025-22.518%204.065-9.924%2015.369-14.45%2011.273-4.513%2020.086.255%208.802%204.733%2012.853%2017.361zm-11.773%2019.679q.996-3.098.808-6.675-.199-3.612-1.61-8.009-1.512-4.714-3.549-7.63-2.037-2.916-4.266-4.326-2.283-1.468-4.697-1.573-2.383-.118-4.65.79-2.299.92-4.052%202.654-1.722%201.721-2.745%204.513-.943%202.6-.833%206.486.13%203.838%201.597%208.411%201.501%204.679%203.506%207.607%202.026%202.881%204.266%204.326%202.24%201.445%204.666%201.585%202.426.14%204.756-.793t4.124-2.763q1.782-1.865%202.68-4.606z%22%20style%3D%22line-height%3A1.25%3B-inkscape-font-specification%3A'sans-serif%20Bold'%22%20font-weight%3D%22bold%22%20font-size%3D%2274.667%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\">\n  </div>\n  <div class=\"button-row\">\n    <a mat-raised-button color=\"primary\" routerLink=\"/room\">Room</a>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/main/main.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            template: __webpack_require__("../../../../../src/app/main/main.component.html"),
            styles: [__webpack_require__("../../../../../src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;


/***/ }),

/***/ "../../../../../src/app/nav/nav.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menu-spacer {\r\n    -webkit-box-flex: 1;\r\n        -ms-flex: 1 1 auto;\r\n            flex: 1 1 auto;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/nav/nav.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n    <mat-toolbar-row>\n        <mat-menu #rootMenu=\"matMenu\">\n            <button mat-menu-item [matMenuTriggerFor]=\"subMenu\">ログイン</button>\n        </mat-menu>\n        <mat-menu #subMenu=\"matMenu\">\n            <button mat-menu-item (click)=\"login('facebook')\" i18n>Facebook</button>\n            <button mat-menu-item (click)=\"login('twitter')\" i18n>Twitter</button>\n            <button mat-menu-item (click)=\"login('google')\" i18n>Google+</button>\n        </mat-menu>\n        <button mat-icon-button [matMenuTriggerFor]=\"rootMenu\">\n            <mat-icon>more_vert</mat-icon>\n        </button>\n        <span class=\"menu-spacer\"></span>\n        <span><img class=\"img-circle\" style=\"width:40px;\" [src]=\"user?.thumbnail\"></span>\n        <span style=\"margin-left:10px;\" >{{user?.name}}</span>\n    </mat-toolbar-row>\n</mat-toolbar>\n\n"

/***/ }),

/***/ "../../../../../src/app/nav/nav.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var account_service_1 = __webpack_require__("../../../../../src/app/account.service.ts");
var NavComponent = (function () {
    function NavComponent(router, accountService) {
        this.router = router;
        this.accountService = accountService;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.accountService.userChangeAnnounced$.subscribe(function (user) {
            _this.user = user;
        });
    };
    NavComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * SNS認証ログイン
     *
     * @param sns
     */
    NavComponent.prototype.login = function (sns) {
        var _this = this;
        this.accountService.snsAccountLogin(sns)
            .then(function () {
            // ログインユーザー情報の取得
            return _this.accountService.getSnsLoginUserInfo();
        })
            .catch(function (e) {
            console.log("B! " + sns + " login error: " + e);
            // TODO: to Material Dialog
            alert(sns + " \u30A2\u30AB\u30A6\u30F3\u30C8\u3067\u3001\u30ED\u30B0\u30A4\u30F3\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
        })
            .then(function (user) {
            // ログインユーザー情報の取得 成功
            _this.router.navigate([""]);
            _this.accountService.announceUserChange(user);
        });
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            template: __webpack_require__("../../../../../src/app/nav/nav.component.html"),
            styles: [__webpack_require__("../../../../../src/app/nav/nav.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.Router, account_service_1.AccountService])
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;


/***/ }),

/***/ "../../../../../src/app/room/room.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/room/room.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  <button mat-button (click)='createRoom()'>Create Room {{room?.room.name}}</button>\n</p>\n<p>\n  <button mat-button (click)='apiTest()'>API Test {{hello?.result.name}}</button>\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/room/room.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var account_service_1 = __webpack_require__("../../../../../src/app/account.service.ts");
var dokobingo_service_1 = __webpack_require__("../../../../../src/app/dokobingo.service.ts");
var RoomComponent = (function () {
    function RoomComponent(accountService, bingoService) {
        this.accountService = accountService;
        this.bingoService = bingoService;
    }
    RoomComponent.prototype.ngOnInit = function () {
    };
    RoomComponent.prototype.createRoom = function () {
        var _this = this;
        this.bingoService.createRoom(this.accountService.getUser()).subscribe(function (response) {
            _this.room = response;
            console.log(_this.room);
        }, function (error) {
            console.log(error);
        });
    };
    RoomComponent.prototype.apiTest = function () {
        var _this = this;
        this.bingoService.hello('Yagi').subscribe(function (response) {
            _this.hello = response;
            console.log(_this.hello);
        }, function (error) {
            console.log(error);
        });
    };
    RoomComponent = __decorate([
        core_1.Component({
            selector: 'app-room',
            template: __webpack_require__("../../../../../src/app/room/room.component.html"),
            styles: [__webpack_require__("../../../../../src/app/room/room.component.css")]
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, dokobingo_service_1.DokobingoService])
    ], RoomComponent);
    return RoomComponent;
}());
exports.RoomComponent = RoomComponent;


/***/ }),

/***/ "../../../../../src/app/sns-account.enum.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SnsAccount;
(function (SnsAccount) {
    SnsAccount["facebook"] = "facebook";
    SnsAccount["twitter"] = "twitter";
    SnsAccount["google"] = "google";
})(SnsAccount = exports.SnsAccount || (exports.SnsAccount = {}));


/***/ }),

/***/ "../../../../../src/app/user.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User() {
    }
    User.prototype.reset = function () {
        this.id = "";
        this.sns = "";
        this.sns_id = "";
        this.name = "";
        this.thumbnail = "";
        return this;
    };
    return User;
}());
exports.User = User;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map