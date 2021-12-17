import { parsePath, createMemoryHistory } from "history";
import { parseHTML } from "linkedom";

const MAIN = "main";
const POP = "popstate";
const BODY = `<body><${MAIN}></${MAIN}></body>`;

const parseToHash = (url) => {
  const path = parsePath(url);
  return path;
};

const proxyGet = (object, key, handler) => {
  return new Proxy(object, {
    get(target, prop, _) {
      if (prop !== key) {
        return Reflect.get(target, prop, _);
      }
      return handler(target);
    },
  });
};

const proxyApplyUrl = (fn) => {
  return new Proxy(fn, {
    apply(fnTarget, _this, [state, _title, url]) {
      return fnTarget(parseToHash(url), state);
    },
  });
};

const makeGlobalDocument = () => {
  const history = createMemoryHistory();
  const defaultView = parseHTML(BODY);
  const { document } = defaultView;
  const popEvent = document.createEvent("CustomEvent");
  popEvent.initCustomEvent(POP, false, false, null);
  history.listen(() => document.dispatchEvent(popEvent));
  return proxyGet(document, "defaultView", (target) => {
    const win = proxyGet(target.defaultView, "history", () => {
      return new Proxy(history, {
        get(targetHistory, prop, _) {
          switch (prop) {
            case "pushState":
              return proxyApplyUrl(targetHistory.push);
            case "replaceState":
              return proxyApplyUrl(targetHistory.replace);
            default:
              return Reflect.get(targetHistory, prop, _);
          }
        },
      });
    });
    return proxyGet(win, "location", (_) => history.location);
  });
};

class ExecSteps {
  
  constructor ({listen, location}) {
    this.listen = listen
    this.ctx = {
      location 
    }
  }
  steps (steps, history, done) {
    steps.reduce(async (context, step) => {
      this.ctx = await context;
      return await new Promise((resolve) => {
        this.listen((result) => {
          resolve({
            ...this.ctx, ...result
          });
        });
        step(this.ctx)
      });
    }, this.ctx).then((result) => {
      done(result)
    }).catch((e) => {
      done(e)
    });
  }
}

export function reset() {
  const newGlobal = {
    document: makeGlobalDocument()
  };
  global.document = newGlobal.document;
  const window = document.defaultView;
  const {listen, location} = window.history;

  const exec = new ExecSteps({listen, location})
  global.execSteps = exec.steps.bind(exec)
}
