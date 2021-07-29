import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./styles.scss";

const Background = () => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");
    let width = document.body.offsetWidth;
    let height = document.body.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    (function () {
      var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      window.requestAnimationFrame = requestAnimationFrame;
    })();

    // ---------------
    function Terrain(options) {
      options = options || {};
      this.terrain = document.createElement("canvas");
      this.terCtx = this.terrain.getContext("2d");
      this.scrollDelay = options.scrollDelay || 90;
      this.lastScroll = new Date().getTime();

      this.terrain.width = width;
      this.terrain.height = height;

      this.fillStyle = options.fillStyle || "#191D4C";
      this.mHeight = options.mHeight || height;

      // generate
      this.points = [];

      var displacement = options.displacement || 140,
        power = Math.pow(2, Math.ceil(Math.log(width) / Math.log(2)));

      // set the start height and end height for the terrain
      this.points[0] = this.mHeight;
      //(this.mHeight - (Math.random() * this.mHeight / 2)) - displacement;
      this.points[power] = this.points[0];

      // create the rest of the points
      for (var i = 1; i < power; i *= 2) {
        for (var j = power / i / 2; j < power; j += power / i) {
          this.points[j] =
            (this.points[j - power / i / 2] + this.points[j + power / i / 2]) /
              2 +
            Math.floor(Math.random() * -displacement + displacement);
        }
        displacement *= 0.6;
      }

      document.getElementById("canvas").appendChild(this.terrain);
    }

    Terrain.prototype.update = function () {
      // draw the terrain
      this.terCtx.clearRect(0, 0, width, height);
      this.terCtx.fillStyle = this.fillStyle;

      if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
        this.lastScroll = new Date().getTime();
        this.points.push(this.points.shift());
      }

      this.terCtx.beginPath();
      for (var i = 0; i <= width; i++) {
        if (i === 0) {
          this.terCtx.moveTo(0, this.points[0]);
        } else if (this.points[i] !== undefined) {
          this.terCtx.lineTo(i, this.points[i]);
        }
      }

      this.terCtx.lineTo(width, this.terrain.height);
      this.terCtx.lineTo(0, this.terrain.height);
      this.terCtx.lineTo(0, this.points[0]);
      this.terCtx.fill();
    };

    function Star(options) {
      this.size = Math.random() * 3;
      this.speed = Math.random() * 0.2;
      this.x = options.x;
      this.y = options.y;
    }

    Star.prototype.reset = function () {
      this.size = Math.random() * 3;
      this.speed = Math.random() * 0.1;
      this.x = Math.random() * width;
      this.y = height;
    };

    Star.prototype.update = function () {
      this.y -= this.speed;
      if (this.y < 0) {
        this.reset();
      } else {
        context.fillRect(this.x, this.y, this.size, this.size);
      }
    };

    function ShootingStar() {
      this.reset();
    }

    ShootingStar.prototype.reset = function () {
      this.x = Math.random() * width;
      this.y = 0;
      this.len = Math.random() * 80 + 10;
      this.speed = Math.random() * 5 + 6;
      this.size = Math.random() * 1 + 0.1;
      // this is used so the shooting stars aren't constant
      this.waitTime = new Date().getTime() + Math.random() * 3000 + 500;
      this.active = false;
    };

    ShootingStar.prototype.update = function () {
      if (this.active) {
        this.x -= this.speed;
        this.y += this.speed;
        if (this.x < 0 || this.y >= height) {
          this.reset();
        } else {
          context.lineWidth = this.size;
          context.beginPath();
          context.moveTo(this.x, this.y);
          context.lineTo(this.x + this.len, this.y - this.len);
          context.stroke();
        }
      } else {
        if (this.waitTime < new Date().getTime()) {
          this.active = true;
        }
      }
    };

    let requestId;

    var entities = [];

    // init the stars
    for (var i = 0; i < height; i++) {
      entities.push(
        new Star({
          x: Math.random() * width,
          y: Math.random() * height,
        }),
      );
    }

    // Add 2 shooting stars that just cycle.
    entities.push(new ShootingStar());
    entities.push(new ShootingStar());

    entities.push(
      new Terrain({
        displacement: 150,
        scrollDelay: 90,
        mHeight: height - (height * 34) / 100,
      }),
    );
    entities.push(
      new Terrain({
        displacement: 120,
        scrollDelay: 50,
        fillStyle: "rgb(17,20,40)",
        mHeight: height - (height * 32) / 100,
      }),
    );
    entities.push(
      new Terrain({
        displacement: 200,
        scrollDelay: 20,
        fillStyle: "rgb(10,10,5)",
        mHeight: height - (height * 30) / 100,
      }),
    );

    const render = () => {
      var grd = context.createLinearGradient(0, 50, 0, 900);
      grd.addColorStop(0, "#070b34");
      grd.addColorStop(1, "#483475");
      context.fillStyle = grd;
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#ffffff";
      context.strokeStyle = "#ffffff";

      var entLen = entities.length;

      while (entLen--) {
        entities[entLen].update();
      }
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div id="canvas">
      <canvas ref={ref} />
    </div>
  );
};

export default Background;
