import Image from "next/image";

import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import { useRef } from "react";

const STATIC_DENSITY = 15;
var goodImg = [
	// "axios",
	// "bootstrap",
	"cisco",
	"core",
	"csharp",
	"css",
	"docker",
	"github",
	"graphql",
	"hotchocolate",
	"html",
	"identity",
	"istio",
	// "java",
	"js",
	"kubernetes",
	"materialui",
	// "mongo",
	// "mysql",
	"nextjs",
	// "node",
	"npm",
	// "php",
	"postgress",
	"react",
	// "sqlserver",
	// "threejs",
	"ubuntu",
	// "windows",
];

var badImg = [
	"axios",
	"bootstrap",
	// "cisco",
	// "core",
	// "csharp",
	// "css",
	// "docker",
	// "github",
	// "graphql",
	// "hotchocolate",
	// "html",
	// "identity",
	// "istio",
	"java",
	// "js",
	// "kubernetes",
	// "materialui",
	"mongo",
	"mysql",
	// "nextjs",
	"node",
	// "npm",
	"php",
	// "postgress",
	// "react",
	"sqlserver",
	"threejs",
	// "ubuntu",
	"windows",
];

function MatterJS() {
	const boxRef = useRef(null);
	const canvasRef = useRef(null);
	const [constraints, setContraints] = useState<any>();
	const [scene, setScene] = useState<any>();
	const [resizing, setResizing] = useState(false);
	// const [refVisible, setRefVisible] = useState(false);

	const handleResize = () => {
		setContraints(boxRef?.current?.getBoundingClientRect());
		console.log("resizing");
		setResizing(true);
	};
	useEffect(() => {
		let Engine = Matter.Engine,
			Render = Matter.Render,
			World = Matter.World,
			Bodies = Matter.Bodies,
			Composites = Matter.Composites,
			Composite = Matter.Composite,
			Body = Matter.Body,
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

		var floor = Bodies.rectangle(395, 600, 815, 50, {
			isStatic: true,
			render: { fillStyle: "#060a19" },
		});

		World.add(engine.world, [floor]);

		let width = boxRef?.current?.getBoundingClientRect().width || 800;

		var group = Body.nextGroup(true);

		// GOOD ROPE1
		let i = 0;
		var goodRope1 = Composites.stack(
			(0.9 * width) / 3,
			50,
			10,
			1,
			10,
			10,
			function (x, y) {
				i++;
				var body = Bodies.circle(x, y, 20, {
					render: {
						sprite: {
							texture: `/tech/${goodImg[i]}.png`,
							xScale: 0.5,
							yScale: 0.5,
						},
					},
					collisionFilter: { group: group },
				});
				Matter.Body.rotate(body, -Math.PI / 2);
				return body;
			}
		);

		Composites.chain(goodRope1, 0.5, 0, -0.5, 0, {
			stiffness: 0.8,
			length: 2,
			render: { type: "line" },
		});
		console.log("width", width);

		Composite.add(
			goodRope1,
			Constraint.create({
				bodyB: goodRope1.bodies[0],
				pointB: { x: -20, y: 0 },
				pointA: {
					x: goodRope1.bodies[0].position.x,
					y: goodRope1.bodies[0].position.y,
				},
				stiffness: 0.5,
			})
		);

		// GOOD ROPE 2
		i = 5;
		var goodRope2 = Composites.stack(
			(1.1 * width) / 3,
			50,
			goodImg.length - 1 - 11,
			1,
			10,
			10,
			function (x, y) {
				i++;
				var body = Bodies.circle(x, y, 20, {
					render: {
						sprite: {
							texture: `/tech/${goodImg[i]}.png`,
							xScale: 0.5,
							yScale: 0.5,
						},
					},
					collisionFilter: { group: group },
				});
				Matter.Body.rotate(body, -Math.PI / 2);
				return body;
			}
		);

		Composites.chain(goodRope2, 0.5, 0, -0.5, 0, {
			stiffness: 0.8,
			length: 2,
			render: { type: "line" },
		});
		Composite.add(
			goodRope2,
			Constraint.create({
				bodyB: goodRope2.bodies[0],
				pointB: { x: -20, y: 0 },
				pointA: {
					x: goodRope2.bodies[0].position.x,
					y: goodRope2.bodies[0].position.y,
				},
				stiffness: 0.5,
			})
		);

		// BAD ROPE
		let j = 0;
		var badRope = Composites.stack(
			(2 * width) / 3,
			50,
			badImg.length - 1,
			1,
			10,
			10,
			function (x, y) {
				j++;
				var body = Bodies.circle(x, y, 20, {
					render: {
						sprite: {
							texture: `/tech/${badImg[j]}.png`,
							xScale: 0.5,
							yScale: 0.5,
						},
					},
					collisionFilter: { group: group },
				});
				Matter.Body.rotate(body, -Math.PI / 2);
				return body;
			}
		);

		Composites.chain(badRope, 0.5, 0, -0.5, 0, {
			stiffness: 0.8,
			length: 2,
			render: { type: "line" },
		});
		Composite.add(
			badRope,
			Constraint.create({
				bodyB: badRope.bodies[0],
				pointB: { x: -20, y: 0 },
				pointA: {
					x: badRope.bodies[0].position.x,
					y: badRope.bodies[0].position.y,
				},
				stiffness: 0.5,
			})
		);

		World.add(world, [goodRope1, goodRope2, badRope]);

		// add mouse control
		var mouse = Mouse.create(render.boxRef),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false,
					},
				},
			});

		Matter.Mouse.setOffset(mouse, { x: 0, y: -760 });
		World.add(world, mouseConstraint);

		// keep the mouse in sync with rendering
		render.mouse = mouse;

		Engine.run(engine);
		Render.run(render);
		setContraints(boxRef?.current?.getBoundingClientRect());
		setScene(render);
		window.addEventListener("resize", handleResize);
		setResizing(false);
	}, [resizing]);

	useEffect(() => {
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (constraints) {
			let { width, height } = constraints;
			// console.log(width, height)
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
						<h3 className="section-title">
							Technologies I've worked with
						</h3>
					</div>
				</div>
				<div className="section-wrapper">
					<h3 className="matter-title-left">
						Tech stack i am using right now
					</h3>
					<h3 className="matter-title-right">
						Tech i've used in the past
					</h3>
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

export default MatterJS;
