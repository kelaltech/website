var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/nodemailer/lib/fetch/cookies.js
var require_cookies = __commonJS({
  "node_modules/nodemailer/lib/fetch/cookies.js"(exports, module2) {
    "use strict";
    var urllib = require("url");
    var SESSION_TIMEOUT = 1800;
    var Cookies = class {
      constructor(options2) {
        this.options = options2 || {};
        this.cookies = [];
      }
      set(cookieStr, url2) {
        let urlparts = urllib.parse(url2 || "");
        let cookie = this.parse(cookieStr);
        let domain;
        if (cookie.domain) {
          domain = cookie.domain.replace(/^\./, "");
          if (urlparts.hostname.length < domain.length || ("." + urlparts.hostname).substr(-domain.length + 1) !== "." + domain) {
            cookie.domain = urlparts.hostname;
          }
        } else {
          cookie.domain = urlparts.hostname;
        }
        if (!cookie.path) {
          cookie.path = this.getPath(urlparts.pathname);
        }
        if (!cookie.expires) {
          cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1e3);
        }
        return this.add(cookie);
      }
      get(url2) {
        return this.list(url2).map((cookie) => cookie.name + "=" + cookie.value).join("; ");
      }
      list(url2) {
        let result = [];
        let i;
        let cookie;
        for (i = this.cookies.length - 1; i >= 0; i--) {
          cookie = this.cookies[i];
          if (this.isExpired(cookie)) {
            this.cookies.splice(i, i);
            continue;
          }
          if (this.match(cookie, url2)) {
            result.unshift(cookie);
          }
        }
        return result;
      }
      parse(cookieStr) {
        let cookie = {};
        (cookieStr || "").toString().split(";").forEach((cookiePart) => {
          let valueParts = cookiePart.split("=");
          let key = valueParts.shift().trim().toLowerCase();
          let value = valueParts.join("=").trim();
          let domain;
          if (!key) {
            return;
          }
          switch (key) {
            case "expires":
              value = new Date(value);
              if (value.toString() !== "Invalid Date") {
                cookie.expires = value;
              }
              break;
            case "path":
              cookie.path = value;
              break;
            case "domain":
              domain = value.toLowerCase();
              if (domain.length && domain.charAt(0) !== ".") {
                domain = "." + domain;
              }
              cookie.domain = domain;
              break;
            case "max-age":
              cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1e3);
              break;
            case "secure":
              cookie.secure = true;
              break;
            case "httponly":
              cookie.httponly = true;
              break;
            default:
              if (!cookie.name) {
                cookie.name = key;
                cookie.value = value;
              }
          }
        });
        return cookie;
      }
      match(cookie, url2) {
        let urlparts = urllib.parse(url2 || "");
        if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== "." || ("." + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
          return false;
        }
        let path = this.getPath(urlparts.pathname);
        if (path.substr(0, cookie.path.length) !== cookie.path) {
          return false;
        }
        if (cookie.secure && urlparts.protocol !== "https:") {
          return false;
        }
        return true;
      }
      add(cookie) {
        let i;
        let len;
        if (!cookie || !cookie.name) {
          return false;
        }
        for (i = 0, len = this.cookies.length; i < len; i++) {
          if (this.compare(this.cookies[i], cookie)) {
            if (this.isExpired(cookie)) {
              this.cookies.splice(i, 1);
              return false;
            }
            this.cookies[i] = cookie;
            return true;
          }
        }
        if (!this.isExpired(cookie)) {
          this.cookies.push(cookie);
        }
        return true;
      }
      compare(a, b) {
        return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === a.httponly;
      }
      isExpired(cookie) {
        return cookie.expires && cookie.expires < new Date() || !cookie.value;
      }
      getPath(pathname) {
        let path = (pathname || "/").split("/");
        path.pop();
        path = path.join("/").trim();
        if (path.charAt(0) !== "/") {
          path = "/" + path;
        }
        if (path.substr(-1) !== "/") {
          path += "/";
        }
        return path;
      }
    };
    module2.exports = Cookies;
  }
});

// node_modules/nodemailer/package.json
var require_package = __commonJS({
  "node_modules/nodemailer/package.json"(exports, module2) {
    module2.exports = {
      name: "nodemailer",
      version: "6.6.0",
      description: "Easy as cake e-mail sending from your Node.js applications",
      main: "lib/nodemailer.js",
      scripts: {
        test: "grunt"
      },
      repository: {
        type: "git",
        url: "https://github.com/nodemailer/nodemailer.git"
      },
      keywords: [
        "Nodemailer"
      ],
      author: "Andris Reinman",
      license: "MIT",
      bugs: {
        url: "https://github.com/nodemailer/nodemailer/issues"
      },
      homepage: "https://nodemailer.com/",
      devDependencies: {
        bunyan: "1.8.15",
        chai: "4.3.4",
        "eslint-config-nodemailer": "1.2.0",
        "eslint-config-prettier": "8.3.0",
        grunt: "1.4.0",
        "grunt-cli": "1.4.2",
        "grunt-eslint": "23.0.0",
        "grunt-mocha-test": "0.13.3",
        libbase64: "1.2.1",
        libmime: "5.0.0",
        libqp: "1.1.0",
        mocha: "8.3.2",
        "nodemailer-ntlm-auth": "1.0.1",
        proxy: "1.0.2",
        "proxy-test-server": "1.0.0",
        sinon: "10.0.0",
        "smtp-server": "3.8.0"
      },
      engines: {
        node: ">=6.0.0"
      }
    };
  }
});

// node_modules/nodemailer/lib/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/nodemailer/lib/fetch/index.js"(exports, module2) {
    "use strict";
    var http2 = require("http");
    var https2 = require("https");
    var urllib = require("url");
    var zlib2 = require("zlib");
    var PassThrough2 = require("stream").PassThrough;
    var Cookies = require_cookies();
    var packageData = require_package();
    var MAX_REDIRECTS = 5;
    module2.exports = function(url2, options2) {
      return fetch3(url2, options2);
    };
    module2.exports.Cookies = Cookies;
    function fetch3(url2, options2) {
      options2 = options2 || {};
      options2.fetchRes = options2.fetchRes || new PassThrough2();
      options2.cookies = options2.cookies || new Cookies();
      options2.redirects = options2.redirects || 0;
      options2.maxRedirects = isNaN(options2.maxRedirects) ? MAX_REDIRECTS : options2.maxRedirects;
      if (options2.cookie) {
        [].concat(options2.cookie || []).forEach((cookie) => {
          options2.cookies.set(cookie, url2);
        });
        options2.cookie = false;
      }
      let fetchRes = options2.fetchRes;
      let parsed = urllib.parse(url2);
      let method = (options2.method || "").toString().trim().toUpperCase() || "GET";
      let finished = false;
      let cookies;
      let body;
      let handler = parsed.protocol === "https:" ? https2 : http2;
      let headers = {
        "accept-encoding": "gzip,deflate",
        "user-agent": "nodemailer/" + packageData.version
      };
      Object.keys(options2.headers || {}).forEach((key) => {
        headers[key.toLowerCase().trim()] = options2.headers[key];
      });
      if (options2.userAgent) {
        headers["user-agent"] = options2.userAgent;
      }
      if (parsed.auth) {
        headers.Authorization = "Basic " + Buffer.from(parsed.auth).toString("base64");
      }
      if (cookies = options2.cookies.get(url2)) {
        headers.cookie = cookies;
      }
      if (options2.body) {
        if (options2.contentType !== false) {
          headers["Content-Type"] = options2.contentType || "application/x-www-form-urlencoded";
        }
        if (typeof options2.body.pipe === "function") {
          headers["Transfer-Encoding"] = "chunked";
          body = options2.body;
          body.on("error", (err) => {
            if (finished) {
              return;
            }
            finished = true;
            err.type = "FETCH";
            err.sourceUrl = url2;
            fetchRes.emit("error", err);
          });
        } else {
          if (options2.body instanceof Buffer) {
            body = options2.body;
          } else if (typeof options2.body === "object") {
            try {
              body = Buffer.from(Object.keys(options2.body).map((key) => {
                let value = options2.body[key].toString().trim();
                return encodeURIComponent(key) + "=" + encodeURIComponent(value);
              }).join("&"));
            } catch (E) {
              if (finished) {
                return;
              }
              finished = true;
              E.type = "FETCH";
              E.sourceUrl = url2;
              fetchRes.emit("error", E);
              return;
            }
          } else {
            body = Buffer.from(options2.body.toString().trim());
          }
          headers["Content-Type"] = options2.contentType || "application/x-www-form-urlencoded";
          headers["Content-Length"] = body.length;
        }
        method = (options2.method || "").toString().trim().toUpperCase() || "POST";
      }
      let req;
      let reqOptions = {
        method,
        host: parsed.hostname,
        path: parsed.path,
        port: parsed.port ? parsed.port : parsed.protocol === "https:" ? 443 : 80,
        headers,
        rejectUnauthorized: false,
        agent: false
      };
      if (options2.tls) {
        Object.keys(options2.tls).forEach((key) => {
          reqOptions[key] = options2.tls[key];
        });
      }
      try {
        req = handler.request(reqOptions);
      } catch (E) {
        finished = true;
        setImmediate(() => {
          E.type = "FETCH";
          E.sourceUrl = url2;
          fetchRes.emit("error", E);
        });
        return fetchRes;
      }
      if (options2.timeout) {
        req.setTimeout(options2.timeout, () => {
          if (finished) {
            return;
          }
          finished = true;
          req.abort();
          let err = new Error("Request Timeout");
          err.type = "FETCH";
          err.sourceUrl = url2;
          fetchRes.emit("error", err);
        });
      }
      req.on("error", (err) => {
        if (finished) {
          return;
        }
        finished = true;
        err.type = "FETCH";
        err.sourceUrl = url2;
        fetchRes.emit("error", err);
      });
      req.on("response", (res) => {
        let inflate;
        if (finished) {
          return;
        }
        switch (res.headers["content-encoding"]) {
          case "gzip":
          case "deflate":
            inflate = zlib2.createUnzip();
            break;
        }
        if (res.headers["set-cookie"]) {
          [].concat(res.headers["set-cookie"] || []).forEach((cookie) => {
            options2.cookies.set(cookie, url2);
          });
        }
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          options2.redirects++;
          if (options2.redirects > options2.maxRedirects) {
            finished = true;
            let err = new Error("Maximum redirect count exceeded");
            err.type = "FETCH";
            err.sourceUrl = url2;
            fetchRes.emit("error", err);
            req.abort();
            return;
          }
          options2.method = "GET";
          options2.body = false;
          return fetch3(urllib.resolve(url2, res.headers.location), options2);
        }
        fetchRes.statusCode = res.statusCode;
        fetchRes.headers = res.headers;
        if (res.statusCode >= 300 && !options2.allowErrorResponse) {
          finished = true;
          let err = new Error("Invalid status code " + res.statusCode);
          err.type = "FETCH";
          err.sourceUrl = url2;
          fetchRes.emit("error", err);
          req.abort();
          return;
        }
        res.on("error", (err) => {
          if (finished) {
            return;
          }
          finished = true;
          err.type = "FETCH";
          err.sourceUrl = url2;
          fetchRes.emit("error", err);
          req.abort();
        });
        if (inflate) {
          res.pipe(inflate).pipe(fetchRes);
          inflate.on("error", (err) => {
            if (finished) {
              return;
            }
            finished = true;
            err.type = "FETCH";
            err.sourceUrl = url2;
            fetchRes.emit("error", err);
            req.abort();
          });
        } else {
          res.pipe(fetchRes);
        }
      });
      setImmediate(() => {
        if (body) {
          try {
            if (typeof body.pipe === "function") {
              return body.pipe(req);
            } else {
              req.write(body);
            }
          } catch (err) {
            finished = true;
            err.type = "FETCH";
            err.sourceUrl = url2;
            fetchRes.emit("error", err);
            return;
          }
        }
        req.end();
      });
      return fetchRes;
    }
  }
});

// node_modules/nodemailer/lib/shared/index.js
var require_shared = __commonJS({
  "node_modules/nodemailer/lib/shared/index.js"(exports, module2) {
    "use strict";
    var urllib = require("url");
    var util = require("util");
    var fs = require("fs");
    var fetch3 = require_fetch();
    var dns = require("dns");
    var net = require("net");
    var DNS_TTL = 5 * 60 * 1e3;
    var resolver = (family, hostname, callback) => {
      dns["resolve" + family](hostname, (err, addresses) => {
        if (err) {
          switch (err.code) {
            case dns.NODATA:
            case dns.NOTFOUND:
            case dns.NOTIMP:
            case dns.SERVFAIL:
            case dns.CONNREFUSED:
            case "EAI_AGAIN":
              return callback(null, []);
          }
          return callback(err);
        }
        return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
      });
    };
    var dnsCache = module2.exports.dnsCache = new Map();
    module2.exports.resolveHostname = (options2, callback) => {
      options2 = options2 || {};
      if (!options2.host || net.isIP(options2.host)) {
        let value = {
          host: options2.host,
          servername: options2.servername || false
        };
        return callback(null, value);
      }
      let cached;
      if (dnsCache.has(options2.host)) {
        cached = dnsCache.get(options2.host);
        if (!cached.expires || cached.expires >= Date.now()) {
          return callback(null, {
            host: cached.value.host,
            servername: cached.value.servername,
            _cached: true
          });
        }
      }
      resolver(4, options2.host, (err, addresses) => {
        if (err) {
          if (cached) {
            return callback(null, cached.value);
          }
          return callback(err);
        }
        if (addresses && addresses.length) {
          let value = {
            host: addresses[0] || options2.host,
            servername: options2.servername || options2.host
          };
          dnsCache.set(options2.host, {
            value,
            expires: Date.now() + DNS_TTL
          });
          return callback(null, value);
        }
        resolver(6, options2.host, (err2, addresses2) => {
          if (err2) {
            if (cached) {
              return callback(null, cached.value);
            }
            return callback(err2);
          }
          if (addresses2 && addresses2.length) {
            let value = {
              host: addresses2[0] || options2.host,
              servername: options2.servername || options2.host
            };
            dnsCache.set(options2.host, {
              value,
              expires: Date.now() + DNS_TTL
            });
            return callback(null, value);
          }
          try {
            dns.lookup(options2.host, {}, (err3, address) => {
              if (err3) {
                if (cached) {
                  return callback(null, cached.value);
                }
                return callback(err3);
              }
              if (!address && cached) {
                return callback(null, cached.value);
              }
              let value = {
                host: address || options2.host,
                servername: options2.servername || options2.host
              };
              dnsCache.set(options2.host, {
                value,
                expires: Date.now() + DNS_TTL
              });
              return callback(null, value);
            });
          } catch (err3) {
            if (cached) {
              return callback(null, cached.value);
            }
            return callback(err3);
          }
        });
      });
    };
    module2.exports.parseConnectionUrl = (str) => {
      str = str || "";
      let options2 = {};
      [urllib.parse(str, true)].forEach((url2) => {
        let auth;
        switch (url2.protocol) {
          case "smtp:":
            options2.secure = false;
            break;
          case "smtps:":
            options2.secure = true;
            break;
          case "direct:":
            options2.direct = true;
            break;
        }
        if (!isNaN(url2.port) && Number(url2.port)) {
          options2.port = Number(url2.port);
        }
        if (url2.hostname) {
          options2.host = url2.hostname;
        }
        if (url2.auth) {
          auth = url2.auth.split(":");
          if (!options2.auth) {
            options2.auth = {};
          }
          options2.auth.user = auth.shift();
          options2.auth.pass = auth.join(":");
        }
        Object.keys(url2.query || {}).forEach((key) => {
          let obj = options2;
          let lKey = key;
          let value = url2.query[key];
          if (!isNaN(value)) {
            value = Number(value);
          }
          switch (value) {
            case "true":
              value = true;
              break;
            case "false":
              value = false;
              break;
          }
          if (key.indexOf("tls.") === 0) {
            lKey = key.substr(4);
            if (!options2.tls) {
              options2.tls = {};
            }
            obj = options2.tls;
          } else if (key.indexOf(".") >= 0) {
            return;
          }
          if (!(lKey in obj)) {
            obj[lKey] = value;
          }
        });
      });
      return options2;
    };
    module2.exports._logFunc = (logger, level, defaults, data, message2, ...args) => {
      let entry = {};
      Object.keys(defaults || {}).forEach((key) => {
        if (key !== "level") {
          entry[key] = defaults[key];
        }
      });
      Object.keys(data || {}).forEach((key) => {
        if (key !== "level") {
          entry[key] = data[key];
        }
      });
      logger[level](entry, message2, ...args);
    };
    module2.exports.getLogger = (options2, defaults) => {
      options2 = options2 || {};
      let response = {};
      let levels = ["trace", "debug", "info", "warn", "error", "fatal"];
      if (!options2.logger) {
        levels.forEach((level) => {
          response[level] = () => false;
        });
        return response;
      }
      let logger = options2.logger;
      if (options2.logger === true) {
        logger = createDefaultLogger(levels);
      }
      levels.forEach((level) => {
        response[level] = (data, message2, ...args) => {
          module2.exports._logFunc(logger, level, defaults, data, message2, ...args);
        };
      });
      return response;
    };
    module2.exports.callbackPromise = (resolve2, reject) => function() {
      let args = Array.from(arguments);
      let err = args.shift();
      if (err) {
        reject(err);
      } else {
        resolve2(...args);
      }
    };
    module2.exports.resolveContent = (data, key, callback) => {
      let promise;
      if (!callback) {
        promise = new Promise((resolve2, reject) => {
          callback = module2.exports.callbackPromise(resolve2, reject);
        });
      }
      let content = data && data[key] && data[key].content || data[key];
      let contentStream;
      let encoding = (typeof data[key] === "object" && data[key].encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
      if (!content) {
        return callback(null, content);
      }
      if (typeof content === "object") {
        if (typeof content.pipe === "function") {
          return resolveStream(content, (err, value) => {
            if (err) {
              return callback(err);
            }
            if (data[key].content) {
              data[key].content = value;
            } else {
              data[key] = value;
            }
            callback(null, value);
          });
        } else if (/^https?:\/\//i.test(content.path || content.href)) {
          contentStream = fetch3(content.path || content.href);
          return resolveStream(contentStream, callback);
        } else if (/^data:/i.test(content.path || content.href)) {
          let parts = (content.path || content.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
          if (!parts) {
            return callback(null, Buffer.from(0));
          }
          return callback(null, /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], "base64") : Buffer.from(decodeURIComponent(parts[2])));
        } else if (content.path) {
          return resolveStream(fs.createReadStream(content.path), callback);
        }
      }
      if (typeof data[key].content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
        content = Buffer.from(data[key].content, encoding);
      }
      setImmediate(() => callback(null, content));
      return promise;
    };
    module2.exports.assign = function() {
      let args = Array.from(arguments);
      let target = args.shift() || {};
      args.forEach((source) => {
        Object.keys(source || {}).forEach((key) => {
          if (["tls", "auth"].includes(key) && source[key] && typeof source[key] === "object") {
            if (!target[key]) {
              target[key] = {};
            }
            Object.keys(source[key]).forEach((subKey) => {
              target[key][subKey] = source[key][subKey];
            });
          } else {
            target[key] = source[key];
          }
        });
      });
      return target;
    };
    module2.exports.encodeXText = (str) => {
      if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
        return str;
      }
      let buf = Buffer.from(str);
      let result = "";
      for (let i = 0, len = buf.length; i < len; i++) {
        let c = buf[i];
        if (c < 33 || c > 126 || c === 43 || c === 61) {
          result += "+" + (c < 16 ? "0" : "") + c.toString(16).toUpperCase();
        } else {
          result += String.fromCharCode(c);
        }
      }
      return result;
    };
    function resolveStream(stream, callback) {
      let responded = false;
      let chunks = [];
      let chunklen = 0;
      stream.on("error", (err) => {
        if (responded) {
          return;
        }
        responded = true;
        callback(err);
      });
      stream.on("readable", () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      stream.on("end", () => {
        if (responded) {
          return;
        }
        responded = true;
        let value;
        try {
          value = Buffer.concat(chunks, chunklen);
        } catch (E) {
          return callback(E);
        }
        callback(null, value);
      });
    }
    function createDefaultLogger(levels) {
      let levelMaxLen = 0;
      let levelNames = new Map();
      levels.forEach((level) => {
        if (level.length > levelMaxLen) {
          levelMaxLen = level.length;
        }
      });
      levels.forEach((level) => {
        let levelName = level.toUpperCase();
        if (levelName.length < levelMaxLen) {
          levelName += " ".repeat(levelMaxLen - levelName.length);
        }
        levelNames.set(level, levelName);
      });
      let print = (level, entry, message2, ...args) => {
        let prefix = "";
        if (entry) {
          if (entry.tnx === "server") {
            prefix = "S: ";
          } else if (entry.tnx === "client") {
            prefix = "C: ";
          }
          if (entry.sid) {
            prefix = "[" + entry.sid + "] " + prefix;
          }
          if (entry.cid) {
            prefix = "[#" + entry.cid + "] " + prefix;
          }
        }
        message2 = util.format(message2, ...args);
        message2.split(/\r?\n/).forEach((line) => {
          console.log("[%s] %s %s", new Date().toISOString().substr(0, 19).replace(/T/, " "), levelNames.get(level), prefix + line);
        });
      };
      let logger = {};
      levels.forEach((level) => {
        logger[level] = print.bind(null, level);
      });
      return logger;
    }
  }
});

// node_modules/nodemailer/lib/mime-funcs/mime-types.js
var require_mime_types = __commonJS({
  "node_modules/nodemailer/lib/mime-funcs/mime-types.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var defaultMimeType = "application/octet-stream";
    var defaultExtension = "bin";
    var mimeTypes = new Map([
      ["application/acad", "dwg"],
      ["application/applixware", "aw"],
      ["application/arj", "arj"],
      ["application/atom+xml", "xml"],
      ["application/atomcat+xml", "atomcat"],
      ["application/atomsvc+xml", "atomsvc"],
      ["application/base64", ["mm", "mme"]],
      ["application/binhex", "hqx"],
      ["application/binhex4", "hqx"],
      ["application/book", ["book", "boo"]],
      ["application/ccxml+xml,", "ccxml"],
      ["application/cdf", "cdf"],
      ["application/cdmi-capability", "cdmia"],
      ["application/cdmi-container", "cdmic"],
      ["application/cdmi-domain", "cdmid"],
      ["application/cdmi-object", "cdmio"],
      ["application/cdmi-queue", "cdmiq"],
      ["application/clariscad", "ccad"],
      ["application/commonground", "dp"],
      ["application/cu-seeme", "cu"],
      ["application/davmount+xml", "davmount"],
      ["application/drafting", "drw"],
      ["application/dsptype", "tsp"],
      ["application/dssc+der", "dssc"],
      ["application/dssc+xml", "xdssc"],
      ["application/dxf", "dxf"],
      ["application/ecmascript", ["js", "es"]],
      ["application/emma+xml", "emma"],
      ["application/envoy", "evy"],
      ["application/epub+zip", "epub"],
      ["application/excel", ["xls", "xl", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/exi", "exi"],
      ["application/font-tdpfr", "pfr"],
      ["application/fractals", "fif"],
      ["application/freeloader", "frl"],
      ["application/futuresplash", "spl"],
      ["application/gnutar", "tgz"],
      ["application/groupwise", "vew"],
      ["application/hlp", "hlp"],
      ["application/hta", "hta"],
      ["application/hyperstudio", "stk"],
      ["application/i-deas", "unv"],
      ["application/iges", ["iges", "igs"]],
      ["application/inf", "inf"],
      ["application/internet-property-stream", "acx"],
      ["application/ipfix", "ipfix"],
      ["application/java", "class"],
      ["application/java-archive", "jar"],
      ["application/java-byte-code", "class"],
      ["application/java-serialized-object", "ser"],
      ["application/java-vm", "class"],
      ["application/javascript", "js"],
      ["application/json", "json"],
      ["application/lha", "lha"],
      ["application/lzx", "lzx"],
      ["application/mac-binary", "bin"],
      ["application/mac-binhex", "hqx"],
      ["application/mac-binhex40", "hqx"],
      ["application/mac-compactpro", "cpt"],
      ["application/macbinary", "bin"],
      ["application/mads+xml", "mads"],
      ["application/marc", "mrc"],
      ["application/marcxml+xml", "mrcx"],
      ["application/mathematica", "ma"],
      ["application/mathml+xml", "mathml"],
      ["application/mbedlet", "mbd"],
      ["application/mbox", "mbox"],
      ["application/mcad", "mcd"],
      ["application/mediaservercontrol+xml", "mscml"],
      ["application/metalink4+xml", "meta4"],
      ["application/mets+xml", "mets"],
      ["application/mime", "aps"],
      ["application/mods+xml", "mods"],
      ["application/mp21", "m21"],
      ["application/mp4", "mp4"],
      ["application/mspowerpoint", ["ppt", "pot", "pps", "ppz"]],
      ["application/msword", ["doc", "dot", "w6w", "wiz", "word"]],
      ["application/mswrite", "wri"],
      ["application/mxf", "mxf"],
      ["application/netmc", "mcp"],
      ["application/octet-stream", ["*"]],
      ["application/oda", "oda"],
      ["application/oebps-package+xml", "opf"],
      ["application/ogg", "ogx"],
      ["application/olescript", "axs"],
      ["application/onenote", "onetoc"],
      ["application/patch-ops-error+xml", "xer"],
      ["application/pdf", "pdf"],
      ["application/pgp-encrypted", "asc"],
      ["application/pgp-signature", "pgp"],
      ["application/pics-rules", "prf"],
      ["application/pkcs-12", "p12"],
      ["application/pkcs-crl", "crl"],
      ["application/pkcs10", "p10"],
      ["application/pkcs7-mime", ["p7c", "p7m"]],
      ["application/pkcs7-signature", "p7s"],
      ["application/pkcs8", "p8"],
      ["application/pkix-attr-cert", "ac"],
      ["application/pkix-cert", ["cer", "crt"]],
      ["application/pkix-crl", "crl"],
      ["application/pkix-pkipath", "pkipath"],
      ["application/pkixcmp", "pki"],
      ["application/plain", "text"],
      ["application/pls+xml", "pls"],
      ["application/postscript", ["ps", "ai", "eps"]],
      ["application/powerpoint", "ppt"],
      ["application/pro_eng", ["part", "prt"]],
      ["application/prs.cww", "cww"],
      ["application/pskc+xml", "pskcxml"],
      ["application/rdf+xml", "rdf"],
      ["application/reginfo+xml", "rif"],
      ["application/relax-ng-compact-syntax", "rnc"],
      ["application/resource-lists+xml", "rl"],
      ["application/resource-lists-diff+xml", "rld"],
      ["application/ringing-tones", "rng"],
      ["application/rls-services+xml", "rs"],
      ["application/rsd+xml", "rsd"],
      ["application/rss+xml", "xml"],
      ["application/rtf", ["rtf", "rtx"]],
      ["application/sbml+xml", "sbml"],
      ["application/scvp-cv-request", "scq"],
      ["application/scvp-cv-response", "scs"],
      ["application/scvp-vp-request", "spq"],
      ["application/scvp-vp-response", "spp"],
      ["application/sdp", "sdp"],
      ["application/sea", "sea"],
      ["application/set", "set"],
      ["application/set-payment-initiation", "setpay"],
      ["application/set-registration-initiation", "setreg"],
      ["application/shf+xml", "shf"],
      ["application/sla", "stl"],
      ["application/smil", ["smi", "smil"]],
      ["application/smil+xml", "smi"],
      ["application/solids", "sol"],
      ["application/sounder", "sdr"],
      ["application/sparql-query", "rq"],
      ["application/sparql-results+xml", "srx"],
      ["application/srgs", "gram"],
      ["application/srgs+xml", "grxml"],
      ["application/sru+xml", "sru"],
      ["application/ssml+xml", "ssml"],
      ["application/step", ["step", "stp"]],
      ["application/streamingmedia", "ssm"],
      ["application/tei+xml", "tei"],
      ["application/thraud+xml", "tfi"],
      ["application/timestamped-data", "tsd"],
      ["application/toolbook", "tbk"],
      ["application/vda", "vda"],
      ["application/vnd.3gpp.pic-bw-large", "plb"],
      ["application/vnd.3gpp.pic-bw-small", "psb"],
      ["application/vnd.3gpp.pic-bw-var", "pvb"],
      ["application/vnd.3gpp2.tcap", "tcap"],
      ["application/vnd.3m.post-it-notes", "pwn"],
      ["application/vnd.accpac.simply.aso", "aso"],
      ["application/vnd.accpac.simply.imp", "imp"],
      ["application/vnd.acucobol", "acu"],
      ["application/vnd.acucorp", "atc"],
      ["application/vnd.adobe.air-application-installer-package+zip", "air"],
      ["application/vnd.adobe.fxp", "fxp"],
      ["application/vnd.adobe.xdp+xml", "xdp"],
      ["application/vnd.adobe.xfdf", "xfdf"],
      ["application/vnd.ahead.space", "ahead"],
      ["application/vnd.airzip.filesecure.azf", "azf"],
      ["application/vnd.airzip.filesecure.azs", "azs"],
      ["application/vnd.amazon.ebook", "azw"],
      ["application/vnd.americandynamics.acc", "acc"],
      ["application/vnd.amiga.ami", "ami"],
      ["application/vnd.android.package-archive", "apk"],
      ["application/vnd.anser-web-certificate-issue-initiation", "cii"],
      ["application/vnd.anser-web-funds-transfer-initiation", "fti"],
      ["application/vnd.antix.game-component", "atx"],
      ["application/vnd.apple.installer+xml", "mpkg"],
      ["application/vnd.apple.mpegurl", "m3u8"],
      ["application/vnd.aristanetworks.swi", "swi"],
      ["application/vnd.audiograph", "aep"],
      ["application/vnd.blueice.multipass", "mpm"],
      ["application/vnd.bmi", "bmi"],
      ["application/vnd.businessobjects", "rep"],
      ["application/vnd.chemdraw+xml", "cdxml"],
      ["application/vnd.chipnuts.karaoke-mmd", "mmd"],
      ["application/vnd.cinderella", "cdy"],
      ["application/vnd.claymore", "cla"],
      ["application/vnd.cloanto.rp9", "rp9"],
      ["application/vnd.clonk.c4group", "c4g"],
      ["application/vnd.cluetrust.cartomobile-config", "c11amc"],
      ["application/vnd.cluetrust.cartomobile-config-pkg", "c11amz"],
      ["application/vnd.commonspace", "csp"],
      ["application/vnd.contact.cmsg", "cdbcmsg"],
      ["application/vnd.cosmocaller", "cmc"],
      ["application/vnd.crick.clicker", "clkx"],
      ["application/vnd.crick.clicker.keyboard", "clkk"],
      ["application/vnd.crick.clicker.palette", "clkp"],
      ["application/vnd.crick.clicker.template", "clkt"],
      ["application/vnd.crick.clicker.wordbank", "clkw"],
      ["application/vnd.criticaltools.wbs+xml", "wbs"],
      ["application/vnd.ctc-posml", "pml"],
      ["application/vnd.cups-ppd", "ppd"],
      ["application/vnd.curl.car", "car"],
      ["application/vnd.curl.pcurl", "pcurl"],
      ["application/vnd.data-vision.rdz", "rdz"],
      ["application/vnd.denovo.fcselayout-link", "fe_launch"],
      ["application/vnd.dna", "dna"],
      ["application/vnd.dolby.mlp", "mlp"],
      ["application/vnd.dpgraph", "dpg"],
      ["application/vnd.dreamfactory", "dfac"],
      ["application/vnd.dvb.ait", "ait"],
      ["application/vnd.dvb.service", "svc"],
      ["application/vnd.dynageo", "geo"],
      ["application/vnd.ecowin.chart", "mag"],
      ["application/vnd.enliven", "nml"],
      ["application/vnd.epson.esf", "esf"],
      ["application/vnd.epson.msf", "msf"],
      ["application/vnd.epson.quickanime", "qam"],
      ["application/vnd.epson.salt", "slt"],
      ["application/vnd.epson.ssf", "ssf"],
      ["application/vnd.eszigno3+xml", "es3"],
      ["application/vnd.ezpix-album", "ez2"],
      ["application/vnd.ezpix-package", "ez3"],
      ["application/vnd.fdf", "fdf"],
      ["application/vnd.fdsn.seed", "seed"],
      ["application/vnd.flographit", "gph"],
      ["application/vnd.fluxtime.clip", "ftc"],
      ["application/vnd.framemaker", "fm"],
      ["application/vnd.frogans.fnc", "fnc"],
      ["application/vnd.frogans.ltf", "ltf"],
      ["application/vnd.fsc.weblaunch", "fsc"],
      ["application/vnd.fujitsu.oasys", "oas"],
      ["application/vnd.fujitsu.oasys2", "oa2"],
      ["application/vnd.fujitsu.oasys3", "oa3"],
      ["application/vnd.fujitsu.oasysgp", "fg5"],
      ["application/vnd.fujitsu.oasysprs", "bh2"],
      ["application/vnd.fujixerox.ddd", "ddd"],
      ["application/vnd.fujixerox.docuworks", "xdw"],
      ["application/vnd.fujixerox.docuworks.binder", "xbd"],
      ["application/vnd.fuzzysheet", "fzs"],
      ["application/vnd.genomatix.tuxedo", "txd"],
      ["application/vnd.geogebra.file", "ggb"],
      ["application/vnd.geogebra.tool", "ggt"],
      ["application/vnd.geometry-explorer", "gex"],
      ["application/vnd.geonext", "gxt"],
      ["application/vnd.geoplan", "g2w"],
      ["application/vnd.geospace", "g3w"],
      ["application/vnd.gmx", "gmx"],
      ["application/vnd.google-earth.kml+xml", "kml"],
      ["application/vnd.google-earth.kmz", "kmz"],
      ["application/vnd.grafeq", "gqf"],
      ["application/vnd.groove-account", "gac"],
      ["application/vnd.groove-help", "ghf"],
      ["application/vnd.groove-identity-message", "gim"],
      ["application/vnd.groove-injector", "grv"],
      ["application/vnd.groove-tool-message", "gtm"],
      ["application/vnd.groove-tool-template", "tpl"],
      ["application/vnd.groove-vcard", "vcg"],
      ["application/vnd.hal+xml", "hal"],
      ["application/vnd.handheld-entertainment+xml", "zmm"],
      ["application/vnd.hbci", "hbci"],
      ["application/vnd.hhe.lesson-player", "les"],
      ["application/vnd.hp-hpgl", ["hgl", "hpg", "hpgl"]],
      ["application/vnd.hp-hpid", "hpid"],
      ["application/vnd.hp-hps", "hps"],
      ["application/vnd.hp-jlyt", "jlt"],
      ["application/vnd.hp-pcl", "pcl"],
      ["application/vnd.hp-pclxl", "pclxl"],
      ["application/vnd.hydrostatix.sof-data", "sfd-hdstx"],
      ["application/vnd.hzn-3d-crossword", "x3d"],
      ["application/vnd.ibm.minipay", "mpy"],
      ["application/vnd.ibm.modcap", "afp"],
      ["application/vnd.ibm.rights-management", "irm"],
      ["application/vnd.ibm.secure-container", "sc"],
      ["application/vnd.iccprofile", "icc"],
      ["application/vnd.igloader", "igl"],
      ["application/vnd.immervision-ivp", "ivp"],
      ["application/vnd.immervision-ivu", "ivu"],
      ["application/vnd.insors.igm", "igm"],
      ["application/vnd.intercon.formnet", "xpw"],
      ["application/vnd.intergeo", "i2g"],
      ["application/vnd.intu.qbo", "qbo"],
      ["application/vnd.intu.qfx", "qfx"],
      ["application/vnd.ipunplugged.rcprofile", "rcprofile"],
      ["application/vnd.irepository.package+xml", "irp"],
      ["application/vnd.is-xpr", "xpr"],
      ["application/vnd.isac.fcs", "fcs"],
      ["application/vnd.jam", "jam"],
      ["application/vnd.jcp.javame.midlet-rms", "rms"],
      ["application/vnd.jisp", "jisp"],
      ["application/vnd.joost.joda-archive", "joda"],
      ["application/vnd.kahootz", "ktz"],
      ["application/vnd.kde.karbon", "karbon"],
      ["application/vnd.kde.kchart", "chrt"],
      ["application/vnd.kde.kformula", "kfo"],
      ["application/vnd.kde.kivio", "flw"],
      ["application/vnd.kde.kontour", "kon"],
      ["application/vnd.kde.kpresenter", "kpr"],
      ["application/vnd.kde.kspread", "ksp"],
      ["application/vnd.kde.kword", "kwd"],
      ["application/vnd.kenameaapp", "htke"],
      ["application/vnd.kidspiration", "kia"],
      ["application/vnd.kinar", "kne"],
      ["application/vnd.koan", "skp"],
      ["application/vnd.kodak-descriptor", "sse"],
      ["application/vnd.las.las+xml", "lasxml"],
      ["application/vnd.llamagraphics.life-balance.desktop", "lbd"],
      ["application/vnd.llamagraphics.life-balance.exchange+xml", "lbe"],
      ["application/vnd.lotus-1-2-3", "123"],
      ["application/vnd.lotus-approach", "apr"],
      ["application/vnd.lotus-freelance", "pre"],
      ["application/vnd.lotus-notes", "nsf"],
      ["application/vnd.lotus-organizer", "org"],
      ["application/vnd.lotus-screencam", "scm"],
      ["application/vnd.lotus-wordpro", "lwp"],
      ["application/vnd.macports.portpkg", "portpkg"],
      ["application/vnd.mcd", "mcd"],
      ["application/vnd.medcalcdata", "mc1"],
      ["application/vnd.mediastation.cdkey", "cdkey"],
      ["application/vnd.mfer", "mwf"],
      ["application/vnd.mfmp", "mfm"],
      ["application/vnd.micrografx.flo", "flo"],
      ["application/vnd.micrografx.igx", "igx"],
      ["application/vnd.mif", "mif"],
      ["application/vnd.mobius.daf", "daf"],
      ["application/vnd.mobius.dis", "dis"],
      ["application/vnd.mobius.mbk", "mbk"],
      ["application/vnd.mobius.mqy", "mqy"],
      ["application/vnd.mobius.msl", "msl"],
      ["application/vnd.mobius.plc", "plc"],
      ["application/vnd.mobius.txf", "txf"],
      ["application/vnd.mophun.application", "mpn"],
      ["application/vnd.mophun.certificate", "mpc"],
      ["application/vnd.mozilla.xul+xml", "xul"],
      ["application/vnd.ms-artgalry", "cil"],
      ["application/vnd.ms-cab-compressed", "cab"],
      ["application/vnd.ms-excel", ["xls", "xla", "xlc", "xlm", "xlt", "xlw", "xlb", "xll"]],
      ["application/vnd.ms-excel.addin.macroenabled.12", "xlam"],
      ["application/vnd.ms-excel.sheet.binary.macroenabled.12", "xlsb"],
      ["application/vnd.ms-excel.sheet.macroenabled.12", "xlsm"],
      ["application/vnd.ms-excel.template.macroenabled.12", "xltm"],
      ["application/vnd.ms-fontobject", "eot"],
      ["application/vnd.ms-htmlhelp", "chm"],
      ["application/vnd.ms-ims", "ims"],
      ["application/vnd.ms-lrm", "lrm"],
      ["application/vnd.ms-officetheme", "thmx"],
      ["application/vnd.ms-outlook", "msg"],
      ["application/vnd.ms-pki.certstore", "sst"],
      ["application/vnd.ms-pki.pko", "pko"],
      ["application/vnd.ms-pki.seccat", "cat"],
      ["application/vnd.ms-pki.stl", "stl"],
      ["application/vnd.ms-pkicertstore", "sst"],
      ["application/vnd.ms-pkiseccat", "cat"],
      ["application/vnd.ms-pkistl", "stl"],
      ["application/vnd.ms-powerpoint", ["ppt", "pot", "pps", "ppa", "pwz"]],
      ["application/vnd.ms-powerpoint.addin.macroenabled.12", "ppam"],
      ["application/vnd.ms-powerpoint.presentation.macroenabled.12", "pptm"],
      ["application/vnd.ms-powerpoint.slide.macroenabled.12", "sldm"],
      ["application/vnd.ms-powerpoint.slideshow.macroenabled.12", "ppsm"],
      ["application/vnd.ms-powerpoint.template.macroenabled.12", "potm"],
      ["application/vnd.ms-project", "mpp"],
      ["application/vnd.ms-word.document.macroenabled.12", "docm"],
      ["application/vnd.ms-word.template.macroenabled.12", "dotm"],
      ["application/vnd.ms-works", ["wks", "wcm", "wdb", "wps"]],
      ["application/vnd.ms-wpl", "wpl"],
      ["application/vnd.ms-xpsdocument", "xps"],
      ["application/vnd.mseq", "mseq"],
      ["application/vnd.musician", "mus"],
      ["application/vnd.muvee.style", "msty"],
      ["application/vnd.neurolanguage.nlu", "nlu"],
      ["application/vnd.noblenet-directory", "nnd"],
      ["application/vnd.noblenet-sealer", "nns"],
      ["application/vnd.noblenet-web", "nnw"],
      ["application/vnd.nokia.configuration-message", "ncm"],
      ["application/vnd.nokia.n-gage.data", "ngdat"],
      ["application/vnd.nokia.n-gage.symbian.install", "n-gage"],
      ["application/vnd.nokia.radio-preset", "rpst"],
      ["application/vnd.nokia.radio-presets", "rpss"],
      ["application/vnd.nokia.ringing-tone", "rng"],
      ["application/vnd.novadigm.edm", "edm"],
      ["application/vnd.novadigm.edx", "edx"],
      ["application/vnd.novadigm.ext", "ext"],
      ["application/vnd.oasis.opendocument.chart", "odc"],
      ["application/vnd.oasis.opendocument.chart-template", "otc"],
      ["application/vnd.oasis.opendocument.database", "odb"],
      ["application/vnd.oasis.opendocument.formula", "odf"],
      ["application/vnd.oasis.opendocument.formula-template", "odft"],
      ["application/vnd.oasis.opendocument.graphics", "odg"],
      ["application/vnd.oasis.opendocument.graphics-template", "otg"],
      ["application/vnd.oasis.opendocument.image", "odi"],
      ["application/vnd.oasis.opendocument.image-template", "oti"],
      ["application/vnd.oasis.opendocument.presentation", "odp"],
      ["application/vnd.oasis.opendocument.presentation-template", "otp"],
      ["application/vnd.oasis.opendocument.spreadsheet", "ods"],
      ["application/vnd.oasis.opendocument.spreadsheet-template", "ots"],
      ["application/vnd.oasis.opendocument.text", "odt"],
      ["application/vnd.oasis.opendocument.text-master", "odm"],
      ["application/vnd.oasis.opendocument.text-template", "ott"],
      ["application/vnd.oasis.opendocument.text-web", "oth"],
      ["application/vnd.olpc-sugar", "xo"],
      ["application/vnd.oma.dd2+xml", "dd2"],
      ["application/vnd.openofficeorg.extension", "oxt"],
      ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slide", "sldx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.slideshow", "ppsx"],
      ["application/vnd.openxmlformats-officedocument.presentationml.template", "potx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
      ["application/vnd.openxmlformats-officedocument.spreadsheetml.template", "xltx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
      ["application/vnd.openxmlformats-officedocument.wordprocessingml.template", "dotx"],
      ["application/vnd.osgeo.mapguide.package", "mgp"],
      ["application/vnd.osgi.dp", "dp"],
      ["application/vnd.palm", "pdb"],
      ["application/vnd.pawaafile", "paw"],
      ["application/vnd.pg.format", "str"],
      ["application/vnd.pg.osasli", "ei6"],
      ["application/vnd.picsel", "efif"],
      ["application/vnd.pmi.widget", "wg"],
      ["application/vnd.pocketlearn", "plf"],
      ["application/vnd.powerbuilder6", "pbd"],
      ["application/vnd.previewsystems.box", "box"],
      ["application/vnd.proteus.magazine", "mgz"],
      ["application/vnd.publishare-delta-tree", "qps"],
      ["application/vnd.pvi.ptid1", "ptid"],
      ["application/vnd.quark.quarkxpress", "qxd"],
      ["application/vnd.realvnc.bed", "bed"],
      ["application/vnd.recordare.musicxml", "mxl"],
      ["application/vnd.recordare.musicxml+xml", "musicxml"],
      ["application/vnd.rig.cryptonote", "cryptonote"],
      ["application/vnd.rim.cod", "cod"],
      ["application/vnd.rn-realmedia", "rm"],
      ["application/vnd.rn-realplayer", "rnx"],
      ["application/vnd.route66.link66+xml", "link66"],
      ["application/vnd.sailingtracker.track", "st"],
      ["application/vnd.seemail", "see"],
      ["application/vnd.sema", "sema"],
      ["application/vnd.semd", "semd"],
      ["application/vnd.semf", "semf"],
      ["application/vnd.shana.informed.formdata", "ifm"],
      ["application/vnd.shana.informed.formtemplate", "itp"],
      ["application/vnd.shana.informed.interchange", "iif"],
      ["application/vnd.shana.informed.package", "ipk"],
      ["application/vnd.simtech-mindmapper", "twd"],
      ["application/vnd.smaf", "mmf"],
      ["application/vnd.smart.teacher", "teacher"],
      ["application/vnd.solent.sdkm+xml", "sdkm"],
      ["application/vnd.spotfire.dxp", "dxp"],
      ["application/vnd.spotfire.sfs", "sfs"],
      ["application/vnd.stardivision.calc", "sdc"],
      ["application/vnd.stardivision.draw", "sda"],
      ["application/vnd.stardivision.impress", "sdd"],
      ["application/vnd.stardivision.math", "smf"],
      ["application/vnd.stardivision.writer", "sdw"],
      ["application/vnd.stardivision.writer-global", "sgl"],
      ["application/vnd.stepmania.stepchart", "sm"],
      ["application/vnd.sun.xml.calc", "sxc"],
      ["application/vnd.sun.xml.calc.template", "stc"],
      ["application/vnd.sun.xml.draw", "sxd"],
      ["application/vnd.sun.xml.draw.template", "std"],
      ["application/vnd.sun.xml.impress", "sxi"],
      ["application/vnd.sun.xml.impress.template", "sti"],
      ["application/vnd.sun.xml.math", "sxm"],
      ["application/vnd.sun.xml.writer", "sxw"],
      ["application/vnd.sun.xml.writer.global", "sxg"],
      ["application/vnd.sun.xml.writer.template", "stw"],
      ["application/vnd.sus-calendar", "sus"],
      ["application/vnd.svd", "svd"],
      ["application/vnd.symbian.install", "sis"],
      ["application/vnd.syncml+xml", "xsm"],
      ["application/vnd.syncml.dm+wbxml", "bdm"],
      ["application/vnd.syncml.dm+xml", "xdm"],
      ["application/vnd.tao.intent-module-archive", "tao"],
      ["application/vnd.tmobile-livetv", "tmo"],
      ["application/vnd.trid.tpt", "tpt"],
      ["application/vnd.triscape.mxs", "mxs"],
      ["application/vnd.trueapp", "tra"],
      ["application/vnd.ufdl", "ufd"],
      ["application/vnd.uiq.theme", "utz"],
      ["application/vnd.umajin", "umj"],
      ["application/vnd.unity", "unityweb"],
      ["application/vnd.uoml+xml", "uoml"],
      ["application/vnd.vcx", "vcx"],
      ["application/vnd.visio", "vsd"],
      ["application/vnd.visionary", "vis"],
      ["application/vnd.vsf", "vsf"],
      ["application/vnd.wap.wbxml", "wbxml"],
      ["application/vnd.wap.wmlc", "wmlc"],
      ["application/vnd.wap.wmlscriptc", "wmlsc"],
      ["application/vnd.webturbo", "wtb"],
      ["application/vnd.wolfram.player", "nbp"],
      ["application/vnd.wordperfect", "wpd"],
      ["application/vnd.wqd", "wqd"],
      ["application/vnd.wt.stf", "stf"],
      ["application/vnd.xara", ["web", "xar"]],
      ["application/vnd.xfdl", "xfdl"],
      ["application/vnd.yamaha.hv-dic", "hvd"],
      ["application/vnd.yamaha.hv-script", "hvs"],
      ["application/vnd.yamaha.hv-voice", "hvp"],
      ["application/vnd.yamaha.openscoreformat", "osf"],
      ["application/vnd.yamaha.openscoreformat.osfpvg+xml", "osfpvg"],
      ["application/vnd.yamaha.smaf-audio", "saf"],
      ["application/vnd.yamaha.smaf-phrase", "spf"],
      ["application/vnd.yellowriver-custom-menu", "cmp"],
      ["application/vnd.zul", "zir"],
      ["application/vnd.zzazz.deck+xml", "zaz"],
      ["application/vocaltec-media-desc", "vmd"],
      ["application/vocaltec-media-file", "vmf"],
      ["application/voicexml+xml", "vxml"],
      ["application/widget", "wgt"],
      ["application/winhlp", "hlp"],
      ["application/wordperfect", ["wp", "wp5", "wp6", "wpd"]],
      ["application/wordperfect6.0", ["w60", "wp5"]],
      ["application/wordperfect6.1", "w61"],
      ["application/wsdl+xml", "wsdl"],
      ["application/wspolicy+xml", "wspolicy"],
      ["application/x-123", "wk1"],
      ["application/x-7z-compressed", "7z"],
      ["application/x-abiword", "abw"],
      ["application/x-ace-compressed", "ace"],
      ["application/x-aim", "aim"],
      ["application/x-authorware-bin", "aab"],
      ["application/x-authorware-map", "aam"],
      ["application/x-authorware-seg", "aas"],
      ["application/x-bcpio", "bcpio"],
      ["application/x-binary", "bin"],
      ["application/x-binhex40", "hqx"],
      ["application/x-bittorrent", "torrent"],
      ["application/x-bsh", ["bsh", "sh", "shar"]],
      ["application/x-bytecode.elisp", "elc"],
      ["applicaiton/x-bytecode.python", "pyc"],
      ["application/x-bzip", "bz"],
      ["application/x-bzip2", ["boz", "bz2"]],
      ["application/x-cdf", "cdf"],
      ["application/x-cdlink", "vcd"],
      ["application/x-chat", ["cha", "chat"]],
      ["application/x-chess-pgn", "pgn"],
      ["application/x-cmu-raster", "ras"],
      ["application/x-cocoa", "cco"],
      ["application/x-compactpro", "cpt"],
      ["application/x-compress", "z"],
      ["application/x-compressed", ["tgz", "gz", "z", "zip"]],
      ["application/x-conference", "nsc"],
      ["application/x-cpio", "cpio"],
      ["application/x-cpt", "cpt"],
      ["application/x-csh", "csh"],
      ["application/x-debian-package", "deb"],
      ["application/x-deepv", "deepv"],
      ["application/x-director", ["dir", "dcr", "dxr"]],
      ["application/x-doom", "wad"],
      ["application/x-dtbncx+xml", "ncx"],
      ["application/x-dtbook+xml", "dtb"],
      ["application/x-dtbresource+xml", "res"],
      ["application/x-dvi", "dvi"],
      ["application/x-elc", "elc"],
      ["application/x-envoy", ["env", "evy"]],
      ["application/x-esrehber", "es"],
      ["application/x-excel", ["xls", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
      ["application/x-font-bdf", "bdf"],
      ["application/x-font-ghostscript", "gsf"],
      ["application/x-font-linux-psf", "psf"],
      ["application/x-font-otf", "otf"],
      ["application/x-font-pcf", "pcf"],
      ["application/x-font-snf", "snf"],
      ["application/x-font-ttf", "ttf"],
      ["application/x-font-type1", "pfa"],
      ["application/x-font-woff", "woff"],
      ["application/x-frame", "mif"],
      ["application/x-freelance", "pre"],
      ["application/x-futuresplash", "spl"],
      ["application/x-gnumeric", "gnumeric"],
      ["application/x-gsp", "gsp"],
      ["application/x-gss", "gss"],
      ["application/x-gtar", "gtar"],
      ["application/x-gzip", ["gz", "gzip"]],
      ["application/x-hdf", "hdf"],
      ["application/x-helpfile", ["help", "hlp"]],
      ["application/x-httpd-imap", "imap"],
      ["application/x-ima", "ima"],
      ["application/x-internet-signup", ["ins", "isp"]],
      ["application/x-internett-signup", "ins"],
      ["application/x-inventor", "iv"],
      ["application/x-ip2", "ip"],
      ["application/x-iphone", "iii"],
      ["application/x-java-class", "class"],
      ["application/x-java-commerce", "jcm"],
      ["application/x-java-jnlp-file", "jnlp"],
      ["application/x-javascript", "js"],
      ["application/x-koan", ["skd", "skm", "skp", "skt"]],
      ["application/x-ksh", "ksh"],
      ["application/x-latex", ["latex", "ltx"]],
      ["application/x-lha", "lha"],
      ["application/x-lisp", "lsp"],
      ["application/x-livescreen", "ivy"],
      ["application/x-lotus", "wq1"],
      ["application/x-lotusscreencam", "scm"],
      ["application/x-lzh", "lzh"],
      ["application/x-lzx", "lzx"],
      ["application/x-mac-binhex40", "hqx"],
      ["application/x-macbinary", "bin"],
      ["application/x-magic-cap-package-1.0", "mc$"],
      ["application/x-mathcad", "mcd"],
      ["application/x-meme", "mm"],
      ["application/x-midi", ["mid", "midi"]],
      ["application/x-mif", "mif"],
      ["application/x-mix-transfer", "nix"],
      ["application/x-mobipocket-ebook", "prc"],
      ["application/x-mplayer2", "asx"],
      ["application/x-ms-application", "application"],
      ["application/x-ms-wmd", "wmd"],
      ["application/x-ms-wmz", "wmz"],
      ["application/x-ms-xbap", "xbap"],
      ["application/x-msaccess", "mdb"],
      ["application/x-msbinder", "obd"],
      ["application/x-mscardfile", "crd"],
      ["application/x-msclip", "clp"],
      ["application/x-msdownload", ["exe", "dll"]],
      ["application/x-msexcel", ["xls", "xla", "xlw"]],
      ["application/x-msmediaview", ["mvb", "m13", "m14"]],
      ["application/x-msmetafile", "wmf"],
      ["application/x-msmoney", "mny"],
      ["application/x-mspowerpoint", "ppt"],
      ["application/x-mspublisher", "pub"],
      ["application/x-msschedule", "scd"],
      ["application/x-msterminal", "trm"],
      ["application/x-mswrite", "wri"],
      ["application/x-navi-animation", "ani"],
      ["application/x-navidoc", "nvd"],
      ["application/x-navimap", "map"],
      ["application/x-navistyle", "stl"],
      ["application/x-netcdf", ["cdf", "nc"]],
      ["application/x-newton-compatible-pkg", "pkg"],
      ["application/x-nokia-9000-communicator-add-on-software", "aos"],
      ["application/x-omc", "omc"],
      ["application/x-omcdatamaker", "omcd"],
      ["application/x-omcregerator", "omcr"],
      ["application/x-pagemaker", ["pm4", "pm5"]],
      ["application/x-pcl", "pcl"],
      ["application/x-perfmon", ["pma", "pmc", "pml", "pmr", "pmw"]],
      ["application/x-pixclscript", "plx"],
      ["application/x-pkcs10", "p10"],
      ["application/x-pkcs12", ["p12", "pfx"]],
      ["application/x-pkcs7-certificates", ["p7b", "spc"]],
      ["application/x-pkcs7-certreqresp", "p7r"],
      ["application/x-pkcs7-mime", ["p7m", "p7c"]],
      ["application/x-pkcs7-signature", ["p7s", "p7a"]],
      ["application/x-pointplus", "css"],
      ["application/x-portable-anymap", "pnm"],
      ["application/x-project", ["mpc", "mpt", "mpv", "mpx"]],
      ["application/x-qpro", "wb1"],
      ["application/x-rar-compressed", "rar"],
      ["application/x-rtf", "rtf"],
      ["application/x-sdp", "sdp"],
      ["application/x-sea", "sea"],
      ["application/x-seelogo", "sl"],
      ["application/x-sh", "sh"],
      ["application/x-shar", ["shar", "sh"]],
      ["application/x-shockwave-flash", "swf"],
      ["application/x-silverlight-app", "xap"],
      ["application/x-sit", "sit"],
      ["application/x-sprite", ["spr", "sprite"]],
      ["application/x-stuffit", "sit"],
      ["application/x-stuffitx", "sitx"],
      ["application/x-sv4cpio", "sv4cpio"],
      ["application/x-sv4crc", "sv4crc"],
      ["application/x-tar", "tar"],
      ["application/x-tbook", ["sbk", "tbk"]],
      ["application/x-tcl", "tcl"],
      ["application/x-tex", "tex"],
      ["application/x-tex-tfm", "tfm"],
      ["application/x-texinfo", ["texi", "texinfo"]],
      ["application/x-troff", ["roff", "t", "tr"]],
      ["application/x-troff-man", "man"],
      ["application/x-troff-me", "me"],
      ["application/x-troff-ms", "ms"],
      ["application/x-troff-msvideo", "avi"],
      ["application/x-ustar", "ustar"],
      ["application/x-visio", ["vsd", "vst", "vsw"]],
      ["application/x-vnd.audioexplosion.mzz", "mzz"],
      ["application/x-vnd.ls-xpix", "xpix"],
      ["application/x-vrml", "vrml"],
      ["application/x-wais-source", ["src", "wsrc"]],
      ["application/x-winhelp", "hlp"],
      ["application/x-wintalk", "wtk"],
      ["application/x-world", ["wrl", "svr"]],
      ["application/x-wpwin", "wpd"],
      ["application/x-wri", "wri"],
      ["application/x-x509-ca-cert", ["cer", "crt", "der"]],
      ["application/x-x509-user-cert", "crt"],
      ["application/x-xfig", "fig"],
      ["application/x-xpinstall", "xpi"],
      ["application/x-zip-compressed", "zip"],
      ["application/xcap-diff+xml", "xdf"],
      ["application/xenc+xml", "xenc"],
      ["application/xhtml+xml", "xhtml"],
      ["application/xml", "xml"],
      ["application/xml-dtd", "dtd"],
      ["application/xop+xml", "xop"],
      ["application/xslt+xml", "xslt"],
      ["application/xspf+xml", "xspf"],
      ["application/xv+xml", "mxml"],
      ["application/yang", "yang"],
      ["application/yin+xml", "yin"],
      ["application/ynd.ms-pkipko", "pko"],
      ["application/zip", "zip"],
      ["audio/adpcm", "adp"],
      ["audio/aiff", ["aiff", "aif", "aifc"]],
      ["audio/basic", ["snd", "au"]],
      ["audio/it", "it"],
      ["audio/make", ["funk", "my", "pfunk"]],
      ["audio/make.my.funk", "pfunk"],
      ["audio/mid", ["mid", "rmi"]],
      ["audio/midi", ["midi", "kar", "mid"]],
      ["audio/mod", "mod"],
      ["audio/mp4", "mp4a"],
      ["audio/mpeg", ["mpga", "mp3", "m2a", "mp2", "mpa", "mpg"]],
      ["audio/mpeg3", "mp3"],
      ["audio/nspaudio", ["la", "lma"]],
      ["audio/ogg", "oga"],
      ["audio/s3m", "s3m"],
      ["audio/tsp-audio", "tsi"],
      ["audio/tsplayer", "tsp"],
      ["audio/vnd.dece.audio", "uva"],
      ["audio/vnd.digital-winds", "eol"],
      ["audio/vnd.dra", "dra"],
      ["audio/vnd.dts", "dts"],
      ["audio/vnd.dts.hd", "dtshd"],
      ["audio/vnd.lucent.voice", "lvp"],
      ["audio/vnd.ms-playready.media.pya", "pya"],
      ["audio/vnd.nuera.ecelp4800", "ecelp4800"],
      ["audio/vnd.nuera.ecelp7470", "ecelp7470"],
      ["audio/vnd.nuera.ecelp9600", "ecelp9600"],
      ["audio/vnd.qcelp", "qcp"],
      ["audio/vnd.rip", "rip"],
      ["audio/voc", "voc"],
      ["audio/voxware", "vox"],
      ["audio/wav", "wav"],
      ["audio/webm", "weba"],
      ["audio/x-aac", "aac"],
      ["audio/x-adpcm", "snd"],
      ["audio/x-aiff", ["aiff", "aif", "aifc"]],
      ["audio/x-au", "au"],
      ["audio/x-gsm", ["gsd", "gsm"]],
      ["audio/x-jam", "jam"],
      ["audio/x-liveaudio", "lam"],
      ["audio/x-mid", ["mid", "midi"]],
      ["audio/x-midi", ["midi", "mid"]],
      ["audio/x-mod", "mod"],
      ["audio/x-mpeg", "mp2"],
      ["audio/x-mpeg-3", "mp3"],
      ["audio/x-mpegurl", "m3u"],
      ["audio/x-mpequrl", "m3u"],
      ["audio/x-ms-wax", "wax"],
      ["audio/x-ms-wma", "wma"],
      ["audio/x-nspaudio", ["la", "lma"]],
      ["audio/x-pn-realaudio", ["ra", "ram", "rm", "rmm", "rmp"]],
      ["audio/x-pn-realaudio-plugin", ["ra", "rmp", "rpm"]],
      ["audio/x-psid", "sid"],
      ["audio/x-realaudio", "ra"],
      ["audio/x-twinvq", "vqf"],
      ["audio/x-twinvq-plugin", ["vqe", "vql"]],
      ["audio/x-vnd.audioexplosion.mjuicemediafile", "mjf"],
      ["audio/x-voc", "voc"],
      ["audio/x-wav", "wav"],
      ["audio/xm", "xm"],
      ["chemical/x-cdx", "cdx"],
      ["chemical/x-cif", "cif"],
      ["chemical/x-cmdf", "cmdf"],
      ["chemical/x-cml", "cml"],
      ["chemical/x-csml", "csml"],
      ["chemical/x-pdb", ["pdb", "xyz"]],
      ["chemical/x-xyz", "xyz"],
      ["drawing/x-dwf", "dwf"],
      ["i-world/i-vrml", "ivr"],
      ["image/bmp", ["bmp", "bm"]],
      ["image/cgm", "cgm"],
      ["image/cis-cod", "cod"],
      ["image/cmu-raster", ["ras", "rast"]],
      ["image/fif", "fif"],
      ["image/florian", ["flo", "turbot"]],
      ["image/g3fax", "g3"],
      ["image/gif", "gif"],
      ["image/ief", ["ief", "iefs"]],
      ["image/jpeg", ["jpeg", "jpe", "jpg", "jfif", "jfif-tbnl"]],
      ["image/jutvision", "jut"],
      ["image/ktx", "ktx"],
      ["image/naplps", ["nap", "naplps"]],
      ["image/pict", ["pic", "pict"]],
      ["image/pipeg", "jfif"],
      ["image/pjpeg", ["jfif", "jpe", "jpeg", "jpg"]],
      ["image/png", ["png", "x-png"]],
      ["image/prs.btif", "btif"],
      ["image/svg+xml", "svg"],
      ["image/tiff", ["tif", "tiff"]],
      ["image/vasa", "mcf"],
      ["image/vnd.adobe.photoshop", "psd"],
      ["image/vnd.dece.graphic", "uvi"],
      ["image/vnd.djvu", "djvu"],
      ["image/vnd.dvb.subtitle", "sub"],
      ["image/vnd.dwg", ["dwg", "dxf", "svf"]],
      ["image/vnd.dxf", "dxf"],
      ["image/vnd.fastbidsheet", "fbs"],
      ["image/vnd.fpx", "fpx"],
      ["image/vnd.fst", "fst"],
      ["image/vnd.fujixerox.edmics-mmr", "mmr"],
      ["image/vnd.fujixerox.edmics-rlc", "rlc"],
      ["image/vnd.ms-modi", "mdi"],
      ["image/vnd.net-fpx", ["fpx", "npx"]],
      ["image/vnd.rn-realflash", "rf"],
      ["image/vnd.rn-realpix", "rp"],
      ["image/vnd.wap.wbmp", "wbmp"],
      ["image/vnd.xiff", "xif"],
      ["image/webp", "webp"],
      ["image/x-cmu-raster", "ras"],
      ["image/x-cmx", "cmx"],
      ["image/x-dwg", ["dwg", "dxf", "svf"]],
      ["image/x-freehand", "fh"],
      ["image/x-icon", "ico"],
      ["image/x-jg", "art"],
      ["image/x-jps", "jps"],
      ["image/x-niff", ["niff", "nif"]],
      ["image/x-pcx", "pcx"],
      ["image/x-pict", ["pct", "pic"]],
      ["image/x-portable-anymap", "pnm"],
      ["image/x-portable-bitmap", "pbm"],
      ["image/x-portable-graymap", "pgm"],
      ["image/x-portable-greymap", "pgm"],
      ["image/x-portable-pixmap", "ppm"],
      ["image/x-quicktime", ["qif", "qti", "qtif"]],
      ["image/x-rgb", "rgb"],
      ["image/x-tiff", ["tif", "tiff"]],
      ["image/x-windows-bmp", "bmp"],
      ["image/x-xbitmap", "xbm"],
      ["image/x-xbm", "xbm"],
      ["image/x-xpixmap", ["xpm", "pm"]],
      ["image/x-xwd", "xwd"],
      ["image/x-xwindowdump", "xwd"],
      ["image/xbm", "xbm"],
      ["image/xpm", "xpm"],
      ["message/rfc822", ["eml", "mht", "mhtml", "nws", "mime"]],
      ["model/iges", ["iges", "igs"]],
      ["model/mesh", "msh"],
      ["model/vnd.collada+xml", "dae"],
      ["model/vnd.dwf", "dwf"],
      ["model/vnd.gdl", "gdl"],
      ["model/vnd.gtw", "gtw"],
      ["model/vnd.mts", "mts"],
      ["model/vnd.vtu", "vtu"],
      ["model/vrml", ["vrml", "wrl", "wrz"]],
      ["model/x-pov", "pov"],
      ["multipart/x-gzip", "gzip"],
      ["multipart/x-ustar", "ustar"],
      ["multipart/x-zip", "zip"],
      ["music/crescendo", ["mid", "midi"]],
      ["music/x-karaoke", "kar"],
      ["paleovu/x-pv", "pvu"],
      ["text/asp", "asp"],
      ["text/calendar", "ics"],
      ["text/css", "css"],
      ["text/csv", "csv"],
      ["text/ecmascript", "js"],
      ["text/h323", "323"],
      ["text/html", ["html", "htm", "stm", "acgi", "htmls", "htx", "shtml"]],
      ["text/iuls", "uls"],
      ["text/javascript", "js"],
      ["text/mcf", "mcf"],
      ["text/n3", "n3"],
      ["text/pascal", "pas"],
      [
        "text/plain",
        [
          "txt",
          "bas",
          "c",
          "h",
          "c++",
          "cc",
          "com",
          "conf",
          "cxx",
          "def",
          "f",
          "f90",
          "for",
          "g",
          "hh",
          "idc",
          "jav",
          "java",
          "list",
          "log",
          "lst",
          "m",
          "mar",
          "pl",
          "sdml",
          "text"
        ]
      ],
      ["text/plain-bas", "par"],
      ["text/prs.lines.tag", "dsc"],
      ["text/richtext", ["rtx", "rt", "rtf"]],
      ["text/scriplet", "wsc"],
      ["text/scriptlet", "sct"],
      ["text/sgml", ["sgm", "sgml"]],
      ["text/tab-separated-values", "tsv"],
      ["text/troff", "t"],
      ["text/turtle", "ttl"],
      ["text/uri-list", ["uni", "unis", "uri", "uris"]],
      ["text/vnd.abc", "abc"],
      ["text/vnd.curl", "curl"],
      ["text/vnd.curl.dcurl", "dcurl"],
      ["text/vnd.curl.mcurl", "mcurl"],
      ["text/vnd.curl.scurl", "scurl"],
      ["text/vnd.fly", "fly"],
      ["text/vnd.fmi.flexstor", "flx"],
      ["text/vnd.graphviz", "gv"],
      ["text/vnd.in3d.3dml", "3dml"],
      ["text/vnd.in3d.spot", "spot"],
      ["text/vnd.rn-realtext", "rt"],
      ["text/vnd.sun.j2me.app-descriptor", "jad"],
      ["text/vnd.wap.wml", "wml"],
      ["text/vnd.wap.wmlscript", "wmls"],
      ["text/webviewhtml", "htt"],
      ["text/x-asm", ["asm", "s"]],
      ["text/x-audiosoft-intra", "aip"],
      ["text/x-c", ["c", "cc", "cpp"]],
      ["text/x-component", "htc"],
      ["text/x-fortran", ["for", "f", "f77", "f90"]],
      ["text/x-h", ["h", "hh"]],
      ["text/x-java-source", ["java", "jav"]],
      ["text/x-java-source,java", "java"],
      ["text/x-la-asf", "lsx"],
      ["text/x-m", "m"],
      ["text/x-pascal", "p"],
      ["text/x-script", "hlb"],
      ["text/x-script.csh", "csh"],
      ["text/x-script.elisp", "el"],
      ["text/x-script.guile", "scm"],
      ["text/x-script.ksh", "ksh"],
      ["text/x-script.lisp", "lsp"],
      ["text/x-script.perl", "pl"],
      ["text/x-script.perl-module", "pm"],
      ["text/x-script.phyton", "py"],
      ["text/x-script.rexx", "rexx"],
      ["text/x-script.scheme", "scm"],
      ["text/x-script.sh", "sh"],
      ["text/x-script.tcl", "tcl"],
      ["text/x-script.tcsh", "tcsh"],
      ["text/x-script.zsh", "zsh"],
      ["text/x-server-parsed-html", ["shtml", "ssi"]],
      ["text/x-setext", "etx"],
      ["text/x-sgml", ["sgm", "sgml"]],
      ["text/x-speech", ["spc", "talk"]],
      ["text/x-uil", "uil"],
      ["text/x-uuencode", ["uu", "uue"]],
      ["text/x-vcalendar", "vcs"],
      ["text/x-vcard", "vcf"],
      ["text/xml", "xml"],
      ["video/3gpp", "3gp"],
      ["video/3gpp2", "3g2"],
      ["video/animaflex", "afl"],
      ["video/avi", "avi"],
      ["video/avs-video", "avs"],
      ["video/dl", "dl"],
      ["video/fli", "fli"],
      ["video/gl", "gl"],
      ["video/h261", "h261"],
      ["video/h263", "h263"],
      ["video/h264", "h264"],
      ["video/jpeg", "jpgv"],
      ["video/jpm", "jpm"],
      ["video/mj2", "mj2"],
      ["video/mp4", "mp4"],
      ["video/mpeg", ["mpeg", "mp2", "mpa", "mpe", "mpg", "mpv2", "m1v", "m2v", "mp3"]],
      ["video/msvideo", "avi"],
      ["video/ogg", "ogv"],
      ["video/quicktime", ["mov", "qt", "moov"]],
      ["video/vdo", "vdo"],
      ["video/vivo", ["viv", "vivo"]],
      ["video/vnd.dece.hd", "uvh"],
      ["video/vnd.dece.mobile", "uvm"],
      ["video/vnd.dece.pd", "uvp"],
      ["video/vnd.dece.sd", "uvs"],
      ["video/vnd.dece.video", "uvv"],
      ["video/vnd.fvt", "fvt"],
      ["video/vnd.mpegurl", "mxu"],
      ["video/vnd.ms-playready.media.pyv", "pyv"],
      ["video/vnd.rn-realvideo", "rv"],
      ["video/vnd.uvvu.mp4", "uvu"],
      ["video/vnd.vivo", ["viv", "vivo"]],
      ["video/vosaic", "vos"],
      ["video/webm", "webm"],
      ["video/x-amt-demorun", "xdr"],
      ["video/x-amt-showrun", "xsr"],
      ["video/x-atomic3d-feature", "fmf"],
      ["video/x-dl", "dl"],
      ["video/x-dv", ["dif", "dv"]],
      ["video/x-f4v", "f4v"],
      ["video/x-fli", "fli"],
      ["video/x-flv", "flv"],
      ["video/x-gl", "gl"],
      ["video/x-isvideo", "isu"],
      ["video/x-la-asf", ["lsf", "lsx"]],
      ["video/x-m4v", "m4v"],
      ["video/x-motion-jpeg", "mjpg"],
      ["video/x-mpeg", ["mp3", "mp2"]],
      ["video/x-mpeq2a", "mp2"],
      ["video/x-ms-asf", ["asf", "asr", "asx"]],
      ["video/x-ms-asf-plugin", "asx"],
      ["video/x-ms-wm", "wm"],
      ["video/x-ms-wmv", "wmv"],
      ["video/x-ms-wmx", "wmx"],
      ["video/x-ms-wvx", "wvx"],
      ["video/x-msvideo", "avi"],
      ["video/x-qtc", "qtc"],
      ["video/x-scm", "scm"],
      ["video/x-sgi-movie", ["movie", "mv"]],
      ["windows/metafile", "wmf"],
      ["www/mime", "mime"],
      ["x-conference/x-cooltalk", "ice"],
      ["x-music/x-midi", ["mid", "midi"]],
      ["x-world/x-3dmf", ["3dm", "3dmf", "qd3", "qd3d"]],
      ["x-world/x-svr", "svr"],
      ["x-world/x-vrml", ["flr", "vrml", "wrl", "wrz", "xaf", "xof"]],
      ["x-world/x-vrt", "vrt"],
      ["xgl/drawing", "xgz"],
      ["xgl/movie", "xmz"]
    ]);
    var extensions = new Map([
      ["123", "application/vnd.lotus-1-2-3"],
      ["323", "text/h323"],
      ["*", "application/octet-stream"],
      ["3dm", "x-world/x-3dmf"],
      ["3dmf", "x-world/x-3dmf"],
      ["3dml", "text/vnd.in3d.3dml"],
      ["3g2", "video/3gpp2"],
      ["3gp", "video/3gpp"],
      ["7z", "application/x-7z-compressed"],
      ["a", "application/octet-stream"],
      ["aab", "application/x-authorware-bin"],
      ["aac", "audio/x-aac"],
      ["aam", "application/x-authorware-map"],
      ["aas", "application/x-authorware-seg"],
      ["abc", "text/vnd.abc"],
      ["abw", "application/x-abiword"],
      ["ac", "application/pkix-attr-cert"],
      ["acc", "application/vnd.americandynamics.acc"],
      ["ace", "application/x-ace-compressed"],
      ["acgi", "text/html"],
      ["acu", "application/vnd.acucobol"],
      ["acx", "application/internet-property-stream"],
      ["adp", "audio/adpcm"],
      ["aep", "application/vnd.audiograph"],
      ["afl", "video/animaflex"],
      ["afp", "application/vnd.ibm.modcap"],
      ["ahead", "application/vnd.ahead.space"],
      ["ai", "application/postscript"],
      ["aif", ["audio/aiff", "audio/x-aiff"]],
      ["aifc", ["audio/aiff", "audio/x-aiff"]],
      ["aiff", ["audio/aiff", "audio/x-aiff"]],
      ["aim", "application/x-aim"],
      ["aip", "text/x-audiosoft-intra"],
      ["air", "application/vnd.adobe.air-application-installer-package+zip"],
      ["ait", "application/vnd.dvb.ait"],
      ["ami", "application/vnd.amiga.ami"],
      ["ani", "application/x-navi-animation"],
      ["aos", "application/x-nokia-9000-communicator-add-on-software"],
      ["apk", "application/vnd.android.package-archive"],
      ["application", "application/x-ms-application"],
      ["apr", "application/vnd.lotus-approach"],
      ["aps", "application/mime"],
      ["arc", "application/octet-stream"],
      ["arj", ["application/arj", "application/octet-stream"]],
      ["art", "image/x-jg"],
      ["asf", "video/x-ms-asf"],
      ["asm", "text/x-asm"],
      ["aso", "application/vnd.accpac.simply.aso"],
      ["asp", "text/asp"],
      ["asr", "video/x-ms-asf"],
      ["asx", ["video/x-ms-asf", "application/x-mplayer2", "video/x-ms-asf-plugin"]],
      ["atc", "application/vnd.acucorp"],
      ["atomcat", "application/atomcat+xml"],
      ["atomsvc", "application/atomsvc+xml"],
      ["atx", "application/vnd.antix.game-component"],
      ["au", ["audio/basic", "audio/x-au"]],
      ["avi", ["video/avi", "video/msvideo", "application/x-troff-msvideo", "video/x-msvideo"]],
      ["avs", "video/avs-video"],
      ["aw", "application/applixware"],
      ["axs", "application/olescript"],
      ["azf", "application/vnd.airzip.filesecure.azf"],
      ["azs", "application/vnd.airzip.filesecure.azs"],
      ["azw", "application/vnd.amazon.ebook"],
      ["bas", "text/plain"],
      ["bcpio", "application/x-bcpio"],
      ["bdf", "application/x-font-bdf"],
      ["bdm", "application/vnd.syncml.dm+wbxml"],
      ["bed", "application/vnd.realvnc.bed"],
      ["bh2", "application/vnd.fujitsu.oasysprs"],
      ["bin", ["application/octet-stream", "application/mac-binary", "application/macbinary", "application/x-macbinary", "application/x-binary"]],
      ["bm", "image/bmp"],
      ["bmi", "application/vnd.bmi"],
      ["bmp", ["image/bmp", "image/x-windows-bmp"]],
      ["boo", "application/book"],
      ["book", "application/book"],
      ["box", "application/vnd.previewsystems.box"],
      ["boz", "application/x-bzip2"],
      ["bsh", "application/x-bsh"],
      ["btif", "image/prs.btif"],
      ["bz", "application/x-bzip"],
      ["bz2", "application/x-bzip2"],
      ["c", ["text/plain", "text/x-c"]],
      ["c++", "text/plain"],
      ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
      ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
      ["c4g", "application/vnd.clonk.c4group"],
      ["cab", "application/vnd.ms-cab-compressed"],
      ["car", "application/vnd.curl.car"],
      ["cat", ["application/vnd.ms-pkiseccat", "application/vnd.ms-pki.seccat"]],
      ["cc", ["text/plain", "text/x-c"]],
      ["ccad", "application/clariscad"],
      ["cco", "application/x-cocoa"],
      ["ccxml", "application/ccxml+xml,"],
      ["cdbcmsg", "application/vnd.contact.cmsg"],
      ["cdf", ["application/cdf", "application/x-cdf", "application/x-netcdf"]],
      ["cdkey", "application/vnd.mediastation.cdkey"],
      ["cdmia", "application/cdmi-capability"],
      ["cdmic", "application/cdmi-container"],
      ["cdmid", "application/cdmi-domain"],
      ["cdmio", "application/cdmi-object"],
      ["cdmiq", "application/cdmi-queue"],
      ["cdx", "chemical/x-cdx"],
      ["cdxml", "application/vnd.chemdraw+xml"],
      ["cdy", "application/vnd.cinderella"],
      ["cer", ["application/pkix-cert", "application/x-x509-ca-cert"]],
      ["cgm", "image/cgm"],
      ["cha", "application/x-chat"],
      ["chat", "application/x-chat"],
      ["chm", "application/vnd.ms-htmlhelp"],
      ["chrt", "application/vnd.kde.kchart"],
      ["cif", "chemical/x-cif"],
      ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
      ["cil", "application/vnd.ms-artgalry"],
      ["cla", "application/vnd.claymore"],
      ["class", ["application/octet-stream", "application/java", "application/java-byte-code", "application/java-vm", "application/x-java-class"]],
      ["clkk", "application/vnd.crick.clicker.keyboard"],
      ["clkp", "application/vnd.crick.clicker.palette"],
      ["clkt", "application/vnd.crick.clicker.template"],
      ["clkw", "application/vnd.crick.clicker.wordbank"],
      ["clkx", "application/vnd.crick.clicker"],
      ["clp", "application/x-msclip"],
      ["cmc", "application/vnd.cosmocaller"],
      ["cmdf", "chemical/x-cmdf"],
      ["cml", "chemical/x-cml"],
      ["cmp", "application/vnd.yellowriver-custom-menu"],
      ["cmx", "image/x-cmx"],
      ["cod", ["image/cis-cod", "application/vnd.rim.cod"]],
      ["com", ["application/octet-stream", "text/plain"]],
      ["conf", "text/plain"],
      ["cpio", "application/x-cpio"],
      ["cpp", "text/x-c"],
      ["cpt", ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"]],
      ["crd", "application/x-mscardfile"],
      ["crl", ["application/pkix-crl", "application/pkcs-crl"]],
      ["crt", ["application/pkix-cert", "application/x-x509-user-cert", "application/x-x509-ca-cert"]],
      ["cryptonote", "application/vnd.rig.cryptonote"],
      ["csh", ["text/x-script.csh", "application/x-csh"]],
      ["csml", "chemical/x-csml"],
      ["csp", "application/vnd.commonspace"],
      ["css", ["text/css", "application/x-pointplus"]],
      ["csv", "text/csv"],
      ["cu", "application/cu-seeme"],
      ["curl", "text/vnd.curl"],
      ["cww", "application/prs.cww"],
      ["cxx", "text/plain"],
      ["dae", "model/vnd.collada+xml"],
      ["daf", "application/vnd.mobius.daf"],
      ["davmount", "application/davmount+xml"],
      ["dcr", "application/x-director"],
      ["dcurl", "text/vnd.curl.dcurl"],
      ["dd2", "application/vnd.oma.dd2+xml"],
      ["ddd", "application/vnd.fujixerox.ddd"],
      ["deb", "application/x-debian-package"],
      ["deepv", "application/x-deepv"],
      ["def", "text/plain"],
      ["der", "application/x-x509-ca-cert"],
      ["dfac", "application/vnd.dreamfactory"],
      ["dif", "video/x-dv"],
      ["dir", "application/x-director"],
      ["dis", "application/vnd.mobius.dis"],
      ["djvu", "image/vnd.djvu"],
      ["dl", ["video/dl", "video/x-dl"]],
      ["dll", "application/x-msdownload"],
      ["dms", "application/octet-stream"],
      ["dna", "application/vnd.dna"],
      ["doc", "application/msword"],
      ["docm", "application/vnd.ms-word.document.macroenabled.12"],
      ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      ["dot", "application/msword"],
      ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
      ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
      ["dp", ["application/commonground", "application/vnd.osgi.dp"]],
      ["dpg", "application/vnd.dpgraph"],
      ["dra", "audio/vnd.dra"],
      ["drw", "application/drafting"],
      ["dsc", "text/prs.lines.tag"],
      ["dssc", "application/dssc+der"],
      ["dtb", "application/x-dtbook+xml"],
      ["dtd", "application/xml-dtd"],
      ["dts", "audio/vnd.dts"],
      ["dtshd", "audio/vnd.dts.hd"],
      ["dump", "application/octet-stream"],
      ["dv", "video/x-dv"],
      ["dvi", "application/x-dvi"],
      ["dwf", ["model/vnd.dwf", "drawing/x-dwf"]],
      ["dwg", ["application/acad", "image/vnd.dwg", "image/x-dwg"]],
      ["dxf", ["application/dxf", "image/vnd.dwg", "image/vnd.dxf", "image/x-dwg"]],
      ["dxp", "application/vnd.spotfire.dxp"],
      ["dxr", "application/x-director"],
      ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
      ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
      ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
      ["edm", "application/vnd.novadigm.edm"],
      ["edx", "application/vnd.novadigm.edx"],
      ["efif", "application/vnd.picsel"],
      ["ei6", "application/vnd.pg.osasli"],
      ["el", "text/x-script.elisp"],
      ["elc", ["application/x-elc", "application/x-bytecode.elisp"]],
      ["eml", "message/rfc822"],
      ["emma", "application/emma+xml"],
      ["env", "application/x-envoy"],
      ["eol", "audio/vnd.digital-winds"],
      ["eot", "application/vnd.ms-fontobject"],
      ["eps", "application/postscript"],
      ["epub", "application/epub+zip"],
      ["es", ["application/ecmascript", "application/x-esrehber"]],
      ["es3", "application/vnd.eszigno3+xml"],
      ["esf", "application/vnd.epson.esf"],
      ["etx", "text/x-setext"],
      ["evy", ["application/envoy", "application/x-envoy"]],
      ["exe", ["application/octet-stream", "application/x-msdownload"]],
      ["exi", "application/exi"],
      ["ext", "application/vnd.novadigm.ext"],
      ["ez2", "application/vnd.ezpix-album"],
      ["ez3", "application/vnd.ezpix-package"],
      ["f", ["text/plain", "text/x-fortran"]],
      ["f4v", "video/x-f4v"],
      ["f77", "text/x-fortran"],
      ["f90", ["text/plain", "text/x-fortran"]],
      ["fbs", "image/vnd.fastbidsheet"],
      ["fcs", "application/vnd.isac.fcs"],
      ["fdf", "application/vnd.fdf"],
      ["fe_launch", "application/vnd.denovo.fcselayout-link"],
      ["fg5", "application/vnd.fujitsu.oasysgp"],
      ["fh", "image/x-freehand"],
      ["fif", ["application/fractals", "image/fif"]],
      ["fig", "application/x-xfig"],
      ["fli", ["video/fli", "video/x-fli"]],
      ["flo", ["image/florian", "application/vnd.micrografx.flo"]],
      ["flr", "x-world/x-vrml"],
      ["flv", "video/x-flv"],
      ["flw", "application/vnd.kde.kivio"],
      ["flx", "text/vnd.fmi.flexstor"],
      ["fly", "text/vnd.fly"],
      ["fm", "application/vnd.framemaker"],
      ["fmf", "video/x-atomic3d-feature"],
      ["fnc", "application/vnd.frogans.fnc"],
      ["for", ["text/plain", "text/x-fortran"]],
      ["fpx", ["image/vnd.fpx", "image/vnd.net-fpx"]],
      ["frl", "application/freeloader"],
      ["fsc", "application/vnd.fsc.weblaunch"],
      ["fst", "image/vnd.fst"],
      ["ftc", "application/vnd.fluxtime.clip"],
      ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
      ["funk", "audio/make"],
      ["fvt", "video/vnd.fvt"],
      ["fxp", "application/vnd.adobe.fxp"],
      ["fzs", "application/vnd.fuzzysheet"],
      ["g", "text/plain"],
      ["g2w", "application/vnd.geoplan"],
      ["g3", "image/g3fax"],
      ["g3w", "application/vnd.geospace"],
      ["gac", "application/vnd.groove-account"],
      ["gdl", "model/vnd.gdl"],
      ["geo", "application/vnd.dynageo"],
      ["gex", "application/vnd.geometry-explorer"],
      ["ggb", "application/vnd.geogebra.file"],
      ["ggt", "application/vnd.geogebra.tool"],
      ["ghf", "application/vnd.groove-help"],
      ["gif", "image/gif"],
      ["gim", "application/vnd.groove-identity-message"],
      ["gl", ["video/gl", "video/x-gl"]],
      ["gmx", "application/vnd.gmx"],
      ["gnumeric", "application/x-gnumeric"],
      ["gph", "application/vnd.flographit"],
      ["gqf", "application/vnd.grafeq"],
      ["gram", "application/srgs"],
      ["grv", "application/vnd.groove-injector"],
      ["grxml", "application/srgs+xml"],
      ["gsd", "audio/x-gsm"],
      ["gsf", "application/x-font-ghostscript"],
      ["gsm", "audio/x-gsm"],
      ["gsp", "application/x-gsp"],
      ["gss", "application/x-gss"],
      ["gtar", "application/x-gtar"],
      ["gtm", "application/vnd.groove-tool-message"],
      ["gtw", "model/vnd.gtw"],
      ["gv", "text/vnd.graphviz"],
      ["gxt", "application/vnd.geonext"],
      ["gz", ["application/x-gzip", "application/x-compressed"]],
      ["gzip", ["multipart/x-gzip", "application/x-gzip"]],
      ["h", ["text/plain", "text/x-h"]],
      ["h261", "video/h261"],
      ["h263", "video/h263"],
      ["h264", "video/h264"],
      ["hal", "application/vnd.hal+xml"],
      ["hbci", "application/vnd.hbci"],
      ["hdf", "application/x-hdf"],
      ["help", "application/x-helpfile"],
      ["hgl", "application/vnd.hp-hpgl"],
      ["hh", ["text/plain", "text/x-h"]],
      ["hlb", "text/x-script"],
      ["hlp", ["application/winhlp", "application/hlp", "application/x-helpfile", "application/x-winhelp"]],
      ["hpg", "application/vnd.hp-hpgl"],
      ["hpgl", "application/vnd.hp-hpgl"],
      ["hpid", "application/vnd.hp-hpid"],
      ["hps", "application/vnd.hp-hps"],
      [
        "hqx",
        [
          "application/mac-binhex40",
          "application/binhex",
          "application/binhex4",
          "application/mac-binhex",
          "application/x-binhex40",
          "application/x-mac-binhex40"
        ]
      ],
      ["hta", "application/hta"],
      ["htc", "text/x-component"],
      ["htke", "application/vnd.kenameaapp"],
      ["htm", "text/html"],
      ["html", "text/html"],
      ["htmls", "text/html"],
      ["htt", "text/webviewhtml"],
      ["htx", "text/html"],
      ["hvd", "application/vnd.yamaha.hv-dic"],
      ["hvp", "application/vnd.yamaha.hv-voice"],
      ["hvs", "application/vnd.yamaha.hv-script"],
      ["i2g", "application/vnd.intergeo"],
      ["icc", "application/vnd.iccprofile"],
      ["ice", "x-conference/x-cooltalk"],
      ["ico", "image/x-icon"],
      ["ics", "text/calendar"],
      ["idc", "text/plain"],
      ["ief", "image/ief"],
      ["iefs", "image/ief"],
      ["ifm", "application/vnd.shana.informed.formdata"],
      ["iges", ["application/iges", "model/iges"]],
      ["igl", "application/vnd.igloader"],
      ["igm", "application/vnd.insors.igm"],
      ["igs", ["application/iges", "model/iges"]],
      ["igx", "application/vnd.micrografx.igx"],
      ["iif", "application/vnd.shana.informed.interchange"],
      ["iii", "application/x-iphone"],
      ["ima", "application/x-ima"],
      ["imap", "application/x-httpd-imap"],
      ["imp", "application/vnd.accpac.simply.imp"],
      ["ims", "application/vnd.ms-ims"],
      ["inf", "application/inf"],
      ["ins", ["application/x-internet-signup", "application/x-internett-signup"]],
      ["ip", "application/x-ip2"],
      ["ipfix", "application/ipfix"],
      ["ipk", "application/vnd.shana.informed.package"],
      ["irm", "application/vnd.ibm.rights-management"],
      ["irp", "application/vnd.irepository.package+xml"],
      ["isp", "application/x-internet-signup"],
      ["isu", "video/x-isvideo"],
      ["it", "audio/it"],
      ["itp", "application/vnd.shana.informed.formtemplate"],
      ["iv", "application/x-inventor"],
      ["ivp", "application/vnd.immervision-ivp"],
      ["ivr", "i-world/i-vrml"],
      ["ivu", "application/vnd.immervision-ivu"],
      ["ivy", "application/x-livescreen"],
      ["jad", "text/vnd.sun.j2me.app-descriptor"],
      ["jam", ["application/vnd.jam", "audio/x-jam"]],
      ["jar", "application/java-archive"],
      ["jav", ["text/plain", "text/x-java-source"]],
      ["java", ["text/plain", "text/x-java-source,java", "text/x-java-source"]],
      ["jcm", "application/x-java-commerce"],
      ["jfif", ["image/pipeg", "image/jpeg", "image/pjpeg"]],
      ["jfif-tbnl", "image/jpeg"],
      ["jisp", "application/vnd.jisp"],
      ["jlt", "application/vnd.hp-jlyt"],
      ["jnlp", "application/x-java-jnlp-file"],
      ["joda", "application/vnd.joost.joda-archive"],
      ["jpe", ["image/jpeg", "image/pjpeg"]],
      ["jpeg", ["image/jpeg", "image/pjpeg"]],
      ["jpg", ["image/jpeg", "image/pjpeg"]],
      ["jpgv", "video/jpeg"],
      ["jpm", "video/jpm"],
      ["jps", "image/x-jps"],
      ["js", ["application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript", "application/x-javascript"]],
      ["json", "application/json"],
      ["jut", "image/jutvision"],
      ["kar", ["audio/midi", "music/x-karaoke"]],
      ["karbon", "application/vnd.kde.karbon"],
      ["kfo", "application/vnd.kde.kformula"],
      ["kia", "application/vnd.kidspiration"],
      ["kml", "application/vnd.google-earth.kml+xml"],
      ["kmz", "application/vnd.google-earth.kmz"],
      ["kne", "application/vnd.kinar"],
      ["kon", "application/vnd.kde.kontour"],
      ["kpr", "application/vnd.kde.kpresenter"],
      ["ksh", ["application/x-ksh", "text/x-script.ksh"]],
      ["ksp", "application/vnd.kde.kspread"],
      ["ktx", "image/ktx"],
      ["ktz", "application/vnd.kahootz"],
      ["kwd", "application/vnd.kde.kword"],
      ["la", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["lam", "audio/x-liveaudio"],
      ["lasxml", "application/vnd.las.las+xml"],
      ["latex", "application/x-latex"],
      ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
      ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
      ["les", "application/vnd.hhe.lesson-player"],
      ["lha", ["application/octet-stream", "application/lha", "application/x-lha"]],
      ["lhx", "application/octet-stream"],
      ["link66", "application/vnd.route66.link66+xml"],
      ["list", "text/plain"],
      ["lma", ["audio/nspaudio", "audio/x-nspaudio"]],
      ["log", "text/plain"],
      ["lrm", "application/vnd.ms-lrm"],
      ["lsf", "video/x-la-asf"],
      ["lsp", ["application/x-lisp", "text/x-script.lisp"]],
      ["lst", "text/plain"],
      ["lsx", ["video/x-la-asf", "text/x-la-asf"]],
      ["ltf", "application/vnd.frogans.ltf"],
      ["ltx", "application/x-latex"],
      ["lvp", "audio/vnd.lucent.voice"],
      ["lwp", "application/vnd.lotus-wordpro"],
      ["lzh", ["application/octet-stream", "application/x-lzh"]],
      ["lzx", ["application/lzx", "application/octet-stream", "application/x-lzx"]],
      ["m", ["text/plain", "text/x-m"]],
      ["m13", "application/x-msmediaview"],
      ["m14", "application/x-msmediaview"],
      ["m1v", "video/mpeg"],
      ["m21", "application/mp21"],
      ["m2a", "audio/mpeg"],
      ["m2v", "video/mpeg"],
      ["m3u", ["audio/x-mpegurl", "audio/x-mpequrl"]],
      ["m3u8", "application/vnd.apple.mpegurl"],
      ["m4v", "video/x-m4v"],
      ["ma", "application/mathematica"],
      ["mads", "application/mads+xml"],
      ["mag", "application/vnd.ecowin.chart"],
      ["man", "application/x-troff-man"],
      ["map", "application/x-navimap"],
      ["mar", "text/plain"],
      ["mathml", "application/mathml+xml"],
      ["mbd", "application/mbedlet"],
      ["mbk", "application/vnd.mobius.mbk"],
      ["mbox", "application/mbox"],
      ["mc$", "application/x-magic-cap-package-1.0"],
      ["mc1", "application/vnd.medcalcdata"],
      ["mcd", ["application/mcad", "application/vnd.mcd", "application/x-mathcad"]],
      ["mcf", ["image/vasa", "text/mcf"]],
      ["mcp", "application/netmc"],
      ["mcurl", "text/vnd.curl.mcurl"],
      ["mdb", "application/x-msaccess"],
      ["mdi", "image/vnd.ms-modi"],
      ["me", "application/x-troff-me"],
      ["meta4", "application/metalink4+xml"],
      ["mets", "application/mets+xml"],
      ["mfm", "application/vnd.mfmp"],
      ["mgp", "application/vnd.osgeo.mapguide.package"],
      ["mgz", "application/vnd.proteus.magazine"],
      ["mht", "message/rfc822"],
      ["mhtml", "message/rfc822"],
      ["mid", ["audio/mid", "audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["midi", ["audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
      ["mif", ["application/vnd.mif", "application/x-mif", "application/x-frame"]],
      ["mime", ["message/rfc822", "www/mime"]],
      ["mj2", "video/mj2"],
      ["mjf", "audio/x-vnd.audioexplosion.mjuicemediafile"],
      ["mjpg", "video/x-motion-jpeg"],
      ["mlp", "application/vnd.dolby.mlp"],
      ["mm", ["application/base64", "application/x-meme"]],
      ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
      ["mme", "application/base64"],
      ["mmf", "application/vnd.smaf"],
      ["mmr", "image/vnd.fujixerox.edmics-mmr"],
      ["mny", "application/x-msmoney"],
      ["mod", ["audio/mod", "audio/x-mod"]],
      ["mods", "application/mods+xml"],
      ["moov", "video/quicktime"],
      ["mov", "video/quicktime"],
      ["movie", "video/x-sgi-movie"],
      ["mp2", ["video/mpeg", "audio/mpeg", "video/x-mpeg", "audio/x-mpeg", "video/x-mpeq2a"]],
      ["mp3", ["audio/mpeg", "audio/mpeg3", "video/mpeg", "audio/x-mpeg-3", "video/x-mpeg"]],
      ["mp4", ["video/mp4", "application/mp4"]],
      ["mp4a", "audio/mp4"],
      ["mpa", ["video/mpeg", "audio/mpeg"]],
      ["mpc", ["application/vnd.mophun.certificate", "application/x-project"]],
      ["mpe", "video/mpeg"],
      ["mpeg", "video/mpeg"],
      ["mpg", ["video/mpeg", "audio/mpeg"]],
      ["mpga", "audio/mpeg"],
      ["mpkg", "application/vnd.apple.installer+xml"],
      ["mpm", "application/vnd.blueice.multipass"],
      ["mpn", "application/vnd.mophun.application"],
      ["mpp", "application/vnd.ms-project"],
      ["mpt", "application/x-project"],
      ["mpv", "application/x-project"],
      ["mpv2", "video/mpeg"],
      ["mpx", "application/x-project"],
      ["mpy", "application/vnd.ibm.minipay"],
      ["mqy", "application/vnd.mobius.mqy"],
      ["mrc", "application/marc"],
      ["mrcx", "application/marcxml+xml"],
      ["ms", "application/x-troff-ms"],
      ["mscml", "application/mediaservercontrol+xml"],
      ["mseq", "application/vnd.mseq"],
      ["msf", "application/vnd.epson.msf"],
      ["msg", "application/vnd.ms-outlook"],
      ["msh", "model/mesh"],
      ["msl", "application/vnd.mobius.msl"],
      ["msty", "application/vnd.muvee.style"],
      ["mts", "model/vnd.mts"],
      ["mus", "application/vnd.musician"],
      ["musicxml", "application/vnd.recordare.musicxml+xml"],
      ["mv", "video/x-sgi-movie"],
      ["mvb", "application/x-msmediaview"],
      ["mwf", "application/vnd.mfer"],
      ["mxf", "application/mxf"],
      ["mxl", "application/vnd.recordare.musicxml"],
      ["mxml", "application/xv+xml"],
      ["mxs", "application/vnd.triscape.mxs"],
      ["mxu", "video/vnd.mpegurl"],
      ["my", "audio/make"],
      ["mzz", "application/x-vnd.audioexplosion.mzz"],
      ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
      ["n3", "text/n3"],
      ["nap", "image/naplps"],
      ["naplps", "image/naplps"],
      ["nbp", "application/vnd.wolfram.player"],
      ["nc", "application/x-netcdf"],
      ["ncm", "application/vnd.nokia.configuration-message"],
      ["ncx", "application/x-dtbncx+xml"],
      ["ngdat", "application/vnd.nokia.n-gage.data"],
      ["nif", "image/x-niff"],
      ["niff", "image/x-niff"],
      ["nix", "application/x-mix-transfer"],
      ["nlu", "application/vnd.neurolanguage.nlu"],
      ["nml", "application/vnd.enliven"],
      ["nnd", "application/vnd.noblenet-directory"],
      ["nns", "application/vnd.noblenet-sealer"],
      ["nnw", "application/vnd.noblenet-web"],
      ["npx", "image/vnd.net-fpx"],
      ["nsc", "application/x-conference"],
      ["nsf", "application/vnd.lotus-notes"],
      ["nvd", "application/x-navidoc"],
      ["nws", "message/rfc822"],
      ["o", "application/octet-stream"],
      ["oa2", "application/vnd.fujitsu.oasys2"],
      ["oa3", "application/vnd.fujitsu.oasys3"],
      ["oas", "application/vnd.fujitsu.oasys"],
      ["obd", "application/x-msbinder"],
      ["oda", "application/oda"],
      ["odb", "application/vnd.oasis.opendocument.database"],
      ["odc", "application/vnd.oasis.opendocument.chart"],
      ["odf", "application/vnd.oasis.opendocument.formula"],
      ["odft", "application/vnd.oasis.opendocument.formula-template"],
      ["odg", "application/vnd.oasis.opendocument.graphics"],
      ["odi", "application/vnd.oasis.opendocument.image"],
      ["odm", "application/vnd.oasis.opendocument.text-master"],
      ["odp", "application/vnd.oasis.opendocument.presentation"],
      ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
      ["odt", "application/vnd.oasis.opendocument.text"],
      ["oga", "audio/ogg"],
      ["ogv", "video/ogg"],
      ["ogx", "application/ogg"],
      ["omc", "application/x-omc"],
      ["omcd", "application/x-omcdatamaker"],
      ["omcr", "application/x-omcregerator"],
      ["onetoc", "application/onenote"],
      ["opf", "application/oebps-package+xml"],
      ["org", "application/vnd.lotus-organizer"],
      ["osf", "application/vnd.yamaha.openscoreformat"],
      ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
      ["otc", "application/vnd.oasis.opendocument.chart-template"],
      ["otf", "application/x-font-otf"],
      ["otg", "application/vnd.oasis.opendocument.graphics-template"],
      ["oth", "application/vnd.oasis.opendocument.text-web"],
      ["oti", "application/vnd.oasis.opendocument.image-template"],
      ["otp", "application/vnd.oasis.opendocument.presentation-template"],
      ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
      ["ott", "application/vnd.oasis.opendocument.text-template"],
      ["oxt", "application/vnd.openofficeorg.extension"],
      ["p", "text/x-pascal"],
      ["p10", ["application/pkcs10", "application/x-pkcs10"]],
      ["p12", ["application/pkcs-12", "application/x-pkcs12"]],
      ["p7a", "application/x-pkcs7-signature"],
      ["p7b", "application/x-pkcs7-certificates"],
      ["p7c", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7m", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
      ["p7r", "application/x-pkcs7-certreqresp"],
      ["p7s", ["application/pkcs7-signature", "application/x-pkcs7-signature"]],
      ["p8", "application/pkcs8"],
      ["par", "text/plain-bas"],
      ["part", "application/pro_eng"],
      ["pas", "text/pascal"],
      ["paw", "application/vnd.pawaafile"],
      ["pbd", "application/vnd.powerbuilder6"],
      ["pbm", "image/x-portable-bitmap"],
      ["pcf", "application/x-font-pcf"],
      ["pcl", ["application/vnd.hp-pcl", "application/x-pcl"]],
      ["pclxl", "application/vnd.hp-pclxl"],
      ["pct", "image/x-pict"],
      ["pcurl", "application/vnd.curl.pcurl"],
      ["pcx", "image/x-pcx"],
      ["pdb", ["application/vnd.palm", "chemical/x-pdb"]],
      ["pdf", "application/pdf"],
      ["pfa", "application/x-font-type1"],
      ["pfr", "application/font-tdpfr"],
      ["pfunk", ["audio/make", "audio/make.my.funk"]],
      ["pfx", "application/x-pkcs12"],
      ["pgm", ["image/x-portable-graymap", "image/x-portable-greymap"]],
      ["pgn", "application/x-chess-pgn"],
      ["pgp", "application/pgp-signature"],
      ["pic", ["image/pict", "image/x-pict"]],
      ["pict", "image/pict"],
      ["pkg", "application/x-newton-compatible-pkg"],
      ["pki", "application/pkixcmp"],
      ["pkipath", "application/pkix-pkipath"],
      ["pko", ["application/ynd.ms-pkipko", "application/vnd.ms-pki.pko"]],
      ["pl", ["text/plain", "text/x-script.perl"]],
      ["plb", "application/vnd.3gpp.pic-bw-large"],
      ["plc", "application/vnd.mobius.plc"],
      ["plf", "application/vnd.pocketlearn"],
      ["pls", "application/pls+xml"],
      ["plx", "application/x-pixclscript"],
      ["pm", ["text/x-script.perl-module", "image/x-xpixmap"]],
      ["pm4", "application/x-pagemaker"],
      ["pm5", "application/x-pagemaker"],
      ["pma", "application/x-perfmon"],
      ["pmc", "application/x-perfmon"],
      ["pml", ["application/vnd.ctc-posml", "application/x-perfmon"]],
      ["pmr", "application/x-perfmon"],
      ["pmw", "application/x-perfmon"],
      ["png", "image/png"],
      ["pnm", ["application/x-portable-anymap", "image/x-portable-anymap"]],
      ["portpkg", "application/vnd.macports.portpkg"],
      ["pot", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
      ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
      ["pov", "model/x-pov"],
      ["ppa", "application/vnd.ms-powerpoint"],
      ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
      ["ppd", "application/vnd.cups-ppd"],
      ["ppm", "image/x-portable-pixmap"],
      ["pps", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
      ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
      ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
      ["ppt", ["application/vnd.ms-powerpoint", "application/mspowerpoint", "application/powerpoint", "application/x-mspowerpoint"]],
      ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
      ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
      ["ppz", "application/mspowerpoint"],
      ["prc", "application/x-mobipocket-ebook"],
      ["pre", ["application/vnd.lotus-freelance", "application/x-freelance"]],
      ["prf", "application/pics-rules"],
      ["prt", "application/pro_eng"],
      ["ps", "application/postscript"],
      ["psb", "application/vnd.3gpp.pic-bw-small"],
      ["psd", ["application/octet-stream", "image/vnd.adobe.photoshop"]],
      ["psf", "application/x-font-linux-psf"],
      ["pskcxml", "application/pskc+xml"],
      ["ptid", "application/vnd.pvi.ptid1"],
      ["pub", "application/x-mspublisher"],
      ["pvb", "application/vnd.3gpp.pic-bw-var"],
      ["pvu", "paleovu/x-pv"],
      ["pwn", "application/vnd.3m.post-it-notes"],
      ["pwz", "application/vnd.ms-powerpoint"],
      ["py", "text/x-script.phyton"],
      ["pya", "audio/vnd.ms-playready.media.pya"],
      ["pyc", "applicaiton/x-bytecode.python"],
      ["pyv", "video/vnd.ms-playready.media.pyv"],
      ["qam", "application/vnd.epson.quickanime"],
      ["qbo", "application/vnd.intu.qbo"],
      ["qcp", "audio/vnd.qcelp"],
      ["qd3", "x-world/x-3dmf"],
      ["qd3d", "x-world/x-3dmf"],
      ["qfx", "application/vnd.intu.qfx"],
      ["qif", "image/x-quicktime"],
      ["qps", "application/vnd.publishare-delta-tree"],
      ["qt", "video/quicktime"],
      ["qtc", "video/x-qtc"],
      ["qti", "image/x-quicktime"],
      ["qtif", "image/x-quicktime"],
      ["qxd", "application/vnd.quark.quarkxpress"],
      ["ra", ["audio/x-realaudio", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"]],
      ["ram", "audio/x-pn-realaudio"],
      ["rar", "application/x-rar-compressed"],
      ["ras", ["image/cmu-raster", "application/x-cmu-raster", "image/x-cmu-raster"]],
      ["rast", "image/cmu-raster"],
      ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
      ["rdf", "application/rdf+xml"],
      ["rdz", "application/vnd.data-vision.rdz"],
      ["rep", "application/vnd.businessobjects"],
      ["res", "application/x-dtbresource+xml"],
      ["rexx", "text/x-script.rexx"],
      ["rf", "image/vnd.rn-realflash"],
      ["rgb", "image/x-rgb"],
      ["rif", "application/reginfo+xml"],
      ["rip", "audio/vnd.rip"],
      ["rl", "application/resource-lists+xml"],
      ["rlc", "image/vnd.fujixerox.edmics-rlc"],
      ["rld", "application/resource-lists-diff+xml"],
      ["rm", ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"]],
      ["rmi", "audio/mid"],
      ["rmm", "audio/x-pn-realaudio"],
      ["rmp", ["audio/x-pn-realaudio-plugin", "audio/x-pn-realaudio"]],
      ["rms", "application/vnd.jcp.javame.midlet-rms"],
      ["rnc", "application/relax-ng-compact-syntax"],
      ["rng", ["application/ringing-tones", "application/vnd.nokia.ringing-tone"]],
      ["rnx", "application/vnd.rn-realplayer"],
      ["roff", "application/x-troff"],
      ["rp", "image/vnd.rn-realpix"],
      ["rp9", "application/vnd.cloanto.rp9"],
      ["rpm", "audio/x-pn-realaudio-plugin"],
      ["rpss", "application/vnd.nokia.radio-presets"],
      ["rpst", "application/vnd.nokia.radio-preset"],
      ["rq", "application/sparql-query"],
      ["rs", "application/rls-services+xml"],
      ["rsd", "application/rsd+xml"],
      ["rt", ["text/richtext", "text/vnd.rn-realtext"]],
      ["rtf", ["application/rtf", "text/richtext", "application/x-rtf"]],
      ["rtx", ["text/richtext", "application/rtf"]],
      ["rv", "video/vnd.rn-realvideo"],
      ["s", "text/x-asm"],
      ["s3m", "audio/s3m"],
      ["saf", "application/vnd.yamaha.smaf-audio"],
      ["saveme", "application/octet-stream"],
      ["sbk", "application/x-tbook"],
      ["sbml", "application/sbml+xml"],
      ["sc", "application/vnd.ibm.secure-container"],
      ["scd", "application/x-msschedule"],
      ["scm", ["application/vnd.lotus-screencam", "video/x-scm", "text/x-script.guile", "application/x-lotusscreencam", "text/x-script.scheme"]],
      ["scq", "application/scvp-cv-request"],
      ["scs", "application/scvp-cv-response"],
      ["sct", "text/scriptlet"],
      ["scurl", "text/vnd.curl.scurl"],
      ["sda", "application/vnd.stardivision.draw"],
      ["sdc", "application/vnd.stardivision.calc"],
      ["sdd", "application/vnd.stardivision.impress"],
      ["sdkm", "application/vnd.solent.sdkm+xml"],
      ["sdml", "text/plain"],
      ["sdp", ["application/sdp", "application/x-sdp"]],
      ["sdr", "application/sounder"],
      ["sdw", "application/vnd.stardivision.writer"],
      ["sea", ["application/sea", "application/x-sea"]],
      ["see", "application/vnd.seemail"],
      ["seed", "application/vnd.fdsn.seed"],
      ["sema", "application/vnd.sema"],
      ["semd", "application/vnd.semd"],
      ["semf", "application/vnd.semf"],
      ["ser", "application/java-serialized-object"],
      ["set", "application/set"],
      ["setpay", "application/set-payment-initiation"],
      ["setreg", "application/set-registration-initiation"],
      ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
      ["sfs", "application/vnd.spotfire.sfs"],
      ["sgl", "application/vnd.stardivision.writer-global"],
      ["sgm", ["text/sgml", "text/x-sgml"]],
      ["sgml", ["text/sgml", "text/x-sgml"]],
      ["sh", ["application/x-shar", "application/x-bsh", "application/x-sh", "text/x-script.sh"]],
      ["shar", ["application/x-bsh", "application/x-shar"]],
      ["shf", "application/shf+xml"],
      ["shtml", ["text/html", "text/x-server-parsed-html"]],
      ["sid", "audio/x-psid"],
      ["sis", "application/vnd.symbian.install"],
      ["sit", ["application/x-stuffit", "application/x-sit"]],
      ["sitx", "application/x-stuffitx"],
      ["skd", "application/x-koan"],
      ["skm", "application/x-koan"],
      ["skp", ["application/vnd.koan", "application/x-koan"]],
      ["skt", "application/x-koan"],
      ["sl", "application/x-seelogo"],
      ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
      ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
      ["slt", "application/vnd.epson.salt"],
      ["sm", "application/vnd.stepmania.stepchart"],
      ["smf", "application/vnd.stardivision.math"],
      ["smi", ["application/smil", "application/smil+xml"]],
      ["smil", "application/smil"],
      ["snd", ["audio/basic", "audio/x-adpcm"]],
      ["snf", "application/x-font-snf"],
      ["sol", "application/solids"],
      ["spc", ["text/x-speech", "application/x-pkcs7-certificates"]],
      ["spf", "application/vnd.yamaha.smaf-phrase"],
      ["spl", ["application/futuresplash", "application/x-futuresplash"]],
      ["spot", "text/vnd.in3d.spot"],
      ["spp", "application/scvp-vp-response"],
      ["spq", "application/scvp-vp-request"],
      ["spr", "application/x-sprite"],
      ["sprite", "application/x-sprite"],
      ["src", "application/x-wais-source"],
      ["sru", "application/sru+xml"],
      ["srx", "application/sparql-results+xml"],
      ["sse", "application/vnd.kodak-descriptor"],
      ["ssf", "application/vnd.epson.ssf"],
      ["ssi", "text/x-server-parsed-html"],
      ["ssm", "application/streamingmedia"],
      ["ssml", "application/ssml+xml"],
      ["sst", ["application/vnd.ms-pkicertstore", "application/vnd.ms-pki.certstore"]],
      ["st", "application/vnd.sailingtracker.track"],
      ["stc", "application/vnd.sun.xml.calc.template"],
      ["std", "application/vnd.sun.xml.draw.template"],
      ["step", "application/step"],
      ["stf", "application/vnd.wt.stf"],
      ["sti", "application/vnd.sun.xml.impress.template"],
      ["stk", "application/hyperstudio"],
      ["stl", ["application/vnd.ms-pkistl", "application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"]],
      ["stm", "text/html"],
      ["stp", "application/step"],
      ["str", "application/vnd.pg.format"],
      ["stw", "application/vnd.sun.xml.writer.template"],
      ["sub", "image/vnd.dvb.subtitle"],
      ["sus", "application/vnd.sus-calendar"],
      ["sv4cpio", "application/x-sv4cpio"],
      ["sv4crc", "application/x-sv4crc"],
      ["svc", "application/vnd.dvb.service"],
      ["svd", "application/vnd.svd"],
      ["svf", ["image/vnd.dwg", "image/x-dwg"]],
      ["svg", "image/svg+xml"],
      ["svr", ["x-world/x-svr", "application/x-world"]],
      ["swf", "application/x-shockwave-flash"],
      ["swi", "application/vnd.aristanetworks.swi"],
      ["sxc", "application/vnd.sun.xml.calc"],
      ["sxd", "application/vnd.sun.xml.draw"],
      ["sxg", "application/vnd.sun.xml.writer.global"],
      ["sxi", "application/vnd.sun.xml.impress"],
      ["sxm", "application/vnd.sun.xml.math"],
      ["sxw", "application/vnd.sun.xml.writer"],
      ["t", ["text/troff", "application/x-troff"]],
      ["talk", "text/x-speech"],
      ["tao", "application/vnd.tao.intent-module-archive"],
      ["tar", "application/x-tar"],
      ["tbk", ["application/toolbook", "application/x-tbook"]],
      ["tcap", "application/vnd.3gpp2.tcap"],
      ["tcl", ["text/x-script.tcl", "application/x-tcl"]],
      ["tcsh", "text/x-script.tcsh"],
      ["teacher", "application/vnd.smart.teacher"],
      ["tei", "application/tei+xml"],
      ["tex", "application/x-tex"],
      ["texi", "application/x-texinfo"],
      ["texinfo", "application/x-texinfo"],
      ["text", ["application/plain", "text/plain"]],
      ["tfi", "application/thraud+xml"],
      ["tfm", "application/x-tex-tfm"],
      ["tgz", ["application/gnutar", "application/x-compressed"]],
      ["thmx", "application/vnd.ms-officetheme"],
      ["tif", ["image/tiff", "image/x-tiff"]],
      ["tiff", ["image/tiff", "image/x-tiff"]],
      ["tmo", "application/vnd.tmobile-livetv"],
      ["torrent", "application/x-bittorrent"],
      ["tpl", "application/vnd.groove-tool-template"],
      ["tpt", "application/vnd.trid.tpt"],
      ["tr", "application/x-troff"],
      ["tra", "application/vnd.trueapp"],
      ["trm", "application/x-msterminal"],
      ["tsd", "application/timestamped-data"],
      ["tsi", "audio/tsp-audio"],
      ["tsp", ["application/dsptype", "audio/tsplayer"]],
      ["tsv", "text/tab-separated-values"],
      ["ttf", "application/x-font-ttf"],
      ["ttl", "text/turtle"],
      ["turbot", "image/florian"],
      ["twd", "application/vnd.simtech-mindmapper"],
      ["txd", "application/vnd.genomatix.tuxedo"],
      ["txf", "application/vnd.mobius.txf"],
      ["txt", "text/plain"],
      ["ufd", "application/vnd.ufdl"],
      ["uil", "text/x-uil"],
      ["uls", "text/iuls"],
      ["umj", "application/vnd.umajin"],
      ["uni", "text/uri-list"],
      ["unis", "text/uri-list"],
      ["unityweb", "application/vnd.unity"],
      ["unv", "application/i-deas"],
      ["uoml", "application/vnd.uoml+xml"],
      ["uri", "text/uri-list"],
      ["uris", "text/uri-list"],
      ["ustar", ["application/x-ustar", "multipart/x-ustar"]],
      ["utz", "application/vnd.uiq.theme"],
      ["uu", ["application/octet-stream", "text/x-uuencode"]],
      ["uue", "text/x-uuencode"],
      ["uva", "audio/vnd.dece.audio"],
      ["uvh", "video/vnd.dece.hd"],
      ["uvi", "image/vnd.dece.graphic"],
      ["uvm", "video/vnd.dece.mobile"],
      ["uvp", "video/vnd.dece.pd"],
      ["uvs", "video/vnd.dece.sd"],
      ["uvu", "video/vnd.uvvu.mp4"],
      ["uvv", "video/vnd.dece.video"],
      ["vcd", "application/x-cdlink"],
      ["vcf", "text/x-vcard"],
      ["vcg", "application/vnd.groove-vcard"],
      ["vcs", "text/x-vcalendar"],
      ["vcx", "application/vnd.vcx"],
      ["vda", "application/vda"],
      ["vdo", "video/vdo"],
      ["vew", "application/groupwise"],
      ["vis", "application/vnd.visionary"],
      ["viv", ["video/vivo", "video/vnd.vivo"]],
      ["vivo", ["video/vivo", "video/vnd.vivo"]],
      ["vmd", "application/vocaltec-media-desc"],
      ["vmf", "application/vocaltec-media-file"],
      ["voc", ["audio/voc", "audio/x-voc"]],
      ["vos", "video/vosaic"],
      ["vox", "audio/voxware"],
      ["vqe", "audio/x-twinvq-plugin"],
      ["vqf", "audio/x-twinvq"],
      ["vql", "audio/x-twinvq-plugin"],
      ["vrml", ["model/vrml", "x-world/x-vrml", "application/x-vrml"]],
      ["vrt", "x-world/x-vrt"],
      ["vsd", ["application/vnd.visio", "application/x-visio"]],
      ["vsf", "application/vnd.vsf"],
      ["vst", "application/x-visio"],
      ["vsw", "application/x-visio"],
      ["vtu", "model/vnd.vtu"],
      ["vxml", "application/voicexml+xml"],
      ["w60", "application/wordperfect6.0"],
      ["w61", "application/wordperfect6.1"],
      ["w6w", "application/msword"],
      ["wad", "application/x-doom"],
      ["wav", ["audio/wav", "audio/x-wav"]],
      ["wax", "audio/x-ms-wax"],
      ["wb1", "application/x-qpro"],
      ["wbmp", "image/vnd.wap.wbmp"],
      ["wbs", "application/vnd.criticaltools.wbs+xml"],
      ["wbxml", "application/vnd.wap.wbxml"],
      ["wcm", "application/vnd.ms-works"],
      ["wdb", "application/vnd.ms-works"],
      ["web", "application/vnd.xara"],
      ["weba", "audio/webm"],
      ["webm", "video/webm"],
      ["webp", "image/webp"],
      ["wg", "application/vnd.pmi.widget"],
      ["wgt", "application/widget"],
      ["wiz", "application/msword"],
      ["wk1", "application/x-123"],
      ["wks", "application/vnd.ms-works"],
      ["wm", "video/x-ms-wm"],
      ["wma", "audio/x-ms-wma"],
      ["wmd", "application/x-ms-wmd"],
      ["wmf", ["windows/metafile", "application/x-msmetafile"]],
      ["wml", "text/vnd.wap.wml"],
      ["wmlc", "application/vnd.wap.wmlc"],
      ["wmls", "text/vnd.wap.wmlscript"],
      ["wmlsc", "application/vnd.wap.wmlscriptc"],
      ["wmv", "video/x-ms-wmv"],
      ["wmx", "video/x-ms-wmx"],
      ["wmz", "application/x-ms-wmz"],
      ["woff", "application/x-font-woff"],
      ["word", "application/msword"],
      ["wp", "application/wordperfect"],
      ["wp5", ["application/wordperfect", "application/wordperfect6.0"]],
      ["wp6", "application/wordperfect"],
      ["wpd", ["application/wordperfect", "application/vnd.wordperfect", "application/x-wpwin"]],
      ["wpl", "application/vnd.ms-wpl"],
      ["wps", "application/vnd.ms-works"],
      ["wq1", "application/x-lotus"],
      ["wqd", "application/vnd.wqd"],
      ["wri", ["application/mswrite", "application/x-wri", "application/x-mswrite"]],
      ["wrl", ["model/vrml", "x-world/x-vrml", "application/x-world"]],
      ["wrz", ["model/vrml", "x-world/x-vrml"]],
      ["wsc", "text/scriplet"],
      ["wsdl", "application/wsdl+xml"],
      ["wspolicy", "application/wspolicy+xml"],
      ["wsrc", "application/x-wais-source"],
      ["wtb", "application/vnd.webturbo"],
      ["wtk", "application/x-wintalk"],
      ["wvx", "video/x-ms-wvx"],
      ["x-png", "image/png"],
      ["x3d", "application/vnd.hzn-3d-crossword"],
      ["xaf", "x-world/x-vrml"],
      ["xap", "application/x-silverlight-app"],
      ["xar", "application/vnd.xara"],
      ["xbap", "application/x-ms-xbap"],
      ["xbd", "application/vnd.fujixerox.docuworks.binder"],
      ["xbm", ["image/xbm", "image/x-xbm", "image/x-xbitmap"]],
      ["xdf", "application/xcap-diff+xml"],
      ["xdm", "application/vnd.syncml.dm+xml"],
      ["xdp", "application/vnd.adobe.xdp+xml"],
      ["xdr", "video/x-amt-demorun"],
      ["xdssc", "application/dssc+xml"],
      ["xdw", "application/vnd.fujixerox.docuworks"],
      ["xenc", "application/xenc+xml"],
      ["xer", "application/patch-ops-error+xml"],
      ["xfdf", "application/vnd.adobe.xfdf"],
      ["xfdl", "application/vnd.xfdl"],
      ["xgz", "xgl/drawing"],
      ["xhtml", "application/xhtml+xml"],
      ["xif", "image/vnd.xiff"],
      ["xl", "application/excel"],
      ["xla", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
      ["xlb", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlc", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xld", ["application/excel", "application/x-excel"]],
      ["xlk", ["application/excel", "application/x-excel"]],
      ["xll", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
      ["xlm", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xls", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
      ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
      ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
      ["xlt", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
      ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
      ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
      ["xlv", ["application/excel", "application/x-excel"]],
      ["xlw", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
      ["xm", "audio/xm"],
      ["xml", ["application/xml", "text/xml", "application/atom+xml", "application/rss+xml"]],
      ["xmz", "xgl/movie"],
      ["xo", "application/vnd.olpc-sugar"],
      ["xof", "x-world/x-vrml"],
      ["xop", "application/xop+xml"],
      ["xpi", "application/x-xpinstall"],
      ["xpix", "application/x-vnd.ls-xpix"],
      ["xpm", ["image/xpm", "image/x-xpixmap"]],
      ["xpr", "application/vnd.is-xpr"],
      ["xps", "application/vnd.ms-xpsdocument"],
      ["xpw", "application/vnd.intercon.formnet"],
      ["xslt", "application/xslt+xml"],
      ["xsm", "application/vnd.syncml+xml"],
      ["xspf", "application/xspf+xml"],
      ["xsr", "video/x-amt-showrun"],
      ["xul", "application/vnd.mozilla.xul+xml"],
      ["xwd", ["image/x-xwd", "image/x-xwindowdump"]],
      ["xyz", ["chemical/x-xyz", "chemical/x-pdb"]],
      ["yang", "application/yang"],
      ["yin", "application/yin+xml"],
      ["z", ["application/x-compressed", "application/x-compress"]],
      ["zaz", "application/vnd.zzazz.deck+xml"],
      ["zip", ["application/zip", "multipart/x-zip", "application/x-zip-compressed", "application/x-compressed"]],
      ["zir", "application/vnd.zul"],
      ["zmm", "application/vnd.handheld-entertainment+xml"],
      ["zoo", "application/octet-stream"],
      ["zsh", "text/x-script.zsh"]
    ]);
    module2.exports = {
      detectMimeType(filename) {
        if (!filename) {
          return defaultMimeType;
        }
        let parsed = path.parse(filename);
        let extension = (parsed.ext.substr(1) || parsed.name || "").split("?").shift().trim().toLowerCase();
        let value = defaultMimeType;
        if (extensions.has(extension)) {
          value = extensions.get(extension);
        }
        if (Array.isArray(value)) {
          return value[0];
        }
        return value;
      },
      detectExtension(mimeType) {
        if (!mimeType) {
          return defaultExtension;
        }
        let parts = (mimeType || "").toLowerCase().trim().split("/");
        let rootType = parts.shift().trim();
        let subType = parts.join("/").trim();
        if (mimeTypes.has(rootType + "/" + subType)) {
          let value = mimeTypes.get(rootType + "/" + subType);
          if (Array.isArray(value)) {
            return value[0];
          }
          return value;
        }
        switch (rootType) {
          case "text":
            return "txt";
          default:
            return "bin";
        }
      }
    };
  }
});

// node_modules/nodemailer/lib/base64/index.js
var require_base64 = __commonJS({
  "node_modules/nodemailer/lib/base64/index.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    function encode(buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer, "utf-8");
      }
      return buffer.toString("base64");
    }
    function wrap(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let result = [];
      let pos = 0;
      let chunkLength = lineLength * 1024;
      while (pos < str.length) {
        let wrappedLines = str.substr(pos, chunkLength).replace(new RegExp(".{" + lineLength + "}", "g"), "$&\r\n").trim();
        result.push(wrappedLines);
        pos += chunkLength;
      }
      return result.join("\r\n").trim();
    }
    var Encoder = class extends Transform {
      constructor(options2) {
        super();
        this.options = options2 || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this._remainingBytes = false;
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return setImmediate(done);
        }
        this.inputBytes += chunk.length;
        if (this._remainingBytes && this._remainingBytes.length) {
          chunk = Buffer.concat([this._remainingBytes, chunk], this._remainingBytes.length + chunk.length);
          this._remainingBytes = false;
        }
        if (chunk.length % 3) {
          this._remainingBytes = chunk.slice(chunk.length - chunk.length % 3);
          chunk = chunk.slice(0, chunk.length - chunk.length % 3);
        } else {
          this._remainingBytes = false;
        }
        let b64 = this._curLine + encode(chunk);
        if (this.options.lineLength) {
          b64 = wrap(b64, this.options.lineLength);
          let lastLF = b64.lastIndexOf("\n");
          if (lastLF < 0) {
            this._curLine = b64;
            b64 = "";
          } else if (lastLF === b64.length - 1) {
            this._curLine = "";
          } else {
            this._curLine = b64.substr(lastLF + 1);
            b64 = b64.substr(0, lastLF + 1);
          }
        }
        if (b64) {
          this.outputBytes += b64.length;
          this.push(Buffer.from(b64, "ascii"));
        }
        setImmediate(done);
      }
      _flush(done) {
        if (this._remainingBytes && this._remainingBytes.length) {
          this._curLine += encode(this._remainingBytes);
        }
        if (this._curLine) {
          this._curLine = wrap(this._curLine, this.options.lineLength);
          this.outputBytes += this._curLine.length;
          this.push(this._curLine, "ascii");
          this._curLine = "";
        }
        done();
      }
    };
    module2.exports = {
      encode,
      wrap,
      Encoder
    };
  }
});

// node_modules/nodemailer/lib/qp/index.js
var require_qp = __commonJS({
  "node_modules/nodemailer/lib/qp/index.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    function encode(buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer, "utf-8");
      }
      let ranges = [
        [9],
        [10],
        [13],
        [32, 60],
        [62, 126]
      ];
      let result = "";
      let ord;
      for (let i = 0, len = buffer.length; i < len; i++) {
        ord = buffer[i];
        if (checkRanges(ord, ranges) && !((ord === 32 || ord === 9) && (i === len - 1 || buffer[i + 1] === 10 || buffer[i + 1] === 13))) {
          result += String.fromCharCode(ord);
          continue;
        }
        result += "=" + (ord < 16 ? "0" : "") + ord.toString(16).toUpperCase();
      }
      return result;
    }
    function wrap(str, lineLength) {
      str = (str || "").toString();
      lineLength = lineLength || 76;
      if (str.length <= lineLength) {
        return str;
      }
      let pos = 0;
      let len = str.length;
      let match, code, line;
      let lineMargin = Math.floor(lineLength / 3);
      let result = "";
      while (pos < len) {
        line = str.substr(pos, lineLength);
        if (match = line.match(/\r\n/)) {
          line = line.substr(0, match.index + match[0].length);
          result += line;
          pos += line.length;
          continue;
        }
        if (line.substr(-1) === "\n") {
          result += line;
          pos += line.length;
          continue;
        } else if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
          line = line.substr(0, line.length - (match[0].length - 1));
          result += line;
          pos += line.length;
          continue;
        } else if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
          line = line.substr(0, line.length - (match[0].length - 1));
        } else if (line.match(/[=][\da-f]{0,2}$/i)) {
          if (match = line.match(/[=][\da-f]{0,1}$/i)) {
            line = line.substr(0, line.length - match[0].length);
          }
          while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))) {
            code = parseInt(match[0].substr(1, 2), 16);
            if (code < 128) {
              break;
            }
            line = line.substr(0, line.length - 3);
            if (code >= 192) {
              break;
            }
          }
        }
        if (pos + line.length < len && line.substr(-1) !== "\n") {
          if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
            line = line.substr(0, line.length - 3);
          } else if (line.length === lineLength) {
            line = line.substr(0, line.length - 1);
          }
          pos += line.length;
          line += "=\r\n";
        } else {
          pos += line.length;
        }
        result += line;
      }
      return result;
    }
    function checkRanges(nr, ranges) {
      for (let i = ranges.length - 1; i >= 0; i--) {
        if (!ranges[i].length) {
          continue;
        }
        if (ranges[i].length === 1 && nr === ranges[i][0]) {
          return true;
        }
        if (ranges[i].length === 2 && nr >= ranges[i][0] && nr <= ranges[i][1]) {
          return true;
        }
      }
      return false;
    }
    var Encoder = class extends Transform {
      constructor(options2) {
        super();
        this.options = options2 || {};
        if (this.options.lineLength !== false) {
          this.options.lineLength = this.options.lineLength || 76;
        }
        this._curLine = "";
        this.inputBytes = 0;
        this.outputBytes = 0;
      }
      _transform(chunk, encoding, done) {
        let qp;
        if (encoding !== "buffer") {
          chunk = Buffer.from(chunk, encoding);
        }
        if (!chunk || !chunk.length) {
          return done();
        }
        this.inputBytes += chunk.length;
        if (this.options.lineLength) {
          qp = this._curLine + encode(chunk);
          qp = wrap(qp, this.options.lineLength);
          qp = qp.replace(/(^|\n)([^\n]*)$/, (match, lineBreak, lastLine) => {
            this._curLine = lastLine;
            return lineBreak;
          });
          if (qp) {
            this.outputBytes += qp.length;
            this.push(qp);
          }
        } else {
          qp = encode(chunk);
          this.outputBytes += qp.length;
          this.push(qp, "ascii");
        }
        done();
      }
      _flush(done) {
        if (this._curLine) {
          this.outputBytes += this._curLine.length;
          this.push(this._curLine, "ascii");
        }
        done();
      }
    };
    module2.exports = {
      encode,
      wrap,
      Encoder
    };
  }
});

// node_modules/nodemailer/lib/mime-funcs/index.js
var require_mime_funcs = __commonJS({
  "node_modules/nodemailer/lib/mime-funcs/index.js"(exports, module2) {
    "use strict";
    var base64 = require_base64();
    var qp = require_qp();
    var mimeTypes = require_mime_types();
    module2.exports = {
      isPlainText(value, isParam) {
        const re = isParam ? /[\x00-\x08\x0b\x0c\x0e-\x1f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
        if (typeof value !== "string" || re.test(value)) {
          return false;
        } else {
          return true;
        }
      },
      hasLongerLines(str, lineLength) {
        if (str.length > 128 * 1024) {
          return true;
        }
        return new RegExp("^.{" + (lineLength + 1) + ",}", "m").test(str);
      },
      encodeWord(data, mimeWordEncoding, maxLength) {
        mimeWordEncoding = (mimeWordEncoding || "Q").toString().toUpperCase().trim().charAt(0);
        maxLength = maxLength || 0;
        let encodedStr;
        let toCharset = "UTF-8";
        if (maxLength && maxLength > 7 + toCharset.length) {
          maxLength -= 7 + toCharset.length;
        }
        if (mimeWordEncoding === "Q") {
          encodedStr = qp.encode(data).replace(/[^a-z0-9!*+\-/=]/gi, (chr) => {
            let ord = chr.charCodeAt(0).toString(16).toUpperCase();
            if (chr === " ") {
              return "_";
            } else {
              return "=" + (ord.length === 1 ? "0" + ord : ord);
            }
          });
        } else if (mimeWordEncoding === "B") {
          encodedStr = typeof data === "string" ? data : base64.encode(data);
          maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
        }
        if (maxLength && (mimeWordEncoding !== "B" ? encodedStr : base64.encode(data)).length > maxLength) {
          if (mimeWordEncoding === "Q") {
            encodedStr = this.splitMimeEncodedString(encodedStr, maxLength).join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
          } else {
            let parts = [];
            let lpart = "";
            for (let i = 0, len = encodedStr.length; i < len; i++) {
              let chr = encodedStr.charAt(i);
              if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
                lpart += chr;
              } else {
                parts.push(base64.encode(lpart));
                lpart = chr;
              }
            }
            if (lpart) {
              parts.push(base64.encode(lpart));
            }
            if (parts.length > 1) {
              encodedStr = parts.join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
            } else {
              encodedStr = parts.join("");
            }
          }
        } else if (mimeWordEncoding === "B") {
          encodedStr = base64.encode(data);
        }
        return "=?" + toCharset + "?" + mimeWordEncoding + "?" + encodedStr + (encodedStr.substr(-2) === "?=" ? "" : "?=");
      },
      encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
        maxLength = maxLength || 0;
        let encodedValue;
        let firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
        if (!firstMatch) {
          return value;
        }
        if (encodeAll) {
          return this.encodeWord(value, mimeWordEncoding, maxLength);
        }
        let lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
        if (!lastMatch) {
          return value;
        }
        let startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
          index: 0
        }).index;
        let endIndex = lastMatch.index + (lastMatch[1] || "").length;
        encodedValue = (startIndex ? value.substr(0, startIndex) : "") + this.encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || "Q", maxLength) + (endIndex < value.length ? value.substr(endIndex) : "");
        return encodedValue;
      },
      buildHeaderValue(structured) {
        let paramsArray = [];
        Object.keys(structured.params || {}).forEach((param) => {
          let value = structured.params[param];
          if (!this.isPlainText(value, true) || value.length >= 75) {
            this.buildHeaderParam(param, value, 50).forEach((encodedParam) => {
              if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === "*") {
                paramsArray.push(encodedParam.key + "=" + encodedParam.value);
              } else {
                paramsArray.push(encodedParam.key + "=" + JSON.stringify(encodedParam.value));
              }
            });
          } else if (/[\s'"\\;:/=(),<>@[\]?]|^-/.test(value)) {
            paramsArray.push(param + "=" + JSON.stringify(value));
          } else {
            paramsArray.push(param + "=" + value);
          }
        });
        return structured.value + (paramsArray.length ? "; " + paramsArray.join("; ") : "");
      },
      buildHeaderParam(key, data, maxLength) {
        let list = [];
        let encodedStr = typeof data === "string" ? data : (data || "").toString();
        let encodedStrArr;
        let chr, ord;
        let line;
        let startPos = 0;
        let i, len;
        maxLength = maxLength || 50;
        if (this.isPlainText(data, true)) {
          if (encodedStr.length <= maxLength) {
            return [
              {
                key,
                value: encodedStr
              }
            ];
          }
          encodedStr = encodedStr.replace(new RegExp(".{" + maxLength + "}", "g"), (str) => {
            list.push({
              line: str
            });
            return "";
          });
          if (encodedStr) {
            list.push({
              line: encodedStr
            });
          }
        } else {
          if (/[\uD800-\uDBFF]/.test(encodedStr)) {
            encodedStrArr = [];
            for (i = 0, len = encodedStr.length; i < len; i++) {
              chr = encodedStr.charAt(i);
              ord = chr.charCodeAt(0);
              if (ord >= 55296 && ord <= 56319 && i < len - 1) {
                chr += encodedStr.charAt(i + 1);
                encodedStrArr.push(chr);
                i++;
              } else {
                encodedStrArr.push(chr);
              }
            }
            encodedStr = encodedStrArr;
          }
          line = "utf-8''";
          let encoded = true;
          startPos = 0;
          for (i = 0, len = encodedStr.length; i < len; i++) {
            chr = encodedStr[i];
            if (encoded) {
              chr = this.safeEncodeURIComponent(chr);
            } else {
              chr = chr === " " ? chr : this.safeEncodeURIComponent(chr);
              if (chr !== encodedStr[i]) {
                if ((this.safeEncodeURIComponent(line) + chr).length >= maxLength) {
                  list.push({
                    line,
                    encoded
                  });
                  line = "";
                  startPos = i - 1;
                } else {
                  encoded = true;
                  i = startPos;
                  line = "";
                  continue;
                }
              }
            }
            if ((line + chr).length >= maxLength) {
              list.push({
                line,
                encoded
              });
              line = chr = encodedStr[i] === " " ? " " : this.safeEncodeURIComponent(encodedStr[i]);
              if (chr === encodedStr[i]) {
                encoded = false;
                startPos = i - 1;
              } else {
                encoded = true;
              }
            } else {
              line += chr;
            }
          }
          if (line) {
            list.push({
              line,
              encoded
            });
          }
        }
        return list.map((item, i2) => ({
          key: key + "*" + i2 + (item.encoded ? "*" : ""),
          value: item.line
        }));
      },
      parseHeaderValue(str) {
        let response = {
          value: false,
          params: {}
        };
        let key = false;
        let value = "";
        let type = "value";
        let quote = false;
        let escaped3 = false;
        let chr;
        for (let i = 0, len = str.length; i < len; i++) {
          chr = str.charAt(i);
          if (type === "key") {
            if (chr === "=") {
              key = value.trim().toLowerCase();
              type = "value";
              value = "";
              continue;
            }
            value += chr;
          } else {
            if (escaped3) {
              value += chr;
            } else if (chr === "\\") {
              escaped3 = true;
              continue;
            } else if (quote && chr === quote) {
              quote = false;
            } else if (!quote && chr === '"') {
              quote = chr;
            } else if (!quote && chr === ";") {
              if (key === false) {
                response.value = value.trim();
              } else {
                response.params[key] = value.trim();
              }
              type = "key";
              value = "";
            } else {
              value += chr;
            }
            escaped3 = false;
          }
        }
        if (type === "value") {
          if (key === false) {
            response.value = value.trim();
          } else {
            response.params[key] = value.trim();
          }
        } else if (value.trim()) {
          response.params[value.trim().toLowerCase()] = "";
        }
        Object.keys(response.params).forEach((key2) => {
          let actualKey, nr, match, value2;
          if (match = key2.match(/(\*(\d+)|\*(\d+)\*|\*)$/)) {
            actualKey = key2.substr(0, match.index);
            nr = Number(match[2] || match[3]) || 0;
            if (!response.params[actualKey] || typeof response.params[actualKey] !== "object") {
              response.params[actualKey] = {
                charset: false,
                values: []
              };
            }
            value2 = response.params[key2];
            if (nr === 0 && match[0].substr(-1) === "*" && (match = value2.match(/^([^']*)'[^']*'(.*)$/))) {
              response.params[actualKey].charset = match[1] || "iso-8859-1";
              value2 = match[2];
            }
            response.params[actualKey].values[nr] = value2;
            delete response.params[key2];
          }
        });
        Object.keys(response.params).forEach((key2) => {
          let value2;
          if (response.params[key2] && Array.isArray(response.params[key2].values)) {
            value2 = response.params[key2].values.map((val) => val || "").join("");
            if (response.params[key2].charset) {
              response.params[key2] = "=?" + response.params[key2].charset + "?Q?" + value2.replace(/[=?_\s]/g, (s2) => {
                let c = s2.charCodeAt(0).toString(16);
                if (s2 === " ") {
                  return "_";
                } else {
                  return "%" + (c.length < 2 ? "0" : "") + c;
                }
              }).replace(/%/g, "=") + "?=";
            } else {
              response.params[key2] = value2;
            }
          }
        });
        return response;
      },
      detectExtension: (mimeType) => mimeTypes.detectExtension(mimeType),
      detectMimeType: (extension) => mimeTypes.detectMimeType(extension),
      foldLines(str, lineLength, afterSpace) {
        str = (str || "").toString();
        lineLength = lineLength || 76;
        let pos = 0, len = str.length, result = "", line, match;
        while (pos < len) {
          line = str.substr(pos, lineLength);
          if (line.length < lineLength) {
            result += line;
            break;
          }
          if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
            line = match[0];
            result += line;
            pos += line.length;
            continue;
          } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
            line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
          } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
            line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
          }
          result += line;
          pos += line.length;
          if (pos < len) {
            result += "\r\n";
          }
        }
        return result;
      },
      splitMimeEncodedString: (str, maxlen) => {
        let curLine, match, chr, done, lines = [];
        maxlen = Math.max(maxlen || 0, 12);
        while (str.length) {
          curLine = str.substr(0, maxlen);
          if (match = curLine.match(/[=][0-9A-F]?$/i)) {
            curLine = curLine.substr(0, match.index);
          }
          done = false;
          while (!done) {
            done = true;
            if (match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i)) {
              chr = parseInt(match[1], 16);
              if (chr < 194 && chr > 127) {
                curLine = curLine.substr(0, curLine.length - 3);
                done = false;
              }
            }
          }
          if (curLine.length) {
            lines.push(curLine);
          }
          str = str.substr(curLine.length);
        }
        return lines;
      },
      encodeURICharComponent: (chr) => {
        let res = "";
        let ord = chr.charCodeAt(0).toString(16).toUpperCase();
        if (ord.length % 2) {
          ord = "0" + ord;
        }
        if (ord.length > 2) {
          for (let i = 0, len = ord.length / 2; i < len; i++) {
            res += "%" + ord.substr(i, 2);
          }
        } else {
          res += "%" + ord;
        }
        return res;
      },
      safeEncodeURIComponent(str) {
        str = (str || "").toString();
        try {
          str = encodeURIComponent(str);
        } catch (E) {
          return str.replace(/[^\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]+/g, "");
        }
        return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (chr) => this.encodeURICharComponent(chr));
      }
    };
  }
});

// node_modules/nodemailer/lib/addressparser/index.js
var require_addressparser = __commonJS({
  "node_modules/nodemailer/lib/addressparser/index.js"(exports, module2) {
    "use strict";
    function _handleAddress(tokens) {
      let token;
      let isGroup = false;
      let state = "text";
      let address;
      let addresses = [];
      let data = {
        address: [],
        comment: [],
        group: [],
        text: []
      };
      let i;
      let len;
      for (i = 0, len = tokens.length; i < len; i++) {
        token = tokens[i];
        if (token.type === "operator") {
          switch (token.value) {
            case "<":
              state = "address";
              break;
            case "(":
              state = "comment";
              break;
            case ":":
              state = "group";
              isGroup = true;
              break;
            default:
              state = "text";
          }
        } else if (token.value) {
          if (state === "address") {
            token.value = token.value.replace(/^[^<]*<\s*/, "");
          }
          data[state].push(token.value);
        }
      }
      if (!data.text.length && data.comment.length) {
        data.text = data.comment;
        data.comment = [];
      }
      if (isGroup) {
        data.text = data.text.join(" ");
        addresses.push({
          name: data.text || address && address.name,
          group: data.group.length ? addressparser(data.group.join(",")) : []
        });
      } else {
        if (!data.address.length && data.text.length) {
          for (i = data.text.length - 1; i >= 0; i--) {
            if (data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
              data.address = data.text.splice(i, 1);
              break;
            }
          }
          let _regexHandler = function(address2) {
            if (!data.address.length) {
              data.address = [address2.trim()];
              return " ";
            } else {
              return address2;
            }
          };
          if (!data.address.length) {
            for (i = data.text.length - 1; i >= 0; i--) {
              data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
              if (data.address.length) {
                break;
              }
            }
          }
        }
        if (!data.text.length && data.comment.length) {
          data.text = data.comment;
          data.comment = [];
        }
        if (data.address.length > 1) {
          data.text = data.text.concat(data.address.splice(1));
        }
        data.text = data.text.join(" ");
        data.address = data.address.join(" ");
        if (!data.address && isGroup) {
          return [];
        } else {
          address = {
            address: data.address || data.text || "",
            name: data.text || data.address || ""
          };
          if (address.address === address.name) {
            if ((address.address || "").match(/@/)) {
              address.name = "";
            } else {
              address.address = "";
            }
          }
          addresses.push(address);
        }
      }
      return addresses;
    }
    var Tokenizer = class {
      constructor(str) {
        this.str = (str || "").toString();
        this.operatorCurrent = "";
        this.operatorExpecting = "";
        this.node = null;
        this.escaped = false;
        this.list = [];
        this.operators = {
          '"': '"',
          "(": ")",
          "<": ">",
          ",": "",
          ":": ";",
          ";": ""
        };
      }
      tokenize() {
        let chr, list = [];
        for (let i = 0, len = this.str.length; i < len; i++) {
          chr = this.str.charAt(i);
          this.checkChar(chr);
        }
        this.list.forEach((node) => {
          node.value = (node.value || "").toString().trim();
          if (node.value) {
            list.push(node);
          }
        });
        return list;
      }
      checkChar(chr) {
        if (this.escaped) {
        } else if (chr === this.operatorExpecting) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = "";
          this.escaped = false;
          return;
        } else if (!this.operatorExpecting && chr in this.operators) {
          this.node = {
            type: "operator",
            value: chr
          };
          this.list.push(this.node);
          this.node = null;
          this.operatorExpecting = this.operators[chr];
          this.escaped = false;
          return;
        } else if (['"', "'"].includes(this.operatorExpecting) && chr === "\\") {
          this.escaped = true;
          return;
        }
        if (!this.node) {
          this.node = {
            type: "text",
            value: ""
          };
          this.list.push(this.node);
        }
        if (chr === "\n") {
          chr = " ";
        }
        if (chr.charCodeAt(0) >= 33 || [" ", "	"].includes(chr)) {
          this.node.value += chr;
        }
        this.escaped = false;
      }
    };
    function addressparser(str, options2) {
      options2 = options2 || {};
      let tokenizer = new Tokenizer(str);
      let tokens = tokenizer.tokenize();
      let addresses = [];
      let address = [];
      let parsedAddresses = [];
      tokens.forEach((token) => {
        if (token.type === "operator" && (token.value === "," || token.value === ";")) {
          if (address.length) {
            addresses.push(address);
          }
          address = [];
        } else {
          address.push(token);
        }
      });
      if (address.length) {
        addresses.push(address);
      }
      addresses.forEach((address2) => {
        address2 = _handleAddress(address2);
        if (address2.length) {
          parsedAddresses = parsedAddresses.concat(address2);
        }
      });
      if (options2.flatten) {
        let addresses2 = [];
        let walkAddressList = (list) => {
          list.forEach((address2) => {
            if (address2.group) {
              return walkAddressList(address2.group);
            } else {
              addresses2.push(address2);
            }
          });
        };
        walkAddressList(parsedAddresses);
        return addresses2;
      }
      return parsedAddresses;
    }
    module2.exports = addressparser;
  }
});

// node_modules/nodemailer/lib/mime-node/last-newline.js
var require_last_newline = __commonJS({
  "node_modules/nodemailer/lib/mime-node/last-newline.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var LastNewline = class extends Transform {
      constructor() {
        super();
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        if (chunk.length) {
          this.lastByte = chunk[chunk.length - 1];
        }
        this.push(chunk);
        done();
      }
      _flush(done) {
        if (this.lastByte === 10) {
          return done();
        }
        if (this.lastByte === 13) {
          this.push(Buffer.from("\n"));
          return done();
        }
        this.push(Buffer.from("\r\n"));
        return done();
      }
    };
    module2.exports = LastNewline;
  }
});

// node_modules/nodemailer/lib/mime-node/le-windows.js
var require_le_windows = __commonJS({
  "node_modules/nodemailer/lib/mime-node/le-windows.js"(exports, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options2) {
        super(options2);
        this.options = options2 || {};
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                this.push(buf);
              }
              this.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
    };
    module2.exports = LeWindows;
  }
});

// node_modules/nodemailer/lib/mime-node/le-unix.js
var require_le_unix = __commonJS({
  "node_modules/nodemailer/lib/mime-node/le-unix.js"(exports, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var LeWindows = class extends Transform {
      constructor(options2) {
        super(options2);
        this.options = options2 || {};
      }
      _transform(chunk, encoding, done) {
        let buf;
        let lastPos = 0;
        for (let i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 13) {
            buf = chunk.slice(lastPos, i);
            lastPos = i + 1;
            this.push(buf);
          }
        }
        if (lastPos && lastPos < chunk.length) {
          buf = chunk.slice(lastPos);
          this.push(buf);
        } else if (!lastPos) {
          this.push(chunk);
        }
        done();
      }
    };
    module2.exports = LeWindows;
  }
});

// node_modules/nodemailer/lib/mime-node/index.js
var require_mime_node = __commonJS({
  "node_modules/nodemailer/lib/mime-node/index.js"(exports, module2) {
    "use strict";
    var crypto = require("crypto");
    var os = require("os");
    var fs = require("fs");
    var punycode = require("punycode");
    var PassThrough2 = require("stream").PassThrough;
    var shared = require_shared();
    var mimeFuncs = require_mime_funcs();
    var qp = require_qp();
    var base64 = require_base64();
    var addressparser = require_addressparser();
    var fetch3 = require_fetch();
    var LastNewline = require_last_newline();
    var LeWindows = require_le_windows();
    var LeUnix = require_le_unix();
    var MimeNode = class {
      constructor(contentType, options2) {
        this.nodeCounter = 0;
        options2 = options2 || {};
        this.baseBoundary = options2.baseBoundary || crypto.randomBytes(8).toString("hex");
        this.boundaryPrefix = options2.boundaryPrefix || "--_NmP";
        this.disableFileAccess = !!options2.disableFileAccess;
        this.disableUrlAccess = !!options2.disableUrlAccess;
        this.normalizeHeaderKey = options2.normalizeHeaderKey;
        this.date = new Date();
        this.rootNode = options2.rootNode || this;
        this.keepBcc = !!options2.keepBcc;
        if (options2.filename) {
          this.filename = options2.filename;
          if (!contentType) {
            contentType = mimeFuncs.detectMimeType(this.filename.split(".").pop());
          }
        }
        this.textEncoding = (options2.textEncoding || "").toString().trim().charAt(0).toUpperCase();
        this.parentNode = options2.parentNode;
        this.hostname = options2.hostname;
        this.newline = options2.newline;
        this.childNodes = [];
        this._nodeId = ++this.rootNode.nodeCounter;
        this._headers = [];
        this._isPlainText = false;
        this._hasLongLines = false;
        this._envelope = false;
        this._raw = false;
        this._transforms = [];
        this._processFuncs = [];
        if (contentType) {
          this.setHeader("Content-Type", contentType);
        }
      }
      createChild(contentType, options2) {
        if (!options2 && typeof contentType === "object") {
          options2 = contentType;
          contentType = void 0;
        }
        let node = new MimeNode(contentType, options2);
        this.appendChild(node);
        return node;
      }
      appendChild(childNode) {
        if (childNode.rootNode !== this.rootNode) {
          childNode.rootNode = this.rootNode;
          childNode._nodeId = ++this.rootNode.nodeCounter;
        }
        childNode.parentNode = this;
        this.childNodes.push(childNode);
        return childNode;
      }
      replace(node) {
        if (node === this) {
          return this;
        }
        this.parentNode.childNodes.forEach((childNode, i) => {
          if (childNode === this) {
            node.rootNode = this.rootNode;
            node.parentNode = this.parentNode;
            node._nodeId = this._nodeId;
            this.rootNode = this;
            this.parentNode = void 0;
            node.parentNode.childNodes[i] = node;
          }
        });
        return node;
      }
      remove() {
        if (!this.parentNode) {
          return this;
        }
        for (let i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
          if (this.parentNode.childNodes[i] === this) {
            this.parentNode.childNodes.splice(i, 1);
            this.parentNode = void 0;
            this.rootNode = this;
            return this;
          }
        }
      }
      setHeader(key, value) {
        let added = false, headerValue;
        if (!value && key && typeof key === "object") {
          if (key.key && "value" in key) {
            this.setHeader(key.key, key.value);
          } else if (Array.isArray(key)) {
            key.forEach((i) => {
              this.setHeader(i.key, i.value);
            });
          } else {
            Object.keys(key).forEach((i) => {
              this.setHeader(i, key[i]);
            });
          }
          return this;
        }
        key = this._normalizeHeaderKey(key);
        headerValue = {
          key,
          value
        };
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key) {
            if (!added) {
              this._headers[i] = headerValue;
              added = true;
            } else {
              this._headers.splice(i, 1);
              i--;
              len--;
            }
          }
        }
        if (!added) {
          this._headers.push(headerValue);
        }
        return this;
      }
      addHeader(key, value) {
        if (!value && key && typeof key === "object") {
          if (key.key && key.value) {
            this.addHeader(key.key, key.value);
          } else if (Array.isArray(key)) {
            key.forEach((i) => {
              this.addHeader(i.key, i.value);
            });
          } else {
            Object.keys(key).forEach((i) => {
              this.addHeader(i, key[i]);
            });
          }
          return this;
        } else if (Array.isArray(value)) {
          value.forEach((val) => {
            this.addHeader(key, val);
          });
          return this;
        }
        this._headers.push({
          key: this._normalizeHeaderKey(key),
          value
        });
        return this;
      }
      getHeader(key) {
        key = this._normalizeHeaderKey(key);
        for (let i = 0, len = this._headers.length; i < len; i++) {
          if (this._headers[i].key === key) {
            return this._headers[i].value;
          }
        }
      }
      setContent(content) {
        this.content = content;
        if (typeof this.content.pipe === "function") {
          this._contentErrorHandler = (err) => {
            this.content.removeListener("error", this._contentErrorHandler);
            this.content = err;
          };
          this.content.once("error", this._contentErrorHandler);
        } else if (typeof this.content === "string") {
          this._isPlainText = mimeFuncs.isPlainText(this.content);
          if (this._isPlainText && mimeFuncs.hasLongerLines(this.content, 76)) {
            this._hasLongLines = true;
          }
        }
        return this;
      }
      build(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve2, reject) => {
            callback = shared.callbackPromise(resolve2, reject);
          });
        }
        let stream = this.createReadStream();
        let buf = [];
        let buflen = 0;
        let returned = false;
        stream.on("readable", () => {
          let chunk;
          while ((chunk = stream.read()) !== null) {
            buf.push(chunk);
            buflen += chunk.length;
          }
        });
        stream.once("error", (err) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err);
        });
        stream.once("end", (chunk) => {
          if (returned) {
            return;
          }
          returned = true;
          if (chunk && chunk.length) {
            buf.push(chunk);
            buflen += chunk.length;
          }
          return callback(null, Buffer.concat(buf, buflen));
        });
        return promise;
      }
      getTransferEncoding() {
        let transferEncoding = false;
        let contentType = (this.getHeader("Content-Type") || "").toString().toLowerCase().trim();
        if (this.content) {
          transferEncoding = (this.getHeader("Content-Transfer-Encoding") || "").toString().toLowerCase().trim();
          if (!transferEncoding || !["base64", "quoted-printable"].includes(transferEncoding)) {
            if (/^text\//i.test(contentType)) {
              if (this._isPlainText && !this._hasLongLines) {
                transferEncoding = "7bit";
              } else if (typeof this.content === "string" || this.content instanceof Buffer) {
                transferEncoding = this._getTextEncoding(this.content) === "Q" ? "quoted-printable" : "base64";
              } else {
                transferEncoding = this.textEncoding === "B" ? "base64" : "quoted-printable";
              }
            } else if (!/^(multipart|message)\//i.test(contentType)) {
              transferEncoding = transferEncoding || "base64";
            }
          }
        }
        return transferEncoding;
      }
      buildHeaders() {
        let transferEncoding = this.getTransferEncoding();
        let headers = [];
        if (transferEncoding) {
          this.setHeader("Content-Transfer-Encoding", transferEncoding);
        }
        if (this.filename && !this.getHeader("Content-Disposition")) {
          this.setHeader("Content-Disposition", "attachment");
        }
        if (this.rootNode === this) {
          if (!this.getHeader("Date")) {
            this.setHeader("Date", this.date.toUTCString().replace(/GMT/, "+0000"));
          }
          this.messageId();
          if (!this.getHeader("MIME-Version")) {
            this.setHeader("MIME-Version", "1.0");
          }
        }
        this._headers.forEach((header) => {
          let key = header.key;
          let value = header.value;
          let structured;
          let param;
          let options2 = {};
          let formattedHeaders = ["From", "Sender", "To", "Cc", "Bcc", "Reply-To", "Date", "References"];
          if (value && typeof value === "object" && !formattedHeaders.includes(key)) {
            Object.keys(value).forEach((key2) => {
              if (key2 !== "value") {
                options2[key2] = value[key2];
              }
            });
            value = (value.value || "").toString();
            if (!value.trim()) {
              return;
            }
          }
          if (options2.prepared) {
            if (options2.foldLines) {
              headers.push(mimeFuncs.foldLines(key + ": " + value));
            } else {
              headers.push(key + ": " + value);
            }
            return;
          }
          switch (header.key) {
            case "Content-Disposition":
              structured = mimeFuncs.parseHeaderValue(value);
              if (this.filename) {
                structured.params.filename = this.filename;
              }
              value = mimeFuncs.buildHeaderValue(structured);
              break;
            case "Content-Type":
              structured = mimeFuncs.parseHeaderValue(value);
              this._handleContentType(structured);
              if (structured.value.match(/^text\/plain\b/) && typeof this.content === "string" && /[\u0080-\uFFFF]/.test(this.content)) {
                structured.params.charset = "utf-8";
              }
              value = mimeFuncs.buildHeaderValue(structured);
              if (this.filename) {
                param = this._encodeWords(this.filename);
                if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
                  param = '"' + param + '"';
                }
                value += "; name=" + param;
              }
              break;
            case "Bcc":
              if (!this.keepBcc) {
                return;
              }
              break;
          }
          value = this._encodeHeaderValue(key, value);
          if (!(value || "").toString().trim()) {
            return;
          }
          if (typeof this.normalizeHeaderKey === "function") {
            let normalized = this.normalizeHeaderKey(key, value);
            if (normalized && typeof normalized === "string" && normalized.length) {
              key = normalized;
            }
          }
          headers.push(mimeFuncs.foldLines(key + ": " + value, 76));
        });
        return headers.join("\r\n");
      }
      createReadStream(options2) {
        options2 = options2 || {};
        let stream = new PassThrough2(options2);
        let outputStream = stream;
        let transform;
        this.stream(stream, options2, (err) => {
          if (err) {
            outputStream.emit("error", err);
            return;
          }
          stream.end();
        });
        for (let i = 0, len = this._transforms.length; i < len; i++) {
          transform = typeof this._transforms[i] === "function" ? this._transforms[i]() : this._transforms[i];
          outputStream.once("error", (err) => {
            transform.emit("error", err);
          });
          outputStream = outputStream.pipe(transform);
        }
        transform = new LastNewline();
        outputStream.once("error", (err) => {
          transform.emit("error", err);
        });
        outputStream = outputStream.pipe(transform);
        for (let i = 0, len = this._processFuncs.length; i < len; i++) {
          transform = this._processFuncs[i];
          outputStream = transform(outputStream);
        }
        if (this.newline) {
          const winbreak = ["win", "windows", "dos", "\r\n"].includes(this.newline.toString().toLowerCase());
          const newlineTransform = winbreak ? new LeWindows() : new LeUnix();
          const stream2 = outputStream.pipe(newlineTransform);
          outputStream.on("error", (err) => stream2.emit("error", err));
          return stream2;
        }
        return outputStream;
      }
      transform(transform) {
        this._transforms.push(transform);
      }
      processFunc(processFunc) {
        this._processFuncs.push(processFunc);
      }
      stream(outputStream, options2, done) {
        let transferEncoding = this.getTransferEncoding();
        let contentStream;
        let localStream;
        let returned = false;
        let callback = (err) => {
          if (returned) {
            return;
          }
          returned = true;
          done(err);
        };
        let finalize = () => {
          let childId = 0;
          let processChildNode = () => {
            if (childId >= this.childNodes.length) {
              outputStream.write("\r\n--" + this.boundary + "--\r\n");
              return callback();
            }
            let child = this.childNodes[childId++];
            outputStream.write((childId > 1 ? "\r\n" : "") + "--" + this.boundary + "\r\n");
            child.stream(outputStream, options2, (err) => {
              if (err) {
                return callback(err);
              }
              setImmediate(processChildNode);
            });
          };
          if (this.multipart) {
            setImmediate(processChildNode);
          } else {
            return callback();
          }
        };
        let sendContent = () => {
          if (this.content) {
            if (Object.prototype.toString.call(this.content) === "[object Error]") {
              return callback(this.content);
            }
            if (typeof this.content.pipe === "function") {
              this.content.removeListener("error", this._contentErrorHandler);
              this._contentErrorHandler = (err) => callback(err);
              this.content.once("error", this._contentErrorHandler);
            }
            let createStream = () => {
              if (["quoted-printable", "base64"].includes(transferEncoding)) {
                contentStream = new (transferEncoding === "base64" ? base64 : qp).Encoder(options2);
                contentStream.pipe(outputStream, {
                  end: false
                });
                contentStream.once("end", finalize);
                contentStream.once("error", (err) => callback(err));
                localStream = this._getStream(this.content);
                localStream.pipe(contentStream);
              } else {
                localStream = this._getStream(this.content);
                localStream.pipe(outputStream, {
                  end: false
                });
                localStream.once("end", finalize);
              }
              localStream.once("error", (err) => callback(err));
            };
            if (this.content._resolve) {
              let chunks = [];
              let chunklen = 0;
              let returned2 = false;
              let sourceStream = this._getStream(this.content);
              sourceStream.on("error", (err) => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                callback(err);
              });
              sourceStream.on("readable", () => {
                let chunk;
                while ((chunk = sourceStream.read()) !== null) {
                  chunks.push(chunk);
                  chunklen += chunk.length;
                }
              });
              sourceStream.on("end", () => {
                if (returned2) {
                  return;
                }
                returned2 = true;
                this.content._resolve = false;
                this.content._resolvedValue = Buffer.concat(chunks, chunklen);
                setImmediate(createStream);
              });
            } else {
              setImmediate(createStream);
            }
            return;
          } else {
            return setImmediate(finalize);
          }
        };
        if (this._raw) {
          setImmediate(() => {
            if (Object.prototype.toString.call(this._raw) === "[object Error]") {
              return callback(this._raw);
            }
            if (typeof this._raw.pipe === "function") {
              this._raw.removeListener("error", this._contentErrorHandler);
            }
            let raw = this._getStream(this._raw);
            raw.pipe(outputStream, {
              end: false
            });
            raw.on("error", (err) => outputStream.emit("error", err));
            raw.on("end", finalize);
          });
        } else {
          outputStream.write(this.buildHeaders() + "\r\n\r\n");
          setImmediate(sendContent);
        }
      }
      setEnvelope(envelope) {
        let list;
        this._envelope = {
          from: false,
          to: []
        };
        if (envelope.from) {
          list = [];
          this._convertAddresses(this._parseAddresses(envelope.from), list);
          list = list.filter((address) => address && address.address);
          if (list.length && list[0]) {
            this._envelope.from = list[0].address;
          }
        }
        ["to", "cc", "bcc"].forEach((key) => {
          if (envelope[key]) {
            this._convertAddresses(this._parseAddresses(envelope[key]), this._envelope.to);
          }
        });
        this._envelope.to = this._envelope.to.map((to) => to.address).filter((address) => address);
        let standardFields = ["to", "cc", "bcc", "from"];
        Object.keys(envelope).forEach((key) => {
          if (!standardFields.includes(key)) {
            this._envelope[key] = envelope[key];
          }
        });
        return this;
      }
      getAddresses() {
        let addresses = {};
        this._headers.forEach((header) => {
          let key = header.key.toLowerCase();
          if (["from", "sender", "reply-to", "to", "cc", "bcc"].includes(key)) {
            if (!Array.isArray(addresses[key])) {
              addresses[key] = [];
            }
            this._convertAddresses(this._parseAddresses(header.value), addresses[key]);
          }
        });
        return addresses;
      }
      getEnvelope() {
        if (this._envelope) {
          return this._envelope;
        }
        let envelope = {
          from: false,
          to: []
        };
        this._headers.forEach((header) => {
          let list = [];
          if (header.key === "From" || !envelope.from && ["Reply-To", "Sender"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), list);
            if (list.length && list[0]) {
              envelope.from = list[0].address;
            }
          } else if (["To", "Cc", "Bcc"].includes(header.key)) {
            this._convertAddresses(this._parseAddresses(header.value), envelope.to);
          }
        });
        envelope.to = envelope.to.map((to) => to.address);
        return envelope;
      }
      messageId() {
        let messageId = this.getHeader("Message-ID");
        if (!messageId) {
          messageId = this._generateMessageId();
          this.setHeader("Message-ID", messageId);
        }
        return messageId;
      }
      setRaw(raw) {
        this._raw = raw;
        if (this._raw && typeof this._raw.pipe === "function") {
          this._contentErrorHandler = (err) => {
            this._raw.removeListener("error", this._contentErrorHandler);
            this._raw = err;
          };
          this._raw.once("error", this._contentErrorHandler);
        }
        return this;
      }
      _getStream(content) {
        let contentStream;
        if (content._resolvedValue) {
          contentStream = new PassThrough2();
          setImmediate(() => contentStream.end(content._resolvedValue));
          return contentStream;
        } else if (typeof content.pipe === "function") {
          return content;
        } else if (content && typeof content.path === "string" && !content.href) {
          if (this.disableFileAccess) {
            contentStream = new PassThrough2();
            setImmediate(() => contentStream.emit("error", new Error("File access rejected for " + content.path)));
            return contentStream;
          }
          return fs.createReadStream(content.path);
        } else if (content && typeof content.href === "string") {
          if (this.disableUrlAccess) {
            contentStream = new PassThrough2();
            setImmediate(() => contentStream.emit("error", new Error("Url access rejected for " + content.href)));
            return contentStream;
          }
          return fetch3(content.href, {headers: content.httpHeaders});
        } else {
          contentStream = new PassThrough2();
          setImmediate(() => contentStream.end(content || ""));
          return contentStream;
        }
      }
      _parseAddresses(addresses) {
        return [].concat.apply([], [].concat(addresses).map((address) => {
          if (address && address.address) {
            address.address = this._normalizeAddress(address.address);
            address.name = address.name || "";
            return [address];
          }
          return addressparser(address);
        }));
      }
      _normalizeHeaderKey(key) {
        key = (key || "").toString().replace(/\r?\n|\r/g, " ").trim().toLowerCase().replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (c) => c.toUpperCase()).replace(/^Content-Features$/i, "Content-features");
        return key;
      }
      _handleContentType(structured) {
        this.contentType = structured.value.trim().toLowerCase();
        this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf("/") + 1) : false;
        if (this.multipart) {
          this.boundary = structured.params.boundary = structured.params.boundary || this.boundary || this._generateBoundary();
        } else {
          this.boundary = false;
        }
      }
      _generateBoundary() {
        return this.rootNode.boundaryPrefix + "-" + this.rootNode.baseBoundary + "-Part_" + this._nodeId;
      }
      _encodeHeaderValue(key, value) {
        key = this._normalizeHeaderKey(key);
        switch (key) {
          case "From":
          case "Sender":
          case "To":
          case "Cc":
          case "Bcc":
          case "Reply-To":
            return this._convertAddresses(this._parseAddresses(value));
          case "Message-ID":
          case "In-Reply-To":
          case "Content-Id":
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            if (value.charAt(0) !== "<") {
              value = "<" + value;
            }
            if (value.charAt(value.length - 1) !== ">") {
              value = value + ">";
            }
            return value;
          case "References":
            value = [].concat.apply([], [].concat(value || "").map((elm) => {
              elm = (elm || "").toString().replace(/\r?\n|\r/g, " ").trim();
              return elm.replace(/<[^>]*>/g, (str) => str.replace(/\s/g, "")).split(/\s+/);
            })).map((elm) => {
              if (elm.charAt(0) !== "<") {
                elm = "<" + elm;
              }
              if (elm.charAt(elm.length - 1) !== ">") {
                elm = elm + ">";
              }
              return elm;
            });
            return value.join(" ").trim();
          case "Date":
            if (Object.prototype.toString.call(value) === "[object Date]") {
              return value.toUTCString().replace(/GMT/, "+0000");
            }
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
          case "Content-Type":
          case "Content-Disposition":
            return (value || "").toString().replace(/\r?\n|\r/g, " ");
          default:
            value = (value || "").toString().replace(/\r?\n|\r/g, " ");
            return this._encodeWords(value);
        }
      }
      _convertAddresses(addresses, uniqueList) {
        let values = [];
        uniqueList = uniqueList || [];
        [].concat(addresses || []).forEach((address) => {
          if (address.address) {
            address.address = this._normalizeAddress(address.address);
            if (!address.name) {
              values.push(address.address);
            } else if (address.name) {
              values.push(this._encodeAddressName(address.name) + " <" + address.address + ">");
            }
            if (address.address) {
              if (!uniqueList.filter((a) => a.address === address.address).length) {
                uniqueList.push(address);
              }
            }
          } else if (address.group) {
            values.push(this._encodeAddressName(address.name) + ":" + (address.group.length ? this._convertAddresses(address.group, uniqueList) : "").trim() + ";");
          }
        });
        return values.join(", ");
      }
      _normalizeAddress(address) {
        address = (address || "").toString().trim();
        let lastAt = address.lastIndexOf("@");
        if (lastAt < 0) {
          return address;
        }
        let user = address.substr(0, lastAt);
        let domain = address.substr(lastAt + 1);
        return user + "@" + punycode.toASCII(domain.toLowerCase());
      }
      _encodeAddressName(name) {
        if (!/^[\w ']*$/.test(name)) {
          if (/^[\x20-\x7e]*$/.test(name)) {
            return '"' + name.replace(/([\\"])/g, "\\$1") + '"';
          } else {
            return mimeFuncs.encodeWord(name, this._getTextEncoding(name), 52);
          }
        }
        return name;
      }
      _encodeWords(value) {
        return mimeFuncs.encodeWords(value, this._getTextEncoding(value), 52, true);
      }
      _getTextEncoding(value) {
        value = (value || "").toString();
        let encoding = this.textEncoding;
        let latinLen;
        let nonLatinLen;
        if (!encoding) {
          nonLatinLen = (value.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\u0080-\uFFFF]/g) || []).length;
          latinLen = (value.match(/[a-z]/gi) || []).length;
          encoding = nonLatinLen < latinLen ? "Q" : "B";
        }
        return encoding;
      }
      _generateMessageId() {
        return "<" + [2, 2, 2, 6].reduce((prev, len) => prev + "-" + crypto.randomBytes(len).toString("hex"), crypto.randomBytes(4).toString("hex")) + "@" + (this.getEnvelope().from || this.hostname || os.hostname() || "localhost").split("@").pop() + ">";
      }
    };
    module2.exports = MimeNode;
  }
});

// node_modules/nodemailer/lib/mail-composer/index.js
var require_mail_composer = __commonJS({
  "node_modules/nodemailer/lib/mail-composer/index.js"(exports, module2) {
    "use strict";
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var MailComposer = class {
      constructor(mail) {
        this.mail = mail || {};
        this.message = false;
      }
      compile() {
        this._alternatives = this.getAlternatives();
        this._htmlNode = this._alternatives.filter((alternative) => /^text\/html\b/i.test(alternative.contentType)).pop();
        this._attachments = this.getAttachments(!!this._htmlNode);
        this._useRelated = !!(this._htmlNode && this._attachments.related.length);
        this._useAlternative = this._alternatives.length > 1;
        this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1;
        if (this.mail.raw) {
          this.message = new MimeNode("message/rfc822", {newline: this.mail.newline}).setRaw(this.mail.raw);
        } else if (this._useMixed) {
          this.message = this._createMixed();
        } else if (this._useAlternative) {
          this.message = this._createAlternative();
        } else if (this._useRelated) {
          this.message = this._createRelated();
        } else {
          this.message = this._createContentNode(false, [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
            contentType: "text/plain",
            content: ""
          });
        }
        if (this.mail.headers) {
          this.message.addHeader(this.mail.headers);
        }
        ["from", "sender", "to", "cc", "bcc", "reply-to", "in-reply-to", "references", "subject", "message-id", "date"].forEach((header) => {
          let key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
          if (this.mail[key]) {
            this.message.setHeader(header, this.mail[key]);
          }
        });
        if (this.mail.envelope) {
          this.message.setEnvelope(this.mail.envelope);
        }
        this.message.messageId();
        return this.message;
      }
      getAttachments(findRelated) {
        let icalEvent, eventObject;
        let attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
          let data;
          let isMessageNode = /^message\//i.test(attachment.contentType);
          if (/^data:/i.test(attachment.path || attachment.href)) {
            attachment = this._processDataUrl(attachment);
          }
          data = {
            contentType: attachment.contentType || mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin"),
            contentDisposition: attachment.contentDisposition || (isMessageNode ? "inline" : "attachment"),
            contentTransferEncoding: "contentTransferEncoding" in attachment ? attachment.contentTransferEncoding : "base64"
          };
          if (attachment.filename) {
            data.filename = attachment.filename;
          } else if (!isMessageNode && attachment.filename !== false) {
            data.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
            if (data.filename.indexOf(".") < 0) {
              data.filename += "." + mimeFuncs.detectExtension(data.contentType);
            }
          }
          if (/^https?:\/\//i.test(attachment.path)) {
            attachment.href = attachment.path;
            attachment.path = void 0;
          }
          if (attachment.cid) {
            data.cid = attachment.cid;
          }
          if (attachment.raw) {
            data.raw = attachment.raw;
          } else if (attachment.path) {
            data.content = {
              path: attachment.path
            };
          } else if (attachment.href) {
            data.content = {
              href: attachment.href,
              httpHeaders: attachment.httpHeaders
            };
          } else {
            data.content = attachment.content || "";
          }
          if (attachment.encoding) {
            data.encoding = attachment.encoding;
          }
          if (attachment.headers) {
            data.headers = attachment.headers;
          }
          return data;
        });
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key) => {
            eventObject[key] = icalEvent[key];
          });
          eventObject.contentType = "application/ics";
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
          eventObject.filename = eventObject.filename || "invite.ics";
          eventObject.headers["Content-Disposition"] = "attachment";
          eventObject.headers["Content-Transfer-Encoding"] = "base64";
        }
        if (!findRelated) {
          return {
            attached: attachments.concat(eventObject || []),
            related: []
          };
        } else {
          return {
            attached: attachments.filter((attachment) => !attachment.cid).concat(eventObject || []),
            related: attachments.filter((attachment) => !!attachment.cid)
          };
        }
      }
      getAlternatives() {
        let alternatives = [], text, html, watchHtml, amp, icalEvent, eventObject;
        if (this.mail.text) {
          if (typeof this.mail.text === "object" && (this.mail.text.content || this.mail.text.path || this.mail.text.href || this.mail.text.raw)) {
            text = this.mail.text;
          } else {
            text = {
              content: this.mail.text
            };
          }
          text.contentType = "text/plain; charset=utf-8";
        }
        if (this.mail.watchHtml) {
          if (typeof this.mail.watchHtml === "object" && (this.mail.watchHtml.content || this.mail.watchHtml.path || this.mail.watchHtml.href || this.mail.watchHtml.raw)) {
            watchHtml = this.mail.watchHtml;
          } else {
            watchHtml = {
              content: this.mail.watchHtml
            };
          }
          watchHtml.contentType = "text/watch-html; charset=utf-8";
        }
        if (this.mail.amp) {
          if (typeof this.mail.amp === "object" && (this.mail.amp.content || this.mail.amp.path || this.mail.amp.href || this.mail.amp.raw)) {
            amp = this.mail.amp;
          } else {
            amp = {
              content: this.mail.amp
            };
          }
          amp.contentType = "text/x-amp-html; charset=utf-8";
        }
        if (this.mail.icalEvent) {
          if (typeof this.mail.icalEvent === "object" && (this.mail.icalEvent.content || this.mail.icalEvent.path || this.mail.icalEvent.href || this.mail.icalEvent.raw)) {
            icalEvent = this.mail.icalEvent;
          } else {
            icalEvent = {
              content: this.mail.icalEvent
            };
          }
          eventObject = {};
          Object.keys(icalEvent).forEach((key) => {
            eventObject[key] = icalEvent[key];
          });
          if (eventObject.content && typeof eventObject.content === "object") {
            eventObject.content._resolve = true;
          }
          eventObject.filename = false;
          eventObject.contentType = "text/calendar; charset=utf-8; method=" + (eventObject.method || "PUBLISH").toString().trim().toUpperCase();
          if (!eventObject.headers) {
            eventObject.headers = {};
          }
        }
        if (this.mail.html) {
          if (typeof this.mail.html === "object" && (this.mail.html.content || this.mail.html.path || this.mail.html.href || this.mail.html.raw)) {
            html = this.mail.html;
          } else {
            html = {
              content: this.mail.html
            };
          }
          html.contentType = "text/html; charset=utf-8";
        }
        [].concat(text || []).concat(watchHtml || []).concat(amp || []).concat(html || []).concat(eventObject || []).concat(this.mail.alternatives || []).forEach((alternative) => {
          let data;
          if (/^data:/i.test(alternative.path || alternative.href)) {
            alternative = this._processDataUrl(alternative);
          }
          data = {
            contentType: alternative.contentType || mimeFuncs.detectMimeType(alternative.filename || alternative.path || alternative.href || "txt"),
            contentTransferEncoding: alternative.contentTransferEncoding
          };
          if (alternative.filename) {
            data.filename = alternative.filename;
          }
          if (/^https?:\/\//i.test(alternative.path)) {
            alternative.href = alternative.path;
            alternative.path = void 0;
          }
          if (alternative.raw) {
            data.raw = alternative.raw;
          } else if (alternative.path) {
            data.content = {
              path: alternative.path
            };
          } else if (alternative.href) {
            data.content = {
              href: alternative.href
            };
          } else {
            data.content = alternative.content || "";
          }
          if (alternative.encoding) {
            data.encoding = alternative.encoding;
          }
          if (alternative.headers) {
            data.headers = alternative.headers;
          }
          alternatives.push(data);
        });
        return alternatives;
      }
      _createMixed(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/mixed", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/mixed", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (this._useAlternative) {
          this._createAlternative(node);
        } else if (this._useRelated) {
          this._createRelated(node);
        }
        [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((element) => {
          if (!this._useRelated || element !== this._htmlNode) {
            this._createContentNode(node, element);
          }
        });
        return node;
      }
      _createAlternative(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode("multipart/alternative", {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild("multipart/alternative", {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._alternatives.forEach((alternative) => {
          if (this._useRelated && this._htmlNode === alternative) {
            this._createRelated(node);
          } else {
            this._createContentNode(node, alternative);
          }
        });
        return node;
      }
      _createRelated(parentNode) {
        let node;
        if (!parentNode) {
          node = new MimeNode('multipart/related; type="text/html"', {
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild('multipart/related; type="text/html"', {
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        this._createContentNode(node, this._htmlNode);
        this._attachments.related.forEach((alternative) => this._createContentNode(node, alternative));
        return node;
      }
      _createContentNode(parentNode, element) {
        element = element || {};
        element.content = element.content || "";
        let node;
        let encoding = (element.encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
        if (!parentNode) {
          node = new MimeNode(element.contentType, {
            filename: element.filename,
            baseBoundary: this.mail.baseBoundary,
            textEncoding: this.mail.textEncoding,
            boundaryPrefix: this.mail.boundaryPrefix,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        } else {
          node = parentNode.createChild(element.contentType, {
            filename: element.filename,
            textEncoding: this.mail.textEncoding,
            disableUrlAccess: this.mail.disableUrlAccess,
            disableFileAccess: this.mail.disableFileAccess,
            normalizeHeaderKey: this.mail.normalizeHeaderKey,
            newline: this.mail.newline
          });
        }
        if (element.headers) {
          node.addHeader(element.headers);
        }
        if (element.cid) {
          node.setHeader("Content-Id", "<" + element.cid.replace(/[<>]/g, "") + ">");
        }
        if (element.contentTransferEncoding) {
          node.setHeader("Content-Transfer-Encoding", element.contentTransferEncoding);
        } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
          node.setHeader("Content-Transfer-Encoding", this.mail.encoding);
        }
        if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
          node.setHeader("Content-Disposition", element.contentDisposition || (element.cid ? "inline" : "attachment"));
        }
        if (typeof element.content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
          element.content = Buffer.from(element.content, encoding);
        }
        if (element.raw) {
          node.setRaw(element.raw);
        } else {
          node.setContent(element.content);
        }
        return node;
      }
      _processDataUrl(element) {
        let parts = (element.path || element.href).match(/^data:((?:[^;]*;)*(?:[^,]*)),(.*)$/i);
        if (!parts) {
          return element;
        }
        element.content = /\bbase64$/i.test(parts[1]) ? Buffer.from(parts[2], "base64") : Buffer.from(decodeURIComponent(parts[2]));
        if ("path" in element) {
          element.path = false;
        }
        if ("href" in element) {
          element.href = false;
        }
        parts[1].split(";").forEach((item) => {
          if (/^\w+\/[^/]+$/i.test(item)) {
            element.contentType = element.contentType || item.toLowerCase();
          }
        });
        return element;
      }
    };
    module2.exports = MailComposer;
  }
});

// node_modules/nodemailer/lib/dkim/message-parser.js
var require_message_parser = __commonJS({
  "node_modules/nodemailer/lib/dkim/message-parser.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var MessageParser = class extends Transform {
      constructor(options2) {
        super(options2);
        this.lastBytes = Buffer.alloc(4);
        this.headersParsed = false;
        this.headerBytes = 0;
        this.headerChunks = [];
        this.rawHeaders = false;
        this.bodySize = 0;
      }
      updateLastBytes(data) {
        let lblen = this.lastBytes.length;
        let nblen = Math.min(data.length, lblen);
        for (let i = 0, len = lblen - nblen; i < len; i++) {
          this.lastBytes[i] = this.lastBytes[i + nblen];
        }
        for (let i = 1; i <= nblen; i++) {
          this.lastBytes[lblen - i] = data[data.length - i];
        }
      }
      checkHeaders(data) {
        if (this.headersParsed) {
          return true;
        }
        let lblen = this.lastBytes.length;
        let headerPos = 0;
        this.curLinePos = 0;
        for (let i = 0, len = this.lastBytes.length + data.length; i < len; i++) {
          let chr;
          if (i < lblen) {
            chr = this.lastBytes[i];
          } else {
            chr = data[i - lblen];
          }
          if (chr === 10 && i) {
            let pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
            let pr2 = i > 1 ? i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen] : false;
            if (pr1 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            } else if (pr1 === 13 && pr2 === 10) {
              this.headersParsed = true;
              headerPos = i - lblen + 1;
              this.headerBytes += headerPos;
              break;
            }
          }
        }
        if (this.headersParsed) {
          this.headerChunks.push(data.slice(0, headerPos));
          this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
          this.headerChunks = null;
          this.emit("headers", this.parseHeaders());
          if (data.length - 1 > headerPos) {
            let chunk = data.slice(headerPos);
            this.bodySize += chunk.length;
            setImmediate(() => this.push(chunk));
          }
          return false;
        } else {
          this.headerBytes += data.length;
          this.headerChunks.push(data);
        }
        this.updateLastBytes(data);
        return false;
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        let headersFound;
        try {
          headersFound = this.checkHeaders(chunk);
        } catch (E) {
          return callback(E);
        }
        if (headersFound) {
          this.bodySize += chunk.length;
          this.push(chunk);
        }
        setImmediate(callback);
      }
      _flush(callback) {
        if (this.headerChunks) {
          let chunk = Buffer.concat(this.headerChunks, this.headerBytes);
          this.bodySize += chunk.length;
          this.push(chunk);
          this.headerChunks = null;
        }
        callback();
      }
      parseHeaders() {
        let lines = (this.rawHeaders || "").toString().split(/\r?\n/);
        for (let i = lines.length - 1; i > 0; i--) {
          if (/^\s/.test(lines[i])) {
            lines[i - 1] += "\n" + lines[i];
            lines.splice(i, 1);
          }
        }
        return lines.filter((line) => line.trim()).map((line) => ({
          key: line.substr(0, line.indexOf(":")).trim().toLowerCase(),
          line
        }));
      }
    };
    module2.exports = MessageParser;
  }
});

// node_modules/nodemailer/lib/dkim/relaxed-body.js
var require_relaxed_body = __commonJS({
  "node_modules/nodemailer/lib/dkim/relaxed-body.js"(exports, module2) {
    "use strict";
    var Transform = require("stream").Transform;
    var crypto = require("crypto");
    var RelaxedBody = class extends Transform {
      constructor(options2) {
        super();
        options2 = options2 || {};
        this.chunkBuffer = [];
        this.chunkBufferLen = 0;
        this.bodyHash = crypto.createHash(options2.hashAlgo || "sha1");
        this.remainder = "";
        this.byteLength = 0;
        this.debug = options2.debug;
        this._debugBody = options2.debug ? [] : false;
      }
      updateHash(chunk) {
        let bodyStr;
        let nextRemainder = "";
        let state = "file";
        for (let i = chunk.length - 1; i >= 0; i--) {
          let c = chunk[i];
          if (state === "file" && (c === 10 || c === 13)) {
          } else if (state === "file" && (c === 9 || c === 32)) {
            state = "line";
          } else if (state === "line" && (c === 9 || c === 32)) {
          } else if (state === "file" || state === "line") {
            state = "body";
            if (i === chunk.length - 1) {
              break;
            }
          }
          if (i === 0) {
            if (state === "file" && (!this.remainder || /[\r\n]$/.test(this.remainder)) || state === "line" && (!this.remainder || /[ \t]$/.test(this.remainder))) {
              this.remainder += chunk.toString("binary");
              return;
            } else if (state === "line" || state === "file") {
              nextRemainder = chunk.toString("binary");
              chunk = false;
              break;
            }
          }
          if (state !== "body") {
            continue;
          }
          nextRemainder = chunk.slice(i + 1).toString("binary");
          chunk = chunk.slice(0, i + 1);
          break;
        }
        let needsFixing = !!this.remainder;
        if (chunk && !needsFixing) {
          for (let i = 0, len = chunk.length; i < len; i++) {
            if (i && chunk[i] === 10 && chunk[i - 1] !== 13) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 13 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (i && chunk[i] === 32 && chunk[i - 1] === 32) {
              needsFixing = true;
              break;
            } else if (chunk[i] === 9) {
              needsFixing = true;
              break;
            }
          }
        }
        if (needsFixing) {
          bodyStr = this.remainder + (chunk ? chunk.toString("binary") : "");
          this.remainder = nextRemainder;
          bodyStr = bodyStr.replace(/\r?\n/g, "\n").replace(/[ \t]*$/gm, "").replace(/[ \t]+/gm, " ").replace(/\n/g, "\r\n");
          chunk = Buffer.from(bodyStr, "binary");
        } else if (nextRemainder) {
          this.remainder = nextRemainder;
        }
        if (this.debug) {
          this._debugBody.push(chunk);
        }
        this.bodyHash.update(chunk);
      }
      _transform(chunk, encoding, callback) {
        if (!chunk || !chunk.length) {
          return callback();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk, encoding);
        }
        this.updateHash(chunk);
        this.byteLength += chunk.length;
        this.push(chunk);
        callback();
      }
      _flush(callback) {
        if (/[\r\n]$/.test(this.remainder) && this.byteLength > 2) {
          this.bodyHash.update(Buffer.from("\r\n"));
        }
        if (!this.byteLength) {
          this.push(Buffer.from("\r\n"));
        }
        this.emit("hash", this.bodyHash.digest("base64"), this.debug ? Buffer.concat(this._debugBody) : false);
        callback();
      }
    };
    module2.exports = RelaxedBody;
  }
});

// node_modules/nodemailer/lib/dkim/sign.js
var require_sign = __commonJS({
  "node_modules/nodemailer/lib/dkim/sign.js"(exports, module2) {
    "use strict";
    var punycode = require("punycode");
    var mimeFuncs = require_mime_funcs();
    var crypto = require("crypto");
    module2.exports = (headers, hashAlgo, bodyHash, options2) => {
      options2 = options2 || {};
      let defaultFieldNames = "From:Sender:Reply-To:Subject:Date:Message-ID:To:Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:Content-Description:Resent-Date:Resent-From:Resent-Sender:Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:List-Owner:List-Archive";
      let fieldNames = options2.headerFieldNames || defaultFieldNames;
      let canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options2.skipFields);
      let dkimHeader = generateDKIMHeader(options2.domainName, options2.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
      let signer, signature;
      canonicalizedHeaderData.headers += "dkim-signature:" + relaxedHeaderLine(dkimHeader);
      signer = crypto.createSign(("rsa-" + hashAlgo).toUpperCase());
      signer.update(canonicalizedHeaderData.headers);
      try {
        signature = signer.sign(options2.privateKey, "base64");
      } catch (E) {
        return false;
      }
      return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, "$&\r\n ").trim();
    };
    module2.exports.relaxedHeaders = relaxedHeaders;
    function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
      let dkim = [
        "v=1",
        "a=rsa-" + hashAlgo,
        "c=relaxed/relaxed",
        "d=" + punycode.toASCII(domainName),
        "q=dns/txt",
        "s=" + keySelector,
        "bh=" + bodyHash,
        "h=" + fieldNames
      ].join("; ");
      return mimeFuncs.foldLines("DKIM-Signature: " + dkim, 76) + ";\r\n b=";
    }
    function relaxedHeaders(headers, fieldNames, skipFields) {
      let includedFields = new Set();
      let skip = new Set();
      let headerFields = new Map();
      (skipFields || "").toLowerCase().split(":").forEach((field) => {
        skip.add(field.trim());
      });
      (fieldNames || "").toLowerCase().split(":").filter((field) => !skip.has(field.trim())).forEach((field) => {
        includedFields.add(field.trim());
      });
      for (let i = headers.length - 1; i >= 0; i--) {
        let line = headers[i];
        if (includedFields.has(line.key) && !headerFields.has(line.key)) {
          headerFields.set(line.key, relaxedHeaderLine(line.line));
        }
      }
      let headersList = [];
      let fields = [];
      includedFields.forEach((field) => {
        if (headerFields.has(field)) {
          fields.push(field);
          headersList.push(field + ":" + headerFields.get(field));
        }
      });
      return {
        headers: headersList.join("\r\n") + "\r\n",
        fieldNames: fields.join(":")
      };
    }
    function relaxedHeaderLine(line) {
      return line.substr(line.indexOf(":") + 1).replace(/\r?\n/g, "").replace(/\s+/g, " ").trim();
    }
  }
});

// node_modules/nodemailer/lib/dkim/index.js
var require_dkim = __commonJS({
  "node_modules/nodemailer/lib/dkim/index.js"(exports, module2) {
    "use strict";
    var MessageParser = require_message_parser();
    var RelaxedBody = require_relaxed_body();
    var sign = require_sign();
    var PassThrough2 = require("stream").PassThrough;
    var fs = require("fs");
    var path = require("path");
    var crypto = require("crypto");
    var DKIM_ALGO = "sha256";
    var MAX_MESSAGE_SIZE = 128 * 1024;
    var DKIMSigner = class {
      constructor(options2, keys, input, output) {
        this.options = options2 || {};
        this.keys = keys;
        this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
        this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
        this.cacheDir = this.options.cacheDir || false;
        this.chunks = [];
        this.chunklen = 0;
        this.readPos = 0;
        this.cachePath = this.cacheDir ? path.join(this.cacheDir, "message." + Date.now() + "-" + crypto.randomBytes(14).toString("hex")) : false;
        this.cache = false;
        this.headers = false;
        this.bodyHash = false;
        this.parser = false;
        this.relaxedBody = false;
        this.input = input;
        this.output = output;
        this.output.usingCache = false;
        this.errored = false;
        this.input.on("error", (err) => {
          this.errored = true;
          this.cleanup();
          output.emit("error", err);
        });
      }
      cleanup() {
        if (!this.cache || !this.cachePath) {
          return;
        }
        fs.unlink(this.cachePath, () => false);
      }
      createReadCache() {
        this.cache = fs.createReadStream(this.cachePath);
        this.cache.once("error", (err) => {
          this.cleanup();
          this.output.emit("error", err);
        });
        this.cache.once("close", () => {
          this.cleanup();
        });
        this.cache.pipe(this.output);
      }
      sendNextChunk() {
        if (this.errored) {
          return;
        }
        if (this.readPos >= this.chunks.length) {
          if (!this.cache) {
            return this.output.end();
          }
          return this.createReadCache();
        }
        let chunk = this.chunks[this.readPos++];
        if (this.output.write(chunk) === false) {
          return this.output.once("drain", () => {
            this.sendNextChunk();
          });
        }
        setImmediate(() => this.sendNextChunk());
      }
      sendSignedOutput() {
        let keyPos = 0;
        let signNextKey = () => {
          if (keyPos >= this.keys.length) {
            this.output.write(this.parser.rawHeaders);
            return setImmediate(() => this.sendNextChunk());
          }
          let key = this.keys[keyPos++];
          let dkimField = sign(this.headers, this.hashAlgo, this.bodyHash, {
            domainName: key.domainName,
            keySelector: key.keySelector,
            privateKey: key.privateKey,
            headerFieldNames: this.options.headerFieldNames,
            skipFields: this.options.skipFields
          });
          if (dkimField) {
            this.output.write(Buffer.from(dkimField + "\r\n"));
          }
          return setImmediate(signNextKey);
        };
        if (this.bodyHash && this.headers) {
          return signNextKey();
        }
        this.output.write(this.parser.rawHeaders);
        this.sendNextChunk();
      }
      createWriteCache() {
        this.output.usingCache = true;
        this.cache = fs.createWriteStream(this.cachePath);
        this.cache.once("error", (err) => {
          this.cleanup();
          this.relaxedBody.unpipe(this.cache);
          this.relaxedBody.on("readable", () => {
            while (this.relaxedBody.read() !== null) {
            }
          });
          this.errored = true;
          this.output.emit("error", err);
        });
        this.cache.once("close", () => {
          this.sendSignedOutput();
        });
        this.relaxedBody.removeAllListeners("readable");
        this.relaxedBody.pipe(this.cache);
      }
      signStream() {
        this.parser = new MessageParser();
        this.relaxedBody = new RelaxedBody({
          hashAlgo: this.hashAlgo
        });
        this.parser.on("headers", (value) => {
          this.headers = value;
        });
        this.relaxedBody.on("hash", (value) => {
          this.bodyHash = value;
        });
        this.relaxedBody.on("readable", () => {
          let chunk;
          if (this.cache) {
            return;
          }
          while ((chunk = this.relaxedBody.read()) !== null) {
            this.chunks.push(chunk);
            this.chunklen += chunk.length;
            if (this.chunklen >= this.cacheTreshold && this.cachePath) {
              return this.createWriteCache();
            }
          }
        });
        this.relaxedBody.on("end", () => {
          if (this.cache) {
            return;
          }
          this.sendSignedOutput();
        });
        this.parser.pipe(this.relaxedBody);
        setImmediate(() => this.input.pipe(this.parser));
      }
    };
    var DKIM = class {
      constructor(options2) {
        this.options = options2 || {};
        this.keys = [].concat(this.options.keys || {
          domainName: options2.domainName,
          keySelector: options2.keySelector,
          privateKey: options2.privateKey
        });
      }
      sign(input, extraOptions) {
        let output = new PassThrough2();
        let inputStream = input;
        let writeValue = false;
        if (Buffer.isBuffer(input)) {
          writeValue = input;
          inputStream = new PassThrough2();
        } else if (typeof input === "string") {
          writeValue = Buffer.from(input);
          inputStream = new PassThrough2();
        }
        let options2 = this.options;
        if (extraOptions && Object.keys(extraOptions).length) {
          options2 = {};
          Object.keys(this.options || {}).forEach((key) => {
            options2[key] = this.options[key];
          });
          Object.keys(extraOptions || {}).forEach((key) => {
            if (!(key in options2)) {
              options2[key] = extraOptions[key];
            }
          });
        }
        let signer = new DKIMSigner(options2, this.keys, inputStream, output);
        setImmediate(() => {
          signer.signStream();
          if (writeValue) {
            setImmediate(() => {
              inputStream.end(writeValue);
            });
          }
        });
        return output;
      }
    };
    module2.exports = DKIM;
  }
});

// node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js
var require_http_proxy_client = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/http-proxy-client.js"(exports, module2) {
    "use strict";
    var net = require("net");
    var tls = require("tls");
    var urllib = require("url");
    function httpProxyClient(proxyUrl, destinationPort, destinationHost, callback) {
      let proxy = urllib.parse(proxyUrl);
      let options2;
      let connect;
      let socket;
      options2 = {
        host: proxy.hostname,
        port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === "https:" ? 443 : 80
      };
      if (proxy.protocol === "https:") {
        options2.rejectUnauthorized = false;
        connect = tls.connect.bind(tls);
      } else {
        connect = net.connect.bind(net);
      }
      let finished = false;
      let tempSocketErr = function(err) {
        if (finished) {
          return;
        }
        finished = true;
        try {
          socket.destroy();
        } catch (E) {
        }
        callback(err);
      };
      socket = connect(options2, () => {
        if (finished) {
          return;
        }
        let reqHeaders = {
          Host: destinationHost + ":" + destinationPort,
          Connection: "close"
        };
        if (proxy.auth) {
          reqHeaders["Proxy-Authorization"] = "Basic " + Buffer.from(proxy.auth).toString("base64");
        }
        socket.write("CONNECT " + destinationHost + ":" + destinationPort + " HTTP/1.1\r\n" + Object.keys(reqHeaders).map((key) => key + ": " + reqHeaders[key]).join("\r\n") + "\r\n\r\n");
        let headers = "";
        let onSocketData = (chunk) => {
          let match;
          let remainder;
          if (finished) {
            return;
          }
          headers += chunk.toString("binary");
          if (match = headers.match(/\r\n\r\n/)) {
            socket.removeListener("data", onSocketData);
            remainder = headers.substr(match.index + match[0].length);
            headers = headers.substr(0, match.index);
            if (remainder) {
              socket.unshift(Buffer.from(remainder, "binary"));
            }
            finished = true;
            match = headers.match(/^HTTP\/\d+\.\d+ (\d+)/i);
            if (!match || (match[1] || "").charAt(0) !== "2") {
              try {
                socket.destroy();
              } catch (E) {
              }
              return callback(new Error("Invalid response from proxy" + (match && ": " + match[1] || "")));
            }
            socket.removeListener("error", tempSocketErr);
            return callback(null, socket);
          }
        };
        socket.on("data", onSocketData);
      });
      socket.once("error", tempSocketErr);
    }
    module2.exports = httpProxyClient;
  }
});

// node_modules/nodemailer/lib/mailer/mail-message.js
var require_mail_message = __commonJS({
  "node_modules/nodemailer/lib/mailer/mail-message.js"(exports, module2) {
    "use strict";
    var shared = require_shared();
    var MimeNode = require_mime_node();
    var mimeFuncs = require_mime_funcs();
    var MailMessage = class {
      constructor(mailer, data) {
        this.mailer = mailer;
        this.data = {};
        this.message = null;
        data = data || {};
        let options2 = mailer.options || {};
        let defaults = mailer._defaults || {};
        Object.keys(data).forEach((key) => {
          this.data[key] = data[key];
        });
        this.data.headers = this.data.headers || {};
        Object.keys(defaults).forEach((key) => {
          if (!(key in this.data)) {
            this.data[key] = defaults[key];
          } else if (key === "headers") {
            Object.keys(defaults.headers).forEach((key2) => {
              if (!(key2 in this.data.headers)) {
                this.data.headers[key2] = defaults.headers[key2];
              }
            });
          }
        });
        ["disableFileAccess", "disableUrlAccess", "normalizeHeaderKey"].forEach((key) => {
          if (key in options2) {
            this.data[key] = options2[key];
          }
        });
      }
      resolveContent(...args) {
        return shared.resolveContent(...args);
      }
      resolveAll(callback) {
        let keys = [
          [this.data, "html"],
          [this.data, "text"],
          [this.data, "watchHtml"],
          [this.data, "amp"],
          [this.data, "icalEvent"]
        ];
        if (this.data.alternatives && this.data.alternatives.length) {
          this.data.alternatives.forEach((alternative, i) => {
            keys.push([this.data.alternatives, i]);
          });
        }
        if (this.data.attachments && this.data.attachments.length) {
          this.data.attachments.forEach((attachment, i) => {
            if (!attachment.filename) {
              attachment.filename = (attachment.path || attachment.href || "").split("/").pop().split("?").shift() || "attachment-" + (i + 1);
              if (attachment.filename.indexOf(".") < 0) {
                attachment.filename += "." + mimeFuncs.detectExtension(attachment.contentType);
              }
            }
            if (!attachment.contentType) {
              attachment.contentType = mimeFuncs.detectMimeType(attachment.filename || attachment.path || attachment.href || "bin");
            }
            keys.push([this.data.attachments, i]);
          });
        }
        let mimeNode = new MimeNode();
        let addressKeys = ["from", "to", "cc", "bcc", "sender", "replyTo"];
        addressKeys.forEach((address) => {
          let value;
          if (this.message) {
            value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === "replyTo" ? "reply-to" : address)) || []);
          } else if (this.data[address]) {
            value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
          }
          if (value && value.length) {
            this.data[address] = value;
          } else if (address in this.data) {
            this.data[address] = null;
          }
        });
        let singleKeys = ["from", "sender", "replyTo"];
        singleKeys.forEach((address) => {
          if (this.data[address]) {
            this.data[address] = this.data[address].shift();
          }
        });
        let pos = 0;
        let resolveNext = () => {
          if (pos >= keys.length) {
            return callback(null, this.data);
          }
          let args = keys[pos++];
          if (!args[0] || !args[0][args[1]]) {
            return resolveNext();
          }
          shared.resolveContent(...args, (err, value) => {
            if (err) {
              return callback(err);
            }
            let node = {
              content: value
            };
            if (args[0][args[1]] && typeof args[0][args[1]] === "object" && !Buffer.isBuffer(args[0][args[1]])) {
              Object.keys(args[0][args[1]]).forEach((key) => {
                if (!(key in node) && !["content", "path", "href", "raw"].includes(key)) {
                  node[key] = args[0][args[1]][key];
                }
              });
            }
            args[0][args[1]] = node;
            resolveNext();
          });
        };
        setImmediate(() => resolveNext());
      }
      normalize(callback) {
        let envelope = this.data.envelope || this.message.getEnvelope();
        let messageId = this.message.messageId();
        this.resolveAll((err, data) => {
          if (err) {
            return callback(err);
          }
          data.envelope = envelope;
          data.messageId = messageId;
          ["html", "text", "watchHtml", "amp"].forEach((key) => {
            if (data[key] && data[key].content) {
              if (typeof data[key].content === "string") {
                data[key] = data[key].content;
              } else if (Buffer.isBuffer(data[key].content)) {
                data[key] = data[key].content.toString();
              }
            }
          });
          if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
            data.icalEvent.content = data.icalEvent.content.toString("base64");
            data.icalEvent.encoding = "base64";
          }
          if (data.alternatives && data.alternatives.length) {
            data.alternatives.forEach((alternative) => {
              if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
                alternative.content = alternative.content.toString("base64");
                alternative.encoding = "base64";
              }
            });
          }
          if (data.attachments && data.attachments.length) {
            data.attachments.forEach((attachment) => {
              if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
                attachment.content = attachment.content.toString("base64");
                attachment.encoding = "base64";
              }
            });
          }
          data.normalizedHeaders = {};
          Object.keys(data.headers || {}).forEach((key) => {
            let value = [].concat(data.headers[key] || []).shift();
            value = value && value.value || value;
            if (value) {
              if (["references", "in-reply-to", "message-id", "content-id"].includes(key)) {
                value = this.message._encodeHeaderValue(key, value);
              }
              data.normalizedHeaders[key] = value;
            }
          });
          if (data.list && typeof data.list === "object") {
            let listHeaders = this._getListHeaders(data.list);
            listHeaders.forEach((entry) => {
              data.normalizedHeaders[entry.key] = entry.value.map((val) => val && val.value || val).join(", ");
            });
          }
          if (data.references) {
            data.normalizedHeaders.references = this.message._encodeHeaderValue("references", data.references);
          }
          if (data.inReplyTo) {
            data.normalizedHeaders["in-reply-to"] = this.message._encodeHeaderValue("in-reply-to", data.inReplyTo);
          }
          return callback(null, data);
        });
      }
      setMailerHeader() {
        if (!this.message || !this.data.xMailer) {
          return;
        }
        this.message.setHeader("X-Mailer", this.data.xMailer);
      }
      setPriorityHeaders() {
        if (!this.message || !this.data.priority) {
          return;
        }
        switch ((this.data.priority || "").toString().toLowerCase()) {
          case "high":
            this.message.setHeader("X-Priority", "1 (Highest)");
            this.message.setHeader("X-MSMail-Priority", "High");
            this.message.setHeader("Importance", "High");
            break;
          case "low":
            this.message.setHeader("X-Priority", "5 (Lowest)");
            this.message.setHeader("X-MSMail-Priority", "Low");
            this.message.setHeader("Importance", "Low");
            break;
          default:
        }
      }
      setListHeaders() {
        if (!this.message || !this.data.list || typeof this.data.list !== "object") {
          return;
        }
        if (this.data.list && typeof this.data.list === "object") {
          this._getListHeaders(this.data.list).forEach((listHeader) => {
            listHeader.value.forEach((value) => {
              this.message.addHeader(listHeader.key, value);
            });
          });
        }
      }
      _getListHeaders(listData) {
        return Object.keys(listData).map((key) => ({
          key: "list-" + key.toLowerCase().trim(),
          value: [].concat(listData[key] || []).map((value) => ({
            prepared: true,
            foldLines: true,
            value: [].concat(value || []).map((value2) => {
              if (typeof value2 === "string") {
                value2 = {
                  url: value2
                };
              }
              if (value2 && value2.url) {
                if (key.toLowerCase().trim() === "id") {
                  let comment2 = value2.comment || "";
                  if (mimeFuncs.isPlainText(comment2)) {
                    comment2 = '"' + comment2 + '"';
                  } else {
                    comment2 = mimeFuncs.encodeWord(comment2);
                  }
                  return (value2.comment ? comment2 + " " : "") + this._formatListUrl(value2.url).replace(/^<[^:]+\/{,2}/, "");
                }
                let comment = value2.comment || "";
                if (!mimeFuncs.isPlainText(comment)) {
                  comment = mimeFuncs.encodeWord(comment);
                }
                return this._formatListUrl(value2.url) + (value2.comment ? " (" + comment + ")" : "");
              }
              return "";
            }).filter((value2) => value2).join(", ")
          }))
        }));
      }
      _formatListUrl(url2) {
        url2 = url2.replace(/[\s<]+|[\s>]+/g, "");
        if (/^(https?|mailto|ftp):/.test(url2)) {
          return "<" + url2 + ">";
        }
        if (/^[^@]+@[^@]+$/.test(url2)) {
          return "<mailto:" + url2 + ">";
        }
        return "<http://" + url2 + ">";
      }
    };
    module2.exports = MailMessage;
  }
});

// node_modules/nodemailer/lib/mailer/index.js
var require_mailer = __commonJS({
  "node_modules/nodemailer/lib/mailer/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var shared = require_shared();
    var mimeTypes = require_mime_types();
    var MailComposer = require_mail_composer();
    var DKIM = require_dkim();
    var httpProxyClient = require_http_proxy_client();
    var util = require("util");
    var urllib = require("url");
    var packageData = require_package();
    var MailMessage = require_mail_message();
    var net = require("net");
    var dns = require("dns");
    var crypto = require("crypto");
    var Mail = class extends EventEmitter {
      constructor(transporter, options2, defaults) {
        super();
        this.options = options2 || {};
        this._defaults = defaults || {};
        this._defaultPlugins = {
          compile: [(...args) => this._convertDataImages(...args)],
          stream: []
        };
        this._userPlugins = {
          compile: [],
          stream: []
        };
        this.meta = new Map();
        this.dkim = this.options.dkim ? new DKIM(this.options.dkim) : false;
        this.transporter = transporter;
        this.transporter.mailer = this;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "mail"
        });
        this.logger.debug({
          tnx: "create"
        }, "Creating transport: %s", this.getVersionString());
        if (typeof this.transporter.on === "function") {
          this.transporter.on("log", (log) => {
            this.logger.debug({
              tnx: "transport"
            }, "%s: %s", log.type, log.message);
          });
          this.transporter.on("error", (err) => {
            this.logger.error({
              err,
              tnx: "transport"
            }, "Transport Error: %s", err.message);
            this.emit("error", err);
          });
          this.transporter.on("idle", (...args) => {
            this.emit("idle", ...args);
          });
        }
        ["close", "isIdle", "verify"].forEach((method) => {
          this[method] = (...args) => {
            if (typeof this.transporter[method] === "function") {
              return this.transporter[method](...args);
            } else {
              this.logger.warn({
                tnx: "transport",
                methodName: method
              }, "Non existing method %s called for transport", method);
              return false;
            }
          };
        });
        if (this.options.proxy && typeof this.options.proxy === "string") {
          this.setupProxy(this.options.proxy);
        }
      }
      use(step, plugin) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          this._userPlugins[step] = [plugin];
        } else {
          this._userPlugins[step].push(plugin);
        }
        return this;
      }
      sendMail(data, callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve2, reject) => {
            callback = shared.callbackPromise(resolve2, reject);
          });
        }
        if (typeof this.getSocket === "function") {
          this.transporter.getSocket = this.getSocket;
          this.getSocket = false;
        }
        let mail = new MailMessage(this, data);
        this.logger.debug({
          tnx: "transport",
          name: this.transporter.name,
          version: this.transporter.version,
          action: "send"
        }, "Sending mail using %s/%s", this.transporter.name, this.transporter.version);
        this._processPlugins("compile", mail, (err) => {
          if (err) {
            this.logger.error({
              err,
              tnx: "plugin",
              action: "compile"
            }, "PluginCompile Error: %s", err.message);
            return callback(err);
          }
          mail.message = new MailComposer(mail.data).compile();
          mail.setMailerHeader();
          mail.setPriorityHeaders();
          mail.setListHeaders();
          this._processPlugins("stream", mail, (err2) => {
            if (err2) {
              this.logger.error({
                err: err2,
                tnx: "plugin",
                action: "stream"
              }, "PluginStream Error: %s", err2.message);
              return callback(err2);
            }
            if (mail.data.dkim || this.dkim) {
              mail.message.processFunc((input) => {
                let dkim = mail.data.dkim ? new DKIM(mail.data.dkim) : this.dkim;
                this.logger.debug({
                  tnx: "DKIM",
                  messageId: mail.message.messageId(),
                  dkimDomains: dkim.keys.map((key) => key.keySelector + "." + key.domainName).join(", ")
                }, "Signing outgoing message with %s keys", dkim.keys.length);
                return dkim.sign(input, mail.data._dkim);
              });
            }
            this.transporter.send(mail, (...args) => {
              if (args[0]) {
                this.logger.error({
                  err: args[0],
                  tnx: "transport",
                  action: "send"
                }, "Send Error: %s", args[0].message);
              }
              callback(...args);
            });
          });
        });
        return promise;
      }
      getVersionString() {
        return util.format("%s (%s; +%s; %s/%s)", packageData.name, packageData.version, packageData.homepage, this.transporter.name, this.transporter.version);
      }
      _processPlugins(step, mail, callback) {
        step = (step || "").toString();
        if (!this._userPlugins.hasOwnProperty(step)) {
          return callback();
        }
        let userPlugins = this._userPlugins[step] || [];
        let defaultPlugins = this._defaultPlugins[step] || [];
        if (userPlugins.length) {
          this.logger.debug({
            tnx: "transaction",
            pluginCount: userPlugins.length,
            step
          }, "Using %s plugins for %s", userPlugins.length, step);
        }
        if (userPlugins.length + defaultPlugins.length === 0) {
          return callback();
        }
        let pos = 0;
        let block = "default";
        let processPlugins = () => {
          let curplugins = block === "default" ? defaultPlugins : userPlugins;
          if (pos >= curplugins.length) {
            if (block === "default" && userPlugins.length) {
              block = "user";
              pos = 0;
              curplugins = userPlugins;
            } else {
              return callback();
            }
          }
          let plugin = curplugins[pos++];
          plugin(mail, (err) => {
            if (err) {
              return callback(err);
            }
            processPlugins();
          });
        };
        processPlugins();
      }
      setupProxy(proxyUrl) {
        let proxy = urllib.parse(proxyUrl);
        this.getSocket = (options2, callback) => {
          let protocol = proxy.protocol.replace(/:$/, "").toLowerCase();
          if (this.meta.has("proxy_handler_" + protocol)) {
            return this.meta.get("proxy_handler_" + protocol)(proxy, options2, callback);
          }
          switch (protocol) {
            case "http":
            case "https":
              httpProxyClient(proxy.href, options2.port, options2.host, (err, socket) => {
                if (err) {
                  return callback(err);
                }
                return callback(null, {
                  connection: socket
                });
              });
              return;
            case "socks":
            case "socks5":
            case "socks4":
            case "socks4a": {
              if (!this.meta.has("proxy_socks_module")) {
                return callback(new Error("Socks module not loaded"));
              }
              let connect = (ipaddress) => {
                let proxyV2 = !!this.meta.get("proxy_socks_module").SocksClient;
                let socksClient = proxyV2 ? this.meta.get("proxy_socks_module").SocksClient : this.meta.get("proxy_socks_module");
                let proxyType = Number(proxy.protocol.replace(/\D/g, "")) || 5;
                let connectionOpts = {
                  proxy: {
                    ipaddress,
                    port: Number(proxy.port),
                    type: proxyType
                  },
                  [proxyV2 ? "destination" : "target"]: {
                    host: options2.host,
                    port: options2.port
                  },
                  command: "connect"
                };
                if (proxy.auth) {
                  let username = decodeURIComponent(proxy.auth.split(":").shift());
                  let password = decodeURIComponent(proxy.auth.split(":").pop());
                  if (proxyV2) {
                    connectionOpts.proxy.userId = username;
                    connectionOpts.proxy.password = password;
                  } else if (proxyType === 4) {
                    connectionOpts.userid = username;
                  } else {
                    connectionOpts.authentication = {
                      username,
                      password
                    };
                  }
                }
                socksClient.createConnection(connectionOpts, (err, info) => {
                  if (err) {
                    return callback(err);
                  }
                  return callback(null, {
                    connection: info.socket || info
                  });
                });
              };
              if (net.isIP(proxy.hostname)) {
                return connect(proxy.hostname);
              }
              return dns.resolve(proxy.hostname, (err, address) => {
                if (err) {
                  return callback(err);
                }
                connect(Array.isArray(address) ? address[0] : address);
              });
            }
          }
          callback(new Error("Unknown proxy configuration"));
        };
      }
      _convertDataImages(mail, callback) {
        if (!this.options.attachDataUrls && !mail.data.attachDataUrls || !mail.data.html) {
          return callback();
        }
        mail.resolveContent(mail.data, "html", (err, html) => {
          if (err) {
            return callback(err);
          }
          let cidCounter = 0;
          html = (html || "").toString().replace(/(<img\b[^>]* src\s*=[\s"']*)(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
            let cid = crypto.randomBytes(10).toString("hex") + "@localhost";
            if (!mail.data.attachments) {
              mail.data.attachments = [];
            }
            if (!Array.isArray(mail.data.attachments)) {
              mail.data.attachments = [].concat(mail.data.attachments || []);
            }
            mail.data.attachments.push({
              path: dataUri,
              cid,
              filename: "image-" + ++cidCounter + "." + mimeTypes.detectExtension(mimeType)
            });
            return prefix + "cid:" + cid;
          });
          mail.data.html = html;
          callback();
        });
      }
      set(key, value) {
        return this.meta.set(key, value);
      }
      get(key) {
        return this.meta.get(key);
      }
    };
    module2.exports = Mail;
  }
});

// node_modules/nodemailer/lib/smtp-connection/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/data-stream.js"(exports, module2) {
    "use strict";
    var stream = require("stream");
    var Transform = stream.Transform;
    var DataStream = class extends Transform {
      constructor(options2) {
        super(options2);
        this.options = options2 || {};
        this._curLine = "";
        this.inByteCount = 0;
        this.outByteCount = 0;
        this.lastByte = false;
      }
      _transform(chunk, encoding, done) {
        let chunks = [];
        let chunklen = 0;
        let i, len, lastPos = 0;
        let buf;
        if (!chunk || !chunk.length) {
          return done();
        }
        if (typeof chunk === "string") {
          chunk = Buffer.from(chunk);
        }
        this.inByteCount += chunk.length;
        for (i = 0, len = chunk.length; i < len; i++) {
          if (chunk[i] === 46) {
            if (i && chunk[i - 1] === 10 || !i && (!this.lastByte || this.lastByte === 10)) {
              buf = chunk.slice(lastPos, i + 1);
              chunks.push(buf);
              chunks.push(Buffer.from("."));
              chunklen += buf.length + 1;
              lastPos = i + 1;
            }
          } else if (chunk[i] === 10) {
            if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
              if (i > lastPos) {
                buf = chunk.slice(lastPos, i);
                chunks.push(buf);
                chunklen += buf.length + 2;
              } else {
                chunklen += 2;
              }
              chunks.push(Buffer.from("\r\n"));
              lastPos = i + 1;
            }
          }
        }
        if (chunklen) {
          if (lastPos < chunk.length) {
            buf = chunk.slice(lastPos);
            chunks.push(buf);
            chunklen += buf.length;
          }
          this.outByteCount += chunklen;
          this.push(Buffer.concat(chunks, chunklen));
        } else {
          this.outByteCount += chunk.length;
          this.push(chunk);
        }
        this.lastByte = chunk[chunk.length - 1];
        done();
      }
      _flush(done) {
        let buf;
        if (this.lastByte === 10) {
          buf = Buffer.from(".\r\n");
        } else if (this.lastByte === 13) {
          buf = Buffer.from("\n.\r\n");
        } else {
          buf = Buffer.from("\r\n.\r\n");
        }
        this.outByteCount += buf.length;
        this.push(buf);
        done();
      }
    };
    module2.exports = DataStream;
  }
});

// node_modules/nodemailer/lib/smtp-connection/index.js
var require_smtp_connection = __commonJS({
  "node_modules/nodemailer/lib/smtp-connection/index.js"(exports, module2) {
    "use strict";
    var packageInfo = require_package();
    var EventEmitter = require("events").EventEmitter;
    var net = require("net");
    var tls = require("tls");
    var os = require("os");
    var crypto = require("crypto");
    var DataStream = require_data_stream();
    var PassThrough2 = require("stream").PassThrough;
    var shared = require_shared();
    var CONNECTION_TIMEOUT = 2 * 60 * 1e3;
    var SOCKET_TIMEOUT = 10 * 60 * 1e3;
    var GREETING_TIMEOUT = 30 * 1e3;
    var SMTPConnection = class extends EventEmitter {
      constructor(options2) {
        super(options2);
        this.id = crypto.randomBytes(8).toString("base64").replace(/\W/g, "");
        this.stage = "init";
        this.options = options2 || {};
        this.secureConnection = !!this.options.secure;
        this.alreadySecured = !!this.options.secured;
        this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
        this.host = this.options.host || "localhost";
        if (typeof this.options.secure === "undefined" && this.port === 465) {
          this.secureConnection = true;
        }
        this.name = this.options.name || this._getHostname();
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-connection",
          sid: this.id
        });
        this.customAuth = new Map();
        Object.keys(this.options.customAuth || {}).forEach((key) => {
          let mapKey = (key || "").toString().trim().toUpperCase();
          if (!mapKey) {
            return;
          }
          this.customAuth.set(mapKey, this.options.customAuth[key]);
        });
        this.version = packageInfo.version;
        this.authenticated = false;
        this.destroyed = false;
        this.secure = !!this.secureConnection;
        this._remainder = "";
        this._responseQueue = [];
        this.lastServerResponse = false;
        this._socket = false;
        this._supportedAuth = [];
        this.allowsAuth = false;
        this._envelope = false;
        this._supportedExtensions = [];
        this._maxAllowedSize = 0;
        this._responseActions = [];
        this._recipientQueue = [];
        this._greetingTimeout = false;
        this._connectionTimeout = false;
        this._destroyed = false;
        this._closing = false;
        this._onSocketData = (chunk) => this._onData(chunk);
        this._onSocketError = (error3) => this._onError(error3, "ESOCKET", false, "CONN");
        this._onSocketClose = () => this._onClose();
        this._onSocketEnd = () => this._onEnd();
        this._onSocketTimeout = () => this._onTimeout();
      }
      connect(connectCallback) {
        if (typeof connectCallback === "function") {
          this.once("connect", () => {
            this.logger.debug({
              tnx: "smtp"
            }, "SMTP handshake finished");
            connectCallback();
          });
          const isDestroyedMessage = this._isDestroyedMessage("connect");
          if (isDestroyedMessage) {
            return connectCallback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "CONN"));
          }
        }
        let opts = {
          port: this.port,
          host: this.host
        };
        if (this.options.localAddress) {
          opts.localAddress = this.options.localAddress;
        }
        let setupConnectionHandlers = () => {
          this._connectionTimeout = setTimeout(() => {
            this._onError("Connection timeout", "ETIMEDOUT", false, "CONN");
          }, this.options.connectionTimeout || CONNECTION_TIMEOUT);
          this._socket.on("error", this._onSocketError);
        };
        if (this.options.connection) {
          this._socket = this.options.connection;
          if (this.secureConnection && !this.alreadySecured) {
            setImmediate(() => this._upgradeConnection((err) => {
              if (err) {
                this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "CONN");
                return;
              }
              this._onConnect();
            }));
          } else {
            setImmediate(() => this._onConnect());
          }
          return;
        } else if (this.options.socket) {
          this._socket = this.options.socket;
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug({
              tnx: "dns",
              source: opts.host,
              resolved: resolved.host,
              cached: !!resolved._cached
            }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved._cached ? "hit" : "miss");
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            try {
              this._socket.connect(this.port, this.host, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        } else if (this.secureConnection) {
          if (this.options.tls) {
            Object.keys(this.options.tls).forEach((key) => {
              opts[key] = this.options.tls[key];
            });
          }
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug({
              tnx: "dns",
              source: opts.host,
              resolved: resolved.host,
              cached: !!resolved._cached
            }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved._cached ? "hit" : "miss");
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            try {
              this._socket = tls.connect(opts, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        } else {
          return shared.resolveHostname(opts, (err, resolved) => {
            if (err) {
              return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
            }
            this.logger.debug({
              tnx: "dns",
              source: opts.host,
              resolved: resolved.host,
              cached: !!resolved._cached
            }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved._cached ? "hit" : "miss");
            Object.keys(resolved).forEach((key) => {
              if (key.charAt(0) !== "_" && resolved[key]) {
                opts[key] = resolved[key];
              }
            });
            try {
              this._socket = net.connect(opts, () => {
                this._socket.setKeepAlive(true);
                this._onConnect();
              });
              setupConnectionHandlers();
            } catch (E) {
              return setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
            }
          });
        }
      }
      quit() {
        this._sendCommand("QUIT");
        this._responseActions.push(this.close);
      }
      close() {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        this._responseActions = [];
        if (this._closing) {
          return;
        }
        this._closing = true;
        let closeMethod = "end";
        if (this.stage === "init") {
          closeMethod = "destroy";
        }
        this.logger.debug({
          tnx: "smtp"
        }, 'Closing connection to the server using "%s"', closeMethod);
        let socket = this._socket && this._socket.socket || this._socket;
        if (socket && !socket.destroyed) {
          try {
            this._socket[closeMethod]();
          } catch (E) {
          }
        }
        this._destroy();
      }
      login(authData, callback) {
        const isDestroyedMessage = this._isDestroyedMessage("login");
        if (isDestroyedMessage) {
          return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        this._auth = authData || {};
        this._authMethod = (this._auth.method || "").toString().trim().toUpperCase() || false;
        if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
          this._authMethod = "XOAUTH2";
        } else if (!this._authMethod || this._authMethod === "XOAUTH2" && !this._auth.oauth2) {
          this._authMethod = (this._supportedAuth[0] || "PLAIN").toUpperCase().trim();
        }
        if (this._authMethod !== "XOAUTH2" && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
          if (this._auth.user && this._auth.pass) {
            this._auth.credentials = {
              user: this._auth.user,
              pass: this._auth.pass,
              options: this._auth.options
            };
          } else {
            return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', "EAUTH", false, "API"));
          }
        }
        if (this.customAuth.has(this._authMethod)) {
          let handler = this.customAuth.get(this._authMethod);
          let lastResponse;
          let returned = false;
          let resolve2 = () => {
            if (returned) {
              return;
            }
            returned = true;
            this.logger.info({
              tnx: "smtp",
              username: this._auth.user,
              action: "authenticated",
              method: this._authMethod
            }, "User %s authenticated", JSON.stringify(this._auth.user));
            this.authenticated = true;
            callback(null, true);
          };
          let reject = (err) => {
            if (returned) {
              return;
            }
            returned = true;
            callback(this._formatError(err, "EAUTH", lastResponse, "AUTH " + this._authMethod));
          };
          let handlerResponse = handler({
            auth: this._auth,
            method: this._authMethod,
            extensions: [].concat(this._supportedExtensions),
            authMethods: [].concat(this._supportedAuth),
            maxAllowedSize: this._maxAllowedSize || false,
            sendCommand: (cmd, done) => {
              let promise;
              if (!done) {
                promise = new Promise((resolve3, reject2) => {
                  done = shared.callbackPromise(resolve3, reject2);
                });
              }
              this._responseActions.push((str) => {
                lastResponse = str;
                let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
                let data = {
                  command: cmd,
                  response: str
                };
                if (codes) {
                  data.status = Number(codes[1]) || 0;
                  if (codes[2]) {
                    data.code = codes[2];
                  }
                  data.text = str.substr(codes[0].length);
                } else {
                  data.text = str;
                  data.status = 0;
                }
                done(null, data);
              });
              setImmediate(() => this._sendCommand(cmd));
              return promise;
            },
            resolve: resolve2,
            reject
          });
          if (handlerResponse && typeof handlerResponse.catch === "function") {
            handlerResponse.then(resolve2).catch(reject);
          }
          return;
        }
        switch (this._authMethod) {
          case "XOAUTH2":
            this._handleXOauth2Token(false, callback);
            return;
          case "LOGIN":
            this._responseActions.push((str) => {
              this._actionAUTH_LOGIN_USER(str, callback);
            });
            this._sendCommand("AUTH LOGIN");
            return;
          case "PLAIN":
            this._responseActions.push((str) => {
              this._actionAUTHComplete(str, callback);
            });
            this._sendCommand("AUTH PLAIN " + Buffer.from("\0" + this._auth.credentials.user + "\0" + this._auth.credentials.pass, "utf-8").toString("base64"));
            return;
          case "CRAM-MD5":
            this._responseActions.push((str) => {
              this._actionAUTH_CRAM_MD5(str, callback);
            });
            this._sendCommand("AUTH CRAM-MD5");
            return;
        }
        return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', "EAUTH", false, "API"));
      }
      send(envelope, message2, done) {
        if (!message2) {
          return done(this._formatError("Empty message", "EMESSAGE", false, "API"));
        }
        const isDestroyedMessage = this._isDestroyedMessage("send message");
        if (isDestroyedMessage) {
          return done(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
        }
        if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
          return setImmediate(() => {
            done(this._formatError("Message size larger than allowed " + this._maxAllowedSize, "EMESSAGE", false, "MAIL FROM"));
          });
        }
        let returned = false;
        let callback = function() {
          if (returned) {
            return;
          }
          returned = true;
          done(...arguments);
        };
        if (typeof message2.on === "function") {
          message2.on("error", (err) => callback(this._formatError(err, "ESTREAM", false, "API")));
        }
        let startTime = Date.now();
        this._setEnvelope(envelope, (err, info) => {
          if (err) {
            return callback(err);
          }
          let envelopeTime = Date.now();
          let stream = this._createSendStream((err2, str) => {
            if (err2) {
              return callback(err2);
            }
            info.envelopeTime = envelopeTime - startTime;
            info.messageTime = Date.now() - envelopeTime;
            info.messageSize = stream.outByteCount;
            info.response = str;
            return callback(null, info);
          });
          if (typeof message2.pipe === "function") {
            message2.pipe(stream);
          } else {
            stream.write(message2);
            stream.end();
          }
        });
      }
      reset(callback) {
        this._sendCommand("RSET");
        this._responseActions.push((str) => {
          if (str.charAt(0) !== "2") {
            return callback(this._formatError("Could not reset session state. response=" + str, "EPROTOCOL", str, "RSET"));
          }
          this._envelope = false;
          return callback(null, true);
        });
      }
      _onConnect() {
        clearTimeout(this._connectionTimeout);
        this.logger.info({
          tnx: "network",
          localAddress: this._socket.localAddress,
          localPort: this._socket.localPort,
          remoteAddress: this._socket.remoteAddress,
          remotePort: this._socket.remotePort
        }, "%s established to %s:%s", this.secure ? "Secure connection" : "Connection", this._socket.remoteAddress, this._socket.remotePort);
        if (this._destroyed) {
          this.close();
          return;
        }
        this.stage = "connected";
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        this._socket.removeListener("close", this._onSocketClose);
        this._socket.removeListener("end", this._onSocketEnd);
        this._socket.on("data", this._onSocketData);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        this._greetingTimeout = setTimeout(() => {
          if (this._socket && !this._destroyed && this._responseActions[0] === this._actionGreeting) {
            this._onError("Greeting never received", "ETIMEDOUT", false, "CONN");
          }
        }, this.options.greetingTimeout || GREETING_TIMEOUT);
        this._responseActions.push(this._actionGreeting);
        this._socket.resume();
      }
      _onData(chunk) {
        if (this._destroyed || !chunk || !chunk.length) {
          return;
        }
        let data = (chunk || "").toString("binary");
        let lines = (this._remainder + data).split(/\r?\n/);
        let lastline;
        this._remainder = lines.pop();
        for (let i = 0, len = lines.length; i < len; i++) {
          if (this._responseQueue.length) {
            lastline = this._responseQueue[this._responseQueue.length - 1];
            if (/^\d+-/.test(lastline.split("\n").pop())) {
              this._responseQueue[this._responseQueue.length - 1] += "\n" + lines[i];
              continue;
            }
          }
          this._responseQueue.push(lines[i]);
        }
        if (this._responseQueue.length) {
          lastline = this._responseQueue[this._responseQueue.length - 1];
          if (/^\d+-/.test(lastline.split("\n").pop())) {
            return;
          }
        }
        this._processResponse();
      }
      _onError(err, type, data, command) {
        clearTimeout(this._connectionTimeout);
        clearTimeout(this._greetingTimeout);
        if (this._destroyed) {
          return;
        }
        err = this._formatError(err, type, data, command);
        this.logger.error(data, err.message);
        this.emit("error", err);
        this.close();
      }
      _formatError(message2, type, response, command) {
        let err;
        if (/Error\]$/i.test(Object.prototype.toString.call(message2))) {
          err = message2;
        } else {
          err = new Error(message2);
        }
        if (type && type !== "Error") {
          err.code = type;
        }
        if (response) {
          err.response = response;
          err.message += ": " + response;
        }
        let responseCode = typeof response === "string" && Number((response.match(/^\d+/) || [])[0]) || false;
        if (responseCode) {
          err.responseCode = responseCode;
        }
        if (command) {
          err.command = command;
        }
        return err;
      }
      _onClose() {
        this.logger.info({
          tnx: "network"
        }, "Connection closed");
        if (this.upgrading && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ETLS", false, "CONN");
        } else if (![this._actionGreeting, this.close].includes(this._responseActions[0]) && !this._destroyed) {
          return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", false, "CONN");
        }
        this._destroy();
      }
      _onEnd() {
        if (this._socket && !this._socket.destroyed) {
          this._socket.destroy();
        }
      }
      _onTimeout() {
        return this._onError(new Error("Timeout"), "ETIMEDOUT", false, "CONN");
      }
      _destroy() {
        if (this._destroyed) {
          return;
        }
        this._destroyed = true;
        this.emit("end");
      }
      _upgradeConnection(callback) {
        this._socket.removeListener("data", this._onSocketData);
        this._socket.removeListener("timeout", this._onSocketTimeout);
        let socketPlain = this._socket;
        let opts = {
          socket: this._socket,
          host: this.host
        };
        Object.keys(this.options.tls || {}).forEach((key) => {
          opts[key] = this.options.tls[key];
        });
        this.upgrading = true;
        this._socket = tls.connect(opts, () => {
          this.secure = true;
          this.upgrading = false;
          this._socket.on("data", this._onSocketData);
          socketPlain.removeListener("close", this._onSocketClose);
          socketPlain.removeListener("end", this._onSocketEnd);
          return callback(null, true);
        });
        this._socket.on("error", this._onSocketError);
        this._socket.once("close", this._onSocketClose);
        this._socket.once("end", this._onSocketEnd);
        this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
        this._socket.on("timeout", this._onSocketTimeout);
        socketPlain.resume();
      }
      _processResponse() {
        if (!this._responseQueue.length) {
          return false;
        }
        let str = this.lastServerResponse = (this._responseQueue.shift() || "").toString();
        if (/^\d+-/.test(str.split("\n").pop())) {
          return;
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug({
            tnx: "server"
          }, str.replace(/\r?\n$/, ""));
        }
        if (!str.trim()) {
          setImmediate(() => this._processResponse(true));
        }
        let action = this._responseActions.shift();
        if (typeof action === "function") {
          action.call(this, str);
          setImmediate(() => this._processResponse(true));
        } else {
          return this._onError(new Error("Unexpected Response"), "EPROTOCOL", str, "CONN");
        }
      }
      _sendCommand(str) {
        if (this._destroyed) {
          return;
        }
        if (this._socket.destroyed) {
          return this.close();
        }
        if (this.options.debug || this.options.transactionLog) {
          this.logger.debug({
            tnx: "client"
          }, (str || "").toString().replace(/\r?\n$/, ""));
        }
        this._socket.write(Buffer.from(str + "\r\n", "utf-8"));
      }
      _setEnvelope(envelope, callback) {
        let args = [];
        let useSmtpUtf8 = false;
        this._envelope = envelope || {};
        this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || "").toString().trim();
        this._envelope.to = [].concat(this._envelope.to || []).map((to) => (to && to.address || to || "").toString().trim());
        if (!this._envelope.to.length) {
          return callback(this._formatError("No recipients defined", "EENVELOPE", false, "API"));
        }
        if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
          return callback(this._formatError("Invalid sender " + JSON.stringify(this._envelope.from), "EENVELOPE", false, "API"));
        }
        if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
          useSmtpUtf8 = true;
        }
        for (let i = 0, len = this._envelope.to.length; i < len; i++) {
          if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
            return callback(this._formatError("Invalid recipient " + JSON.stringify(this._envelope.to[i]), "EENVELOPE", false, "API"));
          }
          if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
            useSmtpUtf8 = true;
          }
        }
        this._envelope.rcptQueue = JSON.parse(JSON.stringify(this._envelope.to || []));
        this._envelope.rejected = [];
        this._envelope.rejectedErrors = [];
        this._envelope.accepted = [];
        if (this._envelope.dsn) {
          try {
            this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
          } catch (err) {
            return callback(this._formatError("Invalid DSN " + err.message, "EENVELOPE", false, "API"));
          }
        }
        this._responseActions.push((str) => {
          this._actionMAIL(str, callback);
        });
        if (useSmtpUtf8 && this._supportedExtensions.includes("SMTPUTF8")) {
          args.push("SMTPUTF8");
          this._usingSmtpUtf8 = true;
        }
        if (this._envelope.use8BitMime && this._supportedExtensions.includes("8BITMIME")) {
          args.push("BODY=8BITMIME");
          this._using8BitMime = true;
        }
        if (this._envelope.size && this._supportedExtensions.includes("SIZE")) {
          args.push("SIZE=" + this._envelope.size);
        }
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.ret) {
            args.push("RET=" + shared.encodeXText(this._envelope.dsn.ret));
          }
          if (this._envelope.dsn.envid) {
            args.push("ENVID=" + shared.encodeXText(this._envelope.dsn.envid));
          }
        }
        this._sendCommand("MAIL FROM:<" + this._envelope.from + ">" + (args.length ? " " + args.join(" ") : ""));
      }
      _setDsnEnvelope(params) {
        let ret = (params.ret || params.return || "").toString().toUpperCase() || null;
        if (ret) {
          switch (ret) {
            case "HDRS":
            case "HEADERS":
              ret = "HDRS";
              break;
            case "FULL":
            case "BODY":
              ret = "FULL";
              break;
          }
        }
        if (ret && !["FULL", "HDRS"].includes(ret)) {
          throw new Error("ret: " + JSON.stringify(ret));
        }
        let envid = (params.envid || params.id || "").toString() || null;
        let notify = params.notify || null;
        if (notify) {
          if (typeof notify === "string") {
            notify = notify.split(",");
          }
          notify = notify.map((n) => n.trim().toUpperCase());
          let validNotify = ["NEVER", "SUCCESS", "FAILURE", "DELAY"];
          let invaliNotify = notify.filter((n) => !validNotify.includes(n));
          if (invaliNotify.length || notify.length > 1 && notify.includes("NEVER")) {
            throw new Error("notify: " + JSON.stringify(notify.join(",")));
          }
          notify = notify.join(",");
        }
        let orcpt = (params.orcpt || params.recipient || "").toString() || null;
        if (orcpt && orcpt.indexOf(";") < 0) {
          orcpt = "rfc822;" + orcpt;
        }
        return {
          ret,
          envid,
          notify,
          orcpt
        };
      }
      _getDsnRcptToArgs() {
        let args = [];
        if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
          if (this._envelope.dsn.notify) {
            args.push("NOTIFY=" + shared.encodeXText(this._envelope.dsn.notify));
          }
          if (this._envelope.dsn.orcpt) {
            args.push("ORCPT=" + shared.encodeXText(this._envelope.dsn.orcpt));
          }
        }
        return args.length ? " " + args.join(" ") : "";
      }
      _createSendStream(callback) {
        let dataStream = new DataStream();
        let logStream;
        if (this.options.lmtp) {
          this._envelope.accepted.forEach((recipient, i) => {
            let final = i === this._envelope.accepted.length - 1;
            this._responseActions.push((str) => {
              this._actionLMTPStream(recipient, final, str, callback);
            });
          });
        } else {
          this._responseActions.push((str) => {
            this._actionSMTPStream(str, callback);
          });
        }
        dataStream.pipe(this._socket, {
          end: false
        });
        if (this.options.debug) {
          logStream = new PassThrough2();
          logStream.on("readable", () => {
            let chunk;
            while (chunk = logStream.read()) {
              this.logger.debug({
                tnx: "message"
              }, chunk.toString("binary").replace(/\r?\n$/, ""));
            }
          });
          dataStream.pipe(logStream);
        }
        dataStream.once("end", () => {
          this.logger.info({
            tnx: "message",
            inByteCount: dataStream.inByteCount,
            outByteCount: dataStream.outByteCount
          }, "<%s bytes encoded mime message (source size %s bytes)>", dataStream.outByteCount, dataStream.inByteCount);
        });
        return dataStream;
      }
      _actionGreeting(str) {
        clearTimeout(this._greetingTimeout);
        if (str.substr(0, 3) !== "220") {
          this._onError(new Error("Invalid greeting. response=" + str), "EPROTOCOL", str, "CONN");
          return;
        }
        if (this.options.lmtp) {
          this._responseActions.push(this._actionLHLO);
          this._sendCommand("LHLO " + this.name);
        } else {
          this._responseActions.push(this._actionEHLO);
          this._sendCommand("EHLO " + this.name);
        }
      }
      _actionLHLO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid LHLO. response=" + str), "EPROTOCOL", str, "LHLO");
          return;
        }
        this._actionEHLO(str);
      }
      _actionEHLO(str) {
        let match;
        if (str.substr(0, 3) === "421") {
          this._onError(new Error("Server terminates connection. response=" + str), "ECONNECTION", str, "EHLO");
          return;
        }
        if (str.charAt(0) !== "2") {
          if (this.options.requireTLS) {
            this._onError(new Error("EHLO failed but HELO does not support required STARTTLS. response=" + str), "ECONNECTION", str, "EHLO");
            return;
          }
          this._responseActions.push(this._actionHELO);
          this._sendCommand("HELO " + this.name);
          return;
        }
        if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
          this._sendCommand("STARTTLS");
          this._responseActions.push(this._actionSTARTTLS);
          return;
        }
        if (/[ -]SMTPUTF8\b/im.test(str)) {
          this._supportedExtensions.push("SMTPUTF8");
        }
        if (/[ -]DSN\b/im.test(str)) {
          this._supportedExtensions.push("DSN");
        }
        if (/[ -]8BITMIME\b/im.test(str)) {
          this._supportedExtensions.push("8BITMIME");
        }
        if (/[ -]PIPELINING\b/im.test(str)) {
          this._supportedExtensions.push("PIPELINING");
        }
        if (/[ -]AUTH\b/i.test(str)) {
          this.allowsAuth = true;
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)PLAIN/i.test(str)) {
          this._supportedAuth.push("PLAIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)LOGIN/i.test(str)) {
          this._supportedAuth.push("LOGIN");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)CRAM-MD5/i.test(str)) {
          this._supportedAuth.push("CRAM-MD5");
        }
        if (/[ -]AUTH(?:(\s+|=)[^\n]*\s+|\s+|=)XOAUTH2/i.test(str)) {
          this._supportedAuth.push("XOAUTH2");
        }
        if (match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) {
          this._supportedExtensions.push("SIZE");
          this._maxAllowedSize = Number(match[1]) || 0;
        }
        this.emit("connect");
      }
      _actionHELO(str) {
        if (str.charAt(0) !== "2") {
          this._onError(new Error("Invalid HELO. response=" + str), "EPROTOCOL", str, "HELO");
          return;
        }
        this.allowsAuth = true;
        this.emit("connect");
      }
      _actionSTARTTLS(str) {
        if (str.charAt(0) !== "2") {
          if (this.options.opportunisticTLS) {
            this.logger.info({
              tnx: "smtp"
            }, "Failed STARTTLS upgrade, continuing unencrypted");
            return this.emit("connect");
          }
          this._onError(new Error("Error upgrading connection with STARTTLS"), "ETLS", str, "STARTTLS");
          return;
        }
        this._upgradeConnection((err, secured) => {
          if (err) {
            this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "STARTTLS");
            return;
          }
          this.logger.info({
            tnx: "smtp"
          }, "Connection upgraded with STARTTLS");
          if (secured) {
            if (this.options.lmtp) {
              this._responseActions.push(this._actionLHLO);
              this._sendCommand("LHLO " + this.name);
            } else {
              this._responseActions.push(this._actionEHLO);
              this._sendCommand("EHLO " + this.name);
            }
          } else {
            this.emit("connect");
          }
        });
      }
      _actionAUTH_LOGIN_USER(str, callback) {
        if (!/^334[ -]/.test(str)) {
          callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', "EAUTH", str, "AUTH LOGIN"));
          return;
        }
        this._responseActions.push((str2) => {
          this._actionAUTH_LOGIN_PASS(str2, callback);
        });
        this._sendCommand(Buffer.from(this._auth.credentials.user + "", "utf-8").toString("base64"));
      }
      _actionAUTH_CRAM_MD5(str, callback) {
        let challengeMatch = str.match(/^334\s+(.+)$/);
        let challengeString = "";
        if (!challengeMatch) {
          return callback(this._formatError("Invalid login sequence while waiting for server challenge string", "EAUTH", str, "AUTH CRAM-MD5"));
        } else {
          challengeString = challengeMatch[1];
        }
        let base64decoded = Buffer.from(challengeString, "base64").toString("ascii"), hmac_md5 = crypto.createHmac("md5", this._auth.credentials.pass);
        hmac_md5.update(base64decoded);
        let hex_hmac = hmac_md5.digest("hex");
        let prepended = this._auth.credentials.user + " " + hex_hmac;
        this._responseActions.push((str2) => {
          this._actionAUTH_CRAM_MD5_PASS(str2, callback);
        });
        this._sendCommand(Buffer.from(prepended).toString("base64"));
      }
      _actionAUTH_CRAM_MD5_PASS(str, callback) {
        if (!str.match(/^235\s+/)) {
          return callback(this._formatError('Invalid login sequence while waiting for "235"', "EAUTH", str, "AUTH CRAM-MD5"));
        }
        this.logger.info({
          tnx: "smtp",
          username: this._auth.user,
          action: "authenticated",
          method: this._authMethod
        }, "User %s authenticated", JSON.stringify(this._auth.user));
        this.authenticated = true;
        callback(null, true);
      }
      _actionAUTH_LOGIN_PASS(str, callback) {
        if (!/^334[ -]/.test(str)) {
          return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', "EAUTH", str, "AUTH LOGIN"));
        }
        this._responseActions.push((str2) => {
          this._actionAUTHComplete(str2, callback);
        });
        this._sendCommand(Buffer.from(this._auth.credentials.pass + "", "utf-8").toString("base64"));
      }
      _actionAUTHComplete(str, isRetry, callback) {
        if (!callback && typeof isRetry === "function") {
          callback = isRetry;
          isRetry = false;
        }
        if (str.substr(0, 3) === "334") {
          this._responseActions.push((str2) => {
            if (isRetry || this._authMethod !== "XOAUTH2") {
              this._actionAUTHComplete(str2, true, callback);
            } else {
              setImmediate(() => this._handleXOauth2Token(true, callback));
            }
          });
          this._sendCommand("");
          return;
        }
        if (str.charAt(0) !== "2") {
          this.logger.info({
            tnx: "smtp",
            username: this._auth.user,
            action: "authfail",
            method: this._authMethod
          }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
          return callback(this._formatError("Invalid login", "EAUTH", str, "AUTH " + this._authMethod));
        }
        this.logger.info({
          tnx: "smtp",
          username: this._auth.user,
          action: "authenticated",
          method: this._authMethod
        }, "User %s authenticated", JSON.stringify(this._auth.user));
        this.authenticated = true;
        callback(null, true);
      }
      _actionMAIL(str, callback) {
        let message2, curRecipient;
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(this._envelope.from)) {
            message2 = "Internationalized mailbox name not allowed";
          } else {
            message2 = "Mail command failed";
          }
          return callback(this._formatError(message2, "EENVELOPE", str, "MAIL FROM"));
        }
        if (!this._envelope.rcptQueue.length) {
          return callback(this._formatError("Can't send mail - no recipients defined", "EENVELOPE", false, "API"));
        } else {
          this._recipientQueue = [];
          if (this._supportedExtensions.includes("PIPELINING")) {
            while (this._envelope.rcptQueue.length) {
              curRecipient = this._envelope.rcptQueue.shift();
              this._recipientQueue.push(curRecipient);
              this._responseActions.push((str2) => {
                this._actionRCPT(str2, callback);
              });
              this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
            }
          } else {
            curRecipient = this._envelope.rcptQueue.shift();
            this._recipientQueue.push(curRecipient);
            this._responseActions.push((str2) => {
              this._actionRCPT(str2, callback);
            });
            this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
          }
        }
      }
      _actionRCPT(str, callback) {
        let message2, err, curRecipient = this._recipientQueue.shift();
        if (Number(str.charAt(0)) !== 2) {
          if (this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient)) {
            message2 = "Internationalized mailbox name not allowed";
          } else {
            message2 = "Recipient command failed";
          }
          this._envelope.rejected.push(curRecipient);
          err = this._formatError(message2, "EENVELOPE", str, "RCPT TO");
          err.recipient = curRecipient;
          this._envelope.rejectedErrors.push(err);
        } else {
          this._envelope.accepted.push(curRecipient);
        }
        if (!this._envelope.rcptQueue.length && !this._recipientQueue.length) {
          if (this._envelope.rejected.length < this._envelope.to.length) {
            this._responseActions.push((str2) => {
              this._actionDATA(str2, callback);
            });
            this._sendCommand("DATA");
          } else {
            err = this._formatError("Can't send mail - all recipients were rejected", "EENVELOPE", str, "RCPT TO");
            err.rejected = this._envelope.rejected;
            err.rejectedErrors = this._envelope.rejectedErrors;
            return callback(err);
          }
        } else if (this._envelope.rcptQueue.length) {
          curRecipient = this._envelope.rcptQueue.shift();
          this._recipientQueue.push(curRecipient);
          this._responseActions.push((str2) => {
            this._actionRCPT(str2, callback);
          });
          this._sendCommand("RCPT TO:<" + curRecipient + ">" + this._getDsnRcptToArgs());
        }
      }
      _actionDATA(str, callback) {
        if (!/^[23]/.test(str)) {
          return callback(this._formatError("Data command failed", "EENVELOPE", str, "DATA"));
        }
        let response = {
          accepted: this._envelope.accepted,
          rejected: this._envelope.rejected
        };
        if (this._envelope.rejectedErrors.length) {
          response.rejectedErrors = this._envelope.rejectedErrors;
        }
        callback(null, response);
      }
      _actionSMTPStream(str, callback) {
        if (Number(str.charAt(0)) !== 2) {
          return callback(this._formatError("Message failed", "EMESSAGE", str, "DATA"));
        } else {
          return callback(null, str);
        }
      }
      _actionLMTPStream(recipient, final, str, callback) {
        let err;
        if (Number(str.charAt(0)) !== 2) {
          err = this._formatError("Message failed for recipient " + recipient, "EMESSAGE", str, "DATA");
          err.recipient = recipient;
          this._envelope.rejected.push(recipient);
          this._envelope.rejectedErrors.push(err);
          for (let i = 0, len = this._envelope.accepted.length; i < len; i++) {
            if (this._envelope.accepted[i] === recipient) {
              this._envelope.accepted.splice(i, 1);
            }
          }
        }
        if (final) {
          return callback(null, str);
        }
      }
      _handleXOauth2Token(isRetry, callback) {
        this._auth.oauth2.getToken(isRetry, (err, accessToken) => {
          if (err) {
            this.logger.info({
              tnx: "smtp",
              username: this._auth.user,
              action: "authfail",
              method: this._authMethod
            }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
            return callback(this._formatError(err, "EAUTH", false, "AUTH XOAUTH2"));
          }
          this._responseActions.push((str) => {
            this._actionAUTHComplete(str, isRetry, callback);
          });
          this._sendCommand("AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token(accessToken));
        });
      }
      _isDestroyedMessage(command) {
        if (this._destroyed) {
          return "Cannot " + command + " - smtp connection is already destroyed.";
        }
        if (this._socket) {
          if (this._socket.destroyed) {
            return "Cannot " + command + " - smtp connection socket is already destroyed.";
          }
          if (!this._socket.writable) {
            return "Cannot " + command + " - smtp connection socket is already half-closed.";
          }
        }
      }
      _getHostname() {
        let defaultHostname = os.hostname() || "";
        if (defaultHostname.indexOf(".") < 0) {
          defaultHostname = "[127.0.0.1]";
        }
        if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
          defaultHostname = "[" + defaultHostname + "]";
        }
        return defaultHostname;
      }
    };
    module2.exports = SMTPConnection;
  }
});

// node_modules/nodemailer/lib/xoauth2/index.js
var require_xoauth2 = __commonJS({
  "node_modules/nodemailer/lib/xoauth2/index.js"(exports, module2) {
    "use strict";
    var Stream2 = require("stream").Stream;
    var fetch3 = require_fetch();
    var crypto = require("crypto");
    var shared = require_shared();
    var XOAuth2 = class extends Stream2 {
      constructor(options2, logger) {
        super();
        this.options = options2 || {};
        if (options2 && options2.serviceClient) {
          if (!options2.privateKey || !options2.user) {
            setImmediate(() => this.emit("error", new Error('Options "privateKey" and "user" are required for service account!')));
            return;
          }
          let serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
          this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
        }
        this.logger = shared.getLogger({
          logger
        }, {
          component: this.options.component || "OAuth2"
        });
        this.provisionCallback = typeof this.options.provisionCallback === "function" ? this.options.provisionCallback : false;
        this.options.accessUrl = this.options.accessUrl || "https://accounts.google.com/o/oauth2/token";
        this.options.customHeaders = this.options.customHeaders || {};
        this.options.customParams = this.options.customParams || {};
        this.accessToken = this.options.accessToken || false;
        if (this.options.expires && Number(this.options.expires)) {
          this.expires = this.options.expires;
        } else {
          let timeout = Math.max(Number(this.options.timeout) || 0, 0);
          this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        }
      }
      getToken(renew, callback) {
        if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
          return callback(null, this.accessToken);
        }
        let generateCallback = (...args) => {
          if (args[0]) {
            this.logger.error({
              err: args[0],
              tnx: "OAUTH2",
              user: this.options.user,
              action: "renew"
            }, "Failed generating new Access Token for %s", this.options.user);
          } else {
            this.logger.info({
              tnx: "OAUTH2",
              user: this.options.user,
              action: "renew"
            }, "Generated new Access Token for %s", this.options.user);
          }
          callback(...args);
        };
        if (this.provisionCallback) {
          this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
            if (!err && accessToken) {
              this.accessToken = accessToken;
              this.expires = expires || 0;
            }
            generateCallback(err, accessToken);
          });
        } else {
          this.generateToken(generateCallback);
        }
      }
      updateToken(accessToken, timeout) {
        this.accessToken = accessToken;
        timeout = Math.max(Number(timeout) || 0, 0);
        this.expires = timeout && Date.now() + timeout * 1e3 || 0;
        this.emit("token", {
          user: this.options.user,
          accessToken: accessToken || "",
          expires: this.expires
        });
      }
      generateToken(callback) {
        let urlOptions;
        let loggedUrlOptions;
        if (this.options.serviceClient) {
          let iat = Math.floor(Date.now() / 1e3);
          let tokenData = {
            iss: this.options.serviceClient,
            scope: this.options.scope || "https://mail.google.com/",
            sub: this.options.user,
            aud: this.options.accessUrl,
            iat,
            exp: iat + this.options.serviceRequestTimeout
          };
          let token;
          try {
            token = this.jwtSignRS256(tokenData);
          } catch (err) {
            return callback(new Error("Can't generate token. Check your auth options"));
          }
          urlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: token
          };
          loggedUrlOptions = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: tokenData
          };
        } else {
          if (!this.options.refreshToken) {
            return callback(new Error("Can't create new access token for user"));
          }
          urlOptions = {
            client_id: this.options.clientId || "",
            client_secret: this.options.clientSecret || "",
            refresh_token: this.options.refreshToken,
            grant_type: "refresh_token"
          };
          loggedUrlOptions = {
            client_id: this.options.clientId || "",
            client_secret: (this.options.clientSecret || "").substr(0, 6) + "...",
            refresh_token: (this.options.refreshToken || "").substr(0, 6) + "...",
            grant_type: "refresh_token"
          };
        }
        Object.keys(this.options.customParams).forEach((key) => {
          urlOptions[key] = this.options.customParams[key];
          loggedUrlOptions[key] = this.options.customParams[key];
        });
        this.logger.debug({
          tnx: "OAUTH2",
          user: this.options.user,
          action: "generate"
        }, "Requesting token using: %s", JSON.stringify(loggedUrlOptions));
        this.postRequest(this.options.accessUrl, urlOptions, this.options, (error3, body) => {
          let data;
          if (error3) {
            return callback(error3);
          }
          try {
            data = JSON.parse(body.toString());
          } catch (E) {
            return callback(E);
          }
          if (!data || typeof data !== "object") {
            this.logger.debug({
              tnx: "OAUTH2",
              user: this.options.user,
              action: "post"
            }, "Response: %s", (body || "").toString());
            return callback(new Error("Invalid authentication response"));
          }
          let logData = {};
          Object.keys(data).forEach((key) => {
            if (key !== "access_token") {
              logData[key] = data[key];
            } else {
              logData[key] = (data[key] || "").toString().substr(0, 6) + "...";
            }
          });
          this.logger.debug({
            tnx: "OAUTH2",
            user: this.options.user,
            action: "post"
          }, "Response: %s", JSON.stringify(logData));
          if (data.error) {
            let errorMessage = data.error;
            if (data.error_description) {
              errorMessage += ": " + data.error_description;
            }
            if (data.error_uri) {
              errorMessage += " (" + data.error_uri + ")";
            }
            return callback(new Error(errorMessage));
          }
          if (data.access_token) {
            this.updateToken(data.access_token, data.expires_in);
            return callback(null, this.accessToken);
          }
          return callback(new Error("No access token"));
        });
      }
      buildXOAuth2Token(accessToken) {
        let authData = ["user=" + (this.options.user || ""), "auth=Bearer " + (accessToken || this.accessToken), "", ""];
        return Buffer.from(authData.join(""), "utf-8").toString("base64");
      }
      postRequest(url2, payload, params, callback) {
        let returned = false;
        let chunks = [];
        let chunklen = 0;
        let req = fetch3(url2, {
          method: "post",
          headers: params.customHeaders,
          body: payload,
          allowErrorResponse: true
        });
        req.on("readable", () => {
          let chunk;
          while ((chunk = req.read()) !== null) {
            chunks.push(chunk);
            chunklen += chunk.length;
          }
        });
        req.once("error", (err) => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(err);
        });
        req.once("end", () => {
          if (returned) {
            return;
          }
          returned = true;
          return callback(null, Buffer.concat(chunks, chunklen));
        });
      }
      toBase64URL(data) {
        if (typeof data === "string") {
          data = Buffer.from(data);
        }
        return data.toString("base64").replace(/[=]+/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      jwtSignRS256(payload) {
        payload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map((val) => this.toBase64URL(val)).join(".");
        let signature = crypto.createSign("RSA-SHA256").update(payload).sign(this.options.privateKey);
        return payload + "." + this.toBase64URL(signature);
      }
    };
    module2.exports = XOAuth2;
  }
});

// node_modules/nodemailer/lib/smtp-pool/pool-resource.js
var require_pool_resource = __commonJS({
  "node_modules/nodemailer/lib/smtp-pool/pool-resource.js"(exports, module2) {
    "use strict";
    var SMTPConnection = require_smtp_connection();
    var assign = require_shared().assign;
    var XOAuth2 = require_xoauth2();
    var EventEmitter = require("events");
    var PoolResource = class extends EventEmitter {
      constructor(pool) {
        super();
        this.pool = pool;
        this.options = pool.options;
        this.logger = this.pool.logger;
        if (this.options.auth) {
          switch ((this.options.auth.type || "").toString().toUpperCase()) {
            case "OAUTH2": {
              let oauth2 = new XOAuth2(this.options.auth, this.logger);
              oauth2.provisionCallback = this.pool.mailer && this.pool.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
              this.auth = {
                type: "OAUTH2",
                user: this.options.auth.user,
                oauth2,
                method: "XOAUTH2"
              };
              oauth2.on("token", (token) => this.pool.mailer.emit("token", token));
              oauth2.on("error", (err) => this.emit("error", err));
              break;
            }
            default:
              if (!this.options.auth.user && !this.options.auth.pass) {
                break;
              }
              this.auth = {
                type: (this.options.auth.type || "").toString().toUpperCase() || "LOGIN",
                user: this.options.auth.user,
                credentials: {
                  user: this.options.auth.user || "",
                  pass: this.options.auth.pass,
                  options: this.options.auth.options
                },
                method: (this.options.auth.method || "").trim().toUpperCase() || this.options.authMethod || false
              };
          }
        }
        this._connection = false;
        this._connected = false;
        this.messages = 0;
        this.available = true;
      }
      connect(callback) {
        this.pool.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let returned = false;
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options2.host || "",
              destPort: options2.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options2.host || "", options2.port || "");
            options2 = assign(false, options2);
            Object.keys(socketOptions).forEach((key) => {
              options2[key] = socketOptions[key];
            });
          }
          this.connection = new SMTPConnection(options2);
          this.connection.once("error", (err2) => {
            this.emit("error", err2);
            if (returned) {
              return;
            }
            returned = true;
            return callback(err2);
          });
          this.connection.once("end", () => {
            this.close();
            if (returned) {
              return;
            }
            returned = true;
            let timer = setTimeout(() => {
              if (returned) {
                return;
              }
              let err2 = new Error("Unexpected socket close");
              if (this.connection && this.connection._socket && this.connection._socket.upgrading) {
                err2.code = "ETLS";
              }
              callback(err2);
            }, 1e3);
            try {
              timer.unref();
            } catch (E) {
            }
          });
          this.connection.connect(() => {
            if (returned) {
              return;
            }
            if (this.auth && (this.connection.allowsAuth || options2.forceAuth)) {
              this.connection.login(this.auth, (err2) => {
                if (returned) {
                  return;
                }
                returned = true;
                if (err2) {
                  this.connection.close();
                  this.emit("error", err2);
                  return callback(err2);
                }
                this._connected = true;
                callback(null, true);
              });
            } else {
              returned = true;
              this._connected = true;
              return callback(null, true);
            }
          });
        });
      }
      send(mail, callback) {
        if (!this._connected) {
          return this.connect((err) => {
            if (err) {
              return callback(err);
            }
            return this.send(mail, callback);
          });
        }
        let envelope = mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId,
          cid: this.id
        }, "Sending message %s using #%s to <%s>", messageId, this.id, recipients.join(", "));
        if (mail.data.dsn) {
          envelope.dsn = mail.data.dsn;
        }
        this.connection.send(envelope, mail.message.createReadStream(), (err, info) => {
          this.messages++;
          if (err) {
            this.connection.close();
            this.emit("error", err);
            return callback(err);
          }
          info.envelope = {
            from: envelope.from,
            to: envelope.to
          };
          info.messageId = messageId;
          setImmediate(() => {
            let err2;
            if (this.messages >= this.options.maxMessages) {
              err2 = new Error("Resource exhausted");
              err2.code = "EMAXLIMIT";
              this.connection.close();
              this.emit("error", err2);
            } else {
              this.pool._checkRateLimit(() => {
                this.available = true;
                this.emit("available");
              });
            }
          });
          callback(null, info);
        });
      }
      close() {
        this._connected = false;
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        if (this.connection) {
          this.connection.close();
        }
        this.emit("close");
      }
    };
    module2.exports = PoolResource;
  }
});

// node_modules/nodemailer/lib/well-known/services.json
var require_services = __commonJS({
  "node_modules/nodemailer/lib/well-known/services.json"(exports, module2) {
    module2.exports = {
      "1und1": {
        host: "smtp.1und1.de",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      AOL: {
        domains: ["aol.com"],
        host: "smtp.aol.com",
        port: 587
      },
      DebugMail: {
        host: "debugmail.io",
        port: 25
      },
      DynectEmail: {
        aliases: ["Dynect"],
        host: "smtp.dynect.net",
        port: 25
      },
      Ethereal: {
        aliases: ["ethereal.email"],
        host: "smtp.ethereal.email",
        port: 587
      },
      FastMail: {
        domains: ["fastmail.fm"],
        host: "smtp.fastmail.com",
        port: 465,
        secure: true
      },
      GandiMail: {
        aliases: ["Gandi", "Gandi Mail"],
        host: "mail.gandi.net",
        port: 587
      },
      Gmail: {
        aliases: ["Google Mail"],
        domains: ["gmail.com", "googlemail.com"],
        host: "smtp.gmail.com",
        port: 465,
        secure: true
      },
      Godaddy: {
        host: "smtpout.secureserver.net",
        port: 25
      },
      GodaddyAsia: {
        host: "smtp.asia.secureserver.net",
        port: 25
      },
      GodaddyEurope: {
        host: "smtp.europe.secureserver.net",
        port: 25
      },
      "hot.ee": {
        host: "mail.hot.ee"
      },
      Hotmail: {
        aliases: ["Outlook", "Outlook.com", "Hotmail.com"],
        domains: ["hotmail.com", "outlook.com"],
        host: "smtp.live.com",
        port: 587
      },
      iCloud: {
        aliases: ["Me", "Mac"],
        domains: ["me.com", "mac.com"],
        host: "smtp.mail.me.com",
        port: 587
      },
      "mail.ee": {
        host: "smtp.mail.ee"
      },
      "Mail.ru": {
        host: "smtp.mail.ru",
        port: 465,
        secure: true
      },
      Maildev: {
        port: 1025,
        ignoreTLS: true
      },
      Mailgun: {
        host: "smtp.mailgun.org",
        port: 465,
        secure: true
      },
      Mailjet: {
        host: "in.mailjet.com",
        port: 587
      },
      Mailosaur: {
        host: "mailosaur.io",
        port: 25
      },
      Mailtrap: {
        host: "smtp.mailtrap.io",
        port: 2525
      },
      Mandrill: {
        host: "smtp.mandrillapp.com",
        port: 587
      },
      Naver: {
        host: "smtp.naver.com",
        port: 587
      },
      One: {
        host: "send.one.com",
        port: 465,
        secure: true
      },
      OpenMailBox: {
        aliases: ["OMB", "openmailbox.org"],
        host: "smtp.openmailbox.org",
        port: 465,
        secure: true
      },
      Outlook365: {
        host: "smtp.office365.com",
        port: 587,
        secure: false
      },
      OhMySMTP: {
        host: "smtp.ohmysmtp.com",
        port: 587,
        secure: false
      },
      Postmark: {
        aliases: ["PostmarkApp"],
        host: "smtp.postmarkapp.com",
        port: 2525
      },
      "qiye.aliyun": {
        host: "smtp.mxhichina.com",
        port: "465",
        secure: true
      },
      QQ: {
        domains: ["qq.com"],
        host: "smtp.qq.com",
        port: 465,
        secure: true
      },
      QQex: {
        aliases: ["QQ Enterprise"],
        domains: ["exmail.qq.com"],
        host: "smtp.exmail.qq.com",
        port: 465,
        secure: true
      },
      SendCloud: {
        host: "smtpcloud.sohu.com",
        port: 25
      },
      SendGrid: {
        host: "smtp.sendgrid.net",
        port: 587
      },
      SendinBlue: {
        host: "smtp-relay.sendinblue.com",
        port: 587
      },
      SendPulse: {
        host: "smtp-pulse.com",
        port: 465,
        secure: true
      },
      SES: {
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-EAST-1": {
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-US-WEST-2": {
        host: "email-smtp.us-west-2.amazonaws.com",
        port: 465,
        secure: true
      },
      "SES-EU-WEST-1": {
        host: "email-smtp.eu-west-1.amazonaws.com",
        port: 465,
        secure: true
      },
      Sparkpost: {
        aliases: ["SparkPost", "SparkPost Mail"],
        domains: ["sparkpost.com"],
        host: "smtp.sparkpostmail.com",
        port: 587,
        secure: false
      },
      Tipimail: {
        host: "smtp.tipimail.com",
        port: 587
      },
      Yahoo: {
        domains: ["yahoo.com"],
        host: "smtp.mail.yahoo.com",
        port: 465,
        secure: true
      },
      Yandex: {
        domains: ["yandex.ru"],
        host: "smtp.yandex.ru",
        port: 465,
        secure: true
      },
      Zoho: {
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        authMethod: "LOGIN"
      },
      "126": {
        host: "smtp.126.com",
        port: 465,
        secure: true
      },
      "163": {
        host: "smtp.163.com",
        port: 465,
        secure: true
      }
    };
  }
});

// node_modules/nodemailer/lib/well-known/index.js
var require_well_known = __commonJS({
  "node_modules/nodemailer/lib/well-known/index.js"(exports, module2) {
    "use strict";
    var services = require_services();
    var normalized = {};
    Object.keys(services).forEach((key) => {
      let service = services[key];
      normalized[normalizeKey(key)] = normalizeService(service);
      [].concat(service.aliases || []).forEach((alias) => {
        normalized[normalizeKey(alias)] = normalizeService(service);
      });
      [].concat(service.domains || []).forEach((domain) => {
        normalized[normalizeKey(domain)] = normalizeService(service);
      });
    });
    function normalizeKey(key) {
      return key.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
    }
    function normalizeService(service) {
      let filter = ["domains", "aliases"];
      let response = {};
      Object.keys(service).forEach((key) => {
        if (filter.indexOf(key) < 0) {
          response[key] = service[key];
        }
      });
      return response;
    }
    module2.exports = function(key) {
      key = normalizeKey(key.split("@").pop());
      return normalized[key] || false;
    };
  }
});

// node_modules/nodemailer/lib/smtp-pool/index.js
var require_smtp_pool = __commonJS({
  "node_modules/nodemailer/lib/smtp-pool/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var PoolResource = require_pool_resource();
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var packageData = require_package();
    var SMTPPool = class extends EventEmitter {
      constructor(options2) {
        super();
        options2 = options2 || {};
        if (typeof options2 === "string") {
          options2 = {
            url: options2
          };
        }
        let urlData;
        let service = options2.service;
        if (typeof options2.getSocket === "function") {
          this.getSocket = options2.getSocket;
        }
        if (options2.url) {
          urlData = shared.parseConnectionUrl(options2.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(false, options2, urlData, service && wellKnown(service));
        this.options.maxConnections = this.options.maxConnections || 5;
        this.options.maxMessages = this.options.maxMessages || 100;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-pool"
        });
        let connection = new SMTPConnection(this.options);
        this.name = "SMTP (pool)";
        this.version = packageData.version + "[client:" + connection.version + "]";
        this._rateLimit = {
          counter: 0,
          timeout: null,
          waiting: [],
          checkpoint: false,
          delta: Number(this.options.rateDelta) || 1e3,
          limit: Number(this.options.rateLimit) || 0
        };
        this._closed = false;
        this._queue = [];
        this._connections = [];
        this._connectionCounter = 0;
        this.idling = true;
        setImmediate(() => {
          if (this.idling) {
            this.emit("idle");
          }
        });
      }
      getSocket(options2, callback) {
        return setImmediate(() => callback(null, false));
      }
      send(mail, callback) {
        if (this._closed) {
          return false;
        }
        this._queue.push({
          mail,
          requeueAttempts: 0,
          callback
        });
        if (this.idling && this._queue.length >= this.options.maxConnections) {
          this.idling = false;
        }
        setImmediate(() => this._processMessages());
        return true;
      }
      close() {
        let connection;
        let len = this._connections.length;
        this._closed = true;
        clearTimeout(this._rateLimit.timeout);
        if (!len && !this._queue.length) {
          return;
        }
        for (let i = len - 1; i >= 0; i--) {
          if (this._connections[i] && this._connections[i].available) {
            connection = this._connections[i];
            connection.close();
            this.logger.info({
              tnx: "connection",
              cid: connection.id,
              action: "removed"
            }, "Connection #%s removed", connection.id);
          }
        }
        if (len && !this._connections.length) {
          this.logger.debug({
            tnx: "connection"
          }, "All connections removed");
        }
        if (!this._queue.length) {
          return;
        }
        let invokeCallbacks = () => {
          if (!this._queue.length) {
            this.logger.debug({
              tnx: "connection"
            }, "Pending queue entries cleared");
            return;
          }
          let entry = this._queue.shift();
          if (entry && typeof entry.callback === "function") {
            try {
              entry.callback(new Error("Connection pool was closed"));
            } catch (E) {
              this.logger.error({
                err: E,
                tnx: "callback",
                cid: connection.id
              }, "Callback error for #%s: %s", connection.id, E.message);
            }
          }
          setImmediate(invokeCallbacks);
        };
        setImmediate(invokeCallbacks);
      }
      _processMessages() {
        let connection;
        let i, len;
        if (this._closed) {
          return;
        }
        if (!this._queue.length) {
          if (!this.idling) {
            this.idling = true;
            this.emit("idle");
          }
          return;
        }
        for (i = 0, len = this._connections.length; i < len; i++) {
          if (this._connections[i].available) {
            connection = this._connections[i];
            break;
          }
        }
        if (!connection && this._connections.length < this.options.maxConnections) {
          connection = this._createConnection();
        }
        if (!connection) {
          this.idling = false;
          return;
        }
        if (!this.idling && this._queue.length < this.options.maxConnections) {
          this.idling = true;
          this.emit("idle");
        }
        let entry = connection.queueEntry = this._queue.shift();
        entry.messageId = (connection.queueEntry.mail.message.getHeader("message-id") || "").replace(/[<>\s]/g, "");
        connection.available = false;
        this.logger.debug({
          tnx: "pool",
          cid: connection.id,
          messageId: entry.messageId,
          action: "assign"
        }, "Assigned message <%s> to #%s (%s)", entry.messageId, connection.id, connection.messages + 1);
        if (this._rateLimit.limit) {
          this._rateLimit.counter++;
          if (!this._rateLimit.checkpoint) {
            this._rateLimit.checkpoint = Date.now();
          }
        }
        connection.send(entry.mail, (err, info) => {
          if (entry === connection.queueEntry) {
            try {
              entry.callback(err, info);
            } catch (E) {
              this.logger.error({
                err: E,
                tnx: "callback",
                cid: connection.id
              }, "Callback error for #%s: %s", connection.id, E.message);
            }
            connection.queueEntry = false;
          }
        });
      }
      _createConnection() {
        let connection = new PoolResource(this);
        connection.id = ++this._connectionCounter;
        this.logger.info({
          tnx: "pool",
          cid: connection.id,
          action: "conection"
        }, "Created new pool resource #%s", connection.id);
        connection.on("available", () => {
          this.logger.debug({
            tnx: "connection",
            cid: connection.id,
            action: "available"
          }, "Connection #%s became available", connection.id);
          if (this._closed) {
            this.close();
          } else {
            this._processMessages();
          }
        });
        connection.once("error", (err) => {
          if (err.code !== "EMAXLIMIT") {
            this.logger.error({
              err,
              tnx: "pool",
              cid: connection.id
            }, "Pool Error for #%s: %s", connection.id, err.message);
          } else {
            this.logger.debug({
              tnx: "pool",
              cid: connection.id,
              action: "maxlimit"
            }, "Max messages limit exchausted for #%s", connection.id);
          }
          if (connection.queueEntry) {
            try {
              connection.queueEntry.callback(err);
            } catch (E) {
              this.logger.error({
                err: E,
                tnx: "callback",
                cid: connection.id
              }, "Callback error for #%s: %s", connection.id, E.message);
            }
            connection.queueEntry = false;
          }
          this._removeConnection(connection);
          this._continueProcessing();
        });
        connection.once("close", () => {
          this.logger.info({
            tnx: "connection",
            cid: connection.id,
            action: "closed"
          }, "Connection #%s was closed", connection.id);
          this._removeConnection(connection);
          if (connection.queueEntry) {
            setTimeout(() => {
              if (connection.queueEntry) {
                if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
                  this._requeueEntryOnConnectionClose(connection);
                } else {
                  this._failDeliveryOnConnectionClose(connection);
                }
              }
              this._continueProcessing();
            }, 50);
          } else {
            this._continueProcessing();
          }
        });
        this._connections.push(connection);
        return connection;
      }
      _shouldRequeuOnConnectionClose(queueEntry) {
        if (this.options.maxRequeues === void 0 || this.options.maxRequeues < 0) {
          return true;
        }
        return queueEntry.requeueAttempts < this.options.maxRequeues;
      }
      _failDeliveryOnConnectionClose(connection) {
        if (connection.queueEntry && connection.queueEntry.callback) {
          try {
            connection.queueEntry.callback(new Error("Reached maximum number of retries after connection was closed"));
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "callback",
              messageId: connection.queueEntry.messageId,
              cid: connection.id
            }, "Callback error for #%s: %s", connection.id, E.message);
          }
          connection.queueEntry = false;
        }
      }
      _requeueEntryOnConnectionClose(connection) {
        connection.queueEntry.requeueAttempts = connection.queueEntry.requeueAttempts + 1;
        this.logger.debug({
          tnx: "pool",
          cid: connection.id,
          messageId: connection.queueEntry.messageId,
          action: "requeue"
        }, "Re-queued message <%s> for #%s. Attempt: #%s", connection.queueEntry.messageId, connection.id, connection.queueEntry.requeueAttempts);
        this._queue.unshift(connection.queueEntry);
        connection.queueEntry = false;
      }
      _continueProcessing() {
        if (this._closed) {
          this.close();
        } else {
          setTimeout(() => this._processMessages(), 100);
        }
      }
      _removeConnection(connection) {
        let index2 = this._connections.indexOf(connection);
        if (index2 !== -1) {
          this._connections.splice(index2, 1);
        }
      }
      _checkRateLimit(callback) {
        if (!this._rateLimit.limit) {
          return callback();
        }
        let now = Date.now();
        if (this._rateLimit.counter < this._rateLimit.limit) {
          return callback();
        }
        this._rateLimit.waiting.push(callback);
        if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
          return this._clearRateLimit();
        } else if (!this._rateLimit.timeout) {
          this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
          this._rateLimit.checkpoint = now;
        }
      }
      _clearRateLimit() {
        clearTimeout(this._rateLimit.timeout);
        this._rateLimit.timeout = null;
        this._rateLimit.counter = 0;
        this._rateLimit.checkpoint = false;
        while (this._rateLimit.waiting.length) {
          let cb = this._rateLimit.waiting.shift();
          setImmediate(cb);
        }
      }
      isIdle() {
        return this.idling;
      }
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve2, reject) => {
            callback = shared.callbackPromise(resolve2, reject);
          });
        }
        let auth = new PoolResource(this).auth;
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options2.host || "",
              destPort: options2.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options2.host || "", options2.port || "");
            options2 = shared.assign(false, options2);
            Object.keys(socketOptions).forEach((key) => {
              options2[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options2);
          let returned = false;
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection.quit();
            return callback(null, true);
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            if (auth && (connection.allowsAuth || options2.forceAuth)) {
              connection.login(auth, (err2) => {
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                finalize();
              });
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
    };
    module2.exports = SMTPPool;
  }
});

// node_modules/nodemailer/lib/smtp-transport/index.js
var require_smtp_transport = __commonJS({
  "node_modules/nodemailer/lib/smtp-transport/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var SMTPConnection = require_smtp_connection();
    var wellKnown = require_well_known();
    var shared = require_shared();
    var XOAuth2 = require_xoauth2();
    var packageData = require_package();
    var SMTPTransport = class extends EventEmitter {
      constructor(options2) {
        super();
        options2 = options2 || {};
        if (typeof options2 === "string") {
          options2 = {
            url: options2
          };
        }
        let urlData;
        let service = options2.service;
        if (typeof options2.getSocket === "function") {
          this.getSocket = options2.getSocket;
        }
        if (options2.url) {
          urlData = shared.parseConnectionUrl(options2.url);
          service = service || urlData.service;
        }
        this.options = shared.assign(false, options2, urlData, service && wellKnown(service));
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "smtp-transport"
        });
        let connection = new SMTPConnection(this.options);
        this.name = "SMTP";
        this.version = packageData.version + "[client:" + connection.version + "]";
        if (this.options.auth) {
          this.auth = this.getAuth({});
        }
      }
      getSocket(options2, callback) {
        return setImmediate(() => callback(null, false));
      }
      getAuth(authOpts) {
        if (!authOpts) {
          return this.auth;
        }
        let hasAuth = false;
        let authData = {};
        if (this.options.auth && typeof this.options.auth === "object") {
          Object.keys(this.options.auth).forEach((key) => {
            hasAuth = true;
            authData[key] = this.options.auth[key];
          });
        }
        if (authOpts && typeof authOpts === "object") {
          Object.keys(authOpts).forEach((key) => {
            hasAuth = true;
            authData[key] = authOpts[key];
          });
        }
        if (!hasAuth) {
          return false;
        }
        switch ((authData.type || "").toString().toUpperCase()) {
          case "OAUTH2": {
            if (!authData.service && !authData.user) {
              return false;
            }
            let oauth2 = new XOAuth2(authData, this.logger);
            oauth2.provisionCallback = this.mailer && this.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
            oauth2.on("token", (token) => this.mailer.emit("token", token));
            oauth2.on("error", (err) => this.emit("error", err));
            return {
              type: "OAUTH2",
              user: authData.user,
              oauth2,
              method: "XOAUTH2"
            };
          }
          default:
            return {
              type: (authData.type || "").toString().toUpperCase() || "LOGIN",
              user: authData.user,
              credentials: {
                user: authData.user || "",
                pass: authData.pass,
                options: authData.options
              },
              method: (authData.method || "").trim().toUpperCase() || this.options.authMethod || false
            };
        }
      }
      send(mail, callback) {
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let returned = false;
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options2.host || "",
              destPort: options2.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options2.host || "", options2.port || "");
            options2 = shared.assign(false, options2);
            Object.keys(socketOptions).forEach((key) => {
              options2[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options2);
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            let timer = setTimeout(() => {
              if (returned) {
                return;
              }
              returned = true;
              let err2 = new Error("Unexpected socket close");
              if (connection && connection._socket && connection._socket.upgrading) {
                err2.code = "ETLS";
              }
              callback(err2);
            }, 1e3);
            try {
              timer.unref();
            } catch (E) {
            }
          });
          let sendMessage = () => {
            let envelope = mail.message.getEnvelope();
            let messageId = mail.message.messageId();
            let recipients = [].concat(envelope.to || []);
            if (recipients.length > 3) {
              recipients.push("...and " + recipients.splice(2).length + " more");
            }
            if (mail.data.dsn) {
              envelope.dsn = mail.data.dsn;
            }
            this.logger.info({
              tnx: "send",
              messageId
            }, "Sending message %s to <%s>", messageId, recipients.join(", "));
            connection.send(envelope, mail.message.createReadStream(), (err2, info) => {
              returned = true;
              connection.close();
              if (err2) {
                this.logger.error({
                  err: err2,
                  tnx: "send"
                }, "Send error for %s: %s", messageId, err2.message);
                return callback(err2);
              }
              info.envelope = {
                from: envelope.from,
                to: envelope.to
              };
              info.messageId = messageId;
              try {
                return callback(null, info);
              } catch (E) {
                this.logger.error({
                  err: E,
                  tnx: "callback"
                }, "Callback error for %s: %s", messageId, E.message);
              }
            });
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            let auth = this.getAuth(mail.data.auth);
            if (auth && (connection.allowsAuth || options2.forceAuth)) {
              connection.login(auth, (err2) => {
                if (auth && auth !== this.auth && auth.oauth2) {
                  auth.oauth2.removeAllListeners();
                }
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                sendMessage();
              });
            } else {
              sendMessage();
            }
          });
        });
      }
      verify(callback) {
        let promise;
        if (!callback) {
          promise = new Promise((resolve2, reject) => {
            callback = shared.callbackPromise(resolve2, reject);
          });
        }
        this.getSocket(this.options, (err, socketOptions) => {
          if (err) {
            return callback(err);
          }
          let options2 = this.options;
          if (socketOptions && socketOptions.connection) {
            this.logger.info({
              tnx: "proxy",
              remoteAddress: socketOptions.connection.remoteAddress,
              remotePort: socketOptions.connection.remotePort,
              destHost: options2.host || "",
              destPort: options2.port || "",
              action: "connected"
            }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options2.host || "", options2.port || "");
            options2 = shared.assign(false, options2);
            Object.keys(socketOptions).forEach((key) => {
              options2[key] = socketOptions[key];
            });
          }
          let connection = new SMTPConnection(options2);
          let returned = false;
          connection.once("error", (err2) => {
            if (returned) {
              return;
            }
            returned = true;
            connection.close();
            return callback(err2);
          });
          connection.once("end", () => {
            if (returned) {
              return;
            }
            returned = true;
            return callback(new Error("Connection closed"));
          });
          let finalize = () => {
            if (returned) {
              return;
            }
            returned = true;
            connection.quit();
            return callback(null, true);
          };
          connection.connect(() => {
            if (returned) {
              return;
            }
            let authData = this.getAuth({});
            if (authData && (connection.allowsAuth || options2.forceAuth)) {
              connection.login(authData, (err2) => {
                if (returned) {
                  return;
                }
                if (err2) {
                  returned = true;
                  connection.close();
                  return callback(err2);
                }
                finalize();
              });
            } else {
              finalize();
            }
          });
        });
        return promise;
      }
      close() {
        if (this.auth && this.auth.oauth2) {
          this.auth.oauth2.removeAllListeners();
        }
        this.emit("close");
      }
    };
    module2.exports = SMTPTransport;
  }
});

// node_modules/nodemailer/lib/sendmail-transport/index.js
var require_sendmail_transport = __commonJS({
  "node_modules/nodemailer/lib/sendmail-transport/index.js"(exports, module2) {
    "use strict";
    var spawn = require("child_process").spawn;
    var packageData = require_package();
    var shared = require_shared();
    var SendmailTransport = class {
      constructor(options2) {
        options2 = options2 || {};
        this._spawn = spawn;
        this.options = options2 || {};
        this.name = "Sendmail";
        this.version = packageData.version;
        this.path = "sendmail";
        this.args = false;
        this.winbreak = false;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "sendmail"
        });
        if (options2) {
          if (typeof options2 === "string") {
            this.path = options2;
          } else if (typeof options2 === "object") {
            if (options2.path) {
              this.path = options2.path;
            }
            if (Array.isArray(options2.args)) {
              this.args = options2.args;
            }
            this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options2.newline || "").toString().toLowerCase());
          }
        }
      }
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let args;
        let sendmail;
        let returned;
        const hasInvalidAddresses = [].concat(envelope.from || []).concat(envelope.to || []).some((addr) => /^-/.test(addr));
        if (hasInvalidAddresses) {
          return done(new Error("Can not send mail. Invalid envelope addresses."));
        }
        if (this.args) {
          args = ["-i"].concat(this.args).concat(envelope.to);
        } else {
          args = ["-i"].concat(envelope.from ? ["-f", envelope.from] : []).concat(envelope.to);
        }
        let callback = (err) => {
          if (returned) {
            return;
          }
          returned = true;
          if (typeof done === "function") {
            if (err) {
              return done(err);
            } else {
              return done(null, {
                envelope: mail.data.envelope || mail.message.getEnvelope(),
                messageId,
                response: "Messages queued for delivery"
              });
            }
          }
        };
        try {
          sendmail = this._spawn(this.path, args);
        } catch (E) {
          this.logger.error({
            err: E,
            tnx: "spawn",
            messageId
          }, "Error occurred while spawning sendmail. %s", E.message);
          return callback(E);
        }
        if (sendmail) {
          sendmail.on("error", (err) => {
            this.logger.error({
              err,
              tnx: "spawn",
              messageId
            }, "Error occurred when sending message %s. %s", messageId, err.message);
            callback(err);
          });
          sendmail.once("exit", (code) => {
            if (!code) {
              return callback();
            }
            let err;
            if (code === 127) {
              err = new Error("Sendmail command not found, process exited with code " + code);
            } else {
              err = new Error("Sendmail exited with code " + code);
            }
            this.logger.error({
              err,
              tnx: "stdin",
              messageId
            }, "Error sending message %s to sendmail. %s", messageId, err.message);
            callback(err);
          });
          sendmail.once("close", callback);
          sendmail.stdin.on("error", (err) => {
            this.logger.error({
              err,
              tnx: "stdin",
              messageId
            }, "Error occurred when piping message %s to sendmail. %s", messageId, err.message);
            callback(err);
          });
          let recipients = [].concat(envelope.to || []);
          if (recipients.length > 3) {
            recipients.push("...and " + recipients.splice(2).length + " more");
          }
          this.logger.info({
            tnx: "send",
            messageId
          }, "Sending message %s to <%s>", messageId, recipients.join(", "));
          let sourceStream = mail.message.createReadStream();
          sourceStream.once("error", (err) => {
            this.logger.error({
              err,
              tnx: "stdin",
              messageId
            }, "Error occurred when generating message %s. %s", messageId, err.message);
            sendmail.kill("SIGINT");
            callback(err);
          });
          sourceStream.pipe(sendmail.stdin);
        } else {
          return callback(new Error("sendmail was not found"));
        }
      }
    };
    module2.exports = SendmailTransport;
  }
});

// node_modules/nodemailer/lib/stream-transport/index.js
var require_stream_transport = __commonJS({
  "node_modules/nodemailer/lib/stream-transport/index.js"(exports, module2) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var StreamTransport = class {
      constructor(options2) {
        options2 = options2 || {};
        this.options = options2 || {};
        this.name = "StreamTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "stream-transport"
        });
        this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options2.newline || "").toString().toLowerCase());
      }
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Sending message %s to <%s> using %s line breaks", messageId, recipients.join(", "), this.winbreak ? "<CR><LF>" : "<LF>");
        setImmediate(() => {
          let stream;
          try {
            stream = mail.message.createReadStream();
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "send",
              messageId
            }, "Creating send stream failed for %s. %s", messageId, E.message);
            return done(E);
          }
          if (!this.options.buffer) {
            stream.once("error", (err) => {
              this.logger.error({
                err,
                tnx: "send",
                messageId
              }, "Failed creating message for %s. %s", messageId, err.message);
            });
            return done(null, {
              envelope: mail.data.envelope || mail.message.getEnvelope(),
              messageId,
              message: stream
            });
          }
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          stream.once("error", (err) => {
            this.logger.error({
              err,
              tnx: "send",
              messageId
            }, "Failed creating message for %s. %s", messageId, err.message);
            return done(err);
          });
          stream.on("end", () => done(null, {
            envelope: mail.data.envelope || mail.message.getEnvelope(),
            messageId,
            message: Buffer.concat(chunks, chunklen)
          }));
        });
      }
    };
    module2.exports = StreamTransport;
  }
});

// node_modules/nodemailer/lib/json-transport/index.js
var require_json_transport = __commonJS({
  "node_modules/nodemailer/lib/json-transport/index.js"(exports, module2) {
    "use strict";
    var packageData = require_package();
    var shared = require_shared();
    var JSONTransport = class {
      constructor(options2) {
        options2 = options2 || {};
        this.options = options2 || {};
        this.name = "JSONTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "json-transport"
        });
      }
      send(mail, done) {
        mail.message.keepBcc = true;
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Composing JSON structure of %s to <%s>", messageId, recipients.join(", "));
        setImmediate(() => {
          mail.normalize((err, data) => {
            if (err) {
              this.logger.error({
                err,
                tnx: "send",
                messageId
              }, "Failed building JSON structure for %s. %s", messageId, err.message);
              return done(err);
            }
            delete data.envelope;
            delete data.normalizedHeaders;
            return done(null, {
              envelope,
              messageId,
              message: this.options.skipEncoding ? data : JSON.stringify(data)
            });
          });
        });
      }
    };
    module2.exports = JSONTransport;
  }
});

// node_modules/nodemailer/lib/ses-transport/index.js
var require_ses_transport = __commonJS({
  "node_modules/nodemailer/lib/ses-transport/index.js"(exports, module2) {
    "use strict";
    var EventEmitter = require("events");
    var packageData = require_package();
    var shared = require_shared();
    var LeWindows = require_le_windows();
    var SESTransport = class extends EventEmitter {
      constructor(options2) {
        super();
        options2 = options2 || {};
        this.options = options2 || {};
        this.ses = this.options.SES;
        this.name = "SESTransport";
        this.version = packageData.version;
        this.logger = shared.getLogger(this.options, {
          component: this.options.component || "ses-transport"
        });
        this.maxConnections = Number(this.options.maxConnections) || Infinity;
        this.connections = 0;
        this.sendingRate = Number(this.options.sendingRate) || Infinity;
        this.sendingRateTTL = null;
        this.rateInterval = 1e3;
        this.rateMessages = [];
        this.pending = [];
        this.idling = true;
        setImmediate(() => {
          if (this.idling) {
            this.emit("idle");
          }
        });
      }
      send(mail, callback) {
        if (this.connections >= this.maxConnections) {
          this.idling = false;
          return this.pending.push({
            mail,
            callback
          });
        }
        if (!this._checkSendingRate()) {
          this.idling = false;
          return this.pending.push({
            mail,
            callback
          });
        }
        this._send(mail, (...args) => {
          setImmediate(() => callback(...args));
          this._sent();
        });
      }
      _checkRatedQueue() {
        if (this.connections >= this.maxConnections || !this._checkSendingRate()) {
          return;
        }
        if (!this.pending.length) {
          if (!this.idling) {
            this.idling = true;
            this.emit("idle");
          }
          return;
        }
        let next = this.pending.shift();
        this._send(next.mail, (...args) => {
          setImmediate(() => next.callback(...args));
          this._sent();
        });
      }
      _checkSendingRate() {
        clearTimeout(this.sendingRateTTL);
        let now = Date.now();
        let oldest = false;
        for (let i = this.rateMessages.length - 1; i >= 0; i--) {
          if (this.rateMessages[i].ts >= now - this.rateInterval && (!oldest || this.rateMessages[i].ts < oldest)) {
            oldest = this.rateMessages[i].ts;
          }
          if (this.rateMessages[i].ts < now - this.rateInterval && !this.rateMessages[i].pending) {
            this.rateMessages.splice(i, 1);
          }
        }
        if (this.rateMessages.length < this.sendingRate) {
          return true;
        }
        let delay = Math.max(oldest + 1001, now + 20);
        this.sendingRateTTL = setTimeout(() => this._checkRatedQueue(), now - delay);
        try {
          this.sendingRateTTL.unref();
        } catch (E) {
        }
        return false;
      }
      _sent() {
        this.connections--;
        this._checkRatedQueue();
      }
      isIdle() {
        return this.idling;
      }
      _send(mail, callback) {
        let statObject = {
          ts: Date.now(),
          pending: true
        };
        this.connections++;
        this.rateMessages.push(statObject);
        let envelope = mail.data.envelope || mail.message.getEnvelope();
        let messageId = mail.message.messageId();
        let recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Sending message %s to <%s>", messageId, recipients.join(", "));
        let getRawMessage = (next) => {
          if (!mail.data._dkim) {
            mail.data._dkim = {};
          }
          if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === "string") {
            mail.data._dkim.skipFields += ":date:message-id";
          } else {
            mail.data._dkim.skipFields = "date:message-id";
          }
          let sourceStream = mail.message.createReadStream();
          let stream = sourceStream.pipe(new LeWindows());
          let chunks = [];
          let chunklen = 0;
          stream.on("readable", () => {
            let chunk;
            while ((chunk = stream.read()) !== null) {
              chunks.push(chunk);
              chunklen += chunk.length;
            }
          });
          sourceStream.once("error", (err) => stream.emit("error", err));
          stream.once("error", (err) => {
            next(err);
          });
          stream.once("end", () => next(null, Buffer.concat(chunks, chunklen)));
        };
        setImmediate(() => getRawMessage((err, raw) => {
          if (err) {
            this.logger.error({
              err,
              tnx: "send",
              messageId
            }, "Failed creating message for %s. %s", messageId, err.message);
            statObject.pending = false;
            return callback(err);
          }
          let sesMessage = {
            RawMessage: {
              Data: raw
            },
            Source: envelope.from,
            Destinations: envelope.to
          };
          Object.keys(mail.data.ses || {}).forEach((key) => {
            sesMessage[key] = mail.data.ses[key];
          });
          let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
          let aws = this.ses.aws || {};
          let getRegion = (cb) => {
            if (ses.config && typeof ses.config.region === "function") {
              return ses.config.region().then((region) => cb(null, region)).catch((err2) => cb(err2));
            }
            return cb(null, ses.config && ses.config.region || "us-east-1");
          };
          getRegion((err2, region) => {
            if (err2 || !region) {
              region = "us-east-1";
            }
            let sendPromise;
            if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
              sendPromise = ses.send(new aws.SendRawEmailCommand(sesMessage));
            } else {
              sendPromise = ses.sendRawEmail(sesMessage).promise();
            }
            sendPromise.then((data) => {
              if (region === "us-east-1") {
                region = "email";
              }
              statObject.pending = false;
              callback(null, {
                envelope: {
                  from: envelope.from,
                  to: envelope.to
                },
                messageId: "<" + data.MessageId + (!/@/.test(data.MessageId) ? "@" + region + ".amazonses.com" : "") + ">",
                response: data.MessageId,
                raw
              });
            }).catch((err3) => {
              this.logger.error({
                err: err3,
                tnx: "send"
              }, "Send error for %s: %s", messageId, err3.message);
              statObject.pending = false;
              callback(err3);
            });
          });
        }));
      }
      verify(callback) {
        let promise;
        let ses = (this.ses.aws ? this.ses.ses : this.ses) || {};
        let aws = this.ses.aws || {};
        const sesMessage = {
          RawMessage: {
            Data: "From: invalid@invalid\r\nTo: invalid@invalid\r\n Subject: Invalid\r\n\r\nInvalid"
          },
          Source: "invalid@invalid",
          Destinations: ["invalid@invalid"]
        };
        const cb = (err) => {
          if (err && err.code !== "InvalidParameterValue") {
            return callback(err);
          }
          return callback(null, true);
        };
        if (!callback) {
          promise = new Promise((resolve2, reject) => {
            callback = shared.callbackPromise(resolve2, reject);
          });
        }
        if (typeof ses.send === "function" && aws.SendRawEmailCommand) {
          ses.send(new aws.SendRawEmailCommand(sesMessage), cb);
        } else {
          ses.sendRawEmail(sesMessage, cb).promise();
        }
        return promise;
      }
    };
    module2.exports = SESTransport;
  }
});

// node_modules/nodemailer/lib/nodemailer.js
var require_nodemailer = __commonJS({
  "node_modules/nodemailer/lib/nodemailer.js"(exports, module2) {
    "use strict";
    var Mailer = require_mailer();
    var shared = require_shared();
    var SMTPPool = require_smtp_pool();
    var SMTPTransport = require_smtp_transport();
    var SendmailTransport = require_sendmail_transport();
    var StreamTransport = require_stream_transport();
    var JSONTransport = require_json_transport();
    var SESTransport = require_ses_transport();
    var fetch3 = require_fetch();
    var packageData = require_package();
    var ETHEREAL_API = (process.env.ETHEREAL_API || "https://api.nodemailer.com").replace(/\/+$/, "");
    var ETHEREAL_WEB = (process.env.ETHEREAL_WEB || "https://ethereal.email").replace(/\/+$/, "");
    var ETHEREAL_CACHE = ["true", "yes", "y", "1"].includes((process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase());
    var testAccount = false;
    module2.exports.createTransport = function(transporter, defaults) {
      let urlConfig;
      let options2;
      let mailer;
      if (typeof transporter === "object" && typeof transporter.send !== "function" || typeof transporter === "string" && /^(smtps?|direct):/i.test(transporter)) {
        if (urlConfig = typeof transporter === "string" ? transporter : transporter.url) {
          options2 = shared.parseConnectionUrl(urlConfig);
        } else {
          options2 = transporter;
        }
        if (options2.pool) {
          transporter = new SMTPPool(options2);
        } else if (options2.sendmail) {
          transporter = new SendmailTransport(options2);
        } else if (options2.streamTransport) {
          transporter = new StreamTransport(options2);
        } else if (options2.jsonTransport) {
          transporter = new JSONTransport(options2);
        } else if (options2.SES) {
          transporter = new SESTransport(options2);
        } else {
          transporter = new SMTPTransport(options2);
        }
      }
      mailer = new Mailer(transporter, options2, defaults);
      return mailer;
    };
    module2.exports.createTestAccount = function(apiUrl, callback) {
      let promise;
      if (!callback && typeof apiUrl === "function") {
        callback = apiUrl;
        apiUrl = false;
      }
      if (!callback) {
        promise = new Promise((resolve2, reject) => {
          callback = shared.callbackPromise(resolve2, reject);
        });
      }
      if (ETHEREAL_CACHE && testAccount) {
        setImmediate(() => callback(null, testAccount));
        return promise;
      }
      apiUrl = apiUrl || ETHEREAL_API;
      let chunks = [];
      let chunklen = 0;
      let req = fetch3(apiUrl + "/user", {
        contentType: "application/json",
        method: "POST",
        body: Buffer.from(JSON.stringify({
          requestor: packageData.name,
          version: packageData.version
        }))
      });
      req.on("readable", () => {
        let chunk;
        while ((chunk = req.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      req.once("error", (err) => callback(err));
      req.once("end", () => {
        let res = Buffer.concat(chunks, chunklen);
        let data;
        let err;
        try {
          data = JSON.parse(res.toString());
        } catch (E) {
          err = E;
        }
        if (err) {
          return callback(err);
        }
        if (data.status !== "success" || data.error) {
          return callback(new Error(data.error || "Request failed"));
        }
        delete data.status;
        testAccount = data;
        callback(null, testAccount);
      });
      return promise;
    };
    module2.exports.getTestMessageUrl = function(info) {
      if (!info || !info.response) {
        return false;
      }
      let infoProps = new Map();
      info.response.replace(/\[([^\]]+)\]$/, (m, props) => {
        props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m2, key, value) => {
          infoProps.set(key, value);
        });
      });
      if (infoProps.has("STATUS") && infoProps.has("MSGID")) {
        return (testAccount.web || ETHEREAL_WEB) + "/message/" + infoProps.get("MSGID");
      }
      return false;
    };
  }
});

// .svelte-kit/vercel/entry.js
__markAsModule(exports);
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      fulfil(null);
      return;
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    let data;
    if (!isNaN(length)) {
      data = new Uint8Array(length);
      let i = 0;
      req.on("data", (chunk) => {
        data.set(chunk, i);
        i += chunk.length;
      });
    } else {
      if (h["transfer-encoding"] === void 0) {
        fulfil(null);
        return;
      }
      data = new Uint8Array(0);
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      const [type] = h["content-type"].split(/;\s*/);
      if (type === "application/octet-stream") {
        fulfil(data);
      }
      const decoder = new TextDecoder(h["content-encoding"] || "utf-8");
      fulfil(decoder.decode(data));
    });
  });
}

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var {Readable} = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const {size} = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], {type: String(type).toLowerCase()});
    Object.assign(wm.get(blob), {size: span, parts: blobParts});
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: {enumerable: true},
  type: {enumerable: true},
  slice: {enumerable: true}
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message2, type) {
    super(message2);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message2, type, systemError) {
    super(message2, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const {buffer, byteOffset, byteLength} = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: {enumerable: true},
  bodyUsed: {enumerable: true},
  arrayBuffer: {enumerable: true},
  blob: {enumerable: true},
  json: {enumerable: true},
  text: {enumerable: true}
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let {body} = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let {body} = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({highWaterMark});
    p2 = new import_stream.PassThrough({highWaterMark});
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const {body} = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, {body}) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_HTTP_TOKEN"});
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", {value: "ERR_INVALID_CHAR"});
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = {enumerable: true};
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url2, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url2).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: {enumerable: true},
  status: {enumerable: true},
  ok: {enumerable: true},
  redirected: {enumerable: true},
  statusText: {enumerable: true},
  headers: {enumerable: true},
  clone: {enumerable: true}
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: {enumerable: true},
  url: {enumerable: true},
  headers: {enumerable: true},
  redirect: {enumerable: true},
  clone: {enumerable: true},
  signal: {enumerable: true}
});
var getNodeRequestOptions = (request) => {
  const {parsedURL} = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let {agent} = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message2, type = "aborted") {
    super(message2, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url2, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url2, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url2}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, {headers: {"Content-Type": data.typeFull}});
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const {signal} = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update, subscribe};
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url2) => css2.add(url2));
      if (node.js)
        node.js.forEach((url2) => js.add(url2));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: {code: "", map: null}};
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url: url2, body: body2, json}) => {
    return body2 ? `<script type="svelte-data" url="${url2}" body="${hash(body2)}">${json}</script>` : `<script type="svelte-data" url="${url2}">${json}</script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({head, body})
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const {name, message: message2, stack} = error3;
    serialized = try_serialize({name, message: message2, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error: error3};
    }
    return {status, error: error3};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const {module: module2} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url2;
        if (typeof resource === "string") {
          url2 = resource;
        } else {
          url2 = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url2.startsWith(options2.paths.assets)) {
          url2 = url2.replace(options2.paths.assets, "");
        }
        if (url2.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url2}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url2)) {
          response = await fetch(url2, opts);
        } else {
          const [path, search] = url2.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url2,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url: url2,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options: options2, state, $session, status, error: error3}) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({request, options: options2, state, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error: error3} = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = {...headers, "content-type": "application/json"};
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return {status, body: normalized_body, headers};
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const {data, append} = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const {data, append} = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers: lowercase_keys(incoming.headers),
        body: parse_body(incoming),
        params: null,
        locals: {}
      },
      render: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: {ssr: false, router: true, hydrate: true},
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var tasks = new Set();
function custom_event(type, detail) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, false, false, detail);
  return e;
}
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: "open"});
    }
    connectedCallback() {
      const {on_mount} = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// .svelte-kit/output/server/app.js
var import_nodemailer = __toModule(require_nodemailer());
var css$p = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title2 = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title2 = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$p);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title2)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({head, body}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="apple-touch-icon" sizes="180x180" href="/images/app-icons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/images/app-icons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/images/app-icons/favicon-16x16.png" />
    <link rel="mask-icon" href="/images/app-icons/safari-pinned-tab.svg" color="#00b478" />
    <link rel="shortcut icon" href="/images/app-icons/favicon.ico" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <meta name="msapplication-TileColor" content="#00b478" />
    <meta name="msapplication-config" content="/images/app-icons/browserconfig.xml" />
    <meta name="theme-color" content="#00b478" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style>
      /* cyrillic-ext */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v30/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr4fIA9c.woff2)
          format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v30/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrcfIA9c.woff2)
          format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* greek */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v30/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrAfIA9c.woff2)
          format('woff2');
        unicode-range: U+0370-03FF;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v30/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrwfIA9c.woff2)
          format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0,
          U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v30/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr0fIA9c.woff2)
          format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
          U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v30/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrMfIA.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* devanagari */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z11lFc-K.woff2)
          format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC,
          U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1JlFc-K.woff2)
          format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
          U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* devanagari */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJbecmNE.woff2)
          format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC,
          U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecmNE.woff2)
          format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
          U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecg.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* devanagari */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z11lFc-K.woff2)
          format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC,
          U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2)
          format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113,
          U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2)
          format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
          U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    </style>

    ` + head + '\n  </head>\n  <body>\n    <div id="svelte">' + body + "</div>\n  </body>\n</html>\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-1ba2a7d4.js",
      css: ["/./_app/assets/start-a8cd1609.css", "/./_app/assets/vendor-79ae9df4.css"],
      js: ["/./_app/start-1ba2a7d4.js", "/./_app/chunks/vendor-005bf708.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: false,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: false,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{"file": "BingSiteAuth.xml", "size": 88, "type": "application/xml"}, {"file": "google07cd12341c6cc68a.html", "size": 55, "type": "text/html"}, {"file": "images/app-icons/android-chrome-192x192.png", "size": 969, "type": "image/png"}, {"file": "images/app-icons/android-chrome-512x512.png", "size": 2617, "type": "image/png"}, {"file": "images/app-icons/apple-touch-icon.png", "size": 1048, "type": "image/png"}, {"file": "images/app-icons/browserconfig.xml", "size": 272, "type": "application/xml"}, {"file": "images/app-icons/favicon-16x16.png", "size": 437, "type": "image/png"}, {"file": "images/app-icons/favicon-32x32.png", "size": 574, "type": "image/png"}, {"file": "images/app-icons/favicon.ico", "size": 15086, "type": "image/vnd.microsoft.icon"}, {"file": "images/app-icons/mstile-150x150.png", "size": 1061, "type": "image/png"}, {"file": "images/app-icons/safari-pinned-tab.svg", "size": 1041, "type": "image/svg+xml"}, {"file": "images/promo/promo-default-3000x1400.png", "size": 22245, "type": "image/png"}, {"file": "robots.txt", "size": 75, "type": "text/plain"}, {"file": "sitemap.xml", "size": 499, "type": "application/xml"}],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/request-quote\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/request-quote.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/api\/message\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return message;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/api\/email\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return email$1;
      })
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({request, render: render2}) => render2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/request-quote.svelte": () => Promise.resolve().then(function() {
    return requestQuote;
  })
};
var metadata_lookup = {"src/routes/__layout.svelte": {"entry": "/./_app/pages/__layout.svelte-278109b9.js", "css": ["/./_app/assets/pages/__layout.svelte-82f70ba9.css", "/./_app/assets/vendor-79ae9df4.css", "/./_app/assets/button-1fe96d55.css"], "js": ["/./_app/pages/__layout.svelte-278109b9.js", "/./_app/chunks/vendor-005bf708.js", "/./_app/chunks/button-5e0ffe23.js"], "styles": null}, ".svelte-kit/build/components/error.svelte": {"entry": "/./_app/error.svelte-48bc3f1f.js", "css": ["/./_app/assets/vendor-79ae9df4.css"], "js": ["/./_app/error.svelte-48bc3f1f.js", "/./_app/chunks/vendor-005bf708.js"], "styles": null}, "src/routes/index.svelte": {"entry": "/./_app/pages/index.svelte-9114ba36.js", "css": ["/./_app/assets/pages/index.svelte-ee448f97.css", "/./_app/assets/vendor-79ae9df4.css", "/./_app/assets/button-1fe96d55.css", "/./_app/assets/share-4b691a2f.css"], "js": ["/./_app/pages/index.svelte-9114ba36.js", "/./_app/chunks/vendor-005bf708.js", "/./_app/chunks/button-5e0ffe23.js", "/./_app/chunks/share-726a3d77.js"], "styles": null}, "src/routes/request-quote.svelte": {"entry": "/./_app/pages/request-quote.svelte-a07cd4c4.js", "css": ["/./_app/assets/pages/request-quote.svelte-ccb8dc6a.css", "/./_app/assets/vendor-79ae9df4.css", "/./_app/assets/share-4b691a2f.css"], "js": ["/./_app/pages/request-quote.svelte-a07cd4c4.js", "/./_app/chunks/vendor-005bf708.js", "/./_app/chunks/share-726a3d77.js"], "styles": null}};
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({paths: {"base": "", "assets": "/."}});
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({...request, host}, options, {prerender});
}
function email(config) {
  if (!config)
    throw new Error("NO_EMAIL_CONFIG: Email configuration is not found.");
  if (!config.from && false)
    throw new Error("NO_EMAIL_FROM: Sender email address not provided.");
  if (!config.pass && false)
    throw new Error("NO_EMAIL_PASS: Sender email password not provided.");
  if (!config.to)
    throw new Error("NO_EMAIL_TO: Target emailTo address not provided.");
  if (!config.html && !config.text)
    throw new Error("NO_EMAIL_BODY: Neither 'emailTo.html' nor 'emailTo.text' is provided.");
  return (0, import_nodemailer.createTransport)({
    service: config.service || {}.VITE_EMAIL_SERVICE || "gmail",
    auth: {
      user: config.from || "biruktesfayeve@gmail.com",
      pass: config.pass || "pykrcsktdleandkc"
    }
  }).sendMail({
    from: config.from || "biruktesfayeve@gmail.com",
    to: config.to,
    subject: config.subject || "",
    html: config.html,
    text: !config.html ? config.text : ""
  });
}
var email$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  email
});
async function post(request) {
  if (request.method.toUpperCase() !== "POST")
    return {status: 405};
  const body = request.body;
  try {
    const msg = body;
    if (!msg)
      throw new Error("NO_REQUEST_BODY: Request body not found");
    if (!msg.from)
      throw new Error("NO_FROM: Your Email is required!");
    if (!msg.subject)
      throw new Error("NO_SUBJECT: Subject is required!");
    if (!msg.text)
      throw new Error("NO_MESSAGE: Your Message is required!");
    await email({
      to: "kelaltech@gmail.com",
      subject: `Message from Contact Us Form (#${Date.now()})`,
      text: `Let's Have a Chat (kelaltech.com)

SENT ON:
${new Date().toUTCString()}

FROM:
${msg.from}

SUBJECT:
${msg.subject}

MESSAGE:
${msg.text}`
    });
    return {
      status: 200,
      body: {
        success: true,
        data: "email sent successfully "
      }
    };
  } catch (e) {
    return {
      status: 500,
      body: {
        error: e.message
      }
    };
  }
}
var message = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  post
});
var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAABACAYAAAB/V2fWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAApPSURBVHgB7Z1PftS4EsdL7iQTVi9zAswJXjgBnTWBIScgOQH9Fm9o3lsQNkMzs0g4AeEECZCsaU5A5gR4TjCZ1TD5Y02VZLclW7bV/tvN6Pv5NDRutSW7fy6VVCUB4HA4HA6Hw+FwOBwOh8PhcDgcDoejFRh0yYfxPtb4vLAMhxfwYLIPy8LxaANW13Yh9C7g4eQIFpFFauMcbfHAUY/V7z7ibTzAO/kG3o93YRFZWz+YtZEMRJ+o9+v02aioqBNnbdhm8hZ8WES40i4G96BX1PvF/11U0onTsbA4cToWFidOx8LixOlYWFZKSxyPfVgFHGHN5ewHELL/wA0/h51JAHXou35HbxSLs44wvPANeOwCz7FVWSB9198GdE0DHLHO8+DQ3CCsb+Cv5Yt/X+M19nFN1Pa4Dd7NBdz/5RxaZKWwIXWEAQxvKGyIc1QRSN/1t8GH8RCnT46B2uXBFP/eKi9PQQu+Kb4Ts4qv03GAn03hEoMWbV4btcGDx8D5I60NfIBteHoBjJ201Qazz9mMMGL8SCC+9Zn6rr8NTp89RjF9VNo2zC1LbT0df5TlqZx2PTE+zl/uwir7XDaZXQmy1mfPjkUbqB5jG/CYaAN8wTYcQMNkxdmsMGLwnOy4/DT8Anh43k79PQr0bEzW70g7RmFaE8n9H+of4L2h65Qv9TheLz9oVKCiDeufI2tpCR9hGz5LF6QZvGyjGheGhPGSRuPND/keeN5BK/X3JVASJod9/SC215Q/YLr/DI7w+1uw/ep72J7cEa8ruCPOIQUbgQI9++8m1EXEvtMaIKOBDxPVuz1h4sW8u9EDFijlNlHUFkbIjsTnbFOYpbQuzBi/Mx+UfmSKaYsuMYau09uDhy9PjN9Zg+daqDGEPWNyhGz7IZz9bwr8JnEV+IDuX7EfW8bqLbLyfnKAnaModzL36/5PNBg6x3t5lNLNUFjx7ZeHUBNpOasK8wpvBI06gV1AZWoIs1r97VtQYX1ufdSFie1lg61cYVJ71PJklcoyiIRAPNU9GNbqVsU94SOtzVd/Fj/I9Bn9DpoVx4esge7dqyVMatiscWlfyIaawqxef3sCjf01OcKOkW2U1sbMmupj4sN2jd25DcJCKcJYvbULVVlL+bkhjcIPyx98+g04e50cQBduZb22i+GJOTfg86g8EYbauLkF0oAwa9UP8UPZHB7czj7oolu0cCP4D8n78NNcbkfI3iXVFWf6FDcBp4wSgrlyP6+/HqZ84DkGU2ZWwENHmvwgO78tyL3RdIx8OSsr3KAwK9U/w7acHXo3LmHXe7DzSwCl39Xu/T2cSvoC1pBxifLGOf8equMr5/wV5oEs7OnTAN9Ji8lY9YckwhMNigWq+w1pglILYGXBWhDmXPV3jByk2OAnb4VQffuXKmz2L2gCxn6HuVF9/zoDZEk8lVQm0MCua4JigbCwPWHa1N8Z2j0ctjFBnVtvqPp+PcJ4bXGq4Us/p4u3F0aMqYvl+FRdeSe1Bl916u8MnNq6gtR1ignq3wqnVxjOOnAmy3P+Gh68GkHn0EMVuwesyoDGhwbxMifXLej8wojRLBg90TcvOhGmsf6OIFGRAKlu5u2kPjwQceo8Qvbb7D3zHkMfhEzxM3G2YZ7pIBkA8KFBTLH1RKBVhRETC6Ttrrys/s4EqvhcYtqIojjqx/CmYPpKmf/ELrGNeLlsREEULzV9JSbkbRk8sSvHreek85KNpUCbomrkpynkuQLoGrKiHFQfUOYYmCzSg8kU/5wqR55bhyOpXJGVY5og/Nyysg1BcgDdEZEXUFa/CNHughXKA8xZ4XRTUSZ8/YnquiHRpuqnZah9CfTBhCzgNDkg4s/mB595SrwcrScfFGcckZtA2UtUjib+8+4V55+Uf2wIi0hlTSINQ90oUF4ADehM56bv02eZ3IECOLzT2kLCzmkLw4vjJaer1r3WiTytUs7jzCFvqH58YilWLXsEf1aOkhjqoN6/vA0hzAkd+3B/8iJTlta+08OkE4gBE/mENOMB7HZ0f4ZaqTDcgYc/n2Trp3Dqd19y0t4O0cLrgvwwPsT2mbrpKR4PQF6rn6o/iOZbN6LrC/D67mTOIHNUc4IfaECUQaPNGqJu8zFXw0ft5IPyjd4s6GyApHSvZG3O/n87U5aiMiQyvY2+6AJF4jG5SIys6TD1zSncXE7BWD+FIL0Xxs+o605bLbL25pS+oei+ZRc+VI5Hvr3WZZt9S3IddFcngXHtgbBd4GYvkLpdOffq5WMW1t+GQCnxJH5bcE4aIKX96Msbs9Um6ycHcm+hnKlMqZtsFcbBpf9rElxg/B71AAx7mrKAikil+3pXPoDKvVDfZ8+dJ/6p+g+bbl2luIttIu2OGs1EjNdvr36li982dD3zINfV7Aph2sSiT38cARvcw/KfrNLKyKoN1rAr9DZF7J4I+R/44wdi3riKu0MJHiHeI3IRri6PSpM75BTYUKvfY+dw+fVE+268DxJhc17xe2FPSQbJE27Akfoxi2K4PthjFkhT+aDF4myw/kigeSlsjt7xGkk36zZRuaH6sUu6Keh6HL0jfZ46I2uiSWGWW85m6q87we9oHTkgqpaPib5QuNnj0o7q9TthLgXJaH0ugXa25qf5+r8lYTaxoG2B0aeS2s7HtBZmUfx1QYXZtVDe//ioNIK05GTnOQsFWlMYjNbVWFjMK5aehG6m/raEGQuF/u6KQTQfzOvnTS4q5kl4o0A7FEbf9c9LLBTwvlmh9EF+hCiTj9mxMPquvy1EkoNlKHausjgBnpfMsaSUJz2IXdFwVNyEMKr8bxpN1t8GZ0+Po6xxX6y0lNnk77Toj9xg4Ql2wSNthQGw18YokUhBS5WlXEs1UeRsTFGpN9GOIFi3Fuue4rXvLfvAr3x/TnmB9OonktJ3/UWQ6MSqyXh5g/D/soM5scEC+ttMXMM74CGW855EexyBJlDaPEvsUcSmIsRJ0LyvTF37IyNmkYQhYtyvRdRL/ocEQxmoGN21Wne+oJSL05GP/OG3ZlYsNOzSIT5DYVKPsP1qX/nkEE6ffkZB0e4YMg4tyz4S2wref6ku89gXaWzmxBLsIf7SRRinvK2sj8R3lxS37XbbyI0KAmOeJ6OVklwmdiRlAS55dhUAZfKY8gA4vM1Yx+uv+9H5f4AlxlnO9vHFy5T9NTsyG+X7Ikm3rq8oNjgYN7I8t0+cODsBfUFamWn8KLyAm8vEInK21IJqEifOtglxUOPxx2JjrjKLSOtrKBuc8iflYrN/NM7nbIIwGqh47ElmJeTAk6PrTJrfSC7uev8siSp53pH4m5YQq+FQ+h5NWX3jsfQ05fOcDjtOx0f4pxzQUDd+9eed2UBFW7TGohzS0JeZ/6ndPbSyYoqKzuHLr2BYNx4UxTMEeYvqyMfNW2S2JDjL2RTbk91ozQ3OT4b6CJqml2jLauF3kuDEvORbsfYnve2MVlYIORDvaZtrdbR+SSshccopbx9PmvfkC7JvksPhcDgcDofD4XA4HA6Hw9EufwNe3vDLNOZVfAAAAABJRU5ErkJggg==";
var css$o = {
  code: "button.svelte-1q9udq6,a.svelte-1q9udq6{display:flex;align-items:center;padding:16px 32px;border-radius:14px;background:none;font-weight:500;color:#0e1c2a}.border-gradient.svelte-1q9udq6{border:double 3px transparent;background-image:linear-gradient(white, white),\n      radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);background-origin:border-box;background-clip:padding-box, border-box;-webkit-background-clip:padding-box, border-box}button.svelte-1q9udq6:hover,a.svelte-1q9udq6:hover{cursor:pointer;text-decoration:none}",
  map: '{"version":3,"file":"button.svelte","sources":["button.svelte"],"sourcesContent":["<script>\\n  let className\\n  export { className as class }\\n  export let to\\n</script>\\n\\n{#if !to}\\n  <button class={`small-400 border-gradient border-gradient-purple ${className || \'\'}`}>\\n    <slot>Button</slot>\\n  </button>\\n{:else}\\n  <a href={to} class={` small-400 border-gradient border-gradient-purple ${className || \'\'}`}>\\n    <slot>Link</slot>\\n  </a>\\n{/if}\\n\\n<style>\\n  button,\\n  a {\\n    display: flex;\\n    align-items: center;\\n    padding: 16px 32px;\\n    border-radius: 14px;\\n    background: none;\\n    font-weight: 500;\\n    color: #0e1c2a;\\n  }\\n\\n  .border-gradient {\\n    border: double 3px transparent;\\n    background-image: linear-gradient(white, white),\\n      radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);\\n    background-origin: border-box;\\n    background-clip: padding-box, border-box;\\n    -webkit-background-clip: padding-box, border-box;\\n  }\\n\\n  button:hover,\\n  a:hover {\\n    cursor: pointer;\\n    text-decoration: none;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAiBE,qBAAM,CACN,CAAC,eAAC,CAAC,AACD,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,gBAAgB,eAAC,CAAC,AAChB,MAAM,CAAE,MAAM,CAAC,GAAG,CAAC,WAAW,CAC9B,gBAAgB,CAAE,gBAAgB,KAAK,CAAC,CAAC,KAAK,CAAC,CAAC;MAC9C,gBAAgB,IAAI,CAAC,OAAO,CAAC,EAAE,CAAC,EAAE,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CACpE,iBAAiB,CAAE,UAAU,CAC7B,eAAe,CAAE,WAAW,CAAC,CAAC,UAAU,CACxC,uBAAuB,CAAE,WAAW,CAAC,CAAC,UAAU,AAClD,CAAC,AAED,qBAAM,MAAM,CACZ,gBAAC,MAAM,AAAC,CAAC,AACP,MAAM,CAAE,OAAO,CACf,eAAe,CAAE,IAAI,AACvB,CAAC"}'
};
var Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {class: className} = $$props;
  let {to} = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  $$result.css.add(css$o);
  return `${!to ? `<button class="${escape2(null_to_empty(`small-400 border-gradient border-gradient-purple ${className || ""}`)) + " svelte-1q9udq6"}">${slots.default ? slots.default({}) : `Button`}</button>` : `<a${add_attribute("href", to, 0)} class="${escape2(null_to_empty(` small-400 border-gradient border-gradient-purple ${className || ""}`)) + " svelte-1q9udq6"}">${slots.default ? slots.default({}) : `Link`}</a>`}`;
});
var menuIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABRSURBVHgB7dS7DcAgDATQcyZJ9skQjMEIbMESMA9swqehQwJEBfcK6yS7PBmg40lLTocyX+wR8Zuvhgd0POluvFZIsFjDFt1Epq7H/xVbRBtleVYNCqKL/uQAAAAASUVORK5CYII=";
var css$n = {
  code: ".header-container.svelte-o7rvi2.svelte-o7rvi2{background:var(--backgroundColor);width:100%;padding:32px;display:flex;justify-content:space-between;height:112px;box-sizing:border-box;z-index:9999;color:var(--color)}.company-logo.svelte-o7rvi2.svelte-o7rvi2{align-self:center}.header-items.svelte-o7rvi2.svelte-o7rvi2{display:flex;align-items:center}.menu-icon.svelte-o7rvi2.svelte-o7rvi2{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;display:flex;justify-content:center;align-items:center;margin-left:16px}.menu-icon.svelte-o7rvi2>span.svelte-o7rvi2{font-size:18px;margin-left:19px;font-weight:500}.menu-icon.svelte-o7rvi2.svelte-o7rvi2:hover{cursor:pointer}@media screen and (max-width: 550px){.header-container.svelte-o7rvi2.svelte-o7rvi2{padding:16px}.company-logo.svelte-o7rvi2 img.svelte-o7rvi2{height:42px}.action-btn.svelte-o7rvi2.svelte-o7rvi2{display:none}}",
  map: `{"version":3,"file":"header.svelte","sources":["header.svelte"],"sourcesContent":["<script>\\n  import logo from '../../../assets/images/brand/logo.png'\\n  import Button from '../button/button.svelte'\\n  import menuIcon from '../../../assets/images/icons/menu.png'\\n\\n  export let backgroundColor\\n  export let color = '#0e1c2a'\\n</script>\\n\\n<div class={'header-container '}>\\n  <div class={'company-logo'}>\\n    <a href=\\"/\\">\\n      <img height=\\"64\\" src={logo} alt=\\"kelaltech logo\\" />\\n    </a>\\n  </div>\\n  <div class={'header-items'}>\\n    <div class={'action-btn'}>\\n      <Button to={'/request-quote'}>Lets talk</Button>\\n    </div>\\n    <button class={'menu-icon'}>\\n      <img src={menuIcon} alt=\\"menu icon\\" />\\n      <span>Menu</span>\\n    </button>\\n  </div>\\n</div>\\n\\n<style>\\n  .header-container {\\n    background: var(--backgroundColor);\\n    width: 100%;\\n    padding: 32px;\\n    display: flex;\\n    justify-content: space-between;\\n    height: 112px;\\n    box-sizing: border-box;\\n    z-index: 9999;\\n    color: var(--color);\\n  }\\n\\n  .company-logo {\\n    align-self: center;\\n  }\\n  .header-items {\\n    display: flex;\\n    align-items: center;\\n  }\\n  .menu-icon {\\n    -webkit-appearance: none;\\n    -moz-appearance: none;\\n    appearance: none;\\n    border: none;\\n    background: transparent;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    margin-left: 16px;\\n  }\\n\\n  .menu-icon > span {\\n    font-size: 18px;\\n    margin-left: 19px;\\n    font-weight: 500;\\n  }\\n\\n  .menu-icon:hover {\\n    cursor: pointer;\\n  }\\n\\n  @media screen and (max-width: 550px) {\\n    .header-container {\\n      padding: 16px;\\n    }\\n\\n    .company-logo img {\\n      height: 42px;\\n    }\\n\\n    .action-btn {\\n      display: none;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2BE,iBAAiB,4BAAC,CAAC,AACjB,UAAU,CAAE,IAAI,iBAAiB,CAAC,CAClC,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,UAAU,CACtB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,OAAO,CAAC,AACrB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,UAAU,4BAAC,CAAC,AACV,kBAAkB,CAAE,IAAI,CACxB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,wBAAU,CAAG,IAAI,cAAC,CAAC,AACjB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,sCAAU,MAAM,AAAC,CAAC,AAChB,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,OAAO,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACpC,iBAAiB,4BAAC,CAAC,AACjB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,2BAAa,CAAC,GAAG,cAAC,CAAC,AACjB,MAAM,CAAE,IAAI,AACd,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC"}`
};
var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {backgroundColor} = $$props;
  let {color = "#0e1c2a"} = $$props;
  if ($$props.backgroundColor === void 0 && $$bindings.backgroundColor && backgroundColor !== void 0)
    $$bindings.backgroundColor(backgroundColor);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$n);
  return `<div class="${escape2(null_to_empty("header-container ")) + " svelte-o7rvi2"}"><div class="${escape2(null_to_empty("company-logo")) + " svelte-o7rvi2"}"><a href="${"/"}"><img height="${"64"}"${add_attribute("src", logo, 0)} alt="${"kelaltech logo"}" class="${"svelte-o7rvi2"}"></a></div>
  <div class="${escape2(null_to_empty("header-items")) + " svelte-o7rvi2"}"><div class="${escape2(null_to_empty("action-btn")) + " svelte-o7rvi2"}">${validate_component(Button, "Button").$$render($$result, {to: "/request-quote"}, {}, {default: () => `Lets talk`})}</div>
    <button class="${escape2(null_to_empty("menu-icon")) + " svelte-o7rvi2"}"><img${add_attribute("src", menuIcon, 0)} alt="${"menu icon"}">
      <span class="${"svelte-o7rvi2"}">Menu</span></button></div>
</div>`;
});
var facebook = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMlSURBVHgB1VfBUhNBEO2eCVJqJfHAiUiZCqkQrfLIetcfWD7AcFe5W3jnC/QDwB/gA9APyB49AFuQooB44sKuVSlJZtruCUEIJmGXVYveymQnO9v9puf1mwnAfzaEjCxfLtcBdN11jAa5DN/2yASd47A96r0c3MJmFmbyZ/SwQaReA0EBiedjEUjxF/HsuD8FubgD8CJzAA8W5ma7qNY5cAm4Uai+E9E2B4+AEMkSQ4AlRJUf5ycVAAmeI7XOEUqgqI1WfTgNW83hcfm5pz4DwcwBaMq9BbQlIrszDZ3lk/AkHjEUJ5EsMYD7tcclIFoS+vaAVuLdkcE5OvMBMgYwBdOvCA07p83O7vEFuwu1+Qan+w0YZDIqxshMJMsUUJQpAA5SR+cbdga/CSeAzHupag7IJSAVIE9c284UgAPhWhUN+pq058IBfI32995BAlOQxkYkFRVGkNBSAbhObeNaay0ktYlLkC8/r4PtNkBZUPzh0lt0GbgCQp8Dw8VitbrmcFghiiJWw93ocHsjNQAwPxucWl9uRV5ZeCQDzEN7UX4Ipg2OmVhiASz1q4BYgTg+OSKmB8ASyxOWCzbZa1NKi2d8fBoeBIMxUXgUFGuVFYumICVAxDqJ2mPAPg8OxvmfCMBtKv10N+OD/c1R41iKv1zuFyu1OvapMRZAuiq4iVny+sVimuOG3VAHJAfkPSrPO74RdePT1uGVGRdqc4sKdMnIrI3QAepMAIiOwtstAbiqd0TyLSqfeI1RaQ5YWY7ClnNefPbkJRn46EgqWEV++5USTHI+GYCe+ky263YVyqGsmcezm2UgfA7oB7A9W0CpAiCWXRVIpZCgIdy4NYD44Jto/uqgn69U1xiMf1kHtNYsQq5WgnivtQoJLJ0SSmN+942B1JYKAGVYPCk9DWu+OXeW3F3iN9SldtgsJN+MEgOQEHhtP3SbUar/GOk4QETXwsve9y+WwB23hhJgLh79hfPAH020UWk/X614kGNltDALKS0xAKVke7YCwnMK7XSfHChegjipv8QAzs7g071p2rI9KIDms4EjgCXNJ4cc/tiCu2a/AH/xQnK7TvY/AAAAAElFTkSuQmCC";
var instagram = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATSSURBVHgBxVfNThtXFD7njnFSwgxV5U3sOiUO8k+7hheo1EVXeQFcNt3gPgBqF101ottKZNVFax6gvEAfoHhVdQF2EVihJhuQypgEBTP35jt3ZowN9pgIohxkZu7PnPPd83+JPjBx0uJ0qZSd6vUqmrXrOEQB/q6RnXKujGXGofPAdIimOq8Pmof0LgC8QmGBmGtYXTRkDJEmpZgN45VMuEkezPaJHVhSMsmEp0yxlkW2U1jb0Zrr3YPtzYkAZgvzq2BYJYX/bE6xZYsV+RoghBTkaB2/y0D1v7XT5pItQOQAoIKfi91gZ+onL3bWxgKYLRQh3FQx2yVzUU+n0/WjZrNLtyTvcWUJpvkOqpqBXjYGQfQBuHPFpxg8gy59IF7utls7dIcE/mUOnN/kFY6y7B+0GjLf158itRRajZ/ftXChiOcG2UOr2qVc0HS+lIXqK7B6199v1ekOKJMpubO5z78cnEtPa+ENk6rFjz4t5voAUmRy0Z5tuiPq3ecaAuAXL//FQjxn/YnNX+KpaUPlULagcCgXaAkkidubkVt8CAapMgWOhFnH39trDK7rYGqTUoF7YXpDOQCRfCqBopXj9gEEkjw4DrRkkhzBjl7VZMriMjbsDbNXeNJR2ln/v92ysd59+Y/Y/IdJ/KwJJMsxO6yMSsyM3uN5JCf+HQmiwsynRqk/8PyTjO5gPgdQz7zPKrVEiVckWA1QXwPj5Xv5ImxpapIZES0/+832kLN68/NLUO0qONQePKp0X73YHunM2oQJNE6oYRg6NJlY1cKUy+t+a/8ac393dwPJes1QYBxDY7WgxNBmcEyRDySQhCm+WgTwU39v9/m4ff7+7gYYHoL/jPuwWB61J8rWZghA/KrGMA7DVFZ5cpgaasCTmFLOSADQpJiAhwDEFtA8qJxrjKXqeTRJvkOuMFE6GFlDwkPq4XEQCcBvpBemz9imZnh8TjIcJRGbskBFZRyZU8JgV8MApHlIak2OjqQimi0AdHszwVgHkzDFOeAv+rD78mb1JNJA5IUJJjCOXgs7DVVFyNWm8/lsvJYpZdzZYmEVPcQKG5uc1imJBg5r84BoQOJTJehBqpmbL34PED9ByErqXrrmFecayF7uuZHGw7jh52a92/53kxJODANRbIYhx9fjXTAEcdDavLigr+CtDQpzwgJsXbLCmWAi8w1CMfH0IpoRCbHnh7WAJnSnA3T2X6tzRrScKZVw8h7qgUNp9neOmkc36pyUBSF9Jl8CUJp9o8R45N4QB0WtWoPekdhROdYo1IHuxIAoxRfNcJUXJ4bZLSkwQUnqSc/QYR/AMdSKxxZ+M+cPVJXeE3lPilUkQQ85t3kWyhx0wkCch9FbV8fl8duQOzdXhpeviOlx0ekXs34dfOMfH97/OANvVouw09f3Zj85f3Ny/DfdkjKZjJvKZr9lUj/ifB4ip+63W7/G69cvJo/K6HZoSe5BSCw+8DZRPDpSJ2yRifO4irxZGTunbKEN41tFlxWj5UJiFhCwnu23A6qftHfHX0xiQsJ5ilvPEu5XZfnOiNuylIIwUWAcfW0LiJ20N7Ww1aBok7Quxs4F8C8261f7xrEAYpLWeSpNWaODnNgqsAa7bB7CC2v0PrQSjg07fo9SO6+b4y+nH5zeAiQjAuGaBYu4AAAAAElFTkSuQmCC";
var linkedin = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQgSURBVHgB7Vc/b9tWEL97lGTHCSkUVTtIkP8Ihf60SxfrC7idm/QDqN6N7EH2ttnd7EG8J/4C7uSl1u7KQqKmTpSJKCAqQCGRfNd7j6REUlTdAiGy5ARR5OO7u9/97g8pgA8sRnrBajb2C2WzU7xjzVzHmULOgtFJpd6quiX3FzL8FhAiyAKhWziZXA8eQY6yYKD4yWfPSMg9EPQOEM8ZxB6Q+HrD+hxmjt2HnESog1X/al8SVJHE2xK++8YZ/nEfiA4BCRhID3IUDYBA1pBpJ6KBfWXrvDujURA1kgk5SkEdPPL7RTS4IES33GgcFIvOxdw3e+grdDSAHGVRhOXt9gOugR4U2KvhAUi+5RUAfXF/cj08g5xkUYSziX2+Uf5UUV7jQrS4EC84Nw+dVy/OIUdBeI+y1apXi4QdTqUpQYxLfzkD27anuQKotCrm3L/d43K+y9Zq2ighlw5/peAj9LmXTqcvX56uBaCG0NyA55x7EwxftQWhLCK5PIwI305eX36bpWzu7rbREMcgZC2wRI4EuNCtBcICKbqkbQluaHq+MTUe2fZVgpGgC7j6Ga4ZGuEP6t/wvLbOOQjxhGvF4ssLAP+xM3zdT7LTMmeedwAoj5CMe+5t7Fag9X0cRCGuQBJPpy/+fBhdW9utS40hJZoxlMccmomSTiajVz9nYAT7Sjs6vdVs9osuPZEgq/MtZgzgMNqj2fKDwFeFiUCW9PJM0BHfqyLgr5PRKNN5XP4eDseui4dsiQFh16o39xMAImciQzlNwBZHz5juqdy4hkg8qO506kdWp/5bubNzWW7vPCs3tw8WIN4Mxzzun7I9NmgcJQAYgSc1exLeKJT4WsmgbrALz1Rk0Xq5ufvAAKEMmwo0q7UJxLHVaCyi3dzEE1QPO4BupdIyFwD8ZbhJujNSwK3VhkBpUXAV7n/G1KNg/Qfn9+svQeBjHZVBi2hVTXBXvVF257cK7RgDBchOQMBC/JpptLixiAQ40ZrrlUJQ8izqhJLcfAoB9m5K/yqIVdZiDHhRxAlnmMGACG4k1iT4llYWwolHqxlYKWEJK/aiB4IgkdquZwGtqKdYMaK9km6crGJpJXYdN55yny2rrQnaN2aoJJek1hZJAIs5kEIgAqrxBpvLIv4PohzKGIPi3zYHM2Adq0Z6MxtDzLBAaQSIy1TFuiBDMEs/fItbEcEEplOAupPjK1LqbqcIf8iAFwO8AiIhUrlJRxrlQIqb1AMGIMXA2kG0pgw1zljiDcMIU0DpQbbShyIFOsE9x/Wd9cXeXZ5ewTuhzKhqyUaFopZ+snbaP/JLoyoq3QArKeCAeDuxTX6qigCRDOsqkQKvMOAlNdfViFM1SktMME4GhbG3ZEI9lELmMJxyMQDjOCQKJoj6cTzPz+3Pzkf5X/IP8EvFeVa63BgAAAAASUVORK5CYII=";
var twitter = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS9SURBVHgB7VY/UxtXEN99d5IwcDfGiCIW2IYwkshMSlQlTZhUacQHgLg26VJB70CTKlGaNDH5AOEDGH8Aq0thkGxQJnCqxB+dBojupLfZfRIKDAKJCZ6k8G8kzdO927e/t+/t7g/gA/5jINwRRpPjiVBHsqAhC8oaJ80jwAJo3G428cfTvUL5/F03MbOIgF7Ve7N5hUA8HncqlUoNbgE3ObkIBEv8dYjYLVrIY+IxMQFkZzV+vIoaXABrAQgTLUvMdQgMTqQe2hH9gm0cJPrJL+2s9+N8KDm5YAEtsyv2qDawSRt+qfTaEJuamiWt5hFUVuYl4EIQSPFIXOPX1vlC90ZH5/nBV6goxlv4LPpgpBwcHW3f5FzCTqi+5xXZRuVqb0tr9eNj73y+fnRUDo4PN2Mjo/I3w47zCpRwcZGw7O+/WVOd1QjmJGp8cvn2k+fu9OTSTQQCZT1jQ4ftNvxiKXfde36pmPP/KH5CSq+ygwSfCSA1VmXuHwIIaQlKGKoVHuf45JCZLjnTU98NpiYedluYjWfEEsHagB6Ip1J8tPBDe7O5qlfc7BCQSdIkF6h2tl/0/HfvcnyDlhVimalmbW29dKYfP3eTE7MXFyWktESNd/8a+gBvKCFH7+9tdaJly8/JCbm2Zbbin0/UdnY27iXH81GILjEZTi2YJ1DzTuqRRCvPjn24BSqFQs19nGzdxQswERgEcY5XisJZcd+rFndXQmx8yTd5TSncRmWIznJ05uQqo4K+YKJs/Fx2YyJwKgMz291YiJwBSFqux1NxJ6CBGbSVoxucsgAe9IF6nTj8JJ/9KwSGhtAP/jI5kOi1UKVgilRfZ34RHCmHmnJvoHzxuWotWpBFPYmOO5nMwPsA6YxEmD/bVwgYhggmLZD0HLwftDamL0evQ4DDs9max2w8nnLgDjE4YerIrBSgyCl2J+DvFTm1TBV0wuHmN3CHsKLRjEkzwHylUqh1JSBoNGBFuHADW3Anp5fgjqC4U3ItIaXgSsW0LhHwD2oDI/E6V4vP+bZkBuIPoH54mId/AXfabGSOm1C5uvt25UYCgvrxwe9MgkeUQSExcj9hDQ9vhb5/K40gkLNXEcVlXfJLr3B3LPUk0CaRj42OeFw00pzAGWWpudjofdcac7zwoD8i0sBsK/KCE99RRL9Wd3e76gvrugVEC6ixsVd2K38/5u8sassNDo82oQekWgIN/MzDKbbzonbk29ODg6Dbu3bXBTgNA4fmIdRzpDAt8oqj4ZGle6okESkBWb8AmKrqhRg89Qu710YNnY8+TSu7uaiVFifjXImkZiekMKNRTVTjXFmPWtZ6u2JeCzf5aJGr/TM+cdZ+6IUQPpU+cpONLc45/7MskUDKUJsXt1raAoWvorb67SbHreY0OM95vsi9xAgXVj0bMTxd9Qu9xa0dUCNnc6dgAlkwvVW3BC1RTWsNQUjp6JMnNTsW6/T/SHg2Q7bFUWp+EYCaYWNTOVEaDellv7iX7zdlOg343ngyYaM1q1RzgcM4I4qaBarZj+nUitrCVouj9lNojzWLTVivFv/seUGvJXARhozNooM1H59MGqBphKRcEiOsUG3x7suWom0bT15WCpVb14gP+N/gb3efBUPfLoxfAAAAAElFTkSuQmCC";
var css$m = {
  code: ".footer-container.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{padding:64px 32px;padding-bottom:0;background:radial-gradient(100% 146.94% at 50% 100%, rgba(248, 248, 248, 0) 0%, #f8f8f8 100%)}.footer-content.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{width:100%}.brand-info.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{display:grid;grid-template-columns:1fr;gap:16px}.brand-info.svelte-6jcff9>p.svelte-6jcff9.svelte-6jcff9{color:#0e1c2a;opacity:0.56;margin:8px 0}.brand-info.svelte-6jcff9>a.svelte-6jcff9.svelte-6jcff9{color:#00b478}.brand-info.svelte-6jcff9>.logo-link.svelte-6jcff9.svelte-6jcff9{width:166px}.links-container.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{display:grid;grid-template-columns:1fr;gap:32px}.footer-titles.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{display:grid;grid-template-columns:1fr;gap:16px}.footer-titles.svelte-6jcff9>h5.svelte-6jcff9.svelte-6jcff9{font-size:18px;margin:0;color:#0e1c2a;opacity:0.84}.footer-titles.svelte-6jcff9>div.svelte-6jcff9.svelte-6jcff9{display:grid;grid-template-columns:1fr;gap:16px}.footer-titles.svelte-6jcff9>div.svelte-6jcff9>a.svelte-6jcff9{color:#0e1c2a;opacity:0.56;font-size:16px;font-weight:500;text-decoration:none}.icon-link-container.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:16px;width:200px;padding-top:64px;padding-bottom:64px}.copy-right-box.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{display:flex;justify-content:space-between;padding:32px 0;color:#0e1c2a;opacity:0.56;flex-wrap:wrap}.copy-right-box.svelte-6jcff9>p.svelte-6jcff9.svelte-6jcff9{padding:0;margin:0;font-size:14px}.copy-right-box.svelte-6jcff9>div.svelte-6jcff9.svelte-6jcff9{font-size:14px;display:grid;grid-template-columns:1fr 1fr;gap:32}@media only screen and (min-width: 640px){.links-container.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{grid-template-columns:1fr 1fr 1fr;gap:16px}.brand-info.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{gap:32px}.brand-info.svelte-6jcff9>p.svelte-6jcff9.svelte-6jcff9{margin:16px 0}.footer-titles.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{gap:32px}.icon-link-container.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{width:200px;gap:24px}}@media only screen and (min-width: 700px){.links-container.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{grid-template-columns:2fr 1fr 1fr}}@media only screen and (min-width: 1295px){.footer-container.svelte-6jcff9.svelte-6jcff9.svelte-6jcff9{padding:64px 128px;padding-bottom:0}}",
  map: `{"version":3,"file":"footer.svelte","sources":["footer.svelte"],"sourcesContent":["<script>\\n  import logo from '../../../assets/images/brand/logo.png'\\n  import facebook from '../../../assets/images/icons/facebook.png'\\n  import instagram from '../../../assets/images/icons/instagram.png'\\n  import linkedin from '../../../assets/images/icons/linkedin.png'\\n  import twitter from '../../../assets/images/icons/twitter.png'\\n</script>\\n\\n<div class={'footer-container'}>\\n  <div class=\\"footer-content\\">\\n    <div class=\\"links-container\\">\\n      <div class={'brand-info'}>\\n        <a href=\\"/\\" class={'logo-link'}>\\n          <img height=\\"64\\" width={166} src={logo} alt=\\"kelaltech logo\\" />\\n        </a>\\n\\n        <p>\\n          We Empower Makers <br /> Using Digital Platforms\\n        </p>\\n        <a href=\\"/request-quote\\"> Talk to sales \u2192 </a>\\n      </div>\\n\\n      <div class={'footer-titles'}>\\n        <h5>SOLUTIONS</h5>\\n\\n        <div>\\n          <a href=\\"/request-quote\\"> Design a Website </a>\\n          <a href=\\"/request-quote\\"> Develop a Web App </a>\\n          <a href=\\"/request-quote\\"> Build a Mobile App </a>\\n          <a href=\\"/request-quote\\"> Open Source </a>\\n        </div>\\n      </div>\\n\\n      <div class={'footer-titles'}>\\n        <h5>COMPANY</h5>\\n        <div>\\n          <a href=\\"/about\\"> About Us </a>\\n          <a href=\\"/contact\\"> Contact </a>\\n          <a href=\\"/jobs\\"> Jobs </a>\\n          <a href=\\"/news\\"> Newsletter </a>\\n        </div>\\n      </div>\\n    </div>\\n    <div class={'icon-link-container'}>\\n      <a href=\\"https://twitter.com/kelaltech\\" target={'_blank'}>\\n        <img width={32} height={32} src={twitter} alt=\\"link to twiiter\\" />\\n      </a>\\n      <a href=\\"https://www.facebook.com/kelaltech\\" target={'_blank'}>\\n        <img width={32} height={32} src={facebook} alt=\\"link to  facebook\\" />\\n      </a>\\n      <a href=\\"https://www.instagram.com/kelaltech/\\" target={'_blank'}>\\n        <img width={32} height={32} src={instagram} alt=\\"link to  instagram\\" />\\n      </a>\\n      <a href=\\"https://www.linkedin.com/company/kelal\\" target={'_blank'}>\\n        <img width={32} height={32} src={linkedin} alt=\\"link to linkedin\\" />\\n      </a>\\n    </div>\\n    <div class={'copy-right-box'}>\\n      <p>2020 \xA9 Kelal Tech PLC. All rights reserved.</p>\\n\\n      <div>\\n        <a href=\\"https://privacyterms.io/view/USu7DVMs-vlvivBWS-b7ietU/\\" target=\\"_blank\\"> Terms </a>\\n        <a href=\\"https://privacyterms.io/view/24im3gmH-XDp5sR8O-lGMFTk/\\" target={'_blank'}>\\n          Privacy Policy\\n        </a>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  .footer-container {\\n    padding: 64px 32px;\\n    padding-bottom: 0;\\n    background: radial-gradient(100% 146.94% at 50% 100%, rgba(248, 248, 248, 0) 0%, #f8f8f8 100%);\\n  }\\n\\n  .footer-content {\\n    width: 100%;\\n  }\\n\\n  .brand-info {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 16px;\\n  }\\n\\n  .brand-info > p {\\n    color: #0e1c2a;\\n    opacity: 0.56;\\n    margin: 8px 0;\\n  }\\n\\n  .brand-info > a {\\n    color: #00b478;\\n  }\\n\\n  .brand-info > .logo-link {\\n    width: 166px;\\n  }\\n\\n  .links-container {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 32px;\\n  }\\n\\n  .footer-titles {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 16px;\\n  }\\n  .footer-titles > h5 {\\n    font-size: 18px;\\n    margin: 0;\\n    color: #0e1c2a;\\n    opacity: 0.84;\\n  }\\n  .footer-titles > div {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 16px;\\n  }\\n  .footer-titles > div > a {\\n    color: #0e1c2a;\\n    opacity: 0.56;\\n    font-size: 16px;\\n    font-weight: 500;\\n    text-decoration: none;\\n  }\\n\\n  .icon-link-container {\\n    display: grid;\\n    grid-template-columns: 1fr 1fr 1fr 1fr;\\n    gap: 16px;\\n    width: 200px;\\n    padding-top: 64px;\\n    padding-bottom: 64px;\\n  }\\n\\n  .copy-right-box {\\n    display: flex;\\n    justify-content: space-between;\\n    padding: 32px 0;\\n    color: #0e1c2a;\\n    opacity: 0.56;\\n    flex-wrap: wrap;\\n  }\\n\\n  .copy-right-box > p {\\n    padding: 0;\\n    margin: 0;\\n\\n    font-size: 14px;\\n  }\\n\\n  .copy-right-box > div {\\n    font-size: 14px;\\n    display: grid;\\n    grid-template-columns: 1fr 1fr;\\n    gap: 32;\\n  }\\n\\n  /* small screen */\\n  @media only screen and (min-width: 640px) {\\n    .links-container {\\n      grid-template-columns: 1fr 1fr 1fr;\\n      gap: 16px;\\n    }\\n    .brand-info {\\n      gap: 32px;\\n    }\\n    .brand-info > p {\\n      margin: 16px 0;\\n    }\\n    .footer-titles {\\n      gap: 32px;\\n    }\\n    .icon-link-container {\\n      width: 200px;\\n      gap: 24px;\\n    }\\n  }\\n\\n  /* medium */\\n  @media only screen and (min-width: 700px) {\\n    .links-container {\\n      grid-template-columns: 2fr 1fr 1fr;\\n    }\\n  }\\n  /* extra large */\\n  @media only screen and (min-width: 1295px) {\\n    .footer-container {\\n      padding: 64px 128px;\\n      padding-bottom: 0;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuEE,iBAAiB,0CAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,cAAc,CAAE,CAAC,CACjB,UAAU,CAAE,gBAAgB,IAAI,CAAC,OAAO,CAAC,EAAE,CAAC,GAAG,CAAC,IAAI,CAAC,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,AAChG,CAAC,AAED,eAAe,0CAAC,CAAC,AACf,KAAK,CAAE,IAAI,AACb,CAAC,AAED,WAAW,0CAAC,CAAC,AACX,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,AACX,CAAC,AAED,yBAAW,CAAG,CAAC,4BAAC,CAAC,AACf,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,CAAC,AACf,CAAC,AAED,yBAAW,CAAG,CAAC,4BAAC,CAAC,AACf,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,yBAAW,CAAG,UAAU,4BAAC,CAAC,AACxB,KAAK,CAAE,KAAK,AACd,CAAC,AAED,gBAAgB,0CAAC,CAAC,AAChB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,AACX,CAAC,AAED,cAAc,0CAAC,CAAC,AACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,AACX,CAAC,AACD,4BAAc,CAAG,EAAE,4BAAC,CAAC,AACnB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,AACf,CAAC,AACD,4BAAc,CAAG,GAAG,4BAAC,CAAC,AACpB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,AACX,CAAC,AACD,4BAAc,CAAG,iBAAG,CAAG,CAAC,cAAC,CAAC,AACxB,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,eAAe,CAAE,IAAI,AACvB,CAAC,AAED,oBAAoB,0CAAC,CAAC,AACpB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CACtC,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,IAAI,AACtB,CAAC,AAED,eAAe,0CAAC,CAAC,AACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,6BAAe,CAAG,CAAC,4BAAC,CAAC,AACnB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CAET,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,6BAAe,CAAG,GAAG,4BAAC,CAAC,AACrB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,GAAG,CAAE,EAAE,AACT,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,gBAAgB,0CAAC,CAAC,AAChB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,GAAG,CAAE,IAAI,AACX,CAAC,AACD,WAAW,0CAAC,CAAC,AACX,GAAG,CAAE,IAAI,AACX,CAAC,AACD,yBAAW,CAAG,CAAC,4BAAC,CAAC,AACf,MAAM,CAAE,IAAI,CAAC,CAAC,AAChB,CAAC,AACD,cAAc,0CAAC,CAAC,AACd,GAAG,CAAE,IAAI,AACX,CAAC,AACD,oBAAoB,0CAAC,CAAC,AACpB,KAAK,CAAE,KAAK,CACZ,GAAG,CAAE,IAAI,AACX,CAAC,AACH,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,gBAAgB,0CAAC,CAAC,AAChB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,AACpC,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,iBAAiB,0CAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CAAC,KAAK,CACnB,cAAc,CAAE,CAAC,AACnB,CAAC,AACH,CAAC"}`
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$m);
  return `<div class="${escape2(null_to_empty("footer-container")) + " svelte-6jcff9"}"><div class="${"footer-content svelte-6jcff9"}"><div class="${"links-container svelte-6jcff9"}"><div class="${escape2(null_to_empty("brand-info")) + " svelte-6jcff9"}"><a href="${"/"}" class="${escape2(null_to_empty("logo-link")) + " svelte-6jcff9"}"><img height="${"64"}"${add_attribute("width", 166, 0)}${add_attribute("src", logo, 0)} alt="${"kelaltech logo"}"></a>

        <p class="${"svelte-6jcff9"}">We Empower Makers <br> Using Digital Platforms
        </p>
        <a href="${"/request-quote"}" class="${"svelte-6jcff9"}">Talk to sales \u2192 </a></div>

      <div class="${escape2(null_to_empty("footer-titles")) + " svelte-6jcff9"}"><h5 class="${"svelte-6jcff9"}">SOLUTIONS</h5>

        <div class="${"svelte-6jcff9"}"><a href="${"/request-quote"}" class="${"svelte-6jcff9"}">Design a Website </a>
          <a href="${"/request-quote"}" class="${"svelte-6jcff9"}">Develop a Web App </a>
          <a href="${"/request-quote"}" class="${"svelte-6jcff9"}">Build a Mobile App </a>
          <a href="${"/request-quote"}" class="${"svelte-6jcff9"}">Open Source </a></div></div>

      <div class="${escape2(null_to_empty("footer-titles")) + " svelte-6jcff9"}"><h5 class="${"svelte-6jcff9"}">COMPANY</h5>
        <div class="${"svelte-6jcff9"}"><a href="${"/about"}" class="${"svelte-6jcff9"}">About Us </a>
          <a href="${"/contact"}" class="${"svelte-6jcff9"}">Contact </a>
          <a href="${"/jobs"}" class="${"svelte-6jcff9"}">Jobs </a>
          <a href="${"/news"}" class="${"svelte-6jcff9"}">Newsletter </a></div></div></div>
    <div class="${escape2(null_to_empty("icon-link-container")) + " svelte-6jcff9"}"><a href="${"https://twitter.com/kelaltech"}"${add_attribute("target", "_blank", 0)}><img${add_attribute("width", 32, 0)}${add_attribute("height", 32, 0)}${add_attribute("src", twitter, 0)} alt="${"link to twiiter"}"></a>
      <a href="${"https://www.facebook.com/kelaltech"}"${add_attribute("target", "_blank", 0)}><img${add_attribute("width", 32, 0)}${add_attribute("height", 32, 0)}${add_attribute("src", facebook, 0)} alt="${"link to  facebook"}"></a>
      <a href="${"https://www.instagram.com/kelaltech/"}"${add_attribute("target", "_blank", 0)}><img${add_attribute("width", 32, 0)}${add_attribute("height", 32, 0)}${add_attribute("src", instagram, 0)} alt="${"link to  instagram"}"></a>
      <a href="${"https://www.linkedin.com/company/kelal"}"${add_attribute("target", "_blank", 0)}><img${add_attribute("width", 32, 0)}${add_attribute("height", 32, 0)}${add_attribute("src", linkedin, 0)} alt="${"link to linkedin"}"></a></div>
    <div class="${escape2(null_to_empty("copy-right-box")) + " svelte-6jcff9"}"><p class="${"svelte-6jcff9"}">2020 \xA9 Kelal Tech PLC. All rights reserved.</p>

      <div class="${"svelte-6jcff9"}"><a href="${"https://privacyterms.io/view/USu7DVMs-vlvivBWS-b7ietU/"}" target="${"_blank"}">Terms </a>
        <a href="${"https://privacyterms.io/view/24im3gmH-XDp5sR8O-lGMFTk/"}"${add_attribute("target", "_blank", 0)}>Privacy Policy
        </a></div></div></div>
</div>`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

<main>${slots.default ? slots.default({}) : ``}</main>

${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({error: error22, status}) {
  return {props: {error: error22, status}};
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error: error22} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var css$l = {
  code: ".step-container.svelte-1efdprq.svelte-1efdprq{max-width:1440px;padding:0 32px;margin-top:64px;display:grid;grid-template-columns:1fr;gap:32px}.step-item.svelte-1efdprq>a.svelte-1efdprq{color:#00b478;font-weight:500}.step-item.svelte-1efdprq>h1.svelte-1efdprq{width:50%}.step-title.svelte-1efdprq.svelte-1efdprq{font-size:70px;line-height:84px;background:radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;font-weight:300 !important;margin-bottom:48px}.desc-1.svelte-1efdprq>span.svelte-1efdprq{color:#00b478}.desc-1.svelte-1efdprq.svelte-1efdprq{font-weight:700;opacity:0.92;font-size:21px;margin-bottom:32px;color:rgba(14, 28, 42, 0.92)}.desc-2.svelte-1efdprq.svelte-1efdprq{font-size:16px;color:rgba(14, 28, 42, 0.56);margin-bottom:24px}@media only screen and (min-width: 640px){.step-container.svelte-1efdprq.svelte-1efdprq{grid-template-columns:1fr 1fr;margin-top:106px}}@media only screen and (min-width: 700px){.step-container.svelte-1efdprq.svelte-1efdprq{grid-template-columns:1fr 1fr 1fr}}@media only screen and (min-width: 1295px){.step-container.svelte-1efdprq.svelte-1efdprq{padding:0 128px;gap:128px}}",
  map: `{"version":3,"file":"home-steps.svelte","sources":["home-steps.svelte"],"sourcesContent":["<div class=\\"step-container\\">\\n  <!-- item-1 -->\\n  <div class=\\"step-item\\">\\n    <h1 class=\\"step-title\\">01</h1>\\n    <p class={'desc-1'}>\\n      <span>You describe</span> the project. Together we set the PRD, timeline & pricing.\\n    </p>\\n\\n    <p class=\\"desc-2\\">\\n      Tell us the idea of the project you have in mind. We will discuss it together to come up with\\n      the requirements, timeline and pricing.\\n    </p>\\n\\n    <a href=\\"#get_started_now\\">Get started now \u2192</a>\\n  </div>\\n  <!-- item-2 -->\\n  <div class=\\"step-item\\">\\n    <h1 class=\\"step-title\\">02</h1>\\n    <p class={'desc-1'}>\\n      <span>We prototype </span> the design. You help us improve it with feeback rounds.\\n    </p>\\n\\n    <p class=\\"desc-2\\">\\n      We will prepare an initial design based on the project description. With your help we will\\n      improve the design with a few feeback rounds.\\n    </p>\\n\\n    <a href=\\"/request-quote\\">Find your contact person \u2192</a>\\n  </div>\\n\\n  <!-- item-3 -->\\n  <div class=\\"step-item\\">\\n    <h1 class=\\"step-title\\">03</h1>\\n    <p class={'desc-1'}>\\n      <span>We develop</span> the final design. with excellent quality. We deliver on time..\\n    </p>\\n\\n    <p class=\\"desc-2\\">\\n      Once we have the final design, we get to implmentation and deliver your project as promised.\\n      Then you\u2019ll tweet great things about us.\\n    </p>\\n\\n    <a href=\\"/request-quote\\">Request a quote \u2192</a>\\n  </div>\\n</div>\\n\\n<style>\\n  .step-container {\\n    max-width: 1440px;\\n    padding: 0 32px;\\n    margin-top: 64px;\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 32px;\\n  }\\n\\n  .step-item > a {\\n    color: #00b478;\\n    font-weight: 500;\\n  }\\n\\n  .step-item > h1 {\\n    width: 50%;\\n  }\\n\\n  .step-title {\\n    font-size: 70px;\\n    line-height: 84px;\\n    background: radial-gradient(100% 423.18% at 0% 100%, #00b478 0%, #ffc800 100%);\\n    -webkit-background-clip: text;\\n    background-clip: text;\\n    -webkit-text-fill-color: transparent;\\n    font-weight: 300 !important;\\n    margin-bottom: 48px;\\n  }\\n\\n  .desc-1 > span {\\n    color: #00b478;\\n  }\\n  .desc-1 {\\n    font-weight: 700;\\n    opacity: 0.92;\\n    font-size: 21px;\\n    margin-bottom: 32px;\\n    color: rgba(14, 28, 42, 0.92);\\n  }\\n\\n  .desc-2 {\\n    font-size: 16px;\\n    color: rgba(14, 28, 42, 0.56);\\n    margin-bottom: 24px;\\n  }\\n\\n  /* small */\\n  @media only screen and (min-width: 640px) {\\n    .step-container {\\n      grid-template-columns: 1fr 1fr;\\n      margin-top: 106px;\\n    }\\n  }\\n\\n  /* medium */\\n  @media only screen and (min-width: 700px) {\\n    .step-container {\\n      grid-template-columns: 1fr 1fr 1fr;\\n    }\\n  }\\n\\n  /* extra large */\\n  @media only screen and (min-width: 1295px) {\\n    .step-container {\\n      padding: 0 128px;\\n      gap: 128px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AA+CE,eAAe,8BAAC,CAAC,AACf,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,AACX,CAAC,AAED,yBAAU,CAAG,CAAC,eAAC,CAAC,AACd,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,yBAAU,CAAG,EAAE,eAAC,CAAC,AACf,KAAK,CAAE,GAAG,AACZ,CAAC,AAED,WAAW,8BAAC,CAAC,AACX,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,gBAAgB,IAAI,CAAC,OAAO,CAAC,EAAE,CAAC,EAAE,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CAC9E,uBAAuB,CAAE,IAAI,CAC7B,eAAe,CAAE,IAAI,CACrB,uBAAuB,CAAE,WAAW,CACpC,WAAW,CAAE,GAAG,CAAC,UAAU,CAC3B,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,sBAAO,CAAG,IAAI,eAAC,CAAC,AACd,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,OAAO,8BAAC,CAAC,AACP,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,AAC/B,CAAC,AAED,OAAO,8BAAC,CAAC,AACP,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAC7B,aAAa,CAAE,IAAI,AACrB,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,eAAe,8BAAC,CAAC,AACf,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,UAAU,CAAE,KAAK,AACnB,CAAC,AACH,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,eAAe,8BAAC,CAAC,AACf,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,AACpC,CAAC,AACH,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,eAAe,8BAAC,CAAC,AACf,OAAO,CAAE,CAAC,CAAC,KAAK,CAChB,GAAG,CAAE,KAAK,AACZ,CAAC,AACH,CAAC"}`
};
var Home_steps = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$l);
  return `<div class="${"step-container svelte-1efdprq"}">
  <div class="${"step-item svelte-1efdprq"}"><h1 class="${"step-title svelte-1efdprq"}">01</h1>
    <p class="${escape2(null_to_empty("desc-1")) + " svelte-1efdprq"}"><span class="${"svelte-1efdprq"}">You describe</span> the project. Together we set the PRD, timeline &amp; pricing.
    </p>

    <p class="${"desc-2 svelte-1efdprq"}">Tell us the idea of the project you have in mind. We will discuss it together to come up with
      the requirements, timeline and pricing.
    </p>

    <a href="${"#get_started_now"}" class="${"svelte-1efdprq"}">Get started now \u2192</a></div>
  
  <div class="${"step-item svelte-1efdprq"}"><h1 class="${"step-title svelte-1efdprq"}">02</h1>
    <p class="${escape2(null_to_empty("desc-1")) + " svelte-1efdprq"}"><span class="${"svelte-1efdprq"}">We prototype </span> the design. You help us improve it with feeback rounds.
    </p>

    <p class="${"desc-2 svelte-1efdprq"}">We will prepare an initial design based on the project description. With your help we will
      improve the design with a few feeback rounds.
    </p>

    <a href="${"/request-quote"}" class="${"svelte-1efdprq"}">Find your contact person \u2192</a></div>

  
  <div class="${"step-item svelte-1efdprq"}"><h1 class="${"step-title svelte-1efdprq"}">03</h1>
    <p class="${escape2(null_to_empty("desc-1")) + " svelte-1efdprq"}"><span class="${"svelte-1efdprq"}">We develop</span> the final design. with excellent quality. We deliver on time..
    </p>

    <p class="${"desc-2 svelte-1efdprq"}">Once we have the final design, we get to implmentation and deliver your project as promised.
      Then you\u2019ll tweet great things about us.
    </p>

    <a href="${"/request-quote"}" class="${"svelte-1efdprq"}">Request a quote \u2192</a></div>
</div>`;
});
var css$k = {
  code: ".hero-content-action.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{display:flex;align-items:flex-start;padding-top:64px;flex-direction:column}.hero-content-action.svelte-1mdi1lb>span.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{padding:16px;padding-left:0;margin-left:0;color:#0e1c2a}.hero-content-action.svelte-1mdi1lb>span.svelte-1mdi1lb>a.svelte-1mdi1lb.svelte-1mdi1lb{text-decoration:underline;color:#0e1c2a}.hero-content.svelte-1mdi1lb .hero-lead.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{font-size:36px;line-height:36px}.find-out.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb:hover{color:#00b478}.hero-content-container.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{width:100%;padding:0 32px}.hero-content.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{display:flex;justify-content:space-between;flex-direction:column}.hero-content.svelte-1mdi1lb>div.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{align-self:flex-end;font-size:16px;opacity:0.84;margin-top:8px}.hero-content.svelte-1mdi1lb>div.svelte-1mdi1lb>p.svelte-1mdi1lb>span.svelte-1mdi1lb{font-weight:700;color:#00b478}.hero-container.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{height:100vh}.hero-overlay-container.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{top:31px;padding-top:64px;width:100%;height:100vh;position:absolute;background-image:url('../../assets/images/home-hero-bg.svg');background-size:cover;background-position:center;background-repeat:no-repeat;display:flex;justify-content:center;align-items:center}@media only screen and (min-width: 483px){.hero-content-action.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{flex-direction:row;align-items:center}.hero-content-action.svelte-1mdi1lb>span.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{margin-left:16px;padding-left:16px}}@media only screen and (min-width: 640px){.hero-container.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{height:calc(990px - 112px)}.hero-overlay-container.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{height:990px;padding-top:0}.hero-content.svelte-1mdi1lb .hero-lead.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{font-size:70px;line-height:84px}.hero-content.svelte-1mdi1lb>div.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{font-size:18px;margin-top:0}}@media only screen and (min-width: 700px){}@media only screen and (min-width: 1008px){.hero-content.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{flex-direction:row}}@media only screen and (min-width: 1295px){.hero-content-container.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb.svelte-1mdi1lb{padding:0 128px}}",
  map: `{"version":3,"file":"hero.svelte","sources":["hero.svelte"],"sourcesContent":["<script>\\n  import Button from '../_shared/button/button.svelte'\\n</script>\\n\\n<div class={'hero-container'}>\\n  <div class=\\"hero-overlay-container\\">\\n    <div class={'hero-content-container'}>\\n      <div class=\\"hero-content\\">\\n        <h1 class={'gradient-text hero-lead'}>We empower makers using digital platforms.</h1>\\n        <div>\\n          <p>\\n            <span>Kelal Tech PLC</span> is an international, remote <strong>IT agency</strong> based\\n            in Ethiopia working on a wide range of software products\u2014from <strong>websites</strong>\\n            and mobile <strong>apps</strong> to fully integrated <strong>custom systems </strong>\\n            and <strong>open source</strong> libraries.\\n          </p>\\n          <br />\\n          <span>We\u2019ve got you covered!</span>\\n        </div>\\n      </div>\\n\\n      <div class=\\"hero-content-action\\">\\n        <Button to={'/request-quote'}>Request a Quote</Button>\\n        <span>or, <a href=\\"#get_started_now\\" class={'find-out'}>find out more</a>&nbsp; \u2193</span>\\n      </div>\\n    </div>\\n  </div>\\n</div>\\n\\n<style>\\n  .hero-content-action {\\n    display: flex;\\n    align-items: flex-start;\\n    padding-top: 64px;\\n    flex-direction: column;\\n  }\\n\\n  .hero-content-action > span {\\n    padding: 16px;\\n    padding-left: 0;\\n    margin-left: 0;\\n    color: #0e1c2a;\\n  }\\n  .hero-content-action > span > a {\\n    text-decoration: underline;\\n    color: #0e1c2a;\\n  }\\n\\n  .hero-content .hero-lead {\\n    font-size: 36px;\\n    line-height: 36px;\\n  }\\n\\n  .find-out:hover {\\n    color: #00b478;\\n  }\\n  .hero-content-container {\\n    width: 100%;\\n    padding: 0 32px;\\n  }\\n\\n  .hero-content {\\n    display: flex;\\n    justify-content: space-between;\\n    flex-direction: column;\\n  }\\n\\n  .hero-content > div {\\n    align-self: flex-end;\\n    font-size: 16px;\\n    opacity: 0.84;\\n    margin-top: 8px;\\n  }\\n  .hero-content > div > p > span {\\n    font-weight: 700;\\n    color: #00b478;\\n  }\\n  .hero-container {\\n    height: 100vh;\\n  }\\n  .hero-overlay-container {\\n    top: 31px;\\n    padding-top: 64px;\\n    width: 100%;\\n    height: 100vh;\\n    position: absolute;\\n    background-image: url('../../assets/images/home-hero-bg.svg');\\n    background-size: cover;\\n    background-position: center;\\n    background-repeat: no-repeat;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n\\n  @media only screen and (min-width: 483px) {\\n    .hero-content-action {\\n      flex-direction: row;\\n      align-items: center;\\n    }\\n    .hero-content-action > span {\\n      margin-left: 16px;\\n      padding-left: 16px;\\n    }\\n  }\\n  /* small screen */\\n  @media only screen and (min-width: 640px) {\\n    .hero-container {\\n      height: calc(990px - 112px);\\n    }\\n\\n    .hero-overlay-container {\\n      height: 990px;\\n      padding-top: 0;\\n    }\\n\\n    .hero-content .hero-lead {\\n      font-size: 70px;\\n      line-height: 84px;\\n    }\\n\\n    .hero-content > div {\\n      font-size: 18px;\\n      margin-top: 0;\\n    }\\n  }\\n\\n  /* medium */\\n  @media only screen and (min-width: 700px) {\\n  }\\n  /* large */\\n  @media only screen and (min-width: 1008px) {\\n    .hero-content {\\n      flex-direction: row;\\n    }\\n  }\\n  /* extra large */\\n  @media only screen and (min-width: 1295px) {\\n    .hero-content-container {\\n      padding: 0 128px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8BE,oBAAoB,4DAAC,CAAC,AACpB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,UAAU,CACvB,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,MAAM,AACxB,CAAC,AAED,mCAAoB,CAAG,IAAI,6CAAC,CAAC,AAC3B,OAAO,CAAE,IAAI,CACb,YAAY,CAAE,CAAC,CACf,WAAW,CAAE,CAAC,CACd,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,mCAAoB,CAAG,mBAAI,CAAG,CAAC,8BAAC,CAAC,AAC/B,eAAe,CAAE,SAAS,CAC1B,KAAK,CAAE,OAAO,AAChB,CAAC,AAED,4BAAa,CAAC,UAAU,6CAAC,CAAC,AACxB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,qEAAS,MAAM,AAAC,CAAC,AACf,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,uBAAuB,4DAAC,CAAC,AACvB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,CAAC,CAAC,IAAI,AACjB,CAAC,AAED,aAAa,4DAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,cAAc,CAAE,MAAM,AACxB,CAAC,AAED,4BAAa,CAAG,GAAG,6CAAC,CAAC,AACnB,UAAU,CAAE,QAAQ,CACpB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,AACjB,CAAC,AACD,4BAAa,CAAG,kBAAG,CAAG,gBAAC,CAAG,IAAI,eAAC,CAAC,AAC9B,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,eAAe,4DAAC,CAAC,AACf,MAAM,CAAE,KAAK,AACf,CAAC,AACD,uBAAuB,4DAAC,CAAC,AACvB,GAAG,CAAE,IAAI,CACT,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,IAAI,sCAAsC,CAAC,CAC7D,eAAe,CAAE,KAAK,CACtB,mBAAmB,CAAE,MAAM,CAC3B,iBAAiB,CAAE,SAAS,CAC5B,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,oBAAoB,4DAAC,CAAC,AACpB,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,mCAAoB,CAAG,IAAI,6CAAC,CAAC,AAC3B,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,AACpB,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,eAAe,4DAAC,CAAC,AACf,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,AAC7B,CAAC,AAED,uBAAuB,4DAAC,CAAC,AACvB,MAAM,CAAE,KAAK,CACb,WAAW,CAAE,CAAC,AAChB,CAAC,AAED,4BAAa,CAAC,UAAU,6CAAC,CAAC,AACxB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,AACnB,CAAC,AAED,4BAAa,CAAG,GAAG,6CAAC,CAAC,AACnB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,CAAC,AACf,CAAC,AACH,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC3C,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,aAAa,4DAAC,CAAC,AACb,cAAc,CAAE,GAAG,AACrB,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,uBAAuB,4DAAC,CAAC,AACvB,OAAO,CAAE,CAAC,CAAC,KAAK,AAClB,CAAC,AACH,CAAC"}`
};
var Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$k);
  return `<div class="${escape2(null_to_empty("hero-container")) + " svelte-1mdi1lb"}"><div class="${"hero-overlay-container svelte-1mdi1lb"}"><div class="${escape2(null_to_empty("hero-content-container")) + " svelte-1mdi1lb"}"><div class="${"hero-content svelte-1mdi1lb"}"><h1 class="${escape2(null_to_empty("gradient-text hero-lead")) + " svelte-1mdi1lb"}">We empower makers using digital platforms.</h1>
        <div class="${"svelte-1mdi1lb"}"><p class="${"svelte-1mdi1lb"}"><span class="${"svelte-1mdi1lb"}">Kelal Tech PLC</span> is an international, remote <strong>IT agency</strong> based
            in Ethiopia working on a wide range of software products\u2014from <strong>websites</strong>
            and mobile <strong>apps</strong> to fully integrated <strong>custom systems </strong>
            and <strong>open source</strong> libraries.
          </p>
          <br>
          <span>We\u2019ve got you covered!</span></div></div>

      <div class="${"hero-content-action svelte-1mdi1lb"}">${validate_component(Button, "Button").$$render($$result, {to: "/request-quote"}, {}, {default: () => `Request a Quote`})}
        <span class="${"svelte-1mdi1lb"}">or, <a href="${"#get_started_now"}" class="${escape2(null_to_empty("find-out")) + " svelte-1mdi1lb"}">find out more</a>\xA0 \u2193</span></div></div></div>
</div>`;
});
var awtar = "/_app/assets/awtar.e4d1eb1a.png";
var furniture = "/_app/assets/3f.0a8fc925.png";
var addis_zeybe = "/_app/assets/addis_zeybe.26c664e8.png";
var alama = "/_app/assets/alama.0256c44b.png";
var dream = "/_app/assets/dream.8cfa4bac.png";
var nyala = "/_app/assets/nyala.882848e3.png";
var sun = "/_app/assets/sun.460e7ae1.png";
var zetseat = "/_app/assets/zetseat.d3d57aab.png";
var css$j = {
  code: ".clients-container.svelte-iutb33{padding:138px 32px;display:grid;grid-template-columns:1fr;gap:16px;justify-items:center}.client.svelte-iutb33{height:84px;object-fit:contain}@media only screen and (min-width: 360px){.clients-container.svelte-iutb33{grid-template-columns:repeat(2, 1fr)}}@media only screen and (min-width: 640px){.clients-container.svelte-iutb33{grid-template-columns:repeat(3, 1fr);gap:64px}}@media only screen and (min-width: 700px){.clients-container.svelte-iutb33{grid-template-columns:repeat(4, 1fr);gap:32px}}@media only screen and (min-width: 1008px){.clients-container.svelte-iutb33{gap:64px}}@media only screen and (min-width: 1295px){.clients-container.svelte-iutb33{padding-right:128px;padding-left:128px}}",
  map: `{"version":3,"file":"clients.svelte","sources":["clients.svelte"],"sourcesContent":["<script>\\n  import awtar from '../../assets/images/clients/awtar.png'\\n\\n  import furniture from '../../assets/images/clients/3f.png'\\n  import addis_zeybe from '../../assets/images/clients/addis_zeybe.png'\\n  import alama from '../../assets/images/clients/alama.png'\\n  import dream from '../../assets/images/clients/dream.png'\\n  import nyala from '../../assets/images/clients/nyala.png'\\n  import sun from '../../assets/images/clients/sun.png'\\n  import zetseat from '../../assets/images/clients/zetseat.png'\\n</script>\\n\\n<div class=\\"clients-container\\">\\n  <img\\n    title={'Finfine Furnitur company'}\\n    src={furniture}\\n    alt={'Finfine Furnitur company'}\\n    class=\\"client\\"\\n  />\\n  <img\\n    title={'Addis Zeybe (Digital News outlet)'}\\n    src={addis_zeybe}\\n    alt={'Addis Zeybe'}\\n    class=\\"client\\"\\n  />\\n  <img\\n    title={'Zetseat Apostolic Church'}\\n    src={zetseat}\\n    alt={'Zetseat Apostolic Church'}\\n    class=\\"client\\"\\n  />\\n\\n  <img title={'Awtar Musics'} src={awtar} alt={'Awtar Musics'} class=\\"client\\" />\\n  <img title={'Nyala Motors S.C.'} src={nyala} alt={'Nyala Motors S.C.'} class=\\"client\\" />\\n\\n  <img title={'Dream Engineering PLC'} src={dream} alt={'Dream Engineering PLC'} class=\\"client\\" />\\n  <img title={'Sun It Solutions'} src={sun} alt={'Sun It Solutions'} class=\\"client\\" />\\n\\n  <img title={'Alama.co'} src={alama} alt={'Alama'} class=\\"client\\" />\\n</div>\\n\\n<style>\\n  .clients-container {\\n    padding: 138px 32px;\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 16px;\\n    justify-items: center;\\n  }\\n\\n  .client {\\n    height: 84px;\\n    object-fit: contain;\\n  }\\n\\n  /* small screen */\\n  @media only screen and (min-width: 360px) {\\n    .clients-container {\\n      grid-template-columns: repeat(2, 1fr);\\n    }\\n  }\\n  /* small screen */\\n  @media only screen and (min-width: 640px) {\\n    .clients-container {\\n      grid-template-columns: repeat(3, 1fr);\\n      gap: 64px;\\n    }\\n  }\\n\\n  /* medium */\\n  @media only screen and (min-width: 700px) {\\n    .clients-container {\\n      grid-template-columns: repeat(4, 1fr);\\n      gap: 32px;\\n    }\\n  }\\n  /* large */\\n  @media only screen and (min-width: 1008px) {\\n    .clients-container {\\n      gap: 64px;\\n    }\\n  }\\n  /* extra large */\\n  @media only screen and (min-width: 1295px) {\\n    .clients-container {\\n      padding-right: 128px;\\n      padding-left: 128px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AA0CE,kBAAkB,cAAC,CAAC,AAClB,OAAO,CAAE,KAAK,CAAC,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,MAAM,AACvB,CAAC,AAED,OAAO,cAAC,CAAC,AACP,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,AACrB,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,kBAAkB,cAAC,CAAC,AAClB,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,AACvC,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,kBAAkB,cAAC,CAAC,AAClB,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,GAAG,CAAE,IAAI,AACX,CAAC,AACH,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,kBAAkB,cAAC,CAAC,AAClB,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,GAAG,CAAE,IAAI,AACX,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,kBAAkB,cAAC,CAAC,AAClB,GAAG,CAAE,IAAI,AACX,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,kBAAkB,cAAC,CAAC,AAClB,aAAa,CAAE,KAAK,CACpB,YAAY,CAAE,KAAK,AACrB,CAAC,AACH,CAAC"}`
};
var Clients = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$j);
  return `<div class="${"clients-container svelte-iutb33"}"><img${add_attribute("title", "Finfine Furnitur company", 0)}${add_attribute("src", furniture, 0)}${add_attribute("alt", "Finfine Furnitur company", 0)} class="${"client svelte-iutb33"}">
  <img${add_attribute("title", "Addis Zeybe (Digital News outlet)", 0)}${add_attribute("src", addis_zeybe, 0)}${add_attribute("alt", "Addis Zeybe", 0)} class="${"client svelte-iutb33"}">
  <img${add_attribute("title", "Zetseat Apostolic Church", 0)}${add_attribute("src", zetseat, 0)}${add_attribute("alt", "Zetseat Apostolic Church", 0)} class="${"client svelte-iutb33"}">

  <img${add_attribute("title", "Awtar Musics", 0)}${add_attribute("src", awtar, 0)}${add_attribute("alt", "Awtar Musics", 0)} class="${"client svelte-iutb33"}">
  <img${add_attribute("title", "Nyala Motors S.C.", 0)}${add_attribute("src", nyala, 0)}${add_attribute("alt", "Nyala Motors S.C.", 0)} class="${"client svelte-iutb33"}">

  <img${add_attribute("title", "Dream Engineering PLC", 0)}${add_attribute("src", dream, 0)}${add_attribute("alt", "Dream Engineering PLC", 0)} class="${"client svelte-iutb33"}">
  <img${add_attribute("title", "Sun It Solutions", 0)}${add_attribute("src", sun, 0)}${add_attribute("alt", "Sun It Solutions", 0)} class="${"client svelte-iutb33"}">

  <img${add_attribute("title", "Alama.co", 0)}${add_attribute("src", alama, 0)}${add_attribute("alt", "Alama", 0)} class="${"client svelte-iutb33"}">
</div>`;
});
var globe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAqeSURBVHgB7VldbBxXFT73zszadeNkTFNoUYk3lIpWKsRpEeSn7u6ihjYJqHalUgoUb6AgtUI46SMP7KYvvCBlXbUIkMCOKlClIrJGtE4TRTtOWodfeZMHEgRh16CqUVvVGyB4d2fmXr4zG6dee3dnnETiJUdazezMmXvP3z33fOcSXafrdFUk6BpT9tCAvc624pZ2+w1BfTHyyTLcUjfeXfSrp/akyhW6hnTVCuw9lLS713gD3VKPWEIlTVJxXMkQShtaix5Rp5jQJEnj6mu8n7OkcoTyJ3fdX87TVdIVK8CC01o5CmFHTa37LAFLEwvuVyyiiq9FnIXvlS7dKFzytMRzTZbw1rGCUERY2i/HpO8Yrr9/a+p8ma6AJK2S0hD8W0cfyrhrrRLsmlVa9mkhHBJyr+/R5u+mftf3nupC4GBoIfOktQO5yaZq+dHEmT7tW/dAuWfwyMF3cXyfJlOW/vTGLZnZgm3TKmlVHvjq0c8nTaHHgzCBtU2hJgzlHsztcJxFnu8ceyDTI9xMD7lzvUKlIHilR1Zn1wg3vka6ucR9/9i3yFsoxOPC8jPwRDoGr1hClzH28N3b3ylGlSmyAo8dGRo1pMqZmifyHUvr/T/acdhZypOeeijeY6kShKUeubAxm/ptmZ//6vjHEjHShV5RF5Lc1ODg+abvThZuiUuLCuDB+vE11sj+j299b38UuSKF0NDRRzKeoANKC8Qyjf30ganUcuGZlGUUwKKVEvsXhWd65P6/TQtBzyFkdLegzPLvOP4/c9/5jQpGUcykKHPupJ2JIluoAruOfjGDQbMazvI9secXn/vN3lZ8jxwZSiOeOabnPFPllr+ve35Wa7oApydnT6xPthrj3sG3s3DRXkWBEtm5CEp0VGDHkcdGMWkgvFZyz8s78xPteBXJjMLVw1aQSzkrcv0w8j8mC8ayDN1WsE9se2cMcb0nmFPrzNzM2r0dRGy/BpJTX4pLg/6O1Cek8vdNPfTLXDveHUceTd9AahyLt/TSjl9/lDrQ71+/dR5p1Y4pL3XHYMVpx3duxh6FCrkYqYpbczdvTFXLrfjaekBJxDPiUSka6yR8wKuMkSDEtHyWQghWHVPIoZ28wHT7tsoY5h9DONnd3cZ4O76WCmx57SsjSoh+CFV2F2pZ6kBb4CklZBITkeuTQyEU86o5LOh57A3JUkjel3XKIkjKCOPk22/cmG7J0+qh1kaWswGEyjrD+ZDaxUpy7GPjmsjvzJcphDanKhU4YBo/uqGrlu7EuxG8WHx72bsk9AGKosC9r+0ZgeD9UKB8/MGfH6QQ8oWEt0i7Wk5SRMK6mmCPSUEPh/Fu2P7vSd61kZjsd092j1CYAr6iNKcxHzmZQmjgUNr2hUhoLYX/3wWHItJC3Q88gOmT8wUKLx+UnlSNu/TyV00K3DmVRjyLRBDPVSO0UvS6zQFe6J4WTniovU8cRrC+o1kL0xwI43ddawJrpsJ7yPyydSOb/8ikbsR+vjg8ESqQr2mAlUX8R65dFgnbdTGwqmGEKsBrAWLxHJq6qw83y9w0qtEQSKK6jEAQPNFIn+IUrZKwu5yCAxB8YlMUfqF1nhMLortJ4SYFfEGbeEF6fjSBMJ7tszGJyrRKwjdFCIOMp0I90JhMlnXArpJLH5vNg4o4wJMQsViJIhDzc8iJmBGJfyn5kipBCMEIUfi1NE7BVAKea+JvUmC9WIivkzXaRm+lzMJ2DdgnDMa0eGdJVxuYjv+bUmmTK7wqFEAIfc+aTlmv364NaGRJH1dfxBgv4J4xceM5vkcAWJfGM7Vru0ikWpK9cNJKG1xNMS9jzyDHXrpepoq+ILoYG8XbKyAXGKTQabV+HPWPBnjBREoEVwWhYW5+b+oA2xKXBMha9Gf/5p8ZvhIAJVAsgJaC3/N9AFRwbymGkX6AixlSAk+IDfICx6H9V2WPgwdjBoprnjOmgjlgMMyNHyvI0FRoTW0VmPU+1HCXoInAUhDc0gFAp6C7wJgW9aYldSAUDJTmMDjt3nwQXoGQPnVJFUwI7Bvwx4LnbuNb6QffM8jn7zfE/pVmec76N00EfDyHz/M2xmrwgT9QAmMLN93Fq4cuXpa5qRrdMPV0ydAqjmwUL+1+YY5C6COvPlXCJPGYMuJnIvAvpTMn7Xi31qW1ol6+aevCxjB+rpvMLn8eBqp8cMvFvsXnTVkISKricx1O9T6KQPDNPOyhvYj8TaTNfrY+UnCkDdDs8jbxevNUc8ZbnkZPBYhOmpFyM+af4zSCUaKlwiWEWLYbwIsiea6mTfYSdBZN/Ms2MjEbbBbYsikCYbQ53geQ4yIpvJSwHAc4Y2O9zUb8JBHwE9o0S2hZKaGmVQDlaIgiELbRIhdyV+IBJNskZzHXNSJtmpCrwa8th5pkXkJv7v5hkUEMfvZtU99Ohg1aRcHHaRRWWbUC2JI2BbXcGjfUA2dm1sP61A8HlDdurxTbKhAMrPVBTlSocEI7ApXhHHZTXeZcfufUk0mKSDMzt6HilTaXEx++pxq6BhDWQYnvalpR4q9QoF43c9hjKvglbnv1qQSFkZZ5DjtDh4OTRaopkQ6qXm04YbyzaHp5AQ7gInMlZF2hAFsV23sOfU+BrT9LIYRNeZIbXkLqNEUkpVC2I/JqmkJRnG/pQxyjUDh319ZKefn7lpi4WjXHEHPzWAvJ+OGnR6kDnf/C8w4uWMxkf2oqnaQQmpy+faTR1KW5zYPvOp14Z2ZuHUWoDaBpMFczvLFWPC0VCLxA9PXAsqSzd7zyzc6LVOg8nwAYQoeuGwiTbjTAZLYTXwGh4/tGNqh8pMhubmH9tgowvbXr+Tw2hBx2GpukPHTXsW/0t+OFy8ag6zx+STTEku3YXjxxdxI7L1AflV33YtvwmULXWltdBVhvHdL02Oat59s2Fzq2Fv+56wW0wpHrUcLquuEwZm7FVwb8xM76XKP9Idp6wfXFOC8W9E8Pprhl0oIOQXi4Ek014jA7tWXwzY6txfDudC2WwkBFLXS/RbIw8Eq6ZTjFql4OKXVeSJHYffixFZM+V7gnDQXjwNFzVaVadvpePnFn0jCsAm77kdmKyjNTFEKhCpQ519dqKVh2krt1SE2zn37tayuszE0AqdQzHN9S+pmhwtBl5PT9qS1xQJUMZx6UHtnhZQd944W4/dLxuw7ANQUYoR+oa/o/HqVSEQ4EI50PcIj85cGfDMML+3lRIaVltx1+onQ/WpBL+f6w88UJyDjNO3m3h/R3idB+OcBhyKHz5cTZpnj+ceGTIyR7Z7E2RgFOkS7ls7sGz6WGI55mrvqQbwDrwBJUAMDg0xQCwCjj5GZC1uuTr+7OF7mrfaPhzfaiA91DtewHzCqt0V62V9ZKPdr97FOpYvkHx7b1G7Ke5gNCABsb4/CBXxFIbN/jqbPOauS54lPKLVNP4FzLzwAyxk3B2DeAkeUugX4Pj4qCsJdPKUWNAFr4EwdrqQIAlIwFJ5WApzqAmEXA1NyTidOhbcxrqsAi7TjyeMLQ/h4IkoAg/YyHGQfzwAwH1wLHduHKoceAHxBVwPIVYOyD+J/fl/qjQ1dB1/SkfujI0MANkuKG9gZg6X4G5AijAONBKZxA+nOxuutkd75/fnadrtP/mf4HLe8d6kFHfyoAAAAASUVORK5CYII=";
var pointer = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAZqSURBVHgB7VlLbBtFGP5n9uG0KY0jAQcErXPrpaoDBwp9eJeWtKEqcaRW6oMS58Yt4YLEKbEQD3FpAgJ6Qba50LSguAiR1Gk72wYKnBKkHnpqNuIh4BKLijSxd2b4x21QKI6zazs0SP4OWWseu/vt/3//YwLQQAMN/K9Byg0+nzvGKEjQQGS+6jifhnWMsgSeyx2f06UI60SCDtzFa1p4IpPtzLqwzkDLjko5xJEblwACaIQDDBg6mTl2KZ46deVwDNYRylrAYokwLS7OaVJACLxuZBnXiegxiAADKRkErSJEsvnPhexQt5OHB4iyFnDsdJ4LcCShUAAt+sWBzxOCyzYJJCkIcQWQrUBJqrDZmOm7vC/VP2ZF4AGBrDSxe+wly6Cc4VfP5zpGWpfPncq9kDCp7EFrWGgNaQInJpGOLnnmjX2TafgPQSpNxi6emDKIjOpc2uOdZ537519hByMG5wM64XETRNgAD0wi3BARaQELmdftaRfWGLTSpCSQFviHazBQbv6MPe6+v3+iV1LRJgB6JboXul0Efw+YYM68x55KfcSiFqwhKlpAiRkKhVs6iFbi8faJQ+enYRUMTuy2TM1LoOu9fNe1lIuJWUN6SQ7z2V7bravoyWoL9uZODOlS9hlSDF88ONIPPvE22xlpAi8RIrwHiWxFQiQEIm8QL9ukFQcP7ZqZhTpgVQJKzDoVzACeL84vtjnd2cBf8GMWRYvwHtRKDC0C9yzjoFUy+/b+mIYasCoBhdj4SYYPtzAj91/sGBmGKvEp2xbRKQya4HWhRcJoHcwpSvQ8bcB8+sld+cBWoX4WEUKGMfZjCiNxqAHH7Zvu0djNhBBeG96tV0ri4vBWKTFIyJB745tHUjPXw4EyvS8LKFi5k3NYF2Go5NZYx/mrUCewycetDSrLg0jcdS9PhqhwdfCSxSbjQlt7vqLL+rKAgsD6CL8YXqlvIfuBvecnZ+fuX3ppEdqEkEm08qwQpI1Ikmq+s3hr7ltzoNJ+3wTovFlyI+TQZY3Gw1BntNu/YokCDiE0i8+QWExiLUxbQWoV3dY3Aac7nUcLOJjYSNMmsw/qhCvXI7FrXz9x+vvJx+aAagwr4H71DPVIT5IkbAjZlfbrEASSJwWFGBFSuVESqsS5a9tiBsi4SbweznkrvoTEIpGgmPGl4epGXaa3PHPb9XMv3yJegp07PmVIHqVCYH30meN334fX2mO4D2smmcA8EL6XD8CknmtKkcFs7+xBPUBABLMAggiawdpnB9GIEpez2vp32dN92JoOciHCGrapkngSA4IqyTMeluyH97qr3qPi+0BAWKOJsN5cmMHKM6wJEv3y4MgPlda/xZ6dmy4+Gn6IFGC78Vu6RS5meu0bDtQJvkW8hJKYhcxgxMA4wROV1iav7OnCrjR8G53lZ7kJJgtbohfg4VULwiAITEAB1ZZVOQE7tJ44WzmkoiDjSFRu134fKkrqFrG7a/Y2swSz6haGqyJwCZsbjHSOINAKizSx0jpcE0eSsJEuDGOLanslEmSH4YVYf51IVEVAQWB5jWEP8wzpKjf/2iVLff0WLsnVQfs71+k86wpRsLmksx6hO7BLqguJqglcPnAui429Sm7WkbG4df88J7QL5zBlkMzS2DieKxnYnnLQZ3E+ukkKNlgjiaoJlF5SiKFSlarTf2Rm9WVxPFGaa+Js+dxZJEGLGroTnm5IEt0Ad9hpFq2aRE0ECqY3jF6EYob4cjEXikZcjQvMrG/uuv6vGj+NJGSR2h6oIxqKJAhLVUmiJgKOnc2rAkxFJN2Dv62gdKGiD7pJZqW9ZzrHXUrBLkpwOUFh0yIbZZHAJGoioCC5KoHVDyiV2Qm0BLoOxn+qKjJWae87tuPisY2yxCxGqyilOmMBSQTOxOXwYu7IFGbmqME9e6MmsG0UKWx8nA/2T9h+9qMGImHCWStdwOvidIv3h91u53313jVb4C5kWsV70LUBTqnKvihwyPjd/ao6AJMahlg8VwKIgmGyKRb2ZYm6EKAGV6XFHD7cUoJWZ6oY550g9+hFElRQWygSqImWEIz62VcXAlm7dNTyiSw1/igLIR0lUgiIbmz6C5yoEDuLOor42VMnFwJVIGXVyysSclnyCopO23WN4kL77UXZ7md9XUS8hKMTcYb/2YmEeMFOV2GBdYH4GjT8DTTQQAMNrBn+AqJt9aULYUBWAAAAAElFTkSuQmCC";
var lightBulb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATkSURBVHgB7ZnNbxtFFMDfm7WddWnTPQAqBxSbQ2+oCRcIVVRvkKK6gOogFZULNeLCiSRHTnH5B5oibkXEXFBRD3FPgRTYjSpoJUSbqpdKSHjDqQcQWwlE5N2dx5s1iJav7OxO1It/kjVx1js773PevAUYMWLEiIcJgiEW1xrOwfGobYvkyBgkkzbGjo0SeAwqEIc2xb1qSfovHO1vg0EKC/DWeqNmV6zlCiTtMYzJhgSrIiFeNNqYwBjEUOX/s1DI11mgpFuOorPT7t0ADCCgAO3PX1qgit2XgG1iXfBnUyIsxkTPWFSpRxLrINHlC0sE0CNK9XVGlLB/69rjy2CAXBZorbUc+wCdq1DMWk+Udt8rWVFnxfXD/7tv3avVbEt22K3O2H9YY2eQLE25YQg5KUEe9lurkuKThBiCwNb7s1c2s9zWdIOAh/a1q4e6bK1Vtkp7vJJeegNyou1Cx6+8uiwJWuwO21FUmrowu55p8fczPXPXxwhdAhHw1/YPX4+fg5xouVBj/XStYsnvK+zYJcCp3tylLSjA7auPNjhrecqdSknkPjGz44MmWhZgl1nlgAUp6XzRxSuenvnR59A/rxKAVbJyBXVmAZ5j7UsUDUninqTyChjCGkCHCEKOh8bPN+wJ0CSzAITlltJ+Qtj7tHkxAEPUhxnoIxYC5G/6wZxZAAnipGQ5JNJlMAzP6fMWQSTgGGiSWYAEsMZPwJ0YAzANWluSAwz5GaCJhgWwxhaAb178uHDw/p36dBgMd3KogSbZYwCQpLna71/mv3/Ijo4FQo4DeP6LN7UzxW70PcdRFmA3ugea6FhgW7nQYJDUwTRjcCTdX1Bou6eGAOCnWhJSO1PsRiS5NOExlnALNMmehQgus5Y424lFMEwsLFVbcY6GHmiSWYA7zQ983mw2+UHOsxuvL4Ahvv3qsTbPWeP195+c+cUHTbRqISTRYUvwjoMdVVpAQTzvEO8tlqpu2cLWu5ADLQFun7igSmdlCackSmsNPthATta8mmOVy57aXxIU3cNHf+pCDrTPA7hD8/zQgLU2ifuq3vEcluDF1x4po8eKUJtjQEKchZxoC7A13w3LBHwYUSUFToJF3ssbr7Sz3v+Jd7iFonyTc/4kz9GniNyp6fwH/FyH+uvNbsC+6xKRL4EmuIr5MOu9CbseB+xBtqJPsZgt2p3IdyaGoRA8uHMbp1kOmfk+Sj8CT8x854IBCrVVFDJdUPYaKS2bwRyFBUg3IL3fo8xRtP0XRiyQ3YHSlZs0gAELDKtIyLInrHqTDgx/b6wuN+BCfBzk8cD+0q5dhQHIhdRiiD4YorAmuFfUKFv0ZZWbudy8DasoQxsj4CYvDMeIm7tSNXkdbvI6abOXovpr7p0ADFDYAn7zos86dblGCng6Z3gs5OIMYCIt0kjUeNdW3/ma8BMi19TiFUbPiGnT1wbHgR2wKgMqDySqv9kMbAGAd9zrAYx4EGMWaH52qq9eaNCvcqo333ugXd7h7FOlsZtVjom33RtGj6SFY+CvmUTA2XSisl/+IxtZsG+BVcWtSSsAw5izwMapY9y19ocvLlQ24vdinHGG2SfhT8SvnfCpJcNxYMwC63OXNjFJXEAM1IFHDmv9CVV5JpysuPqcXdqDIN6TTlWb31jatu38mYlWmn4AI0aM2BN+B5APFef7/McMAAAAAElFTkSuQmCC";
var smartphone = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPMSURBVHgB7VmxctNAEN092ZLswIzpoEItXVwaijh0qfAfhHwBYRhm6Ah/wCeEjs6hyCRd0jChsz/BHQUFDkMRbOmW3TtnJhVZOeej8fPIJ51Wp93bvd3VLcAaa9wJCDUxOBkUadNuNaGCDCvMuW0YS661FbbNnFIeNwNpK+QDWnw/TeawwedGrhd0MkZqLeZmRomByybOx496V5M6/DS0hP3hoLOx0RgC2D5YAkTDvQQWif8IuQfQIFXEf2iBkLs8/IlFKLkvc4TgRGnInaTiUQwkIgzf+P0tPUxo9qHVg4mGL5UAwnzazkbMacGMTZmHc0tmapnRikQMZP4QiJmUcxIGKQHLP2Gf6LrlEVhu62iElvy5l6nDQw2Y5mWCpk8j28UuTIMIAPfaryqyjw2YyZ9yvv1l52gCK8D3i7xgLZyxQAVcwT53Hdz2jAEFeLZfMCmySe+droh5gdg/63LPilYRdjXPKAWgrpjK6c7nc1gx7vfK84VveayhVwlAPB1WTD0S+HUkbkJDq9OALNL6Hndp2Bsu7DaoBSCMJwB4DahIVV7IacDGk0A0oNW4bg38Fw3ooDQhmRWIBrcGMLQJ6WQNAhcHlLRqE7IQEejTCw30XiiiGxUFBHejlmIKEFoDEokxXiReBDLV+/ReCOK6URsylXAqjRgIqtCpBEXOhaDGGlDHAYzrhW40/0YdNxovnQYIHwcsxFOBd9sQ8ntAAku8VAJgBZG4gnjwJqRbA6pFTM6tRfwi814vrAnFdKM+EQqbSmDMVGKx6RXOjboBI0ZicgvABN6VwNhxgMItYktxP2go9CL2+bmJZ0I1aFf6QUMX0KevsAk14dcABjShxVEbCGf8Btkif1DnMe+FdNAFsmXTaQuvWcfLLH713qg6nTZLCIBP4SMsgfDfxP6I60aVb1Nvr2tVGgLiQrVxU6uBqaTT+fEbVdHhLhidPSzchBHdWh8TKOOAORIzSoAOYMWomvDe70qYIw29Tk/Dd0WjWY5aSJ0mzMftxB5mNJs2TQU513w3uA4sNd+ca8G5nbnacc7l05RKktZdsx5zmLk25bbFBbdM6sdca5b6MY8LOZa7Lay2Uigvua7cfdKbTsIIwGgev91kJof84iLDkl8mhW5mEEphEOU6xTlfW2zx/Uzuc7E75zxWaPwzJWVcLc5EoOsxXCG8JBbWjcH9P1Msn3ef/Rhr+Kq1MDsn+0VioZ+Z+ZabVQ6WqcycO5gZ0YgIZKRoXbn+tlTw3exW0DaeYcc806ULWqFL5R7Zcaf89am7PVXZ/xprBMBfHqrSfqjhUuwAAAAASUVORK5CYII=";
var arrow = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB2SURBVHgB7ZLRCYAwDERPcAodQBfQOZygC3QPN3A1cQEncIB6gYAOkEiFPDjar3uQBAh+TSllYjp4wfJds8ADFueQ1C9p5dT49rDhZA5mZFZ2oxEb/LhEkPgZYMeMZyIbLJG5v3aQYUmUf1+uAr9yFSQ986BibqAWxHjo2nzJAAAAAElFTkSuQmCC";
var css$i = {
  code: ".ssbc-button__link.svelte-abzkh4,.ssbc-button__icon.svelte-abzkh4{display:inline-block}.ssbc-button__link.svelte-abzkh4{text-decoration:none;color:#fff}.ssbc-button.svelte-abzkh4{transition:25ms ease-out;padding:0.75em}.ssbc-button__icon.svelte-abzkh4 svg{width:1em;height:1em;margin:0;vertical-align:middle}.ssbc-button__icon--fill.svelte-abzkh4{fill:#fff;stroke:none}.ssbc-button__icon--outline.svelte-abzkh4{fill:none;stroke:#fff}",
  map: `{"version":3,"file":"ShareButton.svelte","sources":["ShareButton.svelte"],"sourcesContent":["<script>\\n  export let href;\\n  export let label = '';\\n  export let fill = true;\\n  export let ariaLabel = '';\\n  let classes = '';\\n\\n  export { classes as class };\\n</script>\\n\\n<style>\\n.ssbc-button__link,\\n.ssbc-button__icon {\\n  display: inline-block;\\n}\\n\\n.ssbc-button__link {\\n  text-decoration: none;\\n  color: #fff;\\n}\\n\\n.ssbc-button {\\n  transition: 25ms ease-out;\\n  padding: 0.75em;\\n}\\n\\n.ssbc-button__icon :global(svg) {\\n  width: 1em;\\n  height: 1em;\\n  margin: 0;\\n  vertical-align: middle;\\n}\\n\\n.ssbc-button__icon--fill {\\n  fill: #fff;\\n  stroke: none;\\n}\\n\\n.ssbc-button__icon--outline {\\n  fill: none;\\n  stroke: #fff;\\n}\\n</style>\\n\\n<a class=\\"ssbc-button__link\\" {href} target=\\"_blank\\" rel=\\"noopener\\" aria-label={ariaLabel}>\\n  <div class=\\"ssbc-button {classes}\\">\\n    <div aria-hidden=\\"true\\" class=\\"ssbc-button__icon\\" class:ssbc-button__icon--fill={fill} class:ssbc-button__icon--outline={!fill}>\\n      <slot></slot>\\n    </div>\\n    {label}\\n  </div>\\n</a>"],"names":[],"mappings":"AAWA,gCAAkB,CAClB,kBAAkB,cAAC,CAAC,AAClB,OAAO,CAAE,YAAY,AACvB,CAAC,AAED,kBAAkB,cAAC,CAAC,AAClB,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,YAAY,cAAC,CAAC,AACZ,UAAU,CAAE,IAAI,CAAC,QAAQ,CACzB,OAAO,CAAE,MAAM,AACjB,CAAC,AAED,gCAAkB,CAAC,AAAQ,GAAG,AAAE,CAAC,AAC/B,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,CAAC,CACT,cAAc,CAAE,MAAM,AACxB,CAAC,AAED,wBAAwB,cAAC,CAAC,AACxB,IAAI,CAAE,IAAI,CACV,MAAM,CAAE,IAAI,AACd,CAAC,AAED,2BAA2B,cAAC,CAAC,AAC3B,IAAI,CAAE,IAAI,CACV,MAAM,CAAE,IAAI,AACd,CAAC"}`
};
var ShareButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {href} = $$props;
  let {label = ""} = $$props;
  let {fill = true} = $$props;
  let {ariaLabel = ""} = $$props;
  let {class: classes = ""} = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$i);
  return `<a class="${"ssbc-button__link svelte-abzkh4"}"${add_attribute("href", href, 0)} target="${"_blank"}" rel="${"noopener"}"${add_attribute("aria-label", ariaLabel, 0)}><div class="${"ssbc-button " + escape2(classes) + " svelte-abzkh4"}"><div aria-hidden="${"true"}" class="${[
    "ssbc-button__icon svelte-abzkh4",
    (fill ? "ssbc-button__icon--fill" : "") + " " + (!fill ? "ssbc-button__icon--outline" : "")
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>
    ${escape2(label)}</div></a>`;
});
var css$h = {
  code: ".ssbc-button--email{background-color:#777777}.ssbc-button--email:active,.ssbc-button--email:hover{background-color:#5e5e5e}",
  map: `{"version":3,"file":"Email.svelte","sources":["Email.svelte"],"sourcesContent":["<script>\\n  export let subject;\\n  export let body;\\n  export let ariaLabel = 'Share by Email';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`mailto:?subject=\${subject}&body=\${body}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--email) {\\n  background-color: #777777;\\n}\\n\\n:global(.ssbc-button--email:active),\\n:global(.ssbc-button--email:hover) {\\n  background-color: #5e5e5e;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--email {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAeQ,mBAAmB,AAAE,CAAC,AAC5B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,0BAA0B,AAAC,CAC3B,yBAAyB,AAAE,CAAC,AAClC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
var Email = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["subject", "body", "ariaLabel", "class"]);
  let {subject} = $$props;
  let {body} = $$props;
  let {ariaLabel = "Share by Email"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.subject === void 0 && $$bindings.subject && subject !== void 0)
    $$bindings.subject(subject);
  if ($$props.body === void 0 && $$bindings.body && body !== void 0)
    $$bindings.body(body);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$h);
  href = encodeURI(`mailto:?subject=${subject}&body=${body}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({class: "ssbc-button--email " + classes}, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"}"></path></svg>`
  })}`;
});
var css$g = {
  code: ".ssbc-button--facebook{background-color:#3b5998}.ssbc-button--facebook:active,.ssbc-button--facebook:hover{background-color:#2d4373}",
  map: `{"version":3,"file":"Facebook.svelte","sources":["Facebook.svelte"],"sourcesContent":["<script>\\n  export let url;\\n  export let ariaLabel = 'Share on Facebook';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`https://facebook.com/sharer/sharer.php?u=\${url}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--facebook) {\\n  background-color: #3b5998;\\n}\\n\\n:global(.ssbc-button--facebook:active),\\n:global(.ssbc-button--facebook:hover) {\\n  background-color: #2d4373;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--facebook {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAcQ,sBAAsB,AAAE,CAAC,AAC/B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,6BAA6B,AAAC,CAC9B,4BAA4B,AAAE,CAAC,AACrC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
var Facebook = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["url", "ariaLabel", "class"]);
  let {url: url2} = $$props;
  let {ariaLabel = "Share on Facebook"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$g);
  href = encodeURI(`https://facebook.com/sharer/sharer.php?u=${url2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({
    class: "ssbc-button--facebook " + classes
  }, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"}"></path></svg>`
  })}`;
});
var css$f = {
  code: ".ssbc-button--hacker-news{background-color:#FF6600}.ssbc-button--hacker-news:active,.ssbc-button--hacker-news:hover{background-color:#FB6200}",
  map: `{"version":3,"file":"HackerNews.svelte","sources":["HackerNews.svelte"],"sourcesContent":["<script>\\n  export let title;\\n  export let url;\\n  export let ariaLabel = 'Share on HackerNews';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`https://news.ycombinator.com/submitlink?u=\${url}&t=\${title}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--hacker-news) {\\n  background-color: #FF6600;\\n}\\n\\n:global(.ssbc-button--hacker-news:active),\\n:global(.ssbc-button--hacker-news:hover) {\\n  background-color: #FB6200;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--hacker-news {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 140 140\\">\\n    <path fill-rule=\\"evenodd\\" d=\\"M60.94 82.314L17 0h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L103.49 0h18.69L77.84 83.308v53.087h-16.9v-54.08z\\"></path>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAeQ,yBAAyB,AAAE,CAAC,AAClC,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,gCAAgC,AAAC,CACjC,+BAA+B,AAAE,CAAC,AACxC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "url", "ariaLabel", "class"]);
  let {title: title2} = $$props;
  let {url: url2} = $$props;
  let {ariaLabel = "Share on HackerNews"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$f);
  href = encodeURI(`https://news.ycombinator.com/submitlink?u=${url2}&t=${title2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({
    class: "ssbc-button--hacker-news " + classes
  }, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 140 140"}"><path fill-rule="${"evenodd"}" d="${"M60.94 82.314L17 0h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L103.49 0h18.69L77.84 83.308v53.087h-16.9v-54.08z"}"></path></svg>`
  })}`;
});
var css$e = {
  code: ".ssbc-button--linkedin{background-color:#0077b5}.ssbc-button--linkedin:active,.ssbc-button--linkedin:hover{background-color:#046293}",
  map: `{"version":3,"file":"LinkedIn.svelte","sources":["LinkedIn.svelte"],"sourcesContent":["<script>\\n  export let url;\\n  export let ariaLabel = 'Share on LinkedIn';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n\\n  $: href = encodeURI(\`https://www.linkedin.com/sharing/share-offsite/?url=\${url}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--linkedin) {\\n  background-color: #0077b5;\\n}\\n\\n:global(.ssbc-button--linkedin:active),\\n:global(.ssbc-button--linkedin:hover) {\\n  background-color: #046293;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--linkedin {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAcQ,sBAAsB,AAAE,CAAC,AAC/B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,6BAA6B,AAAC,CAC9B,4BAA4B,AAAE,CAAC,AACrC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
var LinkedIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["url", "ariaLabel", "class"]);
  let {url: url2} = $$props;
  let {ariaLabel = "Share on LinkedIn"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$e);
  href = encodeURI(`https://www.linkedin.com/sharing/share-offsite/?url=${url2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({
    class: "ssbc-button--linkedin " + classes
  }, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"}"></path></svg>`
  })}`;
});
var css$d = {
  code: ".ssbc-button--pinterest{background-color:#bd081c}.ssbc-button--pinterest:active,.ssbc-button--pinterest:hover{background-color:#8c0615}",
  map: `{"version":3,"file":"Pinterest.svelte","sources":["Pinterest.svelte"],"sourcesContent":["<script>\\n  export let description;\\n  export let url;\\n  export let media;\\n  export let ariaLabel = 'Share on Pinterest';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`https://pinterest.com/pin/create/button/?url=\${url}&media=\${media}&description=\${description}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--pinterest) {\\n  background-color: #bd081c;\\n}\\n\\n:global(.ssbc-button--pinterest:active),\\n:global(.ssbc-button--pinterest:hover) {\\n  background-color: #8c0615;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--pinterest {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAgBQ,uBAAuB,AAAE,CAAC,AAChC,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,8BAA8B,AAAC,CAC/B,6BAA6B,AAAE,CAAC,AACtC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["description", "url", "media", "ariaLabel", "class"]);
  let {description} = $$props;
  let {url: url2} = $$props;
  let {media} = $$props;
  let {ariaLabel = "Share on Pinterest"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.media === void 0 && $$bindings.media && media !== void 0)
    $$bindings.media(media);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$d);
  href = encodeURI(`https://pinterest.com/pin/create/button/?url=${url2}&media=${media}&description=${description}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({
    class: "ssbc-button--pinterest " + classes
  }, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z"}"></path></svg>`
  })}`;
});
var css$c = {
  code: ".ssbc-button--reddit{background-color:#5f99cf}.ssbc-button--reddit:active,.ssbc-button--reddit:hover{background-color:#3a80c1}",
  map: `{"version":3,"file":"Reddit.svelte","sources":["Reddit.svelte"],"sourcesContent":["<script>\\n  export let title;\\n  export let url;\\n  export let ariaLabel = 'Share on Reddit';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`https://reddit.com/submit/?url=\${url}&resubmit=true&title=\${title}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--reddit) {\\n  background-color: #5f99cf;\\n}\\n\\n:global(.ssbc-button--reddit:active),\\n:global(.ssbc-button--reddit:hover) {\\n  background-color: #3a80c1;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--reddit {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 13.37C1.5 13.07 1 12.35 1 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.05zm3.7.13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.8 4.8c-1.08.63-2.42.96-3.8.96-1.4 0-2.74-.34-3.8-.95-.24-.13-.32-.44-.2-.68.15-.24.46-.32.7-.18 1.83 1.06 4.76 1.06 6.6 0 .23-.13.53-.05.67.2.14.23.06.54-.18.67zm.2-2.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.7-2.13c-.38-1.16-1.2-2.2-2.3-3.05.38-.5.97-.82 1.6-.82 1.1 0 2 .9 2 2 0 .84-.53 1.57-1.3 1.87z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAeQ,oBAAoB,AAAE,CAAC,AAC7B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,2BAA2B,AAAC,CAC5B,0BAA0B,AAAE,CAAC,AACnC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
var Reddit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "url", "ariaLabel", "class"]);
  let {title: title2} = $$props;
  let {url: url2} = $$props;
  let {ariaLabel = "Share on Reddit"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$c);
  href = encodeURI(`https://reddit.com/submit/?url=${url2}&resubmit=true&title=${title2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({class: "ssbc-button--reddit " + classes}, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.75-1.64-6.07-1.72.08-1.1.4-3.05 1.52-3.7.72-.4 1.73-.24 3 .5C17.2 6.3 18.46 7.5 20 7.5c1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.38 0-2.54.94-2.88 2.22-1.43-.72-2.64-.8-3.6-.25-1.64.94-1.95 3.47-2 4.55-2.33.08-4.45.7-6.1 1.72C4.86 8.98 3.96 8.5 3 8.5c-1.65 0-3 1.35-3 3 0 1.32.84 2.44 2.05 2.84-.03.22-.05.44-.05.66 0 3.86 4.5 7 10 7s10-3.14 10-7c0-.22-.02-.44-.05-.66 1.2-.4 2.05-1.54 2.05-2.84zM2.3 13.37C1.5 13.07 1 12.35 1 11.5c0-1.1.9-2 2-2 .64 0 1.22.32 1.6.82-1.1.85-1.92 1.9-2.3 3.05zm3.7.13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9.8 4.8c-1.08.63-2.42.96-3.8.96-1.4 0-2.74-.34-3.8-.95-.24-.13-.32-.44-.2-.68.15-.24.46-.32.7-.18 1.83 1.06 4.76 1.06 6.6 0 .23-.13.53-.05.67.2.14.23.06.54-.18.67zm.2-2.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm5.7-2.13c-.38-1.16-1.2-2.2-2.3-3.05.38-.5.97-.82 1.6-.82 1.1 0 2 .9 2 2 0 .84-.53 1.57-1.3 1.87z"}"></path></svg>`
  })}`;
});
var css$b = {
  code: ".ssbc-button--telegram{background-color:#54A9EB}.ssbc-button--telegram:active,.ssbc-button--telegram:hover{background-color:#4B97D1}",
  map: `{"version":3,"file":"Telegram.svelte","sources":["Telegram.svelte"],"sourcesContent":["<script>\\n  export let text;\\n  export let url;\\n  export let ariaLabel = 'Share on Telegram';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`https://telegram.me/share/url?text=\${text}&url=\${url}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--telegram) {\\n  background-color: #54A9EB;\\n}\\n\\n:global(.ssbc-button--telegram:active),\\n:global(.ssbc-button--telegram:hover) {\\n  background-color: #4B97D1;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--telegram {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAeQ,sBAAsB,AAAE,CAAC,AAC/B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,6BAA6B,AAAC,CAC9B,4BAA4B,AAAE,CAAC,AACrC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
var Telegram = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["text", "url", "ariaLabel", "class"]);
  let {text} = $$props;
  let {url: url2} = $$props;
  let {ariaLabel = "Share on Telegram"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$b);
  href = encodeURI(`https://telegram.me/share/url?text=${text}&url=${url2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({
    class: "ssbc-button--telegram " + classes
  }, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z"}"></path></svg>`
  })}`;
});
var css$a = {
  code: ".ssbc-button--tumblr{background-color:#35465C}.ssbc-button--tumblr:active,.ssbc-button--tumblr:hover{background-color:#222d3c}",
  map: '{"version":3,"file":"Tumblr.svelte","sources":["Tumblr.svelte"],"sourcesContent":["<script>\\n  export let title;\\n  export let caption;\\n  export let url;\\n  export let ariaLabel = \'Share on Tumblr\';\\n  let classes = \'\';\\n\\n  export { classes as class };\\n\\n  import ShareButton from \'./ShareButton.svelte\';\\n  let href;\\n  \\n  $: href = encodeURI(`https://www.tumblr.com/widgets/share/tool?posttype=link&title=${title}&caption=${caption}&content=${url}&canonicalUrl=${url}&shareSource=tumblr_share_button`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--tumblr) {\\n  background-color: #35465C;\\n}\\n\\n:global(.ssbc-button--tumblr:active),\\n:global(.ssbc-button--tumblr:hover) {\\n  background-color: #222d3c;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--tumblr {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAgBQ,oBAAoB,AAAE,CAAC,AAC7B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,2BAA2B,AAAC,CAC5B,0BAA0B,AAAE,CAAC,AACnC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}'
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "caption", "url", "ariaLabel", "class"]);
  let {title: title2} = $$props;
  let {caption} = $$props;
  let {url: url2} = $$props;
  let {ariaLabel = "Share on Tumblr"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$a);
  href = encodeURI(`https://www.tumblr.com/widgets/share/tool?posttype=link&title=${title2}&caption=${caption}&content=${url2}&canonicalUrl=${url2}&shareSource=tumblr_share_button`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({class: "ssbc-button--tumblr " + classes}, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M13.5.5v5h5v4h-5V15c0 5 3.5 4.4 6 2.8v4.4c-6.7 3.2-12 0-12-4.2V9.5h-3V6.7c1-.3 2.2-.7 3-1.3.5-.5 1-1.2 1.4-2 .3-.7.6-1.7.7-3h3.8z"}"></path></svg>`
  })}`;
});
var css$9 = {
  code: ".ssbc-button--twitter{background-color:#55acee}.ssbc-button--twitter:active,.ssbc-button--twitter:hover{background-color:#2795e9}",
  map: `{"version":3,"file":"Twitter.svelte","sources":["Twitter.svelte"],"sourcesContent":["<script>\\n  export let text;\\n  export let url;\\n  export let ariaLabel = 'Share on Twitter';\\n  export let hashtags = '';\\n  export let via = '';\\n  export let related = '';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n\\n  $: href = encodeURI(\`https://twitter.com/intent/tweet/?text=\${text}&hashtags=\${hashtags}&via=\${via}&related=\${related}&url=\${url}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--twitter) {\\n  background-color: #55acee;\\n}\\n\\n:global(.ssbc-button--twitter:active),\\n:global(.ssbc-button--twitter:hover) {\\n  background-color: #2795e9;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--twitter {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAkBQ,qBAAqB,AAAE,CAAC,AAC9B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,4BAA4B,AAAC,CAC7B,2BAA2B,AAAE,CAAC,AACpC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
var Twitter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["text", "url", "ariaLabel", "hashtags", "via", "related", "class"]);
  let {text} = $$props;
  let {url: url2} = $$props;
  let {ariaLabel = "Share on Twitter"} = $$props;
  let {hashtags = ""} = $$props;
  let {via = ""} = $$props;
  let {related = ""} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.hashtags === void 0 && $$bindings.hashtags && hashtags !== void 0)
    $$bindings.hashtags(hashtags);
  if ($$props.via === void 0 && $$bindings.via && via !== void 0)
    $$bindings.via(via);
  if ($$props.related === void 0 && $$bindings.related && related !== void 0)
    $$bindings.related(related);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$9);
  href = encodeURI(`https://twitter.com/intent/tweet/?text=${text}&hashtags=${hashtags}&via=${via}&related=${related}&url=${url2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({class: "ssbc-button--twitter " + classes}, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"}"></path></svg>`
  })}`;
});
var css$8 = {
  code: ".ssbc-button--vk{background-color:#507299}.ssbc-button--vk:active,.ssbc-button--vk:hover{background-color:#43648c}",
  map: `{"version":3,"file":"Vk.svelte","sources":["Vk.svelte"],"sourcesContent":["<script>\\n  export let title;\\n  export let url;\\n  export let ariaLabel = 'Share on VK';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`http://vk.com/share.php?title=\${title}&url=\${url}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--vk) {\\n  background-color: #507299;\\n}\\n\\n:global(.ssbc-button--vk:active),\\n:global(.ssbc-button--vk:hover) {\\n  background-color: #43648c;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--vk {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAeQ,gBAAgB,AAAE,CAAC,AACzB,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,uBAAuB,AAAC,CACxB,sBAAsB,AAAE,CAAC,AAC/B,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "url", "ariaLabel", "class"]);
  let {title: title2} = $$props;
  let {url: url2} = $$props;
  let {ariaLabel = "Share on VK"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$8);
  href = encodeURI(`http://vk.com/share.php?title=${title2}&url=${url2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({class: "ssbc-button--vk " + classes}, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z"}"></path></svg>`
  })}`;
});
var css$7 = {
  code: ".ssbc-button--whatsapp{background-color:#25D366}.ssbc-button--whatsapp:active,.ssbc-button--whatsapp:hover{background-color:#1DA851}",
  map: `{"version":3,"file":"WhatsApp.svelte","sources":["WhatsApp.svelte"],"sourcesContent":["<script>\\n  export let text;\\n  export let ariaLabel = 'Share on WhatsApp';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`whatsapp://send?text=\${text}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--whatsapp) {\\n  background-color: #25D366;\\n}\\n\\n:global(.ssbc-button--whatsapp:active),\\n:global(.ssbc-button--whatsapp:hover) {\\n  background-color: #1DA851;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--whatsapp {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAcQ,sBAAsB,AAAE,CAAC,AAC/B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,6BAA6B,AAAC,CAC9B,4BAA4B,AAAE,CAAC,AACrC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["text", "ariaLabel", "class"]);
  let {text} = $$props;
  let {ariaLabel = "Share on WhatsApp"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$7);
  href = encodeURI(`whatsapp://send?text=${text}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({
    class: "ssbc-button--whatsapp " + classes
  }, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"}"></path></svg>`
  })}`;
});
var css$6 = {
  code: ".ssbc-button--xing{background-color:#1a7576}.ssbc-button--xing:active,.ssbc-button--xing:hover{background-color:#114C4C}",
  map: `{"version":3,"file":"Xing.svelte","sources":["Xing.svelte"],"sourcesContent":["<script>\\n  export let title;\\n  export let url;\\n  export let ariaLabel = 'Share on Xing';\\n  let classes = '';\\n\\n  export { classes as class };\\n\\n  import ShareButton from './ShareButton.svelte';\\n  let href;\\n  \\n  $: href = encodeURI(\`https://www.xing.com/app/user?op=share;url=\${url};title=\${title}\`);\\n</script>\\n\\n<style>\\n:global(.ssbc-button--xing) {\\n  background-color: #1a7576;\\n}\\n\\n:global(.ssbc-button--xing:active),\\n:global(.ssbc-button--xing:hover) {\\n  background-color: #114C4C;\\n}\\n</style>\\n\\n<ShareButton class=\\"ssbc-button--xing {classes}\\" {...$$restProps} {ariaLabel} {href}>\\n  <svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\">\\n    <path d=\\"M10.2 9.7l-3-5.4C7.2 4 7 4 6.8 4h-5c-.3 0-.4 0-.5.2v.5L4 10 .4 16v.5c0 .2.2.3.4.3h5c.3 0 .4 0 .5-.2l4-6.6v-.5zM24 .2l-.5-.2H18s-.2 0-.3.3l-8 14v.4l5.2 9c0 .2 0 .3.3.3h5.4s.3 0 .4-.2c.2-.2.2-.4 0-.5l-5-8.8L24 .7V.2z\\"/>\\n  </svg>\\n</ShareButton>"],"names":[],"mappings":"AAeQ,kBAAkB,AAAE,CAAC,AAC3B,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAEO,yBAAyB,AAAC,CAC1B,wBAAwB,AAAE,CAAC,AACjC,gBAAgB,CAAE,OAAO,AAC3B,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "url", "ariaLabel", "class"]);
  let {title: title2} = $$props;
  let {url: url2} = $$props;
  let {ariaLabel = "Share on Xing"} = $$props;
  let {class: classes = ""} = $$props;
  let href;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  if ($$props.url === void 0 && $$bindings.url && url2 !== void 0)
    $$bindings.url(url2);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0)
    $$bindings.class(classes);
  $$result.css.add(css$6);
  href = encodeURI(`https://www.xing.com/app/user?op=share;url=${url2};title=${title2}`);
  return `${validate_component(ShareButton, "ShareButton").$$render($$result, Object.assign({class: "ssbc-button--xing " + classes}, $$restProps, {ariaLabel}, {href}), {}, {
    default: () => `<svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}"><path d="${"M10.2 9.7l-3-5.4C7.2 4 7 4 6.8 4h-5c-.3 0-.4 0-.5.2v.5L4 10 .4 16v.5c0 .2.2.3.4.3h5c.3 0 .4 0 .5-.2l4-6.6v-.5zM24 .2l-.5-.2H18s-.2 0-.3.3l-8 14v.4l5.2 9c0 .2 0 .3.3.3h5.4s.3 0 .4-.2c.2-.2.2-.4 0-.5l-5-8.8L24 .7V.2z"}"></path></svg>`
  })}`;
});
var share = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGySURBVHgB1VQtc8JAEL0EBjgETLEMrhZZbCWVVPY31KJqa2v7G5CNBFkLEotjEMDADAiOj0nSt5lcJkmTkFyK6Ju5yeWy2bd7780ydmNoLAd2u12jXC6/aJrWtG2bY03P57NRr9e3uQkoeaVS6VNi/zneBUg+JInOFFEqlXqU3LKsyXq9fjudTu/oZIzFqSsZp0yARG16Xi6XYavVElQxSA23i2ZuAroKetZqNSHP9vs9d8m5MsF8PufH47Erk+C+e6QHnUOTrks+lfGZREayB/z8HBbWDxALFOCJHCCIsx3O7vD5CeveDZ1hjSDslnPeg9BtSoz4Bc4GkTaNs124OtM0jWq1OmYpUZQbv+02m80XxHPuFGcdN2S0Wq2+yTEsA4q+6gK2w5ZaNtByhxyDqxgyBXguSms7ZQIkWdAzynYEsmaSPnEIiAwd+uFqXXfITrZYQ8RNWEr8smmU7egbunnFe0MSoaNP2v/pND0cDp1CodD1EYlr0zTzuKaE6OoRW0cfXdeny+VyELL1DHunw8yziKrGz55lhRDG/5qmEkm2Vp6mfiTZOnaaqpBcm6Y3xw/jhVbfAQ9SvAAAAABJRU5ErkJggg==";
var css$5 = {
  code: ".share-icon-container.svelte-897561.svelte-897561{position:relative;z-index:1;margin:auto}.share-icon.svelte-897561.svelte-897561{right:0px;position:absolute;z-index:3}.share-icon-container.svelte-897561:hover>.share-icons-box.svelte-897561{display:inline-block;padding:8px 16px;display:grid}.share-icons-box.svelte-897561.svelte-897561{position:absolute;z-index:2;width:auto;height:300px;display:none}",
  map: `{"version":3,"file":"share.svelte","sources":["share.svelte"],"sourcesContent":["<script>\\n  import {\\n    Email,\\n    Reddit,\\n    LinkedIn,\\n    Telegram,\\n    Facebook,\\n    Twitter,\\n  } from 'svelte-share-buttons-component'\\n  import share from '../../../assets/images/icons/share.png'\\n  const url = 'https://kelaltech.com/request-quote'\\n  const title = 'Kelal Tech PLC Official Website'\\n  const desc = \`Want to make a deal with us?Looking for some information? Or, just want to chat? We'd be very happy to hear from you.\`\\n</script>\\n\\n<div class=\\"share-icon-container\\">\\n  <img class=\\"share-icon\\" height={24} src={share} alt=\\"\\" />\\n\\n  <div class=\\"share-icons-box\\">\\n    <Email subject={title} body=\\"{desc} {url}\\" />\\n    <LinkedIn class=\\"share-button\\" {url} />\\n    <Facebook class=\\"share-button\\" {url} />\\n    <Twitter\\n      class=\\"share-button\\"\\n      text={title}\\n      {url}\\n      hashtags=\\"github,svelte\\"\\n      via=\\"username\\"\\n      related=\\"other,users\\"\\n    />\\n    <Telegram class=\\"share-button\\" text={title} {url} />\\n\\n    <Reddit class=\\"share-button\\" {title} {url} />\\n  </div>\\n</div>\\n\\n<style>\\n  .share-icon-container {\\n    position: relative;\\n    z-index: 1;\\n    margin: auto;\\n  }\\n\\n  .share-icon {\\n    right: 0px;\\n    position: absolute;\\n    z-index: 3;\\n  }\\n\\n  .share-icon-container:hover > .share-icons-box {\\n    display: inline-block;\\n    padding: 8px 16px;\\n    display: grid;\\n  }\\n\\n  .share-icons-box {\\n    position: absolute;\\n    z-index: 2;\\n    width: auto;\\n    height: 300px;\\n    display: none;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqCE,qBAAqB,4BAAC,CAAC,AACrB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,AACd,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,KAAK,CAAE,GAAG,CACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,mCAAqB,MAAM,CAAG,gBAAgB,cAAC,CAAC,AAC9C,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,AACf,CAAC"}`
};
var url = "https://kelaltech.com/request-quote";
var title = "Kelal Tech PLC Official Website";
var Share = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const desc = `Want to make a deal with us?Looking for some information? Or, just want to chat? We'd be very happy to hear from you.`;
  $$result.css.add(css$5);
  return `<div class="${"share-icon-container svelte-897561"}"><img class="${"share-icon svelte-897561"}"${add_attribute("height", 24, 0)}${add_attribute("src", share, 0)} alt="${""}">

  <div class="${"share-icons-box svelte-897561"}">${validate_component(Email, "Email").$$render($$result, {subject: title, body: desc + " " + url}, {}, {})}
    ${validate_component(LinkedIn, "LinkedIn").$$render($$result, {class: "share-button", url}, {}, {})}
    ${validate_component(Facebook, "Facebook").$$render($$result, {class: "share-button", url}, {}, {})}
    ${validate_component(Twitter, "Twitter").$$render($$result, {
    class: "share-button",
    text: title,
    url,
    hashtags: "github,svelte",
    via: "username",
    related: "other,users"
  }, {}, {})}
    ${validate_component(Telegram, "Telegram").$$render($$result, {class: "share-button", text: title, url}, {}, {})}

    ${validate_component(Reddit, "Reddit").$$render($$result, {class: "share-button", title, url}, {}, {})}</div>
</div>`;
});
var css$4 = {
  code: ".getting-started-header-box.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{display:flex;width:100%}.getting-started-header-box.svelte-wjvnfd>h1.svelte-wjvnfd.svelte-wjvnfd{flex:80%;text-align:center}.getting-started-header-box.svelte-wjvnfd>.share-btn.svelte-wjvnfd.svelte-wjvnfd{align-self:center}.get-start-box.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{position:relative;width:100%;height:auto}.clip-path-match-footer.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{position:absolute;bottom:0;z-index:-1;background:#fbfbfb;width:100%;height:200px}.getting-started-container.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{width:100%;height:1024px;clip-path:polygon(0 9%, 100% 0%, 100% 91%, 0% 100%);background:#0e1c2a;display:flex;justify-content:center;align-items:center;color:#fff}.getting-started-content.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{display:grid;grid-template-columns:1fr;gap:88px;justify-items:center;padding:32px}.getting-started-actions.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{display:grid;grid-template-columns:1fr;gap:64px;z-index:999}.action-item.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{border:2px solid #00b478;box-sizing:border-box;border-radius:14px;display:flex;flex-direction:row;justify-content:center;align-items:center;padding:18px;color:#fff}.action-item.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd:hover{text-decoration:none}.action-item.svelte-wjvnfd>img.svelte-wjvnfd.svelte-wjvnfd{margin-right:16px;height:24px;width:24px}.action-item.svelte-wjvnfd>div.svelte-wjvnfd>img.svelte-wjvnfd{margin-left:16px;height:18px}.action-item.svelte-wjvnfd>div.svelte-wjvnfd.svelte-wjvnfd{flex:1;display:flex;justify-content:space-between}@media only screen and (min-width: 640px){.action-item.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{padding:24px}.action-item.svelte-wjvnfd>img.svelte-wjvnfd.svelte-wjvnfd{margin-right:32px;height:48px;width:48px}.action-item.svelte-wjvnfd>div.svelte-wjvnfd>img.svelte-wjvnfd{margin-left:48px;height:24px;width:24px}}@media only screen and (min-width: 700px){.getting-started-actions.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{grid-template-columns:1fr 1fr}}@media only screen and (min-width: 1008px){.action-item.svelte-wjvnfd.svelte-wjvnfd.svelte-wjvnfd{padding:48px}}@media only screen and (min-width: 1295px){}",
  map: `{"version":3,"file":"getting-started.svelte","sources":["getting-started.svelte"],"sourcesContent":["<script lang=\\"ts\\">import globe from '../../assets/images/icons/globe.png';\\r\\nimport pointer from '../../assets/images/icons/mouse-pointer.png';\\r\\nimport lightBulb from '../../assets/images/icons/mdi-light_lightbulb.png';\\r\\nimport smartphone from '../../assets/images/icons/smartphone.png';\\r\\nimport arrow from '../../assets/images/icons/arrow-right.png';\\r\\nimport Share from '../_shared/share/share.svelte';\\r\\n</script>\\n\\n<div class=\\"get-start-box\\" id=\\"get_started_now\\">\\n  <div class=\\"getting-started-container\\">\\n    <div class=\\"getting-started-content\\">\\n      <div class={'getting-started-header-box'}>\\n        <h1>How Can we Help You?</h1>\\n        <div class=\\"share-btn\\">\\n          <Share />\\n        </div>\\n      </div>\\n\\n      <div class=\\"getting-started-actions\\">\\n        <!-- acction btn-1 -->\\n        <a\\n          href={\`/request-quote?from=home&value=I want a landing page, website or a blog\`}\\n          class=\\"action-item\\"\\n        >\\n          <img src={globe} alt=\\"\\" />\\n          <div>\\n            <span>I want a landing page, website or a blog</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </a>\\n\\n        <!-- acction btn-2 -->\\n        <a href={\`/request-quote?from=home&value=I want a custom web app\`} class=\\"action-item\\">\\n          <img src={pointer} alt=\\"\\" />\\n          <div>\\n            <span>I want a custom web app</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </a>\\n\\n        <!-- acction btn-3 -->\\n        <a href={\`/request-quote?from=home&value=I want a custom mobile app\`} class=\\"action-item\\">\\n          <img src={smartphone} alt=\\"\\" />\\n          <div>\\n            <span>I want a custom mobile app</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </a>\\n\\n        <!-- acction btn-4 -->\\n        <a\\n          href={\`/request-quote?from=home&value=I want something else. Let me explain\u2026\`}\\n          class=\\"action-item\\"\\n        >\\n          <img src={lightBulb} alt=\\"\\" />\\n          <div>\\n            <span>I want something else. Let me explain\u2026</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </a>\\n      </div>\\n    </div>\\n  </div>\\n\\n  <div class=\\"clip-path-match-footer\\" />\\n</div>\\n\\n<style>\\n  .getting-started-header-box {\\n    display: flex;\\n    width: 100%;\\n  }\\n  .getting-started-header-box > h1 {\\n    flex: 80%;\\n    text-align: center;\\n  }\\n  .getting-started-header-box > .share-btn {\\n    align-self: center;\\n  }\\n  .get-start-box {\\n    position: relative;\\n    width: 100%;\\n    height: auto;\\n  }\\n\\n  .clip-path-match-footer {\\n    position: absolute;\\n    bottom: 0;\\n    z-index: -1;\\n    background: #fbfbfb;\\n\\n    width: 100%;\\n    height: 200px;\\n  }\\n  .getting-started-container {\\n    width: 100%;\\n    height: 1024px;\\n    clip-path: polygon(0 9%, 100% 0%, 100% 91%, 0% 100%);\\n    background: #0e1c2a;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    color: #fff;\\n    /* padding: 32px; */\\n  }\\n\\n  .getting-started-content {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 88px;\\n    justify-items: center;\\n\\n    padding: 32px;\\n  }\\n\\n  .getting-started-actions {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 64px;\\n    z-index: 999;\\n  }\\n  .action-item {\\n    border: 2px solid #00b478;\\n    box-sizing: border-box;\\n    border-radius: 14px;\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: center;\\n    align-items: center;\\n    padding: 18px;\\n    color: #fff;\\n  }\\n\\n  .action-item:hover {\\n    text-decoration: none;\\n  }\\n\\n  .action-item > img {\\n    margin-right: 16px;\\n    height: 24px;\\n    width: 24px;\\n  }\\n\\n  .action-item > div > img {\\n    margin-left: 16px;\\n    height: 18px;\\n  }\\n\\n  .action-item > div {\\n    flex: 1;\\n    display: flex;\\n    justify-content: space-between;\\n  }\\n\\n  /* small screen */\\n  @media only screen and (min-width: 640px) {\\n    .action-item {\\n      padding: 24px;\\n    }\\n    .action-item > img {\\n      margin-right: 32px;\\n      height: 48px;\\n      width: 48px;\\n    }\\n\\n    .action-item > div > img {\\n      margin-left: 48px;\\n      height: 24px;\\n      width: 24px;\\n    }\\n  }\\n\\n  /* medium */\\n  @media only screen and (min-width: 700px) {\\n    .getting-started-actions {\\n      grid-template-columns: 1fr 1fr;\\n    }\\n  }\\n  /* large */\\n  @media only screen and (min-width: 1008px) {\\n    .action-item {\\n      padding: 48px;\\n    }\\n  }\\n  /* extra large */\\n  @media only screen and (min-width: 1295px) {\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoEE,2BAA2B,0CAAC,CAAC,AAC3B,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,AACb,CAAC,AACD,yCAA2B,CAAG,EAAE,4BAAC,CAAC,AAChC,IAAI,CAAE,GAAG,CACT,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,yCAA2B,CAAG,UAAU,4BAAC,CAAC,AACxC,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,cAAc,0CAAC,CAAC,AACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,uBAAuB,0CAAC,CAAC,AACvB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,OAAO,CAEnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,AACf,CAAC,AACD,0BAA0B,0CAAC,CAAC,AAC1B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,MAAM,CACd,SAAS,CAAE,QAAQ,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,IAAI,CAAC,CACpD,UAAU,CAAE,OAAO,CACnB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,AAEb,CAAC,AAED,wBAAwB,0CAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,MAAM,CAErB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,wBAAwB,0CAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,GAAG,AACd,CAAC,AACD,YAAY,0CAAC,CAAC,AACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,UAAU,CACtB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,AACb,CAAC,AAED,sDAAY,MAAM,AAAC,CAAC,AAClB,eAAe,CAAE,IAAI,AACvB,CAAC,AAED,0BAAY,CAAG,GAAG,4BAAC,CAAC,AAClB,YAAY,CAAE,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,0BAAY,CAAG,iBAAG,CAAG,GAAG,cAAC,CAAC,AACxB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,AACd,CAAC,AAED,0BAAY,CAAG,GAAG,4BAAC,CAAC,AAClB,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,YAAY,0CAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACD,0BAAY,CAAG,GAAG,4BAAC,CAAC,AAClB,YAAY,CAAE,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,0BAAY,CAAG,iBAAG,CAAG,GAAG,cAAC,CAAC,AACxB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AACH,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,wBAAwB,0CAAC,CAAC,AACxB,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAChC,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,YAAY,0CAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC5C,CAAC"}`
};
var Getting_started = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$4);
  return `<div class="${"get-start-box svelte-wjvnfd"}" id="${"get_started_now"}"><div class="${"getting-started-container svelte-wjvnfd"}"><div class="${"getting-started-content svelte-wjvnfd"}"><div class="${escape2(null_to_empty("getting-started-header-box")) + " svelte-wjvnfd"}"><h1 class="${"svelte-wjvnfd"}">How Can we Help You?</h1>
        <div class="${"share-btn svelte-wjvnfd"}">${validate_component(Share, "Share").$$render($$result, {}, {}, {})}</div></div>

      <div class="${"getting-started-actions svelte-wjvnfd"}">
        <a${add_attribute("href", `/request-quote?from=home&value=I want a landing page, website or a blog`, 0)} class="${"action-item svelte-wjvnfd"}"><img${add_attribute("src", globe, 0)} alt="${""}" class="${"svelte-wjvnfd"}">
          <div class="${"svelte-wjvnfd"}"><span>I want a landing page, website or a blog</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-wjvnfd"}"></div></a>

        
        <a${add_attribute("href", `/request-quote?from=home&value=I want a custom web app`, 0)} class="${"action-item svelte-wjvnfd"}"><img${add_attribute("src", pointer, 0)} alt="${""}" class="${"svelte-wjvnfd"}">
          <div class="${"svelte-wjvnfd"}"><span>I want a custom web app</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-wjvnfd"}"></div></a>

        
        <a${add_attribute("href", `/request-quote?from=home&value=I want a custom mobile app`, 0)} class="${"action-item svelte-wjvnfd"}"><img${add_attribute("src", smartphone, 0)} alt="${""}" class="${"svelte-wjvnfd"}">
          <div class="${"svelte-wjvnfd"}"><span>I want a custom mobile app</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-wjvnfd"}"></div></a>

        
        <a${add_attribute("href", `/request-quote?from=home&value=I want something else. Let me explain\u2026`, 0)} class="${"action-item svelte-wjvnfd"}"><img${add_attribute("src", lightBulb, 0)} alt="${""}" class="${"svelte-wjvnfd"}">
          <div class="${"svelte-wjvnfd"}"><span>I want something else. Let me explain\u2026</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-wjvnfd"}"></div></a></div></div></div>

  <div class="${"clip-path-match-footer svelte-wjvnfd"}"></div>
</div>`;
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}

${validate_component(Home_steps, "HomeSteps").$$render($$result, {}, {}, {})}
${validate_component(Clients, "Clients").$$render($$result, {}, {}, {})}

${validate_component(Getting_started, "GettingStarted").$$render($$result, {}, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css$3 = {
  code: ".main.svelte-6jbc8w{background-color:#00b478}.error.svelte-6jbc8w{background-color:#ff4b4b}.action-box.svelte-6jbc8w{width:100%;text-align:center}a.svelte-6jbc8w{padding:8px 16px;border-radius:4px;color:#0e2a1c}a.svelte-6jbc8w:hover{text-decoration:none}.confirmation-modal-box.svelte-6jbc8w{position:absolute;top:50%;left:50%;z-index:999;transform:translate(-50%, -50%);border-radius:4px;width:300px;height:auto;padding:32px;display:grid;grid-template-columns:1fr;gap:24px;justify-items:center}",
  map: `{"version":3,"file":"modal.svelte","sources":["modal.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let type = 'primary';\\r\\nexport let to = '/';\\r\\n</script>\\n\\n<div class={\`confirmation-modal-box \${type === 'primary' ? 'main' : 'error'}\`}>\\n  <slot />\\n\\n  <div class={\`action-box \`}>\\n    {#if type === 'primary'}\\n      <a href={to}> Done </a>\\n    {:else}\\n      <a href={to}> ok </a>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  .main {\\n    background-color: #00b478;\\n  }\\n\\n  .error {\\n    background-color: #ff4b4b;\\n  }\\n  .action-box {\\n    width: 100%;\\n    text-align: center;\\n  }\\n  a {\\n    /* border: 2px solid #0e2a1c; */\\n    padding: 8px 16px;\\n    border-radius: 4px;\\n    color: #0e2a1c;\\n  }\\n  a:hover {\\n    text-decoration: none;\\n  }\\n  .confirmation-modal-box {\\n    position: absolute;\\n    top: 50%;\\n    left: 50%;\\n    z-index: 999;\\n    transform: translate(-50%, -50%);\\n    border-radius: 4px;\\n    width: 300px;\\n    height: auto;\\n    padding: 32px;\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 24px;\\n    justify-items: center;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAiBE,KAAK,cAAC,CAAC,AACL,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,MAAM,cAAC,CAAC,AACN,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AACD,WAAW,cAAC,CAAC,AACX,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,CAAC,cAAC,CAAC,AAED,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,eAAC,MAAM,AAAC,CAAC,AACP,eAAe,CAAE,IAAI,AACvB,CAAC,AACD,uBAAuB,cAAC,CAAC,AACvB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,OAAO,CAAE,GAAG,CACZ,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,MAAM,AACvB,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {type = "primary"} = $$props;
  let {to = "/"} = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  $$result.css.add(css$3);
  return `<div class="${escape2(null_to_empty(`confirmation-modal-box ${type === "primary" ? "main" : "error"}`)) + " svelte-6jbc8w"}">${slots.default ? slots.default({}) : ``}

  <div class="${escape2(null_to_empty(`action-box `)) + " svelte-6jbc8w"}">${type === "primary" ? `<a${add_attribute("href", to, 0)} class="${"svelte-6jbc8w"}">Done </a>` : `<a${add_attribute("href", to, 0)} class="${"svelte-6jbc8w"}">ok </a>`}</div>
</div>`;
});
var css$2 = {
  code: ".lds-spinner.svelte-cht1wl.svelte-cht1wl{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);z-index:999;color:official;display:inline-block;position:relative;width:80px;height:80px}.lds-spinner.svelte-cht1wl div.svelte-cht1wl{transform-origin:40px 40px;animation:svelte-cht1wl-lds-spinner 1.2s linear infinite}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:after{content:' ';display:block;position:absolute;top:3px;left:37px;width:6px;height:18px;border-radius:20%;background:#fff}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(1){transform:rotate(0deg);animation-delay:-1.1s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(2){transform:rotate(30deg);animation-delay:-1s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(3){transform:rotate(60deg);animation-delay:-0.9s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(4){transform:rotate(90deg);animation-delay:-0.8s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(5){transform:rotate(120deg);animation-delay:-0.7s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(6){transform:rotate(150deg);animation-delay:-0.6s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(7){transform:rotate(180deg);animation-delay:-0.5s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(8){transform:rotate(210deg);animation-delay:-0.4s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(9){transform:rotate(240deg);animation-delay:-0.3s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(10){transform:rotate(270deg);animation-delay:-0.2s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(11){transform:rotate(300deg);animation-delay:-0.1s}.lds-spinner.svelte-cht1wl div.svelte-cht1wl:nth-child(12){transform:rotate(330deg);animation-delay:0s}@keyframes svelte-cht1wl-lds-spinner{0%{opacity:1}100%{opacity:0}}",
  map: `{"version":3,"file":"loading.svelte","sources":["loading.svelte"],"sourcesContent":["<div class=\\"lds-spinner\\">\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n  <div />\\n</div>\\n\\n<style>\\n  .lds-spinner {\\n    position: absolute;\\n    left: 50%;\\n    top: 50%;\\n    transform: translate(-50%, -50%);\\n    z-index: 999;\\n    color: official;\\n    display: inline-block;\\n    position: relative;\\n    width: 80px;\\n    height: 80px;\\n  }\\n  .lds-spinner div {\\n    transform-origin: 40px 40px;\\n    animation: lds-spinner 1.2s linear infinite;\\n  }\\n  .lds-spinner div:after {\\n    content: ' ';\\n    display: block;\\n    position: absolute;\\n    top: 3px;\\n    left: 37px;\\n    width: 6px;\\n    height: 18px;\\n    border-radius: 20%;\\n    background: #fff;\\n  }\\n  .lds-spinner div:nth-child(1) {\\n    transform: rotate(0deg);\\n    animation-delay: -1.1s;\\n  }\\n  .lds-spinner div:nth-child(2) {\\n    transform: rotate(30deg);\\n    animation-delay: -1s;\\n  }\\n  .lds-spinner div:nth-child(3) {\\n    transform: rotate(60deg);\\n    animation-delay: -0.9s;\\n  }\\n  .lds-spinner div:nth-child(4) {\\n    transform: rotate(90deg);\\n    animation-delay: -0.8s;\\n  }\\n  .lds-spinner div:nth-child(5) {\\n    transform: rotate(120deg);\\n    animation-delay: -0.7s;\\n  }\\n  .lds-spinner div:nth-child(6) {\\n    transform: rotate(150deg);\\n    animation-delay: -0.6s;\\n  }\\n  .lds-spinner div:nth-child(7) {\\n    transform: rotate(180deg);\\n    animation-delay: -0.5s;\\n  }\\n  .lds-spinner div:nth-child(8) {\\n    transform: rotate(210deg);\\n    animation-delay: -0.4s;\\n  }\\n  .lds-spinner div:nth-child(9) {\\n    transform: rotate(240deg);\\n    animation-delay: -0.3s;\\n  }\\n  .lds-spinner div:nth-child(10) {\\n    transform: rotate(270deg);\\n    animation-delay: -0.2s;\\n  }\\n  .lds-spinner div:nth-child(11) {\\n    transform: rotate(300deg);\\n    animation-delay: -0.1s;\\n  }\\n  .lds-spinner div:nth-child(12) {\\n    transform: rotate(330deg);\\n    animation-delay: 0s;\\n  }\\n  @keyframes lds-spinner {\\n    0% {\\n      opacity: 1;\\n    }\\n    100% {\\n      opacity: 0;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAgBE,YAAY,4BAAC,CAAC,AACZ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,QAAQ,CACf,OAAO,CAAE,YAAY,CACrB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AACD,0BAAY,CAAC,GAAG,cAAC,CAAC,AAChB,gBAAgB,CAAE,IAAI,CAAC,IAAI,CAC3B,SAAS,CAAE,yBAAW,CAAC,IAAI,CAAC,MAAM,CAAC,QAAQ,AAC7C,CAAC,AACD,0BAAY,CAAC,iBAAG,MAAM,AAAC,CAAC,AACtB,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,IAAI,CACV,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,IAAI,CAAC,CACvB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,eAAe,CAAE,GAAG,AACtB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,KAAK,CAAC,CACxB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,CAAC,CAAC,AAAC,CAAC,AAC7B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,EAAE,CAAC,AAAC,CAAC,AAC9B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,EAAE,CAAC,AAAC,CAAC,AAC9B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,KAAK,AACxB,CAAC,AACD,0BAAY,CAAC,iBAAG,WAAW,EAAE,CAAC,AAAC,CAAC,AAC9B,SAAS,CAAE,OAAO,MAAM,CAAC,CACzB,eAAe,CAAE,EAAE,AACrB,CAAC,AACD,WAAW,yBAAY,CAAC,AACtB,EAAE,AAAC,CAAC,AACF,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,IAAI,AAAC,CAAC,AACJ,OAAO,CAAE,CAAC,AACZ,CAAC,AACH,CAAC"}`
};
create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="${"lds-spinner svelte-cht1wl"}"><div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
  <div class="${"svelte-cht1wl"}"></div>
</div>`;
});
var css$1 = {
  code: ".loading-container.svelte-1735cls.svelte-1735cls{position:absolute;z-index:9999}.m0.svelte-1735cls.svelte-1735cls{margin:0}.input-error.svelte-1735cls.svelte-1735cls{color:rgb(255, 32, 32)}.quote-form-container.svelte-1735cls.svelte-1735cls{width:100%;display:grid;grid-template-columns:1fr;gap:64px;justify-items:center;padding:0 32px}.input-container.svelte-1735cls.svelte-1735cls{width:100%;display:flex;flex-direction:column;align-items:flex-start;padding:0px}.input-container.svelte-1735cls .label.svelte-1735cls{opacity:0.7}.input-container.svelte-1735cls .input.svelte-1735cls{width:100%;filter:drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));background-color:transparent;border:none;border-bottom:1px solid #00b478;height:40px}.input-container.svelte-1735cls .input.svelte-1735cls:focus{outline:none}.input-container.svelte-1735cls .input.svelte-1735cls::placeholder{color:#046d4ab6}.text-area.svelte-1735cls.svelte-1735cls{height:120px !important}.form-action-container.svelte-1735cls.svelte-1735cls{width:100%;display:flex;justify-content:space-between}.form-action-container.svelte-1735cls button.svelte-1735cls{border-radius:14px;border:2px solid #ffffff;background:transparent;color:#fff;padding:16px 32px}.form-action-container.svelte-1735cls .back.svelte-1735cls{border:none;text-align:left;padding-left:0}@media only screen and (min-width: 1295px){.quote-form-container.svelte-1735cls.svelte-1735cls{padding:0 128px}}",
  map: `{"version":3,"file":"quote-form.svelte","sources":["quote-form.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let title;\\r\\nlet submit = null;\\r\\nlet contact = '';\\r\\nlet description = '';\\r\\nlet errors = { contact: '', description: '' };\\r\\nimport { createEventDispatcher } from 'svelte';\\r\\nimport Modal from '../_shared/confirmation-modal/modal.svelte';\\r\\nimport Loading from '../_shared/loading/loading.svelte';\\r\\nconst dispatch = createEventDispatcher();\\r\\nfunction handleBack() {\\r\\n    dispatch('back');\\r\\n}\\r\\nfunction handleForm() {\\r\\n    let regex = /^(?:\\\\d{10}|\\\\w+@\\\\w+\\\\.\\\\w{2,3})$/;\\r\\n    if (!contact.match(regex)) {\\r\\n        errors.contact = 'Invalid input, Enter a valid phone or email address';\\r\\n        return;\\r\\n    }\\r\\n    if (description === '') {\\r\\n        errors.description = 'description is required';\\r\\n        return;\\r\\n    }\\r\\n    submit = fetch('/api/message', {\\r\\n        method: 'POST',\\r\\n        body: JSON.stringify({ from: contact, text: description, subject: title }),\\r\\n        headers: { 'content-type': 'application/json' },\\r\\n    })\\r\\n        .then((resp) => {\\r\\n        contact = '';\\r\\n        description = '';\\r\\n        console.log(resp.json());\\r\\n    })\\r\\n        .catch((e) => {\\r\\n        console.log(e);\\r\\n        submit = null;\\r\\n    });\\r\\n}\\r\\n</script>\\n\\n{#if submit}\\n  {#await submit}\\n    <div class={'loading-container'}>\\n      <Loading />\\n    </div>\\n  {:then resp}\\n    <Modal>\\n      <p class={'medium-300 m0'}>\u{1F389} You're all set!</p>\\n      <pre class={'medium-300 m0'}>We will get back to you soon!</pre>\\n    </Modal>\\n  {:catch error}\\n    <Modal type={'error'}>\\n      <p class={'medium-300 m0'}>Error!</p>\\n      <pre class={'medium-300 m0'}>{error.message}</pre>\\n    </Modal>\\n  {/await}\\n{/if}\\n<form on:submit|preventDefault={handleForm} method=\\"POST\\" class={'quote-form-container'}>\\n  <h1 class={'h1-700'}>Tell us more...</h1>\\n\\n  <div class={'input-container'}>\\n    <label class={'small-500 label'} for=\\"emailorphone\\"> Your email or phone:</label>\\n    <input\\n      on:change={() => (errors.contact = '')}\\n      placeholder=\\"type your text here\\"\\n      type=\\"text\\"\\n      class=\\"primary default-400 input\\"\\n      id={'emailorphone'}\\n      name=\\"contact\\"\\n      bind:value={contact}\\n    />\\n    <p class={'input-error very-small-400'}>{errors.contact}</p>\\n  </div>\\n\\n  <div class={'input-container'}>\\n    <label class={'small-500 label'} for=\\"description\\">\\n      Tell us about yourself and the project:</label\\n    >\\n    <textarea\\n      on:change={() => (errors.description = '')}\\n      placeholder=\\"type your text here\\"\\n      class=\\"primary default-400 input text-area\\"\\n      id={'description'}\\n      name={'description'}\\n      bind:value={description}\\n    />\\n\\n    <p class={'input-error very-small-400'}>{errors.description}</p>\\n  </div>\\n\\n  <div class={'form-action-container'}>\\n    <button on:click={handleBack} class={'back default-500'}> Back </button>\\n    <button type={'submit'} class={'default-500'}> Submit </button>\\n  </div>\\n</form>\\n\\n<style>\\n  .loading-container {\\n    position: absolute;\\n    z-index: 9999;\\n  }\\n  .m0 {\\n    margin: 0;\\n  }\\n  .input-error {\\n    color: rgb(255, 32, 32);\\n  }\\n  .quote-form-container {\\n    width: 100%;\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 64px;\\n    justify-items: center;\\n\\n    padding: 0 32px;\\n  }\\n\\n  .input-container {\\n    width: 100%;\\n    display: flex;\\n    flex-direction: column;\\n    align-items: flex-start;\\n    padding: 0px;\\n  }\\n\\n  .input-container .label {\\n    opacity: 0.7;\\n  }\\n  .input-container .input {\\n    width: 100%;\\n    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1));\\n    background-color: transparent;\\n    border: none;\\n    border-bottom: 1px solid #00b478;\\n    height: 40px;\\n  }\\n\\n  .input-container .input:focus {\\n    outline: none;\\n  }\\n\\n  .input-container .input::placeholder {\\n    color: #046d4ab6;\\n  }\\n\\n  .text-area {\\n    height: 120px !important;\\n  }\\n\\n  .form-action-container {\\n    width: 100%;\\n    display: flex;\\n    justify-content: space-between;\\n  }\\n\\n  .form-action-container button {\\n    border-radius: 14px;\\n    border: 2px solid #ffffff;\\n    background: transparent;\\n    color: #fff;\\n    padding: 16px 32px;\\n  }\\n\\n  .form-action-container .back {\\n    border: none;\\n    text-align: left;\\n    padding-left: 0;\\n  }\\n\\n  /* extra large */\\n  @media only screen and (min-width: 1295px) {\\n    .quote-form-container {\\n      padding: 0 128px;\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAgGE,kBAAkB,8BAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,GAAG,8BAAC,CAAC,AACH,MAAM,CAAE,CAAC,AACX,CAAC,AACD,YAAY,8BAAC,CAAC,AACZ,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,AACzB,CAAC,AACD,qBAAqB,8BAAC,CAAC,AACrB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,MAAM,CAErB,OAAO,CAAE,CAAC,CAAC,IAAI,AACjB,CAAC,AAED,gBAAgB,8BAAC,CAAC,AAChB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,UAAU,CACvB,OAAO,CAAE,GAAG,AACd,CAAC,AAED,+BAAgB,CAAC,MAAM,eAAC,CAAC,AACvB,OAAO,CAAE,GAAG,AACd,CAAC,AACD,+BAAgB,CAAC,MAAM,eAAC,CAAC,AACvB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACnD,gBAAgB,CAAE,WAAW,CAC7B,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,MAAM,CAAE,IAAI,AACd,CAAC,AAED,+BAAgB,CAAC,qBAAM,MAAM,AAAC,CAAC,AAC7B,OAAO,CAAE,IAAI,AACf,CAAC,AAED,+BAAgB,CAAC,qBAAM,aAAa,AAAC,CAAC,AACpC,KAAK,CAAE,SAAS,AAClB,CAAC,AAED,UAAU,8BAAC,CAAC,AACV,MAAM,CAAE,KAAK,CAAC,UAAU,AAC1B,CAAC,AAED,sBAAsB,8BAAC,CAAC,AACtB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AAED,qCAAsB,CAAC,MAAM,eAAC,CAAC,AAC7B,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,WAAW,CACvB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CAAC,IAAI,AACpB,CAAC,AAED,qCAAsB,CAAC,KAAK,eAAC,CAAC,AAC5B,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,CAAC,AACjB,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,qBAAqB,8BAAC,CAAC,AACrB,OAAO,CAAE,CAAC,CAAC,KAAK,AAClB,CAAC,AACH,CAAC"}`
};
var Quote_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {title: title2} = $$props;
  let contact = "";
  let errors = {contact: "", description: ""};
  createEventDispatcher();
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0)
    $$bindings.title(title2);
  $$result.css.add(css$1);
  return `${``}
<form method="${"POST"}" class="${escape2(null_to_empty("quote-form-container")) + " svelte-1735cls"}"><h1${add_attribute("class", "h1-700", 0)}>Tell us more...</h1>

  <div class="${escape2(null_to_empty("input-container")) + " svelte-1735cls"}"><label class="${escape2(null_to_empty("small-500 label")) + " svelte-1735cls"}" for="${"emailorphone"}">Your email or phone:</label>
    <input placeholder="${"type your text here"}" type="${"text"}" class="${"primary default-400 input svelte-1735cls"}"${add_attribute("id", "emailorphone", 0)} name="${"contact"}"${add_attribute("value", contact, 1)}>
    <p class="${escape2(null_to_empty("input-error very-small-400")) + " svelte-1735cls"}">${escape2(errors.contact)}</p></div>

  <div class="${escape2(null_to_empty("input-container")) + " svelte-1735cls"}"><label class="${escape2(null_to_empty("small-500 label")) + " svelte-1735cls"}" for="${"description"}">Tell us about yourself and the project:</label>
    <textarea placeholder="${"type your text here"}" class="${"primary default-400 input text-area svelte-1735cls"}"${add_attribute("id", "description", 0)}${add_attribute("name", "description", 0)}>${""}</textarea>

    <p class="${escape2(null_to_empty("input-error very-small-400")) + " svelte-1735cls"}">${escape2(errors.description)}</p></div>

  <div class="${escape2(null_to_empty("form-action-container")) + " svelte-1735cls"}"><button class="${escape2(null_to_empty("back default-500")) + " svelte-1735cls"}">Back </button>
    <button${add_attribute("type", "submit", 0)} class="${escape2(null_to_empty("default-500")) + " svelte-1735cls"}">Submit </button></div>
</form>`;
});
var css = {
  code: ".getting-started-header-box.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{display:flex;width:100%}.getting-started-header-box.svelte-1xa18zw>h1.svelte-1xa18zw.svelte-1xa18zw{flex:80%;text-align:center}.getting-started-header-box.svelte-1xa18zw>.share-btn.svelte-1xa18zw.svelte-1xa18zw{align-self:center}.getting-started-container.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{width:100%;height:auto;clip-path:polygon(0 0, 100% 0%, 100% 100%, 0% 100%);background:#0e1c2a;display:flex;justify-content:center;align-items:center;color:#fff}.getting-started-content.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{display:grid;grid-template-columns:1fr;gap:88px;justify-items:center;padding:32px}.getting-started-actions.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{display:grid;grid-template-columns:1fr;gap:64px;z-index:999}.action-item.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{border:2px solid #00b478;box-sizing:border-box;border-radius:14px;display:flex;flex-direction:row;justify-content:center;align-items:center;padding:18px}.action-item.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw:hover{cursor:pointer}.action-item.svelte-1xa18zw>img.svelte-1xa18zw.svelte-1xa18zw{margin-right:16px;height:24px;width:24px}.action-item.svelte-1xa18zw>div.svelte-1xa18zw>img.svelte-1xa18zw{margin-left:16px;height:18px}.action-item.svelte-1xa18zw>div.svelte-1xa18zw.svelte-1xa18zw{flex:1;display:flex;justify-content:space-between}@media only screen and (min-width: 640px){.getting-started-container.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{height:calc(100vh - 112px)}.action-item.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{padding:24px}.action-item.svelte-1xa18zw>img.svelte-1xa18zw.svelte-1xa18zw{margin-right:32px;height:48px;width:48px}.action-item.svelte-1xa18zw>div.svelte-1xa18zw>img.svelte-1xa18zw{margin-left:48px;height:24px;width:24px}}@media only screen and (min-width: 700px){.getting-started-actions.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{grid-template-columns:1fr 1fr}}@media only screen and (min-width: 1008px){.action-item.svelte-1xa18zw.svelte-1xa18zw.svelte-1xa18zw{padding:48px}}@media only screen and (min-width: 1295px){}",
  map: `{"version":3,"file":"request-quote.svelte","sources":["request-quote.svelte"],"sourcesContent":["<script context=\\"module\\">\\n  export const hydrate = true;\\n</script>\\n<script lang=\\"ts\\" >var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\\r\\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\\r\\n    return new (P || (P = Promise))(function (resolve, reject) {\\r\\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\\r\\n        function rejected(value) { try { step(generator[\\"throw\\"](value)); } catch (e) { reject(e); } }\\r\\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\\r\\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\\r\\n    });\\r\\n};\\r\\nimport { onMount } from 'svelte';\\r\\nimport arrow from '../assets/images/icons/arrow-right.png';\\r\\nimport globe from '../assets/images/icons/globe.png';\\r\\nimport lightBulb from '../assets/images/icons/mdi-light_lightbulb.png';\\r\\nimport pointer from '../assets/images/icons/mouse-pointer.png';\\r\\nimport smartphone from '../assets/images/icons/smartphone.png';\\r\\nimport Form from '../components/quote-form/quote-form.svelte';\\r\\nimport Share from '../components/_shared/share/share.svelte';\\r\\nlet selectedButtonText = '';\\r\\nlet openForm = false;\\r\\nfunction handleClick(text) {\\r\\n    selectedButtonText = text;\\r\\n    openForm = true;\\r\\n}\\r\\nfunction handleOpenForm() {\\r\\n    openForm = false;\\r\\n}\\r\\nfunction handleKeyboardClick(event, text) {\\r\\n    // Keypresses other then Enter and Space should not trigger a command\\r\\n    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {\\r\\n        return;\\r\\n    }\\r\\n    selectedButtonText = text;\\r\\n    openForm = true;\\r\\n}\\r\\nonMount(() => __awaiter(void 0, void 0, void 0, function* () {\\r\\n    const params = yield new URLSearchParams(window.location.search);\\r\\n    if (params.has('from')) {\\r\\n        openForm = true;\\r\\n        selectedButtonText = params.get('value');\\r\\n    }\\r\\n}));\\r\\n</script>\\n\\n<div class=\\"getting-started-container\\">\\n  {#if !openForm}\\n    <div class=\\"getting-started-content\\">\\n      <div class={'getting-started-header-box'}>\\n        <h1>How Can we Help You?</h1>\\n        <div class=\\"share-btn\\">\\n          <Share />\\n        </div>\\n      </div>\\n\\n      <div class=\\"getting-started-actions\\">\\n        <!-- acction btn-1 -->\\n        <div\\n          role={'button'}\\n          tabindex=\\"0\\"\\n          on:keydown={(e) => handleKeyboardClick(e, 'I want a landing page, website or a blog')}\\n          on:click={() => handleClick('I want a landing page, website or a blog')}\\n          class=\\"action-item\\"\\n        >\\n          <img src={globe} alt=\\"\\" />\\n          <div>\\n            <span>I want a landing page, website or a blog</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </div>\\n\\n        <!-- acction btn-2 -->\\n        <div\\n          role={'button'}\\n          tabindex=\\"0\\"\\n          on:keydown={(e) => handleKeyboardClick(e, 'I want a custom web app')}\\n          on:click={() => handleClick('I want a custom web app')}\\n          class=\\"action-item\\"\\n        >\\n          <img src={pointer} alt=\\"\\" />\\n          <div>\\n            <span>I want a custom web app</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </div>\\n\\n        <!-- acction btn-3 -->\\n        <div\\n          role={'button'}\\n          tabindex=\\"0\\"\\n          on:keydown={(e) => handleKeyboardClick(e, 'I want a custom mobile app')}\\n          on:click={() => handleClick('I want a custom mobile app')}\\n          class=\\"action-item\\"\\n        >\\n          <img src={smartphone} alt=\\"\\" />\\n          <div>\\n            <span>I want a custom mobile app</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </div>\\n\\n        <!-- acction btn-4 -->\\n        <div\\n          role={'button'}\\n          tabindex=\\"0\\"\\n          on:keydown={(e) => handleKeyboardClick(e, 'I want something else. Let me explain\u2026')}\\n          on:click={() => handleClick('I want something else. Let me explain\u2026')}\\n          class=\\"action-item\\"\\n        >\\n          <img src={lightBulb} alt=\\"\\" />\\n          <div>\\n            <span>I want something else. Let me explain\u2026</span>\\n            <img height={24} src={arrow} alt=\\"\\" />\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n  {:else}\\n    <Form on:back={handleOpenForm} title={selectedButtonText || ''} />\\n  {/if}\\n</div>\\n\\n<style>\\n  .getting-started-header-box {\\n    display: flex;\\n    width: 100%;\\n  }\\n  .getting-started-header-box > h1 {\\n    flex: 80%;\\n    text-align: center;\\n  }\\n  .getting-started-header-box > .share-btn {\\n    align-self: center;\\n  }\\n  .getting-started-container {\\n    width: 100%;\\n    height: auto;\\n    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);\\n    background: #0e1c2a;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    color: #fff;\\n  }\\n  .getting-started-content {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 88px;\\n    justify-items: center;\\n\\n    padding: 32px;\\n  }\\n\\n  .getting-started-content > h1 {\\n    text-align: center;\\n  }\\n\\n  .getting-started-actions {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    gap: 64px;\\n    z-index: 999;\\n  }\\n  .action-item {\\n    border: 2px solid #00b478;\\n    box-sizing: border-box;\\n    border-radius: 14px;\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: center;\\n    align-items: center;\\n\\n    padding: 18px;\\n  }\\n\\n  .action-item:hover {\\n    cursor: pointer;\\n  }\\n\\n  .action-item > img {\\n    margin-right: 16px;\\n    height: 24px;\\n    width: 24px;\\n  }\\n\\n  .action-item > div > img {\\n    margin-left: 16px;\\n    height: 18px;\\n  }\\n\\n  .action-item > div {\\n    flex: 1;\\n    display: flex;\\n    justify-content: space-between;\\n  }\\n\\n  /* small screen */\\n  @media only screen and (min-width: 640px) {\\n    .getting-started-container {\\n      height: calc(100vh - 112px);\\n    }\\n    .action-item {\\n      padding: 24px;\\n    }\\n    .action-item > img {\\n      margin-right: 32px;\\n      height: 48px;\\n      width: 48px;\\n    }\\n\\n    .action-item > div > img {\\n      margin-left: 48px;\\n      height: 24px;\\n      width: 24px;\\n    }\\n  }\\n\\n  /* medium */\\n  @media only screen and (min-width: 700px) {\\n    .getting-started-actions {\\n      grid-template-columns: 1fr 1fr;\\n    }\\n  }\\n  /* large */\\n  @media only screen and (min-width: 1008px) {\\n    .action-item {\\n      padding: 48px;\\n    }\\n  }\\n  /* extra large */\\n  @media only screen and (min-width: 1295px) {\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4HE,2BAA2B,6CAAC,CAAC,AAC3B,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,AACb,CAAC,AACD,0CAA2B,CAAG,EAAE,8BAAC,CAAC,AAChC,IAAI,CAAE,GAAG,CACT,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,0CAA2B,CAAG,UAAU,8BAAC,CAAC,AACxC,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,0BAA0B,6CAAC,CAAC,AAC1B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,EAAE,CAAC,IAAI,CAAC,CACpD,UAAU,CAAE,OAAO,CACnB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,AACb,CAAC,AACD,wBAAwB,6CAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,MAAM,CAErB,OAAO,CAAE,IAAI,AACf,CAAC,AAMD,wBAAwB,6CAAC,CAAC,AACxB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,GAAG,AACd,CAAC,AACD,YAAY,6CAAC,CAAC,AACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,UAAU,CAAE,UAAU,CACtB,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CAEnB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,yDAAY,MAAM,AAAC,CAAC,AAClB,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,2BAAY,CAAG,GAAG,8BAAC,CAAC,AAClB,YAAY,CAAE,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,2BAAY,CAAG,kBAAG,CAAG,GAAG,eAAC,CAAC,AACxB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,AACd,CAAC,AAED,2BAAY,CAAG,GAAG,8BAAC,CAAC,AAClB,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,0BAA0B,6CAAC,CAAC,AAC1B,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,AAC7B,CAAC,AACD,YAAY,6CAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACD,2BAAY,CAAG,GAAG,8BAAC,CAAC,AAClB,YAAY,CAAE,IAAI,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AAED,2BAAY,CAAG,kBAAG,CAAG,GAAG,eAAC,CAAC,AACxB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AACH,CAAC,AAGD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,wBAAwB,6CAAC,CAAC,AACxB,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAChC,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC1C,YAAY,6CAAC,CAAC,AACZ,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,MAAM,CAAC,AAAC,CAAC,AAC5C,CAAC"}`
};
var hydrate = true;
var Request_quote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  let selectedButtonText = "";
  let openForm = false;
  onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    const params = yield new URLSearchParams(window.location.search);
    if (params.has("from")) {
      openForm = true;
      selectedButtonText = params.get("value");
    }
  }));
  $$result.css.add(css);
  return `<div class="${"getting-started-container svelte-1xa18zw"}">${!openForm ? `<div class="${"getting-started-content svelte-1xa18zw"}"><div class="${escape2(null_to_empty("getting-started-header-box")) + " svelte-1xa18zw"}"><h1 class="${"svelte-1xa18zw"}">How Can we Help You?</h1>
        <div class="${"share-btn svelte-1xa18zw"}">${validate_component(Share, "Share").$$render($$result, {}, {}, {})}</div></div>

      <div class="${"getting-started-actions svelte-1xa18zw"}">
        <div${add_attribute("role", "button", 0)} tabindex="${"0"}" class="${"action-item svelte-1xa18zw"}"><img${add_attribute("src", globe, 0)} alt="${""}" class="${"svelte-1xa18zw"}">
          <div class="${"svelte-1xa18zw"}"><span>I want a landing page, website or a blog</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-1xa18zw"}"></div></div>

        
        <div${add_attribute("role", "button", 0)} tabindex="${"0"}" class="${"action-item svelte-1xa18zw"}"><img${add_attribute("src", pointer, 0)} alt="${""}" class="${"svelte-1xa18zw"}">
          <div class="${"svelte-1xa18zw"}"><span>I want a custom web app</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-1xa18zw"}"></div></div>

        
        <div${add_attribute("role", "button", 0)} tabindex="${"0"}" class="${"action-item svelte-1xa18zw"}"><img${add_attribute("src", smartphone, 0)} alt="${""}" class="${"svelte-1xa18zw"}">
          <div class="${"svelte-1xa18zw"}"><span>I want a custom mobile app</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-1xa18zw"}"></div></div>

        
        <div${add_attribute("role", "button", 0)} tabindex="${"0"}" class="${"action-item svelte-1xa18zw"}"><img${add_attribute("src", lightBulb, 0)} alt="${""}" class="${"svelte-1xa18zw"}">
          <div class="${"svelte-1xa18zw"}"><span>I want something else. Let me explain\u2026</span>
            <img${add_attribute("height", 24, 0)}${add_attribute("src", arrow, 0)} alt="${""}" class="${"svelte-1xa18zw"}"></div></div></div></div>` : `${validate_component(Quote_form, "Form").$$render($$result, {title: selectedButtonText || ""}, {}, {})}`}
</div>`;
});
var requestQuote = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Request_quote,
  hydrate
});

// .svelte-kit/vercel/entry.js
var entry_default = async (req, res) => {
  const {pathname, searchParams} = new URL(req.url || "", "http://localhost");
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: await getRawBody(req)
  });
  if (rendered) {
    const {status, headers, body} = rendered;
    return res.writeHead(status, headers).end(body);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
