import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ShowTooltip({ children, text = null }) {
  return (
    <>
      {text === "" || text === null ? (
        <>{children}</>
      ) : (
        <OverlayTrigger
          /* key={placement}
          placement={placement} */
          overlay={<Tooltip>{text}</Tooltip>}
        >
          {children}
        </OverlayTrigger>
      )}
    </>
  );
}

export default ShowTooltip;
