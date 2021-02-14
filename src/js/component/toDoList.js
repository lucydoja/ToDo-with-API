import React, { useEffect } from "react";
import { useState } from "react";
import shortid from "shortid";

export function ToDo() {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([]);
	const [tareaPUT, setTareaPUT] = useState([]);

	useEffect(() => {
		GetList();
		//CreateUser();
	}, []);

	function GetList() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/lucydoja", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}

				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
				AgregarID(data);
			})
			.catch(error => {
				//error handling
				console.log("ha ocurrido un error", error);
			});
	}

	/*function CreateUser() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/lucydoja", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log("ha ocurrido un error", error);
			});
    }
    */

	function DeleteAll() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/lucydoja", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}

				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log("ha ocurrido un error", error);
			});
	}

	function AddData() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/lucydoja", {
			method: "PUT",
			body: JSON.stringify(tareaPUT),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}

				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log("ha ocurrido un error", error);
			});
	}

	function AgregarID(variable) {
		setTareaPUT(variable);
		variable.map(valor =>
			setTareas([
				...tareas,
				{
					id: shortid.generate(),
					label: valor.label
				}
			])
		);
	}

	const Agregar = e => {
		e.preventDefault();

		setTareas([
			{
				id: shortid.generate(),
				label: tarea
			},
			...tareas
		]);

		setTareaPUT([
			{
				label: tarea,
				done: false
			},
			...tareaPUT
		]);

		AddData();
		setTarea("");
	};

	function Borrar(variable) {
		let borrar = tareas.find(arr => arr.id === variable);
		let index = tareas.indexOf(borrar);
		tareas.splice(index, 1);
		setTareas([...tareas]);

		tareaPUT.splice(index, 1);
		setTareaPUT([...tareaPUT]);
		AddData();
	}

	function SubmitForm(variable) {
		if (variable === "Enter") {
			Agregar();
		}
	}

	function Mensaje() {
		if (tareas.length != 1) {
			return "Faltan " + tareas.length + " tareas por completar";
		} else {
			return "Falta " + tareas.length + " tarea por completar";
		}
	}

	return (
		<div>
			<h1 className="text-center">Lista de Tareas</h1>
			<div className="d-flex justify-content-center m-3" id="cuerpo">
				<button
					type="button"
					className="btn btn-outline-dark m-2"
					onClick={() => {
						setTareas([]), setTareaPUT([]), DeleteAll();
					}}>
					<strong>Borrar todas las tareas</strong>
				</button>
			</div>
			<div className="contenido d-flex flex-column">
				<form onSubmit={Agregar}>
					<div className="d-flex flex-column justify-content-center">
						<div className="d-flex align-items-center">
							<input
								className="form-control m-4 p-2"
								type="text"
								placeholder="Agregar una tarea"
								onChange={e => setTarea(e.target.value)}
								onKeyUp={k => SubmitForm(k.target.key)}
								value={tarea}
								required
							/>
						</div>
					</div>
				</form>

				<div>
					<ul className="list-group">
						{tareas.map(item => (
							<li
								className="list-group-item d-flex flex-row flex-wrap"
								key={item.id}>
								<div className="ml-4 flex-fill">
									{item.label}
								</div>
								<div>
									<i
										className="fas fa-trash-alt mt-2"
										onClick={() => Borrar(item.id)}></i>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div id="pie">
					<span>{Mensaje()}</span>
				</div>
			</div>
		</div>
	);
}
