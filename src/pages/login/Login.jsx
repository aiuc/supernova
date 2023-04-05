import "./login.scss"

const Login = () =>{
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>SuperNova.</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Aliquam obcaecati earum quod libero nostrum possimus aut aliquid esse qui,
                        molestiae fugit tenetur tempore dolor ex illum! Officiis corporis a sunt.
                    </p>
                    <span>Don't you have an account ?</span>
                    <button>Register</button>
                </div>
                <div className="right">
                    <h1>Connexion</h1>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login