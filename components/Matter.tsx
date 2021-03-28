import Image from "next/image";

import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import { useRef } from "react";

const STATIC_DENSITY = 15;
var goodImg = [
	"axios",
	"bootstrap",
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
	"java",
	"js",
	"kubernetes",
	"materialui",
	"mongo",
	"mysql",
	"nextjs",
	"node",
	"npm",
	"php",
	"postgress",
	"react",
	"sqlserver",
	"threejs",
	"ubuntu",
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
			Common = Matter.Common,
			Constraint = Matter.Constraint,
			Events = Matter.Events,
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

            let width = boxRef?.current?.getBoundingClientRect().width || 800;
            let height = boxRef?.current?.getBoundingClientRect().height || 800;

		var floor = Bodies.rectangle(width, height + 200, 4*width, 50, {
			isStatic: true,
			render: { fillStyle: "#060a19" },
		});

		World.add(engine.world, [floor]);


	
		// add bodies
		// add bodies
		let i = 0;
		var stack = Composites.stack(
			20,
			20,
			goodImg.length - 1,
			1,
			0,
			0,
			function (x, y) {
				i++;
				var body = Bodies.circle(x, y, 20, {
					friction: 0.001,
					restitution: 0.9,
					density: 0.001,
					render: {
						sprite: {
							texture: `/tech/${goodImg[i]}.png`,
							xScale: 0.5,
							yScale: 0.5,
						},
					},
					// collisionFilter: { group: group },
				});
				// Matter.Body.rotate(body, -Math.PI / 2);
				return body;
				// return Bodies.circle(x, y, 20, { friction: 0.00001, restitution: 0.5, density: 0.001 });
			}
		);

		World.add(world, stack);

		World.add(world, [
			Bodies.rectangle(200, 150, (3 * width) / 4, 20, {
				isStatic: true,
				angle: Math.PI * 0.06,
				render: { fillStyle: "#060a19" },
			}),
			Bodies.rectangle(
				width - (1 * width) / 4,
				350,
				(3 * width) / 4,
				20,
				{
					isStatic: true,
					angle: -Math.PI * 0.06,
					render: { fillStyle: "#060a19" },
				}
			),
			Bodies.rectangle(340, 580, (3 * width) / 4, 20, {
				isStatic: true,
				angle: Math.PI * 0.04,
				render: { fillStyle: "#060a19" },
			}),
		]);
		Events.on(engine, "afterUpdate", function () {
			// console.log(Composite?.allBodies(world)[4]?.position?.y);
			// console.log(Composite?.allBodies(world)[5]?.position?.y);
			// console.log(Composite?.allBodies(world)[6]?.position?.y);
			if (
				Composite.allBodies(world).length > 3 &&
				Composite?.allBodies(world)[4]?.position?.y > 600 &&
				Composite?.allBodies(world)[5]?.position?.y > 600 &&
				Composite?.allBodies(world)[6]?.position?.y > 600
			) {
			
				Composite.translate(stack, {
					x: -100,
					y: -700,
				});
			}
		});

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
					x: width ,
					y: height + 200,
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
				{/* <div className="section-wrapper">
					<h3 className="matter-title-left">
						Tech stack i am using right now
					</h3>
					<h3 className="matter-title-right">
						Tech i've used in the past
					</h3>
				</div> */}
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
