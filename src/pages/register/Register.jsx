import "./register.scss"

const Register = () =>{
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>SuperNova.</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Aliquam obcaecati earum quod libero nostrum possimus aut aliquid esse qui,
                        molestiae fugit tenetur tempore dolor ex illum! Officiis corporis a sunt.
                    </p>
                    <span>Do you have an account ?</span>
                    <button>Login</button>
                </div>
                <div className="right">
                    <h1>Inscription</h1>
                    <form>
                        <input type="text" placeholder="Name"/>
                        <input type="text" placeholder="Username"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Confirm Password"/>
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register