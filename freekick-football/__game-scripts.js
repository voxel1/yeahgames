var RotaObjecto = pc.createScript("rotaObjecto");
RotaObjecto.attributes.add("speed", {
  type: "number",
  default: 5
}), RotaObjecto.prototype.initialize = function() {}, RotaObjecto.prototype.update = function(t) {
  this.entity.rotateLocal(0, this.speed, 0)
};
var MueveScoreHud = pc.createScript("mueveScoreHud");
MueveScoreHud.attributes.add("tipo", {
  type: "string",
  default: "",
  title: "tipo"
}), MueveScoreHud.prototype.initialize = function() {
  this.tween = null;
  var e = this.entity.getLocalPosition();
  this.origen = new pc.Vec3(e.x, e.y, e.z);
  window.innerWidth, window.innerHeight;
  isMobile.any() || (this.app.graphicsDevice.width, this.app.graphicsDevice.height);
  var t = _control.screen2D.screen.scaleBlend;
  _control.screen2D.screen.scaleBlend, _control.screen2D.screen.referenceResolution.x, _control.screen2D.screen.resolution.x, _control.screen2D.screen.referenceResolution.y, _control.screen2D.screen.resolution.y;
  this.destino = new pc.Vec3(0, 0, 0), this.entity.translateLocal(0, 0, 0)
}, MueveScoreHud.prototype.update = function(e) {}, MueveScoreHud.prototype.pone = function() {
  this.tween = this.entity.tween(this.entity.getLocalPosition()).to(this.destino, .6, pc.SineOut), this.tween.start()
}, MueveScoreHud.prototype.saca = function() {
  this.tween = this.entity.tween(this.entity.getLocalPosition()).to(this.origen, .5, pc.SineIn), this.tween.start()
};
var AnimaMsg = pc.createScript("animaMsg");
AnimaMsg.attributes.add("destinox", {
  type: "number",
  default: 0,
  title: "destinox"
}), AnimaMsg.attributes.add("destinoy", {
  type: "number",
  default: 0,
  title: "destinoy"
}), AnimaMsg.attributes.add("destinoz", {
  type: "number",
  default: 0,
  title: "destinoz"
}), AnimaMsg.attributes.add("tiempo", {
  type: "number",
  default: .6,
  title: "tiempo"
}), AnimaMsg.attributes.add("delaySaca", {
  type: "number",
  default: 1.8,
  title: "delaySaca"
}), AnimaMsg.attributes.add("traducir", {
  type: "number",
  default: 1,
  title: "traducir"
}), AnimaMsg.attributes.add("boton", {
  type: "asset",
  assetType: "texture",
  array: !0,
  title: "boton"
}), AnimaMsg.attributes.add("tipoTween", {
  type: "string",
  default: "BounceOut",
  title: "tipoTween"
}), AnimaMsg.prototype.initialize = function() {
  this.tween = null, this.mc = this.entity;
  var t = this.entity.getLocalPosition();
  switch (this.origen = new pc.Vec3(t.x, t.y, t.z), this.destino = new pc.Vec3(this.destinox, this.destinoy, this.destinoz), this.terminado = !1, this.enReproduccion = !1, this.tipoTween) {
    case "BounceOut":
      this.tipoTween = pc.BounceOut;
      break;
    case "SineIn":
      this.tipoTween = pc.SineIn;
      break;
    case "SineOut":
      this.tipoTween = pc.SineOut;
      break;
    case "SineInOut":
      this.tipoTween = pc.SineInOut
  }
}, AnimaMsg.prototype.clickBoton = function(t, e, i) {
  null != e ? this.entity.element.texture = this.boton[i].resource : (this.entity.element.texture = this.boton[1].resource, setTimeout(this.restauraBoton.bind(this, t), 180))
}, AnimaMsg.prototype.restauraBoton = function(t) {
  this.entity.element.texture = this.boton[0].resource, t()
}, AnimaMsg.prototype.pone1Vez = function(t) {
  this.entity.setLocalScale(1, 0, 1), this.entity.enabled = !0, this.tween = this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(1, 1, 1), this.tiempo, this.tipoTween), null != t && this.tween.onComplete((() => {
    t()
  })), this.tween.start()
}, AnimaMsg.prototype.pone1VezMSG = function(t) {
  this.entity.setLocalScale(.15, 0, .1), this.entity.enabled = !0, this.tween = this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(.15, .1, .1), this.tiempo, this.tipoTween), null != t && this.tween.onComplete((() => {})), this.tween.start()
}, AnimaMsg.prototype.pone = function(t) {
  this.entity.setLocalScale(1, 0, 1), this.tween = this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(1, 1, 1), this.tiempo, this.tipoTween).onComplete((() => {
    this.saca(t)
  })), this.tween.start()
}, AnimaMsg.prototype.saca = function(t) {
  this.tween = this.entity.tween(this.entity.getLocalScale()).to(new pc.Vec3(1, 0, 1), this.tiempo - .1, this.tipoTween), null != t && this.tween.onComplete((() => {
    t()
  })), this.tween.delay(this.delaySaca), this.tween.start()
}, AnimaMsg.prototype.poneMueve = function(t, e) {
  if (null != this.origen) {
    var i = this.tiempo;
    null != e && (i = e), this.entity.setLocalPosition(this.origen.x, this.origen.y, this.origen.z);
    var n = this.entity.getLocalPosition(),
      s = new pc.Vec3(this.destinox, this.destinoy, this.destinoz),
      o = new pc.Vec3(n.x + s.x, n.y + s.y, n.z + s.z);
    this.entity.setLocalPosition(o.x, o.y, o.z), this.entity.enabled = !0, n = this.entity.getLocalPosition(), this.tween = this.mc.tween(n).to(this.origen, i, this.tipoTween), this.tween.onComplete((() => {
      this.terminaPone(t)
    })), this.tween.start()
  } else setTimeout(function() {
    this.entity.enabled = !0, this.poneMueve()
  }.bind(this), 16)
}, AnimaMsg.prototype.sacaMueveP = function(t, e, i) {
  var n = this.tiempo;
  null != i && (n = i), this.entity.setLocalPosition(this.origen.x, this.origen.y, this.origen.z);
  var s = this.entity.getLocalPosition(),
    o = new pc.Vec3(this.destinox, this.destinoy, this.destinoz);
  o = new pc.Vec3(s.x + o.x, s.y + o.y, s.z + o.z), this.entity.enabled = !0, this.tween = this.mc.tween(s).to(o, n, this.tipoTween), this.tween.onComplete((() => {
    this.terminaSaca(t, e)
  })), this.tween.start()
}, AnimaMsg.prototype.terminaPone = function(t) {
  null != t && t()
}, AnimaMsg.prototype.terminaSaca = function(t, e) {
  t && (this.entity.enabled = !1), null != e && e(), this.terminado = !0, this.enReproduccion = !1
}, AnimaMsg.prototype.poneYSaca = function() {
  this.terminado = !1, this.enReproduccion = !0, this.poneMueve(function() {
    setTimeout(function() {
      this.sacaMueveP(!1, null)
    }.bind(this), 1e3 * this.delaySaca)
  }.bind(this))
}, AnimaMsg.prototype.mueve = function(t) {
  this.tween = this.entity.tween(this.entity.getLocalPosition()).to(this.destino, this.tiempo, this.tipoTween).onComplete((() => {
    this.sacaMueve(t)
  })), this.tween.start()
}, AnimaMsg.prototype.sacaMueve = function(t) {
  null != t && t(), this.tween = this.entity.tween(this.entity.getLocalPosition()).to(this.origen, this.tiempo - .1, this.tipoTween), this.tween.delay(this.delaySaca), this.tween.start()
}, AnimaMsg.prototype.animaMano = function(t) {
  var e = this.tiempo,
    i = this.entity.getLocalPosition();
  if (0 == t) var n = new pc.Vec3(i.x + this.destinox, i.y, i.z);
  else if (1 == t) {
    n = new pc.Vec3(i.x - 2 * this.destinox, i.y, i.z);
    e *= 2
  } else if (2 == t) {
    n = new pc.Vec3(i.x + 2 * this.destinox, i.y, i.z);
    e *= 2
  }
  3 == (t += 1) && (t = 1), this.entity.enabled = !0, this.tween = this.mc.tween(i).to(n, e, this.tipoTween), this.tween.onComplete((() => {
    this.animaMano(t)
  })), this.tween.start()
}, AnimaMsg.prototype.detieneMano = function(t) {
  this.tween.stop()
}, AnimaMsg.prototype.traduce = function(t, e) {
  var i = x = window.navigator.language || navigator.browserLanguage;
  t *= idiomas.length;
  var n = 0;
  if (lenguajeManual ? n = lenguajeEl : -1 !== i.indexOf("de") ? n = 1 : -1 !== i.indexOf("nl") && (n = 2), !0 === e)
    for (var s = this.entity.model.meshInstances, o = 0; o < s.length; ++o) {
      var a = s[o];
      a.material.diffuseMap = this.boton[t + n].resource, a.material.opacityMap = this.boton[t + n].resource, a.material.update()
    } else this.entity.element.texture = this.boton[t + n].resource
};
var AsignaGlobal = pc.createScript("asignaGlobal");
AsignaGlobal.attributes.add("tipo", {
  type: "string",
  title: "tipo"
}), AsignaGlobal.prototype.initialize = function() {
  if ("sonido" === this.tipo) _sonidos = this.entity.sound
};
pc.extend(pc, function() {
    var TweenManager = function(t) {
      this._app = t, this._tweens = [], this._add = []
    };
    TweenManager.prototype = {
      add: function(t) {
        return this._add.push(t), t
      },
      update: function(t) {
        for (var i = 0, e = this._tweens.length; i < e;) this._tweens[i].update(t) ? i++ : (this._tweens.splice(i, 1), e--);
        if (this._add.length) {
          for (let t = 0; t < this._add.length; t++) this._tweens.indexOf(this._add[t]) > -1 || this._tweens.push(this._add[t]);
          this._add.length = 0
        }
      }
    };
    var Tween = function(t, i, e) {
        pc.events.attach(this), this.manager = i, e && (this.entity = null), this.time = 0, this.complete = !1, this.playing = !1, this.stopped = !0, this.pending = !1, this.target = t, this.duration = 0, this._currentDelay = 0, this.timeScale = 1, this._reverse = !1, this._delay = 0, this._yoyo = !1, this._count = 0, this._numRepeats = 0, this._repeatDelay = 0, this._from = !1, this._slerp = !1, this._fromQuat = new pc.Quat, this._toQuat = new pc.Quat, this._quat = new pc.Quat, this.easing = pc.Linear, this._sv = {}, this._ev = {}
      },
      _parseProperties = function(t) {
        var i;
        return t instanceof pc.Vec2 ? i = {
          x: t.x,
          y: t.y
        } : t instanceof pc.Vec3 ? i = {
          x: t.x,
          y: t.y,
          z: t.z
        } : t instanceof pc.Vec4 || t instanceof pc.Quat ? i = {
          x: t.x,
          y: t.y,
          z: t.z,
          w: t.w
        } : t instanceof pc.Color ? (i = {
          r: t.r,
          g: t.g,
          b: t.b
        }, void 0 !== t.a && (i.a = t.a)) : i = t, i
      };
    Tween.prototype = {
      to: function(t, i, e, s, n, r) {
        return this._properties = _parseProperties(t), this.duration = i, e && (this.easing = e), s && this.delay(s), n && this.repeat(n), r && this.yoyo(r), this
      },
      from: function(t, i, e, s, n, r) {
        return this._properties = _parseProperties(t), this.duration = i, e && (this.easing = e), s && this.delay(s), n && this.repeat(n), r && this.yoyo(r), this._from = !0, this
      },
      rotate: function(t, i, e, s, n, r) {
        return this._properties = _parseProperties(t), this.duration = i, e && (this.easing = e), s && this.delay(s), n && this.repeat(n), r && this.yoyo(r), this._slerp = !0, this
      },
      start: function() {
        var t, i, e, s;
        if (this.playing = !0, this.complete = !1, this.stopped = !1, this._count = 0, this.pending = this._delay > 0, this._reverse && !this.pending ? this.time = this.duration : this.time = 0, this._from) {
          for (t in this._properties) this._properties.hasOwnProperty(t) && (this._sv[t] = this._properties[t], this._ev[t] = this.target[t]);
          this._slerp && (this._toQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z), i = void 0 !== this._properties.x ? this._properties.x : this.target.x, e = void 0 !== this._properties.y ? this._properties.y : this.target.y, s = void 0 !== this._properties.z ? this._properties.z : this.target.z, this._fromQuat.setFromEulerAngles(i, e, s))
        } else {
          for (t in this._properties) this._properties.hasOwnProperty(t) && (this._sv[t] = this.target[t], this._ev[t] = this._properties[t]);
          this._slerp && (i = void 0 !== this._properties.x ? this._properties.x : this.target.x, e = void 0 !== this._properties.y ? this._properties.y : this.target.y, s = void 0 !== this._properties.z ? this._properties.z : this.target.z, void 0 !== this._properties.w ? (this._fromQuat.copy(this.target), this._toQuat.set(i, e, s, this._properties.w)) : (this._fromQuat.setFromEulerAngles(this.target.x, this.target.y, this.target.z), this._toQuat.setFromEulerAngles(i, e, s)))
        }
        return this._currentDelay = this._delay, this.manager.add(this), this
      },
      pause: function() {
        this.playing = !1
      },
      resume: function() {
        this.playing = !0
      },
      stop: function() {
        this.playing = !1, this.stopped = !0
      },
      delay: function(t) {
        return this._delay = t, this.pending = !0, this
      },
      repeat: function(t, i) {
        return this._count = 0, this._numRepeats = t, this._repeatDelay = i || 0, this
      },
      loop: function(t) {
        return t ? (this._count = 0, this._numRepeats = 1 / 0) : this._numRepeats = 0, this
      },
      yoyo: function(t) {
        return this._yoyo = t, this
      },
      reverse: function() {
        return this._reverse = !this._reverse, this
      },
      chain: function() {
        for (var t = arguments.length; t--;) t > 0 ? arguments[t - 1]._chained = arguments[t] : this._chained = arguments[t];
        return this
      },
      onUpdate: function(t) {
        return this.on("update", t), this
      },
      onComplete: function(t) {
        return this.on("complete", t), this
      },
      onLoop: function(t) {
        return this.on("loop", t), this
      },
      update: function(t) {
        if (this.stopped) return !1;
        if (!this.playing) return !0;
        if (!this._reverse || this.pending ? this.time += t * this.timeScale : this.time -= t * this.timeScale, this.pending) {
          if (!(this.time > this._currentDelay)) return !0;
          this._reverse ? this.time = this.duration - (this.time - this._currentDelay) : this.time -= this._currentDelay, this.pending = !1
        }
        var i = 0;
        (!this._reverse && this.time > this.duration || this._reverse && this.time < 0) && (this._count++, this.complete = !0, this.playing = !1, this._reverse ? (i = this.duration - this.time, this.time = 0) : (i = this.time - this.duration, this.time = this.duration));
        var e, s, n = 0 === this.duration ? 1 : this.time / this.duration,
          r = this.easing(n);
        for (var h in this._properties) this._properties.hasOwnProperty(h) && (e = this._sv[h], s = this._ev[h], this.target[h] = e + (s - e) * r);
        if (this._slerp && this._quat.slerp(this._fromQuat, this._toQuat, r), this.entity && (this.entity._dirtifyLocal(), this.element && this.entity.element && (this.entity.element[this.element] = this.target), this._slerp && this.entity.setLocalRotation(this._quat)), this.fire("update", t), this.complete) {
          var a = this._repeat(i);
          return a ? this.fire("loop") : (this.fire("complete", i), this.entity && this.entity.off("destroy", this.stop, this), this._chained && this._chained.start()), a
        }
        return !0
      },
      _repeat: function(t) {
        if (this._count < this._numRepeats) {
          if (this._reverse ? this.time = this.duration - t : this.time = t, this.complete = !1, this.playing = !0, this._currentDelay = this._repeatDelay, this.pending = !0, this._yoyo) {
            for (var i in this._properties) {
              var e = this._sv[i];
              this._sv[i] = this._ev[i], this._ev[i] = e
            }
            this._slerp && (this._quat.copy(this._fromQuat), this._fromQuat.copy(this._toQuat), this._toQuat.copy(this._quat))
          }
          return !0
        }
        return !1
      }
    };
    var BounceOut = function(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
      },
      BounceIn = function(t) {
        return 1 - BounceOut(1 - t)
      };
    return {
      TweenManager: TweenManager,
      Tween: Tween,
      Linear: function(t) {
        return t
      },
      QuadraticIn: function(t) {
        return t * t
      },
      QuadraticOut: function(t) {
        return t * (2 - t)
      },
      QuadraticInOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
      },
      CubicIn: function(t) {
        return t * t * t
      },
      CubicOut: function(t) {
        return --t * t * t + 1
      },
      CubicInOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
      },
      QuarticIn: function(t) {
        return t * t * t * t
      },
      QuarticOut: function(t) {
        return 1 - --t * t * t * t
      },
      QuarticInOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
      },
      QuinticIn: function(t) {
        return t * t * t * t * t
      },
      QuinticOut: function(t) {
        return --t * t * t * t * t + 1
      },
      QuinticInOut: function(t) {
        return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
      },
      SineIn: function(t) {
        return 0 === t ? 0 : 1 === t ? 1 : 1 - Math.cos(t * Math.PI / 2)
      },
      SineOut: function(t) {
        return 0 === t ? 0 : 1 === t ? 1 : Math.sin(t * Math.PI / 2)
      },
      SineInOut: function(t) {
        return 0 === t ? 0 : 1 === t ? 1 : .5 * (1 - Math.cos(Math.PI * t))
      },
      ExponentialIn: function(t) {
        return 0 === t ? 0 : Math.pow(1024, t - 1)
      },
      ExponentialOut: function(t) {
        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
      },
      ExponentialInOut: function(t) {
        return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
      },
      CircularIn: function(t) {
        return 1 - Math.sqrt(1 - t * t)
      },
      CircularOut: function(t) {
        return Math.sqrt(1 - --t * t)
      },
      CircularInOut: function(t) {
        return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
      },
      BackIn: function(t) {
        var i = 1.70158;
        return t * t * ((i + 1) * t - i)
      },
      BackOut: function(t) {
        var i = 1.70158;
        return --t * t * ((i + 1) * t + i) + 1
      },
      BackInOut: function(t) {
        var i = 2.5949095;
        return (t *= 2) < 1 ? t * t * ((i + 1) * t - i) * .5 : .5 * ((t -= 2) * t * ((i + 1) * t + i) + 2)
      },
      BounceIn: BounceIn,
      BounceOut: BounceOut,
      BounceInOut: function(t) {
        return t < .5 ? .5 * BounceIn(2 * t) : .5 * BounceOut(2 * t - 1) + .5
      },
      ElasticIn: function(t) {
        var i, e = .1;
        return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1, i = .1) : i = .4 * Math.asin(1 / e) / (2 * Math.PI), -e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / .4))
      },
      ElasticOut: function(t) {
        var i, e = .1;
        return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1, i = .1) : i = .4 * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * t) * Math.sin((t - i) * (2 * Math.PI) / .4) + 1)
      },
      ElasticInOut: function(t) {
        var i, e = .1,
          s = .4;
        return 0 === t ? 0 : 1 === t ? 1 : (!e || e < 1 ? (e = 1, i = .1) : i = s * Math.asin(1 / e) / (2 * Math.PI), (t *= 2) < 1 ? e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / s) * -.5 : e * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - i) * (2 * Math.PI) / s) * .5 + 1)
      }
    }
  }()),
  function() {
    pc.AppBase.prototype.addTweenManager = function() {
      this._tweenManager = new pc.TweenManager(this), this.on("update", (function(t) {
        this._tweenManager.update(t)
      }))
    }, pc.AppBase.prototype.tween = function(t) {
      return new pc.Tween(t, this._tweenManager)
    }, pc.Entity.prototype.tween = function(t, i) {
      var e = this._app.tween(t);
      return e.entity = this, this.once("destroy", e.stop, e), i && i.element && (e.element = i.element), e
    };
    var t = pc.AppBase.getApplication();
    t && t.addTweenManager()
  }();
var _sonidos, _app, vidas, _control = null,
  _fps = null,
  hiloFinal = null,
  toleranciaSwipe = 50,
  numTiro = 0,
  pelotaY = .1,
  esGol = !1,
  reaccionArquero = 4,
  esperaFinal = 2e3,
  elFinal = !1,
  bolaLanzada = 0,
  atajada = !1,
  tiempoDeTiro = 2850,
  distanciaBalon = 0,
  sentidoVolante = 0,
  sentidoElegido = 0,
  volanteReal = 0,
  speedVolante = 0,
  volanteInicial = 3,
  aplausos = !1,
  efecto = !0,
  currentMute = 0,
  enGoogle = !0,
  volumeMaster = !0,
  rewardAd = null,
  rewardType = null,
  muteSound = 0,
  tiempoJuego = (elFinal = !1, 120),
  finTiempo = !1,
  colorParpadeo = "#ff0000",
  colorNormal = "#ffffff",
  pause = !1,
  _globalScore = 0,
  skipMenu = !1,
  muteSoundAux = 0,
  timeToStartGame = 0,
  hitBlanco = !1,
  sinBlancos = !1,
  arqueroAtaja = "",
  arqueroAtajo = !1,
  hitBarrera = !1,
  sonidoGol = !1,
  permitirTrail = !1,
  sentidoBola = "",
  currentPantalla = "",
  golSCore = 10,
  enGameOver = !1,
  texturasDinamicasLoad = 0,
  texturaArqueroLoad = !1,
  totalTexturasDinamicas = 4,
  gameID = "641812",
  vibrar = !1,
  currentGamePlay = "",
  calidad = "alta",
  totalVidas = 3,
  fovSeguimiento = 43,
  distanciaFovPelota = 1.4,
  randomLevels = !0,
  palo = !1,
  turnoAcabado = !1,
  pauseFlag = !1,
  numPelotas = 8,
  tutorialMostrado = 0,
  idiomas = ["EN", "GER", "DUTCH"],
  posiblesIdiomas = ["af", "sq", "ar-SA", "ar-IQ", "ar-EG", "ar-LY", "ar-DZ", "ar-MA", "ar-TN", "ar-OM", "ar-YE", "ar-SY", "ar-JO", "ar-LB", "ar-KW", "ar-AE", "ar-BH", "ar-QA", "eu", "bg", "be", "ca", "zh-TW", "zh-CN", "zh-HK", "zh-SG", "hr", "cs", "da", "nl", "nl-BE", "en", "en-US", "en-EG", "en-AU", "en-GB", "en-CA", "en-NZ", "en-IE", "en-ZA", "en-JM", "en-BZ", "en-TT", "et", "fo", "fa", "fi", "fr", "fr-BE", "fr-CA", "fr-CH", "fr-LU", "gd", "gd-IE", "de", "de-CH", "de-AT", "de-LU", "de-LI", "el", "he", "hi", "hu", "is", "id", "it", "it-CH", "ja", "ko", "lv", "lt", "mk", "mt", "no", "pl", "pt-BR", "pt", "rm", "ro", "ro-MO", "ru", "ru-MI", "sz", "sr", "sk", "sl", "sb", "es", "es-AR", "es-GT", "es-CR", "es-PA", "es-DO", "es-MX", "es-VE", "es-CO", "es-PE", "es-EC", "es-CL", "es-UY", "es-PY", "es-BO", "es-SV", "es-HN", "es-NI", "es-PR", "sx", "sv", "sv-FI", "th", "ts", "tn", "tr", "uk", "ur", "ve", "vi", "xh", "ji", "zu"],
  currentSkin = 0,
  bestScore = 0,
  pelotasInfo = [
    [1, 0],
    [0, 400],
    [0, 400],
    [0, 400],
    [0, 800],
    [0, 800],
    [0, 800],
    [0, 1600]
  ],
  perm = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180, 151],
  levelSequense = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199],
  _sequence = [];

function iniVars() {
  palo = !1, vibrar = !1, turnoAcabado = !1, sonidoGol = !1, hitBarrera = !1, hitBlanco = !1, sinBlancos = !1, esGol = !1, elFinal = !1, bolaLanzada = 0, atajada = !1, distanciaBalon = 0, sentidoVolante = 0, volanteReal = 0, sentidoElegido = 0, speedVolante = 0, bajada = 0, efecto = !0, sentidoBola = "", aplausos = !1, arqueroAtaja = "", arqueroAtajo = !1, permitirTrail = !1
}

function estaEnArray(e, o) {
  for (var a = 0; a < o.length; a++)
    if (o[a] == e) return !0;
  return !1
}

function reproduceAnim(e, o, a, n, t, r) {
  null != a && (e.animation.speed = a), e.animation.loop = n;
  var s = e.animation.assets[o],
    u = e.animation.animationsIndex[s];
  e.animation.play(u), t && setTimeout((function() {
    e.enabled = !1
  }), r)
}

function asignaEventos(e, o, a, n) {
  var t = [];
  switch (null != e.element && (e = e.element), a) {
    case 1:
      t[0] = "touchstart", t[1] = "mousedown";
      break;
    case 2:
      t[0] = "touchend", t[1] = "mouseup";
      break;
    case 3:
      t[0] = "touchmove", t[1] = "mousemove"
  }
  o ? isMobile.any() ? e.on(t[0], n) : e.on(t[1], n) : e.off()
}

function setPause(e) {
  e ? (pause = !0, muteSoundAux = muteSound, muteSound = 1, null != _sonidos && (_sonidos.slot("musicInGame").volume = 0, _sonidos.slot("musicaMenu").volume = 0)) : (pause = !1, 0 == (muteSound = muteSoundAux) && null != _sonidos && (_sonidos.slot("musicInGame").volume = .38, _sonidos.slot("musicaMenu").volume = .4))
}

function setGameTime(e) {
  tiempoJuego = e / 1e3
}

function isset(e) {
  return void 0 !== e
}

function guardaVars(e, o) {
  if (o = "google_soccerRC_V2" + o, !supports_html5_storage()) return !1;
  enGoogle ? GameSnacks.storage.setItem(o, e + "") : localStorage.setItem(o, e + "")
}

function cargaVars(e) {
  return e = "google_soccerRC_V2" + e, supports_html5_storage() ? enGoogle ? GameSnacks.storage.getItem(e) : localStorage.getItem(e) : 0
}

function existeVars(e) {
  if (e = "google_soccerRC_V2" + e, !supports_html5_storage()) return !1;
  if (!enGoogle) return localStorage.hasOwnProperty(e);
  var o = GameSnacks.storage.getItem(e);
  return null != o && null != o && "" != o
}

function getAllVars() {
  for (var e = 0; e < pelotasInfo.length; e++) existeVars("pelotasInfo_" + (e + 1) + "_unlock") && (pelotasInfo[e][0] = parseInt(cargaVars("pelotasInfo_" + (e + 1) + "_unlock")));
  bestScore = existeVars("bestScore") ? parseInt(cargaVars("bestScore")) : 0, existeVars("currentSkin") ? (currentSkin = parseInt(cargaVars("currentSkin")), _control.setSkin()) : (currentSkin = 0, _control.setSkin()), tutorialMostrado = existeVars("tutorialMostrado") ? parseInt(cargaVars("tutorialMostrado")) : 0
}

function supports_html5_storage() {
  if (!enGoogle) try {
    return "localStorage" in window && null !== window.localStorage
  } catch (e) {
    return !1
  }
  return !0
}
String.prototype.toHHMMSS = function() {
  var e = parseInt(this, 10),
    o = Math.floor(e / 3600),
    a = Math.floor((e - 3600 * o) / 60),
    n = e - 3600 * o - 60 * a;
  return o < 10 && (o = "0" + o), a < 10 && (a = "" + a), n < 10 && (n = "0" + n), a + ":" + n
};
currentMute = 0;

function onPause() {
  console.log("en pause!!"), currentMute = muteSound, mute(1), pauseFlag = !0
}

function onResume() {
  console.log("en resumen!!"), mute(currentMute)
}

function mute(e) {
  muteSound = e, mutearMusicas();
  var o = _control.screen2D.findByName("muteb");
  _control.configSound(o), o = _control.settingsPanel.findByName("muteb_settings"), _control.configSound(o)
}

function tocaSonido(e) {
  0 == muteSound && _sonidos.play(e)
}

function mutearMusicas() {
  1 == muteSound ? (_sonidos.slot("musicInGame").volume = 1e-4, _sonidos.slot("musicaMenu").volume = 1e-4) : 0 == muteSound && (_sonidos.slot("musicInGame").volume = .38, _sonidos.slot("musicaMenu").volume = .4)
}

function cargaTextura(e, o, a, n) {
  _app.loader.getHandler("texture").crossOrigin = "anonymous";
  var t = new pc.Asset("foto" + Math.round(1e3 * Math.random()), "texture", {
    url: e
  });
  _app.assets.add(t), _app.assets.load(t), t.on("load", (function(e) {
    if (a) {
      "arquero" == o.name && (texturaArqueroLoad = !0);
      for (var t = o.model.meshInstances, r = 0; r < t.length; ++r) {
        (s = t[r]).material.diffuseMap = e.resource, s.material.update()
      }
      if (null != n)
        for (t = n.model.meshInstances, r = 0; r < t.length; ++r) {
          var s;
          (s = t[r]).material.diffuseMap = e.resource, s.material.opacityMap = e.resource, s.material.update()
        }
    } else o.element.textureAsset = e, o.enabled = !0;
    texturasDinamicasLoad += 1
  }))
}

function generateLevel(e) {
  if (randomLevels) {
    for (var o = "", a = 0; a < levelSequense.length; a++) {
      var n = Math.floor(Math.random() * levelSequense.length);
      a == levelSequense.length - 1 ? o += n : o = o + n + "-"
    }
    e = o
  }
  var t = "",
    r = 0;
  for (a = 0; a < e.length; a++) "-" == e[a] ? (_sequence[r] = t, t = "", r += 1) : a == e.length - 1 ? (t += e[a], _sequence[r] = t, t = "", r += 1) : t += e[a]
}
var lenguajeManual = !0,
  lenguajeEl = 0;

function setTimeToEnd(e) {
  setGameTime(e)
}

function getScore() {
  return _globalScore
}

function quickstartGame() {
  skipMenu = !0, null != _control && (finTiempo = !0)
}

function unmuteGame() {
  mute(0)
}

function muteGame() {
  mute(1)
}

function quickstopGame() {
  finTiempo = !0
}

function onGameEnd() {
  console.log("GAME END WAS CALLED!!! ")
}

function onGameStart() {
  console.log("GAME START WAS CALLED!!! ")
}

function onGameUpdate(e) {
  console.log("GAME score UPDATED WAS CALLED!!! " + e)
}

function onGameLoad(e) {
  console.log("GAME LOAD WAS CALLED!!! ")
}
var URL = "https://www.bekhoteam.net/proyectos/eazegames/texturas/",
  textureGoalKeeper = "arquero_t2.png",
  textureWallGuySmall = "jugador1_t2.png",
  textureWallGuyMid = "jugador2_t2.png",
  textureWallGuyTall = "jugador3_t2.png",
  isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
    },
    any: function() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || window.devicePixelRatio >= 2 && navigator.maxTouchPoints > 0 && 256 != navigator.maxTouchPoints
    }
  },
  desmutearDespuesDeAd = !1;

function BeforeVideoAd() {
  console.log("ANTES DE VER EL AD!!! "), (enGoogle ? GameSnacks.audio.isEnabled() : volumeMaster) && 0 == muteSound && (mute(1), desmutearDespuesDeAd = !0)
}

function PrepareInterstitital(e) {
  e()
}

function AfterInterstitialAd(e, o) {
  (console.log("DESPUES  DE VER EL INTERSTITIAL AD!!! "), console.log(e), desmutearDespuesDeAd) && ((enGoogle ? GameSnacks.audio.isEnabled() : volumeMaster) && 1 == muteSound && (mute(0), desmutearDespuesDeAd = !1));
  o()
}
var AnimaUvs = pc.createScript("animaUvs");
AnimaUvs.attributes.add("material", {
  type: "asset",
  assetType: "material",
  array: !1
}), AnimaUvs.attributes.add("speed", {
  type: "number",
  default: .01,
  title: "speed"
}), AnimaUvs.attributes.add("eje", {
  type: "number",
  default: 0,
  title: "ejeX_o_Y"
}), AnimaUvs.attributes.add("loop", {
  type: "number",
  default: 1,
  title: "LOOP"
}), AnimaUvs.attributes.add("apagar", {
  type: "number",
  default: 1,
  title: "apagar"
}), AnimaUvs.attributes.add("desde", {
  type: "number",
  default: 0,
  title: "desde"
}), AnimaUvs.attributes.add("hasta", {
  type: "number",
  default: 1,
  title: "hasta"
}), AnimaUvs.attributes.add("tipoMaterial", {
  type: "string",
  array: !0,
  title: "opacityMapOffset"
}), AnimaUvs.prototype.initialize = function() {
  this.materialCargado = this.material.resource
}, AnimaUvs.prototype.resetMaterial = function(t) {
  this.materialCargado[this.tipoMaterial] = new pc.Vec2(0, 0), this.materialCargado.update(), this.entity.enabled = !0, this.eje = t
}, AnimaUvs.prototype.setRangos = function(t, a, e, i) {
  this.desde = t, this.hasta = a, this.speed = i, this.loop = 0, this.eje = e;
  for (var s = 0; s < this.tipoMaterial.length; s++) 0 == this.eje ? this.materialCargado[this.tipoMaterial[s]] = new pc.Vec2(0, t) : this.materialCargado[this.tipoMaterial[s]] = new pc.Vec2(t, 0);
  this.materialCargado.update()
}, AnimaUvs.prototype.update = function(t) {
  for (var a = 0; a < this.tipoMaterial.length; a++) {
    var e;
    switch (this.tipoMaterial[a]) {
      case "opacityMapOffset":
        e = this.materialCargado.opacityMapOffset;
        break;
      case "diffuseMapOffset":
        e = this.materialCargado.diffuseMapOffset;
        break;
      case "emissiveMapOffset":
        e = this.materialCargado.emissiveMapOffset
    }
    if (0 == this.eje)(i = e.y - t * this.speed) < 0 && (0 == this.loop ? (i = 0, this.eje = -99, 1 == this.apagar && setTimeout(this.apagaObjeto.bind(this), 20)) : i = 1), this.materialCargado[this.tipoMaterial[a]] = new pc.Vec2(0, i), this.materialCargado.update();
    else if (1 == this.eje) {
      var i = e.x + t * this.speed;
      this.hasta > this.desde ? i > this.hasta && (0 == this.loop ? (i = this.hasta, this.eje = -99, 1 == this.apagar && setTimeout(this.apagaObjeto.bind(this), 20)) : i = this.desde) : i < this.hasta && (0 == this.loop ? (i = this.hasta, this.eje = -99, 1 == this.apagar && setTimeout(this.apagaObjeto.bind(this), 20)) : i = this.desde), this.materialCargado[this.tipoMaterial[a]] = new pc.Vec2(i, 0), this.materialCargado.update()
    }
  }
}, AnimaUvs.prototype.apagaObjeto = function() {
  this.entity.enabled = !1
};
var AnimaTexturas = pc.createScript("animaTexturas");
AnimaTexturas.attributes.add("texturas", {
  type: "asset",
  assetType: "texture",
  array: !0,
  title: "texturas"
}), AnimaTexturas.attributes.add("loop", {
  type: "number",
  default: 0,
  title: "loop"
}), AnimaTexturas.attributes.add("autoAnim", {
  type: "number",
  default: 0,
  title: "autoAnim"
}), AnimaTexturas.attributes.add("texture3D", {
  type: "number",
  default: 0,
  title: "texture3D"
}), AnimaTexturas.attributes.add("frames", {
  type: "number",
  default: 60,
  title: "frames"
}), AnimaTexturas.prototype.initialize = function() {
  this.entity;
  var a = [this.entity, this.texturas, 0, this.texturas.length, !1, 0, 0, 0, !1];
  this.cont = 0, this.arrayAnimaciones = [], this.arrayAnimaciones[0] = a, this.callBack = null, 1 == this.autoAnim && (1 == this.loop && (this.arrayAnimaciones[0][8] = !0), this.arrayAnimaciones[0][4] = !0)
}, AnimaTexturas.prototype.getCurrentFrame = function(a) {
  return null == this.arrayAnimaciones ? null : this.arrayAnimaciones[a][5]
}, AnimaTexturas.prototype.inicioAnim = function(a, i, t) {
  this.callBack = a, this.cont = 0;
  var r = [this.entity, this.texturas, 0, this.texturas.length, !1, 0, 0, 0, !1];
  if (this.cont = 0, null != i && null != t) this.arrayAnimaciones[0][2] = i, this.arrayAnimaciones[0][3] = t;
  else {
    r = [this.entity, this.texturas, 0, this.texturas.length, !1, 0, 0, 0, !1];
    this.arrayAnimaciones = [], this.arrayAnimaciones[0] = r
  }
  this.cont = 0, this.entity.element.texture = this.texturas[this.arrayAnimaciones[0][2]].resource, this.arrayAnimaciones[0][4] = !0, 1 == this.loop && (this.arrayAnimaciones[0][8] = !0)
}, AnimaTexturas.prototype.cambiaFrame = function(a) {
  null != this.arrayAnimaciones && (this.arrayAnimaciones[0][4] = !1, this.entity.element.texture = this.arrayAnimaciones[0][1][a].resource)
}, AnimaTexturas.prototype.stopAnim = function() {
  this.arrayAnimaciones[0][4] = !1
}, AnimaTexturas.prototype.update = function(a) {
  var i = a,
    t = 1 / i;
  this.cont = this.cont + i;
  var r = t / this.frames;
  if (r /= t, this.cont >= r) {
    this.cont = 0;
    for (var e = 0; e < this.arrayAnimaciones.length; e++)
      if (1 == this.arrayAnimaciones[e][4]) {
        var s;
        if (0 == this.arrayAnimaciones[e][7]) 0 == (s = this.arrayAnimaciones[e][5]) && (s = this.arrayAnimaciones[e][2]), 0 == this.texture3D ? this.arrayAnimaciones[e][0].element.texture = this.arrayAnimaciones[e][1][s].resource : this.cambiaTextura3D(this.arrayAnimaciones[e][1][s].resource), this.arrayAnimaciones[e][5] = this.arrayAnimaciones[e][5] + 1, (s = this.arrayAnimaciones[e][5]) == this.arrayAnimaciones[e][3] && (0 == this.arrayAnimaciones[e][6] ? this.arrayAnimaciones[e][8] ? this.arrayAnimaciones[e][5] = 1 : (this.arrayAnimaciones[e][4] = !1, this.arrayAnimaciones[e][5] = 0, null != this.callBack && this.callBack()) : 2 == this.arrayAnimaciones[e][6] && (this.arrayAnimaciones[e][7] = 1));
        if (1 == this.arrayAnimaciones[e][7])(s = this.arrayAnimaciones[e][5]) == this.arrayAnimaciones[e][3] && (s = this.arrayAnimaciones[e][3] - 2, this.arrayAnimaciones[e][5] = s), 0 == this.texture3D ? this.arrayAnimaciones[e][0].element.texture = this.arrayAnimaciones[e][1][s].resource : this.cambiaTextura3D(this.arrayAnimaciones[e][1][s].resource), this.arrayAnimaciones[e][5] = this.arrayAnimaciones[e][5] - 1, (s = this.arrayAnimaciones[e][5]) == this.arrayAnimaciones[e][2] - 1 && (this.arrayAnimaciones[e][4] = !1, this.arrayAnimaciones[e][5] = 0, 2 == this.arrayAnimaciones[e][6] && (this.arrayAnimaciones[e][7] = 0))
      }
  }
}, AnimaTexturas.prototype.cambiaTextura3D = function(a) {
  for (var i = this.entity.model.meshInstances, t = 0; t < i.length; ++t) {
    var r = i[t];
    r.material.diffuseMap = a, r.material.opacityMap = a, r.material.update()
  }
};
var AnimaAlfa3d = pc.createScript("animaAlfa3d");
AnimaAlfa3d.attributes.add("material", {
  type: "asset",
  assetType: "material",
  array: !1
}), AnimaAlfa3d.attributes.add("speed", {
  type: "number",
  default: .01,
  title: "speed"
}), AnimaAlfa3d.attributes.add("desde", {
  type: "number",
  default: 0,
  title: "desde"
}), AnimaAlfa3d.attributes.add("hasta", {
  type: "number",
  default: 1,
  title: "hasta"
}), AnimaAlfa3d.attributes.add("delay", {
  type: "number",
  default: 0,
  title: "delay"
}), AnimaAlfa3d.attributes.add("loop", {
  type: "number",
  default: 1,
  title: "LOOP"
}), AnimaAlfa3d.attributes.add("apagaAlTerminar", {
  type: "number",
  default: 1,
  title: "apagaAlTerminar"
}), AnimaAlfa3d.attributes.add("tipoMaterial", {
  type: "string",
  default: "opacity",
  title: "opacity"
}), AnimaAlfa3d.attributes.add("finAnim", {
  type: "number",
  default: 1,
  title: "finAnim"
}), AnimaAlfa3d.prototype.initialize = function() {
  this.sentido = 0, this.contadorDelay = 0, this.materialCargado = this.material.resource, this.desde < this.hasta ? this.sentido = 1 : this.sentido = -1, this.resetMaterial()
}, AnimaAlfa3d.prototype.empiezaAnim = function(t, a, i, e) {
  this.entity.enabled = !0, this.desde = t, this.hasta = a, null != i && (this.delay = i), null != e && (this.speed = e), this.desde < this.hasta ? this.sentido = 1 : this.sentido = -1, this.contadorDelay = 0, this.resetMaterial(), this.finAnim = 0
}, AnimaAlfa3d.prototype.resetMaterial = function(t) {
  this.materialCargado[this.tipoMaterial] = this.desde, this.materialCargado.update()
}, AnimaAlfa3d.prototype.update = function(t) {
  if (1 != this.finAnim)
    if (this.contadorDelay < this.delay) this.contadorDelay = this.contadorDelay + t;
    else {
      var a, i = this.materialCargado.opacity,
        e = !1;
      (a = -1 == this.sentido ? i - t * this.speed : i + t * this.speed) <= 0 ? (e = !0, a = 0) : a >= 1 && (e = !0, a = 1), this.materialCargado[this.tipoMaterial] = a, this.materialCargado.update(), e && (1 == this.loop ? this.empiezaAnim(this.desde, this.hasta) : (this.finAnim = 1, setTimeout(this.apagaObjeto.bind(this), .1)))
    }
}, AnimaAlfa3d.prototype.apagaObjeto = function() {
  1 == this.finAnim && (this.entity.enabled = !1)
}, AnimaAlfa3d.prototype.terminaAnim = function() {
  this.finAnim = 1
};
var AlphaConVelocidad = pc.createScript("alphaConVelocidad");
AlphaConVelocidad.attributes.add("tiempoEspera", {
  type: "number",
  default: .9,
  title: "tiempoEspera"
}), AlphaConVelocidad.attributes.add("tiempo", {
  type: "number",
  default: 0,
  title: "tiempo"
}), AlphaConVelocidad.attributes.add("fadeTipo", {
  type: "number",
  default: 1,
  title: "fadeTipo"
}), AlphaConVelocidad.prototype.initialize = function() {}, AlphaConVelocidad.prototype.update = function(e) {
  this.tiempo = this.tiempo + e, this.tiempo >= this.tiempoEspera && (this.tiempo = 0, this.entity.element.enabled ? this.entity.element.enabled = !1 : this.entity.element.enabled = !0)
};
var Parpadear = pc.createScript("parpadear");
Parpadear.attributes.add("tiempoDesaparicion", {
  type: "number",
  default: .85,
  title: "tiempoDesaparicion"
}), Parpadear.attributes.add("tiempoAparicion", {
  type: "number",
  default: .45,
  title: "tiempoAparicion"
}), Parpadear.attributes.add("autoStart", {
  type: "number",
  default: 1,
  title: "autoStart"
}), Parpadear.prototype.initialize = function() {
  this.contador = 0
}, Parpadear.prototype.update = function(t) {
  0 != this.autoStart && (this.contador = this.contador + t, this.entity.element.enabled ? this.contador > this.tiempoDesaparicion && (this.contador = 0, this.entity.element.enabled = !1) : this.entity.element.enabled || this.contador > this.tiempoAparicion && (this.contador = 0, this.entity.element.enabled = !0, 2 == this.autoStart && (this.autoStart = 0)))
};
var BolaControl = pc.createScript("bolaControl");
BolaControl.attributes.add("bolaReal", {
  type: "entity",
  title: "bolaReal"
}), BolaControl.attributes.add("bolaSombra", {
  type: "entity",
  title: "bolaSombra"
}), BolaControl.attributes.add("camara", {
  type: "entity",
  title: "camara"
}), BolaControl.attributes.add("camaraMov", {
  type: "entity",
  title: "camaraMov"
}), BolaControl.attributes.add("cancha", {
  type: "entity",
  title: "cancha"
}), BolaControl.attributes.add("indicador", {
  type: "entity",
  title: "indicador"
}), BolaControl.attributes.add("arquero", {
  type: "entity",
  title: "arquero"
}), BolaControl.attributes.add("deltaCamaraBola", {
  type: "number",
  default: 1
}), BolaControl.attributes.add("rotateSpeed", {
  type: "number",
  default: 1
}), BolaControl.prototype.initialize = function() {
  this.enTouch = !1, this.elTouch = null, this.startPos = null, this.startTime = null, this.puntoMouseMove = null, this.detectarFinal = !1, this.power = 0, this.trailIndex = 0, this.trailTotal = this.bolaSombra.children.length, this.hiloTrail = [], isMobile.any() ? (this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this), this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this), this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this)) : (this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this), this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this), this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this), document.addEventListener("mouseout", this.onMouseLeave)), iniVars()
}, BolaControl.tap = !1, BolaControl.prototype.doRaycast = function(o, t) {
  var a = this.camaraMov.camera.screenToWorld(o, t, this.camaraMov.camera.nearClip),
    e = this.camaraMov.camera.screenToWorld(o, t, this.camaraMov.camera.farClip),
    i = this.app.systems.rigidbody.raycastFirst(a, e);
  if (i && "pelotaHit" == i.entity.name) return BolaControl.tap = !0, !0;
  return !1
}, BolaControl.prototype.onCollisionStart = function(o) {}, BolaControl.prototype.onTouchStart = function(o) {
  if (!pause) {
    var t = o.touches[0];
    this.metodoTouchStart(t.x, t.y)
  }
}, BolaControl.prototype.metodoTouchStart = function(o, t) {
  if (!pause)
    if (0 == bolaLanzada) {
      if (!this.camaraMov.enabled) return;
      if (finTiempo) return;
      if (this.doRaycast(o, t)) {
        BolaControl.tap = !0, this.startPos = new pc.Vec2(o, t);
        var a = new Date;
        this.startTime = a.getTime()
      }
    } else {
      BolaControl.tap = !0, this.startPos = new pc.Vec2(o, t);
      a = new Date;
      this.startTime = a.getTime()
    }
}, BolaControl.prototype.onTouchEnd = function(o) {
  this.metodoTouchUp()
}, BolaControl.prototype.onTouchMove = function(o) {
  if (BolaControl.tap) {
    var t = o.touches[0];
    this.metodoTouchMove(t.x, t.y)
  }
}, BolaControl.prototype.onMouseMove = function(o) {
  BolaControl.tap && this.metodoTouchMove(o.x, o.y)
}, BolaControl.prototype.calculaSwipeTiro = function(o, t) {
  if (null != this.puntoMouseMove) {
    var a = new pc.Vec2(this.puntoMouseMove.x, this.puntoMouseMove.y),
      e = (new Date).getTime(),
      i = this.camaraMov.camera.screenToWorld(this.startPos.x, this.startPos.y, this.camara.camera.nearClip);
    a = this.camaraMov.camera.screenToWorld(a.x, a.y, this.camara.camera.nearClip);
    var l = (e - this.startTime) / 1e3,
      n = a.sub(i),
      r = n.length(),
      s = r / l;
    0 == bolaLanzada ? this.metodoDisparo(l, n, r, s, o, t) : 1 == bolaLanzada && this.metodoEfecto(l, n, r, s)
  }
}, BolaControl.prototype.metodoDisparo = function(o, t, a, e, i, l) {
  if (!(t.y <= 0 || e < .015 || null == e || e == 1 / 0)) {
    if (this.power < e && (this.power = e), o < .12 && e > .4);
    else if (o < .12 && o > .09 && e > .35);
    else if (o < .12 && o > .1 && e > .3);
    else if (o < .12 && o > .105 && e > .25);
    else if (o < .12 && o > .11 && e > .2);
    else if (o < .12 && o > .115 && e > .15);
    else if (o < .12) return;
    _control.pauseb.enabled = !1, e = this.power, this.metodoTouchUp(i, l);
    var n = 9.43,
      r = 11.1,
      s = 18.666,
      c = 11.6,
      h = (c - r) / (s - n),
      p = h * (this.arquero.getPosition().clone().sub(this.entity.getPosition()).length() - n) + r;
    p > 11.6 && (p = 11.6), p < 11.1 && (p = 11.1), h = ((c = 3.11) - (r = 1.72)) / ((s = .4) - (n = .02)), PO = h * (e - n) + r, PO > 3.11 && (PO = 3.11), PO < 1.72 && (PO = 1.72);
    var u, d = t.y,
      y = .5 * t.x,
      m = this.entity.getLocalEulerAngles();
    if (d > (y += Math.tan(m.y * Math.PI / 180) * d * -1)) d *= u = p / d, y *= u;
    else y *= u = p / y, d *= u;
    this.indicador.enabled = !1;
    var b = new pc.Vec3(y, PO, -d);
    b.normalize(), b.scale(p), this.entity.rigidbody.applyImpulse(b), this.entity.rigidbody.applyTorque(b), this.power = 0, _control.apagaBlancos(), _control.setBarreraSalto();
    var v = Math.ceil(3 * Math.random());
    tocaSonido("chute" + v), clearInterval(hiloFinal), hiloFinal = setInterval(this.finTiro.bind(this, !1, 0), 50), bolaLanzada = 1, this.metodoTouchUp()
  }
}, BolaControl.prototype.metodoEfecto = function(o, t, a, e) {
  if (efecto) {
    var i = t.x / o,
      l = t.y / o,
      n = 0,
      r = 0,
      s = .08,
      c = .028,
      h = s,
      p = (h - r) / (c - n),
      u = p * (i - n) + r;
    u > s && (u = s), u < -s && (u = -s);
    var d = 0;
    u > 0 ? d = 1 : u < 0 && (d = -1), sentidoElegido = d, (isNaN(u) || null == u) && (u = 0);
    var y = (p = ((h = s = 33) - (r = 0)) / ((c = .075) - (n = 0))) * (l - n) + r;
    y > s && (y = s), y < -s && (y = -s), bajada = 0, y > 0 ? bajada = 0 : y < 0 && (bajada = y);
    var m = this.entity.rigidbody.linearVelocity.y;
    bajada < 0 && m > 0 && this.entity.rigidbody.applyForce(0, bajada, 0), console.log(volanteReal);
    var b = .27 * d;
    volanteReal += u, d > 0 ? volanteReal > b && (volanteReal = b) : d < 0 && volanteReal < b && (volanteReal = b), this.metodoTouchUp()
  }
}, BolaControl.prototype.finTiro = function(o, t) {
  if (!pause)
    if (t += 50, clearInterval(hiloFinal), t >= tiempoDeTiro) {
      if (esGol) return;
      efecto = !1, _control.resetTiro(1150)
    } else hiloFinal = setInterval(this.finTiro.bind(this, o, t), 50)
}, BolaControl.prototype.metodoTouchMove = function(o, t) {
  this.puntoMouseMove = new pc.Vec2(o, t), this.clickFinal = new pc.Vec2(o, t), this.calculaSwipeTiro(o, t)
}, BolaControl.prototype.onMouseUp = function(o) {
  this.metodoTouchUp(o.x, o.y)
}, BolaControl.prototype.metodoTouchUp = function(o, t) {
  BolaControl.tap = !1, clearInterval(this.hiloSwipe), this.clickFinal = null, this.clickInicial = null, this.clickInicialFijo = null, this.bolaInicialFijo = null, this.bolaInicial = null, this.puntoMouseMove = null
}, BolaControl.prototype.onMouseDown = function(o) {
  pause || this.metodoTouchStart(o.x, o.y)
}, BolaControl.prototype.update = function(o) {
  var t = this.entity.getPosition();
  this.bolaSombra.setPosition(t), 1 == bolaLanzada && (0 != volanteReal && !esGol && efecto && this.entity.rigidbody.applyImpulse(volanteReal, 0, 0), permitirTrail && this.bolaSombra.setPosition(t), (t.z < -6.5 || t.x < -11.5 || t.x > 11.5) && (this.app.systems.rigidbody.gravity = new pc.Vec3(0, -9.8, 0), efecto = !1))
}, BolaControl.prototype.achicaTrail = function(o) {
  var t = this.bolaSombra.children[o].getLocalScale();
  t.x - .1 < 0 ? (this.bolaSombra.children[o].setLocalScale(0, 0, 0), clearInterval(this.hiloTrail[o])) : this.bolaSombra.children[o].setLocalScale(t.x - .1, t.y - .1, t.z - .1)
}, BolaControl.prototype.mataTrail = function() {
  for (var o = 0; o < this.trailTotal; o++) clearInterval(this.hiloTrail[o]), this.bolaSombra.children[o].enabled = !1, this.trailIndex = 0, this.bolaSombra.children[o].setLocalPosition(0, 0, 0), this.bolaSombra.children[o].setLocalScale(.9, .9, .9);
  this.app.systems.rigidbody.gravity = new pc.Vec3(0, -9.8, 0)
}, BolaControl.prototype.onMouseLeave = function(o) {
  BolaControl.tap = !1, this.clickFinal = null, this.clickInicial = null, this.bolaInicial = null
}, BolaControl.prototype.calculaCorrimientoX = function(o) {
  var t = .0375 * (o - 0) + 0;
  return t < -15 ? t = -15 : t > 15 && (t = 15), t
};
var GameControl = pc.createScript("gameControl");
GameControl.attributes.add("camaraNormal", {
  type: "entity",
  title: "camaraNormal"
}), GameControl.attributes.add("camaraSiguePelota", {
  type: "entity",
  title: "camaraSiguePelota"
}), GameControl.attributes.add("camaraComienzo", {
  type: "entity",
  title: "camaraComienzo"
}), GameControl.attributes.add("pelota", {
  type: "entity",
  title: "pelota"
}), GameControl.attributes.add("pelotaReal", {
  type: "entity",
  title: "pelotaReal"
}), GameControl.attributes.add("sombraPelota", {
  type: "entity",
  title: "sombraPelota"
}), GameControl.attributes.add("arco", {
  type: "entity",
  title: "arco"
}), GameControl.attributes.add("arquero", {
  type: "entity",
  title: "arquero"
}), GameControl.attributes.add("arqueroColider", {
  type: "entity",
  title: "arqueroColider"
}), GameControl.attributes.add("blancos", {
  type: "entity",
  title: "blancos"
}), GameControl.attributes.add("barrera", {
  type: "entity",
  title: "barrera"
}), GameControl.attributes.add("mensajes", {
  type: "entity",
  title: "mensajes"
}), GameControl.attributes.add("screen2D", {
  type: "entity",
  title: "screen2D"
}), GameControl.attributes.add("limiteMinZ", {
  type: "number",
  default: 1.5,
  title: "limiteMinZ"
}), GameControl.attributes.add("limiteMaxZ", {
  type: "number",
  default: 9,
  title: "limiteMaxZ"
}), GameControl.attributes.add("limiteMinX", {
  type: "number",
  default: -12,
  title: "limiteMinX"
}), GameControl.attributes.add("limiteMaxX", {
  type: "number",
  default: 12,
  title: "limiteMaxX"
}), GameControl.attributes.add("rotate", {
  type: "entity",
  title: "rotate"
}), GameControl.attributes.add("pausePanel", {
  type: "entity",
  title: "pausePanel"
}), GameControl.attributes.add("pauseb", {
  type: "entity",
  title: "pauseb"
}), GameControl.attributes.add("noAdsb", {
  type: "entity",
  title: "noaAdsb"
}), GameControl.attributes.add("contactb", {
  type: "entity",
  title: "contactb"
}), GameControl.attributes.add("botonPelotas", {
  type: "entity",
  title: "botonPelotas"
}), GameControl.attributes.add("panelPelotas", {
  type: "entity",
  title: "panelPelotas"
}), GameControl.attributes.add("pelotasSkin", {
  type: "entity",
  title: "pelotasSkin"
}), GameControl.attributes.add("settingsb", {
  type: "entity",
  title: "settingsb"
}), GameControl.attributes.add("settingsPanel", {
  type: "entity",
  title: "settingsPanel"
}), GameControl.attributes.add("tutorial3D", {
  type: "entity",
  title: "tutorial3D"
}), GameControl.prototype.eventosIniciales = function(e) {
  this.botonPelotas.enabled = !0, this.buscaNuevasPelotas(), asignaEventos(this.botonPelotas, !0, 1, this.clickMenuPelotas.bind(this));
  var t = this.screen2D.findByName("tap");
  if ("intro" == e) {
    currentPantalla = "menu", t.script.animaMsg.clickBoton(null, !0, 0), asignaEventos(t, !0, 1, this.empezarGame.bind(this)), t.enabled = !0;
    var a = this.screen2D.findByName("best");
    a.enabled = !0, a.children[0].element.text = bestScore + "", console.log(bestScore), 0 == bestScore && (a.enabled = !1), this.settingsb.enabled = !0, asignaEventos(this.settingsb, !0, 1, this.clickSettings.bind(this))
  } else if ("fin" == e) {
    PrepareInterstitital((() => {
      enGoogle && (console.log("Se llama a gamesnack game over"), GameSnacks.game.gameOver()), t.script.animaMsg.clickBoton(null, !0, 1), asignaEventos(t, !0, 1, this.restartGame.bind(this)), t.enabled = !0
    }))
  }
}, GameControl.prototype.clickSettings = function() {
  tocaSonido("click2"), this.settingsPanel.enabled = !0;
  var e = this.settingsPanel.findByName("cerrarb_settings"),
    t = this.settingsPanel.findByName("cerrarAllb_settings"),
    a = this.settingsPanel.findByName("muteb_settings"),
    i = this.settingsPanel.findByName("botonTuto_settings");
  asignaEventos(a, !0, 1, this.clickBotonMuteMain.bind(this, a)), asignaEventos(i, !0, 1, this.clickBotonTutorial.bind(this, "main")), asignaEventos(e, !0, 1, this.clickCerrarSettings.bind(this)), asignaEventos(t, !0, 1, this.clickCerrarSettings.bind(this)), this.configSound(a)
}, GameControl.prototype.clickSettingsEndGame = function() {
  tocaSonido("click2"), this.settingsPanel.enabled = !0;
  var e = this.settingsPanel.findByName("cerrarb_settings"),
    t = this.settingsPanel.findByName("cerrarAllb_settings"),
    a = this.settingsPanel.findByName("muteb_settings"),
    i = this.settingsPanel.findByName("botonTuto_settings"),
    n = this.settingsPanel.findByName("homeb");
  n.enabled = !0, this.configSound(a), asignaEventos(a, !0, 1, this.clickBotonMuteMain.bind(this, a)), asignaEventos(i, !0, 1, this.clickBotonTutorial.bind(this, "end")), asignaEventos(e, !0, 1, this.clickCerrarSettingsEndGame.bind(this)), asignaEventos(t, !0, 1, this.clickCerrarSettingsEndGame.bind(this)), asignaEventos(n, !0, 1, this.endGameEnd.bind(this, "home")), this.screen2D.findByName("PanelEnd").enabled = !1
}, GameControl.prototype.clickCerrarSettings = function() {
  tocaSonido("click2");
  var e = this.settingsPanel.findByName("cerrarb_settings"),
    t = this.settingsPanel.findByName("cerrarAllb_settings"),
    a = this.settingsPanel.findByName("muteb_settings"),
    i = this.settingsPanel.findByName("botonTuto_settings");
  asignaEventos(a, !1), asignaEventos(i, !1), asignaEventos(e, !1), asignaEventos(t, !1), this.settingsPanel.enabled = !1
}, GameControl.prototype.clickCerrarSettingsEndGame = function() {
  tocaSonido("click2");
  var e = this.settingsPanel.findByName("cerrarb_settings"),
    t = this.settingsPanel.findByName("cerrarAllb_settings"),
    a = this.settingsPanel.findByName("muteb_settings"),
    i = this.settingsPanel.findByName("botonTuto_settings"),
    n = this.settingsPanel.findByName("homeb");
  n.enabled = !1, asignaEventos(a, !1), asignaEventos(i, !1), asignaEventos(e, !1), asignaEventos(t, !1), asignaEventos(n, !1), this.settingsPanel.enabled = !1, this.screen2D.findByName("PanelEnd").enabled = !0
}, GameControl.prototype.eventosInicialesOFF = function(e) {
  var t = this.screen2D.findByName("tap");
  asignaEventos(t, !1), t.enabled = !1, this.screen2D.findByName("best").enabled = !1, this.sacaEventosPelotas(), this.botonPelotas.enabled = !1, this.settingsb.enabled = !1, asignaEventos(this.settingsb, !1)
}, GameControl.prototype.clickMenuPelotas = function() {
  tocaSonido("click2"), this.botonPelotas.enabled = !1, this.panelPelotas.enabled = !0, this.eventosPelotas(), this.panelPelotas.findByName("Msg1").enabled = !0, this.panelPelotas.findByName("Msg2").enabled = !0, this.panelPelotas.findByName("Msg3").enabled = !0, bestScore >= 400 && (this.panelPelotas.findByName("Msg1").enabled = !1), bestScore >= 800 && (this.panelPelotas.findByName("Msg2").enabled = !1), bestScore >= 1600 && (this.panelPelotas.findByName("Msg3").enabled = !1), this.panelPelotas.script.animaMsg.poneMueve(null)
}, GameControl.prototype.cerrarMenuPelotas = function() {
  tocaSonido("click2"), this.panelPelotas.script.animaMsg.sacaMueveP(!0, function() {
    this.botonPelotas.enabled = !0, this.buscaNuevasPelotas()
  }.bind(this))
}, GameControl.prototype.buscaNuevasPelotas = function() {
  for (var e = 0, t = 0; t < numPelotas; t++) 0 == pelotasInfo[t][0] && bestScore >= pelotasInfo[t][1] && (e += 1);
  this.botonPelotas.children[0].enabled = !1, e > 0 && (this.botonPelotas.children[0].enabled = !0, this.botonPelotas.children[0].children[0].element.text = e + "")
}, GameControl.prototype.eventosPelotas = function() {
  for (var e = 0; e < numPelotas; e++) this.panelPelotas.children[e].children[0].enabled = !1, this.panelPelotas.children[e].children[1].enabled = !1, this.panelPelotas.children[e].children[2].enabled = !1, 0 == pelotasInfo[e][0] && bestScore >= pelotasInfo[e][1] && (pelotasInfo[e][0] = 1, guardaVars(pelotasInfo[e][0], "pelotasInfo_" + (e + 1) + "_unlock")), 1 == pelotasInfo[e][0] ? this.panelPelotas.children[e].children[0].enabled = !0 : this.panelPelotas.children[e].children[2].enabled = !0, e == currentSkin && (this.panelPelotas.children[e].children[1].enabled = !0), asignaEventos(this.panelPelotas.children[e], !0, 1, this.clickPelota.bind(this, e));
  var t = this.panelPelotas.findByName("cerrarb");
  asignaEventos(t, !0, 1, this.cerrarMenuPelotas.bind(this))
}, GameControl.prototype.sacaEventosPelotas = function() {
  for (var e = 0; e < numPelotas; e++) asignaEventos(this.panelPelotas.children[e], !1);
  var t = this.panelPelotas.findByName("cerrarb");
  asignaEventos(t, !1)
}, GameControl.prototype.clickPelota = function(e) {
  1 == pelotasInfo[e][0] ? (tocaSonido("equipar"), currentSkin = e, guardaVars(currentSkin, "currentSkin"), this.setSkin(), this.sacaEventosPelotas(), this.eventosPelotas()) : 0 == pelotasInfo[e][0] && (bestScore >= pelotasInfo[e][1] ? (pelotasInfo[e][0] = 1, guardaVars(pelotasInfo[e][0], "pelotasInfo_" + (e + 1) + "_unlock"), this.clickPelota(e)) : tocaSonido("noEquipar"))
}, GameControl.prototype.setSkin = function() {
  for (var e = 0; e < numPelotas; e++) this.pelotasSkin.children[e].enabled = !1;
  this.pelotasSkin.children[currentSkin].enabled = !0
}, GameControl.prototype.clickPause = function() {
  if (!enAds) {
    tocaSonido("click2"), this.pausePanel.enabled = !0;
    var e = this.pausePanel.findByName("resumeb"),
      t = this.pausePanel.findByName("cerrarAll"),
      a = this.pausePanel.findByName("endgameb"),
      i = this.pausePanel.findByName("retryb"),
      n = this.screen2D.findByName("muteb");
    this.configSound(n), asignaEventos(e, !0, 1, this.resumePause.bind(this)), asignaEventos(t, !0, 1, this.resumePause.bind(this)), asignaEventos(a, !0, 1, this.endGamePause.bind(this, "home")), asignaEventos(i, !0, 1, this.endGamePause.bind(this, "retry")), pause = !0, this.pauseb.element.opacity = .3, this.app.timeScale = 0
  }
}, GameControl.prototype.resumePause = function() {
  var e = this.pausePanel.findByName("resumeb"),
    t = this.pausePanel.findByName("endgameb"),
    a = this.pausePanel.findByName("retryb"),
    i = this.pausePanel.findByName("cerrarAll");
  asignaEventos(e, !1), asignaEventos(t, !1), asignaEventos(a, !1), asignaEventos(i, !1), this.pauseb.element.opacity = 1, tocaSonido("click2"), pause = !1, this.pausePanel.enabled = !1, this.app.timeScale = 1
}, GameControl.prototype.endGamePause = function(e) {
  var t = this.pausePanel.findByName("resumeb"),
    a = this.pausePanel.findByName("endgameb"),
    i = this.pausePanel.findByName("retryb"),
    n = this.pausePanel.findByName("cerrarAll");
  this.pauseb.element.opacity = 1, asignaEventos(t, !1), asignaEventos(a, !1), asignaEventos(i, !1), asignaEventos(n, !1), tocaSonido("click2"), pause = !1, this.app.timeScale = 1;
  PrepareInterstitital((() => {
    this.pausePanel.enabled = !1, "home" == e && (this.conExit = !0), enGoogle && (console.log("Se llama a gamesnack game over"), GameSnacks.game.gameOver());
    var t = this.screen2D.findByName("lifes"),
      a = this.screen2D.findByName("score"),
      i = this.screen2D.findByName("botonTuto"),
      n = this.screen2D.findByName("muteb");
    asignaEventos(n, !1), t.enabled = !1, a.enabled = !1, i.enabled = !1, n.enabled = !1, this.pauseb.enabled = !1, generateLevel(), this.restartGame()
  }))
}, GameControl.prototype.endGameEnd = function(e) {
  this.clickCerrarSettingsEndGame(), pause = !1, this.app.timeScale = 1, "home" == e && (this.conExit = !0);
  var t = this.screen2D.findByName("lifes"),
    a = this.screen2D.findByName("score"),
    i = this.screen2D.findByName("botonTuto"),
    n = this.screen2D.findByName("muteb");
  asignaEventos(n, !1), t.enabled = !1, a.enabled = !1, i.enabled = !1, n.enabled = !1, this.pauseb.enabled = !1, generateLevel(), this.restartGame()
}, GameControl.prototype.setVidas = function() {
  for (var e = 0; e < totalVidas; e++) this.vidasPelotas[e].enabled = !1;
  for (e = 0; e < vidas; e++) this.vidasPelotas[e].enabled = !0
}, GameControl.prototype.initialize = function() {
  _control = this, _menu = this, _app = this.app, enGoogle && (console.log("SE llamara a gamesnack READY"), GameSnacks.game.ready(), GameSnacks.audio.subscribe((e => {
    (console.log("dentro del subcribe audio de google tenemos el audio enabled?? " + e), e) ? (muteSound = 0, currentMute = 0, mute(0), this.screen2D.findByName("muteb").script.animaMsg.clickBoton(null, !1, 0), this.settingsPanel.findByName("muteb_settings").script.animaMsg.clickBoton(null, !1, 0)) : (muteSound = 1, currentMute = 1, mute(1), this.screen2D.findByName("muteb").script.animaMsg.clickBoton(null, !1, 1), this.settingsPanel.findByName("muteb_settings").script.animaMsg.clickBoton(null, !1, 1))
  }))), this.audioChange(), this.hiloInicio = null, this.tiempoJuego = 0, vidas = totalVidas, this.vidasPelotas = [];
  for (var e = 0; e < vidas; e++) this.vidasPelotas[e] = this.screen2D.findByName("lifes").children[e], this.vidasPelotas[e].enabled = !0;
  this.screen2D.findByName("best").enabled = !1, this.scoreTXT = this.screen2D.findByName("score").children[1], this.scoreTXTMOV = this.screen2D.findByName("score").children[2], this.scoreTXTMOV = this.screen2D.findByName("score").children[2], this.bestTXT = this.screen2D.findByName("score").children[3], this.tweenMSG = null, asignaEventos(this.pauseb, !0, 1, this.clickPause.bind(this)), this.conExit = !1, getAllVars(), this.noAdsb.enabled = !1, this.contactb.enabled = !1, this.shaker = this.camaraSiguePelota.script.shake, this.creaComienzo()
}, GameControl.prototype.esperaCargaTexturas = function() {
  texturaArqueroLoad && (clearInterval(this.hiloInicio), this.creaComienzo())
}, GameControl.prototype.creaComienzo = function() {
  this.app.graphicsDevice.width > this.app.graphicsDevice.height ? (console.log("LANDSCAPE MODE"), this.screen2D.screen.scaleBlend = .87) : this.screen2D.screen.scaleBlend = .5, this.anguloX = 0, this.sentidoBola = new pc.Vec3, this.conBarrera = !1, this.distanciaCam = null, this.indexCamaraPunto = 0, this.arrayCamaraPuntos = [], this.contadorPuntos = 0, this.mueveCamara = !1, this.contadorCamara = 0, this.indexCamara = 0, this.tweenCamara = null, this.tweenCamaraRot = null, finTiempo = !1, enGameOver = !1, this.blancoHit = null, this.secuencia = 0;
  new pc.Color;
  this.conBarrera = !1, this.sentidoBola = new pc.Vec3(0, 0, 0), this.camaraNormal.enabled = !1, this.camaraSiguePelota.enabled = !1, this.camaraComienzo.enabled = !0, this.pelotaReal.setPosition(-.076, .079, -2.358), this.pelotaReal.setEulerAngles(0, 0, 0);
  var e = this.pelotaReal.getPosition();
  if (this.pelota.rigidbody.teleport(e.x, e.y, e.z, 0, 0, 0), this.pelota.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0), this.pelota.rigidbody.angularVelocity = new pc.Vec3(0, 0, 0), this.mataBlancos(), this.arquero.script.arquero.restart(), iniVars(), this.barrera.script.barrera.apagaBarrera(), this.arquero.script.arquero.orientacion(e), this.screen2D.findByName("tap").enabled = !1, skipMenu) return this.screen2D.findByName("tap").enabled = !1, this.continua_empezarGame(), void(skipMenu = !1);
  _sonidos.stop("musicInGame"), _sonidos.play("musicaMenu"), currentPantalla = "menu";
  var t = this.pelotaReal.findByName("camaraRef"),
    a = this.camaraComienzo.getLocalPosition().clone();
  this.camaraComienzo.setLocalPosition(t.getLocalPosition().clone());
  var i = this.camaraComienzo.tween(this.camaraComienzo.getLocalPosition()).to(a, 1.1, pc.SineIn);
  i.onComplete((() => {
    this.finIntro()
  })), i.delay(.25), i.start()
}, GameControl.prototype.finIntro = function() {
  this.eventosIniciales("intro"), this.screen2D.findByName("Logo").script.animaMsg.poneMueve(null), this.screen2D.findByName("tap").enabled = !0, tocaSonido("publico")
}, GameControl.prototype.empezarGame = function() {
  if (botonNoAdsApretado) botonNoAdsApretado = !1;
  else if (!enAds) {
    if (generateLevel(""), 0 == tutorialMostrado) {
      tocaSonido("click2"), this.screen2D.findByName("tap").enabled = !1, (t = this.screen2D.findByName("Logo")).enabled = !1, this.settingsb.enabled = !1, this.clickBotonTutorial("1vez");
      var e = this.screen2D.findByName("tutoPlayb");
      return asignaEventos(e, !0, 1, this.clickFinTutorialPorPlay.bind(this)), void(e.enabled = !1)
    }
    var t;
    tocaSonido("click"), _sonidos.slot("musicInGame").volume = .38, _sonidos.stop("musicaMenu"), mutearMusicas(), (t = this.screen2D.findByName("Logo")).enabled = !1, this.screen2D.findByName("tap").enabled = !1, t.enabled = !1, this.eventosInicialesOFF("intro");
    var a = this.screen2D.findByName("splashUp"),
      i = this.screen2D.findByName("splashDown");
    a.enabled = !0, i.enabled = !0, adsUsados = !1, a.script.animaMsg.mueve(this.continua_empezarGame.bind(this)), i.script.animaMsg.mueve(null)
  }
}, GameControl.prototype.continua_empezarGame = function() {
  adsUsados = !1, publicidad(this.empezarGame_despuesDeAds.bind(this))
}, GameControl.prototype.empezarGame_despuesDeAds = function() {
  this.tiempoJuego = tiempoJuego, this.camaraSiguePelota.camera.fov = fovSeguimiento, finTiempo = !1, enGameOver = !1, _sonidos.play("musicInGame"), mutearMusicas(), onGameStart(), this.bestTXT.element.text = bestScore + "", this.comienzaJuego()
}, GameControl.prototype.comienzaJuego = function() {
  pause = !1;
  var e = this.screen2D.findByName("lifes"),
    t = this.screen2D.findByName("score"),
    a = this.screen2D.findByName("botonTuto");
  this.pauseb.enabled = !0, currentPantalla = "inGame", e.enabled = !0, t.enabled = !0, a.enabled = !0, asignaEventos(a, !1), asignaEventos(a, !0, 1, this.clickBotonTutorial.bind(this, "game")), _globalScore = 0, this.setScore(_globalScore), this.creaTiro(), setTimeout((function() {
    tocaSonido("pito")
  }), 700);
  var i = this.screen2D.findByName("muteb");
  i.enabled = !0, asignaEventos(i, !1), asignaEventos(i, !0, 1, this.clickBotonMute.bind(this)), skipMenu = !1
}, GameControl.prototype.clickBotonMute = function() {
  if (enGoogle ? GameSnacks.audio.isEnabled() : volumeMaster) {
    var e = this.screen2D.findByName("muteb");
    0 == muteSound ? (e.script.animaMsg.clickBoton(null, !1, 1), mute(1)) : (e.script.animaMsg.clickBoton(null, !1, 0), mute(0))
  }
}, GameControl.prototype.configSound = function(e) {
  var t = e;
  0 == muteSound ? t.script.animaMsg.clickBoton(null, !1, 0) : t.script.animaMsg.clickBoton(null, !1, 1)
}, GameControl.prototype.clickBotonMuteMain = function(e) {
  if (enGoogle ? GameSnacks.audio.isEnabled() : volumeMaster) {
    var t = e;
    0 == muteSound ? (t.script.animaMsg.clickBoton(null, !1, 1), mute(1)) : (t.script.animaMsg.clickBoton(null, !1, 0), mute(0))
  }
}, GameControl.prototype.setScore = function(e) {
  if (-1 != e) {
    var t = _globalScore + e - _globalScore;
    _globalScore += e, t > 0 && (onGameUpdate(t), enGoogle && (console.log("Se setea Gamesnack score " + _globalScore), GameSnacks.score.update(_globalScore))), 0 == _globalScore ? this.scoreTXT.element.text = "0" : this.scoreTXT.element.text = _globalScore, e > 0 && (this.scoreTXTMOV.element.text = "+" + e, this.scoreTXTMOV.script.animaMsg.mueve(null))
  } else {
    vidas += 1, this.setVidas();
    var a = _control.screen2D.findByName("extraLifeAnim");
    a.enabled = !0, a.script.animaMsg.poneYSaca(), a.script.animaTexturas.inicioAnim()
  }
}, GameControl.prototype.contadorTiempo = function() {
  if (!pause) {
    if (this.tiempoJuego = this.tiempoJuego - 1, this.tiempoJuego < 0 && (this.tiempoJuego = 0), this.tiempoTXT.element.text = this.tiempoJuego.toString().toHHMMSS(), this.tiempoJuego < 10 && this.tiempoTXT.element.color.toString() == colorNormal) {
      var e = new pc.Color;
      this.tiempoTXT.element.color = e.fromString(colorParpadeo), 0 != bolaLanzada || _sonidos.slot("pocoTiempo").isPlaying || tocaSonido("pocoTiempo")
    } else this.tiempoJuego < 10 && (0 != bolaLanzada || _sonidos.slot("pocoTiempo").isPlaying || tocaSonido("pocoTiempo"), this.tiempoTXT.script.parpadear.autoStart = 2);
    0 == this.tiempoJuego && (_sonidos.stop("pocoTiempo"), clearInterval(this.hiloTiempo), this.tiempoTXT.script.parpadear.autoStart = 0, this.tiempoTXT.element.enabled = !0, finTiempo = !0)
  }
}, GameControl.prototype.creaTiro = function() {
  this.metodoCreaTiro()
}, GameControl.prototype.metodoCreaTiro = function() {
  null != this.tweenMSG && this.tweenMSG.stop(), this.pauseb.enabled = !0, setTimeout(function() {}.bind(this), 100), this.camaraSiguePelota.script.fxaa.enabled = !1, this.camaraNormal.enabled = !0, this.camaraSiguePelota.enabled = !0, this.camaraComienzo.enabled = !1, this.conBarrera = !1, this.sentidoBola = new pc.Vec3(0, 0, 0);
  var e = Math.floor(seedBEKHO[_sequence[this.secuencia]][0] * (this.limiteMaxZ - this.limiteMinZ)) + this.limiteMinZ,
    t = Math.floor(seedBEKHO[_sequence[this.secuencia]][1] * (this.limiteMaxX - this.limiteMinX)) + this.limiteMinX;
  0 == this.secuencia && (e = 5.2, t = Math.random(2) - 2), this.pelota.rigidbody.teleport(t, pelotaY, e, 0, 0, 0), this.pelota.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0), this.pelota.rigidbody.angularVelocity = new pc.Vec3(0, 0, 0), this.camaraNormal.setLocalPosition(0, .477, .25), this.camaraNormal.lookAt(this.arco.getPosition()), this.camaraNormal.translateLocal(0, 0, distanciaFovPelota), pos = this.camaraNormal.getPosition();
  var a = this.camaraNormal.getEulerAngles();
  this.camaraSiguePelota.setPosition(pos.x, pos.y, pos.z), this.camaraSiguePelota.setEulerAngles(a.x, a.y, a.z), this.camaraNormal.enabled = !1, this.camaraSiguePelota.enabled = !0, this.camaraSiguePelota.script.fxaa.enabled = !0, pos = this.pelota.getPosition(), this.arquero.script.arquero.orientacion(pos), a = this.camaraSiguePelota.getEulerAngles(), pos = this.pelota.getPosition(), this.pelota.rigidbody.teleport(pos.x, pos.y, pos.z, a.x, a.y, a.z), sentidoBola = "", this.pelota.script.bolaControl.indicador.enabled = !0, this.app.systems.rigidbody.gravity = new pc.Vec3(0, -2, 0), this.anguloX = this.camaraSiguePelota.getLocalEulerAngles().x;
  var i = this.camaraSiguePelota.getPosition(),
    n = this.pelota.getPosition();
  this.distanciaCam = i.sub(n).clone(), this.indexCamaraPunto = 0, this.arrayCamaraPuntos = [], this.contadorPuntos = 0, this.contadorCamara = 0, this.mueveCamara = !1, this.indexCamara = 0, this.tweenCamara = null, this.tweenCamaraRot = null, this.pelotaReal.setPosition(this.pelota.getPosition()), this.pelotaReal.setRotation(this.pelota.getRotation()), this.mataBlancos(), this.barrera.script.barrera.apagaBarrera(), this.sacaMensajes(), this.seteaTiro();
  var s = this.pelota.script.bolaControl.bolaSombra.script.ribbon.lifetime;
  this.pelota.script.bolaControl.bolaSombra.script.ribbon.lifetime = 0, setTimeout(function() {
    this.pelota.script.bolaControl.bolaSombra.script.ribbon.lifetime = s
  }.bind(this), 200), finTiempo && !enGameOver && this.gameOver()
}, GameControl.prototype.seteaTiro = function() {
  var e = this.blancos.findByName("blanco-arribaizq-stand"),
    t = this.blancos.findByName("blanco-izq-stand"),
    a = this.blancos.findByName("blanco-arribader-stand"),
    i = this.blancos.findByName("blanco-derecha-stand"),
    n = this.blancos.findByName("blanco-arriba-stand");
  e.script.blanco.aparece(), t.script.blanco.aparece(), a.script.blanco.aparece(), i.script.blanco.aparece(), n.script.blanco.aparece();
  var s = [this.blancos.findByName("blancoMovil25"), this.blancos.findByName("blancoMovil50"), this.blancos.findByName("blancoMovil80"), this.blancos.findByName("blancoMovilVida")],
    o = Math.ceil(10 * seedBEKHO[_sequence[this.secuencia]][2]),
    r = 4;
  if (3 == vidas && (r = 3), 2 == o || 4 == o || 8 == o || this.secuencia < 3) {
    this.arquero.enabled = !1, this.arquero.script.arquero.escondeColiders();
    var l = Math.ceil(5 * seedBEKHO[_sequence[this.secuencia]][3]),
      c = Math.floor(seedBEKHO[_sequence[this.secuencia]][4] * r);
    if (2 == l || 4 == l) {
      var m = !1;
      2 == Math.ceil(3 * seedBEKHO[_sequence[this.secuencia]][5]) && (m = !0), s[c].script.blanco.apareceRedondo(m, .5 * seedBEKHO[_sequence[this.secuencia]][6] + .6)
    } else s[c].script.blanco.apareceRedondo(!1, 0), s.splice(c, 1), s[c = Math.floor(2 * seedBEKHO[_sequence[this.secuencia]][7])].script.blanco.apareceRedondo(!0, .5 * seedBEKHO[_sequence[this.secuencia]][8] + .6)
  } else {
    if (5 == (l = Math.ceil(5 * seedBEKHO[_sequence[this.secuencia]][9])) || 1 == l);
    else {
      var h = Math.ceil(4 * seedBEKHO[_sequence[this.secuencia]][10]);
      m = !1;
      this.secuencia > 5 && (1 == h || 3 == h) && (m = !0), s[c = Math.floor(seedBEKHO[_sequence[this.secuencia]][11] * r)].script.blanco.apareceRedondo(m, .5 * seedBEKHO[_sequence[this.secuencia]][12] + .6)
    }
  }
  var d = Math.ceil(10 * seedBEKHO[_sequence[this.secuencia]][13]),
    u = !1;
  this.secuencia > 9 && (2 == d || 4 == d || 6 == d || 8 == d || 10 == d || 1 == d || 5 == d) && (u = !0), this.pelota.getPosition().z < 6.5 && (u = !1), this.conBarrera = u, u && this.barrera.script.barrera.creaBarrera(seedBEKHO[_sequence[this.secuencia]][13]), this.secuencia = this.secuencia + 1, this.secuencia == _sequence.length && (this.secuencia = 0)
}, GameControl.prototype.apagaBlancos = function() {
  var e = this.blancos.findByName("blanco-arribaizq-stand"),
    t = this.blancos.findByName("blanco-izq-stand"),
    a = this.blancos.findByName("blanco-arribader-stand"),
    i = this.blancos.findByName("blanco-derecha-stand"),
    n = this.blancos.findByName("blanco-arriba-stand");
  e.script.blanco.desaparece(), t.script.blanco.desaparece(), a.script.blanco.desaparece(), i.script.blanco.desaparece(), n.script.blanco.desaparece()
}, GameControl.prototype.mataBlancos = function() {
  var e = this.blancos.findByName("blancoMovil25"),
    t = this.blancos.findByName("blancoMovil50"),
    a = this.blancos.findByName("blancoMovil80"),
    i = this.blancos.findByName("blancoMovilVida");
  e.script.blanco.mata(), t.script.blanco.mata(), a.script.blanco.mata(), i.script.blanco.mata()
}, GameControl.prototype.poneMensaje = function(e, t) {
  if (this.sacaMensajes(), this.blancoHit = e, this.mensajes.children[e].enabled = !0, e < 3 ? (this.mensajes.children[e].script.animaMsg.pone1VezMSG(), this.mensajes.children[e].script.animaMsg.traduce(0, !0)) : reproduceAnim(this.mensajes.children[e], 0, 1.1, !1, !0, 700), t) hitBlanco = !0;
  else if (!hitBlanco) {
    var a = this.camaraSiguePelota.getLocalEulerAngles().clone();
    this.camaraSiguePelota.lookAt(this.mensajes.children[this.blancoHit].getPosition());
    var i = this.camaraSiguePelota.getLocalEulerAngles().clone();
    i = new pc.Vec3(a.x, i.y, i.z), this.camaraSiguePelota.setLocalEulerAngles(a), this.tweenMSG = this.camaraSiguePelota.tween(a).rotate(i, 1.3, pc.SineOut), this.tweenMSG.start(), hitBlanco = !0
  }
}, GameControl.prototype.sacaMensajes = function() {
  for (var e = 0; e < this.mensajes.children.length; e++) this.mensajes.children[e].enabled = !1
}, GameControl.prototype.resetTiro = function(e) {
  if (!pause)
    if (e += 50, clearInterval(hiloFinal), e >= 1200)
      if (esGol) null != this.tweenCamara && this.tweenCamara.stop(), null != this.tweenCamaraRot && -1 != this.tweenCamaraRot && this.tweenCamaraRot.stop(), this.camaraSiguePelota.camera.fov = fovSeguimiento, this.arquero.script.arquero.restart(), this.creaTiro(), iniVars();
      else {
        vidas -= 1;
        var t = this.screen2D.findByName("lifesAnim");
        t.enabled = !0, tocaSonido("missGoal"), turnoAcabado = !0, t.script.animaMsg.poneYSaca(), t.script.animaTexturas.inicioAnim(function() {
          this.setVidas(), null != this.tweenCamara && this.tweenCamara.stop(), null != this.tweenCamaraRot && -1 != this.tweenCamaraRot && this.tweenCamaraRot.stop(), 0 == vidas ? setTimeout(function() {
            this.gameOver()
          }.bind(this), 300) : (this.camaraSiguePelota.camera.fov = fovSeguimiento, this.arquero.script.arquero.restart(), this.creaTiro(), iniVars())
        }.bind(this))
      }
  else hiloFinal = setInterval(this.resetTiro.bind(this, e), 50)
}, GameControl.prototype.setBarreraSalto = function() {
  this.conBarrera && this.barrera.script.barrera.saltar()
}, GameControl.prototype.update = function(e) {
  if (1 == bolaLanzada) {
    if (!esGol)(t = this.pelota.getPosition()).x >= -2.3 && t.x <= 2.282 && t.z <= -7.3 && t.z >= -8.864 && t.y <= 1.487 && t.y >= .07 && (esGol = !0);
    this.ajustaCamara(e)
  } else 0 == bolaLanzada && finTiempo && (enGameOver || this.gameOver());
  "inGame" == currentPantalla ? pauseFlag && this.pauseb.enabled && (pauseFlag = !1, this.clickPause()) : pauseFlag = !1;
  var t = this.pelotaReal.getPosition();
  this.sombraPelota.setPosition(new pc.Vec3(t.x, .016, t.z)), esGol && !elFinal && (clearInterval(hiloFinal), elFinal = !0, hiloFinal = setInterval(this.finTiro.bind(this, 0), 50)), this.app.graphicsDevice.width > this.app.graphicsDevice.height ? .87 != this.screen2D.screen.scaleBlend && (this.screen2D.screen.scaleBlend = .87) : .5 != this.screen2D.screen.scaleBlend && (this.screen2D.screen.scaleBlend = .5)
}, GameControl.prototype.finTiro = function(e) {
  if (!pause)
    if (e += 50, clearInterval(hiloFinal), e >= 500) {
      if (esGol && !aplausos) {
        tocaSonido("publico"), aplausos = !0, tocaSonido("gol"), sonidoGol = !0, this.poneMensaje(3, !0), this.setScore(golSCore), sinBlancos = !0;
        var t = this.screen2D.findByName("goalAnimStar");
        t.enabled = !0, t.script.animaTexturas.inicioAnim(), t.script.animaMsg.poneYSaca()
      }
      hiloFinal = setInterval(this.resetTiro.bind(this, 0), 50)
    } else hiloFinal = setInterval(this.finTiro.bind(this, e), 50)
}, GameControl.prototype.texturasTiempo = function() {
  var e = -.5722222222222222 * (this.tiempoJuego - 180) + 0;
  (e = Math.round(e)) > 103 && (e = 103), this.tiempoText.script.animaTexturas.cambiaFrame(e)
}, GameControl.prototype.ajustaCamara = function(e) {
  if (this.pelotaReal.setPosition(this.pelota.getPosition()), 0 != bolaLanzada) {
    this.pelota.getRotation().x <= .0245 && this.pelota.getRotation().x >= -.0245 ? this.pelotaReal.rotate(1e3 * e, 0, 0) : this.pelotaReal.setRotation(this.pelota.getRotation());
    var t = this.camaraSiguePelota.getPosition(),
      a = this.pelota.getPosition(),
      i = t.sub(a);
    if (this.contadorPuntos = this.contadorPuntos + e, null == t) return;
    if (null == t.z) return;
    if (null == i || null == i.z) return;
    if (null == this.distanciaCam || null == this.distanciaCam.z) return;
    if (1 * this.distanciaCam.z < i.z && (this.indexCamaraPunto = this.indexCamaraPunto + 1, this.distanciaCam = i.clone(), 2 == this.indexCamaraPunto && (permitirTrail = !0), 15 == this.indexCamaraPunto && (this.mueveCamara = !0)), this.mueveCamara) {
      if (hitBarrera) return;
      if (!arqueroAtajo && !hitBlanco && !vibrar) {
        var n = this.camaraSiguePelota.getLocalEulerAngles().clone();
        this.camaraSiguePelota.lookAt(this.pelota.getPosition());
        var s = this.camaraSiguePelota.getLocalEulerAngles().clone();
        s.x < this.anguloX && this.camaraSiguePelota.setLocalEulerAngles(this.anguloX, s.y, s.z), s = this.camaraSiguePelota.getLocalEulerAngles().clone();
        var o = this.camaraSiguePelota.getEulerAngles().clone();
        this.camaraSiguePelota.setLocalEulerAngles(n);
        this.camaraSiguePelota.getEulerAngles().clone();
        s = new pc.Vec3(2.5, o.y, o.z), null == this.tweenCamaraRot ? (this.tweenCamaraRot = this.camaraSiguePelota.tween(n).rotate(s, .3, pc.Linear), this.tweenCamaraRot.onComplete((() => {
          this.tweenCamaraRot = -1
        })), this.tweenCamaraRot.start()) : -1 == this.tweenCamaraRot && (this.tweenCamaraRot = this.camaraSiguePelota.tween(n).rotate(s, .15, pc.Linear), this.tweenCamaraRot.onComplete((() => {
          this.tweenCamaraRot = -1
        })), this.tweenCamaraRot.start())
      }
      t = this.camaraSiguePelota.getPosition();
      if (a.z >= -7.5 && efecto && this.camaraSiguePelota.translateLocal(0, 0, -5 * e), vibrar) return null != this.tweenCamara && this.tweenCamara.stop(), void(null != this.tweenCamaraRot && -1 != this.tweenCamaraRot && this.tweenCamaraRot.stop());
      if ((esGol || arqueroAtajo || !efecto || hitBarrera) && null != this.tweenCamaraRot && -1 != this.tweenCamaraRot && this.tweenCamaraRot.stop(), hitBlanco) return;
      if (esGol) return
    }
  }
}, GameControl.prototype.gameOverQuick = function() {
  var e = this.screen2D.findByName("Logo");
  bolaLanzada = 0, clearInterval(this.hiloTiempo), finTiempo = !0, enGameOver = !0, e.enabled ? this.empezarGame() : this.restartGame()
}, GameControl.prototype.gameOver = function() {
  onGameEnd(), currentPantalla = "endGame", clearInterval(this.hiloTiempo), finTiempo = !0, enGameOver = !0, this.conExit ? this.continueNO() : poneContinue(this.screen2D.findByName("continuePanel"), this.continueYES.bind(this), this.continueNO.bind(this))
}, GameControl.prototype.continueYES = function() {
  this.tiempoJuego = this.tiempoJuego + tiempoExtra, this.hiloTiempo = setInterval(this.contadorTiempo.bind(this), 1e3), finTiempo = !1, enGameOver = !1;
  var e = new pc.Color;
  this.tiempoTXT.element.color = e.fromString(colorNormal), this.tiempoTXT.element.text = this.tiempoJuego.toString().toHHMMSS()
}, GameControl.prototype.continueNO = function() {
  if (skipMenu) this.gameOverQuick();
  else {
    tocaSonido("pito"), bolaLanzada = 0, clearInterval(this.hiloTiempo), finTiempo = !0, enGameOver = !0;
    var e = this.screen2D.findByName("lifes"),
      t = this.screen2D.findByName("score"),
      a = this.screen2D.findByName("botonTuto"),
      i = this.screen2D.findByName("muteb");
    asignaEventos(i, !1), this.settingsb.enabled = !0, asignaEventos(this.settingsb, !0, 1, this.clickSettingsEndGame.bind(this)), e.enabled = !1, t.enabled = !1, a.enabled = !1, i.enabled = !1, this.pauseb.enabled = !1;
    var n = this.screen2D.findByName("PanelEnd");
    n.enabled = !1, n.script.animaMsg.pone1Vez(), tocaSonido("publico");
    var s = n.findByName("texto").element;
    "" == _globalScore || 0 == _globalScore || null == _globalScore ? s.text = "0" : s.text = _globalScore, _globalScore > bestScore && 0 != _globalScore && (bestScore = _globalScore, guardaVars(bestScore, "bestScore"));
    var o = n.findByName("texto2").element;
    "" == bestScore || 0 == bestScore || null == bestScore ? o.text = "0" : o.text = bestScore, setTimeout(function() {
      this.eventosIniciales("fin")
    }.bind(this), 1300), generateLevel()
  }
}, GameControl.prototype.restartGame = function() {
  if (!enAds)
    if (botonNoAdsApretado) botonNoAdsApretado = !1;
    else {
      this.settingsb.enabled = !1, asignaEventos(this.settingsb, !1), this.eventosInicialesOFF("fin"), vidas = totalVidas, this.setVidas(), tocaSonido("click"), _sonidos.slot("musicaMenu").volume = .4, _sonidos.stop("musicInGame"), mutearMusicas(), this.screen2D.findByName("PanelEnd").enabled = !1, isMobile.any() ? this.app.touch.off(pc.EVENT_TOUCHSTART, this.restartGame, this) : this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.restartGame, this);
      var e = this.screen2D.findByName("splashUp"),
        t = this.screen2D.findByName("splashDown");
      e.enabled = !0, t.enabled = !0, _globalScore = 0, this.conExit ? (skipMenu = !1, this.conExit = !1) : skipMenu = !0, e.script.animaMsg.mueve(this.creaComienzo.bind(this)), t.script.animaMsg.mueve(null)
    }
}, GameControl.prototype.clickBotonTutorial = function(e) {
  enAds || (this.tutorial3D.enabled || (this.pausePanel.enabled = !1, "1vez" != e && tocaSonido("click2"), this.app.timeScale = 1, this.apareceTutorial(e)))
}, GameControl.prototype.apareceTutorial = function(e) {
  var t, a = this.tutorial3D.script.tutorialFC;
  "main" == e ? t = this.mataTutorial.bind(this, "main") : "game" == e ? t = this.mataTutorial.bind(this, "game") : "1vez" == e ? t = this.mataTutorial.bind(this, "1vez") : "end" == e && (t = this.mataTutorial.bind(this, "end")), "end" == e && (e = "main"), a.empezar(e, t)
}, GameControl.prototype.mataTutorial = function(e) {
  if (tocaSonido("click2"), "game" == e) this.pausePanel.enabled = !0, this.app.timeScale = 0;
  else if ("1vez" == e) {
    var t = this.screen2D.findByName("tutoPlayb");
    asignaEventos(t, !1), t.enabled = !1, this.screen2D.findByName("tap").enabled = !0, this.screen2D.findByName("tap").enabled = !0, this.screen2D.findByName("Logo").enabled = !0, this.settingsb.enabled = !0
  } else if ("end" == e) {
    this.screen2D.findByName("best").enabled = !1, this.screen2D.findByName("Logo").enabled = !1
  }
  0 == tutorialMostrado && (tutorialMostrado = 1, guardaVars(1, "tutorialMostrado"))
}, GameControl.prototype.clickFinTutorialPorPlay = function() {
  this.tutorial3D.script.tutorialFC.clickClose(), this.empezarGame()
}, GameControl.prototype.audioChange = function() {
  (enGoogle ? GameSnacks.audio.isEnabled() : volumeMaster) ? (muteSound = 0, currentMute = 0, mute(0), this.screen2D.findByName("muteb").script.animaMsg.clickBoton(null, !1, 0), this.settingsPanel.findByName("muteb_settings").script.animaMsg.clickBoton(null, !1, 0)) : (muteSound = 1, currentMute = 1, mute(1), this.screen2D.findByName("muteb").script.animaMsg.clickBoton(null, !1, 1), this.settingsPanel.findByName("muteb_settings").script.animaMsg.clickBoton(null, !1, 1))
};
var Arquero = pc.createScript("arquero");
Arquero.attributes.add("arqueroColider", {
  type: "entity",
  title: "arqueroColider"
}), Arquero.attributes.add("arqueroColiderCentro", {
  type: "entity",
  title: "arqueroColiderCentro"
}), Arquero.attributes.add("arqueroColiderVoladaLow", {
  type: "entity",
  title: "arqueroColiderVoladaLow"
}), Arquero.attributes.add("arqueroColiderVoladaMed", {
  type: "entity",
  title: "arqueroColiderVoladaMed"
}), Arquero.attributes.add("arqueroColiderVoladaHigh", {
  type: "entity",
  title: "arqueroColiderVoladaHigh"
}), Arquero.attributes.add("pelota", {
  type: "entity",
  title: "pelota"
}), Arquero.prototype.initialize = function() {
  this.iniArquero = this.entity.getPosition().clone(), this.accionTomada = !1, this.tweenArquero = null, this.especialY = 0, this.especialRot = new pc.Vec3(0, 0, 0), this.entity.setPosition(this.iniArquero), this.coliderDelta = new pc.Vec3(0, .715, 0), reproduceAnim(this.entity, 7, 1.5, 1), this.arqueroColider = this.arqueroColiderCentro, this.escondeColiders(), this.arqueroColider.enabled = !0
}, Arquero.prototype.escondeColiders = function() {
  this.arqueroColiderVoladaLow.enabled = !1, this.arqueroColiderVoladaMed.enabled = !1, this.arqueroColiderVoladaHigh.enabled = !1, this.arqueroColiderCentro.enabled = !1
}, Arquero.prototype.update = function(e) {
  var t = this.entity.getPosition();
  this.entity.getLocalEulerAngles();
  this.arqueroColider.rigidbody.teleport(t.x + this.coliderDelta.x, t.y + this.coliderDelta.y, t.z + this.coliderDelta.z), this.calculaDistanciaPelota()
}, Arquero.prototype.orientacion = function(e) {
  this.entity.lookAt(e), this.entity.rotateLocal(0, 180, 0);
  var t = this.entity.getLocalEulerAngles();
  this.entity.setLocalEulerAngles(0, t.y, 0)
}, Arquero.prototype.restart = function() {
  null != this.tweenArquero && this.tweenArquero.stop(), this.escondeColiders(), this.entity.enabled = !0, this.arqueroColider = this.arqueroColiderCentro, this.arqueroColider.enabled = !0, this.coliderDelta = new pc.Vec3(0, .715, 0), this.tweenArquero = null, this.accionTomada = !1, this.especialY = 0, this.entity.setPosition(this.iniArquero), this.especialRot = new pc.Vec3(0, 0, 0), reproduceAnim(this.entity, 7, 1.5, 1)
}, Arquero.prototype.calculaDistanciaPelota = function() {
  if (this.entity.enabled && !esGol && !(arqueroAtajo || this.pelota.getPosition().z <= -6.35)) {
    var e = (i = this.entity.getPosition()).sub(this.pelota.getPosition()).length();
    if (distanciaBalon = e, 1 == bolaLanzada) {
      var t, i = this.entity.getPosition(),
        o = this.pelota.getPosition(),
        r = !1,
        a = (this.pelota.rigidbody.linearVelocity, !0);
      if (this.accionTomada) return;
      if (t = i.x - o.x, i.z - o.z, "" != arqueroAtaja && o.y > 1.88) return this.accionTomada = !0, void reproduceAnim(this.entity, 3, 1.5, 0);
      "der2" == arqueroAtaja ? o.y >= .55 && o.y <= 1 ? (this.accionTomada = !0, reproduceAnim(this.entity, 8, 1.5, 0), this.escondeColiders(), this.arqueroColider = this.arqueroColiderVoladaMed, this.arqueroColider.enabled = !0, this.coliderDelta = new pc.Vec3(.175, .643, -.321), r = !0) : o.y > 1 ? (this.accionTomada = !0, reproduceAnim(this.entity, 15, 1.5, 0), this.escondeColiders(), this.arqueroColider = this.arqueroColiderVoladaHigh, this.arqueroColider.enabled = !0, this.coliderDelta = new pc.Vec3(.185, .911, -.321), r = !0) : o.y < .55 && (this.accionTomada = !0, reproduceAnim(this.entity, 0, 1.5, 0), this.escondeColiders(), this.arqueroColider = this.arqueroColiderVoladaLow, this.arqueroColider.enabled = !0, this.coliderDelta = new pc.Vec3(.158, .268, -.321), r = !0) : "der" == arqueroAtaja && (o.y >= .55 && o.y <= .82 ? (this.accionTomada = !0, reproduceAnim(this.entity, 13, 1.5, 0)) : o.y > .82 ? (this.accionTomada = !0, reproduceAnim(this.entity, 5, 1.5, 0), r = !0, a = !1) : o.y < .55 && (this.accionTomada = !0, reproduceAnim(this.entity, 10, 1.5, 0))), "izq2" == arqueroAtaja ? o.y >= .55 && o.y <= 1 ? (this.accionTomada = !0, reproduceAnim(this.entity, 9, 1.5, 0), this.escondeColiders(), this.arqueroColider = this.arqueroColiderVoladaMed, this.arqueroColider.enabled = !0, this.coliderDelta = new pc.Vec3(-.175, .643, -.321), r = !0) : o.y > 1 ? (this.accionTomada = !0, reproduceAnim(this.entity, 16, 1.5, 0), this.escondeColiders(), this.arqueroColider = this.arqueroColiderVoladaHigh, this.arqueroColider.enabled = !0, this.coliderDelta = new pc.Vec3(-.185, .911, -.321), r = !0) : o.y < .55 && (this.accionTomada = !0, reproduceAnim(this.entity, 1, 1.5, 0), this.escondeColiders(), this.arqueroColider = this.arqueroColiderVoladaLow, this.arqueroColider.enabled = !0, this.coliderDelta = new pc.Vec3(-.158, .268, -.321), r = !0) : "izq" == arqueroAtaja ? o.y >= .55 && o.y <= .82 ? (this.accionTomada = !0, reproduceAnim(this.entity, 14, 1.5, 0)) : o.y > .82 ? (this.accionTomada = !0, reproduceAnim(this.entity, 6, 1.5, 0), r = !0, a = !1) : o.y < .55 && (this.accionTomada = !0, reproduceAnim(this.entity, 11, 1.5, 0)) : "centro" == arqueroAtaja && (o.y >= .55 && o.y <= .82 ? (this.accionTomada = !0, reproduceAnim(this.entity, 2, 1.5, 0)) : o.y > .82 ? (this.accionTomada = !0, reproduceAnim(this.entity, 4, 1.5, 0)) : o.y < .55 && (this.accionTomada = !0, reproduceAnim(this.entity, 12, 1.5, 0))), r && this.creaTweenArquero(t, 3, a)
    }
  }
}, Arquero.prototype.creaTweenArquero = function(e, t, i) {
  var o = 1;
  e < 0 && (o = -1), Math.abs(e) > 2.1 ? (e = 2.1, e *= o) : Math.abs(e) < .7 && (e = 1 * Math.random() + .75, e *= o), "der" == arqueroAtaja || "der2" == arqueroAtaja ? e > 0 && (e *= -1) : "izq" != arqueroAtaja && "izq2" != arqueroAtaja || e < 0 && (e *= -1);
  var r = this.entity.getLocalPosition(),
    a = 0,
    s = 0;
  i ? (a = new pc.Vec3(r.x - 1.1 * e, r.y, r.z), s = 1.1 * Math.abs(e) / t) : (e *= .35, a = new pc.Vec3(r.x - e, r.y, r.z), s = Math.abs(e) / t), this.tweenArquero = this.entity.tween(r).to(a, s, pc.SineOut), this.tweenArquero.start()
};
var TriggerGol = pc.createScript("triggerGol");
TriggerGol.attributes.add("tipo", {
  type: "string",
  default: ""
}), TriggerGol.attributes.add("arco", {
  type: "entity",
  title: "arco"
}), TriggerGol.prototype.initialize = function() {
  this.entity.collision.on("triggerenter", this.onTriggerEnter, this), this.pelota = this.app.root.findByName("pelota")
}, TriggerGol.prototype.onTriggerEnter = function(e) {
  switch (this.tipo) {
    case "redAtrasT":
    case "redArribaT":
    case "redDerT":
    case "redIzqT":
      switch (efecto = !1, permitirTrail = !1, this.pelota.script.bolaControl.mataTrail(), this.tipo) {
        case "redAtrasT":
          reproduceAnim(this.arco, 2);
          break;
        case "redDerT":
          reproduceAnim(this.arco, 3);
          break;
        case "redIzqT":
          reproduceAnim(this.arco, 1)
      }
      if ("redDerT" != this.tipo && "redIzqT" != this.tipo || (this.pelota.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0)), 1 == (i = _control.screen2D.findByName("lifesAnim")).script.animaMsg.enReproduccion || turnoAcabado) return;
      if (esGol && !aplausos) {
        if (sinBlancos) {
          if (null == (a = _control.screen2D.findByName("extraLifeAnim")).script.animaMsg.enReproduccion || !a.script.animaMsg.enReproduccion)(i = _control.screen2D.findByName("goalAnimStar")).enabled = !0, i.script.animaTexturas.inicioAnim(), i.script.animaMsg.poneYSaca();
          _control.shaker.shake(.3, .4)
        } else {
          if (_control.poneMensaje(3), _control.setScore(golSCore), sinBlancos = !0, null == (a = _control.screen2D.findByName("extraLifeAnim")).script.animaMsg.enReproduccion || !a.script.animaMsg.enReproduccion)(i = _control.screen2D.findByName("goalAnim")).enabled = !0, i.script.animaTexturas.inicioAnim(), i.script.animaMsg.poneYSaca();
          _control.shaker.shake(.3, .4)
        }
        tocaSonido("publico"), aplausos = !0, tocaSonido("gol"), sonidoGol = !0
      } else if (!sonidoGol && (tocaSonido("gol"), sinBlancos = !0, sonidoGol = !0, esGol))
        if (sinBlancos) {
          if (null == (a = _control.screen2D.findByName("extraLifeAnim")).script.animaMsg.enReproduccion || !a.script.animaMsg.enReproduccion)(i = _control.screen2D.findByName("goalAnimStar")).enabled = !0, i.script.animaTexturas.inicioAnim(), i.script.animaMsg.poneYSaca();
          _control.shaker.shake(.3, .4)
        } else {
          var a, i;
          if (_control.poneMensaje(3), _control.setScore(golSCore), sinBlancos = !0, null == (a = _control.screen2D.findByName("extraLifeAnim")).script.animaMsg.enReproduccion || !a.script.animaMsg.enReproduccion)(i = _control.screen2D.findByName("goalAnim")).enabled = !0, i.script.animaTexturas.inicioAnim(), i.script.animaMsg.poneYSaca();
          _control.shaker.shake(.3, .4)
        } break;
    case "paloIzqT":
    case "paloDerT":
    case "travesanoT":
      if (0 == bolaLanzada) return;
      if (esGol) return;
      efecto = !1, tocaSonido("palo"), permitirTrail = !1, this.pelota.script.bolaControl.mataTrail(), _control.shaker.shake(.33, .45), vibrar = !0, palo = !0;
      break;
    case "arqueroColiderT":
      if (1 == bolaLanzada) {
        if (!_control.arquero.enabled) return;
        efecto = !1;
        var r = Math.ceil(3 * Math.random());
        tocaSonido("arqueroAtaja" + r), this.app.systems.rigidbody.gravity = new pc.Vec3(0, -9.8, 0), this.pelota.rigidbody.angularVelocity = new pc.Vec3(0, 0, 0), this.pelota.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0), this.pelota.rigidbody.applyImpulse(0, 0, 2), arqueroAtajo = !0, permitirTrail = !1, this.pelota.script.bolaControl.mataTrail()
      }
      break;
    case "canchaT":
      1 == bolaLanzada && efecto && (efecto = !1, permitirTrail = !1, this.pelota.script.bolaControl.mataTrail(), tocaSonido("arqueroAtaja3"), this.app.systems.rigidbody.gravity = new pc.Vec3(0, -9.8, 0));
      break;
    case "izq":
    case "izq2":
    case "der":
    case "der2":
    case "centro":
      "" == arqueroAtaja && (arqueroAtaja = this.tipo);
      break;
    case "blanco":
      this.entity.parent.script.blanco.tocado();
      break;
    case "barrera":
      r = Math.ceil(3 * Math.random());
      tocaSonido("arqueroAtaja" + r), efecto = !1, this.app.systems.rigidbody.gravity = new pc.Vec3(0, -2, 0), this.pelota.rigidbody.angularVelocity = new pc.Vec3(0, 0, 0), this.pelota.rigidbody.linearVelocity = new pc.Vec3(0, 0, 0), this.pelota.rigidbody.applyImpulse(0, 0, 2), hitBarrera = !0, permitirTrail = !1, this.pelota.script.bolaControl.mataTrail()
  }
};
var AmmoCcd = pc.createScript("ammoCcd");
AmmoCcd.attributes.add("motionThreshold", {
  type: "number",
  default: 1,
  title: "Motion Threshold",
  description: "Number of meters moved in one frame before CCD is enabled"
}), AmmoCcd.attributes.add("sweptSphereRadius", {
  type: "number",
  default: .2,
  title: "Swept Sphere Radius",
  description: "This should be below the half extent of the collision volume. E.g For an object of dimensions 1 meter, try 0.2"
}), AmmoCcd.prototype.initialize = function() {
  this.entity.rigidbody && (this.entity.rigidbody.body.setCcdMotionThreshold(this.motionThreshold), this.entity.rigidbody.body.setCcdSweptSphereRadius(this.sweptSphereRadius))
};
var ColisionContacto = pc.createScript("colisionContacto");
ColisionContacto.attributes.add("tipo", {
  type: "string",
  title: "tipo"
}), ColisionContacto.prototype.initialize = function() {
  this.entity.collision.on("collisionstart ", this.onCollisionStart, this)
}, ColisionContacto.prototype.onCollisionStart = function(t) {
  if (t.other.rigidbody) {
    this.app.systems.rigidbody.gravity = new pc.Vec3(0, -2, 0), efecto = !1;
    var o = Math.ceil(3 * Math.random());
    tocaSonido("arqueroAtaja" + o), arqueroAtajo = !0, permitirTrail = !1, this.pelota.script.bolaControl.mataTrail()
  }
};
var Blanco = pc.createScript("blanco");
Blanco.attributes.add("tipo", {
  type: "string",
  default: "",
  title: "tipo"
}), Blanco.prototype.initialize = function() {
  this.seMueve = !1, this.yaTocado = !1, this.speed = 0, this.sentido = 1, this.limiteX = new pc.Vec2(-1.94, 1.94), this.limiteY = new pc.Vec2(.602, 1.2), this.entity.enabled = !1, this.hilo = null, this.escondido = !1
}, Blanco.prototype.aparece = function() {
  clearInterval(this.hilo), this.entity.enabled = !0, this.escondido = !1, this.yaTocado = !1, reproduceAnim(this.entity, 0, 1, !1), this.hilo = setInterval(this.desaparece.bind(this), 1500)
}, Blanco.prototype.apareceRedondo = function(t, e) {
  clearInterval(this.hilo), this.entity.enabled = !0, this.escondido = !1, this.yaTocado = !1, reproduceAnim(this.entity, 0, 1, !1);
  var i = this.entity.getPosition().z,
    o = seedBEKHO[_sequence[_control.secuencia]][12] * this.limiteX.y * 2 + this.limiteX.x,
    s = seedBEKHO[_sequence[_control.secuencia]][13] * (this.limiteY.y - this.limiteY.x) + this.limiteY.x;
  this.entity.setPosition(new pc.Vec3(o, s, i)), this.speed = e, this.seMueve = t
}, Blanco.prototype.mueveRedondo = function(t) {
  this.seMueve = !0, this.speed = t
}, Blanco.prototype.desaparece = function() {
  clearInterval(this.hilo), this.escondido || (this.escondido = !0, reproduceAnim(this.entity, 2, 1, !1))
}, Blanco.prototype.mata = function() {
  this.entity.enabled = !1
}, Blanco.prototype.stand = function() {
  reproduceAnim(this.entity, 1, 1, !1)
}, Blanco.prototype.getMensaje = function() {
  switch (this.tipo) {
    case "b90":
      _control.setScore(90);
      break;
    case "b80":
      _control.setScore(80);
      break;
    case "b25":
      _control.setScore(25);
      break;
    case "b40":
      _control.setScore(40);
      break;
    case "b70":
      _control.setScore(70);
      break;
    case "b50":
      _control.setScore(50);
      break;
    case "bvida":
      _control.setScore(-1)
  }
  switch (this.tipo) {
    case "bvida":
      return tocaSonido("extraLife"), 2;
    case "b90":
    case "b80":
      return tocaSonido("blanco2"), 2;
    case "b25":
    case "b40":
      return tocaSonido("blanco1"), 0;
    case "b70":
    case "b50":
      return tocaSonido("blanco2"), 1
  }
}, Blanco.prototype.hitEsquina = function() {
  this.escondido = !1, reproduceAnim(this.entity, 1, 1, !1), this.hilo = setInterval(this.desaparece.bind(this), 500), _control.poneMensaje(this.getMensaje())
}, Blanco.prototype.hitRedondo = function() {
  reproduceAnim(this.entity, 1, 1, !1, !0, 450), this.seMueve = !1, _control.poneMensaje(this.getMensaje())
}, Blanco.prototype.tocado = function() {
  if (!this.yaTocado && !sinBlancos) {
    switch (aplausos || (tocaSonido("publico"), aplausos = !0), this.yaTocado = !0, this.tipo) {
      case "b70":
      case "b90":
      case "b40":
        this.hitEsquina();
        break;
      case "b25":
      case "b50":
      case "b80":
      case "bvida":
        this.hitRedondo()
    }
    sonidoGol && (sinBlancos = !0)
  }
}, Blanco.prototype.update = function(t) {
  if (this.seMueve) {
    var e = this.entity.getPosition();
    this.entity.setPosition(e.x + t * this.speed * this.sentido, e.y, e.z), e = this.entity.getPosition(), 1 == this.sentido && e.x > this.limiteX.y ? (this.entity.setPosition(this.limiteX.y, e.y, e.z), this.sentido = -1) : -1 == this.sentido && e.x < this.limiteX.x && (this.entity.setPosition(this.limiteX.x, e.y, e.z), this.sentido = 1)
  }
};
var Barrera = pc.createScript("barrera");
Barrera.attributes.add("barreraT", {
  type: "entity",
  title: "barreraT"
}), Barrera.prototype.initialize = function() {
  this.apagaBarrera(), this.barreraElegida = null, this.barreraElegidaT = null
}, Barrera.prototype.apagaBarrera = function() {
  for (var r = 0; r < this.entity.children.length; r++) this.entity.children[r].enabled = !1, this.entity.children[r].setPosition(0, -3.414, 0), this.barreraT.children[r].enabled = !1, this.barreraT.children[r].setPosition(0, -3.414, 0);
  this.barreraElegida = null, this.barreraElegidaT = null
}, Barrera.prototype.creaBarrera = function(r) {
  var e = Math.floor(r * this.entity.children.length),
    a = this.entity.children[e];
  a.enabled = !0, this.barreraElegida = a, this.barreraElegidaT = this.barreraT.children[e];
  var t = _control.pelota.getPosition().clone();
  a.setPosition(t.x, .014, t.z), a.setEulerAngles(_control.pelota.getEulerAngles().clone()), a.translateLocal(0, 0, -4.9), t = a.getPosition().clone(), a.setPosition(t.x, .014, t.z), t = _control.pelota.getPosition().clone(), this.barreraElegidaT.setPosition(t.x, .014, t.z), this.barreraElegidaT.setEulerAngles(_control.pelota.getEulerAngles().clone()), this.barreraElegidaT.translateLocal(0, 0, -4.9), t = this.barreraElegidaT.getPosition().clone(), this.barreraElegidaT.setPosition(t.x, .014, t.z), this.stand()
}, Barrera.prototype.saltar = function() {
  for (var r = 0; r < this.barreraElegida.children.length - 1; r++) reproduceAnim(this.barreraElegida.children[r], 1, 1.1, !1)
}, Barrera.prototype.stand = function() {
  for (var r = 0; r < this.barreraElegida.children.length - 1; r++) reproduceAnim(this.barreraElegida.children[r], 0, 1, !0)
}, Barrera.prototype.standT = function() {
  for (var r = 0; r < this.barreraElegidaT.children.length - 1; r++) reproduceAnim(this.barreraElegidaT.children[r], 0, 1, !0)
}, Barrera.prototype.update = function(r) {
  null != this.barreraElegida && null != _control && null != _control.camaraSiguePelota && _control.pelota.getPosition().z < this.barreraElegida.getPosition().z - 1.5 && this.barreraElegida.enabled && (this.barreraElegida.enabled = !1, this.barreraElegidaT.enabled = !0, this.standT())
};
var Shake = pc.createScript("shake");
Shake.attributes.add("cameraFake", {
  type: "entity",
  title: "cameraFake"
}), Shake.prototype.initialize = function() {
  this.timer = 0, this.shaking = !1, this.amplitude = 1, this.duration = 0, this.frequency = 10, this.x = 0, this.y = 0, this.z = 0, this.offset = new pc.Vec3, this.position = new pc.Vec3
}, Shake.prototype.reset = function() {
  this.shaking = !1, this.offset.set(0, 0, 0), vibrar = -1
}, Shake.prototype.shake = function(t, i) {
  this.shaking || (this.amplitude = .5 * t, this.duration = i, this.timer = 0, this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.lastTargetPosition = this.entity.getLocalPosition().clone(), this.position.copy(this.entity.getLocalPosition()), this.shaking = !0)
}, Shake.prototype.update = function(t) {
  if (this.shaking) {
    var i = new pc.Vec3,
      e = this.cameraFake.getPosition().clone();
    i.copy(e);
    var s = this.getShake(t);
    if (!s) return;
    i.add(s), this.entity.setPosition(i)
  }
}, Shake.prototype.getShake = function(t) {
  if (this.shaking) {
    var i = 1 - this.timer / this.duration;
    if (this.offset.x = this.getNoise(this.x) * this.amplitude * i, this.offset.y = this.getNoise(this.y) * this.amplitude * i, this.offset.z = this.getNoise(this.z) * this.amplitude * i, this.timer += t, this.timer > this.duration) return this.reset(), !1;
    i = this.frequency * t;
    this.x += i, this.y += i, this.z += i
  } else this.offset.set(0, 0, 0);
  return this.offset
}, Shake.prototype.fade = function(t) {
  return t * t * t * (t * (6 * t - 15) + 10)
}, Shake.prototype.lerp = function(t, i, e) {
  return i + t * (e - i)
}, Shake.prototype.getNoise = function(t) {
  var i = Math.floor(t);
  t -= i;
  var e = this.fade(t),
    s = 1 & perm[i] ? t : -t,
    h = 1 & perm[i + 1] ? t - 1 : 1 - t;
  return this.lerp(e, s, h)
};
var seedBEKHO = [];
seedBEKHO[0] = [], seedBEKHO[0][0] = .6650405826383701, seedBEKHO[0][1] = .7104575171666869, seedBEKHO[0][2] = .09229205934795726, seedBEKHO[0][3] = .9525121950183839, seedBEKHO[0][4] = .4760604020508923, seedBEKHO[0][5] = .8357892988299247, seedBEKHO[0][6] = .2785135707006303, seedBEKHO[0][7] = .8052034642895396, seedBEKHO[0][8] = .6102251965329972, seedBEKHO[0][9] = .26802795817284397, seedBEKHO[0][10] = .4292944364359106, seedBEKHO[0][11] = .9386370439220777, seedBEKHO[0][12] = .24720838852559246, seedBEKHO[0][13] = .7192161817467717, seedBEKHO[1] = [], seedBEKHO[1][0] = .545365451258202, seedBEKHO[1][1] = .7198628173716299, seedBEKHO[1][2] = .5306184509011405, seedBEKHO[1][3] = .127783489769006, seedBEKHO[1][4] = .8234955960712464, seedBEKHO[1][5] = .9694276153929229, seedBEKHO[1][6] = .14646005667443385, seedBEKHO[1][7] = .44294836673554827, seedBEKHO[1][8] = .8405383176295571, seedBEKHO[1][9] = .7481083372046013, seedBEKHO[1][10] = .7468671369868345, seedBEKHO[1][11] = .711048275965843, seedBEKHO[1][12] = .5272703214001888, seedBEKHO[1][13] = .570263412424254, seedBEKHO[2] = [], seedBEKHO[2][0] = .47512655445169427, seedBEKHO[2][1] = .5506052230241023, seedBEKHO[2][2] = .06969523733534833, seedBEKHO[2][3] = .013689220897369347, seedBEKHO[2][4] = .1254509416206675, seedBEKHO[2][5] = .9722550950802722, seedBEKHO[2][6] = .3427497730727631, seedBEKHO[2][7] = .9314882083088236, seedBEKHO[2][8] = .6490995950694363, seedBEKHO[2][9] = .5312125904651239, seedBEKHO[2][10] = .5313756968207477, seedBEKHO[2][11] = .5131441954976133, seedBEKHO[2][12] = .1554450782097272, seedBEKHO[2][13] = .9694446713133218, seedBEKHO[3] = [], seedBEKHO[3][0] = .9943711501211898, seedBEKHO[3][1] = .20608303636885417, seedBEKHO[3][2] = .7272344206558008, seedBEKHO[3][3] = .1288088050295777, seedBEKHO[3][4] = .6921005487897265, seedBEKHO[3][5] = .8842187285864935, seedBEKHO[3][6] = .9807319582548664, seedBEKHO[3][7] = .19244718019390983, seedBEKHO[3][8] = .10595556542847095, seedBEKHO[3][9] = .17239376616350333, seedBEKHO[3][10] = .2464539616011614, seedBEKHO[3][11] = .03069532231104488, seedBEKHO[3][12] = .5260653205307055, seedBEKHO[3][13] = .789198078922269, seedBEKHO[4] = [], seedBEKHO[4][0] = .6405247906942577, seedBEKHO[4][1] = .10248532920840714, seedBEKHO[4][2] = .271783598620559, seedBEKHO[4][3] = .5778851057831071, seedBEKHO[4][4] = .47951639881659824, seedBEKHO[4][5] = .14942595225533872, seedBEKHO[4][6] = .7338231282665055, seedBEKHO[4][7] = .24557990427401677, seedBEKHO[4][8] = .5451024729837735, seedBEKHO[4][9] = .5878900969610983, seedBEKHO[4][10] = .4244888294609259, seedBEKHO[4][11] = .3854522171779957, seedBEKHO[4][12] = .8368914575197703, seedBEKHO[4][13] = .0782637453064019, seedBEKHO[5] = [], seedBEKHO[5][0] = .7150424128496751, seedBEKHO[5][1] = .9395857086415873, seedBEKHO[5][2] = .9288598666504675, seedBEKHO[5][3] = .2565553004714207, seedBEKHO[5][4] = .5934261344894327, seedBEKHO[5][5] = .63377735375858, seedBEKHO[5][6] = .6955210400641005, seedBEKHO[5][7] = .075468184450318, seedBEKHO[5][8] = .3963053233826752, seedBEKHO[5][9] = .6357775273678796, seedBEKHO[5][10] = .672609491808384, seedBEKHO[5][11] = .464323435954771, seedBEKHO[5][12] = .4759044886268877, seedBEKHO[5][13] = .06949914102661547, seedBEKHO[6] = [], seedBEKHO[6][0] = .5670810966547954, seedBEKHO[6][1] = .017378636498166733, seedBEKHO[6][2] = .2671187274833473, seedBEKHO[6][3] = .08473430215152611, seedBEKHO[6][4] = .10220335770119515, seedBEKHO[6][5] = .8786392637046618, seedBEKHO[6][6] = .24401337320757377, seedBEKHO[6][7] = .32164419566197777, seedBEKHO[6][8] = .2846365166226952, seedBEKHO[6][9] = .7940762155521486, seedBEKHO[6][10] = .5805431991246877, seedBEKHO[6][11] = .4152718344768074, seedBEKHO[6][12] = .2711171717620515, seedBEKHO[6][13] = .6938876094941486, seedBEKHO[7] = [], seedBEKHO[7][0] = .20214436622923815, seedBEKHO[7][1] = .2441592039388063, seedBEKHO[7][2] = .5972923572754645, seedBEKHO[7][3] = .004383105838564383, seedBEKHO[7][4] = .7228487350677746, seedBEKHO[7][5] = .7104217998387419, seedBEKHO[7][6] = .6750501183501529, seedBEKHO[7][7] = .07952366827166135, seedBEKHO[7][8] = .3895337551311089, seedBEKHO[7][9] = .6166124837857607, seedBEKHO[7][10] = .4622779784453752, seedBEKHO[7][11] = .9540189370020165, seedBEKHO[7][12] = .004813729888892171, seedBEKHO[7][13] = .8967237643923358, seedBEKHO[8] = [], seedBEKHO[8][0] = .8819407229856853, seedBEKHO[8][1] = .0764913468511037, seedBEKHO[8][2] = .046893610138214026, seedBEKHO[8][3] = .04853868851759535, seedBEKHO[8][4] = .6299746450740225, seedBEKHO[8][5] = .8623348095341281, seedBEKHO[8][6] = .5844514843766151, seedBEKHO[8][7] = .25938650154413323, seedBEKHO[8][8] = .025237481128983497, seedBEKHO[8][9] = .4299564578433326, seedBEKHO[8][10] = .6141153315812811, seedBEKHO[8][11] = .036333192317460794, seedBEKHO[8][12] = .26536509914245765, seedBEKHO[8][13] = .33385509585056816, seedBEKHO[9] = [], seedBEKHO[9][0] = .5274394035530119, seedBEKHO[9][1] = .3199803700446937, seedBEKHO[9][2] = .9686219579625599, seedBEKHO[9][3] = .25611002519403825, seedBEKHO[9][4] = .114738542490052, seedBEKHO[9][5] = .5141016956837725, seedBEKHO[9][6] = .7718293227398718, seedBEKHO[9][7] = .38340358346954706, seedBEKHO[9][8] = .5250940387655274, seedBEKHO[9][9] = .3639856840411009, seedBEKHO[9][10] = .4186835493227621, seedBEKHO[9][11] = .2595804568868396, seedBEKHO[9][12] = .7341228857197801, seedBEKHO[9][13] = .7499049029680995, seedBEKHO[10] = [], seedBEKHO[10][0] = .6029618243289345, seedBEKHO[10][1] = .953825552146208, seedBEKHO[10][2] = .1967743788419345, seedBEKHO[10][3] = .898039910831967, seedBEKHO[10][4] = .3280712830100987, seedBEKHO[10][5] = .9538118369098392, seedBEKHO[10][6] = .8607581586021231, seedBEKHO[10][7] = .66885229819391, seedBEKHO[10][8] = .291243132481505, seedBEKHO[10][9] = .03717722282692204, seedBEKHO[10][10] = .4284241701316198, seedBEKHO[10][11] = .11926850933133482, seedBEKHO[10][12] = .836516273000266, seedBEKHO[10][13] = .08070270868970497, seedBEKHO[11] = [], seedBEKHO[11][0] = .07643775467268399, seedBEKHO[11][1] = .8394272733290402, seedBEKHO[11][2] = .5348365175057013, seedBEKHO[11][3] = .4225633433388267, seedBEKHO[11][4] = .21259576787798484, seedBEKHO[11][5] = .3796819871417121, seedBEKHO[11][6] = .4547391483767864, seedBEKHO[11][7] = .8564964895711409, seedBEKHO[11][8] = .7475726517830095, seedBEKHO[11][9] = .8714535243077395, seedBEKHO[11][10] = .1979838528115232, seedBEKHO[11][11] = .5796541878541075, seedBEKHO[11][12] = .6133440441734637, seedBEKHO[11][13] = .08310842005090291, seedBEKHO[12] = [], seedBEKHO[12][0] = .2760142894824724, seedBEKHO[12][1] = .6837566478515307, seedBEKHO[12][2] = .5345186722473325, seedBEKHO[12][3] = .17107088618605748, seedBEKHO[12][4] = .3894278723645439, seedBEKHO[12][5] = .2830587385071781, seedBEKHO[12][6] = .6121652361408305, seedBEKHO[12][7] = .21262417540913958, seedBEKHO[12][8] = .1476912001817856, seedBEKHO[12][9] = .46130818185750444, seedBEKHO[12][10] = .17878166189065525, seedBEKHO[12][11] = .9378267171337049, seedBEKHO[12][12] = .5676339618441153, seedBEKHO[12][13] = .17428606813557312, seedBEKHO[13] = [], seedBEKHO[13][0] = .9875248897585678, seedBEKHO[13][1] = .23253697809264628, seedBEKHO[13][2] = .7018130465646801, seedBEKHO[13][3] = .9901354941554732, seedBEKHO[13][4] = .7463037565456316, seedBEKHO[13][5] = .3168977243904172, seedBEKHO[13][6] = .1692078892533373, seedBEKHO[13][7] = .8330646724792885, seedBEKHO[13][8] = .26176805245151624, seedBEKHO[13][9] = .6644933521998382, seedBEKHO[13][10] = .6847905342576444, seedBEKHO[13][11] = .4444537677941043, seedBEKHO[13][12] = .6438591279009849, seedBEKHO[13][13] = .005866010223603446, seedBEKHO[14] = [], seedBEKHO[14][0] = .29642117748544616, seedBEKHO[14][1] = .5370663709742989, seedBEKHO[14][2] = .9928912251419599, seedBEKHO[14][3] = .009301953044529743, seedBEKHO[14][4] = .2570981674953776, seedBEKHO[14][5] = .30631559522005425, seedBEKHO[14][6] = .86943379386896, seedBEKHO[14][7] = .5257707875497519, seedBEKHO[14][8] = .3618460076423071, seedBEKHO[14][9] = .38920075312711977, seedBEKHO[14][10] = .11152794189484161, seedBEKHO[14][11] = .3259744286402342, seedBEKHO[14][12] = .6315709893634911, seedBEKHO[14][13] = .1934074609988996, seedBEKHO[15] = [], seedBEKHO[15][0] = .34245493575916797, seedBEKHO[15][1] = .4003340286441386, seedBEKHO[15][2] = .28648902058271397, seedBEKHO[15][3] = .8858802344170944, seedBEKHO[15][4] = .37945851591526947, seedBEKHO[15][5] = .19784111605586685, seedBEKHO[15][6] = .5700731576195348, seedBEKHO[15][7] = .7360515343704628, seedBEKHO[15][8] = .34557440179656207, seedBEKHO[15][9] = .5001545090630233, seedBEKHO[15][10] = .44220324772862285, seedBEKHO[15][11] = .16859826160510716, seedBEKHO[15][12] = .32815514674037094, seedBEKHO[15][13] = .49589490590673946, seedBEKHO[16] = [], seedBEKHO[16][0] = .7015998929309497, seedBEKHO[16][1] = .6975701461762187, seedBEKHO[16][2] = .6845459562539693, seedBEKHO[16][3] = .4292409929002208, seedBEKHO[16][4] = .16591256049013126, seedBEKHO[16][5] = .3080075752587732, seedBEKHO[16][6] = .8577014406533194, seedBEKHO[16][7] = .009476718237637405, seedBEKHO[16][8] = .7265431204312065, seedBEKHO[16][9] = .10977406796500189, seedBEKHO[16][10] = .4569456524759874, seedBEKHO[16][11] = .453689415750552, seedBEKHO[16][12] = .10998757348568011, seedBEKHO[16][13] = .2133634595618874, seedBEKHO[17] = [], seedBEKHO[17][0] = .30196360318551285, seedBEKHO[17][1] = .6501377589634765, seedBEKHO[17][2] = .5776964745353101, seedBEKHO[17][3] = .8841531253332118, seedBEKHO[17][4] = .17436431307457378, seedBEKHO[17][5] = .024682966771437442, seedBEKHO[17][6] = .7547718454240362, seedBEKHO[17][7] = .30891953596688304, seedBEKHO[17][8] = .29188754956611107, seedBEKHO[17][9] = .405689399865957, seedBEKHO[17][10] = .5915557661634294, seedBEKHO[17][11] = .04773051524228378, seedBEKHO[17][12] = .3818978149433505, seedBEKHO[17][13] = .7905089313870868, seedBEKHO[18] = [], seedBEKHO[18][0] = .2920408079474319, seedBEKHO[18][1] = .056713529732070445, seedBEKHO[18][2] = .6166016367632978, seedBEKHO[18][3] = .28266826681472557, seedBEKHO[18][4] = .552037675708825, seedBEKHO[18][5] = .9828565456755263, seedBEKHO[18][6] = .6251432641608121, seedBEKHO[18][7] = .8215898321043873, seedBEKHO[18][8] = .11718677465123672, seedBEKHO[18][9] = .23962841015671632, seedBEKHO[18][10] = .5361392606292068, seedBEKHO[18][11] = .6803553868238268, seedBEKHO[18][12] = .7013734048802647, seedBEKHO[18][13] = .8243903312104854, seedBEKHO[19] = [], seedBEKHO[19][0] = .6355896653816169, seedBEKHO[19][1] = .49386615319212224, seedBEKHO[19][2] = .3864639346935552, seedBEKHO[19][3] = .2944138440047237, seedBEKHO[19][4] = .8206298976667283, seedBEKHO[19][5] = .8461003398449836, seedBEKHO[19][6] = .7441433205940606, seedBEKHO[19][7] = .5731900158661398, seedBEKHO[19][8] = .8826129221319285, seedBEKHO[19][9] = .9499526755851302, seedBEKHO[19][10] = .573019088403828, seedBEKHO[19][11] = .6325340274801898, seedBEKHO[19][12] = .5695067031533614, seedBEKHO[19][13] = .7030760330393617, seedBEKHO[20] = [], seedBEKHO[20][0] = .026613459924702987, seedBEKHO[20][1] = .5505789201985754, seedBEKHO[20][2] = .3675415236901729, seedBEKHO[20][3] = .34051352327608986, seedBEKHO[20][4] = .08473603555107401, seedBEKHO[20][5] = .4120047598570047, seedBEKHO[20][6] = .5862791299281742, seedBEKHO[20][7] = .16877448902838643, seedBEKHO[20][8] = .15163562614731485, seedBEKHO[20][9] = .01987639693463117, seedBEKHO[20][10] = .2794132690275444, seedBEKHO[20][11] = .7293249917305931, seedBEKHO[20][12] = .4456820482477559, seedBEKHO[20][13] = .8744805126686763, seedBEKHO[21] = [], seedBEKHO[21][0] = .7681898385359933, seedBEKHO[21][1] = .6053646432711803, seedBEKHO[21][2] = .6740787454877626, seedBEKHO[21][3] = .04320347268736824, seedBEKHO[21][4] = .15584031338769422, seedBEKHO[21][5] = .4135114341595445, seedBEKHO[21][6] = .42309900877622364, seedBEKHO[21][7] = .62017156422427, seedBEKHO[21][8] = .9552175671407157, seedBEKHO[21][9] = .6592526183532654, seedBEKHO[21][10] = .6280008613892403, seedBEKHO[21][11] = .5729022762007763, seedBEKHO[21][12] = .7616616707723456, seedBEKHO[21][13] = .9249144514060628, seedBEKHO[22] = [], seedBEKHO[22][0] = .5671561934059579, seedBEKHO[22][1] = .17203481308570479, seedBEKHO[22][2] = .7311644837821138, seedBEKHO[22][3] = .06149937609042477, seedBEKHO[22][4] = .671526290038952, seedBEKHO[22][5] = .27913967448658616, seedBEKHO[22][6] = .09009332453819208, seedBEKHO[22][7] = .9791189591702296, seedBEKHO[22][8] = .6506457665421772, seedBEKHO[22][9] = .0346451376960657, seedBEKHO[22][10] = .5274501939299618, seedBEKHO[22][11] = .46745718685952364, seedBEKHO[22][12] = .20054033357562773, seedBEKHO[22][13] = .8435729904112814, seedBEKHO[23] = [], seedBEKHO[23][0] = .14752644523638958, seedBEKHO[23][1] = .1504410018845197, seedBEKHO[23][2] = .4384755386615484, seedBEKHO[23][3] = .4288429879470943, seedBEKHO[23][4] = .6629897582589177, seedBEKHO[23][5] = .2274395200527355, seedBEKHO[23][6] = .06287866784747842, seedBEKHO[23][7] = .13275975679935015, seedBEKHO[23][8] = .9545234243556222, seedBEKHO[23][9] = .29634709188967157, seedBEKHO[23][10] = .9266722086659434, seedBEKHO[23][11] = .9167895095247178, seedBEKHO[23][12] = .7328682231491401, seedBEKHO[23][13] = .2714037347519551, seedBEKHO[24] = [], seedBEKHO[24][0] = .8297020598108289, seedBEKHO[24][1] = .9369609802117023, seedBEKHO[24][2] = .22800995430657722, seedBEKHO[24][3] = .3611434828107427, seedBEKHO[24][4] = .19160138847674113, seedBEKHO[24][5] = .184373641821018, seedBEKHO[24][6] = .5774157831424125, seedBEKHO[24][7] = .12464097136999364, seedBEKHO[24][8] = .5714689475401566, seedBEKHO[24][9] = .08415897254411475, seedBEKHO[24][10] = .20598044326331455, seedBEKHO[24][11] = .10541332049652641, seedBEKHO[24][12] = .011612322028503597, seedBEKHO[24][13] = .5023073457636031, seedBEKHO[25] = [], seedBEKHO[25][0] = .49591350598477457, seedBEKHO[25][1] = .4529971538826194, seedBEKHO[25][2] = .39263363920202377, seedBEKHO[25][3] = .788547447332129, seedBEKHO[25][4] = .3691915260441023, seedBEKHO[25][5] = .5684854728919542, seedBEKHO[25][6] = .6394670525588559, seedBEKHO[25][7] = .22607733158834842, seedBEKHO[25][8] = .9029360044813111, seedBEKHO[25][9] = .6927661879824325, seedBEKHO[25][10] = .21737026224554068, seedBEKHO[25][11] = .25502076731022916, seedBEKHO[25][12] = .13003074738622367, seedBEKHO[25][13] = .5812193854568777, seedBEKHO[26] = [], seedBEKHO[26][0] = .17454281571867258, seedBEKHO[26][1] = .2705246420473333, seedBEKHO[26][2] = .8267692874356305, seedBEKHO[26][3] = .5601996282438815, seedBEKHO[26][4] = .6024061584275495, seedBEKHO[26][5] = .8307835718317427, seedBEKHO[26][6] = .8719443238077924, seedBEKHO[26][7] = .11073430214684787, seedBEKHO[26][8] = .5236385792720641, seedBEKHO[26][9] = .19344449841887834, seedBEKHO[26][10] = .5871815219002499, seedBEKHO[26][11] = .6127769548098139, seedBEKHO[26][12] = .600097007680906, seedBEKHO[26][13] = .20290883569954743, seedBEKHO[27] = [], seedBEKHO[27][0] = .0004587264338542507, seedBEKHO[27][1] = .6170704553507744, seedBEKHO[27][2] = .1651097782948765, seedBEKHO[27][3] = .014406586912249386, seedBEKHO[27][4] = .6588163583234949, seedBEKHO[27][5] = .9583609633643411, seedBEKHO[27][6] = .11842278473093293, seedBEKHO[27][7] = .6261786866629626, seedBEKHO[27][8] = .8963153791710234, seedBEKHO[27][9] = .2481119600513535, seedBEKHO[27][10] = .14365681788277174, seedBEKHO[27][11] = .585518364014137, seedBEKHO[27][12] = .12487997307732557, seedBEKHO[27][13] = .8496295430696392, seedBEKHO[28] = [], seedBEKHO[28][0] = .7369626807809235, seedBEKHO[28][1] = .20712014323633032, seedBEKHO[28][2] = .24966249053743006, seedBEKHO[28][3] = .5666064581720505, seedBEKHO[28][4] = .9261696801887402, seedBEKHO[28][5] = .8493309677909224, seedBEKHO[28][6] = .9638602779091532, seedBEKHO[28][7] = .462397294216091, seedBEKHO[28][8] = .9570490644845617, seedBEKHO[28][9] = .05264526549195003, seedBEKHO[28][10] = .5395491802340122, seedBEKHO[28][11] = .9433286864515837, seedBEKHO[28][12] = .6416566273729063, seedBEKHO[28][13] = .6593468219428804, seedBEKHO[29] = [], seedBEKHO[29][0] = .9333254138883615, seedBEKHO[29][1] = .3265231931195831, seedBEKHO[29][2] = .9349542306095846, seedBEKHO[29][3] = .4129800592464057, seedBEKHO[29][4] = .8210353065340561, seedBEKHO[29][5] = .7431854356938414, seedBEKHO[29][6] = .36081237176615577, seedBEKHO[29][7] = .045956675941214886, seedBEKHO[29][8] = .12226491754006674, seedBEKHO[29][9] = .522836755051572, seedBEKHO[29][10] = .28861047303440523, seedBEKHO[29][11] = .34672325186117625, seedBEKHO[29][12] = .29656830225416075, seedBEKHO[29][13] = .7976890540698292, seedBEKHO[30] = [], seedBEKHO[30][0] = .8285597888505756, seedBEKHO[30][1] = .1930851269825855, seedBEKHO[30][2] = .6770469350482755, seedBEKHO[30][3] = .8014252537573743, seedBEKHO[30][4] = .8250081433406813, seedBEKHO[30][5] = .6618693921874121, seedBEKHO[30][6] = .003134495209174304, seedBEKHO[30][7] = .5654206013710086, seedBEKHO[30][8] = .23172370828584765, seedBEKHO[30][9] = .7621330118428586, seedBEKHO[30][10] = .732495580576721, seedBEKHO[30][11] = .6954834249385609, seedBEKHO[30][12] = .10528923532944146, seedBEKHO[30][13] = .08247821308261605, seedBEKHO[31] = [], seedBEKHO[31][0] = .7261670282347366, seedBEKHO[31][1] = .45801830816902567, seedBEKHO[31][2] = .9262798805336241, seedBEKHO[31][3] = .29948012792494016, seedBEKHO[31][4] = .799189170658303, seedBEKHO[31][5] = .4752471645003091, seedBEKHO[31][6] = .23105580539026227, seedBEKHO[31][7] = .7120015579172208, seedBEKHO[31][8] = .15406318285238307, seedBEKHO[31][9] = .8962574363738502, seedBEKHO[31][10] = .048677765415008345, seedBEKHO[31][11] = .0022870424957872615, seedBEKHO[31][12] = .1846269101705813, seedBEKHO[31][13] = .9278080157203488, seedBEKHO[32] = [], seedBEKHO[32][0] = .3222935544072174, seedBEKHO[32][1] = .07259096980641644, seedBEKHO[32][2] = .2780700341727742, seedBEKHO[32][3] = .12242198547673766, seedBEKHO[32][4] = .7237913436687977, seedBEKHO[32][5] = .8370517294260313, seedBEKHO[32][6] = .015154715763832316, seedBEKHO[32][7] = .34009919818502743, seedBEKHO[32][8] = .9977141211429357, seedBEKHO[32][9] = .9491245401834487, seedBEKHO[32][10] = .28906567810295614, seedBEKHO[32][11] = .5766973167960348, seedBEKHO[32][12] = .04043862365311979, seedBEKHO[32][13] = .2208768436165751, seedBEKHO[33] = [], seedBEKHO[33][0] = .5634240349878761, seedBEKHO[33][1] = .41253328942995515, seedBEKHO[33][2] = .49237830757240375, seedBEKHO[33][3] = .28789170949212717, seedBEKHO[33][4] = .6795415712616615, seedBEKHO[33][5] = .29706882942390367, seedBEKHO[33][6] = .3661535067270756, seedBEKHO[33][7] = .3760953476302622, seedBEKHO[33][8] = .1297926488924055, seedBEKHO[33][9] = .13617997042169372, seedBEKHO[33][10] = .5605598301358921, seedBEKHO[33][11] = .5997353891087234, seedBEKHO[33][12] = .9418550633430312, seedBEKHO[33][13] = .5462063170311517, seedBEKHO[34] = [], seedBEKHO[34][0] = .7091437017760123, seedBEKHO[34][1] = .5647926805058534, seedBEKHO[34][2] = .6352597161842528, seedBEKHO[34][3] = .49814827044495713, seedBEKHO[34][4] = .8552353373220636, seedBEKHO[34][5] = .9957075876207524, seedBEKHO[34][6] = .48032565902914226, seedBEKHO[34][7] = .37427033881185223, seedBEKHO[34][8] = .9106246219942773, seedBEKHO[34][9] = .09983580536268799, seedBEKHO[34][10] = .20016623213862772, seedBEKHO[34][11] = .8510209058127105, seedBEKHO[34][12] = .3165608784783178, seedBEKHO[34][13] = .5038632235007954, seedBEKHO[35] = [], seedBEKHO[35][0] = .5625708831667733, seedBEKHO[35][1] = .9291023040884283, seedBEKHO[35][2] = .19608823446455004, seedBEKHO[35][3] = .8855386389515341, seedBEKHO[35][4] = .5292794593218486, seedBEKHO[35][5] = .2622560719617344, seedBEKHO[35][6] = .542992180023192, seedBEKHO[35][7] = .3356045501716547, seedBEKHO[35][8] = .5891013069184585, seedBEKHO[35][9] = .5548454465682962, seedBEKHO[35][10] = .09648968559578464, seedBEKHO[35][11] = .23905303828762903, seedBEKHO[35][12] = .6094743632610924, seedBEKHO[35][13] = .34426403209722767, seedBEKHO[36] = [], seedBEKHO[36][0] = .7464373134396329, seedBEKHO[36][1] = .9906527884940881, seedBEKHO[36][2] = .5816967072715225, seedBEKHO[36][3] = .5920445914467063, seedBEKHO[36][4] = .04828453397830845, seedBEKHO[36][5] = .4219169711954729, seedBEKHO[36][6] = .6214584411922304, seedBEKHO[36][7] = .023599648607618207, seedBEKHO[36][8] = .9993957702788168, seedBEKHO[36][9] = .32136150042387035, seedBEKHO[36][10] = .625964558770346, seedBEKHO[36][11] = .6735640602929924, seedBEKHO[36][12] = .022595409335930627, seedBEKHO[36][13] = .2715326787938279, seedBEKHO[37] = [], seedBEKHO[37][0] = .7368091951570575, seedBEKHO[37][1] = .7943250745596728, seedBEKHO[37][2] = .24468555367502098, seedBEKHO[37][3] = .2281213641700317, seedBEKHO[37][4] = .6690995892639278, seedBEKHO[37][5] = .2225900036207138, seedBEKHO[37][6] = .6831489653564338, seedBEKHO[37][7] = .1478954171706519, seedBEKHO[37][8] = .035800554058100786, seedBEKHO[37][9] = .9587081733258529, seedBEKHO[37][10] = .4408336095755585, seedBEKHO[37][11] = .8972110126802826, seedBEKHO[37][12] = .09362630558927365, seedBEKHO[37][13] = .2698802453596074, seedBEKHO[38] = [], seedBEKHO[38][0] = .15187322480864784, seedBEKHO[38][1] = .46938295149073905, seedBEKHO[38][2] = .025332117852024938, seedBEKHO[38][3] = .4170665542884926, seedBEKHO[38][4] = .8168752712126666, seedBEKHO[38][5] = .8351645994098491, seedBEKHO[38][6] = .599600682846201, seedBEKHO[38][7] = .010707648654607826, seedBEKHO[38][8] = .5585046809715086, seedBEKHO[38][9] = .42518819815310116, seedBEKHO[38][10] = .28644919008390146, seedBEKHO[38][11] = .909877186248947, seedBEKHO[38][12] = .5651116300908381, seedBEKHO[38][13] = .25087003840299804, seedBEKHO[39] = [], seedBEKHO[39][0] = .11813688773433295, seedBEKHO[39][1] = .3894789790191502, seedBEKHO[39][2] = .19638658405874287, seedBEKHO[39][3] = .30992525876759736, seedBEKHO[39][4] = .677577442995041, seedBEKHO[39][5] = .3766777518013438, seedBEKHO[39][6] = .40654203774871234, seedBEKHO[39][7] = .29201737542616457, seedBEKHO[39][8] = .29072835585197754, seedBEKHO[39][9] = .8232541868808261, seedBEKHO[39][10] = .9442584879426901, seedBEKHO[39][11] = .14898608821373638, seedBEKHO[39][12] = .4907013170054768, seedBEKHO[39][13] = .6074049463338613, seedBEKHO[40] = [], seedBEKHO[40][0] = .03604542420003343, seedBEKHO[40][1] = .6922660767729647, seedBEKHO[40][2] = .3614937014390498, seedBEKHO[40][3] = .2839335957442466, seedBEKHO[40][4] = .3779804023527209, seedBEKHO[40][5] = .300632841468633, seedBEKHO[40][6] = .1773639038486099, seedBEKHO[40][7] = .05743626666911683, seedBEKHO[40][8] = .23201421594347127, seedBEKHO[40][9] = .8216796965292386, seedBEKHO[40][10] = .4097101867362598, seedBEKHO[40][11] = .37620047049985383, seedBEKHO[40][12] = .8385423280526156, seedBEKHO[40][13] = .8413202004868185, seedBEKHO[41] = [], seedBEKHO[41][0] = .47630255437253477, seedBEKHO[41][1] = .4950584304623149, seedBEKHO[41][2] = .8422867288761429, seedBEKHO[41][3] = .636176560753366, seedBEKHO[41][4] = .753446820715741, seedBEKHO[41][5] = .6460156390788172, seedBEKHO[41][6] = .3941434041582208, seedBEKHO[41][7] = .300322214693846, seedBEKHO[41][8] = .4240364554793188, seedBEKHO[41][9] = .30634995635893403, seedBEKHO[41][10] = .7246312225782545, seedBEKHO[41][11] = .5411783901626959, seedBEKHO[41][12] = .11634955335422847, seedBEKHO[41][13] = .5493837547192804, seedBEKHO[42] = [], seedBEKHO[42][0] = .17747728161999787, seedBEKHO[42][1] = .5634755885649383, seedBEKHO[42][2] = .2754947105274963, seedBEKHO[42][3] = .9661962106825321, seedBEKHO[42][4] = .5090559845281437, seedBEKHO[42][5] = .6210807648646475, seedBEKHO[42][6] = .4096879901209045, seedBEKHO[42][7] = .829214117639161, seedBEKHO[42][8] = .8079207366185075, seedBEKHO[42][9] = .5810016994162823, seedBEKHO[42][10] = .4798205070369783, seedBEKHO[42][11] = .204875416084356, seedBEKHO[42][12] = .483660189242926, seedBEKHO[42][13] = .896316333891541, seedBEKHO[43] = [], seedBEKHO[43][0] = .07171495591001098, seedBEKHO[43][1] = .2646921744726196, seedBEKHO[43][2] = .9708611622915089, seedBEKHO[43][3] = .28614228417000653, seedBEKHO[43][4] = .8528698428388299, seedBEKHO[43][5] = .6463334670182701, seedBEKHO[43][6] = .5500491564726773, seedBEKHO[43][7] = .2656448381807617, seedBEKHO[43][8] = .8193737118448285, seedBEKHO[43][9] = .27781398748881125, seedBEKHO[43][10] = .5894194071392571, seedBEKHO[43][11] = .4515170033027236, seedBEKHO[43][12] = .24767787769252414, seedBEKHO[43][13] = .7934553613825066, seedBEKHO[44] = [], seedBEKHO[44][0] = .21615453566655907, seedBEKHO[44][1] = .1945956633459318, seedBEKHO[44][2] = .45847303209021173, seedBEKHO[44][3] = .18823277278574269, seedBEKHO[44][4] = .42608569940842034, seedBEKHO[44][5] = .4667450734022862, seedBEKHO[44][6] = .3148183407830023, seedBEKHO[44][7] = .3663662093696398, seedBEKHO[44][8] = .31210368603459937, seedBEKHO[44][9] = .9852573956994539, seedBEKHO[44][10] = .4125788555015568, seedBEKHO[44][11] = .5178445675641774, seedBEKHO[44][12] = .11272668783210404, seedBEKHO[44][13] = .8348244235529227, seedBEKHO[45] = [], seedBEKHO[45][0] = .48072704662320986, seedBEKHO[45][1] = .2626623324558506, seedBEKHO[45][2] = .11269798268965836, seedBEKHO[45][3] = .8095624568490958, seedBEKHO[45][4] = .4826479950287017, seedBEKHO[45][5] = .2318840549566452, seedBEKHO[45][6] = .18191427721885112, seedBEKHO[45][7] = .3856079179796408, seedBEKHO[45][8] = .29553271936227565, seedBEKHO[45][9] = .6016889566400605, seedBEKHO[45][10] = .1859469255927635, seedBEKHO[45][11] = .4349243102320137, seedBEKHO[45][12] = .07370603498452977, seedBEKHO[45][13] = .10400765585857519, seedBEKHO[46] = [], seedBEKHO[46][0] = .684412550439272, seedBEKHO[46][1] = .5214220181838161, seedBEKHO[46][2] = .6060564701011668, seedBEKHO[46][3] = .3039313605195799, seedBEKHO[46][4] = .18879372088498703, seedBEKHO[46][5] = .24243538044065138, seedBEKHO[46][6] = .5846808520892897, seedBEKHO[46][7] = .8653209856326107, seedBEKHO[46][8] = .7204725230629572, seedBEKHO[46][9] = .3528491877988562, seedBEKHO[46][10] = .08106738221538845, seedBEKHO[46][11] = .5181569373088708, seedBEKHO[46][12] = .8798428732264727, seedBEKHO[46][13] = .7971701111628628, seedBEKHO[47] = [], seedBEKHO[47][0] = .8075325513385747, seedBEKHO[47][1] = .0009782775413982314, seedBEKHO[47][2] = .3429577139621933, seedBEKHO[47][3] = .8133600320307781, seedBEKHO[47][4] = .34621484606037467, seedBEKHO[47][5] = .6485736500694828, seedBEKHO[47][6] = .005777887437214302, seedBEKHO[47][7] = .4519169228077491, seedBEKHO[47][8] = .8922924323004648, seedBEKHO[47][9] = .18524345531435538, seedBEKHO[47][10] = .4329906534449963, seedBEKHO[47][11] = .9210731194859474, seedBEKHO[47][12] = .013021071964279818, seedBEKHO[47][13] = .692765643100882, seedBEKHO[48] = [], seedBEKHO[48][0] = .48034617065526164, seedBEKHO[48][1] = .5680707737557047, seedBEKHO[48][2] = .4782144256353116, seedBEKHO[48][3] = .40201253657305713, seedBEKHO[48][4] = .7956534453983515, seedBEKHO[48][5] = .17131145560923167, seedBEKHO[48][6] = .35368691865993007, seedBEKHO[48][7] = .5974262173188223, seedBEKHO[48][8] = .46387234443136616, seedBEKHO[48][9] = .911952714553244, seedBEKHO[48][10] = .9620010210517815, seedBEKHO[48][11] = .6940177216651466, seedBEKHO[48][12] = .08047514040611636, seedBEKHO[48][13] = .8636402512147048, seedBEKHO[49] = [], seedBEKHO[49][0] = .26758674922696635, seedBEKHO[49][1] = .4332708082195662, seedBEKHO[49][2] = .8675648211767852, seedBEKHO[49][3] = .23659422821006704, seedBEKHO[49][4] = .5078056331100018, seedBEKHO[49][5] = .922227065155335, seedBEKHO[49][6] = .616941416538261, seedBEKHO[49][7] = .7518593019110691, seedBEKHO[49][8] = .23824255079390722, seedBEKHO[49][9] = .7574067950436518, seedBEKHO[49][10] = .7813384244784198, seedBEKHO[49][11] = .3948172809330752, seedBEKHO[49][12] = .18999817047525913, seedBEKHO[49][13] = .08028153691780338, seedBEKHO[50] = [], seedBEKHO[50][0] = .013937963197062642, seedBEKHO[50][1] = .6029936885384624, seedBEKHO[50][2] = .20405919819943397, seedBEKHO[50][3] = .09840303614041357, seedBEKHO[50][4] = .7161777448230042, seedBEKHO[50][5] = .936141471477532, seedBEKHO[50][6] = .3516966283830427, seedBEKHO[50][7] = .5763966065568795, seedBEKHO[50][8] = .7809367878079363, seedBEKHO[50][9] = .2872651621905469, seedBEKHO[50][10] = .6935594269733081, seedBEKHO[50][11] = .5057365139847827, seedBEKHO[50][12] = .42098231652293716, seedBEKHO[50][13] = .5732804780626359, seedBEKHO[51] = [], seedBEKHO[51][0] = .11091113397894103, seedBEKHO[51][1] = .1526402971154326, seedBEKHO[51][2] = .06949877725698528, seedBEKHO[51][3] = .6867627340394828, seedBEKHO[51][4] = .9333806436450807, seedBEKHO[51][5] = .17990754483543459, seedBEKHO[51][6] = .7688495432860667, seedBEKHO[51][7] = .44072576249050965, seedBEKHO[51][8] = .5373517013006219, seedBEKHO[51][9] = .3965756493782402, seedBEKHO[51][10] = .4571319105109468, seedBEKHO[51][11] = .3509208796851091, seedBEKHO[51][12] = .15494873956846233, seedBEKHO[51][13] = .8303179766330047, seedBEKHO[52] = [], seedBEKHO[52][0] = .553999884309603, seedBEKHO[52][1] = .3363472970993202, seedBEKHO[52][2] = .9728681224879097, seedBEKHO[52][3] = .1998478707704885, seedBEKHO[52][4] = .5141051248767807, seedBEKHO[52][5] = .43582903452268074, seedBEKHO[52][6] = .10589476814909449, seedBEKHO[52][7] = .8668242778250792, seedBEKHO[52][8] = .432465804257544, seedBEKHO[52][9] = .690603451184165, seedBEKHO[52][10] = .8517087131968666, seedBEKHO[52][11] = .5184971796025184, seedBEKHO[52][12] = .3319836087561172, seedBEKHO[52][13] = .870713004903644, seedBEKHO[53] = [], seedBEKHO[53][0] = .8907721527558399, seedBEKHO[53][1] = .40973071698837993, seedBEKHO[53][2] = .7975989553429217, seedBEKHO[53][3] = .573793006376806;
seedBEKHO[53][4] = .6267698166406019, seedBEKHO[53][5] = .6884685318503725, seedBEKHO[53][6] = .16366042664485136, seedBEKHO[53][7] = .5883945357750411, seedBEKHO[53][8] = .9880755616590882, seedBEKHO[53][9] = .025071813992929348, seedBEKHO[53][10] = .929598347162151, seedBEKHO[53][11] = .016317728631062955, seedBEKHO[53][12] = .9890236951803097, seedBEKHO[53][13] = .7040668374596, seedBEKHO[54] = [], seedBEKHO[54][0] = .7405836560690142, seedBEKHO[54][1] = .35383930004265607, seedBEKHO[54][2] = .8604620390959461, seedBEKHO[54][3] = .7228012996620334, seedBEKHO[54][4] = .8244951992724159, seedBEKHO[54][5] = .6571464153029871, seedBEKHO[54][6] = .617846704963088, seedBEKHO[54][7] = .4200800118259247, seedBEKHO[54][8] = .199499425564025, seedBEKHO[54][9] = .6972479913658658, seedBEKHO[54][10] = .07830773120102874, seedBEKHO[54][11] = .19121944275164915, seedBEKHO[54][12] = .31943503374051185, seedBEKHO[54][13] = .27895464917043533, seedBEKHO[55] = [], seedBEKHO[55][0] = .5530144668213721, seedBEKHO[55][1] = .3719418223594093, seedBEKHO[55][2] = .35722431007721145, seedBEKHO[55][3] = .8938215862928591, seedBEKHO[55][4] = .6147533602991235, seedBEKHO[55][5] = .4074856281070438, seedBEKHO[55][6] = .839355234897109, seedBEKHO[55][7] = .07190360230510806, seedBEKHO[55][8] = .5321839245160216, seedBEKHO[55][9] = .4083648845949954, seedBEKHO[55][10] = .06717344365344635, seedBEKHO[55][11] = .8048220564853417, seedBEKHO[55][12] = .9159994417549855, seedBEKHO[55][13] = .42277712636314035, seedBEKHO[56] = [], seedBEKHO[56][0] = .7936183853177443, seedBEKHO[56][1] = .08925577742915802, seedBEKHO[56][2] = .40967251541038374, seedBEKHO[56][3] = .250783322285973, seedBEKHO[56][4] = .12947418544785405, seedBEKHO[56][5] = .15156211915881856, seedBEKHO[56][6] = .7619573719975579, seedBEKHO[56][7] = .5279415920024697, seedBEKHO[56][8] = .9158723264413482, seedBEKHO[56][9] = .21370629186988022, seedBEKHO[56][10] = .20562230413790195, seedBEKHO[56][11] = .26473560630317405, seedBEKHO[56][12] = .8402757305285802, seedBEKHO[56][13] = .005232142759252767, seedBEKHO[57] = [], seedBEKHO[57][0] = .6809857464593083, seedBEKHO[57][1] = .6151013290637075, seedBEKHO[57][2] = .3701204424321325, seedBEKHO[57][3] = .714517689887868, seedBEKHO[57][4] = .16948328349375386, seedBEKHO[57][5] = .9957384412610744, seedBEKHO[57][6] = .31442315021100886, seedBEKHO[57][7] = .7536490482918246, seedBEKHO[57][8] = .9053816477163064, seedBEKHO[57][9] = .6258929870068555, seedBEKHO[57][10] = .1255689071713102, seedBEKHO[57][11] = .4580342490059741, seedBEKHO[57][12] = .09649708801308221, seedBEKHO[57][13] = .9851494838997079, seedBEKHO[58] = [], seedBEKHO[58][0] = .35787277957473385, seedBEKHO[58][1] = .38408970809147447, seedBEKHO[58][2] = .49130496940463386, seedBEKHO[58][3] = .39913734488696995, seedBEKHO[58][4] = .686087241041275, seedBEKHO[58][5] = .19822652410941588, seedBEKHO[58][6] = .9010826463972159, seedBEKHO[58][7] = .3946077610086056, seedBEKHO[58][8] = .46890224358881216, seedBEKHO[58][9] = .45069869316761446, seedBEKHO[58][10] = .7700397113045339, seedBEKHO[58][11] = .9494821882708444, seedBEKHO[58][12] = .6249938477389918, seedBEKHO[58][13] = .6344098768335971, seedBEKHO[59] = [], seedBEKHO[59][0] = .8836315733431201, seedBEKHO[59][1] = .5985491832374858, seedBEKHO[59][2] = .8788585850974253, seedBEKHO[59][3] = .8515002883183653, seedBEKHO[59][4] = .3338422053895653, seedBEKHO[59][5] = .826167266161669, seedBEKHO[59][6] = .7321210814890899, seedBEKHO[59][7] = .7791053221135573, seedBEKHO[59][8] = .8850110840558185, seedBEKHO[59][9] = .7962043958523375, seedBEKHO[59][10] = .33398837769944056, seedBEKHO[59][11] = .5483056338668695, seedBEKHO[59][12] = .6940388298068445, seedBEKHO[59][13] = .5093242378203517, seedBEKHO[60] = [], seedBEKHO[60][0] = .27968198353164353, seedBEKHO[60][1] = .6416825496849454, seedBEKHO[60][2] = .2764478818247773, seedBEKHO[60][3] = .8728062227522251, seedBEKHO[60][4] = .3997203017975217, seedBEKHO[60][5] = .0009691059740506436, seedBEKHO[60][6] = .018048473281651933, seedBEKHO[60][7] = .09182606037963703, seedBEKHO[60][8] = .9924261340344387, seedBEKHO[60][9] = .20562966877347288, seedBEKHO[60][10] = .9197305085037959, seedBEKHO[60][11] = .7624796551316089, seedBEKHO[60][12] = .24273438166076367, seedBEKHO[60][13] = .21554813109262128, seedBEKHO[61] = [], seedBEKHO[61][0] = .9420288774876502, seedBEKHO[61][1] = .6454260294140193, seedBEKHO[61][2] = .013656147731493151, seedBEKHO[61][3] = .6690150887238369, seedBEKHO[61][4] = .27232818437490924, seedBEKHO[61][5] = .6689202702082604, seedBEKHO[61][6] = .5942383800840141, seedBEKHO[61][7] = .03259552592371784, seedBEKHO[61][8] = .3420533123133642, seedBEKHO[61][9] = .6720361846296408, seedBEKHO[61][10] = .6027695835628284, seedBEKHO[61][11] = .003162617782846766, seedBEKHO[61][12] = .30434573717780267, seedBEKHO[61][13] = .06548008348168954, seedBEKHO[62] = [], seedBEKHO[62][0] = .7873619164817032, seedBEKHO[62][1] = .3123983037336462, seedBEKHO[62][2] = .38849149525301874, seedBEKHO[62][3] = .6304233708958122, seedBEKHO[62][4] = .00023245591077669658, seedBEKHO[62][5] = .9393095299706575, seedBEKHO[62][6] = .5188179681683975, seedBEKHO[62][7] = .7180716817433779, seedBEKHO[62][8] = .06400408992013262, seedBEKHO[62][9] = .9212337197749019, seedBEKHO[62][10] = .9499905821499852, seedBEKHO[62][11] = .864458774243928, seedBEKHO[62][12] = .9616235445799446, seedBEKHO[62][13] = .4545284015140443, seedBEKHO[63] = [], seedBEKHO[63][0] = .4580649011503348, seedBEKHO[63][1] = .008299112614017279, seedBEKHO[63][2] = .6331407965764047, seedBEKHO[63][3] = .24681420792168973, seedBEKHO[63][4] = .5315604353505319, seedBEKHO[63][5] = .1877887441062278, seedBEKHO[63][6] = .1428130248777877, seedBEKHO[63][7] = .9262918182826534, seedBEKHO[63][8] = .7986026968956295, seedBEKHO[63][9] = .7471783032800867, seedBEKHO[63][10] = .17071703699429253, seedBEKHO[63][11] = .6427685301815902, seedBEKHO[63][12] = .21276483142455938, seedBEKHO[63][13] = .854716334726751, seedBEKHO[64] = [], seedBEKHO[64][0] = .7164169764987778, seedBEKHO[64][1] = .6089560679490882, seedBEKHO[64][2] = .2648218096140822, seedBEKHO[64][3] = .6315937068322335, seedBEKHO[64][4] = .9647623499022959, seedBEKHO[64][5] = .30329455259406446, seedBEKHO[64][6] = .9846688173887921, seedBEKHO[64][7] = .8774974105923976, seedBEKHO[64][8] = .4432727916805326, seedBEKHO[64][9] = .4628998310895305, seedBEKHO[64][10] = .5315745471531406, seedBEKHO[64][11] = .6039454084699496, seedBEKHO[64][12] = .5129634526654412, seedBEKHO[64][13] = .16810986499632952, seedBEKHO[65] = [], seedBEKHO[65][0] = .35036233834791486, seedBEKHO[65][1] = .0026221028708748317, seedBEKHO[65][2] = .48738505422079004, seedBEKHO[65][3] = .5917924583314986, seedBEKHO[65][4] = .3199519834937372, seedBEKHO[65][5] = .9746655560425539, seedBEKHO[65][6] = .8747527422414383, seedBEKHO[65][7] = .24391972121348227, seedBEKHO[65][8] = .7125632366141728, seedBEKHO[65][9] = .5663420398028975, seedBEKHO[65][10] = .9338440797974958, seedBEKHO[65][11] = .09171297990094729, seedBEKHO[65][12] = .2368458339003916, seedBEKHO[65][13] = .6678342230399821, seedBEKHO[66] = [], seedBEKHO[66][0] = .6743258545739499, seedBEKHO[66][1] = .3926553302681566, seedBEKHO[66][2] = .954869723492757, seedBEKHO[66][3] = .009829575190168693, seedBEKHO[66][4] = .944100513146847, seedBEKHO[66][5] = .06248389234868412, seedBEKHO[66][6] = .047758290227728484, seedBEKHO[66][7] = .7702339543330681, seedBEKHO[66][8] = .9837767668456165, seedBEKHO[66][9] = .014566563958392065, seedBEKHO[66][10] = .948731056574716, seedBEKHO[66][11] = .15583702387420018, seedBEKHO[66][12] = .06591401959056875, seedBEKHO[66][13] = .8119056493601295, seedBEKHO[67] = [], seedBEKHO[67][0] = .2631638651569139, seedBEKHO[67][1] = .3396581517378414, seedBEKHO[67][2] = .6143267772060117, seedBEKHO[67][3] = .3833846054744112, seedBEKHO[67][4] = .8112796205728463, seedBEKHO[67][5] = .8244975195658883, seedBEKHO[67][6] = .22609958962438026, seedBEKHO[67][7] = .9036327022300652, seedBEKHO[67][8] = .797511473785351, seedBEKHO[67][9] = .489260953569955, seedBEKHO[67][10] = .5545172891007484, seedBEKHO[67][11] = .19270776239434562, seedBEKHO[67][12] = .7934413218868206, seedBEKHO[67][13] = .4424462145796402, seedBEKHO[68] = [], seedBEKHO[68][0] = .6139823263895194, seedBEKHO[68][1] = .5385575202587929, seedBEKHO[68][2] = .9146417380594254, seedBEKHO[68][3] = .5577303993616687, seedBEKHO[68][4] = .33286150548740134, seedBEKHO[68][5] = .5978270542831488, seedBEKHO[68][6] = .15326379755931474, seedBEKHO[68][7] = .7684387394858954, seedBEKHO[68][8] = .5877912159316601, seedBEKHO[68][9] = .39376802488829377, seedBEKHO[68][10] = .9692537982999048, seedBEKHO[68][11] = .19875092645281334, seedBEKHO[68][12] = .7897548140210116, seedBEKHO[68][13] = .5256040910456179, seedBEKHO[69] = [], seedBEKHO[69][0] = .27786332506914535, seedBEKHO[69][1] = .24112289972614454, seedBEKHO[69][2] = .021528238208162742, seedBEKHO[69][3] = .09799131181254328, seedBEKHO[69][4] = .897013912388477, seedBEKHO[69][5] = .08496526065686139, seedBEKHO[69][6] = .2804874284962755, seedBEKHO[69][7] = .9257079055530599, seedBEKHO[69][8] = .05159698149652758, seedBEKHO[69][9] = .8644379679699177, seedBEKHO[69][10] = .38530750940615555, seedBEKHO[69][11] = .34759132314512153, seedBEKHO[69][12] = .9844079296883428, seedBEKHO[69][13] = .8625685899661255, seedBEKHO[70] = [], seedBEKHO[70][0] = .7314495888981736, seedBEKHO[70][1] = .7740923250394784, seedBEKHO[70][2] = .6026704971486467, seedBEKHO[70][3] = .6230508029921182, seedBEKHO[70][4] = .9135848394205401, seedBEKHO[70][5] = .16630388559128284, seedBEKHO[70][6] = .9794473357579558, seedBEKHO[70][7] = .9955372616541389, seedBEKHO[70][8] = .23588452087254885, seedBEKHO[70][9] = .04713353942082277, seedBEKHO[70][10] = .24864453801987185, seedBEKHO[70][11] = .48852672834000077, seedBEKHO[70][12] = .15101434234260291, seedBEKHO[70][13] = .6826447098918142, seedBEKHO[71] = [], seedBEKHO[71][0] = .3130613370495101, seedBEKHO[71][1] = .7395803177515048, seedBEKHO[71][2] = .023377346614596783, seedBEKHO[71][3] = .45377729077232476, seedBEKHO[71][4] = .7008911739322037, seedBEKHO[71][5] = .03190640252018717, seedBEKHO[71][6] = .6764496238495228, seedBEKHO[71][7] = .017227455495566035, seedBEKHO[71][8] = .5588203387957613, seedBEKHO[71][9] = .028114128393907478, seedBEKHO[71][10] = .845469668683482, seedBEKHO[71][11] = .10382250178755714, seedBEKHO[71][12] = .07166234540308092, seedBEKHO[71][13] = .6061972807181162, seedBEKHO[72] = [], seedBEKHO[72][0] = .8042264873639828, seedBEKHO[72][1] = .4467352928143178, seedBEKHO[72][2] = .9823514856630919, seedBEKHO[72][3] = .07085016692338653, seedBEKHO[72][4] = .6762322217160217, seedBEKHO[72][5] = .07017199871641555, seedBEKHO[72][6] = .6746511775906374, seedBEKHO[72][7] = .6867961009094177, seedBEKHO[72][8] = .3862427011028722, seedBEKHO[72][9] = .2713766900254242, seedBEKHO[72][10] = .5250726726889392, seedBEKHO[72][11] = .6999453956617874, seedBEKHO[72][12] = .35281338247515626, seedBEKHO[72][13] = .07371278889936272, seedBEKHO[73] = [], seedBEKHO[73][0] = .8740453513744817, seedBEKHO[73][1] = .867976300420455, seedBEKHO[73][2] = .2377900791014751, seedBEKHO[73][3] = .8613635908905701, seedBEKHO[73][4] = .21397538868963273, seedBEKHO[73][5] = .7348622211305462, seedBEKHO[73][6] = .9417448087167366, seedBEKHO[73][7] = .14084672126930875, seedBEKHO[73][8] = .5176847802127034, seedBEKHO[73][9] = .12948814112188134, seedBEKHO[73][10] = .5532313661865675, seedBEKHO[73][11] = .07842154986467542, seedBEKHO[73][12] = .832930959709913, seedBEKHO[73][13] = .9510256865786864, seedBEKHO[74] = [], seedBEKHO[74][0] = .9351230908326904, seedBEKHO[74][1] = .4382570272539903, seedBEKHO[74][2] = .5760787528282794, seedBEKHO[74][3] = .7453818531159138, seedBEKHO[74][4] = .17516613155567917, seedBEKHO[74][5] = .520177848902942, seedBEKHO[74][6] = .5585185069921994, seedBEKHO[74][7] = .3858254676670396, seedBEKHO[74][8] = .45553000264733146, seedBEKHO[74][9] = .883361242336373, seedBEKHO[74][10] = .4862088052225986, seedBEKHO[74][11] = .13004010770584462, seedBEKHO[74][12] = .7893293021510177, seedBEKHO[74][13] = .8848462366249343, seedBEKHO[75] = [], seedBEKHO[75][0] = .9790685033852378, seedBEKHO[75][1] = .3254906807789313, seedBEKHO[75][2] = .5704885331255247, seedBEKHO[75][3] = .048557022084333434, seedBEKHO[75][4] = .5774836270314829, seedBEKHO[75][5] = .7415786306794074, seedBEKHO[75][6] = .16019010774724052, seedBEKHO[75][7] = .201764795896078, seedBEKHO[75][8] = .8448649100041072, seedBEKHO[75][9] = .9925363468815736, seedBEKHO[75][10] = .37271377995689936, seedBEKHO[75][11] = .17374926001704716, seedBEKHO[75][12] = .9331446142357409, seedBEKHO[75][13] = .7488926657206592, seedBEKHO[76] = [], seedBEKHO[76][0] = .6695847040686951, seedBEKHO[76][1] = .9859834362544466, seedBEKHO[76][2] = .7466235809341784, seedBEKHO[76][3] = .3147458360205475, seedBEKHO[76][4] = .8260948969163286, seedBEKHO[76][5] = .2923173576698155, seedBEKHO[76][6] = .47808623542409756, seedBEKHO[76][7] = .7170816124368087, seedBEKHO[76][8] = .45956614387509687, seedBEKHO[76][9] = .5309534424278253, seedBEKHO[76][10] = .4169363526906469, seedBEKHO[76][11] = .1266518511357495, seedBEKHO[76][12] = .9765578848774654, seedBEKHO[76][13] = .7001212992045733, seedBEKHO[77] = [], seedBEKHO[77][0] = .5579475251110657, seedBEKHO[77][1] = .11343231769103745, seedBEKHO[77][2] = .21955595255419502, seedBEKHO[77][3] = .9032859971863043, seedBEKHO[77][4] = .18186348384292383, seedBEKHO[77][5] = .23436236426973833, seedBEKHO[77][6] = .3322099107269396, seedBEKHO[77][7] = .564104031042856, seedBEKHO[77][8] = .2634327515625703, seedBEKHO[77][9] = .13621098834724377, seedBEKHO[77][10] = .6241029814346575, seedBEKHO[77][11] = .28340246972776306, seedBEKHO[77][12] = .9837236504744045, seedBEKHO[77][13] = .45911409504147604, seedBEKHO[78] = [], seedBEKHO[78][0] = .23759952216332358, seedBEKHO[78][1] = .18098969525385789, seedBEKHO[78][2] = .228461425505045, seedBEKHO[78][3] = .7748297268303035, seedBEKHO[78][4] = .7365233088764671, seedBEKHO[78][5] = .727146238060054, seedBEKHO[78][6] = .4594051204799767, seedBEKHO[78][7] = .3671119640918623, seedBEKHO[78][8] = .5784105741841208, seedBEKHO[78][9] = .5248615210717795, seedBEKHO[78][10] = .8530918493747299, seedBEKHO[78][11] = .5733583099574293, seedBEKHO[78][12] = .10905857248809525, seedBEKHO[78][13] = .9450604489899836, seedBEKHO[79] = [], seedBEKHO[79][0] = .2468520819590494, seedBEKHO[79][1] = .8053293847209848, seedBEKHO[79][2] = .9101767436238557, seedBEKHO[79][3] = .3665524444444479, seedBEKHO[79][4] = .187420816121465, seedBEKHO[79][5] = .8067166823649792, seedBEKHO[79][6] = .497184468406644, seedBEKHO[79][7] = .19458847964935222, seedBEKHO[79][8] = .8034019925141387, seedBEKHO[79][9] = .34919169727821253, seedBEKHO[79][10] = .595678784613636, seedBEKHO[79][11] = .4477935676281335, seedBEKHO[79][12] = .5125105863645114, seedBEKHO[79][13] = .8927943957747086, seedBEKHO[80] = [], seedBEKHO[80][0] = .29714894918213597, seedBEKHO[80][1] = .7789087736484817, seedBEKHO[80][2] = .2512854059375311, seedBEKHO[80][3] = .21861394982304172, seedBEKHO[80][4] = .7894645707678378, seedBEKHO[80][5] = .3357248077915729, seedBEKHO[80][6] = .635031832385732, seedBEKHO[80][7] = .5731327284783847, seedBEKHO[80][8] = .6958996406887314, seedBEKHO[80][9] = .7036208636355974, seedBEKHO[80][10] = .5437471303210477, seedBEKHO[80][11] = .3984355227484293, seedBEKHO[80][12] = .7146183073086354, seedBEKHO[80][13] = .198092773250089, seedBEKHO[81] = [], seedBEKHO[81][0] = .3851767214042767, seedBEKHO[81][1] = .8790777588120524, seedBEKHO[81][2] = .850747274583707, seedBEKHO[81][3] = .7360297115977541, seedBEKHO[81][4] = .20133926416968384, seedBEKHO[81][5] = .004791909891059598, seedBEKHO[81][6] = .6220209996002883, seedBEKHO[81][7] = .1809761146620099, seedBEKHO[81][8] = .23476115409376974, seedBEKHO[81][9] = .9680536562333815, seedBEKHO[81][10] = .0007948575927101409, seedBEKHO[81][11] = .7113417749177326, seedBEKHO[81][12] = .2360523363852871, seedBEKHO[81][13] = .2814943504314378, seedBEKHO[82] = [], seedBEKHO[82][0] = .01770615520899388, seedBEKHO[82][1] = .5111422827780221, seedBEKHO[82][2] = .30332376844870024, seedBEKHO[82][3] = .8597781733872132, seedBEKHO[82][4] = .17256815691252303, seedBEKHO[82][5] = .8654494958507546, seedBEKHO[82][6] = .05956761513629516, seedBEKHO[82][7] = .30867422800906885, seedBEKHO[82][8] = .2623472178773898, seedBEKHO[82][9] = .6156301244470284, seedBEKHO[82][10] = .5552476974308596, seedBEKHO[82][11] = .2460660119056004, seedBEKHO[82][12] = .9806040183641698, seedBEKHO[82][13] = .4255870966251767, seedBEKHO[83] = [], seedBEKHO[83][0] = .41586017935246544, seedBEKHO[83][1] = .5582114830577662, seedBEKHO[83][2] = .7941061964035405, seedBEKHO[83][3] = .9893967826604368, seedBEKHO[83][4] = .30257345344372544, seedBEKHO[83][5] = .6259036268381957, seedBEKHO[83][6] = .44130598231503826, seedBEKHO[83][7] = .51977851134942, seedBEKHO[83][8] = .36219319294326957, seedBEKHO[83][9] = .6681629052791334, seedBEKHO[83][10] = .08693257361553974, seedBEKHO[83][11] = .1323826961938781, seedBEKHO[83][12] = .6903510782567688, seedBEKHO[83][13] = .3539526818470762, seedBEKHO[84] = [], seedBEKHO[84][0] = .4588499902982386, seedBEKHO[84][1] = .26940678819199393, seedBEKHO[84][2] = .8255082652346455, seedBEKHO[84][3] = .469413502264155, seedBEKHO[84][4] = .2840555018984783, seedBEKHO[84][5] = .009623014942037988, seedBEKHO[84][6] = .13861959173990357, seedBEKHO[84][7] = .5861019476509703, seedBEKHO[84][8] = .8274632128575259, seedBEKHO[84][9] = .20662259638035674, seedBEKHO[84][10] = .3256422951558797, seedBEKHO[84][11] = .2998098348775575, seedBEKHO[84][12] = .9295545764205966, seedBEKHO[84][13] = .8615230202947555, seedBEKHO[85] = [], seedBEKHO[85][0] = .5798784019498324, seedBEKHO[85][1] = .9177442443253176, seedBEKHO[85][2] = .1561265339655089, seedBEKHO[85][3] = .36031986661807824, seedBEKHO[85][4] = .058551176399022076, seedBEKHO[85][5] = .48934970500692465, seedBEKHO[85][6] = .04579560947096972, seedBEKHO[85][7] = .7254159078972764, seedBEKHO[85][8] = .7743234435463746, seedBEKHO[85][9] = .275781536918732, seedBEKHO[85][10] = .1858824102763652, seedBEKHO[85][11] = .4000678642096849, seedBEKHO[85][12] = .11455357505169883, seedBEKHO[85][13] = .8246781964602945, seedBEKHO[86] = [], seedBEKHO[86][0] = .727818969957021, seedBEKHO[86][1] = .5434493868123877, seedBEKHO[86][2] = .1522746573578504, seedBEKHO[86][3] = .991359725389861, seedBEKHO[86][4] = .6594035736352764, seedBEKHO[86][5] = .6328755563433297, seedBEKHO[86][6] = .9993038179441947, seedBEKHO[86][7] = .8446276786543598, seedBEKHO[86][8] = .6360876918547351, seedBEKHO[86][9] = .6125850579979686, seedBEKHO[86][10] = .5606485182861614, seedBEKHO[86][11] = .18817487457168558, seedBEKHO[86][12] = .9907301234765962, seedBEKHO[86][13] = .6941456914483632, seedBEKHO[87] = [], seedBEKHO[87][0] = .1135483279762004, seedBEKHO[87][1] = .663468391980021, seedBEKHO[87][2] = .43488743022756005, seedBEKHO[87][3] = .5043336487827976, seedBEKHO[87][4] = .3367154269659285, seedBEKHO[87][5] = .4908610371871207, seedBEKHO[87][6] = .1617487674779956, seedBEKHO[87][7] = .2087261141158021, seedBEKHO[87][8] = .7941363758705542, seedBEKHO[87][9] = .9426943501018668, seedBEKHO[87][10] = .818091548103252, seedBEKHO[87][11] = .06555411973247738, seedBEKHO[87][12] = .22383940205431396, seedBEKHO[87][13] = .7148891473500578, seedBEKHO[88] = [], seedBEKHO[88][0] = .1361236444014351, seedBEKHO[88][1] = .6016085523471912, seedBEKHO[88][2] = .9973782934785869, seedBEKHO[88][3] = .30767740182001324, seedBEKHO[88][4] = .8915381328988805, seedBEKHO[88][5] = .20689959879621345, seedBEKHO[88][6] = .5640732367586896, seedBEKHO[88][7] = .3548394466449254, seedBEKHO[88][8] = .43271348282114697, seedBEKHO[88][9] = .369048222092065, seedBEKHO[88][10] = .970407362457312, seedBEKHO[88][11] = .9584600475887639, seedBEKHO[88][12] = .8301966307940258, seedBEKHO[88][13] = .7939513800272107, seedBEKHO[89] = [], seedBEKHO[89][0] = .3284770377551338, seedBEKHO[89][1] = .6604978892493518, seedBEKHO[89][2] = .27261232746301456, seedBEKHO[89][3] = .24278979130292133, seedBEKHO[89][4] = .37319601932701607, seedBEKHO[89][5] = .4696412597627786, seedBEKHO[89][6] = .3824119315356975, seedBEKHO[89][7] = .9581594395340529, seedBEKHO[89][8] = .573174475708293, seedBEKHO[89][9] = .5001392494333354, seedBEKHO[89][10] = .3602120351036935, seedBEKHO[89][11] = .9811533852179914, seedBEKHO[89][12] = .057012268804287114, seedBEKHO[89][13] = .7985438452156353, seedBEKHO[90] = [], seedBEKHO[90][0] = .6556554996511614, seedBEKHO[90][1] = .4874035578880829, seedBEKHO[90][2] = .07978960831048809, seedBEKHO[90][3] = .10401862852103139, seedBEKHO[90][4] = .9924831623358186, seedBEKHO[90][5] = .4167596711540451, seedBEKHO[90][6] = .9086174181114919, seedBEKHO[90][7] = .8414832612692664, seedBEKHO[90][8] = .15669324556164654, seedBEKHO[90][9] = .37004672868459143, seedBEKHO[90][10] = .1169926944367421, seedBEKHO[90][11] = .011652976362860779, seedBEKHO[90][12] = .8343306832570594, seedBEKHO[90][13] = .4614735422025962, seedBEKHO[91] = [], seedBEKHO[91][0] = .5516245411643363, seedBEKHO[91][1] = .6602299610576556, seedBEKHO[91][2] = .4443111815894678, seedBEKHO[91][3] = .9963660001544548, seedBEKHO[91][4] = .4910757586791008, seedBEKHO[91][5] = .07767779742933278, seedBEKHO[91][6] = .953165863143238, seedBEKHO[91][7] = .9149900611045318, seedBEKHO[91][8] = .27704914544973924, seedBEKHO[91][9] = .9554601266485587, seedBEKHO[91][10] = .8912167814551837, seedBEKHO[91][11] = .9718542135312573, seedBEKHO[91][12] = .37712750571528475, seedBEKHO[91][13] = .7889263509415652, seedBEKHO[92] = [], seedBEKHO[92][0] = .5418340438874838, seedBEKHO[92][1] = .00045475459331423274, seedBEKHO[92][2] = .3331110622938245, seedBEKHO[92][3] = .21073208675132205, seedBEKHO[92][4] = .12486901725344901, seedBEKHO[92][5] = .314251464286484, seedBEKHO[92][6] = .1473796281317068, seedBEKHO[92][7] = .5817122757406701, seedBEKHO[92][8] = .30956189398565526, seedBEKHO[92][9] = .4544477169462464, seedBEKHO[92][10] = .5305209879767725, seedBEKHO[92][11] = .9964115550246639, seedBEKHO[92][12] = .6349419154955951, seedBEKHO[92][13] = .23113579606212342, seedBEKHO[93] = [], seedBEKHO[93][0] = .6376296580642637, seedBEKHO[93][1] = .33359178143684454, seedBEKHO[93][2] = .26284785171308345, seedBEKHO[93][3] = .7296903198705027, seedBEKHO[93][4] = .24782904611247258, seedBEKHO[93][5] = .010412038371293564, seedBEKHO[93][6] = .1584327912871597, seedBEKHO[93][7] = .5118861596202884, seedBEKHO[93][8] = .6441449768751459, seedBEKHO[93][9] = .7631349716072442, seedBEKHO[93][10] = .4461912151544689, seedBEKHO[93][11] = .3584801354910083, seedBEKHO[93][12] = .4952415876390184, seedBEKHO[93][13] = .8941735328635976, seedBEKHO[94] = [], seedBEKHO[94][0] = .9892761344882388, seedBEKHO[94][1] = .9816599032222453, seedBEKHO[94][2] = .03459643278159241, seedBEKHO[94][3] = .8101818871212976, seedBEKHO[94][4] = .05861632238024406, seedBEKHO[94][5] = .6247076546083599, seedBEKHO[94][6] = .7475584210614306, seedBEKHO[94][7] = .41008260223883886, seedBEKHO[94][8] = .6978728779701, seedBEKHO[94][9] = .6732473791392586, seedBEKHO[94][10] = .07790995548478064, seedBEKHO[94][11] = .10057934330327223, seedBEKHO[94][12] = .10111620316596692, seedBEKHO[94][13] = .04082824523290385, seedBEKHO[95] = [], seedBEKHO[95][0] = .4137145823751609, seedBEKHO[95][1] = .36286699479846285, seedBEKHO[95][2] = .8022771890877571, seedBEKHO[95][3] = .9637492033196116, seedBEKHO[95][4] = .3178761923760707, seedBEKHO[95][5] = .35259437324030896, seedBEKHO[95][6] = .7103765952695176, seedBEKHO[95][7] = .31497692643933783, seedBEKHO[95][8] = .8811661885391548, seedBEKHO[95][9] = .4825835055285481, seedBEKHO[95][10] = .27084316575736045, seedBEKHO[95][11] = .6840229151498713, seedBEKHO[95][12] = .4511508904011634, seedBEKHO[95][13] = .6263313383390601, seedBEKHO[96] = [], seedBEKHO[96][0] = .9839292668280162, seedBEKHO[96][1] = .3384418465094663, seedBEKHO[96][2] = .18376591021841193, seedBEKHO[96][3] = .015463736234347047, seedBEKHO[96][4] = .9241701249720198, seedBEKHO[96][5] = .4077060824000489, seedBEKHO[96][6] = .5609538345776532, seedBEKHO[96][7] = .538826630064623, seedBEKHO[96][8] = .7389862721762883, seedBEKHO[96][9] = .9114064933217163, seedBEKHO[96][10] = .5945393666219618, seedBEKHO[96][11] = .29370303522940566, seedBEKHO[96][12] = .8087288619325828, seedBEKHO[96][13] = .9519199948411223, seedBEKHO[97] = [], seedBEKHO[97][0] = .7732827206208546, seedBEKHO[97][1] = .8462170327688379, seedBEKHO[97][2] = .23027755784577253, seedBEKHO[97][3] = .06132565136099433, seedBEKHO[97][4] = .22861486477768223, seedBEKHO[97][5] = .9385844226818028, seedBEKHO[97][6] = .7219770871845916, seedBEKHO[97][7] = .08709885104891724, seedBEKHO[97][8] = .3679736845733046, seedBEKHO[97][9] = .5513410833247296, seedBEKHO[97][10] = .9742409216350718, seedBEKHO[97][11] = .18128028545262764, seedBEKHO[97][12] = .7960047467294269, seedBEKHO[97][13] = .8276278617250643, seedBEKHO[98] = [], seedBEKHO[98][0] = .24725505909426793, seedBEKHO[98][1] = .3319670047862102, seedBEKHO[98][2] = .5672931190688248, seedBEKHO[98][3] = .9838817421159485, seedBEKHO[98][4] = .21159721136089793, seedBEKHO[98][5] = .593121539230987, seedBEKHO[98][6] = .24067256940385828, seedBEKHO[98][7] = .858347443559818, seedBEKHO[98][8] = .803635559168177, seedBEKHO[98][9] = .7244094853477456, seedBEKHO[98][10] = .4267701494063172, seedBEKHO[98][11] = .07841508056627933, seedBEKHO[98][12] = .6102911417286665, seedBEKHO[98][13] = .2756326501303479, seedBEKHO[99] = [], seedBEKHO[99][0] = .867530502776565, seedBEKHO[99][1] = .8213456892123232, seedBEKHO[99][2] = .6443124643889653, seedBEKHO[99][3] = .29478020139699224, seedBEKHO[99][4] = .17733687576974022, seedBEKHO[99][5] = .6325163519196073, seedBEKHO[99][6] = .2201263602072534, seedBEKHO[99][7] = .10419506196681283, seedBEKHO[99][8] = .062390320578384895, seedBEKHO[99][9] = .24926790290849854, seedBEKHO[99][10] = .3506808082791737, seedBEKHO[99][11] = .4819624859574443, seedBEKHO[99][12] = .47731609086745386, seedBEKHO[99][13] = .7847810120663936, seedBEKHO[100] = [], seedBEKHO[100][0] = .060676308145444446, seedBEKHO[100][1] = .32523357759000016, seedBEKHO[100][2] = .13122143067985115, seedBEKHO[100][3] = .12358703643363911, seedBEKHO[100][4] = .47709563986987824, seedBEKHO[100][5] = .8815356530150495, seedBEKHO[100][6] = .9084559082142623, seedBEKHO[100][7] = .04782224201162344, seedBEKHO[100][8] = .8211108679586112, seedBEKHO[100][9] = .19101505372654937, seedBEKHO[100][10] = .8824434844217945, seedBEKHO[100][11] = .09423683271560002, seedBEKHO[100][12] = .7336085441632652, seedBEKHO[100][13] = .9531246197386924, seedBEKHO[101] = [], seedBEKHO[101][0] = .04589197591709793, seedBEKHO[101][1] = .8616826818190872, seedBEKHO[101][2] = .039242113243969756, seedBEKHO[101][3] = .18458556980261176, seedBEKHO[101][4] = .858365031643137, seedBEKHO[101][5] = .6170448118742018, seedBEKHO[101][6] = .513304143550193, seedBEKHO[101][7] = .9619356302369813, seedBEKHO[101][8] = .12000887761760226, seedBEKHO[101][9] = .9684897885694628, seedBEKHO[101][10] = .3347648943751971, seedBEKHO[101][11] = .735313785670916, seedBEKHO[101][12] = .514093479840434, seedBEKHO[101][13] = .5696716695265651, seedBEKHO[102] = [], seedBEKHO[102][0] = .30007919711060405, seedBEKHO[102][1] = .8795456141399942, seedBEKHO[102][2] = .3769862867968006, seedBEKHO[102][3] = .9407128459113803, seedBEKHO[102][4] = .4641516162303445, seedBEKHO[102][5] = .5417462601337002, seedBEKHO[102][6] = .3472581794130938, seedBEKHO[102][7] = .40205748450166934, seedBEKHO[102][8] = .5749434881461941, seedBEKHO[102][9] = .4174266767124697, seedBEKHO[102][10] = .9841475604833738, seedBEKHO[102][11] = .4542515393347084, seedBEKHO[102][12] = .53793619212046, seedBEKHO[102][13] = .8647815845093503, seedBEKHO[103] = [], seedBEKHO[103][0] = .27675450021138914, seedBEKHO[103][1] = .3341562797722477, seedBEKHO[103][2] = .8414745071356902, seedBEKHO[103][3] = .6541931823646085, seedBEKHO[103][4] = .26325781396463155, seedBEKHO[103][5] = .23859160010575575, seedBEKHO[103][6] = .2833001860281459, seedBEKHO[103][7] = .7497857461576012, seedBEKHO[103][8] = .7777470539389393, seedBEKHO[103][9] = .7752614904929729, seedBEKHO[103][10] = .2308468035074127, seedBEKHO[103][11] = .649493389472791, seedBEKHO[103][12] = .5061049675543383, seedBEKHO[103][13] = .3866860261032241, seedBEKHO[104] = [], seedBEKHO[104][0] = .4481397199370152, seedBEKHO[104][1] = .046268940489998966, seedBEKHO[104][2] = .9518928084261467, seedBEKHO[104][3] = .7850480203340053, seedBEKHO[104][4] = .22640876838430013, seedBEKHO[104][5] = .9728149652643092, seedBEKHO[104][6] = .31770735075184775, seedBEKHO[104][7] = .8237864406303026, seedBEKHO[104][8] = .2603951377104783, seedBEKHO[104][9] = .11309227935168242, seedBEKHO[104][10] = .5297524737437966, seedBEKHO[104][11] = .07165904739462103, seedBEKHO[104][12] = .2492458575631462, seedBEKHO[104][13] = .3555880009022565, seedBEKHO[105] = [], seedBEKHO[105][0] = .7249002000132201, seedBEKHO[105][1] = .5660464522677728, seedBEKHO[105][2] = .34047859736290076, seedBEKHO[105][3] = .10604471972980023, seedBEKHO[105][4] = .5092884942750842, seedBEKHO[105][5] = .15781763063229892, seedBEKHO[105][6] = .8395243674500563, seedBEKHO[105][7] = .3710749977330612, seedBEKHO[105][8] = .5685812456855783, seedBEKHO[105][9] = .44345316284553693, seedBEKHO[105][10] = .528327497452838, seedBEKHO[105][11] = .059870361740324674, seedBEKHO[105][12] = .7082475362066643, seedBEKHO[105][13] = .8400159106330392, seedBEKHO[106] = [], seedBEKHO[106][0] = .18804359991752628, seedBEKHO[106][1] = .5089969145305244, seedBEKHO[106][2] = .5077764769220872, seedBEKHO[106][3] = .969547037237162, seedBEKHO[106][4] = .2757248169115065, seedBEKHO[106][5] = .10316082678022154, seedBEKHO[106][6] = .06386098826803543, seedBEKHO[106][7] = .8913273152468024, seedBEKHO[106][8] = .20048253299897878;
seedBEKHO[106][9] = .1002158185911326, seedBEKHO[106][10] = .0687893509024522, seedBEKHO[106][11] = .16215502615459054, seedBEKHO[106][12] = .8415886483029162, seedBEKHO[106][13] = .18978363521493335, seedBEKHO[107] = [], seedBEKHO[107][0] = .44221781714978636, seedBEKHO[107][1] = .9785276992268985, seedBEKHO[107][2] = .7885224519973295, seedBEKHO[107][3] = .7925075230583218, seedBEKHO[107][4] = .6730168946350006, seedBEKHO[107][5] = .054752732289106154, seedBEKHO[107][6] = .11100557765480357, seedBEKHO[107][7] = .2954873753197753, seedBEKHO[107][8] = .40238597650462404, seedBEKHO[107][9] = .4127619805559084, seedBEKHO[107][10] = .9651948302423372, seedBEKHO[107][11] = .4092637714378964, seedBEKHO[107][12] = .1672144339374162, seedBEKHO[107][13] = .5700446278787807, seedBEKHO[108] = [], seedBEKHO[108][0] = .4378459387517033, seedBEKHO[108][1] = .45972696367582166, seedBEKHO[108][2] = .7345818560644755, seedBEKHO[108][3] = .9253834887195114, seedBEKHO[108][4] = .10141002304648072, seedBEKHO[108][5] = .008983422626009485, seedBEKHO[108][6] = .03524960673007671, seedBEKHO[108][7] = .1416843080343133, seedBEKHO[108][8] = .3638171839443063, seedBEKHO[108][9] = .08102912961206599, seedBEKHO[108][10] = .9794050182897034, seedBEKHO[108][11] = .26188477587952685, seedBEKHO[108][12] = .4889237645696969, seedBEKHO[108][13] = .41006543338167223, seedBEKHO[109] = [], seedBEKHO[109][0] = .6961717342945934, seedBEKHO[109][1] = .47218905677071765, seedBEKHO[109][2] = .2900547426082998, seedBEKHO[109][3] = .2509536232857221, seedBEKHO[109][4] = .2776231980168149, seedBEKHO[109][5] = .7099598274556622, seedBEKHO[109][6] = .5296215811902654, seedBEKHO[109][7] = .6983901376895185, seedBEKHO[109][8] = .8188944117585912, seedBEKHO[109][9] = .42144147250111685, seedBEKHO[109][10] = .5723979924279332, seedBEKHO[109][11] = .15983581747684772, seedBEKHO[109][12] = .3475783141054183, seedBEKHO[109][13] = .5013472072177445, seedBEKHO[110] = [], seedBEKHO[110][0] = .2842304523346397, seedBEKHO[110][1] = .871271948395127, seedBEKHO[110][2] = .20167584916101045, seedBEKHO[110][3] = .8168073301305274, seedBEKHO[110][4] = .9739365337873758, seedBEKHO[110][5] = .29115055532555933, seedBEKHO[110][6] = .39725881343274616, seedBEKHO[110][7] = .023692178608917702, seedBEKHO[110][8] = .46293296779789084, seedBEKHO[110][9] = .614759348230953, seedBEKHO[110][10] = .06966253327494076, seedBEKHO[110][11] = .08034213898282183, seedBEKHO[110][12] = .6210172623103438, seedBEKHO[110][13] = .4955585967234952, seedBEKHO[111] = [], seedBEKHO[111][0] = .4741425995851418, seedBEKHO[111][1] = .6438722227373863, seedBEKHO[111][2] = .6247281783871472, seedBEKHO[111][3] = .33813531927593243, seedBEKHO[111][4] = .47868462985816085, seedBEKHO[111][5] = .703347869876014, seedBEKHO[111][6] = .10702334391478496, seedBEKHO[111][7] = .8909427527076477, seedBEKHO[111][8] = .2563448808518236, seedBEKHO[111][9] = .08294687159265313, seedBEKHO[111][10] = .1423798303113697, seedBEKHO[111][11] = .8128300025263897, seedBEKHO[111][12] = .4850330132600009, seedBEKHO[111][13] = .03551395453189077, seedBEKHO[112] = [], seedBEKHO[112][0] = .3679361559007466, seedBEKHO[112][1] = .8095692973038373, seedBEKHO[112][2] = .6759335224439906, seedBEKHO[112][3] = .5114283105524697, seedBEKHO[112][4] = .05710706287366607, seedBEKHO[112][5] = .7696971470358165, seedBEKHO[112][6] = .21643656373216502, seedBEKHO[112][7] = .19744762792488157, seedBEKHO[112][8] = .41910343762593927, seedBEKHO[112][9] = .5111281627801902, seedBEKHO[112][10] = .020280969190973774, seedBEKHO[112][11] = .15285031241276514, seedBEKHO[112][12] = .9163685784634055, seedBEKHO[112][13] = .2357482333468588, seedBEKHO[113] = [], seedBEKHO[113][0] = .47852162009335286, seedBEKHO[113][1] = .6631563371338387, seedBEKHO[113][2] = .3920891617449751, seedBEKHO[113][3] = .4177222477102791, seedBEKHO[113][4] = .6530719241430845, seedBEKHO[113][5] = .8336957874301556, seedBEKHO[113][6] = .6210822384740775, seedBEKHO[113][7] = .8882446154619572, seedBEKHO[113][8] = .7576616367405953, seedBEKHO[113][9] = .35873597922794875, seedBEKHO[113][10] = .6383982926845801, seedBEKHO[113][11] = .6281021703120517, seedBEKHO[113][12] = .531381066460789, seedBEKHO[113][13] = .9645682343662048, seedBEKHO[114] = [], seedBEKHO[114][0] = .06088654413011563, seedBEKHO[114][1] = .6825991341823952, seedBEKHO[114][2] = .29276267464453154, seedBEKHO[114][3] = .9584328195360494, seedBEKHO[114][4] = .4660024974268888, seedBEKHO[114][5] = .5945526145512148, seedBEKHO[114][6] = .060611120881849834, seedBEKHO[114][7] = .5269767137454293, seedBEKHO[114][8] = .3522732118302745, seedBEKHO[114][9] = .11985235451555654, seedBEKHO[114][10] = .2685529605387371, seedBEKHO[114][11] = .700149355503513, seedBEKHO[114][12] = .44040131810802197, seedBEKHO[114][13] = .6076307160250365, seedBEKHO[115] = [], seedBEKHO[115][0] = .4675095924360193, seedBEKHO[115][1] = .8946191111684336, seedBEKHO[115][2] = .6740577223500477, seedBEKHO[115][3] = .2272569356209535, seedBEKHO[115][4] = .05819184041508363, seedBEKHO[115][5] = .5169379916184809, seedBEKHO[115][6] = .3979668673041552, seedBEKHO[115][7] = .1108919082181068, seedBEKHO[115][8] = .7811313793496766, seedBEKHO[115][9] = .007612655124326295, seedBEKHO[115][10] = .326775776205831, seedBEKHO[115][11] = .8621745820099112, seedBEKHO[115][12] = .17192317522797973, seedBEKHO[115][13] = .5083338234646297, seedBEKHO[116] = [], seedBEKHO[116][0] = .8683816752192148, seedBEKHO[116][1] = .8090134056762623, seedBEKHO[116][2] = .49997178537933884, seedBEKHO[116][3] = .44925048825181424, seedBEKHO[116][4] = .13030242228629896, seedBEKHO[116][5] = .5809255962488666, seedBEKHO[116][6] = .2566331384578988, seedBEKHO[116][7] = .25788640071957847, seedBEKHO[116][8] = .7160531023402308, seedBEKHO[116][9] = .27146609925133025, seedBEKHO[116][10] = .6259217635477841, seedBEKHO[116][11] = .15274401674401483, seedBEKHO[116][12] = .5267874003466926, seedBEKHO[116][13] = .4334573657889693, seedBEKHO[117] = [], seedBEKHO[117][0] = .7135084041674904, seedBEKHO[117][1] = .7261669125614547, seedBEKHO[117][2] = .5457379710295003, seedBEKHO[117][3] = .9616900818624707, seedBEKHO[117][4] = .5402911738881275, seedBEKHO[117][5] = .07823961943301394, seedBEKHO[117][6] = .6768067937476039, seedBEKHO[117][7] = .25786150635259775, seedBEKHO[117][8] = .47773189315274367, seedBEKHO[117][9] = .4356599724355006, seedBEKHO[117][10] = .8018794102463258, seedBEKHO[117][11] = .779262045602868, seedBEKHO[117][12] = .5725235759096619, seedBEKHO[117][13] = .9266396644132076, seedBEKHO[118] = [], seedBEKHO[118][0] = .01837428350898107, seedBEKHO[118][1] = .9067354424760894, seedBEKHO[118][2] = .8671281292773341, seedBEKHO[118][3] = .9653233277749265, seedBEKHO[118][4] = .2502159949041671, seedBEKHO[118][5] = .7346152707363942, seedBEKHO[118][6] = .867251230586521, seedBEKHO[118][7] = .7168999404448484, seedBEKHO[118][8] = .21195096639978805, seedBEKHO[118][9] = .33493519801720395, seedBEKHO[118][10] = .2947855825252681, seedBEKHO[118][11] = .03792006620857413, seedBEKHO[118][12] = .2610300230312266, seedBEKHO[118][13] = .4581834385795358, seedBEKHO[119] = [], seedBEKHO[119][0] = .8847150407720732, seedBEKHO[119][1] = .125988072948104, seedBEKHO[119][2] = .9186055146324039, seedBEKHO[119][3] = .6166269574484688, seedBEKHO[119][4] = .16710144449936037, seedBEKHO[119][5] = .10719234285026524, seedBEKHO[119][6] = .017825979677521087, seedBEKHO[119][7] = .27117593791352657, seedBEKHO[119][8] = .972244801257067, seedBEKHO[119][9] = .9379010795197711, seedBEKHO[119][10] = .16023012387595315, seedBEKHO[119][11] = .5821679074198509, seedBEKHO[119][12] = .7464504436496888, seedBEKHO[119][13] = .13401603776723703, seedBEKHO[120] = [], seedBEKHO[120][0] = .6402377779169659, seedBEKHO[120][1] = .9433126247460735, seedBEKHO[120][2] = .9011594865403101, seedBEKHO[120][3] = .0037945546857003354, seedBEKHO[120][4] = .6328980290472053, seedBEKHO[120][5] = .9564869904397302, seedBEKHO[120][6] = .6467885614964455, seedBEKHO[120][7] = .3618645573420316, seedBEKHO[120][8] = .6972554909195705, seedBEKHO[120][9] = .4811320436678972, seedBEKHO[120][10] = .6931310764347367, seedBEKHO[120][11] = .8494175225373903, seedBEKHO[120][12] = .3893997192570955, seedBEKHO[120][13] = .7951566854744099, seedBEKHO[121] = [], seedBEKHO[121][0] = .7174640477188841, seedBEKHO[121][1] = .5544857819842508, seedBEKHO[121][2] = .7627030500907577, seedBEKHO[121][3] = .5780020577189746, seedBEKHO[121][4] = .22938876987279144, seedBEKHO[121][5] = .17463249288518634, seedBEKHO[121][6] = .8618721039839692, seedBEKHO[121][7] = .08523697893496762, seedBEKHO[121][8] = .7234569196110248, seedBEKHO[121][9] = .741339365748908, seedBEKHO[121][10] = .6372862905350452, seedBEKHO[121][11] = .0467723751014224, seedBEKHO[121][12] = .1311295270617101, seedBEKHO[121][13] = .871342683202204, seedBEKHO[122] = [], seedBEKHO[122][0] = .33955271907560136, seedBEKHO[122][1] = .3065199676096171, seedBEKHO[122][2] = .79280636638412, seedBEKHO[122][3] = .9375910128946092, seedBEKHO[122][4] = .9357056713198157, seedBEKHO[122][5] = .14455245480865053, seedBEKHO[122][6] = .0379511008980804, seedBEKHO[122][7] = .6426593357373109, seedBEKHO[122][8] = .3865892618571638, seedBEKHO[122][9] = .6157907085074044, seedBEKHO[122][10] = .4934528146388615, seedBEKHO[122][11] = .22131677484200263, seedBEKHO[122][12] = .6983849982065928, seedBEKHO[122][13] = .1740471905507679, seedBEKHO[123] = [], seedBEKHO[123][0] = .29306149890687205, seedBEKHO[123][1] = .16487599551816334, seedBEKHO[123][2] = .13902989401326016, seedBEKHO[123][3] = .7531965903869533, seedBEKHO[123][4] = .15840679083483455, seedBEKHO[123][5] = .8121170004014673, seedBEKHO[123][6] = .3448857887004577, seedBEKHO[123][7] = .7778250265146001, seedBEKHO[123][8] = .9342421891292105, seedBEKHO[123][9] = .07856106236422922, seedBEKHO[123][10] = .68863075285559, seedBEKHO[123][11] = .11490482155030213, seedBEKHO[123][12] = .054415388370999684, seedBEKHO[123][13] = .7267592350505656, seedBEKHO[124] = [], seedBEKHO[124][0] = .01907322056455585, seedBEKHO[124][1] = .43210884849685893, seedBEKHO[124][2] = .8579115044635743, seedBEKHO[124][3] = .4630124577176895, seedBEKHO[124][4] = .6683180380554343, seedBEKHO[124][5] = .572446627470313, seedBEKHO[124][6] = .9159379048315686, seedBEKHO[124][7] = .1970229308610596, seedBEKHO[124][8] = .2870272739992399, seedBEKHO[124][9] = .8323457537558123, seedBEKHO[124][10] = .03159874674340779, seedBEKHO[124][11] = .10013424191126119, seedBEKHO[124][12] = .16400201187739882, seedBEKHO[124][13] = .39039589165484045, seedBEKHO[125] = [], seedBEKHO[125][0] = .43001326056627365, seedBEKHO[125][1] = .808396469679308, seedBEKHO[125][2] = .14079574745840895, seedBEKHO[125][3] = .3955728182810696, seedBEKHO[125][4] = .6635654459506097, seedBEKHO[125][5] = .844639698494972, seedBEKHO[125][6] = .4989430244477764, seedBEKHO[125][7] = .6832157402758872, seedBEKHO[125][8] = .6089373029010925, seedBEKHO[125][9] = .49681285698047684, seedBEKHO[125][10] = .0070677868737447636, seedBEKHO[125][11] = .8432133987389514, seedBEKHO[125][12] = .8937329452342386, seedBEKHO[125][13] = .05339229350982966, seedBEKHO[126] = [], seedBEKHO[126][0] = .4634998241153747, seedBEKHO[126][1] = .7120041502661707, seedBEKHO[126][2] = .9933935131659053, seedBEKHO[126][3] = .05123844467229888, seedBEKHO[126][4] = .900081176524292, seedBEKHO[126][5] = .4639412920122943, seedBEKHO[126][6] = .3434466320443543, seedBEKHO[126][7] = .4717930063947262, seedBEKHO[126][8] = .46412260471925637, seedBEKHO[126][9] = .9696176041988003, seedBEKHO[126][10] = .7429202515744315, seedBEKHO[126][11] = .9627187026288111, seedBEKHO[126][12] = .9768418965844203, seedBEKHO[126][13] = .3926477887419342, seedBEKHO[127] = [], seedBEKHO[127][0] = .4629542760810328, seedBEKHO[127][1] = .4944315744408514, seedBEKHO[127][2] = .6153846313964049, seedBEKHO[127][3] = .612440409553467, seedBEKHO[127][4] = .5440889071881791, seedBEKHO[127][5] = .4296434650952481, seedBEKHO[127][6] = .801149776036516, seedBEKHO[127][7] = .5611889740845719, seedBEKHO[127][8] = .8641971087712839, seedBEKHO[127][9] = .47304106914625854, seedBEKHO[127][10] = .4473716136013599, seedBEKHO[127][11] = .9948662493632219, seedBEKHO[127][12] = .9043185293266434, seedBEKHO[127][13] = .41584318762376715, seedBEKHO[128] = [], seedBEKHO[128][0] = .32105310996181236, seedBEKHO[128][1] = .47361795057208766, seedBEKHO[128][2] = .9931808992006401, seedBEKHO[128][3] = .2660811266419778, seedBEKHO[128][4] = .08872028732512316, seedBEKHO[128][5] = .5448985369046795, seedBEKHO[128][6] = .7966796130234959, seedBEKHO[128][7] = .8043351452318728, seedBEKHO[128][8] = .13352979612629112, seedBEKHO[128][9] = .04156354354795111, seedBEKHO[128][10] = .7418110464443413, seedBEKHO[128][11] = .1508445811927479, seedBEKHO[128][12] = .5544163785280303, seedBEKHO[128][13] = .35622167804392824, seedBEKHO[129] = [], seedBEKHO[129][0] = .27970856608305006, seedBEKHO[129][1] = .017739306538419042, seedBEKHO[129][2] = .28141944816134434, seedBEKHO[129][3] = .3492237867943062, seedBEKHO[129][4] = .14134550988266792, seedBEKHO[129][5] = .13478689075003425, seedBEKHO[129][6] = .9379771992710169, seedBEKHO[129][7] = .4192600685442036, seedBEKHO[129][8] = .19712163872495414, seedBEKHO[129][9] = .5056224733964969, seedBEKHO[129][10] = .2244823078103988, seedBEKHO[129][11] = .6946705579963222, seedBEKHO[129][12] = .6159224954631142, seedBEKHO[129][13] = .368765299477654, seedBEKHO[130] = [], seedBEKHO[130][0] = .4191402280571146, seedBEKHO[130][1] = .5051216435391501, seedBEKHO[130][2] = .5862776644909267, seedBEKHO[130][3] = .9723400890416107, seedBEKHO[130][4] = .26223088863468536, seedBEKHO[130][5] = .8175330735578734, seedBEKHO[130][6] = .9484506330974138, seedBEKHO[130][7] = .3152805785297079, seedBEKHO[130][8] = .8994537133676626, seedBEKHO[130][9] = .4002830757083715, seedBEKHO[130][10] = .6168468134212568, seedBEKHO[130][11] = .28473128593481856, seedBEKHO[130][12] = .4452920943665686, seedBEKHO[130][13] = .6735743900135363, seedBEKHO[131] = [], seedBEKHO[131][0] = .4899975451994043, seedBEKHO[131][1] = .7973530277538341, seedBEKHO[131][2] = .6187785034891948, seedBEKHO[131][3] = .12405382740791238, seedBEKHO[131][4] = .850999580947382, seedBEKHO[131][5] = .9156422832869386, seedBEKHO[131][6] = .12070657990814726, seedBEKHO[131][7] = .04112928316281694, seedBEKHO[131][8] = .3110923670676027, seedBEKHO[131][9] = .6437165008412316, seedBEKHO[131][10] = .3827880812041231, seedBEKHO[131][11] = .4818458251097615, seedBEKHO[131][12] = .10452306069429573, seedBEKHO[131][13] = .5114047382394402, seedBEKHO[132] = [], seedBEKHO[132][0] = .5000345611754893, seedBEKHO[132][1] = .9916256649339175, seedBEKHO[132][2] = .6232443898187341, seedBEKHO[132][3] = .64565738965407, seedBEKHO[132][4] = .45972671433304857, seedBEKHO[132][5] = .8603947091270001, seedBEKHO[132][6] = .4373048795225074, seedBEKHO[132][7] = .5231483199674367, seedBEKHO[132][8] = .0038532102093278287, seedBEKHO[132][9] = .8721853027102608, seedBEKHO[132][10] = .11858770172445365, seedBEKHO[132][11] = .838905533171276, seedBEKHO[132][12] = .6230011930807828, seedBEKHO[132][13] = .8682706962826507, seedBEKHO[133] = [], seedBEKHO[133][0] = .535325434932673, seedBEKHO[133][1] = .6571806653324825, seedBEKHO[133][2] = .6517557526229989, seedBEKHO[133][3] = .4481505685237248, seedBEKHO[133][4] = .9136849195959755, seedBEKHO[133][5] = .9795646084980514, seedBEKHO[133][6] = .02152564507597976, seedBEKHO[133][7] = .1205167685215951, seedBEKHO[133][8] = .27207638591656, seedBEKHO[133][9] = .5769346464232255, seedBEKHO[133][10] = .5208968852596048, seedBEKHO[133][11] = .5796578368472192, seedBEKHO[133][12] = .9151840032420508, seedBEKHO[133][13] = .7354492764418441, seedBEKHO[134] = [], seedBEKHO[134][0] = .5341089633147802, seedBEKHO[134][1] = .6064264839836062, seedBEKHO[134][2] = .8778777932645256, seedBEKHO[134][3] = .7756604547952664, seedBEKHO[134][4] = .640136569395779, seedBEKHO[134][5] = .5918726032737123, seedBEKHO[134][6] = .39844829807005855, seedBEKHO[134][7] = .773702617579592, seedBEKHO[134][8] = .334873908555553, seedBEKHO[134][9] = .5451425258753573, seedBEKHO[134][10] = .08402539872437798, seedBEKHO[134][11] = .7171535410477745, seedBEKHO[134][12] = .38049527386434834, seedBEKHO[134][13] = .21584754654817395, seedBEKHO[135] = [], seedBEKHO[135][0] = .660639737505843, seedBEKHO[135][1] = .419944641626931, seedBEKHO[135][2] = .0004384715446215104, seedBEKHO[135][3] = .17178361495005068, seedBEKHO[135][4] = .44297327241439244, seedBEKHO[135][5] = .506272751780132, seedBEKHO[135][6] = .4396715930565407, seedBEKHO[135][7] = .8830195914792711, seedBEKHO[135][8] = .17943206871086836, seedBEKHO[135][9] = .12118897817499041, seedBEKHO[135][10] = .11694325116680848, seedBEKHO[135][11] = .4965130678229537, seedBEKHO[135][12] = .011230149754604568, seedBEKHO[135][13] = .9988576716109516, seedBEKHO[136] = [], seedBEKHO[136][0] = .4132809124467105, seedBEKHO[136][1] = .43432032112185626, seedBEKHO[136][2] = .5061183483160476, seedBEKHO[136][3] = .8483106159749885, seedBEKHO[136][4] = .07395425068393124, seedBEKHO[136][5] = .25933897163236996, seedBEKHO[136][6] = .14928102739222449, seedBEKHO[136][7] = .6110528961232009, seedBEKHO[136][8] = .30070151759631236, seedBEKHO[136][9] = .3416027263573944, seedBEKHO[136][10] = .04080593830328927, seedBEKHO[136][11] = .5349056995660213, seedBEKHO[136][12] = .14636521480213172, seedBEKHO[136][13] = .9375001728441366, seedBEKHO[137] = [], seedBEKHO[137][0] = .915042625934178, seedBEKHO[137][1] = .9730361696048688, seedBEKHO[137][2] = .4244526180781121, seedBEKHO[137][3] = .2232597281553259, seedBEKHO[137][4] = .15346709791509183, seedBEKHO[137][5] = .018220241070621146, seedBEKHO[137][6] = .393788511005696, seedBEKHO[137][7] = .8656638269909533, seedBEKHO[137][8] = .2724837329877039, seedBEKHO[137][9] = .745460463327545, seedBEKHO[137][10] = .9767178860527743, seedBEKHO[137][11] = .021217728500073196, seedBEKHO[137][12] = .2947307515830544, seedBEKHO[137][13] = .6394412643818908, seedBEKHO[138] = [], seedBEKHO[138][0] = .3699955900122949, seedBEKHO[138][1] = .9178755350865502, seedBEKHO[138][2] = .5241129265935953, seedBEKHO[138][3] = .6802959260903463, seedBEKHO[138][4] = .22783935411458267, seedBEKHO[138][5] = .3171627169035154, seedBEKHO[138][6] = .6969739636684529, seedBEKHO[138][7] = .8610724788417774, seedBEKHO[138][8] = .4189960001328914, seedBEKHO[138][9] = .9035708630901709, seedBEKHO[138][10] = .9658445697891891, seedBEKHO[138][11] = .9632767302587397, seedBEKHO[138][12] = .028040770315015617, seedBEKHO[138][13] = .6846937385081862, seedBEKHO[139] = [], seedBEKHO[139][0] = .8292837534127226, seedBEKHO[139][1] = .380118696158793, seedBEKHO[139][2] = .08158507601752252, seedBEKHO[139][3] = .6938983322054144, seedBEKHO[139][4] = .46391882243311233, seedBEKHO[139][5] = .14983196469062188, seedBEKHO[139][6] = .6311402394274299, seedBEKHO[139][7] = .9303435739787844, seedBEKHO[139][8] = .17409910218661495, seedBEKHO[139][9] = .2210694576924599, seedBEKHO[139][10] = .14634679871129896, seedBEKHO[139][11] = .8878940300274052, seedBEKHO[139][12] = .6513476119806916, seedBEKHO[139][13] = .09930858971383172, seedBEKHO[140] = [], seedBEKHO[140][0] = .017276936622649064, seedBEKHO[140][1] = .8175462558400848, seedBEKHO[140][2] = .9484635418963481, seedBEKHO[140][3] = .6730492667814927, seedBEKHO[140][4] = .7787606632926929, seedBEKHO[140][5] = .7938390127789998, seedBEKHO[140][6] = .8278434950090283, seedBEKHO[140][7] = .2044708812888436, seedBEKHO[140][8] = .4199893378926587, seedBEKHO[140][9] = .05155174542960905, seedBEKHO[140][10] = .5399962922968855, seedBEKHO[140][11] = .728241533504127, seedBEKHO[140][12] = .14999889861009374, seedBEKHO[140][13] = .5871512186055703, seedBEKHO[141] = [], seedBEKHO[141][0] = .9725440329376034, seedBEKHO[141][1] = .4243962698913024, seedBEKHO[141][2] = .42303574445394054, seedBEKHO[141][3] = .1999265768285814, seedBEKHO[141][4] = .028726727038534516, seedBEKHO[141][5] = .9743755855225598, seedBEKHO[141][6] = .06408118649586836, seedBEKHO[141][7] = .3421199613509882, seedBEKHO[141][8] = .34665209706824984, seedBEKHO[141][9] = .2613249714980852, seedBEKHO[141][10] = .8744131139242048, seedBEKHO[141][11] = .04950162780813416, seedBEKHO[141][12] = .4632149593218613, seedBEKHO[141][13] = .24718097734869593, seedBEKHO[142] = [], seedBEKHO[142][0] = .31800085082193275, seedBEKHO[142][1] = .1016528585128893, seedBEKHO[142][2] = .8180772105867562, seedBEKHO[142][3] = .9490797832124684, seedBEKHO[142][4] = .46549674220918025, seedBEKHO[142][5] = .9698453494880659, seedBEKHO[142][6] = .3864525582805345, seedBEKHO[142][7] = .6795706448606977, seedBEKHO[142][8] = .4363732604573052, seedBEKHO[142][9] = .43894614964557, seedBEKHO[142][10] = .5692867411080067, seedBEKHO[142][11] = .1767267688609293, seedBEKHO[142][12] = .5106552377523395, seedBEKHO[142][13] = .8178593470350428, seedBEKHO[143] = [], seedBEKHO[143][0] = .7916663285116041, seedBEKHO[143][1] = .3372495327886169, seedBEKHO[143][2] = .6767780930024396, seedBEKHO[143][3] = .4175904892971183, seedBEKHO[143][4] = .8959334764580578, seedBEKHO[143][5] = .1397912977154625, seedBEKHO[143][6] = .7684501075811041, seedBEKHO[143][7] = .2761558127971895, seedBEKHO[143][8] = .3389849452194551, seedBEKHO[143][9] = .29474034726784604, seedBEKHO[143][10] = .8278815325041384, seedBEKHO[143][11] = .7735214567332638, seedBEKHO[143][12] = .2398320684678179, seedBEKHO[143][13] = .46821606077816025, seedBEKHO[144] = [], seedBEKHO[144][0] = .9021931024510503, seedBEKHO[144][1] = .3832408406609462, seedBEKHO[144][2] = .9321491141773854, seedBEKHO[144][3] = .9236680697634365, seedBEKHO[144][4] = .48720389554430543, seedBEKHO[144][5] = .8149743987139701, seedBEKHO[144][6] = .5811257065702591, seedBEKHO[144][7] = .8821245590905491, seedBEKHO[144][8] = .8516363486229697, seedBEKHO[144][9] = .5608454751919922, seedBEKHO[144][10] = .35458687959959967, seedBEKHO[144][11] = .9114616081707025, seedBEKHO[144][12] = .6175309524427139, seedBEKHO[144][13] = .4281707159345862, seedBEKHO[145] = [], seedBEKHO[145][0] = .05523875312286819, seedBEKHO[145][1] = .6507217919473354, seedBEKHO[145][2] = .8849830953267066, seedBEKHO[145][3] = .85174792541583, seedBEKHO[145][4] = .9888964921008219, seedBEKHO[145][5] = .5266960135815208, seedBEKHO[145][6] = .009703587228045985, seedBEKHO[145][7] = .44644333158499694, seedBEKHO[145][8] = .800902411084635, seedBEKHO[145][9] = .7775657403247307, seedBEKHO[145][10] = .7061938943115023, seedBEKHO[145][11] = .5537285648404162, seedBEKHO[145][12] = .7069311014591206, seedBEKHO[145][13] = .42848998922237325, seedBEKHO[146] = [], seedBEKHO[146][0] = .16222911420870267, seedBEKHO[146][1] = .6225080093785651, seedBEKHO[146][2] = .7078024031252714, seedBEKHO[146][3] = .44878527981035243, seedBEKHO[146][4] = .74610580195411, seedBEKHO[146][5] = .7306109173281157, seedBEKHO[146][6] = .8414377195315745, seedBEKHO[146][7] = .6244304846621302, seedBEKHO[146][8] = .8379042377286894, seedBEKHO[146][9] = .7442623994037658, seedBEKHO[146][10] = .2657998353522586, seedBEKHO[146][11] = .48682307782204104, seedBEKHO[146][12] = .22783291347041712, seedBEKHO[146][13] = .5806516685177008, seedBEKHO[147] = [], seedBEKHO[147][0] = .17901442366369236, seedBEKHO[147][1] = .6120067856364801, seedBEKHO[147][2] = .8541109169660099, seedBEKHO[147][3] = .10004053845000382, seedBEKHO[147][4] = .2116368091813905, seedBEKHO[147][5] = .23829252858222993, seedBEKHO[147][6] = .01981305978876291, seedBEKHO[147][7] = .08975032920265824, seedBEKHO[147][8] = .5718265184758102, seedBEKHO[147][9] = .5689376489530211, seedBEKHO[147][10] = .5972587378168241, seedBEKHO[147][11] = .15593744906619578, seedBEKHO[147][12] = .026134666604817225, seedBEKHO[147][13] = .6155351705819452, seedBEKHO[148] = [], seedBEKHO[148][0] = .823197691529443, seedBEKHO[148][1] = .9640718389785612, seedBEKHO[148][2] = .707495280230239, seedBEKHO[148][3] = .01942947122628169, seedBEKHO[148][4] = .4333069167841228, seedBEKHO[148][5] = .06284026668251097, seedBEKHO[148][6] = .45299110498533923, seedBEKHO[148][7] = .47061644946697867, seedBEKHO[148][8] = .3715421818171085, seedBEKHO[148][9] = .8535395926171367, seedBEKHO[148][10] = .9015028964224694, seedBEKHO[148][11] = .6767605704711461, seedBEKHO[148][12] = .27527302390723873, seedBEKHO[148][13] = .5293327728637951, seedBEKHO[149] = [], seedBEKHO[149][0] = .439023962103269, seedBEKHO[149][1] = .34995912694093834, seedBEKHO[149][2] = .4113400558202245, seedBEKHO[149][3] = .9223525351429607, seedBEKHO[149][4] = .22283499625309733, seedBEKHO[149][5] = .5326115178090975, seedBEKHO[149][6] = .11208678042431397, seedBEKHO[149][7] = .3546685866862669, seedBEKHO[149][8] = .8568713842307909, seedBEKHO[149][9] = .3152244016869663, seedBEKHO[149][10] = .5891705405182261, seedBEKHO[149][11] = .6619263160104016, seedBEKHO[149][12] = .6685498477914362, seedBEKHO[149][13] = .23018577282665942, seedBEKHO[150] = [], seedBEKHO[150][0] = .8133584576816659, seedBEKHO[150][1] = .4991153438842395, seedBEKHO[150][2] = .6802067771345641, seedBEKHO[150][3] = .7951306853778013, seedBEKHO[150][4] = .49424608012160576, seedBEKHO[150][5] = .6394258783785924, seedBEKHO[150][6] = .19009469647743993, seedBEKHO[150][7] = .09066969976572525, seedBEKHO[150][8] = .8832345737778837, seedBEKHO[150][9] = .34481139544241923, seedBEKHO[150][10] = .38032840578586247, seedBEKHO[150][11] = .7816275057984257, seedBEKHO[150][12] = .4097454570318888, seedBEKHO[150][13] = .03177653631111044, seedBEKHO[151] = [], seedBEKHO[151][0] = .4023965932693532, seedBEKHO[151][1] = .7761297713719193, seedBEKHO[151][2] = .06481126565238693, seedBEKHO[151][3] = .94528285836738, seedBEKHO[151][4] = .3615358468470633, seedBEKHO[151][5] = .8852352521476206, seedBEKHO[151][6] = .10291631199777429, seedBEKHO[151][7] = .8613281082937296, seedBEKHO[151][8] = .48657325088495385, seedBEKHO[151][9] = .7884315035994256, seedBEKHO[151][10] = .6846026934711136, seedBEKHO[151][11] = .006264939775825207, seedBEKHO[151][12] = .2766693872545569, seedBEKHO[151][13] = .7208004546607627, seedBEKHO[152] = [], seedBEKHO[152][0] = .20991989124654986, seedBEKHO[152][1] = .6727271460770716, seedBEKHO[152][2] = .2588978806305555, seedBEKHO[152][3] = .30714437159503083, seedBEKHO[152][4] = .6674197737670986, seedBEKHO[152][5] = .25028119738409815, seedBEKHO[152][6] = .4418213518871432, seedBEKHO[152][7] = .6131301742210058, seedBEKHO[152][8] = .05781160125704865, seedBEKHO[152][9] = .7203145744779527, seedBEKHO[152][10] = .6768431699054904, seedBEKHO[152][11] = .401762862299222, seedBEKHO[152][12] = .07504789144288138, seedBEKHO[152][13] = .7526422484008353, seedBEKHO[153] = [], seedBEKHO[153][0] = .8083106112521186, seedBEKHO[153][1] = .4719832484171784, seedBEKHO[153][2] = .14841884169422892, seedBEKHO[153][3] = .41337236215543327, seedBEKHO[153][4] = .9603512501964151, seedBEKHO[153][5] = .41693161235319454, seedBEKHO[153][6] = .5456173310500698, seedBEKHO[153][7] = .5020889759562877, seedBEKHO[153][8] = .6962129150895411, seedBEKHO[153][9] = .2829651759729892, seedBEKHO[153][10] = .8368289787438987, seedBEKHO[153][11] = .6528286796566207, seedBEKHO[153][12] = .6487615345587299, seedBEKHO[153][13] = .07004022085826755, seedBEKHO[154] = [], seedBEKHO[154][0] = .8087366338898307, seedBEKHO[154][1] = .10956265017057154, seedBEKHO[154][2] = .788230003194212, seedBEKHO[154][3] = .27466458605540023, seedBEKHO[154][4] = .7866559252777838, seedBEKHO[154][5] = .6705984239757357, seedBEKHO[154][6] = .7253811100010532, seedBEKHO[154][7] = .666844291458764, seedBEKHO[154][8] = .1094381435771683, seedBEKHO[154][9] = .6854837846579431, seedBEKHO[154][10] = .08195228266961663, seedBEKHO[154][11] = .3077615354592551, seedBEKHO[154][12] = .49175670448799913, seedBEKHO[154][13] = .06506847244697544, seedBEKHO[155] = [], seedBEKHO[155][0] = .49089214815597004, seedBEKHO[155][1] = .5228277011800981, seedBEKHO[155][2] = .9176185262627607, seedBEKHO[155][3] = .30854771377219725, seedBEKHO[155][4] = .9601307294791408, seedBEKHO[155][5] = .47120776117546415, seedBEKHO[155][6] = .6510786753733291, seedBEKHO[155][7] = .6627741409201688, seedBEKHO[155][8] = .8929619656588532, seedBEKHO[155][9] = .4822054811531571, seedBEKHO[155][10] = .57755469928225, seedBEKHO[155][11] = .7065153157004491, seedBEKHO[155][12] = .289275863864523, seedBEKHO[155][13] = .17054680911422038, seedBEKHO[156] = [], seedBEKHO[156][0] = .8625776646549412, seedBEKHO[156][1] = .2974969893119632, seedBEKHO[156][2] = .4457347519413264, seedBEKHO[156][3] = .42286250574592965, seedBEKHO[156][4] = .6646149377863724, seedBEKHO[156][5] = .9675701517321997, seedBEKHO[156][6] = .6980142115985013, seedBEKHO[156][7] = .21472971524163076, seedBEKHO[156][8] = .7011447141017106, seedBEKHO[156][9] = .09177134935878284, seedBEKHO[156][10] = .8364334794404549, seedBEKHO[156][11] = .7522354149580537, seedBEKHO[156][12] = .879360917656735, seedBEKHO[156][13] = .8107614283586049, seedBEKHO[157] = [], seedBEKHO[157][0] = .8326165494268329, seedBEKHO[157][1] = .7611001393669261, seedBEKHO[157][2] = .298821583513428, seedBEKHO[157][3] = .345931956337451, seedBEKHO[157][4] = .12122237160879146, seedBEKHO[157][5] = .311578212409495, seedBEKHO[157][6] = .08485638899728731, seedBEKHO[157][7] = .171258260311125, seedBEKHO[157][8] = .5538861200120297, seedBEKHO[157][9] = .3235481910597582, seedBEKHO[157][10] = .8573218614970641, seedBEKHO[157][11] = .4853211572120566, seedBEKHO[157][12] = .4703981985286503, seedBEKHO[157][13] = .6110276421962229, seedBEKHO[158] = [], seedBEKHO[158][0] = .07657731304235549, seedBEKHO[158][1] = .8794593286912622, seedBEKHO[158][2] = .0979465038390519, seedBEKHO[158][3] = .9614174081697366, seedBEKHO[158][4] = .5828458332934936, seedBEKHO[158][5] = .21727685595851787, seedBEKHO[158][6] = .8830814670421221, seedBEKHO[158][7] = .0856611351363814, seedBEKHO[158][8] = .8045060802864792, seedBEKHO[158][9] = .10540753271990022, seedBEKHO[158][10] = .3653732466041115, seedBEKHO[158][11] = .2114226543315061, seedBEKHO[158][12] = .8116891328615818, seedBEKHO[158][13] = .4103604316988536, seedBEKHO[159] = [], seedBEKHO[159][0] = .8582932076637282, seedBEKHO[159][1] = .9467133877981004, seedBEKHO[159][2] = .4499189417401963, seedBEKHO[159][3] = .6398516782195891, seedBEKHO[159][4] = .914999286237635, seedBEKHO[159][5] = .1815407153768156, seedBEKHO[159][6] = .7284265144930655, seedBEKHO[159][7] = .29611018916922105, seedBEKHO[159][8] = .6129697314894436, seedBEKHO[159][9] = .4931865387053982, seedBEKHO[159][10] = .7199088462716599, seedBEKHO[159][11] = .21437740244507042, seedBEKHO[159][12] = .47153949607536694, seedBEKHO[159][13] = .5000494411548486;
seedBEKHO[160] = [], seedBEKHO[160][0] = .4675660778745312, seedBEKHO[160][1] = .2769509324477972, seedBEKHO[160][2] = .07886698703102879, seedBEKHO[160][3] = .8960006257937896, seedBEKHO[160][4] = .46022171776512955, seedBEKHO[160][5] = .5815834987502861, seedBEKHO[160][6] = .8500803093213498, seedBEKHO[160][7] = .9888115846781063, seedBEKHO[160][8] = .9131440177322263, seedBEKHO[160][9] = .35594924498429914, seedBEKHO[160][10] = .41933107483564247, seedBEKHO[160][11] = .15857184130140745, seedBEKHO[160][12] = .744019030852767, seedBEKHO[160][13] = .24830787347055017, seedBEKHO[161] = [], seedBEKHO[161][0] = .7397053508854836, seedBEKHO[161][1] = .7519196575446354, seedBEKHO[161][2] = .7566619851411958, seedBEKHO[161][3] = .848238366274243, seedBEKHO[161][4] = .49338947261191013, seedBEKHO[161][5] = .6964312738940435, seedBEKHO[161][6] = .6721069115490321, seedBEKHO[161][7] = .2964737032918827, seedBEKHO[161][8] = .9214382485409338, seedBEKHO[161][9] = .7533117691464133, seedBEKHO[161][10] = .9964818181343207, seedBEKHO[161][11] = .010503082618478876, seedBEKHO[161][12] = .025000451873397056, seedBEKHO[161][13] = .573581269595699, seedBEKHO[162] = [], seedBEKHO[162][0] = .8813366064508603, seedBEKHO[162][1] = .5426413768090848, seedBEKHO[162][2] = .027930456646031665, seedBEKHO[162][3] = .3112805121123905, seedBEKHO[162][4] = .5746813074633361, seedBEKHO[162][5] = .05912259827287758, seedBEKHO[162][6] = .8860296838792168, seedBEKHO[162][7] = .21846263112387887, seedBEKHO[162][8] = .695286407935447, seedBEKHO[162][9] = .9056227423665153, seedBEKHO[162][10] = .8967472097021083, seedBEKHO[162][11] = .24498799463423038, seedBEKHO[162][12] = .8261406456943419, seedBEKHO[162][13] = .4174323702860505, seedBEKHO[163] = [], seedBEKHO[163][0] = .3188420196953774, seedBEKHO[163][1] = .6998883168396777, seedBEKHO[163][2] = .9445313593433098, seedBEKHO[163][3] = .9981099664207518, seedBEKHO[163][4] = .625061087728648, seedBEKHO[163][5] = .9797592644049773, seedBEKHO[163][6] = .18378510735394515, seedBEKHO[163][7] = .06449197113282112, seedBEKHO[163][8] = .5156475739550537, seedBEKHO[163][9] = .8662201836294143, seedBEKHO[163][10] = .6260797049639066, seedBEKHO[163][11] = .32749577665944196, seedBEKHO[163][12] = .25612655715161003, seedBEKHO[163][13] = .436667671303582, seedBEKHO[164] = [], seedBEKHO[164][0] = .48337766101559465, seedBEKHO[164][1] = .8041762433727087, seedBEKHO[164][2] = .6233313312260886, seedBEKHO[164][3] = .2067978802923922, seedBEKHO[164][4] = .801856670916453, seedBEKHO[164][5] = .6308178947018133, seedBEKHO[164][6] = .40000435017034697, seedBEKHO[164][7] = .7758514903774387, seedBEKHO[164][8] = .9170626940445679, seedBEKHO[164][9] = .9220721387423461, seedBEKHO[164][10] = .6513018116116644, seedBEKHO[164][11] = .43949833044826625, seedBEKHO[164][12] = .8071979239020193, seedBEKHO[164][13] = .6304487863577821, seedBEKHO[165] = [], seedBEKHO[165][0] = .15632753158977875, seedBEKHO[165][1] = .8696420596503789, seedBEKHO[165][2] = .9497737640901431, seedBEKHO[165][3] = .9947752001282169, seedBEKHO[165][4] = .2175493054371933, seedBEKHO[165][5] = .18225132952504297, seedBEKHO[165][6] = .12413169016470871, seedBEKHO[165][7] = .7196395065287196, seedBEKHO[165][8] = .4495477836870312, seedBEKHO[165][9] = .5561142062810571, seedBEKHO[165][10] = .5648167627505842, seedBEKHO[165][11] = .08013868720125683, seedBEKHO[165][12] = .832799828296126, seedBEKHO[165][13] = .8454133976511611, seedBEKHO[166] = [], seedBEKHO[166][0] = .015100364446563708, seedBEKHO[166][1] = .11597002319882121, seedBEKHO[166][2] = .09061193439900683, seedBEKHO[166][3] = .9313160589127674, seedBEKHO[166][4] = .30076200277045206, seedBEKHO[166][5] = .010129747505541076, seedBEKHO[166][6] = .501530681506946, seedBEKHO[166][7] = .2203649564778003, seedBEKHO[166][8] = .38932817463052993, seedBEKHO[166][9] = .8343640164890163, seedBEKHO[166][10] = .2221200179797409, seedBEKHO[166][11] = .6113065755568292, seedBEKHO[166][12] = .46339022418057674, seedBEKHO[166][13] = .8382147657876187, seedBEKHO[167] = [], seedBEKHO[167][0] = .8458212006889165, seedBEKHO[167][1] = .8925827307471439, seedBEKHO[167][2] = .42903153551872064, seedBEKHO[167][3] = .09172946698989559, seedBEKHO[167][4] = .35582969151234, seedBEKHO[167][5] = .9953049718539422, seedBEKHO[167][6] = .7412806641637657, seedBEKHO[167][7] = .6364445828632388, seedBEKHO[167][8] = .9702081553294619, seedBEKHO[167][9] = .3969889330886649, seedBEKHO[167][10] = .3365574939498148, seedBEKHO[167][11] = .9005832637174687, seedBEKHO[167][12] = .6528335466390951, seedBEKHO[167][13] = .28064781561057917, seedBEKHO[168] = [], seedBEKHO[168][0] = .8304806111162724, seedBEKHO[168][1] = .2521581243414144, seedBEKHO[168][2] = .8910034939091125, seedBEKHO[168][3] = .12453823835987521, seedBEKHO[168][4] = .7193276980077021, seedBEKHO[168][5] = .7270099864641772, seedBEKHO[168][6] = .6965538633224841, seedBEKHO[168][7] = .5534356941411787, seedBEKHO[168][8] = .4495933698322172, seedBEKHO[168][9] = .6695924045929909, seedBEKHO[168][10] = .3952515184892511, seedBEKHO[168][11] = .15267114555895467, seedBEKHO[168][12] = .48411534349294705, seedBEKHO[168][13] = .5768961611971155, seedBEKHO[169] = [], seedBEKHO[169][0] = .9488248558923218, seedBEKHO[169][1] = .6159996677982327, seedBEKHO[169][2] = .17714923485386547, seedBEKHO[169][3] = .4869534915210074, seedBEKHO[169][4] = .06121137830314183, seedBEKHO[169][5] = .7403178909569044, seedBEKHO[169][6] = .6738222843865838, seedBEKHO[169][7] = .6789033231791741, seedBEKHO[169][8] = .03381920247157599, seedBEKHO[169][9] = .4702559684300156, seedBEKHO[169][10] = .5978911107896989, seedBEKHO[169][11] = .10162210437053854, seedBEKHO[169][12] = .44328603847177495, seedBEKHO[169][13] = .2678088022614806, seedBEKHO[170] = [], seedBEKHO[170][0] = .19088108763523715, seedBEKHO[170][1] = .9115774614785626, seedBEKHO[170][2] = .6413397509814045, seedBEKHO[170][3] = .1900035481194453, seedBEKHO[170][4] = .24341257692236273, seedBEKHO[170][5] = .6915055346207315, seedBEKHO[170][6] = .5285987902773475, seedBEKHO[170][7] = .14274438753418117, seedBEKHO[170][8] = .06347686857133517, seedBEKHO[170][9] = .5654279682407606, seedBEKHO[170][10] = .19025566457302512, seedBEKHO[170][11] = .7650956989723843, seedBEKHO[170][12] = .7699895269531205, seedBEKHO[170][13] = .5891909541534519, seedBEKHO[171] = [], seedBEKHO[171][0] = .47989245225749744, seedBEKHO[171][1] = .50503508699032, seedBEKHO[171][2] = .691722553094112, seedBEKHO[171][3] = .9523387869760085, seedBEKHO[171][4] = .7676588921447565, seedBEKHO[171][5] = .556723568187053, seedBEKHO[171][6] = .5416053850237925, seedBEKHO[171][7] = .4974299082297242, seedBEKHO[171][8] = .6501434194504845, seedBEKHO[171][9] = .8246004215163565, seedBEKHO[171][10] = .9787293902034915, seedBEKHO[171][11] = .13317847459902077, seedBEKHO[171][12] = .7635512514623368, seedBEKHO[171][13] = .9291876765139373, seedBEKHO[172] = [], seedBEKHO[172][0] = .7661772397354656, seedBEKHO[172][1] = .03215423502181802, seedBEKHO[172][2] = .3199887207675256, seedBEKHO[172][3] = .17650278217811355, seedBEKHO[172][4] = .6392287286532266, seedBEKHO[172][5] = .8850478902790648, seedBEKHO[172][6] = .16937611272605424, seedBEKHO[172][7] = .568800536155305, seedBEKHO[172][8] = .048676539095877436, seedBEKHO[172][9] = .8880233247779779, seedBEKHO[172][10] = .5185647000543789, seedBEKHO[172][11] = .14624276319765905, seedBEKHO[172][12] = .4638289128584685, seedBEKHO[172][13] = .5071915329631982, seedBEKHO[173] = [], seedBEKHO[173][0] = .7546629046939477, seedBEKHO[173][1] = .0040521317552491, seedBEKHO[173][2] = .6752033905981205, seedBEKHO[173][3] = .6130726262344588, seedBEKHO[173][4] = .7834741372872644, seedBEKHO[173][5] = .5427240595436329, seedBEKHO[173][6] = .7874399484725947, seedBEKHO[173][7] = .9218234650074122, seedBEKHO[173][8] = .6540139309933661, seedBEKHO[173][9] = .303754887453791, seedBEKHO[173][10] = .15430969376981518, seedBEKHO[173][11] = .05503685130030789, seedBEKHO[173][12] = .32870371381242847, seedBEKHO[173][13] = .0958738064415261, seedBEKHO[174] = [], seedBEKHO[174][0] = .19941659901414166, seedBEKHO[174][1] = .7313531188695213, seedBEKHO[174][2] = .1890841514925743, seedBEKHO[174][3] = .5983146824983656, seedBEKHO[174][4] = .6570203599676914, seedBEKHO[174][5] = .691693380048428, seedBEKHO[174][6] = .5346122379459044, seedBEKHO[174][7] = .7588041004018893, seedBEKHO[174][8] = .4323480477651016, seedBEKHO[174][9] = .4831247706780779, seedBEKHO[174][10] = .2775220597785566, seedBEKHO[174][11] = .795689821379062, seedBEKHO[174][12] = .9305220430125549, seedBEKHO[174][13] = .303899546283124, seedBEKHO[175] = [], seedBEKHO[175][0] = .542334011537521, seedBEKHO[175][1] = .8785707220068095, seedBEKHO[175][2] = .06178170681313366, seedBEKHO[175][3] = .6646842228864245, seedBEKHO[175][4] = .7634157578981422, seedBEKHO[175][5] = .29458472824801296, seedBEKHO[175][6] = .7503595594113339, seedBEKHO[175][7] = .7144323876008205, seedBEKHO[175][8] = .06634841628840271, seedBEKHO[175][9] = .7761025966878954, seedBEKHO[175][10] = .9435969848113173, seedBEKHO[175][11] = .9122939414583289, seedBEKHO[175][12] = .9957270806336191, seedBEKHO[175][13] = .9789662479987007, seedBEKHO[176] = [], seedBEKHO[176][0] = .5050637140146756, seedBEKHO[176][1] = .8062913085083552, seedBEKHO[176][2] = .5138920759827983, seedBEKHO[176][3] = .18271392795378927, seedBEKHO[176][4] = .12252717893763254, seedBEKHO[176][5] = .5932727615418234, seedBEKHO[176][6] = .13984938435419703, seedBEKHO[176][7] = .4835053459326799, seedBEKHO[176][8] = .44577724862506574, seedBEKHO[176][9] = .45910078261475706, seedBEKHO[176][10] = .6773384094720605, seedBEKHO[176][11] = .24761153256712998, seedBEKHO[176][12] = .8826205927977779, seedBEKHO[176][13] = .31919679483206376, seedBEKHO[177] = [], seedBEKHO[177][0] = .9334380000168614, seedBEKHO[177][1] = .7568421192200896, seedBEKHO[177][2] = .8315578870890785, seedBEKHO[177][3] = .6605372629931325, seedBEKHO[177][4] = .8174785321788445, seedBEKHO[177][5] = .25535950367250915, seedBEKHO[177][6] = .5545453868649033, seedBEKHO[177][7] = .9188610438742657, seedBEKHO[177][8] = .4572444872893866, seedBEKHO[177][9] = .45269428879202867, seedBEKHO[177][10] = .5568900491527677, seedBEKHO[177][11] = .5579003580913693, seedBEKHO[177][12] = .330460104762373, seedBEKHO[177][13] = .48593190103925865, seedBEKHO[178] = [], seedBEKHO[178][0] = .770841762791294, seedBEKHO[178][1] = .26795255501569315, seedBEKHO[178][2] = .27869543075718783, seedBEKHO[178][3] = .9022146639385138, seedBEKHO[178][4] = .9453922429769892, seedBEKHO[178][5] = .715470011858109, seedBEKHO[178][6] = .3139233035709139, seedBEKHO[178][7] = .866501938945673, seedBEKHO[178][8] = .9713466602570358, seedBEKHO[178][9] = .6030883219139225, seedBEKHO[178][10] = .23382981257636692, seedBEKHO[178][11] = .6421021227503392, seedBEKHO[178][12] = .4007652998326261, seedBEKHO[178][13] = .8627401750823094, seedBEKHO[179] = [], seedBEKHO[179][0] = .8034524212036573, seedBEKHO[179][1] = .3503520896754462, seedBEKHO[179][2] = .6818736993405285, seedBEKHO[179][3] = .8887418903303557, seedBEKHO[179][4] = .5047934996965577, seedBEKHO[179][5] = .0605635060187002, seedBEKHO[179][6] = .5029170435798178, seedBEKHO[179][7] = .12330249771889035, seedBEKHO[179][8] = .5174610406762075, seedBEKHO[179][9] = .893305718587001, seedBEKHO[179][10] = .6922276452908316, seedBEKHO[179][11] = .03302338534467064, seedBEKHO[179][12] = .7851465317475761, seedBEKHO[179][13] = .5376660591578366, seedBEKHO[180] = [], seedBEKHO[180][0] = .30430979407766934, seedBEKHO[180][1] = .2193471815941297, seedBEKHO[180][2] = .3229674900991295, seedBEKHO[180][3] = .10338413699929117, seedBEKHO[180][4] = .9712743659301102, seedBEKHO[180][5] = .4188063768532171, seedBEKHO[180][6] = .36324535787528656, seedBEKHO[180][7] = .490098539067376, seedBEKHO[180][8] = .9649850219805713, seedBEKHO[180][9] = .8844157037788616, seedBEKHO[180][10] = .5714712934979089, seedBEKHO[180][11] = .699727062615429, seedBEKHO[180][12] = .6319106235219114, seedBEKHO[180][13] = .16448357716892104, seedBEKHO[181] = [], seedBEKHO[181][0] = .060108361537581034, seedBEKHO[181][1] = .26867596990713594, seedBEKHO[181][2] = .04773314815151464, seedBEKHO[181][3] = .32671577014517084, seedBEKHO[181][4] = .0802066140971931, seedBEKHO[181][5] = .4781409841716078, seedBEKHO[181][6] = .6178037944708876, seedBEKHO[181][7] = .1297140156468577, seedBEKHO[181][8] = .3624747406232405, seedBEKHO[181][9] = .6723196760836903, seedBEKHO[181][10] = .05061217934789175, seedBEKHO[181][11] = .7400061332964347, seedBEKHO[181][12] = .0023789038988815125, seedBEKHO[181][13] = .1267551369806732, seedBEKHO[182] = [], seedBEKHO[182][0] = .3623694518049072, seedBEKHO[182][1] = .4155796529416249, seedBEKHO[182][2] = .013757964446373894, seedBEKHO[182][3] = .2276012128025029, seedBEKHO[182][4] = .23258232809328394, seedBEKHO[182][5] = .5924369766553865, seedBEKHO[182][6] = .3342040991296389, seedBEKHO[182][7] = .756843924675241, seedBEKHO[182][8] = .12307754734301013, seedBEKHO[182][9] = .20561851908471107, seedBEKHO[182][10] = .42062030383842575, seedBEKHO[182][11] = .10346339473495059, seedBEKHO[182][12] = .749184718007347, seedBEKHO[182][13] = .35839876075078103, seedBEKHO[183] = [], seedBEKHO[183][0] = .7432207031246554, seedBEKHO[183][1] = .8091705570021517, seedBEKHO[183][2] = .11154405490373054, seedBEKHO[183][3] = .4738591993843404, seedBEKHO[183][4] = .5806470780587587, seedBEKHO[183][5] = .5169969226192821, seedBEKHO[183][6] = .47360903491305195, seedBEKHO[183][7] = .09244714429754053, seedBEKHO[183][8] = .33346703212941264, seedBEKHO[183][9] = .27525342352911353, seedBEKHO[183][10] = .08560501147898902, seedBEKHO[183][11] = .7544724730695669, seedBEKHO[183][12] = .6103261763972478, seedBEKHO[183][13] = .7558779849185491, seedBEKHO[184] = [], seedBEKHO[184][0] = .23528827568526722, seedBEKHO[184][1] = .48299354083523527, seedBEKHO[184][2] = .8771405662586922, seedBEKHO[184][3] = .957323243309905, seedBEKHO[184][4] = .8953257662130674, seedBEKHO[184][5] = .7914359957680024, seedBEKHO[184][6] = .19450239395416502, seedBEKHO[184][7] = .29803144656957414, seedBEKHO[184][8] = .4826251416690077, seedBEKHO[184][9] = .308167918866306, seedBEKHO[184][10] = .927014965638082, seedBEKHO[184][11] = .8092243302565478, seedBEKHO[184][12] = .3220687383497698, seedBEKHO[184][13] = .44958316398914144, seedBEKHO[185] = [], seedBEKHO[185][0] = .7453575573899169, seedBEKHO[185][1] = .820437724343692, seedBEKHO[185][2] = .8245476199790409, seedBEKHO[185][3] = .2966393662618534, seedBEKHO[185][4] = .4376474299644597, seedBEKHO[185][5] = .21193350324899796, seedBEKHO[185][6] = .8959393652751608, seedBEKHO[185][7] = .9485444143779433, seedBEKHO[185][8] = .6142783825702822, seedBEKHO[185][9] = .10045368347696004, seedBEKHO[185][10] = .5218217404451428, seedBEKHO[185][11] = .20300569759036025, seedBEKHO[185][12] = .6985672740652809, seedBEKHO[185][13] = .39521365112931317, seedBEKHO[186] = [], seedBEKHO[186][0] = .9219276948856387, seedBEKHO[186][1] = .45907301069649664, seedBEKHO[186][2] = .923458892115409, seedBEKHO[186][3] = .8990704364894988, seedBEKHO[186][4] = .48362260118364, seedBEKHO[186][5] = .6990057092126487, seedBEKHO[186][6] = .29951715207673013, seedBEKHO[186][7] = .2764598977956463, seedBEKHO[186][8] = .8762807913074566, seedBEKHO[186][9] = .05436104915565765, seedBEKHO[186][10] = .6154643793520627, seedBEKHO[186][11] = .4877308651805692, seedBEKHO[186][12] = .40959649500662443, seedBEKHO[186][13] = .003360260138414617, seedBEKHO[187] = [], seedBEKHO[187][0] = .10660595087604174, seedBEKHO[187][1] = .19431092335671707, seedBEKHO[187][2] = .7603253935434806, seedBEKHO[187][3] = .08916812697953636, seedBEKHO[187][4] = .9069262228846051, seedBEKHO[187][5] = .45080025675916646, seedBEKHO[187][6] = .4258786297535535, seedBEKHO[187][7] = .590900972964455, seedBEKHO[187][8] = .557312952973483, seedBEKHO[187][9] = .6749140860722633, seedBEKHO[187][10] = .6878947740744557, seedBEKHO[187][11] = .7447239346244239, seedBEKHO[187][12] = .5182302044222271, seedBEKHO[187][13] = .924486735825873, seedBEKHO[188] = [], seedBEKHO[188][0] = .06369228955651085, seedBEKHO[188][1] = .2669051731621317, seedBEKHO[188][2] = .5698449746172571, seedBEKHO[188][3] = .6507062732155564, seedBEKHO[188][4] = .6060746360471161, seedBEKHO[188][5] = .9455649858163013, seedBEKHO[188][6] = .726778971919491, seedBEKHO[188][7] = .943174649678387, seedBEKHO[188][8] = .18158531580013082, seedBEKHO[188][9] = .6630024299491353, seedBEKHO[188][10] = .5680524520992549, seedBEKHO[188][11] = .6221173728612874, seedBEKHO[188][12] = .26377478964392576, seedBEKHO[188][13] = .8530822128536333, seedBEKHO[189] = [], seedBEKHO[189][0] = .6912512897385596, seedBEKHO[189][1] = .027993583784612364, seedBEKHO[189][2] = .8157575677003945, seedBEKHO[189][3] = .44881406012169167, seedBEKHO[189][4] = .1868920707585351, seedBEKHO[189][5] = .9865510756177907, seedBEKHO[189][6] = .8226799940687315, seedBEKHO[189][7] = .5987905031844978, seedBEKHO[189][8] = .8734963151147996, seedBEKHO[189][9] = .10814784893731666, seedBEKHO[189][10] = .7999369446528901, seedBEKHO[189][11] = .21745389426360506, seedBEKHO[189][12] = .1549254353902365, seedBEKHO[189][13] = .08195366261234582, seedBEKHO[190] = [], seedBEKHO[190][0] = .6528564330214746, seedBEKHO[190][1] = .1656413918602957, seedBEKHO[190][2] = .8402593632333335, seedBEKHO[190][3] = .16696852215077418, seedBEKHO[190][4] = .08617064228454296, seedBEKHO[190][5] = .914958232466073, seedBEKHO[190][6] = .621967301564458, seedBEKHO[190][7] = .1371540125852817, seedBEKHO[190][8] = .04505032770774364, seedBEKHO[190][9] = .08628808723104342, seedBEKHO[190][10] = .9661326637880185, seedBEKHO[190][11] = .652892862935192, seedBEKHO[190][12] = .40875060505517724, seedBEKHO[190][13] = .46150578015429744, seedBEKHO[191] = [], seedBEKHO[191][0] = .15999646360446085, seedBEKHO[191][1] = .9255016050369655, seedBEKHO[191][2] = .5460812143850786, seedBEKHO[191][3] = .6342291751695965, seedBEKHO[191][4] = .25824673287167843, seedBEKHO[191][5] = .042696726103113036, seedBEKHO[191][6] = .46046749451003044, seedBEKHO[191][7] = .3276828408117791, seedBEKHO[191][8] = .1784462117075074, seedBEKHO[191][9] = .8901438799676671, seedBEKHO[191][10] = .2573710165509895, seedBEKHO[191][11] = .36987829074898504, seedBEKHO[191][12] = .31092718641116024, seedBEKHO[191][13] = .9513714434596607, seedBEKHO[192] = [], seedBEKHO[192][0] = .8266530981201166, seedBEKHO[192][1] = .40177972891958436, seedBEKHO[192][2] = .736848347460745, seedBEKHO[192][3] = .11280276953281865, seedBEKHO[192][4] = .009925081656235735, seedBEKHO[192][5] = .07172379728851674, seedBEKHO[192][6] = .25240691777789515, seedBEKHO[192][7] = .22867977169331577, seedBEKHO[192][8] = .24235525607018715, seedBEKHO[192][9] = .27997675903895813, seedBEKHO[192][10] = .8288477404561623, seedBEKHO[192][11] = .8874715646925564, seedBEKHO[192][12] = .6510345236773716, seedBEKHO[192][13] = .9439735491908405, seedBEKHO[193] = [], seedBEKHO[193][0] = .8086171756753142, seedBEKHO[193][1] = .8718519206852102, seedBEKHO[193][2] = .17489160699844253, seedBEKHO[193][3] = .6166526465175606, seedBEKHO[193][4] = .8919531744450333, seedBEKHO[193][5] = .15748225276149497, seedBEKHO[193][6] = .6061496547731899, seedBEKHO[193][7] = .9638722417003325, seedBEKHO[193][8] = .7243961796988154, seedBEKHO[193][9] = .03873552739205177, seedBEKHO[193][10] = .2513669667789946, seedBEKHO[193][11] = .2736988021613136, seedBEKHO[193][12] = .4911540131792951, seedBEKHO[193][13] = .2327563781508304, seedBEKHO[194] = [], seedBEKHO[194][0] = .6108045150378001, seedBEKHO[194][1] = .639540405405697, seedBEKHO[194][2] = .23686180219274489, seedBEKHO[194][3] = .6020022621147287, seedBEKHO[194][4] = .3203699537563298, seedBEKHO[194][5] = .4951441554650011, seedBEKHO[194][6] = .11608982755532349, seedBEKHO[194][7] = .33660737273280406, seedBEKHO[194][8] = .9995491253304305, seedBEKHO[194][9] = .4948241931193549, seedBEKHO[194][10] = .0021600183108576587, seedBEKHO[194][11] = .9696162415304941, seedBEKHO[194][12] = .2446910103423583, seedBEKHO[194][13] = .5227726195415534, seedBEKHO[195] = [], seedBEKHO[195][0] = .3972454817326567, seedBEKHO[195][1] = .3603797561581241, seedBEKHO[195][2] = .5643872796204144, seedBEKHO[195][3] = .37661763367749823, seedBEKHO[195][4] = .17214362364890623, seedBEKHO[195][5] = .9614399645495644, seedBEKHO[195][6] = .783053398811647, seedBEKHO[195][7] = .7955188692431914, seedBEKHO[195][8] = .19988059165210914, seedBEKHO[195][9] = .2735800601853766, seedBEKHO[195][10] = .030971951686626698, seedBEKHO[195][11] = .43932787147650165, seedBEKHO[195][12] = .847868373802122, seedBEKHO[195][13] = .5700793439053904, seedBEKHO[196] = [], seedBEKHO[196][0] = .01928184058481519, seedBEKHO[196][1] = .3797811319510316, seedBEKHO[196][2] = .10967674918606618, seedBEKHO[196][3] = .6876885707138971, seedBEKHO[196][4] = .29580364075700016, seedBEKHO[196][5] = .5119951023713305, seedBEKHO[196][6] = .9231007670196769, seedBEKHO[196][7] = .6937749197108503, seedBEKHO[196][8] = .8173389516899363, seedBEKHO[196][9] = .37914088652658373, seedBEKHO[196][10] = .696991820878355, seedBEKHO[196][11] = .0962948548642697, seedBEKHO[196][12] = .018811656431032775, seedBEKHO[196][13] = .6009528979658867, seedBEKHO[197] = [], seedBEKHO[197][0] = .3599056332111481, seedBEKHO[197][1] = .5137846182326791, seedBEKHO[197][2] = .0053576334417759774, seedBEKHO[197][3] = .13502625420730707, seedBEKHO[197][4] = .4462618138833847, seedBEKHO[197][5] = .08270421445074438, seedBEKHO[197][6] = .7124205886176833, seedBEKHO[197][7] = .8062570346600431, seedBEKHO[197][8] = .36133053800071635, seedBEKHO[197][9] = .888047033606596, seedBEKHO[197][10] = .03186327502656061, seedBEKHO[197][11] = .8492845691318858, seedBEKHO[197][12] = .577033966405992, seedBEKHO[197][13] = .45649304787251266, seedBEKHO[198] = [], seedBEKHO[198][0] = .6216533596766911, seedBEKHO[198][1] = .8252744779187491, seedBEKHO[198][2] = .5477023308258353, seedBEKHO[198][3] = .6670075878985062, seedBEKHO[198][4] = .24420340167362986, seedBEKHO[198][5] = .3562297513334045, seedBEKHO[198][6] = .06487082851844672, seedBEKHO[198][7] = .42722447499084604, seedBEKHO[198][8] = .13949838488749244, seedBEKHO[198][9] = .8976816916630734, seedBEKHO[198][10] = .5182918019666085, seedBEKHO[198][11] = .6100617680229166, seedBEKHO[198][12] = .9705897420834251, seedBEKHO[198][13] = .8533909890362454, seedBEKHO[199] = [], seedBEKHO[199][0] = .08207897082295013, seedBEKHO[199][1] = .2454805472529178, seedBEKHO[199][2] = .7274687792908818, seedBEKHO[199][3] = .7100961524702643, seedBEKHO[199][4] = .10662244418098066, seedBEKHO[199][5] = .0029983505324193693, seedBEKHO[199][6] = .2565233248793328, seedBEKHO[199][7] = .5232433336732119, seedBEKHO[199][8] = .03162518181883334, seedBEKHO[199][9] = .7426935144094555, seedBEKHO[199][10] = .6242687834327696, seedBEKHO[199][11] = .411465223421559, seedBEKHO[199][12] = .6840512765746627, seedBEKHO[199][13] = .7846364359906637;
var Ribbon = pc.createScript("ribbon");
Ribbon.attributes.add("lifetime", {
  type: "number",
  default: .5
}), Ribbon.attributes.add("xoffset", {
  type: "number",
  default: -.8
}), Ribbon.attributes.add("yoffset", {
  type: "number",
  default: 1
}), Ribbon.attributes.add("height", {
  type: "number",
  default: .4
});
var MAX_VERTICES = 600,
  VERTEX_SIZE = 4;
Ribbon.prototype.create = function(e) {
  this.timer = 0, this.node = null, this.vertices = [], this.vertexData = new Float32Array(MAX_VERTICES * VERTEX_SIZE), this.entity.model = null
}, Ribbon.prototype.initialize = function() {
  this.create();
  var e = {
      attributes: {
        aPositionAge: pc.SEMANTIC_POSITION
      },
      vshader: ["attribute vec4 aPositionAge;", "", "uniform mat4 matrix_viewProjection;", "uniform float trail_time;", "", "varying float vAge;", "", "void main(void)", "{", "    vAge = trail_time - aPositionAge.w;", "    gl_Position = matrix_viewProjection * vec4(aPositionAge.xyz, 1.0);", "}"].join("\n"),
      fshader: ["precision mediump float;", "", "varying float vAge;", "", "uniform float trail_lifetime;", "", "vec3 rainbow(float x)", "{", "float level = floor(x * 6.0);", "float r = float(level <= 2.0) + float(level > 4.0) * 0.5;", "float g = max(1.0 - abs(level - 2.0) * 0.5, 0.0);", "float b = (1.0 - (level - 4.0) * 0.5) * float(level >= 4.0);", "return vec3(255, 255, 255);", "}", "void main(void)", "{", "    gl_FragColor = vec4(rainbow(vAge / trail_lifetime), (1.0 - (vAge / trail_lifetime)) * 0.5);", "}"].join("\n")
    },
    t = new pc.Shader(this.app.graphicsDevice, e),
    i = new pc.scene.Material;
  i.shader = t, i.setParameter("trail_time", 0), i.setParameter("trail_lifetime", this.lifetime), i.cull = pc.CULLFACE_NONE, i.blend = !0, i.blendSrc = pc.BLENDMODE_SRC_ALPHA, i.blendDst = pc.BLENDMODE_ONE_MINUS_SRC_ALPHA, i.blendEquation = pc.BLENDEQUATION_ADD, i.depthWrite = !0;
  var r = new pc.VertexFormat(this.app.context.graphicsDevice, [{
      semantic: pc.SEMANTIC_POSITION,
      components: 4,
      type: pc.ELEMENTTYPE_FLOAT32
    }]),
    a = new pc.VertexBuffer(this.app.context.graphicsDevice, r, MAX_VERTICES * VERTEX_SIZE, pc.USAGE_DYNAMIC),
    s = new pc.scene.Mesh(this.app.graphicsDevice);
  s.vertexBuffer = a, s.indexBuffer[0] = null, s.primitive[0].type = pc.PRIMITIVE_TRISTRIP, s.primitive[0].base = 0, s.primitive[0].count = 0, s.primitive[0].indexed = !1;
  var o = new pc.scene.GraphNode,
    n = new pc.scene.MeshInstance(o, s, i);
  n.cull = !1, n.layer = pc.scene.LAYER_WORLD, n.updateKey(), this.entity.model = new pc.scene.Model, this.entity.model.graph = o, this.entity.model.meshInstances.push(n), this.model = this.entity.model, this.setNode(this.entity)
}, Ribbon.prototype.reset = function() {
  this.timer = 0, this.vertices = []
}, Ribbon.prototype.spawn = function() {
  var e = this.node,
    t = e.getPosition(),
    i = e.up.clone().scale(this.height),
    r = this.xoffset,
    a = this.yoffset;
  this.vertices.unshift({
    spawnTime: this.timer,
    vertexPair: [t.x + i.x * r, t.y + i.y * r, t.z + i.z * r, t.x + i.x * a, t.y + i.y * a, t.z + i.z * a]
  })
}, Ribbon.prototype.clearOld = function() {
  for (var e = this.vertices.length - 1; e >= 0; e--) {
    var t = this.vertices[e];
    if (!(this.timer - t.spawnTime >= this.lifetime)) return;
    this.vertices.pop()
  }
}, Ribbon.prototype.copyToArrayBuffer = function() {
  for (var e = 0; e < this.vertices.length; e++) {
    var t = this.vertices[e];
    this.vertexData[8 * e + 0] = t.vertexPair[0], this.vertexData[8 * e + 1] = t.vertexPair[1], this.vertexData[8 * e + 2] = t.vertexPair[2], this.vertexData[8 * e + 3] = t.spawnTime, this.vertexData[8 * e + 4] = t.vertexPair[3], this.vertexData[8 * e + 5] = t.vertexPair[4], this.vertexData[8 * e + 6] = t.vertexPair[5], this.vertexData[8 * e + 7] = t.spawnTime
  }
}, Ribbon.prototype.updateNumActive = function() {
  this.model.meshInstances[0].mesh.primitive[0].count = 2 * this.vertices.length
}, Ribbon.prototype.update = function(e) {
  if (this.timer += e, this.model.meshInstances[0].material.setParameter("trail_time", this.timer), this.clearOld(), this.spawn(), this.vertices.length > 1) {
    this.copyToArrayBuffer(), this.updateNumActive();
    var t = this.model.meshInstances[0].mesh.vertexBuffer;
    new Float32Array(t.lock()).set(this.vertexData), t.unlock(), this.app.scene.containsModel(this.model) || (console.log("Added model"), this.app.scene.addModel(this.model))
  } else this.app.scene.containsModel(this.model) && (console.log("Removed model"), this.app.scene.removeModel(this.model))
}, Ribbon.prototype.setNode = function(e) {
  this.node = e
};
"undefined" != typeof document && (
  /*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
  function(t, e) {
    function s(t, e) {
      for (var n in e) try {
        t.style[n] = e[n]
      } catch (t) {}
      return t
    }

    function H(t) {
      return null == t ? String(t) : "object" == typeof t || "function" == typeof t ? Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase() || "object" : typeof t
    }

    function R(t, e) {
      if ("array" !== H(e)) return -1;
      if (e.indexOf) return e.indexOf(t);
      for (var n = 0, i = e.length; n < i; n++)
        if (e[n] === t) return n;
      return -1
    }

    function I() {
      var t, e = arguments;
      for (t in e[1])
        if (e[1].hasOwnProperty(t)) switch (H(e[1][t])) {
          case "object":
            e[0][t] = I({}, e[0][t], e[1][t]);
            break;
          case "array":
            e[0][t] = e[1][t].slice(0);
            break;
          default:
            e[0][t] = e[1][t]
        }
      return 2 < e.length ? I.apply(null, [e[0]].concat(Array.prototype.slice.call(e, 2))) : e[0]
    }

    function N(t) {
      return 1 === (t = Math.round(255 * t).toString(16)).length ? "0" + t : t
    }

    function S(t, e, n, i) {
      t.addEventListener ? t[i ? "removeEventListener" : "addEventListener"](e, n, !1) : t.attachEvent && t[i ? "detachEvent" : "attachEvent"]("on" + e, n)
    }

    function D(t, e) {
      function g(t, e, n, i) {
        return h[0 | t][Math.round(Math.min((e - n) / (i - n) * C, C))]
      }

      function r() {
        O.legend.fps !== q && (O.legend.fps = q, O.legend[l] = q ? "FPS" : "ms"), v = q ? y.fps : y.duration, O.count[l] = 999 < v ? "999+" : v.toFixed(99 < v ? 0 : F.decimals)
      }

      function m() {
        for (p = n(), A < p - F.threshold && (y.fps -= y.fps / Math.max(1, 60 * F.smoothing / F.interval), y.duration = 1e3 / y.fps), w = F.history; w--;) j[w] = 0 === w ? y.fps : j[w - 1], T[w] = 0 === w ? y.duration : T[w - 1];
        if (r(), F.heat) {
          if (M.length)
            for (w = M.length; w--;) M[w].el.style[i[M[w].name].heatOn] = q ? g(i[M[w].name].heatmap, y.fps, 0, F.maxFps) : g(i[M[w].name].heatmap, y.duration, F.threshold, 0);
          if (O.graph && i.column.heatOn)
            for (w = P.length; w--;) P[w].style[i.column.heatOn] = q ? g(i.column.heatmap, j[w], 0, F.maxFps) : g(i.column.heatmap, T[w], F.threshold, 0)
        }
        if (O.graph)
          for (b = 0; b < F.history; b++) P[b].style.height = (q ? j[b] ? Math.round(x / F.maxFps * Math.min(j[b], F.maxFps)) : 0 : T[b] ? Math.round(x / F.threshold * Math.min(T[b], F.threshold)) : 0) + "px"
      }

      function k() {
        20 > F.interval ? (c = o(k), m()) : (c = setTimeout(k, F.interval), f = o(m))
      }

      function G(t) {
        (t = t || window.event).preventDefault ? (t.preventDefault(), t.stopPropagation()) : (t.returnValue = !1, t.cancelBubble = !0), y.toggle()
      }

      function U() {
        F.toggleOn && S(O.container, F.toggleOn, G, 1), t.removeChild(O.container)
      }

      function V() {
        if (O.container && U(), i = D.theme[F.theme], !(h = i.compiledHeatmaps || []).length && i.heatmaps.length) {
          for (b = 0; b < i.heatmaps.length; b++)
            for (h[b] = [], w = 0; w <= C; w++) {
              var e, n = h[b],
                a = w;
              e = .33 / C * w;
              var o = i.heatmaps[b].saturation,
                p = i.heatmaps[b].lightness,
                c = void 0,
                l = void 0,
                d = void 0,
                u = d = void 0,
                f = c = l = void 0;
              f = void 0;
              0 === (d = .5 >= p ? p * (1 + o) : p + o - p * o) ? e = "#000" : (l = (d - (u = 2 * p - d)) / d, f = (e *= 6) - (c = Math.floor(e)), f *= d * l, 0 === c || 6 === c ? (c = d, l = u + f, d = u) : 1 === c ? (c = d - f, l = d, d = u) : 2 === c ? (c = u, l = d, d = u + f) : 3 === c ? (c = u, l = d - f) : 4 === c ? (c = u + f, l = u) : (c = d, l = u, d -= f), e = "#" + N(c) + N(l) + N(d)), n[a] = e
            }
          i.compiledHeatmaps = h
        }
        for (var v in O.container = s(document.createElement("div"), i.container), O.count = O.container.appendChild(s(document.createElement("div"), i.count)), O.legend = O.container.appendChild(s(document.createElement("div"), i.legend)), O.graph = F.graph ? O.container.appendChild(s(document.createElement("div"), i.graph)) : 0, M.length = 0, O) O[v] && i[v].heatOn && M.push({
          name: v,
          el: O[v]
        });
        if (P.length = 0, O.graph)
          for (O.graph.style.width = F.history * i.column.width + (F.history - 1) * i.column.spacing + "px", w = 0; w < F.history; w++) P[w] = O.graph.appendChild(s(document.createElement("div"), i.column)), P[w].style.position = "absolute", P[w].style.bottom = 0, P[w].style.right = w * i.column.width + w * i.column.spacing + "px", P[w].style.width = i.column.width + "px", P[w].style.height = "0px";
        s(O.container, F), r(), t.appendChild(O.container), O.graph && (x = O.graph.clientHeight), F.toggleOn && ("click" === F.toggleOn && (O.container.style.cursor = "pointer"), S(O.container, F.toggleOn, G))
      }
      "object" === H(t) && undefined === t.nodeType && (e = t, t = document.body), t || (t = document.body);
      var i, h, p, c, f, x, v, w, b, y = this,
        F = I({}, D.defaults, e || {}),
        O = {},
        P = [],
        C = 100,
        M = [],
        z = F.threshold,
        E = 0,
        A = n() - z,
        j = [],
        T = [],
        q = "fps" === F.show;
      y.options = F, y.fps = 0, y.duration = 0, y.isPaused = 0, y.tickStart = function() {
        E = n()
      }, y.tick = function() {
        p = n(), z += (p - A - z) / F.smoothing, y.fps = 1e3 / z, y.duration = E < A ? z : p - E, A = p
      }, y.pause = function() {
        return c && (y.isPaused = 1, clearTimeout(c), a(c), a(f), c = f = 0), y
      }, y.resume = function() {
        return c || (y.isPaused = 0, k()), y
      }, y.set = function(t, e) {
        return F[t] = e, q = "fps" === F.show, -1 !== R(t, d) && V(), -1 !== R(t, u) && s(O.container, F), y
      }, y.showDuration = function() {
        return y.set("show", "ms"), y
      }, y.showFps = function() {
        return y.set("show", "fps"), y
      }, y.toggle = function() {
        return y.set("show", q ? "ms" : "fps"), y
      }, y.hide = function() {
        return y.pause(), O.container.style.display = "none", y
      }, y.show = function() {
        return y.resume(), O.container.style.display = "block", y
      }, y.destroy = function() {
        y.pause(), U(), y.tick = y.tickStart = function() {}
      }, V(), k()
    }
    var n, i = t.performance;
    n = i && (i.now || i.webkitNow) ? i[i.now ? "now" : "webkitNow"].bind(i) : function() {
      return +new Date
    };
    for (var a = t.cancelAnimationFrame || t.cancelRequestAnimationFrame, o = t.requestAnimationFrame, h = 0, p = 0, c = (i = ["moz", "webkit", "o"]).length; p < c && !a; ++p) o = (a = t[i[p] + "CancelAnimationFrame"] || t[i[p] + "CancelRequestAnimationFrame"]) && t[i[p] + "RequestAnimationFrame"];
    a || (o = function(e) {
      var i = n(),
        a = Math.max(0, 16 - (i - h));
      return h = i + a, t.setTimeout((function() {
        e(i + a)
      }), a)
    }, a = function(t) {
      clearTimeout(t)
    });
    var l = "string" === H(document.createElement("div").textContent) ? "textContent" : "innerText";
    D.extend = I, window.FPSMeter = D, D.defaults = {
      interval: 100,
      smoothing: 10,
      show: "fps",
      toggleOn: "click",
      decimals: 1,
      maxFps: 60,
      threshold: 100,
      position: "absolute",
      zIndex: 10,
      left: "5px",
      top: "5px",
      right: "auto",
      bottom: "auto",
      margin: "0 0 0 0",
      theme: "dark",
      heat: 0,
      graph: 0,
      history: 20
    };
    var d = ["toggleOn", "theme", "heat", "graph", "history"],
      u = "position zIndex left top right bottom margin".split(" ")
  }(window),
  function(t, e) {
    e.theme = {};
    var n = e.theme.base = {
      heatmaps: [],
      container: {
        heatOn: null,
        heatmap: null,
        padding: "5px",
        minWidth: "95px",
        height: "30px",
        lineHeight: "30px",
        textAlign: "right",
        textShadow: "none"
      },
      count: {
        heatOn: null,
        heatmap: null,
        position: "absolute",
        top: 0,
        right: 0,
        padding: "5px 10px",
        height: "30px",
        fontSize: "24px",
        fontFamily: "Consolas, Andale Mono, monospace",
        zIndex: 2
      },
      legend: {
        heatOn: null,
        heatmap: null,
        position: "absolute",
        top: 0,
        left: 0,
        padding: "5px 10px",
        height: "30px",
        fontSize: "12px",
        lineHeight: "32px",
        fontFamily: "sans-serif",
        textAlign: "left",
        zIndex: 2
      },
      graph: {
        heatOn: null,
        heatmap: null,
        position: "relative",
        boxSizing: "padding-box",
        MozBoxSizing: "padding-box",
        height: "100%",
        zIndex: 1
      },
      column: {
        width: 4,
        spacing: 1,
        heatOn: null,
        heatmap: null
      }
    };
    e.theme.dark = e.extend({}, n, {
      heatmaps: [{
        saturation: .8,
        lightness: .8
      }],
      container: {
        background: "#222",
        color: "#fff",
        border: "1px solid #1a1a1a",
        textShadow: "1px 1px 0 #222"
      },
      count: {
        heatOn: "color"
      },
      column: {
        background: "#3f3f3f"
      }
    }), e.theme.light = e.extend({}, n, {
      heatmaps: [{
        saturation: .5,
        lightness: .5
      }],
      container: {
        color: "#666",
        background: "#fff",
        textShadow: "1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
      },
      count: {
        heatOn: "color"
      },
      column: {
        background: "#eaeaea"
      }
    }), e.theme.colorful = e.extend({}, n, {
      heatmaps: [{
        saturation: .5,
        lightness: .6
      }],
      container: {
        heatOn: "backgroundColor",
        background: "#888",
        color: "#fff",
        textShadow: "1px 1px 0 rgba(0,0,0,.2)",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)"
      },
      column: {
        background: "#777",
        backgroundColor: "rgba(0,0,0,.2)"
      }
    }), e.theme.transparent = e.extend({}, n, {
      heatmaps: [{
        saturation: .8,
        lightness: .5
      }],
      container: {
        padding: 0,
        color: "#fff",
        textShadow: "1px 1px 0 rgba(0,0,0,.5)"
      },
      count: {
        padding: "0 5px",
        height: "40px",
        lineHeight: "40px"
      },
      legend: {
        padding: "0 5px",
        height: "40px",
        lineHeight: "42px"
      },
      graph: {
        height: "40px"
      },
      column: {
        width: 5,
        background: "#999",
        heatOn: "backgroundColor",
        opacity: .5
      }
    })
  }(window, FPSMeter));
var Fps = pc.createScript("fps");
Fps.prototype.initialize = function() {
  _fps = this, this.fps = new FPSMeter({
    heat: !1,
    graph: !1
  }), this.fps.hide(), this.tiempo = 0, this.tiempoMax = 1.2, this.sumFps = 0, this.cantFps = 0, this.iniciarCalculos = !1, this.primerIntento = !0, this.rectificadores = 0, this.maxRectificadores = 1
}, Fps.prototype.ini = function() {
  this.iniciarCalculos = !0
}, Fps.prototype.update = function(t) {
  if (this.iniciarCalculos && this.rectificadores != this.maxRectificadores)
    if (this.fps.tick(), this.tiempo = this.tiempo + t, this.tiempo < this.tiempoMax) this.sumFps = this.sumFps + this.fps.fps, this.cantFps = this.cantFps + 1;
    else {
      var e = this.sumFps / this.cantFps;
      if (this.primerIntento) console.log("el promedio de fps 1 intento fue de " + e), this.primerIntento = !1, this.tiempoMax = 2;
      else {
        console.log("el promedio de fps fue de " + e), this.rectificadores = this.rectificadores + 1;
        var n = "";
        if (n = e > 45 ? "alta" : e > 33 ? "media" : e > 14 ? "mediaBaja" : "baja", calidad != n) switch (calidad = n, calidad) {
          case "alta":
            this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
            break;
          case "media":
            window.devicePixelRatio > 2 ? this.app.graphicsDevice.maxPixelRatio = 2 : window.devicePixelRatio > 1.5 ? this.app.graphicsDevice.maxPixelRatio = 1.5 : this.app.graphicsDevice.maxPixelRatio = 1;
            break;
          case "mediaBaja":
            window.devicePixelRatio, this.app.graphicsDevice.maxPixelRatio = 1;
            break;
          case "baja":
            this.app.graphicsDevice.maxPixelRatio = 1
        }
      }
      this.sumFps = 0, this.tiempo = 0, this.cantFps = 0
    }
};
pc.extend(pc, function() {
  var FxaaEffect = function(e) {
    var o = {
        aPosition: pc.SEMANTIC_POSITION
      },
      r = ["attribute vec2 aPosition;", "", "void main(void)", "{", "    gl_Position = vec4(aPosition, 0.0, 1.0);", "}"].join("\n"),
      a = ["precision " + e.precision + " float;", "", "uniform sampler2D uColorBuffer;", "uniform vec2 uResolution;", "", "#define FXAA_REDUCE_MIN   (1.0/128.0)", "#define FXAA_REDUCE_MUL   (1.0/8.0)", "#define FXAA_SPAN_MAX     8.0", "", "void main()", "{", "    vec3 rgbNW = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * uResolution ).xyz;", "    vec3 rgbNE = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * uResolution ).xyz;", "    vec3 rgbSW = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * uResolution ).xyz;", "    vec3 rgbSE = texture2D( uColorBuffer, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * uResolution ).xyz;", "    vec4 rgbaM  = texture2D( uColorBuffer,  gl_FragCoord.xy  * uResolution );", "    vec3 rgbM  = rgbaM.xyz;", "    float opacity  = rgbaM.w;", "", "    vec3 luma = vec3( 0.299, 0.587, 0.114 );", "", "    float lumaNW = dot( rgbNW, luma );", "    float lumaNE = dot( rgbNE, luma );", "    float lumaSW = dot( rgbSW, luma );", "    float lumaSE = dot( rgbSE, luma );", "    float lumaM  = dot( rgbM,  luma );", "    float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );", "    float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );", "", "    vec2 dir;", "    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));", "    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));", "", "    float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );", "", "    float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );", "    dir = min( vec2( FXAA_SPAN_MAX, FXAA_SPAN_MAX), max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) * uResolution;", "", "    vec3 rgbA = 0.5 * (", "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * ( 1.0 / 3.0 - 0.5 ) ).xyz +", "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * ( 2.0 / 3.0 - 0.5 ) ).xyz );", "", "    vec3 rgbB = rgbA * 0.5 + 0.25 * (", "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * -0.5 ).xyz +", "        texture2D( uColorBuffer, gl_FragCoord.xy  * uResolution + dir * 0.5 ).xyz );", "", "    float lumaB = dot( rgbB, luma );", "", "    if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) )", "    {", "        gl_FragColor = vec4( rgbA, opacity );", "    }", "    else", "    {", "        gl_FragColor = vec4( rgbB, opacity );", "    }", "}"].join("\n");
    this.fxaaShader = new pc.Shader(e, {
      attributes: o,
      vshader: r,
      fshader: a
    }), this.resolution = new Float32Array(2)
  };
  return (FxaaEffect = pc.inherits(FxaaEffect, pc.PostEffect)).prototype = pc.extend(FxaaEffect.prototype, {
    render: function(e, o, r) {
      var a = this.device,
        t = a.scope;
      this.resolution[0] = 1 / e.width, this.resolution[1] = 1 / e.height, t.resolve("uResolution").setValue(this.resolution), t.resolve("uColorBuffer").setValue(e.colorBuffer), pc.drawFullscreenQuad(a, o, this.vertexBuffer, this.fxaaShader, r)
    }
  }), {
    FxaaEffect: FxaaEffect
  }
}());
var Fxaa = pc.createScript("fxaa");
Fxaa.prototype.initialize = function() {
  this.effect = new pc.FxaaEffect(this.app.graphicsDevice);
  var e = this.entity.camera.postEffects;
  e.addEffect(this.effect), this.on("state", (function(o) {
    o ? e.addEffect(this.effect) : e.removeEffect(this.effect)
  })), this.on("destroy", (function() {
    e.removeEffect(this.effect)
  }))
};
var continuePanel, classCallBack, _menu, comprarFakeFunction, tiempoExtra = 45,
  adsUsados = !1,
  poolID = 83657,
  overlay = "#overlay",
  videoAdListo = !1,
  _callBack = [],
  tipo = null,
  adCompleto = !1,
  enAds = !1,
  conExit = !1,
  testMode = !1,
  NOADS = !1,
  AD_object = null,
  hiloTimerAds = null,
  limiteTiempo = 75e3,
  mostrarAds = !1,
  botonNoAdsApretado = !1,
  adsDiv = null,
  soundBeforeAds = 0,
  musicBeforeAds = 0,
  enHuawei = !0;

function adsTimer() {
  mostrarAds = !1, clearInterval(hiloTimerAds), hiloTimerAds = setInterval(adsTimer_metodo, limiteTiempo)
}

function adsTimer_metodo() {
  clearInterval(hiloTimerAds), mostrarAds = !0
}

function cpmstarInit() {
  adsTimer();
  var e, o, t, i, s, n, a, d, r = document.getElementById("application-canvas"),
    c = document.getElementById("overlay");
  c.style.width = r.width / window.devicePixelRatio + "px", c.style.height = r.height / window.devicePixelRatio + "px", c.style.margin = "auto", testMode && (overlay = "#application-canvas", comprarFakeFunction = function() {
    NOADS = !0, alert("sin ADS!")
  }), e = "cpmstarinstream", o = window, t = document, i = {}, s = {}, n = {}, cpmstar_instreamAd = null, i.poolid = poolID, n.select = overlay, s.type = "game", d = t.getElementsByTagName("script"), sid = "cpmstarfr" + Math.round(999999 * Math.random()), o[e] || (o[e] = {
    instreamAds: []
  }, (a = t.createElement("script")).src = ("https:" == t.location.protocol ? "//server" : "//cdn") + ".cpmstar.com/cached/js/global_v100.pack.js?poolid=" + i.poolid, a.type = "text/javascript", a.async = "", d[0].parentNode.insertBefore(a, d[0])), o[e].instreamAds.push({
    params: i,
    config: s,
    events: {},
    overlay: n,
    placeholder: d[d.length - 1],
    scriptid: sid
  });
  var l = setInterval((function() {
    console.log("esperando a que este lista la api de ads  "), void 0 !== typeof cpmstar_instreamAd && null !== cpmstar_instreamAd && (console.log("api de ads lista"), clearInterval(l), cpmstar_instreamAd.addEventListener("ready", (function(e) {
      setTimeout((function() {
        videoAdListo = !0, AD_object = e, console.log("video listo para ser mostrado"), (adsDiv = document.getElementById("addivwrapper_0")).style.visibility = "hidden"
      }), 10)
    })), cpmstar_instreamAd.addEventListener("closed", (function() {
      setTimeout((function() {
        videoAdListo = !1, finAds(), console.log("Video ad cerrado"), cpmstar_instreamAd.initAd()
      }), 10)
    })), cpmstar_instreamAd.addEventListener("error", (function() {
      setTimeout((function() {
        console.log("dio un error el ad de mierda"), videoAdListo = !1, cpmstar_instreamAd.initAd()
      }), 10)
    })), cpmstar_instreamAd.addEventListener("complete", (function() {
      setTimeout((function() {
        videoAdListo = !1, adCompleto = !0, console.log("se termino de reproducir el ad. pero aun esta abierto")
      }), 10)
    })), cpmstar_instreamAd.initAd())
  }), 200)
}
var sounBeforeAds = 0;
musicBeforeAds = 0;

function mutear() {
  muteSound = 0, _menu.clickBotonMute()
}

function desMutear(e) {
  muteSound = e, _menu.clickBotonMute()
}

function estadoSound() {
  return muteSound
}

function estadoMusic() {
  return 0
}

function sonidoDeClick() {
  tocaSonido("click")
}

function showAds(e) {
  pause = !0, soundBeforeAds = estadoSound(), musicBeforeAds = estadoMusic(), mutear(), tipo = "ad", _callBack[0] = e, testMode || (adsDiv.style.visibility = "visible", enHuawei && system.postMessage("inAds")), AD_object.showAd(), enAds = !0
}

function showReward() {
  pause = !0, soundBeforeAds = estadoSound(), musicBeforeAds = estadoMusic(), mutear(), tipo = "reward", AD_object.showAd(), testMode || (adsDiv.style.visibility = "visible", enHuawei && system.postMessage("inAds")), enAds = !0
}

function finAds() {
  "ad" == tipo ? _callBack[0]() : "reward" == tipo && (adsUsados = !0, adCompleto ? _callBack[0]() : _callBack[1]()), 0 == soundBeforeAds && 0 == musicBeforeAds ? desMutear(1, 1) : 0 == soundBeforeAds ? desMutear(1, 0) : 0 == musicBeforeAds && desMutear(0, 1), pause = !1, _callBack = [], adCompleto = !1, enAds = !1, testMode || (adsDiv.style.visibility = "hidden", enHuawei && system.postMessage("menu"))
}

function poneContinue(e, o, t) {
  t()
}

function finTiempoContinue() {
  detenerContinue(!1, !0)
}

function clickRewardVideo(e) {
  sonidoDeClick(), detenerContinue(e, !0)
}

function detenerContinue(e, o) {
  var t = continuePanel.findByName("fill"),
    i = continuePanel.findByName("botonYes"),
    s = continuePanel.findByName("botonNo");
  t.script.animaTexturas.stopAnim(), asignaEventos(i, !1), asignaEventos(s, !1), e ? (adsUsados = !0, showReward()) : _callBack[1](), continuePanel.enabled = !1
}

function publicidad(e) {
  NOADS ? e() : mostrarAds && videoAdListo ? (showAds(e), adsTimer()) : e()
}

function clickNoAds(e, o) {
  botonNoAdsApretado = !0, sonidoDeClick(), testMode ? (comprarFakeFunction(), e.enabled = !1) : comprarIAP("removeAds", e, o)
}
var TutorialFC = pc.createScript("tutorialFC");
TutorialFC.attributes.add("objetosEsconderMain", {
  type: "entity",
  array: !0
}), TutorialFC.attributes.add("objetosEsconderGame", {
  type: "entity",
  array: !0
}), TutorialFC.attributes.add("anims", {
  type: "entity"
}), TutorialFC.attributes.add("nextb", {
  type: "entity"
}), TutorialFC.attributes.add("prevb", {
  type: "entity"
}), TutorialFC.attributes.add("doneb", {
  type: "entity"
}), TutorialFC.attributes.add("titulo", {
  type: "entity"
}), TutorialFC.attributes.add("desc1", {
  type: "entity"
}), TutorialFC.attributes.add("desc2", {
  type: "entity"
}), TutorialFC.attributes.add("index", {
  type: "number"
}), TutorialFC.attributes.add("fases", {
  type: "number"
}), TutorialFC.attributes.add("pelota1", {
  type: "entity"
}), TutorialFC.attributes.add("pelota2", {
  type: "entity"
}), TutorialFC.attributes.add("currentMenu", {
  type: "string"
}), TutorialFC.prototype.initialize = function() {
  this.callBack = null, this.tweenAnim = null, this.tipo = null
}, TutorialFC.prototype.empezar = function(t, e) {
  this.entity.enabled = !0, this.currentMenu = t, this.tipo = t, this.esconderObjetos(), this.tweenAnim = null, this.index = 0, this.nextb.enabled = !0, this.prevb.enabled = !1, this.pelota1.enabled = !0, this.pelota2.enabled = !1, this.doneb.enabled = !0, this.titulo.enabled = !0, "1vez" == t && (this.doneb.enabled = !1);
  for (var i = 0; i < this.fases; i++) this["desc" + (i + 1)].enabled = !1;
  this.desc1.enabled = !0, asignaEventos(this.nextb, !0, 1, this.clickNext.bind(this, 1)), asignaEventos(this.prevb, !0, 1, this.clickNext.bind(this, -1)), asignaEventos(this.doneb, !0, 1, this.clickClose.bind(this)), reproduceAnim(this.anims, 0, 1, !0), this.callBack = e
}, TutorialFC.prototype.esconderObjetos = function() {
  if ("main" == this.currentMenu)
    for (var t = 0; t < this.objetosEsconderMain.length; t++) this.objetosEsconderMain[t].enabled = !1;
  else if ("game" == this.currentMenu)
    for (t = 0; t < this.objetosEsconderGame.length; t++) this.objetosEsconderGame[t].enabled = !1;
  else if ("1vez" == this.currentMenu)
    for (t = 0; t < this.objetosEsconderMain.length; t++) this.objetosEsconderMain[t].enabled = !1
}, TutorialFC.prototype.mostrarObjetos = function() {
  if ("main" == this.currentMenu)
    for (var t = 0; t < this.objetosEsconderMain.length; t++) "best" == this.objetosEsconderMain[t].name ? bestScore > 0 && (this.objetosEsconderMain[t].enabled = !0) : this.objetosEsconderMain[t].enabled = !0;
  else if ("game" == this.currentMenu)
    for (t = 0; t < this.objetosEsconderGame.length; t++) this.objetosEsconderGame[t].enabled = !0
}, TutorialFC.prototype.clickNext = function(t) {
  (tocaSonido("click2"), null != this.tweenAnim && this.tweenAnim.stop(), this["desc" + (this.index + 1)].enabled = !1, this["pelota" + (this.index + 1)].enabled = !1, this.index = this.index + t, this["desc" + (this.index + 1)].enabled = !0, this["pelota" + (this.index + 1)].enabled = !0, this.index > 0 ? this.prevb.enabled = !0 : this.prevb.enabled = !1, this.index == this.fases - 1) ? (this.nextb.enabled = !1, "1vez" != this.tipo ? this.doneb.enabled = !0 : _control.screen2D.findByName("tutoPlayb").enabled = !0) : (this.nextb.enabled = !0, this.doneb.enabled = !0, "1vez" == this.tipo && (_control.screen2D.findByName("tutoPlayb").enabled = !1, this.doneb.enabled = !1));
  1 == this.index ? (reproduceAnim(this.anims, this.index, 1, !1), this.anims.script.animaUvs.setRangos(.99, 0, 1, -.9), this.tweenAnim = this.entity.tween(this.entity.getLocalPosition()).to(this.entity.getLocalPosition(), 1.26, pc.Linear).onComplete((() => {
    this.ejecutaAnim()
  })), this.tweenAnim.start()) : reproduceAnim(this.anims, this.index, 1, !0)
}, TutorialFC.prototype.ejecutaAnim = function() {
  this.anims.script.animaUvs.setRangos(.99, 0, 1, -.9), reproduceAnim(this.anims, this.index, 1, !1), this.tweenAnim = this.entity.tween(this.entity.getLocalPosition()).to(this.entity.getLocalPosition(), 1.26, pc.Linear).onComplete((() => {
    this.ejecutaAnim()
  })), this.tweenAnim.start()
}, TutorialFC.prototype.clickClose = function() {
  asignaEventos(this.nextb, !1), asignaEventos(this.prevb, !1), asignaEventos(this.doneb, !1), null != this.tweenAnim && this.tweenAnim.stop(), this.nextb.enabled = !1, this.prevb.enabled = !1, this.doneb.enabled = !1, this.titulo.enabled = !1, this.pelota1.enabled = !1, this.pelota2.enabled = !1;
  for (var t = 0; t < this.fases; t++) this["desc" + (t + 1)].enabled = !1;
  this.entity.enabled = !1, this.mostrarObjetos(), this.callBack()
};
var ArrowMovement = pc.createScript("arrowMovement");
ArrowMovement.attributes.add("speed", {
  type: "number",
  default: 5
}), ArrowMovement.attributes.add("distanceX", {
  type: "number",
  default: 22
}), ArrowMovement.attributes.add("sentido", {
  type: "number",
  default: -1
}), ArrowMovement.prototype.initialize = function() {
  this.deltaX = 0, this.initialPos = this.entity.getLocalPosition().clone()
}, ArrowMovement.prototype.update = function(t) {
  this.deltaX = this.speed * t;
  var e = this.entity.getLocalPosition();
  this.entity.setLocalPosition(e.x + this.sentido * this.deltaX, e.y, e.z), (e = this.entity.getLocalPosition()).x <= this.initialPos.x - this.distanceX ? (this.sentido = 1, this.deltaX = 0) : e.x >= this.initialPos.x + this.distanceX && (this.sentido = -1, this.deltaX = 0)
};