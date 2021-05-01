import SearchIconMUI from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { infoMode } from "../../../features/dialogs/dialogsSlice";
import { useHistory } from "react-router-dom";

export default function SearchIcon() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    dispatch(infoMode({ mode: "off" }));
    history.goBack();
  };

  return <SearchIconMUI onClick={handleClick}>search</SearchIconMUI>;
}
