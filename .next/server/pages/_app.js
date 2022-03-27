"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8859:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Button = ({ children , block =false , ghost =false , ...props })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        ...props,
        className: `${props.className} p-2  font-bold rounded-md justify-self-end ${block ? "w-full" : ""} ${ghost ? `bg-white-500 text-primary-500` : `text-white-500 bg-primary-500 `} border-solid border-2 border-primary-500 
        hover:border-primary-600 hover:text-white-500 hover:bg-primary-600  focus:outline-none`,
        children: children
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ 368:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: ./context/StateProvider.tsx
var StateProvider = __webpack_require__(9546);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./state/wallet/hook.ts
var hook = __webpack_require__(1688);
// EXTERNAL MODULE: ./utils/index.ts
var utils = __webpack_require__(8847);
// EXTERNAL MODULE: ./components/Button/index.tsx
var Button = __webpack_require__(8859);
;// CONCATENATED MODULE: ./components/Header/index.tsx






const Header = ()=>{
    const { account , connect , disconnect , chainId , provider  } = (0,hook/* default */.Z)();
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "fixed top-0 left-0 flex items-center justify-between w-full px-4 py-2 border-b bg-secondary-200 border-b-primary-400",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                href: "/",
                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: "text-lg font-black cursor-pointer text-primary-500",
                    children: "BountyHunt"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                onClick: ()=>{
                    if (!account) {
                        connect();
                    } else {
                        disconnect();
                    }
                },
                className: `p-2 mx-1 ml-auto font-bold rounded-md justify-self-end ${account ? `bg-white-500 text-primary-500` : `text-white-500 bg-primary-500 `} border-solid border-2 border-primary-500 
        hover:border-primary-600 hover:text-white-500 hover:bg-primary-600  focus:outline-none`,
                children: account ? (0,utils/* getEllipsisTxt */.e)(account) : "Connect Wallet"
            }),
            chainId && chainId !== Number("0x13881") && /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                onClick: ()=>{
                    if (chainId !== Number("0x13881")) {
                        provider?.request({
                            method: "wallet_switchEthereumChain",
                            params: [
                                {
                                    chainId: "0x13881"
                                }
                            ]
                        });
                    }
                },
                className: "bg-red-500 border-red-500 mr-1",
                children: "Switch To Mumbai"
            }),
            chainId && chainId === Number("0x13881") && /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                href: "/createProfile",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                    children: "Create a Profile"
                })
            })
        ]
    }));
};
/* harmony default export */ const components_Header = (Header);

;// CONCATENATED MODULE: ./pages/_app.tsx





function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(BaseLayout, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    }));
}
/* harmony default export */ const _app = (MyApp);
function BaseLayout({ children  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap",
                        rel: "stylesheet"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(StateProvider/* AppProvider */.wI, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(components_Header, {}),
                    children
                ]
            })
        ]
    }));
}


/***/ }),

/***/ 8847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ getEllipsisTxt)
/* harmony export */ });
/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */ const getEllipsisTxt = (str, n = 6)=>{
    if (str) {
        return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
};


/***/ }),

/***/ 4137:
/***/ ((module) => {

module.exports = require("@walletconnect/web3-provider");

/***/ }),

/***/ 1982:
/***/ ((module) => {

module.exports = require("ethers");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 2840:
/***/ ((module) => {

module.exports = require("web3modal");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [730,664,688], () => (__webpack_exec__(368)));
module.exports = __webpack_exports__;

})();