// Axios & Sockets Examples

import axios from 'axios'

// Sticky Persist Session.
import socketIOClient from "socket.io-client";

// Pass in the socket endpoint. 
const socketObject = socketIOClient('http://localhost:9123');

// Main Login Form, Some 
// may come from provider.
// Eg. GitHub or Google etc.
const login_object = {
	id : '987447454',
	first_name : "Jessica",
	last_name : "Abel", 
	age : "29", 
	sex : "Female", 
	address : "A8/89 Hampshire Street, London",
	phone_number : "633-9852-6632"
}

// Usually tokens from the provider
// You may generate as well. 
// This is important. 
const auth_object = {
	auth_origin : "github_auth",
	csrf_token : "x35fv46h5678dg+po94kgf8jk",
	jwt_header_auth : "e34rddedf2wdsd45gbbn6809opgsdv570ohdfb46+v54tvp/oo90o"
}

getRequest();
checkPostRequest();
loginPostRequest();
userDeletionRequest();

// HTTP Get Request.
const getRequest = async () => {
	await axios.get("http://localhost:9123")
		.then(res => console.log(res.data))
	  	.catch(error => console.log(error))
} 

// HTTP Post Request with empty payload.
const checkPostRequest = async () => {
	await axios.post("http://localhost:9123/login", {
		data : {
			payload : {

			},
			message : "Login Request Commit",
			timestamp : Date(Date.now()).toString(),
			csrf_token : auth_object.csrf_token,
			jwt_header_auth : auth_object.jwt_header_auth
		}
	})
		.then(res => console.log(res.data))
	  	.catch(error => console.log(error))
} 

// HTTP POST Request for Login 
const loginPostRequest = async () => {
	await axios.post(`http://localhost:9123/login/${auth_object.auth_origin}/${login_object.id}`, {
		data : {
			payload : {
				first_name : login_object.first_name,
				last_name : login_object.last_name,
				age : login_object.age
			},
			message : "Login Request Commit",
			timestamp : Date(Date.now()).toString(),
			csrf_token : auth_object.csrf_token,
			jwt_header_auth : auth_object.jwt_header_auth
		}
	})
		.then(res => console.log(res.data))
	  	.catch(error => console.log(error))
} 

// HTTP Delete Request. 
const userDeletionRequest = async () => {
	await axios.delete(`http://localhost:9123/users/${login_object.id}`, {
		
		// Data object not accessable.
		// The objects inside it are available.
		// Most Stack Overflow example donot 
		// cover this. 
		
		data : {
      
			// Incase of Delete HTTP Verb we access  
			// payload{} and not data{} 
			// req.body.payload.first_name
      
      			payload : {
				first_name : login_object.first_name,
				last_name : login_object.last_name,
			},
			message : "User Deletion Commit",
			timestamp : Date(Date.now()).toString(),
			csrf_token : auth_object.csrf_token,
			jwt_header_auth : auth_object.jwt_header_auth
		}
	})
		.then(res => console.log(res.data))
	  	.catch(error => console.log(error))
} 

// Async & Await is not required here. Overkill ??
const socketEmitHandler = async (event, data) => {
	return await new Promise ((resolve, reject) => {
		try {
			socketObject.emit(event, data)
			resolve({
				message : 'Emit Success',
				data : data
			})
		} catch(err) {
			reject(err)
		}
	})
}

// Emit a 'pong' event on receiving a 'ping' event. 
socketObject.on('ping', (data) => {
	socketEmitHandler('pong', data).then(res => {
		console.log(res.message)
	}).catch(err => {
		console.log(err)
	})
})

// Emit a 'event_source' at start. 
// A Typical way to handle a Promise. 
socketEmitHandler('event_source', 'Event Source Emit')
	.then(res => {
		console.log(res.data)
	}).catch(err => {
		console.log(err)
	})
