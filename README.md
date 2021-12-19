# Instagram Chat Clone Using Laravel, ReactJS, GraphQL & MYSQL

## Mutations

## Regiser a user

``` 
  registerUser(
  			email: "user1@gmail.com" 
            password: "1234"
    		name:"User 1 "
    		username: "user 1"
  ){
     user {
        name
        email
        username
    }
    remember_token
    registered
    errData {
      msg
    }
  }

```

### Login a user 

```
  loginUser(
  			email: "user1@gmail.com" 
        password: "1234"
  ){
     user {
        name
        email
        username
    }
    remember_token
    logged_in
    errData {
      msg
    }
  }
```

### Load a user

``` 
	loadUser(remember_token: "PWqRkLenpf1hg51STfFGD4DbdtHOUw9LxUyiwZJqCGjpLE7CorZ81qmQ9Y0R6DyhuB9SQpMdZIW13Hl4s86O8uUsrkeE9gMoLcdS")
  {
    name
    email
    remember_token
    logged_in 
  }

```

### Get Other Users

``` 
getAllUsers(myEmail: "user1@gmail.com"){
    otherUsers
}
```

### Send a message 

```
sendeMessage(
        txtMsg: "A new message to user"
        senderEmail: "sam@gmail.com"
        receiverEmail: "user1@gmail.com"
  ){
    senderEmail
    receiverEmail
    txtMsg
    sent_at
  }
```

### Load Peer Chats Messages 
```
	 loadP2pChat(
        senderEmail: "use1@gmail.com"
        receiverEmail: "sam@gmail.com"
  ){
    messages{
      txtMsg
      senderEmail
      receiverEmail
      sent_at
      user {
        name
        email
      }
    }
  }
```

### Register HTML Code

``` 
 <div className="container">
            <div className="auth-wrapper">
                <div className="row mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">
                                <i className="fas fa-sign-in-alt"></i>Register
                            </h1>

                            <form
                                action="/users/login"
                                method="POST"

                            >
                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"

                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="fullname"
                                        name="fullname"
                                        className="form-control"
                                        placeholder="Full Name"

                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        placeholder="Username"
                                        
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"

                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    Register
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
```

### Login HTML Code

```
  <div className="container">
            <div className="auth-wrapper">
                <div className="row mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">
                                <i className="fas fa-sign-in-alt"></i> Login
                            </h1>

                            {errMsg ?
                                <div className="errmsg">
                                    {errMsg}
                                </div> : null}

                            <form
                                action="/users/login"
                                method="POST"
                                {...{ onSubmit }}
                            >
                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    Login
                                </button>
                            </form>
                            <p className="lead mt-4">
                                No Account?
                                <Link to="/register" className="ml-1">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
```

### Header HTML Code

```
 <header id="header">
            <Container>
                <div className="header__wrapper">
                    <div id="logo">
                        <span>Laravel Instagram Chat</span>
                    </div>

                    <div className="header__actions">
                        <button className="logout__btn">
                            <box-icon name="log-out"></box-icon>
                        </button>
                    </div>
                </div>
            </Container>
  </header>
```

### Inbox HTML Code 

``` 
    <Container className="container">
        <div className="chat__wrapper">
        </div>
    </Container>
```

### Header HTML Code

```
 <header id="header">
            <Container>
                <div className="header__wrapper">
                    <div id="logo">
                        <span>Laravel Instagram Chat</span>
                    </div>

                    <div className="header__actions">
                        <button className="logout__btn">
                            <box-icon name="log-out"></box-icon>
                        </button>
                    </div>
                </div>
            </Container>
  </header>
```

### Inbox HTML Code
```
    <Container className="container">
        <div className="chat__wrapper">

        </div>
    </Container>
```

### Header HTML Code

```
    <Container>
        <div className="header__wrapper">
            <div id="logo">
                <span>Laravel Instagram Chat</span>
            </div>

            <div className="header__actions">
                <button className="logout__btn">
                    <box-icon name="log-out"></box-icon>
                </button>
            </div>
        </div>
    </Container>
```

### NoChatScreen HTML Code
```
    <div className="no__chat__wrapper">
        <div className="no__chat__info">
            <box-icon name="message-square-detail"></box-icon>
            <h4>Your Messages</h4>
            <div className="info">Send private message to a friend</div>
        </div>
    </div>
```
