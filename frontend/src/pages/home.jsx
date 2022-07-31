
import Card from "react-bootstrap/Card";

function Home() {
  return (
    <div className="home_page">
      <Card>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Title>
          <h1>Welocme to the Booking System Application</h1>
        </Card.Title>
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home