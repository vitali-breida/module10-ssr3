import SearchIconMUI from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { infoMode } from '../../features/dialogsSlice';

export default function SearchIcon() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(infoMode({ mode: 'off' }));
    history.goBack();
  };

  return <SearchIconMUI onClick={handleClick}>search</SearchIconMUI>;
}
