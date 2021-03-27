import Image from "next/image";

import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import { useRef } from "react";

const STATIC_DENSITY = 15;

function Pixi() {
	const boxRef = useRef(null);
	const canvasRef = useRef(null);
	const [constraints, setContraints] = useState<any>();
	const [scene, setScene] = useState<any>();
	const [refVisible, setRefVisible] = useState(false);

	const handleResize = () => {
		setContraints(boxRef?.current?.getBoundingClientRect());
	};
	useEffect(() => {
		let Engine = Matter.Engine,
			Render = Matter.Render,
			World = Matter.World,
			Bodies = Matter.Bodies,
			Composites = Matter.Composites,
			Common = Matter.Common,
			Events = Matter.Events,
			Constraint = Matter.Constraint,
			MouseConstraint = Matter.MouseConstraint,
			Mouse = Matter.Mouse,
			engine = Engine.create({}),
			world = engine.world,
			render = Render.create({
				element: boxRef.current,
				engine: engine,
				canvas: canvasRef.current,
				options: {
					background: "transparent",
					wireframes: false,
					showAngleIndicator: false,
				},
			});
		// const floor = Bodies.rectangle(0, 0, 0, STATIC_DENSITY, {
		// 	isStatic: true,
		// 	render: {
		// 		fillStyle: "blue",
		// 	},
		// });
		var floor = Bodies.rectangle(395, 600, 815, 50, {
			isStatic: true,
			render: { fillStyle: "#060a19" },
		});
		//   const ball = Bodies.circle(150, 0, 10, {
		//     restitution: 0.9,
		//     render: {
		//       fillStyle: 'yellow',
		//     },
		//   })
		World.add(engine.world, [floor]);

		var rockOptions = {   density: 0.0005,
            frictionAir: 0.01,
            restitution: 0.3,
            friction: 0.01,
            render: {
                sprite: {
                    texture: '/tech/react.png',
                    xScale: 0.1,
                    yScale: 0.1
                }
            }},
			rock = Bodies.circle(170, 450, 20,  rockOptions),
			anchor = { x: 170, y: 450 },
			elastic = Constraint.create({
				pointA: anchor,
				bodyB: rock,
				stiffness: 0.05,
			});

            var pyramid2 = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y) {
                return Bodies.circle(x, y, 25, 40);
            });

            var ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true, render: { fillStyle: '#060a19' } });

		World.add(world, [rock, anchor, elastic, pyramid2, ground2]);

		Events.on(engine, "afterUpdate", function () {
			if (
				mouseConstraint.mouse.button === -1 &&
				(rock.position.x > 190 || rock.position.y < 430)
			) {
				rock = Bodies.circle(170, 450, 20,  rockOptions);
				World.add(engine.world, rock);
				elastic.bodyB = rock;
			}
		});

		// add mouse control
		var mouse = Mouse.create(render.boxRef),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: true,
					},
				},
			});

		Matter.Mouse.setOffset(mouse, { x: 0, y: -160 });
		World.add(world, mouseConstraint);

		// keep the mouse in sync with rendering
		render.mouse = mouse;

		// fit the render viewport to the scene
		// Render.lookAt(render, {
		// 	min: { x: 0, y: 0 },
		// 	max: { x: 800, y: 600 },
		// });

		Engine.run(engine);
		Render.run(render);
		setContraints(boxRef?.current?.getBoundingClientRect());
		setScene(render);
		window.addEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (constraints) {
			let { width, height } = constraints;
			// Dynamically update canvas and bounds
			if (scene) {
				scene.bounds.max.x = width;
				scene.bounds.max.y = height;
				scene.options.width = width;
				scene.options.height = height;
				scene.canvas.width = width;
				scene.canvas.height = height;
				// Dynamically update floor
				const floor = scene.engine.world.bodies[0];
				Matter.Body.setPosition(floor, {
					x: width / 2,
					y: height + STATIC_DENSITY / 2,
				});
				Matter.Body.setVertices(floor, [
					{ x: 0, y: height },
					{ x: width, y: height },
					{ x: width, y: height + STATIC_DENSITY },
					{ x: 0, y: height + STATIC_DENSITY },
				]);
			}
		}
	}, [scene, constraints]);

	return (
		<>
			<section>
				<div className="container">
					<div className="section-wrapper">
						<h3 className="section-title">2d Crap</h3>
					</div>
				</div>
			</section>
			<div
				ref={boxRef}
				style={{
					//   position: 'absolute',
					//   top: 0,
					//   left: 0,
					width: "100%",
					height: "100%",
					pointerEvents: "none",
				}}
			>
				<canvas
					// width="1200"
					ref={canvasRef}
					// ref={(el) => {
					//     if (el) canvasRef.current = el;
					//     setRefVisible(!!el);
					// }}
				/>
			</div>
		</>
	);
}

export default Pixi;
