import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { createHash } from 'node:crypto';
import { Sequelize, DataTypes } from 'sequelize';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import require$$1 from 'crypto';
import nodemailer from 'nodemailer';
import { convert } from 'html-to-text';
import fs from 'fs';
import path, { dirname as dirname$2, join as join$1 } from 'path';
import { fileURLToPath } from 'url';
import { appendFile } from 'node:fs/promises';
import { fileURLToPath as fileURLToPath$1 } from 'node:url';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import fs$1 from 'fs/promises';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$2(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$2(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$2(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse$2(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode$1;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode$1(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode$1(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode$1(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize$2(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function parseSetCookie(setCookieValue, options) {
  const parts = (setCookieValue || "").split(";").filter((str) => typeof str === "string" && !!str.trim());
  const nameValuePairStr = parts.shift() || "";
  const parsed = _parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;
  try {
    value = options?.decode === false ? value : (options?.decode || decodeURIComponent)(value);
  } catch {
  }
  const cookie = {
    name,
    value
  };
  for (const part of parts) {
    const sides = part.split("=");
    const partKey = (sides.shift() || "").trimStart().toLowerCase();
    const partValue = sides.join("=");
    switch (partKey) {
      case "expires": {
        cookie.expires = new Date(partValue);
        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(partValue, 10);
        break;
      }
      case "secure": {
        cookie.secure = true;
        break;
      }
      case "httponly": {
        cookie.httpOnly = true;
        break;
      }
      case "samesite": {
        cookie.sameSite = partValue;
        break;
      }
      default: {
        cookie[partKey] = partValue;
      }
    }
  }
  return cookie;
}
function _parseNameValuePair(nameValuePairStr) {
  let name = "";
  let value = "";
  const nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=g(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function g(...n){return function(...e){for(const t of n)t(...e);}}const m=_();class A extends m{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function S(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const C=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(C.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function O(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:S(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function parse$1(multipartBodyBuffer, boundary) {
  let lastline = "";
  let state = 0 /* INIT */;
  let buffer = [];
  const allParts = [];
  let currentPartHeaders = [];
  for (let i = 0; i < multipartBodyBuffer.length; i++) {
    const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
    const currByte = multipartBodyBuffer[i];
    const newLineChar = currByte === 10 || currByte === 13;
    if (!newLineChar) {
      lastline += String.fromCodePoint(currByte);
    }
    const newLineDetected = currByte === 10 && prevByte === 13;
    if (0 /* INIT */ === state && newLineDetected) {
      if ("--" + boundary === lastline) {
        state = 1 /* READING_HEADERS */;
      }
      lastline = "";
    } else if (1 /* READING_HEADERS */ === state && newLineDetected) {
      if (lastline.length > 0) {
        const i2 = lastline.indexOf(":");
        if (i2 > 0) {
          const name = lastline.slice(0, i2).toLowerCase();
          const value = lastline.slice(i2 + 1).trim();
          currentPartHeaders.push([name, value]);
        }
      } else {
        state = 2 /* READING_DATA */;
        buffer = [];
      }
      lastline = "";
    } else if (2 /* READING_DATA */ === state) {
      if (lastline.length > boundary.length + 4) {
        lastline = "";
      }
      if ("--" + boundary === lastline) {
        const j = buffer.length - lastline.length;
        const part = buffer.slice(0, j - 1);
        allParts.push(process$1(part, currentPartHeaders));
        buffer = [];
        currentPartHeaders = [];
        lastline = "";
        state = 3 /* READING_PART_SEPARATOR */;
      } else {
        buffer.push(currByte);
      }
      if (newLineDetected) {
        lastline = "";
      }
    } else if (3 /* READING_PART_SEPARATOR */ === state && newLineDetected) {
      state = 1 /* READING_HEADERS */;
    }
  }
  return allParts;
}
function process$1(data, headers) {
  const dataObj = {};
  const contentDispositionHeader = headers.find((h) => h[0] === "content-disposition")?.[1] || "";
  for (const i of contentDispositionHeader.split(";")) {
    const s = i.split("=");
    if (s.length !== 2) {
      continue;
    }
    const key = (s[0] || "").trim();
    if (key === "name" || key === "filename") {
      const _value = (s[1] || "").trim().replace(/"/g, "");
      dataObj[key] = Buffer.from(_value, "latin1").toString("utf8");
    }
  }
  const contentType = headers.find((h) => h[0] === "content-type")?.[1] || "";
  if (contentType) {
    dataObj.type = contentType;
  }
  dataObj.data = Buffer.from(data);
  return dataObj;
}

async function validateData(data, fn) {
  try {
    const res = await fn(data);
    if (res === false) {
      throw createValidationError();
    }
    if (res === true) {
      return data;
    }
    return res ?? data;
  } catch (error) {
    throw createValidationError(error);
  }
}
function createValidationError(validateError) {
  throw createError$1({
    status: 400,
    statusMessage: "Validation Error",
    message: validateError?.message || "Validation Error",
    data: validateError
  });
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
const getHeader = getRequestHeader;
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readValidatedBody(event, validate) {
  const _body = await readBody(event, { strict: true });
  return validateData(_body, validate);
}
async function readMultipartFormData(event) {
  const contentType = getRequestHeader(event, "content-type");
  if (!contentType || !contentType.startsWith("multipart/form-data")) {
    return;
  }
  const boundary = contentType.match(/boundary=([^;]*)(;|$)/i)?.[1];
  if (!boundary) {
    return;
  }
  const body = await readRawBody(event, false);
  if (!body) {
    return;
  }
  return parse$1(body, boundary);
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function getDistinctCookieKey(name, opts) {
  return [name, opts.domain || "", opts.path || "/"].join(";");
}

function parseCookies(event) {
  return parse$2(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions = {}) {
  if (!serializeOptions.path) {
    serializeOptions = { path: "/", ...serializeOptions };
  }
  const newCookie = serialize$2(name, value, serializeOptions);
  const currentCookies = splitCookiesString(
    event.node.res.getHeader("set-cookie")
  );
  if (currentCookies.length === 0) {
    event.node.res.setHeader("set-cookie", newCookie);
    return;
  }
  const newCookieKey = getDistinctCookieKey(name, serializeOptions);
  event.node.res.removeHeader("set-cookie");
  for (const cookie of currentCookies) {
    const parsed = parseSetCookie(cookie);
    const key = getDistinctCookieKey(parsed.name, parsed);
    if (key === newCookieKey) {
      continue;
    }
    event.node.res.appendHeader("set-cookie", cookie);
  }
  event.node.res.appendHeader("set-cookie", newCookie);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "e09c8db9-fd28-4155-8e8b-d2b475afc691",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "baseURL": "http://localhost:3000",
    "mazUi": {
      "defaultMazIconPath": "",
      "autoImportPrefix": "",
      "devtools": true,
      "injectAos": {
        "injectCss": true
      },
      "injectComponents": true,
      "injectCss": true,
      "injectUseDialog": true,
      "injectUseIdleTimeout": true,
      "injectUseReadingTime": true,
      "injectUseWindowSize": true,
      "injectUseBreakpoints": true,
      "injectUseUserVisibility": true,
      "injectUseStringMatching": true,
      "injectUseTimer": true,
      "injectUseThemeHandler": true,
      "injectUseToast": true,
      "injectUseWait": true,
      "injectUseSwiper": true,
      "installVClickOutside": true,
      "installVFullscreenImg": true,
      "installVLazyImg": true,
      "installVTooltip": true,
      "installVZoomImg": true,
      "injectUseFormValidator": true,
      "injectUseLanguageDisplayNames": true
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function defineNitroPlugin(def) {
  return def;
}

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: process.env.MYSQL_PORT,
    logging: false
  }
);

const _schema$6 = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true, index: true },
  coverImg: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: false }
};
const test = sequelize.define("test", _schema$6, {
  tableName: "tests",
  timestamps: true
});
test.searchColumns = ["name"];
const base$8 = z.object({
  name: z.string().min(1, "test Name is required").max(255, "test Name must be less than 255 characters"),
  coverImg: z.string().min(1, "test Cover image is required"),
  createdBy: z.coerce.number().int("test Created by must be an integer").positive("test Created by must be positive")
});
const full$6 = base$8.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema$6 = base$8.partial();
const test$1 = {
  model: test,
  schema: _schema$6,
  zobSchema: { base: base$8, full: full$6, updateSchema: updateSchema$6 }
};

const _schema$5 = {
  userName: { type: DataTypes.STRING, allowNull: false, unique: true, defaultValue: "username" },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
      notEmpty: true
      // Ensures it’s not empty
    }
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "jpeg-default.jpeg"
  },
  passwordChangedAt: { type: DataTypes.DATE },
  passwordResetToken: { type: DataTypes.STRING },
  passwordResetExpires: { type: DataTypes.DATE },
  lastLoggedIn: {
    type: DataTypes.DATE
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  role: {
    type: DataTypes.JSON,
    allowNull: false,
    arrayOfStrings: true,
    allowed: ["user", "admin"],
    defaultValue: ["user"],
    validate: {
      isArrayOfAllowedValues(value) {
        const allowed = ["user", "admin"];
        if (!Array.isArray(value)) throw new Error("user role must be an array of strings");
        for (const v of value) {
          if (!allowed.includes(v)) throw new Error(`Invalid value user role: ${v}`);
        }
      }
    }
  }
};
const user = sequelize.define("user", _schema$5, {
  tableName: "users",
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ["userPassword", "active"] }
  },
  paranoid: true
  // enables soft delete by adding deletedAt
});
const base$7 = z.object({
  userName: z.string().min(1, "Username is required").max(50, "Username must be less than 50 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  userPassword: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  avatar: z.string().optional().default("jpeg-default.jpeg"),
  passwordChangedAt: z.coerce.date().optional(),
  passwordResetToken: z.string().optional(),
  passwordResetExpires: z.coerce.date().optional(),
  lastLoggedIn: z.coerce.date().optional(),
  active: z.boolean().optional().default(true),
  role: z.array(
    z.enum(["user", "admin"], {
      errorMap: (v) => ({ message: `user role as "${v.received}" not supported` })
    })
  ).nonempty("Role array cannot be empty").default(["user"])
});
const updateSchema$5 = z.object({
  userName: base$7.shape.userName.optional(),
  avatar: base$7.shape.avatar.optional()
}).strict({ message: "This api only update your USERNAME and PROFILE picture" });
const updatePasswordSchema = z.object({
  userPassword: base$7.shape.userPassword,
  // current password
  newPassword: z.string().min(1, "New password is required").min(8, "New password must be at least 8 characters")
  // .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "New password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "New password must contain at least one number")
  // .regex(/[^A-Za-z0-9]/, "New password must contain at least one special character")
});
const updatePhonenumberSchema = z.object({
  userPassword: base$7.shape.userPassword,
  // current password
  newPhoneNumber: base$7.shape.phoneNumber
  // new phone number
});
const updateEmailSchema = z.object({
  userPassword: base$7.shape.userPassword,
  // current password
  email: base$7.shape.email
  // new phone number
});
const loginSchema = base$7.pick({ email: true, userPassword: true });
const resetPasswordSchema = base$7.pick({ passwordResetToken: true, userPassword: true });
const full$5 = base$7.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
user.associate = function(models) {
  user.hasMany(models.blog, { foreignKey: "createdBy" });
  user.hasMany(models.newsletter, { foreignKey: "createdBy" });
};
user.beforeSave("", async function(model) {
  if (model._changed.has("userPassword")) model.userPassword = await bcrypt.hash(model.userPassword, 12);
});
user.beforeFind("", function(options) {
  options.where = {
    ...options.where,
    active: true
  };
});
user.prototype.createPasswordResetToken = function() {
  const resetToken = require$$1.randomBytes(32).toString("hex");
  this.passwordResetToken = require$$1.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1e3;
  return resetToken;
};
const user$1 = {
  model: user,
  schema: _schema$5,
  zobSchema: {
    base: base$7,
    full: full$5,
    updatePasswordSchema,
    updatePhonenumberSchema,
    updateEmailSchema,
    updateSchema: updateSchema$5,
    loginSchema,
    resetPasswordSchema
  }
};

const _schema$4 = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, index: true },
  content_short: { type: DataTypes.STRING, allowNull: false, index: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  coverImg: { type: DataTypes.STRING, allowNull: false },
  category: {
    type: DataTypes.JSON,
    allowNull: false,
    arrayOfStrings: true,
    allowed: ["info", "news", "social", "event"],
    validate: {
      isArrayOfAllowedValues(value) {
        const allowed = ["info", "news", "social", "event"];
        if (!Array.isArray(value)) throw new Error("Category must be an array of strings");
        for (const v of value) {
          if (!allowed.includes(v)) throw new Error(`Invalid value: ${v}`);
        }
      }
    }
  },
  createdBy: { type: DataTypes.INTEGER, allowNull: false }
  // to pass the joi validation
};
const blog = sequelize.define("blog", _schema$4, {
  tableName: "blogs",
  timestamps: true,
  paranoid: true
  // enables soft delete by adding deletedAt
});
blog.searchColumns = ["title", "content_short", "content"];
const ALLOWED_CATEGORIES = ["info", "news", "social", "event"];
const base$6 = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  content_short: z.string().min(1, "Short content is required").max(500, "Short content must be less than 500 characters"),
  content: z.string().min(1, "Content is required").min(10, "Content should be meaningful (at least 10 characters)"),
  coverImg: z.string().min(1, "Cover image is required").nonempty("blog cover image is required"),
  category: z.array(
    z.enum(ALLOWED_CATEGORIES, {
      errorMap: (issue) => ({
        message: `Invalid category: ${issue.received}. Allowed: ${ALLOWED_CATEGORIES.join(", ")}`
      })
    })
  ).nonempty("At least one category is required").max(3, "Maximum 3 categories allowed"),
  // Corrected createdBy field with coercion
  createdBy: z.coerce.number().int("Created by must be an integer").positive("Created by must be positive").optional()
});
const full$4 = base$6.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema$4 = base$6.partial();
blog.associate = function(models) {
  blog.belongsTo(models.user, { foreignKey: "createdBy", targetKey: "id" });
};
const blog$1 = {
  model: blog,
  schema: _schema$4,
  zobSchema: { base: base$6, full: full$4, updateSchema: updateSchema$4 }
};

const __filename = fileURLToPath(globalThis._importMeta_.url);
dirname$2(__filename);
class Email {
  constructor() {
  }
  transport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  // sendPasswordResetEmail
  sendPasswordResetEmail(info) {
    const password_reset_email_html_template = renderHtmlTemplate("server/utils/email/passwordReset.html", info);
    return this.transport().sendMail({
      to: info.email,
      from: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: "Your password reset token (valid for 10 minutes)",
      html: password_reset_email_html_template,
      text: convert(password_reset_email_html_template)
    });
  }
  confirm_newsletterSub(info) {
    const confirm_newsletterSub_email_html_template = renderHtmlTemplate("server/utils/emailTemplates/newsletter/confirmSub.html", info);
    return this.transport().sendMail({
      to: info.email,
      form: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: "destaAlcohol&Liquor newsletter confirmaition",
      html: confirm_newsletterSub_email_html_template,
      text: convert(confirm_newsletterSub_email_html_template)
    });
  }
  // here work for the newsletter app's feature
  sendNewsletter(info) {
    const newsletter_email_html_template = renderHtmlTemplate("server/utils/emailTemplates/newsletter/newsletter.html", info);
    return this.transport().sendMail({
      to: info.email,
      form: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: info.subject,
      html: newsletter_email_html_template,
      text: convert(newsletter_email_html_template)
    });
  }
  // Contact us
  contactus(info, files = []) {
    return this.transport().sendMail({
      to: process.env.SMTP_GM,
      from: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: `CONTACT US MESSAGE FROM 'destaalcohol.et' WEBSITE : ${info.subject}`,
      text: `
      New Contact Us Message:

      Name: ${info.name}
      Email: ${info.email}
      Phone: ${info.phoneNumber}
      Subject: ${info.subject}
      Message: ${info.message}
    `,
      html: `
      <h3>New Contact Us Message</h3>
      <p><strong>Name:</strong> ${info.name}</p>
      <p><strong>Email:</strong> ${info.email}</p>
      <p><strong>Phone:</strong> ${info.phoneNumber}</p>
      <p><strong>Subject:</strong> ${info.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${info.message}</p>
    `
    });
  }
  order(info, files = []) {
    return this.transport().sendMail({
      to: process.env.SMTP_GM,
      from: `Desta Alcohol and Liquor Factory <${process.env.SMTP_USER}>`,
      subject: `Customer Order mail from 'destaalcohol.et' WEBSITE`,
      text: `
        New Customer Order:

        Order Area: ${info.orderArea}
        Full Name: ${info.fullName}
        Email: ${info.email}
        Phone: ${info.phoneNumber}
        Country: ${info.country}
        Product: ${info.product}
        Additional message: ${info.message}
      `,
      html: `
        <h3>New Customer Order</h3>
        <p><strong>Order Area:</strong> ${info.orderArea}</p>
        <p><strong>Full Name:</strong> ${info.fullName}</p>
        <p><strong>Email:</strong> ${info.email}</p>
        <p><strong>Phone:</strong> ${info.phoneNumber}</p>
        <p><strong>Country:</strong> ${info.country}</p>
        <p><strong>Product:</strong> ${info.product}</p>
        <p><strong>Additional message:</strong> ${info.message}</p>
      `,
      attachments: files.map((file) => ({
        filename: file.filename,
        content: file.buffer
      }))
    });
  }
}
function renderHtmlTemplate(filePath, info) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Template file not found: ${absolutePath}`);
    }
    let htmlContent = fs.readFileSync(absolutePath, "utf8");
    htmlContent = htmlContent.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      var _a;
      return (_a = info[key.trim()]) != null ? _a : match;
    });
    return htmlContent;
  } catch (error) {
    console.error("Error processing the HTML template:", error);
    return `<p>Error loading email template</p>`;
  }
}

const _schema$3 = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subject: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  createdBy: { type: DataTypes.INTEGER, allowNull: true },
  // allowNull: true since midllere ware will be if Just pass let Joi validator
  recipientsIds: {
    type: DataTypes.JSON,
    arrayOfNumbers: true,
    allowNull: false,
    validate: {
      isArrayOfAllowedValues(value) {
        if (!Array.isArray(value)) throw new Error("recipientsIds must be an array of Ids");
      }
    }
  }
};
const newsletter = sequelize.define("newsletter", _schema$3, {
  tableName: "newsletters",
  timestamps: true,
  paranoid: true
});
const base$5 = z.object({
  subject: z.string().min(1, "Subject is required").max(255, "Subject must be less than 255 characters"),
  content: z.string().min(1, "Content is required").min(10, "Content should be meaningful (at least 10 characters)"),
  createdBy: z.coerce.number().int("Created by must be an integer").positive("Created by must be positive").optional().nullable(),
  recipientsIds: z.array(
    z.coerce.number().int("Recipient ID must be an integer").positive("Recipient ID must be positive")
  ).nonempty("At least one recipient ID is required").refine((ids) => new Set(ids).size === ids.length, {
    message: "Recipient IDs must be unique"
  })
});
const full$3 = base$5.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema$3 = base$5.partial();
newsletter.associate = (models) => {
  newsletter.belongsTo(models.user, { foreignKey: "createdBy", targetKey: "id" });
  newsletter.belongsToMany(models.newsletterSub, {
    through: "newsletter Recipients",
    // Junction table name
    as: "recipients"
    // Alias for eager loading (when populating)
  });
  newsletter.belongsToMany(models.newsletterSub, {
    through: "newsletter Successful Recipients",
    as: "successfulRecipients"
  });
  newsletter.belongsToMany(models.newsletterSub, {
    through: "newsletter Failed Recipients",
    as: "failedRecipients"
  });
};
newsletter.beforeFind("", function(options) {
  options.include = options.include || [];
  options.include.push(
    {
      association: "recipients",
      // Use the alias defined in your association
      through: { attributes: [] }
      // Exclude junction table fields
    },
    {
      association: "successfulRecipients",
      // Use the alias defined in your association
      through: { attributes: [] }
      // Exclude junction table fields
    },
    {
      association: "failedRecipients",
      // Use the alias defined in your association
      through: { attributes: [] }
      // Exclude junction table fields
    }
  );
});
const successfulRecipients = [];
const failedRecipients = [];
newsletter.beforeCreate("", async function(model, options) {
  try {
    const { models } = sequelize;
    const recipients = await models.newsletterSub.findAll({ where: { id: model.recipientsIds } });
    const newsletter2 = model;
    const email_sending_errors = [];
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      if (!recipient.confirmed) continue;
      try {
        await new Email().sendNewsletter({
          subject: newsletter2.subject,
          email: recipient.email,
          name: recipient.name,
          frontEnd: process.env.FRONTENDURL,
          UnsubscribeLink: `${process.env.FRONTENDURL}/unsub/${recipient.id}`,
          createdAt: newsletter2.createdAt,
          content: newsletter2.content
        });
        successfulRecipients.push(recipient.id);
      } catch (error) {
        email_sending_errors.push(error);
        failedRecipients.push(recipient.id);
      }
    }
    if (email_sending_errors.length != 0) {
      throw createError$1({
        statusCode: 400,
        statusMessage: `email_sending_errors: ${JSON.stringify(email_sending_errors)}`
      });
    }
  } catch (error) {
    throw createError$1({
      statusCode: 400,
      statusMessage: error
    });
  }
});
newsletter.afterCreate("", async function(model, options) {
  const uniqueSuccessful = [...new Set(successfulRecipients)];
  const uniqueFailed = [...new Set(failedRecipients)];
  await model.addRecipients(model.recipientsIds);
  await model.addSuccessfulRecipients(uniqueSuccessful);
  await model.addFailedRecipients(uniqueFailed);
});
const newsletter$1 = {
  model: newsletter,
  schema: _schema$3,
  zobSchema: { base: base$5, full: full$3, updateSchema: updateSchema$3 }
};

const _schema$2 = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  unsubscribe: { type: DataTypes.BOOLEAN, defaultValue: false }
};
const newsletterSub = sequelize.define("newsletterSub", _schema$2, {
  tableName: "newsletterSubs",
  timestamps: true
});
const base$4 = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  confirmed: z.boolean().optional().default(false),
  unsubscribe: z.boolean().optional().default(false)
});
const full$2 = base$4.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema$2 = base$4.partial();
const subscribeSchema = base$4.pick({ name: true, email: true });
const unsubscribeSchema = z.object({ email: z.string().email("Valid email is required") });
newsletterSub.associate = (models) => {
  newsletterSub.belongsToMany(models.newsletter, {
    through: "newsletter Successful Recipients",
    // Junction table name
    as: "recieved Newsletters"
    // Alias for eager loading (when populating)
  });
};
newsletterSub.beforeFind("", function(options) {
  options.include = options.include || [];
  options.include.push({
    association: "recieved Newsletters",
    // Use the alias defined in your association
    through: { attributes: [] }
    // Exclude junction table fields
  });
});
newsletterSub.afterCreate("", async function(model, options) {
  const subscriber = model;
  try {
    await new Email().confirm_newsletterSub({
      email: subscriber.email,
      name: subscriber.name,
      frontEnd: `${process.env.FRONTENDURL}/confirmSub/${subscriber.id}`,
      createdAt: subscriber.createdAt
    });
  } catch (error) {
    model.destroy({ force: true });
    throw createError$1({
      statusCode: 400,
      statusMessage: `confirmation email failed. plaese try again later', ${JSON.stringify(error)}`
    });
  }
});
const newsletterSub$1 = {
  model: newsletterSub,
  schema: _schema$2,
  zobSchema: { base: base$4, full: full$2, updateSchema: updateSchema$2, subscribeSchema, unsubscribeSchema }
};

const _schema$1 = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  uploaded_files: {
    type: DataTypes.JSON,
    allowNull: false,
    arrayOfStrings: true,
    validate: {
      isArrayOfStrings(value) {
        if (!Array.isArray(value)) throw new Error("uploaded_files must be an array of strings");
      }
    }
  },
  application_form: { type: DataTypes.JSON, allowNull: false }
};
const vacancyApplication = sequelize.define("vacancyApplication", _schema$1, {
  tableName: "vacancyApplications",
  timestamps: true,
  paranoid: true
});
const base$3 = z.object({
  uploaded_files: z.array(z.string()).nonempty("At least one file must be uploaded").max(5, "Maximum 5 files allowed").refine((files) => files.every((file) => {
    const validExtensions = [".pdf", ".doc", ".docx", ".txt"];
    return validExtensions.some((ext) => file.toLowerCase().endsWith(ext));
  }, {
    message: "Files must be PDF, DOC, DOCX, or TXT format"
  }))
  // application_form: z.object()
});
const full$1 = base$3.extend({
  id: z.number().int().positive("test ID must be a positive integer")
});
const updateSchema$1 = base$3.partial();
vacancyApplication.associate = function(models) {
  vacancyApplication.belongsTo(models.vacancy);
};
const vacancyApplication$1 = {
  model: vacancyApplication,
  schema: _schema$1,
  zobSchema: { base: base$3, full: full$1, updateSchema: updateSchema$1 }
};

const _schema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  position_name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  requirements: { type: DataTypes.TEXT, allowNull: false },
  locations: {
    type: DataTypes.JSON,
    allowNull: false,
    arrayOfStrings: true,
    validate: {
      isArrayOfStrings(value) {
        if (!Array.isArray(value)) throw new Error("locations must be an array of strings");
      }
    }
  },
  salary: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  deadline: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  createdBy: { type: DataTypes.INTEGER, allowNull: true },
  updatedBy: { type: DataTypes.INTEGER, allowNull: true }
};
const vacancy = sequelize.define("vacancy", _schema, {
  tableName: "vacancies",
  timestamps: true,
  paranoid: true
  // enables soft delete by adding deletedAt
});
const base$2 = z.object({
  position_name: z.string().min(1, "Job position name is required").max(255, "Position name must be less than 255 characters"),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  locations: z.array(z.string()).nonempty("At least one location is required"),
  salary: z.string().min(1, "Salary is required"),
  company: z.string().min(1, "Company name is required"),
  deadline: z.coerce.date({
    invalid_type_error: "Deadline must be a valid date"
  }),
  createdBy: z.coerce.number().int("Created by must be an integer").positive("Created by must be a positive number").optional()
});
const full = base$2.extend({
  id: z.number().int("ID must be an integer").positive("ID must be a positive number")
});
const updateSchema = base$2.partial();
vacancy.associate = function(models) {
  vacancy.belongsTo(models.user, { foreignKey: "createdBy", targetKey: "id" });
  vacancy.belongsTo(models.user, { foreignKey: "updatedBy", targetKey: "id" });
  vacancy.hasMany(models.vacancyApplication);
};
const vacancy$1 = {
  model: vacancy,
  schema: _schema,
  zobSchema: { base: base$2, full, updateSchema }
};

const base$1 = z.object({
  fullName: z.string().trim().nonempty("FullName is required"),
  email: z.string().trim().nonempty("email is required").email("Invalid email format"),
  phoneNumber: z.string().trim().nonempty("phoneNumber is required"),
  country: z.string().trim().nonempty("country is required"),
  orderArea: z.string().trim().nonempty("orderArea is required"),
  product: z.string().trim().nonempty("product is required"),
  message: z.string().trim().nonempty("message is required"),
  FileAttachments: z.array(z.string()).nonempty("At least one file must be uploaded").max(10, "Maximum 10 files allowed").refine((files) => files.every((file) => {
    const validExtensions = [".pdf", ".doc", ".docx", ".txt"];
    return validExtensions.some((ext) => file.toLowerCase().endsWith(ext));
  }, {
    message: "Files must be PDF, DOC, DOCX, or TXT format"
  }))
});
const order = {
  model: null,
  schema: null,
  zobSchema: { base: base$1 }
};

const base = z.object({
  fullName: z.string().trim().nonempty("name is required"),
  email: z.string().trim().nonempty("email is required").email("Invalid email format"),
  subject: z.string().trim().nonempty("Subject is required"),
  message: z.string().trim().nonempty("message is required"),
  phoneNumber: z.string().trim().nonempty("phoneNumber is required")
});
const contact = {
  model: null,
  schema: null,
  zobSchema: { base }
};

const modelsRef = {
  test: test$1,
  user: user$1,
  blog: blog$1,
  newsletter: newsletter$1,
  newsletterSub: newsletterSub$1,
  vacancy: vacancy$1,
  vacancyApplication: vacancyApplication$1,
  order,
  contact
};

const _DmRvnAgEVbOlop56g4tMCZ21CeDXfLhz15a6vioLE = defineNitroPlugin(async (nitroApp) => {
  try {
    const models = {
      test: modelsRef.test.model,
      user: modelsRef.user.model,
      blog: modelsRef.blog.model,
      newsletter: modelsRef.newsletter.model,
      newsletterSub: modelsRef.newsletterSub.model,
      vacancy: modelsRef.vacancy.model,
      vacancyApplication: modelsRef.vacancyApplication.model
    };
    Object.values(models).forEach((model) => {
      if (model.associate) {
        model.associate(models);
      }
    });
    await sequelize.authenticate();
    console.log("\u2728\u2728\u2728 MySQL connected successfully \u2728\u2728\u2728");
    await sequelize.sync();
    console.log("\u2728\u2728\u2728Database synced \u2728\u2728\u2728");
  } catch (error) {
    console.error(" Database connection error:", error);
  }
});

const _qY3S_PfUs58DLSM6lIQe7rQmAGQwAmnlIbjA7kWZU1I = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("error", async (error, { event }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    console.error(`[${timestamp}] [${error.statusCode || 500}] ${error.message}
    URL: ${(_b = (_a = event == null ? void 0 : event.node) == null ? void 0 : _a.req) == null ? void 0 : _b.url}
    Method: ${(_d = (_c = event == null ? void 0 : event.node) == null ? void 0 : _c.req) == null ? void 0 : _d.method}`);
    try {
      const logPath = join(process.cwd(), "server", "error.log");
      await appendFile(
        logPath,
        `[${timestamp}] [${error.statusCode || 500}] ${error.message}
          URL: ${(_f = (_e = event == null ? void 0 : event.node) == null ? void 0 : _e.req) == null ? void 0 : _f.url}
        Method: ${(_h = (_g = event == null ? void 0 : event.node) == null ? void 0 : _g.req) == null ? void 0 : _h.method}
        Stack: ${error.stack || "N/A"}
        `,
        "utf8"
      );
    } catch (fsErr) {
      console.error("Failed to write error log:", fsErr);
    }
  });
});

const plugins = [
  _DmRvnAgEVbOlop56g4tMCZ21CeDXfLhz15a6vioLE,
_qY3S_PfUs58DLSM6lIQe7rQmAGQwAmnlIbjA7kWZU1I
];

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"1183c-UsRFLlNpRarPibiE7E7Al5DIdkM\"",
    "mtime": "2025-03-14T05:38:48.604Z",
    "size": 71740,
    "path": "../public/favicon.ico"
  },
  "/googlee830a399f43b0009.html": {
    "type": "text/html; charset=utf-8",
    "etag": "\"35-tyhthSLdPKtriL+W2cbOTuyJW3c\"",
    "mtime": "2025-10-04T11:25:30.268Z",
    "size": 53,
    "path": "../public/googlee830a399f43b0009.html"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"18-j8OIsL9qGDmNZ+lHhp2tyH4XtaE\"",
    "mtime": "2025-05-19T01:13:21.000Z",
    "size": 24,
    "path": "../public/robots.txt"
  },
  "/SEOkeywords.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c2-XMgbvXZwTiuTVLlAtaTHXI1bN5w\"",
    "mtime": "2025-10-04T09:00:23.115Z",
    "size": 1218,
    "path": "../public/SEOkeywords.js"
  },
  "/site_info_ref.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6980-Sg9nLrVSmIAXTU+dd36q1ZIcXZg\"",
    "mtime": "2025-10-04T07:37:41.550Z",
    "size": 27008,
    "path": "../public/site_info_ref.js"
  },
  "/order/doc02208620250930123025_1759371905762-966915473.pdf": {
    "type": "application/pdf",
    "etag": "\"594e8-64gGqHD5DN3Yc3zXDyMxGq8oNvM\"",
    "mtime": "2025-10-02T05:14:01.151Z",
    "size": 365800,
    "path": "../public/order/doc02208620250930123025_1759371905762-966915473.pdf"
  },
  "/order/doc02208620250930123025_1759372003741-870159936.pdf": {
    "type": "application/pdf",
    "etag": "\"594e8-64gGqHD5DN3Yc3zXDyMxGq8oNvM\"",
    "mtime": "2025-10-02T05:14:01.160Z",
    "size": 365800,
    "path": "../public/order/doc02208620250930123025_1759372003741-870159936.pdf"
  },
  "/order/Gmail_-_Fwd__Welcome_to_Ethiopian_Science_and_Technology_University_1759392548469-786979729.pdf": {
    "type": "application/pdf",
    "etag": "\"91965-SgtxXpjPMMbjq/UGLfN669Z8agI\"",
    "mtime": "2025-10-02T08:09:17.839Z",
    "size": 596325,
    "path": "../public/order/Gmail_-_Fwd__Welcome_to_Ethiopian_Science_and_Technology_University_1759392548469-786979729.pdf"
  },
  "/order/Gmail_-_Fwd__Welcome_to_Ethiopian_Science_and_Technology_University_1759392623183-120100867.pdf": {
    "type": "application/pdf",
    "etag": "\"91965-SgtxXpjPMMbjq/UGLfN669Z8agI\"",
    "mtime": "2025-10-02T08:10:32.046Z",
    "size": 596325,
    "path": "../public/order/Gmail_-_Fwd__Welcome_to_Ethiopian_Science_and_Technology_University_1759392623183-120100867.pdf"
  },
  "/order/screencapture-file-D-ITT-vacancy-Ethiopian-Developemt-Bank-Mekelle-University-html-2025-09-05-23_06_40_1759372003744-826425776.pdf": {
    "type": "application/pdf",
    "etag": "\"632b1-SaZtaIE/Ow15VMep+zPUpTWW+Qs\"",
    "mtime": "2025-10-02T05:14:01.274Z",
    "size": 406193,
    "path": "../public/order/screencapture-file-D-ITT-vacancy-Ethiopian-Developemt-Bank-Mekelle-University-html-2025-09-05-23_06_40_1759372003744-826425776.pdf"
  },
  "/blog/5764924625220913399_1758998663639-253827352.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ebd-wzZ+0M1IiPypnsVPNqvSBGqdaF0\"",
    "mtime": "2025-09-29T05:39:18.613Z",
    "size": 85693,
    "path": "../public/blog/5764924625220913399_1758998663639-253827352.jpg"
  },
  "/blog/5764924625220913399_1758998665928-392556192.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ebd-wzZ+0M1IiPypnsVPNqvSBGqdaF0\"",
    "mtime": "2025-09-29T05:39:18.614Z",
    "size": 85693,
    "path": "../public/blog/5764924625220913399_1758998665928-392556192.jpg"
  },
  "/blog/5764924625220913399_1758998666900-299122024.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ebd-wzZ+0M1IiPypnsVPNqvSBGqdaF0\"",
    "mtime": "2025-09-29T05:39:18.615Z",
    "size": 85693,
    "path": "../public/blog/5764924625220913399_1758998666900-299122024.jpg"
  },
  "/blog/5764924625220913399_1758998668128-186368111.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ebd-wzZ+0M1IiPypnsVPNqvSBGqdaF0\"",
    "mtime": "2025-09-29T05:39:18.616Z",
    "size": 85693,
    "path": "../public/blog/5764924625220913399_1758998668128-186368111.jpg"
  },
  "/blog/5764924625220913399_1758998669129-81581768.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ebd-wzZ+0M1IiPypnsVPNqvSBGqdaF0\"",
    "mtime": "2025-09-29T05:39:18.617Z",
    "size": 85693,
    "path": "../public/blog/5764924625220913399_1758998669129-81581768.jpg"
  },
  "/blog/5764924625220913399_1758998670007-294921450.jpg": {
    "type": "image/jpeg",
    "etag": "\"14ebd-wzZ+0M1IiPypnsVPNqvSBGqdaF0\"",
    "mtime": "2025-09-29T05:39:18.619Z",
    "size": 85693,
    "path": "../public/blog/5764924625220913399_1758998670007-294921450.jpg"
  },
  "/blog/5922571335396084695_1758099082525-995344410.jpg": {
    "type": "image/jpeg",
    "etag": "\"2242c-Fkc5iKkqpNPrUka3yExlMc0xfnQ\"",
    "mtime": "2025-09-17T08:51:22.602Z",
    "size": 140332,
    "path": "../public/blog/5922571335396084695_1758099082525-995344410.jpg"
  },
  "/blog/5922571335396084695_1758099255130-395106730.jpg": {
    "type": "image/jpeg",
    "etag": "\"2242c-Fkc5iKkqpNPrUka3yExlMc0xfnQ\"",
    "mtime": "2025-09-17T08:54:15.189Z",
    "size": 140332,
    "path": "../public/blog/5922571335396084695_1758099255130-395106730.jpg"
  },
  "/blog/Ageverification_1759394775680-644522481.png": {
    "type": "image/png",
    "etag": "\"a1924-wkY3oWkEpWd4TmwBiYSJKgIQGAs\"",
    "mtime": "2025-10-02T08:46:15.952Z",
    "size": 661796,
    "path": "../public/blog/Ageverification_1759394775680-644522481.png"
  },
  "/blog/Ageverification_1759395161412-410847787.png": {
    "type": "image/png",
    "etag": "\"9eb48-S73wi/72hKhqVItbBPQUTFcYx40\"",
    "mtime": "2025-10-02T08:52:41.599Z",
    "size": 650056,
    "path": "../public/blog/Ageverification_1759395161412-410847787.png"
  },
  "/blog/Capture.PNG_1758720874776-413169097.png": {
    "type": "image/png",
    "etag": "\"100d5-t6ccSx55lBYA2z5dBR/HH/YBN9g\"",
    "mtime": "2025-09-24T13:34:34.828Z",
    "size": 65749,
    "path": "../public/blog/Capture.PNG_1758720874776-413169097.png"
  },
  "/blog/Capture.PNG_1758787559218-124331457.png": {
    "type": "image/png",
    "etag": "\"a304-qV3m7ghOi6tnzX+O80nz0SQ1YJ8\"",
    "mtime": "2025-09-25T08:05:59.349Z",
    "size": 41732,
    "path": "../public/blog/Capture.PNG_1758787559218-124331457.png"
  },
  "/blog/ddd_1758710352975-298169829.jpg": {
    "type": "image/jpeg",
    "etag": "\"40c1f-CnVk7/aod+wXjKUuw+lkKor3XGE\"",
    "mtime": "2025-09-24T10:39:13.049Z",
    "size": 265247,
    "path": "../public/blog/ddd_1758710352975-298169829.jpg"
  },
  "/blog/ddd_1758720141414-981274549.jpg": {
    "type": "image/jpeg",
    "etag": "\"40c1f-CnVk7/aod+wXjKUuw+lkKor3XGE\"",
    "mtime": "2025-09-24T13:22:21.772Z",
    "size": 265247,
    "path": "../public/blog/ddd_1758720141414-981274549.jpg"
  },
  "/blog/ddd_1758720898377-367623571.jpg": {
    "type": "image/jpeg",
    "etag": "\"40c1f-CnVk7/aod+wXjKUuw+lkKor3XGE\"",
    "mtime": "2025-09-24T13:34:58.431Z",
    "size": 265247,
    "path": "../public/blog/ddd_1758720898377-367623571.jpg"
  },
  "/blog/ddd_1758721239647-661810307.jpg": {
    "type": "image/jpeg",
    "etag": "\"40c1f-CnVk7/aod+wXjKUuw+lkKor3XGE\"",
    "mtime": "2025-09-24T13:40:39.683Z",
    "size": 265247,
    "path": "../public/blog/ddd_1758721239647-661810307.jpg"
  },
  "/blog/ddd_1759394672488-789667978.jpg": {
    "type": "image/jpeg",
    "etag": "\"40c1f-CnVk7/aod+wXjKUuw+lkKor3XGE\"",
    "mtime": "2025-10-02T08:44:33.483Z",
    "size": 265247,
    "path": "../public/blog/ddd_1759394672488-789667978.jpg"
  },
  "/blog/Degree_certificate_1759129465088-665107243.jpg": {
    "type": "image/jpeg",
    "etag": "\"32744-m0jdhedAL3pUkOLqo+ceI0LhUjM\"",
    "mtime": "2025-09-29T07:04:25.185Z",
    "size": 206660,
    "path": "../public/blog/Degree_certificate_1759129465088-665107243.jpg"
  },
  "/blog/desta-logo_1758128943223-473304279.png": {
    "type": "image/png",
    "etag": "\"1e0b1-1v+2EYH6eJK0DuqZ/04NYtRylr4\"",
    "mtime": "2025-09-18T05:17:09.050Z",
    "size": 123057,
    "path": "../public/blog/desta-logo_1758128943223-473304279.png"
  },
  "/blog/logo_1759076817840-306262978.jpg": {
    "type": "image/jpeg",
    "etag": "\"2db6-3nTeK3rckIu37EjXSbEODOH54BU\"",
    "mtime": "2025-09-29T05:39:18.660Z",
    "size": 11702,
    "path": "../public/blog/logo_1759076817840-306262978.jpg"
  },
  "/blog/screencapture-localhost-3000-ageVerification-2025-10-01-10_39_09_1759304365114-473160352.png": {
    "type": "image/png",
    "etag": "\"a277e-mVWqpzZdD4X+MA2aBzeWAOvlvUM\"",
    "mtime": "2025-10-01T07:39:25.213Z",
    "size": 665470,
    "path": "../public/blog/screencapture-localhost-3000-ageVerification-2025-10-01-10_39_09_1759304365114-473160352.png"
  },
  "/blog/screencapture-localhost-3000-blog-2025-10-01-10_31_09_1759304327928-960798930.png": {
    "type": "image/png",
    "etag": "\"ca593-+N5K88eFoicgFUg2P2O9IXMJZD4\"",
    "mtime": "2025-10-01T07:38:48.136Z",
    "size": 828819,
    "path": "../public/blog/screencapture-localhost-3000-blog-2025-10-01-10_31_09_1759304327928-960798930.png"
  },
  "/blog/screencapture-zen-solomon-213-55-96-154-plesk-page-2025-09-25-14_02_14_1759131092077-785749199.png": {
    "type": "image/png",
    "etag": "\"25af4-AWUzP/GAU0neAGDIbZCh1jJvx/k\"",
    "mtime": "2025-09-29T07:31:32.143Z",
    "size": 154356,
    "path": "../public/blog/screencapture-zen-solomon-213-55-96-154-plesk-page-2025-09-25-14_02_14_1759131092077-785749199.png"
  },
  "/pictures/desta-logo.png": {
    "type": "image/png",
    "etag": "\"1183c-UsRFLlNpRarPibiE7E7Al5DIdkM\"",
    "mtime": "2025-03-14T05:38:48.604Z",
    "size": 71740,
    "path": "../public/pictures/desta-logo.png"
  },
  "/pictures/logo.jpg": {
    "type": "image/jpeg",
    "etag": "\"2db6-3nTeK3rckIu37EjXSbEODOH54BU\"",
    "mtime": "2025-03-14T06:32:36.785Z",
    "size": 11702,
    "path": "../public/pictures/logo.jpg"
  },
  "/pictures/manager.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a75-bZiLBupqJfsEydsIT0qYnbl2Uh4\"",
    "mtime": "2025-03-21T12:10:22.355Z",
    "size": 35445,
    "path": "../public/pictures/manager.jpg"
  },
  "/test/Capssture.JPG_1753339141682-353102753.jpg": {
    "type": "image/jpeg",
    "etag": "\"1b58-HCiNFJttVu5ux14vQSCG+jCUlZc\"",
    "mtime": "2025-07-24T06:39:01.878Z",
    "size": 7000,
    "path": "../public/test/Capssture.JPG_1753339141682-353102753.jpg"
  },
  "/test/Captsure.JPG_1753338316775-618480803.jpg": {
    "type": "image/jpeg",
    "etag": "\"630c-PCvjHn18AmKJbX5UF4lGept0y5U\"",
    "mtime": "2025-07-24T06:25:17.042Z",
    "size": 25356,
    "path": "../public/test/Captsure.JPG_1753338316775-618480803.jpg"
  },
  "/test/Captsure.JPG_1753339141638-637361113.jpg": {
    "type": "image/jpeg",
    "etag": "\"630c-PCvjHn18AmKJbX5UF4lGept0y5U\"",
    "mtime": "2025-07-24T06:39:01.826Z",
    "size": 25356,
    "path": "../public/test/Captsure.JPG_1753339141638-637361113.jpg"
  },
  "/test/Caspture_1753339141691-413599797.jpg": {
    "type": "image/jpeg",
    "etag": "\"95a4-4NdUJ3SVcof5MlwhiVqiKD+c24w\"",
    "mtime": "2025-07-24T06:39:01.879Z",
    "size": 38308,
    "path": "../public/test/Caspture_1753339141691-413599797.jpg"
  },
  "/users/5798533525996161452_(1)_1757817157029-178253786.jpg": {
    "type": "image/jpeg",
    "etag": "\"6a7e-OsMe/bEXxLqlOQTfzTv+6Hi+b6Y\"",
    "mtime": "2025-09-16T05:28:47.643Z",
    "size": 27262,
    "path": "../public/users/5798533525996161452_(1)_1757817157029-178253786.jpg"
  },
  "/users/5798533525996161452_1757821597699-235706623.jpg": {
    "type": "image/jpeg",
    "etag": "\"6a7e-OsMe/bEXxLqlOQTfzTv+6Hi+b6Y\"",
    "mtime": "2025-09-16T05:28:47.652Z",
    "size": 27262,
    "path": "../public/users/5798533525996161452_1757821597699-235706623.jpg"
  },
  "/users/5798533525996161452_1757823249279-621763859.jpg": {
    "type": "image/jpeg",
    "etag": "\"6a7e-OsMe/bEXxLqlOQTfzTv+6Hi+b6Y\"",
    "mtime": "2025-09-16T05:28:47.661Z",
    "size": 27262,
    "path": "../public/users/5798533525996161452_1757823249279-621763859.jpg"
  },
  "/users/5900269515848140540 (1)_1757679549683-580700877.jpg": {
    "type": "image/jpeg",
    "etag": "\"20a36-yb6Y8GkPpwXkZaW/yku1YocUx98\"",
    "mtime": "2025-09-12T12:19:11.110Z",
    "size": 133686,
    "path": "../public/users/5900269515848140540 (1)_1757679549683-580700877.jpg"
  },
  "/users/5922571335396084723_1758101698047-695629517.jpg": {
    "type": "image/jpeg",
    "etag": "\"7d34-YD4NL5G3JaSyw0wMKDbi7Le70tk\"",
    "mtime": "2025-09-17T09:34:58.540Z",
    "size": 32052,
    "path": "../public/users/5922571335396084723_1758101698047-695629517.jpg"
  },
  "/users/Caspture_1757743159222-837662257.jpg": {
    "type": "image/jpeg",
    "etag": "\"95a4-4NdUJ3SVcof5MlwhiVqiKD+c24w\"",
    "mtime": "2025-09-13T05:59:21.431Z",
    "size": 38308,
    "path": "../public/users/Caspture_1757743159222-837662257.jpg"
  },
  "/users/Caspture_1757743225324-355785654.jpg": {
    "type": "image/jpeg",
    "etag": "\"95a4-4NdUJ3SVcof5MlwhiVqiKD+c24w\"",
    "mtime": "2025-09-13T06:00:25.416Z",
    "size": 38308,
    "path": "../public/users/Caspture_1757743225324-355785654.jpg"
  },
  "/users/Caspture_1757743872584-623052628.jpg": {
    "type": "image/jpeg",
    "etag": "\"95a4-4NdUJ3SVcof5MlwhiVqiKD+c24w\"",
    "mtime": "2025-09-13T06:11:12.965Z",
    "size": 38308,
    "path": "../public/users/Caspture_1757743872584-623052628.jpg"
  },
  "/users/ddd_1756372565378-681288406.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-08-28T09:16:05.823Z",
    "size": 26904,
    "path": "../public/users/ddd_1756372565378-681288406.jpg"
  },
  "/users/ddd_1756372663896-221615120.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-08-28T09:17:44.260Z",
    "size": 26904,
    "path": "../public/users/ddd_1756372663896-221615120.jpg"
  },
  "/users/ddd_1756372684419-960334295.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-08-28T09:18:06.840Z",
    "size": 26904,
    "path": "../public/users/ddd_1756372684419-960334295.jpg"
  },
  "/users/ddd_1756800415338-556099668.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-02T08:06:55.775Z",
    "size": 26904,
    "path": "../public/users/ddd_1756800415338-556099668.jpg"
  },
  "/users/ddd_1757679049711-98605756.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-12T12:10:50.087Z",
    "size": 26904,
    "path": "../public/users/ddd_1757679049711-98605756.jpg"
  },
  "/users/ddd_1757743885472-599181830.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-13T06:11:25.776Z",
    "size": 26904,
    "path": "../public/users/ddd_1757743885472-599181830.jpg"
  },
  "/users/ddd_1757743894672-800775264.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-13T06:11:34.799Z",
    "size": 26904,
    "path": "../public/users/ddd_1757743894672-800775264.jpg"
  },
  "/users/ddd_1757743902484-480230115.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-13T06:11:42.582Z",
    "size": 26904,
    "path": "../public/users/ddd_1757743902484-480230115.jpg"
  },
  "/users/ddd_1757748310712-458225052.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-13T07:25:10.978Z",
    "size": 26904,
    "path": "../public/users/ddd_1757748310712-458225052.jpg"
  },
  "/users/ddd_1757748315252-900422079.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-13T07:25:15.566Z",
    "size": 26904,
    "path": "../public/users/ddd_1757748315252-900422079.jpg"
  },
  "/users/ddd_1758101709685-889211385.jpg": {
    "type": "image/jpeg",
    "etag": "\"6918-v8+w4i4dDu4hCmI5KPce7rgD6WE\"",
    "mtime": "2025-09-17T09:35:09.891Z",
    "size": 26904,
    "path": "../public/users/ddd_1758101709685-889211385.jpg"
  },
  "/users/desta-logo_1758815745156-395685374.png": {
    "type": "image/png",
    "etag": "\"1e0b1-1v+2EYH6eJK0DuqZ/04NYtRylr4\"",
    "mtime": "2025-09-26T05:16:23.966Z",
    "size": 123057,
    "path": "../public/users/desta-logo_1758815745156-395685374.png"
  },
  "/users/desta-logo_1758815752039-28347435.png": {
    "type": "image/png",
    "etag": "\"1e0b1-1v+2EYH6eJK0DuqZ/04NYtRylr4\"",
    "mtime": "2025-09-26T05:16:23.967Z",
    "size": 123057,
    "path": "../public/users/desta-logo_1758815752039-28347435.png"
  },
  "/users/desta-logo_1758815762043-339486028.png": {
    "type": "image/png",
    "etag": "\"1e0b1-1v+2EYH6eJK0DuqZ/04NYtRylr4\"",
    "mtime": "2025-09-26T05:16:23.967Z",
    "size": 123057,
    "path": "../public/users/desta-logo_1758815762043-339486028.png"
  },
  "/users/La Sagrada Familia Barcelona_1757678912910-110950219.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:08:33.136Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757678912910-110950219.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757678994715-557378596.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:09:55.007Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757678994715-557378596.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757679065669-727576158.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:11:05.898Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757679065669-727576158.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757679334864-144130344.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:15:35.254Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757679334864-144130344.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757679362778-907671762.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:16:02.948Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757679362778-907671762.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757679490187-801877886.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:18:10.389Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757679490187-801877886.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757679530550-361611617.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:18:50.878Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757679530550-361611617.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757679788179-600115884.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:23:08.367Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757679788179-600115884.jpg"
  },
  "/users/La Sagrada Familia Barcelona_1757679822559-245383131.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:23:42.752Z",
    "size": 261970,
    "path": "../public/users/La Sagrada Familia Barcelona_1757679822559-245383131.jpg"
  },
  "/users/La_Sagrada_Familia_Barcelona_1757679989036-718778420.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-12T12:26:29.217Z",
    "size": 261970,
    "path": "../public/users/La_Sagrada_Familia_Barcelona_1757679989036-718778420.jpg"
  },
  "/users/La_Sagrada_Familia_Barcelona_1757748298984-288392269.jpg": {
    "type": "image/jpeg",
    "etag": "\"3ff52-OTBtWNnOx+LyFbq/BZKxTlNs6kk\"",
    "mtime": "2025-09-13T07:24:59.373Z",
    "size": 261970,
    "path": "../public/users/La_Sagrada_Familia_Barcelona_1757748298984-288392269.jpg"
  },
  "/users/spencer-plouzek-VMlIOzs_kkg-unsplash_(1)_1758001525370-924061080.jpg": {
    "type": "image/jpeg",
    "etag": "\"13d7ec-KaGUt650QHiBhDyYpNp712/uuEw\"",
    "mtime": "2025-09-16T05:45:30.651Z",
    "size": 1300460,
    "path": "../public/users/spencer-plouzek-VMlIOzs_kkg-unsplash_(1)_1758001525370-924061080.jpg"
  },
  "/users/unnamed_1758997226098-127734376.jpg": {
    "type": "image/jpeg",
    "etag": "\"123c6-YBd9GYllDjYyn66duo3JBgMQee0\"",
    "mtime": "2025-09-29T05:39:18.679Z",
    "size": 74694,
    "path": "../public/users/unnamed_1758997226098-127734376.jpg"
  },
  "/users/unnamed_1759365622462-319203078.jpg": {
    "type": "image/jpeg",
    "etag": "\"123c6-YBd9GYllDjYyn66duo3JBgMQee0\"",
    "mtime": "2025-10-02T05:14:01.304Z",
    "size": 74694,
    "path": "../public/users/unnamed_1759365622462-319203078.jpg"
  },
  "/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_(1)_1759085421809-683840192.pdf": {
    "type": "application/pdf",
    "etag": "\"7e1ff-qTsCA3Xo4+MfwrKn4SVwMsm7z10\"",
    "mtime": "2025-09-29T05:39:18.691Z",
    "size": 516607,
    "path": "../public/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_(1)_1759085421809-683840192.pdf"
  },
  "/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_(1)_1759086416018-561881778.pdf": {
    "type": "application/pdf",
    "etag": "\"7e1ff-qTsCA3Xo4+MfwrKn4SVwMsm7z10\"",
    "mtime": "2025-09-29T05:39:18.696Z",
    "size": 516607,
    "path": "../public/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_(1)_1759086416018-561881778.pdf"
  },
  "/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_1758130416218-276276900.pdf": {
    "type": "application/pdf",
    "etag": "\"7d45c-Y6BDehRart03jfozIXMwLKGDnTY\"",
    "mtime": "2025-09-18T05:17:09.067Z",
    "size": 513116,
    "path": "../public/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_1758130416218-276276900.pdf"
  },
  "/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_1759085421810-292324729.pdf": {
    "type": "application/pdf",
    "etag": "\"7d45c-Y6BDehRart03jfozIXMwLKGDnTY\"",
    "mtime": "2025-09-29T05:39:18.796Z",
    "size": 513116,
    "path": "../public/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_1759085421810-292324729.pdf"
  },
  "/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_1759086416018-426921230.pdf": {
    "type": "application/pdf",
    "etag": "\"7d45c-Y6BDehRart03jfozIXMwLKGDnTY\"",
    "mtime": "2025-09-29T05:39:18.800Z",
    "size": 513116,
    "path": "../public/vacancyApplicationFiles/03-2026_Research_Application_edited_(2)_(1)_(1)_(2)_(1)_(2)_(1)_1759086416018-426921230.pdf"
  },
  "/vacancyApplicationFiles/2025-04-Stellenausschreibung-Junior-Full-Stack-Web-Developer_1758698092318-549182327.pdf": {
    "type": "application/pdf",
    "etag": "\"4b75d-ptaXypQJO0s05DOUQeifYsu/o1g\"",
    "mtime": "2025-09-24T07:14:52.402Z",
    "size": 309085,
    "path": "../public/vacancyApplicationFiles/2025-04-Stellenausschreibung-Junior-Full-Stack-Web-Developer_1758698092318-549182327.pdf"
  },
  "/vacancyApplicationFiles/272_1758695882711-191690268.pdf": {
    "type": "application/pdf",
    "etag": "\"afa6-ZAKgmRUktSTjmtJccbpfEfIkvBY\"",
    "mtime": "2025-09-24T06:38:02.815Z",
    "size": 44966,
    "path": "../public/vacancyApplicationFiles/272_1758695882711-191690268.pdf"
  },
  "/vacancyApplicationFiles/273_1758695882711-386922323.pdf": {
    "type": "application/pdf",
    "etag": "\"afa6-ZAKgmRUktSTjmtJccbpfEfIkvBY\"",
    "mtime": "2025-09-24T06:38:02.837Z",
    "size": 44966,
    "path": "../public/vacancyApplicationFiles/273_1758695882711-386922323.pdf"
  },
  "/vacancyApplicationFiles/8_merged_1758786306359-16360003.pdf": {
    "type": "application/pdf",
    "etag": "\"31aeed-GRYWi7GJl++CjZ23q0s2Gjo+KRI\"",
    "mtime": "2025-09-25T07:45:06.411Z",
    "size": 3256045,
    "path": "../public/vacancyApplicationFiles/8_merged_1758786306359-16360003.pdf"
  },
  "/vacancyApplicationFiles/8_merged_2_2_1758695882711-889613058.pdf": {
    "type": "application/pdf",
    "etag": "\"3127f9-hP1CvUmP5fd/Af2HTij4liZQ58E\"",
    "mtime": "2025-09-24T06:38:02.811Z",
    "size": 3221497,
    "path": "../public/vacancyApplicationFiles/8_merged_2_2_1758695882711-889613058.pdf"
  },
  "/vacancyApplicationFiles/cv__1758897086025-377023121.pdf": {
    "type": "application/pdf",
    "etag": "\"19f04b-Ee90FWoJOLpbONSY6yRwW8IgKs8\"",
    "mtime": "2025-09-26T14:31:26.327Z",
    "size": 1699915,
    "path": "../public/vacancyApplicationFiles/cv__1758897086025-377023121.pdf"
  },
  "/vacancyApplicationFiles/cv___-_Copy_1759129354597-781405332.pdf": {
    "type": "application/pdf",
    "etag": "\"177ab6-TuS24bFoip+6Xj0I9XZFwCFbGlg\"",
    "mtime": "2025-09-29T07:02:34.704Z",
    "size": 1538742,
    "path": "../public/vacancyApplicationFiles/cv___-_Copy_1759129354597-781405332.pdf"
  },
  "/vacancyApplicationFiles/cv___1758897086025-829782025.pdf": {
    "type": "application/pdf",
    "etag": "\"177ab6-TuS24bFoip+6Xj0I9XZFwCFbGlg\"",
    "mtime": "2025-09-26T14:31:26.372Z",
    "size": 1538742,
    "path": "../public/vacancyApplicationFiles/cv___1758897086025-829782025.pdf"
  },
  "/vacancyApplicationFiles/dagmawihadgu@gmail_-_Copy_(2)_1759129354598-932106813.pdf": {
    "type": "application/pdf",
    "etag": "\"ea549-5d96K/kQpLuEeWextGMDwJZJIZk\"",
    "mtime": "2025-09-29T07:02:34.727Z",
    "size": 959817,
    "path": "../public/vacancyApplicationFiles/dagmawihadgu@gmail_-_Copy_(2)_1759129354598-932106813.pdf"
  },
  "/vacancyApplicationFiles/dagmawihadgu@gmail_-_Copy_-_Copy_1759129354598-547206341.pdf": {
    "type": "application/pdf",
    "etag": "\"ea549-5d96K/kQpLuEeWextGMDwJZJIZk\"",
    "mtime": "2025-09-29T07:02:34.706Z",
    "size": 959817,
    "path": "../public/vacancyApplicationFiles/dagmawihadgu@gmail_-_Copy_-_Copy_1759129354598-547206341.pdf"
  },
  "/vacancyApplicationFiles/Degree_certificate_merged_(1)_1758630308518-7601131.pdf": {
    "type": "application/pdf",
    "etag": "\"1f6fff-uWhZHsZqFCzufKpF9ulYqQTNbv4\"",
    "mtime": "2025-09-23T12:25:08.554Z",
    "size": 2060287,
    "path": "../public/vacancyApplicationFiles/Degree_certificate_merged_(1)_1758630308518-7601131.pdf"
  },
  "/vacancyApplicationFiles/Degree_certificate_merged_1758630203997-477446901.pdf": {
    "type": "application/pdf",
    "etag": "\"1f6fff-uWhZHsZqFCzufKpF9ulYqQTNbv4\"",
    "mtime": "2025-09-23T12:23:24.170Z",
    "size": 2060287,
    "path": "../public/vacancyApplicationFiles/Degree_certificate_merged_1758630203997-477446901.pdf"
  },
  "/vacancyApplicationFiles/Degree_certificate_merged_1758630596118-567529311.pdf": {
    "type": "application/pdf",
    "etag": "\"1f6fff-uWhZHsZqFCzufKpF9ulYqQTNbv4\"",
    "mtime": "2025-09-23T12:29:56.299Z",
    "size": 2060287,
    "path": "../public/vacancyApplicationFiles/Degree_certificate_merged_1758630596118-567529311.pdf"
  },
  "/vacancyApplicationFiles/exit_exam_result__1758087947096-695209614.pdf": {
    "type": "application/pdf",
    "etag": "\"389612-lJrAVnoomzHlrIromiau1MZvCjc\"",
    "mtime": "2025-09-17T05:45:47.204Z",
    "size": 3708434,
    "path": "../public/vacancyApplicationFiles/exit_exam_result__1758087947096-695209614.pdf"
  },
  "/vacancyApplicationFiles/Gmail_-_Fwd__Welcome_to_Ethiopian_Science_and_Technology_University_1759317445852-942029255.pdf": {
    "type": "application/pdf",
    "etag": "\"91965-SgtxXpjPMMbjq/UGLfN669Z8agI\"",
    "mtime": "2025-10-01T11:17:26.195Z",
    "size": 596325,
    "path": "../public/vacancyApplicationFiles/Gmail_-_Fwd__Welcome_to_Ethiopian_Science_and_Technology_University_1759317445852-942029255.pdf"
  },
  "/vacancyApplicationFiles/screencapture-file-D-ITT-vacancy-Ethiopian-Developemt-Bank-Mekelle-University-html-2025-09-05-23_06_40_1759085421809-415014296.pdf": {
    "type": "application/pdf",
    "etag": "\"632b1-SaZtaIE/Ow15VMep+zPUpTWW+Qs\"",
    "mtime": "2025-09-29T05:39:18.814Z",
    "size": 406193,
    "path": "../public/vacancyApplicationFiles/screencapture-file-D-ITT-vacancy-Ethiopian-Developemt-Bank-Mekelle-University-html-2025-09-05-23_06_40_1759085421809-415014296.pdf"
  },
  "/vacancyApplicationFiles/screencapture-file-D-ITT-vacancy-Ethiopian-Developemt-Bank-Mekelle-University-html-2025-09-05-23_06_40_1759086416017-210880508.pdf": {
    "type": "application/pdf",
    "etag": "\"632b1-SaZtaIE/Ow15VMep+zPUpTWW+Qs\"",
    "mtime": "2025-09-29T05:39:18.817Z",
    "size": 406193,
    "path": "../public/vacancyApplicationFiles/screencapture-file-D-ITT-vacancy-Ethiopian-Developemt-Bank-Mekelle-University-html-2025-09-05-23_06_40_1759086416017-210880508.pdf"
  },
  "/vacancyApplicationFiles/transcript_1758087506090-652249833.pdf": {
    "type": "application/pdf",
    "etag": "\"1a073c-6aSmuxVdLZAkLUNBgQyxiQnwjzc\"",
    "mtime": "2025-09-17T05:38:26.353Z",
    "size": 1705788,
    "path": "../public/vacancyApplicationFiles/transcript_1758087506090-652249833.pdf"
  },
  "/vacancyApplicationFiles/transcript_1758087947095-934939370.pdf": {
    "type": "application/pdf",
    "etag": "\"1a073c-6aSmuxVdLZAkLUNBgQyxiQnwjzc\"",
    "mtime": "2025-09-17T05:45:47.181Z",
    "size": 1705788,
    "path": "../public/vacancyApplicationFiles/transcript_1758087947095-934939370.pdf"
  },
  "/_nuxt/5-Ct17GO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"687ac-DgJF/SAKKtNuFzTgDgWznVFtVAs\"",
    "mtime": "2025-10-06T06:23:28.750Z",
    "size": 427948,
    "path": "../public/_nuxt/5-Ct17GO.js"
  },
  "/_nuxt/5cYR9Zhq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fee-L6zA59/P7+f7GPERXAqDQXWzrCw\"",
    "mtime": "2025-10-06T06:23:28.764Z",
    "size": 4078,
    "path": "../public/_nuxt/5cYR9Zhq.js"
  },
  "/_nuxt/5Zz7SsET.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5cf-79tN/RwDx8louFBacDDt9D0LGn0\"",
    "mtime": "2025-10-06T06:23:28.763Z",
    "size": 1487,
    "path": "../public/_nuxt/5Zz7SsET.js"
  },
  "/_nuxt/6tX6Uysc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1334-UxzByXoZ9tZE76GcO0H1twLqINM\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 4916,
    "path": "../public/_nuxt/6tX6Uysc.js"
  },
  "/_nuxt/aboutUs.B7dc5WLe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13be-To4zb+VoQsCJoGztJBejglGtHsE\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 5054,
    "path": "../public/_nuxt/aboutUs.B7dc5WLe.css"
  },
  "/_nuxt/AddNewNewsletterSub.BIIcZRGE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"72-iwvVSJESJsab18Fm+vixIGPYL1c\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 114,
    "path": "../public/_nuxt/AddNewNewsletterSub.BIIcZRGE.css"
  },
  "/_nuxt/ageVerification.DMgePYpX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c56-GuXZJIFgtUMDOKRtiTpxd32Adk0\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 3158,
    "path": "../public/_nuxt/ageVerification.DMgePYpX.css"
  },
  "/_nuxt/alcohol 70.Co1FrYih.png": {
    "type": "image/png",
    "etag": "\"17965-x5LD0i1l1jN09LtuZtD79ODgWqs\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 96613,
    "path": "../public/_nuxt/alcohol 70.Co1FrYih.png"
  },
  "/_nuxt/applications.B9qP0SLp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"591-Lab7DmA7hWBxp69bWSzTSZRfXJ4\"",
    "mtime": "2025-10-06T06:23:28.728Z",
    "size": 1425,
    "path": "../public/_nuxt/applications.B9qP0SLp.css"
  },
  "/_nuxt/Awash Bank.D3DVzfGe.jpg": {
    "type": "image/jpeg",
    "etag": "\"96233-kXUELLvur112aOhMbwzSY1gC5Ek\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 614963,
    "path": "../public/_nuxt/Awash Bank.D3DVzfGe.jpg"
  },
  "/_nuxt/B-ZKanTh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b7-2J7mbDvq1Qm89q051+h1QZkMMvY\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 183,
    "path": "../public/_nuxt/B-ZKanTh.js"
  },
  "/_nuxt/B0Vn2t0i.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d9-G2AAGkfSUGudPVNl5Fn7mjUwIgo\"",
    "mtime": "2025-10-06T06:23:28.837Z",
    "size": 473,
    "path": "../public/_nuxt/B0Vn2t0i.js"
  },
  "/_nuxt/B1Pb1NbY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d25-KZB/tghxc0HqCZDcsj3hvYgL/KE\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 3365,
    "path": "../public/_nuxt/B1Pb1NbY.js"
  },
  "/_nuxt/B4-4eAYd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"832-ViD03fKsT7z7St5yCGtRleYj8gk\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 2098,
    "path": "../public/_nuxt/B4-4eAYd.js"
  },
  "/_nuxt/B9c4eJ6f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"219-ZBDzXe4eIZ6PsSRSjTcqPNpo8EM\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 537,
    "path": "../public/_nuxt/B9c4eJ6f.js"
  },
  "/_nuxt/BatphMkH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30e-DwN9dZlmLnK7o5E40lOBPbTkl0w\"",
    "mtime": "2025-10-06T06:23:28.836Z",
    "size": 782,
    "path": "../public/_nuxt/BatphMkH.js"
  },
  "/_nuxt/BAWRBS7d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"226-2JxADAZgFdbXjYUerk2m0Wc7MHA\"",
    "mtime": "2025-10-06T06:23:28.768Z",
    "size": 550,
    "path": "../public/_nuxt/BAWRBS7d.js"
  },
  "/_nuxt/Bb3VyOrJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f-l+MGiTlf0nx0Yzvng2i8vijI1Cc\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 143,
    "path": "../public/_nuxt/Bb3VyOrJ.js"
  },
  "/_nuxt/BBC63Zyp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"192-u/DNb6mPvl6OehNMuqyAM/f/wv4\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 402,
    "path": "../public/_nuxt/BBC63Zyp.js"
  },
  "/_nuxt/Bbro7x7o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d8d-/FBKgXmZWQXKzYrhrdcJKhnjs5E\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 3469,
    "path": "../public/_nuxt/Bbro7x7o.js"
  },
  "/_nuxt/BC9e87tN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"192-u/DNb6mPvl6OehNMuqyAM/f/wv4\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 402,
    "path": "../public/_nuxt/BC9e87tN.js"
  },
  "/_nuxt/BCd6O0Sg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"74a-DGGtmmUrmOhJgWhponB0Z+ugi6Y\"",
    "mtime": "2025-10-06T06:23:28.756Z",
    "size": 1866,
    "path": "../public/_nuxt/BCd6O0Sg.js"
  },
  "/_nuxt/BdZK5ol9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"191-N9q7RYJWwDm2N3WwtRkzKPJLBDM\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 401,
    "path": "../public/_nuxt/BdZK5ol9.js"
  },
  "/_nuxt/BezyP9Ik.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18b-s3wMGuC1J/417qGOt/vuVuDlfkA\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 395,
    "path": "../public/_nuxt/BezyP9Ik.js"
  },
  "/_nuxt/BFa67amA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bb-xm4b7M94Rs9pGc4vIJvHepsbe70\"",
    "mtime": "2025-10-06T06:23:28.769Z",
    "size": 443,
    "path": "../public/_nuxt/BFa67amA.js"
  },
  "/_nuxt/BhS737Rf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"122-ezsaBei5TbXY/xVyP9fBLWLtPGM\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 290,
    "path": "../public/_nuxt/BhS737Rf.js"
  },
  "/_nuxt/BK3BKXp_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"da2-YRQHtzn7t04Wv3mVWJMMlTUtmUA\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 3490,
    "path": "../public/_nuxt/BK3BKXp_.js"
  },
  "/_nuxt/BldgfQBh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39c-EcqpY48ge0x+9tFjgU3cHJcaIqk\"",
    "mtime": "2025-10-06T06:23:28.834Z",
    "size": 924,
    "path": "../public/_nuxt/BldgfQBh.js"
  },
  "/_nuxt/blog.CCdl-Wlt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f62-lw7+HbQCg0pA0+ud8/nnewvWi+Q\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 3938,
    "path": "../public/_nuxt/blog.CCdl-Wlt.css"
  },
  "/_nuxt/blogs.CQ__YRxc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"591-3dY5nZPpWFT7u2LnIyB19IBstMQ\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 1425,
    "path": "../public/_nuxt/blogs.CQ__YRxc.css"
  },
  "/_nuxt/BP5BHz8s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e25-6Q7mUqVtbJ70UFYVkvMXQeqJ1sY\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 3621,
    "path": "../public/_nuxt/BP5BHz8s.js"
  },
  "/_nuxt/BSpiFC6O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"324-3Dm6BJtqQH8HF8jekjRulN6PEAM\"",
    "mtime": "2025-10-06T06:23:28.830Z",
    "size": 804,
    "path": "../public/_nuxt/BSpiFC6O.js"
  },
  "/_nuxt/BubNBoNI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ca4-/AKLJLeAYLyLU0NiRaPHqAVEHUM\"",
    "mtime": "2025-10-06T06:23:28.762Z",
    "size": 3236,
    "path": "../public/_nuxt/BubNBoNI.js"
  },
  "/_nuxt/BV2oXd3K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16a2-84entmWJA9/tR8Sr0wx8eUh7QoQ\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 5794,
    "path": "../public/_nuxt/BV2oXd3K.js"
  },
  "/_nuxt/BvMbRh0v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"28a80-qFs4+Sl00Rl1Cj9xKueheMcy364\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 166528,
    "path": "../public/_nuxt/BvMbRh0v.js"
  },
  "/_nuxt/BxPuVCHJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c3b-mDgh43n/tWmqgM0sMEiwY3iboNc\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 3131,
    "path": "../public/_nuxt/BxPuVCHJ.js"
  },
  "/_nuxt/BZGc2AH1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c3-0HCPciPcUUx/WfUBA2s05Z2ConQ\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 451,
    "path": "../public/_nuxt/BZGc2AH1.js"
  },
  "/_nuxt/C2OD4hRS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"912-YDSjDl7hiN7Hn9WK/m6LquQiZuw\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 2322,
    "path": "../public/_nuxt/C2OD4hRS.js"
  },
  "/_nuxt/C3uPW0Lk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"220-3LinKzt8J5Ul+69DGABXA5IlkbY\"",
    "mtime": "2025-10-06T06:23:28.769Z",
    "size": 544,
    "path": "../public/_nuxt/C3uPW0Lk.js"
  },
  "/_nuxt/C3u_9JfI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b0-J5tRGiBPc+I1u7z1pbXMcIjye40\"",
    "mtime": "2025-10-06T06:23:28.830Z",
    "size": 176,
    "path": "../public/_nuxt/C3u_9JfI.js"
  },
  "/_nuxt/C9OuJuhG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1a7-ikGM/q04PxiJ1MXnhxX6EymofnU\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 423,
    "path": "../public/_nuxt/C9OuJuhG.js"
  },
  "/_nuxt/CBWV9J4l.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"188-wZTcYJzgjPLAoyAAkei0kCYsGDQ\"",
    "mtime": "2025-10-06T06:23:28.830Z",
    "size": 392,
    "path": "../public/_nuxt/CBWV9J4l.js"
  },
  "/_nuxt/CfAs5YfG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30e-lb5+S7x15WsTLSLjCH57SCEjWOI\"",
    "mtime": "2025-10-06T06:23:28.836Z",
    "size": 782,
    "path": "../public/_nuxt/CfAs5YfG.js"
  },
  "/_nuxt/CfjNJk5s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15d-2UB7p+F2zEIw+ttco2EnRPGjXXw\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 349,
    "path": "../public/_nuxt/CfjNJk5s.js"
  },
  "/_nuxt/Cj9HpT-P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b38-bDx4m25j8zvnW6Nq4wstvBsxylQ\"",
    "mtime": "2025-10-06T06:23:28.764Z",
    "size": 11064,
    "path": "../public/_nuxt/Cj9HpT-P.js"
  },
  "/_nuxt/CM66V7X-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"199-SvwDz/slyLnWRhIlay52mOB+EZ4\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 409,
    "path": "../public/_nuxt/CM66V7X-.js"
  },
  "/_nuxt/CmjvKKbT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c98-f1Dsj26tzhwIo4Rny9ViRioszQ8\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 3224,
    "path": "../public/_nuxt/CmjvKKbT.js"
  },
  "/_nuxt/CnagHtPy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1af7-pX74WKqbQjmUCGBR8ecWR7eBkxA\"",
    "mtime": "2025-10-06T06:23:28.828Z",
    "size": 6903,
    "path": "../public/_nuxt/CnagHtPy.js"
  },
  "/_nuxt/contactUs.CdT0IIg-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c73-u+aEa/pRnfJK9/zMUTOvt9IR/LA\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 3187,
    "path": "../public/_nuxt/contactUs.CdT0IIg-.css"
  },
  "/_nuxt/Cpf2zzfz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c4-9k1vFXSyNrD2A/Ek6NexfJ6pvfg\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 1220,
    "path": "../public/_nuxt/Cpf2zzfz.js"
  },
  "/_nuxt/CqdTcey9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"689-195SBfUYO42aV/I0LlM5xgCgfD4\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 1673,
    "path": "../public/_nuxt/CqdTcey9.js"
  },
  "/_nuxt/CQMntAsz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39c-EcqpY48ge0x+9tFjgU3cHJcaIqk\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 924,
    "path": "../public/_nuxt/CQMntAsz.js"
  },
  "/_nuxt/Cqo5OoPV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2de-VVZQqHRemSxrv2EG7lF52Xe1Rqk\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 734,
    "path": "../public/_nuxt/Cqo5OoPV.js"
  },
  "/_nuxt/createUser.P-tew9jg.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"68-qd/Apz/itnpes2C+QLX6A6/Iy+c\"",
    "mtime": "2025-10-06T06:23:28.725Z",
    "size": 104,
    "path": "../public/_nuxt/createUser.P-tew9jg.css"
  },
  "/_nuxt/Cs8wvkxx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30e-JBvZb42peyktfWD0MuAG9ubCC9k\"",
    "mtime": "2025-10-06T06:23:28.837Z",
    "size": 782,
    "path": "../public/_nuxt/Cs8wvkxx.js"
  },
  "/_nuxt/CSy8M5EJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11b9c-ms/Owg9fNtLek8/H7A20h8e3zVE\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 72604,
    "path": "../public/_nuxt/CSy8M5EJ.js"
  },
  "/_nuxt/CUqAnn1-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34a-YpL6+g4RS3qC3yR4DobKte6EmF8\"",
    "mtime": "2025-10-06T06:23:28.835Z",
    "size": 842,
    "path": "../public/_nuxt/CUqAnn1-.js"
  },
  "/_nuxt/customers.C9fimz3h.png": {
    "type": "image/png",
    "etag": "\"1113-8Sw+riwXehWDz6VlxjaOWO5djSI\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 4371,
    "path": "../public/_nuxt/customers.C9fimz3h.png"
  },
  "/_nuxt/CUzKQDZ-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"84c-QoIQqddpkLM4y5oC9+5i9THdzN4\"",
    "mtime": "2025-10-06T06:23:28.836Z",
    "size": 2124,
    "path": "../public/_nuxt/CUzKQDZ-.js"
  },
  "/_nuxt/CwDBT7VU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5ac-crGwQekM+aPBFZuJaK+yWJQ4odg\"",
    "mtime": "2025-10-06T06:23:28.754Z",
    "size": 1452,
    "path": "../public/_nuxt/CwDBT7VU.js"
  },
  "/_nuxt/CxsULPwn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cad-0z57U3WbuAOqxWN6+rFNu4xyn84\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 3245,
    "path": "../public/_nuxt/CxsULPwn.js"
  },
  "/_nuxt/CYzRJ76E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"185-DPLVCRAgwOWXQAoeRwkGY4wtnEY\"",
    "mtime": "2025-10-06T06:23:28.756Z",
    "size": 389,
    "path": "../public/_nuxt/CYzRJ76E.js"
  },
  "/_nuxt/C_hh0GMk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"217-ioN2KDQ1AvsPV90VD95wlsCScOU\"",
    "mtime": "2025-10-06T06:23:28.830Z",
    "size": 535,
    "path": "../public/_nuxt/C_hh0GMk.js"
  },
  "/_nuxt/D1qQMKpX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24f-2x8Gf8CW+26QRl4biq0JxNg3MjY\"",
    "mtime": "2025-10-06T06:23:28.761Z",
    "size": 591,
    "path": "../public/_nuxt/D1qQMKpX.js"
  },
  "/_nuxt/D2yGY8oI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"253f8-Vbk1Fb9WeDg7NOP76fm/mUb9Iag\"",
    "mtime": "2025-10-06T06:23:28.756Z",
    "size": 152568,
    "path": "../public/_nuxt/D2yGY8oI.js"
  },
  "/_nuxt/D4O63Xiu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3426-35Zgh54u2aKtxHqRKt8I7KhI9YY\"",
    "mtime": "2025-10-06T06:23:28.829Z",
    "size": 13350,
    "path": "../public/_nuxt/D4O63Xiu.js"
  },
  "/_nuxt/D4YhPidA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c8-glxUgqvBYSG6uVdOSBVMA24W9E4\"",
    "mtime": "2025-10-06T06:23:28.836Z",
    "size": 712,
    "path": "../public/_nuxt/D4YhPidA.js"
  },
  "/_nuxt/D6d0l8lc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"43e2-I84B6zOmSysinPuF7AjsiuwdIto\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 17378,
    "path": "../public/_nuxt/D6d0l8lc.js"
  },
  "/_nuxt/D7pKjm75.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"257-7CjK5qAgO/7DQOWFIr3R2/CZ4OA\"",
    "mtime": "2025-10-06T06:23:28.763Z",
    "size": 599,
    "path": "../public/_nuxt/D7pKjm75.js"
  },
  "/_nuxt/D87Lym7O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20d-8WNLJ79o0AWi6tMZDdUTVerE/B0\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 525,
    "path": "../public/_nuxt/D87Lym7O.js"
  },
  "/_nuxt/D8zRGx3q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5c84-lWALVjMtfvV4Za6NQhaiotXfSVA\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 744580,
    "path": "../public/_nuxt/D8zRGx3q.js"
  },
  "/_nuxt/dashboard.Dp2iy9UC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1832-P4idH+lZW0kot2Rl0rs0bcUUlag\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 6194,
    "path": "../public/_nuxt/dashboard.Dp2iy9UC.css"
  },
  "/_nuxt/default.BnonK-Xt.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2db7-hZATbCdS4uFTwcRBsCItghJFda8\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 11703,
    "path": "../public/_nuxt/default.BnonK-Xt.css"
  },
  "/_nuxt/desta-logo.CC3sxGNG.png": {
    "type": "image/png",
    "etag": "\"1183c-UsRFLlNpRarPibiE7E7Al5DIdkM\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 71740,
    "path": "../public/_nuxt/desta-logo.CC3sxGNG.png"
  },
  "/_nuxt/DEVdalJe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5808-seAYN1NL/+hj0yFjHLgUaEs62+g\"",
    "mtime": "2025-10-06T06:23:28.764Z",
    "size": 22536,
    "path": "../public/_nuxt/DEVdalJe.js"
  },
  "/_nuxt/DGskFD2K.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2f-I0HygjtC1lwAgmnznlnnS3FzPG0\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 3375,
    "path": "../public/_nuxt/DGskFD2K.js"
  },
  "/_nuxt/DiazSPNi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30e-VEiIBenDiTbGXlVKJPBwhY2N+mU\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 782,
    "path": "../public/_nuxt/DiazSPNi.js"
  },
  "/_nuxt/Did6OeIM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41d-wKT35+Av1DnHaW6bhwi5izaEwOU\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 1053,
    "path": "../public/_nuxt/Did6OeIM.js"
  },
  "/_nuxt/Dj64-Dps.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"95-llD4RoI8xEQmWl8567YuLldyKpo\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 149,
    "path": "../public/_nuxt/Dj64-Dps.js"
  },
  "/_nuxt/DKhQZanE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18c-+FCfCRs9V4CljBLKN0XrkpLLeWA\"",
    "mtime": "2025-10-06T06:23:28.825Z",
    "size": 396,
    "path": "../public/_nuxt/DKhQZanE.js"
  },
  "/_nuxt/DKxDLS7Z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"30b-N9lsvUGL0jhgREEtcCnOSTo/pTY\"",
    "mtime": "2025-10-06T06:23:28.756Z",
    "size": 779,
    "path": "../public/_nuxt/DKxDLS7Z.js"
  },
  "/_nuxt/DL1NOejU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"665-bgvFfdj073aPr4kA2g4KVLO4o+c\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 1637,
    "path": "../public/_nuxt/DL1NOejU.js"
  },
  "/_nuxt/DMaZA-1P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14a9-ujqNLABX1r0b9n3AxNosFN5/06U\"",
    "mtime": "2025-10-06T06:23:28.764Z",
    "size": 5289,
    "path": "../public/_nuxt/DMaZA-1P.js"
  },
  "/_nuxt/DMefNGqW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b4-4KO1DpeSMTeebwk/6k7bKld5870\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 692,
    "path": "../public/_nuxt/DMefNGqW.js"
  },
  "/_nuxt/DNMj8ZNp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"113f-wabw+mBm/vbxUly9GZEWrtQgl6o\"",
    "mtime": "2025-10-06T06:23:28.755Z",
    "size": 4415,
    "path": "../public/_nuxt/DNMj8ZNp.js"
  },
  "/_nuxt/DNxsdfd4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e6-0x0g90MWTRLMHFOILe791Jmm6gs\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 742,
    "path": "../public/_nuxt/DNxsdfd4.js"
  },
  "/_nuxt/DOzSXsQd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b4-dpQbuSZ8rHPYsP8BPmBv4HZ/3So\"",
    "mtime": "2025-10-06T06:23:28.769Z",
    "size": 436,
    "path": "../public/_nuxt/DOzSXsQd.js"
  },
  "/_nuxt/DPgj991D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d54-kDhxCfWplWX3W/TVjBpP0FTYSa0\"",
    "mtime": "2025-10-06T06:23:28.750Z",
    "size": 3412,
    "path": "../public/_nuxt/DPgj991D.js"
  },
  "/_nuxt/DRbmtuxy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21d6-0UoYCuhE1/QPryfc+gaL9wQIniA\"",
    "mtime": "2025-10-06T06:23:28.752Z",
    "size": 8662,
    "path": "../public/_nuxt/DRbmtuxy.js"
  },
  "/_nuxt/Dt1TMWV7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"190-B4vq/lg7AAay6GtfIIJtjzOrpKE\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 400,
    "path": "../public/_nuxt/Dt1TMWV7.js"
  },
  "/_nuxt/DTDbk9YT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8af-UjyNnX+Txswc8foy9g2tOY4KPxc\"",
    "mtime": "2025-10-06T06:23:28.830Z",
    "size": 2223,
    "path": "../public/_nuxt/DTDbk9YT.js"
  },
  "/_nuxt/DTp1uD7J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c6b-D5HZ09Ty7ZaXy4WqenS1PEtJ/qs\"",
    "mtime": "2025-10-06T06:23:28.753Z",
    "size": 3179,
    "path": "../public/_nuxt/DTp1uD7J.js"
  },
  "/_nuxt/DuFCh3B3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dc3c-w0DZ6rDO55+0XEcDapO9m1QQCbs\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 56380,
    "path": "../public/_nuxt/DuFCh3B3.js"
  },
  "/_nuxt/DUVFtRxq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31cb-Dyzx86s/ethLzMO4cKfeesg3qyk\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 12747,
    "path": "../public/_nuxt/DUVFtRxq.js"
  },
  "/_nuxt/Dvb6cW6s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"96a-DL82NLyZCg3SRkt8h4NGB8T2yKI\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 2410,
    "path": "../public/_nuxt/Dvb6cW6s.js"
  },
  "/_nuxt/DVBg7Gme.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2999-9xE9rsRMh5RS9Noc6DRfqBt0z+Y\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 10649,
    "path": "../public/_nuxt/DVBg7Gme.js"
  },
  "/_nuxt/DvC_m8w5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ecb-LRb7Y/pn4r3nYQY+77IlDnBEjSA\"",
    "mtime": "2025-10-06T06:23:28.750Z",
    "size": 3787,
    "path": "../public/_nuxt/DvC_m8w5.js"
  },
  "/_nuxt/DVnsYIzQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fb-x8Db6y/dw7w0FF1MrWbJrmwzW9I\"",
    "mtime": "2025-10-06T06:23:28.767Z",
    "size": 507,
    "path": "../public/_nuxt/DVnsYIzQ.js"
  },
  "/_nuxt/DXoExQKN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d9b-0LTJnqxVsjPSHk0zLFquUtPK6JI\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 3483,
    "path": "../public/_nuxt/DXoExQKN.js"
  },
  "/_nuxt/DXxA_jwj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c3-zxjInUqcXIWdS6iHFsd5Vj9oGKs\"",
    "mtime": "2025-10-06T06:23:28.836Z",
    "size": 707,
    "path": "../public/_nuxt/DXxA_jwj.js"
  },
  "/_nuxt/DYTPtmZq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"de0-9uaYWHviG7C1YNJ8lTLg2MlNofE\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 3552,
    "path": "../public/_nuxt/DYTPtmZq.js"
  },
  "/_nuxt/entry.CYyqlPUe.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7df9-uNUf2t7AmJFQBDBcj3NGBABKTn4\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 32249,
    "path": "../public/_nuxt/entry.CYyqlPUe.css"
  },
  "/_nuxt/eom1lrmp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bf-RHOZcqiAuKYyJH1NbJupyk87g8E\"",
    "mtime": "2025-10-06T06:23:28.830Z",
    "size": 703,
    "path": "../public/_nuxt/eom1lrmp.js"
  },
  "/_nuxt/error-404.4oxyXxx0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-Nud+fczsEISIZfJaE5cVGR8qKic\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.4oxyXxx0.css"
  },
  "/_nuxt/error-500.CZqNkBuR.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-Ri+jM1T7rkunCBcNyJ0rTLFEHks\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.CZqNkBuR.css"
  },
  "/_nuxt/et sucar.CcdIKNQV.png": {
    "type": "image/png",
    "etag": "\"26e8-8cSfkBK+xCC6Dd3d8FWHkpiDDG4\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 9960,
    "path": "../public/_nuxt/et sucar.CcdIKNQV.png"
  },
  "/_nuxt/Gallery.BdNCLzk4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5ad-e+2cIPqKb39xeck0+kxgoX/duHc\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 1453,
    "path": "../public/_nuxt/Gallery.BdNCLzk4.css"
  },
  "/_nuxt/gin.C5DctQlR.png": {
    "type": "image/png",
    "etag": "\"16311-s08EC+tEic3SX3Aq32pdmdoULxQ\"",
    "mtime": "2025-10-06T06:23:28.718Z",
    "size": 90897,
    "path": "../public/_nuxt/gin.C5DctQlR.png"
  },
  "/_nuxt/harbel.rn9fIdyA.jpg": {
    "type": "image/jpeg",
    "etag": "\"105a-ztU92ieLvTw/AWExivKHBQ7H6cU\"",
    "mtime": "2025-10-06T06:23:28.723Z",
    "size": 4186,
    "path": "../public/_nuxt/harbel.rn9fIdyA.jpg"
  },
  "/_nuxt/index.B5mZA_e2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"224b-BixzohvYupJBRKnwi+1+GtG3V4E\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 8779,
    "path": "../public/_nuxt/index.B5mZA_e2.css"
  },
  "/_nuxt/index.C5a3rni7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8d8-hKDfBJtuXSbXeMz8zgxs4So3X78\"",
    "mtime": "2025-10-06T06:23:28.731Z",
    "size": 2264,
    "path": "../public/_nuxt/index.C5a3rni7.css"
  },
  "/_nuxt/index.CyfDSqUj.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"591-uzaMQjE1lx18JdR7In47CzZPSQg\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 1425,
    "path": "../public/_nuxt/index.CyfDSqUj.css"
  },
  "/_nuxt/KNhJHTLd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"626-L4xQTUbnm2Qa0ix27oM1oztdXoU\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 1574,
    "path": "../public/_nuxt/KNhJHTLd.js"
  },
  "/_nuxt/K_OqA4Gj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b0-yxd/vejlAB4ECIYrDxZQzP25oZg\"",
    "mtime": "2025-10-06T06:23:28.764Z",
    "size": 176,
    "path": "../public/_nuxt/K_OqA4Gj.js"
  },
  "/_nuxt/lDLtCx94.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18d-M6jpypHUJ5drnBhGI+Mj+CJSkgE\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 397,
    "path": "../public/_nuxt/lDLtCx94.js"
  },
  "/_nuxt/lion bank.Dc6JNwxT.png": {
    "type": "image/png",
    "etag": "\"412c-uz+X02mBikRSQpjj3PFQIvTI7Ag\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 16684,
    "path": "../public/_nuxt/lion bank.Dc6JNwxT.png"
  },
  "/_nuxt/MAlyjVHJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38f1-u+gI1hvSyQKZIw++jZcnIWWfPIQ\"",
    "mtime": "2025-10-06T06:23:28.761Z",
    "size": 14577,
    "path": "../public/_nuxt/MAlyjVHJ.js"
  },
  "/_nuxt/manager.oo6rFN-2.jpg": {
    "type": "image/jpeg",
    "etag": "\"8a75-bZiLBupqJfsEydsIT0qYnbl2Uh4\"",
    "mtime": "2025-10-06T06:23:28.720Z",
    "size": 35445,
    "path": "../public/_nuxt/manager.oo6rFN-2.jpg"
  },
  "/_nuxt/MazAvatar.gyFzuF0e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b3e-aGJKxMtxrc+fUBmSFVI0ByqCDo8\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 2878,
    "path": "../public/_nuxt/MazAvatar.gyFzuF0e.css"
  },
  "/_nuxt/MazBadge.CD9gqPz_.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"153c-oy0E7put3/+fvflw6pQqvh47V54\"",
    "mtime": "2025-10-06T06:23:28.749Z",
    "size": 5436,
    "path": "../public/_nuxt/MazBadge.CD9gqPz_.css"
  },
  "/_nuxt/MazBtn.D8JyV_rX.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"32e0-VP6l2LDf4/WRt4uJI/ZpkeGiFvw\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 13024,
    "path": "../public/_nuxt/MazBtn.D8JyV_rX.css"
  },
  "/_nuxt/MazCard.y7MorVNd.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"91f-A4UoGO4zNTz8radluJPaMib+nRM\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 2335,
    "path": "../public/_nuxt/MazCard.y7MorVNd.css"
  },
  "/_nuxt/MazCarousel.DzUhJHSy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"68f-DiHFQvK5sZkjNq4pXBU8pZ7P4zs\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 1679,
    "path": "../public/_nuxt/MazCarousel.DzUhJHSy.css"
  },
  "/_nuxt/MazCheckbox.BAcItvEI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"cfb-G+SWrY9vsLmZe1ROlfeoDfZHahk\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 3323,
    "path": "../public/_nuxt/MazCheckbox.BAcItvEI.css"
  },
  "/_nuxt/MazGallery.CNhmD3YQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"136a-B3GEkT/H1eXB7M9TazSclGIrHvc\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 4970,
    "path": "../public/_nuxt/MazGallery.CNhmD3YQ.css"
  },
  "/_nuxt/MazInput.B5WqqF6b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"194f-COG6fxvu+1W60nglaFzmUO4S+Lg\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 6479,
    "path": "../public/_nuxt/MazInput.B5WqqF6b.css"
  },
  "/_nuxt/MazLazyImg.BTxrWZBr.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"39a-MGjbf2a9OmtnrB3DDKMEKoNIINU\"",
    "mtime": "2025-10-06T06:23:28.748Z",
    "size": 922,
    "path": "../public/_nuxt/MazLazyImg.BTxrWZBr.css"
  },
  "/_nuxt/MazLoadingBar.Cnd5qhUA.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"39c-OhpE7uPZMqR9xuDwLzbVWHp6U4Q\"",
    "mtime": "2025-10-06T06:23:28.735Z",
    "size": 924,
    "path": "../public/_nuxt/MazLoadingBar.Cnd5qhUA.css"
  },
  "/_nuxt/MazSelect.B4izt4-t.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1030-tjNLQ22PDu0C06/EjyU1dvi2uO8\"",
    "mtime": "2025-10-06T06:23:28.735Z",
    "size": 4144,
    "path": "../public/_nuxt/MazSelect.B4izt4-t.css"
  },
  "/_nuxt/MazSpinner.BI6kEhM7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"36a-G1YFOLh6sPTQiqlVS+UJmZkIkpg\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 874,
    "path": "../public/_nuxt/MazSpinner.BI6kEhM7.css"
  },
  "/_nuxt/MazTableCell.NE7dxRuQ.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"271-4ljXtdJaRm30/Kg7jrmTXbq2Cao\"",
    "mtime": "2025-10-06T06:23:28.736Z",
    "size": 625,
    "path": "../public/_nuxt/MazTableCell.NE7dxRuQ.css"
  },
  "/_nuxt/MazTableRow.C3ga9Zey.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"23a-pinPUBJxfplaxdVixw3C0sN5zDQ\"",
    "mtime": "2025-10-06T06:23:28.737Z",
    "size": 570,
    "path": "../public/_nuxt/MazTableRow.C3ga9Zey.css"
  },
  "/_nuxt/MazTableTitle.D4AEydCy.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"278-XhCq3NKEnfKNPYfs2ob6wMjfUCY\"",
    "mtime": "2025-10-06T06:23:28.738Z",
    "size": 632,
    "path": "../public/_nuxt/MazTableTitle.D4AEydCy.css"
  },
  "/_nuxt/MazTableUi.CBy9kk-j.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1e8f-h1f5YPZoxI/FeKcnJL3ncIBf4UU\"",
    "mtime": "2025-10-06T06:23:28.733Z",
    "size": 7823,
    "path": "../public/_nuxt/MazTableUi.CBy9kk-j.css"
  },
  "/_nuxt/MazTransitionExpand.rurOJpD8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11e-5QZmmyKKY6AAk19Ig9GREsC/pz8\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 286,
    "path": "../public/_nuxt/MazTransitionExpand.rurOJpD8.css"
  },
  "/_nuxt/newsletters.C4e-_ErU.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"591-Aofqfqfal8uazy+BmnsPpmWOrBU\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 1425,
    "path": "../public/_nuxt/newsletters.C4e-_ErU.css"
  },
  "/_nuxt/newsletterSub.DoRiN8fs.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b08-zqIrueslUliZUJukPAJPpHslEtE\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 2824,
    "path": "../public/_nuxt/newsletterSub.DoRiN8fs.css"
  },
  "/_nuxt/niI0L0QW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"259-mJAbuERQke9P7HgJqHmm1XYEVeo\"",
    "mtime": "2025-10-06T06:23:28.829Z",
    "size": 601,
    "path": "../public/_nuxt/niI0L0QW.js"
  },
  "/_nuxt/ODP3Dv-c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4b20-YjnyKzm+I8QLOjIv5Zvo2RGWsYY\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 19232,
    "path": "../public/_nuxt/ODP3Dv-c.js"
  },
  "/_nuxt/oFgIfGzh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"41e-t7sGKIPNW1wm1HyftDfgveqGNro\"",
    "mtime": "2025-10-06T06:23:28.763Z",
    "size": 1054,
    "path": "../public/_nuxt/oFgIfGzh.js"
  },
  "/_nuxt/ourPartners.CbvizbML.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"503-aktm/ti90MCFMp4+OiLlFWlNkSc\"",
    "mtime": "2025-10-06T06:23:28.722Z",
    "size": 1283,
    "path": "../public/_nuxt/ourPartners.CbvizbML.css"
  },
  "/_nuxt/postBlog.Cf60xlg9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e-PJh8PNPnMk2NS4q2ODVi7aszyPg\"",
    "mtime": "2025-10-06T06:23:28.725Z",
    "size": 126,
    "path": "../public/_nuxt/postBlog.Cf60xlg9.css"
  },
  "/_nuxt/profile.Dk-d0G66.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2d64-3n15yTW7tcuWZiHrf//KtiZ/fvs\"",
    "mtime": "2025-10-06T06:23:28.725Z",
    "size": 11620,
    "path": "../public/_nuxt/profile.Dk-d0G66.css"
  },
  "/_nuxt/R5GAYhL3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"93-FhABTgC+CEGGcOpIprZ3r09zcnY\"",
    "mtime": "2025-10-06T06:23:28.765Z",
    "size": 147,
    "path": "../public/_nuxt/R5GAYhL3.js"
  },
  "/_nuxt/rJhHn0UL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18b-s3wMGuC1J/417qGOt/vuVuDlfkA\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 395,
    "path": "../public/_nuxt/rJhHn0UL.js"
  },
  "/_nuxt/sellingPrice.BXgqn2NY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5ea-Z3WdY0Qq/gNShCaNJ4UYtuSlSYE\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 1514,
    "path": "../public/_nuxt/sellingPrice.BXgqn2NY.css"
  },
  "/_nuxt/sendNewsletter.CAPM08y8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e-8VjI1iwuZ3pUrcxGvgUezw9+U3A\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 126,
    "path": "../public/_nuxt/sendNewsletter.CAPM08y8.css"
  },
  "/_nuxt/spa.BPhW0fAX.png": {
    "type": "image/png",
    "etag": "\"a602-M09TJcblF/yQ+k4RBPOcUUm2sFo\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 42498,
    "path": "../public/_nuxt/spa.BPhW0fAX.png"
  },
  "/_nuxt/SpBCGcZk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c08-p4VHvS13TWecCRkWSqQ+GLR1mFI\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 3080,
    "path": "../public/_nuxt/SpBCGcZk.js"
  },
  "/_nuxt/spinner.DeMEwSmp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8b-MqgdKF3jdOAuMtOIAfDW+SlJjCU\"",
    "mtime": "2025-10-06T06:23:28.734Z",
    "size": 139,
    "path": "../public/_nuxt/spinner.DeMEwSmp.css"
  },
  "/_nuxt/sub.xPY0VSP3.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"591-Pfft3HLl01hAZJLV75E3sSOrGDw\"",
    "mtime": "2025-10-06T06:23:28.725Z",
    "size": 1425,
    "path": "../public/_nuxt/sub.xPY0VSP3.css"
  },
  "/_nuxt/Tk8QGWZH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9b44b-WwB2O+4Yy1vZLdOLiWiY1dm+08M\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 635979,
    "path": "../public/_nuxt/Tk8QGWZH.js"
  },
  "/_nuxt/uozo.BFDBaPin.png": {
    "type": "image/png",
    "etag": "\"179e4-LaIclsWT6Nou6SsqHVLH4vkTYfU\"",
    "mtime": "2025-10-06T06:23:28.720Z",
    "size": 96740,
    "path": "../public/_nuxt/uozo.BFDBaPin.png"
  },
  "/_nuxt/utWGFxwf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b74-FghtBjfP7BhavMoo0fy1Mvcvpj8\"",
    "mtime": "2025-10-06T06:23:28.831Z",
    "size": 7028,
    "path": "../public/_nuxt/utWGFxwf.js"
  },
  "/_nuxt/V2OmrvXs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"209-IVyVfwrlwkSxytbUE+r1iGYlXVQ\"",
    "mtime": "2025-10-06T06:23:28.769Z",
    "size": 521,
    "path": "../public/_nuxt/V2OmrvXs.js"
  },
  "/_nuxt/vacancies.K8qdwKoC.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"591-eI79y0y7EdQOdn2yE2EsfHl2TM8\"",
    "mtime": "2025-10-06T06:23:28.725Z",
    "size": 1425,
    "path": "../public/_nuxt/vacancies.K8qdwKoC.css"
  },
  "/_nuxt/vacancy.Cr6-m3_A.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2942-SvV38pS/yS6KynkqP/iDH2VZlG0\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 10562,
    "path": "../public/_nuxt/vacancy.Cr6-m3_A.css"
  },
  "/_nuxt/vacancyPost.DQhD95Nm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e-m3XKKmzN7YFEb2tUV/lHzS28VRs\"",
    "mtime": "2025-10-06T06:23:28.726Z",
    "size": 126,
    "path": "../public/_nuxt/vacancyPost.DQhD95Nm.css"
  },
  "/_nuxt/vodka.Dimh6M34.png": {
    "type": "image/png",
    "etag": "\"11bf9-ZuDzG3YzpblT6Fqx3CWyP0H/SBg\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 72697,
    "path": "../public/_nuxt/vodka.Dimh6M34.png"
  },
  "/_nuxt/vueform.CNxK8xk6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10f3e-THLtHNhw5YS3SlABwUPEmErgstw\"",
    "mtime": "2025-10-06T06:23:28.721Z",
    "size": 69438,
    "path": "../public/_nuxt/vueform.CNxK8xk6.css"
  },
  "/_nuxt/WpjO98mn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"188-OSb/JMUJR0GdR+shS6VcMTwu07M\"",
    "mtime": "2025-10-06T06:23:28.829Z",
    "size": 392,
    "path": "../public/_nuxt/WpjO98mn.js"
  },
  "/_nuxt/Yi0MTRD8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c9c-W9K4dFpu92f5HnfBj7jyVnUNtf4\"",
    "mtime": "2025-10-06T06:23:28.822Z",
    "size": 3228,
    "path": "../public/_nuxt/Yi0MTRD8.js"
  },
  "/_nuxt/YYezWBmj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10df-JqEau1PnvraznjQkitIgr4CQw30\"",
    "mtime": "2025-10-06T06:23:28.751Z",
    "size": 4319,
    "path": "../public/_nuxt/YYezWBmj.js"
  },
  "/_nuxt/_id_.BDX6ZkEl.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"618-ZGMbV4HricjsjdGEabG8yOS9ogg\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 1560,
    "path": "../public/_nuxt/_id_.BDX6ZkEl.css"
  },
  "/_nuxt/_id_.DTUi4pD-.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3b4-rdFXksuEWqILu1DCPvssbmuJCvI\"",
    "mtime": "2025-10-06T06:23:28.724Z",
    "size": 948,
    "path": "../public/_nuxt/_id_.DTUi4pD-.css"
  },
  "/_nuxt/_z2O-mX-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"764-V1tYZzsR/9KtXhTs64eLYm/t7v4\"",
    "mtime": "2025-10-06T06:23:28.757Z",
    "size": 1892,
    "path": "../public/_nuxt/_z2O-mX-.js"
  },
  "/pictures/Gallery/test.jpg": {
    "type": "image/jpeg",
    "etag": "\"38a23-uk1bDorCQ520+8N5IT5grLUTlpw\"",
    "mtime": "2025-01-17T06:42:05.096Z",
    "size": 231971,
    "path": "../public/pictures/Gallery/test.jpg"
  },
  "/pictures/Gallery/test2.png": {
    "type": "image/png",
    "etag": "\"351be-CRc9p57Dbs6dtD7Yyr2z1KEtJ3o\"",
    "mtime": "2025-03-03T21:05:54.964Z",
    "size": 217534,
    "path": "../public/pictures/Gallery/test2.png"
  },
  "/pictures/icons/customers.png": {
    "type": "image/png",
    "etag": "\"1113-8Sw+riwXehWDz6VlxjaOWO5djSI\"",
    "mtime": "2025-03-18T17:25:56.000Z",
    "size": 4371,
    "path": "../public/pictures/icons/customers.png"
  },
  "/pictures/icons/employees.png": {
    "type": "image/png",
    "etag": "\"cba-oMQqhQpWanG+U5MGCOWFMlHDpYU\"",
    "mtime": "2025-03-18T17:43:16.000Z",
    "size": 3258,
    "path": "../public/pictures/icons/employees.png"
  },
  "/pictures/icons/market.png": {
    "type": "image/png",
    "etag": "\"47b-w29kn30A2Z3kgvwN0qumBz1ot68\"",
    "mtime": "2025-03-30T18:00:33.200Z",
    "size": 1147,
    "path": "../public/pictures/icons/market.png"
  },
  "/pictures/icons/plant.png": {
    "type": "image/png",
    "etag": "\"4bb-ra66rQNr6VFGa1DHvlfSgxBzMDE\"",
    "mtime": "2025-03-18T10:45:47.079Z",
    "size": 1211,
    "path": "../public/pictures/icons/plant.png"
  },
  "/pictures/icons/warehouse.png": {
    "type": "image/png",
    "etag": "\"2cc-K7xTfSUwi+qoERpduLyTpSZ/MZM\"",
    "mtime": "2025-03-18T17:44:34.000Z",
    "size": 716,
    "path": "../public/pictures/icons/warehouse.png"
  },
  "/pictures/partners/Awash Bank.jpg": {
    "type": "image/jpeg",
    "etag": "\"96233-kXUELLvur112aOhMbwzSY1gC5Ek\"",
    "mtime": "2025-03-06T07:46:09.316Z",
    "size": 614963,
    "path": "../public/pictures/partners/Awash Bank.jpg"
  },
  "/pictures/partners/et sucar.png": {
    "type": "image/png",
    "etag": "\"26e8-8cSfkBK+xCC6Dd3d8FWHkpiDDG4\"",
    "mtime": "2025-03-06T07:37:39.686Z",
    "size": 9960,
    "path": "../public/pictures/partners/et sucar.png"
  },
  "/pictures/partners/harbel.jpg": {
    "type": "image/jpeg",
    "etag": "\"105a-ztU92ieLvTw/AWExivKHBQ7H6cU\"",
    "mtime": "2025-03-06T09:15:31.407Z",
    "size": 4186,
    "path": "../public/pictures/partners/harbel.jpg"
  },
  "/pictures/partners/harbel.png": {
    "type": "image/png",
    "etag": "\"45f6-0oF8xHGgWBsaKBNAwCQdVSA3yCQ\"",
    "mtime": "2025-03-06T09:08:36.126Z",
    "size": 17910,
    "path": "../public/pictures/partners/harbel.png"
  },
  "/pictures/partners/lion bank.png": {
    "type": "image/png",
    "etag": "\"412c-uz+X02mBikRSQpjj3PFQIvTI7Ag\"",
    "mtime": "2025-03-06T07:47:53.249Z",
    "size": 16684,
    "path": "../public/pictures/partners/lion bank.png"
  },
  "/pictures/partners/spa.png": {
    "type": "image/png",
    "etag": "\"a602-M09TJcblF/yQ+k4RBPOcUUm2sFo\"",
    "mtime": "2025-03-06T07:44:14.602Z",
    "size": 42498,
    "path": "../public/pictures/partners/spa.png"
  },
  "/pictures/Products/alcohol 70.png": {
    "type": "image/png",
    "etag": "\"17965-x5LD0i1l1jN09LtuZtD79ODgWqs\"",
    "mtime": "2025-03-12T15:15:16.000Z",
    "size": 96613,
    "path": "../public/pictures/Products/alcohol 70.png"
  },
  "/pictures/Products/alcohol 95.png": {
    "type": "image/png",
    "etag": "\"135d3-n+qyrxZpvHZJ89ky94ZQnwcsXwo\"",
    "mtime": "2025-03-12T15:15:18.000Z",
    "size": 79315,
    "path": "../public/pictures/Products/alcohol 95.png"
  },
  "/pictures/Products/ananas.png": {
    "type": "image/png",
    "etag": "\"163d3-M4NEbkjDnR1G7DaANK8UuRgVHQs\"",
    "mtime": "2025-03-12T15:15:04.000Z",
    "size": 91091,
    "path": "../public/pictures/Products/ananas.png"
  },
  "/pictures/Products/apple.png": {
    "type": "image/png",
    "etag": "\"16b45-kDp7pYeW5POfnXncd9oFniCAiPs\"",
    "mtime": "2025-03-12T15:15:08.000Z",
    "size": 92997,
    "path": "../public/pictures/Products/apple.png"
  },
  "/pictures/Products/aprative.png": {
    "type": "image/png",
    "etag": "\"16af6-oGMiKkez/JagOyWxNa8sR+ymdns\"",
    "mtime": "2025-03-12T15:15:06.000Z",
    "size": 92918,
    "path": "../public/pictures/Products/aprative.png"
  },
  "/pictures/Products/coffee.png": {
    "type": "image/png",
    "etag": "\"16217-a3BFxQvpPqdu/iMXArRzRb1TZWw\"",
    "mtime": "2025-03-12T15:15:10.000Z",
    "size": 90647,
    "path": "../public/pictures/Products/coffee.png"
  },
  "/pictures/Products/cognac.png": {
    "type": "image/png",
    "etag": "\"14bf1-Sq1iZ5GiK0+vuaAJ5AZTOsi0llI\"",
    "mtime": "2025-03-12T15:15:04.000Z",
    "size": 84977,
    "path": "../public/pictures/Products/cognac.png"
  },
  "/pictures/Products/gin.png": {
    "type": "image/png",
    "etag": "\"16311-s08EC+tEic3SX3Aq32pdmdoULxQ\"",
    "mtime": "2025-03-12T15:15:02.000Z",
    "size": 90897,
    "path": "../public/pictures/Products/gin.png"
  },
  "/pictures/Products/lime.png": {
    "type": "image/png",
    "etag": "\"189f7-uOfXuPiecfFvhtX4o9YxxMeK6j8\"",
    "mtime": "2025-03-12T15:15:06.000Z",
    "size": 100855,
    "path": "../public/pictures/Products/lime.png"
  },
  "/pictures/Products/min alchol 70.png": {
    "type": "image/png",
    "etag": "\"128ac-oR6FRlmDltxxcm3hoF0NArcqPog\"",
    "mtime": "2025-03-12T15:15:12.000Z",
    "size": 75948,
    "path": "../public/pictures/Products/min alchol 70.png"
  },
  "/pictures/Products/min sanitaizer.png": {
    "type": "image/png",
    "etag": "\"fec8-bUU6L3OlQWgETTY4Xvryhh5pvHU\"",
    "mtime": "2025-03-12T15:15:14.000Z",
    "size": 65224,
    "path": "../public/pictures/Products/min sanitaizer.png"
  },
  "/pictures/Products/sanitizer.png": {
    "type": "image/png",
    "etag": "\"fe1d-t19J29tu/m7db0ZcjrX/OFwH9Zg\"",
    "mtime": "2025-03-12T15:15:14.000Z",
    "size": 65053,
    "path": "../public/pictures/Products/sanitizer.png"
  },
  "/pictures/Products/superment.png": {
    "type": "image/png",
    "etag": "\"13b46-jMXyQJrqrCc+Si8wzA28O8lZ6Dc\"",
    "mtime": "2025-03-12T15:15:08.000Z",
    "size": 80710,
    "path": "../public/pictures/Products/superment.png"
  },
  "/pictures/Products/uozo.png": {
    "type": "image/png",
    "etag": "\"179e4-LaIclsWT6Nou6SsqHVLH4vkTYfU\"",
    "mtime": "2025-03-12T15:15:02.000Z",
    "size": 96740,
    "path": "../public/pictures/Products/uozo.png"
  },
  "/pictures/Products/vodka.png": {
    "type": "image/png",
    "etag": "\"11bf9-ZuDzG3YzpblT6Fqx3CWyP0H/SBg\"",
    "mtime": "2025-03-12T15:15:16.000Z",
    "size": 72697,
    "path": "../public/pictures/Products/vodka.png"
  },
  "/pictures/Products/zebib.png": {
    "type": "image/png",
    "etag": "\"14794-vi6MwTuWug0/51BEpTKjcShoXug\"",
    "mtime": "2025-03-12T15:15:10.000Z",
    "size": 83860,
    "path": "../public/pictures/Products/zebib.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-EFg0NNFXoxfjIGEBxLRwhpsBJCc\"",
    "mtime": "2025-10-06T06:23:46.800Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/e09c8db9-fd28-4155-8e8b-d2b475afc691.json": {
    "type": "application/json",
    "etag": "\"8b-/ZVL+vOn3AkP4on4CwCvH0zaNS8\"",
    "mtime": "2025-10-06T06:23:46.801Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/e09c8db9-fd28-4155-8e8b-d2b475afc691.json"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath$1(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _i8IJd1 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _PKwZGl = defineEventHandler((event) => {
  const startTime = Date.now();
  event.node.res.on("finish", async () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const { method, url } = event.node.req;
    const statusCode = event.node.res.statusCode;
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const logEntry = `[${timestamp}] ${method} [${statusCode}] ${url} ${responseTime}ms
`;
    console.log(logEntry.trim());
    try {
      const logPath = join$1(process.cwd(), "server", "access.log");
      await appendFile(logPath, logEntry, "utf8");
    } catch (fsErr) {
      console.error("Failed to write access log:", fsErr);
    }
  });
});

const API_INFO = {
  "/api/test/GET": {
    method: "GET",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/test/post": {
    method: "POST",
    auth: true,
    restrict: ["admin"],
    fileUpload: [
      {
        fieldName: "coverImg",
        saveFileToFolder: "test",
        allowedTypes: [".jpg", ".jpeg", ".png", ".gif"],
        type: "image"
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "test", schemaName: "base" }
  },
  "/api/test/patch": {
    method: "patch",
    auth: false,
    restrict: [],
    fileUpload: [
      {
        fieldName: "coverImg",
        saveFileToFolder: "test",
        allowedTypes: [".jpg", ".jpeg", ".png", ".gif"],
        type: "image"
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "test", schemaName: "base" }
  },
  "/api/test/delete": {
    method: "delete",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  // ------------------------------user--------------------------
  "/api/user/logIn/POST": {
    method: "POST",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "user", schemaName: "loginSchema" }
  },
  "/api/user/logOut/POST": {
    method: "POST",
    auth: false,
    restrict: ["user"],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/user/signUp/POST": {
    method: "POST",
    auth: false,
    restrict: [],
    fileUpload: [
      {
        fieldName: "avatar",
        saveFileToFolder: "users",
        allowedTypes: [".jpg", ".jpeg", ".png", ".gif"],
        type: "image"
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "user", schemaName: "base" }
  },
  "/api/user/me/GET": {
    method: "GET",
    auth: true,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/user/[id]/GET": {
    method: "GET",
    auth: true,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/user/updatePassword/PATCH": {
    method: "PATCH",
    auth: true,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "user", schemaName: "updatePasswordSchema" }
  },
  "/api/user/updatePhoneNumber/PATCH": {
    method: "PATCH",
    auth: true,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "user", schemaName: "updatePhonenumberSchema" }
  },
  "/api/user/updateEmail/PATCH": {
    method: "PATCH",
    auth: true,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "user", schemaName: "updateEmailSchema" }
  },
  "/api/user/me/PATCH": {
    method: "PATCH",
    auth: true,
    restrict: [],
    fileUpload: [
      {
        fieldName: "avatar",
        saveFileToFolder: "users",
        allowedTypes: [".jpg", ".jpeg", ".png", ".gif"],
        type: "image"
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "user", schemaName: "updateSchema" }
  },
  "/api/user/me/DELETE": {
    method: "DELETE",
    auth: true,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/user/[id]/DELETE": {
    method: "DELETE",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/user/GET": {
    method: "GET",
    auth: false,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: {}
  },
  // ------------------------------blog--------------------------
  "/api/blog/GET": {
    method: "GET",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/blog/postBlog/POST": {
    method: "POST",
    auth: true,
    restrict: [],
    fileUpload: [
      {
        fieldName: "coverImg",
        saveFileToFolder: "blog",
        allowedTypes: [".jpg", ".jpeg", ".png", ".gif"],
        type: "file",
        isarray: false
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "blog", schemaName: "base" },
    addCreatedBy: true
  },
  "/api/blog/[id]/PATCH": {
    method: "PATCH",
    auth: true,
    restrict: ["admin"],
    fileUpload: [
      {
        fieldName: "coverImg",
        saveFileToFolder: "blog",
        allowedTypes: [".jpg", ".jpeg", ".png", ".gif"],
        type: "file",
        isarray: false
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "blog", schemaName: "updateSchema" },
    addUpdatedBy: true
  },
  "/api/blog/[id]/DELETE": {
    method: "DELETE",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: {}
  },
  // ------------------------------vacancy--------------------------
  "/api/vacancy/GET": {
    method: "GET",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/vacancy/POST": {
    method: "POST",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "vacancy", schemaName: "base" },
    addCreatedBy: true
  },
  "/api/vacancy/[id]/PATCH": {
    method: "PATCH",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "vacancy", schemaName: "updateSchema" },
    addUpdatedBy: true
  },
  "/api/vacancy/DELETE": {
    method: "DELETE",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/vacancy/apply/POST": {
    method: "POST",
    auth: false,
    restrict: [],
    fileUpload: [
      {
        fieldName: "uploaded_files",
        saveFileToFolder: "vacancyApplicationFiles",
        allowedTypes: [".pdf"],
        type: "file",
        isarray: true
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "vacancyApplication", schemaName: "base" }
  },
  "/api/vacancy/applications/GET": {
    method: "GET",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/vacancy/application/[id]DELETE": {
    method: "DELETE",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: {}
  },
  // ------------------------------newsletterSub--------------------------
  "/api/newsletter/sub/GET": {
    method: "GET",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/newsletterSub/POST": {
    method: "GET",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "newsletterSub", schemaName: "base" }
  },
  "/api/newsletter/sub/confirm/[id]/PATCH": {
    method: "PATCH",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "newsletterSub", schemaName: "updateSchema" }
  },
  "/api/newsletter/sub/delete/[id]/PATCH": {
    method: "PATCH",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "newsletterSub", schemaName: "updateSchema" }
  },
  // ------------------------------newsletter--------------------------
  "/api/newsletter/GET": {
    method: "GET",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: {}
  },
  "/api/newsletter/POST": {
    method: "POST",
    auth: true,
    restrict: ["admin"],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "newsletter", schemaName: "base" }
  },
  // ------------------------------contact Us--------------------------
  "/api/contactUS/POST": {
    method: "POST",
    auth: false,
    restrict: [],
    fileUpload: [],
    reqBodyValidation: { bool: true, modelRef: "contact", schemaName: "base" }
  },
  // ------------------------------orderMail--------------------------
  "/api/order/POST": {
    method: "POST",
    auth: false,
    restrict: [],
    fileUpload: [
      {
        fieldName: "FileAttachments",
        saveFileToFolder: "order",
        allowedTypes: [".pdf"],
        type: "file",
        isarray: true
      }
    ],
    reqBodyValidation: { bool: true, modelRef: "order", schemaName: "base" }
  }
};

const _icGzVu = defineEventHandler(async (event) => {
  const url = getRequestURL(event).pathname;
  if (url.includes("/api/")) {
    const apiref = getHeader(event, "apiref");
    if (!apiref) throw createError$1({ statusCode: 400, message: "Missing apiref header" });
    const apiConfig = API_INFO[apiref];
    if (!apiConfig) throw createError$1({ statusCode: 404, message: "API route config not found" });
    event.context.APIINFO = API_INFO[getRequestHeaders(event).apiref];
  }
});

function withErrorHandler(handler) {
  return defineEventHandler(async (event) => {
    var _a, _b, _c, _d;
    try {
      let resObj = await handler(event);
      return resObj;
    } catch (error) {
      const err = {
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || "Internal Server Error",
        message: error
      };
      if (((_b = (_a = err.message) == null ? void 0 : _a.parent) == null ? void 0 : _b.code) === "ER_DUP_ENTRY") {
        throw createError$1({
          statusCode: 400,
          message: JSON.stringify((_d = (_c = err.message) == null ? void 0 : _c.parent) == null ? void 0 : _d.sqlMessage)
        });
      }
      throw createError$1({
        statusCode: err.statusCode,
        statusMessage: err.statusMessage,
        message: err.message
      });
    }
  });
}

const _6Su_tm = withErrorHandler(async (event) => {
  var _a;
  const url = getRequestURL(event).pathname;
  if (((_a = event.context.APIINFO) == null ? void 0 : _a.auth) && url.includes("/api/")) {
    const token = getCookie(event, "jwt");
    if (!token) {
      throw createError$1({
        statusCode: 401,
        statusMessage: "Please provide access token! You need to be logged in"
      });
    }
    const verifyAsync = promisify(jwt.verify);
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);
    const user = await modelsRef.user.model.findByPk(decoded.id);
    if (!user) {
      throw createError$1({
        statusCode: 401,
        statusMessage: "the token owner (user) does n't exist anymore"
      });
    }
    if (user.passwordChangedAt) {
      const tokenIssuedAt = decoded.iat;
      const pwdChangedAt = Math.floor(user.passwordChangedAt.getTime() / 1e3);
      if (tokenIssuedAt < pwdChangedAt) {
        throw createError$1({
          statusCode: 401,
          statusMessage: "Password was changed recently. Please login again"
        });
      }
    }
    event.context.user = user;
  }
});

const _SLcD4M = withErrorHandler(async (event) => {
  var _a, _b, _c, _d;
  const url = getRequestURL(event).pathname;
  if (url.includes("/api/") && ((_a = event.context.APIINFO) == null ? void 0 : _a.restrict.length) > 0 && ((_b = event.context.APIINFO) == null ? void 0 : _b.auth)) {
    const currentUser = event.context.user;
    if (!currentUser) {
      throw createError$1({
        statusCode: 401,
        statusMessage: "Please log in to continue"
      });
    }
    const user = await modelsRef.user.model.findByPk(currentUser.id);
    if (!user) {
      throw createError$1({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    const userRoles = user.role;
    const hasPermission = (_c = event.context.APIINFO) == null ? void 0 : _c.restrict.some(
      (requiredRole) => userRoles.includes(requiredRole)
    );
    if (!hasPermission) {
      throw createError$1({
        statusCode: 403,
        statusMessage: `Forbidden: Only ${(_d = event.context.APIINFO) == null ? void 0 : _d.restrict.join(", ")} can perform this action`
      });
    }
  }
});

const _gSVBrw = withErrorHandler(async (event) => {
  const url = getRequestURL(event).pathname;
  if (url.includes("/api/")) {
    const apiConfig = event.context.APIINFO;
    const fileUploadConfigs = apiConfig.fileUpload || [];
    const expectsFileUpload = fileUploadConfigs.length > 0;
    let form;
    if (expectsFileUpload) {
      form = await readMultipartFormData(event);
      if (!form) throw createError$1({ statusCode: 400, message: "No form data found" });
    }
    const __filename = fileURLToPath(globalThis._importMeta_.url);
    const __dirname = path.dirname(__filename);
    let publicDir;
    if (true) {
      publicDir = path.join(process.cwd(), "public");
    }
    const nonFileFields = {};
    const uploadConfigMap = /* @__PURE__ */ new Map();
    fileUploadConfigs.forEach((config) => {
      uploadConfigMap.set(config.fieldName, config);
    });
    if (form) {
      for (const part of form) {
        if (part.filename) {
          const config = uploadConfigMap.get(part.name);
          if (!config) {
            throw createError$1({
              statusCode: 400,
              message: `Unexpected file upload field: ${part.name}`
            });
          }
          const ext = path.extname(part.filename).toLowerCase();
          if (config.allowedTypes && !config.allowedTypes.includes(ext)) {
            throw createError$1({
              statusCode: 400,
              message: `Invalid file type for ${part.name}. Allowed: ${config.allowedTypes.join(", ")}`
            });
          }
          const saveDir = path.join(publicDir, config.saveFileToFolder);
          await fs$1.mkdir(saveDir, { recursive: true });
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const basename = path.basename(part.filename, ext);
          const newFilename = `${basename}_${uniqueSuffix}${ext}`.replace(/\s+/g, "_");
          const filePath = path.join(saveDir, newFilename);
          let fileBuffer = part.data;
          if (!event.context.uploadedFiles) event.context.uploadedFiles = [];
          event.context.uploadedFiles.push({
            fieldName: part.name,
            buffer: fileBuffer,
            filename: newFilename,
            filePath,
            config
          });
          if (nonFileFields[part.name]) {
            if (Array.isArray(nonFileFields[part.name])) {
              nonFileFields[part.name].push(newFilename);
            }
          } else {
            if (config.isarray) {
              nonFileFields[part.name] = [newFilename];
            } else nonFileFields[part.name] = newFilename;
          }
        } else {
          const value = part.data.toString("utf-8");
          const arrayMatch = part.name.match(/^(.+)\[(\d+)\]$/);
          if (arrayMatch) {
            const field = arrayMatch[1];
            const index = parseInt(arrayMatch[2], 10);
            if (!nonFileFields[field]) nonFileFields[field] = [];
            nonFileFields[field][index] = value;
          } else {
            nonFileFields[part.name] = value;
          }
        }
      }
    }
    if (Object.keys(nonFileFields).length > 0) event.context.modifiedBody = nonFileFields;
  }
});

const _5pFL7p = withErrorHandler(async (event) => {
  const url = getRequestURL(event).pathname;
  if (url.includes("/api/")) {
    let result;
    if (event.context.APIINFO.reqBodyValidation.bool) {
      const modelRef = event.context.APIINFO.reqBodyValidation.modelRef;
      const schemaName = event.context.APIINFO.reqBodyValidation.schemaName;
      let validationSchema = modelsRef[modelRef].zobSchema[schemaName];
      if (event.context.modifiedBody) {
        result = validationSchema.safeParse(event.context.modifiedBody);
      } else {
        result = await readValidatedBody(event, (body) => validationSchema.safeParse(body));
      }
      if (!(result == null ? void 0 : result.success)) {
        throw createError$1({
          statusCode: 400,
          statusMessage: "request body validation failed",
          message: JSON.stringify(result.error.issues)
        });
      }
    }
  }
});

const _i_3bfh = withErrorHandler(async (event) => {
  const url = getRequestURL(event).pathname;
  if (url.includes("/api/")) {
    const apiConfig = event.context.APIINFO;
    if (!event.context.modifiedBody) {
      if (["POST", "PUT", "PATCH"].includes(event.node.req.method)) {
        event.context.modifiedBody = await readBody(event);
      } else {
        event.context.modifiedBody = {};
      }
    }
    if (apiConfig.addCreatedBy && event.node.req.method === "POST") {
      event.context.modifiedBody.createdBy = event.context.user.id;
    }
    if (apiConfig.addUpdatedBy && ["PUT", "PATCH"].includes(event.node.req.method)) {
      event.context.modifiedBody.updatedBy = event.context.user.id;
    }
  }
});

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_NivGBI = () => import('../routes/api/_..._.mjs');
const _lazy_956Tkm = () => import('../routes/api/blog/_id_.delete.mjs');
const _lazy_xl1rHC = () => import('../routes/api/blog/_id_.patch.mjs');
const _lazy_S8cvYw = () => import('../routes/api/index.get.mjs');
const _lazy_R_duiN = () => import('../routes/api/blog/postBlog.post.mjs');
const _lazy_KrPXqg = () => import('../routes/api/contactUs.post.mjs');
const _lazy_YZVlQ6 = () => import('../routes/api/index.get2.mjs');
const _lazy_TBxRms = () => import('../routes/api/index.post.mjs');
const _lazy_ENKRst = () => import('../routes/api/newsletter/sub/confirm/_id_.patch.mjs');
const _lazy_1P1BQL = () => import('../routes/api/newsletter/sub/delete/_id_.patch.mjs');
const _lazy_JFmQNM = () => import('../routes/api/newsletter/index.get.mjs');
const _lazy_tKxFfo = () => import('../routes/api/newsletter/index.post.mjs');
const _lazy_ycnWcf = () => import('../routes/api/order.post.mjs');
const _lazy_freNiD = () => import('../routes/api/test/_id_.delete.mjs');
const _lazy_KoQ9_e = () => import('../routes/api/test/_id_.patch.mjs');
const _lazy_rf4mK5 = () => import('../routes/api/index.get3.mjs');
const _lazy_pmrIvr = () => import('../routes/api/index.post2.mjs');
const _lazy_O4Y_wy = () => import('../routes/api/user/_id_.delete.mjs');
const _lazy_nks5lY = () => import('../routes/api/user/_id_.get.mjs');
const _lazy_5qLCny = () => import('../routes/api/index.get4.mjs');
const _lazy_ku1_XA = () => import('../routes/api/user/logIn.post.mjs');
const _lazy_HUQHoe = () => import('../routes/api/user/logOut.post.mjs');
const _lazy_3m2Cfe = () => import('../routes/api/user/me.delete.mjs');
const _lazy_60MBDH = () => import('../routes/api/user/me.get.mjs');
const _lazy_INHgtr = () => import('../routes/api/user/me.patch.mjs');
const _lazy_J6rv5E = () => import('../routes/api/user/signUp.post.mjs');
const _lazy_CESnnd = () => import('../routes/api/user/updateEmail.patch.mjs');
const _lazy_cChDTT = () => import('../routes/api/user/updatePassword.patch.mjs');
const _lazy_h3yGbk = () => import('../routes/api/user/updatePhoneNumber.patch.mjs');
const _lazy_ss4ttV = () => import('../routes/api/vacancy/_id_.delete.mjs');
const _lazy_yNi90r = () => import('../routes/api/vacancy/_id_.patch.mjs');
const _lazy_1PUP_o = () => import('../routes/api/vacancy/application/_id_.delete.mjs');
const _lazy_drMveg = () => import('../routes/api/vacancy/applications.get.mjs');
const _lazy_zZLtJG = () => import('../routes/api/vacancy/apply.post.mjs');
const _lazy_CuD4gc = () => import('../routes/api/index.get5.mjs');
const _lazy_9XRVKB = () => import('../routes/api/index.post3.mjs');
const _lazy_dfwqDV = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _i8IJd1, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _PKwZGl, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _icGzVu, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _6Su_tm, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _SLcD4M, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _gSVBrw, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _5pFL7p, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _i_3bfh, lazy: false, middleware: true, method: undefined },
  { route: '/api/**', handler: _lazy_NivGBI, lazy: true, middleware: false, method: undefined },
  { route: '/api/blog/:id', handler: _lazy_956Tkm, lazy: true, middleware: false, method: "delete" },
  { route: '/api/blog/:id', handler: _lazy_xl1rHC, lazy: true, middleware: false, method: "patch" },
  { route: '/api/blog', handler: _lazy_S8cvYw, lazy: true, middleware: false, method: "get" },
  { route: '/api/blog/postBlog', handler: _lazy_R_duiN, lazy: true, middleware: false, method: "post" },
  { route: '/api/contactUs', handler: _lazy_KrPXqg, lazy: true, middleware: false, method: "post" },
  { route: '/api/newsletter', handler: _lazy_YZVlQ6, lazy: true, middleware: false, method: "get" },
  { route: '/api/newsletter', handler: _lazy_TBxRms, lazy: true, middleware: false, method: "post" },
  { route: '/api/newsletter/sub/confirm/:id', handler: _lazy_ENKRst, lazy: true, middleware: false, method: "patch" },
  { route: '/api/newsletter/sub/delete/:id', handler: _lazy_1P1BQL, lazy: true, middleware: false, method: "patch" },
  { route: '/api/newsletter/sub', handler: _lazy_JFmQNM, lazy: true, middleware: false, method: "get" },
  { route: '/api/newsletter/sub', handler: _lazy_tKxFfo, lazy: true, middleware: false, method: "post" },
  { route: '/api/order', handler: _lazy_ycnWcf, lazy: true, middleware: false, method: "post" },
  { route: '/api/test/:id', handler: _lazy_freNiD, lazy: true, middleware: false, method: "delete" },
  { route: '/api/test/:id', handler: _lazy_KoQ9_e, lazy: true, middleware: false, method: "patch" },
  { route: '/api/test', handler: _lazy_rf4mK5, lazy: true, middleware: false, method: "get" },
  { route: '/api/test', handler: _lazy_pmrIvr, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/:id', handler: _lazy_O4Y_wy, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/:id', handler: _lazy_nks5lY, lazy: true, middleware: false, method: "get" },
  { route: '/api/user', handler: _lazy_5qLCny, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/logIn', handler: _lazy_ku1_XA, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/logOut', handler: _lazy_HUQHoe, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/me', handler: _lazy_3m2Cfe, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/me', handler: _lazy_60MBDH, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/me', handler: _lazy_INHgtr, lazy: true, middleware: false, method: "patch" },
  { route: '/api/user/signUp', handler: _lazy_J6rv5E, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/updateEmail', handler: _lazy_CESnnd, lazy: true, middleware: false, method: "patch" },
  { route: '/api/user/updatePassword', handler: _lazy_cChDTT, lazy: true, middleware: false, method: "patch" },
  { route: '/api/user/updatePhoneNumber', handler: _lazy_h3yGbk, lazy: true, middleware: false, method: "patch" },
  { route: '/api/vacancy/:id', handler: _lazy_ss4ttV, lazy: true, middleware: false, method: "delete" },
  { route: '/api/vacancy/:id', handler: _lazy_yNi90r, lazy: true, middleware: false, method: "patch" },
  { route: '/api/vacancy/application/:id', handler: _lazy_1PUP_o, lazy: true, middleware: false, method: "delete" },
  { route: '/api/vacancy/applications', handler: _lazy_drMveg, lazy: true, middleware: false, method: "get" },
  { route: '/api/vacancy/apply', handler: _lazy_zZLtJG, lazy: true, middleware: false, method: "post" },
  { route: '/api/vacancy', handler: _lazy_CuD4gc, lazy: true, middleware: false, method: "get" },
  { route: '/api/vacancy', handler: _lazy_9XRVKB, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_dfwqDV, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_dfwqDV, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return O(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { $fetch as $, isEqual as A, getContext as B, getCookie as C, deleteCookie as D, Email as E, createHooks as F, executeAsync as G, toRouteMatcher as H, createRouter$1 as I, defu as J, hash$1 as K, parseQuery as L, withTrailingSlash as M, withoutTrailingSlash as N, trapUnhandledNodeErrors as a, useNitroApp as b, defineEventHandler as c, destr as d, createError$1 as e, setCookie as f, setResponseStatus as g, getQuery as h, getResponseStatusText as i, joinRelativeURL as j, getResponseStatus as k, defineRenderHandler as l, modelsRef as m, getRouteRules as n, hasProtocol as o, isScriptProtocol as p, joinURL as q, klona as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, withQuery as v, withErrorHandler as w, sanitizeStatusCode as x, parse as y, getRequestHeader as z };
//# sourceMappingURL=nitro.mjs.map
