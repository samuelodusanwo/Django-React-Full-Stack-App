import Form from "../../components/Form/Form.component";

function Login(){
    return <div><Form route="/api/token/" method="login" /></div>
}

export default Login;