
import Card from "react-bootstrap/Card";
import home_page_card_image from '../assets/home_page_card_image.png'
import booking_image from '../assets/booking_image.png'

function Home() {
  return (
    <div className="home_page">
      <Card
        style={{
          backgroundColor: "#f1f1f1",
          backgroundImage: `url(${home_page_card_image})`,
          color: "red",
          minHeight: "900px",
        }}
      >
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