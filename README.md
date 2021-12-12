# Instagram Chat Clone with Laravel, ReactJS, GraphQL & JWT

## Mutations

### Register Mutation

```
mutation{
	registerUser(
		email: "bolt@gmail.com",
		name:"boltskills",
		password: "123",
		username: "boltskills"
		)
	{ 
		user{ 	name
			email
			username 
		}
		token
		errData{ msg }
		isAuthenticated
	}
}
```

### Login Mutation

```
mutation{
	loginUser(
		email: "bolt@gmail.com",
		password: "123"
	){ 
		user{
			name
			email
			username
		}
		remember_token
		logged_in
		errData{
			msg
		}
	}
}
```

### Load User Mutation

```
loadUser(
	remember_token : "kOB0xyPE4450emovu572igE9lhdu7jAK0RWw25SnVJXTy1Lec8Zjv5chHubVlgaZ4tQJQinu6EdFNxMS04z83ebpMnDDBkJW9Teb"
){ 
	remember_token
	logged_in
	email
	test
}

```

### Send a Message

```
sendMessage(
	txtMsg: "Hello!",
	senderEmail: "test2@gmail.com",
	receiverEmail: "test@gmail.com"
){
	txtMsg
}

```
