import Footer from "../../Containers/Footer/Footer";
import Logo from "../../Components/Logo/Logo";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export default () => {
  return (
    <div className="PageNotFound">
      <Logo />
      <div className="title">Page Not Found</div>
      <div className="code">404</div>
      <div className="button">
        <Button
          color="secondary"
          variant="contained"
          component={RouterLink}
          to="/"
        >
          GO BACK TO HOME
        </Button>
      </div>
      <Footer />
    </div>
  );
};
