
import {useNavigate} from 'react-router-dom'

function Unauthorized() {
  const navigate = useNavigate()
  const back = () => navigate(-1)
  return (
    <div>
      <h1>Unauthorized!</h1>
      <p>You do not have permission to access this page</p>
      <div>
        <button onClick={back} className="btn btn-primary">{ '<< ' }Go Back</button>
      </div>
    </div>
  );
}

export default Unauthorized;
