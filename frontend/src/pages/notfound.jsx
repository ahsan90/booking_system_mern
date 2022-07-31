import { Link, useNavigate } from "react-router-dom";


function Notfound() {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <div className="notfound">
      <img
        src="https://www.pngitem.com/pimgs/m/254-2549834_404-page-not-found-404-not-found-png.png"
        alt="No found"
      />
      <div className="notfound_back">
        <button onClick={back} className="btn btn-primary">
          {"<< "}Go Back
        </button>
      </div>
    </div>
  );
}

export default Notfound;
